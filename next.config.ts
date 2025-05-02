import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vercel optimized configuration
  // No need for 'output: export' with Vercel
  // as it supports all Next.js features
  swcMinify: true,
  reactStrictMode: true,
  images: {
    domains: ['vercel.com'],
  },
};

export default nextConfig;
