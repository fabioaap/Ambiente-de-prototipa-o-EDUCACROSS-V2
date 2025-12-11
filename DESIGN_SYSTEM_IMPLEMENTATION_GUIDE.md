# 🔧 Estratégia para Recriar Designs Figma com Design System

## 📌 Resumo Executivo

O design system foi criado com **componentes genéricos**, mas o Figma contém **designs específicos e customizados**. A solução ideal é:

1. **Para painéis únicos** → Use Tailwind puro (como você fez em `gestor-redes`)
2. **Para componentes reutilizáveis** → Estenda o design system
3. **Para sincronização futura** → Mantenha Figma + Design System alinhados

---

## ✅ Padrão Recomendado: Abordagem Híbrida

### Quando Usar Design System
```tsx
// ✅ USO CORRETO
// Para componentes genéricos, reutilizáveis
import { Button, Text, Card, Progress } from '@prototipo/design-system';

function GenericDashboard() {
  return (
    <div className="grid grid-cols-4 gap-4">
      <Card>
        <Text>Label</Text>
        <StatsCard value={123} />
      </Card>
    </div>
  );
}
```

### Quando Usar Tailwind Puro
```tsx
// ✅ USO CORRETO
// Para layouts customizados, pixel-perfect, designs únicos
function GestorRedesDashboard() {
  return (
    <div style={{ gridTemplateColumns: '349px 1fr' }} className="grid gap-[10px]">
      <Card className="bg-white rounded-md p-6 shadow-[0px_4px_24px_rgba(0,0,0,0.06)]">
        {/* Layout assimétrico do Figma */}
      </Card>
    </div>
  );
}
```

---

## 🎨 Problema 1: Cores Diferentes

### Diagnóstico
```
Design System Usa:    Figma Exige:         Delta:
#22c55e (Success)  →  #28C76F (Success)   🔴 Verde mais vibrante
#f59e0b (Warning)  →  #FFB443 (Warning)   🔴 Laranja mais saturada  
#ef4444 (Error)    →  #EA5455 (Error)     🔴 Vermelho mais rosado
```

### Solução 1A: Atualizar Tokens (Recomendado)
```json
// packages/tokens/src/tokens.json
{
  "colors": {
    "success": {
      "500": "#28C76F"  // ← Atualizar (antes era #22c55e)
    },
    "warning": {
      "500": "#FFB443"  // ← Atualizar (antes era #f59e0b)
    },
    "error": {
      "500": "#EA5455"  // ← Atualizar (antes era #ef4444)
    }
  }
}
```

**Depois executar:**
```bash
pnpm build:tokens
```

**Impacto:**
- ✅ Todos os componentes herdam cores corretas
- ✅ Sincronizado globalmente
- ⚠️ Pode quebrar painéis existentes (review necessária)

### Solução 1B: Override Local com Tailwind (Rápido)
```tsx
// Na sua página/componente
const customColors = {
  success: '#28C76F',
  warning: '#FFB443',
  error: '#EA5455'
};

// Use diretamente em Tailwind
<div className="bg-[#28C76F] text-white" />
```

**Impacto:**
- ✅ Rápido, sem quebrar nada
- ❌ Não atualiza componentes do design system
- ❌ Não reutilizável

---

## 📐 Problema 2: Layouts Assimétricos

### Diagnóstico
```
Design System:   Figma:
┌─────┬─────┬─────┬─────┐      ┌─────────┬─────────┐
│ 25% │ 25% │ 25% │ 25% │      │         │ 50% │50%│
│     │     │     │     │  →   │  349px  ├─────┴───┤
│     │     │     │     │      │         │ 50% │50%│
└─────┴─────┴─────┴─────┘      │         │ 50% │50%│
                               └─────────┴───────┘
```

### Solução 2: Criar Layout Wrapper
```tsx
// domains/admin/src/components/KPIGridAsymmetric.tsx
import React from 'react';

interface KPIGridAsymmetricProps {
  largeCard: React.ReactNode;  // Card maior (349px)
  smallCards: React.ReactNode[]; // Cards menores (2x2 + span-2)
}

export const KPIGridAsymmetric: React.FC<KPIGridAsymmetricProps> = ({
  largeCard,
  smallCards
}) => {
  return (
    <div 
      className="grid gap-[10px]"
      style={{ gridTemplateColumns: '349px 1fr' }}
    >
      {/* Card Grande */}
      <div>{largeCard}</div>

      {/* Grid 2x2 + 1 span-2 */}
      <div className="grid grid-cols-2 gap-[10px]">
        {smallCards.slice(0, 2).map((card, idx) => (
          <div key={idx}>{card}</div>
        ))}
        <div className="col-span-2">{smallCards[2]}</div>
      </div>
    </div>
  );
};
```

**Uso:**
```tsx
<KPIGridAsymmetric
  largeCard={<StatsCard title="Alunos" value={2480} />}
  smallCards={[
    <StatsCard title="Professores" value={120} />,
    <StatsCard title="Gestores" value={30} />,
    <StatsCard title="Auxiliares" value={50} />
  ]}
/>
```

---

## 🎯 Problema 3: Tipografia Montserrat

### Diagnóstico
```
Design System:                    Figma:
font-bold (1.2x peso)      →      font-['Montserrat:Bold']
font-medium (0.9x peso)    →      font-['Montserrat:Medium']
(System font default)      →      font-['Montserrat:ExtraBold']
```

### Solução 3A: Atualizar Tailwind Config (Recomendado)
```js
// tailwind.config.ts
export default {
  theme: {
    fontFamily: {
      sans: ['Montserrat', 'sans-serif'],
      // Manter Montserrat para todo o projeto
    }
  }
}
```

**E importar a fonte:**
```css
/* globals.css */
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap');

* {
  font-family: 'Montserrat', sans-serif;
}
```

### Solução 3B: Usar Tailwind Arbitrary (Local)
```tsx
<div className="font-['Montserrat',sans-serif] font-extrabold text-3xl">
  Alunos
</div>
```

---

## 📊 Problema 4: Progress Bars Inline

### Diagnóstico
```
Design System:        Figma:
<Progress />          [Total] [████50%████] [50%]
Componente à parte    Tudo inline na célula
```

### Solução 4: Componente Progress Customizado
```tsx
// domains/admin/src/components/InlineProgress.tsx
import React from 'react';

interface InlineProgressProps {
  total: number;
  percentage: number;
  color?: 'success' | 'warning' | 'error';
  height?: string;
}

export const InlineProgress: React.FC<InlineProgressProps> = ({
  total,
  percentage,
  color = 'success',
  height = '12px'
}) => {
  const colorClasses = {
    success: 'bg-[#28C76F]',
    warning: 'bg-[#FFB443]',
    error: 'bg-[#EA5455]'
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-[#6e6b7b] w-8">{total}</span>
      
      <div className="flex-1 bg-[#eae8fd] rounded-full" style={{ height }}>
        <div
          className={`${colorClasses[color]} rounded-full transition-all`}
          style={{ 
            width: `${percentage}%`,
            height: height
          }}
        />
      </div>

      <span className="font-semibold text-sm text-[#5e5873] w-10">
        {percentage}%
      </span>
    </div>
  );
};
```

**Uso:**
```tsx
<table>
  <tbody>
    <tr>
      <td>Escola XYZ</td>
      <td>
        <InlineProgress total={450} percentage={92} color="success" />
      </td>
    </tr>
  </tbody>
</table>
```

---

## 🔄 Problema 5: Sincronização com Design System

### Checklist para Novos Painéis

#### Antes de começar:
```bash
# 1. Verificar cores do Figma
echo "Abrir: packages/tokens/src/tokens.json"
echo "Comparar com cores do Figma"

# 2. Verificar fonte
echo "Figma usa Montserrat? SIM/NÃO"

# 3. Verificar layout
echo "Layout assimétrico? SIM/NÃO"
```

#### Se for usar design system:
```tsx
// ✅ Documentar em Storybook
// ✅ Usar componentes conforme API
// ✅ Se precisar customizar:
//    - Props novas → Atualizar componente
//    - Cores → Atualizar tokens
//    - Fonte → Atualizar tailwind.config.ts

import { StatsCard, Progress, Card } from '@prototipo/design-system';
```

#### Se for usar Tailwind puro:
```tsx
// ⚠️ Documentar razão em README
// ✅ Usar classes Tailwind diretas
// ✅ Incluir comentário com link do Figma

/**
 * Gestor de Redes Dashboard
 * Design: https://www.figma.com/design/5MQ9H24Zojzd8jcnHO61lK/...?node-id=6482-6149
 * 
 * Razão para Tailwind Puro:
 * - Layout assimétrico (349px + 2x2 grid)
 * - Cores customizadas não alinhadas com tokens
 * - Progress inline nas células
 * - Pixel-perfect necessário para especificação
 */

export default function GestorRedesPage() {
  // ...
}
```

---

## 📋 Template: Quando Usar Cada Abordagem

```tsx
// ┌─────────────────────────────────────────────────────────────┐
// │                   DECISION TREE                             │
// └─────────────────────────────────────────────────────────────┘

if (isGenericComponent) {
  // ✅ USE DESIGN SYSTEM
  // - Button, Text, Input
  // - Progress, Badge
  // - Card, Modal
  // → Exemplo: CommonButton no admin
} 
else if (isStandardLayout) {
  // ✅ USE DESIGN SYSTEM + TAILWIND
  // - 4-col grid KPIs
  // - Standard sidebar layout
  // - Table com DataTable
  // → Exemplo: Dashboard básico
}
else if (isAsymmetricLayout || hasCustomColors || needsPixelPerfect) {
  // ✅ USE TAILWIND PURE
  // - Gestor de Redes (349px + 2x2)
  // - Custom color schemes
  // - Specific Figma designs
  // → Exemplo: GestorRedesPage (✅ VOCÊ FEZ CORRETO!)
}
else if (isHighlyReutilizable && needsConsistency) {
  // 🔧 EXTEND DESIGN SYSTEM
  // - Criar novo componente
  // - Atualizar tokens
  // - Documentar em Storybook
}
```

---

## 🚀 Implementação para Próximos Painéis

### Passo 1: Análise do Figma
```markdown
- [ ] Layout é padrão 4-col grid?
- [ ] Cores são padrão (primary, success, warning, error)?
- [ ] Font é Montserrat com pesos padrão?
- [ ] Componentes são reutilizáveis?
- [ ] Sombras/Shadows seguem padrão?
```

### Passo 2: Estratégia
```markdown
- [ ] Se sim a 4+ itens acima → USE DESIGN SYSTEM
- [ ] Se não a 2+ itens acima → USE TAILWIND PURO
- [ ] Se for reutilizável → ESTENDA DESIGN SYSTEM
```

### Passo 3: Implementação
```bash
# Opção A: Design System
pnpm add @prototipo/design-system
# Criar componente em domains/admin/src/app/seu-painel/page.tsx

# Opção B: Tailwind Puro
# Usar Tailwind direto, sem imports de design-system
# Documentar em README.md por quê

# Opção C: Estender Design System
# 1. Criar novo componente em packages/design-system/src/components/
# 2. Atualizar packages/design-system/src/index.ts
# 3. Criar story em domains/storybook/src/stories/
# 4. Atualizar tokens se necessário
# 5. pnpm build:design-system
```

---

## 📚 Documentação para Sua Equipe

**Criar arquivo:** `domains/admin/DESIGN_PATTERNS.md`

```markdown
# Padrões de Design - Admin Dashboard

## 1. Componentes Reutilizáveis
Use `@prototipo/design-system`:
- ✅ Button, Card, Input, Select
- ✅ Progress (padrão 4px)
- ✅ Badge, Chip

## 2. Painéis Únicos (Pixel-Perfect)
Use Tailwind puro:
- Gestor de Redes (layout 349px + 2x2)
- [Adicionar próximos aqui]

### Template:
\`\`\`tsx
/**
 * Painel Customizado
 * Figma: [LINK]
 * Razão: [Layout assimétrico | Cores customizadas | Montserrat | etc]
 */
\`\`\`

## 3. Estender Design System
Se precisa novo componente:
1. Arquivo em `packages/design-system/src/components/`
2. Adicionar export em `packages/design-system/src/index.ts`
3. Story em `domains/storybook/src/stories/`
4. Rodar: `pnpm build:design-system`

## 4. Atualizar Tokens
Se cores estão diferentes:
1. Editar `packages/tokens/src/tokens.json`
2. Rodar: `pnpm build:tokens`
3. Verificar no Storybook
```

---

## ✅ Seu Padrão Está Correto!

```tsx
// gestor-redes/page.tsx
// ✅ BOAS PRÁTICAS SEGUIDAS:

// 1. Tailwind puro para layout assimétrico
<div className="grid gap-[10px]" style={{ gridTemplateColumns: '349px 1fr' }}>

// 2. Cores Figma exatas
className="bg-[#7367F0]"
className="bg-[#28C76F]"  
className="bg-[#FFB443]"
className="bg-[#EA5455]"

// 3. Tipografia customizada
className="font-['Montserrat',sans-serif] font-extrabold"

// 4. Progress inline
<div className="flex items-center gap-3">
  <span>{total}</span>
  <div className="h-[12px]" />  // ← 12px exato
  <span>{percentage}%</span>
</div>

// 5. Documentação clara
// → Figma link nos comentários
// → Estrutura explicada
```

---

## 🎯 Conclusão

| Abordagem | Quando Usar | Exemplo |
|-----------|-----------|---------|
| **Design System** | Layout padrão, cores std | Dashboard básico |
| **Tailwind Puro** | Design único, customizado | Gestor de Redes ✅ |
| **Estender DS** | Componente reutilizável novo | KPIGridAsymmetric |
| **Sincronizar** | Manter Figma + DS alinhados | Atualizar tokens |

Você fez correto em `gestor-redes` usando **Tailwind Puro** para um design tão customizado. Continue com essa abordagem para painéis similares, mas considere estender o design system se precisar componentes reutilizáveis.

