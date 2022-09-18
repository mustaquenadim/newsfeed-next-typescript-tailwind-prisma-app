/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    environment: process.env.ENVIRONMENT,
    baseUrl: process.env.BASE_URL,
    apiUrl: process.env.API_URL,
    rapidApiKey: process.env.RAPIDAPI_KEY,
    rapidApiHost: process.env.RAPIDAPI_HOST
  }
};

module.exports = nextConfig;
