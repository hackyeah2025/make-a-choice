import { Stats } from "./../../types/Stats";

import { useEffect, useState } from "react";
import useCards from "../../hooks/useCards"
import Card from "./Card";
import StatusChangeModal from "./StatusChangeModal";

interface CardStackProps {
    onProgressChange?: (percent: number, years: number) => void;
}

export default function CardStack({ onProgressChange }: CardStackProps) {
    const { currentCard, currentAge, answerCard, isLoadingCard, lastStatChanges, clearStatChanges } = useCards({ cardsQueueSize: 1 });
    const [showStatusModal, setShowStatusModal] = useState(false);

    useEffect(() => {
        onProgressChange && onProgressChange((currentAge / 65) * 100, currentAge);
    }, [currentAge]);

    // Show status modal when there are stat changes
    useEffect(() => {
        if (lastStatChanges.length > 0) {
            setShowStatusModal(true);

            // Auto-close after 3 seconds
            const timer = setTimeout(() => {
                setShowStatusModal(false);
                clearStatChanges();
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [lastStatChanges, clearStatChanges]);

    const handleCloseStatusModal = () => {
        setShowStatusModal(false);
        clearStatChanges();
    };

    return (
        <>
            <Card
                event={currentCard}
                onCardAnswered={answerCard}
                iconName="bag"
            />

            <StatusChangeModal
                isOpen={showStatusModal}
                changes={lastStatChanges}
                onClose={handleCloseStatusModal}
            />
        </>
    );
}
