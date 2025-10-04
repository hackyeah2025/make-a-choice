import React from "react";
import "./CustomCheckbox.css";

interface CustomCheckboxProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label: string;
}

export default function CustomCheckbox({
    checked,
    onChange,
    label
}: CustomCheckboxProps) {
    return (
        <label className="initial-form-checkbox-label">
            <div className="custom-checkbox">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => onChange(e.target.checked)}
                />
                <div className="custom-checkbox-box">
                    <span className="custom-checkbox-checkmark">✓</span>
                </div>
            </div>
            <span>{label}</span>
        </label>
    );
}
