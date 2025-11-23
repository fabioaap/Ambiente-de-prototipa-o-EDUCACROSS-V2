# scripts/validate-pr-before-merge.ps1
# Validar PR antes de permitir merge

param([int]$PRNumber = 0)

if ($PRNumber -eq 0) {
    Write-Host "Usage: .\validate-pr-before-merge.ps1 -PRNumber <number>"
    exit 1
}

Write-Host "🔍 Validando PR #$PRNumber..."
$errors = 0

# Build
Write-Host "
📦 Build..."
pnpm build
if ($LASTEXITCODE -ne 0) { $errors++ }

# Lint
Write-Host "
📝 Lint..."
pnpm lint
if ($LASTEXITCODE -ne 0) { Write-Host "⚠️ Lint warning" }

# Type-check
Write-Host "
🔷 Type-check..."
pnpm -r type-check
if ($LASTEXITCODE -ne 0) { $errors++ }

if ($errors -eq 0) {
    Write-Host "
✅ PR #$PRNumber está pronta para merge!"
} else {
    Write-Host "
❌ Erros encontrados. Corrija antes de mergear."
    exit 1
}
