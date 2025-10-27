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
        hostname: 'storage.googleapis.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'cdn.tgdd.vn',
        port: '',
      }
    ],
  },
};

export default nextConfig;