import { useEffect, useState } from "react";
import { Event } from "../types/Event";
import { Option } from "../types/Event";
import useStats from "./useStats";

import useHistory from "./useHistory";
import gameAlgorithm from "../services/gameAlgorithm";
import ApiService from "../services/api";
import { Stats } from "../types/Stats";
import { start } from "repl";

type UseCardsProps = {
    cardsQueueSize: number
};

export default function useCards({ cardsQueueSize }: UseCardsProps) {
    const [isLoadingCard, setIsLoadingCard] = useState(false);
    const { stats, setStats } = useStats();
    const { history, addToHistory } = useHistory();

    const [cardsQueue, setCardsQueue] = useState<Event[]>([]);

    //LOG
    useEffect(() => {
        console.log("Cards Queue:", cardsQueue);
    }, [cardsQueue]);

    useEffect(() => {
        // Initial fill of the cards queue
        const initializeQueue = async () => {
            for (let i = 0; i < cardsQueueSize; i++) {
                await fetchNewCard();
            }
        };
        initializeQueue();
    }, []); // Empty dependency array to run only once on mount

    const fetchNewCard = async () => {
        if (cardsQueue.length >= cardsQueueSize) return;
        setIsLoadingCard(true);

        // {title, question, options} = await getRegularAction('job/school', [], stats);
        const { description, consequences, isCoreEvent, extraField, eventType } = await gameAlgorithm.generateScenario(stats);

        // if core event generateCoreEvent
        let event: Event;
        if (isCoreEvent) {
            event = await ApiService.generateCoreEvent(description, consequences, stats, extraField);
        } else {
            event = await ApiService.generateEvent(description, consequences, stats);
        }
        event.eventType = eventType;


        setCardsQueue((prev) => [...prev, event]);

        setIsLoadingCard(false)
    };

    const answerCard = (option: Option) => {
        setCardsQueue((prev) => prev.slice(1));
        // TODO: Here handle the answer logic, update stats, etc.
        addToHistory({
            stats,
            event: cardsQueue[0], // TODO: maybe add shallow/deep copy
            choice: option
        });

        let newStats = {
            ...stats,
            age: (stats.age as number) + 1,
            ...option.consequences.reduce((acc, curr) => {
                if (curr.impacted === "children") {
                    acc["children"] = curr.value as number;
                }

                else if (typeof stats[curr.impacted] == "number") {
                    if (["health", "relations", "happiness", "money"].includes(curr.impacted)) {
                        acc[curr.impacted] = Math.max(0, Math.min(100, (stats[curr.impacted] as number) + (curr.value as number)));
                    }
                    else {
                        acc[curr.impacted] = (stats[curr.impacted] as number) + (curr.value as number);
                    }
                }

                else if (typeof stats[curr.impacted] === "string") {
                    acc[curr.impacted] = curr.value;
                }

                return acc;
            }, {} as Record<string, number | string>)
        }

        if (cardsQueue[0].eventType === "job") {
            newStats.job_name = cardsQueue[0].extraField;
        }

        setStats(newStats)
        fetchNewCard();
    }

    return {
        currentCard: cardsQueue[0],
        currentAge: stats.age,
        answerCard,
        isLoadingCard
    };
}