export default function ProgressIndicator() {
    return <div className="progress-indicator">
        <div className="progress-indicator--header">Tomek, 42 lata</div>
        <div className="progress-indicator--progressbar">
            <div className="progress-indicator--progress" style={{ width: "50%" }}></div>
        </div>
    </div>
}