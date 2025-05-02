'use client';

import { useState } from 'react';
import Link from 'next/link';
import PolicyGenerator from '@/components/privacy-policy/PolicyGenerator';
import { PolicySection, PrivacyPolicy } from '@/types';
import { v4 as uuidv4 } from 'uuid';

export default function PrivacyPolicyDemo() {
  const [generatedPolicy, setGeneratedPolicy] = useState<PrivacyPolicy | null>(null);
  const [showGenerator, setShowGenerator] = useState(true);

  const handleGeneratePolicy = (data: {
    organizationName: string;
    organizationContact: string;
    sections: PolicySection[];
  }) => {
    const policy: PrivacyPolicy = {
      id: uuidv4(),
      organizationName: data.organizationName,
      organizationContact: data.organizationContact,
      effectiveDate: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0],
      version: '1.0',
      sections: data.sections,
    };

    setGeneratedPolicy(policy);
    setShowGenerator(false);
  };

  const handleEditPolicy = () => {
    setShowGenerator(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Privacy Policy Generator
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-300 sm:mt-4">
            Create NDPR-compliant privacy policies with our interactive wizard.
          </p>
        </div>

        {showGenerator ? (
          <div className="mt-12">
            <PolicyGenerator onGenerate={handleGeneratePolicy} />
          </div>
        ) : (
          <div className="mt-12">
            <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                    Privacy Policy
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
                    Generated for {generatedPolicy?.organizationName}
                  </p>
                </div>
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={handleEditPolicy}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Edit Policy
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      // In a real implementation, this would download the policy as a PDF or Word document
                      alert('In a real implementation, this would download the policy as a PDF or Word document.');
                    }}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Download
                  </button>
                </div>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:px-6">
                <div className="prose dark:prose-invert max-w-none">
                  <h1>{generatedPolicy?.organizationName} Privacy Policy</h1>
                  
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                    <p>
                      <strong>Effective Date:</strong> {new Date(generatedPolicy?.effectiveDate || '').toLocaleDateString()}
                      <br />
                      <strong>Last Updated:</strong> {new Date(generatedPolicy?.lastUpdated || '').toLocaleDateString()}
                      <br />
                      <strong>Version:</strong> {generatedPolicy?.version}
                    </p>
                  </div>
                  
                  {generatedPolicy?.sections.map((section) => (
                    <div key={section.id} className="mb-6">
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                        {section.title}
                      </h2>
                      <div className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                        {section.content}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

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
    </div>
  );
}
