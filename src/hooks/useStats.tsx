import { createContext, useContext, useState, ReactNode } from "react";
import { Stats } from "../types/Stats";
import { statsStorage, applyInferences } from "../Storage";

type StatsContextType = {
  stats: Stats;
  setStats: (stats: Stats) => void;
};

const StatsContext = createContext<StatsContextType | undefined>(undefined);

export function StatsProvider({ children }: { children: ReactNode }) {
  const [stats, setStats] = useState<Stats>(() => statsStorage.get());

  // Enhanced setStats that applies inferences
  const setStatsWithInferences = (newStats: Stats) => {
    const inferredStats = applyInferences(newStats);
    setStats(inferredStats);
    statsStorage.set(inferredStats);
  };

  return (
    <StatsContext.Provider value={{ stats, setStats: setStatsWithInferences }}>
      {children}
    </StatsContext.Provider>
  );
}

export default function useStats() {
  const context = useContext(StatsContext);
  if (!context) {
    throw new Error("useStats must be used within a StatsProvider");
  }
  return context;
}
