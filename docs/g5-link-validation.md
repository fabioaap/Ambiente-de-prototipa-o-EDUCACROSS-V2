# G5 – Link Validation em CI

**Status**: ✅ Implementado  
**Branch**: `feature/g5-link-validation`  
**Data**: 2025-11-20

## Descrição

Implementação de validação automática de links em todos os arquivos Markdown através de GitHub Actions. Garante que nenhum link quebrado seja introduzido no repositório.

## O que foi implementado

### 1. GitHub Actions Workflow (`.github/workflows/link-validation.yml`)

#### Triggers
- Push para `main` e `develop`
- Pull requests contra `main` e `develop`
- Schedule diário (00:00 UTC)

#### Job: `validate-links`
- Usa `gaurav-nelson/github-action-markdown-link-check`
- Valida arquivos em:
  - Diretórios: `docs/`, `domains/`
  - Arquivos: `README.md`, `CONTRIBUTING.md`, `LEIA-PRIMEIRO.md`, etc.
- Configuração customizada via JSON
- Modo quiet (apenas erros)

### 2. Configuração (`.github/markdown-link-check-config.json`)

**Ignore Patterns**:
- localhost URLs (desenvolvimento)
- example.com URLs (documentação)
- file:// URLs (links locais)
- mailto: URLs (emails)

**Parâmetros**:
- Timeout: 20s por link
- Retry: 2 tentativas em 429 (rate limit)
- Acceptable status codes: 200, 206

## Critério de Aceitação

- [x] Workflow de link validation criado
- [x] Configuração customizada
- [x] Triggers: push, PR, schedule
- [x] Ignore patterns apropriados
- [x] Timeout adequado (20s)
- [x] Retry para rate limiting
- [x] Runs diários para monitoramento proativo
- [x] Documentação completa

## Como Funciona

### Na CI

1. **Trigger**: Push para main/develop ou PR aberto
2. **Checkout**: Clonar repositório
3. **Validação**: Verificar cada link em Markdown
4. **Report**: Exibir resultados (sucesso/falha)
5. **Feedback**: Falha a PR se houver links quebrados

### Bypass de Links

Se precisar ignorar um link específico:

```markdown
<!-- markdown-link-check-disable -->
[Broken Link](http://example.com/broken)
<!-- markdown-link-check-enable -->
```

Ou adicionar pattern em `.github/markdown-link-check-config.json`:

```json
{
  "ignorePatterns": [
    {
      "pattern": "^https://meu-link-temporario.com",
      "comment": "Link temporário durante desenvolvimento"
    }
  ]
}
```

## Links Validados

O workflow verifica:

✅ **Diretório `docs/`**
- backlog.md
- sprint-*.md
- c5-export-import.md
- f3-github-actions.md
- accessibility-audit.md
- ... todos os arquivos .md

✅ **Diretório `domains/`**
- BackOffice jornadas
- FrontOffice jornadas
- Game jornadas
- Índice de jornadas

✅ **Raiz do repositório**
- README.md
- CONTRIBUTING.md
- LEIA-PRIMEIRO.md
- PRÓXIMOS-PASSOS.md
- PRÓXIMAS-AÇÕES.md

## Próximos Passos (Sprint 3+)

- [ ] **G5b**: Link validation em PR comments (com detalhes)
- [ ] **G5c**: Slack notification em links quebrados
- [ ] **G5d**: Badge de status de links no README
- [ ] **G5e**: Monitoramento de performance de links (response time)

## Dependências

- **G6**: ✅ CONTRIBUTING.md (já existe)
- Ação GitHub: `gaurav-nelson/github-action-markdown-link-check@v1`

## Arquivos Criados

```
.github/
├── workflows/
│   └── link-validation.yml (novo - 32 linhas)
└── markdown-link-check-config.json (novo - 22 linhas)

docs/
└── g5-link-validation.md (novo - esta documentação)
```

## Validação Local

Para validar links localmente (antes de PR):

```bash
# Instalar ferramenta
npm install -g markdown-link-check

# Validar um arquivo
markdown-link-check README.md

# Validar recursivamente
find . -name "*.md" -exec markdown-link-check {} \;
```

## Troubleshooting

### Workflow falhando por rate limiting

Aumentar `retryCount` ou `fallbackRetryDelay` em `markdown-link-check-config.json`

### Links válidos sendo marcados como quebrados

1. Verificar se servidor está respondendo
2. Adicionar pattern em ignore se link for terceiro (não controlado)
3. Usar bypass HTML comment se link for temporário

### Schedule não executando

Verificar que branch `main` existe e tem permissões corretas.

## Referências

- **GitHub Action**: https://github.com/gaurav-nelson/github-action-markdown-link-check
- **Backlog**: `docs/backlog.md` (Epic G – Governança)
- **Config**: `.github/markdown-link-check-config.json`
- **Workflow**: `.github/workflows/link-validation.yml`

---

**Status**: ✅ PRONTO PARA MERGE  
**Revisor**: Aguardando PR review  
**Merge para**: `main`

**Última atualização**: 2025-11-20  
**Próxima tarefa**: B6 (Theming) após decisão de tokens semânticos
