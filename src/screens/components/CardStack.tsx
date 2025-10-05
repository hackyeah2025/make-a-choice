import { useEffect } from "react";
import useCards from "../../hooks/useCards"
import Card from "./Card";

interface CardStackProps {
    onProgressChange?: (percent: number, years: number) => void;
    setScore: (score: number) => void
}

export default function CardStack({ onProgressChange, setScore }: CardStackProps) {
    const { currentCard, currentAge, answerCard, isLoadingCard } = useCards({ cardsQueueSize: 1 });

    useEffect(() => {
        onProgressChange && onProgressChange((currentAge / 65) * 100, currentAge);
    }, [currentAge]);

    return (
        <Card
            event={currentCard}
            onCardAnswered={answerCard}
            iconName="bag"
            setScore={setScore}
        />
    );
}
