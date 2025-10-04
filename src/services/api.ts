import { OptionNoText, Event } from "../types/Event";
import { Stats } from "../types/Stats";


const API_URL = "http://localhost:8000";

export interface EventResponse {
    title: string;
    text: string;
    options: string[];
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
        console.log(
            JSON.stringify({
                category: category,
                options: options,
                stats: stats
            })
        )
        const data = await response.json() as EventResponse;
        // console.log(data.options)
        console.log({
            title: data.title,
            text: data.text,
            options: data.options.map((optionText, idx) => ({
                text: optionText,
                consequences: options[idx]?.consequences ?? []
            }))
        })
        return {
            title: data.title,
            text: data.text,
            options: data.options.map((optionText, idx) => ({
                text: optionText,
                consequences: options[idx]?.consequences ?? []
            }))
        };
    }

    static async generateCoreEvent(prompt: string, options: OptionNoText[], stats: Stats) : Promise<Event> {
        const response = await fetch(`${API_URL}/generate-core-event`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json', // Tell server it's JSON
            },
            body: JSON.stringify({
                prompt: prompt,
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
            }))
        };
    }
}
