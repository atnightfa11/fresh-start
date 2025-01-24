/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  reactStrictMode: true,
  basePath: process.env.VERCEL_ENV === 'production' ? '/ai-marketing' : '',
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': '.',
    };
    return config;
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/ai-marketing',
        permanent: true,
      },
    ];
  },
  publicRuntimeConfig: {
    apiUrl: process.env.NEXT_PUBLIC_API_URL || 'https://ai-marketing-hub-backend.onrender.com',
  },
};

module.exports = nextConfig; 