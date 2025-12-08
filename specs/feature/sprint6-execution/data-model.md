# Data Model (Phase 1)

Spec: `specs/feature/sprint6-execution/spec.md`

## Entities

- **WorkflowRun**: { id, status: `queued|in_progress|success|failed`, durationMs, jobs: JobRun[], branch, sha, createdAt }
	- **JobRun**: { name, status, durationMs, warnings: string[], testsPassed: number, testsTotal: number }

- **TypeCheckReport**: { package: string, warnings: number, errors: number, filesWithAny: string[] }

- **UnitTestSuite**: { suiteName, passed: number, total: number, durationMs, flaky: string[] }

- **E2EScenario**: { name, coveragePercent, browsers: string[], durationMs, artifacts: { screenshotUrl?, videoUrl? } }

- **SentryConfig**: { dsn, environment, release, tracesSampleRate, profilesSampleRate, sendDefaultPii: boolean }
- **AnalyticsConfig**: { provider: `ga4|mixpanel`, key, defaultEvents: string[], customEvents: CustomEvent[] }
	- **CustomEvent**: { name, properties: Record<string, string | number | boolean> }

- **DataExportRequest**: { format: `csv|json|xml`, schemaVersion: string, filters?: Record<string, string>, requestedAt }
- **DataImportRequest**: { format: `csv|json|xml`, schemaVersion: string, fileName, sizeBytes, receivedAt }
- **DataRecord**: { id: string, fields: Record<string, string | number | boolean | null> }
- **ValidationError**: { field: string, message: string, line?: number }

- **ProgressProps**: { value: number (0–100), variant: `primary|success|warning|danger`, size: `sm|md|lg`, animated?: boolean }
- **LeaderboardEntry**: { rank: number, playerId: string, name: string, avatar?: string, score: number, progress: number (0–100), isCurrentUser?: boolean }
- **LeaderboardProps**: { entries: LeaderboardEntry[], maxEntries?: number, loading?: boolean, emptyMessage?: string }

- **BackOfficeScreen**: { slug: `login|dashboard|perfil`, components: string[], responsive: boolean }
- **FrontOfficeScreen**: { slug: `boas-vindas|personagem|primeira-missao|leaderboard|parabens`, components: string[], responsive: boolean }
- **GameHubEntry**: { id, title, genre, progress: number (0–100), leaderboard: LeaderboardEntry[] }

## Relationships

- WorkflowRun aggregates JobRuns; JobRuns reference UnitTestSuite and TypeCheckReport outputs.
- E2EScenario references target journeys (dashboard, studio) and attaches artifacts.
- AnalyticsConfig links to events emitted from journeys and exports/import flows.
- Leaderboard uses Progress props for per-entry progress.
- Journeys (BackOffice/FrontOffice/Game Hub) consume Leaderboard/Progress components and data records for mock content.

## Validation Rules

- Progress/Leaderboard progress and value: 0–100 inclusive.
- Workflow run durations must be non-negative; status in allowed enum.
- TypeCheckReport warnings/errors ≥0; `filesWithAny` empty to meet AC.
- DataExport/Import format must be csv|json|xml; schemaVersion required; validation errors must include field and message, and line when applicable.
- GA/Mixpanel events require name non-empty; properties primitive-only; no PII in payloads.
- Sentry config must disable PII (`sendDefaultPii=false`), include release and environment, and upload source maps.
- E2E coverage target ≥80% (aggregate) with Chromium/Firefox/WebKit present.
