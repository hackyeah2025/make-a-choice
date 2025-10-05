import { useEffect, useState, useRef, useCallback } from "react";
import { Event } from "../types/Event";
import { Option } from "../types/Event";
import useStats from "./useStats";
import useHistory from "./useHistory";
import gameAlgorithm from "../services/gameAlgorithm";
import ApiService from "../services/api";
import { generateAvatar } from "../Storage/StatsStorage";
import { Stats } from "../types/Stats";

type UseCardsProps = {
    cardsQueueSize: number;
};

export interface StatChange {
    stat: string;
    icon: string;
    oldValue: number | string;
    newValue: number | string;
    change?: number;
    isStringChange?: boolean;
}

export default function useCards({ cardsQueueSize }: UseCardsProps) {
    const { stats, setStats } = useStats();
    const { history, addToHistory } = useHistory();

    const [cardsQueue, setCardsQueue] = useState<Event[]>([]);
    const [isLoadingCard, setIsLoadingCard] = useState(false);
    const [lastStatChanges, setLastStatChanges] = useState<StatChange[]>([]);

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
                console.log(initStats.age + i);
                await fetchNewCard({ ...initStats, age: initStats.age += i });
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

        const avatar = generateAvatar((baseStats.age as number) + 1, {
            stage: baseStats.avatar_life_stage,
            sex: baseStats.avatar_sex,
            variant: baseStats.avatar_variant,
        });

        let newStats: Stats = {
            ...baseStats,
            age: (baseStats.age as number) + 1,
            ...consequencePatch,
            avatar_life_stage: avatar.stage,
            avatar_sex: avatar.sex,
            avatar_variant: avatar.variant,
        };
        newStats.savings = newStats.savings + (newStats.income - newStats.expenses);

        // apply job_name change if the answered event was a job event
        if (currentCard.eventType === "job") {
            newStats.job_name = currentCard.extraField;
        }

        setStats(newStats);

        // Calculate stat changes for the modal
        const statChanges: StatChange[] = [
            // Core stats (always show if changed)
            {
                stat: 'health',
                icon: 'heart-outline',
                oldValue: baseStats.health,
                newValue: newStats.health,
                change: newStats.health - baseStats.health
            },
            {
                stat: 'relations',
                icon: 'people-outline',
                oldValue: baseStats.relations,
                newValue: newStats.relations,
                change: newStats.relations - baseStats.relations
            },
            {
                stat: 'happiness',
                icon: 'happy-outline',
                oldValue: baseStats.happiness,
                newValue: newStats.happiness,
                change: newStats.happiness - baseStats.happiness
            },
            {
                stat: 'money',
                icon: 'cash-outline',
                oldValue: baseStats.money,
                newValue: newStats.money,
                change: newStats.money - baseStats.money
            },
            // Financial stats
            {
                stat: 'income',
                icon: 'trending-up-outline',
                oldValue: baseStats.income,
                newValue: newStats.income,
                change: newStats.income - baseStats.income
            },
            {
                stat: 'expenses',
                icon: 'trending-down-outline',
                oldValue: baseStats.expenses,
                newValue: newStats.expenses,
                change: newStats.expenses - baseStats.expenses
            },
            {
                stat: 'savings',
                icon: 'wallet-outline',
                oldValue: baseStats.savings,
                newValue: newStats.savings,
                change: newStats.savings - baseStats.savings
            },
            // Career & Education
            {
                stat: 'job_experience',
                icon: 'briefcase-outline',
                oldValue: baseStats.job_experience,
                newValue: newStats.job_experience,
                change: newStats.job_experience - baseStats.job_experience
            },
            // Personal life
            {
                stat: 'children',
                icon: 'people-circle-outline',
                oldValue: baseStats.children,
                newValue: newStats.children,
                change: newStats.children - baseStats.children
            }
        ];

        // Add string-based changes
        const stringChanges: StatChange[] = [];

        if (baseStats.education !== newStats.education) {
            stringChanges.push({
                stat: 'education',
                icon: 'school-outline',
                oldValue: baseStats.education,
                newValue: newStats.education,
                isStringChange: true
            });
        }

        if (baseStats.job !== newStats.job) {
            stringChanges.push({
                stat: 'job',
                icon: 'laptop-outline',
                oldValue: baseStats.job,
                newValue: newStats.job,
                isStringChange: true
            });
        }

        if (baseStats.job_name !== newStats.job_name && newStats.job_name) {
            stringChanges.push({
                stat: 'job_name',
                icon: 'id-card-outline',
                oldValue: baseStats.job_name || 'Brak',
                newValue: newStats.job_name,
                isStringChange: true
            });
        }

        if (baseStats.relationship !== newStats.relationship) {
            stringChanges.push({
                stat: 'relationship',
                icon: 'heart-half-outline',
                oldValue: baseStats.relationship,
                newValue: newStats.relationship,
                isStringChange: true
            });
        }

        if (baseStats.has_serious_health_issues !== newStats.has_serious_health_issues) {
            stringChanges.push({
                stat: 'health_issues',
                icon: 'medkit-outline',
                oldValue: baseStats.has_serious_health_issues ? 'Tak' : 'Nie',
                newValue: newStats.has_serious_health_issues ? 'Tak' : 'Nie',
                isStringChange: true
            });
        }

        const allChanges = [...statChanges, ...stringChanges];
        setLastStatChanges(allChanges);

        // fetch the next card using the updated stats snapshot to keep the queue consistent
        // (this avoids generating new events based on stale stats)
        await fetchNewCard(newStats);
    };

    return {
        currentCard: cardsQueue[0],
        currentAge: stats.age,
        answerCard,
        isLoadingCard,
        lastStatChanges,
        clearStatChanges: () => setLastStatChanges([]),
    };
}
