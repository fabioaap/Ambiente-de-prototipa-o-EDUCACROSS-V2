# Performance Checklist - Sprint 6

## Build Performance
- [ ] `pnpm build:tokens` completa em <10s
- [ ] `pnpm build:design-system` completa em <30s
- [ ] `pnpm build` (full build) completa em <120s
- [ ] Storybook build completa em <90s
- [ ] CI pipeline completa (lint + type-check + test) em <10 min

## Bundle Size
- [ ] Main bundle (JS) <500 KB gzipped
- [ ] Total assets (CSS + JS + fonts) <2 MB
- [ ] Design system bundle <100 KB gzipped
- [ ] No inline CSS > 50 KB
- [ ] Assets otimizadas (images webp, minified)

## Page Load Performance
- [ ] Dashboard page load ≤2s (Lighthouse measure)
- [ ] First Contentful Paint (FCP) ≤1s
- [ ] Largest Contentful Paint (LCP) ≤2.5s
- [ ] Cumulative Layout Shift (CLS) <0.1
- [ ] Time to Interactive (TTI) ≤3.5s

## Runtime Performance
- [ ] DataTable com 100+ rows: renderiza em <500ms, scrolling smooth (60fps)
- [ ] Leaderboard com 10 entries: renderiza em <100ms
- [ ] Form interactions (input, change, submit): <50ms response
- [ ] Modal open/close: <200ms animation
- [ ] Route transitions: <300ms
- [ ] API responses: GET <200ms, POST <500ms

## Network Performance
- [ ] Latência API dashboard/summary: <200ms
- [ ] Latência API health: <100ms
- [ ] Export CSV/JSON/XML: <1s para 1000 records
- [ ] Images lazy-loaded (Intersection Observer)
- [ ] HTTP/2 push habilitado para critical assets (CSS, fonts)

## Memory Usage
- [ ] App memory baseline: <50 MB (dev), <100 MB (prod)
- [ ] DataTable com 1000 rows: <150 MB
- [ ] Nenhum memory leak detectado (DevTools heap snapshots)
- [ ] Componentes cleanup proper subscriptions/timers

## Resource Optimization
- [ ] CSS Modules: zero unused styles
- [ ] JavaScript: tree-shaking remove dead code
- [ ] Fonts: subsetting (apenas caracteres usados)
- [ ] Images: SVGs para icons, PNG/WebP para raster
- [ ] No render-blocking resources

## Monitoring & Metrics
- [ ] Sentry performance monitoring ativo (transactions)
- [ ] Core Web Vitals rastreadas (CLS, FCP, LCP)
- [ ] Custom metrics: Dashboard load time, Export duration
- [ ] Alertas para degradação (LCP >2.5s, etc)

## Development Mode Performance
- [ ] Dev server startup: <5s
- [ ] Hot Module Replacement (HMR): <1s
- [ ] CSS rebuild: <500ms
- [ ] TypeScript incremental compilation: <1s

## Test Execution Performance
- [ ] Vitest unit tests: completa em <30s (total)
- [ ] Playwright E2E: completa em <5 min (3 browsers)
- [ ] Parallel test execution: -j auto (todos cores)

## Database / Data Fetching (Mock)
- [ ] Mock data geração: <100ms
- [ ] SWR cache: hit rate >70% em journeys
- [ ] Stale-while-revalidate: background fetch <2s

## Code Splitting
- [ ] Admin dashboard: code split em route-level chunks
- [ ] Storybook: lazy-loaded stories (sob demand)
- [ ] Design-system: side-effect free (tree-shakeable)

## Profiling & Analysis
- [ ] Lighthouse score ≥90 (Performance)
- [ ] WebPageTest waterfall: início-a-interativo <3s
- [ ] Bundle analyzer mostra nenhum pacote >100KB sem justificativa
- [ ] Chrome DevTools profiler: nenhum jank (60fps maintained)

## Documentation
- [ ] Performance targets documentado em quickstart.md
- [ ] Known limitations/trade-offs explicados
- [ ] Benchmark scripts para revalidação periódica
- [ ] Alertas de performance em PR (Lighthouse CI)
