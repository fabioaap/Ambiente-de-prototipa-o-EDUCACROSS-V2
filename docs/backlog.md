# Backlog do Projeto – EDUCACROSS Prototipação

Este backlog organiza o trabalho para evoluir o ambiente de prototipação orientado a jornadas. É um repositório não-produtivo, com foco em velocidade e clareza para PMs, designers e devs.

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

## Epics e Tarefas

### Epic A – Tokens (@prototipo/tokens)
- [ ] A1 – Adicionar tokens semânticos (ex.: `--color-bg`, `--color-fg`, `--color-accent`).
- [ ] A2 – Suporte a tema claro/escuro via CSS vars (toggle futuro).
- [ ] A3 – Documentar tokens de tipografia e espaçamento com exemplos visuais.
- [ ] A4 – Padrão de nomes (convenção) e guia de contribuição de tokens.
- [ ] A5 – Estrutura para futura integração Figma → tokens (sem automatizar agora).

### Epic B – Design System (@prototipo/design-system)
- [ ] B1 – Componentes de formulário: `Input`, `Select`, `Checkbox`, `Radio`, `Switch`.
- [ ] B2 – Componentes de layout: `Stack`, `Grid`, `Section`, `Navbar`, `Footer`.
- [ ] B3 – Feedback/UI: `Badge`, `Tag`, `Tooltip`, `Modal`, `Toast` (API mínima).
- [ ] B4 – Acessibilidade: roles/aria, foco visível, contraste, navegação teclado.
- [ ] B5 – Página de documentação dos componentes (Storybook Docs) com exemplos reais.
- [ ] B6 – Theming: consumir tokens semânticos para variar tema global.
- [ ] B7 – Snapshot visual básico via Chromatic (opcional nesta fase).

### Epic C – Studio (Next + Puck)
- [ ] C1 – Persistência em disco: rota de API para salvar/ler `data/pages/*.json` (além de localStorage).
- [ ] C2 – Lista de páginas no sidebar (carregar do filesystem) com criar/renomear/excluir.
- [ ] C3 – Templates de página por jornada (ex.: dashboard, detalhe, formulário).
- [ ] C4 – Autocomplete do map de componentes do DS no Puck (sincronizado por arquivo único).
- [ ] C5 – Export/Import de páginas (JSON) via UI do editor.

### Epic D – Storybook
- [ ] D1 – Página de Tokens (visualizar cores/typography/spacing com exemplos).
- [ ] D2 – Addon A11y e validações mínimas.
- [ ] D3 – Play functions para interações básicas nos componentes (testes interativos).
- [ ] D4 – Agrupamento por categoria/domínio; exemplos focados em jornadas reais.

### Epic E – Jornadas (BackOffice/FrontOffice/Game)
- [ ] E1 – BackOffice: Revisão de Questões
  - [ ] Páginas do Studio: lista de pendentes, detalhe de questão, ações.
  - [ ] Componentes DS necessários: Toolbar, StatusBadge, ConfirmDialog.
- [ ] E2 – FrontOffice: Onboarding do Aluno
  - [ ] Páginas do Studio: boas-vindas, perfil inicial, tutorial.
  - [ ] Componentes DS necessários: Stepper, ProgressBar, AvatarUpload.
- [ ] E3 – Game: Missões da Ilha 1
  - [ ] Páginas do Studio: mapa, missão ativa, conquistas.
  - [ ] Componentes DS necessários: Card de missão, HUD simples, Modal de recompensa.

### Epic F – Tooling/Infra
- [ ] F1 – ESLint config compartilhada + `eslint-plugin-react` + `eslint-plugin-storybook` aplicados a pacotes/apps.
- [ ] F2 – Prettier + `.prettierrc` (opcional) e `format` scripts.
- [ ] F3 – GitHub Actions: workflow de CI com cache pnpm e jobs de build (tokens, DS, Studio, Storybook).
- [ ] F4 – Husky + lint-staged (opcional) para garantir qualidade em commits.

---

## Backlog Priorizado (P0→P2)
- P0 (alto impacto/curto prazo)
  - C1 Persistência em disco no Studio
  - D1 Página de Tokens no Storybook
  - B1 Componentes de formulário (Input/Select/Checkbox/Radio/Switch)
  - E1 BackOffice: primeira jornada com páginas base
- P1 (médio)
  - C2 Lista de páginas no sidebar
  - B4 Acessibilidade básica
  - D2 Addon A11y + D3 Play functions
  - F1 ESLint unificado
- P2 (exploração)
  - B6 Theming com tokens semânticos
  - C5 Export/Import JSON por UI
  - F3 GitHub Actions CI

---

## Sprints (proposta inicial)
- Sprint 1 (1-2 semanas)
  - C1, D1, B1 (Input + Select), E1 (estrutura e 1 página), F1.
- Sprint 2 (1-2 semanas)
  - C2, B1 (Checkbox/Radio/Switch), D2, D3, E1 (página 2/3).

---

## Critérios de Aceitação (exemplos)
- C1: é possível criar/abrir/salvar páginas pelo Studio; arquivos JSON visíveis em `apps/studio/data/pages`.
- D1: existe uma story/MDX que apresenta visualmente os tokens com amostras legíveis.
- B1: cada componente de formulário possui stories com controles e estados (foco/erro/disabled).

---

## Riscos e Assunções
- Puck OSS evolui rapidamente: manter config enxuta para facilitar upgrades.
- DS deve evitar acoplamento a frameworks CSS externos (priorizar CSS Modules + tokens).
- Evitar expandir muito escopo de CI no início (foco em prototipação). 

---

## Papéis e Rotinas (sugestão)
- Papéis: PM, Design, Frontend, QA.
- Rotinas: planning semanal curto; demo quinzenal com stakeholders.
- Issues no GitHub com labels: `epic`, `feature`, `chore`, `bug`, `docs`, `domain:backoffice|frontoffice|game`, `priority:P0|P1|P2`.

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
- Jornadas: `BackOffice/`, `FrontOffice/`, `Game/`

Mantenha este backlog vivo. Ao concluir tarefas, marque-as e adicione links para PRs e páginas do Studio/Storybook.
