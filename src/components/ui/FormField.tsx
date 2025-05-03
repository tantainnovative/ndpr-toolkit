'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  label: string;
  description?: string;
  error?: string;
  required?: boolean;
}

const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  ({ id, label, description, error, required = false, className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("mb-4", className)} {...props}>
        <div className="mb-1.5">
          <label 
            htmlFor={id} 
            className="block text-sm font-medium text-gray-900 dark:text-gray-100"
          >
            {label}
            {required && <span className="ml-1 text-red-500">*</span>}
          </label>
          
          {description && (
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              {description}
            </p>
          )}
        </div>
        
        <div className="mt-1">
          {children}
        </div>
        
        {error && (
          <p className="mt-1.5 text-xs text-red-600 dark:text-red-400">
            {error}
          </p>
        )}
      </div>
    );
  }
);

FormField.displayName = "FormField";

export { FormField };
