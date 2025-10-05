import React from 'react';
import './InstructionsModal.css';
import useCards from '../../hooks/useCards';

interface InstructionsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function InstructionsModal({ isOpen, onClose }: InstructionsModalProps) {
    if (!isOpen) return null;

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="instructions-modal-backdrop" onClick={handleBackdropClick}>
            <div className="instructions-modal">
                <div className="instructions-modal-header">
                    <h2>Jak grać?</h2>
                    <button className="instructions-modal-close" onClick={onClose}>
                        ×
                    </button>
                </div>

                <div className="instructions-modal-content">
                    <div className="instructions-section">
                        <h3>🎯 Cel gry</h3>
                        <p>
                            Podejmuj życiowe decyzje i obserwuj jak wpływają na Twoje statystyki.
                            Celem jest przeżycie pełnego życia, podejmując mądre wybory!
                        </p>
                    </div>

                    <div className="instructions-section">
                        <h3>🎮 Sterowanie</h3>
                        <ul>
                            <li><strong>Strzałki ←/→</strong> lub <strong>swipe</strong> - przełączanie między opcjami</li>
                            <li><strong>Spacja</strong> lub <strong>kliknięcie</strong> - wybór opcji</li>
                            <li><strong>Tap na statystykach</strong> - rozwiń/zwiń szczegóły</li>
                            <li><strong>Klawisz H</strong> lub <strong>przycisk ?</strong> - otwórz ponownie instrukcje</li>
                        </ul>
                    </div>

                    <div className="instructions-section">
                        <h3>📊 Mechanika gry</h3>
                        <ul>
                            <li><strong>Zdrowie</strong> - Utrzymuj je wysokie, aby przeżyć</li>
                            <li><strong>Szczęście</strong> - Wpływa na jakość życia</li>
                            <li><strong>Pieniądze</strong> - Otwierają nowe możliwości</li>
                            <li><strong>Inteligencja</strong> - Pomoże w trudnych sytuacjach</li>
                        </ul>
                    </div>

                    <div className="instructions-section">
                        <h3>⚡ Wskazówki</h3>
                        <ul>
                            <li>Każda decyzja ma konsekwencje - myśl długoterminowo</li>
                            <li>Równowaga między wszystkimi statystykami to klucz do sukcesu</li>
                            <li>Niektóre wydarzenia są losowe - to część życia!</li>
                            <li>Twój wiek wpływa na dostępne opcje</li>
                        </ul>
                    </div>
                </div>

                <div className="instructions-modal-footer">
                    <button className="instructions-modal-start-btn" onClick={onClose}>
                        Zacznij grę!
                    </button>
                </div>
            </div>
        </div>
    );
}