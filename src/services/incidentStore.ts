import { IncidentAnalysis } from "./incidentAgent.js";
import { retainIncident } from "./hindsight.js";

export type ResolutionOutcome = "worked" | "failed" | "not_resolved";

export type StoredIncident = {
  id: string;
  incident: string;
  analysis: IncidentAnalysis;
  createdAt: string;
  resolution?: {
    outcome: ResolutionOutcome;
    details?: string;
    retainedAt: string;
    documentId: string;
  };
};

const store = new Map<string, StoredIncident>();
const MAX_STORED_INCIDENTS = 200;

export function saveIncident(
  id: string,
  incident: string,
  analysis: IncidentAnalysis
): StoredIncident {
  // Evict oldest if reaching capacity limit
  if (store.size >= MAX_STORED_INCIDENTS) {
    const oldestKey = store.keys().next().value;
    if (oldestKey) {
      store.delete(oldestKey);
    }
  }

  const record: StoredIncident = {
    id,
    incident,
    analysis,
    createdAt: new Date().toISOString(),
  };

  store.set(id, record);
  return record;
}

export function getIncident(id: string): StoredIncident | undefined {
  return store.get(id);
}

export async function retainResolutionMemory(params: {
  id: string;
  incident: string;
  analysis: IncidentAnalysis;
  outcome: ResolutionOutcome;
  details?: string;
}): Promise<{ documentId: string; result: unknown }> {
  const { id, incident, analysis, outcome, details } = params;

  const outcomeHeading =
    outcome === "worked"
      ? "RESOLVED - Fix verified by engineer"
      : outcome === "failed"
      ? "ATTEMPT FAILED - Fix attempted but did not resolve issue"
      : "UNRESOLVED - Mitigation in progress";

  const contentLines: string[] = [
    `Production incident report: ${analysis.incident_summary || incident}`,
    `Reported symptoms: ${incident}`,
    `Diagnosed root cause: ${analysis.likely_root_cause}`,
    `Recommended actions: ${analysis.recommended_actions.join("; ")}`,
    `Resolution outcome: ${outcomeHeading}`,
  ];

  if (details && details.trim().length > 0) {
    contentLines.push(`Engineer resolution notes: ${details.trim()}`);
  }

  if (outcome === "worked") {
    contentLines.push(
      `Key takeaway: The resolution was confirmed effective and restored system health.`
    );
  } else if (outcome === "failed") {
    contentLines.push(
      `Key takeaway: This specific approach did not mitigate the failure. Alternative root causes must be explored.`
    );
  } else {
    contentLines.push(
      `Key takeaway: Incident diagnostic steps initiated; pending definitive root cause confirmation.`
    );
  }

  const documentId = `incident-resolution-${id}-${outcome}`;
  const timestamp = new Date().toISOString();

  const result = await retainIncident({
    documentId,
    timestamp,
    content: contentLines.join("\n"),
    tags: ["incident", "production", outcome, "resolution-feedback"],
  });

  // Update in-memory record if it exists
  const existing = store.get(id);
  if (existing) {
    existing.resolution = {
      outcome,
      details: details?.trim(),
      retainedAt: timestamp,
      documentId,
    };
  }

  return { documentId, result };
}
