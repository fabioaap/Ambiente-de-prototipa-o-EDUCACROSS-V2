# 🔍 Análise Real do Gap: Design System vs Figma

## 📍 Localização do Problema

**VOCÊ ESTÁ CERTO!** O DS deveria contemplar tudo. O problema é que **os componentes foram criados muito genéricos** e faltam props específicas que Figma exige.

### Exemplo: Progress Component

**Figma exige (Gestor de Redes):**
```
- Altura: 12px (customizável)
- Cor: #28C76F (verde da Figma)
- Posição: INLINE dentro de célula de dados
- Label: Texto ao lado da barra ("92%")
```

**O que o DS oferece:**
```tsx
<Progress 
  value={92}
  variant="linear"       // ← linear ou circular (fixo)
  size="md"             // ← sm/md/lg presets (sem 12px!)
  color="success"       // ← color usa token #22c55e (ERRADO!)
  showLabel={true}      // ← mostra % apenas
/>
```

**Props que FALTAM no Progress:**
```tsx
// Ficaria assim se tivesse tudo:
<Progress
  value={92}
  variant="linear"
  size="md"
  color="success"
  height="12px"              // ← NÃO EXISTE
  customColor="#28C76F"      // ← NÃO EXISTE
  label="92%"                // ← Existe mas não customizável
  inline={true}              // ← NÃO EXISTE
  position="after-data"      // ← NÃO EXISTE
/>
```

---

## 📊 Análise Componente por Componente

### 1. **Card** ❌ Incompleto

**Props que tem:**
```ts
interface CardProps {
  variant?: 'default' | 'bordered' | 'elevated';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  clickable?: boolean;
  className?: string;
}
```

**Props que FALTAM (baseado em Figma Gestor de Redes):**
```ts
interface CardProps {
  // ← FALTAM ESTAS:
  width?: string;                    // ex: "349px"
  height?: string;                   // ex: "auto"
  backgroundColor?: string;          // ex: "#F8F9FB"
  borderColor?: string;              // ex: "#E5E7EB"
  borderRadius?: string;             // ex: "8px"
  boxShadow?: string;                // ex: "0px 4px 24px rgba(0,0,0,0.06)"
  gap?: string;                      // ex: "10px"
}
```

**Status:** Funciona para layouts genéricos, FALHA em designs específicos

---

### 2. **StatsCard** ❌ Incompleto

**Props que tem:**
```ts
interface StatsCardProps {
  title: string;
  value: string | number;
  trend?: TrendData;
  icon?: React.ReactNode;
  subtitle?: string;
  children?: React.ReactNode;
  isLoading?: boolean;
}
```

**Props que FALTAM:**
```ts
interface StatsCardProps {
  // ← FALTAM ESTAS:
  width?: string;                    // ex: "349px"
  layout?: 'vertical' | 'horizontal';
  padding?: string;                  // ex: "24px"
  backgroundColor?: string;
  borderRadius?: string;
  boxShadow?: string;
  progressBars?: Array<{             // Para barras inline!
    label: string;
    value: number;
    color?: string;
    height?: string;
  }>;
  progressHeight?: string;           // ex: "12px"
}
```

**Status:** Funciona para KPIs simples, FALHA em layouts com barras inline

---

### 3. **Progress** ❌ Incompleto

**Props que tem:**
```ts
interface ProgressProps {
  value: number;
  variant?: 'linear' | 'circular';
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  showLabel?: boolean;
  label?: string;
}
```

**Props que FALTAM:**
```ts
interface ProgressProps {
  // ← FALTAM ESTAS:
  height?: string;                   // ex: "12px" (agora só tem sm/md/lg!)
  width?: string;                    // ex: "100%"
  customColor?: string;              // ex: "#28C76F" (sobrescreve token)
  backgroundColor?: string;          // cor de fundo
  borderRadius?: string;
  inline?: boolean;                  // para renderizar dentro de célula
  orientation?: 'horizontal' | 'vertical';
}
```

**Status:** NÃO CONSEGUE fazer barras de 12px inline

---

### 4. **Button** ❌ Incompleto

**Props que tem:**
```ts
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}
```

**Props que FALTAM:**
```ts
interface ButtonProps {
  // ← FALTAM ESTAS:
  width?: string;                    // ex: "100%"
  padding?: string;                  // ex: "10px 16px"
  backgroundColor?: string;
  borderRadius?: string;
  fontSize?: string;
  fontWeight?: string;
  borderWidth?: string;
  borderColor?: string;
  hoverColor?: string;
  activeColor?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}
```

---

### 5. **DataTable** ❌ Incompleto

**Props que tem:**
```ts
interface DataTableProps {
  columns: TableColumn[];
  data: unknown[];
  striped?: boolean;
  hoverable?: boolean;
}
```

**Props que FALTAM:**
```ts
interface DataTableProps {
  // ← FALTAM ESTAS:
  rowHeight?: string;                // ex: "48px"
  cellPadding?: string;              // ex: "10px"
  borderColor?: string;
  headerBackgroundColor?: string;
  headerTextColor?: string;
  rowBackgroundColor?: string;
  inlineContent?: {                  // Progress inline, badges, etc
    [columnName: string]: React.ReactNode;
  };
  cellRenderer?: (value, columnName) => React.ReactNode;
}
```

---

## 🔴 Raiz do Problema

O Design System foi criado com **abordagem genérica e defensiva**:

### ❌ O que foi feito
```tsx
// Componente muito genérico
export interface CardProps {
  variant?: 'default' | 'bordered' | 'elevated';    // 3 opções fixas
  padding?: 'none' | 'sm' | 'md' | 'lg';            // 4 presets fixos
}

// Resultado: "Funciona para 80% dos casos, falha nos 20% específicos"
```

### ✅ O que deveria ter sido feito
```tsx
// Componente extensível
export interface CardProps {
  variant?: 'default' | 'bordered' | 'elevated';
  padding?: 'none' | 'sm' | 'md' | 'lg' | string;   // ← permite "24px"!
  width?: string;                                    // ← novo!
  height?: string;                                   // ← novo!
  backgroundColor?: string;                         // ← novo!
  borderRadius?: string;                            // ← novo!
  boxShadow?: string;                               // ← novo!
}

// Resultado: "Funciona para 100% dos casos"
```

---

## 🎯 Solução (Fix Real)

Não é criar **novos componentes**. É **estender os existentes com props de customização**.

### Passo 1: Estender Card

```diff
export interface CardProps {
  variant?: 'default' | 'bordered' | 'elevated';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  clickable?: boolean;
  className?: string;
+ width?: string;
+ height?: string;
+ backgroundColor?: string;
+ borderRadius?: string;
+ boxShadow?: string;
+ gap?: string;
}
```

### Passo 2: Estender Progress

```diff
export interface ProgressProps {
  value: number;
  variant?: 'linear' | 'circular';
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  showLabel?: boolean;
  label?: string;
+ height?: string;
+ customColor?: string;
+ backgroundColor?: string;
+ borderRadius?: string;
+ inline?: boolean;
}
```

### Passo 3: Estender StatsCard

```diff
export interface StatsCardProps {
  title: string;
  value: string | number;
  trend?: TrendData;
  icon?: React.ReactNode;
+ width?: string;
+ padding?: string;
+ backgroundColor?: string;
+ boxShadow?: string;
+ progressBars?: Array<{
+   label: string;
+   value: number;
+   color?: string;
+   height?: string;
+ }>;
}
```

### Passo 4: Estender Button, DataTable, etc (mesmo padrão)

---

## 📈 Impacto Esperado

### ANTES (hoje)
```
"DS não consegue fazer layouts específicos"
         ↓
Forçado usar Tailwind puro
         ↓
Cada painel é custom (não reutilizável)
         ↓
Sem sincronização Figma ↔ DS
```

### DEPOIS (após estender)
```
"DS consegue fazer tudo"
         ↓
Usa-se DS para tudo (com props customizadas)
         ↓
Cada painel usa DS + tokens
         ↓
Sincronização automática Figma ↔ DS
```

---

## 🛠️ Implementação

### Timeline
| Tarefa | Duração | Dependência |
|--------|---------|------------|
| Estender Card | 2h | - |
| Estender Progress | 2h | - |
| Estender StatsCard | 2h | - |
| Estender Button | 1h | - |
| Estender DataTable | 2h | - |
| Atualizar CSS dos componentes | 3h | Acima |
| Criar stories em Storybook | 2h | Acima |
| Testar em Gestor de Redes | 1h | Acima |
| **Total** | **~15h** | **1-2 dias** |

### Checklist por Componente

**Para CADA componente:**
- [ ] Adicionar props string customizáveis (width, height, backgroundColor, etc)
- [ ] Implementar em CSS/module.css
- [ ] Atualizar TypeScript interfaces
- [ ] Criar story com exemplo customizado
- [ ] Testar em Gestor de Redes (ou painel específico)
- [ ] Adicionar JSDoc com exemplos

---

## 📝 Exemplo Prático: Progress Component

### ANTES
```tsx
// Não funciona com 12px!
<Progress value={92} size="md" />
```

### DEPOIS
```tsx
// Funciona com qualquer altura!
<Progress 
  value={92} 
  size="md"
  height="12px"              // ← NOVA PROP
  customColor="#28C76F"      // ← NOVA PROP (sobrescreve token)
/>
```

---

## ✅ Conclusão

**Você estava CERTO!**

> "nosso ds não foi criado com os tokens do figma do template vuex? independente da tela, do figma, ele tem que contemplar todos os componentes pois em tese já temos eles criado no storybook"

**A verdade é:**
- ✅ DS foi criado
- ✅ Componentes existem no Storybook
- ❌ **MAS** faltam props para customização real
- ❌ **MAS** componentes são muito genéricos

**A solução NÃO é criar novos componentes. É ESTENDER os existentes com props de customização.**

Depois disso, qualquer painel do Figma vai rodar com DS! 🚀

