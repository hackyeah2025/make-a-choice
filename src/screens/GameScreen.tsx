// GameScreen.tsx
import { useState } from "react";
import CardStack from "./components/CardStack";
import ExpandableStatsHeader from "./components/ExpandableStatsHeader";

interface GameScreenProps {
  setScore: (score: number) => void;
  onGameFinished: () => void;
}

export default function GameScreen({ setScore, onGameFinished }: GameScreenProps) {
  const [percent, setPercent] = useState(0);
  const [years, setYears] = useState(0);

  const handleProgressUpdate = (newPercent: number, newYears: number) => {
    setPercent(newPercent);
    setYears(newYears);

    if (newPercent >= 100) {
      onGameFinished(); // Trigger when the game is complete
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        background: "#ebebeb",
      }}
    >
      <ExpandableStatsHeader />
      <CardStack onProgressChange={handleProgressUpdate} setScore={setScore} />
    </div>
  );
}
