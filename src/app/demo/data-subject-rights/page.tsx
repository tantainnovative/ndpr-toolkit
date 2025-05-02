'use client';

import { useState } from 'react';
import Link from 'next/link';
import DataSubjectRequestForm from '@/components/data-subject-rights/DataSubjectRequestForm';
import { DataSubjectRequest, RequestStatus, RequestType } from '@/types';
import { v4 as uuidv4 } from 'uuid';

export default function DataSubjectRightsDemo() {
  const [requests, setRequests] = useState<DataSubjectRequest[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<DataSubjectRequest | null>(null);
  const [showRequestDetails, setShowRequestDetails] = useState(false);

  const handleSubmitRequest = (data: {
    requestType: RequestType;
    name: string;
    email: string;
    details: string;
  }) => {
    const newRequest: DataSubjectRequest = {
      id: uuidv4(),
      requestType: data.requestType,
      requesterId: uuidv4(),
      requesterName: data.name,
      requesterEmail: data.email,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      notes: data.details,
    };

    setRequests((prev) => [newRequest, ...prev]);
    setShowSuccess(true);
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 5000);
  };

  const handleUpdateStatus = (requestId: string, newStatus: RequestStatus) => {
    setRequests((prev) =>
      prev.map((request) => {
        if (request.id === requestId) {
          return {
            ...request,
            status: newStatus,
            updatedAt: new Date().toISOString(),
            completedAt: newStatus === 'completed' ? new Date().toISOString() : request.completedAt,
          };
        }
        return request;
      })
    );
    
    if (selectedRequest?.id === requestId) {
      setSelectedRequest((prev) => {
        if (prev) {
          return {
            ...prev,
            status: newStatus,
            updatedAt: new Date().toISOString(),
            completedAt: newStatus === 'completed' ? new Date().toISOString() : prev.completedAt,
          };
        }
        return prev;
      });
    }
  };

  const handleViewRequest = (request: DataSubjectRequest) => {
    setSelectedRequest(request);
    setShowRequestDetails(true);
  };

  const getStatusBadgeClass = (status: RequestStatus) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getRequestTypeLabel = (type: RequestType) => {
    switch (type) {
      case 'access':
        return 'Access to Personal Data';
      case 'rectification':
        return 'Rectification of Data';
      case 'erasure':
        return 'Erasure of Data';
      case 'restrict-processing':
        return 'Restriction of Processing';
      case 'data-portability':
        return 'Data Portability';
      case 'object':
        return 'Object to Processing';
      default:
        return type;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Data Subject Rights Portal
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-300 sm:mt-4">
            Submit and manage data subject rights requests in compliance with NDPR.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Request Form */}
          <div>
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Submit a New Request
            </h2>
            <DataSubjectRequestForm onSubmit={handleSubmitRequest} />
            
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
                      Request Submitted Successfully
                    </h3>
                    <div className="mt-2 text-sm text-green-700 dark:text-green-300">
                      <p>
                        Your request has been received and will be processed according to NDPR requirements.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Requests List */}
          <div>
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Manage Requests
            </h2>
            
            {requests.length === 0 ? (
              <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                <div className="text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No requests</h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Submit a request using the form to see it appear here.
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  {requests.map((request) => (
                    <li key={request.id}>
                      <div className="block hover:bg-gray-50 dark:hover:bg-gray-700">
                        <div className="px-4 py-4 sm:px-6">
                          <div className="flex items-center justify-between">
                            <div className="truncate">
                              <div className="flex text-sm">
                                <p className="font-medium text-blue-600 dark:text-blue-400 truncate">
                                  {request.requesterName}
                                </p>
                                <p className="ml-1 flex-shrink-0 font-normal text-gray-500 dark:text-gray-400">
                                  requested {getRequestTypeLabel(request.requestType)}
                                </p>
                              </div>
                              <div className="mt-2 flex">
                                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                  <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400 dark:text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M14.243 5.757a6 6 0 10-.986 9.284 1 1 0 111.087 1.678A8 8 0 1118 10a3 3 0 01-4.8 2.401A4 4 0 1114 10a1 1 0 102 0c0-1.537-.586-3.07-1.757-4.243zM12 10a2 2 0 10-4 0 2 2 0 004 0z" clipRule="evenodd" />
                                  </svg>
                                  {request.requesterEmail}
                                </div>
                              </div>
                            </div>
                            <div className="ml-2 flex-shrink-0 flex">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(request.status)}`}>
                                {request.status.charAt(0).toUpperCase() + request.status.slice(1).replace('-', ' ')}
                              </span>
                            </div>
                          </div>
                          <div className="mt-4 flex justify-between">
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              Submitted on{' '}
                              <time dateTime={request.createdAt}>
                                {new Date(request.createdAt).toLocaleDateString()}
                              </time>
                            </div>
                            <div>
                              <button
                                type="button"
                                onClick={() => handleViewRequest(request)}
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

        {/* Request Details Modal */}
        {showRequestDetails && selectedRequest && (
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
                        Request Details
                      </h3>
                      <div className="mt-4 space-y-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Request Type</h4>
                          <p className="mt-1 text-sm text-gray-900 dark:text-white">
                            {getRequestTypeLabel(selectedRequest.requestType)}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Requester</h4>
                          <p className="mt-1 text-sm text-gray-900 dark:text-white">
                            {selectedRequest.requesterName} ({selectedRequest.requesterEmail})
                          </p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</h4>
                          <p className="mt-1">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(selectedRequest.status)}`}>
                              {selectedRequest.status.charAt(0).toUpperCase() + selectedRequest.status.slice(1).replace('-', ' ')}
                            </span>
                          </p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Request Details</h4>
                          <p className="mt-1 text-sm text-gray-900 dark:text-white whitespace-pre-wrap">
                            {selectedRequest.notes}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Timeline</h4>
                          <div className="mt-1 text-sm text-gray-900 dark:text-white">
                            <div className="flex justify-between">
                              <span>Created:</span>
                              <span>{new Date(selectedRequest.createdAt).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Last Updated:</span>
                              <span>{new Date(selectedRequest.updatedAt).toLocaleString()}</span>
                            </div>
                            {selectedRequest.completedAt && (
                              <div className="flex justify-between">
                                <span>Completed:</span>
                                <span>{new Date(selectedRequest.completedAt).toLocaleString()}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    onClick={() => setShowRequestDetails(false)}
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Close
                  </button>
                  
                  {/* Status Update Buttons */}
                  <div className="mt-3 sm:mt-0 sm:flex-1 sm:flex sm:justify-start">
                    {selectedRequest.status === 'pending' && (
                      <>
                        <button
                          type="button"
                          onClick={() => handleUpdateStatus(selectedRequest.id, 'in-progress')}
                          className="w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                          Start Processing
                        </button>
                        <button
                          type="button"
                          onClick={() => handleUpdateStatus(selectedRequest.id, 'rejected')}
                          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    {selectedRequest.status === 'in-progress' && (
                      <button
                        type="button"
                        onClick={() => handleUpdateStatus(selectedRequest.id, 'completed')}
                        className="w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      >
                        Mark as Completed
                      </button>
                    )}
                  </div>
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
