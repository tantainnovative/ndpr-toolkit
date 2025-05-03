import type { NextConfig } from "next";

// Check if we're in development mode
const isDevelopment = process.env.NODE_ENV === 'development';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  
  // Only use static export, basePath and assetPrefix in production
  ...(isDevelopment 
    ? {
        // Development config - no basePath or static export
      } 
    : {
        // Production config for GitHub Pages
        output: 'export',  // Enable static HTML export
        images: {
          unoptimized: true,  // Required for static export
        },
        basePath: '/ndpr-toolkit',
        assetPrefix: '/ndpr-toolkit',
      }
  ),
};

export default nextConfig;
