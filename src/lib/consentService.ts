'use client';

import { ConsentRecord, ConsentType, ConsentHistoryEntry } from '@/types';
import { v4 as uuidv4 } from 'uuid';

// In a real implementation, this would connect to a database
// For demo purposes, we're using localStorage

const CONSENT_STORAGE_KEY = 'ndpr_consent_records';
const CONSENT_HISTORY_KEY = 'ndpr_consent_history';

// Helper function to get consent history
const getConsentHistoryHelper = (): ConsentHistoryEntry[] => {
  if (typeof window === 'undefined') return [];
  
  const storedHistory = localStorage.getItem(CONSENT_HISTORY_KEY);
  if (!storedHistory) return [];
  
  try {
    return JSON.parse(storedHistory) as ConsentHistoryEntry[];
  } catch (error) {
    console.error('Error parsing consent history:', error);
    return [];
  }
};

export const consentService = {
  // Save a new consent record
  saveConsent: (consents: Record<ConsentType, boolean>, userId?: string): ConsentRecord => {
    const consentRecord: ConsentRecord = {
      id: uuidv4(),
      userId,
      consents,
      timestamp: new Date().toISOString(),
      ipAddress: 'Collected server-side in real implementation',
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'Unknown',
    };

    // Store in localStorage for demo
    if (typeof window !== 'undefined') {
      // Save as current consent
      localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consentRecord));
      
      // Add to history
      const history = getConsentHistoryHelper();
      history.push(consentRecord);
      localStorage.setItem(CONSENT_HISTORY_KEY, JSON.stringify(history));
    }

    return consentRecord;
  },

  // Get the current consent record
  getCurrentConsent: (): ConsentRecord | null => {
    if (typeof window === 'undefined') return null;
    
    const storedConsent = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!storedConsent) return null;
    
    try {
      return JSON.parse(storedConsent) as ConsentRecord;
    } catch (error) {
      console.error('Error parsing consent record:', error);
      return null;
    }
  },

  // Get consent history
  getConsentHistory: (): ConsentHistoryEntry[] => {
    return getConsentHistoryHelper();
  },

  // Update consent with change reason
  updateConsent: (
    consents: Record<ConsentType, boolean>, 
    changeReason?: string,
    userId?: string
  ): ConsentRecord => {
    const consentRecord: ConsentHistoryEntry = {
      id: uuidv4(),
      userId,
      consents,
      timestamp: new Date().toISOString(),
      ipAddress: 'Collected server-side in real implementation',
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'Unknown',
      changeReason
    };

    // Store in localStorage for demo
    if (typeof window !== 'undefined') {
      // Save as current consent
      localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consentRecord));
      
      // Add to history
      const history = getConsentHistoryHelper();
      history.push(consentRecord);
      localStorage.setItem(CONSENT_HISTORY_KEY, JSON.stringify(history));
    }

    return consentRecord;
  },

  // Clear all consent data (for testing/development)
  clearConsentData: (): void => {
    if (typeof window === 'undefined') return;
    
    localStorage.removeItem(CONSENT_STORAGE_KEY);
    localStorage.removeItem(CONSENT_HISTORY_KEY);
  },

  // Check if a specific consent is granted
  hasConsent: (type: ConsentType): boolean => {
    const current = consentService.getCurrentConsent();
    if (!current) return false;
    return current.consents[type] === true;
  }
};

export default consentService;
