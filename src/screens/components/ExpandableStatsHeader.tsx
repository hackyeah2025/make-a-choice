import { useState } from "react";

export default function ExpandableStatsHeader() {
    const [isExpanded, setIsExpanded] = useState(false);

    return <div style={{
        height: "100vh", overflow: "hidden", width: "100vw", backdropFilter: `blur(${isExpanded ? 5 : 0}px)`, position: "absolute",
        top: 0,
        transition: "backdrop-filter 0.3s",
        zIndex: 1000
    }}>
        <div className="expandable-stats-header" style={{
            height: isExpanded ? "80vh" : "10vh",
            transition: "height 0.3s",
            position: "relative"
        }}>
            <div className="expandable-stats-header--toggle" onClick={() => setIsExpanded(!isExpanded)}>
                {/**@ts-ignore */}
                {isExpanded ? <ion-icon name="chevron-up-outline"></ion-icon> : <ion-icon name="chevron-down-outline"></ion-icon>}
            </div>
        </div></div>
}