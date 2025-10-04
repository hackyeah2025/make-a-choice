// interface Consequence {
//   impacted: "happiness" | "relations" | "money" | "health";
//   value: number;
// }

// export class GameAlgorithm {
//   private events = [
//     "home",
//     "job/school",
//     "night accident",
//     "good luck",
//     "family",
//     "sport",
//     "driving",
//     "trip",
//     "morning routine",
//     "evening",
//   ];

//   private impacts: String[] = ["happiness", "relations", "money", "health"];


//   public generateEvent(): string {
//     const index = Math.floor(Math.random() * this.events.length);
//     return this.events[index];
//   }


//   public generateConsequences(count: number = 3): Consequence[] {
//     const consequences: Consequence[] = [];
//     for (let i = 0; i < count; i++) {
//       const impacted = this.impacts[Math.floor(Math.random() * this.impacts.length)];
      
//       let value = 0;
//       while (value === 0) {
//         value = Math.floor(Math.random() * 21) - 10;
//       }
//       consequences.push({ impacted, value });
//     }
//     return consequences;
//   }

//   public generateScenario() {
//     return {
//       event: this.generateEvent(),
//       consequences: this.generateConsequences(),
//     };
//   }
// }
