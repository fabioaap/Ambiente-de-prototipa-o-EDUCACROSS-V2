# Sprint 6 Execution — Quick Start Guide

**Updated:** 2025-12-04  
**Sprint:** Sprint 6 (2025-12-09 to 2025-12-20)  
**Target:** Developers joining Sprint 6 execution  

---

## Prerequisites

### Required Tools
- **Node.js:** 22.21.1 (enforced via `.nvmrc`)
- **pnpm:** 9.14.4+ (workspaces support)
- **Git:** Latest version
- **VS Code:** Latest (recommended IDE)

### Verify Installation
```bash
node --version  # Should output v22.21.1
pnpm --version  # Should output 9.14.4 or higher
git --version   # Any recent version
```

### Install Node via nvm (if needed)
```bash
nvm install 22.21.1
nvm use 22.21.1
```

---

## Initial Setup (First Time)

### 1. Clone Repository
```bash
git clone https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2.git
cd Ambiente-de-prototipa-o-EDUCACROSS-V2
```

### 2. Install Dependencies
```bash
pnpm install --frozen-lockfile
```
**Time:** ~2-3 minutes  
**Output:** Dependencies installed in `node_modules/`

### 3. Build All Packages (Critical Order)
```bash
# Step 1: Generate design tokens
pnpm build:tokens

# Step 2: Build design system
pnpm build:design-system

# Step 3: Build applications
pnpm build
```
**Time:** ~4-5 minutes total  
**Output:** Compiled packages in `dist/` directories

---

## Daily Development Workflow

### 1. Pull Latest Changes
```bash
git checkout main
git pull origin main
```

### 2. Create Feature Branch
```bash
# Sprint 6 branch naming: feature/sprint6-{item-name}
git checkout -b feature/sprint6-ci-fix        # Example for P1-001
git checkout -b feature/sprint6-progress      # Example for P2-S3-001
```

### 3. Start Development Servers

**Option A: Studio + Dashboard**
```bash
pnpm dev:studio
```
- Opens: http://localhost:3000
- Includes: Dashboard (http://localhost:3000/dashboard)
- Auto-reload: Yes

**Option B: Storybook**
```bash
pnpm dev:storybook
```
- Opens: http://localhost:6006
- Includes: All Design System component stories
- Auto-reload: Yes

**Option C: Both (Parallel)**
```bash
# Terminal 1
pnpm dev:studio

# Terminal 2
pnpm dev:storybook
```

### 4. Make Changes
- Edit files in `packages/`, `apps/`, or `domains/`
- See changes live in dev servers
- No manual restart needed (HMR active)

---

## Quality Gates (Run Before PR)

### 1. Lint Check
```bash
pnpm lint
```
**Expected:** 0 errors, 0 warnings  
**Fix:** Run `pnpm lint:fix` for auto-fixes

### 2. Type Check
```bash
pnpm -r type-check
```
**Expected:** 0 errors  
**Sprint 6 Target:** Eliminate 22 warnings (P1-002)

### 3. Unit Tests
```bash
pnpm test
```
**Expected:** 76/76 tests passing (100%)  
**Sprint 6 Target:** Fix 2 failing tests (P1-003)

### 4. Build Validation
```bash
pnpm build
```
**Expected:** All packages build successfully  
**Time:** ~4-5 minutes

---

## Sprint 6 Specific Setup

### Phase 1: Critical Fixes (P1)

#### P1-001: CI/CD Fix
```bash
# No local setup needed
# Validate by triggering workflow:
git push origin feature/sprint6-ci-fix
# Check: https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/actions
```

#### P1-002: TypeScript Type Safety
```bash
# Find warnings:
pnpm -r type-check 2>&1 | grep "error TS"

# Fix iteratively:
# 1. Edit files to resolve type errors
# 2. Re-run: pnpm -r type-check
# 3. Repeat until 0 warnings
```

#### P1-003: Unit Test Fixes
```bash
# Run tests with verbose output:
pnpm test -- --reporter=verbose

# Fix failing tests:
# 1. Identify failing test file
# 2. Run single file: pnpm test -- path/to/file.test.ts
# 3. Debug and fix
```

---

### Phase 2: Production Readiness (P2)

#### P2-001: E2E Test Suite
```bash
# Install Playwright browsers (one-time):
pnpm exec playwright install chromium firefox webkit

# Run E2E tests:
pnpm test:e2e

# Run single browser:
pnpm test:e2e --project=chromium

# Debug mode:
pnpm test:e2e --debug
```

#### P2-002: Monitoring Setup (Sentry)
```bash
# Install Sentry SDK:
pnpm add @sentry/nextjs

# Initialize (interactive wizard):
npx @sentry/wizard@latest -i nextjs

# Set environment variables:
echo "NEXT_PUBLIC_SENTRY_DSN=your_dsn_here" >> .env.local
echo "SENTRY_AUTH_TOKEN=your_token_here" >> .env.local

# Test error tracking:
# 1. Start dev server: pnpm dev:studio
# 2. Visit: http://localhost:3000/test-error
# 3. Check Sentry dashboard
```

#### P2-003: Analytics Integration (GA4)
```bash
# Install analytics SDK:
pnpm add @next/third-parties

# Set environment variable:
echo "NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX" >> .env.local

# Test tracking:
# 1. Start dev server: pnpm dev:studio
# 2. Visit pages and trigger events
# 3. Check GA4 Real-Time dashboard
```

#### P2-S3-001/002: Progress & Leaderboard Components
```bash
# Create component files:
mkdir -p packages/design-system/src/components/Progress
touch packages/design-system/src/components/Progress/Progress.tsx
touch packages/design-system/src/components/Progress/Progress.module.css

# Rebuild design system:
pnpm build:design-system

# Create Storybook story:
mkdir -p domains/storybook/src/stories/Progress
touch domains/storybook/src/stories/Progress/Progress.stories.tsx

# View in Storybook:
pnpm dev:storybook
# Navigate to: http://localhost:6006/?path=/story/progress--default
```

---

### Phase 3: Journeys (P2-S3-004/005/006)

#### Create New Journey
```bash
# Example: BackOffice Admin Workflow
mkdir -p domains/BackOffice/journeys/admin-workflow
cd domains/BackOffice/journeys/admin-workflow

# Create README from template:
cp ../../../docs/templates/journey-template.md README.md

# Create journey screens:
touch tela-1-login.tsx
touch tela-2-dashboard.tsx
touch tela-3-perfil.tsx

# Develop screens:
pnpm dev:studio
# Pages will be available at Studio routes
```

---

## Common Tasks

### Add New Design System Component
```bash
# 1. Create component directory
mkdir -p packages/design-system/src/components/NewComponent

# 2. Create files
touch packages/design-system/src/components/NewComponent/NewComponent.tsx
touch packages/design-system/src/components/NewComponent/NewComponent.module.css

# 3. Export from index
echo "export { NewComponent } from './components/NewComponent/NewComponent';" >> packages/design-system/src/index.ts

# 4. Rebuild
pnpm build:design-system

# 5. Create Storybook story
mkdir -p domains/storybook/src/stories/NewComponent
touch domains/storybook/src/stories/NewComponent/NewComponent.stories.tsx

# 6. Register in Puck (if needed)
# Edit: apps/studio/src/config/puck.config.tsx
```

### Update Design Tokens
```bash
# 1. Edit tokens file
code packages/tokens/src/tokens.json

# 2. Rebuild tokens
pnpm build:tokens

# 3. Rebuild design system (consumes new tokens)
pnpm build:design-system

# 4. Restart dev servers
pnpm dev:studio    # In Terminal 1
pnpm dev:storybook # In Terminal 2
```

### Export/Import Data (CSV/JSON/XML)
```bash
# ✅ IMPLEMENTED in Phase 10 (P2-005)
# Multi-format export/import with schema validation

# EXPORT from Dashboard:
# Option 1: Via UI
# 1. Visit: http://localhost:3000/dashboard
# 2. Navigate to Export section
# 3. Select format from dropdown: JSON, CSV, or XML
# 4. Click "Download as [FORMAT]"
# 5. File downloads with timestamp: pages-export-2025-12-04.[format]

# Option 2: Direct API call
curl -o export.json "http://localhost:3000/api/dashboard/pages/export?format=json"
curl -o export.csv "http://localhost:3000/api/dashboard/pages/export?format=csv"
curl -o export.xml "http://localhost:3000/api/dashboard/pages/export?format=xml"

# IMPORT to Dashboard:
# Option 1: Via UI
# 1. Visit: http://localhost:3000/dashboard
# 2. Navigate to Import section
# 3. Select mode: "Merge" (keep existing) or "Replace" (delete all first)
# 4. Choose file (any format: .json, .csv, .xml)
# 5. Click "Upload" - format auto-detected from extension
# 6. Review validation results and confirm

# Option 2: Direct API call
curl -X POST "http://localhost:3000/api/dashboard/pages/import" \
  -F "file=@pages-export-2025-12-04.json"

# VALIDATION RULES:
# - All formats: Required fields (id, title, slug, status, owner, createdAt, updatedAt)
# - Status enum: Must be "published", "draft", or "archived"
# - Dates: Must be valid ISO 8601 format (e.g., "2024-01-01T00:00:00.000Z")
# - CSV: Headers must match exactly (ID, Title, Slug, Status, Owner, Created At, Updated At)
# - JSON: Schema validated (exportedAt, totalPages, pages array)
# - XML: Valid XML structure with <export>, <metadata>, <pages> tags

# ERROR HANDLING:
# - Line-level errors: "Row 3: Invalid status 'pending'"
# - Field-level errors: "Row 5: Missing required field 'title'"
# - Format errors: "Invalid CSV: expected 7 columns, got 5"
# - All errors returned with HTTP 400 and details in response body
```

---

## Troubleshooting

### Issue: Build Fails with "Cannot find module"
**Cause:** Dependencies not installed or build order incorrect  
**Solution:**
```bash
pnpm install --frozen-lockfile
pnpm build:tokens
pnpm build:design-system
pnpm build
```

### Issue: Dev Server Port Already in Use
**Cause:** Stray Node process from previous session  
**Solution:**
```bash
# Find process on port 3000 (Studio):
lsof -ti:3000 | xargs kill -9

# Find process on port 6006 (Storybook):
lsof -ti:6006 | xargs kill -9
```

### Issue: TypeScript Errors in IDE but Build Passes
**Cause:** IDE using wrong TypeScript version  
**Solution:**
```bash
# In VS Code:
# 1. Press Cmd+Shift+P (Mac) or Ctrl+Shift+P (Windows)
# 2. Type: "TypeScript: Select TypeScript Version"
# 3. Choose: "Use Workspace Version"
```

### Issue: Storybook Stories Not Appearing
**Cause:** Story file not in correct directory or not exported  
**Solution:**
```bash
# Check story file location:
# Should be: domains/storybook/src/stories/{ComponentName}/{ComponentName}.stories.tsx

# Verify export:
# File must have: export default { ... } and export const Default = { ... }

# Restart Storybook:
# Ctrl+C in terminal, then: pnpm dev:storybook
```

### Issue: Tests Fail with "Cannot read property of undefined"
**Cause:** Mock data not set up or async timing issue  
**Solution:**
```bash
# Add debug output:
# In test file, add: console.log(variableName);

# Run single test with verbose:
pnpm test -- path/to/file.test.ts --reporter=verbose

# Check test setup (beforeEach, beforeAll)
```

---

## VS Code Extensions (Recommended)

Install these extensions for optimal developer experience:

1. **ESLint** (dbaeumer.vscode-eslint)
   - Auto-fixes lint errors on save

2. **Prettier** (esbenp.prettier-vscode)
   - Code formatting

3. **TypeScript** (built-in)
   - Already included, just use workspace version

4. **Playwright Test** (ms-playwright.playwright)
   - Run E2E tests from editor

5. **Storybook** (chromatic.storybook)
   - Preview stories in VS Code

Install via:
```bash
# Open VS Code
# Press Cmd+Shift+X (Mac) or Ctrl+Shift+X (Windows)
# Search for extension name and click "Install"
```

---

## Git Workflow

### Commit Message Format
```
type(scope): description (#issue)

Examples:
feat(dashboard): add health metrics endpoint (#55)
fix(tests): resolve flaky leaderboard test (#P1-003)
docs(sprint6): update quickstart guide
chore(deps): update @radix-ui to v1.2.0
```

**Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`  
**Scopes:** Component/feature name (lowercase)

### Creating Pull Request
```bash
# 1. Push feature branch
git push origin feature/sprint6-{item-name}

# 2. Create PR via GitHub CLI
gh pr create \
  --title "feat(scope): description" \
  --body "Closes #{issue}

## Changes
- Change 1
- Change 2

## Testing
- Tested locally
- All quality gates passing" \
  --base main

# 3. Post /spec comment (SpecKit validation)
# GitHub Action will run and post results
```

### Code Review Checklist
Before requesting review, ensure:
- [ ] `pnpm lint` passes
- [ ] `pnpm -r type-check` passes
- [ ] `pnpm test` passes
- [ ] `pnpm build` passes
- [ ] Documentation updated (README, journey docs)
- [ ] Storybook stories added (if new component)
- [ ] Manual testing complete (screenshot attached)

---

## Sprint 6 Timeline Reference

| Week | Dates | Phase | Focus |
|------|-------|-------|-------|
| Pre-Sprint | 04/12 - 08/12 | Phase 0 | Preparation, spec creation |
| Week 1 | 09/12 - 13/12 | Phase 1 | P1 items (CI/CD, types, tests) |
| Week 2 | 16/12 - 20/12 | Phases 2-3 | P2 items (features, journeys) |
| Week 3 (optional) | 23/12 - 27/12 | Phase 4 | P3 items (polish, enhancements) |

**Kickoff Meeting:** 09/12/2025 @ 09:00  
**Daily Standups:** Every day @ 09:30 (15 minutes)  
**Sprint Retrospective:** 20/12/2025 @ 14:00  

---

## Testing Monitoring & Error Tracking (Phase 7)

### Sentry Error Monitoring Setup

#### 1. Environment Configuration
Create `.env.local` in `domains/studio/`:
```bash
# Sentry Configuration
SENTRY_DSN=https://your-key@sentry.io/your-project-id
SENTRY_ENVIRONMENT=development
SENTRY_RELEASE=1.0.0

# Optional: For source map uploads in CI/CD
SENTRY_ORG=your-org
SENTRY_PROJECT=your-project
SENTRY_AUTH_TOKEN=your-auth-token
```

#### 2. Testing Error Capture
```bash
# 1. Start Studio dev server
pnpm dev:studio

# 2. Open Studio at http://localhost:3000
# 3. Check browser console for Sentry initialization log
# 4. Trigger test error:
#    - Console: `window.__SENTRY__?.captureException(new Error('Test error'))`
#    - Or throw error in a component

# 5. View in Sentry dashboard
# https://sentry.io/organizations/your-org/issues/
```

#### 3. Verify Error Capture
- [ ] Error appears in Sentry dashboard within 5 seconds
- [ ] Error includes source map (filename, line number, function)
- [ ] Stack trace is readable
- [ ] Breadcrumbs show user actions before error

#### 4. Error Types Tracked
- **React Errors:** ErrorBoundary captures component crashes
- **Unhandled Exceptions:** Try/catch errors + rejected promises
- **API Errors:** Dashboard and Studio API calls
- **Ignored Errors:** Browser extensions, timeouts, AbortError

#### 5. Dashboard Monitoring
- Navigate to `/dashboard` after error occurs
- Check for error indicator (if implemented)
- Verify error count displayed

### E2E Test Execution
```bash
# Run full E2E test suite
pnpm test:e2e

# Run specific test suite
pnpm test:e2e dashboard-api
pnpm test:e2e dashboard-kpis
pnpm test:e2e studio-page-crud

# View test results
# Open: playwright/results/index.html in browser
```

### CI/CD Validation
- GitHub Actions runs all quality gates: lint, type-check, tests, build
- E2E tests run in CI (Chrome, Firefox, Safari)
- Artifacts uploaded if any test fails
- Check `.github/workflows/sprint-2-validation.yml` for details

---

## Support & Communication

### Channels
- **Slack:** #sprint6 (daily updates, quick questions)
- **GitHub Issues:** Technical discussions, bug reports
- **PR Comments:** Code review feedback
- **Email:** Weekly progress reports

### Escalation
1. **Blocker:** Slack @channel immediately
2. **Question:** Ask in #sprint6 (monitored during work hours)
3. **Bug:** Create GitHub issue with `bug` label
4. **Help:** Pair programming via video call

---

## Additional Resources

- **SPRINT6_ROADMAP.md:** Complete 20-item breakdown
- **SPRINT6_EXECUTION_PLAN.md:** Team allocation, timeline, ceremonies
- **specs/005-sprint6-execution/spec.md:** Full specification with user stories
- **specs/005-sprint6-execution/plan.md:** Technical implementation plan
- **specs/005-sprint6-execution/research.md:** Technology decisions
- **specs/005-sprint6-execution/data-model.md:** Data structures and validation
- **.specify/memory/constitution.md:** Project principles and guidelines

---

**Version:** 1.0.0  
**Last Updated:** 2025-12-04  
**Maintainer:** EDUCACROSS Team  
