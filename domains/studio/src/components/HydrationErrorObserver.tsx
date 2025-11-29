'use client';

import { useEffect } from 'react';

import type { HydrationSnapshot } from '@/lib/hydration/types';
import { captureAttributeSnapshot, deriveExtensionFingerprint } from '@/lib/hydration/extensionFingerprint';
import { getDashboardLogger } from '@/lib/logger/dashboardLogger';

/**
 * Client component that wires React's onRecoverableError to capture hydration mismatches
 * and forward them to the dashboard logger with structured telemetry.
 */
export function HydrationErrorObserver() {
    useEffect(() => {
        // Skip if we're on the server
        if (typeof window === 'undefined') {
            return;
        }

        // Create a global handler for React recoverable errors
        const originalConsoleError = console.error;
        let serverSnapshot: Record<string, string> | null = null;

        // Capture initial server-rendered attributes from <html>
        const captureServerSnapshot = () => {
            const htmlElement = document.documentElement;
            if (htmlElement) {
                serverSnapshot = captureAttributeSnapshot(htmlElement);
            }
        };

        // Capture as early as possible
        captureServerSnapshot();

        // Intercept console.error to detect React hydration warnings
        console.error = (...args: unknown[]) => {
            const message = String(args[0] || '');

            // Detect React hydration error patterns with high specificity
            const isHydrationError =
                // React 18+ hydration errors
                (message.includes('Hydration failed') && message.includes('because')) ||
                (message.includes('hydration') && message.includes('server HTML')) ||
                message.includes('Did not expect server HTML') ||
                (message.includes('A tree hydrated') && message.includes('but some')) ||
                // Specific React error codes
                message.includes('Minified React error #418') || // Hydration mismatch
                message.includes('Minified React error #425') || // Text content mismatch
                // React DevTools hydration warnings
                (message.includes('Warning:') && message.includes('did not match'));

            if (isHydrationError && serverSnapshot) {
                const htmlElement = document.documentElement;
                const clientSnapshot = captureAttributeSnapshot(htmlElement);
                const extensionFingerprint = deriveExtensionFingerprint(serverSnapshot, clientSnapshot);
                const correlationId = crypto.randomUUID();

                const snapshot: HydrationSnapshot = {
                    route: window.location.pathname,
                    serverAttributes: serverSnapshot,
                    clientAttributes: clientSnapshot,
                    extensionFingerprint,
                    timestamp: new Date().toISOString(),
                    correlationId,
                    severity: 'warn', // Default to warn for hydration mismatches
                };

                // Log to dashboard telemetry
                const logger = getDashboardLogger();
                logger.logHydrationSnapshot(snapshot);
            }

            // Always forward to original console.error
            originalConsoleError.apply(console, args);
        };

        // Cleanup: restore original console.error
        return () => {
            console.error = originalConsoleError;
        };
    }, []);

    // This component doesn't render anything
    return null;
}
