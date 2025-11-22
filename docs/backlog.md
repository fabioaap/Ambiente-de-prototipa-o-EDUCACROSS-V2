# Backlog do Projeto – EDUCACROSS Prototipação

Ambiente de prototipação orientado a jornadas (não-produtivo). Este backlog reflete estado real de implementação e serve como fonte de verdade operacional para priorização e tracking. Atualize sempre que uma issue for fechada ou um epic tiver escopo ajustado.

## 📊 Visão de Status (Atualizado em 2025-11-22)

| Grupo | Itens | Concluídos | % | Observações |
|-------|-------|-----------|----|----|
| P0    | 5     | 5         | 100% | ✅ **Sprint 1 COMPLETO!** PR #30 mergeado. Issues #1, #2, #3, #5 fechadas. |
| P1    | 11    | 0         | 0% | 🔴 **Sprint 2 iniciada em 2025-11-22** – C2, B4, D2, G4, G6 em backlog |
| P2    | 4     | 0         | 0% | 🟡 Planejado para Sprint 3 (após P1 estabilizar) |

### ✅ Sprint 1 – Concluído e Mergeado (PR #30)
- ✅ **#1 (C1)** – Studio API Persistência → **Fechada**
- ✅ **#2 (B1)** – Form Components → **Fechada**
- ✅ **#3 (D1)** – Storybook Tokens Page → **Fechada**
- ✅ **#5 (F1)** – ESLint unificado → **Fechada**

### 🔴 Sprint 2 – Em Planejamento (P1)
- 📝 **#6 (C2)** – Studio: Lista de páginas no sidebar (Prioridade: Alta)
- 📝 **#10 (G6)** – CONTRIBUTING.md (Prioridade: Alta)
- 📝 **#9 (G4)** – Script gerador de índice (Prioridade: Média)
- 📝 **#7 (B4)** – Design System: Acessibilidade (Prioridade: Média)
- 📝 **#8 (D2)** – Storybook Addon A11y (Prioridade: Média)

### ⏳ Em andamento (Dependências Sprint 2)
- ⏳ **#4 (E1)** – Jornada BackOffice (Pausa até C2/B4 prontos)

### Fontes auxiliares
- `docs/issues-pendentes.md` (snapshot detalhado das 37 issues geradas)
- `docs/resumo-issues-resolvidas.md` (detalhes de implementação concluída)
- API: `apps/studio/src/app/api/pages/README.md`
- Scripts: `scripts/gh/*.sh` (automação de labels, issues, project board)

---

## Visão e Objetivos
- Validar fluxos e jornadas rapidamente com Puck (editor visual) + Design System.
- Centralizar componentes reutilizáveis e tokens em monorepo (`pnpm workspaces`).
- Garantir que tudo roda sem erros (dev/build) para uso por áreas de produto.

## Escopo (v0.1 → v0.3)
- v0.1: Infra básica (monorepo, tokens, DS mínimo, Studio, Storybook) – CONCLUÍDO.
- v0.2: Ampliação de componentes, persistência mínima de páginas, primeiras jornadas reais.
- v0.3: Acessibilidade básica, documentação do DS, tokens semânticos, automações essenciais de CI.

## Políticas e Normas
- Node LTS atual (v22.x) via `.nvmrc`.
- `pnpm` como gerenciador; workspaces em `pnpm-workspace.yaml`.
- Storybook ESM-only; Next App Router no Studio.
- Versões estáveis e ranges com caret (ex.: `^18.x`, `^8.x`).

## Definições
- Definition of Ready (DoR):
  - Problema claro, escopo conhecido, critérios de aceitação definidos.
  - Impacto/valor descritos e links para referências (Figma/estudos/benchmarks).
- Definition of Done (DoD):
  - Código compilando e sem erros de tipo.
  - Stories e/ou página de exemplo no Studio quando aplicável.
  - README/Notas atualizados e checklist de acessibilidade (quando pertinente).

---

## Epics e Tarefas (Estado Atual)

### Epic A – Tokens (@prototipo/tokens)
- [ ] A1 – Adicionar tokens semânticos (ex.: `--color-bg`, `--color-fg`, `--color-accent`).
- [ ] A2 – Suporte a tema claro/escuro via CSS vars (toggle futuro).
- [ ] A3 – Documentar tokens de tipografia e espaçamento com exemplos visuais.
- [ ] A4 – Padrão de nomes (convenção) e guia de contribuição de tokens.
- [ ] A5 – Estrutura para futura integração Figma → tokens (sem automatizar agora).

### Epic B – Design System (@prototipo/design-system)
- [x] B1 – Componentes de formulário: `Input`, `Select`, `Checkbox`, `Radio`, `Switch` (implementado – fechar issue #2 após revisão de acessibilidade).
- [ ] B2 – Componentes de layout: `Stack`, `Grid`, `Section`, `Navbar`, `Footer`.
- [ ] B3 – Feedback/UI: `Badge`, `Tag`, `Tooltip`, `Modal`, `Toast` (API mínima).
- [ ] B4 – Acessibilidade: roles/aria, foco visível, contraste, navegação teclado.
- [ ] B5 – Página de documentação dos componentes (Storybook Docs) com exemplos reais.
- [ ] B6 – Theming: consumir tokens semânticos para variar tema global.
- [ ] B7 – Snapshot visual básico via Chromatic (opcional nesta fase).

### Epic C – Studio (Next + Puck)
- [x] C1 – Persistência em disco: rota de API para salvar/ler `data/pages/*.json` (além de localStorage).
- [ ] C2 – Lista de páginas no sidebar (carregar do filesystem) com criar/renomear/excluir.
- [ ] C3 – Templates de página por jornada (ex.: dashboard, detalhe, formulário).
- [ ] C4 – Autocomplete do map de componentes do DS no Puck (sincronizado por arquivo único).
- [ ] C5 – Export/Import de páginas (JSON) via UI do editor.

### Epic D – Storybook
- [x] D1 – Página de Tokens (visualizar cores/typography/spacing) – implementado (issue #3 aberta para revisão final).
- [ ] D2 – Addon A11y e validações mínimas.
- [ ] D3 – Play functions para interações básicas nos componentes (testes interativos).
- [ ] D4 – Agrupamento por categoria/domínio; exemplos focados em jornadas reais.

### Epic E – Jornadas (domains/BackOffice, domains/FrontOffice, domains/Game)
- [ ] E1 – domains/BackOffice: Revisão de Questões
  - [x] Página do Studio: Lista de pendentes (`/backoffice/revisao-questoes/lista`).
  - [x] Página do Studio: Detalhe da questão (`/backoffice/revisao-questoes/detalhe`).
  - [ ] Tela de ações/confirmar devolutivas (pendente).
  - [ ] Componentes DS necessários: Toolbar, StatusBadge, ConfirmDialog.
- [ ] E2 – domains/FrontOffice: Onboarding do Aluno
  - [ ] Páginas do Studio: boas-vindas, perfil inicial, tutorial.
  - [ ] Componentes DS necessários: Stepper, ProgressBar, AvatarUpload.
- [ ] E3 – domains/Game: Missões da Ilha 1
  - [ ] Páginas do Studio: mapa, missão ativa, conquistas.
  - [ ] Componentes DS necessários: Card de missão, HUD simples, Modal de recompensa.

### Epic F – Tooling/Infra
- [x] F1 – ESLint config compartilhada + plugins aplicados – implementado (issue #5 aberta para validação CI futura).
- [ ] F2 – Prettier + `.prettierrc` (opcional) e `format` scripts.
- [ ] F3 – GitHub Actions: workflow de CI com cache pnpm e jobs de build (tokens, DS, Studio, Storybook).
- [ ] F4 – Husky + lint-staged (opcional) para garantir qualidade em commits.

### Epic G – Governança e Manutenção
- [x] G1 – Consolidar estrutura de domínios em `domains/` (BackOffice, FrontOffice, Game).
- [x] G2 – Criar template reutilizável de jornada (`domains/template-jornada.md`).
- [x] G3 – Documentar convenções de nomenclatura e checklist de jornadas em `domains/README.md`.
- [ ] G4 – Script para gerar índice automático de jornadas por domínio (`pnpm gen:jornadas`).
- [ ] G5 – Validação de links em CI (lint-md ou similar) para evitar links quebrados.
- [ ] G6 – Guia de contribuição (`CONTRIBUTING.md`) com workflow de criação de jornadas.

### Epic H – Dashboard do Projeto
- [ ] H1 – Planejar layout do Dashboard do Projeto (wireframe): lista de páginas prototipadas, links, filtros por domínio/jornada.
- [ ] H2 – Implementar endpoint e rota para index de páginas do Studio (`/studio/api/pages` ou `apps/studio/data/pages/*`).
- [ ] H3 – Implementar UI do Dashboard (aplicação mínima em `apps/studio` ou `apps/storybook`): links diretos para páginas prototipadas.
- [ ] H4 – Expor indicadores de saúde do repositório: status de build (tokens/DS/Studio/Storybook), última build, lint status, tamanho do bundle Storybook, dependências desatualizadas.
- [ ] H5 – Link direto e badge para Storybook estático (documentação final) no Dashboard e READMEs de domínio.
- [ ] H6 – Definir requisitos de segurança/visibilidade (quem pode acessar o dashboard; ambiente prod vs dev).


---

## Backlog Priorizado (P0→P2)
### 🔴 P0 (alto impacto / habilita restante)
| Item | Issue | Status | Dependências | Próximo Passo |
|------|-------|--------|--------------|---------------|
| C1 Persistência em disco | #1 | Implementado | Nenhuma (desbloqueia C2/H2) | Executar checklist de QA + fechar issue |
| E1 Jornada BackOffice (Revisão de Questões) | #4 | Em andamento | B1 concluído | Criar tela de ações + componentes dedicados |
| B1 Form Components | #2 | Implementado | — | Revisão A11y + fechar issue |
| D1 Página de Tokens | #3 | Implementado | Tokens base | Adicionar exemplos JS + fechar issue |
| F1 ESLint unificado | #5 | Implementado | — | Rodar lint full + fechar issue |

### 🟡 P1 (médio / incrementos)
| Item | Issue | Status | Gate |
|------|-------|--------|------|
| C2 Sidebar páginas | #6 | Pendente | C1 |
| B4 Acessibilidade DS | #7 | Pendente | B1 |
| D2 Addon A11y | #8 | Pendente | D1 |
| G4 Índice automático jornadas | #9 | Pendente | Estrutura atual domains |
| G6 CONTRIBUTING.md | #10 | Pendente | Guia tokens/DS estável |
| H1 Planejar Dashboard | #12 | Pendente | Wireframe inicial |
| H2 Endpoint index páginas | #13 | Pendente | C1 |
| H3 UI listagem dashboard | #14 | Pendente | H2 |
| H4 Indicadores saúde repo | #15 | Pendente | H2 + lint + build metrics |
| H5 Link Storybook/badge | #16 | Pendente | D1 build estático |
| (Reservado) H6 Requisitos segurança | — | Pendente | Definição acesso |

### 🟢 P2 (exploração / pós estabilização)
| Item | Status | Observação |
|------|--------|------------|
| B6 Theming (tokens semânticos) | Pendente | Requer A1–A4 definidos |
| C5 Export/Import JSON UI | Pendente | Após C1 + C2 |
| F3 GitHub Actions CI | Pendente | Infra mínima + caching pnpm |
| G5 Validação de links em CI | Pendente | Após CONTRIBUTING.md |
| H3 (Expansão dashboard avançada) | Pendente | Métricas + gráficos |

---

## Sprints (Planejamento Atual)

### ✅ Sprint 1 (P0) – CONCLUÍDO ✅
**Data**: 2025-11-15 a 2025-11-22  
**Objetivo**: Implementar base técnica P0 (API, componentes, tokens, ESLint)

**Entregues:**
- ✅ C1 (#1): API CRUD de persistência (GET, POST, PUT, DELETE)
- ✅ B1 (#2): 5 componentes de formulário (Input, Select, Checkbox, Radio, Switch)
- ✅ D1 (#3): Página visual de Tokens no Storybook
- ✅ F1 (#5): ESLint config unificada para monorepo
- ✅ Correção crítica: Route conflict Next.js resolvido

**Resultado**: Build ✅ | Lint ✅ | Tests ✅ | PR #30 mergeado

---

### 🔴 Sprint 2 (P1) – INICIADA EM 2025-11-22
**Objetivo**: Navegação, acessibilidade e governança básica

**Issues Prioritárias:**
1. **#6 (C2)** – Studio: Sidebar com lista de páginas (estimativa: M)
2. **#10 (G6)** – CONTRIBUTING.md com workflow (estimativa: S)
3. **#9 (G4)** – Script gerador de índice de jornadas (estimativa: M)
4. **#7 (B4)** – Design System: Acessibilidade (ARIA, contraste, foco) (estimativa: L)
5. **#8 (D2)** – Storybook: Addon A11y (estimativa: M)

**Bloqueadores**: Nenhum (todas as P0 estão prontas)

**Pré-condições de sucesso:**
- [ ] C2 concluída (habilita navegação no Studio)
- [ ] B4 concluída (melhora acessibilidade em todos os componentes)
- [ ] G6 concluída (documenta como contribuir)
- [ ] Build + Lint passando em todos os workspaces

---

### 🟡 Sprint 3 (P2) – PLANEJADO
**Objetivo**: Dashboard, automação CI, export/import avançado

**Issues:**
- H Epic (Dashboard): Planning, API, UI, Health indicators, Storybook link
- C5 (Export/Import JSON UI)
- F3 (GitHub Actions CI workflow)
- G5 (Link validation em CI)

**Dependências**: Sprint 2 deve estar 90%+ concluída

---

### 📋 Sprint 4+ (Roadmap)
- E2/E3: FrontOffice e Game jornadas
- A1-A5: Tokens semânticos e dark mode
- B2/B3: Layout e feedback components
- Integração com backend real (quando disponível)

---

## Critérios de Aceitação (Principais)
- C1: CRUD funcional (`GET /api/pages`, `POST /api/pages`, `PUT /api/pages/{id}`, `DELETE /api/pages/{id}`) + arquivos JSON persistidos.
- E1: Jornada BackOffice com ao menos 1 fluxo navegável (lista → detalhe) usando componentes DS existentes.
- B1: Todos os form components com stories contendo estados (focus, error, disabled) e props documentadas.
- D1: Página de Tokens apresenta amostras interpretáveis + instruções de uso em CSS/TS.
- F1: `pnpm -r lint` executa sem erros críticos (warnings aceitáveis listados).

---

## Riscos e Assunções
- Atualizações do Puck OSS podem alterar API → manter configuração minimalista e documentar versão.
- Evitar dependências adicionais de styling (priorizar CSS Modules + tokens) até estabilizar DS.
- Sem CI ainda: risco de regressões silenciosas → priorizar criação de workflow simples (F3) quando S2 concluir.
- Issues implementadas mas não fechadas geram ruído → fechar após checklist acessibilidade/performance.

---

## Papéis e Rotinas (Sugestão)
- Papéis: PM, Design, Frontend, QA.
- Cerimônias: planning semanal (30min), revisão técnica meio da sprint, demo quinzenal.
- Labels obrigatórias por issue: `priority:P*`, `type:*`, `epic` (quando aplicável), `domain:*` (se jornada), `status:*`.

---

## Comandos Úteis
```bash
# Instalar dependências
pnpm install

# Dev
pnpm dev:studio
pnpm dev:storybook

# Build
pnpm build
pnpm build:tokens
pnpm build:design-system
pnpm build:studio
pnpm build:storybook

# Lint / Test (quando aplicável)
pnpm -r lint
pnpm -r test
```

---

## Referências
- Studio (Next + Puck): `apps/studio/`
- Storybook: `apps/storybook/`
- Design System: `packages/design-system/`
- Tokens: `packages/tokens/`
- Jornadas: `domains/BackOffice/`, `domains/FrontOffice/`, `domains/Game/`

## Governança do Backlog
1. Toda conclusão técnica deve gerar: atualização nesta lista + fechamento da issue + link de commit/PR.
2. Evitar adicionar tarefas sem mapear a qual Epic pertencem (ou criar nova Epic com justificativa clara).
3. Revisar previsões de sprint ao final (retro rápida: 10min, atualizar percentuais e bloqueios).
4. Documentos complementares devem manter coesão: se `issues-pendentes.md` for regenerado, sincronizar antes de planejar sprint.

Mantenha este backlog vivo. Ao concluir tarefas, marque-as, feche issues no GitHub e adicione links para PRs e páginas do Studio/Storybook.
