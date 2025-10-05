import React, { useMemo, useState, useEffect } from "react";
import useStats from "../hooks/useStats";
import { Stats } from "../types/Stats";
import CustomDropdown from "../components/CustomDropdown";
import CustomCheckbox from "../components/CustomCheckbox";
import "./InitialFormScreen.css";
import { generateAvatar } from "../Storage/StatsStorage";

// Prosty kreator: jedno pytanie na krok, pytania po polsku
export default function InitialFormScreen({ onComplete }: { onComplete?: () => void }) {
    const { stats, setStats } = useStats();
    const [step, setStep] = useState(0);
    const [completed, setCompleted] = useState(false);

    type Step = {
        key: keyof Stats;
        label: string;
        type: "text" | "number" | "select" | "boolean";
        min?: number;
        max?: number;
        options?: { value: any; label: string }[];
        placeholder?: string;
    };

    const steps: Step[] = useMemo(
        () => [
            { key: "name", label: "Jak masz na imię?", type: "text", placeholder: "Np. Jan" },
            { key: "age", label: "Ile masz lat?", type: "number", min: 0, max: 120 },

            {
                key: "relationship",
                label: "Jaki jest Twój status związku?",
                type: "select",
                options: [
                    { value: "single", label: "Singiel/Singielka" },
                    { value: "in_a_relationship", label: "W związku" },
                    { value: "married", label: "Małżeństwo" },
                    { value: "divorced", label: "Po rozwodzie" },
                ],
            },
            { key: "children", label: "Ile masz dzieci?", type: "number", min: 0, max: 10 },

            {
                key: "education",
                label: "Jakie masz wykształcenie?",
                type: "select",
                options: [
                    { value: "primary_school", label: "Szkoła podstawowa" },
                    { value: "job_school", label: "Szkoła zawodowa" },
                    { value: "high_school", label: "Liceum/Technikum" },
                    { value: "university", label: "Studia" },
                ],
            },

            { key: "job_name", label: "Jaki jest Twój zawód / stanowisko? (jeśli dotyczy)", type: "text", placeholder: "Np. Programista" },
            { key: "job_experience", label: "Ile masz lat doświadczenia zawodowego?", type: "number", min: 0, max: 100 },

            { key: "income", label: "Miesięczny dochód (PLN)", type: "number", min: 0, max: 1_000_000 },
            { key: "expenses", label: "Miesięczne wydatki (PLN)", type: "number", min: 0, max: 1_000_000 },
            {
                key: "savings",
                label: "Oszczędności",
                type: "select",
                options: [
                    { value: 0, label: "Brak oszczędności" },
                    { value: 2500, label: "Do 5 000 PLN" },
                    { value: 7500, label: "5 000 - 10 000 PLN" },
                    { value: 15000, label: "10 000 - 20 000 PLN" },
                    { value: 35000, label: "20 000 - 50 000 PLN" },
                    { value: 75000, label: "50 000 - 100 000 PLN" },
                    { value: 150000, label: "100 000 - 200 000 PLN" },
                    { value: 350000, label: "200 000 - 500 000 PLN" },
                    { value: 750000, label: "500 000 - 1 000 000 PLN" },
                    { value: 2000000, label: "Powyżej 1 000 000 PLN" },
                ],
            },
            {
                key: "ZUS",
                label: "Składka ZUS (miesięcznie)",
                type: "select",
                options: [
                    { value: 0, label: "Nie płacę ZUS" },
                    { value: 350, label: "Do 500 PLN" },
                    { value: 650, label: "500 - 800 PLN" },
                    { value: 950, label: "800 - 1 100 PLN" },
                    { value: 1300, label: "1 100 - 1 500 PLN" },
                    { value: 1750, label: "1 500 - 2 000 PLN" },
                    { value: 2500, label: "Powyżej 2 000 PLN" },
                ],
            },

            { key: "has_serious_health_issues", label: "Czy masz poważne problemy zdrowotne?", type: "boolean" },
        ],
        []
    );

    const total = steps.length;
    const current = steps[step];

    function clamp(n: number, min?: number, max?: number) {
        if (typeof n !== "number" || Number.isNaN(n)) return n;
        if (typeof min === "number" && n < min) return min;
        if (typeof max === "number" && n > max) return max;
        return n;
    }

    function toDisplayValue(key: keyof Stats) {
        const v = (stats as any)[key];
        if (typeof v === "boolean") return v;
        if (typeof v === "number") return v;
        if (v == null) return "";
        return String(v);
    }

    function updateValue(key: keyof Stats, raw: any) {
        let next: any = raw;
        // Parsowanie w zależności od typu pytania
        const stepDef = steps.find((s) => s.key === key)!;
        if (stepDef.type === "number") {
            const parsed = typeof raw === "string" && raw.trim() === "" ? NaN : Number(raw);
            next = clamp(parsed, stepDef.min, stepDef.max);
        } else if (stepDef.type === "boolean") {
            next = Boolean(raw);
        } else if (stepDef.type === "select" || stepDef.type === "text") {
            next = raw;
        }

        const newStats = { ...(stats as Stats), [key]: next } as Stats;
        const avatar = generateAvatar(newStats?.age ?? 20);
        const newStatsWithAvatar = { ...newStats, avatar_life_stage: avatar.stage, avatar_sex: avatar.sex, avatar_variant: avatar.variant } as Stats;
        setStats(newStats);
    }

    function handleNext() {
        if (step < total - 1) {
            setStep((s) => s + 1);
        } else {
            setCompleted(true);
            // Call onComplete callback after a short delay to show completion message
            setTimeout(() => {
                onComplete?.();
            }, 1500);
        }
    }

    function handleBack() {
        if (step > 0) setStep((s) => s - 1);
    }

    // Handle Enter key press
    useEffect(() => {
        function handleKeyPress(event: KeyboardEvent) {
            if (event.key === 'Enter') {
                handleNext();
            }
        }

        document.addEventListener('keydown', handleKeyPress);
        return () => document.removeEventListener('keydown', handleKeyPress);
    }, [step, total]);

    if (completed) {
        onComplete?.();
    }

    return (
        <div className="initial-form-container">
            <div className="initial-form-card">
                <div className="initial-form-header">
                    <span className="initial-form-step">Krok {step + 1} z {total}</span>
                </div>
                <h2 style={{ marginTop: 0 }}>{current.label}</h2>

                {/* Pole wejściowe zmieniane w zależności od typu */}
                <div style={{ marginTop: 12 }}>
                    {current.type === "text" && (
                        <input
                            type="text"
                            value={toDisplayValue(current.key) as string}
                            onChange={(e) => updateValue(current.key, e.target.value)}
                            placeholder={current.placeholder}
                            className="initial-form-input"
                            autoFocus
                        />
                    )}

                    {current.type === "number" && (
                        <input
                            type="number"
                            value={toDisplayValue(current.key) as number}
                            onChange={(e) => updateValue(current.key, e.target.value)}
                            min={current.min}
                            max={current.max}
                            className="initial-form-input"
                            autoFocus
                        />
                    )}

                    {current.type === "select" && (
                        <CustomDropdown
                            value={toDisplayValue(current.key)}
                            onChange={(value) => updateValue(current.key, value)}
                            options={current.options || []}
                            placeholder="Wybierz opcję"
                        />
                    )}

                    {current.type === "boolean" && (
                        <CustomCheckbox
                            checked={Boolean(toDisplayValue(current.key))}
                            onChange={(checked) => updateValue(current.key, checked)}
                            label="Tak"
                        />
                    )}
                </div>

                <div className="initial-form-actions">
                    <button
                        onClick={handleBack}
                        disabled={step === 0}
                        className="initial-form-button-secondary"
                    >
                        Wstecz
                    </button>
                    <button
                        onClick={handleNext}
                        className="initial-form-button-primary"
                    >
                        {step === total - 1 ? "Zakończ" : "Dalej"}
                    </button>
                </div>
            </div>
        </div>
    );
}