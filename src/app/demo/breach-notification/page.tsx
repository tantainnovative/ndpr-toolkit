'use client';

import { useState } from 'react';
import Link from 'next/link';
import BreachNotificationForm from '@/components/breach-notification/BreachNotificationForm';
import { BreachNotification, BreachSeverity } from '@/types';
import { v4 as uuidv4 } from 'uuid';

export default function BreachNotificationDemo() {
  const [notifications, setNotifications] = useState<BreachNotification[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<BreachNotification | null>(null);
  const [showNotificationDetails, setShowNotificationDetails] = useState(false);

  const handleSubmitNotification = (data: {
    title: string;
    description: string;
    discoveryDate: string;
    affectedDataSubjects: number;
    dataCategories: string[];
    severity: BreachSeverity;
    mitigationSteps: string[];
    reportedToAuthorities: boolean;
    reportedToDataSubjects: boolean;
  }) => {
    const newNotification: BreachNotification = {
      id: uuidv4(),
      title: data.title,
      description: data.description,
      discoveryDate: data.discoveryDate,
      reportDate: new Date().toISOString().split('T')[0],
      affectedDataSubjects: data.affectedDataSubjects,
      dataCategories: data.dataCategories,
      severity: data.severity,
      mitigationSteps: data.mitigationSteps,
      reportedToAuthorities: data.reportedToAuthorities,
      reportedToDataSubjects: data.reportedToDataSubjects,
    };

    setNotifications((prev) => [newNotification, ...prev]);
    setShowSuccess(true);
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 5000);
  };

  const handleViewNotification = (notification: BreachNotification) => {
    setSelectedNotification(notification);
    setShowNotificationDetails(true);
  };

  const getSeverityBadgeClass = (severity: BreachSeverity) => {
    switch (severity) {
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'high':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'critical':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const calculateTimeRemaining = (discoveryDate: string): string => {
    const discovery = new Date(discoveryDate);
    const deadline = new Date(discovery);
    deadline.setHours(discovery.getHours() + 72);
    
    const now = new Date();
    
    if (now > deadline) {
      return 'Deadline passed';
    }
    
    const diffMs = deadline.getTime() - now.getTime();
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${diffHrs}h ${diffMins}m remaining`;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Breach Notification Module
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-300 sm:mt-4">
            Document and report data breaches in compliance with NDPR&apos;s 72-hour notification requirement.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Notification Form */}
          <div>
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Report a New Data Breach
            </h2>
            <BreachNotificationForm onSubmit={handleSubmitNotification} />
            
            {showSuccess && (
              <div className="mt-4 rounded-md bg-green-50 dark:bg-green-900/20 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800 dark:text-green-200">
                      Breach Notification Submitted
                    </h3>
                    <div className="mt-2 text-sm text-green-700 dark:text-green-300">
                      <p>
                        Your breach notification has been recorded. Remember that NDPR requires notification to authorities within 72 hours of discovery.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Notifications List */}
          <div>
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Breach Notifications
            </h2>
            
            {notifications.length === 0 ? (
              <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                <div className="text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No breach notifications</h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Submit a breach notification using the form to see it appear here.
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  {notifications.map((notification) => (
                    <li key={notification.id}>
                      <div className="block hover:bg-gray-50 dark:hover:bg-gray-700">
                        <div className="px-4 py-4 sm:px-6">
                          <div className="flex items-center justify-between">
                            <div className="truncate">
                              <div className="flex text-sm">
                                <p className="font-medium text-blue-600 dark:text-blue-400 truncate">
                                  {notification.title}
                                </p>
                              </div>
                              <div className="mt-2 flex">
                                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                  <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400 dark:text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                  </svg>
                                  Discovered: {new Date(notification.discoveryDate).toLocaleDateString()}
                                </div>
                              </div>
                            </div>
                            <div className="ml-2 flex-shrink-0 flex flex-col items-end">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getSeverityBadgeClass(notification.severity)}`}>
                                {notification.severity.charAt(0).toUpperCase() + notification.severity.slice(1)} Severity
                              </span>
                              <span className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                {calculateTimeRemaining(notification.discoveryDate)}
                              </span>
                            </div>
                          </div>
                          <div className="mt-4 flex justify-between">
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {notification.affectedDataSubjects.toLocaleString()} affected data subjects
                            </div>
                            <div>
                              <button
                                type="button"
                                onClick={() => handleViewNotification(notification)}
                                className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300"
                              >
                                View details
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Notification Details Modal */}
        {showNotificationDetails && selectedNotification && (
          <div className="fixed inset-0 overflow-y-auto z-50">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
              </div>

              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

              <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                      <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                        Breach Notification Details
                      </h3>
                      <div className="mt-4 space-y-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Title</h4>
                          <p className="mt-1 text-sm text-gray-900 dark:text-white">
                            {selectedNotification.title}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Description</h4>
                          <p className="mt-1 text-sm text-gray-900 dark:text-white whitespace-pre-wrap">
                            {selectedNotification.description}
                          </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Discovery Date</h4>
                            <p className="mt-1 text-sm text-gray-900 dark:text-white">
                              {new Date(selectedNotification.discoveryDate).toLocaleDateString()}
                            </p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Report Date</h4>
                            <p className="mt-1 text-sm text-gray-900 dark:text-white">
                              {new Date(selectedNotification.reportDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Severity</h4>
                            <p className="mt-1">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getSeverityBadgeClass(selectedNotification.severity)}`}>
                                {selectedNotification.severity.charAt(0).toUpperCase() + selectedNotification.severity.slice(1)}
                              </span>
                            </p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Affected Data Subjects</h4>
                            <p className="mt-1 text-sm text-gray-900 dark:text-white">
                              {selectedNotification.affectedDataSubjects.toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Data Categories Involved</h4>
                          <div className="mt-1 flex flex-wrap gap-1">
                            {selectedNotification.dataCategories.map((category, index) => (
                              <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                {category}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Mitigation Steps</h4>
                          <ul className="mt-1 text-sm text-gray-900 dark:text-white list-disc pl-5 space-y-1">
                            {selectedNotification.mitigationSteps.map((step, index) => (
                              <li key={index}>{step}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Reported to Authorities</h4>
                            <p className="mt-1 text-sm text-gray-900 dark:text-white">
                              {selectedNotification.reportedToAuthorities ? 'Yes' : 'No'}
                            </p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Reported to Data Subjects</h4>
                            <p className="mt-1 text-sm text-gray-900 dark:text-white">
                              {selectedNotification.reportedToDataSubjects ? 'Yes' : 'No'}
                            </p>
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Notification Timeline</h4>
                          <div className="mt-1 text-sm text-gray-900 dark:text-white">
                            <div className="flex justify-between">
                              <span>72-hour Deadline:</span>
                              <span>
                                {(() => {
                                  const discovery = new Date(selectedNotification.discoveryDate);
                                  const deadline = new Date(discovery);
                                  deadline.setHours(discovery.getHours() + 72);
                                  return deadline.toLocaleString();
                                })()}
                              </span>
                            </div>
                            <div className="flex justify-between mt-1">
                              <span>Time Remaining:</span>
                              <span className={
                                calculateTimeRemaining(selectedNotification.discoveryDate) === 'Deadline passed'
                                  ? 'text-red-600 dark:text-red-400'
                                  : 'text-green-600 dark:text-green-400'
                              }>
                                {calculateTimeRemaining(selectedNotification.discoveryDate)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    onClick={() => setShowNotificationDetails(false)}
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      // In a real implementation, this would download the notification as a PDF
                      alert('In a real implementation, this would download the notification as a PDF.');
                    }}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Export Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 text-center">
          <Link 
            href="/"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
          >
            <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
