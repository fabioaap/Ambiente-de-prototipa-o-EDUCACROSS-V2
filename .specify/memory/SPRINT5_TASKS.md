# Sprint 5 - Forms & Data Display - Tasks

**Feature**: Design System Sprint 5  
**Version**: 1.0.0  
**Created**: 2025-11-29  
**Reference**: `.specify/memory/figma-vuexy-reference.md`

---

## 📋 Overview

**Total Tasks**: 98  
**Estimated Time**: 32 hours (2 weeks)  
**Components**: 8  
**Target Completion**: 37/44 components (84%)

---

## Phase 1: Setup & Prerequisites

**Goal**: Preparar ambiente para Sprint 5

### Tasks

- [ ] T001 Verificar Sprint 4 completo: 29/44 componentes (66%)
- [ ] T002 Criar branch `sprint5/forms-data-display` a partir de `main`
- [ ] T003 Executar build baseline: `pnpm build`
- [ ] T004 Revisar roadmap: 8 componentes (Sliders, DatePickers, Lists, Accordion, Timeline, TreeView, Tooltips, Popovers)
- [ ] T005 Criar 8 issues no GitHub

---

## Phase 2: Component 1 - Sliders (4h)

**User Story**: [US1] Como desenvolvedor, preciso de Sliders para inputs numéricos interativos

**Figma**: node-id=6574-50653  
**Tier**: 2 (≥90% fidelidade)

### Implementation Tasks

- [ ] T006 [P] [US1] Criar estrutura: `packages/design-system/src/components/Slider/`
- [ ] T007 [US1] Criar interface `SliderProps`: value, min, max, step, marks, range, disabled
- [ ] T008 [US1] Implementar Slider.tsx com controlled/uncontrolled states
- [ ] T009 [P] [US1] Criar CSS Module com track, thumb, marks styling
- [ ] T010 [P] [US1] Aplicar tokens: primary-600, spacing-2, borderRadius-full (thumb)
- [ ] T011 [US1] Implementar range slider (two thumbs)
- [ ] T012 [US1] Implementar marks/labels positioning
- [ ] T013 [P] [US1] Exportar Slider

### Storybook & Validation

- [ ] T014 [P] [US1] Criar stories: Default, With Marks, Range, Disabled
- [ ] T015 [US1] Build, validação Playwright ≥90%, screenshot
- [ ] T016 [US1] Registrar em puck.config.tsx
- [ ] T017 [US1] Atualizar documentação

**Independent Test**: Slider move suavemente, marks aparecem em posições corretas, range com dois thumbs funciona, disabled não interagível.

---

## Phase 3: Component 2 - Date Pickers (5h)

**User Story**: [US2] Como desenvolvedor, preciso de Date Pickers para seleção de datas

**Figma**: node-id=7523-57639  
**Tier**: 2 (≥90% fidelidade)

### Implementation Tasks

- [ ] T018 [P] [US2] Criar estrutura: `packages/design-system/src/components/DatePicker/`
- [ ] T019 [US2] Criar interface `DatePickerProps`: value, onChange, format, minDate, maxDate, disabled
- [ ] T020 [US2] Implementar DatePicker.tsx com input + calendar dropdown
- [ ] T021 [US2] Implementar Calendar.tsx (grid de dias)
- [ ] T022 [P] [US2] Criar CSS Module com calendar grid, selected/hover states
- [ ] T023 [P] [US2] Aplicar tokens: primary-600 (selected), borderRadius-md, shadows-lg
- [ ] T024 [US2] Implementar navegação mês/ano (prev/next buttons)
- [ ] T025 [US2] Implementar date range picker (optional)
- [ ] T026 [P] [US2] Exportar DatePicker

### Storybook & Validation

- [ ] T027 [P] [US2] Criar stories: Default, With Min/Max, Range, Disabled
- [ ] T028 [US2] Build, validação Playwright ≥90%, screenshot
- [ ] T029 [US2] Registrar em puck.config.tsx
- [ ] T030 [US2] Atualizar documentação

**Independent Test**: Calendário abre ao clicar input, data selecionada destaca, navegação mês funciona, minDate/maxDate desabilita datas inválidas.

---

## Phase 4: Component 3 - Lists (3h)

**User Story**: [US3] Como desenvolvedor, preciso de Lists para exibir coleções de dados

**Figma**: node-id=131-120107  
**Tier**: 2 (≥90% fidelidade)

### Implementation Tasks

- [ ] T031 [P] [US3] Criar estrutura: `packages/design-system/src/components/List/`
- [ ] T032 [US3] Criar interfaces `ListProps`, `ListItemProps`
- [ ] T033 [US3] Implementar List.tsx e ListItem.tsx
- [ ] T034 [P] [US3] Criar CSS Module com dividers, hover states
- [ ] T035 [P] [US3] Aplicar tokens: spacing-3, neutral-200 (divider)
- [ ] T036 [US3] Implementar ListItem com avatar, icon, secondary text
- [ ] T037 [P] [US3] Exportar List, ListItem

### Storybook & Validation

- [ ] T038 [P] [US3] Criar stories: Default, With Avatars, With Icons, With Secondary Text
- [ ] T039 [US3] Build, validação Playwright ≥90%, screenshot
- [ ] T040 [US3] Registrar em puck.config.tsx
- [ ] T041 [US3] Atualizar documentação

**Independent Test**: Lista renderiza itens, dividers separam, avatar/icon posicionados corretamente, secondary text aparece abaixo do título.

---

## Phase 5: Component 4 - Accordion (4h)

**User Story**: [US4] Como desenvolvedor, preciso de Accordion para conteúdo expansível/colapsável

**Figma**: node-id=327-74886  
**Tier**: 2 (≥90% fidelidade)

### Implementation Tasks

- [ ] T042 [P] [US4] Criar estrutura: `packages/design-system/src/components/Accordion/`
- [ ] T043 [US4] Criar interfaces `AccordionProps`, `AccordionItemProps`
- [ ] T044 [US4] Implementar Accordion.tsx (container) e AccordionItem.tsx
- [ ] T045 [P] [US4] Criar CSS Module com expand/collapse animation
- [ ] T046 [P] [US4] Aplicar tokens: borderRadius-md, spacing-4, neutral-200 (border)
- [ ] T047 [US4] Implementar controlled expansion (multiple ou single)
- [ ] T048 [US4] Implementar icon rotation animation (chevron down → up)
- [ ] T049 [P] [US4] Exportar Accordion, AccordionItem

### Storybook & Validation

- [ ] T050 [P] [US4] Criar stories: Single Expansion, Multiple Expansion, Default Expanded
- [ ] T051 [US4] Build, validação Playwright ≥90%, screenshot
- [ ] T052 [US4] Registrar em puck.config.tsx
- [ ] T053 [US4] Atualizar documentação

**Independent Test**: Accordion expande ao clicar, colapsa outros itens (single mode), múltiplos abertos (multiple mode), animação suave.

---

## Phase 6: Component 5 - Timeline (4h)

**User Story**: [US5] Como desenvolvedor, preciso de Timeline para exibir eventos cronológicos

**Figma**: node-id=327-74885  
**Tier**: 2 (≥90% fidelidade)

### Implementation Tasks

- [ ] T054 [P] [US5] Criar estrutura: `packages/design-system/src/components/Timeline/`
- [ ] T055 [US5] Criar interfaces `TimelineProps`, `TimelineItemProps`
- [ ] T056 [US5] Implementar Timeline.tsx e TimelineItem.tsx
- [ ] T057 [P] [US5] Criar CSS Module com vertical line, dots, content positioning
- [ ] T058 [P] [US5] Aplicar tokens: primary-600 (line/dot), spacing-4
- [ ] T059 [US5] Implementar variantes: left-aligned, right-aligned, alternating
- [ ] T060 [US5] Implementar TimelineItem com icon, timestamp, description
- [ ] T061 [P] [US5] Exportar Timeline, TimelineItem

### Storybook & Validation

- [ ] T062 [P] [US5] Criar stories: Left-aligned, Right-aligned, Alternating, With Icons
- [ ] T063 [US5] Build, validação Playwright ≥90%, screenshot
- [ ] T064 [US5] Registrar em puck.config.tsx
- [ ] T065 [US5] Atualizar documentação

**Independent Test**: Linha vertical conecta itens, dots/icons aparecem no tempo correto, alternating layout funciona, timestamps alinhados.

---

## Phase 7: Component 6 - Tree View (5h)

**User Story**: [US6] Como desenvolvedor, preciso de Tree View para dados hierárquicos

**Figma**: node-id=327-74884  
**Tier**: 3 (≥85% fidelidade) - Complexidade hierárquica

### Implementation Tasks

- [ ] T066 [P] [US6] Criar estrutura: `packages/design-system/src/components/TreeView/`
- [ ] T067 [US6] Criar interfaces `TreeViewProps`, `TreeNodeProps` (recursivo)
- [ ] T068 [US6] Implementar TreeView.tsx e TreeNode.tsx (componente recursivo)
- [ ] T069 [P] [US6] Criar CSS Module com indentation, expand/collapse icons
- [ ] T070 [P] [US6] Aplicar tokens: spacing-2 (indent), primary-600 (selected)
- [ ] T071 [US6] Implementar expand/collapse logic (controlled/uncontrolled)
- [ ] T072 [US6] Implementar selection (single/multiple)
- [ ] T073 [US6] Implementar keyboard navigation (arrow keys, Enter)
- [ ] T074 [P] [US6] Exportar TreeView, TreeNode

### Storybook & Validation

- [ ] T075 [P] [US6] Criar stories: Default, With Icons, Controlled Expansion, Selectable
- [ ] T076 [US6] Build, validação Playwright ≥85%, screenshot
- [ ] T077 [US6] Testar keyboard navigation
- [ ] T078 [US6] Registrar em puck.config.tsx
- [ ] T079 [US6] Atualizar documentação

**Independent Test**: Nós expandem/colapsam recursivamente, indentation visual correto, seleção funciona, keyboard navigation navega hierarquia.

---

## Phase 8: Component 7 - Tooltips (3h)

**User Story**: [US7] Como desenvolvedor, preciso de Tooltips para exibir dicas contextuais

**Figma**: node-id=309-34632  
**Tier**: 2 (≥90% fidelidade)

### Implementation Tasks

- [ ] T080 [P] [US7] Criar estrutura: `packages/design-system/src/components/Tooltip/`
- [ ] T081 [US7] Criar interface `TooltipProps`: content, placement, trigger, delay
- [ ] T082 [US7] Implementar Tooltip.tsx com positioning logic (Popper.js ou similar)
- [ ] T083 [P] [US7] Criar CSS Module com arrow, positioning
- [ ] T084 [P] [US7] Aplicar tokens: neutral-900 (background), shadows-md, borderRadius-sm
- [ ] T085 [US7] Implementar placements: top, bottom, left, right
- [ ] T086 [US7] Implementar triggers: hover, click, focus
- [ ] T087 [P] [US7] Exportar Tooltip

### Storybook & Validation

- [ ] T088 [P] [US7] Criar stories: Top, Bottom, Left, Right, Click Trigger, Long Content
- [ ] T089 [US7] Build, validação Playwright ≥90%, screenshot
- [ ] T090 [US7] Registrar em puck.config.tsx
- [ ] T091 [US7] Atualizar documentação

**Independent Test**: Tooltip aparece ao hover/click, posiciona corretamente (top/bottom/left/right), arrow aponta para elemento, desaparece ao sair.

---

## Phase 9: Component 8 - Popovers (4h)

**User Story**: [US8] Como desenvolvedor, preciso de Popovers para conteúdo contextual rico

**Figma**: node-id=765-80503  
**Tier**: 2 (≥90% fidelidade)

### Implementation Tasks

- [ ] T092 [P] [US8] Criar estrutura: `packages/design-system/src/components/Popover/`
- [ ] T093 [US8] Criar interface `PopoverProps`: content, placement, trigger, closeOnOutsideClick
- [ ] T094 [US8] Implementar Popover.tsx com portal e positioning
- [ ] T095 [P] [US8] Criar CSS Module com styling para conteúdo rico (header, body, footer)
- [ ] T096 [P] [US8] Aplicar tokens: white (background), shadows-lg, borderRadius-md
- [ ] T097 [US8] Implementar close on outside click
- [ ] T098 [US8] Implementar PopoverHeader, PopoverBody, PopoverFooter (subcomponents)
- [ ] T099 [P] [US8] Exportar Popover, PopoverHeader, PopoverBody, PopoverFooter

### Storybook & Validation

- [ ] T100 [P] [US8] Criar stories: Default, With Header/Footer, Form Inside, Action Buttons
- [ ] T101 [US8] Build, validação Playwright ≥90%, screenshot
- [ ] T102 [US8] Registrar em puck.config.tsx
- [ ] T103 [US8] Atualizar documentação

**Independent Test**: Popover abre ao clicar trigger, fecha ao clicar fora, header/footer separados visualmente, conteúdo rico renderiza (forms, buttons).

---

## Phase 10: Final Integration & Documentation

**Goal**: Consolidar Sprint 5 e preparar PR

### Tasks

- [ ] T104 [P] Executar build completo: `pnpm build`
- [ ] T105 [P] Executar lint: `pnpm lint`
- [ ] T106 [P] Executar type-check: `pnpm -r type-check`
- [ ] T107 Validar todos os 8 componentes no Storybook
- [ ] T108 Capturar screenshots (8 componentes)
- [ ] T109 Gerar relatório Playwright consolidado
- [ ] T110 Atualizar `figma-vuexy-reference.md`: 37/44 (84%)
- [ ] T111 Criar entry no CHANGELOG.md
- [ ] T112 Commitar e criar PR: "feat(sprint5): implement 8 forms & data display components"
- [ ] T113 Anexar evidências
- [ ] T114 Merge após aprovação

---

## 🎯 Task Dependency Graph

### Week 1
- Phase 1: Setup (T001-T005)
- Parallel Batch A: Sliders (T006-T017) + DatePickers (T018-T030) + Lists (T031-T041)

### Week 2
- Parallel Batch B: Accordion (T042-T053) + Timeline (T054-T065)
- Parallel Batch C: TreeView (T066-T079) + Tooltips (T080-T091) + Popovers (T092-T103)
- Phase 10: Integration (T104-T114)

---

## 📊 Progress Tracking

| Component | Tasks | Status | Fidelity | Evidence |
|-----------|-------|--------|----------|----------|
| Sliders | T006-T017 (12) | ⏳ | - | - |
| DatePickers | T018-T030 (13) | ⏳ | - | - |
| Lists | T031-T041 (11) | ⏳ | - | - |
| Accordion | T042-T053 (12) | ⏳ | - | - |
| Timeline | T054-T065 (12) | ⏳ | - | - |
| TreeView | T066-T079 (14) | ⏳ | - | - |
| Tooltips | T080-T091 (12) | ⏳ | - | - |
| Popovers | T092-T103 (12) | ⏳ | - | - |

**Total**: 98 tasks | **Completed**: 0/98 (0%)

---

## 🔗 References

- **Figma Reference**: `.specify/memory/figma-vuexy-reference.md`
- **Sprint 4 Tasks**: `.specify/memory/SPRINT4_TASKS.md`
- **Constitution**: `.specify/memory/constitution.md` (v1.1.0)

---

**Generated**: 2025-11-29  
**For**: Sprint 5 - Forms & Data Display  
**By**: GitHub Copilot (Claude Sonnet 4.5)
