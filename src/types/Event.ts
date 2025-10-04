export type Event = {
    text: string;
    options: Option[];
};

export type Option = {
    text: string;
    consequences: {
        impacted: "happiness" | "social-life" | "money";
        value: number;
    }[]
};