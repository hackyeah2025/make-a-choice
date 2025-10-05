import { Stats } from "../types/Stats";
import { LocalStorageManager } from "./LocalStorageManager";

export function generateAvatar(age: number, options?: { stage: "children" | "adults" | "seniors"; sex: "male" | "female"; variant: number }) {
    const data = {
        children: {
            male: 6,
            female: 4
        },
        adults: {
            male: 10,
            female: 10
        },
        seniors: {
            male: 4,
            female: 5
        }
    }

    const currentStage = age < 18 ? "children" : age < 55 ? "adults" : "seniors";

    if (!options) {
        const sex = Math.random() < 0.5 ? "male" : "female";
        const variant = Math.floor(Math.random() * data[currentStage][sex]);

        return { stage: currentStage, sex, variant };
    }

    if (currentStage !== options.stage) {
        const sex = options.sex;
        const variant = Math.floor(Math.random() * (data[currentStage][sex]) - 1) + 1;

        return { stage: currentStage, sex, variant };
    }

    return options;
}

const STATS_KEY = "stats";

const initialStats: Stats = {
    name: "Player",
    age: 20,
    health: 50,
    relations: 50,
    happiness: 50,
    money: 50,
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

    avatar_life_stage: "adults",
    avatar_sex: "male",
    avatar_variant: 1
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
