import React from 'react';
import Icon from '../../components/Icon';
import './StatusChangeModal.css';

interface StatChange {
    stat: string;
    icon: string;
    oldValue: number | string;
    newValue: number | string;
    change?: number;
    isStringChange?: boolean;
}

interface StatusChangeModalProps {
    isOpen: boolean;
    changes: StatChange[];
    onClose: () => void;
}

export default function StatusChangeModal({ isOpen, changes, onClose }: StatusChangeModalProps) {
    if (!isOpen) return null;

    // Filter out changes that are 0 or no change for strings
    const significantChanges = changes.filter(change => {
        if (change.isStringChange) {
            return change.oldValue !== change.newValue;
        }
        return change.change !== 0;
    });

    if (significantChanges.length === 0) {
        return null;
    }

    const getChangeColor = (change: number | undefined) => {
        if (!change) return '#007834'; // Default color for string changes
        if (change > 0) return '#007834'; // Green for positive
        if (change < 0) return '#d32f2f'; // Red for negative
        return '#666'; // Gray for no change
    };

    const getChangeSymbol = (change: number | undefined) => {
        if (!change) return '';
        if (change > 0) return '+';
        if (change < 0) return '';
        return '';
    };

    const formatValue = (value: number | string) => {
        if (typeof value === 'string') {
            // Translate common string values to Polish
            const translations: Record<string, string> = {
                'unemployed': 'Bezrobotny',
                'low_paid_job': 'Nisko płatna praca',
                'middle_paid_job': 'Średnio płatna praca',
                'high_paid_job': 'Wysoko płatna praca',
                'primary_school': 'Podstawowa',
                'job_school': 'Zawodowa',
                'high_school': 'Średnia',
                'university': 'Wyższa',
                'single': 'Singiel',
                'in_a_relationship': 'W związku',
                'married': 'Żonaty/Zamężna',
                'divorced': 'Rozwiedziony/a',
                'Brak': 'Brak'
            };
            return translations[value] || value;
        }

        // Format large numbers nicely
        if (typeof value === 'number' && value >= 1000) {
            return new Intl.NumberFormat('pl-PL').format(value);
        }

        return value;
    };

    const getStatLabel = (stat: string) => {
        const labels: Record<string, string> = {
            'health': 'Zdrowie',
            'relations': 'Relacje',
            'happiness': 'Szczęście',
            'money': 'Pieniądze',
            'income': 'Dochody',
            'expenses': 'Wydatki',
            'savings': 'Oszczędności',
            'job_experience': 'Doświadczenie',
            'children': 'Dzieci',
            'education': 'Wykształcenie',
            'job': 'Praca',
            'job_name': 'Stanowisko',
            'relationship': 'Związek',
            'health_issues': 'Problemy zdrowotne'
        };
        return labels[stat] || stat;
    };

    return (
        <div className="status-change-modal-backdrop">
            <div className="status-change-modal">
                <h3 className="status-change-title">Zmiany w statystykach</h3>

                <div className="status-changes-grid">
                    {significantChanges.map((change, index) => (
                        <div key={index} className="status-change-item">
                            <div className="status-change-icon-label">
                                <Icon
                                    name={change.icon}
                                    size={24}
                                    color="#007834"
                                />
                                <span className="status-change-stat-name">
                                    {getStatLabel(change.stat)}
                                </span>
                            </div>

                            <div className="status-change-values">
                                <div className="status-change-old">{formatValue(change.oldValue)}</div>
                                <div className="status-change-arrow">→</div>
                                <div className="status-change-new">{formatValue(change.newValue)}</div>
                            </div>

                            {!change.isStringChange && change.change !== undefined && (
                                <div
                                    className="status-change-delta"
                                    style={{ color: getChangeColor(change.change) }}
                                >
                                    {getChangeSymbol(change.change)}{change.change}
                                </div>
                            )}

                            {change.isStringChange && (
                                <div className="status-change-label">
                                    Zmiana
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
