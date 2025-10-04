import { OptionNoText } from "../types/Event";

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

  private impacts: Array<OptionNoText["consequences"][number]["impacted"]> = ["happiness", "relations", "money"
];

  public generateEvent(): string {
    const index = Math.floor(Math.random() * this.events.length);
    return this.events[index];
  }

    public generateConsequences(
        outerLength: number = 3,
        innerLength: number = 3
    ): OptionNoText[] {
        const consequences: OptionNoText[] = [];

        for (let i = 0; i < outerLength; i++) {
            const innerList: OptionNoText = {
              consequences: []
            };

            for (let j = 0; j < innerLength; j++) {
            const impacted = this.impacts[Math.floor(Math.random() * this.impacts.length)];

            let value = 0;
            while (value === 0) {
                value = Math.floor(Math.random() * 21) - 10;
            }

            innerList.consequences.push({
                impacted,
                value,
            });
            }

            consequences.push(innerList);
        }

        return consequences;
    }

  public generateScenario() : { category: string; consequences: OptionNoText[] } {
    return {
      category: this.generateEvent(),
      consequences: this.generateConsequences(),
    };
  }
}

const gameAlgorithm = new GameAlgorithm();
export default gameAlgorithm;