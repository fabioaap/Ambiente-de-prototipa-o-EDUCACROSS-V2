'use client';

/**
 * Analytics Provider Component
 * 
 * Client-side wrapper for GA4 initialization and tracking
 * Initializes analytics on component mount and tracks route changes
 */

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { initializeAnalytics, trackPageView } from '@/lib/analytics/init';

interface AnalyticsProviderProps {
  children: React.ReactNode;
}

/**
 * AnalyticsProvider - Wrap your app with this to enable GA4 tracking
 * 
 * Usage:
 * <AnalyticsProvider>
 *   {children}
 * </AnalyticsProvider>
 */
export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  const pathname = usePathname();

  // Initialize GA4 on mount
  useEffect(() => {
    initializeAnalytics();
  }, []);

  // Track page views on route change
  useEffect(() => {
    trackPageView(pathname);
  }, [pathname]);

  return children;
}
