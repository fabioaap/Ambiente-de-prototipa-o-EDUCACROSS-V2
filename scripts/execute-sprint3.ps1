#!/usr/bin/env pwsh
# 🤖 SPRINT 3 AUTO-EXECUTOR
# Algoritmo completo de execução até conclusão total

param(
    [switch]$DryRun = $false,
    [switch]$Parallel = $false,
    [string]$ReportPath = "sprint3-execution-report.md",
    [int]$MaxRetries = 3
)

$ErrorActionPreference = "Stop"
$ProgressPreference = "SilentlyContinue"

# 📊 TRACKING VARIABLES
$script:ExecutionLog = @()
$script:StartTime = Get-Date
$script:FailedIssues = @()
$script:CompletedIssues = @()

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

# 🔨 FUNÇÃO: Executar uma issue
function Invoke-IssueExecution {
    param(
        [int]$IssueNumber,
        [int]$RetryCount = 0
    )
    
    $issue = $issueGraph[$IssueNumber]
    $issueStartTime = Get-Date
    
    Write-Host "`n🚀 EXECUTANDO ISSUE #$IssueNumber - $($issue.Title)" -ForegroundColor Cyan
    
    # Se for issue para fechar (legada)
    if ($issue.Action -eq "close") {
        Write-Host "   📋 Issue legada - fechando automaticamente..." -ForegroundColor Yellow
        
        if (-not $DryRun) {
            try {
                gh issue close $IssueNumber --comment "Issue substituída pelas novas granulares da Sprint 3. Funcionalidade implementada em issues específicas." 2>&1 | Out-Null
                Write-Host "   ✅ Issue #$IssueNumber fechada com sucesso" -ForegroundColor Green
                
                Add-ExecutionLog -IssueNumber $IssueNumber -Status "Closed" -Duration ((Get-Date) - $issueStartTime).TotalSeconds
                $script:CompletedIssues += $IssueNumber
                return $true
            }
            catch {
                Write-Host "   ❌ Erro ao fechar issue: $_" -ForegroundColor Red
                if ($RetryCount -lt $MaxRetries) {
                    Write-Host "   🔄 Tentando novamente... (tentativa $($RetryCount + 1)/$MaxRetries)" -ForegroundColor Yellow
                    Start-Sleep -Seconds ([Math]::Pow(2, $RetryCount))
                    return Invoke-IssueExecution -IssueNumber $IssueNumber -RetryCount ($RetryCount + 1)
                }
                Add-ExecutionLog -IssueNumber $IssueNumber -Status "Failed" -Error $_.Exception.Message
                $script:FailedIssues += @{ Number = $IssueNumber; Error = $_.Exception.Message }
                return $false
            }
        }
        else {
            Write-Host "   ⏸️ DRY RUN - Issue #$IssueNumber seria fechada" -ForegroundColor Yellow
            Add-ExecutionLog -IssueNumber $IssueNumber -Status "DryRun-Close" -Duration 0
            return $true
        }
    }
    
    # Ler descrição da issue
    Write-Host "   📖 Lendo descrição da issue..."
    try {
        $issueBody = (gh issue view $IssueNumber --json body --jq '.body') 2>$null
        if ($LASTEXITCODE -ne 0) {
            throw "Falha ao ler issue #$IssueNumber"
        }
    }
    catch {
        Write-Host "   ❌ Erro ao ler issue: $_" -ForegroundColor Red
        Add-ExecutionLog -IssueNumber $IssueNumber -Status "Failed" -Error "Failed to read issue"
        $script:FailedIssues += @{ Number = $IssueNumber; Error = "Failed to read issue" }
        return $false
    }
    
    # Determinar qual agente usar baseado no título/labels
    $agentType = Get-AgentForIssue -Issue $issue -IssueBody $issueBody
    
    Write-Host "   🤖 Usando agente: $agentType" -ForegroundColor Cyan
    Write-Host "   📝 Criando plano de implementação..."
    
    if ($DryRun) {
        Write-Host "   ⏸️ DRY RUN - Simulando execução da issue #$IssueNumber" -ForegroundColor Yellow
        Write-Host "   📊 Agente selecionado: $agentType" -ForegroundColor Yellow
        Write-Host "   ⏱️  Tempo estimado: $($issue.Effort) horas" -ForegroundColor Yellow
        Add-ExecutionLog -IssueNumber $IssueNumber -Status "DryRun-Execute" -Duration 0 -Agent $agentType
        return $true
    }
    
    # Criar prompt para agente customizado
    $prompt = Build-AgentPrompt -IssueNumber $IssueNumber -Issue $issue -IssueBody $issueBody -AgentType $agentType
    
    Write-Host "`n   ⚙️ PROMPT PARA AGENTE ($agentType):" -ForegroundColor Magenta
    Write-Host $prompt -ForegroundColor White
    Write-Host "`n   💡 AÇÃO NECESSÁRIA:" -ForegroundColor Yellow
    Write-Host "   1. Copie o prompt acima" -ForegroundColor Yellow
    Write-Host "   2. Invoque o agente customizado apropriado" -ForegroundColor Yellow
    Write-Host "   3. Aguarde a conclusão da execução" -ForegroundColor Yellow
    Write-Host "   4. Execute este script novamente para continuar" -ForegroundColor Yellow
    
    Add-ExecutionLog -IssueNumber $IssueNumber -Status "Pending" -Agent $agentType
    return $false
}

# 🎯 FUNÇÃO: Determinar qual agente usar para uma issue
function Get-AgentForIssue {
    param($Issue, $IssueBody)
    
    $title = $Issue.Title.ToLower()
    $body = $IssueBody.ToLower()
    
    # DevOps: CI/CD, GitHub Actions, workflows
    if ($title -match "ci|cd|github actions|workflow|pipeline|deploy") {
        return "DevOps"
    }
    
    # FullStack: Componentes, APIs, UI, jornadas
    if ($title -match "component|api|ui|jornada|dashboard|studio|puck") {
        return "FullStack"
    }
    
    # Default to FullStack for general development
    return "FullStack"
}

# 📝 FUNÇÃO: Construir prompt para agente
function Build-AgentPrompt {
    param(
        [int]$IssueNumber,
        $Issue,
        [string]$IssueBody,
        [string]$AgentType
    )
    
    $issueTitle = $Issue.Title
    $issuePriority = $Issue.Priority
    $issueEffort = $Issue.Effort
    
    return @"
ISSUE `#$IssueNumber`: $issueTitle

CONTEXTO:
$IssueBody

REQUISITOS DE IMPLEMENTAÇÃO:
1. ✅ Implemente TODAS as funcionalidades descritas na issue acima
2. ✅ Siga os padrões do repositório (veja .github/copilot-instructions.md)
3. ✅ Execute validações: pnpm build && pnpm lint && pnpm -r type-check
4. ✅ Adicione testes se aplicável (seguindo padrões existentes)
5. ✅ Atualize documentação relevante
6. ✅ Use report_progress para commitar: "feat(`#$IssueNumber): $issueTitle (fix `#$IssueNumber)"
7. ✅ Execute code_review e codeql_checker antes de finalizar

PRIORIDADE: $issuePriority
ESFORÇO ESTIMADO: $issueEffort horas

EXECUTE A IMPLEMENTAÇÃO COMPLETA AGORA.
"@
}

# 📊 FUNÇÃO: Adicionar entrada ao log de execução
function Add-ExecutionLog {
    param(
        [int]$IssueNumber,
        [string]$Status,
        [double]$Duration = 0,
        [string]$Error = "",
        [string]$Agent = ""
    )
    
    $script:ExecutionLog += [PSCustomObject]@{
        Timestamp   = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
        IssueNumber = $IssueNumber
        Status      = $Status
        Duration    = [Math]::Round($Duration, 2)
        Error       = $Error
        Agent       = $Agent
    }
}

# 🔄 LOOP PRINCIPAL
function Start-SprintExecution {
    Write-Host "🤖 INICIANDO EXECUÇÃO AUTOMÁTICA DA SPRINT 3" -ForegroundColor Green
    Write-Host "=" * 80
    Write-Host "   Modo: $(if ($DryRun) { 'DRY RUN (simulação)' } else { 'EXECUÇÃO REAL' })"
    Write-Host "   Execução Paralela: $(if ($Parallel) { 'HABILITADA' } else { 'DESABILITADA' })"
    Write-Host "   Relatório: $ReportPath"
    Write-Host "=" * 80
    
    $iteration = 0
    $maxIterations = 20 # Proteção contra loops infinitos
    
    while ($iteration -lt $maxIterations) {
        $iteration++
        
        Write-Host "`n📊 ITERAÇÃO $iteration - Verificando issues abertas..." -ForegroundColor Cyan
        
        try {
            $openIssuesJson = (gh issue list --state open --json number) 2>$null
            if ($LASTEXITCODE -ne 0) {
                throw "Falha ao listar issues"
            }
            $openIssues = $openIssuesJson | ConvertFrom-Json
            $openCount = $openIssues.Count
        }
        catch {
            Write-Host "   ⚠️ Erro ao listar issues: $_" -ForegroundColor Red
            Write-Host "   Verifique se gh está instalado e autenticado" -ForegroundColor Yellow
            break
        }
        
        Write-Host "   Issues abertas: $openCount"
        
        if ($openCount -eq 0) {
            Write-Host "`n🎉 TODAS AS ISSUES FORAM FECHADAS! SPRINT 3 CONCLUÍDA!" -ForegroundColor Green
            break
        }
        
        # Obter lista de números de issues abertas
        $openNumbers = $openIssues | ForEach-Object { $_.number -as [int] }
        
        if ($Parallel) {
            # Modo paralelo: executa todas as issues disponíveis simultaneamente
            $readyIssues = Get-AllAvailableIssues -OpenNumbers $openNumbers
            
            if ($readyIssues.Count -eq 0) {
                Write-Host "`n⚠️ DEADLOCK ou CONCLUSÃO: Nenhuma issue disponível" -ForegroundColor Yellow
                break
            }
            
            Write-Host "   ✅ Issues disponíveis para execução paralela: $($readyIssues.Count)"
            
            $executionResults = @()
            foreach ($issue in $readyIssues) {
                Write-Host "   → #$($issue.Number) - $($issue.Title) (Prioridade: $($issue.Priority), Esforço: $($issue.Effort)h)"
                
                $result = Invoke-IssueExecution -IssueNumber $issue.Number
                $executionResults += @{ Number = $issue.Number; Success = $result }
            }
            
            # Verificar se alguma issue falhou (precisa de intervenção manual)
            $failedExecutions = $executionResults | Where-Object { -not $_.Success }
            if ($failedExecutions.Count -gt 0 -and -not $DryRun) {
                Write-Host "`n⏸️ Execução pausada - algumas issues requerem ação manual" -ForegroundColor Yellow
                $failedNums = ($failedExecutions | ForEach-Object { "#$($_.Number)" }) -join ', '
                Write-Host "   Issues pendentes: $failedNums"
                break
            }
        }
        else {
            # Modo sequencial: uma issue por vez
            $nextIssue = Get-NextAvailableIssue -OpenNumbers $openNumbers
            
            if (-not $nextIssue) {
                Write-Host "`n⚠️ DEADLOCK DETECTADO: Nenhuma issue disponível mas $openCount ainda abertas" -ForegroundColor Red
                Write-Host "   Verifique dependências manualmente com: gh issue list --state open"
                break
            }
            
            Write-Host "   ✅ Próxima issue disponível: #$($nextIssue.Number) - $($nextIssue.Title)"
            Write-Host "      Prioridade: $($nextIssue.Priority) | Esforço: $($nextIssue.Effort)h"
            
            $executed = Invoke-IssueExecution -IssueNumber $nextIssue.Number
            
            if (-not $executed -and -not $DryRun) {
                Write-Host "`n⏸️ Execução pausada aguardando implementação manual da issue #$($nextIssue.Number)"
                Write-Host "   Execute o prompt acima e depois rode este script novamente para continuar."
                break
            }
        }
        
        # Pequeno delay entre iterações
        if (-not $DryRun) {
            Start-Sleep -Seconds 2
        }
    }
    
    if ($iteration -ge $maxIterations) {
        Write-Host "`n⚠️ Número máximo de iterações atingido. Verifique o status manualmente." -ForegroundColor Yellow
    }
    
    # Gerar relatório final
    Generate-ExecutionReport
    
    Write-Host "`n📈 RELATÓRIO FINAL:"
    Write-Host "   Iterações executadas: $iteration"
    Write-Host "   Issues concluídas: $($script:CompletedIssues.Count)"
    Write-Host "   Issues falhadas: $($script:FailedIssues.Count)"
    Write-Host "   Tempo total: $([Math]::Round(((Get-Date) - $script:StartTime).TotalMinutes, 2)) minutos"
    Write-Host "   Relatório salvo em: $ReportPath"
}

# 🎯 FUNÇÃO: Obter próxima tarefa disponível (modo sequencial)
function Get-NextAvailableIssue {
    param([array]$OpenNumbers)
    
    $readyIssues = @()
    
    foreach ($issueNum in $issueGraph.Keys) {
        if ($OpenNumbers -notcontains $issueNum) { continue }
        
        $issue = $issueGraph[$issueNum]
        $allDepsResolved = $true
        
        foreach ($dep in $issue.DependsOn) {
            if ($OpenNumbers -contains $dep) {
                $allDepsResolved = $false
                break
            }
        }
        
        if ($allDepsResolved) {
            $readyIssues += [PSCustomObject]@{
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
    if ($sorted.Count -gt 0) {
        return $sorted[0]
    }
    return $null
}

# 🎯 FUNÇÃO: Obter todas as issues disponíveis (modo paralelo)
function Get-AllAvailableIssues {
    param([array]$OpenNumbers)
    
    $readyIssues = @()
    
    foreach ($issueNum in $issueGraph.Keys) {
        if ($OpenNumbers -notcontains $issueNum) { continue }
        
        $issue = $issueGraph[$issueNum]
        $allDepsResolved = $true
        
        foreach ($dep in $issue.DependsOn) {
            if ($OpenNumbers -contains $dep) {
                $allDepsResolved = $false
                break
            }
        }
        
        if ($allDepsResolved) {
            $readyIssues += [PSCustomObject]@{
                Number   = $issueNum
                Priority = $issue.Priority
                Effort   = $issue.Effort
                Title    = $issue.Title
                Action   = $issue.Action
            }
        }
    }
    
    # Ordenar por prioridade, depois esforço
    return $readyIssues | Sort-Object Priority, Effort
}

# 📄 FUNÇÃO: Gerar relatório de execução
function Generate-ExecutionReport {
    $report = @()
    $report += "# Sprint 3 - Relatório de Execução Automatizada"
    $report += ""
    $report += "**Gerado em:** $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
    $report += "**Modo:** $(if ($DryRun) { 'DRY RUN (simulação)' } else { 'EXECUÇÃO REAL' })"
    $report += "**Execução Paralela:** $(if ($Parallel) { 'Habilitada' } else { 'Desabilitada' })"
    $report += "**Tempo Total:** $([Math]::Round(((Get-Date) - $script:StartTime).TotalMinutes, 2)) minutos"
    $report += ""
    
    $report += "## 📊 Resumo"
    $report += ""
    $report += "- **Issues Concluídas:** $($script:CompletedIssues.Count)"
    $report += "- **Issues Falhadas:** $($script:FailedIssues.Count)"
    $report += "- **Total de Operações:** $($script:ExecutionLog.Count)"
    $report += ""
    
    if ($script:CompletedIssues.Count -gt 0) {
        $report += "## ✅ Issues Concluídas"
        $report += ""
        foreach ($issueNum in $script:CompletedIssues) {
            $issue = $issueGraph[$issueNum]
            $report += "- **#$issueNum**: $($issue.Title)"
        }
        $report += ""
    }
    
    if ($script:FailedIssues.Count -gt 0) {
        $report += "## ❌ Issues Falhadas"
        $report += ""
        foreach ($failure in $script:FailedIssues) {
            $report += "- **#$($failure.Number)**: $($failure.Error)"
        }
        $report += ""
    }
    
    $report += "## 📋 Log de Execução"
    $report += ""
    $report += "| Timestamp | Issue | Status | Duração (s) | Agente | Erro |"
    $report += "|-----------|-------|--------|-------------|--------|------|"
    
    foreach ($entry in $script:ExecutionLog) {
        $report += "| $($entry.Timestamp) | #$($entry.IssueNumber) | $($entry.Status) | $($entry.Duration) | $($entry.Agent) | $($entry.Error) |"
    }
    
    $report += ""
    $report += "## 🎯 Grafo de Dependências"
    $report += ""
    $report += '```'
    foreach ($issueNum in ($issueGraph.Keys | Sort-Object)) {
        $issue = $issueGraph[$issueNum]
        if ($issue.DependsOn.Count -gt 0) {
            $depsList = @()
            foreach ($dep in $issue.DependsOn) {
                $depsList += "#$dep"
            }
            $deps = $depsList -join ", "
            $report += "#$issueNum [$($issue.Title)] depende de: $deps"
        }
    }
    $report += '```'
    $report += ""
    
    $report += "---"
    $report += "*Gerado por execute-sprint3.ps1*"
    
    # Salvar relatório
    try {
        $report | Out-File -FilePath $ReportPath -Encoding UTF8
        Write-Host "`n📄 Relatório salvo em: $ReportPath" -ForegroundColor Green
    }
    catch {
        Write-Host "`n⚠️ Erro ao salvar relatório: $_" -ForegroundColor Yellow
    }
}

# 🏃 EXECUTAR
Write-Host "`n╔════════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║       SPRINT 3 AUTO-EXECUTOR - Automação de Issues            ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan

if ($DryRun) {
    Write-Host "`n🔍 MODO DRY RUN - Simulando execução sem fazer alterações" -ForegroundColor Yellow
    Write-Host "   • Nenhuma issue será fechada" -ForegroundColor Yellow
    Write-Host "   • Nenhum commit será criado" -ForegroundColor Yellow
    Write-Host "   • Apenas simulação e análise de dependências" -ForegroundColor Yellow
}

if ($Parallel) {
    Write-Host "`n⚡ MODO PARALELO HABILITADO" -ForegroundColor Cyan
    Write-Host "   • Issues independentes serão processadas simultaneamente" -ForegroundColor Cyan
    Write-Host "   • Maior eficiência em grafos com múltiplos caminhos" -ForegroundColor Cyan
}

Write-Host ""

# Verificar se gh CLI está disponível
try {
    $ghVersion = gh --version 2>&1 | Select-Object -First 1
    Write-Host "✅ GitHub CLI detectado: $ghVersion" -ForegroundColor Green
}
catch {
    Write-Host "❌ ERRO: GitHub CLI (gh) não encontrado!" -ForegroundColor Red
    Write-Host "   Instale: https://cli.github.com/" -ForegroundColor Yellow
    Write-Host "   Depois execute: gh auth login" -ForegroundColor Yellow
    exit 1
}

# Iniciar execução
try {
    Start-SprintExecution
}
catch {
    Write-Host "`n❌ ERRO CRÍTICO: $_" -ForegroundColor Red
    Write-Host "   Verifique os logs e tente novamente" -ForegroundColor Yellow
    
    # Salvar erro no relatório
    Add-ExecutionLog -IssueNumber 0 -Status "CriticalError" -Error $_.Exception.Message
    Generate-ExecutionReport
    
    exit 1
}

Write-Host "`n✅ Script concluído com sucesso!" -ForegroundColor Green
Write-Host "   📄 Relatório: $ReportPath" -ForegroundColor Cyan
Write-Host "   🔍 Status: gh issue list --state open" -ForegroundColor Cyan
Write-Host ""
