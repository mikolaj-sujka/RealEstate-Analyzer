import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";
const withVanillaExtract = createVanillaExtractPlugin();

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  webpack: (config, { dev, isServer }) => {
    // Optimize caching to reduce serialization issues
    if (!dev && !isServer) {
      config.cache = {
        type: 'filesystem',
        compression: 'gzip',
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      };
    }

    // Optimize for large modules
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        ...config.optimization.splitChunks,
        cacheGroups: {
          ...config.optimization.splitChunks.cacheGroups,
          echarts: {
            name: 'echarts',
            test: /[\\/]node_modules[\\/](echarts|zrender)[\\/]/,
            chunks: 'all',
            priority: 20,
          },
          mantine: {
            name: 'mantine',
            test: /[\\/]node_modules[\\/]@mantine[\\/]/,
            chunks: 'all',
            priority: 15,
          },
        },
      },
    };

    return config;
  },
};

export default withVanillaExtract(nextConfig);
