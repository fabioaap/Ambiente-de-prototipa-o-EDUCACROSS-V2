# Sprint 6 - Advanced UI & Finalization - Tasks

**Feature**: Design System Sprint 6 (Final)  
**Version**: 1.0.0  
**Created**: 2025-11-29  
**Reference**: `.specify/memory/figma-vuexy-reference.md`

---

## 📋 Overview

**Total Tasks**: 120  
**Estimated Time**: 42 hours (3 weeks)  
**Components**: 9 + Modal Fix  
**Target Completion**: 44/44 components (100%) ✅

---

## Phase 1: Setup & Prerequisites

**Goal**: Preparar ambiente para Sprint 6 Final

### Tasks

- [ ] T001 Verificar Sprint 5 completo: 37/44 componentes (84%)
- [ ] T002 Criar branch `sprint6/advanced-ui-final` a partir de `main`
- [ ] T003 Executar build baseline: `pnpm build`
- [ ] T004 Revisar roadmap: 9 componentes novos + 1 fix (Snackbar, Progress, Rating, Stepper, Transfer, Skeleton, Empty State, Error Pages, Pricing Cards, Modal fix)
- [ ] T005 Criar 10 issues no GitHub (9 componentes + 1 bug fix)

---

## Phase 2: CRITICAL - Modal Fix (Pagination Bug Redux) (3h)

**User Story**: [US0] Como desenvolvedor, preciso que Modal não quebre quando integrado com Table Pagination

**Context**: Mesmo bug do Pagination (#54) pode afetar Modals - prevenir proativamente  
**Figma**: node-id=309-34633  
**Tier**: 1 (≥95% fidelidade) - CRÍTICO

### Implementation Tasks

- [ ] T006 [US0] Auditar Modal.tsx: verificar event handlers, state management
- [ ] T007 [US0] Criar test case: Modal com Table paginada dentro
- [ ] T008 [US0] Executar validação Playwright específica
- [ ] T009 [US0] Aplicar fix preventivo se necessário (stopPropagation, useCallback)
- [ ] T010 [US0] Criar story complexa: Modal + Table + Pagination
- [ ] T011 [US0] Build, validação ≥95%, screenshot
- [ ] T012 [US0] Atualizar documentação com uso seguro

**Independent Test**: Modal com Table paginada dentro funciona sem erros console, paginação clica corretamente, modal fecha corretamente.

---

## Phase 3: Component 1 - Snackbar/Toast (4h)

**User Story**: [US1] Como desenvolvedor, preciso de Snackbars para notificações temporárias

**Figma**: node-id=756-69503  
**Tier**: 2 (≥90% fidelidade)

### Implementation Tasks

- [ ] T013 [P] [US1] Criar estrutura: `packages/design-system/src/components/Snackbar/`
- [ ] T014 [US1] Criar interface `SnackbarProps`: message, variant, duration, position, action
- [ ] T015 [US1] Implementar Snackbar.tsx com auto-dismiss timer
- [ ] T016 [US1] Implementar SnackbarProvider.tsx (context para queue de toasts)
- [ ] T017 [P] [US1] Criar CSS Module com positioning (top/bottom-left/right/center), slide-in animation
- [ ] T018 [P] [US1] Aplicar tokens: success/warning/error-500, shadows-lg, borderRadius-md
- [ ] T019 [US1] Implementar queue system (múltiplos snackbars empilhados)
- [ ] T020 [US1] Implementar action button (undo, etc.)
- [ ] T021 [P] [US1] Exportar Snackbar, SnackbarProvider, useSnackbar hook

### Storybook & Validation

- [ ] T022 [P] [US1] Criar stories: Success, Warning, Error, With Action, Multiple Queue
- [ ] T023 [US1] Build, validação Playwright ≥90%, screenshot
- [ ] T024 [US1] Registrar em puck.config.tsx
- [ ] T025 [US1] Atualizar documentação

**Independent Test**: Snackbar aparece no canto configurado, auto-dismiss após X segundos, múltiplos snackbars empilham, action button funciona.

---

## Phase 4: Component 2 - Progress Bars/Circles (3h)

**User Story**: [US2] Como desenvolvedor, preciso de Progress indicators para feedback visual

**Figma**: node-id=6527-49838  
**Tier**: 2 (≥90% fidelidade)

### Implementation Tasks

- [ ] T026 [P] [US2] Criar estrutura: `packages/design-system/src/components/Progress/`
- [ ] T027 [US2] Criar interface `ProgressProps`: value, max, variant (linear/circular), color, size
- [ ] T028 [US2] Implementar ProgressLinear.tsx (barra horizontal)
- [ ] T029 [US2] Implementar ProgressCircular.tsx (círculo SVG)
- [ ] T030 [P] [US2] Criar CSS Module com animations, gradients
- [ ] T031 [P] [US2] Aplicar tokens: primary-600, success-500, borderRadius-full
- [ ] T032 [US2] Implementar indeterminate mode (loading sem valor fixo)
- [ ] T033 [P] [US2] Exportar ProgressLinear, ProgressCircular

### Storybook & Validation

- [ ] T034 [P] [US2] Criar stories: Linear Default, Circular, Indeterminate, Colors, Sizes
- [ ] T035 [US2] Build, validação Playwright ≥90%, screenshot
- [ ] T036 [US2] Registrar em puck.config.tsx
- [ ] T037 [US2] Atualizar documentação

**Independent Test**: Barra preenche proporcionalmente ao value, círculo SVG anima, indeterminate loop infinito, cores aplicam corretamente.

---

## Phase 5: Component 3 - Rating (3h)

**User Story**: [US3] Como desenvolvedor, preciso de Rating para avaliações com estrelas

**Figma**: node-id=327-74887  
**Tier**: 2 (≥90% fidelidade)

### Implementation Tasks

- [ ] T038 [P] [US3] Criar estrutura: `packages/design-system/src/components/Rating/`
- [ ] T039 [US3] Criar interface `RatingProps`: value, max, size, readOnly, icon, color
- [ ] T040 [US3] Implementar Rating.tsx com hover states
- [ ] T041 [P] [US3] Criar CSS Module com star fill animation, hover highlight
- [ ] T042 [P] [US3] Aplicar tokens: warning-500 (stars), spacing-1
- [ ] T043 [US3] Implementar half-star support (value 3.5 → 3.5/5 estrelas)
- [ ] T044 [US3] Implementar custom icon support (heart, thumb, etc.)
- [ ] T045 [P] [US3] Exportar Rating

### Storybook & Validation

- [ ] T046 [P] [US3] Criar stories: Default, Half Stars, Read-only, Custom Icon, Sizes
- [ ] T047 [US3] Build, validação Playwright ≥90%, screenshot
- [ ] T048 [US3] Registrar em puck.config.tsx
- [ ] T049 [US3] Atualizar documentação

**Independent Test**: Estrelas preenchem ao clicar, hover destaca até a estrela, half-star renderiza corretamente, readOnly não clicável.

---

## Phase 6: Component 4 - Stepper (5h)

**User Story**: [US4] Como desenvolvedor, preciso de Stepper para wizards multi-etapas

**Figma**: node-id=6527-49841  
**Tier**: 2 (≥90% fidelidade)

### Implementation Tasks

- [ ] T050 [P] [US4] Criar estrutura: `packages/design-system/src/components/Stepper/`
- [ ] T051 [US4] Criar interfaces `StepperProps`, `StepProps`
- [ ] T052 [US4] Implementar Stepper.tsx (container horizontal/vertical)
- [ ] T053 [US4] Implementar Step.tsx com status: pending, active, completed, error
- [ ] T054 [P] [US4] Criar CSS Module com connector lines, step circles, status colors
- [ ] T055 [P] [US4] Aplicar tokens: primary-600 (completed), neutral-400 (pending), error-500
- [ ] T056 [US4] Implementar controlled navigation (activeStep prop)
- [ ] T057 [US4] Implementar optional step support
- [ ] T058 [US4] Implementar editable steps (jump back to completed steps)
- [ ] T059 [P] [US4] Exportar Stepper, Step

### Storybook & Validation

- [ ] T060 [P] [US4] Criar stories: Horizontal, Vertical, Optional Steps, Error State, Editable
- [ ] T061 [US4] Build, validação Playwright ≥90%, screenshot
- [ ] T062 [US4] Registrar em puck.config.tsx
- [ ] T063 [US4] Atualizar documentação

**Independent Test**: Steps conectados por linha, step ativo destaca, completed mostra check, error mostra ícone vermelho, clique em completed volta.

---

## Phase 7: Component 5 - Transfer List (5h)

**User Story**: [US5] Como desenvolvedor, preciso de Transfer para mover itens entre listas

**Figma**: node-id=327-74888  
**Tier**: 3 (≥85% fidelidade) - Complexidade interativa

### Implementation Tasks

- [ ] T064 [P] [US5] Criar estrutura: `packages/design-system/src/components/Transfer/`
- [ ] T065 [US5] Criar interface `TransferProps`: dataSource, targetKeys, onChange, titles, operations
- [ ] T066 [US5] Implementar Transfer.tsx com duas listas + botões
- [ ] T067 [P] [US5] Criar CSS Module com list containers, selection states
- [ ] T068 [P] [US5] Aplicar tokens: primary-600 (selected), borderRadius-md, spacing-3
- [ ] T069 [US5] Implementar seleção múltipla (checkboxes)
- [ ] T070 [US5] Implementar move to target / move to source
- [ ] T071 [US5] Implementar search/filter em ambas listas
- [ ] T072 [US5] Implementar select all / deselect all
- [ ] T073 [P] [US5] Exportar Transfer

### Storybook & Validation

- [ ] T074 [P] [US5] Criar stories: Default, With Search, Disabled Items, Custom Render
- [ ] T075 [US5] Build, validação Playwright ≥85%, screenshot
- [ ] T076 [US5] Registrar em puck.config.tsx
- [ ] T077 [US5] Atualizar documentação

**Independent Test**: Itens movem de source → target, seleção múltipla funciona, search filtra ambas listas, select all marca todos, disabled não transfere.

---

## Phase 8: Component 6 - Skeleton (3h)

**User Story**: [US6] Como desenvolvedor, preciso de Skeleton para loading states

**Figma**: node-id=756-69505  
**Tier**: 2 (≥90% fidelidade)

### Implementation Tasks

- [ ] T078 [P] [US6] Criar estrutura: `packages/design-system/src/components/Skeleton/`
- [ ] T079 [US6] Criar interface `SkeletonProps`: variant (text/circular/rectangular), width, height, animation
- [ ] T080 [US6] Implementar Skeleton.tsx com pulse/wave animations
- [ ] T081 [P] [US6] Criar CSS Module com gradient animation keyframes
- [ ] T082 [P] [US6] Aplicar tokens: neutral-200/300, borderRadius-md
- [ ] T083 [US6] Implementar SkeletonText, SkeletonCircle, SkeletonRect (variants)
- [ ] T084 [P] [US6] Exportar Skeleton, variants

### Storybook & Validation

- [ ] T085 [P] [US6] Criar stories: Text Lines, Avatar, Card Layout, Table Rows, Wave Animation
- [ ] T086 [US6] Build, validação Playwright ≥90%, screenshot
- [ ] T087 [US6] Registrar em puck.config.tsx
- [ ] T088 [US6] Atualizar documentação

**Independent Test**: Skeleton anima pulse/wave, text lines múltiplas, circular para avatar, rectangular para cards, layout complexo (card com avatar+text).

---

## Phase 9: Component 7 - Empty State (3h)

**User Story**: [US7] Como desenvolvedor, preciso de Empty State para ausência de dados

**Figma**: node-id=309-34634  
**Tier**: 2 (≥90% fidelidade)

### Implementation Tasks

- [ ] T089 [P] [US7] Criar estrutura: `packages/design-system/src/components/EmptyState/`
- [ ] T090 [US7] Criar interface `EmptyStateProps`: title, description, icon, action
- [ ] T091 [US7] Implementar EmptyState.tsx com layout centrado
- [ ] T092 [P] [US7] Criar CSS Module com illustration positioning, button spacing
- [ ] T093 [P] [US7] Aplicar tokens: neutral-500 (text), spacing-6, borderRadius-md
- [ ] T094 [US7] Implementar variants: no-data, no-search-results, error, no-permission
- [ ] T095 [P] [US7] Exportar EmptyState

### Storybook & Validation

- [ ] T096 [P] [US7] Criar stories: No Data, No Search Results, Error, With Action Button
- [ ] T097 [US7] Build, validação Playwright ≥90%, screenshot
- [ ] T098 [US7] Registrar em puck.config.tsx
- [ ] T099 [US7] Atualizar documentação

**Independent Test**: Ícone centralizado, título e descrição legíveis, action button aparece quando fornecido, variants aplicam ilustrações corretas.

---

## Phase 10: Component 8 - Error Pages (4h)

**User Story**: [US8] Como desenvolvedor, preciso de Error Pages para 404, 500, etc.

**Figma**: node-id=309-34635  
**Tier**: 2 (≥90% fidelidade)

### Implementation Tasks

- [ ] T100 [P] [US8] Criar estrutura: `packages/design-system/src/components/ErrorPage/`
- [ ] T101 [US8] Criar interface `ErrorPageProps`: code, title, description, action
- [ ] T102 [US8] Implementar ErrorPage.tsx com full-page layout
- [ ] T103 [P] [US8] Criar CSS Module com illustration, centered layout, responsive
- [ ] T104 [P] [US8] Aplicar tokens: neutral-900 (title), spacing-8, borderRadius-lg
- [ ] T105 [US8] Implementar variants: 404, 500, 403, Maintenance
- [ ] T106 [US8] Implementar ErrorPage404, ErrorPage500, ErrorPage403 (presets)
- [ ] T107 [P] [US8] Exportar ErrorPage, presets

### Storybook & Validation

- [ ] T108 [P] [US8] Criar stories: 404, 500, 403, Maintenance, Custom
- [ ] T109 [US8] Build, validação Playwright ≥90%, screenshot
- [ ] T110 [US8] Registrar em puck.config.tsx
- [ ] T111 [US8] Atualizar documentação

**Independent Test**: Full-page layout, ilustração visível, código error destacado, action button (Go Home) funciona, responsive em mobile.

---

## Phase 11: Component 9 - Pricing Cards (4h)

**User Story**: [US9] Como desenvolvedor, preciso de Pricing Cards para planos de assinatura

**Figma**: node-id=765-80504  
**Tier**: 2 (≥90% fidelidade)

### Implementation Tasks

- [ ] T112 [P] [US9] Criar estrutura: `packages/design-system/src/components/PricingCard/`
- [ ] T113 [US9] Criar interface `PricingCardProps`: title, price, period, features, action, featured
- [ ] T114 [US9] Implementar PricingCard.tsx com layout vertical
- [ ] T115 [P] [US9] Criar CSS Module com featured highlight, feature list styling
- [ ] T116 [P] [US9] Aplicar tokens: primary-600 (featured border), shadows-xl, borderRadius-lg
- [ ] T117 [US9] Implementar featured state (destaque visual)
- [ ] T118 [US9] Implementar feature list com check icons
- [ ] T119 [US9] Implementar badge (Popular, Best Value, etc.)
- [ ] T120 [P] [US9] Exportar PricingCard

### Storybook & Validation

- [ ] T121 [P] [US9] Criar stories: Basic, Professional, Enterprise, Featured, Grid Layout
- [ ] T122 [US9] Build, validação Playwright ≥90%, screenshot
- [ ] T123 [US9] Registrar em puck.config.tsx
- [ ] T124 [US9] Atualizar documentação

**Independent Test**: Featured card destaca (border/shadow), features listam com check icons, badge aparece no topo, action button call-to-action claro.

---

## Phase 12: Final Integration, Documentation & Release

**Goal**: Consolidar Sprint 6, 100% componentes, preparar release final

### Tasks

- [ ] T125 [P] Executar build completo: `pnpm build`
- [ ] T126 [P] Executar lint: `pnpm lint`
- [ ] T127 [P] Executar type-check: `pnpm -r type-check`
- [ ] T128 Validar todos os 10 componentes no Storybook (9 novos + 1 fix)
- [ ] T129 Capturar screenshots (10 componentes)
- [ ] T130 Gerar relatório Playwright consolidado (Sprint 6)
- [ ] T131 Gerar relatório COMPLETO (44 componentes - Sprints 1-6)
- [ ] T132 Atualizar `figma-vuexy-reference.md`: 44/44 (100%) ✅
- [ ] T133 Criar CHANGELOG.md entry detalhado
- [ ] T134 Criar SPRINT6_COMPLETION_REPORT.md com métricas finais
- [ ] T135 Commitar e criar PR: "feat(sprint6): implement 9 advanced UI components + Modal fix - 100% Vuexy coverage"
- [ ] T136 Anexar evidências (screenshots, relatórios, métricas)
- [ ] T137 Merge após aprovação
- [ ] T138 Tag release: `v2.0.0` (100% Design System completo)
- [ ] T139 Publicar pacotes no npm (se aplicável)
- [ ] T140 Atualizar Constitution: Section "Design System Status" → COMPLETE

---

## 🎯 Task Dependency Graph

### Week 1
- Phase 1: Setup (T001-T005)
- Phase 2: Modal Fix (T006-T012) - CRÍTICO PRIMEIRO
- Parallel Batch A: Snackbar (T013-T025) + Progress (T026-T037) + Rating (T038-T049)

### Week 2
- Parallel Batch B: Stepper (T050-T063) + Transfer (T064-T077)
- Parallel Batch C: Skeleton (T078-T088) + EmptyState (T089-T099)

### Week 3
- Parallel Batch D: ErrorPages (T100-T111) + PricingCards (T112-T124)
- Phase 12: Final Integration (T125-T140) - SEQUENCIAL

---

## 📊 Progress Tracking

| Component | Tasks | Status | Fidelity | Evidence |
|-----------|-------|--------|----------|----------|
| **Modal Fix** | T006-T012 (7) | ⏳ | - | - |
| Snackbar | T013-T025 (13) | ⏳ | - | - |
| Progress | T026-T037 (12) | ⏳ | - | - |
| Rating | T038-T049 (12) | ⏳ | - | - |
| Stepper | T050-T063 (14) | ⏳ | - | - |
| Transfer | T064-T077 (14) | ⏳ | - | - |
| Skeleton | T078-T088 (11) | ⏳ | - | - |
| EmptyState | T089-T099 (11) | ⏳ | - | - |
| ErrorPages | T100-T111 (12) | ⏳ | - | - |
| PricingCards | T112-T124 (13) | ⏳ | - | - |

**Total**: 119 tasks | **Completed**: 0/119 (0%)

---

## 🎉 Sprint 6 Completion = Design System 100%

### Final Metrics Target

- **Total Components**: 44/44 (100%)
- **Average Fidelity**: ≥92% (target: 93%+)
- **Tier 1 Components**: 100% fidelity (Button, Input, Card, Tabs, Modal)
- **Tier 2 Components**: ≥90% fidelity (majority)
- **Tier 3 Components**: ≥85% fidelity (complex: TreeView, Transfer)

### Release Checklist

- [ ] All 44 components implemented
- [ ] All Storybook stories working
- [ ] All Puck integrations registered
- [ ] Comprehensive Playwright report (100% coverage)
- [ ] CHANGELOG.md complete
- [ ] Constitution updated (Design System COMPLETE)
- [ ] npm packages published (if applicable)
- [ ] Tag `v2.0.0` created
- [ ] Celebration 🎉

---

## 🔗 References

- **Figma Reference**: `.specify/memory/figma-vuexy-reference.md`
- **Sprint 4 Tasks**: `.specify/memory/SPRINT4_TASKS.md`
- **Sprint 5 Tasks**: `.specify/memory/SPRINT5_TASKS.md`
- **Constitution**: `.specify/memory/constitution.md` (v1.1.0 → v2.0.0 ao completar)

---

**Generated**: 2025-11-29  
**For**: Sprint 6 - Advanced UI & Finalization (100% Coverage)  
**By**: GitHub Copilot (Claude Sonnet 4.5)
