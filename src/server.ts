import cors from "cors";
import express, { type NextFunction, type Request, type Response } from "express";
import { env } from "./config/env.js";
import { healthRouter } from "./routes/health.js";
import { analyzeIncident } from "./services/incidentAgent.js";
import { recallIncidents, retainIncident } from "./services/hindsight.js";

import {
  saveIncident,
  getIncident,
  retainResolutionMemory,
  type ResolutionOutcome,
} from "./services/incidentStore.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", healthRouter);

app.post("/api/incidents/analyze", async (request, response, next) => {
  const incident = request.body?.incident;

  if (typeof incident !== "string" || incident.trim().length < 10) {
    response.status(400).json({
      error: "incident must be a non-empty string of at least 10 characters.",
    });
    return;
  }

  if (incident.length > 5_000) {
    response.status(400).json({
      error: "incident must be 5,000 characters or fewer.",
    });
    return;
  }

  try {
    const analysis = await analyzeIncident(incident.trim());
    const id = `inc_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    saveIncident(id, incident.trim(), analysis);
    response.json({ id, ...analysis });
  } catch (error) {
    next(error);
  }
});

app.post("/api/incidents/:id/resolution", async (request, response, next) => {
  const id = request.params.id;
  const outcome = request.body?.outcome;
  const details = request.body?.details;

  if (!id || typeof id !== "string") {
    response.status(400).json({ error: "Invalid incident ID." });
    return;
  }

  const validOutcomes: ResolutionOutcome[] = ["worked", "failed", "not_resolved"];
  if (!validOutcomes.includes(outcome)) {
    response.status(400).json({
      error: "outcome must be one of 'worked', 'failed', or 'not_resolved'.",
    });
    return;
  }

  if (details !== undefined && typeof details !== "string") {
    response.status(400).json({
      error: "details must be a string if provided.",
    });
    return;
  }

  if (typeof details === "string" && details.length > 5_000) {
    response.status(400).json({
      error: "details must be 5,000 characters or fewer.",
    });
    return;
  }

  try {
    // Look up stored incident context
    const stored = getIncident(id);

    // Allow fallback context in request body if not in memory
    const fallbackIncident = request.body?.incident;
    const fallbackAnalysis = request.body?.analysis;

    let incidentText = stored?.incident;
    let analysisData = stored?.analysis;

    if (!incidentText && typeof fallbackIncident === "string") {
      incidentText = fallbackIncident;
    }
    if (!analysisData && fallbackAnalysis && typeof fallbackAnalysis === "object") {
      analysisData = fallbackAnalysis;
    }

    if (!incidentText || !analysisData) {
      response.status(404).json({
        error: `Incident with ID '${id}' was not found. Please analyze the incident before recording resolution.`,
      });
      return;
    }

    const { documentId } = await retainResolutionMemory({
      id,
      incident: incidentText,
      analysis: analysisData,
      outcome,
      details: typeof details === "string" ? details : undefined,
    });

    response.json({
      status: "success",
      incidentId: id,
      outcome,
      retained: true,
      documentId,
      message: "Incident resolution experience successfully retained in Hindsight memory.",
    });
  } catch (error) {
    next(error);
  }
});

app.post("/api/test/memory", async (_request, response, next) => {
  try {
    const result = await retainIncident({
      documentId: "sample-post-deployment-database-timeout",
      timestamp: "2026-09-20T10:30:00Z",
      content: [
        "Production incident: After deploying API version 2026.09.20, checkout requests began returning HTTP 500 errors.",
        "Symptoms: database connection timeouts increased and the PostgreSQL connection pool was exhausted.",
        "Root cause: the new deployment created a database client for every request instead of reusing the shared pool.",
        "Resolution: rolled back the release, restored the shared connection pool, and added a deployment check for pool saturation.",
      ].join("\n"),
    });

    response.status(201).json({ message: "Sample incident stored in Hindsight.", result });
  } catch (error) {
    next(error);
  }
});

app.get("/api/test/memory", async (_request, response, next) => {
  try {
    const query =
      "Have we seen database connection timeout or 500 errors after deployment before?";
    const result = await recallIncidents(query);

    response.json({ query, result });
  } catch (error) {
    next(error);
  }
});

app.use((error: unknown, _request: Request, response: Response, _next: NextFunction) => {
  console.error("Request failed:", error);
  const message = error instanceof Error ? error.message : "Unexpected server error.";
  const status =
    message.startsWith("Hindsight is not configured") ||
    message.startsWith("Groq is not configured")
      ? 503
      : 500;

  response.status(status).json({
    error: status === 503 ? message : "Unable to complete the request.",
  });
});

app.listen(env.port, () => {
  console.log(`IncidentMind backend listening on http://localhost:${env.port}`);
});
