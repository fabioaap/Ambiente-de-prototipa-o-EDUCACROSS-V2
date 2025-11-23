# scripts/manage-github-labels.ps1

param([ValidateSet("create", "list", "delete")][string]$Action = "list")

switch ($Action) {
    "create" {
        $labels = @(
            @{ name = "sprint2-p1"; color = "FF0000"; desc = "Critical - merge ASAP" }
            @{ name = "sprint2-p2"; color = "FFA500"; desc = "Dashboard" }
            @{ name = "ready-to-merge"; color = "00FF00"; desc = "Ready for auto-merge" }
            @{ name = "automation"; color = "0099FF"; desc = "Scripts/CI-CD" }
        )
        
        foreach ($label in $labels) {
            gh label create $label.name --color $label.color --description $label.desc --force
            Write-Host "✅ Label '$($label.name)' created"
        }
    }
    "list" {
        gh label list
    }
}
