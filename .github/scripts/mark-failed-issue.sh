#!/bin/bash
# Script para marcar issue como falha quando agente GitHub Actions falhar
# Uso: ./mark-failed-issue.sh <issue-number> "<error-message>"

set -e

ISSUE_NUMBER="$1"
ERROR_MESSAGE="${2:-Falha na execução do agente GitHub Actions}"

if [ -z "$ISSUE_NUMBER" ]; then
  echo "❌ Erro: Número da issue é obrigatório"
  echo "Uso: $0 <issue-number> \"<error-message>\""
  exit 1
fi

if [ -z "$GH_TOKEN" ]; then
  echo "❌ Erro: GH_TOKEN não configurado"
  exit 1
fi

echo "🔍 Marcando issue #${ISSUE_NUMBER} como falha..."

# Adicionar label status:failed
gh issue edit "$ISSUE_NUMBER" --add-label "status:failed"

# Mover para coluna Falhou no project (se a issue estiver no project)
PROJECT_ID="PVT_kwHOAPEpKM4BIlIA"
STATUS_FIELD_ID="PVTSSF_lAHOAPEpKM4BIlIAzg4_6cY"
FALHOU_OPTION_ID="df45f6a4"

# Buscar itemId da issue no project
ITEM_ID=$(gh api graphql -f query="
{
  repository(owner: \"fabioaap\", name: \"Ambiente-de-prototipa-o-EDUCACROSS-V2\") {
    issue(number: $ISSUE_NUMBER) {
      projectItems(first: 10) {
        nodes {
          id
          project {
            id
          }
        }
      }
    }
  }
}" --jq ".data.repository.issue.projectItems.nodes[] | select(.project.id == \"$PROJECT_ID\") | .id")

if [ -n "$ITEM_ID" ]; then
  echo "   → Movendo para coluna 'Falhou' no project..."
  gh api graphql -f query="
  mutation {
    updateProjectV2ItemFieldValue(input: {
      projectId: \"$PROJECT_ID\"
      itemId: \"$ITEM_ID\"
      fieldId: \"$STATUS_FIELD_ID\"
      value: {
        singleSelectOptionId: \"$FALHOU_OPTION_ID\"
      }
    }) {
      projectV2Item {
        id
      }
    }
  }" > /dev/null 2>&1 && echo "   ✓ Movida para 'Falhou'" || echo "   ⚠ Não foi possível mover no board"
else
  echo "   ⚠ Issue não encontrada no project (pode não estar adicionada ao board)"
fi

# Adicionar comentário com detalhes da falha
TIMESTAMP=$(date -u +"%Y-%m-%d %H:%M:%S UTC")
COMMENT="## ❌ Falha na Execução do Agente

**Data/Hora**: ${TIMESTAMP}  
**Workflow**: ${GITHUB_WORKFLOW:-Manual}  
**Run ID**: ${GITHUB_RUN_ID:-N/A}

**Erro Reportado**:
\`\`\`
${ERROR_MESSAGE}
\`\`\`

**Próximos Passos**:
- [ ] Investigar logs do workflow: https://github.com/${GITHUB_REPOSITORY}/actions/runs/${GITHUB_RUN_ID:-0}
- [ ] Corrigir problema identificado
- [ ] Remover label \`status:failed\` após correção
- [ ] Mover para \"In Progress\" ou \"Todo\" no board

---
*Marcado automaticamente por mark-failed-issue.sh*"

gh issue comment "$ISSUE_NUMBER" --body "$COMMENT"

echo "✅ Issue #${ISSUE_NUMBER} marcada como falha"
echo "   - Label 'status:failed' adicionada"
if [ -n "$ITEM_ID" ]; then
  echo "   - Movida para coluna 'Falhou' no board"
fi
echo "   - Comentário de diagnóstico publicado"
