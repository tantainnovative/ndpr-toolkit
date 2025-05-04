import React, { useState, useEffect } from 'react';
import { ConsentOption, ConsentSettings } from '../../types/consent';

export interface ConsentManagerProps {
  /**
   * Array of consent options to display
   */
  options: ConsentOption[];
  
  /**
   * Current consent settings
   */
  settings?: ConsentSettings;
  
  /**
   * Callback function called when user saves their consent choices
   */
  onSave: (settings: ConsentSettings) => void;
  
  /**
   * Title displayed in the manager
   * @default "Manage Your Privacy Settings"
   */
  title?: string;
  
  /**
   * Description text displayed in the manager
   * @default "Update your consent preferences at any time. Required cookies cannot be disabled as they are necessary for the website to function."
   */
  description?: string;
  
  /**
   * Text for the save button
   * @default "Save Preferences"
   */
  saveButtonText?: string;
  
  /**
   * Text for the reset button
   * @default "Reset to Defaults"
   */
  resetButtonText?: string;
  
  /**
   * Version of the consent form
   * @default "1.0"
   */
  version?: string;
  
  /**
   * Custom CSS class for the manager
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
  
  /**
   * Whether to show a success message after saving
   * @default true
   */
  showSuccessMessage?: boolean;
  
  /**
   * Success message to display after saving
   * @default "Your preferences have been saved."
   */
  successMessage?: string;
  
  /**
   * Duration to show the success message (in milliseconds)
   * @default 3000
   */
  successMessageDuration?: number;
}

export const ConsentManager: React.FC<ConsentManagerProps> = ({
  options,
  settings,
  onSave,
  title = "Manage Your Privacy Settings",
  description = "Update your consent preferences at any time. Required cookies cannot be disabled as they are necessary for the website to function.",
  saveButtonText = "Save Preferences",
  resetButtonText = "Reset to Defaults",
  version = "1.0",
  className = "",
  buttonClassName = "",
  primaryButtonClassName = "",
  secondaryButtonClassName = "",
  showSuccessMessage = true,
  successMessage = "Your preferences have been saved.",
  successMessageDuration = 3000
}) => {
  const [consents, setConsents] = useState<Record<string, boolean>>({});
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  
  // Initialize consents from settings or options
  useEffect(() => {
    if (settings && settings.consents) {
      setConsents(settings.consents);
    } else {
      const initialConsents: Record<string, boolean> = {};
      options.forEach(option => {
        initialConsents[option.id] = option.defaultValue || false;
      });
      setConsents(initialConsents);
    }
  }, [options, settings]);
  
  const handleToggleConsent = (id: string, value: boolean) => {
    setConsents(prev => ({
      ...prev,
      [id]: value
    }));
  };
  
  const handleSave = () => {
    const newSettings: ConsentSettings = {
      consents,
      timestamp: Date.now(),
      version,
      method: 'manager',
      hasInteracted: true
    };
    
    onSave(newSettings);
    
    if (showSuccessMessage) {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, successMessageDuration);
    }
  };
  
  const handleReset = () => {
    const defaultConsents: Record<string, boolean> = {};
    options.forEach(option => {
      defaultConsents[option.id] = option.defaultValue || false;
    });
    setConsents(defaultConsents);
  };
  
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 ${className}`}>
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="mb-6 text-gray-600 dark:text-gray-300">{description}</p>
      
      <div className="space-y-6">
        {options.map(option => (
          <div key={option.id} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">{option.label}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{option.description}</p>
              </div>
              <div className="ml-4 flex-shrink-0">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={consents[option.id] || false}
                    onChange={e => handleToggleConsent(option.id, e.target.checked)}
                    disabled={option.required}
                  />
                  <div className={`w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 ${option.required ? 'opacity-60' : ''}`}></div>
                  <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                    {consents[option.id] ? 'Enabled' : 'Disabled'}
                    {option.required && <span className="text-xs text-red-500 ml-1">(Required)</span>}
                  </span>
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {showSuccess && (
        <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200 rounded-md">
          {successMessage}
        </div>
      )}
      
      <div className="mt-6 flex flex-wrap gap-3">
        <button
          onClick={handleSave}
          className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 ${buttonClassName} ${primaryButtonClassName}`}
        >
          {saveButtonText}
        </button>
        <button
          onClick={handleReset}
          className={`px-4 py-2 bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white rounded hover:bg-gray-300 dark:hover:bg-gray-600 ${buttonClassName} ${secondaryButtonClassName}`}
        >
          {resetButtonText}
        </button>
      </div>
      
      <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
        <p>Last updated: {settings ? new Date(settings.timestamp).toLocaleString() : 'Never'}</p>
        <p>Version: {version}</p>
      </div>
    </div>
  );
};
