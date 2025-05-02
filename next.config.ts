import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // GitHub Pages configuration
  output: 'export',  // Enable static HTML export
  swcMinify: true,
  reactStrictMode: true,
  images: {
    unoptimized: true,  // Required for static export
  },
  // Configure basePath and assetPrefix for GitHub Pages
  basePath: '/ndpr-toolkit',
  assetPrefix: '/ndpr-toolkit',
};

export default nextConfig;
