import useCards from "../../hooks/useCards"

export default function CardStack() {
    const { currentCard, answerCard } = useCards({ cardsQueueSize: 3 })

    return <div></div>
}