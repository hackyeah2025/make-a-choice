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

  private impacts: Array<OptionNoText["consequences"][number]["impacted"]> = ["happiness", "health", "savings", "relations", "expenses"];

  private getEventTypeWeights(stats: Stats): Record<string, number> {
    let weights =  {
      "education": 1,
      "job": 1,
      "family": 1,
    }

    if (stats.age == 15 || (stats.age == 18 && stats.education == "high_school")) {
      return {
        "education": 1.0,
        "job": 0.0,
        "family": 0.0,
      }
    }

    if (stats.income == 0 && stats.age == 18 && stats.education == "job_school") {
      return {
        "education": 0.0,
        "job": 1.0,
        "family": 0.0,
      }
    }

    if (stats.age == 21 && stats.education == "university") {
      return {
        "education": 0.0,
        "job": 1.0,
        "family": 0.0,
      }
    }
  

    if (stats.income) {
      weights.job *= 5;
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

      let increaseValue = Math.floor(Math.random() * 7) + 5;
      let decreaseValue = Math.floor(Math.random() * 10) + 5;



      // lineary increase the decreaseValue based on how low the stats are
      // set decreasedStat to minimal stat
      const statValues = [stats.happiness, stats.health, stats.relations];
      const minStat = Math.min(...statValues);

      if (minStat < 50) {
        decreaseValue = Math.round(decreaseValue * 1.2)
      }
      if (minStat < 30) {
        decreaseValue = Math.round(decreaseValue * 1.5)
      }
      if (minStat < 20) {
        decreaseValue = Math.round(decreaseValue * 2)
      }
      if (minStat < 10) {
        decreaseValue = Math.round(decreaseValue * 3)
      }

      // if (stats.health < 20 || stats.relations || stats.happiness) {
      //   decreaseValue = Math.round(decreaseValue * 1.5)
      // }

      // if (stats.health < 10 || stats.relations < 10 || stats.happiness < 10) {
      //   decreaseValue = Math.round(decreaseValue * 3)
      // }




      if (impactedStat === "savings") {
        increaseValue *= 1000 * 2;
      }
      if (decreasedStat === "savings") {
        decreaseValue *= 1000 * 2;
      }

      if (impactedStat === "expenses") {
        increaseValue *= 5000 * 2;
      }
      if (decreasedStat === "expenses") {
        decreaseValue *= 100 * 2;
      }

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
      offer.consequences[0].consequences[0].value = stats.job_experience * 500 + 42000;
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
    const rng = Math.random();
    
    if (stats.children === 0 && stats.age > 25 && stats.age < 40) {
      return events.child_decision;
    }
    else if (stats.age > 20 && stats.age < 35 && rng < 0.3) {
      return events.marriage_proposal;
    }
    else if (rng < 0.4) {
      return events.family_emergency;
    }
    else {
      return events.family_reunion;
    }
  }



  public generateScenario(stats: Stats): { description: string; consequences: OptionNoText[]; extraField?: string; isCoreEvent: boolean; eventType?: string} {
    // Weighted random selection of event type
    const eventTypeWeights = this.getEventTypeWeights(stats);
    // console.log(coreEvents);
    const totalWeight = Object.values(eventTypeWeights).reduce((a, b) => a + b, 0);
    const randomValue = Math.random() * totalWeight;

    console.log(stats)
    if (stats.age % 3 != 0) {
      return { ...this.generateRandomScenario(stats), isCoreEvent: false, eventType: "random"};
    }
    else if (randomValue <  eventTypeWeights["education"]) {
      return { ...this.generateEducationScenario(stats, coreEvents.education), isCoreEvent: true };
    }
    else if (randomValue < eventTypeWeights["education"] + eventTypeWeights["job"]) {
      return { ...this.generateJobScenario(stats, coreEvents.job), isCoreEvent: true };
    }
    else {
      return { ...this.generateFamilyScenario(stats, coreEvents.family), isCoreEvent: true };
    }
  }
}

const gameAlgorithm = new GameAlgorithm();
export default gameAlgorithm;