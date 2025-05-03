'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import PolicyGenerator from '@/components/privacy-policy/PolicyGenerator';
import { PolicySection, PrivacyPolicy } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import { jsPDF } from 'jspdf';

export default function PrivacyPolicyDemo() {
  const [generatedPolicy, setGeneratedPolicy] = useState<PrivacyPolicy | null>(null);
  const [showGenerator, setShowGenerator] = useState(true);
  const policyContentRef = useRef<HTMLDivElement>(null);

  const handleGeneratePolicy = (data: {
    organizationName: string;
    organizationContact: string;
    sections: PolicySection[];
  }) => {
    const policy: PrivacyPolicy = {
      id: uuidv4(),
      organizationName: data.organizationName,
      organizationContact: data.organizationContact,
      effectiveDate: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0],
      version: '1.0',
      sections: data.sections,
    };

    setGeneratedPolicy(policy);
    setShowGenerator(false);
  };

  const handleEditPolicy = () => {
    setShowGenerator(true);
  };

  // Function to convert HTML to Markdown
  const convertToMarkdown = (html: string): string => {
    // Simple HTML to Markdown conversion
    let md = html
      .replace(/<h1>(.*?)<\/h1>/g, '# $1\n\n')
      .replace(/<h2>(.*?)<\/h2>/g, '## $1\n\n')
      .replace(/<h3>(.*?)<\/h3>/g, '### $1\n\n')
      .replace(/<p>(.*?)<\/p>/g, '$1\n\n')
      .replace(/<strong>(.*?)<\/strong>/g, '**$1**')
      .replace(/<em>(.*?)<\/em>/g, '*$1*')
      .replace(/<ul>(.*?)<\/ul>/g, '$1\n')
      .replace(/<li>(.*?)<\/li>/g, '- $1\n')
      .replace(/<br\s*\/?>/g, '\n')
      .replace(/&nbsp;/g, ' ');

    // Remove any remaining HTML tags
    md = md.replace(/<[^>]*>/g, '');

    return md;
  };

  // Handle downloading the policy in different formats
  const handleDownloadPolicy = async (format: 'txt' | 'html' | 'md' | 'pdf' | 'rtf') => {
    if (!generatedPolicy || !policyContentRef.current) {
      alert('Policy content not available. Please try again.');
      return;
    }

    let content = '';
    let mimeType = '';
    let fileExtension = '';
    let blob: Blob | null = null;

    const policyText = policyContentRef.current.innerText;
    const policyHTML = policyContentRef.current.innerHTML;
    const policyTitle = `${generatedPolicy.organizationName} Privacy Policy`;
    const fileName = `${generatedPolicy.organizationName.replace(/\s+/g, '-').toLowerCase()}-privacy-policy`;

    // Helper function to extract policy sections
    const extractPolicySections = () => {
      const sections: {title: string, content: string}[] = [];
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = policyHTML;
      
      // Get all h2 elements
      const h2Elements = tempDiv.querySelectorAll('h2');
      h2Elements.forEach((h2) => {
        const title = h2.textContent || '';
        let content = '';
        
        // Get content until the next h2 or end of document
        let currentNode = h2.nextSibling;
        while (currentNode && (currentNode.nodeName !== 'H2')) {
          if (currentNode.textContent) {
            content += currentNode.textContent + '\n';
          }
          currentNode = currentNode.nextSibling;
        }
        
        sections.push({ title, content });
      });
      
      return sections;
    };

    // Extract the main title
    const extractMainTitle = () => {
      const h1Regex = /<h1>(.*?)<\/h1>/g;
      const mainTitleMatch = h1Regex.exec(policyHTML);
      return mainTitleMatch ? mainTitleMatch[1] : policyTitle;
    };

    try {
      switch (format) {
        case 'pdf':
          // Create PDF using jsPDF with improved formatting
          const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
          });

          // Get policy sections and main title
          const sections = extractPolicySections();
          const mainTitle = extractMainTitle();

          // Set up PDF styling
          pdf.setFont('helvetica', 'bold');
          pdf.setFontSize(18);
          pdf.setTextColor(0, 0, 0);
          
          // Add title
          pdf.text(mainTitle, 20, 20);
          
          // Add metadata
          pdf.setFont('helvetica', 'normal');
          pdf.setFontSize(10);
          pdf.setTextColor(100, 100, 100);
          pdf.text(`Effective Date: ${new Date(generatedPolicy.effectiveDate).toLocaleDateString()}`, 20, 30);
          pdf.text(`Last Updated: ${new Date(generatedPolicy.lastUpdated).toLocaleDateString()}`, 20, 35);
          pdf.text(`Version: ${generatedPolicy.version}`, 20, 40);
          
          let yPosition = 50;
          const pageHeight = pdf.internal.pageSize.height;
          const margin = 20;
          
          // Add sections
          sections.forEach((section) => {
            // Check if we need a new page
            if (yPosition > pageHeight - 30) {
              pdf.addPage();
              yPosition = 20;
            }
            
            // Add section title
            pdf.setFont('helvetica', 'bold');
            pdf.setFontSize(14);
            pdf.setTextColor(0, 0, 0);
            pdf.text(section.title, 20, yPosition);
            yPosition += 10;
            
            // Add section content
            pdf.setFont('helvetica', 'normal');
            pdf.setFontSize(12);
            pdf.setTextColor(0, 0, 0);
            
            // Split content into lines that fit on the page
            const contentLines = pdf.splitTextToSize(section.content.trim(), 170);
            
            // Check if content will fit on current page, otherwise add a new page
            if (yPosition + contentLines.length * 6 > pageHeight - margin) {
              const linesForThisPage = Math.floor((pageHeight - yPosition - margin) / 6);
              
              if (linesForThisPage > 0) {
                pdf.text(contentLines.slice(0, linesForThisPage), 20, yPosition);
                pdf.addPage();
                yPosition = 20;
                pdf.text(contentLines.slice(linesForThisPage), 20, yPosition);
                yPosition += (contentLines.length - linesForThisPage) * 6;
              } else {
                pdf.addPage();
                yPosition = 20;
                pdf.text(contentLines, 20, yPosition);
                yPosition += contentLines.length * 6;
              }
            } else {
              pdf.text(contentLines, 20, yPosition);
              yPosition += contentLines.length * 6;
            }
            
            yPosition += 10; // Add space between sections
          });

          // Add footer with page numbers
          const totalPages = pdf.internal.pages.length - 1; // -1 because jsPDF uses 1-based indexing
          for (let i = 1; i <= totalPages; i++) {
            pdf.setPage(i);
            pdf.setFont('helvetica', 'italic');
            pdf.setFontSize(10);
            pdf.setTextColor(150, 150, 150);
            pdf.text(`Page ${i} of ${totalPages}`, pdf.internal.pageSize.width / 2, pdf.internal.pageSize.height - 10, { align: 'center' });
          }
          
          // Get PDF as blob
          blob = pdf.output('blob');
          mimeType = 'application/pdf';
          fileExtension = 'pdf';
          break;

        case 'rtf': // Changed from 'docx' to 'rtf' for better compatibility
          // Get policy sections and main title
          const rtfSections = extractPolicySections();
          const rtfTitle = extractMainTitle();
          
          // Create an RTF-like content that Word can open
          // This is a simple RTF template that works better than plain text
          content = `{\rtf1\ansi\ansicpg1252\cocoartf2580\cocoasubrtf220
{\fonttbl\f0\fswiss\fcharset0 Helvetica;\f1\fswiss\fcharset0 Helvetica-Bold;}
{\colortbl;\red0\green0\blue0;\red51\green51\blue51;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\pardirnatural\partightenfactor0

\f1\fs36 \cf0 ${rtfTitle.replace(/[\\{}]/g, '\\$&')}\f0\fs24 \cf0 \par
\fs20 \cf2 Effective Date: ${new Date(generatedPolicy.effectiveDate).toLocaleDateString()}\par
Last Updated: ${new Date(generatedPolicy.lastUpdated).toLocaleDateString()}\par
Version: ${generatedPolicy.version}\par\par\cf0 \fs24 
`;
          
          // Add each section
          rtfSections.forEach((section: {title: string, content: string}) => {
            // Add section title (bold)
            content += `\f1\fs28 \cf0 ${section.title.replace(/[\\{}]/g, '\\$&')}\f0\fs24 \par\par\n`;
            
            // Add section content (paragraphs)
            const paragraphs = section.content.split('\n').filter((p: string) => p.trim());
            paragraphs.forEach((para: string) => {
              content += `${para.replace(/[\\{}]/g, '\\$&')}\par\n`;
            });
            
            content += '\par\n';
          });
          
          // Close the RTF document
          content += '}';
          
          mimeType = 'application/rtf';
          fileExtension = 'rtf'; // Using RTF instead of DOCX for better compatibility
          blob = new Blob([content], { type: mimeType });
          break;

        case 'html':
          content = `<!DOCTYPE html>
<html>
<head>
  <title>${policyTitle}</title>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 20px; }
    h1 { color: #333; }
    h2 { color: #444; border-bottom: 1px solid #eee; padding-bottom: 5px; }
  </style>
</head>
<body>
  ${policyHTML}
  <footer>
    <p><small>Generated on ${new Date().toLocaleDateString()}</small></p>
  </footer>
</body>
</html>`;
          mimeType = 'text/html';
          fileExtension = 'html';
          blob = new Blob([content], { type: mimeType });
          break;

        case 'md':
          content = convertToMarkdown(policyHTML);
          mimeType = 'text/markdown';
          fileExtension = 'md';
          blob = new Blob([content], { type: mimeType });
          break;

        case 'txt':
        default:
          content = policyText;
          mimeType = 'text/plain';
          fileExtension = 'txt';
          blob = new Blob([content], { type: mimeType });
          break;
      }

      if (blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${fileName}.${fileExtension}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Error generating document:', error);
      alert('There was an error generating your document. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Privacy Policy Generator
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-300 sm:mt-4">
            Create NDPR-compliant privacy policies with our interactive wizard.
          </p>
        </div>

        {showGenerator ? (
          <div className="mt-12">
            <PolicyGenerator onGenerate={handleGeneratePolicy} />
          </div>
        ) : (
          <div className="mt-12">
            <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                    Privacy Policy
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
                    Generated for {generatedPolicy?.organizationName}
                  </p>
                </div>
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      // Copy policy text to clipboard
                      const policyText = document.querySelector('.prose')?.textContent;
                      if (policyText) {
                        navigator.clipboard.writeText(policyText);
                        alert('Policy copied to clipboard!');
                      }
                    }}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    aria-label="Copy policy to clipboard"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      // Share policy via email
                      const subject = `${generatedPolicy?.organizationName} Privacy Policy`;
                      const body = `Please find our privacy policy at: [Your Website URL]\n\nRegards,\n${generatedPolicy?.organizationName}`;
                      window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                    }}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    aria-label="Share policy via email"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    Share
                  </button>
                  <div className="relative inline-block text-left" id="download-menu-container">
                    <button
                      type="button"
                      id="download-menu-button"
                      aria-expanded="true"
                      aria-haspopup="true"
                      onClick={() => {
                        const menu = document.getElementById('download-menu');
                        if (menu) {
                          menu.classList.toggle('hidden');
                        }
                      }}
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download
                    </button>
                    <div 
                      id="download-menu"
                      className="hidden absolute right-0 mt-2 w-64 rounded-lg shadow-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 focus:outline-none z-10 transition-all duration-200 ease-in-out transform origin-top-right"
                    >
                      <div className="py-2" role="menu" aria-orientation="vertical" aria-labelledby="download-menu-button">
                        <button
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                          role="menuitem"
                          onClick={() => {
                            handleDownloadPolicy('pdf');
                            const menu = document.getElementById('download-menu');
                            if (menu) menu.classList.add('hidden');
                          }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                          <span>PDF Document (.pdf)</span>
                        </button>
                        <button
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                          role="menuitem"
                          onClick={() => {
                            handleDownloadPolicy('rtf');
                            const menu = document.getElementById('download-menu');
                            if (menu) menu.classList.add('hidden');
                          }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <span>Word (RTF)</span>
                        </button>
                        <button
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                          role="menuitem"
                          onClick={() => {
                            handleDownloadPolicy('txt');
                            const menu = document.getElementById('download-menu');
                            if (menu) menu.classList.add('hidden');
                          }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <span>Text File (.txt)</span>
                        </button>
                        <button
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                          role="menuitem"
                          onClick={() => {
                            handleDownloadPolicy('html');
                            const menu = document.getElementById('download-menu');
                            if (menu) menu.classList.add('hidden');
                          }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                          </svg>
                          <span>HTML Document (.html)</span>
                        </button>
                        <button
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                          role="menuitem"
                          onClick={() => {
                            handleDownloadPolicy('md');
                            const menu = document.getElementById('download-menu');
                            if (menu) menu.classList.add('hidden');
                          }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                          <span>Markdown (.md)</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleEditPolicy}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Edit Policy
                  </button>
                </div>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:px-6">
                <div ref={policyContentRef} className="prose dark:prose-invert max-w-none">
                  <h1>{generatedPolicy?.organizationName} Privacy Policy</h1>
                  
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                    <p>
                      <strong>Effective Date:</strong> {new Date(generatedPolicy?.effectiveDate || '').toLocaleDateString()}
                      <br />
                      <strong>Last Updated:</strong> {new Date(generatedPolicy?.lastUpdated || '').toLocaleDateString()}
                      <br />
                      <strong>Version:</strong> {generatedPolicy?.version}
                    </p>
                  </div>
                  
                  {generatedPolicy?.sections.map((section) => (
                    <div key={section.id} className="mb-6">
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                        {section.title}
                      </h2>
                      <div className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                        {section.content}
                      </div>
                    </div>
                  ))}
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
