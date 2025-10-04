import { useState } from "react";
import useStats from "../../hooks/useStats";

export default function ExpandableStatsHeader() {
    const [isExpanded, setIsExpanded] = useState(true); // TODO: change to false
    const stats = useStats();

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
            <div>
                <div>
                    <div style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "128px",
                }}>
                    <div style={{
                        background: "#fff",
                        borderRadius: "50%",
                        display: "grid",
                        placeItems: "center",
                        aspectRatio: 1,
                        width: "128px",
                    }}>
                        {/**@ts-ignore */}
                        <ion-icon style={{ fontSize: "128px", color: "#000" }} name="person-circle-outline"></ion-icon>
                    </div>
                    <div style={{
                        background: "#fff",
                        paddingTop: "64px",
                        marginTop: "-64px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "end",
                        paddingBottom: "8px",
                        borderBottomLeftRadius: "16px",
                        borderBottomRightRadius: "16px",
                    }}>
                        {/**@ts-ignore */}
                        <ion-icon style={{ fontSize: "48px", color: "#000" }} name="woman-outline"></ion-icon>
                        {/**@ts-ignore */}
                        <ion-icon style={{ fontSize: "32px", color: "#000", marginLeft: -12 }} name="man-outline"></ion-icon>
                        {/**@ts-ignore */}
                        <ion-icon style={{ fontSize: "32px", color: "#000", marginLeft: -12 }} name="man-outline"></ion-icon>
                    </div>
                </div>
                </div>
            </div>
            <div className="expandable-stats-header--toggle" onClick={() => setIsExpanded(!isExpanded)}>
                {/**@ts-ignore */}
                {isExpanded ? <ion-icon name="chevron-up-outline"></ion-icon> : <ion-icon name="chevron-down-outline"></ion-icon>}
            </div>
        </div></div>
}