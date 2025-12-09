/**
 * Sentry Configuration for Studio
 * 
 * Sentry initialization and configuration for error tracking
 * in the EDUCACROSS Studio application.
 * 
 * Usage:
 * 1. Import at the top of your app (layout.tsx or _app.tsx)
 * 2. Call initSentry() early in application startup
 * 3. ErrorBoundary components will automatically capture errors
 * 
 * Environment Variables Required:
 * - NEXT_PUBLIC_SENTRY_DSN: Sentry DSN for error reporting
 * - SENTRY_ENVIRONMENT: 'development', 'staging', or 'production'
 * - NEXT_PUBLIC_SENTRY_ENABLED: 'true' or 'false' (default: 'true')
 */

import * as Sentry from '@sentry/nextjs';

export function initSentry() {
  // Skip initialization if disabled
  if (process.env.NEXT_PUBLIC_SENTRY_ENABLED === 'false') {
    console.log('Sentry disabled via NEXT_PUBLIC_SENTRY_ENABLED');
    return;
  }

  // Skip if no DSN provided
  if (!process.env.NEXT_PUBLIC_SENTRY_DSN) {
    console.warn('Sentry DSN not provided (NEXT_PUBLIC_SENTRY_DSN)');
    return;
  }

  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    environment: process.env.SENTRY_ENVIRONMENT || 'development',

    // Performance Monitoring
    tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

    // Release tracking
    release: process.env.NEXT_PUBLIC_APP_VERSION || 'unknown',

    // Integrations
    integrations: [
      Sentry.replayIntegration({
        maskAllText: true,
        blockAllMedia: true,
      }),
    ],

    // Session Replay
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,

    // Error filtering
    beforeSend(event, hint) {
      // Filter out certain errors in development
      if (process.env.NODE_ENV === 'development') {
        // Don't report network errors in dev
        if (hint.originalException instanceof TypeError &&
          hint.originalException.message.includes('fetch')) {
          return null;
        }
      }

      return event;
    },

    // Breadcrumb configuration
    maxBreadcrumbs: 50,
  });

  console.log('✅ Sentry initialized:', {
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN?.substring(0, 20) + '...',
    environment: process.env.SENTRY_ENVIRONMENT,
  });
}

/**
 * Capture an exception manually
 */
export function captureException(error: Error, context?: Record<string, unknown>) {
  Sentry.captureException(error, {
    ...(context && { contexts: { custom: context } }),
  });
}

/**
 * Capture a message
 */
export function captureMessage(message: string, level: Sentry.SeverityLevel = 'info') {
  Sentry.captureMessage(message, level);
}

/**
 * Add breadcrumb for tracking user actions
 */
export function addBreadcrumb(
  message: string,
  data?: Record<string, unknown>,
  category: string = 'user-action'
) {
  Sentry.addBreadcrumb({
    message,
    level: 'info',
    category,
    data,
  });
}

/**
 * Set user context
 */
export function setUserContext(userId: string, userEmail?: string, username?: string) {
  Sentry.setUser({
    id: userId,
    email: userEmail,
    username,
  });
}

/**
 * Clear user context
 */
export function clearUserContext() {
  Sentry.setUser(null);
}
