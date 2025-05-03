'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface CheckboxGroupProps {
  title: string;
  items: string[];
  selectedItems: string[];
  onToggleItem: (item: string) => void;
  required?: boolean;
  error?: string;
  columns?: 1 | 2 | 3;
  className?: string;
}

export default function CheckboxGroup({
  title,
  items,
  selectedItems,
  onToggleItem,
  required = false,
  error,
  columns = 2,
  className = '',
}: CheckboxGroupProps) {
  return (
    <div className={cn("relative", className)}>
      {title && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {title} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      
      {error && (
        <p className="mt-1 mb-2 text-sm font-medium text-red-600 dark:text-red-400">{error}</p>
      )}
      
      <div className={cn(
        "grid gap-x-4 gap-y-2 mt-1",
        columns === 1 ? "grid-cols-1" : 
        columns === 2 ? "grid-cols-1 sm:grid-cols-2" : 
        "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
      )}>
        {items.map((item) => {
          const isSelected = selectedItems.includes(item);
          const itemId = `item-${item.replace(/\s+/g, '-').toLowerCase()}`;
          
          return (
            <div key={itemId} className="flex items-start group">
              <div className="flex items-center h-5">
                <input
                  id={itemId}
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => onToggleItem(item)}
                  className={cn(
                    "h-4 w-4 rounded border-2 transition-colors duration-200",
                    "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
                    isSelected 
                      ? "bg-blue-600 border-blue-600 dark:bg-blue-500 dark:border-blue-500" 
                      : "border-gray-300 dark:border-gray-600",
                    "hover:border-blue-500 dark:hover:border-blue-400"
                  )}
                />
              </div>
              <label 
                htmlFor={itemId} 
                className={cn(
                  "ml-2 text-sm leading-tight",
                  isSelected 
                    ? "text-gray-900 dark:text-white font-medium" 
                    : "text-gray-700 dark:text-gray-300",
                  "group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-200"
                )}
              >
                {item}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}
