import { useState } from "react";
import StatsDisplay from "./StatsDisplay";
import ProgressIndicator from "./ProgressIndicator";
import useStats from "../../hooks/useStats";

export default function ExpandableStatsHeader({ years, name }: { years?: number, name?: string }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const { stats } = useStats();
    return (
        <div
            style={{
                height: "100vh",
                overflow: "hidden",
                width: "100vw",
                backdropFilter: `blur(${isExpanded ? 5 : 0}px)`,
                position: "absolute",
                top: 0,
                transition: "backdrop-filter 0.3s",
                zIndex: 1000,
                pointerEvents: "none",
            }}
        >
            <div
                className="expandable-stats-header"
                style={{
                    position: "relative",
                    pointerEvents: "all",
                    background: "white",
                }}
            >
                <div className="expandable-stats-header--content" style={{
                    height: isExpanded ? "90vh" : "0vh",
                    transition: "height 0.3s",
                    paddingTop: "10vh",
                    overflowY: "auto",
                    background: "white"
                }}>
                    <StatsDisplay stats={stats} />
                </div>

                <div
                    className="expandable-stats-header--toggle"
                    onClick={() => setIsExpanded(!isExpanded)}
                    style={{
                        position: "absolute",
                        left: "50%",
                        transform: "translateX(-50%)",
                        background: "#007834",
                        borderRadius: "0px 0px 20px 20px",
                        padding: "8px 0px",
                        border: "2px solid #007834",
                        cursor: "pointer",
                        color: "white",
                        fontSize: "20px",
                        textAlign: "center",
                        top: 0,
                        transition: "all 0.3s ease",
                    }}
                >
                    <ProgressIndicator years={years} percent={years || 0 / 65} name={name} />
                    {isExpanded ? (
                        /**@ts-ignore */
                        <ion-icon name="chevron-up-outline"></ion-icon>
                    ) : (
                        /**@ts-ignore */
                        <ion-icon name="chevron-down-outline"></ion-icon>
                    )}
                </div>
            </div>
        </div>
    );
}