// FinishGameScreen.tsx
import React from "react";
import Icon from "../components/Icon";
import "./ModeSelectionScreen.css"; // reuse same styles for consistent design
import { Stats } from "./../types/Stats";
import StatsDisplay from "./components/StatsDisplay";
import useStats from "../hooks/useStats";

interface FinishGameScreenProps {
  score: number;
  stats: Stats;
}

export default function FinishGameScreen({ stats, score }: FinishGameScreenProps) {

  return (
    <div style={{ overflowY: "scroll", height: "100vh", overflowX: "hidden" }}>
      <div className="mode-selection-container">
        <div className="mode-selection-content">
          <h1 className="mode-selection-title">Gra zakończona!</h1>

          <div className="mode-selection-score">
            <h2>Twój wynik:</h2>
            <p className="score-value">{score}</p>
          </div>

          <StatsDisplay stats={stats} />

          <div className="mode-selection-options">
            {/* <div
            className="mode-option"
            onClick={onRestart}
          >
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
    </div>
  );
}

