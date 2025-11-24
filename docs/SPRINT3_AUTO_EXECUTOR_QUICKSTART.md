# Sprint 3 Auto Executor - Guia de Início Rápido

## 🎯 O que é isso?

Uma ferramenta Python que automatiza a execução de issues do GitHub, respeitando dependências e criando PRs automaticamente.

## ⚡ Quick Start (3 minutos)

### 1. Instalar Dependências
```bash
pip install -r scripts/requirements.txt
```

### 2. Configurar Token GitHub
```bash
# Opção A: Via GitHub CLI
export GITHUB_TOKEN=$(gh auth token)

# Opção B: Token manual
export GITHUB_TOKEN="ghp_seu_token_aqui"
```

### 3. Executar Testes
```bash
./scripts/run-executor.sh --test
```

### 4. Dry Run (Simulação)
```bash
./scripts/run-executor.sh --dry-run
```

### 5. Ver Relatório
```bash
cat report-*.md
```

## 📊 O que ele faz?

1. **Coleta issues abertas** via GraphQL
2. **Detecta dependências** (explícitas + heurísticas)
3. **Calcula ordem de execução** (topological sort)
4. **Cria PRs** para cada issue
5. **Executa CI** e aguarda aprovação
6. **Faz merge** automaticamente
7. **Fecha issues** e atualiza Kanban
8. **Gera relatório** completo

## 🔍 Exemplo de Dependências Detectadas

### Explícitas (no corpo da issue)
```markdown
Este trabalho depende de #53 e #54
blocked by #101
Dependências: #10, #11
```

### Inferidas (heurísticas)
- **"Dashboard API"** → depende de refatorações mencionadas
- **"Dashboard UI"** → depende de "Dashboard API"
- **"Game Hub"** → depende de "Leaderboard" e "Progress"

## 📁 Arquivos Principais

| Arquivo | Descrição |
|---------|-----------|
| `scripts/sprint3_auto_executor.py` | Script principal (370 linhas) |
| `scripts/test_sprint3_executor.py` | Testes unitários |
| `scripts/run-executor.sh` | CLI wrapper com segurança |
| `docs/sprint3-auto-executor.md` | Documentação completa (16KB) |
| `.github/workflows/sprint3-auto-executor.yml` | GitHub Actions |

## 🛡️ Segurança

- ✅ **Dry-run por padrão** - não faz alterações sem confirmação
- ✅ **Detecção de ciclos** - previne deadlocks
- ✅ **Retry com backoff** - resiliente a falhas temporárias
- ✅ **Logs detalhados** - auditoria completa
- ✅ **Confirmação explícita** - "tem certeza?" antes de executar

## 🚀 Usar no GitHub Actions

1. Acesse: https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/actions
2. Selecione "Sprint 3 Auto Executor"
3. Clique "Run workflow"
4. Escolha "dry_run: true"
5. Clique "Run workflow"
6. Aguarde execução
7. Baixe relatório nos artifacts

## 📖 Documentação Completa

- **Guia completo**: [`docs/sprint3-auto-executor.md`](./sprint3-auto-executor.md)
- **Scripts**: [`scripts/README.md`](../scripts/README.md)
- **Exemplo de relatório**: [`docs/sprint3-auto-executor-example-report.md`](./sprint3-auto-executor-example-report.md)

## 🧪 Testes

```bash
# Executar todos os testes
./scripts/run-executor.sh --test

# Ou diretamente
python3 scripts/test_sprint3_executor.py
```

### Cobertura de Testes
- ✅ Detecção de dependências explícitas
- ✅ Heurísticas semânticas (6 padrões)
- ✅ Topological sort
- ✅ Validação de ordem de execução
- ✅ Detecção de ciclos

## ⚠️ Troubleshooting

### "GITHUB_TOKEN não definido"
```bash
export GITHUB_TOKEN="ghp_..."
```

### "Ciclo detectado"
- Revise as issues mencionadas no erro
- Remova dependências circulares (A→B→A)

### "Falha ao criar PR"
- Verifique permissões do token
- Delete branches órfãos: `git branch -D auto/issue-*`

## 📈 Status Atual

### ✅ Implementado
- Detecção de issues e dependências
- Topological sort
- Pipeline básico de PR/merge
- Testes unitários
- Documentação completa
- GitHub Actions workflow

### 🚧 Em Desenvolvimento
- Criação real de branches/commits (TODO markers)
- Integração completa com CI
- Movimentação de cards no Projects

### 📅 Planejado
- Execução paralela de issues independentes
- Rollback automático em caso de falha
- Notificações Slack/Email
- Dashboard web em tempo real

## 🤝 Contribuir

1. Clone o repositório
2. Crie uma branch: `git checkout -b feature/minha-feature`
3. Faça suas alterações
4. Execute testes: `./scripts/run-executor.sh --test`
5. Commit: `git commit -m "feat: minha feature"`
6. Push: `git push origin feature/minha-feature`
7. Abra um PR

## 📞 Suporte

- **Issues**: https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/issues
- **Documentação**: Ver arquivos acima
- **Contato**: @fabioaap

---

**Criado em**: 2025-11-24  
**Última atualização**: 2025-11-24  
**Versão**: 1.0.0  
**Status**: ✅ Pronto para uso em modo dry-run
