import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['cdn.sanity.io'], // Allow images from the Sanity CDN
  },
};

export default nextConfig;

