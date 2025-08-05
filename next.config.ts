import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.builder.io",
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8080', // port backend của bạn
        pathname: '/uploads/avatars/**',
      },
    ],
  },
};

export default nextConfig;
