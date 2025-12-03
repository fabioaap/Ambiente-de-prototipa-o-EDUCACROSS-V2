# Specification — Sprint 4: BackOffice Essentials & Storybook Branding

**Branch**: `feature/sprint4-backoffice-essentials` | **Date**: 2025-12-03  
**Plan**: [plan.md](./plan.md) | **Tasks**: [tasks.md](./tasks.md)

## Overview

Sprint 4 implementa 6 componentes BackOffice essenciais (Alert, Badge, Chip, Avatar+Group, StatsCard, Dropdown) e customização completa do Storybook UI com identidade visual EDUCACROSS. Objetivo: atingir 29/44 componentes (66% do Design System), mantendo fidelidade ≥90% ao Figma Vuexy e WCAG 2.1 AA.

**Scope**: Design System components + Storybook branding (manager, preview, head, introduction, fonts, favicons)  
**Out of Scope**: Dashboard APIs, Studio pages, journey implementations, performance optimizations beyond build gates

## Context

- **Previous Sprint**: Sprint 3 entregou Button, Input, Card e 23/44 componentes; Dashboard KPIs/Health operacional
- **Current State**: Design System com 23 componentes; Storybook sem branding; BackOffice carece de Alerts/Badges/Chips/Avatars/Stats/Dropdowns
- **Success Criteria**: Componentes em produção-ready prototypes; Storybook branded; build/lint/type-check verde; fidelidade medida; PR com `/spec` validation

## Functional Requirements

### FR-001: Alert Component (US1)
**Objective**: Implementar componente Alert para notificações/feedback contextual.

**Requirements**:
- Variants: `success`, `warning`, `error`, `info` (cores via tokens Vuexy)
- Styles: `filled`, `outlined` (borda + fundo transparente)
- Icon: prop opcional `icon` (ReactNode); posicionamento esquerda
- Close: prop `onClose` (callback); botão com ícone X; foco visível; keyboard `Space`/`Enter` fecham
- Action: slot opcional para botão de ação (ex: "Undo", "Retry")
- Acessibilidade: `role="alert"` ou `role="status"`; close button `aria-label="Close alert"`

**Acceptance Criteria**:
- AC1.1: Stories em Storybook demonstram todas variants + styles + icon + close + action
- AC1.2: Keyboard: `Tab` para close button, `Space`/`Enter` executam close
- AC1.3: Tokens corretos por variant (cores de Vuexy: success=#28C76F, warning=#FF9F43, error=#EA5455, info=#00CFE8)
- AC1.4: Sem console errors; forwardRef funcional; JSDoc completo

### FR-002: Badge Component Expansion (US2)
**Objective**: Expandir Badge existente com variants, sizes, dot e icon.

**Requirements**:
- Variants: `primary`, `secondary`, `success`, `warning`, `error`, `info`
- Styles: `filled`, `outlined`, `soft` (fundo claro + borda colorida)
- Sizes: `sm`, `md`, `lg` (padding/font-size via tokens)
- Dot: prop `dot` boolean (círculo colorido à esquerda)
- Icon: prop `icon` (ReactNode); posicionamento esquerda antes do texto

**Acceptance Criteria**:
- AC2.1: Stories demonstram 6 variants × 3 styles × 3 sizes = grid completo
- AC2.2: Dot e icon renderizam corretamente; tokens mapeados por variant/style
- AC2.3: Badge existente mantém compatibilidade retroativa

### FR-003: Chip Component (US3)
**Objective**: Implementar Chip para filtros, tags e seleção múltipla.

**Requirements**:
- Variants: `filled`, `outlined`
- States: `selected` (boolean), `disabled` (boolean)
- Delete: prop `onDelete` (callback); ícone X à direita; keyboard `Delete`
- Click: prop `onClick` (callback); keyboard `Enter`/`Space`
- Avatar: prop `avatar` (ReactNode ou URL); posicionamento esquerda
- Icon: prop `icon` (ReactNode); posicionamento esquerda (alternativa ao avatar)
- Acessibilidade: `aria-pressed={selected}` quando selecionável; `aria-disabled` quando disabled; foco visível

**Acceptance Criteria**:
- AC3.1: Stories para filter chips (selected/unselected), delete behavior, avatar chip
- AC3.2: Keyboard: `Enter`/`Space` clicam; `Delete` remove; disabled não interage
- AC3.3: Selected state muda cor/borda via tokens; foco visível em todos estados

### FR-004: Avatar Component + AvatarGroup (US4)
**Objective**: Implementar Avatar para representação de usuários/entidades.

**Requirements**:
- Fallback chain: `src` (URL) → `initials` (string) → `icon` (ReactNode) → default placeholder
- Sizes: `xs`, `sm`, `md`, `lg`, `xl` (via tokens)
- Status: prop `status` (`online`, `offline`, `away`, `busy`); badge colorido canto inferior direito
- Badge: prop `badge` (ReactNode ou número); badge canto superior direito
- AvatarGroup: componente container; overflow mostra `+N` quando `max` excedido; spacing negativo para sobreposição
- Acessibilidade: `aria-label` quando initials/icon; `alt` para imagens; status com `aria-describedby`

**Acceptance Criteria**:
- AC4.1: Stories para sizes, status, badge, fallback chain (testar src inválida)
- AC4.2: AvatarGroup com overflow (+N) e spacing correto
- AC4.3: Aria-labels coerentes; imagens com alt

### FR-005: StatsCard Component (US5)
**Objective**: Implementar StatsCard para KPIs/métricas em dashboards.

**Requirements**:
- Props: `title` (string), `value` (string|number), `subtitle` (string opcional), `icon` (ReactNode opcional), `trend` (objeto opcional com `value` e `direction`: `up`|`down`|`neutral`)
- Trend badge: cores via tokens (up=verde, down=vermelho, neutral=cinza); ícone seta
- Children slot: `children` para mini charts (Chart.js, Recharts ou custom SVG)
- Loading: prop `loading` (boolean); skeleton placeholder para título/valor
- Acessibilidade: título com heading semântico (`h3` ou `role="heading"`); trend com `aria-label` (ex: "12% increase")

**Acceptance Criteria**:
- AC5.1: Stories para simples (título+valor), trend (up/down/neutral), subtitle, icon
- AC5.2: Story com `children` slot demonstrando mini chart (exemplo SVG simples)
- AC5.3: Loading skeleton; heading semântico; trend aria-label

### FR-006: Dropdown Component (US6)
**Objective**: Implementar Menu/Dropdown com Radix UI para navegação e ações contextuais.

**Requirements**:
- Radix UI: `@radix-ui/react-dropdown-menu` v2.1.x (headless, acessibilidade built-in)
- Trigger: botão ou elemento customizado; keyboard `Space`/`Enter` abrem
- Content: menu container; posicionamento via Floating UI (Radix internal); collision detection (flip/offset)
- Items: `DropdownItem` component; icon opcional (esquerda); shortcut opcional (direita); `destructive` variant (vermelho)
- Separators: `DropdownSeparator` para divisórias visuais
- Labels: `DropdownLabel` para seções (ex: "Actions", "Settings")
- Keyboard: setas navegam; `Escape` fecha; `Enter` executa item; focus trap dentro do menu
- Acessibilidade: roles `menu`/`menuitem` via Radix; `aria-label` no trigger; items com `aria-disabled` quando disabled

**Acceptance Criteria**:
- AC6.1: Stories para menu básico, icons, shortcuts, destructive items, controlled open
- AC6.2: Keyboard navigation (setas/Escape/Enter) funciona via Radix
- AC6.3: Collision detection em viewport edges; CSS Module 100% customiza aparência
- AC6.4: README no DS documenta Radix como "accessibility implementation" (exceção justificada)

### FR-007: Storybook Branding (US7)
**Objective**: Aplicar identidade visual EDUCACROSS no Storybook.

**Requirements**:
- Manager theme: `domains/storybook/.storybook/manager.ts` com tema customizado (logo, brandTitle "EDUCACROSS", brandUrl, cores primary=#5f4de5)
- Favicon: `manager-head.html` com links para SVG+ICO (`public/branding/favicon.svg`, `favicon.ico`, `apple-touch-icon.png`)
- Fonts: Montserrat self-hosted em `public/fonts/`; `preview-fonts.css` com `@font-face`; import em `preview.ts`
- Preview config: `preview.ts` com backgrounds (light/dark), story order (Introduction primeiro), global CSS (`storybook-globals.css`)
- Introduction page: `src/stories/Introduction.mdx` com welcome, setup, links para DS components
- Globals CSS: `src/styles/storybook-globals.css` com CSS variables (`--brand-primary: #5f4de5`), font Montserrat global, resets

**Acceptance Criteria**:
- AC7.1: Logo e título EDUCACROSS visíveis no manager sidebar
- AC7.2: Montserrat aplicada globalmente; favicons carregam (SVG no Chrome, ICO fallback)
- AC7.3: Introduction page renderiza; story order correto; backgrounds light/dark funcionam
- AC7.4: CSS variables `--brand-primary` usadas no manager theme

## Non-Functional Requirements

### NFR-001: WCAG 2.1 AA Compliance
**Requirement**: Todos os componentes devem atender WCAG 2.1 AA.

**Specific Checks**:
- Contrast ratios: texto/background ≥4.5:1 (normal), ≥3:1 (large/bold)
- Focus indicators: outline visível em todos interativos; `:focus-visible` preferido
- Keyboard navigation: todos interativos acessíveis via `Tab`; ações via `Space`/`Enter`; escape via `Escape`
- ARIA: roles/labels corretos; `aria-pressed`, `aria-disabled`, `aria-describedby` onde aplicável
- Screen readers: anúncios coerentes (Alert com `role="alert"`, Chip com `aria-pressed`)

**Validation Method**: Manual keyboard testing + Chrome DevTools Accessibility audit + checklist por componente (tasks.md)

### NFR-002: Performance Targets
**Requirement**: Componentes devem ser leves e builds rápidos.

**Targets**:
- Render inicial: <500ms (Lighthouse Performance score ≥90)
- Interactions: <200ms (Dropdown open, Chip select, Alert close)
- Build time: ≤baseline +10% (baseline: medir pre-Sprint 4)
- Storybook build: <3min (CI)

**Measurement Method**:
- Render: Lighthouse CLI em stories principais; registrar scores em `evidence/metrics.json`
- Interactions: `performance.now()` em stories; registrar p50/p95
- Build: `time pnpm build` por etapa (tokens, DS, storybook); logs em `evidence/build.log`

### NFR-003: Figma Fidelity
**Requirement**: Componentes devem atingir ≥90% fidelidade visual ao Figma Vuexy.

**Targets**:
- Tier 1 (StatsCard, Dropdown): ≥95%
- Tier 2 (Alert, Badge, Chip, Avatar): ≥90%

**Measurement Method**:
- Screenshots Figma vs Storybook lado a lado
- Visual diff tool (Percy, Chromatic ou manual comparison)
- Documentar scores em `figma-vuezy-reference.md`

### NFR-004: Build Hygiene
**Requirement**: Run-Ready Prototypes — tudo deve buildar, type-check e lint verde.

**Gates**:
- `pnpm build:tokens && pnpm build:design-system && pnpm build:storybook` — 0 errors
- `pnpm -r type-check` — 0 TypeScript errors
- `pnpm lint` — 0 ESLint/Prettier errors
- Console do Storybook localhost:6006 — 0 errors, 0 warnings críticos

**Evidence**: Logs anexados ao PR em `evidence/` (build.log, lint.txt, type-check.txt)

## Edge Cases

### Edge-001: Avatar Fallback Chain
**Scenario**: `src` prop é URL inválida ou carrega com erro 404.

**Expected**: Avatar tenta `initials`; se ausente, tenta `icon`; se ausente, mostra placeholder default (ícone pessoa genérico).

**Validation**: Story "Avatar Fallback" com src quebrada; verificar chain visual.

### Edge-002: Dropdown Collision Detection
**Scenario**: Dropdown trigger próximo à borda inferior/direita do viewport.

**Expected**: Menu flippa para cima/esquerda (collision detection via Radix/Floating UI); não corta conteúdo.

**Validation**: Story "Dropdown Near Edge" com trigger posicionado via CSS; verificar flip.

### Edge-003: Alert Close Focus Retention
**Scenario**: Usuário fecha Alert via teclado (`Enter` no close button).

**Expected**: Foco retorna ao elemento anterior lógico (ex: botão que disparou a notificação) ou próximo focusável.

**Validation**: Story "Alert Focus Management" com botão trigger + Alert; verificar foco pós-close.

### Edge-004: Chip Delete in Disabled State
**Scenario**: Chip com `disabled={true}` e `onDelete` definido.

**Expected**: Delete icon visível mas non-interactive; `Delete` key não funciona; cursor `not-allowed`.

**Validation**: Story "Chip Disabled Deletable"; tentar `Delete` key e click.

### Edge-005: StatsCard Loading Skeleton
**Scenario**: `loading={true}` com `children` (mini chart).

**Expected**: Skeleton para título/valor; `children` não renderiza (ou renderiza skeleton placeholder).

**Validation**: Story "StatsCard Loading" com `loading={true}` e chart dummy; verificar skeleton.

### Edge-006: AvatarGroup Overflow (+N)
**Scenario**: AvatarGroup com `max={3}` e 5 avatars.

**Expected**: Mostra 3 avatars + "+2" badge; badge com `aria-label="2 more users"`.

**Validation**: Story "AvatarGroup Overflow" com array de 5; verificar +N badge e aria-label.

## User Stories

### US1: Alert Component
**As a** BackOffice developer  
**I want** um componente Alert configurável  
**So that** posso exibir notificações de sucesso/erro/aviso com ações opcionais

**Priority**: P0 (blocker para notificações)  
**Story Points**: 5  
**Acceptance Criteria**: Ver AC1.1–AC1.4 em FR-001

### US2: Badge Component Expansion
**As a** Dashboard designer  
**I want** Badges com variants/styles/sizes expandidos  
**So that** posso rotular status/categorias com flexibilidade visual

**Priority**: P1 (nice-to-have para dashboards)  
**Story Points**: 3  
**Acceptance Criteria**: Ver AC2.1–AC2.3 em FR-002

### US3: Chip Component
**As a** BackOffice user  
**I want** Chips para filtros e tags  
**So that** posso selecionar múltiplas opções e deletar tags facilmente

**Priority**: P0 (blocker para filtros)  
**Story Points**: 5  
**Acceptance Criteria**: Ver AC3.1–AC3.3 em FR-003

### US4: Avatar Component + AvatarGroup
**As a** Dashboard designer  
**I want** Avatars com fallbacks, status e grupos  
**So that** posso representar usuários/entidades em listas e headers

**Priority**: P1 (nice-to-have para dashboards)  
**Story Points**: 6  
**Acceptance Criteria**: Ver AC4.1–AC4.3 em FR-004

### US5: StatsCard Component
**As a** Dashboard developer  
**I want** StatsCards com trends e slot para charts  
**So that** posso exibir KPIs/métricas com contexto visual

**Priority**: P0 (blocker para dashboards)  
**Story Points**: 7  
**Acceptance Criteria**: Ver AC5.1–AC5.3 em FR-005

### US6: Dropdown Component (Radix)
**As a** BackOffice developer  
**I want** Menu/Dropdown acessível com keyboard navigation  
**So that** posso criar menus contextuais WCAG AA compliant sem implementar do zero

**Priority**: P0 (blocker para menus)  
**Story Points**: 8  
**Acceptance Criteria**: Ver AC6.1–AC6.4 em FR-006

### US7: Storybook Branding
**As a** Design stakeholder  
**I want** Storybook com identidade EDUCACROSS  
**So that** a documentação visual reflita a marca e seja apresentável para clientes/parceiros

**Priority**: P1 (nice-to-have para apresentações)  
**Story Points**: 4  
**Acceptance Criteria**: Ver AC7.1–AC7.4 em FR-007

## Evidence & Validation

### Evidence Structure
PR deve incluir pasta `evidence/` com:
- `build.log`: output de `pnpm build:tokens && pnpm build:design-system && pnpm build:storybook`
- `lint.txt`: output de `pnpm lint`
- `type-check.txt`: output de `pnpm -r type-check`
- `storybook-screenshots/`: PNG por componente (6 componentes + branding + introduction)
- `metrics.json`: Lighthouse scores, interaction timings, build times

### Validation Checklist
- [ ] Spec.md criado e referenciado em plan/tasks
- [ ] Constitution check aprovado (1 exceção Radix justificada)
- [ ] Todos US1–US7 com stories em Storybook
- [ ] Keyboard navigation testada manualmente por componente
- [ ] ARIA roles/labels auditados via Chrome DevTools
- [ ] Fidelidade Figma medida (≥90% Tier 2, ≥95% Tier 1)
- [ ] Performance: render <500ms, interactions <200ms, build ≤baseline +10%
- [ ] Build/lint/type-check verde (0 errors)
- [ ] Console Storybook limpo (0 errors)
- [ ] PR com `/spec` comment anexado
- [ ] Evidence/ anexada com logs/screenshots/metrics
- [ ] README DS atualizado (Radix dependency documentada)
- [ ] figma-vuexy-reference.md atualizado (6 componentes ✅)

---

**Version**: 1.0.0  
**Author**: SpecKit Plan Mode  
**Last Updated**: 2025-12-03
