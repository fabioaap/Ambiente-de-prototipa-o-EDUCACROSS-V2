# StatsCard Component - Documentação

## Visão Geral

O componente `StatsCard` é um card especializado para exibir estatísticas e KPIs (Key Performance Indicators) em dashboards. Ele oferece suporte para exibir título, valor principal, tendência (trend), ícone, subtítulo e conteúdo customizado como gráficos.

## Características

### Funcionalidades Principais

- ✅ **Título e Valor**: Exibe informações estatísticas de forma clara e hierárquica
- ✅ **Badge de Tendência**: Mostra direção e percentual de mudança (up/down/neutral)
- ✅ **Ícones Customizáveis**: Suporte para ícones que ajudam na identificação visual
- ✅ **Subtítulo**: Contexto adicional como período ou descrição
- ✅ **Slot Children**: Aceita conteúdo customizado como gráficos e charts
- ✅ **Loading State**: Skeleton animado durante carregamento
- ✅ **Acessibilidade**: Título semântico (h3), aria-labels descritivos

### Mapeamento de Cores para Trends

O componente implementa mapeamento automático de cores baseado na direção da tendência:

| Direção | Cor de Fundo | Cor do Texto | Borda | Uso |
|---------|-------------|--------------|-------|-----|
| `up` | `success-50` | `success-700` | `success-200` | Aumento positivo |
| `down` | `error-50` | `error-700` | `error-200` | Redução negativa |
| `neutral` | `neutral-50` | `neutral-700` | `neutral-200` | Sem mudança |

## API do Componente

### Props

```typescript
interface TrendData {
  /** Valor da tendência (ex: "+12%", "-5%", "15 pontos") */
  value: string;
  /** Direção da tendência */
  direction: 'up' | 'down' | 'neutral';
  /** Label acessível para leitores de tela */
  ariaLabel?: string;
}

interface StatsCardProps {
  /** Título do card (renderizado como h3) */
  title: string;
  /** Valor principal a ser exibido */
  value: string | number;
  /** Dados de tendência opcional */
  trend?: TrendData;
  /** Ícone opcional (componente React ou elemento) */
  icon?: React.ReactNode;
  /** Subtítulo ou descrição adicional */
  subtitle?: string;
  /** Conteúdo customizado (ex: gráficos) */
  children?: React.ReactNode;
  /** Estado de carregamento */
  isLoading?: boolean;
  /** Classes CSS adicionais */
  className?: string;
}
```

## Exemplos de Uso

### Card Simples

```tsx
<StatsCard 
  title="Total de Usuários" 
  value={1234} 
/>
```

### Card com Tendência Positiva

```tsx
<StatsCard
  title="Vendas Mensais"
  value="R$ 45.000"
  trend={{
    value: '+12%',
    direction: 'up',
    ariaLabel: 'Aumento de 12% em relação ao mês anterior',
  }}
/>
```

### Card com Tendência Negativa

```tsx
<StatsCard
  title="Taxa de Rejeição"
  value="24.5%"
  trend={{
    value: '-5.2%',
    direction: 'down',
    ariaLabel: 'Redução de 5.2% em relação ao mês anterior',
  }}
/>
```

### Card com Ícone

```tsx
<StatsCard
  title="Novos Usuários"
  value={456}
  trend={{ value: '+23%', direction: 'up' }}
  icon={<UserIcon />}
/>
```

### Card com Subtítulo

```tsx
<StatsCard
  title="Receita Total"
  value="R$ 128.450"
  subtitle="Últimos 30 dias"
  trend={{ value: '+8.5%', direction: 'up' }}
  icon={<MoneyIcon />}
/>
```

### Card com Gráfico

```tsx
<StatsCard
  title="Visitas"
  value="12,543"
  trend={{ value: '+15%', direction: 'up' }}
  icon={<ChartIcon />}
>
  <MiniChart data={chartData} />
</StatsCard>
```

### Estado de Carregamento

```tsx
<StatsCard
  title="Total de Vendas"
  value="R$ 0"
  isLoading={true}
/>
```

## Layout em Grid (Dashboard)

Para criar um dashboard com múltiplos cards:

```tsx
<div style={{
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '1.5rem',
}}>
  <StatsCard
    title="Total de Usuários"
    value="8,234"
    trend={{ value: '+12%', direction: 'up' }}
    icon={<UserIcon />}
  />
  <StatsCard
    title="Vendas"
    value="R$ 45.280"
    trend={{ value: '+8.5%', direction: 'up' }}
    icon={<SalesIcon />}
  />
  <StatsCard
    title="Taxa de Conversão"
    value="3.2%"
    trend={{ value: '-0.5%', direction: 'down' }}
    icon={<ChartIcon />}
  />
</div>
```

## Acessibilidade

O componente segue as melhores práticas de acessibilidade:

1. **Título Semântico**: O título é renderizado como `<h3>`, proporcionando estrutura semântica adequada
2. **Aria Labels**: Trends incluem `aria-label` descritivo para contexto adicional
3. **Loading States**: Estados de carregamento usam `aria-busy="true"` e `aria-live="polite"`
4. **Ícones Decorativos**: Ícones usam `aria-hidden="true"` quando são apenas visuais

### Exemplo com Acessibilidade Completa

```tsx
<StatsCard
  title="Progresso das Metas"
  value="87%"
  trend={{
    value: '+12 pontos',
    direction: 'up',
    ariaLabel: 'Aumento de 12 pontos percentuais em relação ao trimestre anterior',
  }}
  subtitle="Q3 2024"
  icon={<ChartIcon />}
/>
```

## Estrutura de Estilos

O componente usa CSS Modules para isolamento de estilos e tokens do design system para consistência:

- **Cores**: Usa tokens `--colors-*` para todas as variações de cor
- **Espaçamento**: Usa tokens `--spacing-*` para padding e gaps
- **Tipografia**: Usa tokens `--fontSize-*` e `--fontWeight-*`
- **Bordas**: Usa tokens `--borderRadius-*` para arredondamento

### Skeleton Loading

O estado de carregamento apresenta uma animação shimmer suave:

```css
@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
```

## Responsividade

O componente é totalmente responsivo:

- **Desktop**: Padding de `1.5rem`, valor em `1.875rem` (3xl)
- **Mobile** (≤640px): Padding reduzido para `1rem`, valor em `1.5rem` (2xl)

## Testes e Validação

### Histórias no Storybook

O componente inclui as seguintes histórias para teste e documentação:

1. **Simple**: Card básico com título e valor
2. **WithTrendUp**: Card com tendência positiva
3. **WithTrendDown**: Card com tendência negativa
4. **WithTrendNeutral**: Card com tendência neutra
5. **WithIcon**: Card com ícone
6. **WithSubtitle**: Card com subtítulo
7. **WithChart**: Card com gráfico no slot children
8. **Loading**: Estado de carregamento
9. **LoadingWithChart**: Estado de carregamento com chart
10. **DashboardGrid**: Grid completo de cards
11. **WithCharts**: Múltiplos cards com gráficos
12. **AccessibilityTest**: Teste de recursos de acessibilidade

### Screenshots

Screenshots de validação estão disponíveis em:
- `docs/screenshots/statscard-simple.png`
- `docs/screenshots/statscard-trend-up.png`
- `docs/screenshots/statscard-trend-down.png`
- `docs/screenshots/statscard-with-icon.png`
- `docs/screenshots/statscard-with-chart.png`
- `docs/screenshots/statscard-loading.png`
- `docs/screenshots/statscard-dashboard-grid.png`

## Integração

### Importação

```typescript
import { StatsCard } from '@prototipo/design-system';
import type { StatsCardProps, TrendData } from '@prototipo/design-system';
```

### Build

O componente é compilado e incluído automaticamente no build do design-system:

```bash
pnpm build:design-system
```

## Conformidade com a Sprint 4 - US5

### Checklist de Requisitos

- ✅ **T033**: Arquivo `StatsCard.tsx` criado com componente principal
- ✅ **T034**: Arquivo `StatsCard.module.css` com estilos completos
- ✅ **T035**: Exportação no `index.ts` do design-system
- ✅ **T036**: História completa no Storybook com múltiplos exemplos
- ✅ **T037**: Mapeamento de cores para badges de tendência (up/down/neutral)
- ✅ **T037a**: Skeletons de carregamento com animação shimmer
- ✅ **T037b**: Acessibilidade com h3, aria-label e aria-busy

### Acceptance Criteria

- ✅ **AC5.1**: Componente aceita props de título, valor, trend, ícone e subtítulo
- ✅ **AC5.2**: Slot children funciona para renderização de gráficos customizados
- ✅ **AC5.3**: Estados de loading com skeleton placeholder
- ✅ **AC5.4**: Recursos de acessibilidade implementados (heading semântico, aria-labels)
- ✅ **AC5.5**: Histórias no Storybook com exemplos variados
- ✅ **AC5.6**: Build passa sem erros
- ✅ **AC5.7**: Type-check passa sem erros
- ✅ **AC5.8**: Lint passa sem novos warnings

## Próximos Passos

O componente está pronto para uso em dashboards. Possíveis melhorias futuras:

1. **Temas**: Suporte para variantes de cor (primary, secondary, etc.)
2. **Animações**: Transições ao atualizar valores
3. **Comparação**: Suporte para comparar múltiplos períodos
4. **Tooltips**: Informações adicionais ao hover
5. **Sparklines**: Gráficos inline simplificados integrados

## Referências

- Design System: `/packages/design-system/src/components/StatsCard/`
- Storybook: `/domains/storybook/src/stories/Dashboard/StatsCard.stories.tsx`
- Tokens: `/packages/tokens/src/tokens.json`
- Screenshots: `/docs/screenshots/statscard-*.png`
