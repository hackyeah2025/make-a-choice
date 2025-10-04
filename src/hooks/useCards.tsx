import { useState } from "react";
import { Event } from "../types/Event";
import { Option } from "../types/Event";
import useStats from "./useStats";

import useHistory from "./useHistory";
import gameAlgorithm from "../services/gameAlgorithm";
import ApiService from "../services/api";

type UseCardsProps = {
    cardsQueueSize: number
};

export default function useCards({ cardsQueueSize }: UseCardsProps) {
    const [isLoadingCard, setIsLoadingCard] = useState(false);
    const { stats, setStats } = useStats();
    const { history, addToHistory } = useHistory();

    const [cardsQueue, setCardsQueue] = useState<Event[]>([
        {
            title: "Mysterious box",
            text: 'You find a mysterious box on the ground. What do you do?',
            options: [
                {
                    text: 'Open it', consequences: [{
                        impacted: 'happiness',
                        value: 10
                    }]
                },
                {
                    text: 'Leave it alone', consequences: [{
                        impacted: 'happiness',
                        value: -5
                    }]
                }
            ]
        },
        {
            title: "Mysterious box 2",
            text: 'You find a mysterious box on the ground. What do you do?',
            options: [
                {
                    text: 'Open it', consequences: [{
                        impacted: 'happiness',
                        value: 10
                    }]
                },
                {
                    text: 'Leave it alone', consequences: [{
                        impacted: 'happiness',
                        value: -5
                    }]
                }
            ]
        }
    ]);

    const fetchNewCard = async () => {
        setIsLoadingCard(true);

        // {title, question, options} = await getRegularAction('job/school', [], stats);
        const { description, consequences, isCoreEvent } = await gameAlgorithm.generateScenario();

        // if core event generateCoreEvent
        let event: Event;
        if (isCoreEvent) {
            event = await ApiService.generateCoreEvent(description, consequences, stats);
        } else {
            event = await ApiService.generateEvent(description, consequences, stats);
        }


        setCardsQueue((prev) => [...prev, event]);

        // TODO: Implement fetching a new card
        // If last card is core, don't fetch. Once it gets answered, fetch again up to a limit
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

        setStats({
            ...stats,
            age: (stats.age as number) + 1,
            ...option.consequences.reduce((acc, curr) => {
                if (typeof stats[curr.impacted] === "number") {
                    acc[curr.impacted] = (stats[curr.impacted] as number) + curr.value;
                }
                return acc;
            }, {} as Record<string, number>)
        })

        fetchNewCard();
    }

    return {
        currentCard: cardsQueue[0],
        answerCard,
        isLoadingCard
    };
}