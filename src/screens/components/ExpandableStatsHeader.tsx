import { useState } from "react";
import StatsDisplay from "./StatsDisplay";
import ProgressIndicator from "./ProgressIndicator";
import useStats from "../../hooks/useStats";

// Progress Bar Component
function ProgressBar({ label, value, max = 100, color = "#007834", icon }: {
    label: string;
    value: number;
    max?: number;
    color?: string;
    icon?: string;
    years?: number;
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

    const progressData = history.slice(-10).map((item, index, arr) => ({
        turn: history.length - arr.length + index + 1,
        health: Number(item.stats.health),
        relations: Number(item.stats.relations),
        happiness: Number(item.stats.happiness),
        money: Number(item.stats.money * 0.5),
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
function Avatar({ age, name, stage, sex, variant }: { age: number, name?: string, stage: string, sex: string, variant: number }) {
    // const getAvatarByAge = (age: number): string => {
    //     if (age < 20) return "/adults/young.png";
    //     if (age < 30) return "/adults/young-adult.png";
    //     if (age < 50) return "/adults/medium-adult.png";
    //     if (age < 60) return "/adults/old-adult.png";
    //     return "/adults/senior.png";
    // };

    const avatarPath = `/${stage}/${sex === "male" ? "m" : "w"}${variant}.png`;

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
                    boxShadow: "0 8px 32px rgba(0, 120, 52, 0.2)",
                    overflow: "hidden"
                }}
            >
                <img
                    src={avatarPath}
                    alt="Avatar"
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "50%"
                    }}
                />
            </div>
            <h2 style={{
                color: "#007834",
                marginTop: "16px",
                fontSize: "24px",
                fontWeight: "600",
                textAlign: "center",
                textShadow: "0 2px 4px rgba(0, 120, 52, 0.1)"
            }}>
                {name || "Gracz"}
            </h2>
        </div>
    );
}

export default function ExpandableStatsHeader({ years, name }: { years?: number, name?: string }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const { stats } = useStats();
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
                    position: "relative",
                    pointerEvents: "all",
                    background: "white",
                }}
            >
                <div style={{
                    height: isExpanded ? "90vh" : "0vh",
                    transition: "height 0.3s",
                    width: "90%",
                    padding: "0 5%",
                    paddingTop: "10vh",
                    overflowY: "auto",
                    background: "white"
                }}>
                    <StatsDisplay stats={stats} />
                </div>

                <div
                    className="expandable-stats-header--toggle"
                    onClick={() => setIsExpanded(!isExpanded)}
                    style={{
                        position: "absolute",
                        left: "50%",
                        width: "75vw",
                        transform: "translateX(-50%)",
                        background: "#007834",
                        borderRadius: "0px 0px 20px 20px",
                        padding: "8px 0px",
                        border: "2px solid #007834",
                        cursor: "pointer",
                        color: "white",
                        fontSize: "20px",
                        textAlign: "center",
                        top: 0,
                        transition: "all 0.3s ease",
                    }}
                >
                    <ProgressIndicator years={years} percent={years || 0 / 65} name={name} />
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