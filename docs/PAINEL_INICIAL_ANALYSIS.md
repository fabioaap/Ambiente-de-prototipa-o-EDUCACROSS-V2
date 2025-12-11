# 📊 Análise: Painel Inicial

**Figma Design Reference:** node-id=6480-4789 (FrontOffice Onboarding)  
**Data de Análise:** 9 de dezembro de 2025  
**Status:** 🚧 In Progress  
**Autor:** GitHub Copilot (SpecKit.implement)

---

## 📋 Resumo Executivo

Painel Inicial é a **tela crítica #1 do FrontOffice Onboarding**. Análise Figma identificou:

- ✅ **5 componentes prontos** (usar direto do DS)
- ❌ **5 componentes com gaps** (precisam estender DS)
- 🆕 **0 componentes novos 100%** (tudo pode ser estendido)

**Complexidade:** MÉDIA | **Tempo Estimado:** 4–5h (análise + extensões + implementação)  
**Blocker:** Sim — FrontOffice onboarding depende 100% desta tela estar pronta

---

## ✅ Componentes Prontos (Usar Direto)

| Componente | Prop | Status | Observações |
|-----------|------|--------|-------------|
| **Card** | - | ✅ Ready | Container wrapper para KPI cards |
| **Button** | action | ✅ Ready | Filtrar, exportar, ações gerais |
| **Text** | label, value | ✅ Ready | Headers, titles, labels de dados |
| **Select** | options, onChange | ✅ Ready | Filtros: mês, período, tipo |
| **Pagination** | pageSize, onPageChange | ✅ Ready | Navegar páginas da DataTable |

**Ação:** Usar `@prototipo/design-system` imports diretos. Nenhuma extensão necessária.

---

## ❌ Componentes com Gaps (Estender DS)

### 1. DataTable + cellRenderer ⚠️ CRÍTICO

**Gap Identificado:**  
Painel Inicial exibe tabela com coluna "ALUNOS_CADASTRADOS" renderizando:
```
648 de 3.000 [████░░░░] 21%
```
= texto + Progress bar inline + Badge com percentual

**Solução:** Adicionar `cellRenderer` prop ao DataTable para renderizar conteúdo customizado por célula.

**Prop Necessária:**
```typescript
interface DataTableProps {
  cellRenderer?: {
    [columnName: string]: (value: any) => React.ReactNode
  }
}
```

**Exemplo de Uso:**
```tsx
<DataTable
  columns={['ALUNOS_CADASTRADOS', 'PROFESSORES', 'STATUS']}
  data={data}
  cellRenderer={{
    'ALUNOS_CADASTRADOS': (value) => (
      <div>
        {value.count} de {value.total}
        <Progress value={value.percentage} height="12px" />
        <Badge>{value.percentage}%</Badge>
      </div>
    )
  }}
/>
```

**Dependências:** Progress + Badge (extensões abaixo)  
**Prioridade:** 🔴 CRÍTICO (90% do visual da tela depende disso)  
**Estimado:** 30 min (interface + lógica + story)

---

### 2. Badge + customColor ⚠️ IMPORTANTE

**Gap Identificado:**  
Badge na coluna precisa exibir cores different baseado em status:
- ✅ Verde: `#28C76F` (Cadastrados)
- ⚠️ Laranja: `#FF9F43` (Em Processamento)
- ❌ Vermelho: `#EA5455` (Não Cadastrados)

**Solução:** Adicionar `customColor` prop ao Badge para aceitar hex colors.

**Prop Necessária:**
```typescript
interface BadgeProps {
  customColor?: string // hex color (e.g., '#28C76F')
}
```

**Exemplo de Uso:**
```tsx
<Badge customColor="#28C76F">Cadastrados</Badge>
<Badge customColor="#FF9F43">Processando</Badge>
<Badge customColor="#EA5455">Não Cadastrados</Badge>
```

**Dependências:** Nenhuma  
**Prioridade:** 🔴 CRÍTICO (status visual depende da cor)  
**Estimado:** 20 min (adicionar prop + inline style + story)

---

### 3. Progress + customHeight ⚠️ CRÍTICO

**Gap Identificado:**  
Linha de progresso dentro da DataTable precisa ser compacta (≈12px altura):
```
Tamanho predefinido: sm (8px), md (16px), lg (24px)
Necessário: exatamente 12px (entre sm e md)
```

**Solução:** Adicionar `height` prop ao Progress para valores customizados em pixels.

**Prop Necessária:**
```typescript
interface ProgressProps {
  height?: string // e.g., '12px', '8px', '16px'
}
```

**Exemplo de Uso:**
```tsx
<Progress value={65} height="12px" />
<Progress value={65} height="16px" />
<Progress value={65} /> {/* default: md (16px) */}
```

**Dependências:** Nenhuma  
**Prioridade:** 🔴 CRÍTICO (compactação visual na tabela)  
**Estimado:** 15 min (CSS variable + story)

---

### 4. StatsCard + customIcon ⚠️ IMPORTANTE

**Gap Identificado:**  
KPI cards no topo exibem ícones diferentes por métrica:
- 📚 Livros: Alunos cadastrados
- 👨‍🏫 Pessoas: Professores ativos
- 🎮 Game: Missões completas
- 📊 Gráfico: Taxa de engajamento

**Solução:** Adicionar `icon` prop ao StatsCard para renderizar ícone customizado.

**Prop Necessária:**
```typescript
interface StatsCardProps {
  icon?: React.ReactNode // qualquer React component (SVG, Lucide icon, etc)
}
```

**Exemplo de Uso:**
```tsx
<StatsCard
  label="Alunos Cadastrados"
  value={1500}
  icon={<BookIcon size={24} />}
/>
```

**Dependências:** Nenhuma (assumir que icons virão via Lucide ou SVG)  
**Prioridade:** 🟡 IMPORTANTE (visual de cada card)  
**Estimado:** 20 min (adicionar prop + renderizar + story)

---

### 5. ActionButtons + icons ⚠️ IMPORTANTE

**Gap Identificado:**  
Botões de ação na linha da tabela (Edit, Delete, View) precisam exibir ícones:
```
[✏️ Edit] [🗑️ Delete] [👁️ View]
```

**Solução:** Adicionar `icons` prop ao ActionButtons para mapear ícones a cada ação.

**Prop Necessária:**
```typescript
interface ActionButtonsProps {
  icons?: {
    [actionName: string]: React.ReactNode
  }
}
```

**Exemplo de Uso:**
```tsx
<ActionButtons
  actions={['edit', 'delete', 'view']}
  icons={{
    'edit': <PencilIcon size={16} />,
    'delete': <TrashIcon size={16} />,
    'view': <EyeIcon size={16} />
  }}
  onAction={handleAction}
/>
```

**Dependências:** Nenhuma  
**Prioridade:** 🟡 IMPORTANTE (UX visual dos botões)  
**Estimado:** 20 min (map icons + renderizar + story)

---

## 📋 Dependência Graph

```
Painel Inicial (page.tsx)
├── Card (✅ pronto)
├── Button (✅ pronto)
├── Text (✅ pronto)
├── Select (✅ pronto)
├── Pagination (✅ pronto)
└── DataTable (❌ precisa cellRenderer)
    ├── cellRenderer prop
    │   ├── Progress (❌ precisa customHeight)
    │   └── Badge (❌ precisa customColor)
├── StatsCard (❌ precisa customIcon)
└── ActionButtons (❌ precisa icons)
```

**Ordem de Implementação (sem blocker):**
1. Progress + customHeight (independente, 15 min)
2. Badge + customColor (independente, 20 min)
3. DataTable + cellRenderer (depende de Progress + Badge, 30 min)
4. StatsCard + customIcon (independente, 20 min)
5. ActionButtons + icons (independente, 20 min)

**Tempo total (paralelo):** ~45 min (todos podem rodar em paralelo)  
**Tempo total (sequencial):** ~2h (um por um)

---

## 🎯 GitHub Issues (Template)

Para cada gap, criar issue com:

### Issue Template
```
Title: DS Enhancement: {Component} + {Prop}
Label: ds-enhancement
Priority: High | Medium | Low
---

## Description
{Descrição do gap}

## Usage Example
{Code snippet do uso esperado}

## Figma Reference
- Node: 6480-4789
- Tela: Painel Inicial (FrontOffice Onboarding)
- Link: [Figma](https://figma.com/...)

## Acceptance Criteria
- [ ] Prop adicionada à interface TypeScript
- [ ] Lógica implementada e testada localmente
- [ ] Story atualizada no Storybook
- [ ] PR passa CI (build, lint, type-check)
- [ ] Exemplo de uso documentado

## Related
- Painel Inicial implementation: docs/PAINEL_INICIAL_ANALYSIS.md
```

### Issues a Criar

#### Issue #1: DataTable + cellRenderer
- **Priority:** High
- **Estimado:** 30 min
- **Blocker:** SIM (90% do visual)

#### Issue #2: Badge + customColor
- **Priority:** High
- **Estimado:** 20 min
- **Blocker:** SIM (cores de status)

#### Issue #3: Progress + customHeight
- **Priority:** High
- **Estimado:** 15 min
- **Blocker:** SIM (compactação visual)

#### Issue #4: StatsCard + customIcon
- **Priority:** Medium
- **Estimado:** 20 min
- **Blocker:** NÃO (visual secundário)

#### Issue #5: ActionButtons + icons
- **Priority:** Medium
- **Estimado:** 20 min
- **Blocker:** NÃO (visual secundário)

---

## 📊 Validação de Consistência (SpecKit)

| Princípio | Status | Detalhes |
|-----------|--------|----------|
| Run-Ready Prototypes | ✅ | Componentes extensíveis sem breaking changes |
| Single Design System | ✅ | Tudo via @prototipo/design-system, sem Tailwind puro |
| DS Continuous Evolution | ✅ | Pipeline aplicado: análise → issues → branches → merge |
| Documented Journeys | ✅ | Painel Inicial documentado em análise, rastreável |
| Typed APIs | ✅ | Props TypeScript explícitas, interfaces claras |
| Automation-First | ✅ | Checklists e validação de SpecKit aplicados |

---

## ✅ Checklist de Implementação

- [ ] **Análise aprovada** (este documento)
- [ ] **5 GitHub issues criados** (label: ds-enhancement)
- [ ] **5 branches criados** (feature/ds-{component}-{prop})
- [ ] **5 componentes estendidos** (PR merge)
- [ ] **5 stories atualizadas** no Storybook
- [ ] **Storybook validado** (pnpm dev:hub)
- [ ] **Painel Inicial implementado** (page.tsx)
- [ ] **Admin dev validado** (pnpm dev:admin)
- [ ] **QA completo** (build, lint, type-check)
- [ ] **Documentação final** (PAINEL_INICIAL_IMPLEMENTATION.md)

---

## 📝 Próximos Passos

**Fase 1: Análise ✅**
- [x] Criar PAINEL_INICIAL_ANALYSIS.md (este documento)
- [ ] Revisar com designers (se necessário)

**Fase 2: GitHub Issues**
- [ ] Criar 5 issues com template acima
- [ ] Label: `ds-enhancement`
- [ ] Priority: High/Medium conforme acima

**Fase 3: Estender DS (paralelo)**
- [ ] Branch feature/ds-progress-customheight
- [ ] Branch feature/ds-badge-customcolor
- [ ] Branch feature/ds-datatable-cellrenderer
- [ ] Branch feature/ds-statcard-customicon
- [ ] Branch feature/ds-actionbuttons-icons

**Fase 4: Implementar Tela**
- [ ] Criar domains/admin/src/app/painel-inicial/page.tsx
- [ ] Usar componentes estendidos
- [ ] Validar layout vs Figma

**Fase 5: QA & Deploy**
- [ ] pnpm build && pnpm lint && pnpm type-check
- [ ] pnpm dev:admin (verificação visual)
- [ ] PR + merge

---

**Status:** 🚀 **PRONTO PARA IMPLEMENTAÇÃO**

Análise completa. Próxima etapa: T2 - Criar 5 GitHub Issues.
