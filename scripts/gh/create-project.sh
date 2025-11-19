#!/usr/bin/env bash
set -euo pipefail

REPO=${1:-"fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2"}
OWNER=$(echo "$REPO" | cut -d/ -f1)
NAME=$(echo "$REPO" | cut -d/ -f2)

echo "Creating project for ${REPO} (owner: $OWNER)..."

# Create a project for the repository if it doesn't already exist
# Note: GH Projects v2 is recommended and the CLI flags can differ by version/installation.

PROJECT_TITLE="EDUCACROSS Backlog"

existing=$(gh project list --owner "$OWNER" --limit 200 --format json --jq ".[] | select(.title == \"$PROJECT_TITLE\")" || true)
if [ -n "$existing" ]; then
  echo "Project already exists: $PROJECT_TITLE"
else
  echo "Creating project: $PROJECT_TITLE"
  gh project create --owner "$OWNER" --title "$PROJECT_TITLE" --body "Project board for EDUCACROSS prototyping work" --private || true
fi

echo "Please review the project and add columns (Backlog, In Progress, Done) if not created automatically." 
