import { Option } from "../types/Event";
import { Stats } from "../types/Stats";

export async function getRegularAction(
  category: string,
  decision_results: Option[],
  stats: Stats
) {
  const response = await fetch("http://localhost:8000/regular_action", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ category, decision_results, stats }),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch regular action: ${response.statusText}`);
  }

  return response.json();
}
