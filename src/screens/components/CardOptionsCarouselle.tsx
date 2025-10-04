import { useEffect, useState } from "react";
import { Option } from "../../types/Event";

export default function CardOptionCarouselle({ options, onOptionSelected }: { options: Option[], onOptionSelected: (option: Option) => void }) {
    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            console.log(e.key)
            if (e.key === 'ArrowRight') {
                setSelectedIndex((prev) => (prev + 1) % options.length);
            } else if (e.key === 'ArrowLeft') {
                setSelectedIndex((prev) => (prev - 1 + options.length) % options.length);
            } else if (e.key === 'Enter' || e.key === ' ') {
                onOptionSelected(options[selectedIndex]);
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [selectedIndex, onOptionSelected, options.length])

    return <div className="event-card--option-carouselle">
        <div className="event-card--option">
            {options[selectedIndex].text}
        </div>
    </div>
}