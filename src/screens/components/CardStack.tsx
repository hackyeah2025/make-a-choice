import useCards from "../../hooks/useCards"
import Card from "./Card"

export default function CardStack() {
    const { currentCard, answerCard, isLoadingCard } = useCards({ cardsQueueSize: 3 })

    return <div>
        {currentCard && <Card event={currentCard} onCardAnswered={answerCard} />}
        {isLoadingCard && <div>Loading...</div>}
    </div>
}