# Integração Code to Figma com EDUCACROSS

## 🎯 Objetivo

Automatizar a exportação de componentes do Storybook do projeto EDUCACROSS para Figma, criando um fluxo de sincronização bidirecional Design ↔ Dev.

## 📋 Status da Integração

- ✅ Plugin `code-to-figma` clonado em: `code-to-figma/figma-sync-engine/`
- ✅ Dependências instaladas (pnpm install)
- ✅ Build da ferramenta passou (5 packages sucessfully built)
- ⏳ Próximo: Configurar sincronização com Storybook do EDUCACROSS

## 🏗️ Arquitetura

```
domains/storybook/ (EDUCACROSS)
    ↓
code-to-figma/figma-sync-engine/ (Exportador)
    ↓
Figma Design System (via API)
```

## 📦 Componentes Disponíveis para Exportar

Seguindo `packages/design-system/src/components/`:

```
✅ Button
✅ Card
✅ Layout
✅ Text
✅ Input
✅ Select
✅ Checkbox
✅ Radio
✅ Switch
✅ Badge
✅ Progress
✅ Leaderboard
✅ HealthIndicator
```

Total: **13 componentes** prontos para sincronização.

## 🔧 Configuração Necessária

### 1. Token de Autenticação Figma

```bash
# Adicionar ao .env
FIGMA_AUTH_TOKEN=<seu-token-aqui>
FIGMA_PROJECT_ID=<seu-project-id>
FIGMA_FILE_ID=<seu-file-id>
```

[Como gerar token Figma](https://www.figma.com/developers/api#authentication)

### 2. Configurar Storybook EDUCACROSS

O Storybook já está em:
```
domains/storybook/
```

Com 31+ stories para exportar:
- Button.stories.tsx
- Card.stories.tsx
- Progress.stories.tsx
- Leaderboard.stories.tsx
- HealthIndicator.stories.tsx
- ...e mais

### 3. Script de Sincronização

```bash
# Sincronizar Storybook → Figma
cd code-to-figma/figma-sync-engine
pnpm sync --storybook-url http://localhost:6006 --figma-token $FIGMA_AUTH_TOKEN
```

## 📚 Documentação do Plugin

- **QUICK_START.md** — Começar em 5 minutos
- **docs/architecture.md** — Design da ferramenta
- **docs/MVP5_QUICK_START.md** — Implementação detalhada
- **DOCUMENTATION_MAP_22_11.md** — Índice completo

## 🚀 Próximos Passos

1. **Configurar credenciais Figma** (15 min)
   - Gerar token de autenticação
   - Obter IDs do projeto/arquivo

2. **Testar com um componente** (30 min)
   - Exportar Button para Figma
   - Validar layout e variantes

3. **Configurar CI/CD para sincronização automática** (1-2h)
   - GitHub Actions workflow
   - Trigger: Merge para main
   - Executar: Sincronização completa

4. **Documentar fluxo de trabalho** (1h)
   - Guia para designers usarem componentes sincronizados
   - SLAs de atualização
   - Conflitos de resolução

## 💡 Caso de Uso

**Antes** (sem sincronização):
- Designer cria componente no Figma
- Dev implementa no Storybook
- Desvio de design cresce
- Duplicação de trabalho

**Depois** (com sincronização):
- Dev implementa no Storybook + stories
- `pnpm sync` exporta para Figma em 2 minutos
- Designer usa componentes sincronizados
- Source of truth: Código (Storybook)

## 📊 Estimativa de Tempo

| Tarefa | Tempo |
|--------|-------|
| Configuração credenciais | 15 min |
| Testar com 1 componente | 30 min |
| Sincronizar todos (13 comp) | 5 min (automático) |
| CI/CD setup | 1-2h |
| Documentação fluxo | 1h |
| **TOTAL** | **~3-4h** |

## 🔗 Links Úteis

- Repository: https://github.com/fabioaap/code-to-figma
- Documentação: `/code-to-figma/figma-sync-engine/docs/`
- Storybook EDUCACROSS: http://localhost:6006 (dev)

## ✅ Checklist de Implementação

- [ ] Gerar token Figma
- [ ] Clonar repositório ✅
- [ ] Instalar dependências ✅
- [ ] Fazer build ✅
- [ ] Configurar .env
- [ ] Testar exportação (1 componente)
- [ ] Sincronizar todos os componentes
- [ ] Configurar GitHub Actions
- [ ] Documentar fluxo para team
- [ ] Validar com designer

---

**Status**: 🟡 Em setup (credenciais pendentes)  
**Próximo**: Configurar autenticação Figma
