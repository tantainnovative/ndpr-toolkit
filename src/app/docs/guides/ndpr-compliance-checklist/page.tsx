'use client';

import Link from 'next/link';
import { DocLayout } from '@/components/docs/DocLayout';
import { Button } from '@/components/ui/Button';
import Introduction from './components/Introduction';
import KeyRequirements from './components/KeyRequirements';
import ComplianceChecklist from './components/ComplianceChecklist';
import ImplementationTools from './components/ImplementationTools';
import Resources from './components/Resources';

export default function NDPRComplianceChecklistGuide() {
  return (
    <DocLayout
      title="NDPR Compliance Checklist"
      description="A comprehensive checklist to help organizations achieve and maintain NDPR compliance"
    >
      <div className="flex mb-6 space-x-2">
        <Button asChild variant="outline" size="sm">
          <a href="https://nitda.gov.ng/wp-content/uploads/2020/01/NDPR-Implementation-Framework.pdf" target="_blank" rel="noopener noreferrer">
            NDPR Framework
          </a>
        </Button>
        <Button asChild variant="outline" size="sm">
          <Link href="/docs">
            Toolkit Documentation
          </Link>
        </Button>
      </div>
      
      <Introduction />
      <KeyRequirements />
      <ComplianceChecklist />
      <ImplementationTools />
      <Resources />
    </DocLayout>
  );
}
