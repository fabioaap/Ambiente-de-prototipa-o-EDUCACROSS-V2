#!/usr/bin/env bash
set -euo pipefail

# Script to create commonly used labels in the repository
# Usage: ./create-labels.sh [owner/repo]

REPO=${1:-"fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2"}

echo "Creating labels for ${REPO}..."

labels=(
  "epic:5319e7"
  "priority:P0:b60205"
  "priority:P1:fbca04"
  "priority:P2:0e8a16"
  "type:task:1d76db"
  "documentation:0075ca"
  "domain:BackOffice:6f42c1"
  "domain:FrontOffice:0366d6"
  "domain:Game:00a3d7"
  "tooling:d4c5f9"
)

for label in "${labels[@]}"; do
  IFS=":" read -r name color <<<"$label"
  echo "Ensuring label: $name ($color)"
  if gh label list -R "$REPO" | grep -Fq "$name"; then
    echo "  Label exists: $name"
  else
    gh label create -R "$REPO" "$name" --color "$color" || true
  fi
done

echo "Labels created or already existing."
