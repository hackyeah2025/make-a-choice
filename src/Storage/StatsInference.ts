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

    // Base score from income vs expenses ratio
    let score = 50;

    if (income > 0) {
        const savingsRate = (income - expenses) / income;
        if (savingsRate > 0.3) score += 30; // Saving 30%+ is excellent
        else if (savingsRate > 0.1) score += 15; // Saving 10-30% is good
        else if (savingsRate > 0) score += 5; // Any savings is positive
        else if (savingsRate < -0.2) score -= 30; // Spending 20% more than income is bad
        else if (savingsRate < 0) score -= 15; // Any deficit is concerning
    }

    // Adjust based on absolute savings amount
    if (savings > 100000) score += 20; // Substantial emergency fund
    else if (savings > 50000) score += 10; // Good emergency fund
    else if (savings > 20000) score += 5; // Some emergency fund
    else if (savings < 5000) score -= 10; // Very little savings

    // Adjust based on income level
    if (income > 15000) score += 15; // High income
    else if (income > 7000) score += 5; // Good income
    else if (income < 3500 && income > 0) score -= 15; // Low income
    else if (income <= 0) score -= 25; // No income

    return Math.max(0, Math.min(100, score));
}

export function applyInferences(stats: Stats): Stats {
    const inferredJob = inferJobFromIncome(stats.income);
    const inferredMoney = inferFinancialSituation(stats);

    return {
        ...stats,
        job: inferredJob,
        money: inferredMoney,
    };
}
