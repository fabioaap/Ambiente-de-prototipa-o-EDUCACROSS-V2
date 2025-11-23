# HealthIndicator

Componente para exibir indicadores de saúde do repositório, incluindo build status, lint, tamanho do bundle e dependências desatualizadas.

## Uso

```tsx
import { HealthIndicator } from '@prototipo/design-system';

function Dashboard() {
  return (
    <HealthIndicator
      title="Saúde do Repositório"
      metrics={[
        {
          label: "Build Status",
          status: "success",
          value: "Passou",
          description: "Última build concluída com sucesso",
          href: "https://github.com/user/repo/actions",
          lastUpdated: "5 minutos atrás"
        },
        {
          label: "Lint Status",
          status: "success",
          value: "0 warnings",
          description: "Nenhum warning crítico encontrado"
        }
      ]}
    />
  );
}
```

## Props

### `HealthIndicatorProps`

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `title` | `string` | `"Indicadores de Saúde"` | Título do indicador de saúde |
| `metrics` | `HealthMetric[]` | - | Lista de métricas a serem exibidas (obrigatório) |
| `variant` | `"compact" \| "detailed"` | `"detailed"` | Variante de layout |
| `showTimestamps` | `boolean` | `true` | Se verdadeiro, mostra timestamps |

### `HealthMetric`

| Prop | Tipo | Descrição |
|------|------|-----------|
| `label` | `string` | Nome da métrica |
| `status` | `HealthStatus` | Status da métrica: `"success"`, `"warning"`, `"error"` ou `"loading"` |
| `value` | `string \| number` | Valor a ser exibido |
| `description` | `string` (opcional) | Descrição adicional ou tooltip |
| `href` | `string` (opcional) | Link para mais detalhes (GitHub Actions, npm, etc) |
| `lastUpdated` | `string` (opcional) | Timestamp da última atualização |

## Variantes

### Detailed (Padrão)
Layout completo com descrições e timestamps.

```tsx
<HealthIndicator
  variant="detailed"
  showTimestamps={true}
  metrics={[...]}
/>
```

### Compact
Layout compacto para dashboards menores.

```tsx
<HealthIndicator
  variant="compact"
  showTimestamps={false}
  metrics={[...]}
/>
```

## Status Visuais

- **success** ✓ - Verde: Tudo funcionando
- **warning** ⚠ - Amarelo: Atenção necessária
- **error** ✗ - Vermelho: Falhas críticas
- **loading** ⟳ - Cinza com animação: Verificando

## Responsividade

O componente se adapta automaticamente ao tamanho da tela:

- **Mobile** (< 640px): 1 coluna
- **Tablet** (641px - 1024px): 2 colunas
- **Desktop** (> 1025px): 3+ colunas adaptativas

## Acessibilidade

- ✅ Contraste WCAG AA (4.5:1 para texto)
- ✅ Focus visível em elementos interativos
- ✅ Suporte a `prefers-reduced-motion`
- ✅ Suporte a `prefers-contrast: high`
- ✅ ARIA labels e roles apropriados
- ✅ Links externos com `rel="noopener noreferrer"`

## Exemplos no Storybook

Veja os exemplos completos no Storybook:

- **Default**: Exemplo padrão com todas as métricas
- **With Errors**: Exemplo com problemas detectados
- **Loading**: Métricas carregando
- **Compact Variant**: Layout compacto
- **Without Timestamps**: Visual mais limpo sem timestamps
- **Real World Example**: Dashboard completo do EDUCACROSS
- **All Success**: Todos os indicadores em sucesso
- **Mobile View**: Visualização mobile

## Integração com APIs

```tsx
// Exemplo com GitHub Actions API
const [metrics, setMetrics] = useState<HealthMetric[]>([]);

useEffect(() => {
  async function fetchHealthMetrics() {
    // Buscar status do GitHub Actions
    const actionsResponse = await fetch(
      'https://api.github.com/repos/user/repo/actions/runs?per_page=1'
    );
    const actionsData = await actionsResponse.json();
    
    setMetrics([
      {
        label: "Build Status",
        status: actionsData.workflow_runs[0].conclusion === 'success' ? 'success' : 'error',
        value: actionsData.workflow_runs[0].conclusion,
        href: actionsData.workflow_runs[0].html_url,
        lastUpdated: new Date(actionsData.workflow_runs[0].updated_at).toLocaleString()
      }
      // ... outras métricas
    ]);
  }
  
  fetchHealthMetrics();
}, []);

return <HealthIndicator metrics={metrics} />;
```

## Casos de Uso

### Dashboard de CI/CD
- Status de GitHub Actions
- Status de builds (Vercel, Netlify, etc)
- Status de testes automatizados

### Qualidade de Código
- Lint status (ESLint)
- Type checking (TypeScript)
- Cobertura de testes
- Code smells (SonarQube)

### Performance
- Tamanho de bundles
- Lighthouse scores
- Web Vitals (LCP, FID, CLS)

### Dependências
- Dependências desatualizadas
- Vulnerabilidades de segurança
- Licenças incompatíveis

## Customização com Tokens

O componente usa design tokens para cores e espaçamentos:

```css
/* Tokens de cores usados */
--color-success-*
--color-warning-*
--color-error-*
--color-neutral-*

/* Tokens de espaçamento */
--space-xs
--space-sm
--space-md
--space-lg

/* Tokens de tipografia */
--font-size-xs
--font-size-sm
--font-size-base
--font-size-lg
--font-weight-medium
--font-weight-bold

/* Tokens de border radius */
--radius-md
--radius-lg
--radius-full
```

## Notas Técnicas

- Componente implementa `forwardRef` para acesso ao DOM
- Status de loading tem animação que respeita `prefers-reduced-motion`
- Links externos sempre abrem em nova aba com segurança
- Grid responsivo usa `auto-fit` e `minmax` para adaptação automática
- Timestamps são opcionais e podem ser formatados externamente
