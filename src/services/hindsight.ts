import { HindsightClient } from "@vectorize-io/hindsight-client";
import { env } from "../config/env.js";

export type IncidentMemory = {
  content: string;
  documentId: string;
  timestamp?: string;
  tags?: string[];
};

function getHindsightClient() {
  if (!env.hindsightApiKey) {
    throw new Error("Hindsight is not configured. Set HINDSIGHT_API_KEY in .env.");
  }

  return new HindsightClient({
    baseUrl: env.hindsightBaseUrl,
    apiKey: env.hindsightApiKey,
  });
}

/** Store an incident as a durable memory in the IncidentMind Hindsight bank. */
export async function retainIncident(incident: IncidentMemory) {
  const client = getHindsightClient();

  return client.retain(env.hindsightBankId, incident.content, {
    context: "production incident report",
    documentId: incident.documentId,
    timestamp: incident.timestamp,
    tags: incident.tags ?? ["incident", "production"],
  });
}

/** Find past incident memories relevant to the current incident. */
export async function recallIncidents(query: string) {
  const client = getHindsightClient();
  return client.recall(env.hindsightBankId, query);
}
