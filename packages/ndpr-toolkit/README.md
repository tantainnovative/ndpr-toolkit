# NDPR Toolkit

A comprehensive toolkit for implementing NDPR-compliant features in web applications, aligned with the Nigerian Data Protection Regulation (NDPR) and Data Protection Act (DPA).

## Overview

The NDPR Toolkit provides a set of React components, hooks, and utilities to help Nigerian businesses implement NDPR-compliant features in their web applications with minimal development effort. This toolkit is designed to be flexible, customizable, and easy to integrate into existing applications.

[![npm version](https://img.shields.io/npm/v/ndpr-toolkit.svg)](https://www.npmjs.com/package/ndpr-toolkit)
[![license](https://img.shields.io/npm/l/ndpr-toolkit.svg)](https://github.com/tantainnovative/ndpr-toolkit/blob/main/LICENSE)

> **NDPR Toolkit is actively maintained and regularly updated to ensure compliance with the latest Nigerian data protection regulations.**

## Features

- **Consent Management**: Components for collecting, storing, and managing user consent in compliance with NDPR requirements
- **Data Subject Rights Portal**: Complete system for handling data subject access requests and other rights
- **DPIA Questionnaire**: Interactive questionnaire for conducting Data Protection Impact Assessments
- **Breach Notification System**: Comprehensive tools for managing, assessing, and reporting data breaches within required timeframes
- **Privacy Policy Generator**: Customizable tool for creating NDPR-compliant privacy policies with variable support

### 🆕 Latest Features

- **Variable Support in Privacy Policies**: Create dynamic privacy policies with variable placeholders that can be easily updated when your organization information changes
- **Enhanced DSR Types**: Improved type definitions for Data Subject Requests with standardized enums for request types and statuses
- **ConsentStorage Component**: A flexible component for handling the storage and retrieval of consent settings with support for multiple storage mechanisms
- **Comprehensive Documentation**: Detailed API references for all components and utilities

## Installation

```bash
npm install ndpr-toolkit
# or
yarn add ndpr-toolkit
```

## Quick Start

### Consent Management

```jsx
import { ConsentBanner, ConsentManager, ConsentStorage, useConsent } from 'ndpr-toolkit';

function MyApp() {
  return (
    <ConsentManager
      options={[
        {
          id: 'necessary',
          label: 'Necessary Cookies',
          description: 'Essential cookies for the website to function.',
          required: true
        },
        {
          id: 'analytics',
          label: 'Analytics Cookies',
          description: 'Cookies that help us understand how you use our website.',
          required: false
        }
      ]}
      storageKey="my-app-consent"
      autoLoad={true}
      autoSave={true}
    >
      <AppContent />
      <ConsentBanner 
        position="bottom"
        privacyPolicyUrl="/privacy-policy"
        showPreferences={true}
        onSave={(consents) => console.log('Consent saved:', consents)}
      />
    </ConsentManager>
  );
}

function AppContent() {
  // Use the useConsent hook to manage consent state
  const { consents, hasConsented, updateConsent } = useConsent();
  
  // Check if user has given consent for analytics
  if (hasConsented('analytics')) {
    // Initialize analytics
  }
  
  return (
    <div>
      {/* Your app content */}
    </div>
  );
}
```

### Privacy Policy Generator

```jsx
import { PolicyGenerator, PolicyPreview, PolicyExporter, usePrivacyPolicy } from 'ndpr-toolkit';

function PrivacyPolicyPage() {
  const { policy, updateVariableValue, generatePolicy } = usePrivacyPolicy();
  const [generatedPolicy, setGeneratedPolicy] = useState(null);
  
  // Define your variables
  const variables = {
    organizationName: 'Acme Corporation',
    websiteUrl: 'https://acme.com',
    contactEmail: 'privacy@acme.com',
    lastUpdated: new Date().toLocaleDateString()
  };
  
  return (
    <div>
      {!generatedPolicy ? (
        <PolicyGenerator 
          templates={[
            {
              id: 'standard',
              name: 'Standard Privacy Policy',
              description: 'A comprehensive privacy policy suitable for most websites and applications.',
              sections: [
                {
                  id: 'introduction',
                  title: 'Introduction',
                  template: 'This Privacy Policy explains how {{organizationName}} collects, uses, and protects your personal data when you visit {{websiteUrl}}.',
                  required: true,
                  included: true
                },
                // More sections...
              ]
            }
          ]}
          variables={variables}
          onComplete={(data) => {
            // Generate policy with variables
            const result = generatePolicyText(data.sections, variables);
            setGeneratedPolicy({
              title: `Privacy Policy for ${variables.organizationName}`,
              content: result.fullText,
              lastUpdated: new Date()
            });
          }}
        />
      ) : (
        <>
          <PolicyPreview 
            policy={generatedPolicy}
            variables={variables}
            onVariableChange={(newVariables) => {
              // Update variables and regenerate policy
            }}
          />
          
          <PolicyExporter
            policy={generatedPolicy}
            formats={['html', 'pdf', 'markdown']}
            filename="privacy-policy"
          />
        </>
      )}
    </div>
  );
}
```

## Component Categories

### Consent Management
- `ConsentBanner`: Cookie consent banner with customizable options
- `ConsentManager`: Component for managing consent preferences
- `ConsentStorage`: Storage mechanism for consent settings with support for localStorage, sessionStorage, and cookies
- `useConsent`: Hook for managing consent state

### Data Subject Rights
- `DSRRequestForm`: Form for submitting data subject rights requests
- `DSRDashboard`: Admin dashboard for managing DSR requests
- `DSRTracker`: Component for tracking the status of DSR requests
- `useDSR`: Hook for managing DSR state
- Types: `DSRType`, `DSRStatus`, `DSRRequest` for type-safe implementation

### DPIA (Data Protection Impact Assessment)
- `DPIAQuestionnaire`: Interactive questionnaire for conducting DPIAs
- `DPIAReport`: Component for generating DPIA reports
- `StepIndicator`: Progress indicator for multi-step processes
- `useDPIA`: Hook for managing DPIA state
- Types: `DPIAQuestion`, `DPIASection`, `DPIARisk`, `DPIAResult` for structured assessments

### Breach Notification
- `BreachReportForm`: Form for reporting data breaches
- `BreachRiskAssessment`: Tool for assessing breach risk and severity
- `BreachNotificationManager`: Component for managing breach notifications
- `RegulatoryReportGenerator`: Tool for generating regulatory reports for NITDA
- `useBreach`: Hook for managing breach notification state
- Types: `BreachReport`, `RiskAssessment`, `NotificationRequirement` for compliance with 72-hour notification requirements

### Privacy Policy
- `PolicyGenerator`: Component for generating privacy policies
- `PolicyPreview`: Preview component for privacy policies
- `PolicyExporter`: Tool for exporting privacy policies to different formats
- `generatePolicyText`: Utility for creating dynamic policies with variable support
- `usePrivacyPolicy`: Hook for managing privacy policy state

## Implementation Guides

### Setting Up Consent Management

```jsx
// 1. Wrap your application with ConsentManager
import { ConsentManager } from 'ndpr-toolkit';

function App() {
  return (
    <ConsentManager
      options={[
        { id: 'necessary', label: 'Necessary', description: '...', required: true },
        { id: 'analytics', label: 'Analytics', description: '...', required: false },
        { id: 'marketing', label: 'Marketing', description: '...', required: false }
      ]}
      storageKey="my-app-consent"
      autoLoad={true}
      autoSave={true}
    >
      <YourApp />
    </ConsentManager>
  );
}

// 2. Add the ConsentBanner to your layout
import { ConsentBanner } from 'ndpr-toolkit';

function Layout({ children }) {
  return (
    <>
      {children}
      <ConsentBanner
        position="bottom"
        privacyPolicyUrl="/privacy-policy"
        showPreferences={true}
      />
    </>
  );
}

// 3. Use the consent values in your components
import { useConsent } from 'ndpr-toolkit';

function AnalyticsComponent() {
  const { hasConsented } = useConsent();
  
  useEffect(() => {
    if (hasConsented('analytics')) {
      // Initialize analytics
    }
  }, [hasConsented]);
  
  return null;
}
```

### Implementing a Data Subject Rights Portal

```jsx
import { DSRRequestForm, useDSR } from 'ndpr-toolkit';

// 1. Create a form for data subjects to submit requests
function DSRPortal() {
  const { submitRequest } = useDSR();
  
  const handleSubmit = (formData) => {
    const request = submitRequest({
      type: formData.type,
      subject: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone
      },
      details: formData.details
    });
    
    // Show confirmation with tracking ID
    alert(`Your request has been submitted. Your tracking ID is: ${request.id}`);
  };
  
  return (
    <DSRRequestForm
      onSubmit={handleSubmit}
      requestTypes={[
        { id: 'access', label: 'Access my data' },
        { id: 'rectification', label: 'Correct my data' },
        { id: 'erasure', label: 'Delete my data' },
        { id: 'restriction', label: 'Restrict processing of my data' },
        { id: 'portability', label: 'Data portability' },
        { id: 'objection', label: 'Object to processing' }
      ]}
    />
  );
}

// 2. Create an admin dashboard for managing requests
import { DSRDashboard } from 'ndpr-toolkit';

function AdminDashboard() {
  const { requests, updateRequest, deleteRequest } = useDSR();
  
  return (
    <DSRDashboard
      requests={requests}
      onUpdateRequest={updateRequest}
      onDeleteRequest={deleteRequest}
    />
  );
}
```

### Setting Up a Breach Notification System

```jsx
import { BreachReportForm, BreachRiskAssessment, useBreach } from 'ndpr-toolkit';

// 1. Create a form for reporting breaches
function BreachReporting() {
  const { submitBreachReport } = useBreach();
  
  const handleSubmit = (formData) => {
    const report = submitBreachReport({
      title: formData.title,
      description: formData.description,
      category: formData.category,
      discoveredAt: Date.now(),
      reporter: {
        name: formData.reporterName,
        email: formData.reporterEmail,
        department: formData.department
      },
      affectedSystems: formData.systems,
      dataTypes: formData.dataTypes,
      status: 'ongoing'
    });
    
    // Redirect to risk assessment
    navigate(`/breach/${report.id}/assess`);
  };
  
  return (
    <BreachReportForm
      onSubmit={handleSubmit}
      categories={[
        { id: 'unauthorized-access', label: 'Unauthorized Access' },
        { id: 'data-loss', label: 'Data Loss' },
        { id: 'system-compromise', label: 'System Compromise' }
      ]}
    />
  );
}

// 2. Create a risk assessment component
function RiskAssessment({ breachId }) {
  const { performRiskAssessment, determineNotificationRequirements } = useBreach();
  
  const handleAssessment = (assessmentData) => {
    const assessment = performRiskAssessment({
      breachId,
      assessor: {
        name: 'Jane Smith',
        role: 'Data Protection Officer',
        email: 'jane@example.com'
      },
      ...assessmentData
    });
    
    const requirements = determineNotificationRequirements({
      breachId,
      riskAssessmentId: assessment.id
    });
    
    // Show notification requirements
    if (requirements.nitdaNotificationRequired) {
      // Deadline is 72 hours from discovery
      const deadline = new Date(requirements.nitdaNotificationDeadline);
      alert(`NITDA notification required by ${deadline.toLocaleString()}`);
    }
  };
  
  return (
    <BreachRiskAssessment
      breachId={breachId}
      onComplete={handleAssessment}
    />
  );
}
```

## Documentation

For detailed documentation, visit [https://ndpr-toolkit.tantainnovative.com/docs](https://ndpr-toolkit.tantainnovative.com/docs)

### API Reference

Detailed API documentation is available for all components:

- [Consent Management](https://ndpr-toolkit.tantainnovative.com/docs/components/consent-management)
- [Data Subject Rights](https://ndpr-toolkit.tantainnovative.com/docs/components/data-subject-rights)
- [DPIA Questionnaire](https://ndpr-toolkit.tantainnovative.com/docs/components/dpia-questionnaire)
- [Breach Notification](https://ndpr-toolkit.tantainnovative.com/docs/components/breach-notification)
- [Privacy Policy Generator](https://ndpr-toolkit.tantainnovative.com/docs/components/privacy-policy-generator)
- [React Hooks](https://ndpr-toolkit.tantainnovative.com/docs/components/hooks)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT © Tanta Innovative
