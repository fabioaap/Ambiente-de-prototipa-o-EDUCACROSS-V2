# Data Model – Dashboard Hydration Resilience

## HydrationSnapshot
- **Purpose**: Capture attribute mismatches detected by React hydration for `/dashboard` (and other Studio dashboards as extended later).
- **Fields**:
  - `route: '/dashboard' | string` – Route where mismatch occurred (allow future reuse).
  - `serverAttributes: Record<string, string>` – Attributes captured from the server-rendered `<html>` element.
  - `clientAttributes: Record<string, string>` – Attributes observed post-extension/client mutation.
  - `extensionFingerprint?: string` – Optional concatenation of attribute differences (e.g., `fusion-extension-loaded`).
  - `timestamp: string` – ISO timestamp produced when logging, allowing QA timelines.
  - `correlationId: string` – UUID shared with dashboard logger to cross-reference other events.
  - `severity: 'info' | 'warn' | 'error'` – How critical the mismatch is (recoverable, repeated, etc.).

- **Relationships**:
  - Emitted by `dashboardLogger` and consumed by QA dashboards (no persistence beyond log stream yet).

- **Validation**:
  - `route` must be a normalized Studio path.
  - `serverAttributes` and `clientAttributes` require deterministic key order before serialization (use sorted keys).
  - `timestamp` uses UTC to keep logs comparable.

## DashboardRenderCheck
- **Purpose**: Structured result of the automated hydration regression test.
- **Fields**:
  - `hasMismatch: boolean` – True if any hydration warning fired during the test run.
  - `warnings: string[]` – Raw console messages captured.
  - `networkProfile: 'normal' | 'slow-3g' | 'offline'` – Profile under which test executed.
  - `extensionProfile: 'none' | 'fusion-mock' | string` – Indicates whether mock extension classes were injected.
  - `screenshotPath?: string` – Optional path/artifact reference saved during failure triage.
  - `durationMs: number` – Total runtime of the scenario for performance comparisons.

- **Relationships**:
  - Produced by the automation harness, attached to QA reports, and referenced in `SPRINT3_HEALTH_INDICATORS_REPORT.md` when failures occur.

- **Validation**:
  - If `hasMismatch === true`, at least one entry must exist inside `warnings`.
  - `networkProfile` must align with predefined presets we document in the QA guide.
  - `durationMs` recorded in milliseconds, positive integer.
