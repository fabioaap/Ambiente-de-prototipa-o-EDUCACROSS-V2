# Journey: Dashboard (BackOffice)

**Domain**: BackOffice  
**Status**: ✅ Active  
**Created**: 2025-11-29  
**Last Updated**: 2025-11-29

---

## Overview

The Dashboard journey provides a comprehensive overview of the EDUCACROSS platform's health and status. It aggregates metrics, health indicators, page statistics, and system observability into a single, accessible interface for administrators, developers, and product managers.

### Purpose

- **Monitoring**: Track system health, build status, and dependency status in real-time
- **Management**: View and manage prototyped pages across all domains
- **Observability**: Access structured telemetry and hydration resilience metrics
- **Decision Making**: Data-driven insights for sprint planning and technical debt prioritization

---

## User Flows

### Primary Flow: View Dashboard Overview

**Actor**: Administrator / Product Manager / Developer  
**Goal**: Check overall platform health and recent activity

**Steps**:
1. Navigate to `/dashboard` (Studio app)
2. View KPI summary cards (pages created, domains, components, success rate)
3. Check health indicators section (build, lint, type-check, dependencies)
4. Review pages table (all prototyped pages with status and metadata)
5. Use search/filter to find specific pages
6. Click page row to navigate to editor

**Success Criteria**:
- Dashboard loads within 2 seconds (normal network)
- All KPI cards display current data
- Health status reflects latest CI/CD run
- Pages table shows accurate metadata
- No hydration warnings in console

---

## Studio Routes

### Dashboard Page

**URL**: `/dashboard`  
**Component**: `domains/studio/src/app/dashboard/page.tsx`  
**Layout**: Uses Studio root layout with navigation

**Features**:
- **KPI Grid**: 4 cards showing key metrics with trend indicators
- **Health Section**: System health score with breakdowns
- **Pages Table**: Filterable/searchable list of all pages
- **Responsive Design**: Works on desktop and tablet

**Data Sources**:
- `/api/dashboard/summary` - KPI metrics and page list
- `/api/dashboard/health` - System health indicators
- `/api/dashboard/pages` - Detailed page metadata (optional)

---

## Hydration Resilience

**Added**: 2025-11-29 (Feature: Dashboard Hydration Resilience)

### Problem Addressed

React hydration warnings occurred when browser extensions (Fusion, DarkReader, etc.) injected classes or attributes into the `<html>` element, causing mismatches between server-rendered and client-rendered markup.

### Solution Implemented

1. **Root Attribute Normalization**
   - `normalizeRootAttributes()` helper ensures deterministic `<html>` attributes
   - Strips extension-injected tokens (fusion, darkreader, etc.)
   - Maintains canonical class list: `bg-neutral-950 text-neutral-50`
   - Sets fixed `lang="pt-BR"` and `data-theme="dark"`

2. **Hydration Warning Suppression**
   - `suppressHydrationWarning` added to `<html>` element only
   - Allows extensions to mutate root without triggering false positives
   - Maintains hydration validation for deeper component tree

3. **Structured Telemetry**
   - `HydrationErrorObserver` component captures hydration mismatches
   - Logs `HydrationSnapshot` with correlation IDs
   - Derives extension fingerprints for incident grouping
   - Enables debugging without blocking QA workflows

4. **Automated Regression Testing**
   - `pnpm test:dashboard-hydration` runs 4 scenarios
   - Validates clean console across extension/network combinations
   - CI integration prevents hydration regressions

### Benefits

- ✅ Dashboard loads cleanly with Fusion or other extensions enabled
- ✅ QA can test without disabling security extensions
- ✅ Observability team can track hydration incidents by fingerprint
- ✅ Automated tests catch future regressions early

**Documentation**:
- Spec: `specs/001-dashboard-hydration/spec.md`
- QA Guide: `docs/qa-dashboard-testing.md` (Scenario 8)
- Telemetry: `SPRINT3_HEALTH_INDICATORS_REPORT.md` (Observability Chapter)

---

## Components Used

### From Design System (`@prototipo/design-system`)

- `Badge` - Status indicators (success, warning, failure)
- `Button` - Action buttons
- `Card` - KPI and health containers
- `Input` - Search field
- `Progress` - Health score bar
- `Select` - Domain filter dropdown
- `Skeleton` - Loading placeholders
- `Table` - Pages list

### Custom Components

- `ErrorBanner` - Error state display
- `HydrationErrorObserver` - Telemetry capture (invisible)

### Icons (`lucide-react`)

- `Activity`, `AlertCircle`, `CheckCircle2`, `RefreshCw` (health)
- `File`, `FileCode`, `FileText`, `FileQuestion` (page types)
- `Building2`, `GraduationCap`, `Gamepad2` (domain icons)
- `Search`, `Eye`, `Pencil` (actions)

---

## API Contracts

### GET /api/dashboard/summary

**Response**:
```json
{
  "success": true,
  "data": {
    "kpis": {
      "totalPages": 12,
      "totalDomains": 3,
      "totalComponents": 45,
      "successRate": 92,
      "trends": {
        "pages": "up",
        "domains": "stable",
        "components": "up",
        "successRate": "stable"
      }
    },
    "health": {
      "healthStatus": "excellent",
      "buildStatus": "success",
      "lintStatus": "success",
      "typeCheckStatus": "success",
      "dependenciesHealth": "healthy",
      "healthScore": 95,
      "lastChecked": "2025-11-29T21:00:00.000Z"
    },
    "pages": [
      {
        "id": "home",
        "title": "Home",
        "domain": "FrontOffice",
        "status": "published",
        "lastModified": "2025-11-28T10:30:00.000Z",
        "path": "/home"
      }
    ]
  },
  "timestamp": "2025-11-29T21:30:00.000Z"
}
```

### GET /api/dashboard/health

**Response**:
```json
{
  "success": true,
  "data": {
    "buildStatus": "success",
    "lintStatus": "success",
    "typeCheckStatus": "success",
    "dependenciesHealth": "healthy",
    "healthScore": 95,
    "lastChecked": "2025-11-29T21:00:00.000Z"
  },
  "timestamp": "2025-11-29T21:30:00.000Z"
}
```

---

## Testing

### Manual QA

Follow QA guide: `docs/qa-dashboard-testing.md`

**Key Scenarios**:
1. First access (clean load)
2. With browser extensions enabled (Fusion, DarkReader)
3. Slow 3G network throttling
4. Combined extension + slow network (stress test)

**Acceptance**:
- Zero hydration warnings in all scenarios
- Dashboard fully interactive within 2s (normal) / 10s (slow-3g)
- All data populates correctly
- Search and filters work

### Automated Tests

```bash
# Dashboard hydration regression suite
pnpm test:dashboard-hydration

# Full Studio test suite
pnpm --filter studio test
```

**Coverage**:
- ✅ Hydration resilience (4 scenarios)
- ✅ Normalization helper (unit tests)
- ✅ Extension fingerprinting (unit tests)
- ⏳ Dashboard page rendering (TODO: add integration tests)

---

## Observability

### Telemetry Logs

**Development Mode**: Console output enabled by default

```
[Dashboard Logger] 2025-11-29T21:27:00.000Z [INFO] Dashboard loaded successfully
```

**Production Mode**: Structured JSON logs (future: file system or external service)

```json
{
  "timestamp": "2025-11-29T21:27:15.000Z",
  "level": "warn",
  "message": "Hydration mismatch detected on /dashboard",
  "data": {
    "type": "hydration_snapshot",
    "route": "/dashboard",
    "correlationId": "550e8400-e29b-41d4-a716-446655440000",
    "extensionFingerprint": "fusion-extension-loaded",
    "serverAttributes": {...},
    "clientAttributes": {...},
    "severity": "warn"
  }
}
```

### Metrics to Track

- Dashboard load time (P50, P95, P99)
- Hydration mismatch rate (per 1000 page loads)
- Extension fingerprint distribution
- Health score trends (daily/weekly)
- API response times (`/api/dashboard/*`)

---

## Known Issues & Limitations

### Current State

- ✅ Hydration resilience implemented and tested
- ✅ Mock data for health indicators (real CI/CD integration pending)
- ✅ Client-side data fetching with SWR
- ⏳ No pagination on pages table (OK for <100 pages)
- ⏳ No real-time updates (refresh required)

### Future Enhancements

- [ ] Real-time health monitoring with WebSockets
- [ ] Historical trend charts (health score over time)
- [ ] Export dashboard data to CSV/PDF
- [ ] Custom KPI widgets (configurable by user)
- [ ] Integration with GitHub API for real build status
- [ ] Alerts when health score drops below threshold

---

## Related Journeys

- **Revisão de Questões** (`BackOffice/journeys/revisao-questoes`)
- **Banco de Questões** (`BackOffice/journeys/banco-questoes`)
- **Studio Editor** (navigation target from pages table)

---

## Changelog

### 2025-11-29 - Dashboard Hydration Resilience
- Added root attribute normalization
- Implemented hydration error observer with telemetry
- Created automated regression test suite
- Updated QA documentation with hydration scenarios
- Added observability chapter to health indicators report

### 2025-11-24 - Health Indicators Integration
- Implemented `/api/health` and `/api/dashboard/summary` endpoints
- Added health metrics library with score calculation
- Integrated health section into dashboard UI
- Added mock data for CI/CD indicators

### 2025-11-20 - Initial Dashboard
- Created dashboard page with KPI cards
- Implemented pages table with domain filter
- Added SWR for client-side data fetching

---

**Maintainer**: Platform Team  
**Stakeholders**: Product Managers, QA Team, Developers  
**Support**: For issues or questions, create GitHub issue with `dashboard` label
