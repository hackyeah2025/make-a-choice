import GeneratedText from "../../components/GeneratedText";
import useStats from "../../hooks/useStats";

export default function QuickStats() {
    const stats = useStats().stats;

    return <div style={{ display: 'flex', gap: 32, color: "#333", marginTop: 12 }}>
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
        }}>
            {/** @ts-ignore */}
            <ion-icon style={{ fontSize: 64 }} name="heart-outline"></ion-icon>
            <p><GeneratedText>{stats.health.toString()}</GeneratedText></p>
        </div>
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
        }}>
            {/** @ts-ignore */}
            <ion-icon style={{ fontSize: 64 }} name="people-outline"></ion-icon>
            <p><GeneratedText>{stats.relations.toString()}</GeneratedText></p>
        </div>
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
        }}>
            {/** @ts-ignore */}
            <ion-icon style={{ fontSize: 64 }} name="happy-outline"></ion-icon>
            <p><GeneratedText>{stats.happiness.toString()}</GeneratedText></p>
        </div>
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
        }}>
            {/** @ts-ignore */}
            <ion-icon style={{ fontSize: 64 }} name="cash-outline"></ion-icon>
            <p><GeneratedText>{stats.money.toString()}</GeneratedText></p>
        </div>
    </div>
}