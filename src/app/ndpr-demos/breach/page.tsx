'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { BreachReportForm, BreachRiskAssessment, BreachNotificationManager, BreachReport, RiskAssessment, NotificationRequirement } from '@tantainnovative/ndpr-toolkit';
import { v4 as uuidv4 } from 'uuid';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';

export default function BreachDemoPage() {
  const [activeTab, setActiveTab] = useState('notification');
  const [isClient, setIsClient] = useState(false);
  const [breaches, setBreaches] = useState<BreachReport[]>([]);
  const [riskAssessments, setRiskAssessments] = useState<RiskAssessment[]>([]);
  const [regulatoryNotifications, setRegulatoryNotifications] = useState<any[]>([]);
  const [selectedBreach, setSelectedBreach] = useState<BreachReport | null>(null);
  
  // This effect runs only on the client side after hydration
  useEffect(() => {
    setIsClient(true);
    
    // Load sample data for demo purposes
    const sampleBreaches: BreachReport[] = [
      {
        id: uuidv4(),
        title: 'Customer Database Unauthorized Access',
        description: 'Unauthorized access to customer database detected through suspicious login patterns',
        category: 'unauthorized_access',
        discoveredAt: Date.now() - 5 * 24 * 60 * 60 * 1000, // 5 days ago
        reportedAt: Date.now() - 4 * 24 * 60 * 60 * 1000, // 4 days ago
        reporter: {
          name: 'John Smith',
          email: 'john@example.com',
          department: 'IT Security'
        },
        affectedSystems: ['customer_database', 'user_accounts'],
        dataTypes: ['name', 'email', 'phone', 'address'],
        estimatedAffectedSubjects: 1200,
        status: 'ongoing',
        initialActions: 'Access blocked, passwords reset, system isolated for investigation'
      },
      {
        id: uuidv4(),
        title: 'Employee Email Phishing Incident',
        description: 'Several employees clicked on phishing links potentially exposing credentials',
        category: 'phishing',
        discoveredAt: Date.now() - 10 * 24 * 60 * 60 * 1000, // 10 days ago
        reportedAt: Date.now() - 9 * 24 * 60 * 60 * 1000, // 9 days ago
        reporter: {
          name: 'Jane Doe',
          email: 'jane@example.com',
          department: 'HR'
        },
        affectedSystems: ['email_system', 'employee_accounts'],
        dataTypes: ['email credentials'],
        estimatedAffectedSubjects: 0, // No confirmed data exposure
        status: 'resolved',
        initialActions: 'Password resets, email scanning, blocking of malicious domains'
      },
      {
        id: uuidv4(),
        title: 'Lost Company Laptop',
        description: 'Employee reported company laptop lost during business travel',
        category: 'device_loss',
        discoveredAt: Date.now() - 15 * 24 * 60 * 60 * 1000, // 15 days ago
        reportedAt: Date.now() - 15 * 24 * 60 * 60 * 1000, // 15 days ago
        reporter: {
          name: 'Robert Johnson',
          email: 'robert@example.com',
          department: 'Sales'
        },
        affectedSystems: ['laptop_device', 'company_data'],
        dataTypes: ['name', 'email', 'project data'],
        estimatedAffectedSubjects: 50,
        status: 'resolved',
        initialActions: 'Remote wipe initiated, account passwords changed'
      }
    ];
    
    setBreaches(sampleBreaches);
  }, []);

  const handleSubmitBreach = (data: any) => {
    const newBreach: BreachReport = {
      id: uuidv4(),
      title: data.title,
      description: data.description,
      category: data.category || 'other',
      discoveredAt: Date.now(),
      reportedAt: Date.now(),
      reporter: {
        name: data.reporter?.name || 'Anonymous',
        email: data.reporter?.email || 'anonymous@example.com',
        department: data.reporter?.department || 'Unknown'
      },
      affectedSystems: data.affectedSystems || [],
      dataTypes: data.dataTypes || [],
      estimatedAffectedSubjects: data.estimatedAffectedSubjects || 0,
      status: 'ongoing',
      initialActions: data.initialActions || ''
    };

    setBreaches((prev) => [newBreach, ...prev]);
    setActiveTab('register');
  };

  const handleUpdateBreach = (breachId: string, updates: Partial<BreachReport>) => {
    setBreaches((prev) =>
      prev.map((breach) => {
        if (breach.id === breachId) {
          return {
            ...breach,
            ...updates
          };
        }
        return breach;
      })
    );
  };

  const handleSelectBreach = (breachId: string) => {
    const breach = breaches.find((b) => b.id === breachId);
    setSelectedBreach(breach || null);
    setActiveTab('assessment');
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
      
      <h1 className="text-3xl font-bold mb-8">Breach Management Demo</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="notification">Breach Notification</TabsTrigger>
          <TabsTrigger value="register">Breach Register</TabsTrigger>
          <TabsTrigger value="assessment">Breach Assessment</TabsTrigger>
        </TabsList>
        
        <TabsContent value="notification" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Breach Notification Form</CardTitle>
              <CardDescription>
                This form is used to report and document data breaches within your organization.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BreachReportForm
                onSubmit={handleSubmitBreach}
                title="Report a Data Breach"
                categories={[
                  { id: 'unauthorized_access', name: 'Unauthorized Access', description: 'Unauthorized access to systems or data', defaultSeverity: 'high' },
                  { id: 'phishing', name: 'Phishing Attack', description: 'Phishing or social engineering attack', defaultSeverity: 'medium' },
                  { id: 'device_loss', name: 'Device Loss/Theft', description: 'Loss or theft of device containing personal data', defaultSeverity: 'medium' },
                  { id: 'malware', name: 'Malware/Ransomware', description: 'Malware or ransomware infection', defaultSeverity: 'high' },
                  { id: 'other', name: 'Other', description: 'Other type of data breach', defaultSeverity: 'medium' }
                ]}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="register" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Breach Register</CardTitle>
              <CardDescription>
                This component maintains a register of all data breaches and their current status.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BreachNotificationManager
                breachReports={breaches}
                riskAssessments={riskAssessments}
                regulatoryNotifications={regulatoryNotifications}
                onSelectBreach={handleSelectBreach}
                onRequestAssessment={(breachId) => {
                  handleSelectBreach(breachId);
                  setActiveTab('assessment');
                }}
                onRequestNotification={(breachId) => {
                  handleSelectBreach(breachId);
                  // In a real app, you would show a notification form here
                  console.log('Notification requested for breach:', breachId);
                }}
                title="Data Breach Register"
                description="A record of all data breaches and security incidents affecting personal data."
                showBreachDetails={true}
                showNotificationTimeline={true}
                showDeadlineAlerts={true}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="assessment" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Breach Assessment</CardTitle>
              <CardDescription>
                This component helps assess the severity and impact of a data breach.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedBreach ? (
                <BreachRiskAssessment
                  breachData={selectedBreach}
                  onComplete={(assessment: RiskAssessment) => {
                    if (selectedBreach) {
                      // Update the breach status based on the assessment
                      handleUpdateBreach(selectedBreach.id, {
                        status: assessment.riskLevel === 'critical' ? 'ongoing' : 'contained',
                      });
                      
                      // Store the risk assessment
                      const newAssessment = {
                        ...assessment,
                        id: uuidv4(),
                        breachId: selectedBreach.id,
                        assessedAt: Date.now(),
                        assessor: {
                          name: 'Demo User',
                          role: 'Data Protection Officer',
                          email: 'dpo@example.com'
                        }
                      };
                      
                      setRiskAssessments(prev => {
                        // Remove any existing assessment for this breach
                        const filtered = prev.filter(a => a.breachId !== selectedBreach.id);
                        // Add the new assessment
                        return [...filtered, newAssessment];
                      });
                    }
                  }}
                  title="Breach Risk Assessment"
                  description="Assess the severity, impact, and required actions for this data breach."
                  className=""
                  buttonClassName=""
                  showBreachSummary={true}
                  showNotificationRequirements={true}
                />
              ) : (
                <div className="p-4 text-center">
                  <p>No breach selected. Please select a breach from the Breach Register.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="mt-10 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Implementation Notes</h2>
        <p className="mb-4">
          This demo showcases the breach management components from the NDPR Toolkit:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li><code>BreachReportForm</code>: For reporting and documenting data breaches</li>
          <li><code>BreachRegister</code>: For maintaining a record of all data breaches</li>
          <li><code>BreachAssessment</code>: For assessing the severity and impact of breaches</li>
        </ul>
        <p className="mt-4">
          For detailed documentation, see the{' '}
          <Link href="/docs/components/breach-management" className="text-blue-600 hover:underline">
            Breach Management documentation
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
