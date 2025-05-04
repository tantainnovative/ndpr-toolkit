import { DPIAResult } from '../types/dpia';
/**
 * Assesses the risk level of a DPIA based on the identified risks
 * @param dpiaResult The DPIA result containing risks to assess
 * @returns Assessment result with overall risk level and recommendations
 */
export declare function assessDPIARisk(dpiaResult: DPIAResult): {
    overallRiskLevel: 'low' | 'medium' | 'high' | 'critical';
    requiresConsultation: boolean;
    canProceed: boolean;
    recommendations: string[];
};
