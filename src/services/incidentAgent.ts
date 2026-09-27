import { createIncidentAnalysis } from "./groq.js";
import { recallIncidents } from "./hindsight.js";

export type IncidentAnalysis = {
  incident_summary: string;
  likely_root_cause: string;
  recommended_actions: string[];
  relevant_memory_summary: string;
  confidence: "low" | "medium" | "high";
  reasoning: string;
};

const systemPrompt = `You are IncidentMind, a careful production incident response assistant.

Analyze only the current incident information and the supplied historical Hindsight memories.
- Clearly label historical memories as historical evidence, never as current facts.
- Clearly distinguish a likely inference from confirmed evidence.
- Do not claim certainty without direct evidence from the current incident.
- If no historical memories are supplied, say so in relevant_memory_summary.
- When historical memories are supplied, relevant_memory_summary must begin with "Historical Hindsight evidence:".
- If likely_root_cause relies on a historical memory, state that it is an inference suggested by historical evidence, not a confirmed current root cause.
- In reasoning, separately identify the current incident information, the historical evidence, and the resulting inference.
- Recommend safe, concrete next steps that help validate or mitigate the incident.
- The reasoning field must be a concise evidence-based rationale, not private chain-of-thought.
- Return only JSON that matches the supplied schema. Always include all six fields:
  incident_summary, likely_root_cause, recommended_actions, relevant_memory_summary, confidence, and reasoning.`;

export async function analyzeIncident(incident: string): Promise<IncidentAnalysis> {
  const recall = await recallIncidents(incident);
  const historicalMemories = recall.results.map((memory) => ({
    type: memory.type,
    text: memory.text,
  }));

  const messages: Parameters<typeof createIncidentAnalysis>[0] = [
    { role: "system", content: systemPrompt },
    {
      role: "user",
      content: JSON.stringify({
        current_incident: incident,
        historical_hindsight_memories: historicalMemories,
      }),
    },
  ];

  let completion;
  try {
    completion = await createIncidentAnalysis(messages);
  } catch {
    completion = await createIncidentAnalysis(messages);
  }

  const content = completion.choices[0]?.message.content;
  if (!content) {
    throw new Error("Groq returned an empty incident analysis.");
  }

  try {
    return JSON.parse(content) as IncidentAnalysis;
  } catch {
    throw new Error("Groq returned an invalid incident analysis.");
  }
}
