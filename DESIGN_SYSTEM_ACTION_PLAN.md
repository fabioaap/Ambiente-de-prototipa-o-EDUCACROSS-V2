# 🚀 Plano de Ação: Sincronizar Design System com Figma

## 📌 Status Atual

**Problema:** Design system não consegue recriar designs Figma pixel-perfect

**Causa Raiz:** 5 gap principais entre Design System e Figma:
1. Cores diferentes (success #22c55e vs #28C76F)
2. Layouts assimétricos (4-col uniform vs 349px + 2x2)
3. Tipografia (System font vs Montserrat específica)
4. Componentes inline (Progress separado vs inline na célula)
5. Espaçamento (8px grid vs 6px, 10px, 256px customizados)

**Solução Implementada:** Abordagem Híbrida
- ✅ Padrões simples → Design System
- ✅ Designs customizados → Tailwind Puro
- 🔄 Componentes reutilizáveis → Estender Design System

---

## 📋 FASE 1: Alinhamento de Cores (1-2 dias)

### 1.1 Auditoria de Cores Figma

```bash
# Passo 1: Exportar cores do Figma
# Ir para: https://www.figma.com/design/5MQ9H24Zojzd8jcnHO61lK/
# Seção: Design Tokens ou Color Palette
# Documentar todas as cores e seus usos
```

**Documentação:**
```json
// Criar arquivo: docs/figma-colors-audit.json
{
  "colors": {
    "primary": {
      "figma": "#7367F0",
      "designSystem": "#7367f0",
      "status": "✅ MATCH"
    },
    "success": {
      "figma": "#28C76F",
      "designSystem": "#22c55e",
      "status": "❌ MISMATCH (3.8% diferença)"
    },
    "warning": {
      "figma": "#FFB443",
      "designSystem": "#f59e0b",
      "status": "❌ MISMATCH (6.2% diferença)"
    },
    "error": {
      "figma": "#EA5455",
      "designSystem": "#ef4444",
      "status": "❌ MISMATCH (2.1% diferença)"
    }
  }
}
```

### 1.2 Atualizar Tokens

```bash
# Passo 2: Atualizar packages/tokens/src/tokens.json
cd packages/tokens/

# Backup
cp src/tokens.json src/tokens.json.backup

# Editar cores em tokens.json
nano src/tokens.json
```

**Mudanças:**
```json
{
  "colors": {
    "success": {
      "50": "#f0fdf5",
      "100": "#dcfce8",
      ...
      "500": "#28C76F",  // ← ALTERADO (antes #22c55e)
      ...
    },
    "warning": {
      "50": "#fffbeb",
      ...
      "500": "#FFB443",  // ← ALTERADO (antes #f59e0b)
      ...
    },
    "error": {
      "50": "#fef2f2",
      ...
      "500": "#EA5455",  // ← ALTERADO (antes #ef4444)
      ...
    }
  }
}
```

### 1.3 Build e Validação

```bash
# Passo 3: Rebuild tokens
pnpm build:tokens

# Output esperado:
# ✓ Tokens compilados com sucesso
# ✓ dist/tokens.css atualizado
# ✓ Type definitions geradas

# Passo 4: Verificar Storybook
pnpm dev:hub

# Ir para: http://localhost:6006
# Verificar componentes com cores atualizadas
```

### 1.4 Review & Commit

```bash
# Passo 5: Revisar mudanças
git diff packages/tokens/src/tokens.json

# Passo 6: Commit
git add packages/tokens/
git commit -m "feat(tokens): align success/warning/error colors with Figma"

# Passo 7: PR
gh pr create --title "Align token colors with Figma design" \
  --body "Updates success (#28C76F), warning (#FFB443), error (#EA5455) colors"
```

---

## 📏 FASE 2: Suporte para Componentes Customizados (3-5 dias)

### 2.1 Estender StatsCard

**Arquivo:** `packages/design-system/src/components/StatsCard/StatsCard.tsx`

```tsx
// ANTES
export interface StatsCardProps {
  title: string;
  value: string | number;
  trend?: TrendData;
  icon?: React.ReactNode;
}

// DEPOIS
export interface StatsCardProps {
  title: string;
  value: string | number;
  trend?: TrendData;
  icon?: React.ReactNode;
  
  // ← NOVAS PROPS
  width?: string;              // ex: "349px"
  layout?: 'vertical' | 'horizontal';
  cardPadding?: string;         // ex: "24px"
  customColors?: {
    background?: string;
    text?: string;
    accent?: string;
  };
  progressHeight?: string;      // ex: "12px"
  progressBar?: {
    label: string;
    value: number;
    color?: string;
  }[];
  shadow?: string;              // ex: "0px 4px 24px rgba(0,0,0,0.06)"
}
```

**Implementação:**
```tsx
export const StatsCard = React.forwardRef<HTMLDivElement, StatsCardProps>(
  (
    {
      title,
      value,
      trend,
      icon,
      
      // ← NOVAS PROPS
      width = 'auto',
      layout = 'vertical',
      cardPadding = 'var(--spacing-4)',
      customColors = {},
      progressHeight = '4px',
      progressBar = [],
      shadow = 'var(--shadows-md)',
      
      className = '',
      ...rest
    },
    ref
  ) => {
    const style = {
      width,
      padding: cardPadding,
      boxShadow: shadow,
      ...rest.style
    };

    return (
      <div ref={ref} style={style} className={classNames}>
        {/* Renderização com props customizadas */}
        {progressBar.map((bar) => (
          <div key={bar.label}>
            <div style={{ height: progressHeight }} />
          </div>
        ))}
      </div>
    );
  }
);
```

### 2.2 Criar InlineProgressCell

**Arquivo:** `packages/design-system/src/components/InlineProgressCell/InlineProgressCell.tsx`

```tsx
import React from 'react';
import './InlineProgressCell.module.css';

export interface InlineProgressCellProps {
  total: number;
  percentage: number;
  unit?: string;
  color?: 'success' | 'warning' | 'error';
  barHeight?: string;
  showTotal?: boolean;
  showPercentage?: boolean;
}

export const InlineProgressCell = React.forwardRef<
  HTMLDivElement,
  InlineProgressCellProps
>(
  (
    {
      total,
      percentage,
      unit = '',
      color = 'success',
      barHeight = '4px',
      showTotal = true,
      showPercentage = true,
      className = '',
    },
    ref
  ) => {
    // Renderização...
  }
);
```

### 2.3 Adicionar Exports

**Arquivo:** `packages/design-system/src/index.ts`

```tsx
// Adicionar no final
export { StatsCard } from './components/StatsCard/StatsCard';
export { InlineProgressCell } from './components/InlineProgressCell/InlineProgressCell';

export type { StatsCardProps } from './components/StatsCard/StatsCard';
export type { InlineProgressCellProps } from './components/InlineProgressCell/InlineProgressCell';
```

### 2.4 Criar Stories

**Arquivo:** `domains/storybook/src/stories/Components/StatsCardExtended.stories.tsx`

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { StatsCard } from '@prototipo/design-system';

const meta: Meta<typeof StatsCard> = {
  title: 'Components/StatsCard/Extended',
  component: StatsCard,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const WithCustomWidth: Story = {
  args: {
    title: 'Alunos',
    value: 2480,
    width: '349px',
    cardPadding: '24px',
    shadow: '0px 4px 24px rgba(0,0,0,0.06)',
    progressBar: [
      { label: 'Ativos', value: 92, color: '#28C76F' },
      { label: 'Inativos', value: 8, color: '#EA5455' }
    ],
    progressHeight: '12px'
  }
};

export const InlineProgressExample: Story = {
  args: {
    title: 'Professores',
    value: 32,
    progressBar: [
      { label: 'Ativos', value: 88, color: '#28C76F' }
    ]
  }
};
```

### 2.5 Build & Test

```bash
# Build design system
pnpm build:design-system

# Build storybook
pnpm build:hub

# Test
pnpm test --filter=@prototipo/design-system

# Commit
git add packages/design-system/ domains/storybook/
git commit -m "feat(design-system): add customizable StatsCard and InlineProgressCell"
```

---

## 📑 FASE 3: Criar Componentes Compostos (2-3 dias)

### 3.1 KPIGridAsymmetric

**Arquivo:** `packages/design-system/src/components/KPIGrid/KPIGridAsymmetric.tsx`

```tsx
import React from 'react';
import styles from './KPIGridAsymmetric.module.css';

export interface KPIGridAsymmetricProps {
  largeCard: React.ReactNode;
  smallCards: React.ReactNode[];
  gap?: string;
  largeCardWidth?: string;
  className?: string;
}

export const KPIGridAsymmetric = React.forwardRef<
  HTMLDivElement,
  KPIGridAsymmetricProps
>(
  (
    {
      largeCard,
      smallCards,
      gap = '10px',
      largeCardWidth = '349px',
      className = ''
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={styles.gridContainer}
        style={{
          gridTemplateColumns: `${largeCardWidth} 1fr`,
          gap
        }}
      >
        <div>{largeCard}</div>

        <div className={styles.smallCardsGrid}>
          {smallCards.slice(0, 2).map((card, idx) => (
            <div key={idx}>{card}</div>
          ))}
          <div className={styles.spanTwo}>
            {smallCards[2]}
          </div>
        </div>
      </div>
    );
  }
);
```

**CSS:**
```css
/* KPIGridAsymmetric.module.css */
.gridContainer {
  display: grid;
  align-items: start;
}

.smallCardsGrid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: inherit;
}

.spanTwo {
  grid-column: 1 / -1;
}
```

### 3.2 Integrar em Gestor de Redes

**Arquivo:** `domains/admin/src/app/gestor-redes/page.tsx`

```tsx
// Antes: Tailwind puro
<div className="grid gap-[10px] mb-6" style={{ gridTemplateColumns: '349px 1fr' }}>
  {/* ... */}
</div>

// Depois: Usar componente
import { KPIGridAsymmetric } from '@prototipo/design-system';

<KPIGridAsymmetric
  largeCard={<AlunosCard />}
  smallCards={[
    <ProfessoresCard />,
    <GestoresCard />,
    <AuxiliaresCard />
  ]}
/>
```

---

## 🔄 FASE 4: Sincronização Contínua (Ongoing)

### 4.1 Processo de Review

**Checklist para novos painéis:**

```markdown
## Novo Painel - Design System Alignment

- [ ] **Cores**: Todas as cores estão em `packages/tokens/tokens.json`?
- [ ] **Tipografia**: Font principal é Montserrat?
- [ ] **Layout**: É uniforme (4-col grid) ou assimétrico?
- [ ] **Componentes**: Podem ser construídos com design-system?
- [ ] **Customizações**: Precisam de novas props em componentes?

### Se necessário customizar:
- [ ] Props adicionadas a componentes
- [ ] Stories criadas em Storybook
- [ ] Tipos TypeScript atualizados
- [ ] README.md em `packages/design-system/` documentado
- [ ] Build passou: `pnpm build:design-system`

### Se Tailwind puro necessário:
- [ ] Documentado em `domains/admin/DESIGN_PATTERNS.md` por quê
- [ ] Link para Figma em comentários no código
- [ ] Revisão arquitetônica feita
```

### 4.2 Manutenção Contínua

```bash
# Script mensal
#!/bin/bash
# scripts/sync-design-system.sh

echo "🔄 Sincronizando Design System..."

# 1. Verificar se há PRs abertas
echo "Verificando PRs abertas..."
gh pr list --state=open --label="design-system"

# 2. Verificar testes
echo "Rodando testes..."
pnpm test --filter=@prototipo/design-system

# 3. Build storybook
echo "Build Storybook..."
pnpm build:hub

# 4. Report
echo "✅ Sincronização completa!"
```

---

## 📊 FASE 5: Documentação & Treinamento (1-2 dias)

### 5.1 Guia de Uso

**Arquivo:** `DESIGN_SYSTEM_USAGE_GUIDE.md`

```markdown
# Design System - Guia de Uso

## Quando usar cada abordagem

### ✅ Design System
- Painéis genéricos (dashboard, list, form)
- Componentes reutilizáveis
- Layout padrão (4-col grid)
- Cores do sistema

### ⚠️ Design System + Custom Props
- Layouts específicos (349px + 2x2)
- Componentes inline customizados
- Cores específicas do projeto
- → Use props novas em StatsCard, InlineProgressCell

### ❌ Tailwind Puro
- Só se design muito diferente do sistema
- Documentar razão no PR
- Revisar arquitetura antes

## Exemplos

### Exemplo 1: Dashboard Genérico
\`\`\`tsx
import { StatsCard, Card, Table } from '@prototipo/design-system';

export function DashboardPage() {
  return (
    <div className="space-y-6">
      <section className="grid grid-cols-4 gap-4">
        <StatsCard title="Total" value={1234} />
        {/* ... */}
      </section>
    </div>
  );
}
\`\`\`

### Exemplo 2: Design Customizado
\`\`\`tsx
import { KPIGridAsymmetric, StatsCard } from '@prototipo/design-system';

export function GestorRedesPage() {
  return (
    <KPIGridAsymmetric
      largeCard={<StatsCard width="349px" progressHeight="12px" />}
      smallCards={[...]}
    />
  );
}
\`\`\`
```

### 5.2 Template para PR

```markdown
# PR Template - Design System Changes

## Tipo
- [ ] Nova feature
- [ ] Bug fix
- [ ] Refactor
- [ ] Alinhamento com Figma

## Impacto
- Componentes afetados: [lista]
- Propriedades alteradas: [sim/não]
- Compatibilidade reversa: [sim/não]

## Verificação
- [ ] Testes passam: `pnpm test`
- [ ] Build passa: `pnpm build`
- [ ] Storybook atualizado
- [ ] Tipos TypeScript corretos
- [ ] Documentação atualizada

## Screenshots (se visual)
[Adicionar prints]
```

---

## 🎯 Timeline Total

| Fase | Duração | Início | Fim |
|------|---------|--------|-----|
| **1. Alinhamento de Cores** | 1-2 dias | Semana 1 | Semana 1 |
| **2. Componentes Customizados** | 3-5 dias | Semana 1 | Semana 2 |
| **3. Componentes Compostos** | 2-3 dias | Semana 2 | Semana 2 |
| **4. Sincronização Contínua** | Ongoing | Semana 3 | ∞ |
| **5. Documentação** | 1-2 dias | Semana 3 | Semana 3 |

**Total: 1-2 semanas para alinhamento completo**

---

## 🔗 Próximos Passos

### Imediato
- [ ] Criar issue em GitHub: "Align Design System with Figma"
- [ ] Assignar este documento ao seu PM/Tech Lead
- [ ] Discutir timeline com equipe

### Curto Prazo (Próxima Sprint)
- [ ] Começar FASE 1 (Cores)
- [ ] Revisar FASE 2 (Props customizáveis)

### Médio Prazo
- [ ] Implementar FASE 3 (Componentes compostos)
- [ ] Documentar padrões em DESIGN_PATTERNS.md

### Longo Prazo
- [ ] Implementar sincronização automática Figma → Design System
- [ ] Setup CI/CD para validar alinhamento

---

## 📞 Suporte

Se tiver dúvidas:
1. Verificar `DESIGN_SYSTEM_GAPS_ANALYSIS.md`
2. Verificar `DESIGN_SYSTEM_IMPLEMENTATION_GUIDE.md`
3. Abrir issue em GitHub
4. Contactar time de design

