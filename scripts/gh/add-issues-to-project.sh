#!/usr/bin/env bash
set -euo pipefail

# Adds issues with a given status label (default: status:backlog) to a project's column (default: Backlog)
# Usage: ./add-issues-to-project.sh [owner/repo] [project-title] [column-name] [label]

REPO=${1:-"fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2"}
PROJECT_TITLE=${2:-"EDUCACROSS Backlog"}
COLUMN_NAME=${3:-"Backlog"}
STATUS_LABEL=${4:-"status:backlog"}

echo "Repo: $REPO"
echo "Project: $PROJECT_TITLE"
echo "Column: $COLUMN_NAME"
echo "Label to match: $STATUS_LABEL"

OWNER=$(echo "$REPO" | cut -d/ -f1)
NAME=$(echo "$REPO" | cut -d/ -f2)

echo "Looking up project by title..."
PROJECT_JSON=$(gh api -H "Accept: application/vnd.github.inertia-preview+json" "/repos/$OWNER/$NAME/projects" --jq ".[] | select(.name==\"$PROJECT_TITLE\")" 2>/dev/null || true)

if [ -z "$PROJECT_JSON" ]; then
  echo "Project '$PROJECT_TITLE' not found for repo $REPO. Please make sure you created it via UI and it's accessible to your token."
  exit 1
fi

PROJECT_ID=$(echo "$PROJECT_JSON" | jq -r '.id')
echo "Found project id: $PROJECT_ID"

echo "Fetching columns for project id $PROJECT_ID"
COLUMNS_JSON=$(gh api -H "Accept: application/vnd.github.inertia-preview+json" "/projects/$PROJECT_ID/columns")
COLUMN_ID=$(echo "$COLUMNS_JSON" | jq -r ".[] | select(.name==\"$COLUMN_NAME\") | .id")

if [ -z "$COLUMN_ID" ]; then
  echo "Column '$COLUMN_NAME' not found in project '$PROJECT_TITLE'. Available columns:" 
  echo "$COLUMNS_JSON" | jq -r '.[] | "- " + .name'
  exit 1
fi

echo "Using column id: $COLUMN_ID"

echo "Fetching issues labeled '$STATUS_LABEL'"
ISSUES_JSON=$(gh issue list -R "$REPO" --label "$STATUS_LABEL" --limit 200 --json number --jq '.[] | .number' || true)

if [ -z "$ISSUES_JSON" ]; then
  echo "No issues found with label $STATUS_LABEL"
  exit 0
fi

for issue_num in $ISSUES_JSON; do
  echo "Adding issue #$issue_num as card to column $COLUMN_NAME"
  gh api -X POST -H "Accept: application/vnd.github.inertia-preview+json" "/projects/columns/$COLUMN_ID/cards" -f content_id=$issue_num -f content_type=Issue || echo "Failed to add #$issue_num (may already exist or insufficient permissions)"
done

echo "Done. Review the project board and cards." 
