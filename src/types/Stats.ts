

export interface Stats {
    age: Number

    health: Number // 0-100
    relations: Number // 0-100
    happiness: Number // 0-100
    money: Number // 0-100

    income: Number // 0 - 1_000_000
    expenses: Number // 0 - 1_000_000
    savings: Number // 0 - 100_000_000
    ZUS: Number // 0 - 1_000_000

    education: "primary_school" | "job_school" | "high_school" | "university"
    job_experience: Number // 0 - 100

    job: "unemployed" | "low_paid_job" | "middle_paid_job" | "high_paid_job"
    job_name: String

    has_serious_health_issues: boolean // true or false

    relationship: "single" | "in_a_relationship" | "married" | "divorced"
    children: Number // 0 - 10
}

export const StatsToIcons = {
    health: "heart",
    relations: "people",
    happiness: "happy",
    money: "cash",
    age: "calendar",
    income: "trending-up",
    expenses: "trending-down",
    savings: "wallet",
    ZUS: "business",
    education: "school",
    job_experience: "briefcase",
    job: "laptop",
    has_serious_health_issues: "medkit",
    relationship: "heart-half",
    children: "baby"
}