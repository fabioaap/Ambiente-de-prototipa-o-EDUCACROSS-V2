# 🤖 Prompt para Cloud Agent - Design System Consolidation

**Objetivo**: Implementar completamente a especificação `specs/002-design-system-consolidation/spec.md`

---

## 📋 Contexto

Você é um agente de desenvolvimento responsável por consolidar o Design System do EDUCACROSS V2, removendo Shadcn UI e implementando componentes BackOffice usando tokens Vuexy importados do Figma via MCP oficial.

**Arquivos de Referência Obrigatórios**:
1. `specs/002-design-system-consolidation/spec.md` - Especificação completa (FR-001 a FR-011)
2. `.github/copilot-instructions.md` - Playbook do projeto
3. `.specify/memory/constitution.md` - Regras constitucionais (v1.1.0 após ratificação de CONST-2025-11-28-001)

---

## 🎯 Objetivos Principais

### 1. Setup MCP Figma (Tasks 1-5)
- Instalar e configurar `@modelcontextprotocol/server-figma`
- Importar tokens do Figma Frame 8565:17355 (Vuexy purple #7367f0)
- Adicionar tokens BackOffice (redes, badges)
- **IMPORTANTE**: Importação manual NÃO é permitida - tokens MUST vir via MCP

### 2. Criar Componentes BackOffice (Tasks 6-17)
Implementar 12 componentes em `packages/design-system/src/components/`:
- Skeleton, Table (base)
- Sidebar, Breadcrumb, Tabs, DataTable, Pagination, FilterGroup, ActionButtons, PageHeader, ToolbarButtons, Modal (BackOffice suite)

**Requisitos Técnicos por Componente**:
- `'use client'` obrigatório
- `React.forwardRef` para refs DOM
- CSS Modules + tokens Vuexy
- Props totalmente tipadas
- Exportado em `packages/design-system/src/index.ts`

### 3. Criar Stories Storybook (Tasks 19-30)
- 1 story por componente em `domains/storybook/stories/`
- Incluir variantes, estados, interações
- Documentar props com JSDoc
- Registrar em `domains/studio/src/config/puck.config.tsx`

### 4. Migrar de Shadcn (Tasks 32-35)
Substituir imports `@/components/ui/*` por `@prototipo/design-system` em:
- `domains/admin/src/app/page.tsx`
- `domains/admin/src/app/dashboard/page.tsx`
- `domains/studio/src/app/dashboard/page.tsx`
- `domains/admin/src/components/theme/ThemeToggle.tsx`

**Critério de Sucesso**: Aparência visual idêntica (±2px tolerance)

### 5. Remover Shadcn (Tasks 39-41)
- Deletar `domains/admin/src/components/ui/`
- Deletar `domains/studio/src/components/ui/`
- Remover dependências `@radix-ui/*`
- Deletar `scripts/check-shadcn-usage.mjs`
- Remover entrada `check:shadcn` do `package.json` root

**Critério de Sucesso**: Bundle size reduz 60%, build passa sem erros

### 6. Criar Página Referência (Task 43)
Implementar `domains/studio/src/app/backoffice/banco-questoes/page.tsx`:
- Usar todos os componentes BackOffice
- Mock data de 5 questões com badges coloridos
- Pixel-perfect comparado com Figma Node 8565:17355 (±5px tolerance)

### 7. Atualizar Documentação (Tasks 44-47)
- `README.md` - Seção Design System listando 23+ componentes
- `.github/copilot-instructions.md` - Remover menções Shadcn
- `CHANGELOG.md` - Entrada "Design System Consolidation"
- `domains/BackOffice/journeys/banco-questoes/README.md` - Instruções de uso

### 8. Validação CI/CD (Task 48)
- Criar workflow `.github/workflows/mcp-token-validation.yml`
- Validar metadata `importedViaMCP: true` em `packages/tokens/src/tokens.json`
- Falhar build se tokens não vierem do MCP

---

## 🔧 Comandos Essenciais

```bash
# Setup inicial (se necessário)
nvm use
pnpm install --frozen-lockfile

# Build incremental (ordem correta)
pnpm build:tokens
pnpm build:design-system
pnpm build:storybook
pnpm build:studio
pnpm build:admin

# Dev servers (testar durante desenvolvimento)
pnpm dev:storybook    # localhost:6006
pnpm dev:studio       # localhost:3000
pnpm dev:admin        # localhost:3001

# Validação completa (executar ao final)
pnpm clean
pnpm install --frozen-lockfile
pnpm build
pnpm lint
pnpm -r type-check

# Sync Figma (após setup MCP)
pnpm sync:figma
```

---

## 📐 Estrutura de Arquivos

```
packages/
  design-system/
    src/
      components/
        Skeleton/
          Skeleton.tsx
          Skeleton.module.css
          index.ts
        Sidebar/
          Sidebar.tsx
          Sidebar.module.css
          index.ts
        [... outros 10 componentes ...]
      index.ts          # Exporta todos

  tokens/
    src/
      tokens.json       # Deve ter importedViaMCP: true
    dist/
      tokens.css        # Gerado automaticamente

domains/
  storybook/
    stories/
      Skeleton.stories.tsx
      Sidebar.stories.tsx
      [... outras 11 stories ...]

  studio/
    src/
      app/
        backoffice/
          banco-questoes/
            page.tsx    # Página referência
      config/
        puck.config.tsx # Registra componentes

.mcp/
  figma-server-config.json  # Config MCP Figma

docs/
  figma-mcp-setup.md        # Instruções setup
  migration-screenshots/
    before/
    after/
  bundle-size-baseline.json
  bundle-size-report.md
  migration-report.md
```

---

## ✅ Critérios de Aceitação (Success Criteria)

### SC-001: Token Accuracy
- [ ] Cores primárias mudaram de azul #3b82f6 para roxo #7367f0
- [ ] CSS variables `--color-badge-*` e `--color-rede-*` geradas
- [ ] Metadata `importedViaMCP: true` presente em `tokens.json`

### SC-002: Component Coverage
- [ ] 12 componentes implementados (100% dos requisitados)
- [ ] 12 stories renderizando em Storybook
- [ ] Todos registrados em `puck.config.tsx`
- [ ] Tipos TypeScript em `dist/index.d.ts`

### SC-003: Migration Success
- [ ] 4 arquivos migrados de Shadcn para DS
- [ ] Screenshots before/after diferem <2px
- [ ] 0 console errors em `pnpm dev:admin` e `pnpm dev:studio`
- [ ] Theme toggle continua funcionando

### SC-004: Shadcn Removal
- [ ] Diretórios `components/ui/` deletados (admin + studio)
- [ ] Dependências `@radix-ui/*` removidas
- [ ] Script `check:shadcn` deletado
- [ ] `pnpm clean && pnpm install && pnpm build` passa

### SC-005: Bundle Size Reduction
- [ ] Baseline medido antes da remoção
- [ ] Tamanho após remoção medido
- [ ] Redução documentada (meta: 60%)
- [ ] Report em `docs/bundle-size-report.md`

### SC-006: Reference Page
- [ ] `banco-questoes/page.tsx` implementado
- [ ] Usa todos os 10 componentes BackOffice
- [ ] Visual match com Figma ±5px (validado com screenshots)
- [ ] Mock data de 5 questões funcional

### SC-007: Build Quality
- [ ] `pnpm build` completa em <4 minutos
- [ ] `pnpm lint` 0 erros
- [ ] `pnpm -r type-check` 0 erros
- [ ] Storybook builda sem warnings

### SC-008: MCP Validation
- [ ] CI workflow valida tokens via MCP
- [ ] Build falha se `importedViaMCP: false`
- [ ] Documentação `figma-mcp-setup.md` completa
- [ ] Token Figma configurado em `.env.local`

---

## 🚨 Regras Importantes

### Bloqueadores (NÃO fazer até resolver)
1. **NÃO importar tokens manualmente** - Use MCP Figma obrigatoriamente
2. **NÃO começar migração Shadcn** antes de todos componentes DS prontos
3. **NÃO deletar Shadcn** antes de screenshots before/after capturados
4. **NÃO modificar `/api/dashboard/*`** - APIs não fazem parte desta spec

### Constitution Compliance (v1.1.0)
- ✅ Shadcn pode existir em `domains/studio/src/app/dashboard/` temporariamente (grandfather clause)
- ✅ Remoção completa é permitida via esta spec formal
- ✅ Após remoção, atualizar constitution mencionando "Shadcn prohibited project-wide"
- ❌ Nunca usar Shadcn em `domains/*` fora do dashboard

### Design System Surface
- Todos componentes MUST usar tokens de `@prototipo/tokens`
- CSS Modules obrigatório (não Tailwind arbitrary values)
- Cada componente MUST ter story no Storybook
- Props MUST ser totalmente tipadas

### Build Order (CRÍTICO)
```bash
tokens → design-system → storybook/studio/admin
```
Nunca construir fora de ordem ou builds falham.

---

## 📊 Ordem de Execução Recomendada

### Phase 1: Foundation (Tasks 1-5)
**Duração**: 2-3 horas
1. Setup MCP Figma
2. Configure token
3. Import tokens via MCP
4. Add BackOffice tokens
5. Rebuild tokens

**Checkpoint**: `pnpm build:tokens` passa, tokens.json tem metadata MCP

---

### Phase 2: Base Components (Tasks 6-7, 19-20)
**Duração**: 3-4 horas
1. Create Skeleton + story
2. Create Table + story

**Checkpoint**: `pnpm dev:storybook` mostra 2 componentes funcionais

---

### Phase 3: BackOffice Suite (Tasks 8-17, 21-30)
**Duração**: 12-15 horas (pode paralelizar)
- 10 componentes + 10 stories
- Agrupar por complexidade:
  - Simples (2h): PageHeader, ToolbarButtons, ActionButtons, Breadcrumb
  - Médias (3h): Sidebar, Tabs, Pagination
  - Complexas (4h): DataTable, FilterGroup, Modal

**Checkpoint**: Todos 12 componentes exportados, 12 stories renderizam

---

### Phase 4: Puck Registration (Task 31)
**Duração**: 1 hora
- Registrar componentes em `puck.config.tsx`

**Checkpoint**: Componentes aparecem no editor Puck

---

### Phase 5: Shadcn Migration (Tasks 32-37)
**Duração**: 4-5 horas
1. Capture before screenshots (Task 36)
2. Migrate 4 arquivos (Tasks 32-35)
3. Capture after screenshots (Task 37)
4. Measure bundle baseline (Task 38)

**Checkpoint**: Visual diff <2px, 0 console errors

---

### Phase 6: Shadcn Removal (Tasks 39-42)
**Duração**: 2 horas
1. Delete UI directories
2. Remove Radix deps
3. Delete check script
4. Measure bundle after

**Checkpoint**: Build passa, bundle size reduz 60%

---

### Phase 7: Reference Page (Task 43)
**Duração**: 4-5 horas
- Implementar `banco-questoes/page.tsx`
- Mock data + integração de todos componentes
- Visual comparison com Figma

**Checkpoint**: Página pixel-perfect ±5px

---

### Phase 8: Documentation (Tasks 44-47)
**Duração**: 2 horas
- Update 4 arquivos markdown

**Checkpoint**: Docs refletem nova arquitetura

---

### Phase 9: CI/CD (Task 48)
**Duração**: 1 hora
- Create MCP validation workflow

**Checkpoint**: CI valida tokens MCP

---

### Phase 10: Final Validation (Tasks 49-55)
**Duração**: 2-3 horas
- Full build/lint/type-check
- Manual QA (Storybook, dashboards, página referência)

**Checkpoint**: 0 erros, 0 regressões

---

## 🎯 Estimativa Total

- **Desenvolvimento**: 35-40 horas
- **QA/Validação**: 5 horas
- **Total**: 40-45 horas (~1 semana de trabalho full-time)

---

## 🔗 Links de Referência

- **Spec Completa**: `specs/002-design-system-consolidation/spec.md`
- **Figma Frame**: https://www.figma.com/file/Sz4z0rpDmocXZ8LylxEgqF?node-id=8565-17355
- **MCP Figma Docs**: https://github.com/modelcontextprotocol/servers/tree/main/src/figma
- **Constitution**: `.specify/memory/constitution.md` (aguardando v1.1.0)
- **Amendment**: `specs/amendments/CONST-2025-11-28-001-shadcn-scope.md`

---

## 💡 Dicas para o Agent

1. **Trabalhe incrementalmente**: Build e test após cada componente
2. **Use paralelização**: Components suite pode ser feita em paralelo
3. **Documente decisões**: Se algo divergir da spec, comente no código
4. **Screenshots são críticos**: Capture antes de qualquer migração visual
5. **MCP é mandatório**: Se MCP Figma falhar, PARE e reporte o erro
6. **Siga build order**: tokens → design-system → resto
7. **Test drive**: Rode Storybook constantemente durante desenvolvimento
8. **No surprises**: Se encontrar bloqueador não previsto na spec, comunique

---

## ✨ Entrega Final Esperada

Ao completar todas as 55 tasks, o projeto deve ter:

✅ Tokens Vuexy importados via MCP  
✅ 12 componentes BackOffice funcionais  
✅ 12 stories Storybook renderizando  
✅ Shadcn completamente removido  
✅ Bundle size reduzido 60%  
✅ Página referência banco-questões pixel-perfect  
✅ Documentação atualizada  
✅ CI validando tokens MCP  
✅ 0 erros de build/lint/type-check  
✅ 0 regressões visuais ou funcionais  

**Status**: Pronto para merge via PR com `/spec` validation ✅

---

**Data de Criação**: 2025-11-29  
**Spec Version**: 002-design-system-consolidation v1.0  
**Constitution Version**: 1.1.0 (pending ratification)  
**Estimated Completion**: 1 semana full-time ou 2 semanas part-time
