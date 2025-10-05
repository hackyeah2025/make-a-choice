import { Stats } from "../types/Stats";

// Helper functions to infer job status and financial situation
export function inferJobFromIncome(income: Number): Stats["job"] {
    const incomeNum = Number(income);
    if (incomeNum <= 0) return "unemployed";
    if (incomeNum <= 3500) return "low_paid_job";
    if (incomeNum <= 8000) return "middle_paid_job";
    return "high_paid_job";
}

export function inferFinancialSituation(stats: Stats): number {
    const income = Number(stats.income);
    const expenses = Number(stats.expenses);
    const savings = Number(stats.savings);

    if (savings < -200000) {
        return -1;
    }

    const score = ((savings + 200000) / 400000) * 100;

    return Math.round(Math.max(0, Math.min(100, score)));
}

export function applyInferences(stats: Stats): Stats {
    const inferredJob = inferJobFromIncome(stats.income);
    const inferredMoney = inferFinancialSituation(stats);

    return {
        ...stats,
        money: inferredMoney,
        job: inferredJob,
    };
}
