# EDUCACROSS Copilot Playbook

**Status:** Sprint 6 execution | Sprint 3-5 complete | Node 22.21.1 | pnpm 9.14.4+ | TypeScript 5 strict

## 🏗️ Monorepo Architecture

```
apps/                           # Next.js applications
  ├── admin/                    # Dashboard + Puck page builder editor
  └── storybook/               # Storybook 8 (ESM component catalog)
packages/
  ├── design-system/           # React components + CSS Modules
  ├── tokens/                  # Design tokens (colors, typography)
  └── eslint-config/           # Shared ESLint base + Next.js + Storybook variants
domains/                        # Business journeys (BackOffice, FrontOffice)
  ├── studio/                  # Puck editor config + page JSON data
  ├── storybook/               # Story definitions + component examples
  └── {BackOffice,FrontOffice}/journeys/  # Prototypes per business flow
code-to-figma/                  # Figma sync engine
  └── figma-mcp-server/        # MCP server (vitest with contract + integration tests)
```

**Context:** This is a _prototyping environment_, not production. Everything must build/dev cleanly for designers, PMs, and devs to stay productive.

## 🚀 Critical Build & Dev Commands

### Verify Prerequisites
```bash
node --version                 # Must be 22.21.1 (check .nvmrc)
pnpm --version                 # Must be 9.14.4+
pnpm install --frozen-lockfile # Always use frozen-lockfile (pnpm-lock.yaml)
```

### Build Order (Respects Dependency Graph)
```bash
pnpm build:tokens              # 1. Tokens → packages/tokens/dist/tokens.css
pnpm build:design-system       # 2. Design system (imports tokens)
pnpm build                      # 3. All apps (admin + storybook)
pnpm build:hub                  # Alias for storybook
```

### Development Servers
```bash
pnpm dev:admin                 # Admin dashboard on http://localhost:3000
pnpm dev:hub                   # Storybook on http://localhost:6006
pnpm dev:storybook             # Alias for dev:hub
```

### Pre-Commit Quality Gates
```bash
pnpm lint                      # ESLint all packages (0 warnings required)
pnpm type-check                # TypeScript strict check
pnpm check:shadcn              # Enforce shadcn UI import guardrails
pnpm build                      # Full build must succeed before PR
```

## 📦 Package-Specific Patterns

### @prototipo/design-system (`packages/design-system/`)
- **Components location:** `src/components/{ComponentName}/index.tsx`
- **Export manifest:** `src/index.ts` (re-exports all components)
- **Build output:** `dist/index.js` (ESM + CJS), types in `.d.ts`
- **Requirements for new components:**
  - `'use client'` directive at file top
  - `React.forwardRef()` to forward refs
  - CSS Modules (`.module.css`) for styling—pattern: `[name]_[local]_[hash:5]`
  - Fully documented TypeScript props (no `any`)
  - Add story under `domains/storybook/src/stories/` after export
- **Styling:** Always reference tokens from `@prototipo/tokens` (CSS variables); after token edits, run `pnpm build:tokens`
- **Examples in codebase:** Button, Text, Card, Layout, DataTable, Modal, Badge, Tabs, Breadcrumb
- **Storybook sync:** Stories under `domains/storybook/src/stories/` use `play()` functions for interaction tests

### @prototipo/tokens (`packages/tokens/`)
- **Source:** `src/tokens.json` (defines colors, typography, spacing)
- **Build output:** `dist/tokens.css` (CSS custom properties like `var(--color-primary)`)
- **When to edit:** Color palette changes, typography scale updates, spacing/sizing adjustments
- **After editing:** Always run `pnpm build:tokens` (regenerates CSS and type exports)
- **Usage:** Import `@prototipo/tokens/dist/tokens.css` in Storybook preview; components reference vars via CSS Modules

### @prototipo/eslint-config (`packages/eslint-config/`)
- **Variants:**
  - `@prototipo/eslint-config` → Base (JS/TS/React + globals + hooks)
  - `@prototipo/eslint-config/next` → Extends base + Next.js rules
  - `@prototipo/eslint-config/storybook` → Extends base + Storybook rules
- **Per-package setup:** Create `eslint.config.mjs` in package root:
  ```js
  import config from '@prototipo/eslint-config';      // or '/next' or '/storybook'
  export default config;
  ```
- **Example:** `packages/design-system/eslint.config.mjs` uses base; `domains/studio/eslint.config.mjs` uses `/next`

## 🎨 Shadcn UI Import Guardrail

- **ALLOWED:** `@/components/ui/*` only in:
  - `apps/admin/src/app/dashboard/**`
  - `domains/studio/src/app/dashboard/**` (if present)
  - ✅ These are one-off screens needing advanced interactions
- **FORBIDDEN:** Anywhere in `domains/`, `docs/`, or core packages (`packages/*`)
  - ❌ Why: Domains must stay syncable with Figma and Storybook
- **Validation:** `pnpm check:shadcn` fails build if violations detected (look for unapproved imports)

## 🎯 Puck Page Builder Integration

- **Config location:** `domains/studio/src/config/puck.config.tsx` (887+ lines)
- **How it works:** Defines all components editable in Puck UI:
  - Type definitions (e.g., `export type ButtonProps = { text, variant, size }`)
  - Puck field configs (e.g., `Button: { fields: { text: { type: 'text' }, ... } }`)
- **Adding components:** Import new design-system component → define type + Puck fields in config
- **Data storage:** Pages saved as JSON in `domains/studio/data/pages/{slug}.json`
  - Shape: `{ root: { type, props }, zones: {}, content: [] }`
- **Sync requirement:** Puck config must match design-system components exactly (same props)

## 📝 Journey Template Structure

Each `domains/{domain}/journeys/{journey}/` folder requires:
1. **README.md** → Objective, status (🚧 In Progress / ✅ Complete), components used, related links
2. **notas.md** → Dev notes, testing patterns, known issues, future work
3. **links.md** → External references (Figma, specs, other journeys)

After adding/renaming journeys:
- Run `pnpm gen:journeys` to auto-index
- Update `domains/README.md` so stakeholders can find it

**Component sourcing rule:** Only `@prototipo/design-system` imports allowed in journeys (no shadcn, no external UI).

## 🔌 API Patterns (apps/admin/src/app/api/)

- **Route structure:** `route.ts` follows Next.js App Router
  - Example: `apps/admin/src/app/api/dashboard/summary/route.ts`
- **Response types:** Declare interfaces; always use `Response.json()`
  ```ts
  interface DashboardSummary {
    kpis: KPI[];
    health: HealthStatus;
  }
  export async function GET() {
    try {
      const data: DashboardSummary = { ... };
      return Response.json(data);
    } catch (error) {
      return Response.json({ error: 'Internal error' }, { status: 500 });
    }
  }
  ```
- **Mock data:** Use local JSON files (no real DB for prototyping)
- **Parity rule:** Keep response shapes aligned across:
  - `/api/dashboard/summary` (KPIs, health metrics)
  - `/api/dashboard/health` (system status)
  - Other dashboard endpoints

### Dashboard Client (apps/admin/src/app/dashboard/)
- Uses **SWR** for data fetching + caching
- Pattern: Skeleton loaders → data → ErrorBanner fallback
- Mirror existing components: `KPIGrid`, `HealthSection`, etc.

## 🧪 Testing Patterns

- **Test runner:** Vitest (configured per package in `vitest.config.ts`)
- **Configuration:**
  - `environment: 'node'` for backend/MCP, `'happy-dom'` for React
  - `globals: true` for `describe`, `it`, `expect`
- **Test location:** Colocated (`.test.ts` next to source) or in `tests/` folder
- **Storybook interaction tests:** Use `play()` function in stories:
  ```tsx
  export const Checked: Story = {
    args: { label: 'Accept terms' },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      const checkbox = canvas.getByRole('checkbox');
      await userEvent.click(checkbox);
      await expect(checkbox).toBeChecked();
    },
  };
  ```
- **MCP server tests** (`code-to-figma/figma-mcp-server/tests/`):
  - **Contract tests:** Mock Figma API responses, validate Zod schemas
  - **Integration tests:** Real API calls (requires `FIGMA_ACCESS_TOKEN`)
  - Coverage thresholds enforced: 80% statements/functions, 75% branches

## 📋 Git Workflow & CI/CD

- **Branch naming:** `feature/sprint6-{item-name}` (kebab-case)
- **Commit format:** `type(scope): summary (issue #XX)`
  - Example: `feat(design-system): add Avatar component (#42)`
  - Types: `feat`, `fix`, `refactor`, `docs`, `chore`, `test`
- **PR process:**
  1. Open PR
  2. Comment `/spec` to trigger SpecKit analysis
  3. Address all SpecKit gaps (architectural, dependency issues)
  4. Ensure CI passes locally: `pnpm build && pnpm lint && pnpm type-check`
  5. Verify Storybook and admin dev server run without console errors
  6. Merge when all checks green
- **CI workflow:** `.github/workflows/sprint-2-validation.yml`
  - Runs build, lint, type-check, a11y tests, API endpoint validation
  - If CI fails locally, reproduce with: `pnpm build`, `pnpm lint`, `pnpm type-check`

## ✅ Pre-Merge Validation Checklist

1. ✅ **Build:** `pnpm build` → All packages compile successfully
2. ✅ **Lint:** `pnpm lint` → 0 warnings, 0 errors
3. ✅ **Types:** `pnpm type-check` → No TypeScript errors
4. ✅ **Shadcn:** `pnpm check:shadcn` → No forbidden imports detected
5. ✅ **Storybook:** `pnpm dev:hub` → Runs on 6006, all stories load without errors
6. ✅ **Admin:** `pnpm dev:admin` → Runs on 3000, dashboard loads, no console errors
7. ✅ **Documentation:** Journey README complete, PR description clear, architectural decisions logged
8. ✅ **SpecKit:** Green report in PR (no gaps or blockers)

## 🔄 Design System Continuous Evolution Pipeline

The Design System grows incrementally as new screens are built. When you discover a component gap:

### Workflow

1. **Create Analysis**: When starting a new screen, document component needs in `docs/TELA_{NAME}_DS_ANALYSIS.md`
   - ✅ Existing components (ready to use)
   - ❌ Components needing extension (props)
   - 🆕 Completely new components

2. **Create Issues**: For each gap, create GitHub issue with label `ds-enhancement`
   - **Title:** `DS Enhancement: {Component} + {Props}`
   - **Body:** Include Figma link, usage example, affected screens
   - **Priority:** Based on number of dependent screens

3. **Extend Component**: Branch naming: `feature/ds-{component}-{prop}`
   ```bash
   git checkout -b feature/ds-datatable-cellrenderer
   git checkout -b feature/ds-badge-customcolor
   git checkout -b feature/ds-progress-customheight
   ```

4. **Implement**: Add props to component interface + implementation
   - Update TypeScript interfaces
   - Implement in component logic
   - Update CSS Modules if needed
   - Add Storybook story with real usage example

5. **Merge & Document**: After passing CI, merge and update Storybook
   - New props visible in Storybook stories
   - Example from real screen shows use case
   - Component now available for future screens

### Key Resources

- **System Documentation:** `DS_CONTINUOUS_EVOLUTION_SYSTEM.md`
- **Gap Analysis Template:** `docs/TELA_ANALYSIS_TEMPLATE.md`
- **Storybook Reference:** `domains/storybook/src/stories/`

---

**Key Files to Reference:**
- Monorepo config: `pnpm-workspace.yaml`, `turbo.json`, `package.json`
- Token system: `packages/tokens/src/tokens.json`, `packages/tokens/dist/tokens.css`
- Component examples: `packages/design-system/src/components/Button/`, `domains/storybook/src/stories/`
- Puck integration: `domains/studio/src/config/puck.config.tsx`, `domains/studio/data/pages/`
- Test setup: `code-to-figma/figma-mcp-server/vitest.config.ts`, `code-to-figma/figma-mcp-server/tests/helpers/setup.ts`
- **DS Evolution:** `DS_CONTINUOUS_EVOLUTION_SYSTEM.md`, `DESIGN_SYSTEM_REAL_GAP_ANALYSIS.md`
