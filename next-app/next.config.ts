import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // React strict mode
  reactStrictMode: true,
  // Skip type checking for build
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
