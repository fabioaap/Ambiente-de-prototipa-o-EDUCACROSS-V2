#!/usr/bin/env pwsh
# 🤖 SPRINT 3 AUTO-EXECUTOR
# Algoritmo completo de execução até conclusão total

param(
    [switch]$DryRun = $false
)

$ErrorActionPreference = "Stop"

# 📋 CONFIGURAÇÃO DO GRAFO DE DEPENDÊNCIAS
$issueGraph = @{
    # Issues Sprint 3 Principais (9 issues)
    "59" = @{ Title = "Puck Refactor"; DependsOn = @(); Priority = 1; Effort = 2.5 }
    "56" = @{ Title = "BackOffice Jornada"; DependsOn = @(); Priority = 1; Effort = 5 }
    "57" = @{ Title = "FrontOffice Onboarding"; DependsOn = @(); Priority = 1; Effort = 4 }
    "60" = @{ Title = "Progress Component"; DependsOn = @(); Priority = 2; Effort = 2 }
    "61" = @{ Title = "Leaderboard Component"; DependsOn = @(); Priority = 2; Effort = 2.5 }
    "53" = @{ Title = "Dashboard API"; DependsOn = @("59"); Priority = 2; Effort = 2 }
    "54" = @{ Title = "Dashboard UI"; DependsOn = @("53"); Priority = 2; Effort = 3 }
    "55" = @{ Title = "Health Metrics"; DependsOn = @("54"); Priority = 2; Effort = 4 }
    "58" = @{ Title = "Game Hub"; DependsOn = @("61"); Priority = 2; Effort = 3 }
    
    # Issues legadas para fechar (5 issues)
    "4"  = @{ Title = "Epic BackOffice Old"; DependsOn = @("56"); Priority = 3; Effort = 0; Action = "close" }
    "11" = @{ Title = "Epic Dashboard Old"; DependsOn = @("53", "54", "55"); Priority = 3; Effort = 0; Action = "close" }
    "13" = @{ Title = "Dashboard API Old"; DependsOn = @("53"); Priority = 3; Effort = 0; Action = "close" }
    "14" = @{ Title = "Dashboard UI Old"; DependsOn = @("54"); Priority = 3; Effort = 0; Action = "close" }
    "15" = @{ Title = "Health Metrics Old"; DependsOn = @("55"); Priority = 3; Effort = 0; Action = "close" }
}

# 🎯 FUNÇÃO: Obter próxima tarefa disponível
function Get-NextAvailableIssue {
    $openIssues = gh issue list --state open --json number --jq '.[].number'
    $readyIssues = @()
    
    foreach ($issueNum in $issueGraph.Keys) {
        if ($openIssues -notcontains $issueNum) { continue }
        
        $issue = $issueGraph[$issueNum]
        $allDepsResolved = $true
        
        foreach ($dep in $issue.DependsOn) {
            if ($openIssues -contains $dep) {
                $allDepsResolved = $false
                break
            }
        }
        
        if ($allDepsResolved) {
            $readyIssues += @{
                Number   = $issueNum
                Priority = $issue.Priority
                Effort   = $issue.Effort
                Title    = $issue.Title
                Action   = $issue.Action
            }
        }
    }
    
    # Ordenar por prioridade, depois esforço
    $sorted = $readyIssues | Sort-Object Priority, Effort
    return $sorted[0]
}

# 🔨 FUNÇÃO: Executar uma issue
function Invoke-IssueExecution {
    param($IssueNumber)
    
    $issue = $issueGraph[$IssueNumber]
    Write-Host "`n🚀 EXECUTANDO ISSUE #$IssueNumber - $($issue.Title)" -ForegroundColor Cyan
    
    # Se for issue para fechar (legada)
    if ($issue.Action -eq "close") {
        Write-Host "   📋 Issue legada - fechando automaticamente..." -ForegroundColor Yellow
        if (-not $DryRun) {
            gh issue close $IssueNumber --comment "Issue substituída pelas novas granulares da Sprint 3. Funcionalidade implementada em issues específicas."
        }
        Write-Host "   ✅ Issue #$IssueNumber fechada" -ForegroundColor Green
        return $true
    }
    
    # Ler descrição da issue
    Write-Host "   📖 Lendo descrição da issue..."
    $issueBody = gh issue view $IssueNumber --json body --jq '.body'
    
    Write-Host "   📝 Criando plano de implementação..."
    Write-Host "   ⚙️ IMPLEMENTAÇÃO NECESSÁRIA (PROMPT PARA AGENTE):`n"
    
    $prompt = @"
@GitHub Copilot
MODO: Fullstack_programmer
ISSUE: #$IssueNumber - $($issue.Title)

CONTEXTO DA ISSUE:
$issueBody

INSTRUÇÕES DE IMPLEMENTAÇÃO:
1. Leia o escopo completo da issue acima
2. Identifique os arquivos que precisam ser criados/editados
3. Implemente o código necessário
4. Valide com: pnpm build && pnpm type-check
5. Se passar, faça commit: "feat(#$IssueNumber): $($issue.Title) (fix #$IssueNumber)"
6. Confirme que a issue foi resolvida

Execute agora.
"@
    
    Write-Host $prompt -ForegroundColor Magenta
    
    if ($DryRun) {
        Write-Host "`n   ⏸️ DRY RUN - Issue não será executada de fato" -ForegroundColor Yellow
        return $false
    }
    
    Write-Host "`n   ⏸️ AGUARDANDO IMPLEMENTAÇÃO MANUAL..." -ForegroundColor Yellow
    Write-Host "   💡 Copie o prompt acima e cole no chat para executar" -ForegroundColor Yellow
    return $false
}

# 🔄 LOOP PRINCIPAL
function Start-SprintExecution {
    Write-Host "🤖 INICIANDO EXECUÇÃO AUTOMÁTICA DA SPRINT 3" -ForegroundColor Green
    Write-Host "=" * 60
    
    $iteration = 0
    $maxIterations = 20 # Proteção contra loops infinitos
    
    while ($iteration -lt $maxIterations) {
        $iteration++
        
        Write-Host "`n📊 ITERAÇÃO $iteration - Verificando issues abertas..." -ForegroundColor Cyan
        
        $openCount = (gh issue list --state open --json number | ConvertFrom-Json).Count
        Write-Host "   Issues abertas: $openCount"
        
        if ($openCount -eq 0) {
            Write-Host "`n🎉 TODAS AS ISSUES FORAM FECHADAS! SPRINT 3 CONCLUÍDA!" -ForegroundColor Green
            break
        }
        
        $nextIssue = Get-NextAvailableIssue
        
        if (-not $nextIssue) {
            Write-Host "`n⚠️ DEADLOCK DETECTADO: Nenhuma issue disponível mas $openCount ainda abertas" -ForegroundColor Red
            Write-Host "   Verifique dependências manualmente com: gh issue list --state open"
            break
        }
        
        Write-Host "   ✅ Próxima issue disponível: #$($nextIssue.Number) - $($nextIssue.Title)"
        
        $executed = Invoke-IssueExecution -IssueNumber $nextIssue.Number
        
        if (-not $executed -and -not $DryRun) {
            Write-Host "`n⏸️ Execução pausada aguardando implementação manual da issue #$($nextIssue.Number)"
            Write-Host "   Execute o prompt acima e depois rode este script novamente para continuar."
            break
        }
        
        Start-Sleep -Seconds 2
    }
    
    if ($iteration -ge $maxIterations) {
        Write-Host "`n⚠️ Número máximo de iterações atingido. Verifique o status manualmente." -ForegroundColor Yellow
    }
    
    Write-Host "`n📈 RELATÓRIO FINAL:"
    Write-Host "   Iterações executadas: $iteration"
    Write-Host "   Issues restantes: $((gh issue list --state open --json number | ConvertFrom-Json).Count)"
}

# 🏃 EXECUTAR
if ($DryRun) {
    Write-Host "🔍 MODO DRY RUN - Simulando execução sem fazer alterações" -ForegroundColor Yellow
}

Start-SprintExecution

Write-Host "`n✅ Script concluído. Verifique o status com: gh issue list --state open" -ForegroundColor Green
