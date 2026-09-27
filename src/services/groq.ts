import Groq from "groq-sdk";
import { env } from "../config/env.js";

export const GROQ_INCIDENT_MODEL = "openai/gpt-oss-20b";

function getGroqClient() {
  if (!env.groqApiKey) {
    throw new Error("Groq is not configured. Set GROQ_API_KEY in .env.");
  }

  return new Groq({ apiKey: env.groqApiKey });
}

export async function createIncidentAnalysis(messages: Groq.Chat.Completions.ChatCompletionMessageParam[]) {
  const client = getGroqClient();

  return client.chat.completions.create({
    model: GROQ_INCIDENT_MODEL,
    messages,
    max_tokens: 2048,
    temperature: 0.1,
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "incident_analysis",
        strict: true,
        schema: {
          type: "object",
          properties: {
            incident_summary: { type: "string" },
            likely_root_cause: { type: "string" },
            recommended_actions: {
              type: "array",
              items: { type: "string" },
            },
            relevant_memory_summary: { type: "string" },
            confidence: {
              type: "string",
              enum: ["low", "medium", "high"],
            },
            reasoning: { type: "string" },
          },
          required: [
            "incident_summary",
            "likely_root_cause",
            "recommended_actions",
            "relevant_memory_summary",
            "confidence",
            "reasoning",
          ],
          additionalProperties: false,
        },
      },
    },
  });
}
