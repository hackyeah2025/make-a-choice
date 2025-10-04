import React, { useState } from "react";
import { HistoryProvider } from "./hooks/useHistory";
import { StatsProvider } from "./hooks/useStats";


import "./App.css";
import GameScreen from "./screens/GameScreen";

function App() {
  const [showInstructionsModal, setShowInstructionsModal] = useState(true);
  return (
    <HistoryProvider>
      <StatsProvider>
        <div className="App">
          <GameScreen />
        </div>
      </StatsProvider>
    </HistoryProvider>
  );
}

export default App;
