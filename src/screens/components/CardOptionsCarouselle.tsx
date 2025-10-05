import { useEffect, useState, useCallback } from "react";
import type React from "react";
import { Option } from "../../types/Event";
import { Stats } from "../../types/Stats";
import GeneratedText from "../../components/GeneratedText";

function getIcon(consequences: Option["consequences"]): string {
    const icons: Partial<Record<keyof Stats, [string, string]>> = {
        health: ['shield-half-outline', 'pulse-outline'],
        relations: ['heart-half-outline', 'water-outline'],
        happiness: ['happy-outline', 'sad-outline'],
        money: ['cash-outline', 'wallet-outline'],
        income: ['trending-up-outline', 'trending-down-outline'],
        expenses: ['trending-down-outline', 'trending-up-outline'],
        savings: ['wallet-outline', 'cash-outline'],
        ZUS: ['business-outline', 'business-outline'],
        job_experience: ['briefcase-outline', 'briefcase-outline'],
        children: ['accessibility-outline', 'balloon-outline'],
    }

    for (const consequence of consequences) {
        if (typeof consequence.value !== "number") continue;
        if (consequence.impacted in icons) {
            const icon = icons[consequence.impacted]?.[consequence.value > 0 ? 0 : 1];

            if (icon) return icon;
        }
    }

    return "information-outline";
}

export default function CardOptionCarouselle({ options, onOptionSelected }: { options: Option[], onOptionSelected: (option: Option) => void }) {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [animating, setAnimating] = useState(false);
    const [direction, setDirection] = useState<"next" | "prev" | null>(null);
    const [incomingIndex, setIncomingIndex] = useState<number | null>(null);

    const len = options.length;

    const goNext = useCallback(() => {
        if (animating || len <= 1) return;
        setDirection("next");
        setIncomingIndex((selectedIndex + 1) % len);
        setAnimating(true);
    }, [animating, len, selectedIndex]);

    const goPrev = useCallback(() => {
        if (animating || len <= 1) return;
        setDirection("prev");
        setIncomingIndex((selectedIndex - 1 + len) % len);
        setAnimating(true);
    }, [animating, len, selectedIndex]);

    const selectCurrent = useCallback(() => {
        if (len === 0) return;
        onOptionSelected(options[selectedIndex]);
    }, [len, onOptionSelected, options, selectedIndex]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (animating) return;
            if (e.key === "ArrowRight") {
                e.preventDefault();
                goNext();
            } else if (e.key === "ArrowLeft") {
                e.preventDefault();
                goPrev();
            } else if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                selectCurrent();
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [animating, goNext, goPrev, selectCurrent]);

    const handleAnimationEnd = () => {
        if (incomingIndex == null) return;
        setSelectedIndex(incomingIndex);
        setIncomingIndex(null);
        setDirection(null);
        setAnimating(false);
    };

    const handleViewportClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (animating) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const third = rect.width / 3;
        if (x < third) {
            goPrev();
        } else if (x > 2 * third) {
            goNext();
        } else {
            selectCurrent();
        }
    };

    // Render helpers
    const currentText = len ? options[selectedIndex]?.text : "";
    const incomingText = incomingIndex != null ? options[incomingIndex].text : "";

    return (
        <div className="event-card--option-carouselle">
            <div className="carousel-viewport" onClick={handleViewportClick}>
                {!animating && (
                    <div className="carousel-item current">
                        {/** @ts-ignore */}
                        <ion-icon style={{ fontSize: 100 }}  name={getIcon(options[selectedIndex]?.consequences)}></ion-icon>
                        <p style={{ fontSize: 13 }}><GeneratedText>{currentText}</GeneratedText></p>
                    </div>
                )}
                {animating && direction === "next" && (
                    <>
                        <div className="carousel-item exit exit-next">
                            {/** @ts-ignore */}
                            <ion-icon style={{ fontSize: 100 }}  name={getIcon(options[selectedIndex]?.consequences)}></ion-icon>
                            <p style={{ fontSize: 13 }}><GeneratedText>{currentText}</GeneratedText></p>
                        </div>
                        <div className="carousel-item enter enter-next" onAnimationEnd={handleAnimationEnd}>
                            {/* {incomingText} */}
                        </div>
                    </>
                )}
                {animating && direction === "prev" && (
                    <>
                        <div className="carousel-item exit exit-prev">
                            {/** @ts-ignore */}
                            <ion-icon style={{ fontSize: 100 }} name={getIcon(options[selectedIndex]?.consequences)}></ion-icon>
                            <p style={{ fontSize: 13 }}><GeneratedText>{currentText}</GeneratedText></p>
                        </div>
                        <div className="carousel-item enter enter-prev" onAnimationEnd={handleAnimationEnd}>
                            {/* {incomingText} */}
                        </div>
                    </>
                )}
            </div>
            <div className="carousel-controls">
                <button onClick={goPrev} disabled={animating}>
                    {/** @ts-ignore */}
                    <ion-icon name="chevron-back-outline"></ion-icon>
                </button>
                <button onClick={goNext} disabled={animating}>
                    {/** @ts-ignore */}
                    <ion-icon  name="chevron-forward-outline"></ion-icon>
                </button>
            </div>
        </div>
    );
}