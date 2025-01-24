/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  images: {
    unoptimized: true,
    domains: ['localhost'],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': '.',
    };
    return config;
  },
  trailingSlash: true,
  distDir: 'out',
  generateBuildId: async () => {
    return 'build-' + new Date().toISOString().split('T')[0];
  },
  serverRuntimeConfig: {},
  publicRuntimeConfig: {
    apiUrl: process.env.NEXT_PUBLIC_API_URL || 'https://ai-marketing-hub-backend.onrender.com',
  },
};

module.exports = nextConfig; 