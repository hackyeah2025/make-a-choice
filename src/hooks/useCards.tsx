import { useState } from "react";
import { Event } from "../types/Event";

type UseCardsProps = {
    cardsQueueSize: number
};

export default function useCards({ cardsQueueSize }: UseCardsProps) {
    const [isLoadingCard, setIsLoadingCard] = useState(false);

    const [cardsQueue, setCardsQueue] = useState<Event[]>([
        {
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
        // TODO: Implement fetching a new card
        // If last card is core, don't fetch. Once it gets answered, fetch again up to a limit
        setIsLoadingCard(false)
    };

    const answerCard = () => {
        setCardsQueue((prev) => prev.slice(1));
        // TODO: Here handle the answer logic, update stats, etc.

        fetchNewCard();
    }

    return {
        currentCard: cardsQueue[0],
        answerCard,
        isLoadingCard
    };
}