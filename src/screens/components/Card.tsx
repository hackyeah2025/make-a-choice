import { Event, Option } from "../../types/Event"
import CardOptionCarouselle from "./CardOptionsCarouselle"

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
    const iconColor = generateVibrantColor(iconName);

    return <div className="event-card">
        <div className="event-card--icon" style={{ backgroundColor: iconColor }}>
            {/** @ts-ignore */}
            <ion-icon name={iconName}></ion-icon>
        </div>
        <div className="event-card--content">
            {event.text}
        </div>
        <CardOptionCarouselle options={event.options} onOptionSelected={onCardAnswered} />
    </div>
}