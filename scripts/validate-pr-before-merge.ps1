# scripts/validate-pr-before-merge.ps1
# Validar PR antes de permitir merge

param([int]$PRNumber -eq 0) {
    Write-Host "Usage: .\validate-pr-before-merge.ps1 -PRNumber <number>"
    exit 1
}

Write-Host "🔍 Validando PR #$errors = 0

# Build
Write-Host "$LASTEXITCODE -ne 0) { n📝 Lint..."
pnpm lint
if (n🔷 Type-check..."
pnpm -r type-check
if ($errors++ }

if (n❌ Erros encontrados. Corrija antes de mergear."
    exit 1
}
