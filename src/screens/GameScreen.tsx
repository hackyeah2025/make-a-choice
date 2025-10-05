import CardStack from "./components/CardStack";
import ExpandableStatsHeader from "./components/ExpandableStatsHeader";
import ProgressIndicator from "./components/ProgressIndicator";

export default function GameScreen() {

    return <div style={{ backgroundColor: "white" }}>
        <ExpandableStatsHeader />
        <CardStack />
        <ProgressIndicator percent={25} years={3}/>
    </div>
}