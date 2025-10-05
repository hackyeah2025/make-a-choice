import useCards from "../../hooks/useCards"
import Card from "./Card";

interface CardStackProps {
  onProgressChange?: (percent: number, years: number) => void;
}

export default function CardStack({ onProgressChange }: CardStackProps) {
  const { currentCard, currentAge, answerCard, isLoadingCard } = useCards({ cardsQueueSize: 5 });

  onProgressChange && onProgressChange((currentAge / 65) * 100, currentAge);

  return (
    <Card
      event={currentCard}
      onCardAnswered={answerCard}
      iconName="bag"
    />
  );
}
