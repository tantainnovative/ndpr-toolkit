import { BreachReport, RiskAssessment } from '../types/breach';
/**
 * Calculates the severity of a data breach based on various factors
 * @param report The breach report
 * @param assessment The risk assessment (if available)
 * @returns The calculated severity and notification requirements
 */
export declare function calculateBreachSeverity(report: BreachReport, assessment?: RiskAssessment): {
    severityLevel: 'low' | 'medium' | 'high' | 'critical';
    notificationRequired: boolean;
    urgentNotificationRequired: boolean;
    timeframeHours: number;
    justification: string;
};
