#!/usr/bin/env bash
set -euo pipefail

# Adds issues to a GitHub Projects v2 (new projects)
# Usage: ./add-issues-to-project-v2.sh [owner] [repo] [project-number]
#
# Example: ./add-issues-to-project-v2.sh fabioaap Ambiente-de-prototipa-o-EDUCACROSS-V2 3

OWNER=${1:-"fabioaap"}
REPO_NAME=${2:-"Ambiente-de-prototipa-o-EDUCACROSS-V2"}
PROJECT_NUMBER=${3:-"3"}

REPO="$OWNER/$REPO_NAME"

echo "========================================="
echo "Adding issues to GitHub Projects v2"
echo "========================================="
echo "Owner: $OWNER"
echo "Repo: $REPO"
echo "Project Number: $PROJECT_NUMBER"
echo ""

# Get the project ID
echo "Getting project ID..."
PROJECT_ID=$(gh project list --owner "$OWNER" --format json --limit 100 | jq -r ".projects[] | select(.number == $PROJECT_NUMBER) | .id")

if [ -z "$PROJECT_ID" ]; then
  echo "❌ Error: Project #$PROJECT_NUMBER not found for user $OWNER"
  echo "   Make sure the project exists at: https://github.com/users/$OWNER/projects/$PROJECT_NUMBER"
  exit 1
fi

echo "✅ Found project ID: $PROJECT_ID"
echo ""

# Get all open issues from the repository
echo "Fetching open issues from $REPO..."
ISSUES=$(gh issue list -R "$REPO" --state open --limit 200 --json number,title | jq -c '.[]')

if [ -z "$ISSUES" ]; then
  echo "⚠️  No open issues found in $REPO"
  exit 0
fi

ISSUE_COUNT=$(echo "$ISSUES" | wc -l)
echo "Found $ISSUE_COUNT open issues"
echo ""

# Add each issue to the project
SUCCESS_COUNT=0
SKIP_COUNT=0
ERROR_COUNT=0

while IFS= read -r issue; do
  ISSUE_NUMBER=$(echo "$issue" | jq -r '.number')
  ISSUE_TITLE=$(echo "$issue" | jq -r '.title')
  
  echo "Processing #$ISSUE_NUMBER: $ISSUE_TITLE"
  
  # Get the issue node ID
  ISSUE_ID=$(gh issue view "$ISSUE_NUMBER" -R "$REPO" --json id --jq '.id')
  
  if [ -z "$ISSUE_ID" ]; then
    echo "  ❌ Could not get issue ID"
    ((ERROR_COUNT++))
    continue
  fi
  
  # Try to add the issue to the project
  RESULT=$(gh project item-add "$PROJECT_NUMBER" --owner "$OWNER" --url "https://github.com/$REPO/issues/$ISSUE_NUMBER" 2>&1 || true)
  
  if echo "$RESULT" | grep -q "already exists"; then
    echo "  ⏭️  Already in project"
    ((SKIP_COUNT++))
  elif echo "$RESULT" | grep -q "error"; then
    echo "  ❌ Error: $RESULT"
    ((ERROR_COUNT++))
  else
    echo "  ✅ Added to project"
    ((SUCCESS_COUNT++))
  fi
  
done <<< "$ISSUES"

echo ""
echo "========================================="
echo "Summary"
echo "========================================="
echo "✅ Added: $SUCCESS_COUNT"
echo "⏭️  Skipped (already in project): $SKIP_COUNT"
echo "❌ Errors: $ERROR_COUNT"
echo ""
echo "View project at: https://github.com/users/$OWNER/projects/$PROJECT_NUMBER"
echo "========================================="
