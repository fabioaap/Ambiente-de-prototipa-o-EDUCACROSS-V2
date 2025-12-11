'use client';

/**
 * Studio Root Layout Client Component
 * 
 * Initializes Sentry error tracking on client-side
 * and provides ErrorBoundary wrapper for all pages
 */

import React, { ReactNode, useEffect } from 'react';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { initializeSentry } from '@/lib/sentry/init';

interface StudioRootProps {
  children: ReactNode;
}

/**
 * StudioRoot initializes Sentry and wraps content with ErrorBoundary
 */
export function StudioRoot({ children }: StudioRootProps) {
  useEffect(() => {
    // Initialize Sentry on client-side
    initializeSentry();
  }, []);

  return (
    <ErrorBoundary>
      {children}
    </ErrorBoundary>
  );
}
