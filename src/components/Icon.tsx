export default function Icon({ name, size = 24, color = "black" }: { name: string, size?: number, color?: string }) {
    return <div className="icon" style={{ width: size, height: size, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
        {/** @ts-ignore */}
        <ion-icon name={name} style={{ fontSize: size, color }}></ion-icon>
    </div>
}