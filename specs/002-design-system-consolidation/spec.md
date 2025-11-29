# Feature Specification: Design System Consolidation

**Feature Branch**: `002-design-system-consolidation`  
**Created**: 2025-11-28  
**Status**: Draft  
**Input**: 42 tarefas do plano de consolidação DS + análise de inconsistências SpecKit

## Context

O projeto atualmente possui:
- **Design System próprio** (`@prototipo/design-system`) com 13 componentes base
- **Shadcn UI** coexistindo em 4 arquivos (`domains/admin` + `domains/studio/dashboard`)
- **Tokens Tailwind** (azul #3b82f6) que devem ser substituídos por **Tokens Vuexy Figma** (roxo #7367f0)
- **Gaps de componentes** para BackOffice (DataTable, Sidebar, Breadcrumb, Tabs, FilterGroup, etc)

A consolidação visa:
1. Atualizar tokens com dados reais do Figma
2. Criar 10+ componentes BackOffice faltantes
3. Migrar 4 arquivos de Shadcn para DS
4. Remover Shadcn completamente (conforme constitution v1.1.0)
5. Estabelecer padrão único para 80% das páginas BackOffice

## User Scenarios & Testing

### User Story 1 - Tokens Vuexy alimentam todo o sistema (Priority: P1)

Desenvolvedores e designers precisam que todos os componentes reflitam as cores, tipografia e espaçamentos definidos no Figma Frame 8565:17355 (Vuexy theme), para que protótipos gerados no Studio correspondam exatamente ao design aprovado.

**Why this priority**: Tokens são a base do Design System; sem eles, todos os componentes criados nas fases seguintes terão cores/espaçamentos incorretos.

**Independent Test**: Executar `pnpm build:tokens`, abrir Storybook e validar que badges/botões exibem `#7367f0` (roxo Vuexy) em vez de `#3b82f6` (azul Tailwind); comparar screenshot com Figma.

**Acceptance Scenarios**:

1. **Given** Figma tokens exportados com estrutura `{variables.light, variables.dark, primitives}`, **When** mesclados com `packages/tokens/src/tokens.json`, **Then** cores primárias mudam de azul para roxo SEM quebrar builds existentes.
2. **Given** seção `backoffice.colors` adicionada com `redes: {canoas, portoAlegre, gravatai}` e `badges: {efobmaos, d6, avaliacao, quiz, expedicao}`, **When** componente Badge referencia `var(--color-badge-efobmaos)`, **Then** renderiza com cor correta do Figma.
3. **Given** `pnpm build:tokens` executado, **When** inspeciono `packages/tokens/dist/tokens.css`, **Then** CSS variables contêm `--color-primary-500: #7367f0` e `--color-badge-canoas: <cor-do-figma>`.

---

### User Story 2 - Componentes BackOffice cobrem 80% das telas (Priority: P1)

Desenvolvedores de jornadas BackOffice precisam de componentes prontos (DataTable, Sidebar, Breadcrumb, Tabs, FilterGroup, Pagination, ActionButtons, PageHeader, ToolbarButtons, Modal) para construir telas sem duplicar código ou usar Shadcn.

**Why this priority**: Atualmente cada jornada reinventa componentes ou usa Shadcn inconsistentemente; componentes padronizados aceleram desenvolvimento e garantem UX uniforme.

**Independent Test**: Criar página de teste que usa todos os 10 componentes BackOffice, validar que renderizam com theme Vuexy e funcionam com mock data; comparar com Figma Node 8565:17355.

**Acceptance Scenarios**:

1. **Given** componente `DataTable` com props `{columns, data, sortable, filterable, onRowClick}`, **When** renderizado com mock de 5 questões, **Then** exibe linhas alternadas (striped), ícones de sort, e dispara `onRowClick` ao clicar.
2. **Given** componente `Sidebar` com props `{items, activeItem, collapsed, logo}`, **When** estado `collapsed=true`, **Then** ícones mantêm-se visíveis mas labels desaparecem com animação suave.
3. **Given** componente `FilterGroup` com props `{filters: [{type: 'select', label: 'Ano Escolar', options: ['6º', '7º']}]}`, **When** usuário seleciona '6º', **Then** callback `onChange` dispara com valor selecionado.
4. **Given** `Storybook` com stories para todos os 10 componentes, **When** acesso `/storybook`, **Then** todas as stories renderizam sem console errors e permitem interação com controles.

---

### User Story 3 - Migração de Shadcn transparente (Priority: P2)

Páginas existentes que usam Shadcn (`domains/admin/src/app/page.tsx`, `domains/admin/src/app/dashboard/page.tsx`, `domains/studio/src/app/dashboard/page.tsx`, `ThemeToggle.tsx`) devem migrar para Design System SEM regressões visuais ou funcionais.

**Why this priority**: Garantir que migração não quebra funcionalidade existente; stakeholders não devem notar diferença entre Shadcn e DS.

**Independent Test**: Capturar screenshots das 4 páginas ANTES da migração, substituir imports, capturar screenshots DEPOIS, comparar pixel-by-pixel; executar testes manuais de funcionalidade (clicks, hover, toggle theme).

**Acceptance Scenarios**:

1. **Given** `domains/admin/src/app/page.tsx` usando `Button` de Shadcn, **When** substituído por `Button` do DS, **Then** aparência permanece idêntica (cores, padding, hover) e `onClick` continua funcionando.
2. **Given** `ThemeToggle.tsx` usando `Button` de Shadcn, **When** substituído por `Button` do DS, **Then** toggle light/dark mantém funcionalidade e ícones renderizam corretamente.
3. **Given** `pnpm build` executado após migrações, **When** verifico logs, **Then** 0 erros de tipo, 0 warnings sobre imports ausentes, tempo de build ≤ baseline +10%.

---

### User Story 4 - Remoção Shadcn limpa ambiente (Priority: P3)

Após migração completa, remover todas as pastas `components/ui/`, dependências `@radix-ui/*`, scripts `check:shadcn` e validar que projeto compila limpo sem Shadcn.

**Why this priority**: Manutenibilidade - reduz confusão sobre qual biblioteca usar, diminui bundle size, simplifica onboarding de novos devs.

**Independent Test**: Executar `grep -r '@/components/ui' domains/` e `grep -r '@radix-ui' package.json`, verificar que retornam vazio; executar `pnpm build` e confirmar sucesso; medir bundle size e comparar com baseline.

**Acceptance Scenarios**:

1. **Given** pastas `domains/admin/src/components/ui/` e `domains/studio/src/components/ui/` deletadas, **When** executo `pnpm build`, **Then** nenhum erro relacionado a imports ausentes aparece.
2. **Given** dependências `@radix-ui/*` removidas, **When** executo `pnpm install`, **Then** `node_modules/@radix-ui/` não existe mais.
3. **Given** bundle size baseline de X MB, **When** meço após remoção, **Then** tamanho ≤ X * 0.4 (60% reduction esperada conforme análise).

---

### User Story 5 - Página Banco de Questões serve como referência (Priority: P2)

Criar página completa `domains/studio/src/app/backoffice/banco-questoes/page.tsx` que usa TODOS os componentes BackOffice (Sidebar, Breadcrumb, PageHeader, Tabs, FilterGroup, DataTable, Pagination, ActionButtons) como demonstração e template para futuras jornadas.

**Why this priority**: Desenvolvedores precisam de exemplo concreto de como compor componentes BackOffice; página serve como "living documentation" do Design System.

**Independent Test**: Acessar `/backoffice/banco-questoes`, validar que todos os componentes renderizam harmoniosamente, comparar com Figma Node 8565:17355, usar página como template para criar nova jornada e verificar que processo é fluido.

**Acceptance Scenarios**:

1. **Given** página com Sidebar + Breadcrumb + PageHeader + Tabs + FilterGroup + DataTable + Pagination, **When** carrego `/backoffice/banco-questoes`, **Then** layout é responsivo, todos os componentes têm espaçamento consistente (8px grid), e tema Vuexy aplicado.
2. **Given** mock data de 5 questões com badges coloridos (EFobmãos, D6, Avaliação, Quiz, Expedição), **When** renderizados na DataTable, **Then** cores correspondem ao Figma e badges são legíveis.
3. **Given** 9 filtros (Área, Ano, Tipo, Nível, Habilidade, Tópico, Autoria, USO, ToolbarButtons), **When** aplico filtro "Ano Escolar = 6º", **Then** DataTable atualiza exibindo apenas questões filtradas.

---

### Edge Cases

- **Merge de tokens com estrutura existente**: Se `tokens.json` já contém chaves `colors.primary`, a mesclagem deve preservar cores não-Figma (ex: `neutral`) enquanto substitui `primary`, `secondary`, etc.
- **Componentes com dependências Radix**: Se algum componente DS usar internamente Radix (ex: `Select` com Radix dropdown), documentar dependência e manter apenas a versão necessária.
- **Broken links após remoção Shadcn**: Se alguma documentação (.md) referenciar Shadcn, atualizar links para apontar Design System ou remover menções.
- **Bundle size não reduz 60%**: Se redução for menor, investigar tree-shaking e dead code; acceptable threshold é ≥40% reduction.
- **Figma Node 8565:17355 muda**: Se designers atualizarem frame, tokens precisam ser re-exportados; documentar processo de re-sync.

## Requirements

Constitution alignment: Trabalho ocorre em `packages/design-system/src/components/`, `packages/tokens/`, e migrações em `domains/admin/` + `domains/studio/`. Todos os componentes seguem padrão `'use client'`, `React.forwardRef`, CSS Modules, stories Storybook, e registro em `puck.config.tsx` se aplicável. APIs não mudam (`/api/dashboard/*` não são tocadas). Shadcn policy será resolvida via constitution amendment CONST-2025-11-28-001.

### Functional Requirements

- **FR-001 (Figma Token Import & Merge via MCP)**: Sistema MUST usar o **MCP oficial do Figma** (`@modelcontextprotocol/server-figma`) para importar tokens do Figma Frame 8565:17355 e mesclar com `packages/tokens/src/tokens.json` preservando: (a) estrutura existente (`colors.primary`, `colors.secondary`, etc), (b) metadata (`sourceFrameId`, `exportedAt`, `version`, `importedViaMCP: true`), (c) backward compatibility - componentes que referenciam `var(--color-primary-500)` continuam funcionando após merge. Tokens Vuexy (roxo #7367f0) MUST substituir Tailwind (azul #3b82f6) sem quebrar builds. Importação manual (copy-paste) NÃO é permitida; tokens MUST ser sincronizados via MCP.

- **FR-002 (BackOffice Token Section)**: Sistema MUST adicionar seção `backoffice.colors` em `tokens.json` contendo: (a) `redes: {canoas: string, portoAlegre: string, gravatai: string}`, (b) `badges: {efobmaos: string, d6: string, avaliacao: string, quiz: string, expedicao: string}`. CSS variables geradas MUST seguir padrão `--color-badge-efobmaos`, `--color-rede-canoas`.

- **FR-003 (Skeleton Component)**: Sistema MUST prover componente `Skeleton` com props: (a) `width?: string | number`, (b) `height?: string | number`, (c) `variant?: 'text' | 'circular' | 'rectangular'`, (d) `animation?: 'pulse' | 'wave' | 'none'`. Component MUST render com tokens e forwardRef para permitir refs DOM.

- **FR-004 (Table Component)**: Sistema MUST prover componente `Table` com props: (a) `columns: Array<{key: string, label: string, sortable?: boolean}>`, (b) `data: Array<Record<string, unknown>>`, (c) `striped?: boolean`, (d) `onSort?: (key: string, direction: 'asc' | 'desc') => void`. Component MUST aplicar estilos com CSS Modules + tokens.

- **FR-005 (BackOffice Components Suite)**: Sistema MUST prover 10 componentes: (a) `Sidebar` com props `{items, activeItem, collapsed, logo}`, (b) `Breadcrumb` com props `{items: Array<{label, href, icon?}>}`, (c) `Tabs` com props `{tabs, defaultValue, onChange}` suportando badges, (d) `DataTable` com props `{columns, data, sortable, filterable, pagination, onRowClick}`, (e) `Pagination` com props `{currentPage, totalPages, onChange}`, (f) `FilterGroup` com props `{filters: Array<{type, label, options}>}` suportando `select | input | date`, (g) `ActionButtons` renderizando ícones editar/ver/excluir, (h) `PageHeader` com props `{title, count}`, (i) `ToolbarButtons` com props `{onImport, onExport}`, (j) `Modal` com props `{open, onClose, title, children}`. Todos MUST usar tema Vuexy, forwardRef, CSS Modules, ter stories no Storybook.

- **FR-006 (Export All Components)**: Sistema MUST exportar todos os componentes em `packages/design-system/src/index.ts` usando named exports. Build MUST gerar tipos TypeScript corretos em `dist/index.d.ts`.

- **FR-007 (Shadcn Migration)**: Sistema MUST substituir imports `@/components/ui/*` por `@prototipo/design-system` em: (a) `domains/admin/src/app/page.tsx`, (b) `domains/admin/src/app/dashboard/page.tsx`, (c) `domains/studio/src/app/dashboard/page.tsx`, (d) `domains/admin/src/components/theme/ThemeToggle.tsx`. Migração MUST preservar comportamento funcional (clicks, hovers, theme toggle) e aparência visual (±2px tolerance).

- **FR-008 (Shadcn Removal)**: Sistema MUST deletar: (a) `domains/admin/src/components/ui/` (todos arquivos), (b) `domains/studio/src/components/ui/` (todos arquivos), (c) dependências `@radix-ui/*` de `package.json` (admin e studio), (d) script `scripts/check-shadcn-usage.mjs`, (e) entrada `check:shadcn` de `package.json` root. Build completo (`pnpm clean && pnpm install && pnpm build`) MUST passar sem erros após remoção.

- **FR-009 (Reference Page)**: Sistema MUST criar `domains/studio/src/app/backoffice/banco-questoes/page.tsx` usando: (a) layout com Sidebar, (b) Breadcrumb, (c) PageHeader com título "Todas as questões" + contador, (d) Tabs (Aprovadas/Em revisão/Em correção), (e) FilterGroup com 9 filtros, (f) ToolbarButtons (Importar/Exportar), (g) DataTable com colunas (Código, Habilidades, Tópico, Tipo, Autoria, Criador, Revisor, Data, Ações), (h) Pagination, (i) mock data de 5 questões com badges coloridos. Página MUST ser pixel-perfect comparada com Figma Node 8565:17355 (±5px tolerance) e servir como template para futuras jornadas.

- **FR-010 (Documentation Update)**: Sistema MUST atualizar: (a) `README.md` com seção Design System consolidado listando 23+ componentes, (b) `.github/copilot-instructions.md` removendo menções a Shadcn e reforçando uso exclusivo de `@prototipo/design-system`, (c) `CHANGELOG.md` com entrada "Design System Consolidation" descrevendo mudanças, (d) `domains/BackOffice/journeys/banco-questoes/README.md` com instruções de uso da página referência.

- **FR-011 (MCP Figma Server Setup)**: Sistema MUST configurar o servidor MCP oficial do Figma com: (a) instalação de `@modelcontextprotocol/server-figma` como devDependency no root `package.json`, (b) arquivo `.mcp/figma-server-config.json` contendo `{"figmaToken": "env:FIGMA_ACCESS_TOKEN", "fileId": "Sz4z0rpDmocXZ8LylxEgqF", "nodeId": "8565:17355"}`, (c) script `pnpm sync:figma` que executa MCP para baixar tokens e atualizar `packages/tokens/src/tokens.json`, (d) documentação em `docs/figma-mcp-setup.md` com instruções de obtenção do token Figma (https://www.figma.com/settings/personal_tokens) e configuração de `FIGMA_ACCESS_TOKEN` em `.env.local`, (e) validação em CI: GitHub Actions workflow que verifica se tokens foram importados via MCP (checando metadata `importedViaMCP: true` em `tokens.json`). Setup MUST permitir re-sync manual e automático quando Frame 8565:17355 for atualizado.

### Key Entities

- **VuexyTokenSet**: Estrutura exportada do Figma contendo `{variables.light, variables.dark, primitives}` com cores, tipografia, espaçamentos do theme Vuexy.
- **BackOfficeColorPalette**: Extensão de tokens específica para BackOffice com `redes: {canoas, portoAlegre, gravatai}` e `badges: {efobmaos, d6, avaliacao, quiz, expedicao}`.
- **ComponentSuite**: Coleção de 10 componentes BackOffice (Sidebar, Breadcrumb, Tabs, DataTable, Pagination, FilterGroup, ActionButtons, PageHeader, ToolbarButtons, Modal) com props tipadas e stories.
- **MigrationManifest**: Lista de 4 arquivos que usam Shadcn e precisam ser migrados, incluindo paths, componentes usados, e checksum de aparência antes/depois.
- **BundleSizeBaseline**: Medida de tamanho inicial dos bundles (admin.js, studio.js) para comparação pós-remoção Shadcn.

## Success Criteria

### Measurable Outcomes

- **SC-001 (Token Accuracy)**: 100% das cores primárias/secundárias correspondem ao Figma Frame 8565:17355 (validado via screenshot diff tool ou inspeção manual); CSS variables `--color-primary-500` contém `#7367f0` (roxo Vuexy) não `#3b82f6` (azul Tailwind).

- **SC-002 (Component Coverage)**: 23+ componentes exportados em `@prototipo/design-system` (13 base + 10 BackOffice); 100% possuem stories no Storybook renderizando sem console errors; 100% usam CSS Modules + tokens (0 hardcoded colors).

- **SC-003 (Migration Quality)**: 4 arquivos migrados de Shadcn para DS com 0 regressões visuais (±2px tolerance) e 0 regressões funcionais (100% dos clicks/hovers/toggles funcionam); screenshots antes/depois anexados como evidência.

- **SC-004 (Shadcn Removal)**: `grep -r '@/components/ui' domains/` retorna 0 resultados; `grep -r '@radix-ui' package.json` retorna 0 resultados (exceto se algum componente DS usar internamente); `pnpm build` passa em < baseline +10% tempo.

- **SC-005 (Bundle Size Reduction)**: Tamanho dos bundles reduz ≥40% comparado com baseline (target 60%); exemplo: se baseline é 2.5 MB, após remoção deve ser ≤1.5 MB (validado com `pnpm build && du -sh domains/{admin,studio}/.next/`).

- **SC-006 (Reference Page Quality)**: `/backoffice/banco-questoes` renderiza em <3s localmente; todos os 10 componentes BackOffice visíveis na página; comparação com Figma Node 8565:17355 tem ≤5px diferença em espaçamentos; página usada com sucesso como template em ≥1 nova jornada criada posteriormente.

- **SC-007 (Documentation Completeness)**: `README.md` atualizado listando 23+ componentes; `.github/copilot-instructions.md` atualizado sem menções a Shadcn; `CHANGELOG.md` contém entrada detalhada; `pnpm lint` e `pnpm -r type-check` passam com 0 errors (warnings aceitáveis se documentados).

- **SC-008 (Validation Gate)**: `/spec` executado no PR retorna ✅ verde; todos os requirements (FR-001 a FR-010) têm ≥1 task mapeada; 100% das tasks críticas (Fase 0-2) completas antes de iniciar Fase 3.

---

**Próximos Passos**: Executar `/speckit.plan` para gerar `plan.md` + `research.md` + `contracts/`, depois `/speckit.tasks` para mapear os 42 itens da todo list aos FRs acima.
