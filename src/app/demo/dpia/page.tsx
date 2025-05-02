'use client';

import { useState } from 'react';
import Link from 'next/link';
import DPIAQuestionnaire from '@/components/dpia/DPIAQuestionnaire';
import { dpiaQuestions } from '@/lib/dpiaQuestions';
import { RiskAssessment } from '@/types';
import { v4 as uuidv4 } from 'uuid';

export default function DPIADemo() {
  const [assessment, setAssessment] = useState<RiskAssessment | null>(null);
  const [showQuestionnaire, setShowQuestionnaire] = useState(true);

  const handleSubmitAssessment = (answers: Record<string, number>, projectName: string) => {
    // Calculate risk score
    let totalScore = 0;
    let maxPossibleScore = 0;
    
    dpiaQuestions.forEach((question) => {
      if (answers[question.id] !== undefined) {
        totalScore += answers[question.id] * question.weight;
        maxPossibleScore += 4 * question.weight; // 4 is the max value for any answer
      }
    });
    
    // Normalize score to 0-100
    const normalizedScore = Math.round((totalScore / maxPossibleScore) * 100);
    
    // Generate recommendations based on score
    const recommendations = generateRecommendations(answers, normalizedScore);
    
    const newAssessment: RiskAssessment = {
      id: uuidv4(),
      projectName,
      assessmentDate: new Date().toISOString(),
      completedBy: 'Demo User',
      answers,
      score: normalizedScore,
      recommendations,
    };
    
    setAssessment(newAssessment);
    setShowQuestionnaire(false);
  };

  const generateRecommendations = (answers: Record<string, number>, score: number): string[] => {
    const recommendations: string[] = [];
    
    // General recommendation based on overall score
    if (score < 25) {
      recommendations.push('Your project has a low risk profile. Continue with your current data protection practices.');
    } else if (score < 50) {
      recommendations.push('Your project has a moderate risk profile. Consider implementing additional safeguards for sensitive data.');
    } else if (score < 75) {
      recommendations.push('Your project has a high risk profile. We recommend conducting a full DPIA with your Data Protection Officer.');
    } else {
      recommendations.push('Your project has a very high risk profile. Consult with your Data Protection Officer before proceeding and consider redesigning aspects of your project to reduce risks.');
    }
    
    // Specific recommendations based on individual answers
    dpiaQuestions.forEach((question) => {
      const answer = answers[question.id];
      
      if (question.id === 'data-collection-2' && answer >= 3) {
        recommendations.push('Implement additional safeguards for sensitive personal data, including encryption and access controls.');
      }
      
      if (question.id === 'data-collection-3' && answer >= 2) {
        recommendations.push('Ensure robust age verification mechanisms and parental consent processes for data collected from children.');
      }
      
      if (question.id === 'data-processing-1' && answer >= 3) {
        recommendations.push('Provide clear opt-out mechanisms for automated decision-making and ensure human review is available.');
      }
      
      if (question.id === 'data-sharing-2' && answer >= 3) {
        recommendations.push('Review international data transfer mechanisms to ensure compliance with NDPR requirements for cross-border transfers.');
      }
      
      if (question.id === 'security-1' && answer >= 3) {
        recommendations.push('Enhance your security measures with regular penetration testing and security audits.');
      }
      
      if (question.id === 'security-2' && answer >= 3) {
        recommendations.push('Develop and test a comprehensive data breach response plan that meets the 72-hour notification requirement.');
      }
    });
    
    return recommendations;
  };

  const getRiskLevelClass = (score: number) => {
    if (score < 25) {
      return 'text-green-600 dark:text-green-400';
    } else if (score < 50) {
      return 'text-yellow-600 dark:text-yellow-400';
    } else if (score < 75) {
      return 'text-orange-600 dark:text-orange-400';
    } else {
      return 'text-red-600 dark:text-red-400';
    }
  };

  const getRiskLevelText = (score: number) => {
    if (score < 25) {
      return 'Low Risk';
    } else if (score < 50) {
      return 'Moderate Risk';
    } else if (score < 75) {
      return 'High Risk';
    } else {
      return 'Very High Risk';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Data Protection Impact Assessment
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-300 sm:mt-4">
            Assess the data protection risks of your project with our DPIA tool.
          </p>
        </div>

        {showQuestionnaire ? (
          <div className="mt-12">
            <DPIAQuestionnaire 
              questions={dpiaQuestions} 
              onSubmit={handleSubmitAssessment} 
            />
          </div>
        ) : (
          <div className="mt-12">
            <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                    DPIA Results
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
                    Assessment for: {assessment?.projectName}
                  </p>
                </div>
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowQuestionnaire(true)}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Start New Assessment
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      // In a real implementation, this would download the assessment as a PDF
                      alert('In a real implementation, this would download the assessment as a PDF.');
                    }}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Export Report
                  </button>
                </div>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700">
                <dl>
                  <div className="bg-gray-50 dark:bg-gray-900 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Project Name
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                      {assessment?.projectName}
                    </dd>
                  </div>
                  <div className="bg-white dark:bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Assessment Date
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                      {assessment ? new Date(assessment.assessmentDate).toLocaleDateString() : ''}
                    </dd>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-900 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Risk Score
                    </dt>
                    <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mr-4">
                          <div 
                            className={`h-4 rounded-full ${
                              assessment && typeof assessment.score === 'number' && assessment.score < 25 
                                ? 'bg-green-500' 
                                : assessment && typeof assessment.score === 'number' && assessment.score < 50 
                                  ? 'bg-yellow-500' 
                                  : assessment && typeof assessment.score === 'number' && assessment.score < 75 
                                    ? 'bg-orange-500' 
                                    : 'bg-red-500'
                            }`}
                            style={{ width: `${assessment?.score ?? 0}%` }}
                          ></div>
                        </div>
                        <span className={`font-medium ${assessment && typeof assessment.score === 'number' ? getRiskLevelClass(assessment.score) : ''}`}>
                          {assessment?.score ?? 0}% - {assessment && typeof assessment.score === 'number' ? getRiskLevelText(assessment.score) : ''}
                        </span>
                      </div>
                    </dd>
                  </div>
                  <div className="bg-white dark:bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Recommendations
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                      <ul className="border border-gray-200 dark:border-gray-700 rounded-md divide-y divide-gray-200 dark:divide-gray-700">
                        {assessment?.recommendations?.map((recommendation, index) => (
                          <li key={index} className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                            <div className="w-0 flex-1 flex items-center">
                              <svg className="flex-shrink-0 h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                              </svg>
                              <span className="ml-2 flex-1 w-0 truncate">
                                {recommendation}
                              </span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                </dl>
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
