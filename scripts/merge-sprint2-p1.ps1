#!/usr/bin/env pwsh
# Script de Merge Sequence – Sprint 2 P1
# Uso: .\merge-sprint2-p1.ps1

$ErrorActionPreference = "Stop"

function Test-MergeConflicts {
    param([int]$PRNumber)
    $status = gh pr checks $PRNumber --json statusCheckRollup | ConvertFrom-Json
    return $status
}

function Merge-PR {
    param(
        [int]$PRNumber,
        [string]$Title,
        [string]$CommitMessage
    )
    
    Write-Host "`n╔════════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
    Write-Host "║  Mergeando PR #$PRNumber – $Title" -ForegroundColor Cyan
    Write-Host "╚════════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
    
    # Verificar conflitos
    Write-Host "`n🔍 Verificando conflitos..." -ForegroundColor Yellow
    $checks = gh pr checks $PRNumber
    if ($checks -match "FAILURE" -or $checks -match "NEUTRAL") {
        Write-Host "⚠️  AVISO: Alguns checks não passaram. Deseja continuar? (s/n)" -ForegroundColor Yellow
        $resp = Read-Host
        if ($resp -ne "s") {
            Write-Host "❌ Merge cancelado" -ForegroundColor Red
            return $false
        }
    }
    
    # Rebasear
    Write-Host "`n📥 Rebaseando branch..." -ForegroundColor Yellow
    gh pr rebase $PRNumber --no-edit 2>&1 | Select-Object -Last 2
    
    # Merge
    Write-Host "`n🔄 Mergeando..." -ForegroundColor Yellow
    gh pr merge $PRNumber --squash -m "$CommitMessage"
    
    if ($?) {
        Write-Host "✅ Merge bem-sucedido!" -ForegroundColor Green
        
        # Validar build
        Write-Host "`n🔨 Validando build..." -ForegroundColor Yellow
        pnpm build 2>&1 | Select-Object -Last 3
        
        if ($?) {
            Write-Host "✅ Build OK" -ForegroundColor Green
            return $true
        }
        else {
            Write-Host "❌ Build falhou! Revertendo..." -ForegroundColor Red
            git revert -m 1 HEAD --no-edit
            return $false
        }
    }
    else {
        Write-Host "❌ Merge falhou!" -ForegroundColor Red
        return $false
    }
}

# SEQUÊNCIA DE MERGES
Write-Host @"
╔════════════════════════════════════════════════════════════════════════════╗
║        📋 MERGE SEQUENCE SPRINT 2 P1 – Script Automático                   ║
║        Ordem: #40 → #42 → #38 → #35 → #36                                 ║
╚════════════════════════════════════════════════════════════════════════════╝

Este script irá:
1. Rebasear cada PR em main
2. Fazer squash merge
3. Validar build pós-merge
4. Prosseguir para próxima PR ou reverter se erro

"@ -ForegroundColor Cyan

# Perguntar confirmação
Write-Host "`n⚠️  Você tem certeza que deseja prosseguir? (s/n)" -ForegroundColor Yellow
$confirm = Read-Host
if ($confirm -ne "s") {
    Write-Host "Operação cancelada" -ForegroundColor Yellow
    exit 0
}

# Garantir que estamos em main
Write-Host "`n📌 Garantindo que estamos em main..." -ForegroundColor Yellow
git checkout main
git pull origin main

# PR #40 – CONTRIBUTING.md
Write-Host "`n" 
$result40 = Merge-PR -PRNumber 40 -Title "CONTRIBUTING.md" -CommitMessage "docs(contributing): Complete CONTRIBUTING.md with workflows and conventions (Fixes #10)"
if (-not $result40) { exit 1 }

# PR #42 – Sidebar (CRÍTICO)
Write-Host "`n"
$result42 = Merge-PR -PRNumber 42 -Title "Sidebar navigation (C2)" -CommitMessage "feat(studio): Implement dynamic page navigation sidebar (Fixes #6)"
if (-not $result42) { exit 1 }

# PR #38 – Index Script
Write-Host "`n"
Write-Host "⏳ PR #38 ainda é [WIP]? Deseja mergear agora? (s/n)" -ForegroundColor Yellow
$merge38 = Read-Host
if ($merge38 -eq "s") {
    $result38 = Merge-PR -PRNumber 38 -Title "Index script (G4)" -CommitMessage "feat(scripts): Add automatic journey index generator (Fixes #9)"
    if (-not $result38) { exit 1 }
}
else {
    Write-Host "⏭️  Pulando PR #38 por enquanto" -ForegroundColor Yellow
}

# PR #35 – A11y DS
Write-Host "`n"
$result35 = Merge-PR -PRNumber 35 -Title "Accessibility improvements (B4)" -CommitMessage "feat(design-system): Improve accessibility with ARIA labels and focus management (Fixes #7)"
if (-not $result35) { exit 1 }

# PR #36 – A11y Addon (depende #35)
Write-Host "`n"
$result36 = Merge-PR -PRNumber 36 -Title "A11y addon (D2)" -CommitMessage "feat(storybook): Add A11y addon with WCAG 2.1 AA validation (Fixes #8)"
if (-not $result36) { exit 1 }

# Resumo final
Write-Host @"

╔════════════════════════════════════════════════════════════════════════════╗
║                     ✅ MERGE SEQUENCE CONCLUÍDO!                          ║
╚════════════════════════════════════════════════════════════════════════════╝

✨ Resumo:
   ✅ #40 CONTRIBUTING.md
   ✅ #42 Sidebar navigation
   $(if ($merge38 -eq "s") { "✅ #38 Index script" } else { "⏭️  #38 pulado (WIP)" })
   ✅ #35 Accessibility
   ✅ #36 A11y addon

🎉 Sprint 2 P1 COMPLETO!

Próximos passos:
  1. Comunicar time que P1 foi mergeado
  2. Iniciar Fase 1 Step 2: Dashboard strategy
  3. Mergear pequenas PRs (Grupo 3)
  4. Iniciar Fase 2: Workflow.md + automations

" -ForegroundColor Green

Write-Host "`n📊 Verificar status atual:"
Write-Host "   git log --oneline main -5"
Write-Host "   pnpm build"
Write-Host "   gh pr list --state open | wc -l"
