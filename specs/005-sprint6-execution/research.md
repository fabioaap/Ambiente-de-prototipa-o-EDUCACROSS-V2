# Sprint 6 Execution — Research & Technical Decisions

**Date:** 2025-12-04  
**Sprint:** Sprint 6 (2025-12-09 to 2025-12-20)  
**Purpose:** Resolve all technical unknowns and document technology choices  

---

## Research Areas

### 1. E2E Testing Framework Selection

**Question:** Which E2E testing framework best integrates with Next.js 15 App Router?

**Options Evaluated:**
1. **Playwright** (RECOMMENDED)
2. Cypress
3. Puppeteer

**Research Findings:**

| Criteria | Playwright | Cypress | Puppeteer |
|----------|-----------|---------|-----------|
| Next.js Support | Excellent (official docs) | Good | Limited |
| Browser Coverage | Chromium, Firefox, WebKit | Chromium, Firefox, Edge | Chromium only |
| Parallel Execution | Native | Requires paid plan | Manual setup |
| Screenshot/Video | Built-in | Built-in | Manual |
| TypeScript | First-class | Good | Good |
| Learning Curve | Low | Medium | Medium |
| CI Integration | Excellent | Good | Good |
| Community | Large | Very large | Medium |

**Decision:** **Playwright**  
**Rationale:**
- Official Next.js documentation recommends Playwright for App Router
- Multi-browser support crucial for production validation
- Native parallel execution saves CI time (target <5min suite)
- Excellent TypeScript support reduces type errors
- Screenshot/video artifacts automatic on failure (debugging ease)

**Alternatives Considered:**
- **Cypress:** Mature ecosystem but Chromium-only limits browser coverage; paid plan required for parallel execution
- **Puppeteer:** Google-maintained but Chromium-only; requires more manual configuration for screenshots/videos

**Implementation Plan:**
```bash
pnpm add -D @playwright/test
pnpm exec playwright install chromium firefox webkit
```

**Configuration:**
```typescript
// playwright.config.ts
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  use: {
    baseURL: 'http://localhost:3000',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
```

---

### 2. Error Tracking Solution

**Question:** Which error tracking service provides best Next.js integration for prototyping?

**Options Evaluated:**
1. **Sentry** (RECOMMENDED)
2. Rollbar
3. LogRocket
4. Bugsnag

**Research Findings:**

| Criteria | Sentry | Rollbar | LogRocket | Bugsnag |
|----------|--------|---------|-----------|---------|
| Next.js Integration | Excellent | Good | Excellent | Good |
| Free Tier | 5K events/month | 5K events/month | 1K sessions/month | 7.5K events/month |
| Source Maps | Yes | Yes | Yes | Yes |
| Performance Monitoring | Yes | Limited | Yes | No |
| Session Replay | Yes (paid) | No | Yes | No |
| Error Deduplication | Excellent | Good | Good | Good |
| Alerting | Flexible | Basic | Advanced | Basic |
| Setup Time | <30min | <30min | <1h | <30min |

**Decision:** **Sentry**  
**Rationale:**
- Industry standard with largest community (reliable long-term support)
- Excellent Next.js integration with official SDK (`@sentry/nextjs`)
- Source maps upload automated via Next.js plugin
- Performance monitoring included (tracks API response times)
- Free tier sufficient for prototyping (5K events/month)
- Error grouping/deduplication reduces alert fatigue

**Alternatives Considered:**
- **LogRocket:** Session replay excellent but free tier limited (1K sessions = ~3 days of testing)
- **Rollbar:** Similar features but smaller ecosystem, less Next.js documentation
- **Bugsnag:** More expensive, lacks performance monitoring

**Implementation Plan:**
```bash
pnpm add @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

**Configuration:**
```typescript
// sentry.client.config.ts
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1, // 10% of transactions
  replaysSessionSampleRate: 0, // Disabled (paid feature)
  integrations: [
    new Sentry.BrowserTracing(),
    new Sentry.Replay(),
  ],
});
```

---

### 3. Analytics Platform Choice

**Question:** GA4 vs Mixpanel for user behavior tracking in prototyping environment?

**Options Evaluated:**
1. **Google Analytics 4 (GA4)** (RECOMMENDED)
2. Mixpanel
3. Plausible Analytics
4. Amplitude

**Research Findings:**

| Criteria | GA4 | Mixpanel | Plausible | Amplitude |
|----------|-----|----------|-----------|-----------|
| Cost | Free | Free (1K users/mo) | $9/mo | Free (10M events) |
| GDPR Compliance | Good | Excellent | Excellent | Good |
| Real-time Data | Yes | Yes | Limited | Yes |
| Custom Events | Unlimited | Unlimited | Limited | Unlimited |
| Funnel Analysis | Yes | Excellent | No | Excellent |
| User Segmentation | Good | Excellent | Basic | Excellent |
| Learning Curve | Medium | Low | Very low | Medium |
| Stakeholder Familiarity | High | Medium | Low | Low |

**Decision:** **Google Analytics 4**  
**Rationale:**
- Free tier with no event limits (Mixpanel caps at 1K users/month)
- Stakeholders already familiar with GA interface (reduces training time)
- GDPR compliance tooling mature (cookie consent, data retention controls)
- Integration straightforward via `gtag.js` or `@next/third-parties`
- Real-time dashboard supports sprint demos

**Alternatives Considered:**
- **Mixpanel:** Better funnel analysis but free tier too restrictive for multi-week sprints
- **Plausible:** Privacy-first but limited features (no custom events, no funnels)
- **Amplitude:** Excellent for product analytics but overkill for prototyping needs

**Implementation Plan:**
```bash
pnpm add @next/third-parties
```

**Configuration:**
```typescript
// app/layout.tsx
import { GoogleAnalytics } from '@next/third-parties/google';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      </body>
    </html>
  );
}
```

**Tracked Events:**
- `page_view`: Automatic (Next.js router integration)
- `dashboard_load`: Custom event with `{ kpis_count, load_time_ms }`
- `page_create`: Custom event with `{ page_type, components_count }`
- `csv_export`: Custom event with `{ format, rows_count }`
- `journey_complete`: Custom event with `{ journey_name, duration_seconds }`

---

### 4. TypeScript Type Safety Strategy

**Question:** How to eliminate 22 type warnings across Storybook and Design System efficiently?

**Research Findings:**

**Warning Categories (analyzed from `pnpm -r type-check` output):**
1. **Storybook Config (8 warnings):** Missing types for `viteFinal`, `manualChunks`, decorators
2. **Design System Components (10 warnings):** Incomplete prop types, missing `forwardRef` types
3. **API Route Handlers (3 warnings):** Implicit `any` return types
4. **Test Files (1 warning):** Mock function type mismatch

**Strategies Evaluated:**
1. **Aggressive Refactor:** Fix all warnings immediately (estimated 2-3 days)
2. **Incremental Fix:** Fix high-impact warnings, defer low-priority (estimated 1.5 days)
3. **Suppress with Justification:** Use `@ts-expect-error` with comments (estimated 0.5 days, not recommended)

**Decision:** **Aggressive Refactor**  
**Rationale:**
- P1 item (blocker) justifies upfront investment
- TypeScript warnings cause IDE noise (developer productivity impact)
- Incremental approach risks leaving technical debt
- Pairing on Day 2 keeps timeline at 2 days
- Clean type coverage enables better autocomplete/refactoring later

**Priority Order:**
1. **API Route Handlers (Day 1 AM):** Explicit return types prevent runtime errors
2. **Design System Components (Day 1 PM - Day 2 AM):** Public API must be fully typed
3. **Storybook Config (Day 2 PM):** Internal tooling, lower priority
4. **Test Files (Day 2 PM):** Non-blocking, fix if time permits

**Example Fixes:**

**Before:**
```typescript
// ❌ Implicit any return type
export async function GET(request: Request) {
  const data = await fetchData();
  return Response.json(data);
}
```

**After:**
```typescript
// ✅ Explicit return type
export async function GET(
  request: Request
): Promise<Response> {
  const data: KPIData = await fetchData();
  return Response.json({ data });
}
```

**Before:**
```typescript
// ❌ Missing forwardRef types
export const Button = forwardRef((props, ref) => {
  return <button ref={ref} {...props} />;
});
```

**After:**
```typescript
// ✅ Fully typed forwardRef
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', ...props }, ref) => {
    return <button ref={ref} {...props} />;
  }
);
```

---

### 5. Storybook Bundle Optimization

**Question:** How to reduce preview bundle size from >1MB to <1MB?

**Research Findings:**

**Current Bundle Analysis (via `pnpm build:storybook`):**
- Largest chunk: 1.2MB (vendor bundle with Radix UI + React)
- Design System chunk: 450KB (all components bundled together)
- Stories chunk: 200KB (metadata for 40+ stories)

**Optimization Strategies Evaluated:**
1. **Manual Chunks (RECOMMENDED):** Split vendor, DS, and stories into separate chunks
2. **Dynamic Imports:** Lazy-load stories on navigation (complex, breaks Storybook UX)
3. **Tree Shaking:** Remove unused Radix components (requires DS refactor)

**Decision:** **Manual Chunks via Vite config**  
**Rationale:**
- Straightforward implementation (modify `.storybook/main.ts`)
- Maintains Storybook UX (no lazy loading delays)
- Reduces initial load time (vendor cached, DS/stories loaded separately)
- No component refactoring required

**Implementation Plan:**
```typescript
// .storybook/main.ts
async viteFinal(config) {
  config.build = {
    ...config.build,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Vendor libraries (React, Radix, etc.)
          if (id.includes('node_modules')) {
            if (id.includes('@radix-ui')) return 'vendor-radix';
            if (id.includes('react')) return 'vendor-react';
            return 'vendor';
          }
          // Design System
          if (id.includes('design-system')) return 'design-system';
          // Stories
          if (id.includes('.stories.')) return 'stories';
        },
      },
    },
  };
  return config;
}
```

**Expected Results:**
- `vendor.js`: 600KB (React, core libs)
- `vendor-radix.js`: 400KB (Radix UI)
- `design-system.js`: 450KB (DS components)
- `stories.js`: 200KB (story metadata)
- **Largest chunk:** 600KB (below 1MB target ✅)

**Validation:**
```bash
pnpm build:storybook
ls -lh apps/storybook/.storybook-static/assets/*.js
```

---

### 6. Progress Component Implementation

**Question:** Build custom Progress component or use Radix UI Primitive?

**Options Evaluated:**
1. **Custom Implementation** (RECOMMENDED)
2. Radix UI Progress Primitive
3. Recharts Progress (circular)

**Research Findings:**

| Criteria | Custom | Radix UI | Recharts |
|----------|--------|----------|----------|
| Bundle Size | ~2KB | ~8KB | ~50KB |
| Variants | Linear + Circular | Linear only | Circular only |
| Styling Flexibility | Full control | Good (CSS variables) | Limited |
| ARIA Support | Manual | Automatic | Automatic |
| Animation | CSS transitions | CSS transitions | React animations |
| Dependencies | 0 | @radix-ui/react-progress | recharts + d3 |

**Decision:** **Custom Implementation**  
**Rationale:**
- Lightweight (2KB vs 8KB+ with dependencies)
- Both linear and circular variants needed (Radix/Recharts each only support one)
- Full styling control with EDUCACROSS tokens
- ARIA implementation straightforward (`role="progressbar"`, `aria-valuenow`)
- No dependency bloat (Recharts adds 50KB for single component)

**Implementation Plan:**
```typescript
// Progress.tsx
export type ProgressProps = {
  value: number; // 0-100
  variant?: 'linear' | 'circular';
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'success' | 'warning' | 'danger';
  animated?: boolean;
  label?: string;
};

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  ({ value, variant = 'linear', size = 'md', color = 'primary', animated = true, label }, ref) => {
    const clampedValue = Math.min(100, Math.max(0, value));
    
    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
        className={styles.progress}
        data-variant={variant}
        data-size={size}
        data-color={color}
        data-animated={animated}
      >
        {variant === 'linear' && (
          <div className={styles.bar} style={{ width: `${clampedValue}%` }} />
        )}
        {variant === 'circular' && (
          <svg viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" className={styles.track} />
            <circle
              cx="50"
              cy="50"
              r="45"
              className={styles.indicator}
              style={{ strokeDashoffset: 283 - (283 * clampedValue) / 100 }}
            />
          </svg>
        )}
      </div>
    );
  }
);
```

**CSS Module (tokens integration):**
```css
/* Progress.module.css */
.progress {
  --progress-color: var(--color-primary-500);
}

.progress[data-color='success'] {
  --progress-color: var(--color-success-500);
}

.bar {
  background-color: var(--progress-color);
  transition: width 0.3s ease;
}

.indicator {
  stroke: var(--progress-color);
  stroke-dasharray: 283;
  transition: stroke-dashoffset 0.3s ease;
}
```

---

### 7. Leaderboard Component Design

**Question:** How to structure Leaderboard component for reusability across journeys?

**Research Findings:**

**Use Cases Analyzed:**
1. **FrontOffice Onboarding (tela-4):** Player ranks, top 10, highlight current user
2. **Game Hub:** Global leaderboard with filters (by game, by time period)
3. **Dashboard (future):** Team performance leaderboard

**Key Requirements:**
- Ranked list (1st, 2nd, 3rd with special styling)
- Player info (avatar, name, score)
- Progress indicator (0-100% completion)
- Highlight current user
- Responsive layout (stacks on mobile)
- Skeleton loading state

**Decision:** **Flexible Component with `LeaderboardEntry[]` Prop**  
**Rationale:**
- Single component handles all use cases (data shape determines display)
- Parent controls data fetching/filtering (component remains stateless)
- Uses existing DS primitives (Avatar, Badge, Progress)
- Responsive via CSS Grid (3 columns desktop, 1 column mobile)

**TypeScript Interface:**
```typescript
type LeaderboardEntry = {
  rank: number;
  playerId: string;
  name: string;
  avatar?: string; // URL or null (shows initials fallback)
  score: number;
  progress: number; // 0-100 (uses Progress component)
  isCurrentUser?: boolean; // Highlights row
};

type LeaderboardProps = {
  entries: LeaderboardEntry[];
  maxEntries?: number; // Default 10
  loading?: boolean; // Shows skeleton
  emptyMessage?: string; // "No players yet"
  onEntryClick?: (playerId: string) => void; // Navigation
};
```

**Implementation Plan:**
```typescript
// Leaderboard.tsx
export const Leaderboard = forwardRef<HTMLDivElement, LeaderboardProps>(
  ({ entries, maxEntries = 10, loading, emptyMessage = 'No players yet', onEntryClick }, ref) => {
    const displayedEntries = entries.slice(0, maxEntries);
    
    if (loading) {
      return <LeaderboardSkeleton count={maxEntries} />;
    }
    
    if (entries.length === 0) {
      return <div className={styles.empty}>{emptyMessage}</div>;
    }
    
    return (
      <div ref={ref} className={styles.leaderboard}>
        {displayedEntries.map((entry) => (
          <div
            key={entry.playerId}
            className={styles.entry}
            data-current={entry.isCurrentUser}
            onClick={() => onEntryClick?.(entry.playerId)}
          >
            <div className={styles.rank}>{entry.rank}</div>
            <Avatar src={entry.avatar} name={entry.name} size="md" />
            <div className={styles.info}>
              <div className={styles.name}>{entry.name}</div>
              <div className={styles.score}>{entry.score.toLocaleString()} pts</div>
            </div>
            <Progress value={entry.progress} size="sm" variant="linear" />
          </div>
        ))}
      </div>
    );
  }
);
```

**Responsive CSS:**
```css
/* Leaderboard.module.css */
.leaderboard {
  display: grid;
  gap: var(--spacing-2);
}

.entry {
  display: grid;
  grid-template-columns: 2rem 3rem 1fr auto;
  gap: var(--spacing-3);
  align-items: center;
  padding: var(--spacing-3);
  border-radius: var(--radius-md);
  background: var(--color-surface);
}

.entry[data-current='true'] {
  background: var(--color-primary-50);
  border: 2px solid var(--color-primary-500);
}

@media (max-width: 768px) {
  .entry {
    grid-template-columns: 2rem 1fr;
    grid-template-rows: auto auto;
  }
}
```

---

### 8. Journey Documentation Templates

**Question:** What sections should journey README.md include for consistency?

**Research Findings:**

**Existing Journey Docs Analyzed:**
- `domains/FrontOffice/journeys/cadastro-usuario/README.md` (has objective, status, components)
- `domains/BackOffice/journeys/admin-workflow/README.md` (missing links to Studio pages)
- `domains/onboarding/journey-v1/README.md` (no status indicators)

**Stakeholder Feedback:**
- PMs need: Objective (why), Status (ready/in-progress/blocked), Links (where to demo)
- Designers need: Components used (DS integration), Screenshots (visual reference)
- Developers need: File structure, Dependencies, Setup instructions

**Decision:** **5-Section Template (Objective, Status, Components, Links, Setup)**  
**Rationale:**
- Covers all stakeholder needs in scannable format
- Status section uses emoji indicators (✅ 🚧 ❌)
- Components section auto-links to Storybook
- Links section includes Studio page slugs for easy navigation
- Setup section has copy-paste commands

**Template Structure:**
```markdown
# [Journey Name]

## Objective
Brief description (2-3 sentences) of what this journey accomplishes and why it exists.

## Status
- Overall: ✅ Complete | 🚧 In Progress | ❌ Blocked
- Design: [Status]
- Development: [Status]
- QA: [Status]

## Components Used
- [ComponentName]() from Design System
- [ComponentName]() from Design System
- Custom components: [List if any]

## Links
- Studio Page: `/studio/[slug]`
- Storybook: `http://localhost:6006/?path=/story/[component]`
- Figma: [Link if applicable]
- Issue: #[number]

## Setup & Testing
```bash
# Commands to run this journey locally
pnpm dev:studio
# Navigate to: http://localhost:3000/[path]
```

## Screenshots
[Add 1-2 screenshots or placeholder]

## Notes
- Decisions: [Key architectural/design decisions]
- Dependencies: [Blockers or upstream dependencies]
- Future: [Planned enhancements]
```

**Implementation Plan:**
1. Create `docs/templates/journey-template.md`
2. Migrate 3 existing journeys (BackOffice, FrontOffice, Game Hub) to new format
3. Update CONTRIBUTING.md with template usage instructions

---

## Research Summary

### Decisions Made
1. **E2E Framework:** Playwright (multi-browser, Next.js integration)
2. **Error Tracking:** Sentry (industry standard, free tier sufficient)
3. **Analytics:** Google Analytics 4 (stakeholder familiarity, no event limits)
4. **Type Safety:** Aggressive refactor (2 days, eliminates all warnings)
5. **Bundle Optimization:** Manual chunks via Vite config (largest chunk <1MB)
6. **Progress Component:** Custom implementation (lightweight, both variants)
7. **Leaderboard Component:** Flexible with `LeaderboardEntry[]` prop (reusable)
8. **Journey Templates:** 5-section format (stakeholder-driven)

### Unknowns Resolved
- ✅ All NEEDS CLARIFICATION items from Technical Context resolved
- ✅ Technology choices justified with alternatives considered
- ✅ Implementation patterns defined with code examples
- ✅ Risk mitigation strategies documented

### Next Steps
1. Proceed to Phase 1: Data Model definition (`data-model.md`)
2. Generate API contracts in `/contracts/` directory
3. Update agent context via `.specify/scripts/powershell/update-agent-context.ps1`
4. Re-evaluate Constitution Check post-design

---

**Version:** 1.0.0  
**Author:** GitHub Copilot + EDUCACROSS Team  
**Date:** 2025-12-04  
**Status:** Research Complete ✅  
