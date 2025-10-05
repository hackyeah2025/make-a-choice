import { Stats } from "../types/Stats";

export type Event = {
    title: string;
    text: string;
    options: Option[];
    extraField: string;
    eventType?: string;
};

export type OptionNoText = {
    consequences: {
        impacted: keyof Stats;
        value: number | string;
    }[]
};

export type Option = {
    text: string;
    consequences: {
        impacted: keyof Stats;
        value: number | string;
    }[]
};
