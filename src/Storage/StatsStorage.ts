import { Stats } from "../types/Stats";
import { LocalStorageManager } from "./LocalStorageManager";

const STATS_KEY = "stats";

export const initialStats: Stats = {
    name: "Player",
    age: 20,
    health: 5,
    relations: 5,
    happiness: 5,
    money: 5,
    priorities: [],

    income: 0,
    expenses: 0,
    savings: 0,
    ZUS: 0,

    education: "primary_school",
    job_experience: 0,

    job: "unemployed",
    job_name: "",

    has_serious_health_issues: false,
    relationship: "single",
    children: 0,
};

/**
 * Specialized storage manager for game stats
 */
export class StatsStorage extends LocalStorageManager<Stats> {
    constructor() {
        super(STATS_KEY, initialStats);
    }

    /**
     * Reset stats to initial values
     */
    reset(): void {
        this.set(initialStats);
    }

    /**
     * Get initial stats (useful for resetting or defaults)
     */
    getInitialStats(): Stats {
        return { ...initialStats };
    }

    /**
     * Update specific stat field
     */
    updateField<K extends keyof Stats>(field: K, value: Stats[K]): void {
        this.update(current => ({
            ...current,
            [field]: value
        }));
    }

    /**
     * Bulk update multiple fields
     */
    updateFields(updates: Partial<Stats>): void {
        this.update(current => ({
            ...current,
            ...updates
        }));
    }
}

// Export singleton instance
export const statsStorage = new StatsStorage();
