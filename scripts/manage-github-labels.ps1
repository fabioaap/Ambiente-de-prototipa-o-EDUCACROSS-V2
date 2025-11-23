# scripts/manage-github-labels.ps1

param([ValidateSet("create", "list", "delete")][string]$Action) {
    "create" {
        $label in $label.name --color $label.desc --force
            Write-Host "✅ Label '$label.name)' created"
        }
    }
    "list" {
        gh label list
    }
}
