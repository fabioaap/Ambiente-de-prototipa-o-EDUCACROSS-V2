#!/usr/bin/env bash
set -euo pipefail

REPO=${1:-"fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2"}

echo "Creating backlog issues for ${REPO}..."

create_issue() {
  local title="$1"
  local body="$2"
  local labels="$3"

  # Check if an issue with the same title exists
  existing=$(gh issue list -R "$REPO" --limit 100 --json title --jq ".[] | select(.title == \"$title\")" || true)
  if [ -n "$existing" ]; then
    echo "Issue already exists: $title"
    return
  fi

  echo "Creating issue: $title"
  gh issue create -R "$REPO" --title "$title" --body "$body" --label $labels
}

create_issue "C1 - Studio: Persistência em disco (API)" "Implementar API para salvar/ler `apps/studio/data/pages/*.json` (além de localStorage)." "epic,priority:P0,domain:BackOffice,type:task"
create_issue "B1 - Design System: Componentes de formulário (Input, Select, Checkbox, Radio, Switch)" "Implementar componentes de formulário com stories e testes de acessibilidade" "epic,priority:P0,type:task"
create_issue "D1 - Storybook: Página de Tokens (visual)" "MDX ou story visualizando tokens: cores, tipografia, spacing" "epic,priority:P0,type:task"
create_issue "E1 - domains/BackOffice: Revisão de Questões (Primeira Jornada)" "Criar jornada inicial, protótipos e README" "epic,priority:P0,domain:BackOffice,type:task"
create_issue "F1 - Tooling/Infra: ESLint unificado para monorepo" "Adicionar `eslint.config.mjs` e scripts de lint no monorepo" "epic,priority:P0,type:task"
create_issue "C2 - Studio: Lista de páginas no sidebar" "Sidebar de páginas persistidas (CRUD)" "priority:P1,type:task"
create_issue "B4 - Design System: Acessibilidade" "Melhorias para roles/aria, foco visível e contraste" "priority:P1"
create_issue "D2 - Storybook: Addon A11y e validações" "Instalar addon a11y e adicionar regras básicas" "priority:P1,type:task"
create_issue "G4 - Script: Gerar índice automático de jornadas" "Script `pnpm gen:jornadas` que gera índice de jornadas" "priority:P1,type:task"
create_issue "G6 - DOCUMENTAÇÃO: Criar CONTRIBUTING.md com workflow de jornadas" "Guia de contribuição e workflow para criação de jornadas e componentes" "priority:P1,documentation"
create_issue "H - Dashboard do Projeto: Epic" "Planejar e implementar Dashboard do Projeto com métricas, links às páginas e link para Storybook" "epic,priority:P1,type:task"
create_issue "H1 - Dashboard: Planejar layout/Wireframe" "Planejar wireframe e métricas do Dashboard" "priority:P1,type:task"
create_issue "H2 - Dashboard: Endpoint / API para index de páginas" "Endpoint que retorna JSON com páginas, slug e metadata" "priority:P2,type:task"
create_issue "H3 - Dashboard: Implementar UI de listagem (POC)" "UI mínima que consome o endpoint e lista as páginas" "priority:P2,type:task"
create_issue "H4 - Dashboard: Indicadores de saúde do repositório" "Definir e exibir indicadores de saúde" "priority:P2,type:task"
create_issue "H5 - Dashboard: Link para Storybook e badge" "Adicionar link e badge do Storybook no Dashboard e READMEs de domínio" "priority:P1,type:task"
create_issue "H6 - Dashboard: Requisitos de segurança e visibilidade" "Definir permissões e capture de visibilidade para usuários" "priority:P1,type:task"

echo "Done creating issues. Review the repo to confirm and adjust as needed." 
