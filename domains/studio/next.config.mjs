/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@prototipo/design-system', '@prototipo/tokens'],
  reactStrictMode: true,
  turbopack: {}, // Turbopack enabled by default in Next.js 16
  typescript: {
    ignoreBuildErrors: true,
  },
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  webpack: (config, { isServer }) => {
    // Ignorar journeys durante build TypeScript
    config.watchOptions = {
      ...config.watchOptions,
      ignored: ['**/journeys/**', '**/node_modules/**'],
    };
    return config;
  },
};

export default nextConfig;

