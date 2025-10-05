// FinishGameScreen.tsx
import React, { useEffect, useState } from "react";
import Icon from "../components/Icon";
import "./ModeSelectionScreen.css"; // reuse same styles for consistent design
import { Stats } from "./../types/Stats";
import { StateElement } from "../types/History";
import ApiService from "../services/api";

interface FinishGameScreenProps {
  score: number;
  stats: Stats;
  history: StateElement[];
}

export default function FinishGameScreen({ stats, score, history }: FinishGameScreenProps) {
  const [summary, setSummary] = useState<string>(""); // state to store summary
  const [loading, setLoading] = useState<boolean>(true); // optional: for a loading indicator
  const [error, setError] = useState<string | null>(null); // optional: for error handling

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const result = await ApiService.generateSummary(stats, history);
        console.log(result)
        setSummary(result);
      } catch (err) {
        console.error("Error generating summary:", err);
        setError("Nie udało się wygenerować podsumowania.");
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, [stats, history]);

  return (
    <div className="mode-selection-container">
      <div className="mode-selection-content">
        <h1 className="mode-selection-title">Gra zakończona!</h1>

        <div className="mode-selection-score">
          <h2>Twój wynik:</h2>
          <p className="score-value">{score}</p>
        </div>

        <div className="mode-selection-score">
          <h2>Podsumowanie</h2>
          {loading ? (
            <p className="score-value">Ładowanie...</p>
          ) : error ? (
            <p className="score-value error">{error}</p>
          ) : (
            <p className="score-value">{summary}</p>
          )}
        </div>

        <div className="mode-selection-options">
          {/* Example restart button */}
          {/* <div className="mode-option" onClick={onRestart}>
            <div className="mode-option-icon">
              <Icon name="refresh-circle-outline" size={80} color="#007834" />
            </div>
            <h3 className="mode-option-title">Zagraj ponownie</h3>
            <p className="mode-option-description">
              Rozpocznij nową rozgrywkę od początku
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
}
