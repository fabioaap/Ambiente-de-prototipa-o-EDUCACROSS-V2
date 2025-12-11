# Test Checklist - Sprint 6

## Unit Tests (Vitest, ≥95% cobertura)
- [ ] Progress component: value prop (0-100), variant (primary/success/warning/danger), size (sm/md/lg), animated flag
- [ ] Leaderboard component: entries array, maxEntries truncation, empty state, loading spinner
- [ ] DataTable cellRenderer: renderiza custom content quando fornecido
- [ ] Badge customColor: aplica cor inline quando prop passada
- [ ] StatsCard icon: renderiza ícone quando fornecido
- [ ] ActionButtons icons: mapeia ícones aos botões corretamente

## Component Stories (Storybook, play() functions)
- [ ] Progress: story com diferentes valores (0%, 50%, 100%), variantes, tamanhos, animado
- [ ] Leaderboard: story com top 10, current user highlight, empty state
- [ ] DataTable: story com cellRenderer renderizando Progress + Badge inline
- [ ] Badge: story com cores customizadas (#28C76F, #EA5455)
- [ ] StatsCard: story com ícone customizado
- [ ] ActionButtons: story com ícones customizados

## E2E Tests (Playwright, ≥80% cobertura, 3 browsers)
- [ ] Dashboard carrega sem erros (Chromium/Firefox/WebKit)
- [ ] Painel Inicial renderiza todos os KPIs (DataTable, Progress, Badge)
- [ ] Filtros (Select) funcionam e filtram dados
- [ ] Paginação navega entre páginas
- [ ] FrontOffice onboarding: navegação entre 5 telas funciona
- [ ] Leaderboard exibe entries e current user highlight
- [ ] Artefatos (screenshot/video) capturados em falha
- [ ] Testes rodam em <5 min (total)

## Type Safety (TypeScript strict)
- [ ] Zero `@ts-expect-error` injustificados
- [ ] Zero `any` tipos (exceto bem documentados)
- [ ] Interfaces definidas para DataExportRequest, DataImportRequest, etc
- [ ] Validação de schema em import/export (CSV/JSON/XML)
- [ ] `pnpm -r type-check` passa com 0 erros

## Linting (ESLint, 0 warnings)
- [ ] Sem unused variables
- [ ] Sem unused imports
- [ ] Sem `console.log` em produção
- [ ] Shadcn guardrail: `pnpm check:shadcn` passa (nenhum import fora de admin/dashboard)
- [ ] `pnpm lint` passa com 0 warnings

## Flaky Tests
- [ ] Todos os testes executam deterministicamente (nenhuma skip)
- [ ] Nenhum teste flaky (passa/falha inconsistentemente)
- [ ] Timeouts adequados para E2E async operations

## Test Coverage Metrics
- [ ] Unit: ≥95% coverage (statements, branches, functions)
- [ ] E2E: ≥80% coverage (dashboard, studio, journeys)
- [ ] Testes de erro handling (400, 404, 500 responses)
- [ ] Mock data consistente e realista

## Integration Tests
- [ ] API endpoints `/api/dashboard/*` retornam typed responses
- [ ] `/api/health` status endpoint funciona
- [ ] Export/Import CSV/JSON/XML valida schema e retorna erros detalhados
- [ ] Sentry captura erros corretamente (sem PII)
- [ ] Analytics eventos disparam corretamente (GA4/Mixpanel)

## Regression Testing
- [ ] `pnpm build` passa (tokens → design-system → admin/storybook)
- [ ] Storybook build <90s
- [ ] Admin app dev server inicia sem erros
- [ ] Componentes existentes não quebraram (Progress, Badge, DataTable)
