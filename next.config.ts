import type { NextConfig } from "next";

// Check if we're in development mode
const isDevelopment = process.env.NODE_ENV === 'development';

// Repository name for GitHub Pages
const REPO_NAME = 'ndpr-toolkit';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  
  // These settings apply to all environments
  poweredByHeader: false,
  
  // Only use static export, basePath and assetPrefix in production
  ...(isDevelopment 
    ? {
        // Development config - no basePath or static export
      } 
    : {
        // Production config for GitHub Pages
        output: 'export',  // Enable static HTML export
        trailingSlash: true,  // Important for GitHub Pages to work correctly with routing
        images: {
          unoptimized: true,  // Required for static export
        },
        basePath: `/${REPO_NAME}`,
        assetPrefix: `/${REPO_NAME}`,
      }
  ),
};

// Add a custom export script to generate a .nojekyll file
// This prevents GitHub Pages from ignoring files that begin with an underscore
if (process.env.NODE_ENV === 'production') {
  const { execSync } = require('child_process');
  try {
    execSync('touch out/.nojekyll');
    console.log('Created .nojekyll file');
  } catch (error) {
    console.error('Error creating .nojekyll file:', error);
  }
}

export default nextConfig;
