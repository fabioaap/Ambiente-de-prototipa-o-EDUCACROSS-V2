import type { DashboardRenderCheck, ExtensionProfile, NetworkProfile } from '@/lib/hydration/types';

export interface HydrationTestOptions {
    url: string;
    networkProfile?: NetworkProfile;
    extensionProfile?: ExtensionProfile;
}

/**
 * Placeholder helper. It will be replaced by a Playwright/Vitest harness that drives
 * `/dashboard`, injects classes, and records console warnings.
 */
export async function runDashboardHydrationCheck(
    options: HydrationTestOptions,
): Promise<DashboardRenderCheck> {
    void options;
    throw new Error('Hydration automation not implemented yet');
}
