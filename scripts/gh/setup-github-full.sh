#!/usr/bin/env bash
set -euo pipefail

# Full GitHub Setup Script
# This script orchestrates the complete setup of GitHub labels, issues, and project board

REPO=${1:-"fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2"}
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "========================================="
echo "🚀 EDUCACROSS GitHub Setup"
echo "========================================="
echo "Repository: $REPO"
echo "Script Directory: $SCRIPT_DIR"
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

# Step 1: Create Labels
echo "========================================="
echo "Step 1/4: Creating Labels"
echo "========================================="
"$SCRIPT_DIR/create-labels.sh" "$REPO"
echo ""

# Step 2: Create ALL Issues
echo "========================================="
echo "Step 2/4: Creating ALL Issues from backlog"
echo "========================================="
"$SCRIPT_DIR/create-issues-all.sh" "$REPO"
echo ""

# Step 3: Create Project Board
echo "========================================="
echo "Step 3/4: Creating Project Board"
echo "========================================="
"$SCRIPT_DIR/create-project.sh" "$REPO"
echo ""

# Step 4: Add Issues to Project Board
echo "========================================="
echo "Step 4/4: Adding Issues to Project Board"
echo "========================================="
echo "Note: This step may require additional permissions"
echo "If it fails, you can add issues manually via GitHub UI"
echo ""

# Try to add issues to project, but don't fail if it doesn't work
if "$SCRIPT_DIR/add-issues-to-project.sh" "$REPO"; then
    echo "✅ Issues added to project board successfully"
else
    echo "⚠️  Could not add issues to project board automatically"
    echo "   Please add them manually via GitHub UI or check permissions"
fi

echo ""
echo "========================================="
echo "✅ Setup Complete!"
echo "========================================="
echo ""
echo "Next steps:"
echo "1. Visit: https://github.com/$REPO/issues"
echo "2. Review issues and adjust priorities/labels if needed"
echo "3. Visit: https://github.com/$REPO/projects"
echo "4. Configure project columns: Backlog, In Progress, Done"
echo "5. Start working on P0 issues first!"
echo ""
echo "Summary of created items:"
echo "- Labels: epic, priority:P0/P1/P2, type:task, documentation, domain:*, tooling, status:*"
echo "- Issues: 37 issues from backlog.md (Epic A-H)"
echo "- Project: EDUCACROSS Backlog"
echo ""
