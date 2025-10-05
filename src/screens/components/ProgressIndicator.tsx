
export default function ProgressIndicator({ years = 0, percent = 0 }) {
    return <div className="progress-indicator">
        <div className="progress-indicator--header">Tomek, {years} lata</div>
        <div className="progress-indicator--progressbar">
            <div className="progress-indicator--progress" style={{ width: `${percent}%` }}></div>
        </div>
    </div>
}