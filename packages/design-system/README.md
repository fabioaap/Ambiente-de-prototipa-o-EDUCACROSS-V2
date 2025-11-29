# @prototipo/design-system

Biblioteca de componentes React para o sistema de prototipação EDUCACROSS.

## Política de Uso

- Componentes deste pacote são a **única** fonte autorizada para docs, domains e demais apps fora de `domains/studio/src/app/(dashboard|studio)`.
- Shadcn UI (`@/components/ui/*`) permanece restrito às rotas do Studio e do Dashboard para permitir experimentação sem comprometer jornadas documentadas.
- Se precisar de uma variação que hoje só existe no shadcn, abra PR adicionando o componente aqui antes de usá-lo em `domains/**` ou Storybook.

## Componentes

### Button
Botão reutilizável com múltiplas variantes e tamanhos.

```tsx
import { Button } from '@prototipo/design-system';

<Button variant="primary" size="md">
  Clique aqui
</Button>

// Para botões apenas com ícones, sempre use aria-label
<Button variant="primary" aria-label="Fechar">
  <IconClose />
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

// Para seções importantes, use role="region" e aria-label
<Card role="region" aria-label="Resumo do pedido">
  Conteúdo importante
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

### Componentes de Formulário

Todos os componentes de formulário (Input, Select, Checkbox, Radio, Switch) incluem suporte completo a acessibilidade:

- Labels associados corretamente
- Estados de erro com `role="alert"`
- Atributos ARIA apropriados (`aria-invalid`, `aria-describedby`, `aria-required`)
- Navegação por teclado
- Foco visível com `:focus-visible`

```tsx
import { Input } from '@prototipo/design-system';

<Input
  label="Email"
  type="email"
  required
  helperText="Digite seu email principal"
  error={hasError}
  errorText="Email inválido"
/>
```

## Acessibilidade

Todos os componentes seguem as diretrizes WCAG 2.1 AA e incluem:

- **Foco Visível**: Indicadores claros de foco usando `:focus-visible`
- **Navegação por Teclado**: Suporte completo para Tab, Enter, Space e teclas de seta
- **ARIA Attributes**: Roles e atributos apropriados para cada tipo de componente
- **Contraste de Cores**: Mínimo 4.5:1 para texto normal, 3:1 para componentes
- **Mensagens de Erro**: Anunciadas automaticamente com `role="alert"`

Para mais detalhes, consulte a [documentação de acessibilidade no Storybook](../../domains/storybook/src/stories/Accessibility.mdx).

### Checklist de Acessibilidade

Ao usar os componentes:

- ✅ Use elementos semânticos nativos sempre que possível
- ✅ Forneça `aria-label` para botões apenas com ícones
- ✅ Associe labels com campos de formulário
- ✅ Use `role="region"` e `aria-label` para seções importantes
- ✅ Teste navegação por teclado (Tab, Enter, Space)
- ✅ Verifique contraste de cores em todos os estados
- ✅ Anuncie mudanças de estado importantes

## Scripts

- `pnpm build` - Compila a biblioteca
- `pnpm dev` - Modo watch para desenvolvimento
- `pnpm lint` - Executa o linter
- `pnpm type-check` - Verifica tipos TypeScript
