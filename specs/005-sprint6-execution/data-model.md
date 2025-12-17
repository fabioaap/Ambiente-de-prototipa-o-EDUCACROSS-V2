# Sprint 6 Execution — Data Model

**Date:** 2025-12-04  
**Purpose:** Define all data structures, entities, and relationships for Sprint 6 deliverables  

---

## Entity Definitions

### 1. Progress Component

**Entity:** `ProgressState`  
**Purpose:** Represents progress visualization state  
**Validation Rules:**
- `value` must be 0-100 (clamped in component)
- `variant` enum: `'linear' | 'circular'`
- `size` enum: `'sm' | 'md' | 'lg'`
- `color` enum: `'primary' | 'success' | 'warning' | 'danger'`

**TypeScript Interface:**
```typescript
export type ProgressVariant = 'linear' | 'circular';
export type ProgressSize = 'sm' | 'md' | 'lg';
export type ProgressColor = 'primary' | 'success' | 'warning' | 'danger';

export interface ProgressProps {
  value: number; // 0-100
  variant?: ProgressVariant;
  size?: ProgressSize;
  color?: ProgressColor;
  animated?: boolean;
  label?: string;
  className?: string;
}
```

**Relationships:**
- Used by: Leaderboard component, Game Hub, Dashboard (future)
- Depends on: Tokens (color variables)

---

### 2. Leaderboard Component

**Entity:** `LeaderboardEntry`  
**Purpose:** Represents a single player/entity in ranked list  
**Validation Rules:**
- `rank` must be positive integer (≥1)
- `playerId` must be non-empty string
- `name` must be non-empty string (max 50 chars)
- `score` must be non-negative number
- `progress` must be 0-100
- `avatar` optional URL (validated via URL constructor)

**TypeScript Interface:**
```typescript
export interface LeaderboardEntry {
  rank: number; // 1-based ranking
  playerId: string; // Unique identifier
  name: string; // Display name
  avatar?: string; // Avatar URL (optional)
  score: number; // Player score
  progress: number; // 0-100 completion percentage
  isCurrentUser?: boolean; // Highlight current user
}

export interface LeaderboardProps {
  entries: LeaderboardEntry[];
  maxEntries?: number; // Default 10
  loading?: boolean; // Show skeleton
  emptyMessage?: string; // Default "No players yet"
  onEntryClick?: (playerId: string) => void; // Navigation handler
  className?: string;
}
```

**Relationships:**
- Uses: Progress component (for progress bars), Avatar component (for player icons)
- Used by: FrontOffice Onboarding (tela-4), Game Hub (leaderboard-global)
- Data Source: Mock data (Sprint 6), API endpoint (future)

---

### 3. Health Metrics (Enhanced)

**Entity:** `HealthMetrics`  
**Purpose:** System health indicators for dashboard  
**Validation Rules:**
- Percentages (0-100): `testCoverage`, `codeQualityScore`, `performanceScore`, `uptime`
- Non-negative numbers: `typeErrors`, `lintWarnings`, `technicalDebtHours`, `securityVulnerabilities`, `errorRate`
- ISO 8601 string: `lastDeployment`
- Enum: `buildStatus` = `'passing' | 'failing'`

**TypeScript Interface:**
```typescript
export interface HealthMetrics {
  // Existing (Sprint 3/5)
  buildStatus: 'passing' | 'failing';
  testCoverage: number; // 0-100
  typeErrors: number; // Count
  lintWarnings: number; // Count
  
  // New (Sprint 6 P3-S3-007)
  codeQualityScore: number; // 0-100
  technicalDebtHours: number; // Estimated hours
  performanceScore: number; // 0-100 (Lighthouse)
  securityVulnerabilities: number; // Count
  lastDeployment: string; // ISO 8601
  uptime: number; // 0-100 percentage
  errorRate: number; // Errors per hour
}

export interface HealthMetricsResponse {
  data: HealthMetrics;
  timestamp: string; // ISO 8601
}
```

**Relationships:**
- Endpoint: `GET /api/dashboard/health`
- Used by: Dashboard Health Section component
- Data Source: CI/CD metrics (GitHub Actions), Sentry (errorRate), Local calculations

**State Transitions:**
- `buildStatus`: 'passing' → 'failing' (CI failure) or 'failing' → 'passing' (CI success)
- `errorRate`: Updated every 5 minutes via Sentry webhook (future)

---

### 4. Analytics Events

**Entity:** `AnalyticsEvent`  
**Purpose:** User interaction tracking for product insights  
**Validation Rules:**
- `eventName` must be kebab-case string (e.g., `dashboard-load`)
- `params` object keys must be camelCase
- `timestamp` auto-generated (ISO 8601)

**TypeScript Interface:**
```typescript
export type AnalyticsEventName =
  | 'page_view'
  | 'dashboard_load'
  | 'page_create'
  | 'csv_export'
  | 'journey_complete';

export interface AnalyticsEventParams {
  // Common
  sessionId?: string;
  userId?: string;
  
  // dashboard_load
  kpis_count?: number;
  load_time_ms?: number;
  
  // page_create
  page_type?: string;
  components_count?: number;
  
  // csv_export
  format?: 'csv' | 'json' | 'xml';
  rows_count?: number;
  
  // journey_complete
  journey_name?: string;
  duration_seconds?: number;
}

export interface AnalyticsEvent {
  eventName: AnalyticsEventName;
  params: AnalyticsEventParams;
  timestamp: string; // ISO 8601
}
```

**Relationships:**
- Service: Google Analytics 4 or Mixpanel
- Triggered by: User actions in Dashboard, Studio, Journeys
- Data Flow: Client → GA4/Mixpanel → Analytics Dashboard

---

### 5. E2E Test Results

**Entity:** `E2ETestResult`  
**Purpose:** Capture E2E test execution data for reporting  
**Validation Rules:**
- `status` enum: `'passed' | 'failed' | 'skipped'`
- `duration` in milliseconds (non-negative)
- `browser` enum: `'chromium' | 'firefox' | 'webkit'`

**TypeScript Interface:**
```typescript
export type TestStatus = 'passed' | 'failed' | 'skipped';
export type TestBrowser = 'chromium' | 'firefox' | 'webkit';

export interface E2ETestResult {
  testName: string;
  filePath: string;
  status: TestStatus;
  duration: number; // ms
  browser: TestBrowser;
  screenshot?: string; // Path (if failure)
  video?: string; // Path (if failure)
  error?: string; // Error message
  timestamp: string; // ISO 8601
}

export interface E2ETestSuiteResult {
  totalTests: number;
  passed: number;
  failed: number;
  skipped: number;
  coverage: number; // 0-100 percentage
  duration: number; // Total ms
  results: E2ETestResult[];
}
```

**Relationships:**
- Generated by: Playwright test runner
- Stored in: CI artifacts, local `.playwright/` directory
- Used by: CI reporting, Sprint retrospective metrics

---

### 6. Journey Definition

**Entity:** `JourneyMetadata`  
**Purpose:** Standardized journey documentation structure  
**Validation Rules:**
- `status` enum: `'complete' | 'in-progress' | 'blocked'`
- `objective` max 300 characters
- `components` array must reference existing DS components

**TypeScript Interface:**
```typescript
export type JourneyStatus = 'complete' | 'in-progress' | 'blocked';
export type JourneyPhase = 'design' | 'development' | 'qa';

export interface JourneyMetadata {
  name: string; // Journey title
  path: string; // File system path (e.g., domains/FrontOffice/journeys/onboarding-flow)
  objective: string; // 2-3 sentence description
  status: {
    overall: JourneyStatus;
    design: JourneyStatus;
    development: JourneyStatus;
    qa: JourneyStatus;
  };
  components: string[]; // DS component names
  links: {
    studioPage?: string; // Slug (e.g., /onboarding/welcome)
    storybook?: string; // Story path
    figma?: string; // Figma file URL
    issue?: number; // GitHub issue number
  };
  screenshots: string[]; // Paths to screenshot files
  dependencies: string[]; // Blocking issues/features
  notes: string; // Free-form notes
}
```

**Relationships:**
- Stored in: `README.md` files (YAML frontmatter or JSON)
- Used by: Dashboard journey listing, Documentation site
- Updated by: Developers during journey implementation

---

### 7. CSV/JSON/XML Export Data

**Entity:** `ExportData`  
**Purpose:** Structured data for export in multiple formats  
**Validation Rules:**
- `format` enum: `'csv' | 'json' | 'xml'`
- `data` must be array of objects (homogeneous schema)
- `schema` optional JSON Schema for validation

**TypeScript Interface:**
```typescript
export type ExportFormat = 'csv' | 'json' | 'xml';

export interface ExportOptions {
  format: ExportFormat;
  filename?: string; // Default: timestamp-based
  includeHeaders?: boolean; // CSV only
  pretty?: boolean; // JSON/XML formatting
}

export interface ExportData {
  data: Record<string, any>[]; // Array of objects
  schema?: Record<string, string>; // Field name → type
  metadata?: {
    exportedAt: string; // ISO 8601
    rowCount: number;
    format: ExportFormat;
  };
}

export interface ImportResult {
  success: boolean;
  rowsImported: number;
  errors?: Array<{
    row: number;
    field: string;
    message: string;
  }>;
}
```

**Relationships:**
- Generated by: `lib/export.ts` utility
- Consumed by: `lib/import.ts` utility
- Used by: Backoffice pages list, Dashboard data export
- Validation: JSON Schema (if provided)

---

### 8. Sentry Error Context

**Entity:** `SentryErrorContext`  
**Purpose:** Structured error metadata for Sentry tracking  
**Validation Rules:**
- `level` enum: `'fatal' | 'error' | 'warning' | 'info' | 'debug'`
- `user` optional (PII scrubbed in production)
- `tags` key-value pairs for filtering

**TypeScript Interface:**
```typescript
export type SentryLevel = 'fatal' | 'error' | 'warning' | 'info' | 'debug';

export interface SentryErrorContext {
  level: SentryLevel;
  message: string;
  exception?: Error;
  tags?: Record<string, string>; // e.g., { page: 'dashboard', action: 'load' }
  user?: {
    id?: string;
    email?: string; // Scrubbed in production
    username?: string;
  };
  extra?: Record<string, any>; // Additional context
  breadcrumbs?: Array<{
    timestamp: number;
    message: string;
    category: string;
  }>;
}
```

**Relationships:**
- Sent to: Sentry API
- Triggered by: Error boundaries, API route errors, client-side exceptions
- Aggregated in: Sentry dashboard (https://sentry.io)

---

## Data Flow Diagrams

### Dashboard Health Metrics Flow
```
┌─────────────┐
│ CI/CD       │
│ (GitHub     │
│  Actions)   │
└──────┬──────┘
       │ Webhook
       ▼
┌─────────────────────┐
│ /api/dashboard/     │
│      /health        │
│ (Route Handler)     │
│                     │
│ - Fetches CI status │
│ - Calculates scores │
│ - Returns JSON      │
└──────────┬──────────┘
           │ GET Request (SWR)
           ▼
┌─────────────────────┐
│ Dashboard UI        │
│ (Health Section)    │
│                     │
│ - Displays metrics  │
│ - Color-coded       │
│ - Skeleton loading  │
└─────────────────────┘
```

### Leaderboard Data Flow
```
┌─────────────┐
│ Mock Data   │
│ (JSON file) │
└──────┬──────┘
       │ Import
       ▼
┌─────────────────────┐
│ FrontOffice         │
│ Onboarding (tela-4) │
│ or Game Hub         │
│                     │
│ - Maps to           │
│   LeaderboardEntry[]│
└──────────┬──────────┘
           │ Props
           ▼
┌─────────────────────┐
│ <Leaderboard />     │
│                     │
│ - Renders entries   │
│ - Uses Progress,    │
│   Avatar components │
└─────────────────────┘
```

### Analytics Events Flow
```
┌─────────────────────┐
│ User Action         │
│ (Click, Navigate)   │
└──────────┬──────────┘
           │ Trigger
           ▼
┌─────────────────────┐
│ trackEvent()        │
│ (lib/analytics.ts)  │
│                     │
│ - Validates params  │
│ - Calls gtag()      │
└──────────┬──────────┘
           │ API Call
           ▼
┌─────────────────────┐
│ Google Analytics 4  │
│ or Mixpanel         │
│                     │
│ - Aggregates events │
│ - Real-time dash    │
└─────────────────────┘
```

---

## Validation Rules Summary

### Input Validation
1. **Progress Component:**
   - `value` clamped to 0-100 range
   - `variant/size/color` validated via TypeScript enum
   
2. **Leaderboard:**
   - `rank` must be ≥1
   - `playerId` non-empty string
   - `progress` clamped to 0-100
   - `avatar` URL validated (try/catch URL constructor)

3. **CSV/JSON/XML Import:**
   - Schema validation via JSON Schema (if provided)
   - Row-level error reporting (line number + field name)
   - Type coercion (string → number for numeric fields)

### Output Validation
1. **API Responses:**
   - All responses wrapped in `{ data: T }` structure
   - Timestamps in ISO 8601 format
   - Error responses: `{ error: string, status: number }`

2. **Analytics Events:**
   - Event names kebab-case (enforced via TypeScript literal type)
   - Param keys camelCase (linted via ESLint)
   - No PII in params (email/password scrubbed)

3. **Sentry Errors:**
   - PII scrubbed in production (`beforeSend` hook)
   - Stack traces source-mapped (via Next.js plugin)
   - User context optional (only if authenticated)

---

## Schema Evolution

### Version 1.0.0 (Sprint 6)
- ✅ Progress component props finalized
- ✅ Leaderboard entry structure defined
- ✅ Health metrics extended (8 new fields)
- ✅ Analytics events typed (5 event names)

### Version 1.1.0 (Future - Sprint 7+)
- 🔮 Leaderboard filters (by game, by time period)
- 🔮 Health metrics historical trends (time-series data)
- 🔮 Journey metadata auto-generated from Git history
- 🔮 Real-time leaderboard updates (WebSocket)

### Breaking Changes Policy
- Major version bump required for:
  - Removing required fields
  - Changing field types (string → number)
  - Renaming fields without alias
- Minor version bump for:
  - Adding optional fields
  - Adding new event types
  - Extending enums

---

**Version:** 1.0.0  
**Author:** GitHub Copilot + EDUCACROSS Team  
**Date:** 2025-12-04  
**Status:** Data Model Complete ✅  
**Next:** Generate API contracts in `/contracts/` directory  
