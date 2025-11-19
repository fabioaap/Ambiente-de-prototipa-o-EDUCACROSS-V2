#!/usr/bin/env bash
set -euo pipefail

# Quick script to add issues to an existing GitHub Projects v2
# Usage: ./quick-add-to-project.sh

OWNER="fabioaap"
REPO_NAME="Ambiente-de-prototipa-o-EDUCACROSS-V2"
PROJECT_NUMBER="3"

REPO="$OWNER/$REPO_NAME"

echo "========================================="
echo "🚀 Adding Issues to Project #$PROJECT_NUMBER"
echo "========================================="
echo "Repository: $REPO"
echo "Project: https://github.com/users/$OWNER/projects/$PROJECT_NUMBER"
echo ""

# Check if gh is installed and authenticated
if ! command -v gh &> /dev/null; then
    echo "❌ GitHub CLI (gh) is not installed"
    echo "   Install: https://cli.github.com/"
    exit 1
fi

if ! gh auth status &> /dev/null; then
    echo "❌ GitHub CLI is not authenticated"
    echo "   Run: gh auth login"
    echo "   Or: export GH_TOKEN=your_token"
    exit 1
fi

echo "✅ GitHub CLI is authenticated"
echo ""

# Get all open issues from the repository
echo "Fetching open issues from $REPO..."
ISSUE_COUNT=$(gh issue list -R "$REPO" --state open --limit 200 --json number --jq '. | length')

if [ "$ISSUE_COUNT" -eq 0 ]; then
  echo "⚠️  No open issues found in $REPO"
  echo "   Run: pnpm setup:gh:issues:all to create issues first"
  exit 0
fi

echo "Found $ISSUE_COUNT open issues"
echo ""

# Add each issue to the project
echo "Adding issues to project..."
SUCCESS_COUNT=0
SKIP_COUNT=0
ERROR_COUNT=0

gh issue list -R "$REPO" --state open --limit 200 --json number,title | jq -c '.[]' | while IFS= read -r issue; do
  ISSUE_NUMBER=$(echo "$issue" | jq -r '.number')
  ISSUE_TITLE=$(echo "$issue" | jq -r '.title')
  
  printf "  [%3d] %s... " "$ISSUE_NUMBER" "${ISSUE_TITLE:0:50}"
  
  # Try to add the issue to the project
  RESULT=$(gh project item-add "$PROJECT_NUMBER" --owner "$OWNER" --url "https://github.com/$REPO/issues/$ISSUE_NUMBER" 2>&1 || true)
  
  if echo "$RESULT" | grep -qi "already exists"; then
    echo "⏭️  (already added)"
    ((SKIP_COUNT++))
  elif echo "$RESULT" | grep -qi "error"; then
    echo "❌ (error)"
    ((ERROR_COUNT++))
  else
    echo "✅ (added)"
    ((SUCCESS_COUNT++))
  fi
done

# Get final counts (process substitution to preserve variables)
while IFS= read -r issue; do
  ISSUE_NUMBER=$(echo "$issue" | jq -r '.number')
  RESULT=$(gh project item-add "$PROJECT_NUMBER" --owner "$OWNER" --url "https://github.com/$REPO/issues/$ISSUE_NUMBER" 2>&1 || true)
  
  if echo "$RESULT" | grep -qi "already exists"; then
    ((SKIP_COUNT++))
  elif echo "$RESULT" | grep -qi "error"; then
    ((ERROR_COUNT++))
  else
    ((SUCCESS_COUNT++))
  fi
done < <(gh issue list -R "$REPO" --state open --limit 200 --json number --jq -c '.[]')

echo ""
echo "========================================="
echo "✅ Process Complete!"
echo "========================================="
echo ""
echo "View your project at:"
echo "https://github.com/users/$OWNER/projects/$PROJECT_NUMBER"
echo ""
