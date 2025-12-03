# Scripts de Gerenciamento de Issues Falhadas

Automação para marcar e recuperar issues quando o agente GitHub Actions falhar.

## Scripts Disponíveis

### 1. `mark-failed-issue.sh`
Marca uma issue como falha quando o agente não consegue executá-la.

**Uso**:
```bash
export GH_TOKEN="seu_token_aqui"
./.github/scripts/mark-failed-issue.sh <issue-number> "<mensagem-de-erro>"
```

**Exemplo**:
```bash
./.github/scripts/mark-failed-issue.sh 105 "Erro ao compilar Alert.tsx: Module not found"
```

**O que faz**:
- ✅ Adiciona label `status:failed` (vermelho)
- ✅ Publica comentário com timestamp, workflow ID, erro reportado
- ✅ Lista próximos passos para investigação

---

### 2. `recover-failed-issue.sh`
Remove status de falha e prepara issue para nova tentativa.

**Uso**:
```bash
export GH_TOKEN="seu_token_aqui"
./.github/scripts/recover-failed-issue.sh <issue-number> "<nota-de-recuperacao>"
```

**Exemplo**:
```bash
./.github/scripts/recover-failed-issue.sh 105 "Dependência Radix instalada, pronto para retry"
```

**O que faz**:
- ✅ Remove label `status:failed`
- ✅ Publica comentário de recuperação com nota
- ✅ Indica que issue está pronta para nova execução

---

## Integração com GitHub Actions

### Exemplo de uso em workflow:

```yaml
name: Agent Task Execution

on:
  issues:
    types: [labeled]

jobs:
  execute-task:
    if: contains(github.event.label.name, 'sprint4')
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Execute task
        id: task
        run: |
          # Seu código de execução aqui
          echo "Executando tarefa da issue #${{ github.event.issue.number }}"
        continue-on-error: true
      
      - name: Mark as failed on error
        if: steps.task.outcome == 'failure'
        env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: |
          ./.github/scripts/mark-failed-issue.sh \
            ${{ github.event.issue.number }} \
            "Erro durante execução: veja logs em ${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }}"
```

---

## Filtros e Consultas

### Listar issues falhadas:
```bash
gh issue list --label "status:failed"
```

### Listar issues falhadas da Sprint 4:
```bash
gh issue list --label "status:failed,sprint4"
```

### Contar issues falhadas:
```bash
gh issue list --label "status:failed" --json number --jq 'length'
```

---

## Coluna "Falhou" no Project Board

Como a API GraphQL não permite adicionar opções a campos SingleSelect via script, você deve criar manualmente:

1. Acesse: https://github.com/users/fabioaap/projects/3
2. Clique em configurações do campo "Status" (⚙️)
3. "+ Add option" → Nome: `Falhou`, Cor: Red
4. Salvar

Após criar a coluna, você pode mover issues manualmente ou via API:
```bash
# Exemplo manual
gh issue edit 105 --add-label "status:failed"
# Depois mover no board UI para coluna "Falhou"
```

---

## Troubleshooting

### Erro: "GH_TOKEN não configurado"
```bash
export GH_TOKEN="ghp_seu_token_com_scope_repo_e_project"
gh auth status
```

### Erro: "Label 'status:failed' not found"
```bash
gh label create "status:failed" --description "Issue falhou" --color "d73a4a"
```

### Permissões necessárias no token:
- `repo` (read/write issues)
- `project` (read/write project items)

---

**Criado**: 2025-12-03  
**Manutenção**: DevOps Agent
