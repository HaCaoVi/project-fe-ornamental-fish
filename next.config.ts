import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: '25MB',
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bizweb.dktcdn.net',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'coburgaquarium.com.au',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        port: '',
      }
    ],
  },
};

export default nextConfig;