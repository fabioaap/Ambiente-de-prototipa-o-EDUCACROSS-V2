# Guia Visual do Addon A11y

## Como Verificar se o Addon Está Funcionando

### 1. Inicie o Storybook

```bash
pnpm dev:storybook
```

O Storybook será iniciado em `http://localhost:6006`

### 2. Navegue até uma Story

No menu lateral esquerdo:
- Expanda a categoria **"Acessibilidade"**
- Clique em **"Exemplos"**
- Selecione qualquer variação (ex: "Botão Acessível")

### 3. Localize o Painel de Acessibilidade

Na parte inferior da tela, você verá várias abas:
- Controls
- Actions
- **Accessibility** ← Esta é a aba do addon a11y
- Interactions

Clique na aba **"Accessibility"** para ver os resultados.

### 4. Interpretando os Resultados

O painel mostra três categorias de resultados:

#### ✅ Passes (Verde)
Validações que foram aprovadas. Exemplos:
- "Document should have one main landmark"
- "All page content should be contained by landmarks"
- "Heading levels should only increase by one"

#### ⚠️ Violations (Vermelho)
Problemas de acessibilidade encontrados. Para cada violação você verá:
- **Descrição**: O que está errado
- **Impact**: Gravidade (minor, moderate, serious, critical)
- **Element**: Qual elemento HTML tem o problema
- **Como Corrigir**: Sugestões de correção

#### ⚪ Incomplete (Amarelo/Cinza)
Validações que precisam de revisão manual. O addon não pode determinar automaticamente se passam ou falham.

### 5. Exemplo: Story com Violações

Para ver o addon em ação detectando problemas:

1. Navegue para **"Acessibilidade > Exemplos > Contraste Insuficiente"**
2. Abra a aba **"Accessibility"**
3. Você verá uma violação de **"color-contrast"**
4. Expanda a violação para ver:
   - Elemento afetado
   - Contraste atual (ex: 1.5:1)
   - Contraste mínimo necessário (4.5:1 para texto normal)
   - Código do elemento

### 6. Exemplo: Story Sem Violações

1. Navegue para **"Acessibilidade > Exemplos > Botão Acessível"**
2. Abra a aba **"Accessibility"**
3. Você verá apenas **Passes** (validações aprovadas)
4. Isso indica que o componente está acessível

## Estrutura Visual do Painel A11y

```
┌─────────────────────────────────────────────────────────┐
│ 🔍 Accessibility                                        │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ ✅ Passes (12)                                          │
│   └─ ▶ All page content should be contained by...      │
│   └─ ▶ Document should have one main landmark          │
│   └─ ▶ Heading levels should only increase by one      │
│                                                         │
│ ⚠️ Violations (1)                                       │
│   └─ ▼ Elements must have sufficient color contrast    │
│       Impact: serious                                   │
│       Element: <button style="background: #f5f5f5..."> │
│       Fix: Increase contrast ratio to at least 4.5:1   │
│                                                         │
│ ⚪ Incomplete (2)                                       │
│   └─ ▶ Elements must have their visible text as...     │
│   └─ ▶ Links must have discernible text                │
│                                                         │
│ [View all rules] [Settings ⚙️]                         │
└─────────────────────────────────────────────────────────┘
```

## Configuração Global

A configuração global do addon está em:
- Arquivo: `domains/storybook/.storybook/preview.ts`
- Regras principais habilitadas:
  - `color-contrast` (contraste de cores)
  - `label` (labels de formulários)
  - `button-name` (nomes de botões)
- Níveis WCAG: 2.0 AA, 2.1 AA

## Desabilitando Temporariamente

Se você está desenvolvendo um componente que ainda não está pronto para validação de acessibilidade, pode desabilitar temporariamente:

```typescript
export const WorkInProgress: Story = {
  parameters: {
    a11y: {
      disable: true, // Desabilita para esta story
    },
  },
};
```

**⚠️ Importante**: Não deixe esta configuração no código final! É apenas para desenvolvimento.

## Recursos Visuais

### Indicadores de Gravidade

- 🔴 **Critical**: Bloqueia usuários com deficiência
- 🟠 **Serious**: Dificulta significativamente o uso
- 🟡 **Moderate**: Causa inconveniência
- 🔵 **Minor**: Pequeno problema de usabilidade

### Ícones no Painel

- ✅ Check verde: Validação passou
- ⚠️ Triângulo vermelho: Violação encontrada
- ⚪ Círculo cinza: Requer validação manual
- ⚙️ Engrenagem: Configurações do addon

## Troubleshooting

### O painel Accessibility não aparece

1. Verifique se o addon está instalado: 
   ```bash
   grep "@storybook/addon-a11y" domains/storybook/package.json
   ```

2. Verifique se está configurado em `main.ts`:
   ```bash
   grep "addon-a11y" domains/storybook/.storybook/main.ts
   ```

3. Limpe o cache e reinstale:
   ```bash
   rm -rf node_modules .cache
   pnpm install
   pnpm dev:storybook
   ```

### As validações não aparecem

1. Aguarde alguns segundos após carregar a story
2. O addon processa assincronamente
3. Recarregue a página (F5)

### Muitas violações falsas

1. Alguns componentes podem ter violações legítimas temporárias durante desenvolvimento
2. Use `parameters.a11y.disable` apenas temporariamente
3. Priorize corrigir violações "Critical" e "Serious"

## Checklist de Acessibilidade

Antes de considerar um componente pronto:

- [ ] Executar story no Storybook
- [ ] Abrir painel Accessibility
- [ ] Zero violações "Critical"
- [ ] Zero violações "Serious"
- [ ] Violações "Moderate" justificadas ou corrigidas
- [ ] Itens "Incomplete" revisados manualmente
- [ ] Testes manuais com teclado (Tab, Enter, Escape)
- [ ] Testado com leitor de tela (quando possível)
