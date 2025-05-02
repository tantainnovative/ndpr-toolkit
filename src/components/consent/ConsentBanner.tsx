'use client';

import { useState } from 'react';
import { ConsentOption, ConsentType } from '@/types';

interface ConsentBannerProps {
  title?: string;
  description?: string;
  privacyPolicyUrl?: string;
  options: ConsentOption[];
  onSave: (consents: Record<ConsentType, boolean>) => void;
  onClose?: () => void;
  className?: string;
}

export default function ConsentBanner({
  title = 'Privacy Preferences',
  description = 'We use cookies and similar technologies to provide certain features, enhance the user experience and deliver content that is relevant to your interests.',
  privacyPolicyUrl = '/privacy-policy',
  options,
  onSave,
  onClose,
  className = '',
}: ConsentBannerProps) {
  const [consents, setConsents] = useState<Record<ConsentType, boolean>>(
    options.reduce((acc, option) => {
      acc[option.id] = option.defaultValue;
      return acc;
    }, {} as Record<ConsentType, boolean>)
  );

  const handleToggle = (id: ConsentType) => {
    const option = options.find(opt => opt.id === id);
    if (option?.required) return;
    
    setConsents(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleAcceptAll = () => {
    const allConsents = options.reduce((acc, option) => {
      acc[option.id] = true;
      return acc;
    }, {} as Record<ConsentType, boolean>);
    
    setConsents(allConsents);
    onSave(allConsents);
  };

  const handleSave = () => {
    onSave(consents);
  };

  const handleRejectAll = () => {
    const rejectedConsents = options.reduce((acc, option) => {
      acc[option.id] = option.required ? true : false;
      return acc;
    }, {} as Record<ConsentType, boolean>);
    
    setConsents(rejectedConsents);
    onSave(rejectedConsents);
  };

  return (
    <div className={`fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 shadow-lg border-t border-gray-200 dark:border-gray-700 p-4 z-50 ${className}`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h2>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{description}</p>
            <a 
              href={privacyPolicyUrl} 
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline mt-1 inline-block"
            >
              View our Privacy Policy
            </a>
          </div>
          
          <div className="space-y-3">
            {options.map((option) => (
              <div key={option.id} className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id={`consent-${option.id}`}
                    type="checkbox"
                    checked={consents[option.id]}
                    onChange={() => handleToggle(option.id)}
                    disabled={option.required}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 disabled:opacity-70"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label 
                    htmlFor={`consent-${option.id}`} 
                    className={`font-medium ${option.required ? 'text-gray-700 dark:text-gray-300' : 'text-gray-900 dark:text-white'}`}
                  >
                    {option.label} {option.required && <span className="text-xs text-gray-500">(Required)</span>}
                  </label>
                  <p className="text-gray-500 dark:text-gray-400">{option.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-2">
            <button
              type="button"
              onClick={handleRejectAll}
              className="inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Reject All
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Save Preferences
            </button>
            <button
              type="button"
              onClick={handleAcceptAll}
              className="inline-flex justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
