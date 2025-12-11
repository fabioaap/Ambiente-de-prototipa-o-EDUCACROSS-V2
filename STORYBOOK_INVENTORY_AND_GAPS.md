# 📚 Inventário Completo: Design System vs Figma

## 📖 O que você PEDIU

Você quer saber: **"O que tem nessa tela Figma (node-id=6482-6149) que não temos completo no storybook?"**

**Solução:** Como não consigo acessar Figma direto, vou te dar um **inventário completo** do que temos, e você compara com a tela.

---

## ✅ COMPONENTES JÁ EXISTENTES NO STORYBOOK (30+)

### 1. **Formulários & Inputs**

| Componente | Stories Existentes | Props Disponíveis | Status |
|------------|-------------------|-------------------|--------|
| **Input** | Default, WithLabel, WithError, Disabled, Password, Number, Email | type, label, placeholder, error, disabled, required, helperText, fullWidth | ✅ Completo |
| **Select** | Default, WithLabel, WithError, Disabled, CustomChildren | options, label, error, disabled, required, helperText, fullWidth | ✅ Completo |
| **Checkbox** | Default, Checked, Unchecked, Disabled | label, checked, disabled, error | ✅ Completo |
| **Radio** | Default, Checked, Disabled | label, value, checked, disabled | ✅ Completo |
| **Switch** | Default, Enabled, Disabled, WithLabel | checked, disabled, label | ✅ Completo |

**Resumo:** Todos os inputs básicos existem com boas stories.

---

### 2. **Botões & Ações**

| Componente | Stories Existentes | Props Disponíveis | Status |
|------------|-------------------|-------------------|--------|
| **Button** | Primary, Secondary, Outline, Ghost, Disabled, Loading | variant, size, disabled, fullWidth, children | ✅ Completo |
| **ActionButtons** | AllActions, ViewAndEdit, OnlyDelete, SmallSize, MediumSize, LargeSize | onView, onEdit, onDelete, size | ✅ Completo |
| **ToolbarButtons** | Default, Disabled, OnlyImport, OnlyExport | onImport, onExport, disabled | ✅ Completo |

**Resumo:** Botões completos. Faltam: ícones customizáveis, loading states, variants adicionais.

---

### 3. **Exibição de Dados**

| Componente | Stories Existentes | Props Disponíveis | Status |
|------------|-------------------|-------------------|--------|
| **Badge** | Primary, Success, Warning, Error, Info, Default, Sizes, FilledStyle, OutlinedStyle | variant, size, styleType, children | ✅ Completo |
| **Text** | Default, Sizes (xs-5xl), Weights, Colors | as, size, weight, color, children | ✅ Completo |
| **Card** | Default, Bordered, Elevated, Clickable, WithContent | variant, padding, clickable, className, children | ⚠️ Incompleto (faltam: width, height, bgColor, boxShadow) |
| **Progress** | Default, Linear, Circular, WithLabel, Colors | value, variant, size, color, showLabel, label | ⚠️ Incompleto (faltam: height em px, customColor, inline) |
| **StatsCard** | Default, WithTrend, WithIcon, WithChildren, Loading | title, value, trend, icon, subtitle, children, isLoading | ⚠️ Incompleto (faltam: width, progressBars, customColor) |

**Resumo:** Básicos existem, mas faltam props de customização.

---

### 4. **Tabelas & Listagens**

| Componente | Stories Existentes | Props Disponíveis | Status |
|------------|-------------------|-------------------|--------|
| **Table** | Default, Sortable, Hover, Striped | columns, data, striped, hoverable, onSort | ✅ Completo |
| **DataTable** | Default, WithCheckbox, Sortable, Filterable, Pagination | columns, data, selectable, sortable, filterable | ✅ Completo |
| **Leaderboard** | Default, WithStats, WithTheme | entries, title, maxItems, showRank | ✅ Completo |

**Resumo:** Tabelas funcionam bem. Faltam: inline content (badges, progress inline), row highlighting.

---

### 5. **Navegação**

| Componente | Stories Existentes | Props Disponíveis | Status |
|------------|-------------------|-------------------|--------|
| **Breadcrumb** | Short, Long, Custom | items, className | ✅ Completo |
| **Tabs** | Default, 4 Tabs, Vertical, Disabled | tabs, defaultTab, onChange | ✅ Completo |
| **Pagination** | Default, WithManyPages, Disabled, CurrentPage | currentPage, totalPages, onPageChange | ✅ Completo |
| **Sidebar** | Default, Collapsed, WithActive, DarkMode | items, isCollapsed, activeItem | ✅ Completo |
| **Dropdown** | Default, MultiLevel, WithCheckbox, WithLabel | trigger, content, items, groups | ✅ Completo |

**Resumo:** Navegação completa.

---

### 6. **Feedback & Status**

| Componente | Stories Existentes | Props Disponíveis | Status |
|------------|-------------------|-------------------|--------|
| **Alert** | Info, Success, Warning, Error, Dismissible | variant, title, description, onClose | ✅ Completo |
| **Modal** | Default, WithActions, Scrollable, Sizes | title, content, onClose, size | ✅ Completo |
| **HealthIndicator** | Default, Success, Warning, Error, Grid, DashboardExample | title, value, status, description, icon | ✅ Completo |
| **Skeleton** | Default, Paragraph, Rounded, Circle | count, lines, rounded, circle | ✅ Completo |

**Resumo:** Feedback widgets existem.

---

### 7. **Layout & Estrutura**

| Componente | Stories Existentes | Props Disponíveis | Status |
|------------|-------------------|-------------------|--------|
| **Layout** | Default, Centered, PaddingVariants | maxWidth, paddingX, paddingY, centered, children | ✅ Completo |
| **PageHeader** | Simple, Subtitle, WithActions, CompleteExample | title, subtitle, count, actions | ✅ Completo |

**Resumo:** Layout básico ok, mas sem suporte a grids customizados (ex: 349px + 1fr).

---

### 8. **Filtros & Busca**

| Componente | Stories Existentes | Props Disponíveis | Status |
|------------|-------------------|-------------------|--------|
| **FilterGroup** | Default, MultipleFilters, WithSearch | filters, onFilterChange, searchable | ✅ Completo |
| **NetworkFilter** | EmContexto, Exemplo de integração | filters, redes, onSelect | ✅ Completo |

**Resumo:** Filtros existem.

---

### 9. **Especializados**

| Componente | Stories Existentes | Props Disponíveis | Status |
|------------|-------------------|-------------------|--------|
| **Avatar** | Default, WithInitials, Sizes | src, alt, size, initials | ✅ Completo |
| **AvatarGroup** | Default, MaxDisplay, Overflow | avatars, max | ✅ Completo |
| **Chip** | Default, Removable, WithIcon, Disabled | label, onRemove, icon, disabled | ✅ Completo |

**Resumo:** Componentes especializados existem.

---

## ❌ O QUE FALTA (Gaps Reais)

### Tier 1: CRÍTICO (Impacta muitos painéis)
```
1. Progress com height customizável (hoje só tem sm/md/lg)
2. Card com width, height, backgroundColor, boxShadow customizáveis
3. StatsCard com suporte a progressBars inline
4. Button com ícones customizáveis
5. Grid customizado (349px + 1fr, em vez de 4-col uniforme)
```

### Tier 2: IMPORTANTE (Impacta alguns painéis)
```
6. DataTable com inline content (badges, progress, buttons dentro)
7. Table com row highlighting customizável
8. Badge com cores customizáveis (não apenas variantes)
9. Input com ícones prefix/suffix
10. Select com groups e search
```

### Tier 3: NICE-TO-HAVE (Futuro)
```
11. Tooltip (não existe)
12. Popover (não existe)
13. DatePicker (não existe)
14. TimePicker (não existe)
15. FileUpload (não existe)
16. Slider (não existe)
17. Stepper (não existe)
18. Accordion (não existe)
```

---

## 🎯 COMO USAR ESTE DOCUMENTO

### Passo 1: Você olha a tela Figma (node-id=6482-6149)

### Passo 2: Identifica os componentes usados

Exemplo - Imagina que na tela tem:
- Card de 349px (❌ Falta width customizável)
- Progress bar 12px (❌ Falta height customizável)
- Tabela com badges inline (❌ Falta inline content)
- Badge com cor #28C76F (❌ Falta cor customizável)

### Passo 3: Consulta este documento

- **Card**: ⚠️ Incompleto (faltam: width, height, bgColor, boxShadow)
- **Progress**: ⚠️ Incompleto (faltam: height em px, customColor, inline)
- **DataTable**: ✅ Completo (mas não faltam inline content features)
- **Badge**: ✅ Completo (mas cores fixas em variantes)

### Passo 4: Abre PR para estender as props

---

## 📋 MAPA DE STORIES NO STORYBOOK

Você pode explorar:

```
http://localhost:6006

📁 Components
  ├── Forms
  │   ├── Input ✅
  │   ├── Select ✅
  │   ├── Checkbox ✅
  │   ├── Radio ✅
  │   └── Switch ✅
  ├── Button ✅
  ├── Card ⚠️
  ├── Progress ⚠️
  ├── Navigation
  │   ├── Breadcrumb ✅
  │   ├── Tabs ✅
  │   ├── Pagination ✅
  │   └── Dropdown ✅
  ├── Layout ✅
  └── DataDisplay
      ├── Badge ✅
      ├── Text ✅
      ├── Table ✅
      └── Leaderboard ✅
📁 FrontOffice
  └── Gestor de Redes ✅
📁 BackOffice
  ├── ActionButtons ✅
  ├── Breadcrumb ✅
  ├── Tabs ✅
  └── ToolbarButtons ✅
📁 Feedback
  ├── Alert ✅
  ├── Modal ✅
  ├── HealthIndicator ✅
  └── Skeleton ✅
```

---

## 🔍 PRÓXIMOS PASSOS

**Você precisa fazer UMA destas coisas:**

### Opção A: Me passar screenshot da tela
```
1. Abre Figma
2. Clica no node-id=6482-6149
3. Print screenshot
4. Passa pra mim
5. Eu digo exatamente o que falta
```

### Opção B: Me descrever a tela
```
Exemplo resposta:
"Tem 3 cards de KPI (349px cada), 1 tabela com badges, 
1 formulário com select e input, 2 botões, 1 progress bar"

Aí eu já sei o que falta!
```

### Opção C: Eu estendo automaticamente
```
Você me diz: "Estende os componentes com as props do Tier 1"
Aí eu já vai e faz todos os 5 gaps críticos!
```

---

## ✨ Conclusão

**Você ESTÁ CERTO!** O Design System tem:
- ✅ **30+ componentes**
- ✅ **Stories para todos**
- ✅ **Props básicas funcionando**

**MAS falta:**
- ❌ **Props de customização real**
- ❌ **Exemplos de casos complexos**
- ❌ **Integração com layouts específicos**

A solução é estender os componentes, não criar novos!

