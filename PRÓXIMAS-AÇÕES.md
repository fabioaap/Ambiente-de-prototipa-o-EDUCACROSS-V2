# 🎯 Próximas Ações - EDUCACROSS Prototipação

**Data**: 2025-11-20 17:45 UTC  
**Status**: ✅ Commit realizado (commit: 93af75a)  
**Próximo**: Escolha uma das 3 tarefas abaixo

---

## ✅ O Que Foi Feito Agora

**Commit**: `93af75a - Sprint 2 (45%): Play functions, acessibilidade, CONTRIBUTING, índice jornadas`

**Arquivos commitados**: 40 alterações
- ✅ CONTRIBUTING.md (novo)
- ✅ LEIA-PRIMEIRO.md (novo)
- ✅ PRÓXIMOS-PASSOS.md (novo)
- ✅ docs/tarefas-ativas.md (novo)
- ✅ docs/sprint-1-completo.md (novo)
- ✅ docs/sprint-2-progresso.md (novo)
- ✅ docs/accessibility-audit.md (novo)
- ✅ Play functions (stories atualizadas)
- ✅ CSS acessibilidade (componentes)
- ✅ Índice jornadas (auto-gerado)
- ✅ Dados exemplo BackOffice

**Status Git**: 
```
Branch: copilot/list-pending-issues (sincronizado com origin)
Commits à frente de main: vários
Working directory: limpo ✅
```

---

## 🎯 3 Opções para Próxima Ação

Escolha uma e siga o guia específico abaixo.

### **OPÇÃO A: C2 - Studio Sidebar (RECOMENDADO)** 🔴
**Impacto**: Alto (UX crítica do editor visual)  
**Tempo**: 3-4 horas  
**Dificuldade**: Média  
**Desbloqueador**: C3, H2, H3

**O que você vai fazer**:
1. Melhorar componente `PagesList.tsx` para listar páginas dinâmicas
2. Refatorar `StudioLayout.tsx` para acomodar sidebar
3. Adicionar ações: criar, renomear, deletar páginas
4. Tornar UI responsiva
5. Implementar navegação por teclado

**Como começar**:
```bash
# 1. Criar feature branch
git checkout -b feature/c2-studio-sidebar

# 2. Abrir em dev
pnpm dev:studio
# Acessar: http://localhost:3000/studio

# 3. Estudar código existente
cat apps/studio/src/app/api/pages/README.md
cat apps/studio/src/components/PagesList.tsx
cat apps/studio/src/components/StudioLayout.tsx

# 4. Editar componentes
# - Adicionar carregamento de páginas da API
# - Refatorar layout para sidebar
# - Adicionar event handlers

# 5. Testar & commit
pnpm lint --fix
pnpm build:studio
git add -A && git commit -m "C2: Studio sidebar com lista páginas"
```

**Referências**:
- API: `apps/studio/src/app/api/pages/README.md`
- Padrões: `CONTRIBUTING.md` - Seção "Criando Componentes"
- Acessibilidade: `docs/accessibility-audit.md`
- Exemplo: `domains/BackOffice/journeys/revisao-questoes/`

**Critério de Aceitação**:
- [ ] Sidebar exibe lista dinâmica
- [ ] Ações criar/deletar/renomear funcionam
- [ ] Navegação por teclado funciona
- [ ] UI responsiva (mobile-friendly)
- [ ] Lint e build passando

---

### **OPÇÃO B: D2 - Addon A11y Storybook** 🔴
**Impacto**: Alto (validação acessibilidade visual)  
**Tempo**: 2-3 horas  
**Dificuldade**: Fácil  
**Desbloqueador**: Melhor audit de componentes

**O que você vai fazer**:
1. Instalar `@storybook/addon-a11y`
2. Configurar em `.storybook/main.ts`
3. Ativar addon no Storybook
4. Validar que funciona com componentes existentes

**Como começar**:
```bash
# 1. Criar feature branch
git checkout -b feature/d2-addon-a11y

# 2. Mudar para pasta Storybook
cd apps/storybook

# 3. Instalar addon
pnpm add -D @storybook/addon-a11y

# 4. Configurar em .storybook/main.ts
# Adicionar na array 'addons':
# '@storybook/addon-a11y'

# 5. Testar
pnpm dev
# Abrir browser: http://localhost:6006
# Procurar aba "A11y" no painel inferior

# 6. Commit
cd ../..
git add -A && git commit -m "D2: Addon A11y para validação acessibilidade"
```

**Referências**:
- Storybook A11y: https://storybook.js.org/docs/writing-stories/configure-storybook/features/addon-a11y
- Existente: `docs/accessibility-audit.md`

**Critério de Aceitação**:
- [ ] Addon instalado e ativo
- [ ] Aba A11y aparece no Storybook
- [ ] Componentes listam violations quando existem
- [ ] Play functions testam básico acessibilidade
- [ ] Lint e build passando

---

### **OPÇÃO C: H1/H - Dashboard Planning** 🟡
**Impacto**: Médio (exploração)  
**Tempo**: 4-5 horas  
**Dificuldade**: Média  
**Desbloqueador**: H2, H3, H4, H5 (ecosystem dashboard)

**O que você vai fazer**:
1. Planejar wireframe/layout do dashboard
2. Definir dados necessários (metadados páginas)
3. Criar story placeholder no Storybook
4. Documentar próximos passos

**Como começar**:
```bash
# 1. Criar feature branch
git checkout -b feature/h-dashboard

# 2. Criar documento de planejamento
cat > docs/dashboard-wireframe.md << 'EOF'
# Dashboard - Wireframe

## Layout
- Header (EDUCACROSS logo, título)
- Search bar (buscar páginas)
- Filtros (por domínio, por status)
- Grid de cards (páginas)
- Rodapé (métricas)

## Cada Card
- Thumbnail/preview
- Nome página
- Domínio
- Status (Draft/Published)
- Links (Edit, View)

## Dados Necessários
```json
{
  "pages": [
    {
      "id": "slug",
      "name": "Nome da Página",
      "domain": "BackOffice|FrontOffice|Game",
      "status": "draft|published",
      "url": "/pages/slug",
      "editUrl": "/studio/slug",
      "createdAt": "2025-11-20",
      "updatedAt": "2025-11-20"
    }
  ],
  "stats": {
    "total_pages": 10,
    "total_domains": 3,
    "last_updated": "2025-11-20"
  }
}
```
EOF

# 3. Criar story placeholder
touch apps/storybook/src/stories/Dashboard.stories.tsx

# 4. Esboço de componente
cat > apps/storybook/src/stories/Dashboard.stories.tsx << 'EOF'
import type { Meta, StoryObj } from '@storybook/react'

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard EDUCACROSS</h1>
      <p>Páginas prototipadas:</p>
      {/* Renderizar cards de páginas */}
    </div>
  )
}

const meta: Meta<typeof Dashboard> = {
  title: 'Pages/Dashboard',
  component: Dashboard,
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
EOF

# 5. Commit
cd ../..
git add -A && git commit -m "H: Dashboard planning e wireframe"
```

**Próximos passos after this**:
1. H2: Criar endpoint `/api/dashboard/pages` que retorna metadados
2. H3: Implementar UI consumindo endpoint
3. H4: Adicionar indicadores de saúde
4. H5: Link direto para Storybook

**Referências**:
- Wireframe: `docs/dashboard-wireframe.md` (você cria)
- API model: `apps/studio/src/app/api/pages/README.md`
- Storybook: `CONTRIBUTING.md` - "Criando Stories"

**Critério de Aceitação**:
- [ ] Wireframe documentado
- [ ] Dados estruturados em JSON
- [ ] Story placeholder criado
- [ ] Próximas 4 issues claras (H2-H5)
- [ ] Lint e build passando

---

## 🚀 Como Proceder

### Passo 1: Escolha Uma Tarefa
- OPÇÃO A (recomendada): C2 - Studio Sidebar
- OPÇÃO B: D2 - Addon A11y
- OPÇÃO C: H - Dashboard

### Passo 2: Siga o Guia Correspondente
Cada seção tem "Como começar" com comandos prontos.

### Passo 3: Desenvolvimento
```bash
git checkout -b feature/ID-nome
[editar código]
pnpm lint --fix
pnpm build (ou build:studio / build:storybook)
pnpm dev:studio ou pnpm dev:storybook
# Verificar no browser
git add -A
git commit -m "ID: descrição"
git push origin feature/ID-nome
```

### Passo 4: Pull Request
1. Ir a https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/pulls
2. Criar PR para `main` ou `develop`
3. Descrever mudanças
4. Mencionar issue (#C2, #D2, #H)
5. Aguardar review

---

## 📊 Estimativa de Tempo

| Task | Implementação | Review | Total |
|------|---------------|--------|-------|
| C2 | 3-4h | 30min | 3.5-4.5h |
| D2 | 2-3h | 15min | 2.25-3.25h |
| H | 4-5h | 1h | 5-6h |

---

## 📋 Checklist Antes de Commit

- [ ] `pnpm lint --fix` rodou sem erros
- [ ] `pnpm build` compilou com sucesso
- [ ] Testei no browser (dev server)
- [ ] Atualizei documentation se necessário
- [ ] Fiz checklist acessibilidade (se componente novo)
- [ ] Commit message é descritiva
- [ ] Branch name segue padrão `feature/ID-nome`

---

## 🎯 Meta Próxima Reunião

Completar pelo menos **2 tarefas** (C2 + D2 ou H inicio) para atingir **70% do Sprint 2** (8/11 issues).

---

## 📞 Ajuda?

Revisar:
- `PRÓXIMOS-PASSOS.md` - Guia geral
- `CONTRIBUTING.md` - Padrões de código
- `docs/accessibility-audit.md` - Checklist acessibilidade
- GitHub Issues - Descrição original da tarefa

---

**Status**: ✅ Git sincronizado, pronto para nova tarefa  
**Seu turno**: Escolha OPÇÃO A, B ou C e comece! 🚀
