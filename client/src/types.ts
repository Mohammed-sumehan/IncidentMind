export type ConfidenceLevel = 'low' | 'medium' | 'high';

export interface IncidentAnalysis {
  id?: string;
  incident_summary: string;
  likely_root_cause: string;
  recommended_actions: string[];
  relevant_memory_summary: string;
  confidence: ConfidenceLevel;
  reasoning: string;
}

export type ResolutionOutcome = 'worked' | 'failed' | 'not_resolved';

export interface ResolutionRequest {
  outcome: ResolutionOutcome;
  details?: string;
  incident?: string;
  analysis?: IncidentAnalysis;
}

export interface ResolutionResponse {
  status: string;
  incidentId: string;
  outcome: ResolutionOutcome;
  retained: boolean;
  documentId?: string;
  message: string;
}

export interface IncidentRecord {
  id: string;
  timestamp: string;
  inputIncident: string;
  analysis: IncidentAnalysis;
  feedback?: ResolutionOutcome;
  feedbackDetails?: string;
  feedbackRetained?: boolean;
}

export interface ApiError {
  message: string;
  statusCode?: number;
}
