import { IncidentAnalysis } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export async function analyzeIncident(incidentText: string): Promise<IncidentAnalysis> {
  const trimmed = incidentText.trim();
  if (trimmed.length < 10) {
    throw new Error('Please describe the incident in at least 10 characters so IncidentMind can perform an investigation.');
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 60000); // 60s timeout for LLM + memory retrieval

  try {
    const response = await fetch(`${API_BASE_URL}/api/incidents/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ incident: trimmed }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      let errorMessage = "IncidentMind couldn't complete the investigation. Check that the backend is running and try again.";
      try {
        const errorData = await response.json();
        if (errorData && typeof errorData.error === 'string') {
          errorMessage = errorData.error;
        }
      } catch {
        // Fallback to status message
        if (response.status === 400) {
          errorMessage = 'Invalid incident payload provided. Please enter more detail.';
        } else if (response.status === 503) {
          errorMessage = 'Backend AI or Memory service is temporarily unavailable. Check backend logs.';
        }
      }
      throw new Error(errorMessage);
    }

    const data = (await response.json()) as IncidentAnalysis;

    if (!data || !data.incident_summary || !data.likely_root_cause) {
      throw new Error('Received an incomplete response from the analysis engine. Please try again.');
    }

    return data;
  } catch (err: unknown) {
    clearTimeout(timeoutId);

    if (err instanceof DOMException && err.name === 'AbortError') {
      throw new Error('Investigation request timed out. The analysis service took too long to respond.');
    }

    if (err instanceof Error) {
      // Clean up common network errors to friendly user messages
      if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError') || err.message.includes('ECONNREFUSED')) {
        throw new Error("IncidentMind couldn't reach the backend server. Make sure the backend is running at http://localhost:5000.");
      }
      throw err;
    }

    throw new Error("IncidentMind couldn't complete the investigation. Check that the backend is running and try again.");
  }
}

export async function checkBackendHealth(): Promise<{ ok: boolean; message: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/health`, {
      method: 'GET',
      headers: { Accept: 'application/json' },
    });
    if (response.ok) {
      const data = await response.json();
      return { ok: true, message: data.service || 'Backend Connected' };
    }
    return { ok: false, message: `Backend responded with HTTP ${response.status}` };
  } catch {
    return { ok: false, message: 'Backend unreachable (http://localhost:5000)' };
  }
}

export async function submitResolution(
  incidentId: string,
  payload: {
    outcome: 'worked' | 'failed' | 'not_resolved';
    details?: string;
    incident?: string;
    analysis?: IncidentAnalysis;
  }
): Promise<{
  status: string;
  incidentId: string;
  outcome: 'worked' | 'failed' | 'not_resolved';
  retained: boolean;
  documentId?: string;
  message: string;
}> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000);

  try {
    const response = await fetch(
      `${API_BASE_URL}/api/incidents/${encodeURIComponent(incidentId)}/resolution`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      }
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      let errorMessage = "IncidentMind couldn't retain resolution in Hindsight memory. Check backend logs.";
      try {
        const errorData = await response.json();
        if (errorData && typeof errorData.error === 'string') {
          errorMessage = errorData.error;
        }
      } catch {
        if (response.status === 404) {
          errorMessage = 'Incident context not found on server. Please re-analyze the incident first.';
        }
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  } catch (err: unknown) {
    clearTimeout(timeoutId);

    if (err instanceof DOMException && err.name === 'AbortError') {
      throw new Error('Resolution persistence request timed out.');
    }

    if (err instanceof Error) {
      if (
        err.message.includes('Failed to fetch') ||
        err.message.includes('NetworkError') ||
        err.message.includes('ECONNREFUSED')
      ) {
        throw new Error("IncidentMind couldn't reach the backend server to retain memory.");
      }
      throw err;
    }

    throw new Error('Failed to retain resolution outcome.');
  }
}
