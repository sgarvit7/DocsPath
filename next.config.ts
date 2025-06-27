import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["flagsapi.com"],
  },
};

export default nextConfig;