import { useState, Fragment } from "react";
import useStats from "../../hooks/useStats";

function GenderIcon() {
    return (
        /**@ts-ignore */
        <div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "128px",
                }}
            >
                <div
                    style={{
                        background: "#fff",
                        borderRadius: "50%",
                        display: "grid",
                        placeItems: "center",
                        aspectRatio: 1,
                        width: "128px",
                    }}
                >
                    {/**@ts-ignore */}
                    <ion-icon
                        style={{ fontSize: "128px", color: "#000" }}
                        name="person-circle-outline"
                    /**@ts-ignore */
                    ></ion-icon>
                </div>
                <div
                    style={{
                        background: "#fff",
                        paddingTop: "64px",
                        marginTop: "-64px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "end",
                        paddingBottom: "8px",
                        borderBottomLeftRadius: "16px",
                        borderBottomRightRadius: "16px",
                    }}
                >
                    {/**@ts-ignore */}
                    <ion-icon
                        style={{ fontSize: "48px", color: "#000" }}
                        name="woman-outline"
                    /**@ts-ignore */
                    ></ion-icon>
                    {/**@ts-ignore */}
                    <ion-icon
                        style={{ fontSize: "32px", color: "#000", marginLeft: -12 }}
                        name="man-outline"
                    /**@ts-ignore */
                    ></ion-icon>
                    {/**@ts-ignore */}
                    <ion-icon
                        style={{ fontSize: "32px", color: "#000", marginLeft: -12 }}
                        name="man-outline"
                    /**@ts-ignore */
                    ></ion-icon>
                </div>
            </div>
        </div>
    );
}

function Table({ entries }: { entries: [string, any][] }) {
    return (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", color: "white", padding: "25px 0" }}>
            {entries.map(([key, value], index) => (
                <div key={index} style={{ display: "contents" }}>
                    <div style={{ padding: "8px", borderBottom: index < entries.length - 1 ? "2px solid white" : "none", display: "flex", alignItems: "center", justifyContent: "center" }}>{key}</div>
                    <div style={{ padding: "8px", borderBottom: index < entries.length - 1 ? "2px solid white" : "none", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                        <span style={{ position: "absolute", left: "0%", top: "25%", width: "2px", height: "50%", backgroundColor: "white" }}></span>
                        {value}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default function ExpandableStatsHeader() {
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
                    height: isExpanded ? "80vh" : "10vh",
                    transition: "height 0.3s",
                    position: "relative",
                    pointerEvents: "all",
                }}
            >
                <div style={{ display: "flex", height: "80vh", width: "100%", position: "absolute", bottom: 32 }}>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(3, 1fr)",
                            gap: "8px",
                        }}
                    >
                        <Table entries={[["Zdrowie", stats.health], ["Relacje", stats.relations], ["Szczęście", stats.happiness], ["Pieniądze", stats.money]]} />
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-around" }}>
                            <GenderIcon />
                            <h2 style={{ color: "white", marginTop: "2rem", fontSize: "2rem" }}>
                                Tomek Jabłkoński
                            </h2>
                        </div>
                        <Table entries={[["Wiek", stats.age], ["Edukacja", stats.education], ["Doświadczenie", stats.job_experience], ["Zawód", stats.job], ["Nazwa zawodu", stats.job_name]]} />
                    </div>
                </div>

                <div
                    className="expandable-stats-header--toggle"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
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