import { useEffect } from "react"
import { Event, Option } from "../../types/Event"
import CardOptionCarouselle from "./CardOptionsCarouselle"

// Helper to turn "hsl(H, S%, L%)" into "hsla(H, S%, L%, A)"
function toHSLA(hsl: string, alpha: number): string {
    return hsl.replace("hsl(", "hsla(").replace(")", `, ${alpha})`)
}

type Props = {
    event: Event
    onCardAnswered: (option: Option) => void
    iconName: string
}

// Function to generate vibrant colors based on icon name
function generateVibrantColor(iconName: string): string {
    // Create a hash from the icon name
    let hash = 0;
    for (let i = 0; i < iconName.length; i++) {
        const char = iconName.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }

    // Use the hash to generate vibrant HSL values
    const hue = Math.abs(hash) % 360; // 0-359 degrees
    const saturation = 45 + (Math.abs(hash >> 8) % 30); // 65-94% for vibrant colors
    const lightness = 40 + (Math.abs(hash >> 16) % 20); // 45-64% for good contrast

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

export default function Card({ event, onCardAnswered, iconName }: Props) {
    const iconColor = generateVibrantColor(event.title);
    const iconColorAlt = generateVibrantColor(event.title + "abc");

    useEffect(() => {
        document.body.style.background = `radial-gradient(circle at top left, ${toHSLA(iconColor, 1)}, transparent 70%), radial-gradient(circle at bottom right, ${toHSLA(iconColorAlt, 1)}, transparent 70%)`;
    }, [event])

    return <div className="event-card animated-blob-bg" style={{}}>
        <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1vh", borderRadius: "25px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", padding: "5vh", backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
            <h2>{event.title}</h2>
            <div className="event-card--content">
                {event.text}
            </div>


            <CardOptionCarouselle options={event.options} onOptionSelected={onCardAnswered} />
        </div>
    </div >
}