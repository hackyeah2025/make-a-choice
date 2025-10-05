import { useEffect } from "react"
import { Event, Option } from "../../types/Event"
import CardOptionCarouselle from "./CardOptionsCarouselle"
import GeneratedText from "../../components/GeneratedText"
import useStats from "../../hooks/useStats"

// Helper to turn "hsl(H, S%, L%)" into "hsla(H, S%, L%, A)"
function toHSLA(hsl: string, alpha: number): string {
    return hsl.replace("hsl(", "hsla(").replace(")", `, ${alpha})`)
}

type Props = {
    event?: Event
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
    const iconColor = generateVibrantColor(event?.title + "a");
    const iconColorAlt = generateVibrantColor(event?.title + "abc");
    const { stats } = useStats();

    return <div style={{ flex: 1, width: "min(100%, 720px)", background: '#fff', padding: "0 32px" }} className="event-card" >
        {!event && <h2>Loading...</h2>
        }
        {
            event && <><div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",

                borderRadius: "25px",
                // boxShadow: "0 4px 16px rgba(0, 120, 52, 0.1)",
                padding: "2rem",
                paddingLeft: "2.5rem",
                paddingRight: "2.5rem",
                backgroundColor: "white",
                // border: "2px solid #007834",
                color: "#007834",
                // boxShadow: "rgba(14, 63, 126, 0.06) 0px 0px 0px 1px, rgba(42, 51, 70, 0.03) 0px 1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0px 2px 2px -1px, rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px, rgba(42, 51, 70, 0.03) 0px 5px 5px -2.5px, rgba(42, 51, 70, 0.03) 0px 10px 10px -5px, rgba(42, 51, 70, 0.03) 0px 24px 24px -8px",
            }}>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.3rem",
                }}>
                    <h2 style={{ color: "#222", margin: 0, textAlign: "center" }}><GeneratedText wordDelay={0.3}>{event.title}</GeneratedText></h2>
                    <div className="event-card--content" style={{ color: "#333", textAlign: "justify" }}>
                        <GeneratedText>{event.text}</GeneratedText>
                    </div>
                </div>

            </div>

            <CardOptionCarouselle options={event.options} onOptionSelected={onCardAnswered} />
            
            <div style={{ display: 'flex', gap: 32, color: "#333", marginTop: 12 }}>
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
            </>
        }
    </div >
}