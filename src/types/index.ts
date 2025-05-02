// Consent Management Types
export type ConsentType = 'necessary' | 'functional' | 'analytics' | 'marketing';

export interface ConsentOption {
  id: ConsentType;
  label: string;
  description: string;
  required: boolean;
  defaultValue: boolean;
}

export interface ConsentRecord {
  id: string;
  userId?: string;
  consents: Record<ConsentType, boolean>;
  timestamp: string;
  ipAddress?: string;
  userAgent?: string;
}

export interface ConsentHistoryEntry extends ConsentRecord {
  changeReason?: string;
}

// Data Subject Rights Types
export type RequestStatus = 'pending' | 'in-progress' | 'completed' | 'rejected';
export type RequestType = 
  | 'access' 
  | 'rectification' 
  | 'erasure' 
  | 'restrict-processing' 
  | 'data-portability' 
  | 'object';

export interface DataSubjectRequest {
  id: string;
  requestType: RequestType;
  requesterId: string;
  requesterEmail: string;
  requesterName: string;
  status: RequestStatus;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  notes?: string;
  attachments?: string[];
  responseData?: Record<string, unknown>;
}

// Privacy Policy Types
export interface PolicySection {
  id: string;
  title: string;
  content: string;
  required: boolean;
  order: number;
}

export interface PrivacyPolicy {
  id: string;
  organizationName: string;
  organizationContact: string;
  effectiveDate: string;
  lastUpdated: string;
  version: string;
  sections: PolicySection[];
}

// DPIA Types
export interface RiskAssessmentQuestion {
  id: string;
  question: string;
  category: string;
  weight: number;
  options: {
    value: number;
    label: string;
  }[];
}

export interface RiskAssessment {
  id: string;
  projectName: string;
  assessmentDate: string;
  completedBy: string;
  answers: Record<string, number>;
  score?: number;
  recommendations?: string[];
}

// Breach Notification Types
export type BreachSeverity = 'low' | 'medium' | 'high' | 'critical';

export interface BreachNotification {
  id: string;
  title: string;
  description: string;
  discoveryDate: string;
  reportDate: string;
  affectedDataSubjects: number;
  dataCategories: string[];
  severity: BreachSeverity;
  mitigationSteps: string[];
  reportedToAuthorities: boolean;
  reportedToDataSubjects: boolean;
}
