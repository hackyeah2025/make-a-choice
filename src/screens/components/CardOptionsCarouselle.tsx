import { Option } from "../../types/Event";

export default function CardOptionCarouselle({ options, onOptionSelected }: { options: Option[], onOptionSelected: (index: number) => void }) {
    return <div className="event-card--option-carouselle">
        {options.map((option, index) => (
            <div key={index} className="event-card--option">
                {option.text}
            </div>
        ))}
    </div>
}