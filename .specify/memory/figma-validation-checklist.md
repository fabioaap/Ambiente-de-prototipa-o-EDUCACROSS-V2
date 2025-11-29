# Figma Vuexy Validation Checklist

**Versão**: 1.0.0  
**Data**: 29/11/2025  
**Referência**: `.specify/memory/figma-vuexy-reference.md`

---

## 📋 Checklist de Validação de Componentes

Use este checklist para validar cada componente implementado antes de marcar como "Implementado" no `figma-vuexy-reference.md`.

---

### ✅ Pré-Implementação

- [ ] **Figma Node-ID identificado** no documento de referência
- [ ] **Categoria correta** (Core, Forms, Data Display, Navigation, etc.)
- [ ] **Todos os estados documentados** (default, hover, active, disabled, focus, error)
- [ ] **Variantes identificadas** (ex: Button - primary, secondary, text, icon)
- [ ] **Dependências mapeadas** (tokens, outros componentes, ícones)

---

### 🎨 Design Tokens

- [ ] **Font Family**: Montserrat aplicado a todos os textos
- [ ] **Font Weights**: Corretos para cada variante (300/400/500/600/700)
- [ ] **Colors**: Usando tokens CSS variables (não hardcoded)
  - [ ] Primary: `--colors-primary-600` (#5f4de5 / rgb(95, 77, 229))
  - [ ] Success: `--colors-success-500` (#22c55e)
  - [ ] Warning: `--colors-warning-500` (#f59e0b)
  - [ ] Error: `--colors-error-500` (#ef4444)
  - [ ] Neutral: `--colors-neutral-{100-900}`
- [ ] **Spacing**: Usando escala de 4px (`--spacing-{1-8}`)
- [ ] **Border Radius**: 
  - [ ] Padrão: `--borderRadius-md` (6px) para botões, inputs, cards
  - [ ] Exceções justificadas e documentadas
- [ ] **Shadows**: Usando tokens `--shadows-{sm/md/lg}` quando aplicável

---

### 🧩 Estrutura do Componente

- [ ] **Arquivo criado**: `packages/design-system/src/components/{Component}/{Component}.tsx`
- [ ] **CSS Module criado**: `packages/design-system/src/components/{Component}/{Component}.module.css`
  - [ ] ⚠️ **SEM DUPLICATAS**: Verificar que não existe `.css` E `.module.css`
- [ ] **TypeScript interface**: Props documentadas com JSDoc
- [ ] **'use client'**: Diretiva presente (componentes client-side)
- [ ] **React.forwardRef**: Implementado quando apropriado
- [ ] **Exportado**: Em `packages/design-system/src/index.ts`

---

### 📖 Storybook

- [ ] **Story criada**: `domains/storybook/src/stories/{Category}/{Component}.stories.tsx`
- [ ] **Variantes cobertas**: Todas as variantes do Figma têm stories
- [ ] **Estados interativos**: Hover, active, disabled, focus demonstrados
- [ ] **Args controls**: Props interativos para testar no Storybook
- [ ] **Documentação**: README ou description explicando uso
- [ ] **Renders sem erros**: Console limpo no Storybook

---

### 🎭 Puck Integration (Studio)

- [ ] **Registrado**: Em `domains/studio/src/config/puck.config.tsx`
- [ ] **Props configuráveis**: Controles apropriados para editores
- [ ] **Preview funcional**: Componente aparece corretamente no editor Puck
- [ ] **Defaultable**: Valores padrão sensatos para novos usos

---

### 🧪 Validação Visual (Playwright)

Execute o script de validação:

```bash
node /tmp/figma-visual-comparison.mjs
```

- [ ] **Fidelidade ≥90%**: Score de fidelidade visual vs Figma
- [ ] **Font check**: Montserrat confirmado via computed style
- [ ] **Color check**: rgb values batem com tokens Vuexy
- [ ] **Spacing check**: Padding/margin seguem escala 4px
- [ ] **Border radius check**: Valores corretos por variante
- [ ] **Screenshots capturadas**: Em `/tmp/figma-comparison/{Component}.png`

---

### 📸 Validação Manual

- [ ] **Comparação lado-a-lado**: Figma aberto ao lado do Storybook
- [ ] **Estados verificados**: Cada estado visual conferido manualmente
- [ ] **Responsividade testada**: Mobile, tablet, desktop
- [ ] **Cross-browser**: Chrome, Firefox, Safari (se aplicável)
- [ ] **Dark mode**: Se Vuexy especifica variante dark

---

### ♿ Acessibilidade

- [ ] **Semantic HTML**: Elementos corretos (`<button>`, `<input>`, etc.)
- [ ] **ARIA labels**: Quando elementos não são auto-descritivos
- [ ] **Keyboard navigation**: Tab order lógico, Enter/Space funcionam
- [ ] **Focus visible**: Estado de foco claramente visível
- [ ] **Color contrast**: Ratios adequados (WCAG AA mínimo)
- [ ] **Screen reader friendly**: Testado com leitor de tela (se crítico)

---

### 🧬 Código de Qualidade

- [ ] **TypeScript strict**: Sem `any`, interfaces bem tipadas
- [ ] **ESLint clean**: `pnpm lint` sem warnings
- [ ] **Build success**: `pnpm --filter @prototipo/design-system build` OK
- [ ] **Type check**: `pnpm -r type-check` passa
- [ ] **No console errors**: Runtime limpo no Storybook e Studio
- [ ] **CSS Modules scope**: Classes namespacadas (ex: `.Button_primary`)

---

### 📚 Documentação

- [ ] **Props documentadas**: JSDoc em cada prop do TypeScript
- [ ] **Uso exemplificado**: Stories mostram casos de uso comuns
- [ ] **Edge cases**: Variantes extremas testadas (texto muito longo, vazio, etc.)
- [ ] **Figma link adicionado**: Comentário ou doc apontando para node-id
- [ ] **Status atualizado**: `figma-vuexy-reference.md` marcado ✅ Implementado

---

## 🚀 Processo de Validação Completo

### 1. Antes de Criar PR

```bash
# Build tokens e design system
pnpm build:tokens
pnpm --filter @prototipo/design-system build

# Limpar cache Storybook
pkill -9 storybook
rm -rf domains/storybook/node_modules/@prototipo
rm -rf domains/storybook/node_modules/.vite
pnpm install --filter storybook --force

# Iniciar Storybook
pnpm dev:storybook
```

### 2. Validação Automatizada

```bash
# Aguardar Storybook estar pronto
timeout 10 bash -c 'until curl -s http://localhost:6006 > /dev/null; do sleep 1; done'

# Executar validação Figma
node /tmp/figma-visual-comparison.mjs

# Verificar resultado
# Score ≥90% = ✅ Aprovado
# Score <90% = ❌ Requer correções
```

### 3. Evidências para PR

- [ ] **Screenshot Figma**: Captura da especificação no Figma
- [ ] **Screenshot Storybook**: Captura do componente renderizado
- [ ] **Relatório Playwright**: JSON ou markdown com métricas
- [ ] **Comparação lado-a-lado**: Imagem com Figma + Storybook juntos
- [ ] **Console logs**: Prova de ausência de erros

### 4. Atualizar Documentação

```bash
# Editar figma-vuexy-reference.md
# Mudar status de ⏳ Pendente para ✅ Implementado
# Adicionar % fidelidade na coluna "Status Implementação"

# Exemplo:
| **Button** | 6579-45052 | [Ver no Figma](...) | ✅ Implementado (100%) |
```

### 5. Commit e PR

```bash
git add .
git commit -m "feat(design-system): implement {Component} with 95% Figma fidelity

- Figma node-id: {node-id}
- Fidelity score: 95%
- All states: default, hover, active, disabled
- Storybook stories: 5 variants
- Puck integration: ready

Closes #{issue-number}"

git push origin feature/{component-name}
```

---

## 🎯 Critérios de Aceitação

Um componente é considerado **COMPLETO** quando:

1. ✅ Todos os itens deste checklist marcados
2. ✅ Fidelidade visual ≥90% no Playwright
3. ✅ Console limpo (sem errors ou warnings)
4. ✅ Build + lint + type-check passam
5. ✅ Documentação atualizada (`figma-vuexy-reference.md`)
6. ✅ PR com evidências visuais e relatórios
7. ✅ Code review aprovado por peer

---

## 🐛 Problemas Comuns e Soluções

### Problema: Fidelidade <90%

**Sintomas**: Playwright reporta score baixo, cores ou tamanhos diferentes.

**Diagnóstico**:
```bash
# Inspecionar CSS computado
node /tmp/investigate-broken.mjs {component-name}

# Verificar tokens compilados
grep "{ComponentClass}" packages/design-system/dist/src/index.css
```

**Soluções**:
- Verificar token CSS correto (ex: `--borderRadius-md` não `--border-radius-md`)
- Confirmar arquivo `.css` correto sendo compilado pelo tsup
- Checar se classe CSS bate com className do React (case-sensitive!)
- Validar valores rgb() contra tokens Vuexy

---

### Problema: CSS não atualiza após rebuild

**Sintomas**: Mudanças no CSS não aparecem no Storybook.

**Solução**:
```bash
# Rebuild completo + cache clear
pnpm --filter @prototipo/design-system build
pkill -9 storybook
rm -rf domains/storybook/node_modules/@prototipo
rm -rf domains/storybook/node_modules/.vite
pnpm install --filter storybook --force
pnpm dev:storybook
```

---

### Problema: Classes CSS não aplicadas

**Sintomas**: Elementos renderizam mas sem estilos.

**Diagnóstico**:
```tsx
// Verificar import CSS Module
import styles from './Component.module.css';

// Verificar aplicação de classes
<div className={styles.Component_wrapper}>
  <button className={styles.Component_button}></button>
</div>
```

**Solução**:
- Classes devem ser namespacadas: `{Component}_{element}`
- CSS Module deve ser importado e usado via `styles.{className}`
- Verificar que tsup está compilando o arquivo correto

---

### Problema: Modal/Dialog não valida

**Sintomas**: Playwright timeout esperando modal aparecer.

**Solução**:
- Criar story com `isOpen={true}` por padrão
- Ou usar Playwright `.click()` para abrir modal antes de validar
- Componentes que requerem interação precisam estratégia especial

---

## 📊 Métricas de Qualidade

### Targets de Fidelidade

- **Tier 1 (Core)**: ≥95% (Button, Input, Card, Tabs)
- **Tier 2 (Common)**: ≥90% (Modal, Table, Select, etc.)
- **Tier 3 (Complex)**: ≥85% (Charts, Rich editors, etc.)

### Status Atual (Sprint 3)

- **Fidelidade Média**: 93.75%
- **Componentes 100%**: 15/16
- **Componentes Pendentes**: 22/44 (~50%)

---

## 🔗 Referências

- **Figma Reference**: `.specify/memory/figma-vuexy-reference.md`
- **Constitution**: `.specify/memory/constitution.md` (v1.1.0)
- **Validation Scripts**: `/tmp/figma-visual-comparison.mjs`, `/tmp/final-deep-check.mjs`
- **Vuexy Figma**: [UstdVUNj2isUdfucUj5EAx](https://www.figma.com/design/UstdVUNj2isUdfucUj5EAx/vuexy-figma-dashboard-ui-kit-and-builder-v4?node-id=870-37366)

---

**Mantido por**: Equipe EDUCACROSS  
**Última Atualização**: 29/11/2025
