import { stat } from "fs";
import { OptionNoText } from "../types/Event";
import { Stats } from "../types/Stats";
import coreEvents from "./core_events.json";

const educationWeights = {
  "primary_school": 0.5,
  "job_school": 1.0,
  "high_school": 1.0,
  "university": 1.5,
}
export class GameAlgorithm {
  private events: string[] = [
    "home",
    "job/school",
    "night accident",
    "good luck",
    "family",
    "sport",
    "driving",
    "trip",
    "morning routine",
    "evening",
  ];

  private impacts: Array<OptionNoText["consequences"][number]["impacted"]> = ["happiness", "health", "money", "relations"];

  private getEventTypeWeights(stats: Stats): Record<string, number> {
    return {
      "random": 0,
      "education": 1,
      "job": 1,
      "family": 0,
    }
    let weights = {
      "random": 1,
      "education": 1,
      "job": 1,
      "family": 1,
    }
    if (stats.age > 45) {
      weights.family = 0.4;
    }

    if (stats.age < 30) {
      weights.education = 0.25;
    }

    if (stats.job_experience > 50) {
      weights.job = 0.5;
    }

    weights.education = educationWeights[stats.education];

    return weights;
  }

  private generateRandomScenario(stats: Stats): { description: string; consequences: OptionNoText[] } {
    // random event type that increases one stat and decreases another

    let consequences = [];
    const event = this.events[Math.floor(Math.random() * this.events.length)];

    for (let i = 0; i < 3; i++) {
      const impactedStat = this.impacts[Math.floor(Math.random() * this.impacts.length)];
      let otherStats = this.impacts.filter(s => s !== impactedStat);
      const decreasedStat = otherStats[Math.floor(Math.random() * otherStats.length)];

      const increaseValue = Math.floor(Math.random() * 21) + 10;
      const decreaseValue = Math.floor(Math.random() * 21) + 10;

      consequences.push({ consequences: [{ impacted: impactedStat, value: increaseValue }, { impacted: decreasedStat, value: -decreaseValue }] });
    }
    return {
      description: event,
      consequences: consequences,
    };
  }

  private generateEducationScenario(stats: Stats, events: any): { description: string; consequences: OptionNoText[]; extraField?: string; eventType?: string } {
    if (stats.education === "primary_school") {
      return events.high_school;
    }
    else if (stats.education === "high_school") {
      return events.university;
    }
    return events.course; 
  }

  private generateJobScenario(stats: Stats, events: any): { description: string; consequences: OptionNoText[]; extraField?: string; eventType?: string } {
    if (stats.income === 0) {
      const offer = { ...events.job_offer };
      offer.consequences[0].consequences[0].value = stats.job_experience * 1000 + 1
      return offer;
    }
    const rng = Math.random();

    if (rng < .3) {
      const offer = { ...events.promotion };
      offer.consequences[0].consequences[0].value = Math.round(stats.income * 1.2);
      console.log(offer);
      return offer;
    }
    else if (rng < .6) {
      const offer = { ...events.overwork };
      offer.consequences[0].consequences[0].value = Math.round(stats.income * 2 / 100);
      console.log(offer);
      return offer;
    }

    console.log(events.layoff);
    return events.layoff;
  }

  private generateFamilyScenario(stats: Stats, events: any): { description: string; consequences: OptionNoText[]; extraField?: string; eventType?: string } {
    return {
      description: 'Your partner asks you about having a child. What do you say?',
      consequences: [{
        consequences: [
          { impacted: 'children', value: 1 },
          { impacted: 'relations', value: 10 },
          { impacted: 'happiness', value: 5 }
        ]
      },
      {
        consequences: [
          { impacted: 'relations', value: -10 }
        ]
      }
    ],
    };
  }



  public generateScenario(stats: Stats): { description: string; consequences: OptionNoText[]; extraField?: string; isCoreEvent: boolean; eventType?: string} {
    // Weighted random selection of event type
    const eventTypeWeights = this.getEventTypeWeights(stats);
    // console.log(coreEvents);
    const totalWeight = Object.values(eventTypeWeights).reduce((a, b) => a + b, 0);
    const randomValue = Math.random() * totalWeight;

    console.log(stats)
    if (randomValue < eventTypeWeights["random"] || stats.age % 3 != 0) {
      return { ...this.generateRandomScenario(stats), isCoreEvent: false, eventType: "random"};
    }
    else if (randomValue < eventTypeWeights["random"] + eventTypeWeights["education"]) {
      return { ...this.generateEducationScenario(stats, coreEvents.education), isCoreEvent: true };
    }
    else if (randomValue < eventTypeWeights["random"] + eventTypeWeights["education"] + eventTypeWeights["job"]) {
      return { ...this.generateJobScenario(stats, coreEvents.job), isCoreEvent: true };
    }
    else {
      return { ...this.generateFamilyScenario(stats, coreEvents.family), isCoreEvent: true };
    }
  }
}

const gameAlgorithm = new GameAlgorithm();
export default gameAlgorithm;