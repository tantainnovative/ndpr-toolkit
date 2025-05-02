'use client';

import { useState } from 'react';
import { PolicySection } from '@/types';

interface PolicyGeneratorProps {
  onGenerate: (policy: {
    organizationName: string;
    organizationContact: string;
    sections: PolicySection[];
  }) => void;
  className?: string;
}

export default function PolicyGenerator({
  onGenerate,
  className = '',
}: PolicyGeneratorProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    organizationName: '',
    organizationContact: '',
    dataCollectionPurposes: [] as string[],
    dataRetentionPeriod: '',
    thirdPartySharing: false,
    thirdParties: [] as string[],
    securityMeasures: [] as string[],
    customSections: [] as { title: string; content: string }[],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Default data collection purposes
  const defaultDataPurposes = [
    'Providing and maintaining our services',
    'Processing transactions',
    'Sending administrative information',
    'Improving user experience',
    'Marketing and promotional communications',
    'Analytics and research',
    'Legal compliance'
  ];

  // Default security measures
  const defaultSecurityMeasures = [
    'Encryption of sensitive data',
    'Regular security assessments',
    'Access controls and authentication',
    'Data backup procedures',
    'Staff training on data protection',
    'Incident response plan',
    'Physical security measures'
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleMultiSelect = (category: 'dataCollectionPurposes' | 'securityMeasures', item: string) => {
    setFormData((prev) => {
      const currentItems = [...prev[category]];
      if (currentItems.includes(item)) {
        return {
          ...prev,
          [category]: currentItems.filter((i) => i !== item),
        };
      } else {
        return {
          ...prev,
          [category]: [...currentItems, item],
        };
      }
    });
  };

  const handleAddThirdParty = () => {
    const thirdPartyInput = document.getElementById('thirdPartyInput') as HTMLInputElement;
    if (thirdPartyInput && thirdPartyInput.value.trim()) {
      setFormData((prev) => ({
        ...prev,
        thirdParties: [...prev.thirdParties, thirdPartyInput.value.trim()],
      }));
      thirdPartyInput.value = '';
    }
  };

  const handleRemoveThirdParty = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      thirdParties: prev.thirdParties.filter((_, i) => i !== index),
    }));
  };

  const handleAddCustomSection = () => {
    const titleInput = document.getElementById('customSectionTitle') as HTMLInputElement;
    const contentInput = document.getElementById('customSectionContent') as HTMLTextAreaElement;
    
    if (titleInput && contentInput && titleInput.value.trim() && contentInput.value.trim()) {
      setFormData((prev) => ({
        ...prev,
        customSections: [
          ...prev.customSections,
          { title: titleInput.value.trim(), content: contentInput.value.trim() },
        ],
      }));
      titleInput.value = '';
      contentInput.value = '';
    }
  };

  const handleRemoveCustomSection = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      customSections: prev.customSections.filter((_, i) => i !== index),
    }));
  };

  const validateStep = (currentStep: number) => {
    const newErrors: Record<string, string> = {};
    
    if (currentStep === 1) {
      if (!formData.organizationName.trim()) {
        newErrors.organizationName = 'Organization name is required';
      }
      
      if (!formData.organizationContact.trim()) {
        newErrors.organizationContact = 'Contact information is required';
      } else if (!formData.organizationContact.includes('@') && !formData.organizationContact.match(/\d{10,}/)) {
        newErrors.organizationContact = 'Please provide a valid email or phone number';
      }
    } else if (currentStep === 2) {
      if (formData.dataCollectionPurposes.length === 0) {
        newErrors.dataCollectionPurposes = 'Please select at least one purpose for data collection';
      }
      
      if (!formData.dataRetentionPeriod.trim()) {
        newErrors.dataRetentionPeriod = 'Data retention period is required';
      }
    } else if (currentStep === 3) {
      if (formData.thirdPartySharing && formData.thirdParties.length === 0) {
        newErrors.thirdParties = 'Please add at least one third party';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleGenerate = () => {
    if (!validateStep(step)) return;
    
    // Create policy sections
    const sections: PolicySection[] = [
      {
        id: 'introduction',
        title: 'Introduction',
        content: `This Privacy Policy describes how ${formData.organizationName} collects, uses, and discloses your personal information. This policy is compliant with the Nigeria Data Protection Regulation (NDPR) and the Data Protection Act (DPA).`,
        required: true,
        order: 1,
      },
      {
        id: 'data-collection',
        title: 'Information We Collect',
        content: `We collect and process your personal data for the following purposes: ${formData.dataCollectionPurposes.join(', ')}.`,
        required: true,
        order: 2,
      },
      {
        id: 'data-retention',
        title: 'Data Retention',
        content: `We will retain your personal data for ${formData.dataRetentionPeriod}, or for as long as necessary to fulfill the purposes for which it was collected.`,
        required: true,
        order: 3,
      },
    ];
    
    // Add third-party sharing section if applicable
    if (formData.thirdPartySharing) {
      sections.push({
        id: 'third-party-sharing',
        title: 'Third-Party Sharing',
        content: `We may share your personal information with the following third parties: ${formData.thirdParties.join(', ')}.`,
        required: false,
        order: 4,
      });
    }
    
    // Add security measures section
    if (formData.securityMeasures.length > 0) {
      sections.push({
        id: 'security-measures',
        title: 'Security Measures',
        content: `We implement the following security measures to protect your personal data: ${formData.securityMeasures.join(', ')}.`,
        required: true,
        order: 5,
      });
    }
    
    // Add data subject rights section
    sections.push({
      id: 'data-subject-rights',
      title: 'Your Rights',
      content: `Under the NDPR and DPA, you have the right to access, rectify, erase, restrict processing, object to processing, and port your personal data. To exercise these rights, please contact us at ${formData.organizationContact}.`,
      required: true,
      order: 6,
    });
    
    // Add custom sections
    formData.customSections.forEach((section, index) => {
      sections.push({
        id: `custom-${index}`,
        title: section.title,
        content: section.content,
        required: false,
        order: 7 + index,
      });
    });
    
    // Add contact section
    sections.push({
      id: 'contact',
      title: 'Contact Us',
      content: `If you have any questions about this Privacy Policy, please contact us at ${formData.organizationContact}.`,
      required: true,
      order: 7 + formData.customSections.length,
    });
    
    onGenerate({
      organizationName: formData.organizationName,
      organizationContact: formData.organizationContact,
      sections,
    });
  };

  return (
    <div className={`bg-white dark:bg-gray-800 shadow rounded-lg p-6 ${className}`}>
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
        Privacy Policy Generator
      </h2>
      
      <div className="mb-6">
        <div className="flex items-center justify-between">
          {[1, 2, 3, 4].map((stepNumber) => (
            <div
              key={stepNumber}
              className={`flex items-center ${stepNumber < 4 ? 'w-full' : ''}`}
            >
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  stepNumber <= step
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}
              >
                {stepNumber}
              </div>
              {stepNumber < 4 && (
                <div
                  className={`flex-1 h-1 mx-2 ${
                    stepNumber < step
                      ? 'bg-blue-600'
                      : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-xs text-gray-500">Organization Info</span>
          <span className="text-xs text-gray-500">Data Collection</span>
          <span className="text-xs text-gray-500">Data Sharing</span>
          <span className="text-xs text-gray-500">Finalize</span>
        </div>
      </div>
      
      {/* Step 1: Organization Information */}
      {step === 1 && (
        <div className="space-y-6">
          <div>
            <label htmlFor="organizationName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Organization Name
            </label>
            <input
              type="text"
              id="organizationName"
              name="organizationName"
              value={formData.organizationName}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
                errors.organizationName
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                  : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500'
              } dark:bg-gray-700 dark:text-white`}
            />
            {errors.organizationName && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.organizationName}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="organizationContact" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Contact Information (Email or Phone)
            </label>
            <input
              type="text"
              id="organizationContact"
              name="organizationContact"
              value={formData.organizationContact}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
                errors.organizationContact
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                  : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500'
              } dark:bg-gray-700 dark:text-white`}
              placeholder="email@example.com or phone number"
            />
            {errors.organizationContact && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.organizationContact}</p>
            )}
          </div>
        </div>
      )}
      
      {/* Step 2: Data Collection */}
      {step === 2 && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Purposes for Data Collection
            </label>
            {errors.dataCollectionPurposes && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.dataCollectionPurposes}</p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
              {defaultDataPurposes.map((purpose) => (
                <div key={purpose} className="flex items-center">
                  <input
                    id={`purpose-${purpose}`}
                    type="checkbox"
                    checked={formData.dataCollectionPurposes.includes(purpose)}
                    onChange={() => handleMultiSelect('dataCollectionPurposes', purpose)}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor={`purpose-${purpose}`} className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    {purpose}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <label htmlFor="dataRetentionPeriod" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Data Retention Period
            </label>
            <select
              id="dataRetentionPeriod"
              name="dataRetentionPeriod"
              value={formData.dataRetentionPeriod}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
                errors.dataRetentionPeriod
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                  : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500'
              } dark:bg-gray-700 dark:text-white`}
            >
              <option value="">Select a retention period</option>
              <option value="1 year">1 year</option>
              <option value="2 years">2 years</option>
              <option value="3 years">3 years</option>
              <option value="5 years">5 years</option>
              <option value="7 years">7 years</option>
              <option value="10 years">10 years</option>
              <option value="as long as necessary for the purposes described">As long as necessary</option>
            </select>
            {errors.dataRetentionPeriod && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.dataRetentionPeriod}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Security Measures
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
              {defaultSecurityMeasures.map((measure) => (
                <div key={measure} className="flex items-center">
                  <input
                    id={`measure-${measure}`}
                    type="checkbox"
                    checked={formData.securityMeasures.includes(measure)}
                    onChange={() => handleMultiSelect('securityMeasures', measure)}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor={`measure-${measure}`} className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    {measure}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Step 3: Third-Party Sharing */}
      {step === 3 && (
        <div className="space-y-6">
          <div>
            <div className="flex items-center">
              <input
                id="thirdPartySharing"
                name="thirdPartySharing"
                type="checkbox"
                checked={formData.thirdPartySharing}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="thirdPartySharing" className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Do you share data with third parties?
              </label>
            </div>
          </div>
          
          {formData.thirdPartySharing && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Add Third Parties
              </label>
              {errors.thirdParties && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.thirdParties}</p>
              )}
              
              <div className="flex space-x-2 mb-2">
                <input
                  type="text"
                  id="thirdPartyInput"
                  placeholder="e.g., Google Analytics, Payment Processors"
                  className="flex-1 rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                />
                <button
                  type="button"
                  onClick={handleAddThirdParty}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Add
                </button>
              </div>
              
              {formData.thirdParties.length > 0 && (
                <div className="mt-3">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Added Third Parties:</h4>
                  <ul className="space-y-1">
                    {formData.thirdParties.map((party, index) => (
                      <li key={index} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-2 rounded">
                        <span className="text-sm text-gray-700 dark:text-gray-300">{party}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveThirdParty(index)}
                          className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
          
          <div>
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Add Custom Sections (Optional)
            </h3>
            
            <div className="space-y-3 mb-4">
              <div>
                <label htmlFor="customSectionTitle" className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                  Section Title
                </label>
                <input
                  type="text"
                  id="customSectionTitle"
                  placeholder="e.g., Cookies Policy, International Transfers"
                  className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                />
              </div>
              
              <div>
                <label htmlFor="customSectionContent" className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                  Section Content
                </label>
                <textarea
                  id="customSectionContent"
                  rows={3}
                  placeholder="Enter the content for this section..."
                  className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                />
              </div>
              
              <button
                type="button"
                onClick={handleAddCustomSection}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Add Custom Section
              </button>
            </div>
            
            {formData.customSections.length > 0 && (
              <div className="mt-3">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Added Custom Sections:</h4>
                <ul className="space-y-2">
                  {formData.customSections.map((section, index) => (
                    <li key={index} className="bg-gray-50 dark:bg-gray-700 p-3 rounded">
                      <div className="flex items-center justify-between mb-1">
                        <h5 className="font-medium text-gray-900 dark:text-white">{section.title}</h5>
                        <button
                          type="button"
                          onClick={() => handleRemoveCustomSection(index)}
                          className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                        >
                          Remove
                        </button>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">{section.content}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Step 4: Preview and Generate */}
      {step === 4 && (
        <div className="space-y-6">
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Privacy Policy Preview</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-md font-semibold text-gray-800 dark:text-gray-200">Organization Information</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <strong>Name:</strong> {formData.organizationName}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <strong>Contact:</strong> {formData.organizationContact}
                </p>
              </div>
              
              <div>
                <h4 className="text-md font-semibold text-gray-800 dark:text-gray-200">Data Collection</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <strong>Purposes:</strong> {formData.dataCollectionPurposes.join(', ')}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <strong>Retention Period:</strong> {formData.dataRetentionPeriod}
                </p>
              </div>
              
              {formData.thirdPartySharing && (
                <div>
                  <h4 className="text-md font-semibold text-gray-800 dark:text-gray-200">Third-Party Sharing</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <strong>Third Parties:</strong> {formData.thirdParties.join(', ')}
                  </p>
                </div>
              )}
              
              {formData.securityMeasures.length > 0 && (
                <div>
                  <h4 className="text-md font-semibold text-gray-800 dark:text-gray-200">Security Measures</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {formData.securityMeasures.join(', ')}
                  </p>
                </div>
              )}
              
              {formData.customSections.length > 0 && (
                <div>
                  <h4 className="text-md font-semibold text-gray-800 dark:text-gray-200">Custom Sections</h4>
                  <ul className="space-y-2">
                    {formData.customSections.map((section, index) => (
                      <li key={index} className="text-sm text-gray-600 dark:text-gray-400">
                        <strong>{section.title}</strong>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              This preview shows a summary of your privacy policy. Click "Generate Policy" to create the full document.
            </p>
          </div>
        </div>
      )}
      
      <div className="mt-8 flex justify-between">
        {step > 1 && (
          <button
            type="button"
            onClick={handleBack}
            className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Back
          </button>
        )}
        
        {step < 4 ? (
          <button
            type="button"
            onClick={handleNext}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ml-auto"
          >
            Next
          </button>
        ) : (
          <button
            type="button"
            onClick={handleGenerate}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ml-auto"
          >
            Generate Policy
          </button>
        )}
      </div>
    </div>
  );
}
