'use client';

import { useState } from 'react';
import { BreachSeverity } from '@/types';

interface BreachNotificationFormProps {
  onSubmit: (data: {
    title: string;
    description: string;
    discoveryDate: string;
    affectedDataSubjects: number;
    dataCategories: string[];
    severity: BreachSeverity;
    mitigationSteps: string[];
    reportedToAuthorities: boolean;
    reportedToDataSubjects: boolean;
  }) => void;
  className?: string;
}

export default function BreachNotificationForm({
  onSubmit,
  className = '',
}: BreachNotificationFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    discoveryDate: '',
    affectedDataSubjects: 0,
    dataCategories: [] as string[],
    severity: 'medium' as BreachSeverity,
    mitigationSteps: [] as string[],
    reportedToAuthorities: false,
    reportedToDataSubjects: false,
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newMitigationStep, setNewMitigationStep] = useState('');
  const [newDataCategory, setNewDataCategory] = useState('');

  // Default data categories
  const defaultDataCategories = [
    'Personal identifiers (name, ID numbers)',
    'Contact information',
    'Financial information',
    'Health information',
    'Biometric data',
    'Location data',
    'Online identifiers (IP address, cookies)',
    'Credentials (usernames, passwords)',
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
    } else if (type === 'number') {
      setFormData((prev) => ({
        ...prev,
        [name]: parseInt(value) || 0,
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

  const handleDataCategoryToggle = (category: string) => {
    setFormData((prev) => {
      const updatedCategories = prev.dataCategories.includes(category)
        ? prev.dataCategories.filter((c) => c !== category)
        : [...prev.dataCategories, category];
      
      return {
        ...prev,
        dataCategories: updatedCategories,
      };
    });
    
    // Clear error when field is edited
    if (errors.dataCategories) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.dataCategories;
        return newErrors;
      });
    }
  };

  const handleAddDataCategory = () => {
    if (newDataCategory.trim()) {
      setFormData((prev) => ({
        ...prev,
        dataCategories: [...prev.dataCategories, newDataCategory.trim()],
      }));
      setNewDataCategory('');
      
      // Clear error when field is edited
      if (errors.dataCategories) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.dataCategories;
          return newErrors;
        });
      }
    }
  };

  const handleAddMitigationStep = () => {
    if (newMitigationStep.trim()) {
      setFormData((prev) => ({
        ...prev,
        mitigationSteps: [...prev.mitigationSteps, newMitigationStep.trim()],
      }));
      setNewMitigationStep('');
      
      // Clear error when field is edited
      if (errors.mitigationSteps) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.mitigationSteps;
          return newErrors;
        });
      }
    }
  };

  const handleRemoveMitigationStep = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      mitigationSteps: prev.mitigationSteps.filter((_, i) => i !== index),
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.discoveryDate) {
      newErrors.discoveryDate = 'Discovery date is required';
    }
    
    if (formData.affectedDataSubjects <= 0) {
      newErrors.affectedDataSubjects = 'Number of affected data subjects must be greater than 0';
    }
    
    if (formData.dataCategories.length === 0) {
      newErrors.dataCategories = 'Please select at least one data category';
    }
    
    if (formData.mitigationSteps.length === 0) {
      newErrors.mitigationSteps = 'Please add at least one mitigation step';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // In a real implementation, this would call an API
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      
      onSubmit({
        title: formData.title,
        description: formData.description,
        discoveryDate: formData.discoveryDate,
        affectedDataSubjects: formData.affectedDataSubjects,
        dataCategories: formData.dataCategories,
        severity: formData.severity,
        mitigationSteps: formData.mitigationSteps,
        reportedToAuthorities: formData.reportedToAuthorities,
        reportedToDataSubjects: formData.reportedToDataSubjects,
      });
    } catch (error) {
      console.error('Error submitting breach notification:', error);
      setErrors({
        submit: 'An error occurred while submitting the breach notification. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`bg-white dark:bg-gray-800 shadow rounded-lg p-6 ${className}`}>
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
        Data Breach Notification Form
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Breach Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
              errors.title
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500'
            } dark:bg-gray-700 dark:text-white`}
            placeholder="Brief title describing the breach"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.title}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Breach Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            value={formData.description}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
              errors.description
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500'
            } dark:bg-gray-700 dark:text-white`}
            placeholder="Detailed description of what happened, how it happened, and the potential impact"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.description}</p>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="discoveryDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Date of Discovery
            </label>
            <input
              type="date"
              id="discoveryDate"
              name="discoveryDate"
              value={formData.discoveryDate}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
                errors.discoveryDate
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                  : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500'
              } dark:bg-gray-700 dark:text-white`}
            />
            {errors.discoveryDate && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.discoveryDate}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="affectedDataSubjects" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Number of Affected Data Subjects
            </label>
            <input
              type="number"
              id="affectedDataSubjects"
              name="affectedDataSubjects"
              min="1"
              value={formData.affectedDataSubjects}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
                errors.affectedDataSubjects
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                  : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500'
              } dark:bg-gray-700 dark:text-white`}
            />
            {errors.affectedDataSubjects && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.affectedDataSubjects}</p>
            )}
          </div>
        </div>
        
        <div>
          <label htmlFor="severity" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Breach Severity
          </label>
          <select
            id="severity"
            name="severity"
            value={formData.severity}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
          >
            <option value="low">Low - Minimal impact on data subjects</option>
            <option value="medium">Medium - Moderate impact on data subjects</option>
            <option value="high">High - Significant impact on data subjects</option>
            <option value="critical">Critical - Severe impact on data subjects</option>
          </select>
        </div>
        
        <div>
          <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Categories of Data Involved
          </span>
          {errors.dataCategories && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.dataCategories}</p>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
            {defaultDataCategories.map((category) => (
              <div key={category} className="flex items-center">
                <input
                  id={`category-${category}`}
                  type="checkbox"
                  checked={formData.dataCategories.includes(category)}
                  onChange={() => handleDataCategoryToggle(category)}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor={`category-${category}`} className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  {category}
                </label>
              </div>
            ))}
          </div>
          
          <div className="mt-3">
            <div className="flex space-x-2">
              <input
                type="text"
                id="newDataCategory"
                value={newDataCategory}
                onChange={(e) => setNewDataCategory(e.target.value)}
                placeholder="Add other data category"
                className="flex-1 rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              />
              <button
                type="button"
                onClick={handleAddDataCategory}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Add
              </button>
            </div>
          </div>
        </div>
        
        <div>
          <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Mitigation Steps Taken
          </span>
          {errors.mitigationSteps && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.mitigationSteps}</p>
          )}
          
          <div className="flex space-x-2 mb-2">
            <input
              type="text"
              id="newMitigationStep"
              value={newMitigationStep}
              onChange={(e) => setNewMitigationStep(e.target.value)}
              placeholder="e.g., Changed all passwords, Patched vulnerability"
              className="flex-1 rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
            />
            <button
              type="button"
              onClick={handleAddMitigationStep}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Add
            </button>
          </div>
          
          {formData.mitigationSteps.length > 0 && (
            <ul className="mt-2 space-y-1">
              {formData.mitigationSteps.map((step, index) => (
                <li key={index} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-2 rounded">
                  <span className="text-sm text-gray-700 dark:text-gray-300">{step}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveMitigationStep(index)}
                    className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center">
            <input
              id="reportedToAuthorities"
              name="reportedToAuthorities"
              type="checkbox"
              checked={formData.reportedToAuthorities}
              onChange={handleChange}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="reportedToAuthorities" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              Reported to Nigerian Data Protection Commission (NDPC)
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              id="reportedToDataSubjects"
              name="reportedToDataSubjects"
              type="checkbox"
              checked={formData.reportedToDataSubjects}
              onChange={handleChange}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="reportedToDataSubjects" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              Reported to affected data subjects
            </label>
          </div>
        </div>
        
        {errors.submit && (
          <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-4">
            <p className="text-sm text-red-700 dark:text-red-400">{errors.submit}</p>
          </div>
        )}
        
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Breach Notification'}
          </button>
        </div>
      </form>
    </div>
  );
}
