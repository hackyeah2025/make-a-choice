import React, { useEffect, useState } from "react";
import { HistoryProvider } from "./hooks/useHistory";
import { StatsProvider } from "./hooks/useStats";
import "./App.css";
import GameScreen from "./screens/GameScreen";
import InitialFormScreen from "./screens/InitialFormScreen";
import ModeSelectionScreen from "./screens/ModeSelectionScreen";
import FinishGameScreen from "./screens/FinishGameScreen";
import { Stats } from "./types/Stats";
import { initialStats } from "./Storage/StatsStorage";
import useStats from "./hooks/useStats";

type AppScreen = "mode-selection" | "initial-form" | "game" | "final";

function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>("mode-selection");

  const handleStartGame = () => {
    setCurrentScreen("game");
  };

  const handleShowForm = () => {
    setCurrentScreen("initial-form");
  };

  const handleFormComplete = () => {
    setCurrentScreen("game");
  };

  const handleGameFinished = () => {
    localStorage.clear();
    setCurrentScreen("final");
  };

  return (
    <StatsProvider>
      <HistoryProvider>
        <InnerApp
          currentScreen={currentScreen}
          setCurrentScreen={setCurrentScreen}
          onStartGame={handleStartGame}
          onShowForm={handleShowForm}
          onFormComplete={handleFormComplete}
          onGameFinished={handleGameFinished}
        />
      </HistoryProvider>
    </StatsProvider>
  );
}

function InnerApp({
  currentScreen,
  setCurrentScreen,
  onStartGame,
  onShowForm,
  onFormComplete,
  onGameFinished,
}: {
  currentScreen: AppScreen;
  setCurrentScreen: React.Dispatch<React.SetStateAction<AppScreen>>;
  onStartGame: () => void;
  onShowForm: () => void;
  onFormComplete: () => void;
  onGameFinished: () => void;
}) {
  const { stats } = useStats();

  useEffect(() => {
    if (
      stats.health <= 0 ||
      stats.relations <= 0 ||
      stats.happiness <= 0 ||
      stats.money <= 0
    ) {
      localStorage.clear();
      setCurrentScreen("final");
    }
  }, [stats.health, stats.relations, stats.happiness, stats.money]);

  return (
    <div className="App">
      {currentScreen === "mode-selection" && (
        <ModeSelectionScreen
          onStartGame={onStartGame}
          onShowForm={onShowForm}
        />
      )}
      {currentScreen === "initial-form" && (
        <InitialFormScreen onComplete={onFormComplete} />
      )}
      {currentScreen === "game" && (
        <GameScreen onGameFinished={onGameFinished} />
      )}
      {currentScreen === "final" && (
        <FinishGameScreen
          stats={stats}
          score={
            stats.health + stats.relations + stats.happiness + stats.money
          }
        />
      )}
    </div>
  );
}

export default App;
