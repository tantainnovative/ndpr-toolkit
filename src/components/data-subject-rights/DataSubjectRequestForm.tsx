'use client';

import { useState } from 'react';
import { RequestType } from '@/types';

interface DataSubjectRequestFormProps {
  onSubmit: (data: {
    requestType: RequestType;
    name: string;
    email: string;
    details: string;
  }) => void;
  className?: string;
}

export default function DataSubjectRequestForm({
  onSubmit,
  className = '',
}: DataSubjectRequestFormProps) {
  const [formData, setFormData] = useState({
    requestType: 'access' as RequestType,
    name: '',
    email: '',
    details: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const requestTypeOptions: { value: RequestType; label: string; description: string }[] = [
    {
      value: 'access',
      label: 'Access to Personal Data',
      description: 'Request a copy of your personal data that we process',
    },
    {
      value: 'rectification',
      label: 'Rectification of Data',
      description: 'Request correction of inaccurate personal data',
    },
    {
      value: 'erasure',
      label: 'Erasure of Data',
      description: 'Request deletion of your personal data ("right to be forgotten")',
    },
    {
      value: 'restrict-processing',
      label: 'Restriction of Processing',
      description: 'Request to restrict how we process your data',
    },
    {
      value: 'data-portability',
      label: 'Data Portability',
      description: 'Request to receive your data in a structured, machine-readable format',
    },
    {
      value: 'object',
      label: 'Object to Processing',
      description: 'Object to processing of your personal data',
    },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.details.trim()) {
      newErrors.details = 'Please provide details about your request';
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
        requestType: formData.requestType,
        name: formData.name,
        email: formData.email,
        details: formData.details,
      });
      
      // Reset form after successful submission
      setFormData({
        requestType: 'access',
        name: '',
        email: '',
        details: '',
      });
    } catch (error) {
      console.error('Error submitting request:', error);
      setErrors({
        submit: 'An error occurred while submitting your request. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`bg-white dark:bg-gray-800 shadow rounded-lg p-6 ${className}`}>
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
        Submit a Data Subject Request
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="requestType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Request Type
          </label>
          <select
            id="requestType"
            name="requestType"
            value={formData.requestType}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
          >
            {requestTypeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {requestTypeOptions.find((option) => option.value === formData.requestType)?.description}
          </p>
        </div>
        
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
              errors.name
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500'
            } dark:bg-gray-700 dark:text-white`}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
              errors.email
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500'
            } dark:bg-gray-700 dark:text-white`}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="details" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Request Details
          </label>
          <textarea
            id="details"
            name="details"
            rows={4}
            value={formData.details}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
              errors.details
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500'
            } dark:bg-gray-700 dark:text-white`}
            placeholder="Please provide specific details about your request..."
          />
          {errors.details && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.details}</p>
          )}
        </div>
        
        {errors.submit && (
          <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-4">
            <p className="text-sm text-red-700 dark:text-red-400">{errors.submit}</p>
          </div>
        )}
        
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Request'}
          </button>
        </div>
      </form>
    </div>
  );
}
