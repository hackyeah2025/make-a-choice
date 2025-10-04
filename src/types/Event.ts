export type Event = {
    title: string;
    text: string;
    options: Option[];
};

export type Option = {
    text: string;
    consequences: {
        impacted: "happiness" | "relations" | "money" | "relations";
        value: number;
    }[]
};