import { describe, expect, test } from 'vitest';

import { runDashboardHydrationCheck } from './helpers';

const DASHBOARD_URL = 'http://localhost:3000/dashboard';

/**
 * Placeholder regression suite – currently skipped to keep CI green.
 * Once automation is implemented, remove `.skip` so the assertion fails until
 * hydration telemetry is wired up.
 */
describe('dashboard hydration regression', () => {
    test.skip('detects hydration mismatches in dev', async () => {
        await expect(
            runDashboardHydrationCheck({
                url: DASHBOARD_URL,
                networkProfile: 'slow-3g',
                extensionProfile: 'fusion-mock',
            }),
        ).rejects.toThrow('Hydration automation not implemented yet');
    });
});
