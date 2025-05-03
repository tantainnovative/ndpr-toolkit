'use client';

import React from 'react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
}

export default function StepIndicator({ 
  currentStep, 
  totalSteps, 
  stepLabels 
}: StepIndicatorProps) {
  return (
    <div className="mb-10" role="navigation" aria-label="Form progress">
      <div className="flex items-center justify-between">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;
          const isPending = stepNumber > currentStep;

          return (
            <div
              key={stepNumber}
              className={`flex items-center ${stepNumber < totalSteps ? 'w-full' : ''}`}
            >
              <div
                className={`
                  flex items-center justify-center w-10 h-10 rounded-full text-sm font-medium
                  transition-all duration-200 ease-in-out
                  ${isActive ? 'bg-indigo-600 text-white ring-4 ring-indigo-100 dark:ring-indigo-900/30 scale-110' : ''}
                  ${isCompleted ? 'bg-indigo-600 text-white' : ''}
                  ${isPending ? 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400' : ''}
                `}
                aria-current={isActive ? 'step' : undefined}
                aria-label={`Step ${stepNumber}: ${stepLabels[index]}`}
              >
                {isCompleted ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  stepNumber
                )}
              </div>
              {stepNumber < totalSteps && (
                <div
                  className={`
                    flex-1 h-1 mx-2 rounded-full
                    transition-all duration-200 ease-in-out
                    ${stepNumber < currentStep ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'}
                  `}
                  aria-hidden="true"
                />
              )}
            </div>
          );
        })}
      </div>
      <div className="flex justify-between mt-3">
        {stepLabels.map((label, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;

          return (
            <span 
              key={index} 
              className={`
                text-sm transition-colors duration-200 ease-in-out
                ${isActive ? 'text-indigo-600 dark:text-indigo-400 font-medium' : ''}
                ${isCompleted ? 'text-gray-700 dark:text-gray-300' : ''}
                ${!isActive && !isCompleted ? 'text-gray-500 dark:text-gray-400' : ''}
              `}
            >
              {label}
            </span>
          );
        })}
      </div>
    </div>
  );
}
