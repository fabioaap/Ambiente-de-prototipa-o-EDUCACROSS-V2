import { withSentryConfig } from '@sentry/nextjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@prototipo/design-system', '@prototipo/tokens'],
  sentry: {
    // Sentry configuration options
    hideSourceMaps: true, // Hide source maps in production
    autoInstrumentServerFunctions: true, // Enable server function instrumentation
  },
};

export default withSentryConfig(nextConfig, {
  // Additional Sentry webpack plugin configuration
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  authToken: process.env.SENTRY_AUTH_TOKEN,
  // Only upload source maps in production CI/CD
  dryRun: process.env.NODE_ENV !== 'production',
  silent: true,
});
