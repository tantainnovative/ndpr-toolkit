'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';


export default function NDPRDemosPage() {
  const demos = [
    {
      title: 'Data Subject Rights',
      description: 'Demos for DSR request forms, dashboard, and tracking components',
      href: '/ndpr-demos/dsr'
    },
    {
      title: 'Consent Management',
      description: 'Demos for consent banner, manager, and storage components',
      href: '/ndpr-demos/consent'
    },
    {
      title: 'DPIA Tools',
      description: 'Demos for Data Protection Impact Assessment components',
      href: '/ndpr-demos/dpia'
    },
    {
      title: 'Breach Management',
      description: 'Demos for data breach notification and management components',
      href: '/ndpr-demos/breach'
    },
    {
      title: 'Privacy Policy',
      description: 'Demos for privacy policy generation and management',
      href: '/ndpr-demos/policy'
    }
  ];

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">NDPR Toolkit Demos</h1>
      <p className="text-lg mb-6">
        These demos showcase the components and functionality of the NDPR Toolkit package.
        Each demo demonstrates how to use the toolkit in a real-world application.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {demos.map((demo, index) => (
          <Link key={index} href={demo.href} className="no-underline">
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{demo.title}</CardTitle>
                <CardDescription>{demo.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-blue-600">View Demo →</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      
      <div className="mt-10 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Documentation</h2>
        <p>
          For detailed documentation on how to use the NDPR Toolkit, please visit the{' '}
          <Link href="/docs" className="text-blue-600 hover:underline">
            documentation pages
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
