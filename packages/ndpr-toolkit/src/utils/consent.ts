import { ConsentSettings } from '../types/consent';

/**
 * Validates consent settings to ensure they meet NDPR requirements
 * @param settings The consent settings to validate
 * @returns An object containing validation result and any error messages
 */
export function validateConsent(settings: ConsentSettings): { 
  valid: boolean; 
  errors: string[] 
} {
  const errors: string[] = [];
  
  // Check if consents object exists
  if (!settings.consents || Object.keys(settings.consents).length === 0) {
    errors.push('Consent settings must include at least one consent option');
  }
  
  // Check if timestamp exists and is valid
  if (!settings.timestamp) {
    errors.push('Consent timestamp is required');
  } else if (typeof settings.timestamp !== 'number' || isNaN(settings.timestamp)) {
    errors.push('Consent timestamp must be a valid number');
  }
  
  // Check if version exists
  if (!settings.version) {
    errors.push('Consent version is required');
  }
  
  // Check if method exists
  if (!settings.method) {
    errors.push('Consent collection method is required');
  }
  
  // Check if hasInteracted is defined
  if (settings.hasInteracted === undefined) {
    errors.push('User interaction status is required');
  }
  
  // Check if consent is recent enough (within last 13 months for NDPR compliance)
  const thirteenMonthsAgo = Date.now() - (13 * 30 * 24 * 60 * 60 * 1000);
  if (settings.timestamp < thirteenMonthsAgo) {
    errors.push('Consent is older than 13 months and should be refreshed');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}
