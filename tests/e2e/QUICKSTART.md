# E2E Testing Quickstart

**Sprint 6 Phase 6 (US2.1)** - End-to-End testing guide for EDUCACROSS Platform

## Quick Reference

```bash
# Run all E2E tests
pnpm exec playwright test

# Run specific suite
pnpm exec playwright test dashboard-api.spec.ts

# Debug mode (visual inspector)
pnpm exec playwright test --debug

# UI mode (visual runner)
pnpm exec playwright test --ui

# Generate HTML report
pnpm exec playwright test && pnpm exec playwright show-report
```

## Test Suites Overview

### 1. Dashboard API Contracts (`dashboard-api.spec.ts`)

Verifies API endpoints return correct structure and data types.

**Tests:**
- Response structure (healthScore, kpis, lastUpdated, totalPages)
- Type validation (number, array, string)
- Value ranges (0-100 scores)
- ISO8601 timestamps
- Query parameters (includeKpis=true/false)
- Error handling (invalid endpoints, timeouts)

**Run:**
```bash
pnpm exec playwright test dashboard-api.spec.ts -g "API"
```

### 2. Dashboard KPIs Journey (`dashboard-kpis.spec.ts`)

Verifies Dashboard page functionality and user interaction.

**Tests:**
- Page loads without errors
- KPI cards display with health score
- Navigation links to domains visible
- Interactive elements (buttons, links) clickable
- Missing data handled gracefully
- Keyboard navigation (Tab key)
- Portuguese content (pt-BR)
- Accessibility compliance (WCAG AA via axe-core)

**Run:**
```bash
pnpm exec playwright test dashboard-kpis.spec.ts -g "Dashboard"
```

### 3. Studio Page CRUD Journey (`studio-page-crud.spec.ts`)

Verifies Studio editor page and user interactions.

**Tests:**
- Page loads without critical errors
- Editor/canvas interface displays
- Interactive controls present (buttons, inputs)
- Keyboard input handling (Tab, Arrow keys)
- URL consistency through interactions
- Heading structure proper
- Focus management (Tab navigation)
- Viewport responsiveness
- Fallback UI for resource failures
- Accessibility compliance (WCAG AA)

**Run:**
```bash
pnpm exec playwright test studio-page-crud.spec.ts -g "Studio"
```

## Getting Started

### Prerequisites

```bash
# Check Node version (must be >= 22.0.0)
node --version

# Check pnpm (must be >= 9.14.4)
pnpm --version

# If not installed, install dependencies
pnpm install --frozen-lockfile

# Install Playwright browsers
pnpm exec playwright install --with-deps
```

### Local Development Setup

**Terminal 1: Start dev servers**
```bash
pnpm dev:studio      # http://localhost:3000
# In another terminal:
pnpm dev:storybook   # http://localhost:6006
```

**Terminal 2: Run E2E tests**
```bash
# Run all tests
pnpm exec playwright test

# Run in watch mode (re-run on changes)
pnpm exec playwright test --watch

# Run specific test file
pnpm exec playwright test dashboard-api.spec.ts
```

## Running Tests

### All Tests (All Browsers)
```bash
pnpm exec playwright test
```

Expected output:
```
  Passed 99/99 (expected 99)
  Flaky 0/99
  Failed 0/99
  
  4 passed (10s)
```

### Specific Suite
```bash
# Run only Dashboard API tests
pnpm exec playwright test dashboard-api.spec.ts

# Run only Dashboard KPIs
pnpm exec playwright test dashboard-kpis.spec.ts

# Run only Studio CRUD
pnpm exec playwright test studio-page-crud.spec.ts
```

### Specific Test
```bash
# Find test by name pattern
pnpm exec playwright test -g "should load dashboard"

# Run test matching pattern
pnpm exec playwright test -g "accessibility"
```

### Single Browser
```bash
# Run only Chromium
pnpm exec playwright test --project=chromium

# Run only Firefox
pnpm exec playwright test --project=firefox

# Run only WebKit
pnpm exec playwright test --project=webkit
```

## Debugging

### Debug Mode (Pause and Inspect)
```bash
pnpm exec playwright test --debug
```

This opens Playwright Inspector where you can:
- Pause execution
- Step through code
- Inspect elements
- See network requests
- Check console messages

### Visual UI Mode
```bash
pnpm exec playwright test --ui
```

Launches interactive test runner with:
- Visual timeline
- Element highlighting
- Test filtering
- Trace viewer

### View Traces
```bash
# Open last trace
pnpm exec playwright show-trace test-results/@latest

# Check specific browser trace
pnpm exec playwright show-trace test-results/studio-page-crud-chromium-retry1/trace.zip
```

### Screenshots on Demand
```typescript
// In your test
await page.screenshot({ path: 'debug-screenshot.png' });
```

Screenshots stored in: `test-results/` or `tests/e2e/screenshots/`

### Network Inspection
```typescript
// Monitor API calls
page.on('response', response => {
  console.log(`${response.status()} ${response.url()}`);
});

// Block specific resources
await page.route('**/api/**', route => {
  console.log('Request:', route.request().url());
  route.continue();
});
```

## Interpreting Results

### Test Output
```bash
✅ Dashboard - KPIs Journey
  ✅ should load dashboard page without errors
  ✅ should display KPI summary cards with health score
  ...

Passed: 33/33
Failed: 0/33
Duration: 2.5s
```

### HTML Report
```bash
# Generate report
pnpm exec playwright test

# View report
pnpm exec playwright show-report
```

Opens interactive HTML report with:
- Test timeline
- Failure details
- Screenshots/videos on failure
- Trace playback
- Browser details

### Artifacts on Failure

When tests fail, captured artifacts include:

- **Screenshots**: `tests/e2e/screenshots/`
- **Videos**: `tests/e2e/videos/`
- **Traces**: `tests/e2e/traces/`
- **HTML Report**: `playwright-report/index.html`

Example structure:
```
tests/e2e/
├── screenshots/
│   └── dashboard-kpis-chromium-1.png
├── videos/
│   └── dashboard-kpis-chromium-1.webm
├── traces/
│   └── dashboard-api-firefox-retry1-trace.zip
```

## Accessibility Testing (WCAG AA)

All test suites include accessibility checks via axe-core:

```typescript
test('should pass axe accessibility checks', async ({ page }) => {
  // Automatically runs when page is injected
  await checkA11y(page);  // WCAG AA violations fail test
});
```

### Accessibility Failure Severity

- **Critical**: Test FAILS (e.g., no alt text on images)
- **Serious**: Test FAILS (e.g., low contrast text)
- **Moderate**: Test WARNS (e.g., duplicate IDs)
- **Minor**: Test WARNS (e.g., empty heading)

### Running Accessibility Checks Only
```bash
pnpm exec playwright test -g "accessibility"
```

## CI/CD Integration

### GitHub Actions Workflow

Tests run automatically on:
- Push to `main` branch
- Push to `feature/*` branches
- Pull requests to `main`

**Workflow file:** `.github/workflows/sprint-2-validation.yml`

**Job:** `e2e-tests`
- Timeout: 10 minutes
- Workers: 2 (optimized for CI)
- Retries: 2 (on flaky tests only)
- Artifacts: 7 days retention

### View Results

1. Go to Pull Request → **Checks** tab
2. Click **E2E Tests & Accessibility Checks**
3. View logs, artifacts, test reports

### Artifact Download

```bash
# Download from GitHub Actions
# PR → Checks → E2E Tests → Artifacts → Download

# Contains:
# - playwright-report/ (HTML report)
# - test-results/ (JSON results)
# - tests/e2e/screenshots/ (failure images)
# - tests/e2e/videos/ (failure recordings)
# - tests/e2e/traces/ (debug traces)
```

## Troubleshooting

### Tests Timeout

**Problem:** Tests exceed 30-second timeout

**Solution:**
```bash
# Increase timeout temporarily
PLAYWRIGHT_TEST_TIMEOUT=60000 pnpm exec playwright test

# Or edit playwright.config.ts
timeout: 60_000  // 60 seconds
```

### Browser Crashes

**Problem:** "Browser crashed unexpectedly"

**Solution:**
```bash
# Reinstall browsers
pnpm exec playwright install --with-deps

# Clear cache
rm -rf ~/.cache/ms-playwright/
```

### Port Already in Use

**Problem:** "EADDRINUSE: address already in use :::3000"

**Solution:**
```bash
# Kill process on port 3000
lsof -i :3000 | grep LISTEN | awk '{print $2}' | xargs kill -9

# Or use different port
PORT=3001 pnpm dev:studio
```

### Selector Not Found

**Problem:** "locator did not resolve to any elements"

**Solution:**
```bash
# Use debug mode to inspect DOM
pnpm exec playwright test --debug

# Then in Inspector:
# - Use locator picker tool
# - Inspect actual page structure
# - Update selector in test
```

### Tests Fail Locally But Pass in CI

**Problem:** Flaky tests or environment-specific issues

**Solution:**
```bash
# Run with retries like CI does
pnpm exec playwright test --retries=2

# Increase timeouts
pnpm exec playwright test --timeout=60000

# Run in UI mode to see what's happening
pnpm exec playwright test --ui
```

## Performance Targets

| Metric | Target | Status |
|--------|--------|--------|
| Total runtime | <5 min | ✅ |
| Per test | <30 sec | ✅ |
| API responses | <1 sec | ✅ |
| Page loads | <3 sec | ✅ |

## Best Practices

1. **Test User Journeys**: Test realistic workflows, not implementation details
2. **Use Realistic Selectors**: Prefer text content over `data-testid`
3. **Include Accessibility**: Always verify WCAG AA compliance
4. **Keep Tests Independent**: No shared state between tests
5. **Fast Iterations**: Use UI mode or specific tests during development
6. **Monitor Performance**: Track test execution times
7. **Handle Flakiness**: Use retries for CI, investigate local flakiness

## Related Documentation

- **E2E Test Reference:** `tests/e2e/README.md`
- **Sprint 6 Spec:** `specs/005-sprint6-execution/spec.md`
- **Playwright Docs:** https://playwright.dev
- **axe-core Guide:** https://github.com/dequelabs/axe-core
- **CI Configuration:** `.github/workflows/sprint-2-validation.yml`

## Questions?

See `.github/copilot-instructions.md` for Sprint 6 context and team guidelines, or check `tests/e2e/README.md` for detailed reference documentation.
