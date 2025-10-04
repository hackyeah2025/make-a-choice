import { createContext, useContext, useState, ReactNode } from "react";
import { Stats } from "../types/Stats";

const STATS_KEY = "stats";

const initialStats: Stats = {

  age: 20,
  health: 100,
  relations: 100,
  happiness: 100,
  money: 100,

  income: 0,
  expenses: 0,

  education: 0,
  job_experience: 0,
  savings: 0,
  ZUS: 0,
  job: "low_paid_job",
  has_serious_health_issues: false,
  wife: "",
};

type StatsContextType = {
  stats: Stats;
  setStats: (stats: Stats) => void;
};

const StatsContext = createContext<StatsContextType | undefined>(undefined);

function getInitialStats(): Stats {
    const stored = window.localStorage.getItem(STATS_KEY);
    if (stored) {
        try {
            return JSON.parse(stored);
        } catch {
            return initialStats;
        }
    }
    return initialStats;
}

export function StatsProvider({ children }: { children: ReactNode }) {
  const [stats, setStats] = useState<Stats>(getInitialStats);

  return (
    <StatsContext.Provider value={{ stats, setStats }}>
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
