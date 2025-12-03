#!/bin/bash
# Script para limpar status de falha e mover issue para In Progress
# Uso: ./recover-failed-issue.sh <issue-number> "<recovery-note>"

set -e

ISSUE_NUMBER="$1"
RECOVERY_NOTE="${2:-Issue recuperada e pronta para nova tentativa}"

if [ -z "$ISSUE_NUMBER" ]; then
  echo "❌ Erro: Número da issue é obrigatório"
  echo "Uso: $0 <issue-number> \"<recovery-note>\""
  exit 1
fi

if [ -z "$GH_TOKEN" ]; then
  echo "❌ Erro: GH_TOKEN não configurado"
  exit 1
fi

echo "🔄 Recuperando issue #${ISSUE_NUMBER}..."

# Remover label status:failed
gh issue edit "$ISSUE_NUMBER" --remove-label "status:failed"

# Mover para coluna Todo no project
PROJECT_ID="PVT_kwHOAPEpKM4BIlIA"
STATUS_FIELD_ID="PVTSSF_lAHOAPEpKM4BIlIAzg4_6cY"
TODO_OPTION_ID="f75ad846"

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
  echo "   → Movendo para coluna 'Todo' no project..."
  gh api graphql -f query="
  mutation {
    updateProjectV2ItemFieldValue(input: {
      projectId: \"$PROJECT_ID\"
      itemId: \"$ITEM_ID\"
      fieldId: \"$STATUS_FIELD_ID\"
      value: {
        singleSelectOptionId: \"$TODO_OPTION_ID\"
      }
    }) {
      projectV2Item {
        id
      }
    }
  }" > /dev/null 2>&1 && echo "   ✓ Movida para 'Todo'" || echo "   ⚠ Não foi possível mover no board"
fi

# Adicionar comentário de recuperação
TIMESTAMP=$(date -u +"%Y-%m-%d %H:%M:%S UTC")
COMMENT="## ✅ Issue Recuperada

**Data/Hora**: ${TIMESTAMP}  
**Ação**: Label \`status:failed\` removida

**Nota de Recuperação**:
${RECOVERY_NOTE}

**Status**: Pronta para nova execução do agente ou trabalho manual.

---
*Recuperada automaticamente por recover-failed-issue.sh*"

gh issue comment "$ISSUE_NUMBER" --body "$COMMENT"

echo "✅ Issue #${ISSUE_NUMBER} recuperada"
echo "   - Label 'status:failed' removida"
if [ -n "$ITEM_ID" ]; then
  echo "   - Movida para coluna 'Todo' no board"
fi
echo "   - Comentário de recuperação publicado"
