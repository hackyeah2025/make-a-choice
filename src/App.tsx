import React, { useState } from "react";
import { HistoryProvider } from "./hooks/useHistory";
import { StatsProvider } from "./hooks/useStats";
import "./App.css";
import GameScreen from "./screens/GameScreen";
import InitialFormScreen from "./screens/InitialFormScreen";
import ModeSelectionScreen from "./screens/ModeSelectionScreen";
import FinishGameScreen from "./screens/FinishGameScreen";

type AppScreen = "mode-selection" | "initial-form" | "game" | "final";

function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>("mode-selection");
  const [score, setScore] = useState(0);

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
    <HistoryProvider>
      <StatsProvider>
        <div className="App">
          {currentScreen === "mode-selection" && (
            <ModeSelectionScreen
              onStartGame={handleStartGame}
              onShowForm={handleShowForm}
            />
          )}
          {currentScreen === "initial-form" && (
            <InitialFormScreen onComplete={handleFormComplete} />
          )}
          {currentScreen === "game" && (<GameScreen setScore={setScore} onGameFinished={handleGameFinished}/>)}
          {currentScreen === "final" && (
            <FinishGameScreen
              score={score}
            />
          )}
        </div>
      </StatsProvider>
    </HistoryProvider>
  );
}

export default App;
