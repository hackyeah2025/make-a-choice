

export interface Stats {
    name: string
    age: number

    priorities: ("health" | "relations" | "happiness" | "money")[]

    health: number // 0-100
    relations: number // 0-100
    happiness: number // 0-100
    money: number // 0-100

    income: number // 0 - 1_000_000
    expenses: number // 0 - 1_000_000
    savings: number // 0 - 100_000_000
    ZUS: number // 0 - 1_000_000

    education: "primary_school" | "job_school" | "high_school" | "university"
    job_experience: number // 0 - 100

    job: "unemployed" | "low_paid_job" | "middle_paid_job" | "high_paid_job"
    job_name: string

    has_serious_health_issues: boolean // true or false

    relationship: "single" | "in_a_relationship" | "married" | "divorced"
    children: number // 0 - 10

    avatar_life_stage: "children" | "adults" | "seniors"
    avatar_sex: "male" | "female"
    avatar_variant: number
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
    children: "happy-outline"
}