import { OptionNoText, Event } from "../types/Event";
import { Stats } from "../types/Stats";


const API_URL = "http://localhost:8000";

export interface EventResponse {
    title: string;
    text: string;
    options: string[];
    extra_field: string;
}


export default class ApiService {
    static async generateEvent(category: string, options: OptionNoText[], stats: Stats) : Promise<Event> {
        const response = await fetch(`${API_URL}/generate-event`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json', // Tell server it's JSON
            },

            body: JSON.stringify({
                category: category,
                options: options,
                stats: stats
            })
        });
        const data = await response.json() as EventResponse;
        return {
            title: data.title,
            text: data.text,
            options: data.options.map((optionText, idx) => ({
                text: optionText,
                consequences: options[idx]?.consequences ?? []
            })),
            extraField: data.extra_field
        };
    }

    static async generateCoreEvent(prompt: string, options: OptionNoText[], stats: Stats, extraField?: string) : Promise<Event> {
        // console.log(extraField)
        const response = await fetch(`${API_URL}/generate-core-event`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json', // Tell server it's JSON
            },
            body: JSON.stringify({
                prompt: prompt,
                options: options,
                stats: stats,
                ...(extraField !== undefined ? { extra_field: extraField } : {}),
            })
        });
        const data = await response.json() as EventResponse;
        return {
            title: data.title,
            text: data.text,
            options: data.options.map((optionText, idx) => ({
                text: optionText,
                consequences: options[idx]?.consequences ?? []
            })),
            extraField: data.extra_field
        };
    }
}
