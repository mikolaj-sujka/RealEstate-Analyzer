import { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { }) => {
    if (config.cache) {
      config.cache = { type: 'memory' };
    }
    config.infrastructureLogging = {
      level: 'error',
    };
    return config;
  },
};

export default nextConfig;