import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NDPR Toolkit Documentation | Implementation Guides & API Reference',
  description: 'Comprehensive documentation for implementing NDPR-compliant features in your applications, including guides, API references, and compliance information.',
  keywords: 'NDPR Documentation, Nigerian Data Protection, Compliance Guides, API Reference, Implementation Tutorials',
  openGraph: {
    title: 'NDPR Toolkit Documentation | Implementation Guides & API Reference',
    description: 'Comprehensive documentation for implementing NDPR-compliant features in your applications, including guides, API references, and compliance information.',
    url: 'https://ndprtoolkit.com.ng/docs',
    siteName: 'NDPR Toolkit',
    images: [
      {
        url: '/og-docs.png',
        width: 1200,
        height: 630,
        alt: 'NDPR Toolkit Documentation',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NDPR Toolkit Documentation | Implementation Guides & API Reference',
    description: 'Comprehensive documentation for implementing NDPR-compliant features in your applications, including guides, API references, and compliance information.',
    images: ['/og-docs.png'],
  },
};

export default metadata;
