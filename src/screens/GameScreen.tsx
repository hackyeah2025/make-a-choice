// GameScreen.tsx
import { useState } from "react";
import CardStack from "./components/CardStack";
import ExpandableStatsHeader from "./components/ExpandableStatsHeader";
import ProgressIndicator from "./components/ProgressIndicator";

export default function GameScreen() {
  const [percent, setPercent] = useState(0);
  const [years, setYears] = useState(0);

  const handleProgressUpdate = (newPercent: number, newYears: number) => {
    setPercent(newPercent);
    setYears(newYears);
  };

  return (
    <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        background: "#ebebeb",
    }}>
      <ExpandableStatsHeader />
      <CardStack onProgressChange={handleProgressUpdate} />
      {/* <ProgressIndicator percent={percent} years={years} /> */}
    </div>
  );
}
