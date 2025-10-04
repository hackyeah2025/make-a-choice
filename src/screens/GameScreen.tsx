import CardStack from "./components/CardStack";
import ExpandableStatsHeader from "./components/ExpandableStatsHeader";
import ProgressIndicator from "./components/ProgressIndicator";

export default function GameScreen() {

    return <div style={{ backgroundColor: "white", minHeight: "100vh" }}>
        <ExpandableStatsHeader />
        <CardStack />
        <ProgressIndicator />
    </div>
}