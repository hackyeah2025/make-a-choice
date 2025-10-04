import { Stats } from "./Stats";
import { Event } from "./Event";

export interface StateElement {
    stats: Stats;
    event: Event;
    choice: number;
}