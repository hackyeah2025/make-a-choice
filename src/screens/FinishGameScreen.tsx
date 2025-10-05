// FinishGameScreen.tsx
import React, { useEffect, useState } from "react";
import Icon from "../components/Icon";
import "./ModeSelectionScreen.css"; // reuse same styles for consistent design
import { Stats } from "./../types/Stats";
import StatsDisplay from "./components/StatsDisplay";
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
    <div style={{ overflowY: "scroll", height: "100vh", overflowX: "hidden" }}>
      <div className="mode-selection-container">
        <div className="mode-selection-content">
          <h1 className="mode-selection-title">Gra zakończona!</h1>

        <div className="mode-selection-score">
          <h2>Twój wynik:</h2>
          <p className="score-value">{score}</p>
        </div>

        <div className="mode-selection-score">
          <h2>
          Powód porażki: {
            (() => {
              const entries = Object.entries(stats ?? {});
              if (entries.length === 0) return 'brak danych';

              const [minKey, minValue] = entries.reduce(
                (minPair, curr) => curr[1] < minPair[1] ? curr : minPair
              );
              return `${minKey}`;
            })()
          }
        </h2>


          <p className="score-value">{score}</p>
        </div>

        <div className="mode-selection-score">
          <h2>Podsumowanie poniżej. Aby zagrać jeszcze raz należy odświeżyć stronę, ale zachęcamy do przeczytania podsumowania :)</h2>
          {loading ? (
            <p className="score-value">Ładowanie...</p>
          ) : error ? (
            <p className="score-value error">{error}</p>
          ) : (
            <p className="score-value">{summary}</p>
          )}
        </div>
      </div>
    </div>
    </div>
  );
}
