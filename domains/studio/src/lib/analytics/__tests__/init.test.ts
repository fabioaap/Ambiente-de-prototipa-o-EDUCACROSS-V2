/**
 * Analytics Integration Tests
 * 
 * Sprint 6 (US2.3 - Analytics): Verify GA4 event tracking
 * and analytics initialization functionality
 * 
 * Run tests: pnpm test -- analytics
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import ReactGA from 'react-ga4';
import {
  initializeAnalytics,
  trackEvent,
  trackPageView,
  setUserProperties,
  setUserId,
  clearUserId,
  trackException,
} from '@/lib/analytics/init';

// Mock react-ga4
vi.mock('react-ga4', () => ({
  default: {
    initialize: vi.fn(),
    event: vi.fn(),
    pageview: vi.fn(),
    gtag: vi.fn(),
  },
}));

describe('GA4 Analytics', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('initializeAnalytics', () => {
    it('should skip initialization in test environment', () => {
      vi.stubEnv('NODE_ENV', 'test');
      vi.stubEnv('NEXT_PUBLIC_GA4_ID', 'G-XXXXX');

      initializeAnalytics();

      expect(ReactGA.initialize).not.toHaveBeenCalled();

      vi.unstubAllEnvs();
    });

    it('should warn if GA4 ID is not configured', () => {
      vi.stubEnv('NODE_ENV', 'development');
      vi.stubEnv('NEXT_PUBLIC_GA4_ID', '');

      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      initializeAnalytics();

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('NEXT_PUBLIC_GA4_ID not configured')
      );

      consoleSpy.mockRestore();
      vi.unstubAllEnvs();
    });

    it('should initialize GA4 with measurement ID', () => {
      vi.stubEnv('NODE_ENV', 'production');
      vi.stubEnv('NEXT_PUBLIC_GA4_ID', 'G-ABC123XYZ');

      initializeAnalytics();

      expect(ReactGA.initialize).toHaveBeenCalledWith('G-ABC123XYZ', {
        debugMode: false,
        gtagUrl: 'https://www.googletagmanager.com/gtag/js',
      });

      vi.unstubAllEnvs();
    });

    it('should enable debug mode in development', () => {
      vi.stubEnv('NODE_ENV', 'development');
      vi.stubEnv('NEXT_PUBLIC_GA4_ID', 'G-DEV123');

      initializeAnalytics();

      expect(ReactGA.initialize).toHaveBeenCalledWith('G-DEV123', {
        debugMode: true,
        gtagUrl: 'https://www.googletagmanager.com/gtag/js',
      });

      vi.unstubAllEnvs();
    });
  });

  describe('trackEvent', () => {
    it('should skip tracking in test environment', () => {
      vi.stubEnv('NODE_ENV', 'test');
      vi.stubEnv('NEXT_PUBLIC_GA4_ID', 'G-XXXXX');

      trackEvent('test_event', { param: 'value' });

      expect(ReactGA.event).not.toHaveBeenCalled();

      vi.unstubAllEnvs();
    });

    it('should skip tracking if GA4 ID not configured', () => {
      vi.stubEnv('NODE_ENV', 'production');
      vi.stubEnv('NEXT_PUBLIC_GA4_ID', '');

      trackEvent('test_event', { param: 'value' });

      expect(ReactGA.event).not.toHaveBeenCalled();

      vi.unstubAllEnvs();
    });

    it('should track event with parameters', () => {
      vi.stubEnv('NODE_ENV', 'production');
      vi.stubEnv('NEXT_PUBLIC_GA4_ID', 'G-ABC123XYZ');

      trackEvent('page_create', { page_type: 'dashboard', pages_count: 5 });

      expect(ReactGA.event).toHaveBeenCalledWith('page_create', {
        page_type: 'dashboard',
        pages_count: 5,
      });

      vi.unstubAllEnvs();
    });

    it('should track event without parameters', () => {
      vi.stubEnv('NODE_ENV', 'production');
      vi.stubEnv('NEXT_PUBLIC_GA4_ID', 'G-ABC123XYZ');

      trackEvent('dashboard_load');

      expect(ReactGA.event).toHaveBeenCalledWith('dashboard_load', {});

      vi.unstubAllEnvs();
    });
  });

  describe('trackPageView', () => {
    it('should track page view with path', () => {
      vi.stubEnv('NODE_ENV', 'production');
      vi.stubEnv('NEXT_PUBLIC_GA4_ID', 'G-ABC123XYZ');

      trackPageView('/dashboard');

      expect(ReactGA.pageview).toHaveBeenCalledWith('/dashboard', undefined);

      vi.unstubAllEnvs();
    });

    it('should track page view with path and title', () => {
      vi.stubEnv('NODE_ENV', 'production');
      vi.stubEnv('NEXT_PUBLIC_GA4_ID', 'G-ABC123XYZ');

      trackPageView('/studio/editor', 'Studio - Page Editor');

      expect(ReactGA.pageview).toHaveBeenCalledWith('/studio/editor', 'Studio - Page Editor');

      vi.unstubAllEnvs();
    });
  });

  describe('setUserProperties', () => {
    it('should set user properties', () => {
      vi.stubEnv('NODE_ENV', 'production');
      vi.stubEnv('NEXT_PUBLIC_GA4_ID', 'G-ABC123XYZ');

      const properties = {
        user_id: 'user123',
        user_segment: 'premium',
        plan_type: 'enterprise',
      };

      setUserProperties(properties);

      expect(ReactGA.gtag).toHaveBeenCalledWith('set', {
        'user_properties': properties,
      });

      vi.unstubAllEnvs();
    });
  });

  describe('setUserId', () => {
    it('should set user ID', () => {
      vi.stubEnv('NODE_ENV', 'production');
      vi.stubEnv('NEXT_PUBLIC_GA4_ID', 'G-ABC123XYZ');

      setUserId('user456');

      expect(ReactGA.gtag).toHaveBeenCalledWith('config', {
        'user_id': 'user456',
      });

      vi.unstubAllEnvs();
    });
  });

  describe('clearUserId', () => {
    it('should clear user ID on logout', () => {
      vi.stubEnv('NODE_ENV', 'production');
      vi.stubEnv('NEXT_PUBLIC_GA4_ID', 'G-ABC123XYZ');

      clearUserId();

      expect(ReactGA.gtag).toHaveBeenCalledWith('config', {
        'user_id': undefined,
      });

      vi.unstubAllEnvs();
    });
  });

  describe('trackException', () => {
    it('should track exception as non-fatal', () => {
      vi.stubEnv('NODE_ENV', 'production');
      vi.stubEnv('NEXT_PUBLIC_GA4_ID', 'G-ABC123XYZ');

      trackException('Failed to load dashboard data');

      expect(ReactGA.event).toHaveBeenCalledWith('exception', {
        description: 'Failed to load dashboard data',
        fatal: false,
      });

      vi.unstubAllEnvs();
    });

    it('should track exception as fatal', () => {
      vi.stubEnv('NODE_ENV', 'production');
      vi.stubEnv('NEXT_PUBLIC_GA4_ID', 'G-ABC123XYZ');

      trackException('Critical error: App crash', true);

      expect(ReactGA.event).toHaveBeenCalledWith('exception', {
        description: 'Critical error: App crash',
        fatal: true,
      });

      vi.unstubAllEnvs();
    });
  });
});
