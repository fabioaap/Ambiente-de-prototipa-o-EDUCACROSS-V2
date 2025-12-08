/**
 * Google Analytics 4 Configuration
 * 
 * Sprint 6 (US2.3 - Analytics): Event tracking and usage metrics
 * Captures page views, user interactions, and custom events
 * 
 * @see https://support.google.com/analytics/answer/10089681
 * @see https://react-ga4.web.app/
 */

import ReactGA from 'react-ga4';

/**
 * Initialize GA4 for event tracking and analytics
 * 
 * Configuration:
 * - Measurement ID: Read from NEXT_PUBLIC_GA4_ID
 * - Environment: Determined by NODE_ENV
 * - Debug mode: Enabled in development
 * - Page tracking: Automatic on route change
 * 
 * Features:
 * - Page view tracking (automatic)
 * - Custom event tracking (dashboard_load, page_create, csv_export)
 * - User properties (user ID, user segment, plan type)
 * - Performance metrics (page load, interaction timing)
 * - E-commerce tracking (optional for future)
 */
export function initializeAnalytics(): void {
  // Skip initialization in test environment
  if (process.env.NODE_ENV === 'test') {
    return;
  }

  // Skip if GA4 ID not configured
  if (!process.env.NEXT_PUBLIC_GA4_ID) {
    console.warn(
      '[Analytics] NEXT_PUBLIC_GA4_ID not configured - analytics disabled'
    );
    return;
  }

  try {
    // Initialize GA4 with measurement ID
    ReactGA.initialize(process.env.NEXT_PUBLIC_GA4_ID, {
      // Track page views automatically
      gtagUrl: 'https://www.googletagmanager.com/gtag/js',
    });

    console.log(
      '[Analytics] GA4 initialized',
      `{ measurement: '${process.env.NEXT_PUBLIC_GA4_ID}', environment: '${process.env.NODE_ENV}' }`
    );
  } catch (error) {
    console.error('[Analytics] Failed to initialize GA4:', error);
  }
}

/**
 * Track a custom event in GA4
 * 
 * @param eventName - Event name (e.g., 'page_create', 'csv_export')
 * @param params - Event parameters (key-value pairs)
 * 
 * Examples:
 * - trackEvent('page_create', { page_type: 'dashboard', pages_count: 5 })
 * - trackEvent('csv_export', { format: 'csv', rows: 100 })
 * - trackEvent('dashboard_load', { tabs_open: 3, filters_applied: 1 })
 */
export function trackEvent(eventName: string, params?: Record<string, any>): void {
  if (process.env.NODE_ENV === 'test') {
    return;
  }

  if (!process.env.NEXT_PUBLIC_GA4_ID) {
    return;
  }

  try {
    ReactGA.event(eventName, params || {});
  } catch (error) {
    console.error(`[Analytics] Failed to track event "${eventName}":`, error);
  }
}

/**
 * Track a page view
 * 
 * Automatically called by React Router on route change.
 * Can also be called manually for single-page app navigation.
 * 
 * @param path - Page path (e.g., '/dashboard', '/studio/editor')
 * @param title - Page title (optional)
 */
export function trackPageView(path: string, title?: string): void {
  if (process.env.NODE_ENV === 'test') {
    return;
  }

  if (!process.env.NEXT_PUBLIC_GA4_ID) {
    return;
  }

  try {
    const payload: Parameters<typeof ReactGA.send>[0] = {
      hitType: 'pageview',
      page: path,
    };

    if (title) {
      payload.title = title;
    }

    ReactGA.send(payload);
  } catch (error) {
    console.error('[Analytics] Failed to track page view:', error);
  }
}

/**
 * Set user properties for segmentation and tracking
 * 
 * @param properties - User properties object
 * 
 * Example:
 * setUserProperties({
 *   user_id: 'user123',
 *   user_segment: 'premium',
 *   plan_type: 'enterprise',
 * })
 */
export function setUserProperties(properties: Record<string, any>): void {
  if (process.env.NODE_ENV === 'test') {
    return;
  }

  if (!process.env.NEXT_PUBLIC_GA4_ID) {
    return;
  }

  try {
    ReactGA.gtag('set', { 'user_properties': properties });
  } catch (error) {
    console.error('[Analytics] Failed to set user properties:', error);
  }
}

/**
 * Set user ID for cross-session tracking
 * 
 * @param userId - Unique user identifier
 */
export function setUserId(userId: string): void {
  if (process.env.NODE_ENV === 'test') {
    return;
  }

  if (!process.env.NEXT_PUBLIC_GA4_ID) {
    return;
  }

  try {
    ReactGA.gtag('config', {
      'user_id': userId,
    });
  } catch (error) {
    console.error('[Analytics] Failed to set user ID:', error);
  }
}

/**
 * Clear user ID on logout
 */
export function clearUserId(): void {
  if (process.env.NODE_ENV === 'test') {
    return;
  }

  if (!process.env.NEXT_PUBLIC_GA4_ID) {
    return;
  }

  try {
    ReactGA.gtag('config', {
      'user_id': undefined,
    });
  } catch (error) {
    console.error('[Analytics] Failed to clear user ID:', error);
  }
}

/**
 * Track exception/error for error analytics
 * 
 * @param description - Error description
 * @param isFatal - Whether error is fatal (app crash)
 */
export function trackException(description: string, isFatal = false): void {
  if (process.env.NODE_ENV === 'test') {
    return;
  }

  if (!process.env.NEXT_PUBLIC_GA4_ID) {
    return;
  }

  try {
    ReactGA.event('exception', {
      description,
      fatal: isFatal,
    });
  } catch (error) {
    console.error('[Analytics] Failed to track exception:', error);
  }
}
