import { DSRRequest } from '../types/dsr';
/**
 * Formats a DSR request for display or submission
 * @param request The DSR request to format
 * @returns Formatted request data
 */
export declare function formatDSRRequest(request: DSRRequest): {
    formattedRequest: Record<string, any>;
    isValid: boolean;
    validationErrors: string[];
};
