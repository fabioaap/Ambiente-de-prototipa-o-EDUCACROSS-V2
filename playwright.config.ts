import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright E2E Test Configuration
 * 
 * Based on Sprint 6 research.md decisions:
 * - Multi-browser support: Chromium, Firefox, WebKit
 * - Screenshot/video on failure for debugging
 * - Parallel execution for faster CI (target <5min)
 * - Comprehensive artifact collection
 * 
 * Performance optimization (Sprint 6 P2):
 * - fullyParallel: true - Run all tests in parallel
 * - workers: 4 (local), 2 (CI) - CPU-bound parallel execution
 * - retries: 0 (local), 2 (CI) - Retry flaky tests only in CI
 * - timeout: 30s per test, 120s per test retry
 * 
 * @see specs/005-sprint6-execution/research.md
 * @see tests/e2e/README.md
 */
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : 4,
  timeout: 30_000,  // 30 seconds per test
  expect: {
    timeout: 5_000,  // 5 seconds for expect assertions
  },
  reporter: process.env.CI ? 'github' : 'list',
  
  outputDir: './test-results',
  
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
    navigationTimeout: 30_000,
    actionTimeout: 10_000,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],

  webServer: {
    command: 'pnpm dev:studio',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
