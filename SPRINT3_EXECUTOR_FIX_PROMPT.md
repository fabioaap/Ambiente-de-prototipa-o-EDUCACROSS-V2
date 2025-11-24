# 🔧 SPRINT 3 EXECUTOR - FIX PROMPT

## 📋 EXECUTIVE SUMMARY

**Objetivo:** Corrigir bug crítico em `scripts/execute-sprint3.ps1` que impede a execução automatizada da Sprint 3 devido a corpos de issues nulos causando falha no método `.ToLower()`.

**Branch:** `copilot/fix-null-bodies-in-sprint3`

**Contexto:** O PR #74 (copilot/execute-sprint3-script) introduziu o script de automação para Sprint 3, mas um DryRun revelou que o script falha quando `gh issue view` retorna corpo nulo ou vazio, causando erro: "You cannot call a method on a null-valued expression."

**Prioridade:** 🔴 CRÍTICA - Bloqueia execução automatizada de 14 issues da Sprint 3

---

## 🎯 CONTEXTO DO PROJETO

### Repositório
- **Nome:** fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2
- **Stack:** pnpm monorepo, Next.js 15, React 18, Puck OSS, Storybook 8
- **Node:** 22 LTS
- **pnpm:** 9.14.4+

### Documentos de Referência
1. **SPRINT3_EXECUTION_MASTER.md** (`docs/`) - Cérebro da execução, define grafo de dependências
2. **SPRINT3_QUICK_START.md** (raiz) - Guia rápido de execução manual
3. **sprint3-execution-report.md** (raiz) - Último relatório do DryRun com erro
4. **docs/execute-sprint3-guide.md** - Documentação completa do script
5. **.github/copilot-instructions.md** - Padrões do repositório

### Grafo de Issues Sprint 3
O script gerencia 14 issues automaticamente:

**9 Issues Principais:**
- #59 (Puck Refactor) - P1, Blocker Crítico, sem dependências
- #56 (BackOffice Jornada) - P1, sem dependências
- #57 (FrontOffice Onboarding) - P1, sem dependências
- #60 (Progress Component) - P2, sem dependências
- #61 (Leaderboard Component) - P2, sem dependências
- #53 (Dashboard API) - P2, depende de #59
- #54 (Dashboard UI) - P2, depende de #53
- #55 (Health Metrics) - P2, depende de #54
- #58 (Game Hub) - P2, depende de #61

**5 Issues Legadas (fechar automaticamente):**
- #4, #11, #13, #14, #15 - Substituídas pelas granulares acima

---

## 🐛 DESCRIÇÃO DO BUG

### Sintoma
O script `execute-sprint3.ps1` falha durante DryRun com erro:

```
| 2025-11-24 00:35:08 | #0 | CriticalError | 0 |  | You cannot call a method on a null-valued expression. |
```

### Causa Raiz
**Arquivo:** `scripts/execute-sprint3.ps1`

**Sequência do erro:**

1. **Linha 89-92** (`Invoke-IssueExecution`):
   ```powershell
   $issueBody = (gh issue view $IssueNumber --json body --jq '.body') 2>$null
   if ($LASTEXITCODE -ne 0) {
       throw "Falha ao ler issue #$IssueNumber"
   }
   ```
   - `gh issue view` pode retornar corpo vazio ou nulo para issues sem descrição
   - Supressão de erros (`2>$null`) oculta problemas de autenticação

2. **Linha 102** (`Invoke-IssueExecution`):
   ```powershell
   $agentType = Get-AgentForIssue -Issue $issue -IssueBody $issueBody
   ```
   - Passa `$issueBody` potencialmente nulo para função

3. **Linha 131-148** (`Get-AgentForIssue`):
   ```powershell
   function Get-AgentForIssue {
       param($Issue, $IssueBody)
       
       $title = $Issue.Title.ToLower()
       $body = $IssueBody.ToLower()  # ❌ ERRO AQUI: .ToLower() em null
       
       # ... lógica de seleção de agente
   }
   ```
   - **Linha 135:** `$IssueBody.ToLower()` falha se `$IssueBody` for `$null`
   - PowerShell lança exceção: "You cannot call a method on a null-valued expression"

4. **Linha 508** (catch global):
   ```powershell
   Add-ExecutionLog -IssueNumber 0 -Status "CriticalError" -Error $_.Exception.Message
   ```
   - Erro capturado no catch global com IssueNumber = 0

### Problemas Adicionais Identificados

1. **Falta de validação em `Build-AgentPrompt`** (linha 152-184):
   - `$IssueBody` pode ser nulo, mas usado diretamente no template de prompt
   - Prompt pode ficar incompleto ou vazio

2. **Supressão de erros oculta problemas**:
   - `2>$null` e `2>&1 | Out-Null` escondem erros de autenticação do `gh`
   - Dificulta diagnóstico de falhas

3. **Nenhum fallback para corpo ausente**:
   - Script assume que toda issue tem descrição
   - Não há mensagem de alerta ou uso de título como alternativa

---

## ✅ REQUISITOS OBRIGATÓRIOS PARA O FIX

### 1. Tratamento de Nulos (CRÍTICO)

**Função `Get-AgentForIssue`** (linha 131-148):

```powershell
function Get-AgentForIssue {
    param($Issue, $IssueBody)
    
    # ✅ ADICIONAR: Validação de nulos
    $title = if ($Issue.Title) { $Issue.Title.ToLower() } else { "" }
    $body = if ($IssueBody) { $IssueBody.ToLower() } else { "" }
    
    # DevOps: CI/CD, GitHub Actions, workflows
    if ($title -match "ci|cd|github actions|workflow|pipeline|deploy") {
        return "DevOps"
    }
    
    # FullStack: Componentes, APIs, UI, jornadas
    if ($title -match "component|api|ui|jornada|dashboard|studio|puck") {
        return "FullStack"
    }
    
    # ✅ ADICIONAR: Usar body como fallback se título não for conclusivo
    if ($body -match "component|api|ui|jornada|dashboard|studio|puck") {
        return "FullStack"
    }
    
    if ($body -match "ci|cd|github actions|workflow|pipeline|deploy") {
        return "DevOps"
    }
    
    # Default to FullStack for general development
    return "FullStack"
}
```

**Função `Build-AgentPrompt`** (linha 152-184):

```powershell
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
    
    # ✅ ADICIONAR: Validação e fallback para corpo nulo
    $contextBody = if ([string]::IsNullOrWhiteSpace($IssueBody)) {
        "[AVISO] Issue sem descrição. Consulte a issue no GitHub para detalhes: gh issue view $IssueNumber"
    } else {
        $IssueBody
    }
    
    return @"
ISSUE `#$IssueNumber`: $issueTitle

CONTEXTO:
$contextBody

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
```

**Função `Invoke-IssueExecution`** (linha 86-99):

```powershell
# ✅ MELHORAR: Leitura da issue com melhor tratamento de erros
Write-Host "   📖 Lendo descrição da issue..."
try {
    $issueBody = (gh issue view $IssueNumber --json body --jq '.body') 2>&1
    if ($LASTEXITCODE -ne 0) {
        Write-Host "   ⚠️ Aviso: Falha ao ler issue #$IssueNumber (código: $LASTEXITCODE)" -ForegroundColor Yellow
        Write-Host "   Output: $issueBody" -ForegroundColor Yellow
        $issueBody = $null  # Garante que é nulo explicitamente
    }
    
    # Verificar se corpo está vazio mesmo com sucesso
    if ([string]::IsNullOrWhiteSpace($issueBody)) {
        Write-Host "   ⚠️ Aviso: Issue #$IssueNumber sem descrição" -ForegroundColor Yellow
        $issueBody = $null
    }
}
catch {
    Write-Host "   ⚠️ Exceção ao ler issue: $_" -ForegroundColor Yellow
    $issueBody = $null
}
```

### 2. Continuidade do Grafo de Dependências

**MANTER:** Algoritmo de ordenação topológica intacto (linhas 318-388)

- ✅ `Get-NextAvailableIssue`: Seleção sequencial respeitando dependências
- ✅ `Get-AllAvailableIssues`: Seleção paralela respeitando dependências
- ✅ Ordenação por prioridade (P1 > P2 > P3), depois por esforço

**GARANTIR:** Issues #53-#61 executam na ordem correta:
1. Paralelo inicial: #59, #56, #57, #60, #61 (sem dependências)
2. Após #59: #53 (Dashboard API)
3. Após #53: #54 (Dashboard UI)
4. Após #54: #55 (Health Metrics)
5. Após #61: #58 (Game Hub)

### 3. Logs e Relatório Finais

**Função `Add-ExecutionLog`** (linha 186-204):

```powershell
# ✅ ADICIONAR: Log mais detalhado quando há corpo nulo
function Add-ExecutionLog {
    param(
        [int]$IssueNumber,
        [string]$Status,
        [double]$Duration = 0,
        [string]$Error = "",
        [string]$Agent = "",
        [string]$Warning = ""  # ✅ NOVO: Campo para avisos
    )
    
    $script:ExecutionLog += [PSCustomObject]@{
        Timestamp   = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
        IssueNumber = $IssueNumber
        Status      = $Status
        Duration    = [Math]::Round($Duration, 2)
        Error       = $Error
        Agent       = $Agent
        Warning     = $Warning  # ✅ NOVO
    }
}
```

**Função `Generate-ExecutionReport`** (linha 390-465):

```powershell
# ✅ ADICIONAR: Coluna Warning na tabela de log
$report += "| Timestamp | Issue | Status | Duração (s) | Agente | Erro | Aviso |"
$report += "|-----------|-------|--------|-------------|--------|------|-------|"

foreach ($entry in $script:ExecutionLog) {
    $report += "| $($entry.Timestamp) | #$($entry.IssueNumber) | $($entry.Status) | $($entry.Duration) | $($entry.Agent) | $($entry.Error) | $($entry.Warning) |"
}
```

**ADICIONAR:** Seção de avisos no relatório:

```powershell
# Após a seção de issues falhadas
if ($script:ExecutionLog | Where-Object { $_.Warning -ne "" }) {
    $report += "## ⚠️ Avisos"
    $report += ""
    foreach ($entry in ($script:ExecutionLog | Where-Object { $_.Warning -ne "" })) {
        $report += "- **#$($entry.IssueNumber)**: $($entry.Warning)"
    }
    $report += ""
}
```

### 4. Melhorias de Diagnóstico

**ADICIONAR:** Flag verbose para debugging:

```powershell
param(
    [switch]$DryRun = $false,
    [switch]$Parallel = $false,
    [string]$ReportPath = "sprint3-execution-report.md",
    [int]$MaxRetries = 3,
    [switch]$Verbose = $false  # ✅ NOVO
)

# Usar $Verbose para logs detalhados
if ($Verbose) {
    Write-Host "   🔍 DEBUG: IssueBody = $issueBody" -ForegroundColor Gray
    Write-Host "   🔍 DEBUG: IssueBody is null/empty: $([string]::IsNullOrWhiteSpace($issueBody))" -ForegroundColor Gray
}
```

**ADICIONAR:** Teste de autenticação do gh CLI antes de iniciar:

```powershell
# Após linha 490 (verificação de gh --version)
# ✅ ADICIONAR: Teste de autenticação
try {
    $authStatus = (gh auth status 2>&1) -join "`n"
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ ERRO: GitHub CLI não está autenticado!" -ForegroundColor Red
        Write-Host "   Execute: gh auth login" -ForegroundColor Yellow
        Write-Host "   Status: $authStatus" -ForegroundColor Yellow
        exit 1
    }
    Write-Host "✅ GitHub CLI autenticado" -ForegroundColor Green
}
catch {
    Write-Host "⚠️ Aviso: Não foi possível verificar autenticação do gh" -ForegroundColor Yellow
}
```

---

## 🧪 VALIDAÇÕES OBRIGATÓRIAS

Execute estas validações NA ORDEM após implementar o fix:

### 1. Lint
```bash
cd /home/runner/work/Ambiente-de-prototipa-o-EDUCACROSS-V2/Ambiente-de-prototipa-o-EDUCACROSS-V2
pnpm lint
```
**Critério de Aceitação:** Warnings aceitáveis, 0 erros críticos

### 2. Type-check
```bash
pnpm -r type-check
```
**Critério de Aceitação:** 0 erros TypeScript

### 3. Build
```bash
pnpm build
```
**Critério de Aceitação:** Build completo sem erros (tokens → design-system → studio → storybook)

### 4. DryRun Sequencial
```powershell
pwsh scripts/execute-sprint3.ps1 -DryRun
```
**Critérios de Aceitação:**
- ✅ Script executa sem "CriticalError"
- ✅ Relatório `sprint3-execution-report.md` gerado
- ✅ Log mostra simulação de 14 issues (9 principais + 5 legadas)
- ✅ Status = "DryRun-Execute" ou "DryRun-Close"
- ✅ Grafo de dependências exibido corretamente
- ✅ Nenhum erro de "null-valued expression"

### 5. DryRun Paralelo
```powershell
pwsh scripts/execute-sprint3.ps1 -DryRun -Parallel
```
**Critérios de Aceitação:**
- ✅ Identifica 5 issues disponíveis para execução paralela inicial (#59, #56, #57, #60, #61)
- ✅ Não tenta executar issues bloqueadas (#53-#55, #58)
- ✅ Relatório gerado com modo "Paralela: Habilitada"

### 6. Verbose Test (se implementado)
```powershell
pwsh scripts/execute-sprint3.ps1 -DryRun -Verbose
```
**Critério de Aceitação:** Logs DEBUG exibem informações de depuração

### 7. Teste com Issue Sem Corpo
Crie uma issue de teste vazia para validar:
```bash
gh issue create --title "Test Empty Body" --body ""
# Anote o número da issue (ex: #999)
```

Edite temporariamente `$issueGraph` no script para incluir:
```powershell
"999" = @{ Title = "Test Empty Body"; DependsOn = @(); Priority = 4; Effort = 0 }
```

Execute DryRun:
```powershell
pwsh scripts/execute-sprint3.ps1 -DryRun
```

**Critérios de Aceitação:**
- ✅ Script processa issue #999 sem erro
- ✅ Log mostra aviso: "Issue #999 sem descrição"
- ✅ Relatório lista #999 com warning
- ✅ Agente selecionado baseado no título (FullStack por padrão)

Limpar:
```bash
gh issue close 999 --comment "Issue de teste"
```

---

## 📝 DOCUMENTAÇÃO E CLEANUP

### 1. Atualizar SPRINT3_EXECUTION_MASTER.md

**Localização:** `docs/SPRINT3_EXECUTION_MASTER.md`

**Adicionar seção:**

```markdown
## 5. 🔧 TROUBLESHOOTING

### Erro: "You cannot call a method on a null-valued expression"

**Causa:** Issue sem descrição ou problema de autenticação do gh CLI.

**Solução:**
1. Verifique autenticação: `gh auth status`
2. Se não autenticado: `gh auth login`
3. Verifique se issue tem descrição: `gh issue view <NUMBER>`
4. Execute com `-Verbose` para diagnóstico detalhado

O script agora trata automaticamente issues sem corpo, usando o título para seleção de agente.

### Erro: "Falha ao ler issue"

**Causa:** Problema de rede ou issue não existe.

**Solução:**
1. Verifique conectividade: `gh issue list`
2. Confirme que issue existe: `gh issue view <NUMBER>`
3. Execute novamente após resolver conectividade
```

### 2. Atualizar docs/execute-sprint3-guide.md

**Localização:** `docs/execute-sprint3-guide.md`

**Adicionar após seção "Como Usar" (linha ~100):**

```markdown
### Modo Verbose (Debug)

Para diagnóstico detalhado de problemas:

```powershell
.\scripts\execute-sprint3.ps1 -DryRun -Verbose
```

Exibe:
- Status de corpo de issues (nulo/vazio)
- Decisões de seleção de agente
- Detalhes de autenticação gh CLI

Útil para:
- Depurar falhas de leitura de issues
- Entender por que um agente específico foi selecionado
- Verificar problemas de autenticação
```

### 3. Regenerar sprint3-execution-report.md

Após todas as correções, execute:

```powershell
pwsh scripts/execute-sprint3.ps1 -DryRun -Parallel
```

**Resultado esperado em `sprint3-execution-report.md`:**

```markdown
# Sprint 3 - Relatório de Execução Automatizada

**Gerado em:** 2025-11-24 XX:XX:XX
**Modo:** DRY RUN (simulação)
**Execução Paralela:** Habilitada
**Tempo Total:** ~0.XX minutos

## 📊 Resumo

- **Issues Concluídas:** 0
- **Issues Falhadas:** 0
- **Total de Operações:** 14

## 📋 Log de Execução

| Timestamp | Issue | Status | Duração (s) | Agente | Erro | Aviso |
|-----------|-------|--------|-------------|--------|------|-------|
| 2025-11-24 XX:XX:XX | #59 | DryRun-Execute | 0 | FullStack | | |
| 2025-11-24 XX:XX:XX | #56 | DryRun-Execute | 0 | FullStack | | |
| ... (total 14 linhas) |

## 🎯 Grafo de Dependências

```
#11 [Epic Dashboard Old] depende de: #53, #54, #55
#13 [Dashboard API Old] depende de: #53
#14 [Dashboard UI Old] depende de: #54
#15 [Health Metrics Old] depende de: #55
#4 [Epic BackOffice Old] depende de: #56
#53 [Dashboard API] depende de: #59
#54 [Dashboard UI] depende de: #53
#55 [Health Metrics] depende de: #54
#58 [Game Hub] depende de: #61
```

---
*Gerado por execute-sprint3.ps1*
```

### 4. Limpar Cache Turbo

```bash
pnpm clean
rm -rf .turbo
```

### 5. Commit e PR

**Mensagem de Commit:**
```
fix(sprint3): corrigir bug de corpos nulos em execute-sprint3.ps1 (fix #74)

- Adicionar validação de nulos em Get-AgentForIssue e Build-AgentPrompt
- Melhorar tratamento de erros na leitura de issues
- Adicionar campo Warning no log de execução
- Implementar flag -Verbose para debugging
- Adicionar teste de autenticação gh CLI antes de iniciar
- Atualizar documentação em SPRINT3_EXECUTION_MASTER.md e execute-sprint3-guide.md
- Regenerar sprint3-execution-report.md com simulação bem-sucedida

VALIDAÇÕES EXECUTADAS:
- ✅ pnpm lint: 0 erros
- ✅ pnpm -r type-check: 0 erros
- ✅ pnpm build: sucesso
- ✅ pwsh execute-sprint3.ps1 -DryRun: sem CriticalError
- ✅ pwsh execute-sprint3.ps1 -DryRun -Parallel: 5 issues paralelas identificadas
- ✅ Teste com issue vazia: sem erro, warning registrado

BREAKING CHANGES: Nenhuma
API CHANGES: Adiciona parâmetro opcional -Verbose
```

**Descrição do PR:**

```markdown
# 🔧 Fix: Null Body Handling in execute-sprint3.ps1

## 🐛 Problema Resolvido

Corrige bug crítico que impedia execução automatizada da Sprint 3. O script falhava com erro "You cannot call a method on a null-valued expression" quando issues não tinham corpo ou quando havia problemas de autenticação com gh CLI.

**Referência:** #74 (PR original do script)

## ✅ Alterações Implementadas

### Código
1. **Get-AgentForIssue**: Validação de nulos antes de `.ToLower()`
2. **Build-AgentPrompt**: Fallback para corpo ausente com mensagem de aviso
3. **Invoke-IssueExecution**: Melhor tratamento de erros na leitura de issues
4. **Add-ExecutionLog**: Novo campo `Warning` para avisos
5. **Generate-ExecutionReport**: Coluna de avisos na tabela de log
6. **Script principal**: Teste de autenticação gh CLI antes de iniciar
7. **Novo parâmetro**: `-Verbose` para debugging detalhado

### Documentação
1. **SPRINT3_EXECUTION_MASTER.md**: Nova seção Troubleshooting
2. **execute-sprint3-guide.md**: Documentação de modo Verbose
3. **sprint3-execution-report.md**: Regenerado com sucesso (14 issues simuladas)

## 🧪 Validações Executadas

- [x] `pnpm lint` - 0 erros
- [x] `pnpm -r type-check` - 0 erros TypeScript
- [x] `pnpm build` - Build completo sem erros
- [x] `pwsh execute-sprint3.ps1 -DryRun` - Sem CriticalError, 14 issues processadas
- [x] `pwsh execute-sprint3.ps1 -DryRun -Parallel` - 5 issues paralelas identificadas (#59, #56, #57, #60, #61)
- [x] Teste com issue vazia - Sem erro, warning registrado corretamente

## 📊 Impacto

**Antes:** Script falhava imediatamente com CriticalError (#0)
**Depois:** Script processa todas as 14 issues corretamente em DryRun

**Grafo de Dependências Respeitado:**
- ✅ Paralelo inicial: #59, #56, #57, #60, #61
- ✅ Bloqueios: #53 aguarda #59, #54 aguarda #53, #55 aguarda #54, #58 aguarda #61
- ✅ Legadas: #4, #11, #13, #14, #15 serão fechadas após dependências

## 🚀 Próximos Passos

Após merge:
1. Executar `pwsh scripts/execute-sprint3.ps1 -Parallel` (modo real)
2. Monitorar execução automatizada das 14 issues
3. Finalizar Sprint 3 automaticamente

## 📸 Evidências

**Relatório DryRun Antes (com erro):**
```
| 2025-11-24 00:35:08 | #0 | CriticalError | 0 |  | You cannot call a method on a null-valued expression. |
```

**Relatório DryRun Depois (sem erro):**
```
| 2025-11-24 XX:XX:XX | #59 | DryRun-Execute | 0 | FullStack | | |
| 2025-11-24 XX:XX:XX | #56 | DryRun-Execute | 0 | FullStack | | |
... (14 issues processadas com sucesso)
```
```

---

## 🔄 FALLBACK: SEQUENCIAL vs PARALELO

### Decisão de Implementação

**AMBOS OS MODOS SÃO OBRIGATÓRIOS E JÁ IMPLEMENTADOS**

O script já suporta ambos os modos via flag `-Parallel`. Não há necessidade de fallback automático.

### Modo Sequencial (Padrão)

**Quando usar:**
- Execução controlada e focada
- Debugging de issues específicas
- Recursos limitados (CI com runners compartilhados)

**Comando:**
```powershell
pwsh scripts/execute-sprint3.ps1
```

**Comportamento:**
1. Seleciona UMA issue por vez via `Get-NextAvailableIssue`
2. Executa ou gera prompt
3. Aguarda conclusão manual se não for DryRun
4. Próxima iteração após issue concluída

### Modo Paralelo

**Quando usar:**
- Maximizar eficiência de tempo
- Aproveitar paralelismo natural do grafo (5 issues iniciais sem deps)
- Ambiente local com recursos suficientes

**Comando:**
```powershell
pwsh scripts/execute-sprint3.ps1 -Parallel
```

**Comportamento:**
1. Seleciona TODAS as issues disponíveis via `Get-AllAvailableIssues`
2. Gera prompts para todas simultaneamente
3. Aguarda conclusão manual de todas
4. Próxima iteração quando todas concluídas

### Validação de Ambos os Modos

**OBRIGATÓRIO:** Testar ambos os modos após fix:

```powershell
# Teste 1: Sequencial
pwsh scripts/execute-sprint3.ps1 -DryRun
# Espera: Processa 1 issue por iteração, total ~14 iterações

# Teste 2: Paralelo
pwsh scripts/execute-sprint3.ps1 -DryRun -Parallel
# Espera: Processa 5 issues na iteração 1, depois conforme dependências resolvem
```

### Recomendação de Uso

**Sprint 3 Production:**
```powershell
pwsh scripts/execute-sprint3.ps1 -Parallel
```

**Razão:** Grafo tem 5 issues sem dependências (#59, #56, #57, #60, #61), permitindo execução simultânea eficiente. Reduz tempo total de ~25h para ~15h (assumindo 3 issues em paralelo com agentes múltiplos).

---

## 🎯 CHECKLIST DE CONCLUSÃO

Use este checklist para validar que o fix está completo:

### Código
- [ ] `Get-AgentForIssue`: Validação de nulos implementada
- [ ] `Build-AgentPrompt`: Fallback para corpo ausente implementado
- [ ] `Invoke-IssueExecution`: Melhor tratamento de erros de leitura
- [ ] `Add-ExecutionLog`: Campo `Warning` adicionado
- [ ] `Generate-ExecutionReport`: Coluna de avisos na tabela
- [ ] Script principal: Teste de autenticação gh CLI adicionado
- [ ] Parâmetro `-Verbose` implementado (opcional mas recomendado)

### Validações
- [ ] `pnpm lint` - 0 erros
- [ ] `pnpm -r type-check` - 0 erros TypeScript
- [ ] `pnpm build` - Build completo sem erros
- [ ] `pwsh execute-sprint3.ps1 -DryRun` - Sem CriticalError
- [ ] `pwsh execute-sprint3.ps1 -DryRun -Parallel` - 5 issues paralelas identificadas
- [ ] Teste com issue vazia - Sem erro, warning registrado

### Documentação
- [ ] `SPRINT3_EXECUTION_MASTER.md` - Seção Troubleshooting adicionada
- [ ] `execute-sprint3-guide.md` - Modo Verbose documentado
- [ ] `sprint3-execution-report.md` - Regenerado com sucesso

### Cleanup
- [ ] Cache turbo limpo (`.turbo/` removido)
- [ ] Nenhum arquivo temporário commitado
- [ ] `.gitignore` atualizado se necessário

### Git
- [ ] Commit com mensagem padrão semver
- [ ] PR criado/atualizado com descrição completa
- [ ] Referência ao #74 incluída
- [ ] `code_review` executado e feedback endereçado
- [ ] `codeql_checker` executado (se aplicável)

---

## 📞 SUPORTE E REFERÊNCIAS

### Documentos Auxiliares
- `.github/copilot-instructions.md` - Padrões do repositório
- `SPRINT3_QUICK_START.md` - Guia rápido manual
- `docs/SPRINT3_EXECUTION_MASTER.md` - Cérebro da execução
- `docs/execute-sprint3-guide.md` - Documentação completa do script

### Comandos Úteis
```bash
# Verificar issues abertas
gh issue list --state open

# Ver detalhes de uma issue
gh issue view <NUMBER>

# Testar autenticação
gh auth status

# Re-autenticar
gh auth login

# Ver logs do script com verbose
pwsh scripts/execute-sprint3.ps1 -DryRun -Verbose 2>&1 | Tee-Object -FilePath debug.log
```

### Contato
**Issue Original:** #74 (copilot/execute-sprint3-script)
**Branch Atual:** copilot/fix-null-bodies-in-sprint3
**Repositório:** fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2

---

## 🚀 EXECUÇÃO IMEDIATA

Agora que você tem este prompt completo, siga estes passos:

1. **Leia o contexto acima** - Entenda o bug e objetivos
2. **Implemente as correções** - Siga a seção "Requisitos Obrigatórios"
3. **Execute validações** - NA ORDEM especificada
4. **Atualize documentação** - Conforme seção "Documentação e Cleanup"
5. **Commit e PR** - Use templates fornecidos
6. **Marque checklist** - Garanta que tudo está completo
7. **Finalize** - Execute `code_review` e `codeql_checker`

**OBJETIVO FINAL:** Script `execute-sprint3.ps1` funcionando sem erros em DryRun para ambos os modos (sequencial e paralelo), pronto para executar automaticamente as 14 issues da Sprint 3.

**SUCESSO DEFINIDO POR:**
- ✅ 0 erros em todas as validações
- ✅ DryRun processa 14 issues sem CriticalError
- ✅ Relatório gerado com grafo de dependências correto
- ✅ Documentação atualizada e completa
- ✅ PR aprovado em code_review

**COMECE AGORA!** 🚀
