# F3 – GitHub Actions CI Workflow

**Status**: ✅ Implementado  
**Branch**: `feature/f3-github-actions`  
**Commit**: cba5f25

## Descrição

Implementação de workflow de Integração Contínua (CI) usando GitHub Actions para validar lint e builds em todos os pacotes do monorepo.

## Arquitetura

### Workflow: `.github/workflows/ci.yml`

O workflow executa dois jobs em sequência:

#### Job 1: `lint` (Independente)
- Valida código com ESLint em todos os pacotes
- Falha se houver erros críticos
- Executa em: `push` e `pull_request` para `main` e `develop`

#### Job 2: `build` (Depende de `lint`)
- Só executa se lint passar
- Compila em sequência:
  1. `pnpm build:tokens` – Design Tokens (@prototipo/tokens)
  2. `pnpm build:design-system` – Design System (@prototipo/design-system)
  3. `pnpm build:studio` – Studio (Next.js app)
  4. `pnpm build:storybook` – Storybook

### Cache Strategy
- **pnpm cache**: Habilitado via `actions/setup-node` + `pnpm/action-setup`
- **Node version**: Lido de `.nvmrc` (v22.21.1)
- **Instalação**: `pnpm install --frozen-lockfile` garante reproducibilidade

### Artefatos
- **Nome**: `storybook-static`
- **Caminho**: `apps/storybook/storybook-static`
- **Retenção**: 7 dias
- **Upload**: Sempre (mesmo se build falhar, para análise)

## Acionadores

O workflow é acionado por:
- `push` para `main` ou `develop`
- `pull_request` aberto/atualizado contra `main` ou `develop`

## Tempo de Execução

Estimativa (baseado em testes locais):
- **Lint**: ~30s
- **Build tokens**: ~5s
- **Build design-system**: ~10s
- **Build studio**: ~40s
- **Build storybook**: ~20s
- **Total**: ~2-3 minutos (primeiro run) / ~1.5-2 minutos (com cache)

## Como Testar Localmente

```bash
# 1. Simular lint
pnpm lint

# 2. Simular build completo
pnpm build

# 3. Verificar artifacts
ls -la apps/storybook/storybook-static/
```

## Próximos Passos (Sprint 3+)

- [ ] **F4**: Adicionar Husky + lint-staged para validação em commits locais
- [ ] **G5**: Validação de links em CI (lint-md ou similar)
- [ ] **H4**: Adicionar indicadores de saúde (bundle size, dependency updates)
- [ ] **Performance**: Otimizar cache e parallelização de builds

## Debugging

Se workflow falhar no GitHub:

1. **Lint errors**: Revise `pnpm lint` localmente, corrija e faça push novo
2. **Build errors**: Rode `pnpm build` localmente, identifique pacote problemático
3. **Node version mismatch**: Verifique `.nvmrc` vs runner
4. **pnpm cache**: GitHub Actions limpa cache automaticamente se houver problemas

Ver logs completos em: `https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/actions`

## Referências

- Arquivo: `.github/workflows/ci.yml`
- Actions usadas:
  - `actions/checkout@v4` – Clone do repo
  - `actions/setup-node@v4` – Setup Node + pnpm cache
  - `pnpm/action-setup@v2` – Instala pnpm específico
  - `actions/upload-artifact@v4` – Salva artefatos

---

**Última atualização**: 2025-11-20  
**Pronto para merge**: ✅ Sim
