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

  public generateScenario() : { description: string; consequences: OptionNoText[]; isCoreEvent: boolean } {
    if (Math.random() < .5) {
      return {
        description: "Generate event about finding new job opportunity. Describe the job. One consequence coresponds to accepting the job, second to rejecting it. Display the exact salary (value of impacted money, given in PLN per month (brutto, don't write about netto or any bonuses), so if consequence for money is 10 write 10 PLN per month) in the description.",
        consequences: [
          {
            consequences: [
                {
                    impacted: 'money',
                    value: 20
                },
            ]

          },
        {
            consequences: []
        }],
        isCoreEvent: true
      };
    } else {
    return {
      description: this.generateEvent(),
      consequences: this.generateConsequences(),
      isCoreEvent: false
    };
  }
}}

const gameAlgorithm = new GameAlgorithm();
export default gameAlgorithm;