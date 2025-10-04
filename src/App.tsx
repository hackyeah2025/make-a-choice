import React, { useState } from "react";
import { HistoryProvider } from "./hooks/useHistory";
import { StatsProvider } from "./hooks/useStats";


import "./App.css";
import GameScreen from "./screens/GameScreen";
import InitialFormScreen from "./screens/InitialFormScreen";

function App() {
  const [showInstructionsModal, setShowInstructionsModal] = useState(true);
  return (
    <HistoryProvider>
      <StatsProvider>
        <div className="App">
          <InitialFormScreen />
          <GameScreen />
        </div>
      </StatsProvider>
    </HistoryProvider>
  );
}

export default App;
