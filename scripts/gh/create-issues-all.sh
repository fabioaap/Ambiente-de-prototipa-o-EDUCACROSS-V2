#!/usr/bin/env bash
set -euo pipefail

REPO=${1:-"fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2"}

echo "Creating ALL backlog issues for ${REPO}..."
echo "This script creates ALL issues from backlog.md"
echo ""

create_issue() {
  local title="$1"
  local body="$2"
  local labels="$3"

  # Check if an issue with the same title exists
  existing=$(gh issue list -R "$REPO" --limit 200 --json title --jq ".[] | select(.title == \"$title\")" || true)
  if [ -n "$existing" ]; then
    echo "  [SKIP] Issue already exists: $title"
    return
  fi

  echo "  [CREATE] Creating issue: $title"
  gh issue create -R "$REPO" --title "$title" --body "$body" --label "$labels"
}

echo "=== Epic A - Tokens ==="
create_issue "A1 - Tokens: Adicionar tokens semânticos" "Adicionar tokens semânticos (ex.: \`--color-bg\`, \`--color-fg\`, \`--color-accent\`)" "epic,type:task,tooling"
create_issue "A2 - Tokens: Suporte a tema claro/escuro" "Suporte a tema claro/escuro via CSS vars (toggle futuro)" "epic,type:task,tooling"
create_issue "A3 - Tokens: Documentar tokens de tipografia e espaçamento" "Documentar tokens de tipografia e espaçamento com exemplos visuais" "documentation,type:task"
create_issue "A4 - Tokens: Padrão de nomes e guia de contribuição" "Padrão de nomes (convenção) e guia de contribuição de tokens" "documentation,type:task"
create_issue "A5 - Tokens: Estrutura para integração Figma" "Estrutura para futura integração Figma → tokens (sem automatizar agora)" "type:task,tooling"

echo ""
echo "=== Epic B - Design System ==="
create_issue "B1 - Design System: Componentes de formulário (Input, Select, Checkbox, Radio, Switch)" "Implementar componentes de formulário com stories e testes de acessibilidade.

**Critério de Aceitação**: Cada componente possui stories com controles e estados (foco/erro/disabled)" "epic,priority:P0,type:task"

create_issue "B2 - Design System: Componentes de layout" "Componentes de layout: \`Stack\`, \`Grid\`, \`Section\`, \`Navbar\`, \`Footer\`" "epic,type:task"
create_issue "B3 - Design System: Feedback/UI" "Feedback/UI: \`Badge\`, \`Tag\`, \`Tooltip\`, \`Modal\`, \`Toast\` (API mínima)" "epic,type:task"
create_issue "B4 - Design System: Acessibilidade" "Melhorias para roles/aria, foco visível, contraste e navegação por teclado" "priority:P1,type:task"
create_issue "B5 - Design System: Página de documentação dos componentes" "Página de documentação dos componentes (Storybook Docs) com exemplos reais" "documentation,type:task"
create_issue "B6 - Design System: Theming" "Theming: consumir tokens semânticos para variar tema global" "priority:P2,type:task,tooling"
create_issue "B7 - Design System: Snapshot visual básico" "Snapshot visual básico via Chromatic (opcional nesta fase)" "type:task,tooling"

echo ""
echo "=== Epic C - Studio (Next + Puck) ==="
create_issue "C1 - Studio: Persistência em disco (API)" "Implementar API para salvar/ler \`apps/studio/data/pages/*.json\` (além de localStorage).

**Critério de Aceitação**: É possível criar/abrir/salvar páginas pelo Studio; arquivos JSON visíveis em \`apps/studio/data/pages\`" "epic,priority:P0,domain:BackOffice,type:task"

create_issue "C2 - Studio: Lista de páginas no sidebar" "Lista de páginas no sidebar (carregar do filesystem) com criar/renomear/excluir" "priority:P1,type:task"
create_issue "C3 - Studio: Templates de página por jornada" "Templates de página por jornada (ex.: dashboard, detalhe, formulário)" "type:task"
create_issue "C4 - Studio: Autocomplete do map de componentes" "Autocomplete do map de componentes do DS no Puck (sincronizado por arquivo único)" "type:task,tooling"
create_issue "C5 - Studio: Export/Import de páginas" "Export/Import de páginas (JSON) via UI do editor" "priority:P2,type:task"

echo ""
echo "=== Epic D - Storybook ==="
create_issue "D1 - Storybook: Página de Tokens (visual)" "MDX ou story visualizando tokens: cores, tipografia, spacing.

**Critério de Aceitação**: Existe uma story/MDX que apresenta visualmente os tokens com amostras legíveis" "epic,priority:P0,type:task"

create_issue "D2 - Storybook: Addon A11y e validações" "Instalar addon a11y e adicionar regras básicas de acessibilidade" "priority:P1,type:task"
create_issue "D3 - Storybook: Play functions" "Play functions para interações básicas nos componentes (testes interativos)" "priority:P1,type:task"
create_issue "D4 - Storybook: Agrupamento por categoria/domínio" "Agrupamento por categoria/domínio; exemplos focados em jornadas reais" "type:task,documentation"

echo ""
echo "=== Epic E - Jornadas ==="
create_issue "E1 - domains/BackOffice: Revisão de Questões (Primeira Jornada)" "**Páginas do Studio**: lista de pendentes, detalhe de questão, ações
**Componentes DS necessários**: Toolbar, StatusBadge, ConfirmDialog

**Subtarefas**:
- Criar estrutura de jornada em \`domains/BackOffice/journeys/revisao-questoes/\`
- Implementar componentes DS: Toolbar, StatusBadge, ConfirmDialog
- Criar páginas no Studio
- Documentar jornada no README" "epic,priority:P0,domain:BackOffice,type:task"

create_issue "E2 - domains/FrontOffice: Onboarding do Aluno" "**Páginas do Studio**: boas-vindas, perfil inicial, tutorial
**Componentes DS necessários**: Stepper, ProgressBar, AvatarUpload

**Subtarefas**:
- Criar estrutura de jornada em \`domains/FrontOffice/journeys/onboarding-aluno/\`
- Implementar componentes DS: Stepper, ProgressBar, AvatarUpload
- Criar páginas no Studio
- Documentar jornada no README" "epic,domain:FrontOffice,type:task"

create_issue "E3 - domains/Game: Missões da Ilha 1" "**Páginas do Studio**: mapa, missão ativa, conquistas
**Componentes DS necessários**: Card de missão, HUD simples, Modal de recompensa

**Subtarefas**:
- Criar estrutura de jornada em \`domains/Game/journeys/missoes-ilha-1/\`
- Implementar componentes DS: Card de missão, HUD simples, Modal de recompensa
- Criar páginas no Studio
- Documentar jornada no README" "epic,domain:Game,type:task"

echo ""
echo "=== Epic F - Tooling/Infra ==="
create_issue "F1 - Tooling/Infra: ESLint unificado para monorepo" "Adicionar \`eslint.config.mjs\` e scripts de lint no monorepo com \`eslint-plugin-react\` e \`eslint-plugin-storybook\`" "epic,priority:P0,type:task,tooling"
create_issue "F2 - Tooling/Infra: Prettier" "Prettier + \`.prettierrc\` (opcional) e \`format\` scripts" "type:task,tooling"
create_issue "F3 - Tooling/Infra: GitHub Actions CI" "GitHub Actions: workflow de CI com cache pnpm e jobs de build (tokens, DS, Studio, Storybook)" "priority:P2,type:task,tooling"
create_issue "F4 - Tooling/Infra: Husky + lint-staged" "Husky + lint-staged (opcional) para garantir qualidade em commits" "type:task,tooling"

echo ""
echo "=== Epic G - Governança e Manutenção ==="
create_issue "G4 - Script: Gerar índice automático de jornadas" "Script \`pnpm gen:jornadas\` que gera índice de jornadas por domínio" "priority:P1,type:task,tooling"
create_issue "G5 - Validação de links em CI" "Validação de links em CI (lint-md ou similar) para evitar links quebrados" "priority:P2,type:task,tooling"
create_issue "G6 - DOCUMENTAÇÃO: Criar CONTRIBUTING.md com workflow de jornadas" "Guia de contribuição e workflow para criação de jornadas e componentes" "priority:P1,documentation"

echo ""
echo "=== Epic H - Dashboard do Projeto ==="
create_issue "H - Dashboard do Projeto: Epic" "Planejar e implementar Dashboard do Projeto com métricas, links às páginas e link para Storybook" "epic,priority:P1,type:task"
create_issue "H1 - Dashboard: Planejar layout/Wireframe" "Planejar wireframe e métricas do Dashboard" "priority:P1,type:task"
create_issue "H2 - Dashboard: Endpoint / API para index de páginas" "Endpoint que retorna JSON com páginas, slug e metadata" "priority:P2,type:task"
create_issue "H3 - Dashboard: Implementar UI de listagem (POC)" "UI mínima que consome o endpoint e lista as páginas" "priority:P2,type:task"
create_issue "H4 - Dashboard: Indicadores de saúde do repositório" "Definir e exibir indicadores de saúde: status de build, última build, lint status, tamanho do bundle, dependências desatualizadas" "priority:P2,type:task"
create_issue "H5 - Dashboard: Link para Storybook e badge" "Adicionar link e badge do Storybook no Dashboard e READMEs de domínio" "priority:P1,type:task"
create_issue "H6 - Dashboard: Requisitos de segurança e visibilidade" "Definir permissões e capture de visibilidade para usuários (ambiente prod vs dev)" "priority:P1,type:task"

echo ""
echo "========================================="
echo "✅ Done creating all issues from backlog!"
echo "Total: 37 issues (Epic A-H)"
echo "Review the repo to confirm and adjust as needed."
echo "========================================="
