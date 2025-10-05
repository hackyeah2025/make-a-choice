import { useState, Fragment } from "react";
import useStats from "../../hooks/useStats";
import useHistory from "../../hooks/useHistory";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, RadialBarChart, RadialBar, Legend, PieChart, Pie, Cell } from 'recharts';
import { Stats, StatsToIcons } from "../../types/Stats";

// Progress Bar Component
function ProgressBar({ label, value, max = 100, color = "#007834", icon }: {
    label: string;
    value: number;
    max?: number;
    color?: string;
    icon?: string;
}) {
    const percentage = Math.min((Number(value) / max) * 100, 100);

    return (
        <div style={{ marginBottom: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "8px", color: "#007834" }}>
                {icon && (
                    /**@ts-ignore */
                    <ion-icon name={icon} style={{ marginRight: "8px", fontSize: "20px", color: "#007834" }}></ion-icon>
                )}
                <span style={{ fontSize: "14px", fontWeight: "600" }}>{label}</span>
                <span style={{ marginLeft: "auto", fontSize: "14px", fontWeight: "bold" }}>
                    {typeof value === 'number' ? value.toLocaleString() : value}
                    {max === 100 && typeof value === 'number' && "%"}
                </span>
            </div>
            <div style={{
                width: "100%",
                height: "8px",
                backgroundColor: "rgba(0, 120, 52, 0.1)",
                borderRadius: "4px",
                overflow: "hidden"
            }}>
                <div style={{
                    width: `${percentage}%`,
                    height: "100%",
                    backgroundColor: color,
                    borderRadius: "4px",
                    transition: "width 0.3s ease"
                }} />
            </div>
        </div>
    );
}

// Stat Card Component
function StatCard({ title, value, icon, color = "#007834", subtitle }: {
    title: string;
    value: string | number;
    icon?: string;
    color?: string;
    subtitle?: string;
}) {
    return (
        <div style={{
            background: "white",
            borderRadius: "15px",
            padding: "20px",
            border: "2px solid #007834",
            textAlign: "center",
            boxShadow: "0 4px 16px rgba(0, 120, 52, 0.1)",
            transition: "all 0.3s ease"
        }}>
            {icon && (
                /**@ts-ignore */
                <ion-icon name={icon} style={{ fontSize: "32px", color, marginBottom: "8px" }}></ion-icon>
            )}
            <div style={{ color: "#007834", fontSize: "24px", fontWeight: "bold", marginBottom: "4px" }}>
                {typeof value === 'number' ? value.toLocaleString() : value}
            </div>
            <div style={{ color: "#007834", fontSize: "12px", fontWeight: "600" }}>
                {title}
            </div>
            {subtitle && (
                <div style={{ color: "rgba(0, 120, 52, 0.7)", fontSize: "10px", marginTop: "4px" }}>
                    {subtitle}
                </div>
            )}
        </div>
    );
}

// Financial Overview Component
function FinancialOverview({ stats }: { stats: Stats }) {
    const data = [
        { name: 'Przychody', value: Number(stats.income), color: '#4CAF50' },
        { name: 'Wydatki', value: Number(stats.expenses), color: '#F44336' },
        { name: 'ZUS', value: Number(stats.ZUS), color: '#FF9800' },
    ];

    return (
        <div style={{ height: "200px", width: "100%" }}>
            <h3 style={{ color: "#007834", textAlign: "center", marginBottom: "16px", fontSize: "16px", fontWeight: "600" }}>
                Przegląd Finansowy
            </h3>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 120, 52, 0.2)" />
                    <XAxis dataKey="name" tick={{ fill: '#007834', fontSize: 12 }} />
                    <YAxis tick={{ fill: '#007834', fontSize: 12 }} />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'white',
                            border: '2px solid #007834',
                            borderRadius: '8px',
                            color: '#007834'
                        }}
                    />
                    <Bar dataKey="value" fill="#007834" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

// Life Balance Radar Component
function LifeBalance({ stats }: { stats: Stats }) {
    const data = [
        { name: 'Zdrowie', value: Number(stats.health) },
        { name: 'Relacje', value: Number(stats.relations) },
        { name: 'Szczęście', value: Number(stats.happiness) },
        { name: 'Finanse', value: Number(stats.money) },
    ];

    const COLORS = ['#007834', '#005a28', '#20c997', '#6f42c1'];

    return (
        <div style={{ height: "200px", width: "100%" }}>
            <h3 style={{ color: "#007834", textAlign: "center", marginBottom: "16px", fontSize: "16px", fontWeight: "600" }}>
                Równowaga Życiowa
            </h3>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={70}
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'white',
                            border: '2px solid #007834',
                            borderRadius: '8px',
                            color: '#007834'
                        }}
                    />
                    <Legend
                        wrapperStyle={{ color: '#007834', fontSize: '12px' }}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}

// Progress Over Time Component
function ProgressOverTime() {
    const { history } = useHistory();

    if (history.length === 0) {
        return (
            <div style={{ height: "200px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <p style={{ color: "rgba(0, 120, 52, 0.6)", textAlign: "center" }}>
                    Brak danych historycznych<br />
                    <small>Graj dalej, aby zobaczyć swój progres</small>
                </p>
            </div>
        );
    }

    const progressData = history.slice(-10).map((item, index) => ({
        turn: index + 1,
        health: Number(item.stats.health),
        relations: Number(item.stats.relations),
        happiness: Number(item.stats.happiness),
        money: Number(item.stats.money),
    }));

    return (
        <div style={{ height: "200px", width: "100%" }}>
            <h3 style={{ color: "#007834", textAlign: "center", marginBottom: "16px", fontSize: "16px", fontWeight: "600" }}>
                Progres w Czasie (ostatnie 10 ruchów)
            </h3>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={progressData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 120, 52, 0.2)" />
                    <XAxis dataKey="turn" tick={{ fill: '#007834', fontSize: 12 }} />
                    <YAxis domain={[0, 100]} tick={{ fill: '#007834', fontSize: 12 }} />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'white',
                            border: '2px solid #007834',
                            borderRadius: '8px',
                            color: '#007834'
                        }}
                    />
                    <Line type="monotone" dataKey="health" stroke="#007834" strokeWidth={2} dot={{ r: 3 }} />
                    <Line type="monotone" dataKey="relations" stroke="#005a28" strokeWidth={2} dot={{ r: 3 }} />
                    <Line type="monotone" dataKey="happiness" stroke="#20c997" strokeWidth={2} dot={{ r: 3 }} />
                    <Line type="monotone" dataKey="money" stroke="#6f42c1" strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

function Table({ entries }: { entries: [string, any][] }) {
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            padding: "16px",
            background: "white",
            borderRadius: "15px",
            border: "2px solid #007834",
            boxShadow: "0 4px 16px rgba(0, 120, 52, 0.1)"
        }}>
            {entries.map(([key, value], index) => (
                <div key={index} style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "8px 0",
                    borderBottom: index < entries.length - 1 ? "1px solid rgba(0, 120, 52, 0.2)" : "none"
                }}>
                    <span style={{ color: "#007834", fontSize: "14px", fontWeight: "500" }}>{key}</span>
                    <span style={{ color: "#007834", fontSize: "14px", fontWeight: "bold" }}>
                        {typeof value === 'number' ? value.toLocaleString() : value}
                    </span>
                </div>
            ))}
        </div>
    )
}

// Avatar Component
function Avatar() {
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "20px"
        }}>
            <div
                style={{
                    background: "white",
                    borderRadius: "50%",
                    display: "grid",
                    placeItems: "center",
                    width: "120px",
                    height: "120px",
                    border: "4px solid #007834",
                    boxShadow: "0 8px 32px rgba(0, 120, 52, 0.2)"
                }}
            >
                {/**@ts-ignore */}
                <ion-icon
                    style={{ fontSize: "64px", color: "#007834" }}
                    name="person-outline"
                /**@ts-ignore */
                ></ion-icon>
            </div>
            <h2 style={{
                color: "#007834",
                marginTop: "16px",
                fontSize: "24px",
                fontWeight: "600",
                textAlign: "center",
                textShadow: "0 2px 4px rgba(0, 120, 52, 0.1)"
            }}>
                Tomek Jabłkoński
            </h2>
        </div>
    );
}

export default function ExpandableStatsHeader() {
    const [isExpanded, setIsExpanded] = useState(false);
    const { stats } = useStats();

    const formatEducation = (education: string) => {
        const educationMap = {
            'primary_school': 'Podstawowe',
            'job_school': 'Zawodowe',
            'high_school': 'Średnie',
            'university': 'Wyższe'
        };
        return educationMap[education as keyof typeof educationMap] || education;
    };

    const formatJob = (job: string) => {
        const jobMap = {
            'unemployed': 'Bezrobotny',
            'low_paid_job': 'Nisko płatna',
            'middle_paid_job': 'Średnio płatna',
            'high_paid_job': 'Wysoko płatna'
        };
        return jobMap[job as keyof typeof jobMap] || job;
    };

    const formatRelationship = (relationship: string) => {
        const relationshipMap = {
            'single': 'Singiel',
            'in_a_relationship': 'W związku',
            'married': 'Żonaty/Zamężna',
            'divorced': 'Rozwiedziony/a'
        };
        return relationshipMap[relationship as keyof typeof relationshipMap] || relationship;
    };

    return (
        <div
            style={{
                height: "100vh",
                overflow: "hidden",
                width: "100vw",
                backdropFilter: `blur(${isExpanded ? 5 : 0}px)`,
                position: "absolute",
                top: 0,
                transition: "backdrop-filter 0.3s",
                zIndex: 1000,
                pointerEvents: "none",
            }}
        >
            <div
                className="expandable-stats-header"
                style={{
                    height: isExpanded ? "95vh" : "10vh",
                    transition: "height 0.3s",
                    position: "relative",
                    pointerEvents: "all",
                    background: isExpanded ? "white" : "transparent",
                }}
            >
                {isExpanded && (
                    <div style={{
                        height: "calc(95vh - 60px)",
                        width: "100%",
                        padding: "20px",
                        overflowY: "auto",
                        background: "white"
                    }}>
                        {/* Header Section */}
                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 300px 1fr",
                            gap: "20px",
                            marginBottom: "30px"
                        }}>
                            {/* Left Column - Core Stats */}
                            <div>
                                <h3 style={{ color: "#007834", marginBottom: "20px", fontSize: "18px", fontWeight: "600" }}>
                                    Główne Statystyki
                                </h3>
                                <ProgressBar
                                    label="Zdrowie"
                                    value={Number(stats.health)}
                                    color="#007834"
                                    icon={StatsToIcons.health}
                                />
                                <ProgressBar
                                    label="Relacje"
                                    value={Number(stats.relations)}
                                    color="#005a28"
                                    icon={StatsToIcons.relations}
                                />
                                <ProgressBar
                                    label="Szczęście"
                                    value={Number(stats.happiness)}
                                    color="#20c997"
                                    icon={StatsToIcons.happiness}
                                />
                                <ProgressBar
                                    label="Pieniądze"
                                    value={Number(stats.money)}
                                    color="#6f42c1"
                                    icon={StatsToIcons.money}
                                />
                            </div>

                            {/* Center Column - Avatar */}
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <Avatar />
                            </div>

                            {/* Right Column - Personal Info */}
                            <div>
                                <h3 style={{ color: "#007834", marginBottom: "20px", fontSize: "18px", fontWeight: "600" }}>
                                    Informacje Osobiste
                                </h3>
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                                    <StatCard
                                        title="Wiek"
                                        value={Number(stats.age)}
                                        icon={StatsToIcons.age}
                                        color="#007834"
                                    />
                                    <StatCard
                                        title="Dzieci"
                                        value={Number(stats.children)}
                                        icon={StatsToIcons.children}
                                        color="#005a28"
                                    />
                                    <StatCard
                                        title="Edukacja"
                                        value={formatEducation(stats.education)}
                                        icon={StatsToIcons.education}
                                        color="#20c997"
                                    />
                                    <StatCard
                                        title="Doświadczenie"
                                        value={`${Number(stats.job_experience)} lat`}
                                        icon={StatsToIcons.job_experience}
                                        color="#6f42c1"
                                    />
                                </div>
                                <div style={{ marginTop: "12px" }}>
                                    <StatCard
                                        title="Status związku"
                                        value={formatRelationship(stats.relationship)}
                                        icon={StatsToIcons.relationship}
                                        color="#007834"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Financial Section */}
                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr 1fr 1fr",
                            gap: "12px",
                            marginBottom: "30px"
                        }}>
                            <StatCard
                                title="Dochód miesięczny"
                                value={`${Number(stats.income).toLocaleString()} zł`}
                                icon={StatsToIcons.income}
                                color="#007834"
                            />
                            <StatCard
                                title="Wydatki miesięczne"
                                value={`${Number(stats.expenses).toLocaleString()} zł`}
                                icon={StatsToIcons.expenses}
                                color="#dc3545"
                            />
                            <StatCard
                                title="Oszczędności"
                                value={`${Number(stats.savings).toLocaleString()} zł`}
                                icon={StatsToIcons.savings}
                                color="#007834"
                            />
                            <StatCard
                                title="ZUS miesięcznie"
                                value={`${Number(stats.ZUS).toLocaleString()} zł`}
                                icon={StatsToIcons.ZUS}
                                color="#ffc107"
                            />
                        </div>

                        {/* Job Section */}
                        <div style={{ marginBottom: "30px" }}>
                            <div style={{
                                display: "grid",
                                gridTemplateColumns: "1fr 2fr",
                                gap: "12px"
                            }}>
                                <StatCard
                                    title="Typ pracy"
                                    value={formatJob(stats.job)}
                                    icon={StatsToIcons.job}
                                    color="#007834"
                                />
                                <StatCard
                                    title="Stanowisko"
                                    value={String(stats.job_name) || "Brak"}
                                    color="#005a28"
                                    subtitle={stats.has_serious_health_issues ? "⚠️ Problemy zdrowotne" : "✅ Zdrowy"}
                                />
                            </div>
                        </div>

                        {/* Charts Section */}
                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr 1fr",
                            gap: "20px",
                            marginBottom: "20px"
                        }}>
                            <div style={{
                                background: "white",
                                borderRadius: "15px",
                                padding: "16px",
                                border: "2px solid #007834",
                                boxShadow: "0 4px 16px rgba(0, 120, 52, 0.1)"
                            }}>
                                <FinancialOverview stats={stats} />
                            </div>

                            <div style={{
                                background: "white",
                                borderRadius: "15px",
                                padding: "16px",
                                border: "2px solid #007834",
                                boxShadow: "0 4px 16px rgba(0, 120, 52, 0.1)"
                            }}>
                                <LifeBalance stats={stats} />
                            </div>

                            <div style={{
                                background: "white",
                                borderRadius: "15px",
                                padding: "16px",
                                border: "2px solid #007834",
                                boxShadow: "0 4px 16px rgba(0, 120, 52, 0.1)"
                            }}>
                                <ProgressOverTime />
                            </div>
                        </div>
                    </div>
                )}

                <div
                    className="expandable-stats-header--toggle"
                    onClick={() => setIsExpanded(!isExpanded)}
                    style={{
                        position: "absolute",
                        bottom: "16px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        background: "white",
                        borderRadius: "20px",
                        padding: "8px 16px",
                        border: "2px solid #007834",
                        cursor: "pointer",
                        color: "#007834",
                        fontSize: "20px",
                        transition: "all 0.3s ease",
                        boxShadow: "0 4px 16px rgba(0, 120, 52, 0.2)"
                    }}
                >
                    {isExpanded ? (
                        /**@ts-ignore */
                        <ion-icon name="chevron-up-outline"></ion-icon>
                    ) : (
                        /**@ts-ignore */
                        <ion-icon name="chevron-down-outline"></ion-icon>
                    )}
                </div>
            </div>
        </div>
    );
}