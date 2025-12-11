# 🔍 Análise de Gaps - Por que o Design System não consegue recriar os designs do Figma

## 📊 Problema Central

O design system `@prototipo/design-system` foi criado com **componentes genéricos e reutilizáveis**, enquanto o Figma contém **designs específicos com customizações pixel-perfect**. Essa desconexão cria três problemas principais:

---

## 🚫 1. LAYOUTS ASSIMÉTRICOS

### Problema
O Figma exibe **layouts customizados e assimétricos** (ex: 1 card grande + grid 2x2), mas o design system oferece apenas grids **uniformes**.

### Design System Atual
```tsx
// design-system/StatsCard - Uniforme
<div className="grid grid-cols-4">
  <StatsCard />  // 25% width
  <StatsCard />  // 25% width
  <StatsCard />  // 25% width
  <StatsCard />  // 25% width
</div>
```

### Figma Requer
```tsx
// Figma - Assimétrico
<div style={{ gridTemplateColumns: '349px 1fr' }}>
  <Card className="large" />  // 349px fixo
  <div className="grid grid-cols-2">
    <Card />  // 50% do espaço restante
    <Card />  // 50% do espaço restante
    <Card />  // 50% do espaço restante
    <Card />  // 100% (2 colunas)
  </div>
</div>
```

### Por que não Funciona
- ❌ `StatsCard` não tem prop para `width` customizável
- ❌ `Card` padding/styling é pré-definido (não customizável)
- ❌ Sem forma de definir `gridTemplateColumns` com valores mistos (px + fr)

---

## 🎨 2. CORES E TOKENS

### Problema
O Figma usa cores **específicas do projeto** (ex: `#7367F0`, `#28C76F`), mas o design system exporta cores genéricas de tokens.

### Design System Oferece
```json
// packages/tokens/tokens.json
{
  "colors": {
    "primary": { "500": "#7367f0" },
    "success": { "500": "#22c55e" },  // ← DIFERENTE DO FIGMA
    "warning": { "500": "#f59e0b" },  // ← DIFERENTE DO FIGMA
    "error": { "500": "#ef4444" }     // ← DIFERENTE DO FIGMA
  }
}
```

### Figma Usa
```css
/* Cores específicas */
#7367F0  → Purple (Primary)
#28C76F  → Green (Success)   ← Diferente do token #22c55e
#FFB443  → Orange (Warning)  ← Diferente do token #f59e0b
#EA5455  → Red (Error)       ← Diferente do token #ef4444
```

### Por que não Funciona
- ❌ Componentes do design system usam `color="success"` → `#22c55e`
- ❌ Figma exibe `#28C76F` (verde mais vibrante)
- ❌ Resultado visual é **completamente diferente**
- ❌ Sem forma fácil de sobrescrever cores globalmente

---

## 📐 3. TIPOGRAFIA E FONTES

### Problema
O Figma usa **fontes customizadas** e **pesos específicos**, enquanto o design system usa Tailwind genérico.

### Design System
```tsx
// Button, Text, Card - Usa Tailwind padrão
className="font-medium text-sm"
className="font-bold text-3xl"
```

### Figma Requer
```tsx
// Montserrat com pesos específicos
className="font-['Montserrat',sans-serif] font-bold"
className="font-['Montserrat:ExtraBold',sans-serif]"
className="font-['Montserrat:SemiBold',sans-serif]"
```

### Por que não Funciona
- ❌ Design system não importa Montserrat
- ❌ `Text` component não tem suporte a `fontFamily` customizada
- ❌ `font-medium` vs `font-['Montserrat:Medium']` produzem visuais diferentes

---

## 💾 4. COMPONENTES COM DADOS INLINE

### Problema
O Figma contém **progresso inline nas células da tabela**, mas o design system tem `Progress` como componente separado.

### Design System
```tsx
// Approach: Componentes separados
<td>
  <span>92%</span>
</td>
<td>
  <Progress value={92} />
</td>
```

### Figma Requer
```tsx
// Inline: Total + Barra + Percentual tudo na mesma célula
<td>
  <div className="flex items-center gap-3">
    <span>450</span>                    {/* Total */}
    <div className="bg-blue h-[12px]"> {/* Barra 12px */}
      <div style={{width: '92%'}} />
    </div>
    <span>92%</span>                    {/* Percentual */}
  </div>
</td>
```

### Por que não Funciona
- ❌ `Progress` é um componente com muito CSS fixo
- ❌ Altura é 4px por padrão, Figma exige 12px
- ❌ Sem forma de customizar espaciamento e layout inline

---

## 🎯 5. ESPAÇAMENTO E GAPS

### Problema
O design system usa gaps genéricos (ex: `gap: var(--spacing-4)`), mas o Figma tem gaps **muito específicos** e não padronizados.

### Design System
```css
/* Padronizado */
--spacing-2: 0.5rem;     /* 8px */
--spacing-3: 0.75rem;    /* 12px */
--spacing-4: 1rem;       /* 16px */
--spacing-6: 1.5rem;     /* 24px */
```

### Figma Requer
```css
/* Específico do projeto */
gap: 10px   /* KPIs grid */
gap: 6px    /* Tabs */
padding: 256px  /* Container horizontal */
padding: 24px   /* Card padding */
shadow: 0px 4px 24px rgba(0,0,0,0.06)  /* Exato */
```

### Por que não Funciona
- ❌ `gap: 10px` não pode ser expresso com tokens padrão (12px ou 8px)
- ❌ `padding: 256px` horizontal é custom demais
- ❌ Design system prefere unidades padronizadas (8px grid)

---

## 🏗️ 6. COMPONENTES COMPOSTOS

### Problema
O Figma tem **componentes compostos complexos** que o design system não previu.

### Exemplo: Tabela com Legenda
O Figma tem:
```
┌────────────────────────────────────┐
│ [Tabela com 7 colunas]             │
├────────────────────────────────────┤
│ • Verde (Ativo ≥80%)               │
│ • Laranja (Médio 50-79%)           │
│ • Vermelho (Baixo <50%)            │
│                  [Pagination 1-7]  │
└────────────────────────────────────┘
```

### Design System Oferece
```tsx
<DataTable />       // Sem suporte a legenda integrada
<Pagination />      // Componente separado
```

### Por que não Funciona
- ❌ Sem forma de compor DataTable + Legenda + Pagination juntos
- ❌ Layout do footer é muito específico (legenda esquerda, pagination direita)
- ❌ Seria necessário criar wrapper customizado fora do design system

---

## 🔧 7. FALTA DE EXTENSIBILIDADE

### Problema
Os componentes do design system têm **poucos pontos de customização**.

### Exemplo: Progress Bar
```tsx
// O que o design system oferece
<Progress 
  value={92}
  variant="linear"      // linear | circular
  size="md"             // sm | md | lg
  color="success"       // primary | secondary | success | warning | error
  showLabel={false}
/>
```

### O que o Figma precisa
```tsx
// O que seria necessário
<Progress 
  value={92}
  height="12px"         // Customizar altura ← NÃO EXISTE
  backgroundColor="#eae8fd"  // Customizar bg ← NÃO EXISTE
  barColor="#28C76F"    // Customizar cor exacta ← NÃO EXISTE
  containerClassName="" // Passar classes ← NÃO EXISTE
/>
```

### Por que não Funciona
- ❌ Props limitadas, design fixo em CSS
- ❌ CSS Modules não exportam variáveis para override
- ❌ Seria preciso criar componente customizado

---

## 📋 MATRIZ DE COMPARAÇÃO

| Aspecto | Design System | Figma | Compatível? |
|---------|--------------|-------|-----------|
| **Layouts** | Grids uniformes (4 cols) | Assimétricos (349px + 2x2) | ❌ |
| **Cores Primária** | #7367f0 | #7367f0 | ✅ |
| **Cores Success** | #22c55e | #28C76F | ❌ |
| **Cores Warning** | #f59e0b | #FFB443 | ❌ |
| **Cores Error** | #ef4444 | #EA5455 | ❌ |
| **Font** | System (Tailwind default) | Montserrat | ❌ |
| **Font Weights** | 4 pesos padrão | 6 pesos específicos | ❌ |
| **Progress Height** | 4px padrão | 12px no Figma | ❌ |
| **Gaps** | 8px, 12px, 16px, 24px | 6px, 10px, 256px | ❌ |
| **Shadows** | var(--shadows-md) | 0px 4px 24px rgba(...) | ❌ |
| **Card Padding** | var(--spacing-4/6) | 24px fixo | ⚠️ |
| **Inline Progress** | Componente separado | Dentro da célula | ❌ |
| **Componentes Compostos** | Não | Sim | ❌ |

---

## 🛑 RAIZ DO PROBLEMA

### 1. **Timing de Desenvolvimento**
- Design system foi criado **antes do Figma** estar finalizado
- Tokens foram exportados de um painel diferente do atual
- Componentes não foram alinhados com o design Figma

### 2. **Abordagem de Design System**
- Priorizou **reutilização genérica** sobre **fidelidade visual**
- Componentes são "caixas pretas" com CSS fixo
- Pouco espaço para customização sem quebrar abstraçã

### 3. **Falta de Sincronização**
- Figma mudou, design system não acompanhou
- Cores foram alteradas no Figma mas tokens não foram atualizados
- Não há processo automático de sincronização (embora haja `code-to-figma`)

---

## 💡 SOLUÇÕES (Prós e Contras)

### Opção 1: Recriar com Tailwind Puro ✅ (Seu Caso)
**Pros:**
- Pixel-perfect match com Figma
- Sem limitações de abstrações
- Rápido para prototipos

**Contras:**
- Não reutiliza design system
- Difícil de manter sincronia futura
- Perde benefício de componentes reutilizáveis

### Opção 2: Estender Design System
**Pros:**
- Mantém reutilização
- Evolui o design system

**Contras:**
- Exige refatoração profunda
- Muda API dos componentes
- Alto custo

**Implementação:**
```tsx
// Estender StatsCard com props customizáveis
<StatsCard
  title="Alunos"
  value={2480}
  cardWidth="349px"           // ← Nova prop
  progressHeight="12px"       // ← Nova prop
  customColors={{
    success: "#28C76F",      // ← Nova prop
    warning: "#FFB443",
    error: "#EA5455"
  }}
  layout="asymmetric"         // ← Nova prop
/>
```

### Opção 3: Sincronização Figma → Design System
**Pros:**
- Automático e futuro-proof
- Mantém sincronização

**Contras:**
- Exige MCP (Model Context Protocol)
- Complicado de configurar
- Já existe `code-to-figma` mas não faz reverse sync

---

## 🎯 RECOMENDAÇÃO

### Para Padrão Gestor de Redes (já feito ✅)
**Use Tailwind Puro** - Você fez correto!
- É um padrão único
- Figma customizado demais para design system
- Rápido e limpo

### Para Futuros Painéis
1. **Verifique se precisa ser reutilizável**
   - Se SIM → Estenda o design system
   - Se NÃO → Use Tailwind puro (como você fez)

2. **Se for reutilizável**
   - Atualize os tokens no design system primeiro
   - Crie componentes compostos (ex: KPIGrid com layout)
   - Documente em Storybook

3. **Mantenha sincronização**
   - Atualize cores em `packages/tokens/tokens.json`
   - Rode `pnpm build:tokens`
   - Verifique no Storybook

---

## 📝 PRÓXIMAS AÇÕES

**Curto Prazo:**
- ✅ Continuar com Tailwind puro para padrões únicos
- Documentar em `domains/admin/README.md` quando usar cada abordagem

**Médio Prazo:**
- Revisar `packages/design-system/` para componentes customizáveis
- Adicionar props para `width`, `height`, `colors` em componentes-chave

**Longo Prazo:**
- Implementar sincronização automática Figma → Design System
- Usar `code-to-figma` MCP de forma bidirecional

