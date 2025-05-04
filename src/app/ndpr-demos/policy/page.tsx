'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { PolicyGenerator, PolicyPreview, PolicyExporter, PolicySection, PolicyTemplate, PolicyVariable } from 'ndpr-toolkit';

export default function PolicyDemoPage() {
  const [activeTab, setActiveTab] = useState('generator');
  const [isClient, setIsClient] = useState(false);
  const [policyData, setPolicyData] = useState<any>(null);
  const [generatedPolicy, setGeneratedPolicy] = useState<PolicySection[]>([]);
  const [policyVariables, setPolicyVariables] = useState<PolicyVariable[]>([]);
  
  // Define policy template sections
  const policyTemplate: PolicyTemplate = {
    id: 'ndpr-policy',
    name: 'NDPR Compliant Privacy Policy',
    description: 'A comprehensive privacy policy template compliant with Nigeria Data Protection Regulation',
    organizationType: 'business',
    version: '1.0',
    lastUpdated: Date.now(),
    variables: {
      organizationName: {
        name: 'Organization Name',
        description: 'The name of your organization',
        required: true,
        defaultValue: 'Your Company'
      },
      website: {
        name: 'Website URL',
        description: 'Your organization\'s website',
        required: true,
        defaultValue: 'https://example.com'
      },
      contactEmail: {
        name: 'Contact Email',
        description: 'Email for privacy inquiries',
        required: true,
        defaultValue: 'privacy@example.com'
      }
    },
    sections: [
      {
        id: 'introduction',
        title: 'Introduction',
        required: true,
        description: 'Introduce your organization and the purpose of the privacy policy',
        template: 'This Privacy Policy describes how {{organizationName}} collects, uses, and discloses your personal information.',
        included: true,
        variables: ['organizationName']
      },
      {
        id: 'definitions',
        title: 'Definitions',
        required: true,
        description: 'Define key terms used throughout the policy',
        template: 'In this Privacy Policy, "personal data" means any information relating to an identified or identifiable natural person.',
        included: true,
        variables: []
      },
      {
        id: 'dataCollection',
        title: 'Data Collection',
        required: true,
        description: 'Explain what personal data you collect and how you collect it',
        template: 'We collect personal data that you provide directly to us when you use our services.',
        included: true,
        variables: []
      },
      {
        id: 'dataUse',
        title: 'Use of Personal Data',
        required: true,
        description: 'Explain how you use the personal data you collect',
        template: 'We use your personal data to provide and improve our services, and to communicate with you.',
        included: true,
        variables: []
      },
      {
        id: 'legalBasis',
        title: 'Legal Basis for Processing',
        required: true,
        description: 'Explain the legal basis for processing personal data',
        template: 'We process your personal data based on your consent, contractual necessity, and our legitimate interests.',
        included: true,
        variables: []
      },
      {
        id: 'dataSharing',
        title: 'Data Sharing and Disclosure',
        required: true,
        description: 'Explain who you share personal data with and why',
        template: 'We may share your personal data with service providers who help us deliver our services.',
        included: true,
        variables: []
      },
      {
        id: 'dataRetention',
        title: 'Data Retention',
        required: true,
        description: 'Explain how long you retain personal data',
        template: 'We retain your personal data for as long as necessary to fulfill the purposes for which we collected it.',
        included: true,
        variables: []
      },
      {
        id: 'dataSecurity',
        title: 'Data Security',
        required: true,
        description: 'Explain how you protect personal data',
        template: 'We implement appropriate technical and organizational measures to protect your personal data.',
        included: true,
        variables: []
      },
      {
        id: 'dataSubjectRights',
        title: 'Data Subject Rights',
        required: true,
        description: 'Explain the rights of data subjects under NDPR',
        template: 'Under the NDPR, you have the right to access, correct, delete, and restrict processing of your personal data.',
        included: true,
        variables: []
      },
      {
        id: 'cookies',
        title: 'Cookies and Tracking Technologies',
        required: false,
        description: 'Explain your use of cookies and other tracking technologies',
        template: 'We use cookies and similar technologies to enhance your experience on our website.',
        included: true,
        variables: []
      },
      {
        id: 'internationalTransfers',
        title: 'International Data Transfers',
        required: false,
        description: 'Explain if and how you transfer data internationally',
        template: 'We may transfer your personal data to countries outside Nigeria in accordance with NDPR requirements.',
        included: true,
        variables: []
      },
      {
        id: 'childrenPrivacy',
        title: 'Children\'s Privacy',
        required: false,
        description: 'Explain your approach to processing children\'s data',
        template: 'Our services are not intended for children under 13, and we do not knowingly collect data from children.',
        included: true,
        variables: []
      },
      {
        id: 'changes',
        title: 'Changes to this Privacy Policy',
        required: true,
        description: 'Explain how you will notify users of changes to the policy',
        template: 'We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on our website.',
        included: true,
        variables: []
      },
      {
        id: 'contact',
        title: 'Contact Information',
        required: true,
        description: 'Provide contact information for privacy inquiries',
        template: 'If you have any questions about this Privacy Policy, please contact us at {{contactEmail}}.',
        included: true,
        variables: ['contactEmail']
      }
    ]
  };

  // This effect runs only on the client side after hydration
  useEffect(() => {
    setIsClient(true);
    
    // Set sample policy data for demo purposes
    const sampleData = {
      organizationName: 'Demo Company Ltd.',
      organizationType: 'e-commerce',
      website: 'www.democompany.com',
      contactEmail: 'privacy@democompany.com',
      contactPhone: '+234 123 456 7890',
      contactAddress: '123 Demo Street, Lagos, Nigeria',
      dataProtectionOfficer: 'John Smith',
      collectsPersonalData: true,
      dataTypes: [
        'name',
        'email',
        'phone',
        'address',
        'payment information',
        'browsing behavior'
      ],
      dataPurposes: [
        'process orders',
        'provide customer service',
        'send marketing communications',
        'improve products and services',
        'comply with legal obligations'
      ],
      legalBases: [
        'consent',
        'contract',
        'legitimate interests',
        'legal obligation'
      ],
      dataRecipients: [
        'payment processors',
        'shipping companies',
        'marketing partners',
        'service providers',
        'regulatory authorities'
      ],
      dataRetentionPeriod: '3 years after last customer interaction',
      transfersDataInternationally: true,
      securityMeasures: [
        'encryption',
        'access controls',
        'regular security audits',
        'staff training',
        'incident response plan'
      ],
      usesCookies: true,
      cookieTypes: [
        'necessary',
        'preferences',
        'analytics',
        'marketing'
      ],
      collectsChildrenData: false,
      lastUpdated: new Date().toISOString()
    };
    
    setPolicyData(sampleData);
    
    // Generate sample policy sections
    const samplePolicy: PolicySection[] = policyTemplate.sections.map(section => {
      let content = '';
      
      // Generate sample content based on section ID
      switch (section.id) {
        case 'introduction':
          content = `This Privacy Policy explains how Demo Company Ltd. ("we," "us," or "our") collects, uses, and protects your personal information when you use our website and services. We are committed to protecting your privacy and complying with the Nigeria Data Protection Regulation (NDPR).`;
          break;
        case 'dataCollection':
          content = `We collect personal information such as your name, email address, phone number, and address when you create an account, place an order, or contact our customer service. We also automatically collect certain information about your device and browsing behavior when you visit our website.`;
          break;
        case 'dataUse':
          content = `We use your personal information to process orders, provide customer service, send marketing communications (with your consent), improve our products and services, and comply with legal obligations.`;
          break;
        // Add more sample content for other sections
        default:
          content = `Sample content for ${section.title} section.`;
      }
      
      return {
        ...section,
        content
      };
    });
    
    setGeneratedPolicy(samplePolicy);
  }, []);

  const handleGeneratePolicy = (data: any) => {
    console.log('Generated policy data:', data);
    setGeneratedPolicy(data.sections);
    setPolicyVariables(data.variables || []);
    setActiveTab('display');
  };

  const handleUpdatePolicy = (updatedSections: PolicySection[]) => {
    setGeneratedPolicy(updatedSections);
  };

  if (!isClient) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-6">
        <Link href="/ndpr-demos" className="text-blue-600 hover:underline">
          ← Back to NDPR Demos
        </Link>
      </div>
      
      <h1 className="text-3xl font-bold mb-8">Privacy Policy Demo</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="generator">Policy Generator</TabsTrigger>
          <TabsTrigger value="display">Policy Display</TabsTrigger>
          <TabsTrigger value="audit">Policy Audit</TabsTrigger>
        </TabsList>
        
        <TabsContent value="generator" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Policy Generator</CardTitle>
              <CardDescription>
                This tool helps you generate an NDPR-compliant privacy policy for your organization.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PolicyGenerator
                sections={policyTemplate.sections}
                variables={[
                  {
                    id: 'organizationName',
                    name: 'Organization Name',
                    description: 'The name of your organization',
                    defaultValue: 'Your Company',
                    value: policyData?.organizationName || '',
                    inputType: 'text',
                    required: true
                  },
                  {
                    id: 'website',
                    name: 'Website URL',
                    description: 'Your organization\'s website',
                    defaultValue: 'https://example.com',
                    value: policyData?.website || '',
                    inputType: 'url',
                    required: true
                  },
                  {
                    id: 'contactEmail',
                    name: 'Contact Email',
                    description: 'Email for privacy inquiries',
                    defaultValue: 'privacy@example.com',
                    value: policyData?.contactEmail || '',
                    inputType: 'email',
                    required: true
                  }
                ]}
                onGenerate={handleGeneratePolicy}
                title="Generate Privacy Policy"
                description="Answer the questions below to generate a customized privacy policy for your organization."
                generateButtonText="Generate Policy"
                showPreview={true}
                allowEditing={true}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="display" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Policy Display</CardTitle>
              <CardDescription>
                This component displays your privacy policy in a user-friendly format.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PolicyPreview
                content={generatedPolicy.map(section => `## ${section.title}\n\n${section.template}`).join('\n\n')}
                sections={generatedPolicy}
                variables={policyVariables}
                onEdit={() => setActiveTab('generator')}
                title="Privacy Policy"
                description="This Privacy Policy explains how we collect, use, and protect your personal information."
                showTableOfContents={true}
                showEditButton={true}
                organizationName={policyData?.organizationName || 'Your Organization'}
                lastUpdated={new Date()}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="audit" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Policy Audit</CardTitle>
              <CardDescription>
                This tool audits your privacy policy for NDPR compliance and suggests improvements.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PolicyExporter
                content={generatedPolicy.map(section => `## ${section.title}\n\n${section.template}`).join('\n\n')}
                title="Privacy Policy"
                organizationName={policyData?.organizationName || 'Your Organization'}
                lastUpdated={new Date()}
                componentTitle="Export Privacy Policy"
                description="Export your privacy policy in different formats."
                buttonClassName=""
                showExportHistory={true}
                includeComplianceNotice={true}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="mt-10 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Implementation Notes</h2>
        <p className="mb-4">
          This demo showcases the privacy policy components from the NDPR Toolkit:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li><code>PolicyGenerator</code>: For creating customized privacy policies</li>
          <li><code>PolicyDisplay</code>: For displaying privacy policies in a user-friendly format</li>
          <li><code>PolicyAudit</code>: For auditing privacy policies for NDPR compliance</li>
        </ul>
        <p className="mt-4">
          For detailed documentation, see the{' '}
          <Link href="/docs/components/privacy-policy" className="text-blue-600 hover:underline">
            Privacy Policy documentation
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
