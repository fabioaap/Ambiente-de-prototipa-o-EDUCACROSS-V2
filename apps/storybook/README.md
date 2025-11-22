# Storybook - EDUCACROSS

Catálogo de componentes do Design System.

## Funcionalidades

- **Documentação Interativa**: Explore todos os componentes do `@prototipo/design-system`
- **Playground**: Teste variações de propriedades em tempo real
- **Design Tokens**: Visualize cores, tipografia e espaçamentos
- **Accessibility Testing**: Validação automática de acessibilidade com axe-core

## Componentes Documentados

- **Button**: Botões com múltiplas variantes e tamanhos
- **Text**: Tipografia com controle de estilo
- **Card**: Containers com diferentes estilos
- **Layout**: Sistema de layout responsivo
- **Input, Checkbox, Radio, Select, Switch**: Componentes de formulário
- **Accessibility**: Documentação completa de padrões WCAG 2.1 AA

## Scripts

- `pnpm dev` - Inicia Storybook na porta 6006
- `pnpm build` - Cria build estático do Storybook
- `pnpm lint` - Executa o linter

---

## ♿ Addon de Acessibilidade (A11y)

O Storybook está configurado com o addon `@storybook/addon-a11y` para validação automática de acessibilidade.

### Como Usar

1. **Iniciar Storybook**:
   ```bash
   pnpm dev
   ```

2. **Abrir no navegador**: http://localhost:6006

3. **Localizar o painel Accessibility**:
   - Navegue para qualquer story
   - Veja a aba "Accessibility" no painel inferior
   - Violations aparecem automaticamente

### O Que o Addon Verifica

O addon usa **axe-core** para executar auditorias automáticas:

✅ **Contraste de Cores**
- Verifica se texto e componentes atendem WCAG AA (4.5:1)
- Destaca automaticamente problemas de contraste

✅ **Estrutura HTML**
- Headings em ordem hierárquica
- Landmarks (main, nav, aside)
- Listas e tabelas estruturadas corretamente

✅ **ARIA**
- Labels corretos em form controls
- Roles apropriados
- Estados (aria-expanded, aria-selected)
- Propriedades (aria-describedby, aria-labelledby)

✅ **Teclado e Foco**
- Elementos interativos acessíveis via teclado
- Ordem de foco lógica
- Focus visible

✅ **Alternativas de Texto**
- Alt text em imagens
- Labels em inputs
- Texto visível em botões

### Interpretando Resultados

#### 🔴 Violations (Violações)
- **Crítico**: Deve ser corrigido imediatamente
- Impede o uso por alguns usuários
- Exemplo: Input sem label, contraste insuficiente

#### 🟡 Passes (Passou)
- Regras que passaram com sucesso
- Indica boa implementação de acessibilidade

#### ⚠️ Incomplete (Incompleto)
- Requer verificação manual
- Exemplo: Alt text existe, mas pode não ser descritivo

### Exemplo de Uso

1. Abra uma story (ex: `Button > Primary`)
2. Clique na aba "Accessibility"
3. Veja:
   - **Violations**: Lista de problemas encontrados
   - **Passes**: Lista de verificações bem-sucedidas
   - **Incomplete**: Itens para revisar manualmente

### Corrigindo Violações

Quando o addon detecta uma violação:

1. **Leia a descrição**: Explica o problema
2. **Veja o elemento**: Destaque visual no componente
3. **Siga a solução**: Link para documentação WCAG
4. **Corrija o código**: Edite o componente
5. **Verifique novamente**: Recarregue a story

**Exemplo de correção**:
```tsx
// ❌ Antes (violação)
<button>Click here</button>

// ✅ Depois (corrigido)
<button aria-label="Salvar formulário">Click here</button>
```

### Configuração

A configuração está em `.storybook/preview.ts`:

```typescript
a11y: {
  manual: false, // Executa automaticamente
  config: {
    rules: [
      {
        id: 'color-contrast',
        enabled: true, // Verifica contraste
      },
    ],
  },
}
```

### Desabilitar para Stories Específicas

Se necessário desabilitar para uma story específica:

```typescript
export const ExampleStory = {
  parameters: {
    a11y: {
      disable: true, // Desabilita apenas para esta story
    },
  },
};
```

### Configurar Regras Específicas

Para ajustar regras do axe-core:

```typescript
export const ExampleStory = {
  parameters: {
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: false, // Desabilita verificação de contraste
          },
        ],
      },
    },
  },
};
```

### Recursos Adicionais

- [Storybook A11y Addon Docs](https://storybook.js.org/addons/@storybook/addon-a11y)
- [axe-core Rules](https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM](https://webaim.org/)

### Troubleshooting

#### Addon não aparece
```bash
# Reinstalar dependências
pnpm install
# Rebuild Storybook
pnpm build
```

#### Muitas violações
- Foque nas críticas primeiro
- Corrija componentes base antes dos derivados
- Use o Accessibility.stories.tsx como referência

#### Falsos positivos
- Alguns alerts podem não se aplicar
- Verifique manualmente
- Se necessário, desabilite a regra específica com justificativa

---

## 🎨 Estrutura de Stories

```
src/stories/
├── Button.stories.tsx      # Componente Button
├── Text.stories.tsx        # Componente Text
├── Card.stories.tsx        # Componente Card
├── Accessibility.stories.tsx  # Guia de acessibilidade
├── PagesList.stories.tsx   # Documentação Studio
└── Tokens.stories.tsx      # Design tokens
```

## 📚 Saiba Mais

- [Storybook Docs](https://storybook.js.org/docs/react/get-started/introduction)
- [Design System Guidelines](../../packages/design-system/README.md)
- [CONTRIBUTING.md](../../CONTRIBUTING.md)

