
export default function ProgressIndicator({ years = 0, percent = 0, name }: { years?: number, percent?: number, name?: string }) {
    return <div className="progress-indicator">
        <div className="progress-indicator--header">{name || "Gracz"}, {years} lata</div>
        <div className="progress-indicator--progressbar">
            <div className="progress-indicator--progress" style={{ width: `${percent}%` }}></div>
        </div>
    </div>
}