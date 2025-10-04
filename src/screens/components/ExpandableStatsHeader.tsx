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
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", color: "white", padding: "25px 50px" }}>
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
  const [isExpanded, setIsExpanded] = useState(true); // TODO: change to false
  const { stats } = useStats();

    return <div style={{
        height: isExpanded ? "100vh" : "10vh",
        overflow: "hidden",
        width: "100vw",
        backdropFilter: `blur(${isExpanded ? 5 : 0}px)`,
        position: "absolute",
        top: 0,
        transition: "backdrop-filter 0.3s",
        zIndex: 1000,
        backgroundColor: isExpanded ? "rgba(255, 255, 255, 0.9)" : "transparent"
    }}>
        <div className="expandable-stats-header" style={{
            height: isExpanded ? "80vh" : "10vh",
            transition: "height 0.3s",
            position: "relative",
            backgroundColor: "#007834"
        }}>
            <div className="expandable-stats-header--toggle" onClick={() => setIsExpanded(!isExpanded)}>
                {/**@ts-ignore */}
                {isExpanded ? <ion-icon name="chevron-up-outline"></ion-icon> : <ion-icon name="chevron-down-outline"></ion-icon>}
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
