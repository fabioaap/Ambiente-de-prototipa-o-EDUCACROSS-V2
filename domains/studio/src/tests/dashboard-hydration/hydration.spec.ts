import { describe, expect, test } from 'vitest';

import { runDashboardHydrationCheck } from './helpers';

const DASHBOARD_URL = 'http://localhost:3000/dashboard';

/**
 * Dashboard hydration regression suite.
 * Validates that the dashboard loads without hydration warnings
 * even when browser extensions inject classes or network is throttled.
 */
describe('dashboard hydration regression', () => {
    test('passes with no extension interference', async () => {
        const result = await runDashboardHydrationCheck({
            url: DASHBOARD_URL,
            networkProfile: 'normal',
            extensionProfile: 'none',
        });

        expect(result.hasMismatch).toBe(false);
        expect(result.warnings).toHaveLength(0);
        expect(result.networkProfile).toBe('normal');
        expect(result.extensionProfile).toBe('none');
    });

    test('passes with slow-3g network throttling', async () => {
        const result = await runDashboardHydrationCheck({
            url: DASHBOARD_URL,
            networkProfile: 'slow-3g',
            extensionProfile: 'none',
        });

        expect(result.hasMismatch).toBe(false);
        expect(result.warnings).toHaveLength(0);
    });

    test('passes with fusion extension mock', async () => {
        const result = await runDashboardHydrationCheck({
            url: DASHBOARD_URL,
            networkProfile: 'normal',
            extensionProfile: 'fusion-mock',
        });

        expect(result.hasMismatch).toBe(false);
        expect(result.warnings).toHaveLength(0);
    });

    test('passes with combined slow-3g and extension', async () => {
        const result = await runDashboardHydrationCheck({
            url: DASHBOARD_URL,
            networkProfile: 'slow-3g',
            extensionProfile: 'fusion-mock',
        });

        expect(result.hasMismatch).toBe(false);
        expect(result.warnings).toHaveLength(0);
        expect(result.durationMs).toBeGreaterThan(0);
    });
});
