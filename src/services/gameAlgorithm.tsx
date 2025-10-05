import { OptionNoText } from "../types/Event";
import { Stats } from "../types/Stats";

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

  private generateEducationScenario(stats: Stats): { description: string; consequences: OptionNoText[]; extraField?: string; eventType?: string } {
    return {
      description: 'You graduated high school! Do you want to continue your education?',
      consequences: [{
        consequences: [
          {
            impacted: 'education',
            value: 'university'
          },
          {
            impacted: 'money',
            value: -20
          }
        ],
      },
      {
        consequences: [
        ]
      }
    ],
    };
  }

  private generateJobScenario(stats: Stats): { description: string; consequences: OptionNoText[]; extraField?: string; eventType?: string } {
    return {
      description: 'You got a new job offer! Do you accept it?',
      consequences: [{ consequences: [
      ] }],
      extraField: "job title",
      eventType: "job"
    };
  }

  private generateFamilyScenario(stats: Stats): { description: string; consequences: OptionNoText[]; extraField?: string; eventType?: string } {
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

    const totalWeight = Object.values(eventTypeWeights).reduce((a, b) => a + b, 0);
    const randomValue = Math.random() * totalWeight;

    if (randomValue < eventTypeWeights["random"]) {
      return { ...this.generateRandomScenario(stats), isCoreEvent: false, eventType: "random"};
    }
    else if (randomValue < eventTypeWeights["random"] + eventTypeWeights["education"]) {
      return { ...this.generateEducationScenario(stats), isCoreEvent: true };
    }
    else if (randomValue < eventTypeWeights["random"] + eventTypeWeights["education"] + eventTypeWeights["job"]) {
      return { ...this.generateJobScenario(stats), isCoreEvent: true };
    }
    else {
      return { ...this.generateFamilyScenario(stats), isCoreEvent: true };
    }
  }
}

const gameAlgorithm = new GameAlgorithm();
export default gameAlgorithm;