import CardStack from "./components/CardStack";
import ExpandableStatsHeader from "./components/ExpandableStatsHeader";
import ProgressIndicator from "./components/ProgressIndicator";

export default function GameScreen() {

    return <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        background: "#ebebeb",
    }}>
        <ExpandableStatsHeader />
        <CardStack />
        {/* <ProgressIndicator /> */}
    </div>
}