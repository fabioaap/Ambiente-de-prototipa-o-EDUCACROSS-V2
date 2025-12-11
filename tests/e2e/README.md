# E2E Test Suite - Sprint 6

End-to-End (E2E) tests for EDUCACROSS Platform using Playwright.

## Overview

- **Framework:** Playwright 1.57.0
- **Browsers:** Chromium, Firefox, WebKit
- **Accessibility:** axe-core/playwright (WCAG AA compliance)
- **Total Tests:** 33 test cases across 3 suites
- **Target Runtime:** <5 minutes

## Test Suites

### 1. Dashboard API Contracts (`dashboard-api.spec.ts`)

**Purpose:** Verify API endpoints match contract specifications

**Tests (14):**
- ✅ GET /api/dashboard/summary - Status 200
- ✅ Response structure validation (healthScore, kpis, lastUpdated, totalPages)
- ✅ Field type validation (number, array, string)
- ✅ Value range validation (0-100 for scores)
- ✅ ISO8601 timestamp validation
- ✅ Query parameter handling (includeKpis=true/false)
- ✅ Default parameter behavior
- ✅ GET /api/dashboard/health - Status 200
- ✅ Health status enum validation
- ✅ Required fields presence (buildStatus, lintStatus, typeCheckStatus, dependenciesHealth)
- ✅ Endpoint consistency (healthScore across endpoints)
- ✅ Error handling (invalid endpoints, timeouts)

**Run:**
```bash
pnpm exec playwright test dashboard-api.spec.ts
```

### 2. Dashboard - KPIs Journey (`dashboard-kpis.spec.ts`)

**Purpose:** Verify Dashboard page functionality and user journey

**Tests (9):**
- ✅ Page load without errors
- ✅ KPI summary cards with health score display
- ✅ Navigation links to domains
- ✅ Interactive elements (buttons, links)
- ✅ Missing data handling with loading states
- ✅ Keyboard navigation (Tab key)
- ✅ Portuguese content (pt-BR locale)
- ✅ Accessibility violations (axe-core WCAG AA)
- ✅ Basic accessibility (headings, main element)

**Run:**
```bash
pnpm exec playwright test dashboard-kpis.spec.ts
```

### 3. Studio - Page CRUD Journey (`studio-page-crud.spec.ts`)

**Purpose:** Verify Studio editor page functionality and user interactions

**Tests (10):**
- ✅ Page load without critical errors
- ✅ Editor/canvas interface display
- ✅ Interactive controls (buttons, inputs)
- ✅ Keyboard input handling (Tab, Arrow keys)
- ✅ URL consistency through interactions
- ✅ Heading structure validation
- ✅ Focus management (Tab navigation)
- ✅ Viewport responsiveness (resize handling)
- ✅ Fallback UI for resource failures
- ✅ Accessibility violations (axe-core WCAG AA)

**Run:**
```bash
pnpm exec playwright test studio-page-crud.spec.ts
```

## Running Tests

### All Tests
```bash
pnpm exec playwright test
```

### Specific Suite
```bash
pnpm exec playwright test dashboard-api.spec.ts
```

### Specific Test
```bash
pnpm exec playwright test -g "should return 200 status"
```

### Single Browser
```bash
pnpm exec playwright test --project=chromium
```

### Debug Mode
```bash
pnpm exec playwright test --debug
```

### UI Mode (Visual Runner)
```bash
pnpm exec playwright test --ui
```

### Generate Report
```bash
pnpm exec playwright test && pnpm exec playwright show-report
```

## Configuration

**File:** `playwright.config.ts` (workspace root)

- **Timeout:** 30 seconds per test
- **Screenshots:** Captured on failure in `tests/e2e/screenshots/`
- **Videos:** Recorded on failure in `tests/e2e/videos/`
- **Base URL:** `http://localhost:3000` (configurable via `.env`)
- **Parallel:** 4 workers (can be adjusted)

## Accessibility Testing

All test suites include axe-core accessibility checks:

```typescript
import { injectAxe, checkA11y } from 'axe-playwright';

test.beforeEach(async ({ page }) => {
  await injectAxe(page);
});

test('should pass axe accessibility checks', async ({ page }) => {
  await checkA11y(page, null, {
    detailedReport: true
  });
});
```

**Compliance:**
- WCAG AA level
- Critical violations fail tests
- Serious violations are logged
- Minor violations are warnings only

## Environment Setup

### Prerequisites
```bash
# Install dependencies
pnpm install --frozen-lockfile

# Install browsers
pnpm exec playwright install

# Verify Node version
node --version  # >= 22.0.0
```

### Local Development
```bash
# Terminal 1: Start dev servers
pnpm dev:studio      # http://localhost:3000
pnpm dev:storybook   # http://localhost:6006

# Terminal 2: Run E2E tests
pnpm exec playwright test
```

### CI Environment
- Tests run in GitHub Actions (`.github/workflows/sprint-2-validation.yml`)
- Parallel execution with artifact uploads
- Screenshots/videos on failure
- Test reports in GitHub Actions UI

## Debugging

### Browser Developer Tools
```bash
pnpm exec playwright test --debug
```

### Inspect Elements
```typescript
test('debug', async ({ page }) => {
  await page.pause();  // Pauses and opens inspector
});
```

### Screenshot on Demand
```typescript
await page.screenshot({ path: 'debug.png' });
```

### Network Inspection
```typescript
page.on('response', response => {
  console.log('Response:', response.url(), response.status());
});
```

## Test Data

### Mock APIs
- Dashboard APIs: `/api/dashboard/summary` (mock JSON)
- Health API: `/api/dashboard/health` (mock JSON)
- Studio: Uses Puck editor with default config

### Test Users
- No authentication required (public pages)
- Tests use default mock data from API route handlers

## Performance Targets

| Metric | Target | Status |
|--------|--------|--------|
| Total Runtime | <5 min | ✅ |
| Per Test | <30 sec | ✅ |
| API Responses | <1 sec | ✅ |
| Page Loads | <3 sec | ✅ |

## Continuous Integration

### GitHub Actions
```yaml
# Run in .github/workflows/sprint-2-validation.yml
- name: Run E2E tests
  run: pnpm exec playwright test --reporter=html
  
- name: Upload artifacts
  uses: actions/upload-artifact@v4
  if: always()
  with:
    name: playwright-report
    path: playwright-report/
```

### Test Reports
- HTML report: `playwright-report/index.html`
- JSON results: `test-results/results.json`
- Screenshots: `tests/e2e/screenshots/`

## Troubleshooting

### Tests Timeout
```bash
# Increase timeout in playwright.config.ts
timeout: 60000  // 60 seconds
```

### Browser Crashes
```bash
# Reinstall browsers
pnpm exec playwright install --with-deps
```

### Port Already in Use
```bash
# Kill process using port 3000
lsof -i :3000 | grep LISTEN | awk '{print $2}' | xargs kill -9

# Or use different port
PORT=3001 pnpm dev:studio
```

### Selector Issues
```bash
# Use Playwright Inspector to find selectors
pnpm exec playwright test --debug
# Then use inspector to locate elements
```

## Best Practices

1. **Use Realistic Selectors**
   - Prefer text content over `data-testid`
   - Use semantic HTML selectors (main, nav, button)
   - Avoid brittle index-based selectors

2. **Test User Journeys**
   - Test actual workflows, not implementation details
   - Verify accessibility alongside functionality
   - Test error states and fallbacks

3. **Keep Tests Independent**
   - Each test should be runnable standalone
   - Use beforeEach for common setup
   - Clean up state after tests (if needed)

4. **Accessibility First**
   - Always include axe-core checks
   - Test keyboard navigation
   - Verify semantic HTML structure

5. **Monitor Performance**
   - Track test execution times
   - Optimize slow tests
   - Use parallel execution

## Related Documentation

- **Sprint 6 Spec:** `specs/005-sprint6-execution/spec.md`
- **Tasks:** `specs/005-sprint6-execution/tasks.md`
- **Playwright Docs:** https://playwright.dev
- **axe-core:** https://github.com/dequelabs/axe-core

## Contributing

When adding new tests:

1. Follow existing test structure and naming
2. Include accessibility checks (axe-core)
3. Document test purpose in comments
4. Test realistic user journeys
5. Keep test runtime under 30 seconds
6. Add to appropriate suite or create new suite if needed

## Questions?

See `.github/copilot-instructions.md` for Sprint 6 context and team guidelines.
