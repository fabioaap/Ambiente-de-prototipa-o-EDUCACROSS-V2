# 🚀 EDUCACROSS - Guia de Deploy

Este documento descreve o processo completo de deploy para os ambientes de staging e produção do projeto EDUCACROSS.

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Ambientes](#ambientes)
- [Configuração Inicial](#configuração-inicial)
- [Deploy para Staging](#deploy-para-staging)
- [Deploy para Produção](#deploy-para-produção)
- [Troubleshooting](#troubleshooting)
- [Rollback](#rollback)

## 🎯 Visão Geral

O projeto EDUCACROSS é um monorepo com duas aplicações principais que podem ser deployadas independentemente:

1. **Studio** - Next.js 15 com Puck (editor visual)
2. **Storybook** - Catálogo de componentes

### Plataforma de Deploy

**Vercel** é usado para hospedar ambas as aplicações, com configurações específicas para cada app definidas em seus respectivos arquivos `vercel.json`.

### Pipeline CI/CD

GitHub Actions automatiza o processo de build, test e deploy através do workflow `.github/workflows/staging-deploy.yml`.

## 🌍 Ambientes

### Staging

**URLs:**
- **Studio Staging:** https://educacross-studio-staging.vercel.app
- **Storybook Staging:** https://educacross-storybook-staging.vercel.app

**Branches que disparam deploy:**
- `copilot/deploy-v02-beta-to-staging-again`
- `staging`
- `release/**`

**Tags que disparam deploy:**
- `v*-beta` (ex: v0.2-beta)
- `v*-alpha` (ex: v0.3-alpha)

**Finalidade:**
- Testes de novas features
- Validação de protótipos
- Review de PMs e designers
- Testes de integração

### Produção

**URLs:**
- **Studio Produção:** https://educacross-studio.vercel.app
- **Storybook Produção:** https://educacross-storybook.vercel.app

**Branches que disparam deploy:**
- `main`

**Tags que disparam deploy:**
- `v*` (ex: v0.2.0, v1.0.0)

**Finalidade:**
- Versões estáveis
- Uso em produção
- Documentação oficial

## ⚙️ Configuração Inicial

### 1. Vercel - Configuração do Projeto

Para cada aplicação (Studio e Storybook), você precisa criar um projeto separado no Vercel:

#### Studio

1. Acesse [Vercel Dashboard](https://vercel.com/dashboard)
2. Clique em **"Add New Project"**
3. Importe o repositório GitHub
4. Configure:
   - **Project Name:** `educacross-studio-staging` (para staging)
   - **Framework Preset:** Next.js
   - **Root Directory:** `domains/studio`
   - **Build Command:** (deixe vazio, usa vercel.json)
   - **Output Directory:** (deixe vazio, usa vercel.json)
   - **Install Command:** (deixe vazio, usa vercel.json)

5. **Environment Variables:** (se necessário)
   ```
   NODE_ENV=production
   NEXT_PUBLIC_APP_ENV=staging
   ```

6. Clique em **Deploy**

#### Storybook

1. Acesse [Vercel Dashboard](https://vercel.com/dashboard)
2. Clique em **"Add New Project"**
3. Importe o repositório GitHub
4. Configure:
   - **Project Name:** `educacross-storybook-staging` (para staging)
   - **Framework Preset:** Other
   - **Root Directory:** `domains/storybook`
   - **Build Command:** (deixe vazio, usa vercel.json)
   - **Output Directory:** (deixe vazio, usa vercel.json)
   - **Install Command:** (deixe vazio, usa vercel.json)

5. **Environment Variables:** (se necessário)
   ```
   NODE_ENV=production
   STORYBOOK_ENV=staging
   ```

6. Clique em **Deploy**

### 2. GitHub - Configuração de Secrets

Se você optar por usar Vercel CLI no GitHub Actions (deployment programático), adicione os seguintes secrets:

1. Acesse **Settings → Secrets and variables → Actions**
2. Adicione:
   - `VERCEL_TOKEN` - Token de API do Vercel
   - `VERCEL_ORG_ID` - ID da organização Vercel
   - `VERCEL_PROJECT_ID_STUDIO` - ID do projeto Studio
   - `VERCEL_PROJECT_ID_STORYBOOK` - ID do projeto Storybook

> ℹ️ **Nota:** A configuração atual usa **Git Integration** do Vercel, que detecta pushes automaticamente. Os secrets são opcionais neste caso.

### 3. Vercel - Git Integration

Para habilitar deploy automático via Git:

1. No projeto Vercel, vá em **Settings → Git**
2. Conecte o repositório GitHub
3. Configure **Production Branch:** `main`
4. Configure **Preview Branches:**
   - `staging`
   - `copilot/deploy-v02-beta-to-staging-again`
   - Branches com padrão `release/**`

## 🚀 Deploy para Staging

### Método 1: Push para Branch (Recomendado)

```bash
# Certifique-se de estar na branch correta
git checkout copilot/deploy-v02-beta-to-staging-again

# Faça suas alterações e commit
git add .
git commit -m "feat: adiciona nova feature"

# Push para o remote
git push origin copilot/deploy-v02-beta-to-staging-again
```

**O que acontece:**
1. GitHub Actions executa o workflow `staging-deploy.yml`
2. Build e testes são executados
3. Vercel detecta o push via Git Integration
4. Deploy é feito automaticamente para staging
5. URLs de staging são atualizadas

### Método 2: Via Tag

```bash
# Criar tag de versão beta
git tag -a v0.2-beta -m "Release v0.2-beta para staging"

# Push da tag
git push origin v0.2-beta
```

### Método 3: Manual via GitHub Actions

1. Acesse **Actions** no GitHub
2. Selecione o workflow **"Deploy to Staging"**
3. Clique em **"Run workflow"**
4. Selecione a branch e ambiente
5. Clique em **"Run workflow"**

### Verificação do Deploy

Após o deploy, verifique:

1. **GitHub Actions:**
   - ✅ Build bem-sucedido
   - ✅ Testes passaram
   - ✅ Deploy executado

2. **URLs de Staging:**
   - 🎨 [Studio Staging](https://educacross-studio-staging.vercel.app)
   - 📚 [Storybook Staging](https://educacross-storybook-staging.vercel.app)

3. **Funcionalidades:**
   - Studio carrega sem erros
   - Puck editor funciona
   - Storybook mostra todos os componentes
   - Design tokens aplicados corretamente

## 🎯 Deploy para Produção

⚠️ **ATENÇÃO:** Deploy para produção requer aprovação e testes completos em staging.

### Pré-requisitos

- [ ] Todos os testes em staging passaram
- [ ] Features validadas por PMs/designers
- [ ] Build completo sem erros
- [ ] Lint sem warnings críticos
- [ ] Documentação atualizada
- [ ] CHANGELOG atualizado

### Processo

1. **Criar Pull Request para main:**

```bash
git checkout main
git pull origin main
git merge copilot/deploy-v02-beta-to-staging-again
```

2. **Review do PR:**
   - Aprovar PR com revisão de código
   - Verificar que todos os checks passaram
   - Merge para `main`

3. **Criar Tag de Produção:**

```bash
git checkout main
git pull origin main

# Criar tag de release
git tag -a v0.2.0 -m "Release v0.2.0"
git push origin v0.2.0
```

4. **Monitorar Deploy:**
   - Acompanhar GitHub Actions
   - Verificar Vercel Dashboard
   - Testar URLs de produção

## 🔧 Troubleshooting

### Build Falha no Vercel

**Problema:** Build falha com erro de dependências

**Solução:**
```bash
# Local: limpar e reconstruir
pnpm clean
pnpm install
pnpm build

# Se funcionar local, forçar reinstall no Vercel:
# Vá em Vercel → Settings → General → Redeploy
```

**Problema:** Build falha por falta de memória

**Solução:**
- No Vercel, aumente o limite de memória em Settings
- Ou otimize o build removendo imports desnecessários

### Deploy Não Dispara

**Problema:** Push não dispara deploy automático

**Verificações:**
1. Confirme que a branch está configurada no Vercel
2. Verifique Git Integration em Settings → Git
3. Verifique GitHub Actions logs

**Solução:**
```bash
# Forçar trigger via tag
git tag -f v0.2-beta-$(date +%s)
git push --force origin v0.2-beta-$(date +%s)
```

### Componentes Não Carregam

**Problema:** Studio/Storybook carrega mas componentes não aparecem

**Causa:** Build incompleto dos pacotes internos

**Solução:**
```bash
# Rebuild na ordem correta
pnpm build:tokens
pnpm build:design-system
pnpm build:studio
pnpm build:storybook

# Commit e push
git add .
git commit -m "fix: rebuild all packages"
git push
```

### Erros de TypeScript

**Problema:** Erros de tipo no build

**Solução:**
```bash
# Verificar tipos localmente
pnpm -r type-check

# Corrigir e commit
# Dica: CI permite continue-on-error para type-check
```

## ⏪ Rollback

### Rollback via Vercel Dashboard

1. Acesse [Vercel Dashboard](https://vercel.com/dashboard)
2. Selecione o projeto (Studio ou Storybook)
3. Vá em **Deployments**
4. Encontre o deployment anterior estável
5. Clique nos três pontos → **Promote to Production**

### Rollback via Git

```bash
# Reverter para versão anterior
git revert <commit-hash>
git push origin staging

# Ou criar tag de versão anterior
git tag -f v0.1.0
git push --force origin v0.1.0
```

### Rollback Emergencial

Se houver um problema crítico em produção:

1. **Rollback imediato via Vercel:**
   - Dashboard → Promote deployment anterior

2. **Reverter código:**
   ```bash
   git checkout main
   git revert HEAD~1
   git push origin main
   ```

3. **Comunicar equipe:**
   - Notificar no Slack/Discord
   - Atualizar issue tracking
   - Documentar causa raiz

## 📊 Monitoramento

### Logs de Deploy

- **GitHub Actions:** Actions tab → workflow run
- **Vercel:** Dashboard → Deployments → Logs

### Métricas

Vercel fornece automaticamente:
- Build time
- Bundle size
- Lighthouse scores
- Web Vitals (LCP, FID, CLS)

### Alertas

Configure notificações no Vercel:
- Settings → Notifications
- Deploy success/failure
- Build errors
- Performance degradation

## 📚 Recursos Adicionais

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Storybook Deployment](https://storybook.js.org/docs/react/sharing/publish-storybook)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

## 🆘 Suporte

Em caso de problemas:

1. Verifique este documento primeiro
2. Consulte logs no GitHub Actions e Vercel
3. Revise issues fechadas similares
4. Abra uma issue com:
   - Descrição do problema
   - Logs relevantes
   - Steps to reproduce
   - Ambiente (staging/produção)

---

**Última atualização:** 20 de Novembro de 2025  
**Versão:** 0.2.0-beta
