# Feature Specification: Experience Hub Consolidation

**Feature Branch**: `001-experience-hub-consolidation`  
**Created**: 2025-11-26  
**Status**: Draft  
**Input**: Reestruturar Storybook/Dashboard para servir apenas jornadas em `domains/*`, eliminar CSS global conflitante e preparar hub dedicado para Shadcn.

## User Scenarios & Testing *(mandatory)*

<!--
  IMPORTANT: User stories should be PRIORITIZED as user journeys ordered by importance.
  Each user story/journey must be INDEPENDENTLY TESTABLE - meaning if you implement just ONE of them,
  you should still have a viable MVP (Minimum Viable Product) that delivers value.
  
  Assign priorities (P1, P2, P3, etc.) to each story, where P1 is the most critical.
  Think of each story as a standalone slice of functionality that can be:
  - Developed independently
  - Tested independently
  - Deployed independently
  - Demonstrated to users independently
-->

Each story cita explicitamente os diretórios `domains/{domain}/journeys/{journey}`, o slug do Studio (quando existir) e o dashboard/API tocado para manter o rastreio exigido.

### User Story 1 - Hub único serve todas as jornadas (Priority: P1)

Consolidar Storybook e dashboards em um único "Experience Hub" (ex.: `apps/experience-hub`) que referencia somente jornadas documentadas em `domains/BackOffice`, `domains/FrontOffice` e `domains/Game`, eliminando o Storybook paralelo que injeta CSS global no `/dashboard` atual.

**Why this priority**: Sem um hub centralizado os stakeholders não conseguem navegar entre journeys sem quebrar o Studio ou o dashboard; o CSS global atual interfere no `/dashboard` e bloqueia execuções de Sprint 3.

**Independent Test**: Rodar `pnpm dev:hub` (ou `pnpm dev:storybook` apontando para o novo caminho) e verificar que todas as stories/jornadas renderizam sem afetar `/dashboard` em `domains/studio`; executar `pnpm build` sem vazamento de CSS global.

**Acceptance Scenarios**:

1. **Given** o repositório atualizado, **When** executo `pnpm dev:storybook` no novo diretório, **Then** apenas componentes vinculados a `domains/*` aparecem e `/dashboard` continua estilizado corretamente.
2. **Given** `domains/BackOffice/journeys/Dashboard` e `domains/FrontOffice/journeys/onboarding`, **When** acesso suas stories no hub, **Then** os links das README apontam para o mesmo slug do Studio (`/pages/backoffice/dashboard` etc.).

---

### User Story 2 - Journeys rastreáveis no Studio (Priority: P2)

Garantir que o Studio (Puck) continue servindo exclusivamente o conteúdo de `domains/*`, com cada README/notas/links atualizados para o novo hub e slug correspondente. Nenhum componente Shadcn pode ser utilizado nas páginas de Studio ou nos arquivos dentro de `domains/*`.

**Why this priority**: O Constitution exige rastreabilidade completa; se um fluxo for atualizado no hub mas não no Studio/domains, PMs perdem confiança nas jornadas e nos dashboards.

**Independent Test**: Abrir `domains/studio` em `/pages/{slug}` para cada journey listada e comparar com o README/links atualizado; verificar que `pnpm check:shadcn` continua aprovando pois nenhum arquivo em `domains` ou `domains/studio/src/app/[[...slug]]` importa Shadcn.

**Acceptance Scenarios**:

1. **Given** `domains/Game/journeys/game-hub/README.md`, **When** abro o link de Studio lá listado, **Then** o layout renderiza somente componentes do design-system e condiz com a story equivalente no hub.
2. **Given** execução de `pnpm check:shadcn`, **When** a nova estrutura está ativa, **Then** apenas o dashboard raiz (não Studio/domains) pode importar `@/components/ui`.

---

### User Story 3 - Dashboard raiz pronto para Shadcn controlado (Priority: P3)

Limpar o `/dashboard` atual (em `domains/studio/src/app/dashboard`) removendo dependências do Storybook antigo, reinstalar Shadcn apenas após a remoção do CSS genérico e documentar que o novo hub é o único lugar onde Shadcn vive fora do Studio.

**Why this priority**: O dashboard é vitrine para stakeholders; precisamos garantir que o CSS antigo não quebre o layout e que a reinstalação do Shadcn siga os guardrails.

**Independent Test**: Executar `/dashboard` após a remoção do Storybook paralelo e verificar que não há `console.error`; rodar `pnpm check:shadcn` e confirmar que apenas o dashboard raiz importa `@/components/ui`.

**Acceptance Scenarios**:

1. **Given** o CSS global removido, **When** carrego `/dashboard`, **Then** os widgets renderizam usando tokens/design-system sem conflitos visuais.
2. **Given** a necessidade de componentes avançados, **When** reinstalo Shadcn no dashboard raiz, **Then** o script de verificação passa e nenhum arquivo de `domains/*` ou `domains/studio` fora do dashboard referencia Shadcn.

---

[Add more user stories as needed, each with an assigned priority]

### Edge Cases

- `/api/dashboard/*` retornando dados parciais: o hub deve exibir estados vazios (Skeleton/ErrorBanner) sem quebrar o layout.
- Journeys com links quebrados: se `domains/*/links.md` apontar para um slug inexistente, o plano precisa registrar fallback (ex.: instruções no README e alerta no dashboard).
- `/api/health` em estado degradado durante migração do hub deve continuar informando a razão (ex.: Storybook em transição) para evitar falsos alarmes.

## Requirements *(mandatory)*

<!--
  ACTION REQUIRED: The content in this section represents placeholders.
  Fill them out with the right functional requirements.
-->

Constitution alignment: call out which `@prototipo/design-system` components, tokens, SWR hooks, or `/api/dashboard/*` contracts are impacted so reviewers can confirm “Single Design System Surface” and “Typed APIs & Observable Dashboards”.

### Functional Requirements

- **FR-001 (Hub Structure)**: Storybook deve residir em um único pacote sob `domains/storybook` (nome final confirmado no plan.md) e só carregar stories vinculadas a `domains/*`.
- **FR-002 (CSS Isolation)**: Remover o CSS global do Storybook antigo para que `/dashboard` em `domains/studio` não receba estilos inesperados.
- **FR-003 (Docs Sync)**: Atualizar `domains/{domain}/journeys/{journey}/{README,links,notas}.md` e `domains/README.md` para apontar para o novo hub e slugs correto no Studio.
- **FR-004 (Studio Integrity)**: `domains/studio/src/app/[[...slug]]` deve continuar lendo apenas dados de `domains/*` e manter "localStorage JSON" em sincronia com as journeys.
- **FR-005 (Experience Hub Scripts)**: Adicionar scripts dedicados (`pnpm dev:hub`, `pnpm build:hub`) e documentar no README principal como executar o novo pacote.
- **FR-006 (Design System Guardrail)**: UI fora do dashboard raiz não pode usar Shadcn; qualquer uso deve ser restrito ao hub/dash e validado com `pnpm check:shadcn`.
- **FR-007 (Observabilidade)**: Caso haja alteração em `/api/dashboard/*` ou `/api/health`, atualizar interfaces TypeScript e `docs/health-metrics-widgets.md`.
- **FR-008 (Spec/Plan/Tasks Compliance)**: Manter plan.md/spec.md/tasks.md atualizados e anexar `/spec` no PR desta feature.

*Decisões tomadas*:

- **FR-009 (Deploy Target)**: O Experience Hub NÃO terá deploy separado na Phase 1. Ele residirá no mesmo workspace como `domains/storybook` e será executado localmente via `pnpm dev:storybook`. Stakeholders acessarão apenas via desenvolvimento local (localhost:6006) até uma decisão de deploy futuro ser formalizada em spec separado. Justificativa: reduzir overhead de CI/CD e focar em consolidação de journeys primeiro.

### Key Entities

- **JourneyMetadata**: Representa título, slug do Studio, links de dashboard/storybook e status (Planejado/Em andamento/Concluído) para cada pasta em `domains/*`.
- **ExperienceHubConfig**: Descreve portas/scripts disponíveis, paths das stories e lista de journeys carregadas (BackOffice, FrontOffice, Game).

## Success Criteria *(mandatory)*

<!--
  ACTION REQUIRED: Define measurable success criteria.
  These must be technology-agnostic and measurable.
-->

### Measurable Outcomes

- **SC-001**: `pnpm build` + `pnpm lint` + `pnpm -r type-check` executam sem erros em < 4 minutos após a migração.
- **SC-002**: `/dashboard` carrega sem `console.error` em menos de 3 segundos no ambiente local mesmo após a consolidação.
- **SC-003**: 100% dos links listados em `domains/*/journeys/*/links.md` abrem páginas válidas (Studio ou Hub) verificadas manualmente ou via teste automatizado que verifica status 200.
- **SC-004**: `pnpm check:shadcn` permanece verde e nenhum arquivo fora do dashboard raiz importa `@/components/ui`.
- **SC-005**: Cobertura de stories no Experience Hub: mínimo 80% dos componentes documentados em `packages/design-system/src/index.ts` possuem stories correspondentes renderizando corretamente em localhost:6006.
- **SC-006**: Zero vazamento de CSS global: executar `pnpm dev:storybook` e `pnpm dev:studio` simultaneamente, abrir `/dashboard` e verificar via DevTools que nenhum seletor CSS vindo de Storybook afeta os widgets do dashboard (0 regras CSS não-scoped aplicadas aos elementos `.dashboard-*`).
- **SC-007**: Tempo de startup do Storybook: `pnpm dev:storybook` deve completar em < 15 segundos na primeira execução (cache frio) e < 5 segundos em cache quente, medido via timestamp no log de console.
- **SC-008**: Documentação atualizada: 100% dos arquivos `domains/*/README.md`, `domains/*/journeys/*/README.md`, e `domains/*/journeys/*/links.md` devem referenciar URLs corretas do novo hub (localhost:6006/...) e slugs do Studio (/pages/...), validado via grep ou link checker automatizado.

