import { Stats } from "./Stats";
import { Event } from "./Event";
import { Option } from "./Event";

export interface StateElement {
    stats: Stats;
    event: Event;
    choice: Option;
}