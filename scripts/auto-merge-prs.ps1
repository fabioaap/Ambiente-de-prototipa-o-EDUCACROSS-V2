# scripts/auto-merge-prs.ps1
# Mergear PRs com label "ready-to-merge" e todos os checks OK

param(
    [ValidateSet("sprint2-p1", "sprint2-p2", "documentation", "all")]
    [string]$Label = "all",
    [switch]$DryRun = $false
)

$ErrorActionPreference = "Stop"

Write-Host "🔍 Procurando PRs com 'ready-to-merge'..."

$prs = @(gh pr list --label "ready-to-merge" --state open --json number,title,statusCheckRollup | ConvertFrom-Json)

if ($prs.Count -eq 0) {
    Write-Host "✅ Nenhuma PR para mergear no momento"
    exit 0
}

Write-Host "Found $($prs.Count) PR(s) ready to merge"

foreach ($pr in $prs) {
    $prNumber = $pr.number
    $title = $pr.title
    $status = $pr.statusCheckRollup

    if ($status -eq "PASS") {
        Write-Host "✅ PR #$prNumber: $title"
        
        if (-not $DryRun) {
            gh pr merge $prNumber --squash --delete-branch
            Write-Host "🔄 Merged PR #$prNumber"
        }
    } else {
        Write-Host "⏳ PR #$prNumber still pending: $status"
    }
}

Write-Host "`nDone!"
