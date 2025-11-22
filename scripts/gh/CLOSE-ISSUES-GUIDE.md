# Guia de Fechamento de Issues - Sprint 1 P0

Este documento fornece instruções passo a passo para fechar as issues P0 do Sprint 1 e mover os cards no GitHub Project.

## ✅ Issues Prontas para Fechar

As seguintes issues foram implementadas, testadas e commitadas:

- **Issue #1** - C1: Studio API Persistência em disco
- **Issue #2** - B1: Design System Componentes de formulário
- **Issue #3** - D1: Storybook Página de Tokens
- **Issue #5** - F1: ESLint unificado

**Commit de referência**: `13173c2` (branch: `copilot/implement-c1-b1-form-components`)

## 📋 Pré-requisitos

1. Ter o GitHub CLI instalado e autenticado:
```bash
gh auth login
gh auth status
```

2. Ter permissões de escrita no repositório
3. PR mergeado na branch `main`

## 🔧 Comandos para Fechamento

### 1. Fechar Issues Individualmente

Após o PR ser mergeado, execute:

```bash
# Issue #1 - C1: API Persistência
gh issue close 1 --comment "✅ Concluído e mergeado no commit 13173c2. API CRUD implementada e testada. Ver docs/sprint-1-final-delivery.md para detalhes."

# Issue #2 - B1: Form Components
gh issue close 2 --comment "✅ Concluído e mergeado no commit 13173c2. Todos os componentes (Input, Select, Checkbox, Radio, Switch) implementados com stories. Ver docs/sprint-1-final-delivery.md para detalhes."

# Issue #3 - D1: Tokens Page
gh issue close 3 --comment "✅ Concluído e mergeado no commit 13173c2. Página de tokens no Storybook com exemplos visuais. Ver docs/sprint-1-final-delivery.md para detalhes."

# Issue #5 - F1: ESLint
gh issue close 5 --comment "✅ Concluído e mergeado no commit 13173c2. ESLint unificado com 0 erros e 0 warnings. Ver docs/sprint-1-final-delivery.md para detalhes."
```

### 2. Fechar Issues em Lote

Para fechar todas de uma vez:

```bash
for issue in 1 2 3 5; do
  gh issue close $issue --comment "✅ Sprint 1 P0 concluído e mergeado no commit 13173c2. Ver docs/sprint-1-final-delivery.md para detalhes completos."
done
```

## 📊 Atualizar GitHub Project

### Listar Projetos

Primeiro, identifique o ID do projeto:

```bash
gh project list --owner fabioaap
```

### Verificar Status do Projeto

```bash
# Substitua <PROJECT_NUMBER> pelo número do projeto (ex: 3)
gh project view 3 --owner fabioaap
```

### Mover Cards para "Done"

⚠️ **Nota**: A movimentação de cards no GitHub Projects v2 via CLI requer GraphQL. Aqui está o processo:

#### Opção 1: Via Interface Web (Recomendado)

1. Acesse: https://github.com/users/fabioaap/projects/3
2. Localize os cards das issues #1, #2, #3, #5
3. Arraste cada card para a coluna "Done"

#### Opção 2: Via GitHub CLI (Avançado)

```bash
# 1. Listar items do projeto
gh project item-list 3 --owner fabioaap --format json > project-items.json

# 2. Encontrar os IDs dos items (use jq ou manualmente)
cat project-items.json | jq '.items[] | select(.content.number == 1 or .content.number == 2 or .content.number == 3 or .content.number == 5) | {id: .id, number: .content.number, title: .content.title}'

# 3. Atualizar status de cada item (substitua <ITEM_ID> pelo ID real)
gh project item-edit --project-id <PROJECT_ID> --id <ITEM_ID> --field-id <STATUS_FIELD_ID> --single-select-option-id <DONE_OPTION_ID>
```

**Referência GraphQL**:
```graphql
mutation {
  updateProjectV2ItemFieldValue(
    input: {
      projectId: "PROJECT_ID"
      itemId: "ITEM_ID"
      fieldId: "STATUS_FIELD_ID"
      value: {
        singleSelectOptionId: "DONE_OPTION_ID"
      }
    }
  ) {
    projectV2Item {
      id
    }
  }
}
```

## 🔍 Verificação

Após fechar as issues, verifique:

### 1. Issues Fechadas

```bash
gh issue list --state closed --limit 10
```

Deve mostrar as issues #1, #2, #3, #5 como fechadas.

### 2. Issues Abertas (Sprint 2)

```bash
gh issue list --state open --label "priority:P1"
```

### 3. Milestone/Project Status

```bash
# Ver issues do projeto
gh project item-list 3 --owner fabioaap

# Filtrar por status
gh project item-list 3 --owner fabioaap --format json | jq '.items[] | select(.status.name == "Done")'
```

## 📝 Atualizar Labels (Opcional)

Adicionar label "sprint-1" às issues fechadas:

```bash
for issue in 1 2 3 5; do
  gh issue edit $issue --add-label "sprint-1,completed"
done
```

## 🚀 Comunicação

Após fechar as issues, considere:

1. **Notificar a equipe**:
   - Enviar mensagem no Slack/Teams
   - Link para o PR: https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/pull/XXX
   - Link para o relatório: `docs/sprint-1-final-delivery.md`

2. **Atualizar documentação**:
   - Confirmar que `docs/backlog.md` está atualizado ✅
   - Confirmar que `docs/issues-pendentes.md` está atualizado ✅

3. **Demo (Opcional)**:
   - Preparar apresentação das funcionalidades
   - Mostrar API funcionando
   - Mostrar componentes no Storybook
   - Mostrar Tokens page

## 📚 Referências

- **Relatório completo**: `docs/sprint-1-final-delivery.md`
- **Backlog atualizado**: `docs/backlog.md`
- **Issues pendentes**: `docs/issues-pendentes.md`
- **API Documentation**: `apps/studio/src/app/api/pages/README.md`

## 🔗 Links Úteis

- **Repositório**: https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2
- **Project Board**: https://github.com/users/fabioaap/projects/3
- **Issues**: https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/issues

## ❓ Troubleshooting

### Issue não fecha

```bash
# Verificar permissões
gh auth status

# Verificar se a issue existe
gh issue view 1

# Tentar novamente com verbose
gh issue close 1 --comment "Concluído" --verbose
```

### Project card não move

- Use a interface web (opção mais confiável)
- Verifique se você tem permissões de admin no projeto
- Consulte: https://docs.github.com/en/issues/planning-and-tracking-with-projects

### PR não mergeia

```bash
# Verificar status do PR
gh pr view <PR_NUMBER> --json state,mergeable,statusCheckRollup

# Verificar se há conflitos
gh pr diff <PR_NUMBER>
```

## 📞 Suporte

Para problemas ou dúvidas:
1. Revisar `docs/sprint-1-final-delivery.md`
2. Consultar GitHub CLI docs: https://cli.github.com/manual/
3. Contactar mantenedor do projeto

---

**Última atualização**: 2025-11-21  
**Sprint**: 1 (P0)  
**Status**: ✅ Pronto para fechamento
