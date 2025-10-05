import useCards from "../../hooks/useCards"
import Card from "./Card"

export default function CardStack() {
    const { currentCard, answerCard, isLoadingCard } = useCards({ cardsQueueSize: 5 })

    return (
        <Card event={currentCard} onCardAnswered={answerCard} iconName="bag" />
    );
}