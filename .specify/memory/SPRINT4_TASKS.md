# Sprint 4 - BackOffice Essentials & Storybook Branding - Tasks

**Feature**: Design System Sprint 4  
**Version**: 1.0.0  
**Created**: 2025-11-29  
**Reference**: `.specify/memory/SPRINT4_PLANNING.md`

---

## 📋 Overview

**Total Tasks**: 150  
**Estimated Time**: 37 hours (2 weeks)  
**Components**: 6 + Storybook UI Customization  
**Target Completion**: 29/44 components (66%)

---

## Phase 1: Setup & Prerequisites

**Goal**: Preparar ambiente e documentação para Sprint 4

### Tasks

- [ ] T001 Verificar Node.js 22.21.1 e pnpm 9.14.4+ instalados
- [ ] T002 Criar branch `sprint4/backoffice-essentials` a partir de `main`
- [ ] T003 Executar build baseline: `pnpm build:tokens && pnpm build:design-system`
- [ ] T004 Verificar Storybook inicia sem erros: `pnpm dev:storybook`
- [ ] T005 Revisar documentação: SPRINT4_PLANNING.md, STORYBOOK_CUSTOMIZATION_CHECKLIST.md
- [ ] T006 Criar 7 issues no GitHub (1 por componente + 1 Storybook UI)

---

## Phase 2: Component 1 - Alerts (4h)

**User Story**: [US1] Como desenvolvedor, preciso de um componente Alert para exibir feedback visual ao usuário

**Figma**: node-id=6586-46832  
**Tier**: 2 (≥90% fidelidade)

### Implementation Tasks

- [ ] T007 [P] [US1] Criar estrutura: `packages/design-system/src/components/Alert/`
- [ ] T008 [US1] Criar interface TypeScript `AlertProps` em `Alert.tsx`
  - Props: variant (success/warning/error/info), closable, icon, action, outlined
- [ ] T009 [US1] Implementar componente Alert com React.forwardRef em `Alert.tsx`
- [ ] T010 [P] [US1] Criar CSS Module `Alert.module.css` com variantes (success, warning, error, info)
- [ ] T011 [P] [US1] Aplicar tokens: colors-{success/warning/error}-500, borderRadius-md, spacing-3
- [ ] T012 [US1] Implementar estados: default, with-icon, with-close, with-action, outlined
- [ ] T013 [P] [US1] Exportar Alert em `packages/design-system/src/index.ts`

### Storybook Tasks

- [ ] T014 [P] [US1] Criar `domains/storybook/src/stories/Feedback/Alert.stories.tsx`
- [ ] T015 [US1] Implementar story Success variant
- [ ] T016 [US1] Implementar story Warning variant
- [ ] T017 [US1] Implementar story Error variant
- [ ] T018 [US1] Implementar story Info variant
- [ ] T019 [US1] Implementar story With Close Button
- [ ] T020 [US1] Implementar story With Action Button
- [ ] T021 [US1] Implementar story Outlined variant
- [ ] T022 [US1] Adicionar args controls (variant, closable, icon, action, outlined)

### Validation Tasks

- [ ] T023 [US1] Build design-system: `pnpm --filter @prototipo/design-system build`
- [ ] T024 [US1] Executar validação Playwright: Alert fidelidade ≥90%
- [ ] T025 [US1] Capturar screenshot comparativo Figma vs Storybook
- [ ] T026 [US1] Verificar Montserrat aplicado em textos
- [ ] T027 [US1] Verificar colors tokens corretos (rgb values)
- [ ] T028 [US1] Verificar borderRadius 6px aplicado

### Integration Tasks

- [ ] T029 [US1] Registrar Alert em `domains/studio/src/config/puck.config.tsx`
- [ ] T030 [US1] Testar Alert no Puck editor (preview funcional)
- [ ] T031 [US1] Atualizar `figma-vuexy-reference.md`: Alerts ⏳ → ✅ Implementado (XX%)

**Independent Test**: Alert renderiza com 4 variantes (success/warning/error/info), fecha ao clicar X, executa ação ao clicar botão, mode outlined funciona.

---

## Phase 3: Component 2 - Badges (3h)

**User Story**: [US2] Como desenvolvedor, preciso de um componente Badge para exibir status e contadores

**Figma**: node-id=6586-47073  
**Tier**: 2 (≥90% fidelidade)

### Implementation Tasks

- [ ] T032 [P] [US2] Criar estrutura: `packages/design-system/src/components/Badge/`
- [ ] T033 [US2] Criar interface TypeScript `BadgeProps` em `Badge.tsx`
  - Props: variant, size, dot, icon, outlined, soft
- [ ] T034 [US2] Implementar componente Badge com React.forwardRef
- [ ] T035 [P] [US2] Criar CSS Module `Badge.module.css` com 6 variantes
- [ ] T036 [P] [US2] Aplicar tokens: borderRadius-sm ou full, spacing-1, typography-label-sm
- [ ] T037 [US2] Implementar estados: default, dot, with-icon, outlined, soft
- [ ] T038 [P] [US2] Exportar Badge em `packages/design-system/src/index.ts`

### Storybook Tasks

- [ ] T039 [P] [US2] Criar `domains/storybook/src/stories/DataDisplay/Badge.stories.tsx`
- [ ] T040 [US2] Implementar stories: Primary, Secondary, Success, Warning, Error, Neutral
- [ ] T041 [US2] Implementar story Dot variant
- [ ] T042 [US2] Implementar story With Icon
- [ ] T043 [US2] Implementar story Outlined
- [ ] T044 [US2] Implementar story Soft background

### Validation Tasks

- [ ] T045 [US2] Build e validação Playwright: Badge fidelidade ≥90%
- [ ] T046 [US2] Screenshot comparativo + verificação tokens
- [ ] T047 [US2] Registrar em puck.config.tsx
- [ ] T048 [US2] Atualizar figma-vuexy-reference.md

**Independent Test**: Badge renderiza 6 variantes de cor, dot mode funciona, outlined e soft backgrounds corretos.

---

## Phase 4: Component 3 - Chips (4h)

**User Story**: [US3] Como desenvolvedor, preciso de um componente Chip para filtros e tags deletáveis

**Figma**: node-id=6595-48177  
**Tier**: 2 (≥90% fidelidade)

### Implementation Tasks

- [ ] T049 [P] [US3] Criar estrutura: `packages/design-system/src/components/Chip/`
- [ ] T050 [US3] Criar interface TypeScript `ChipProps`
  - Props: variant, avatar, icon, deletable, onDelete, outlined
- [ ] T051 [US3] Implementar componente Chip com estados interativos (hover, active)
- [ ] T052 [P] [US3] Criar CSS Module com hover/active/disabled states
- [ ] T053 [P] [US3] Aplicar tokens: borderRadius-full ou md, spacing-2
- [ ] T054 [US3] Implementar delete handler (onDelete callback)
- [ ] T055 [P] [US3] Exportar Chip

### Storybook Tasks

- [ ] T056 [P] [US3] Criar stories: Default, Outlined, With Avatar, With Icon, Deletable
- [ ] T057 [US3] Demonstrar estados: hover, active, disabled

### Validation & Integration

- [ ] T058 [US3] Build, validação Playwright ≥90%, screenshot
- [ ] T059 [US3] Registrar em puck.config.tsx
- [ ] T060 [US3] Atualizar documentação

**Independent Test**: Chip deleta ao clicar X, avatar e icon renderizam, outlined variant correto, disabled state não clicável.

---

## Phase 5: Component 4 - Avatars (5h)

**User Story**: [US4] Como desenvolvedor, preciso de componentes Avatar para representação de usuários

**Figma**: node-id=6586-47137  
**Tier**: 2 (≥90% fidelidade)

### Implementation Tasks

- [ ] T061 [P] [US4] Criar estrutura: `packages/design-system/src/components/Avatar/`
- [ ] T062 [US4] Criar interfaces `AvatarProps` e `AvatarGroupProps`
  - Props Avatar: src, alt, size, initials, icon, status, badge
  - Props AvatarGroup: max, size, avatars
- [ ] T063 [US4] Implementar Avatar.tsx com fallback (image → initials → icon)
- [ ] T064 [US4] Implementar AvatarGroup.tsx com overlap e +N indicator
- [ ] T065 [P] [US4] Criar CSS Module com 5 tamanhos (xs/sm/md/lg/xl)
- [ ] T066 [P] [US4] Aplicar tokens: borderRadius-full, primary-600 (fallback bg)
- [ ] T067 [US4] Implementar status indicator (online/offline/away/busy)
- [ ] T068 [P] [US4] Exportar Avatar e AvatarGroup

### Storybook Tasks

- [ ] T069 [P] [US4] Criar stories: Image, Initials, Icon, Group, Sizes (xs-xl)
- [ ] T070 [US4] Implementar story With Status (online/offline/away/busy)
- [ ] T071 [US4] Implementar story With Badge (notification counter)

### Validation & Integration

- [ ] T072 [US4] Build, validação Playwright ≥90%, screenshot
- [ ] T073 [US4] Registrar em puck.config.tsx
- [ ] T074 [US4] Atualizar documentação

**Independent Test**: Avatar carrega image, fallback para initials/icon, grupo mostra overlap +N, status indicators corretos.

---

## Phase 6: Component 5 - Stats Cards (6h)

**User Story**: [US5] Como desenvolvedor, preciso de Stats Cards para exibir métricas de dashboard

**Figma**: node-id=150-138964  
**Tier**: 1 (≥95% fidelidade) - Componente crítico

### Implementation Tasks

- [ ] T075 [P] [US5] Criar estrutura: `packages/design-system/src/components/StatsCard/`
- [ ] T076 [US5] Criar interface `StatsCardProps`
  - Props: title, value, trend, trendDirection, icon, chart, subtitle
- [ ] T077 [US5] Implementar StatsCard.tsx com layout flex
- [ ] T078 [P] [US5] Criar CSS Module com variantes (simple, with-trend, with-chart)
- [ ] T079 [P] [US5] Aplicar tokens: borderRadius-md, shadows-md, spacing-4
- [ ] T080 [US5] Implementar trend indicator (arrow up/down + percentage)
- [ ] T081 [US5] Integrar mini chart (opcional, pode usar biblioteca externa ou placeholder)
- [ ] T082 [P] [US5] Exportar StatsCard

### Storybook Tasks

- [ ] T083 [P] [US5] Criar stories: Simple, With Trend (up/down), With Icon, With Chart
- [ ] T084 [US5] Implementar story With Comparison (current vs previous)

### Validation & Integration

- [ ] T085 [US5] Build, validação Playwright ≥95% (Tier 1), screenshot
- [ ] T086 [US5] Registrar em puck.config.tsx
- [ ] T087 [US5] Atualizar documentação

**Independent Test**: StatsCard exibe título, valor, trend up/down com cor correta (green/red), icon renderiza, chart placeholder funciona.

---

## Phase 7: Component 6 - Menu/Dropdown (7h)

**User Story**: [US6] Como desenvolvedor, preciso de Menu/Dropdown para navegação contextual

**Figma**: node-id=7232-42750  
**Tier**: 2 (≥90% fidelidade)

### Implementation Tasks

- [ ] T088 [P] [US6] Criar estrutura: `packages/design-system/src/components/Dropdown/`
- [ ] T089 [US6] Criar interfaces `DropdownProps`, `DropdownMenuProps`, `DropdownItemProps`
- [ ] T090 [US6] Implementar Dropdown.tsx (container + trigger)
- [ ] T091 [US6] Implementar DropdownMenu.tsx (posicionamento + portal)
- [ ] T092 [US6] Implementar DropdownItem.tsx (item + divider + submenu support)
- [ ] T093 [P] [US6] Criar CSS Module com estados (hover, active, disabled)
- [ ] T094 [P] [US6] Aplicar tokens: borderRadius-md, shadows-lg, spacing-2
- [ ] T095 [US6] Implementar keyboard navigation (arrow keys, Enter, Escape)
- [ ] T096 [US6] Implementar submenu nested (opcional)
- [ ] T097 [P] [US6] Exportar Dropdown, DropdownMenu, DropdownItem

### Storybook Tasks

- [ ] T098 [P] [US6] Criar stories: Simple Menu, With Icons, With Dividers, With Shortcuts
- [ ] T099 [US6] Implementar story Nested Submenu (se implementado)

### Validation & Integration

- [ ] T100 [US6] Build, validação Playwright ≥90%, screenshot
- [ ] T101 [US6] Testar keyboard navigation (arrow, Enter, Escape)
- [ ] T102 [US6] Registrar em puck.config.tsx
- [ ] T103 [US6] Atualizar documentação

**Independent Test**: Dropdown abre ao clicar trigger, fecha ao clicar fora, keyboard navigation funciona, dividers separam grupos, submenu expande (se implementado).

---

## Phase 8: Storybook UI Customization (8h)

**User Story**: [US7] Como equipe, precisamos do Storybook brandado com identidade EDUCACROSS

**Reference**: `.specify/memory/STORYBOOK_CUSTOMIZATION_CHECKLIST.md`

### Task 8.1: Manager Theme (2h)

- [ ] T104 [P] [US7] Criar `domains/storybook/.storybook/manager.ts`
- [ ] T105 [US7] Importar `addons` e `create` do Storybook
- [ ] T106 [US7] Configurar tema EDUCACROSS: brandTitle, brandImage, colors
- [ ] T107 [US7] Aplicar primary color #5f4de5, Montserrat font, borderRadius 6px
- [ ] T108 [US7] Configurar `addons.setConfig()` com tema e sidebar settings
- [ ] T109 [US7] Validar: Logo aparece, primary color aplicada, Montserrat carregada

### Task 8.2: Manager Head (1h)

- [ ] T110 [P] [US7] Criar `domains/storybook/.storybook/manager-head.html`
- [ ] T111 [US7] Adicionar favicon: `<link rel="icon" href="/branding/logo-educacross.svg" />`
- [ ] T112 [US7] Preload Montserrat Google Fonts
- [ ] T113 [US7] Adicionar CSS custom (gradiente sidebar, logo sizing)
- [ ] T114 [US7] Validar: Favicon na aba, Montserrat preloaded, gradiente aplicado

### Task 8.3: Preview Configuration (2h)

- [ ] T115 [P] [US7] Editar `domains/storybook/.storybook/preview.ts`
- [ ] T116 [US7] Configurar `parameters.backgrounds` (educacross-light/dark/white/primary)
- [ ] T117 [US7] Configurar `parameters.options.storySort` com ordem lógica
  - Order: Introduction, Design Tokens, Core, Forms, Data, Navigation, Dashboard, Feedback, Layout
- [ ] T118 [P] [US7] Criar `domains/storybook/src/styles/storybook-globals.css`
- [ ] T119 [US7] Adicionar estilos: Montserrat body, font-smoothing, code font, .sb-show-main bg
- [ ] T120 [US7] Importar tokens.css e storybook-globals.css no preview.ts
- [ ] T121 [US7] Validar: Backgrounds no toolbar, ordem correta, Montserrat aplicada

### Task 8.4: Introduction Page (2h)

- [ ] T122 [P] [US7] Criar `domains/storybook/src/stories/Introduction.mdx`
- [ ] T123 [US7] Adicionar `<Meta title="Introduction" />`
- [ ] T124 [US7] Estruturar conteúdo:
  - Header com logo EDUCACROSS
  - Título: "EDUCACROSS Design System"
  - Seção: Princípios de Design (Consistência, Acessibilidade, Performance)
  - Seção: Como Usar (instalação, import, tokens)
  - Seção: Status de Implementação (métricas Sprint 4: 29/44 = 66%)
  - Seção: Links Úteis (Figma, GitHub, Constitution)
  - Footer: Equipe e versão
- [ ] T125 [US7] Aplicar inline styles (Montserrat, cores DS, spacing)
- [ ] T126 [US7] Adicionar code blocks (bash instalação, tsx import, css tokens)
- [ ] T127 [US7] Validar: Story "Introduction" no topo, logo renderiza, links funcionam

### Task 8.5: Favicon Creation (1h)

- [ ] T128 [P] [US7] Copiar logo como favicon: `cp logo-educacross.svg favicon.svg`
- [ ] T129 [US7] Ou converter SVG para ICO (32x32, 64x64) usando ferramenta online
- [ ] T130 [US7] Salvar em `domains/storybook/public/branding/favicon.*`
- [ ] T131 [US7] Atualizar manager-head.html para usar favicon correto
- [ ] T132 [US7] Validar: Favicon visível em Chrome, Firefox, Safari

### Validation End-to-End (incluído nas 8h)

- [ ] T133 [US7] Build Storybook: `pnpm build:storybook` sem erros
- [ ] T134 [US7] Capturar 5 screenshots: sidebar brandado, Introduction page, favicon, backgrounds toolbar, story order
- [ ] T135 [US7] Verificar console limpo (sem errors/warnings)
- [ ] T136 [US7] Atualizar `figma-vuexy-reference.md`: Storybook UI ⏳ → ✅ Implementado

**Independent Test**: Storybook abre com logo EDUCACROSS no header, favicon customizado na aba, Introduction como primeira story, backgrounds EDUCACROSS disponíveis, ordenação lógica de componentes.

---

## Phase 9: Final Integration & Documentation (incluído nas estimativas)

**Goal**: Consolidar entregáveis e preparar PR

### Tasks

- [ ] T137 [P] Executar build completo: `pnpm build`
- [ ] T138 [P] Executar lint: `pnpm lint` (zero warnings)
- [ ] T139 [P] Executar type-check: `pnpm -r type-check`
- [ ] T140 Validar todos os 6 componentes no Storybook
- [ ] T141 Validar customização Storybook completa
- [ ] T142 Capturar screenshots finais (6 componentes + 5 UI)
- [ ] T143 Gerar relatório Playwright consolidado (6 componentes)
- [ ] T144 Atualizar `SPRINT4_PLANNING.md` com tempo real gasto
- [ ] T145 Criar entry no CHANGELOG.md com todas mudanças
- [ ] T146 Commitar todas mudanças com mensagem descritiva
- [ ] T147 Criar PR: "feat(sprint4): implement 6 BackOffice components + Storybook branding"
- [ ] T148 Anexar evidências (screenshots, relatórios Playwright, métricas)
- [ ] T149 Solicitar code review
- [ ] T150 Merge após aprovação

---

## 🎯 Task Dependency Graph

### Completion Order

**Week 1**:
1. Phase 1: Setup (T001-T006) → **Blocking all others**
2. Phase 2: Alerts (T007-T031) → Independent
3. Phase 3: Badges (T032-T048) → Independent
4. Phase 4: Chips (T049-T060) → Independent
5. Phase 8.1-8.2: Manager Theme + Head (T104-T114) → Independent

**Week 2**:
6. Phase 5: Avatars (T061-T074) → Independent
7. Phase 6: Stats Cards (T075-T087) → Independent
8. Phase 7: Menu/Dropdown (T088-T103) → Independent
9. Phase 8.3-8.5: Preview + Intro + Favicon (T115-T136) → Depends on T104-T114
10. Phase 9: Final Integration (T137-T150) → **Depends on all above**

### Parallelization Opportunities

**Week 1 Parallel Batches**:
- Batch A: T007-T031 (Alerts) + T032-T048 (Badges) + T104-T114 (Manager Theme)
- Batch B: T049-T060 (Chips)

**Week 2 Parallel Batches**:
- Batch C: T061-T074 (Avatars) + T075-T087 (Stats Cards) + T115-T127 (Preview + Intro)
- Batch D: T088-T103 (Menu/Dropdown) + T128-T136 (Favicon + Validation)

---

## 📊 Progress Tracking

### Component Status

| Component | Tasks | Status | Fidelity | Evidence |
|-----------|-------|--------|----------|----------|
| Alerts | T007-T031 (25) | ⏳ | - | - |
| Badges | T032-T048 (17) | ⏳ | - | - |
| Chips | T049-T060 (12) | ⏳ | - | - |
| Avatars | T061-T074 (14) | ⏳ | - | - |
| Stats Cards | T075-T087 (13) | ⏳ | - | - |
| Menu/Dropdown | T088-T103 (16) | ⏳ | - | - |
| Storybook UI | T104-T136 (33) | ⏳ | - | - |

**Total**: 150 tasks | **Completed**: 0/150 (0%)

---

## 🔗 References

- **Planning**: `.specify/memory/SPRINT4_PLANNING.md`
- **Storybook Checklist**: `.specify/memory/STORYBOOK_CUSTOMIZATION_CHECKLIST.md`
- **Figma Reference**: `.specify/memory/figma-vuexy-reference.md`
- **Constitution**: `.specify/memory/constitution.md` (v1.1.0)
- **Validation Checklist**: `.specify/memory/figma-validation-checklist.md`

---

**Generated**: 2025-11-29  
**For**: Sprint 4 - BackOffice Essentials  
**By**: GitHub Copilot (Claude Sonnet 4.5)
