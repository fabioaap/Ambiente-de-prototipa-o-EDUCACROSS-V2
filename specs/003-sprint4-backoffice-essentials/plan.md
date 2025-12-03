# Implementation Plan: Sprint 4 - BackOffice Essentials & Storybook Branding

**Branch**: `feature/sprint4-backoffice-essentials` | **Date**: 2025-12-03 | **Spec**: [spec.md](./spec.md)  
**Input**: Sprint 4 planning from `.specify/memory/SPRINT4_PLANNING.md` + constitution v1.0.0

## Summary

Implementar 6 novos componentes BackOffice (Alerts, Badges, Chips, Avatars, Stats Cards, Menu/Dropdown) + customização completa do Storybook UI com identidade EDUCACROSS. Objetivo: atingir 29/44 componentes (66% do Design System) mantendo fidelidade ≥92% ao Figma Vuexy. Technical approach: componentes React com CSS Modules, tokens Vuexy, stories acessíveis (WCAG 2.1 AA), e branding Storybook (manager theme, favicon, introduction page).

## Technical Context

**Language/Version**: TypeScript 5.x (strict mode), Node.js 22.21.1, React 18  
**Primary Dependencies**: 
- React 18 (UI components, forwardRef, Profiler)
- CSS Modules (scoped styling via tsup)
- @storybook/react 8.x (component catalog)
- Radix UI Dropdown Menu v2.1.x (acessibilidade + Floating UI interno para posicionamento/colisão) - **NEW**

**Storage**: Local storage (Puck pages persistence) + static JSON mocks (dashboard data)  
**Testing**: Manual validation via Storybook + Playwright screenshots (fidelity comparison)  
**Target Platform**: Web (Chrome/Firefox/Safari), Next.js 15 App Router (SSR/RSC compatible)  
**Project Type**: Monorepo workspace with packages (design-system, tokens) + domains (storybook, studio)  
**Performance Goals**: 
- Render inicial <500ms (components)
- Interactions <200ms (dropdown open, chip select)
- Build time ≤ baseline +10%
- Storybook build <3min

**Constraints**: 
- Fidelidade Figma ≥90% (Tier 2) ou ≥95% (Tier 1 para Stats Cards)
- WCAG 2.1 AA mínimo (focus rings, keyboard nav, ARIA labels)
- CSS Modules only (no Tailwind outside studio/dashboard)
- Tokens from `@prototipo/tokens` via CSS variables
- Build order: tokens → design-system → storybook

**Scale/Scope**: 
- 6 novos componentes + 1 tarefa de branding = 7 deliverables
- ~15-20 stories no Storybook (3-4 stories por componente)
- ~300 linhas de código por componente (média)
- Estimativa: 37 horas (~2 semanas)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.* Violations require entries in **Complexity Tracking**.

**Phase 1 Re-evaluation**: ✅ NO NEW VIOLATIONS (2025-12-03 post-design)

### 1. Run-Ready Prototypes Only

**Compliance**: ✅ YES (unchanged)

- **Build Order**: tokens → design-system (novos componentes) → storybook (stories + branding)
- **Affected Packages**: 
  - `packages/design-system` (6 novos componentes exportados via `index.ts`)
  - `domains/storybook` (15-20 stories + manager/preview config)
  - `packages/tokens` (nenhuma alteração esperada; tokens Vuexy já existem do Sprint 3)
- **Console-Error Mitigation**: 
  - Componentes com `'use client'` para evitar SSR mismatch
  - Dropdown usa `typeof window !== 'undefined'` para portal rendering
  - Stories com controles validados (no undefined props)
- **Pre-PR Checklist**: 
  - `pnpm build` (garantir tsup compila CSS Modules + tipos)
  - `pnpm lint` (ESLint + Prettier)
  - `pnpm -r type-check` (TypeScript strict em design-system e storybook)
  - `pnpm build:storybook` (sem erros de build)
  - Verificar console do Storybook em localhost:6006 (0 errors)

**Evidence Required**: Build logs anexados ao PR em `evidence/` (build.log, lint.txt, type-check.txt, storybook-screenshots/*.png, metrics.json) + screenshot do console limpo.

---

### 2. Single Design System Surface

**Compliance**: ✅ YES with EXCEPTION documented

- **Design System Primitives**: Todos os 6 componentes serão criados em `packages/design-system/src/components/` e exportados via `packages/design-system/src/index.ts`
- **Tokens Consumption**: Todos componentes usam CSS Modules com variáveis CSS (`var(--colors-primary-600)`, `var(--spacing-4)`, etc) de `@prototipo/tokens`
- **'use client' Boundaries**: Todos os 6 componentes incluem `'use client'` (React 18 client components)
- **Refs**: `Alert`, `Chip`, `Avatar`, `StatsCard` usam `React.forwardRef` para DOM access
- **JSDoc**: Props documentadas com `@param` descriptions
- **Stories**: Cada componente tem stories em `domains/storybook/src/stories/{category}/{Component}.stories.tsx`
- **Puck Registration**: Componentes interativos (Alert com close, Dropdown) registrados em `domains/studio/src/config/puck.config.tsx`

**EXCEPTION**: Menu/Dropdown usa Radix UI (`@radix-ui/react-dropdown-menu`) que não vem de `@prototipo/design-system`. 

**Justification**: Acessibilidade e keyboard navigation complexas (arrow keys, escape, focus trap) são difíceis de implementar do zero sem regredir WCAG AA. Radix UI é headless (sem estilos), então a aparência 100% vem do nosso CSS Module. Constitution permite exceções quando razoáveis.

**Mitigation**: Documentar dependência em `packages/design-system/package.json` e explicar no README do Dropdown que Radix é "implementação de acessibilidade", não "componente de terceiro".

---

### 3. Documented Journeys Stay Traceable

**Compliance**: ✅ YES

- **Impacted Journeys**: Nenhum journey específico modificado diretamente, MAS componentes novos serão usados em journeys futuros (BackOffice questões, FrontOffice onboarding)
- **Studio Slugs**: Nenhuma página Studio criada neste sprint (apenas componentes + stories)
- **Dashboards**: Nenhuma dashboard API/UI modificada (foco é Design System)
- **Sprint Indexes**: 
  - Atualizar `.specify/memory/figma-vuexy-reference.md` (marcar 6 componentes como ✅)
  - Atualizar `SPRINT3_DOCUMENTATION_INDEX.md` ou criar `SPRINT4_STATUS.md` com progresso
  - Nenhuma atualização em `domains/{domain}/journeys/` necessária (componentes reutilizáveis não são journeys)

**Evidence Required**: PR deve incluir update em `figma-vuexy-reference.md` marcando componentes como concluídos.

---

### 4. Typed APIs & Observable Dashboards

**Compliance**: N/A (NO API TOUCH)

- **Route Handlers**: Nenhum endpoint `/api/*` será criado ou modificado neste sprint
- **TypeScript Interfaces**: Apenas interfaces de props dos componentes (ex: `AlertProps`, `BadgeProps`, etc)
- **Health Metrics**: Não aplicável (foco em UI components, não APIs)
- **SWR/Client Code**: Não aplicável

**Rationale**: Sprint 4 é 100% focado em componentes front-end e branding Storybook; nenhuma integração com backend ou APIs.

---

### 5. Automation-First Quality Gates

**Compliance**: ✅ YES

- **SpecKit Templates**: 
  - `plan.md` (este arquivo) gerado via `/speckit.plan`
  - `spec.md` será criado após research (Phase 0)
  - `tasks.md` será gerado via `/speckit.tasks` após Phase 1
- **Constitution Check**: Presente nesta seção (re-check após Phase 1 design)
- **/spec Validation**: PR comment via SpecKit workflow (`.github/workflows/speckit-validation.yml`)
- **CI Steps**: 
  - `pnpm build` (tokens → design-system → storybook)
  - `pnpm lint` (ESLint + Prettier)
  - `pnpm -r type-check` (TypeScript strict)
  - `pnpm build:storybook` (validate stories compile)
- **Evidence**: Build logs, lint output, screenshots do Storybook anexados ao PR

**Manual Review Focus**: Fidelidade visual (Figma vs Storybook), acessibilidade (keyboard nav), usabilidade (controles funcionam).

---

## Project Structure

### Documentation (this feature)

```text
specs/003-sprint4-backoffice-essentials/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (dependencies, best practices)
├── data-model.md        # Phase 1 output (component interfaces)
├── quickstart.md        # Phase 1 output (developer setup)
├── contracts/           # Phase 1 output (component prop schemas)
│   ├── Alert.schema.json
│   ├── Badge.schema.json
│   ├── Chip.schema.json
│   ├── Avatar.schema.json
│   ├── StatsCard.schema.json
│   └── Dropdown.schema.json
└── tasks.md             # Phase 2 output (/speckit.tasks command)
```

### Source Code (repository root)

```text
packages/design-system/
├── src/
│   ├── components/
│   │   ├── Alert/
│   │   │   ├── Alert.tsx                 # NEW
│   │   │   ├── Alert.module.css          # NEW
│   │   │   └── index.ts                  # NEW
│   │   ├── Badge/
│   │   │   ├── Badge.tsx                 # UPDATED (expanded variants)
│   │   │   ├── Badge.module.css          # UPDATED
│   │   │   └── index.ts                  # EXISTING
│   │   ├── Chip/
│   │   │   ├── Chip.tsx                  # NEW
│   │   │   ├── Chip.module.css           # NEW
│   │   │   └── index.ts                  # NEW
│   │   ├── Avatar/
│   │   │   ├── Avatar.tsx                # NEW
│   │   │   ├── AvatarGroup.tsx           # NEW (bonus)
│   │   │   ├── Avatar.module.css         # NEW
│   │   │   └── index.ts                  # NEW
│   │   ├── StatsCard/
│   │   │   ├── StatsCard.tsx             # NEW
│   │   │   ├── StatsCard.module.css      # NEW
│   │   │   └── index.ts                  # NEW
│   │   └── Dropdown/
│   │       ├── Dropdown.tsx              # NEW (main component)
│   │       ├── DropdownMenu.tsx          # NEW (menu container)
│   │       ├── DropdownItem.tsx          # NEW (menu item)
│   │       ├── Dropdown.module.css       # NEW
│   │       └── index.ts                  # NEW
│   └── index.ts                          # UPDATED (export new components)
├── package.json                          # UPDATED (add @radix-ui/react-dropdown-menu)
└── tsup.config.ts                        # EXISTING (CSS Modules already configured)

domains/storybook/
├── .storybook/
│   ├── manager.ts                        # NEW (EDUCACROSS theme)
│   ├── manager-head.html                 # NEW (favicon + fonts)
│   ├── preview.ts                        # UPDATED (backgrounds, story order)
│   └── main.ts                           # EXISTING (no changes expected)
├── public/
│   └── branding/
│       ├── logo-educacross.svg           # NEW (or EXISTING if already present)
│       └── favicon.svg                   # NEW (or converted to .ico)
├── src/
│   ├── stories/
│   │   ├── Introduction.mdx              # NEW (welcome page)
│   │   ├── Feedback/
│   │   │   └── Alert.stories.tsx         # NEW
│   │   ├── DataDisplay/
│   │   │   ├── Badge.stories.tsx         # UPDATED (expanded variants)
│   │   │   ├── Chip.stories.tsx          # NEW
│   │   │   └── Avatar.stories.tsx        # NEW
│   │   ├── Dashboard/
│   │   │   └── StatsCard.stories.tsx     # NEW
│   │   └── Navigation/
│   │       └── Dropdown.stories.tsx      # NEW
│   └── styles/
│       └── storybook-globals.css         # NEW (Montserrat, global resets)
└── package.json                          # UPDATED (add Montserrat font if needed)

domains/studio/
└── src/
    └── config/
        └── puck.config.tsx               # UPDATED (register Alert, Dropdown)
```

**Structure Decision**: Monorepo workspace structure (existing). Novos componentes em `packages/design-system`, stories em `domains/storybook`, configuração Puck em `domains/studio`. Nenhuma pasta nova de alto nível criada. Storybook branding requer arquivos em `.storybook/` (manager, preview) e novos assets em `public/branding/`.

---

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Radix UI Dropdown (violates "Single Design System Surface") | Menu/Dropdown requer keyboard navigation complexa (arrow keys, Escape, focus trap), ARIA roles corretos (menu, menuitem, menuitemradio), e posicionamento inteligente (collision detection). Implementar do zero levaria 12-15h e risco alto de bugs de acessibilidade WCAG AA. | Alternativa 1 (HTML `<select>` nativo): Não suporta ícones, dividers, ou submenus; aparência não customizável. Alternativa 2 (implementação manual com `useEffect` + focus management): Complexidade alta, provável violação WCAG sem testes extensivos; estimativa 12h+ para atingir paridade com Radix. Radix UI é **headless** (0 CSS), então 100% da aparência vem do nosso CSS Module — é mais uma "lib de acessibilidade" do que "componente de terceiro". |

**Total violations**: 1 (justified)

---

## Phase 0: Research & Clarifications

**Status**: NOT STARTED (pending `research.md` generation)

**NEEDS CLARIFICATION items from Technical Context**:

1. **Popper.js dependency**: Radix UI Dropdown já inclui posicionamento interno? Ou precisamos adicionar Popper.js explicitamente para collision detection avançada?
   - Research: Verificar docs Radix UI Dropdown (`@radix-ui/react-dropdown-menu`) sobre posicionamento
   - Decision: Se Radix já resolve, não adicionar Popper; caso contrário, adicionar e documentar

2. **Montserrat font**: Storybook deve carregar via Google Fonts CDN ou self-hosted? Performance vs simplicity trade-off
   - Research: Best practices para fontes em Storybook (build time impact, GDPR considerations)
   - Decision: Escolher método e documentar em `manager-head.html`

3. **Favicon format**: SVG (moderno, escalável) ou ICO (legacy, compatibilidade)? Safari suporta SVG favicon?
   - Research: Browser support matrix para SVG favicons (caniuse.com)
   - Decision: SVG + fallback ICO, ou apenas ICO?

4. **Stats Cards mini chart**: Implementar com `<canvas>` (Chart.js), SVG puro, ou deixar como prop opcional (consumer escolhe)?
   - Research: Análise de bundle size (Chart.js ~50KB minified), alternativas leves (Recharts, Victory)
   - Decision: Se Chart.js for usado, documentar como peer dependency opcional; ou deixar chart como `children` slot

5. **Radix UI version**: Qual versão de `@radix-ui/react-dropdown-menu` é compatível com React 18 e Next.js 15 App Router?
   - Research: Verificar changelog Radix (RSC compatibility, treeshaking)
   - Decision: Pinnar versão estável (ex: `^2.0.0`) e documentar

**Output**: `research.md` com decisões, rationale, e alternativas consideradas.

---

## Phase 1: Design & Contracts

**Status**: NOT STARTED (pending Phase 0 completion)

**Deliverables**:

1. **data-model.md**: 
   - Interfaces TypeScript para props de cada componente (AlertProps, BadgeProps, ChipProps, AvatarProps, StatsCardProps, DropdownProps, DropdownItemProps)
   - Variants/sizes enums (ex: `AlertVariant = 'success' | 'warning' | 'error' | 'info'`)
   - State transitions (ex: Dropdown: closed → opening → open → closing → closed)

2. **contracts/*.schema.json**: 
   - JSON Schema para cada componente (validação de props em runtime se necessário)
   - Exemplo: `Alert.schema.json` com `{ variant: enum, message: string, onClose: function, icon: ReactNode }`

3. **quickstart.md**: 
   - Setup developer: `pnpm install`, `pnpm build:tokens`, `pnpm --filter @prototipo/design-system build`, `pnpm dev:storybook`
   - Exemplo de uso de cada componente
   - Troubleshooting (ex: "CSS Modules não carregam? Verificar tsup.config.ts")

4. **Agent context update**: 
   - Run `.specify/scripts/powershell/update-agent-context.ps1 -AgentType copilot` (ou equivalente bash)
   - Adicionar Radix UI e Popper.js (se aplicável) à lista de tecnologias conhecidas
   - Preservar manual additions entre markers

**Output**: Artifacts acima criados em `specs/003-sprint4-backoffice-essentials/`.

---

## Phase 2: Tasks Generation

**Status**: NOT STARTED (pending Phase 1 completion)

**Command**: `/speckit.tasks` (generates `tasks.md`)

**Expected Structure**:
- Setup phase (4-5 tasks): branch, dependencies, baseline build
- Alert component (10-12 tasks): interface, implementation, CSS, stories, validation
- Badge component (8-10 tasks): expand existing, add variants, stories
- Chip component (10-12 tasks): interface, implementation, CSS, stories, validation
- Avatar component (12-15 tasks): Avatar + AvatarGroup, sizing, status indicators, stories
- Stats Cards component (15-18 tasks): interface, trend logic, mini chart slot, stories
- Dropdown component (18-20 tasks): Radix integration, menu/item components, keyboard nav, stories
- Storybook branding (15-18 tasks): manager theme, favicon, introduction page, preview config
- Validation phase (8-10 tasks): screenshots, fidelity check, build logs, PR prep

**Total estimated tasks**: ~120-130 granular tasks

---

## Next Steps

1. **Research** (Phase 0): Generate `research.md` addressing all NEEDS CLARIFICATION items
2. **Design** (Phase 1): Generate `data-model.md`, `contracts/`, `quickstart.md`
3. **Tasks** (Phase 2): Generate `tasks.md` via `/speckit.tasks`
4. **Implementation**: Execute tasks in order, mark complete as progress
5. **Validation**: Screenshots, fidelity checks, `/spec` PR comment
6. **Merge**: After passing CI + manual review

---

**Prepared by**: SpecKit Plan Mode  
**Date**: 2025-12-03  
**Version**: 1.0.0  
**Branch**: `feature/sprint4-backoffice-essentials`
