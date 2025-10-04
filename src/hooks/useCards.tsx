import { useState } from "react";

type UseCardsProps = {
    cardsQueueSize: number
};

export default function useCards({ cardsQueueSize }: UseCardsProps) {
    const [cardsQueue, setCardsQueue] = useState<string[]>([]);

    const fetchNewCard = async () => {
        // TODO: Implement fetching a new card
        // If last card is core, don't fetch. Once it gets answered, fetch again up to a limit
    };

    const answerCard = () => {
        setCardsQueue((prev) => prev.slice(1));
        // TODO: Here handle the answer logic, update stats, etc.

        fetchNewCard();
    }

    return {
        currentCard: cardsQueue[0],
        answerCard
    };
}