import React, { useState, useEffect } from 'react';
import { ConsentOption, ConsentSettings } from '../../types/consent';

export interface ConsentBannerProps {
  /**
   * Array of consent options to display
   */
  options: ConsentOption[];
  
  /**
   * Callback function called when user saves their consent choices
   */
  onSave: (settings: ConsentSettings) => void;
  
  /**
   * Title displayed on the banner
   * @default "We Value Your Privacy"
   */
  title?: string;
  
  /**
   * Description text displayed on the banner
   * @default "We use cookies and similar technologies to provide our services and enhance your experience."
   */
  description?: string;
  
  /**
   * Text for the accept all button
   * @default "Accept All"
   */
  acceptAllButtonText?: string;
  
  /**
   * Text for the reject all button
   * @default "Reject All"
   */
  rejectAllButtonText?: string;
  
  /**
   * Text for the customize button
   * @default "Customize"
   */
  customizeButtonText?: string;
  
  /**
   * Text for the save button
   * @default "Save Preferences"
   */
  saveButtonText?: string;
  
  /**
   * Position of the banner
   * @default "bottom"
   */
  position?: 'top' | 'bottom' | 'center';
  
  /**
   * Version of the consent form
   * @default "1.0"
   */
  version?: string;
  
  /**
   * Whether to show the banner
   * If not provided, the banner will be shown if no consent has been saved
   */
  show?: boolean;
  
  /**
   * Storage key for consent settings
   * @default "ndpr_consent"
   */
  storageKey?: string;
  
  /**
   * Custom CSS class for the banner
   */
  className?: string;
  
  /**
   * Custom CSS class for the buttons
   */
  buttonClassName?: string;
  
  /**
   * Custom CSS class for the primary button
   */
  primaryButtonClassName?: string;
  
  /**
   * Custom CSS class for the secondary button
   */
  secondaryButtonClassName?: string;
}

export const ConsentBanner: React.FC<ConsentBannerProps> = ({
  options,
  onSave,
  title = "We Value Your Privacy",
  description = "We use cookies and similar technologies to provide our services and enhance your experience.",
  acceptAllButtonText = "Accept All",
  rejectAllButtonText = "Reject All",
  customizeButtonText = "Customize",
  saveButtonText = "Save Preferences",
  position = "bottom",
  version = "1.0",
  show,
  storageKey = "ndpr_consent",
  className = "",
  buttonClassName = "",
  primaryButtonClassName = "",
  secondaryButtonClassName = ""
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showCustomize, setShowCustomize] = useState<boolean>(false);
  const [consents, setConsents] = useState<Record<string, boolean>>({});
  
  // Initialize consents from options
  useEffect(() => {
    const initialConsents: Record<string, boolean> = {};
    options.forEach(option => {
      initialConsents[option.id] = option.defaultValue || false;
    });
    setConsents(initialConsents);
    
    // Check if consent is already saved
    if (show === undefined) {
      const savedConsent = localStorage.getItem(storageKey);
      setIsOpen(!savedConsent);
    } else {
      setIsOpen(show);
    }
  }, [options, show, storageKey]);
  
  const handleAcceptAll = () => {
    const allConsents: Record<string, boolean> = {};
    options.forEach(option => {
      allConsents[option.id] = true;
    });
    saveConsent(allConsents);
  };
  
  const handleRejectAll = () => {
    const rejectedConsents: Record<string, boolean> = {};
    options.forEach(option => {
      rejectedConsents[option.id] = option.required || false;
    });
    saveConsent(rejectedConsents);
  };
  
  const handleToggleConsent = (id: string, value: boolean) => {
    setConsents(prev => ({
      ...prev,
      [id]: value
    }));
  };
  
  const handleSavePreferences = () => {
    saveConsent(consents);
  };
  
  const saveConsent = (consentValues: Record<string, boolean>) => {
    const settings: ConsentSettings = {
      consents: consentValues,
      timestamp: Date.now(),
      version,
      method: showCustomize ? 'customize' : 'banner',
      hasInteracted: true
    };
    
    // Save to localStorage
    localStorage.setItem(storageKey, JSON.stringify(settings));
    
    // Call onSave callback
    onSave(settings);
    
    // Close the banner
    setIsOpen(false);
    setShowCustomize(false);
  };
  
  if (!isOpen) {
    return null;
  }
  
  const positionClass = 
    position === 'top' ? 'top-0 left-0 right-0' :
    position === 'center' ? 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-lg' :
    'bottom-0 left-0 right-0';
  
  return (
    <div 
      className={`fixed z-50 bg-white dark:bg-gray-800 shadow-lg p-4 border border-gray-200 dark:border-gray-700 ${positionClass} ${className}`}
      role="dialog"
      aria-labelledby="consent-banner-title"
    >
      <div className="max-w-6xl mx-auto">
        <h2 id="consent-banner-title" className="text-lg font-bold mb-2">{title}</h2>
        <p className="mb-4">{description}</p>
        
        {showCustomize ? (
          <div className="mb-4">
            <div className="space-y-3">
              {options.map(option => (
                <div key={option.id} className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id={`consent-${option.id}`}
                      type="checkbox"
                      checked={consents[option.id] || false}
                      onChange={e => handleToggleConsent(option.id, e.target.checked)}
                      disabled={option.required}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor={`consent-${option.id}`} className="font-medium">
                      {option.label} {option.required && <span className="text-red-500">*</span>}
                    </label>
                    <p className="text-gray-500 dark:text-gray-400">{option.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                onClick={handleSavePreferences}
                className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 ${buttonClassName} ${primaryButtonClassName}`}
              >
                {saveButtonText}
              </button>
              <button
                onClick={() => setShowCustomize(false)}
                className={`px-4 py-2 bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white rounded hover:bg-gray-300 dark:hover:bg-gray-600 ${buttonClassName} ${secondaryButtonClassName}`}
              >
                Back
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleAcceptAll}
              className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 ${buttonClassName} ${primaryButtonClassName}`}
            >
              {acceptAllButtonText}
            </button>
            <button
              onClick={handleRejectAll}
              className={`px-4 py-2 bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white rounded hover:bg-gray-300 dark:hover:bg-gray-600 ${buttonClassName} ${secondaryButtonClassName}`}
            >
              {rejectAllButtonText}
            </button>
            <button
              onClick={() => setShowCustomize(true)}
              className={`px-4 py-2 bg-transparent text-gray-800 dark:text-white hover:underline ${buttonClassName}`}
            >
              {customizeButtonText}
            </button>
          </div>
        )}
        
        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          By clicking "Accept All", you agree to the use of ALL cookies. Visit our Cookie Policy to learn more.
        </div>
      </div>
    </div>
  );
};
