// Consent Management Components
export { ConsentBanner } from './components/consent/ConsentBanner';
export { ConsentManager } from './components/consent/ConsentManager';
export { ConsentStorage } from './components/consent/ConsentStorage';
export type { ConsentOption, ConsentSettings, ConsentStorageOptions } from './types/consent';

// Data Subject Rights Components
export { DSRRequestForm } from './components/dsr/DSRRequestForm';
export { DSRDashboard } from './components/dsr/DSRDashboard';
export { DSRTracker } from './components/dsr/DSRTracker';
export type { DSRRequest, RequestType, DSRStatus, DSRType, RequestStatus } from './types/dsr';

// DPIA Components
export { DPIAQuestionnaire } from './components/dpia/DPIAQuestionnaire';
export { DPIAReport } from './components/dpia/DPIAReport';
export { StepIndicator } from './components/dpia/StepIndicator';
export type { DPIAQuestion, DPIASection, DPIAResult } from './types/dpia';

// Breach Notification Components
export { BreachReportForm } from './components/breach/BreachReportForm';
export { BreachRiskAssessment } from './components/breach/BreachRiskAssessment';
export { BreachNotificationManager } from './components/breach/BreachNotificationManager';
export { RegulatoryReportGenerator } from './components/breach/RegulatoryReportGenerator';
export type { BreachReport, RiskAssessment, NotificationRequirement, RegulatoryNotification } from './types/breach';

// Privacy Policy Generator Components
export { PolicyGenerator } from './components/policy/PolicyGenerator';
export { PolicyPreview } from './components/policy/PolicyPreview';
export { PolicyExporter } from './components/policy/PolicyExporter';
export type { PolicySection, PolicyTemplate, PolicyVariable, OrganizationInfo, PrivacyPolicy } from './types/privacy';

// Utility Functions
export { validateConsent } from './utils/consent';
export { formatDSRRequest } from './utils/dsr';
export { assessDPIARisk } from './utils/dpia';
export { calculateBreachSeverity } from './utils/breach';
export { generatePolicyText } from './utils/privacy';

// Hooks
export { useConsent } from './hooks/useConsent';
export { useDSR } from './hooks/useDSR';
export { useDPIA } from './hooks/useDPIA';
export { useBreach } from './hooks/useBreach';
export { usePrivacyPolicy } from './hooks/usePrivacyPolicy';
