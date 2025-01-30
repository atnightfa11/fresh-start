export const siteConfig = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  backendUrl: process.env.NEXT_PUBLIC_BACKEND_URL || 'https://ai-marketing-hub-backend.onrender.com',
  isDev: process.env.NODE_ENV === 'development',
  isProd: process.env.NODE_ENV === 'production',
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
}; 