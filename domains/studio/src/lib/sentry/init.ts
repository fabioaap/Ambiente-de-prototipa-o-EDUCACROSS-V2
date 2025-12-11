/**
 * Sentry Error Tracking Configuration
 * 
 * Sprint 6 (US2.2 - Monitoring): Error tracking and performance monitoring
 * Captures runtime errors, API failures, and performance metrics
 * 
 * @see https://docs.sentry.io/platforms/javascript/guides/nextjs/
 */

import * as Sentry from '@sentry/nextjs';

/**
 * Initialize Sentry for error tracking and performance monitoring
 * 
 * Configuration:
 * - DSN: Read from environment variable SENTRY_DSN
 * - Environment: Determined by NODE_ENV (development, production, test)
 * - Traces: Enabled for performance monitoring (20% sample rate)
 * - Release: Set from SENTRY_RELEASE or auto-detected
 * 
 * Features:
 * - Automatic error capture (uncaught exceptions, promise rejections)
 * - Performance monitoring (Web Vitals, transactions)
 * - Source maps support for production builds
 * - Breadcrumbs for debugging (user actions, API calls)
 */
export function initializeSentry(): void {
  // Skip initialization in test environment
  if (process.env.NODE_ENV === 'test') {
    return;
  }

  // Only initialize if DSN is configured
  if (!process.env.NEXT_PUBLIC_SENTRY_DSN) {
    console.warn(
      '[Sentry] NEXT_PUBLIC_SENTRY_DSN not configured. Error tracking disabled.'
    );
    return;
  }

  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    environment: process.env.NODE_ENV || 'development',

    // Performance Monitoring (20% sample rate in production)
    tracesSampleRate:
      process.env.NODE_ENV === 'production' ? 0.2 : 1.0,

    // Release tracking for source maps
    release: process.env.SENTRY_RELEASE || 'unknown',

    // Enable debug in development
    debug: process.env.NODE_ENV === 'development',

    // Capture breadcrumbs for debugging
    integrations: [
      Sentry.replayIntegration({
        maskAllText: true,
        blockAllMedia: true,
      }),
    ],

    // Session replay: 10% of sessions in production
    replaysSessionSampleRate:
      process.env.NODE_ENV === 'production' ? 0.1 : 0.5,

    // Replay: 100% of sessions with errors
    replaysOnErrorSampleRate: 1.0,

    // Ignore certain errors (e.g., browser extensions, network errors)
    ignoreErrors: [
      // Chrome extensions
      'chrome-extension://',
      'moz-extension://',

      // Network errors (often not actionable)
      'NetworkError',
      'timeout',

      // User-cancelled requests
      'AbortError',
    ],
  });

  console.log('[Sentry] Error tracking initialized', {
    environment: process.env.NODE_ENV,
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN?.substring(0, 30) + '...',
  });
}

/**
 * Capture and report an exception to Sentry
 * 
 * Usage:
 * ```typescript
 * captureException(new Error('Something went wrong'));
 * ```
 */
export function captureException(
  error: Error | unknown,
  context?: Record<string, unknown>
): void {
  if (context) {
    Sentry.setContext('custom', context);
  }
  Sentry.captureException(error);
}

/**
 * Capture a custom message to Sentry
 * 
 * Usage:
 * ```typescript
 * captureMessage('User performed action', 'info', { userId: 123 });
 * ```
 */
export function captureMessage(
  message: string,
  level: Sentry.SeverityLevel = 'info',
  context?: Record<string, unknown>
): void {
  if (context) {
    Sentry.setContext('custom', context);
  }
  Sentry.captureMessage(message, level);
}

/**
 * Set user information for error tracking context
 * 
 * Usage:
 * ```typescript
 * setUserContext({ id: '123', email: 'user@example.com' });
 * ```
 */
export function setUserContext(user: {
  id?: string;
  email?: string;
  name?: string;
}): void {
  Sentry.setUser(user);
}

/**
 * Clear user information (e.g., on logout)
 */
export function clearUserContext(): void {
  Sentry.setUser(null);
}
