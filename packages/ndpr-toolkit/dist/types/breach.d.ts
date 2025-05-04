/**
 * Represents a data breach category
 */
export interface BreachCategory {
    /**
     * Unique identifier for the category
     */
    id: string;
    /**
     * Display name for the category
     */
    name: string;
    /**
     * Description of this breach category
     */
    description: string;
    /**
     * Default severity level for this category
     */
    defaultSeverity: 'low' | 'medium' | 'high' | 'critical';
}
/**
 * Represents a data breach report
 */
export interface BreachReport {
    /**
     * Unique identifier for the breach report
     */
    id: string;
    /**
     * Title/summary of the breach
     */
    title: string;
    /**
     * Detailed description of the breach
     */
    description: string;
    /**
     * Category of the breach
     */
    category: string;
    /**
     * Timestamp when the breach was discovered
     */
    discoveredAt: number;
    /**
     * Timestamp when the breach occurred (if known)
     */
    occurredAt?: number;
    /**
     * Timestamp when the breach was reported internally
     */
    reportedAt: number;
    /**
     * Person who reported the breach
     */
    reporter: {
        name: string;
        email: string;
        department: string;
        phone?: string;
    };
    /**
     * Systems or data affected by the breach
     */
    affectedSystems: string[];
    /**
     * Types of data involved in the breach
     */
    dataTypes: string[];
    /**
     * Estimated number of data subjects affected
     */
    estimatedAffectedSubjects?: number;
    /**
     * Whether the breach is ongoing or contained
     */
    status: 'ongoing' | 'contained' | 'resolved';
    /**
     * Initial actions taken to address the breach
     */
    initialActions?: string;
    /**
     * Attachments related to the breach (e.g., screenshots, logs)
     */
    attachments?: Array<{
        id: string;
        name: string;
        type: string;
        url: string;
        addedAt: number;
    }>;
}
/**
 * Represents a risk assessment for a data breach
 */
export interface RiskAssessment {
    /**
     * Unique identifier for the risk assessment
     */
    id: string;
    /**
     * ID of the breach this assessment is for
     */
    breachId: string;
    /**
     * Timestamp when the assessment was conducted
     */
    assessedAt: number;
    /**
     * Person who conducted the assessment
     */
    assessor: {
        name: string;
        role: string;
        email: string;
    };
    /**
     * Confidentiality impact (1-5)
     */
    confidentialityImpact: number;
    /**
     * Integrity impact (1-5)
     */
    integrityImpact: number;
    /**
     * Availability impact (1-5)
     */
    availabilityImpact: number;
    /**
     * Likelihood of harm to data subjects (1-5)
     */
    harmLikelihood: number;
    /**
     * Severity of potential harm to data subjects (1-5)
     */
    harmSeverity: number;
    /**
     * Overall risk score
     */
    overallRiskScore: number;
    /**
     * Risk level based on the overall score
     */
    riskLevel: 'low' | 'medium' | 'high' | 'critical';
    /**
     * Whether the breach is likely to result in a risk to the rights and freedoms of data subjects
     */
    risksToRightsAndFreedoms: boolean;
    /**
     * Whether the breach is likely to result in a high risk to the rights and freedoms of data subjects
     */
    highRisksToRightsAndFreedoms: boolean;
    /**
     * Justification for the risk assessment
     */
    justification: string;
}
/**
 * Represents notification requirements for a data breach
 */
export interface NotificationRequirement {
    /**
     * Whether NITDA notification is required
     */
    nitdaNotificationRequired: boolean;
    /**
     * Deadline for NITDA notification (72 hours from discovery)
     */
    nitdaNotificationDeadline: number;
    /**
     * Whether data subject notification is required
     */
    dataSubjectNotificationRequired: boolean;
    /**
     * Justification for the notification decision
     */
    justification: string;
}
/**
 * Represents a notification sent to NITDA
 */
export interface RegulatoryNotification {
    /**
     * Unique identifier for the notification
     */
    id: string;
    /**
     * ID of the breach this notification is for
     */
    breachId: string;
    /**
     * Timestamp when the notification was sent
     */
    sentAt: number;
    /**
     * Method used to send the notification
     */
    method: 'email' | 'portal' | 'letter' | 'other';
    /**
     * Reference number assigned by NITDA (if available)
     */
    referenceNumber?: string;
    /**
     * Contact person at NITDA
     */
    nitdaContact?: {
        name: string;
        email: string;
        phone?: string;
    };
    /**
     * Content of the notification
     */
    content: string;
    /**
     * Attachments included with the notification
     */
    attachments?: Array<{
        id: string;
        name: string;
        type: string;
        url: string;
    }>;
    /**
     * Follow-up communications with NITDA
     */
    followUps?: Array<{
        timestamp: number;
        direction: 'sent' | 'received';
        content: string;
        attachments?: Array<{
            id: string;
            name: string;
            type: string;
            url: string;
        }>;
    }>;
}
