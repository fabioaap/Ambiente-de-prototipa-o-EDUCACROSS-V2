# Scripts - Automação de Sprints

Este diretório contém scripts de automação para o projeto EDUCACROSS.

## 📁 Arquivos Principais

### `execute-sprint3.ps1` ⭐ NEW!

Script PowerShell avançado para automação de Sprint 3 com suporte a execução paralela e agentes customizados.

**Funcionalidades**:
- ✅ Resolução automática de dependências entre issues
- ✅ Execução sequencial ou paralela
- ✅ Seleção inteligente de agentes (DevOps/FullStack)
- ✅ Retry logic com backoff exponencial
- ✅ Geração de relatórios Markdown detalhados
- ✅ Modo dry-run para validação
- ✅ Tracking de tempo e performance

**Uso**:
```powershell
# Modo sequencial padrão
.\scripts\execute-sprint3.ps1

# Modo dry-run (simulação, recomendado primeiro)
.\scripts\execute-sprint3.ps1 -DryRun

# Modo paralelo (mais rápido)
.\scripts\execute-sprint3.ps1 -Parallel

# Combinações
.\scripts\execute-sprint3.ps1 -Parallel -DryRun
.\scripts\execute-sprint3.ps1 -ReportPath "reports/sprint3.md" -MaxRetries 5
```

**Requisitos**:
- PowerShell 7+
- GitHub CLI (`gh`) instalado e autenticado

**Documentação Completa**: [`docs/execute-sprint3-guide.md`](../docs/execute-sprint3-guide.md)

---

### `sprint3_auto_executor.py`

Script principal que automatiza a execução de issues do GitHub seguindo dependências.

**Funcionalidades**:
- ✅ Coleta issues abertas via GraphQL
- ✅ Detecta dependências explícitas e inferidas
- ✅ Executa topological sort para ordem segura
- ✅ Cria PRs, executa CI, faz merge e fecha issues
- ✅ Gera relatórios em Markdown

**Uso**:
```bash
# Modo dry-run (simulação, recomendado)
python3 scripts/sprint3_auto_executor.py --dry-run

# Modo real (cuidado!)
python3 scripts/sprint3_auto_executor.py

# Com token via argumento
python3 scripts/sprint3_auto_executor.py --token ghp_seu_token
```

**Requisitos**:
- Python 3.12+
- `requests` library (ver `requirements.txt`)
- GitHub token com permissões `repo`, `workflow`, `project`

### `test_sprint3_executor.py`

Suite de testes unitários para validar a lógica do executor.

**Uso**:
```bash
python3 scripts/test_sprint3_executor.py
```

**Testes incluídos**:
- Detecção de dependências explícitas
- Heurísticas semânticas
- Topological sort
- Validação de ordem de execução

### `requirements.txt`

Dependências Python necessárias.

**Instalação**:
```bash
pip install -r scripts/requirements.txt
```

## 🚀 Quick Start

### PowerShell Script (Recomendado para Windows/cross-platform)

1. **Verificar requisitos**:
```powershell
# PowerShell 7+
$PSVersionTable.PSVersion

# GitHub CLI
gh --version
gh auth status
```

2. **Executar em dry-run** (primeiro):
```powershell
.\scripts\execute-sprint3.ps1 -DryRun
```

3. **Conferir relatório**:
```powershell
cat sprint3-execution-report.md
```

4. **Executar de verdade**:
```powershell
.\scripts\execute-sprint3.ps1
# Ou em modo paralelo para velocidade
.\scripts\execute-sprint3.ps1 -Parallel
```

### Python Script (Alternativa)

1. **Instalar dependências**:
```bash
pip install -r scripts/requirements.txt
```

2. **Configurar token**:
```bash
export GITHUB_TOKEN="ghp_seu_token"
```

3. **Executar testes** (opcional, mas recomendado):
```bash
python3 scripts/test_sprint3_executor.py
```

4. **Executar em dry-run** (primeiro):
```bash
python3 scripts/sprint3_auto_executor.py --dry-run
```

5. **Conferir relatório**:
```bash
cat report-*.md
```

6. **Executar de verdade** (após validar):
```bash
python3 scripts/sprint3_auto_executor.py
```

## 📚 Documentação Completa

Ver: [`docs/sprint3-auto-executor.md`](../docs/sprint3-auto-executor.md)

Inclui:
- Arquitetura detalhada
- Exemplos de uso
- Configuração avançada
- Troubleshooting
- Roadmap

## ⚙️ GitHub Actions

O executor pode ser executado automaticamente via workflow:

**Arquivo**: `.github/workflows/sprint3-auto-executor.yml`

**Trigger**:
- Manual via GitHub UI (workflow_dispatch)
- Agendado (schedule, opcional)

**Como executar manualmente**:
1. Acesse: https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/actions
2. Selecione "Sprint 3 Auto Executor"
3. Clique em "Run workflow"
4. Escolha "dry_run: true" (recomendado)
5. Clique em "Run workflow"

## 🔧 Outros Scripts

### `generate-domains-index.mjs`

Gera índice de domínios para documentação.

```bash
pnpm domains:index
```

### `gen-journeys-index.js`

Gera índice de jornadas.

```bash
pnpm gen:journeys
```

## 📝 Logs e Relatórios

Após execução, são gerados (excluídos do git via `.gitignore`):

- `sprint3-autoexecutor-<timestamp>.log` - Log estruturado
- `report-<timestamp>.md` - Relatório em Markdown

**Localização**: Diretório raiz do projeto

## 🆘 Problemas Comuns

### "GITHUB_TOKEN não definido"

```bash
export GITHUB_TOKEN="ghp_seu_token"
```

### "Ciclo detectado nas dependências"

Verifique as issues mencionadas no erro e remova dependências cíclicas.

### "Falha ao criar PR"

Verifique permissões do token e se branches já existem.

## 🤝 Contribuindo

Para adicionar novos scripts:

1. Crie o arquivo em `scripts/`
2. Adicione documentação neste README
3. Se Python, adicione ao `requirements.txt` se necessário
4. Adicione testes se aplicável
5. Atualize `.gitignore` para excluir outputs

## 📞 Suporte

- Documentação: `docs/sprint3-auto-executor.md`
- Issues: https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/issues
- Docs gerais: `README.md`, `RUN_SPRINT2.md`
