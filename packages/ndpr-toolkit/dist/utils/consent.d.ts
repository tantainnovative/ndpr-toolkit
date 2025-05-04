import { ConsentSettings } from '../types/consent';
/**
 * Validates consent settings to ensure they meet NDPR requirements
 * @param settings The consent settings to validate
 * @returns An object containing validation result and any error messages
 */
export declare function validateConsent(settings: ConsentSettings): {
    valid: boolean;
    errors: string[];
};
