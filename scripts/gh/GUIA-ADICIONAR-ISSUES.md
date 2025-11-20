# Como Adicionar Issues ao Seu Projeto GitHub

## Situação Atual

Você criou um projeto GitHub Projects v2 em:
https://github.com/users/fabioaap/projects/3/views/1

Agora precisamos adicionar as issues criadas a esse projeto.

## Opção 1: Usando o Token (Recomendado)

**⚠️ IMPORTANTE: Nunca compartilhe seu token em locais públicos!**

### Passo a Passo:

1. **Configure o token no terminal** (o token não será salvo permanentemente):

```bash
export GH_TOKEN=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
```

2. **Verifique a autenticação**:

```bash
gh auth status
```

Deve mostrar: "✓ Logged in to github.com as fabioaap"

3. **Execute o script para adicionar issues ao projeto**:

```bash
pnpm setup:gh:add-to-project-v2
```

Ou diretamente:

```bash
./scripts/gh/quick-add-to-project.sh
```

4. **Verifique o resultado**:

Visite: https://github.com/users/fabioaap/projects/3/views/1

Todas as issues abertas do repositório devem estar no projeto agora.

## Opção 2: Autenticação Interativa

Se preferir não usar o token exportado:

1. **Faça login interativamente**:

```bash
gh auth login
```

2. Escolha:
   - "GitHub.com"
   - "HTTPS"
   - "Paste an authentication token"
   - Cole seu token quando solicitado

3. **Execute o script**:

```bash
pnpm setup:gh:add-to-project-v2
```

## O Que o Script Faz

O script `quick-add-to-project.sh`:
1. ✅ Lista todas as issues abertas no repositório
2. ✅ Adiciona cada issue ao projeto #3
3. ✅ Pula issues que já estão no projeto
4. ✅ Mostra um resumo do que foi adicionado

## Resolução de Problemas

### "Project not found"
- Verifique se o projeto existe em: https://github.com/users/fabioaap/projects/3
- Confirme que você tem acesso ao projeto

### "Authentication required"
- Execute: `gh auth login`
- Ou exporte o token: `export GH_TOKEN=seu_token`

### "Permission denied"
- Verifique se o token tem permissão `project`
- Gere um novo token em: https://github.com/settings/tokens

## Próximos Passos

Após adicionar as issues ao projeto:

1. **Organize as issues** no projeto por status:
   - Backlog
   - In Progress
   - Done

2. **Adicione campos personalizados** (opcional):
   - Priority (P0, P1, P2)
   - Epic (A, B, C, etc.)
   - Domain (BackOffice, FrontOffice, Game)

3. **Configure visualizações** diferentes:
   - Board view (Kanban)
   - Table view (Lista)
   - Roadmap view (Timeline)

## Segurança do Token

**Após usar o token:**

1. Se você não precisa mais dele, revogue em:
   https://github.com/settings/tokens

2. Ou mantenha-o seguro e não o compartilhe em:
   - Commits
   - Issues públicas
   - Screenshots
   - Mensagens públicas

## Arquivos Criados

- `scripts/gh/quick-add-to-project.sh` - Script principal
- `scripts/gh/add-issues-to-project-v2.sh` - Script genérico para Projects v2
- Este guia: `scripts/gh/GUIA-ADICIONAR-ISSUES.md`

## Comandos Úteis

```bash
# Listar issues abertas
gh issue list -R fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2

# Ver detalhes de uma issue
gh issue view 1 -R fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2

# Listar projetos do usuário
gh project list --owner fabioaap

# Ver itens do projeto
gh project item-list 3 --owner fabioaap
```

---

**Última atualização**: 2025-11-19  
**Projeto**: https://github.com/users/fabioaap/projects/3
