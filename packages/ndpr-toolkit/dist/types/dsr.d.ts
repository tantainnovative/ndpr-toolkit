/**
 * Represents a type of data subject request
 */
export type DSRType = 'access' | 'rectification' | 'erasure' | 'restriction' | 'portability' | 'objection';
/**
 * Status of a data subject request
 */
export type DSRStatus = 'pending' | 'awaitingVerification' | 'inProgress' | 'completed' | 'rejected';
/**
 * Represents a type of data subject request (detailed configuration)
 */
export interface RequestType {
    /**
     * Unique identifier for the request type
     */
    id: string;
    /**
     * Display name for the request type
     */
    name: string;
    /**
     * Description of what this request type entails
     */
    description: string;
    /**
     * Estimated time to fulfill this type of request (in days)
     */
    estimatedCompletionTime: number;
    /**
     * Whether additional information is required for this request type
     */
    requiresAdditionalInfo: boolean;
    /**
     * Custom fields required for this request type
     */
    additionalFields?: Array<{
        id: string;
        label: string;
        type: 'text' | 'textarea' | 'select' | 'checkbox' | 'file';
        options?: string[];
        required: boolean;
        placeholder?: string;
    }>;
}
/**
 * Legacy status of a data subject request
 * @deprecated Use DSRStatus instead
 */
export type RequestStatus = 'pending' | 'verifying' | 'processing' | 'completed' | 'rejected';
/**
 * Represents a data subject request
 */
export interface DSRRequest {
    /**
     * Unique identifier for the request
     */
    id: string;
    /**
     * Type of request
     */
    type: DSRType;
    /**
     * Current status of the request
     */
    status: DSRStatus;
    /**
     * Timestamp when the request was submitted
     */
    createdAt: number;
    /**
     * Timestamp when the request was last updated
     */
    updatedAt: number;
    /**
     * Timestamp when the request was completed (if applicable)
     */
    completedAt?: number;
    /**
     * Timestamp when the identity was verified (if applicable)
     */
    verifiedAt?: number;
    /**
     * Due date for responding to the request (timestamp)
     */
    dueDate?: number;
    /**
     * Description or details of the request
     */
    description?: string;
    /**
     * Data subject information
     */
    subject: {
        /**
         * Name of the data subject
         */
        name: string;
        /**
         * Email address of the data subject
         */
        email: string;
        /**
         * Phone number of the data subject (optional)
         */
        phone?: string;
        /**
         * Identifier used to verify the data subject's identity (optional)
         */
        identifierValue?: string;
        /**
         * Type of identifier used (e.g., "email", "account", "customer_id") (optional)
         */
        identifierType?: string;
    };
    /**
     * Additional information provided by the data subject
     */
    additionalInfo?: Record<string, any>;
    /**
     * Notes added by staff processing the request
     */
    internalNotes?: Array<{
        timestamp: number;
        author: string;
        note: string;
    }>;
    /**
     * Verification status
     */
    verification?: {
        /**
         * Whether the identity has been verified
         */
        verified: boolean;
        /**
         * Method used for verification
         */
        method?: string;
        /**
         * Timestamp when verification was completed
         */
        verifiedAt?: number;
        /**
         * Staff member who performed the verification
         */
        verifiedBy?: string;
    };
    /**
     * Reason for rejection (if status is 'rejected')
     */
    rejectionReason?: string;
    /**
     * Files attached to the request (e.g., exported data, verification documents)
     */
    attachments?: Array<{
        id: string;
        name: string;
        type: string;
        url: string;
        addedAt: number;
    }>;
}
