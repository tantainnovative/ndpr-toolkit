'use client';

import { DataSubjectRequest, RequestStatus } from '@/types';
import { v4 as uuidv4 } from 'uuid';

const REQUEST_STORAGE_KEY = 'ndpr_requests';

const getStoredRequests = (): DataSubjectRequest[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(REQUEST_STORAGE_KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored) as DataSubjectRequest[];
  } catch (error) {
    console.error('Error parsing requests:', error);
    return [];
  }
};

export const requestService = {
  createRequest: (
    requestType: DataSubjectRequest['requestType'],
    requesterName: string,
    requesterEmail: string,
    details: string,
    consent: boolean
  ): DataSubjectRequest => {
    const request: DataSubjectRequest = {
      id: uuidv4(),
      requestType,
      requesterId: uuidv4(),
      requesterEmail,
      requesterName,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      hasConsent: consent,
      notes: details,
    };

    if (typeof window !== 'undefined') {
      const requests = getStoredRequests();
      requests.push(request);
      localStorage.setItem(REQUEST_STORAGE_KEY, JSON.stringify(requests));
    }

    return request;
  },

  updateStatus: (id: string, status: RequestStatus): DataSubjectRequest | null => {
    if (typeof window === 'undefined') return null;
    const requests = getStoredRequests();
    const idx = requests.findIndex(r => r.id === id);
    if (idx === -1) return null;
    requests[idx].status = status;
    requests[idx].updatedAt = new Date().toISOString();
    localStorage.setItem(REQUEST_STORAGE_KEY, JSON.stringify(requests));
    return requests[idx];
  },

  getRequest: (id: string): DataSubjectRequest | null => {
    const requests = getStoredRequests();
    return requests.find(r => r.id === id) || null;
  },

  getAllRequests: (): DataSubjectRequest[] => {
    return getStoredRequests();
  },

  clear: (): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(REQUEST_STORAGE_KEY);
  },
};

export default requestService;
