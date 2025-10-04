import { createContext, useContext, useState, ReactNode } from "react";
import { StateElement } from "../types/History";

const HISTORY_KEY = "history";

function getInitialHistory(): StateElement[] {
    const stored = window.localStorage.getItem(HISTORY_KEY);
    if (stored) {
        try {
            return JSON.parse(stored);
        } catch {
            return [];
        }
    }
    return [];
}

type HistoryContextType = {
    history: StateElement[];
    addToHistory: (item: StateElement) => void;
    clearHistory: () => void;
};

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

export function HistoryProvider({ children }: { children: ReactNode }) {
    const [history, setHistory] = useState<StateElement[]>(getInitialHistory);

    const addToHistory = (item: StateElement) => {
        const newHistory = [...history, item];
        setHistory(newHistory);
        window.localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
    };

    const clearHistory = () => {
        setHistory([]);
        window.localStorage.removeItem(HISTORY_KEY);
    };

    return (
        <HistoryContext.Provider value={{ history, addToHistory, clearHistory }}>
            {children}
        </HistoryContext.Provider>
    );
}

export default function useHistory() {
    const context = useContext(HistoryContext);
    if (!context) {
        throw new Error("useHistory must be used within a HistoryProvider");
    }
    return context;
}