import React, { useState, useEffect, useRef } from "react";
import "./CustomDropdown.css";

interface CustomDropdownProps {
    value: any;
    onChange: (value: any) => void;
    options: { value: any; label: string }[];
    placeholder?: string;
}

export default function CustomDropdown({
    value,
    onChange,
    options,
    placeholder = "Wybierz opcję"
}: CustomDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const selectedOption = options.find(opt => opt.value === value);

    return (
        <div className="custom-dropdown" ref={dropdownRef}>
            <div
                className={`custom-dropdown-trigger ${isOpen ? 'open' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <span>{selectedOption ? selectedOption.label : placeholder}</span>
                <span className={`custom-dropdown-arrow ${isOpen ? 'open' : ''}`}>▼</span>
            </div>
            <div className={`custom-dropdown-menu ${isOpen ? 'open' : ''}`}>
                {options.map((option) => (
                    <div
                        key={String(option.value)}
                        className="custom-dropdown-option"
                        onClick={() => {
                            onChange(option.value);
                            setIsOpen(false);
                        }}
                    >
                        {option.label}
                    </div>
                ))}
            </div>
        </div>
    );
}
