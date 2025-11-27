# Testes de Acessibilidade no Storybook

Este documento explica como usar o addon de acessibilidade (a11y) no Storybook para validar componentes.

## O que é o Addon A11y?

O `@storybook/addon-a11y` é uma ferramenta que integra o [axe-core](https://github.com/dequelabs/axe-core) ao Storybook, permitindo detectar automaticamente problemas de acessibilidade nos componentes enquanto você desenvolve.

## Como Usar

### 1. Visualizando Validações no Storybook

Quando você iniciar o Storybook com `pnpm dev:storybook`, todas as stories serão automaticamente analisadas pelo addon a11y.

Para ver os resultados:

1. Inicie o Storybook: `pnpm dev:storybook`
2. Navegue até qualquer story
3. Clique na aba **Accessibility** no painel inferior
4. Visualize as violações, passes e incompletos

### 2. Níveis de Conformidade WCAG

O addon está configurado para validar os seguintes níveis de conformidade:

- **WCAG 2.0 Level A** (wcag2a)
- **WCAG 2.0 Level AA** (wcag2aa)
- **WCAG 2.1 Level AA** (wcag21aa)

### 3. Regras Habilitadas por Padrão

As principais regras validadas incluem:

- **color-contrast**: Verifica se o contraste entre texto e fundo atende aos requisitos WCAG
- **label**: Garante que elementos de formulário tenham labels apropriados
- **button-name**: Verifica se botões têm nomes acessíveis

### 4. Desabilitando Validações em Stories Específicas

Se você precisar desabilitar validações de a11y em uma story específica:

```typescript
export const MyStory: Story = {
  args: {
    // ... suas props
  },
  parameters: {
    a11y: {
      disable: true, // Desabilita todas as validações
    },
  },
};
```

Ou desabilitar apenas regras específicas:

```typescript
export const MyStory: Story = {
  args: {
    // ... suas props
  },
  parameters: {
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: false, // Desabilita apenas contraste de cor
          },
        ],
      },
    },
  },
};
```

### 5. Boas Práticas

Ao desenvolver componentes, certifique-se de:

#### Para Botões
- ✅ Sempre fornecer texto descritivo ou `aria-label`
- ✅ Usar elementos `<button>` nativos quando possível
- ✅ Garantir contraste de cores adequado (mínimo 4.5:1 para texto normal)

#### Para Inputs
- ✅ Associar cada input a um `<label>` com `htmlFor`
- ✅ Fornecer mensagens de erro acessíveis
- ✅ Usar atributos `aria-describedby` para texto de ajuda
- ✅ Indicar campos obrigatórios com `required` e `aria-required`

#### Para Links
- ✅ Texto do link deve ser descritivo (evite "clique aqui")
- ✅ Links devem ter contraste adequado em todos os estados (normal, hover, focus)

#### Para Imagens
- ✅ Sempre fornecer atributo `alt` descritivo
- ✅ Para imagens decorativas, use `alt=""`

## Exemplos de Uso

### Exemplo 1: Button com Acessibilidade

```typescript
export const AccessibleButton: Story = {
  args: {
    children: 'Enviar Formulário',
    variant: 'primary',
    'aria-label': 'Enviar formulário de contato',
  },
};
```

### Exemplo 2: Input com Label

```typescript
export const AccessibleInput: Story = {
  args: {
    label: 'E-mail',
    type: 'email',
    id: 'email-input',
    required: true,
    'aria-required': true,
    'aria-describedby': 'email-helper',
    helperText: 'Digite seu e-mail para contato',
  },
};
```

## Testes Automatizados

As validações de a11y também podem ser executadas em testes:

```typescript
import { expect } from '@storybook/test';

export const MyStory: Story = {
  args: {
    // ... suas props
  },
  play: async ({ canvasElement }) => {
    // Seus testes aqui
    // O addon a11y roda automaticamente em background
  },
};
```

## Recursos Adicionais

- [Documentação oficial do addon-a11y](https://storybook.js.org/addons/@storybook/addon-a11y)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [axe-core Rules](https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

## Solução de Problemas

### Violações Comuns e Como Corrigi-las

1. **"Elements must have sufficient color contrast"**
   - Ajuste as cores no design system para ter contraste mínimo de 4.5:1

2. **"Form elements must have labels"**
   - Adicione um `<label>` associado ao input com `htmlFor`

3. **"Buttons must have discernible text"**
   - Adicione texto dentro do botão ou um `aria-label`

4. **"Links must have discernible text"**
   - Certifique-se de que o link tem texto descritivo

## Status do Addon

✅ Addon instalado e configurado
✅ Validações WCAG 2.0 AA e 2.1 AA ativas
✅ Painel de acessibilidade disponível em todas as stories
✅ Documentação completa disponível
