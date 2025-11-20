# Backlog do Projeto – EDUCACROSS Prototipação

Ambiente de prototipação orientado a jornadas (não-produtivo). Este backlog reflete estado real de implementação e serve como fonte de verdade operacional para priorização e tracking. Atualize sempre que uma issue for fechada ou um epic tiver escopo ajustado.

## 📊 Visão de Status (Atualizado em 2025-11-20 - v0.2-beta)

| Grupo | Itens | Concluídos | % | Observações |
|-------|-------|-----------|---|-------------|
| P0 (Sprint 1) | 5 | 5 | 100% | ✅ COMPLETO - Todas implementadas e testadas |
| P1 (Sprint 2) | 11 | 11 | 100% | ✅ COMPLETO - Dashboard, jornadas, acessibilidade |
| P2 (Sprint 3) | 4 | 0 | 0% | 📋 PLANEJADO - Implementações avançadas |
| **TOTAL** | **20** | **16** | **80%** | 🎯 **Ready for Sprint 3** |

### ✅ Sprint 1 Completo (100%)
- ✅ B1 – Form Components (Input, Select, Checkbox, Radio, Switch)
- ✅ C1 – API de persistência (CRUD páginas JSON)
- ✅ D1 – Página de Tokens no Storybook
- ✅ E1 – Jornada BackOffice: Revisão de Questões
- ✅ F1 – ESLint unificado monorepo

### ✅ Sprint 2 Completo (100%)
- ✅ C2 – Studio Sidebar com lista de páginas
- ✅ D2 – Addon A11y integrado ao Storybook
- ✅ H1 – Dashboard planning e wireframe
- ✅ H2 – Dashboard endpoint (/api/dashboard/pages)
- ✅ E2 – FrontOffice: Onboarding do Aluno
- ✅ E3 – Game: Missões da Ilha 1
- ✅ B4 – Acessibilidade audit (WCAG 2.1)
- ✅ D3 – Play functions para interações
- ✅ H5 – Badges e links para Storybook (parcial)
- ✅ G4 – Script de índice automático de jornadas
- ✅ G6 – CONTRIBUTING.md

### 📋 Sprint 3 Planejado (0%)
- [ ] H3 – Dashboard UI (implementação visual completa)
- [ ] H4 – Indicadores de saúde do repositório
- [ ] H5 – Link direto para Storybook (completar)
- [ ] B6 – Theming com tokens semânticos

### Fontes auxiliares
- `docs/issues-pendentes.md` (snapshot detalhado das issues)
- `docs/sprint-1-completo.md` (Sprint 1 retrospective)
- `docs/sprint-2-final-report.md` (Sprint 2 retrospective)
- `docs/sprint-3-planning.md` (Sprint 3 planning) 🆕
- `docs/deployment-guide.md` (v0.2-beta deployment) 🆕
- `docs/qa-testing-guide.md` (QA procedures) 🆕
- `docs/v1.0-roadmap.md` (Release roadmap) 🆕
- API: `apps/studio/src/app/api/pages/README.md`
- Scripts: `scripts/gh/*.sh` (automação de labels, issues, project board)

---

## Visão e Objetivos
- Validar fluxos e jornadas rapidamente com Puck (editor visual) + Design System.
- Centralizar componentes reutilizáveis e tokens em monorepo (`pnpm workspaces`).
- Garantir que tudo roda sem erros (dev/build) para uso por áreas de produto.

## Escopo (v0.1 → v1.0)
- v0.1: Infra básica (monorepo, tokens, DS mínimo, Studio, Storybook) – ✅ CONCLUÍDO
- v0.2-beta: Ampliação de componentes, persistência, 3 jornadas completas, Dashboard planning – ✅ CONCLUÍDO (80%)
- v0.3: Implementações avançadas (Dashboard UI, Health metrics, Theming) – 📋 PLANEJADO (Sprint 3)
- v1.0: Release estável com todas funcionalidades core, CI/CD, documentação completa – 🎯 PRÓXIMO

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

### ✅ Sprint 1 (P0) – 100% Completo
- [x] #1 – C1 Persistência em disco no Studio (API)
- [x] #2 – B1 Componentes de formulário (Input/Select/Checkbox/Radio/Switch)
- [x] #3 – D1 Página de Tokens no Storybook (visual)
- [x] #4 – E1 BackOffice: Revisão de Questões (primeira jornada)
- [x] #5 – F1 ESLint unificado para monorepo

### ✅ Sprint 2 (P1) – 100% Completo
- [x] #6 – C2 Lista de páginas no sidebar
- [x] #7 – B4 Acessibilidade básica no DS
- [x] #8 – D2 Addon A11y e validações no Storybook
- [x] #9 – G4 Script: gerar índice automático de jornadas
- [x] #10 – G6 Documentação: Criar CONTRIBUTING.md com workflow de jornadas
- [x] #11 – H Epic: Dashboard do Projeto
  - [x] #12 – H1 Planejar layout/Wireframe
  - [x] #13 – H2 Endpoint / API para index de páginas
  - [x] #14 – E2 FrontOffice: Onboarding do Aluno
  - [x] #15 – E3 Game: Missões da Ilha 1

### 🟢 Sprint 3 (P2) – Em Planejamento
- [ ] H3 UI Dashboard (implementação)
- [ ] H4 Indicadores de saúde
- [ ] H5 Link para Storybook
- [ ] B6 Theming com tokens semânticos
- [ ] C5 Export/Import JSON por UI
- [ ] F3 GitHub Actions CI
- [ ] G5 Validação de links em CI

---

## Sprints (Replanejamento)

### Sprint Atual (S1 – foco em dados + primeira jornada)
Objetivo: habilitar jornada real e encerrar pendências abertas.
- ✅ C1: rota de persistência (CRUD JSON) – validar e fechar issue #1
- E1: Estrutura + página inicial (lista de questões)
- Revisões finais e fechamento de issues: B1, D1, F1

### Próxima Sprint (S2 – navegação e acessibilidade)
Pré-condição: E1 página inicial concluída.
- C2: Sidebar páginas
- B4: Acessibilidade DS (foco + contraste + roles)
- D2: Addon A11y + validações
- G6: CONTRIBUTING.md
- H2: Index páginas (API + integração dashboard)

### Sprint Posterior (S3 – dashboard e automação)
- H3/H4/H5: UI + indicadores + link Storybook
- G4: Índice automático jornadas
- F3: Workflow CI básico (lint + build) 
- C5: Export/Import JSON

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
