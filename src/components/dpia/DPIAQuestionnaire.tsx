'use client';

import { useState } from 'react';
import { RiskAssessmentQuestion } from '@/types';

interface DPIAQuestionnaireProps {
  questions: RiskAssessmentQuestion[];
  onSubmit: (answers: Record<string, number>, projectName: string) => void;
  className?: string;
}

export default function DPIAQuestionnaire({
  questions,
  onSubmit,
  className = '',
}: DPIAQuestionnaireProps) {
  const [projectName, setProjectName] = useState('');
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Group questions by category
  const categories = questions.reduce<Record<string, RiskAssessmentQuestion[]>>(
    (acc, question) => {
      if (!acc[question.category]) {
        acc[question.category] = [];
      }
      acc[question.category].push(question);
      return acc;
    },
    {}
  );

  const categoryNames = Object.keys(categories);

  const handleAnswerChange = (questionId: string, value: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
    
    // Clear error when question is answered
    if (errors[questionId]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[questionId];
        return newErrors;
      });
    }
  };

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};
    
    if (step === 0) {
      if (!projectName.trim()) {
        newErrors.projectName = 'Project name is required';
      }
    } else {
      const category = categoryNames[step - 1];
      const categoryQuestions = categories[category];
      
      categoryQuestions.forEach((question) => {
        if (answers[question.id] === undefined) {
          newErrors[question.id] = 'Please select an answer for this question';
        }
      });
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      onSubmit(answers, projectName);
    }
  };

  const renderStepContent = () => {
    if (currentStep === 0) {
      return (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Project Information</h3>
          <div>
            <label htmlFor="projectName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Project Name
            </label>
            <input
              type="text"
              id="projectName"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
                errors.projectName
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                  : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500'
              } dark:bg-gray-700 dark:text-white`}
              placeholder="Enter the name of your project or data processing activity"
            />
            {errors.projectName && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.projectName}</p>
            )}
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            This Data Protection Impact Assessment (DPIA) will help you identify and minimize data protection risks in your project.
            Please provide accurate information to receive the most relevant recommendations.
          </p>
        </div>
      );
    }

    const category = categoryNames[currentStep - 1];
    const categoryQuestions = categories[category];

    return (
      <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">{category}</h3>
        
        {categoryQuestions.map((question) => (
          <div key={question.id} className="space-y-3">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {question.question}
            </label>
            
            <div className="space-y-2">
              {question.options.map((option) => (
                <div key={option.value} className="flex items-center">
                  <input
                    id={`${question.id}-${option.value}`}
                    name={question.id}
                    type="radio"
                    value={option.value}
                    checked={answers[question.id] === option.value}
                    onChange={() => handleAnswerChange(question.id, option.value)}
                    className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label
                    htmlFor={`${question.id}-${option.value}`}
                    className="ml-3 block text-sm text-gray-700 dark:text-gray-300"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
            
            {errors[question.id] && (
              <p className="text-sm text-red-600 dark:text-red-400">{errors[question.id]}</p>
            )}
          </div>
        ))}
      </div>
    );
  };

  const totalSteps = categoryNames.length + 1; // +1 for the project info step

  return (
    <div className={`bg-white dark:bg-gray-800 shadow rounded-lg p-6 ${className}`}>
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
        Data Protection Impact Assessment
      </h2>
      
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Step {currentStep + 1} of {totalSteps}
          </div>
          <div className="text-sm font-medium text-gray-900 dark:text-white">
            {currentStep === 0
              ? 'Project Information'
              : categoryNames[currentStep - 1]}
          </div>
        </div>
        <div className="mt-2 h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full">
          <div
            className="h-2 bg-blue-600 rounded-full"
            style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
          />
        </div>
      </div>
      
      {renderStepContent()}
      
      <div className="mt-8 flex justify-between">
        {currentStep > 0 && (
          <button
            type="button"
            onClick={handleBack}
            className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Back
          </button>
        )}
        
        {currentStep < totalSteps - 1 ? (
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
            onClick={handleSubmit}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ml-auto"
          >
            Submit Assessment
          </button>
        )}
      </div>
    </div>
  );
}
