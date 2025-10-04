import { Event, Option } from "../../types/Event"
import CardOptionCarouselle from "./CardOptionsCarouselle"

type Props = {
    event: Event
    onCardAnswered: (option: Option) => void
}

export default function Card({ event, onCardAnswered }: Props) {
    return <div className="event-card">
        <div className="event-card--icon">

        </div>
        <div className="event-card--content">
            {event.text}
        </div>
        <CardOptionCarouselle options={event.options} onOptionSelected={onCardAnswered} />
    </div>
}