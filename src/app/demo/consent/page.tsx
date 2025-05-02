'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ConsentBanner from '@/components/consent/ConsentBanner';
import { ConsentOption, ConsentType, ConsentRecord } from '@/types';
import consentService from '@/lib/consentService';

export default function ConsentDemo() {
  const [showBanner, setShowBanner] = useState(false);
  const [currentConsent, setCurrentConsent] = useState<ConsentRecord | null>(null);
  const [consentHistory, setConsentHistory] = useState<ConsentRecord[]>([]);

  // Default consent options
  const consentOptions: ConsentOption[] = [
    {
      id: 'necessary',
      label: 'Necessary Cookies',
      description: 'These cookies are essential for the website to function properly.',
      required: true,
      defaultValue: true,
    },
    {
      id: 'functional',
      label: 'Functional Cookies',
      description: 'These cookies enable personalized features and functionality.',
      required: false,
      defaultValue: true,
    },
    {
      id: 'analytics',
      label: 'Analytics Cookies',
      description: 'These cookies help us understand how visitors interact with our website.',
      required: false,
      defaultValue: false,
    },
    {
      id: 'marketing',
      label: 'Marketing Cookies',
      description: 'These cookies are used to track visitors across websites to display relevant advertisements.',
      required: false,
      defaultValue: false,
    },
  ];

  useEffect(() => {
    // Load consent data on component mount
    const storedConsent = consentService.getCurrentConsent();
    setCurrentConsent(storedConsent);
    
    const history = consentService.getConsentHistory();
    setConsentHistory(history);
  }, []);

  const handleSaveConsent = (consents: Record<ConsentType, boolean>) => {
    const newConsent = consentService.saveConsent(consents);
    setCurrentConsent(newConsent);
    setShowBanner(false);
    
    // Update history
    const history = consentService.getConsentHistory();
    setConsentHistory(history);
  };

  const handleResetConsent = () => {
    consentService.clearConsentData();
    setCurrentConsent(null);
    setConsentHistory([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Consent Management Demo
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-300 sm:mt-4">
            Experience how the NDPR-compliant consent management system works.
          </p>
        </div>

        <div className="mt-10 bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
              <div>
                <h2 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                  Consent Preferences
                </h2>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Manage your cookie and tracking preferences.
                </p>
              </div>
              <div className="mt-4 md:mt-0 space-x-3">
                <button
                  type="button"
                  onClick={() => setShowBanner(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Open Consent Banner
                </button>
                <button
                  type="button"
                  onClick={handleResetConsent}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Reset Consent
                </button>
              </div>
            </div>

            {currentConsent ? (
              <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
                <h3 className="text-md font-medium text-gray-900 dark:text-white">Current Consent Status</h3>
                <div className="mt-4 bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(currentConsent.consents).map(([key, value]) => (
                      <div key={key} className="flex items-center">
                        <span className={`h-4 w-4 rounded-full ${value ? 'bg-green-500' : 'bg-red-500'}`}></span>
                        <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                          {key.charAt(0).toUpperCase() + key.slice(1)}: {value ? 'Allowed' : 'Denied'}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                    Consent recorded on: {new Date(currentConsent.timestamp).toLocaleString()}
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-md">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">No consent recorded</h3>
                      <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-300">
                        <p>
                          No consent preferences have been recorded yet. Click "Open Consent Banner" to set your preferences.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {consentHistory.length > 0 && (
              <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
                <h3 className="text-md font-medium text-gray-900 dark:text-white">Consent History</h3>
                <div className="mt-4 overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Date & Time
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Necessary
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Functional
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Analytics
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Marketing
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {consentHistory.map((record, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {new Date(record.timestamp).toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              record.consents.necessary 
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                            }`}>
                              {record.consents.necessary ? 'Allowed' : 'Denied'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              record.consents.functional 
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                            }`}>
                              {record.consents.functional ? 'Allowed' : 'Denied'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              record.consents.analytics 
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                            }`}>
                              {record.consents.analytics ? 'Allowed' : 'Denied'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              record.consents.marketing 
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                            }`}>
                              {record.consents.marketing ? 'Allowed' : 'Denied'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link 
            href="/"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
          >
            <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>

      {/* Consent Banner */}
      {showBanner && (
        <ConsentBanner
          options={consentOptions}
          onSave={handleSaveConsent}
          onClose={() => setShowBanner(false)}
        />
      )}
    </div>
  );
}
