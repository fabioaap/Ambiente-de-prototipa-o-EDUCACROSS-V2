# scripts/auto-merge-prs.ps1
# Mergear PRs com label "ready-to-merge" e todos os checks OK

param(
    [ValidateSet("sprint2-p1", "sprint2-p2", "documentation", "all")]
    [string]$DryRun = $ErrorActionPreference = "Stop"

Write-Host "🔍 Procurando PRs com 'ready-to-merge'..."

$prs.Count -eq 0) {
    Write-Host "✅ Nenhuma PR para mergear no momento"
    exit 0
}

Write-Host "Found $prs.Count) PR(s) ready to merge"

foreach ($prs) {
    $pr.number
    $pr.title
    $pr.statusCheckRollup

    if ($prNumber: $DryRun) {
            gh pr merge $prNumber"
        }
    } else {
        Write-Host "⏳ PR #$status"
    }
}

