/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  typescript: {
    // !! WARN !!
    // Be careful using this in production
    ignoreBuildErrors: true,
  },
  // Add support for path aliases
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': '.',
    };
    return config;
  },
  // Optimize image loading
  images: {
    domains: [],
  }
}

module.exports = nextConfig