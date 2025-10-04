export interface Stats {
    health: Number
    relations: Number
    happiness: Number
    money: Number

    education: Number
    job_experience: Number
    savings: Number
    ZUS: Number

    job: "low_paid_job" | "middle_paid_job" | "high_paid_job"

    has_serious_health_issues: boolean

    wife: string
}