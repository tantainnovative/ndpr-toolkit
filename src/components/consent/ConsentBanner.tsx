'use client';

import { useState } from 'react';
import { ConsentOption, ConsentType } from '@/types';
import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';

interface ConsentBannerProps {
  title?: string;
  description?: string;
  privacyPolicyUrl?: string;
  options: ConsentOption[];
  onSave: (consents: Record<ConsentType, boolean>) => void;
  onClose?: () => void;
  className?: string;
}

export default function ConsentBanner({
  title = 'Privacy Preferences',
  description = 'We use cookies and similar technologies to provide certain features, enhance the user experience and deliver content that is relevant to your interests.',
  privacyPolicyUrl = '/privacy-policy',
  options,
  onSave,
  className = '',
}: ConsentBannerProps) {
  const [consents, setConsents] = useState<Record<ConsentType, boolean>>(
    options.reduce((acc, option) => {
      acc[option.id] = option.defaultValue;
      return acc;
    }, {} as Record<ConsentType, boolean>)
  );

  const handleToggle = (id: ConsentType) => {
    const option = options.find(opt => opt.id === id);
    if (option?.required) return;
    
    setConsents(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleAcceptAll = () => {
    const allConsents = options.reduce((acc, option) => {
      acc[option.id] = true;
      return acc;
    }, {} as Record<ConsentType, boolean>);
    
    setConsents(allConsents);
    onSave(allConsents);
  };

  const handleSave = () => {
    onSave(consents);
  };

  const handleRejectAll = () => {
    const rejectedConsents = options.reduce((acc, option) => {
      acc[option.id] = option.required ? true : false;
      return acc;
    }, {} as Record<ConsentType, boolean>);
    
    setConsents(rejectedConsents);
    onSave(rejectedConsents);
  };

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-50 ${className}`}>
      <Card className="max-w-7xl mx-auto border-t border-gray-200 dark:border-gray-700 shadow-lg rounded-t-lg rounded-b-none">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
          <a 
            href={privacyPolicyUrl} 
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline mt-1 inline-block"
          >
            View our Privacy Policy
          </a>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {options.map((option) => (
              <Checkbox
                key={option.id}
                id={`consent-${option.id}`}
                checked={consents[option.id]}
                onChange={() => handleToggle(option.id)}
                disabled={option.required}
                label={`${option.label} ${option.required ? '(Required)' : ''}`}
                description={option.description}
              />
            ))}
          </div>
        </CardContent>
        
        <CardFooter className="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-2">
          <Button 
            variant="secondary" 
            onClick={handleRejectAll}
          >
            Reject All
          </Button>
          <Button 
            variant="primary" 
            onClick={handleSave}
          >
            Save Preferences
          </Button>
          <Button 
            variant="success" 
            onClick={handleAcceptAll}
          >
            Accept All
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
