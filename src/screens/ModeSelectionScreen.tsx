import React from "react";
import { statsStorage } from "../Storage";
import Icon from "../components/Icon";
import "./ModeSelectionScreen.css";

interface ModeSelectionScreenProps {
    onStartGame: () => void;
    onShowForm: () => void;
}

export default function ModeSelectionScreen({ onStartGame, onShowForm }: ModeSelectionScreenProps) {
    const hasExistingData = statsStorage.exists();

    // If there's existing data, resume the game automatically
    if (hasExistingData) {
        onStartGame();
        return null;
    }

    const handleQuickStart = () => {
        // Reset to initial stats and start game
        statsStorage.reset();
        onStartGame();
    };

    const handleCustomStart = () => {
        onShowForm();
    };

    return (
        <div className="mode-selection-container">
            <div className="mode-selection-content">
                <h1 className="mode-selection-title">Wybierz tryb gry</h1>

                <div className="mode-selection-options">
                    <div
                        className="mode-option"
                        onClick={handleQuickStart}
                    >
                        <div className="mode-option-icon">
                            <Icon name="play-circle-outline" size={80} color="white" />
                        </div>
                        <h3 className="mode-option-title">Zacznij od początku</h3>
                        <p className="mode-option-description">
                            Rozpocznij grę z domyślnymi ustawieniami
                        </p>
                    </div>

                    <div
                        className="mode-option"
                        onClick={handleCustomStart}
                    >
                        <div className="mode-option-icon">
                            <Icon name="person-circle-outline" size={80} color="white" />
                        </div>
                        <h3 className="mode-option-title">Spersonalizowana rozgrywka</h3>
                        <p className="mode-option-description">
                            Dostosuj swój profil przed rozpoczęciem gry
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
