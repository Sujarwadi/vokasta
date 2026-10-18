export type ScenarioType = 'greeting' | 'ratio' | 'complaint' | 'sales_objection' | 'sales_discovery' | 'custom';

export interface BuyerPersona {
  name: string;
  title: string;
  company: string;
  temperament: string;
  avatar_initials: string;
  opening_objection_line: string;
}

export interface ParameterDefinition {
  id: string;
  name: string;
  weight: number; // percentage, e.g. 35
  is_universal: boolean; // true: Universal (Open Badges / portable), false: Brand-specific (locked)
  passing_score: number; // e.g. 70
  definition: string;
  keywords_or_actions: string[];
}

export interface Scenario {
  id: string;
  jenis: ScenarioType;
  title: string;
  category: string;
  track?: 'frontline_service' | 'retail_sales';
  target_audience?: 'jobseeker' | 'staff' | 'all';
  department?: 'fnb_barista' | 'fashion_retail' | 'automotive_sales' | 'property_sales' | 'general_frontline';
  role_context: string;
  buyer_persona?: BuyerPersona;
  task_instruction_en: string;
  evaluation_prompt_snippet: string;
  parameters: ParameterDefinition[];
  brand_name?: string;
  is_custom?: boolean;
  status?: 'Skenario Siap Diuji' | 'Rubrik Siap, Pengujian Video Menyusul' | string;
}

export type UserRole = 'pencari_kerja' | 'independent_jobseeker' | 'staff' | 'manager';

export type IndonesianDialect =
  | 'jabodetabek'
  | 'sunda'
  | 'jawa_tengah'
  | 'jawa_timur'
  | 'medan'
  | 'minang'
  | 'bali'
  | 'makassar'
  | 'manado'
  | 'timur';

export const isJobseekerRole = (role?: UserRole | string | null): boolean =>
  role === 'pencari_kerja' || role === 'independent_jobseeker';

export interface SOPAssignment {
  id: string;
  scenario_id: string;
  scenario_title: string;
  assigned_to_role: string;
  assigned_to_name: string;
  staff_id?: string;
  department?: 'fnb_barista' | 'fashion_retail' | 'automotive_sales' | 'property_sales';
  assigned_by: string;
  deadline: string;
  status: 'pending' | 'completed';
  brand_sop: string;
  priority: 'Tinggi' | 'Sedang' | 'Normal';
  notes?: string;
}

export interface ParameterScore {
  parameter_id: string;
  parameter_name: string;
  weight: number;
  score: number; // 0 to 100
  passed: boolean;
  timestamp: string; // e.g. "0:08", "0:04 - 0:14"
  evidence_note: string;
  ideal_response?: string; // contoh kalimat yang seharusnya diucapkan (mode suara)
  is_universal: boolean;
}

export interface AssessmentSession {
  id: string;
  selected_scenario_id: string;
  scenario: Scenario;
  video_url: string;
  video_filename?: string;
  video_mime_type?: string;
  status: 'pending' | 'processing' | 'done' | 'failed';
  created_at: string;
}

export interface AgentAuditMetadata {
  perception_agent: {
    speech_language: string;
    key_actions_observed: string[];
    transcript: string;
  };
  rubric_agent: {
    sop_compliance_rate: number;
    parameters_checked: number;
  };
  bias_auditor_agent: {
    dialect_checked: string;
    design_statement: string;
  };
  remediation_coach_agent: {
    coaching_summary: string;
    top_deficiency_parameter_id?: string;
    suggested_practice_script?: string;
  };
}

export interface AssessmentResult {
  id: string;
  session_id: string;
  scenario_id: string;
  scenario_title: string;
  scenario_type: ScenarioType;
  parameter_scores: ParameterScore[];
  final_status: 'passed' | 'needs_review';
  failed_parameters_count: number;
  weighted_average_score: number;
  universal_competencies: ParameterScore[];
  brand_specific_competencies: ParameterScore[];
  speech_transcript?: string;
  input_mode?: 'voice' | 'video';
  conversation_transcript?: Array<{ role: 'customer' | 'worker'; text: string }>;
  practice_language?: 'id' | 'en';
  strengths?: string[];
  recommendations?: Array<{ gap: string; ideal_sentence: string; reference?: string }>;
  candidate_summary?: string;
  supervisor_note?: string;
  anti_bias_audit: {
    design_mandate: string;
    audit_statement: string;
  };
  agent_pipeline?: AgentAuditMetadata;
  open_badges_metadata?: {
    badge_name: string;
    badge_version: string;
    standard: string;
    portable: boolean;
    credential_subject: string;
    verification_hash: string;
    issuer: string;
  };
  gemini_execution_metadata?: {
    model_used: string;
    duration_ms: number;
    prompt_snippet: string;
    response_schema_snippet: string;
    raw_response_json: string;
    tokens_evaluated?: number;
  };
  appeals?: Array<{
    id: string;
    parameter_id: string;
    parameter_name: string;
    candidate_reason: string;
    status: 'pending_supervisor' | 'reviewed';
    submitted_at: string;
  }>;
  anti_cheat_analysis?: {
    status: string;
    note: string;
  };
  hris_dispatch_status?: {
    dispatched: boolean;
    status: string;
    system?: string;
    timestamp?: string;
    signature_digest?: string;
  };
  created_at: string;
}

export type CustomerPressureLevel = 'standard' | 'high_pressure';

export interface HRISWebhookConfig {
  id: string;
  system_name: 'SAP SuccessFactors' | 'Workday HCM' | 'Mekari Talenta' | 'Custom Enterprise Webhook';
  webhook_url: string;
  secret_key: string;
  auto_dispatch_on_pass: boolean;
  last_dispatch_at?: string;
  last_status_code?: number;
  last_payload_preview?: string;
}

export interface HRISDispatchLog {
  id: string;
  candidate_name: string;
  scenario_title: string;
  score: number;
  badge_name: string;
  timestamp: string;
  status_code: number;
  signature_digest: string;
  target_url: string;
}

export interface DialectTestItem {
  dialect?: string;
  name?: string;
  text?: string;
  composite_score?: number;
  passed?: boolean;
  parameter_scores?: Array<{ parameter_id: string; score: number; evidence_note: string }>;
  dialect_name?: string;
  accent_style?: string;
  spoken_sample?: string;
  semantic_fulfillment_score?: number;
  extracted_intent?: string;
  neutrality_verdict?: string;
}

export interface DialectInvarianceReport {
  success?: boolean;
  label?: string;
  scenario_title: string;
  base_standard_sentence?: string;
  total_dialects_tested?: number;
  passed_count?: number;
  failed_count?: number;
  max_score?: number;
  min_score?: number;
  max_score_difference?: number;
  parameter_tested?: string;
  invariance_percentage?: number;
  is_fair?: boolean;
  results: DialectTestItem[];
  audit_summary?: string;
  raw_json?: string | null;
  status?: string;
  error?: string;
}

export interface CustomerReactionResponse {
  customer_line: string;
  sentiment: 'impressed' | 'satisfied' | 'clarifying' | 'dissatisfied';
  customer_observation: string;
  follow_up_prompt?: string;
}

export interface CustomSOPInput {
  brand_name: string;
  industry: string;
  role_title: string;
  raw_sop_text: string;
}

export interface CoachingDrillRequest {
  session_id: string;
  parameter_id: string;
  practice_input: string;
}

export interface CoachingDrillResponse {
  parameter_id: string;
  parameter_name: string;
  practice_input: string;
  improved_score: number;
  passed: boolean;
  coach_feedback: string;
  strengths: string[];
  areas_to_polish: string[];
}

export interface BranchPerformance {
  branch_id: string;
  branch_name: string;
  city: string;
  total_assessments: number;
  pass_rate: number;
  avg_score: number;
  top_risk_parameter: string;
}

export interface CohortAnalytics {
  overview: {
    total_candidates_assessed: number;
    overall_pass_rate: number;
    average_score: number;
    total_hr_hours_saved: number;
    anti_bias_compliance_rate?: number;
  };
  branches: BranchPerformance[];
  parameter_defect_heatmap: {
    parameter_id: string;
    parameter_name: string;
    category: 'Universal' | 'Brand-Specific';
    failure_percentage: number;
    trend: 'improving' | 'stable' | 'needs_training';
  }[];
  recent_candidate_assessments: {
    id: string;
    candidate_code: string;
    scenario_title: string;
    score: number;
    status: 'passed' | 'needs_review';
    date: string;
  }[];
}

// Enterprise CTO & Architecture Telemetry Types
export type NetworkResilienceProfile = '5g_hq' | '4g_adaptive' | '3t_frontier';

export interface QueueWorkerStats {
  id: string;
  name: string;
  status: 'active' | 'draining' | 'idle';
  activeJobs: number;
  completed24h: number;
  p95LatencyMs: number;
  failureRate: number;
  podCount: number;
}

export interface EnterpriseTelemetryData {
  systemScore: string; // e.g. "10/10 Enterprise Grade"
  cluster: {
    region: string;
    totalWorkers: number;
    maxAutoscalePods: number;
    activeConcurrency: number;
    tokenBucketCapacity: number;
    edgeCacheHitRate: number;
  };
  queues: QueueWorkerStats[];
  resilienceProfiles: {
    profile: NetworkResilienceProfile;
    label: string;
    bandwidthKbps: number;
    videoResolution: string;
    compressionMethod: string;
    offlineBufferEnabled: boolean;
  }[];
  dialectParityMatrix: {
    regionName: string;
    dialectLabel: string;
    sampleCount: number;
    avgScore: number;
    disparateImpactRatio: number; // >0.8 is compliant
    werRate: number;
    verdict: 'Compliant' | 'Audited';
  }[];
  webhooks: {
    id: string;
    destination: string;
    endpointUrl: string;
    eventSubscribed: string;
    status: 'active' | 'testing';
    lastDeliveryStatus: number;
    signatureAlgorithm: string;
  }[];
}

export interface WebhookDispatchResult {
  success: boolean;
  timestamp: string;
  destination: string;
  event: string;
  payload: Record<string, unknown>;
  signature: string;
  httpStatus: number;
  latencyMs: number;
  responseBody: string;
}

