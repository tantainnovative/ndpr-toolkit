'use client';

import React from 'react';
import { Checkbox } from '@/components/ui/Checkbox';
import { cn } from '@/lib/utils';

interface CheckboxFieldProps {
  id: string;
  name: string;
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  description?: string;
}

export default function CheckboxField({
  id,
  name,
  label,
  checked,
  onChange,
  className = '',
  description,
}: CheckboxFieldProps) {
  return (
    <div className={cn('mb-4', className)}>
      <Checkbox
        id={id}
        name={name}
        label={label}
        checked={checked}
        onChange={onChange}
        description={description}
      />
    </div>
  );
}
