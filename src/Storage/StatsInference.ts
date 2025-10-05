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

    if (savings < 0) {
        return 0;
    }

    const monthsOfExpenses = expenses > 0 ? savings / expenses : savings > 0 ? 999 : 0;

    let score = 0;

    if (monthsOfExpenses >= 24) score = 90;
    else if (monthsOfExpenses >= 12) score = 80;
    else if (monthsOfExpenses >= 6) score = 70;
    else if (monthsOfExpenses >= 3) score = 60;
    else if (monthsOfExpenses >= 1) score = 50;
    else if (savings > 0) score = 30;
    else score = 10;

    if (income > 0) {
        const savingsRate = (income - expenses) / income;

        if (savingsRate > 0.3) score += 10;
        else if (savingsRate > 0.1) score += 5;
        else if (savingsRate > 0) score += 2;

        else if (savingsRate < -0.2) {
            if (monthsOfExpenses >= 12) score -= 5;
            else if (monthsOfExpenses >= 6) score -= 10;
            else score -= 20;
        }
        else if (savingsRate < 0) {
            if (monthsOfExpenses >= 6) score -= 2;
            else score -= 10;
        }
    } else {
        if (monthsOfExpenses >= 12) score -= 5;
        else if (monthsOfExpenses >= 6) score -= 10;
        else score -= 20;
    }

    if (income > 15000) score += 5;
    else if (income > 7000) score += 2;
    else if (income < 3500 && income > 0) {
        if (monthsOfExpenses >= 12) score -= 2;
        else score -= 5;
    }

    return Math.max(0, Math.min(100, score));
}

export function applyInferences(stats: Stats): Stats {
    const inferredJob = inferJobFromIncome(stats.income);

    return {
        ...stats,
        job: inferredJob,
    };
}
