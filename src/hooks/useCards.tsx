import { useEffect, useState, useRef, useCallback } from "react";
import { Event } from "../types/Event";
import { Option } from "../types/Event";
import useStats from "./useStats";
import useHistory from "./useHistory";
import gameAlgorithm from "../services/gameAlgorithm";
import ApiService from "../services/api";

type UseCardsProps = {
  cardsQueueSize: number;
};

export default function useCards({ cardsQueueSize }: UseCardsProps) {
  const { stats, setStats } = useStats();
  const { history, addToHistory } = useHistory();

  const [cardsQueue, setCardsQueue] = useState<Event[]>([]);
  const [isLoadingCard, setIsLoadingCard] = useState(false);

  // prevent concurrent fetchNewCard calls
  const isFetchingRef = useRef(false);

  // Helper: fetch a new card using a snapshot of stats (so caller controls which stats are used)
  const fetchNewCard = useCallback(
    async (statsSnapshot = stats) => {
      // Avoid concurrent fetches
      if (isFetchingRef.current) return;
      // If queue is already full, don't bother fetching
      // (we still check again when appending)
      if (cardsQueue.length >= cardsQueueSize) return;

      isFetchingRef.current = true;
      setIsLoadingCard(true);

      try {
        const {
          description,
          consequences,
          isCoreEvent,
          extraField,
          eventType,
        } = await gameAlgorithm.generateScenario(statsSnapshot);

        let event: Event;
        if (isCoreEvent) {
          event = await ApiService.generateCoreEvent(
            description,
            consequences,
            statsSnapshot,
            extraField
          );
        } else {
          event = await ApiService.generateEvent(
            description,
            consequences,
            statsSnapshot
          );
        }
        event.eventType = eventType;

        // Use functional update to avoid races: only append if there's still room
        setCardsQueue((prev) =>
          prev.length < cardsQueueSize ? [...prev, event] : prev
        );
      } catch (err) {
        console.error("fetchNewCard error:", err);
      } finally {
        isFetchingRef.current = false;
        setIsLoadingCard(false);
      }
    },
    // include cardsQueue and stats in deps to keep current references
    // note: cardsQueue is read only to bail early; setCardsQueue uses functional update
    [cardsQueue.length, cardsQueueSize, stats]
  );

  // Initialization: fill queue sequentially using the current stats snapshot.
  useEffect(() => {
    let mounted = true;
    const initializeQueue = async () => {
      // capture a snapshot of stats at initialization start
      const initStats = stats;
      for (let i = 0; i < cardsQueueSize && mounted; i++) {
        // await each fetch to avoid flooding and ensure stable ordering
        await fetchNewCard(initStats);
      }
    };

    // only initialize if queue empty
    if (cardsQueue.length === 0) {
      initializeQueue();
    }

    return () => {
      mounted = false;
    };
    // We intentionally depend on cardsQueue.length and cardsQueueSize.
    // We do NOT include fetchNewCard as a dep to avoid re-running unnecessarily.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardsQueueSize, /* cardsQueue.length intentionally used below */ cardsQueue.length]);

  // Keep replenishing: whenever queue drops below size, fetch one (if not already fetching)
  useEffect(() => {
    if (cardsQueue.length < cardsQueueSize && !isFetchingRef.current) {
      // Use latest stats snapshot when replenishing in normal flow
      fetchNewCard(stats);
    }
  }, [cardsQueue.length, cardsQueueSize, fetchNewCard, stats]);

  const answerCard = async (option: Option) => {
    // capture the current card BEFORE mutating queue
    const currentCard = cardsQueue[0];
    if (!currentCard) return;

    // remove the current card from the queue
    setCardsQueue((prev) => prev.slice(1));

    // add to history using the captured currentCard and the current stats snapshot
    addToHistory({
      stats,
      event: currentCard, // shallow copy is probably fine; clone if you need immutability
      choice: option,
    });

    // compute newStats based on current stats (not relying on setState async)
    const baseStats = stats;
    const consequencePatch = option.consequences.reduce(
      (acc: Record<string, number | string>, curr) => {
        if (curr.impacted === "income") {
          acc["income"] = curr.value as number;
        } else if (curr.impacted === "children") {
          acc["children"] = curr.value as number;
        } else if (typeof baseStats[curr.impacted] === "number") {
          if (["health", "relations", "happiness", "money"].includes(curr.impacted)) {
            acc[curr.impacted] = Math.max(
              0,
              Math.min(100, (baseStats[curr.impacted] as number) + (curr.value as number))
            );
          } else {
            acc[curr.impacted] =
              (baseStats[curr.impacted] as number) + (curr.value as number);
          }
        } else if (typeof baseStats[curr.impacted] === "string") {
          acc[curr.impacted] = curr.value;
        }
        return acc;
      },
      {}
    );

    let newStats = {
      ...baseStats,
      age: (baseStats.age as number) + 1,
      ...consequencePatch,
    };
    newStats.savings = newStats.savings + (newStats.income - newStats.expenses);

    // apply job_name change if the answered event was a job event
    if (currentCard.eventType === "job") {
      newStats.job_name = currentCard.extraField;
    }

    setStats(newStats);

    // fetch the next card using the updated stats snapshot to keep the queue consistent
    // (this avoids generating new events based on stale stats)
    await fetchNewCard(newStats);
  };

  return {
    currentCard: cardsQueue[0],
    currentAge: stats.age,
    answerCard,
    isLoadingCard,
  };
}
