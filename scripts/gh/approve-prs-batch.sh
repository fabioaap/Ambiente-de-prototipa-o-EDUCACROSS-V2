#!/usr/bin/env bash
set -euo pipefail

# Script to approve multiple Pull Requests in batch
# Usage: ./approve-prs-batch.sh [owner/repo] [options]
#
# Options:
#   --label LABEL       Filter PRs by label
#   --author AUTHOR     Filter PRs by author
#   --base BRANCH       Filter PRs by base branch (default: main)
#   --state STATE       Filter PRs by state (default: open)
#   --limit NUMBER      Limit number of PRs to process
#   --yes              Skip confirmation prompt (use with caution!)
#
# Examples:
#   ./approve-prs-batch.sh
#   ./approve-prs-batch.sh --label "ready-to-review"
#   ./approve-prs-batch.sh --author "dependabot[bot]" --yes
#   ./approve-prs-batch.sh --base main --limit 5

REPO=${1:-"fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2"}
LABEL=""
AUTHOR=""
BASE=""
STATE="open"
LIMIT=""
SKIP_CONFIRMATION=false

# Parse arguments
shift || true
while [[ $# -gt 0 ]]; do
  case $1 in
    --label)
      LABEL="$2"
      shift 2
      ;;
    --author)
      AUTHOR="$2"
      shift 2
      ;;
    --base)
      BASE="$2"
      shift 2
      ;;
    --state)
      STATE="$2"
      shift 2
      ;;
    --limit)
      LIMIT="$2"
      shift 2
      ;;
    --yes)
      SKIP_CONFIRMATION=true
      shift
      ;;
    *)
      echo "Unknown option: $1"
      exit 1
      ;;
  esac
done

echo "========================================="
echo "🔍 Batch PR Approval"
echo "========================================="
echo "Repository: $REPO"
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
    exit 1
fi

echo "✅ GitHub CLI is installed and authenticated"
echo ""

# Build the gh pr list command
PR_LIST_CMD="gh pr list -R \"$REPO\" --state \"$STATE\" --json number,title,author,headRefName,baseRefName,labels"

# Apply filters
FILTER_PARTS=()
if [[ -n "$LABEL" ]]; then
  FILTER_PARTS+=("(.labels | map(.name) | contains([\"$LABEL\"]))")
  echo "🏷️  Filter: label = $LABEL"
fi

if [[ -n "$AUTHOR" ]]; then
  FILTER_PARTS+=("(.author.login == \"$AUTHOR\")")
  echo "👤 Filter: author = $AUTHOR"
fi

if [[ -n "$BASE" ]]; then
  FILTER_PARTS+=("(.baseRefName == \"$BASE\")")
  echo "🌿 Filter: base branch = $BASE"
fi

# Combine filter parts with 'and'
if [[ ${#FILTER_PARTS[@]} -gt 0 ]]; then
  FILTER=$(IFS=" and "; echo "${FILTER_PARTS[*]}")
  PR_LIST_CMD="$PR_LIST_CMD --jq \"[.[] | select($FILTER)]\""
fi

if [[ -n "$LIMIT" ]]; then
  PR_LIST_CMD="$PR_LIST_CMD --limit \"$LIMIT\""
  echo "🔢 Limit: $LIMIT PRs"
fi

echo ""
echo "Fetching Pull Requests..."
echo ""

# Get PRs matching criteria
if [[ ${#FILTER_PARTS[@]} -gt 0 ]]; then
  PRS=$(eval "$PR_LIST_CMD")
else
  PRS=$(gh pr list -R "$REPO" --state "$STATE" --json number,title,author,headRefName,baseRefName,labels ${LIMIT:+--limit "$LIMIT"})
fi

# Check if any PRs were found
if [[ "$PRS" == "[]" ]] || [[ -z "$PRS" ]]; then
  echo "ℹ️  No Pull Requests found matching the criteria."
  exit 0
fi

# Parse and display PRs
PR_COUNT=$(echo "$PRS" | jq 'length')
echo "Found $PR_COUNT Pull Request(s) to approve:"
echo "========================================="

# Display PRs in a nice format
echo "$PRS" | jq -r '.[] | "  #\(.number) - \(.title)\n    Author: \(.author.login) | Branch: \(.headRefName) → \(.baseRefName)"'

echo "========================================="
echo ""

# Confirmation prompt
if [[ "$SKIP_CONFIRMATION" == false ]]; then
  read -p "Do you want to approve these $PR_COUNT PR(s)? (y/N): " -n 1 -r
  echo ""
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Approval cancelled."
    exit 0
  fi
  echo ""
fi

# Approve each PR
echo "🚀 Starting batch approval..."
echo ""

APPROVED_COUNT=0
FAILED_COUNT=0
ALREADY_APPROVED_COUNT=0

# Extract PR numbers
PR_NUMBERS=$(echo "$PRS" | jq -r '.[].number')

for PR_NUMBER in $PR_NUMBERS; do
  echo "Processing PR #$PR_NUMBER..."
  
  # Check if already approved by current user
  CURRENT_USER=$(gh api user -q '.login')
  REVIEW_STATE=$(gh pr view "$PR_NUMBER" -R "$REPO" --json reviews --jq ".reviews[] | select(.author.login == \"$CURRENT_USER\") | .state" | tail -1 || echo "")
  
  if [[ "$REVIEW_STATE" == "APPROVED" ]]; then
    echo "  ⚠️  Already approved by you"
    ((ALREADY_APPROVED_COUNT++))
  else
    # Approve the PR
    if gh pr review "$PR_NUMBER" -R "$REPO" --approve --body "✅ Batch approved" 2>&1; then
      echo "  ✅ Approved successfully"
      ((APPROVED_COUNT++))
    else
      echo "  ❌ Failed to approve"
      ((FAILED_COUNT++))
    fi
  fi
  echo ""
done

echo "========================================="
echo "📊 Batch Approval Summary"
echo "========================================="
echo "Total PRs processed: $PR_COUNT"
echo "✅ Successfully approved: $APPROVED_COUNT"
echo "⚠️  Already approved: $ALREADY_APPROVED_COUNT"
echo "❌ Failed: $FAILED_COUNT"
echo ""

if [[ $APPROVED_COUNT -gt 0 ]]; then
  echo "✨ Batch approval completed successfully!"
else
  echo "ℹ️  No new approvals were made."
fi
