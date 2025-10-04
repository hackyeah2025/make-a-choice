import React, { useState } from 'react';

import './App.css';
import GameScreen from './screens/GameScreen';

function App() {
  const [showInstructionsModal, setShowInstructionsModal] = useState(true)
  return (
    <div className="App">
      <GameScreen />
    </div>
  );
}

export default App;
