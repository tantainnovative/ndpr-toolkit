'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { DSRRequestForm, DSRDashboard, DSRTracker, DSRRequest, DSRStatus, DSRType, RequestType } from 'ndpr-toolkit';
import { v4 as uuidv4 } from 'uuid';

export default function DSRDemoPage() {
  const [requests, setRequests] = useState<DSRRequest[]>([]);
  const [activeTab, setActiveTab] = useState('request-form');
  const [isClient, setIsClient] = useState(false);
  
  // Define request types
  const requestTypes: RequestType[] = [
    {
      id: 'access',
      name: 'Access Request',
      description: 'Request to access your personal data',
      estimatedCompletionTime: 30,
      requiresAdditionalInfo: false
    },
    {
      id: 'erasure',
      name: 'Erasure Request',
      description: 'Request to delete your personal data',
      estimatedCompletionTime: 45,
      requiresAdditionalInfo: false
    },
    {
      id: 'rectification',
      name: 'Rectification Request',
      description: 'Request to correct your personal data',
      estimatedCompletionTime: 15,
      requiresAdditionalInfo: true
    },
    {
      id: 'restriction',
      name: 'Restriction Request',
      description: 'Request to restrict processing of your personal data',
      estimatedCompletionTime: 20,
      requiresAdditionalInfo: true
    }
  ];

  // This effect runs only on the client side after hydration
  useEffect(() => {
    setIsClient(true);
    
    // Load sample data for demo purposes
    const sampleRequests: DSRRequest[] = [
      {
        id: uuidv4(),
        type: 'access' as DSRType,
        status: 'pending' as DSRStatus,
        createdAt: Date.now() - 3 * 24 * 60 * 60 * 1000, // 3 days ago
        updatedAt: Date.now() - 3 * 24 * 60 * 60 * 1000,
        dueDate: Date.now() + 12 * 24 * 60 * 60 * 1000, // Due in 12 days
        subject: {
          name: 'John Doe',
          email: 'john@example.com',
          phone: '1234567890'
        },
        description: 'I want to access all my personal data stored in your systems.'
      },
      {
        id: uuidv4(),
        type: 'erasure' as DSRType,
        status: 'inProgress' as DSRStatus,
        createdAt: Date.now() - 5 * 24 * 60 * 60 * 1000, // 5 days ago
        updatedAt: Date.now() - 2 * 24 * 60 * 60 * 1000, // 2 days ago
        dueDate: Date.now() + 5 * 24 * 60 * 60 * 1000, // Due in 5 days
        subject: {
          name: 'Jane Smith',
          email: 'jane@example.com'
        },
        description: 'Please delete all my personal data from your systems.'
      },
      {
        id: uuidv4(),
        type: 'rectification' as DSRType,
        status: 'completed' as DSRStatus,
        createdAt: Date.now() - 10 * 24 * 60 * 60 * 1000, // 10 days ago
        updatedAt: Date.now() - 1 * 24 * 60 * 60 * 1000, // 1 day ago
        completedAt: Date.now() - 1 * 24 * 60 * 60 * 1000,
        dueDate: Date.now() - 2 * 24 * 60 * 60 * 1000, // Due 2 days ago (but completed)
        subject: {
          name: 'Bob Johnson',
          email: 'bob@example.com'
        },
        description: 'My address is incorrect. Please update it to 123 Main St.'
      },
      {
        id: uuidv4(),
        type: 'restriction' as DSRType,
        status: 'pending' as DSRStatus,
        createdAt: Date.now() - 15 * 24 * 60 * 60 * 1000, // 15 days ago
        updatedAt: Date.now() - 15 * 24 * 60 * 60 * 1000,
        dueDate: Date.now() - 5 * 24 * 60 * 60 * 1000, // Due 5 days ago (overdue)
        subject: {
          name: 'Alice Williams',
          email: 'alice@example.com',
          phone: '9876543210'
        },
        description: 'I want to restrict processing of my personal data for marketing purposes.'
      }
    ];
    
    setRequests(sampleRequests);
  }, []);

  const handleSubmitRequest = (data: any) => {
    console.log('Received form data:', data);
    
    // Calculate due date based on request type (30 days for access, 15 days for erasure, etc.)
    let dueDays = 30; // Default to 30 days
    if (data.requestType === 'erasure') dueDays = 15;
    if (data.requestType === 'rectification') dueDays = 10;
    if (data.requestType === 'restriction') dueDays = 20;
    
    const newRequest: DSRRequest = {
      id: uuidv4(),
      type: data.requestType as DSRType,
      status: 'pending' as DSRStatus,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      dueDate: Date.now() + (dueDays * 24 * 60 * 60 * 1000), // Set due date based on request type
      subject: {
        name: data.dataSubject.fullName,
        email: data.dataSubject.email,
        phone: data.dataSubject.phone
      },
      description: data.additionalInfo?.description || 'No description provided'
    };

    setRequests((prev) => [newRequest, ...prev]);
    setActiveTab('dashboard');
  };

  const handleUpdateStatus = (requestId: string, status: DSRStatus) => {
    setRequests((prev) =>
      prev.map((request) => {
        if (request.id === requestId) {
          return {
            ...request,
            status,
            updatedAt: Date.now(),
            ...(status === 'completed' ? { completedAt: Date.now() } : {})
          };
        }
        return request;
      })
    );
  };

  const handleSelectRequest = (requestId: string) => {
    // In a real application, you might want to show detailed information
    // about the selected request or perform other actions
    console.log(`Request selected: ${requestId}`);
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
      
      <h1 className="text-3xl font-bold mb-8">Data Subject Rights Demo</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="request-form">DSR Request Form</TabsTrigger>
          <TabsTrigger value="dashboard">DSR Dashboard</TabsTrigger>
          <TabsTrigger value="tracker">DSR Tracker</TabsTrigger>
        </TabsList>
        
        <TabsContent value="request-form" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Data Subject Request Form</CardTitle>
              <CardDescription>
                This form allows data subjects to submit requests to exercise their rights under NDPR.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DSRRequestForm
                requestTypes={requestTypes}
                onSubmit={handleSubmitRequest}
                title="Submit a Data Subject Request"
                description="Use this form to submit a request regarding your personal data."
                submitButtonText="Submit Request"
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="dashboard" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Data Subject Request Dashboard</CardTitle>
              <CardDescription>
                This dashboard allows administrators to manage and respond to data subject requests.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DSRDashboard
                requests={requests}
                onUpdateStatus={handleUpdateStatus}
                onSelectRequest={handleSelectRequest}
                title="DSR Management Dashboard"
                description="Track and manage data subject requests in compliance with NDPR requirements."
                showRequestDetails={true}
                showRequestTimeline={true}
                showDeadlineAlerts={true}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tracker" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Data Subject Request Tracker</CardTitle>
              <CardDescription>
                This component provides a simplified view for tracking DSR requests.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DSRTracker
                requests={requests}
                onSelectRequest={handleSelectRequest}
                title="DSR Request Tracker"
                description="Track the status of data subject requests"
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="mt-10 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Implementation Notes</h2>
        <p className="mb-4">
          This demo showcases the DSR components from the NDPR Toolkit:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li><code>DSRRequestForm</code>: For collecting and validating data subject requests</li>
          <li><code>DSRDashboard</code>: For managing and processing requests</li>
          <li><code>DSRTracker</code>: For tracking request status and metrics</li>
        </ul>
        <p className="mt-4">
          For detailed documentation, see the{' '}
          <Link href="/docs/components/data-subject-rights" className="text-blue-600 hover:underline">
            DSR documentation
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
