# Backlog do Projeto – EDUCACROSS Prototipação

Ambiente de prototipação orientado a jornadas (não-produtivo). Este backlog reflete estado real de implementação e serve como fonte de verdade operacional para priorização e tracking. Atualize sempre que uma issue for fechada ou um epic tiver escopo ajustado.

## 📊 Visão de Status (Atualizado em 2025-11-20)

| Grupo | Itens P0 | Concluídos | % | Observações |
|-------|----------|-----------|----|-------------|
| P0    | 5        | 5         | 100% | ✅ SPRINT 1 COMPLETO - Todas as issues #1–#5 validadas e prontas para fechamento |
| P1    | 11       | 11        | 100% | ✅ SPRINT 2 COMPLETO - Mergeado em main (v0.2-beta) |
| P2    | 7        | 3         | 43% | F3, C5, G5 implementados; H3, H4, H5, B6 pendentes |

### ✅ Concluídos e Validados (Sprint 1 - P0)
- ✅ B1 – Form Components (Input, Select, Checkbox, Radio, Switch) `commit 433214b` (issue #2 - VALIDADO)
- ✅ C1 – API de persistência (`apps/studio/src/app/api/pages/*`) `commit 370298d` (issue #1 - VALIDADO)
- ✅ D1 – Página de Tokens no Storybook `commit 82cfb9b` (issue #3 - VALIDADO)
- ✅ E1 – Jornada BackOffice: Revisão de Questões `commit a60494c` (issue #4 - COMPLETO)
- ✅ F1 – ESLint unificado monorepo `commit da05e19` (issue #5 - VALIDADO)

### ✅ Concluídos e Mergeados (Sprint 2 - P1)
- ✅ C2 – Sidebar páginas no Studio `commit f6e99e7`
- ✅ D2 – Addon A11y no Storybook `commit 7fb11f7`
- ✅ H1 – Dashboard Planning `commit 5e8306d`
- ✅ H2 – Dashboard Endpoint `commit 4689f7a`
- ✅ E2 – FrontOffice Onboarding `commit 1e060a0`
- ✅ E3 – Game Missões Ilha 1 `commit d95fcf9`
- ✅ G4 – Script geração índice jornadas
- ✅ G6 – CONTRIBUTING.md
- ✅ B4 – Acessibilidade básica DS
- ✅ H (Epic) – Dashboard do Projeto

### 🚧 Em andamento (Sprint 3 - P2)
- ✅ F3 – GitHub Actions CI/CD (implementado)
- ✅ C5 – Export/Import JSON (implementado)
- ✅ G5 – Link Validation CI (implementado)
- [ ] H3 – Dashboard UI (planejado)
- [ ] H4 – Indicadores de saúde (planejado)
- [ ] H5 – Link para Storybook (planejado)
- [ ] B6 – Theming tokens semânticos (BLOQUEADO - aguarda A1-A4)

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
- [x] B1 – Componentes de formulário: `Input`, `Select`, `Checkbox`, `Radio`, `Switch` `commit 433214b` ✅ VALIDADO
- [ ] B2 – Componentes de layout: `Stack`, `Grid`, `Section`, `Navbar`, `Footer`.
- [ ] B3 – Feedback/UI: `Badge`, `Tag`, `Tooltip`, `Modal`, `Toast` (API mínima).
- [x] B4 – Acessibilidade: roles/aria, foco visível, contraste, navegação teclado (Sprint 2) ✅ COMPLETO
- [ ] B5 – Página de documentação dos componentes (Storybook Docs) com exemplos reais.
- [ ] B6 – Theming: consumir tokens semânticos para variar tema global (BLOQUEADO - aguarda A1-A4).
- [ ] B7 – Snapshot visual básico via Chromatic (opcional nesta fase).

### Epic C – Studio (Next + Puck)
- [x] C1 – Persistência em disco: rota de API para salvar/ler `data/pages/*.json` `commit 370298d` ✅ VALIDADO
- [x] C2 – Lista de páginas no sidebar (carregar do filesystem) com criar/renomear/excluir `commit f6e99e7` ✅ COMPLETO
- [ ] C3 – Templates de página por jornada (ex.: dashboard, detalhe, formulário).
- [ ] C4 – Autocomplete do map de componentes do DS no Puck (sincronizado por arquivo único).
- [x] C5 – Export/Import de páginas (JSON) via UI do editor (Sprint 3) ✅ IMPLEMENTADO

### Epic D – Storybook
- [x] D1 – Página de Tokens (visualizar cores/typography/spacing) `commit 82cfb9b` ✅ VALIDADO
- [x] D2 – Addon A11y e validações mínimas `commit 7fb11f7` ✅ COMPLETO
- [ ] D3 – Play functions para interações básicas nos componentes (testes interativos).
- [ ] D4 – Agrupamento por categoria/domínio; exemplos focados em jornadas reais.

### Epic E – Jornadas (domains/BackOffice, domains/FrontOffice, domains/Game)
- [x] E1 – domains/BackOffice: Revisão de Questões `commit a60494c` ✅ COMPLETO
  - [x] Página do Studio: Lista de pendentes (`/backoffice/revisao-questoes/lista`).
  - [x] Página do Studio: Detalhe da questão (`/backoffice/revisao-questoes/detalhe`).
  - [x] Página do Studio: Ações/confirmar devolutivas (`/backoffice/revisao-questoes/acoes`).
  - [x] Componentes DS necessários: Toolbar, StatusBadge, ConfirmDialog (TODOS IMPLEMENTADOS).
- [x] E2 – domains/FrontOffice: Onboarding do Aluno `commit 1e060a0` ✅ COMPLETO
  - [x] Páginas do Studio: boas-vindas, perfil inicial, tutorial.
  - [x] Componentes DS necessários: Stepper, ProgressBar, AvatarUpload (mockup).
- [x] E3 – domains/Game: Missões da Ilha 1 `commit d95fcf9` ✅ COMPLETO
  - [x] Páginas do Studio: mapa, missão ativa, conquistas.
  - [x] Componentes DS necessários: Card de missão, HUD simples, Modal de recompensa (mockup).

### Epic F – Tooling/Infra
- [x] F1 – ESLint config compartilhada + plugins aplicados `commit da05e19` ✅ VALIDADO
- [ ] F2 – Prettier + `.prettierrc` (opcional) e `format` scripts.
- [x] F3 – GitHub Actions: workflow de CI com cache pnpm e jobs de build (Sprint 3) ✅ IMPLEMENTADO
- [ ] F4 – Husky + lint-staged (opcional) para garantir qualidade em commits.

### Epic G – Governança e Manutenção
- [x] G1 – Consolidar estrutura de domínios em `domains/` (BackOffice, FrontOffice, Game). ✅ COMPLETO
- [x] G2 – Criar template reutilizável de jornada (`domains/template-jornada.md`). ✅ COMPLETO
- [x] G3 – Documentar convenções de nomenclatura e checklist de jornadas em `domains/README.md`. ✅ COMPLETO
- [x] G4 – Script para gerar índice automático de jornadas por domínio (`pnpm gen:jornadas`) (Sprint 2) ✅ COMPLETO
- [x] G5 – Validação de links em CI (lint-md ou similar) para evitar links quebrados (Sprint 3) ✅ IMPLEMENTADO
- [x] G6 – Guia de contribuição (`CONTRIBUTING.md`) com workflow de criação de jornadas (Sprint 2) ✅ COMPLETO

### Epic H – Dashboard do Projeto
- [x] H1 – Planejar layout do Dashboard do Projeto (wireframe) `commit 5e8306d` ✅ COMPLETO
- [x] H2 – Implementar endpoint e rota para index de páginas `commit 4689f7a` ✅ COMPLETO
- [ ] H3 – Implementar UI do Dashboard (aplicação mínima em `apps/studio`) (Sprint 3 - Planejado).
- [ ] H4 – Expor indicadores de saúde do repositório (Sprint 3 - Planejado).
- [ ] H5 – Link direto e badge para Storybook estático (Sprint 3 - Planejado).
- [ ] H6 – Definir requisitos de segurança/visibilidade.


---

## Backlog Priorizado (P0→P2)

### ✅ Sprint 1 (P0) – 100% Completo - VALIDADO

**Todas as issues foram implementadas, testadas e validadas. Prontas para fechamento.**

- [x] #1 – C1 Persistência em disco no Studio (API) `commit 370298d` ✅ VALIDADO
- [x] #2 – B1 Componentes de formulário (Input/Select/Checkbox/Radio/Switch) `commit 433214b` ✅ VALIDADO
- [x] #3 – D1 Página de Tokens no Storybook (visual) `commit 82cfb9b` ✅ VALIDADO
- [x] #4 – E1 BackOffice: Revisão de Questões (primeira jornada) `commit a60494c` ✅ COMPLETO
- [x] #5 – F1 ESLint unificado para monorepo `commit da05e19` ✅ VALIDADO

**Documentação:** Ver `docs/validacao-issues-p0.md` para relatório detalhado de validação.

### ✅ Sprint 2 (P1) – 100% Completo - MERGEADO

**Todas as issues foram implementadas e mergeadas em main (tag v0.2-beta).**

- [x] #6 – C2 Lista de páginas no sidebar `commit f6e99e7`
- [x] #7 – B4 Acessibilidade básica no DS (audit + melhorias)
- [x] #8 – D2 Addon A11y e validações no Storybook `commit 7fb11f7`
- [x] #9 – G4 Script: gerar índice automático de jornadas
- [x] #10 – G6 Documentação: Criar CONTRIBUTING.md com workflow de jornadas
- [x] #11 – H Epic: Dashboard do Projeto
  - [x] #12 – H1 Planejar layout/Wireframe `commit 5e8306d`
  - [x] #13 – H2 Endpoint / API para index de páginas `commit 4689f7a`
  - [x] #14 – E2 FrontOffice: Onboarding do Aluno `commit 1e060a0`
  - [x] #15 – E3 Game: Missões da Ilha 1 `commit d95fcf9`

**Documentação:** Ver `docs/sprint-2-final-report.md` para relatório detalhado.

### 🟢 Sprint 3 (P2) – 43% Completo (3/7)

**Implementações concluídas:**
- [x] F3 – GitHub Actions CI/CD (workflow completo com cache e artefatos)
- [x] C5 – Export/Import JSON por UI (API + componente React)
- [x] G5 – Validação de links em CI (markdown-link-check workflow)

**Pendentes (planejado):**
- [ ] H3 – UI Dashboard (implementação)
- [ ] H4 – Indicadores de saúde
- [ ] H5 – Link para Storybook
- [ ] B6 – Theming com tokens semânticos (BLOQUEADO - aguarda A1-A4)

**Documentação:** Ver `docs/sprint-3-concluido.md` para detalhes das implementações.

---

## Sprints (Histórico Atualizado)

### Sprint 1 (S1) – Fundação + Primeira Jornada ✅ COMPLETO

**Objetivo:** Habilitar jornada real e fundação do projeto.

**Entregues:**
- ✅ C1: Rota de persistência (CRUD JSON) - VALIDADO
- ✅ B1: Componentes de formulário (5 componentes + 40 stories) - VALIDADO
- ✅ D1: Página de Tokens no Storybook - VALIDADO
- ✅ E1: Estrutura BackOffice + 3 páginas (lista, detalhe, ações) - COMPLETO
- ✅ F1: ESLint unificado monorepo - VALIDADO

**Resultado:** 5/5 issues (100%) - Tag: v0.1.0

### Sprint 2 (S2) – Navegação + Acessibilidade + Jornadas ✅ COMPLETO

**Objetivo:** Ampliar jornadas, melhorar navegação e acessibilidade básica.

**Entregues:**
- ✅ C2: Sidebar páginas no Studio
- ✅ B4: Acessibilidade DS (audit + melhorias)
- ✅ D2: Addon A11y + validações
- ✅ G4: Script geração índice jornadas
- ✅ G6: CONTRIBUTING.md
- ✅ H1/H2: Dashboard planning + endpoint
- ✅ E2: FrontOffice Onboarding (4 páginas)
- ✅ E3: Game Missões Ilha 1 (3 páginas)

**Resultado:** 11/11 issues (100%) - Tag: v0.2-beta

### Sprint 3 (S3) – Dashboard + Automação ⏳ EM ANDAMENTO (43%)

**Objetivo:** UI Dashboard, indicadores de saúde e automações CI/CD.

**Entregues:**
- ✅ F3: GitHub Actions CI/CD
- ✅ C5: Export/Import JSON
- ✅ G5: Validação de links CI

**Em Planejamento:**
- [ ] H3/H4/H5: UI + indicadores + link Storybook
- [ ] B6: Theming (aguarda tokens semânticos A1-A4)

**Meta:** Completar H3-H5 + definir tokens semânticos com Design lead.

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
