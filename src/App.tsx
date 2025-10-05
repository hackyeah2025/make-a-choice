import React, { useEffect, useState } from "react";
import { HistoryProvider } from "./hooks/useHistory";
import { StatsProvider } from "./hooks/useStats";
import useHistory from "./hooks/useHistory";
import "./App.css";
import StartScreen from "./screens/StartScreen";
import GameScreen from "./screens/GameScreen";
import InitialFormScreen from "./screens/InitialFormScreen";
import ModeSelectionScreen from "./screens/ModeSelectionScreen";
import FinishGameScreen from "./screens/FinishGameScreen";
import { Stats } from "./types/Stats";
import { initialStats } from "./Storage/StatsStorage";
import useStats from "./hooks/useStats";
import { NotificationProvider, useNotification } from "./hooks/NotificationContext";

type AppScreen = "start" | "mode-selection" | "initial-form" | "game" | "final";

function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>("start");

  const handleStartToModeSelection = () => {
    setCurrentScreen("mode-selection");
  };

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
          onStartToModeSelection={handleStartToModeSelection}
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
  onStartToModeSelection,
  onStartGame,
  onShowForm,
  onFormComplete,
  onGameFinished,
}: {
  currentScreen: AppScreen;
  setCurrentScreen: React.Dispatch<React.SetStateAction<AppScreen>>;
  onStartToModeSelection: () => void;
  onStartGame: () => void;
  onShowForm: () => void;
  onFormComplete: () => void;
  onGameFinished: () => void;
}) {
  const { stats } = useStats();
  const { history, addToHistory, clearHistory } = useHistory();

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
      {currentScreen === "start" && (
        <StartScreen onNext={onStartToModeSelection} />
      )}
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
          history={history}
          score={
            stats.health + stats.relations + stats.happiness + stats.money
          }
        />
      )}
    </div>
  );
}

export default App;
