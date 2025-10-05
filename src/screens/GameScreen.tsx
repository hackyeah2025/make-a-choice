// GameScreen.tsx
import { useState, useEffect } from "react";
import CardStack from "./components/CardStack";
import ExpandableStatsHeader from "./components/ExpandableStatsHeader";
import ProgressIndicator from "./components/ProgressIndicator";
import InstructionsModal from "./components/InstructionsModal";
import { Stats } from "./../types/Stats";
import useStats from "../hooks/useStats";

interface GameScreenProps {
  onGameFinished: () => void;
}

export default function GameScreen({ onGameFinished }: GameScreenProps) {
  const [percent, setPercent] = useState(0);
  const [years, setYears] = useState(0);
  const [showInstructions, setShowInstructions] = useState(true);
  const stats = useStats().stats;

  const handleProgressUpdate = (newPercent: number, newYears: number) => {
    setPercent(newPercent);
    setYears(newYears);

    if (newPercent >= 100) {
      onGameFinished(); // Trigger when the game is complete
    }
  };

  const handleCloseInstructions = () => {
    setShowInstructions(false);
  };

  const handleOpenInstructions = () => {
    setShowInstructions(true);
  };

  // Add keyboard shortcut to open instructions (H key)
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === 'h' && !showInstructions) {
        setShowInstructions(true);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showInstructions]);

  return (
    <div style={{
      backgroundImage: 'url("background.png")',
      backgroundSize: "cover",
      backgroundPosition: "-1900px 0px",
    }} >
      <div
        style={{
          backgroundColor: "#10884442",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "100vh",

        }}
      >
        <ExpandableStatsHeader years={years} name={stats.name} />
        <CardStack onProgressChange={handleProgressUpdate} />

        <InstructionsModal
          isOpen={showInstructions}
          onClose={handleCloseInstructions}
        />

        {/* Help button */}
        {!showInstructions && (
          <button
            className="help-button"
            onClick={handleOpenInstructions}
            title="Pomoc (klawisz H)"
          >
            ?
          </button>
        )}
      </div>
    </div>
  );
}
