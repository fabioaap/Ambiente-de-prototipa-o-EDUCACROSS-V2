# @prototipo/design-system

Biblioteca de componentes React para o sistema de prototipação EDUCACROSS.

## Componentes

### Button
Botão reutilizável com múltiplas variantes e tamanhos.

```tsx
import { Button } from '@prototipo/design-system';

<Button variant="primary" size="md">
  Clique aqui
</Button>
```

### Text
Componente de tipografia com controle completo de estilo.

```tsx
import { Text } from '@prototipo/design-system';

<Text as="h1" size="3xl" weight="bold" color="primary">
  Título Principal
</Text>
```

### Card
Container com estilização consistente.

```tsx
import { Card } from '@prototipo/design-system';

<Card variant="elevated" padding="md">
  Conteúdo do card
</Card>
```

### Layout
Container de página com configurações responsivas.

```tsx
import { Layout } from '@prototipo/design-system';

<Layout maxWidth="xl" centered>
  Conteúdo da página
</Layout>
```

## Scripts

- `pnpm build` - Compila a biblioteca
- `pnpm dev` - Modo watch para desenvolvimento
- `pnpm lint` - Executa o linter
- `pnpm type-check` - Verifica tipos TypeScript
