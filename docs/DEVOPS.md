# DevOps Guide - EDUCACROSS V2

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Arquitetura do Monorepo](#arquitetura-do-monorepo)
- [CI/CD Pipeline](#cicd-pipeline)
- [Build e Deploy](#build-e-deploy)
- [Ambientes](#ambientes)
- [Troubleshooting](#troubleshooting)
- [Manutenção](#manutenção)

---

## Visão Geral

Este repositório é um **monorepo gerenciado com pnpm workspaces**, contendo:
- 2 aplicações (`studio`, `storybook`)
- 2 bibliotecas (`design-system`, `tokens`)

**Stack DevOps:**
- **CI/CD**: GitHub Actions
- **Package Manager**: pnpm 9.14.4
- **Node Version**: 22.x LTS
- **Build Tools**: tsup, Next.js, Storybook, ESBuild
- **Linting**: ESLint 9 (flat config)
- **Type Checking**: TypeScript 5

---

## Arquitetura do Monorepo

### Dependências entre Workspaces

```
tokens (pacote base)
  ↓
design-system (depende de tokens)
  ↓
studio + storybook (dependem de design-system e tokens)
```

**Implicações:**
- Tokens deve ser buildado primeiro
- Design System depende de tokens estar buildado
- Apps (studio/storybook) dependem de ambos

### Estrutura de Pacotes

```
/
├── apps/
│   ├── studio/              # Next.js 15 + Puck
│   │   ├── src/
│   │   ├── .next/           # Build output (gitignored)
│   │   └── package.json
│   └── storybook/           # Storybook 8 ESM
│       ├── src/
│       ├── storybook-static/ # Build output (gitignored)
│       └── package.json
├── packages/
│   ├── design-system/       # React Components Library
│   │   ├── src/
│   │   ├── dist/            # Build output (gitignored)
│   │   └── package.json
│   └── tokens/              # Design Tokens
│       ├── src/
│       ├── dist/            # Build output (gitignored)
│       └── package.json
└── package.json             # Root package com scripts agregadores
```

---

## CI/CD Pipeline

### Workflow: `.github/workflows/ci.yml`

**Triggers:**
- Push em `main` ou `develop`
- Pull Requests para `main` ou `develop`

**Jobs (execução em paralelo quando possível):**

1. **Lint** (independente)
   - Executa `pnpm lint` em todos workspaces
   - Valida código com ESLint 9

2. **Build Tokens** (independente)
   - Compila tokens para CSS e JS
   - Gera artifacts para próximos jobs

3. **Build Design System** (depende de tokens)
   - Baixa artifacts de tokens
   - Compila componentes React
   - Gera artifacts para próximos jobs

4. **Build Studio** (depende de tokens + design-system)
   - Baixa artifacts de tokens e design-system
   - Compila app Next.js

5. **Build Storybook** (depende de tokens + design-system)
   - Baixa artifacts de tokens e design-system
   - Compila Storybook estático
   - Mantém artifacts por 7 dias

### Cache Strategy

**pnpm Store Cache:**
```yaml
key: ${{ runner.os }}-pnpm-store-${{ hashFiles('**/pnpm-lock.yaml') }}
```

**Benefícios:**
- ~70% redução no tempo de `pnpm install`
- Cache invalidado apenas quando pnpm-lock.yaml muda
- Compartilhado entre todos os jobs

**Artifacts:**
- `tokens-dist`: 1 dia de retenção
- `design-system-dist`: 1 dia de retenção
- `storybook-static`: 7 dias de retenção (para deploy)

### Tempo de Execução Esperado

- **Lint**: ~30s (após cache)
- **Build Tokens**: ~1min
- **Build Design System**: ~2min
- **Build Studio**: ~2-3min
- **Build Storybook**: ~2-3min

**Total (paralelo)**: ~3-4 minutos

---

## Build e Deploy

### Build Local

**Ordem correta (manual):**
```bash
# 1. Tokens
pnpm build:tokens

# 2. Design System (requer tokens)
pnpm build:design-system

# 3. Apps (requerem tokens + design-system)
pnpm build:studio
pnpm build:storybook
```

**Build completo (recomendado):**
```bash
pnpm build
```

Este comando já executa na ordem correta:
```bash
pnpm build:tokens && \
pnpm build:design-system && \
pnpm build:studio && \
pnpm build:storybook
```

### Clean Build (do zero)

```bash
pnpm clean  # Remove node_modules e dist de todos workspaces
pnpm install
pnpm build
```

### Deploy (Configuração Futura)

#### Studio (Next.js)

**Plataformas sugeridas:**
- **Vercel** (recomendado para Next.js)
- **GitHub Pages** (com exportação estática)
- **Netlify**

**Comandos:**
```bash
cd apps/studio
pnpm build   # Gera .next/
pnpm start   # Serve em produção
```

**Variáveis de ambiente necessárias:** TBD

#### Storybook

**Plataformas sugeridas:**
- **GitHub Pages** (gratuito)
- **Chromatic** (com visual testing)
- **Vercel** (como site estático)

**Build output:**
```bash
apps/storybook/storybook-static/
```

Pode ser servido por qualquer servidor de arquivos estáticos.

**Exemplo GitHub Pages:**
```yaml
# .github/workflows/deploy-storybook.yml
- name: Deploy to GitHub Pages
  uses: peaceiris/actions-gh-pages@v3
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
    publish_dir: ./apps/storybook/storybook-static
```

---

## Ambientes

### Development

**Studio:**
```bash
pnpm dev:studio
# http://localhost:3000
```

**Storybook:**
```bash
pnpm dev:storybook
# http://localhost:6006
```

**Watch mode (packages):**
```bash
# Tokens
cd packages/tokens
pnpm dev  # Watch e rebuild automático

# Design System
cd packages/design-system
pnpm dev  # Watch e rebuild automático
```

### Preview

Configurar deploy preview para PRs (futuro):
- Vercel Preview Deployments
- Netlify Deploy Previews

### Production

TBD - Definir estratégia de deploy em produção.

---

## Troubleshooting

### Erro: "Cannot find module '@prototipo/tokens'"

**Causa:** Tokens não foi buildado antes do design-system.

**Solução:**
```bash
pnpm build:tokens
pnpm build:design-system
```

### Build do Studio falha com erro de tipos

**Causa:** Design System não está buildado ou tipos não foram gerados.

**Solução:**
```bash
pnpm build:tokens
pnpm build:design-system
cd apps/studio
pnpm build
```

### CI falha em "pnpm install --frozen-lockfile"

**Causa:** pnpm-lock.yaml está desatualizado.

**Solução:**
```bash
# Local
pnpm install
git add pnpm-lock.yaml
git commit -m "chore: update pnpm-lock.yaml"
```

### Storybook não carrega componentes em dev

**Causa:** Design System precisa ser buildado primeiro.

**Solução:**
```bash
pnpm build:tokens
pnpm build:design-system
pnpm dev:storybook
```

### Cache do GitHub Actions não está funcionando

**Causa:** Chave de cache incorreta ou pnpm-lock.yaml modificado.

**Verificar:**
```bash
# Localmente, verificar integridade
pnpm install --frozen-lockfile
```

**No CI:**
- Verificar logs do step "Setup pnpm cache"
- Confirmar que `pnpm-lock.yaml` está commitado

---

## Manutenção

### Atualizar Dependências

**Patch updates (seguro):**
```bash
pnpm update
```

**Minor/Major updates (testar bem):**
```bash
# Verificar atualizações disponíveis
pnpm outdated

# Atualizar interativamente
pnpm update --interactive

# Ou atualizar tudo (cuidado!)
pnpm update --latest
```

**Após atualizar:**
```bash
pnpm build  # Verificar se builds funcionam
pnpm lint   # Verificar se lint passa
pnpm test   # Verificar se testes passam (quando houver)
```

### Adicionar Nova Dependência

**No workspace específico:**
```bash
# Exemplo: adicionar lodash ao design-system
pnpm --filter @prototipo/design-system add lodash
pnpm --filter @prototipo/design-system add -D @types/lodash
```

**No root (dev dependencies globais):**
```bash
pnpm add -D -w prettier
```

### Adicionar Novo Workspace

1. Criar pasta em `apps/` ou `packages/`
2. Criar `package.json` com nome único
3. Verificar `pnpm-workspace.yaml` inclui o path
4. Instalar dependências:
   ```bash
   pnpm install
   ```

### Verificar Saúde do Repositório

```bash
# Verificar estrutura de workspaces
pnpm list --depth 0

# Verificar dependências circulares
pnpm why <package-name>

# Verificar tamanho de node_modules
du -sh node_modules

# Verificar se há packages desatualizados
pnpm outdated

# Verificar lint em tudo
pnpm lint

# Verificar builds
pnpm build
```

---

## Métricas e Monitoramento

### Métricas Atuais

**Build Times (local, primeira vez):**
- Tokens: ~5s
- Design System: ~10s
- Studio: ~15s
- Storybook: ~20s
- **Total**: ~50s

**Build Times (CI com cache):**
- Install: ~30s (com cache)
- Lint: ~30s
- Build total: ~3-4min (paralelo)

**Bundle Sizes:**
- Storybook: ~890KB (maior chunk)
- Design System: ~15KB (dist)
- Tokens: ~13KB (CSS)

**Dependências:**
- Total: 535 pacotes
- Production: ~200 pacotes (apps)
- Development: ~335 pacotes

### Alerts e Limites

**Build time warning:** > 10 minutos no CI
**Bundle size warning:** > 1MB (Storybook já está próximo)
**Dependency count warning:** > 600 pacotes

---

## Checklist de Saúde do Projeto

### ✅ CI/CD
- [x] Pipeline de CI configurado
- [x] Cache do pnpm funcionando
- [x] Builds paralelos otimizados
- [ ] Deploy automático configurado (futuro)
- [ ] Preview deployments em PRs (futuro)

### ✅ Builds
- [x] `pnpm build` funciona sem erros
- [x] Ordem de dependências respeitada
- [x] Artifacts gerados corretamente
- [x] Warnings não-críticos documentados

### ✅ Documentação
- [x] README atualizado
- [x] Guia DevOps criado
- [x] Scripts documentados
- [x] Troubleshooting comum documentado

### ⏳ Futuras Melhorias
- [ ] Testes automatizados (unit + integration)
- [ ] Visual regression testing (Chromatic)
- [ ] Dependency bot (Dependabot/Renovate)
- [ ] Husky + lint-staged
- [ ] Prettier configurado
- [ ] Performance budget no CI

---

**Última atualização**: 2025-11-20  
**Versão**: 0.1.0
