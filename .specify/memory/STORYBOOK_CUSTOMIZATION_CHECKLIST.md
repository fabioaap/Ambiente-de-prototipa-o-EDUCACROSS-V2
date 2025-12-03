# Storybook UI Customization - Sprint 4 Checklist

**Status**: ⏳ Pendente  
**Prioridade**: Alta  
**Tempo Estimado**: 8 horas  
**Referência**: `.specify/memory/SPRINT4_PLANNING.md`

---

## 🎯 Objetivo

Customizar completamente a interface do Storybook com a identidade visual EDUCACROSS, substituindo o tema padrão por um tema brandado com logo, cores e tipografia do Design System.

---

## ✅ Preparação (CONCLUÍDO)

- [x] Logo EDUCACROSS copiada para `domains/storybook/public/branding/logo-educacross.svg`
- [x] Logo Studio copiada para `domains/studio/public/branding/logo-educacross.svg`
- [x] Verificar logo SVG válido e renderizável

---

## 📋 Tarefas de Implementação

### 1. Manager Theme Configuration (2h)

**Arquivo**: `domains/storybook/.storybook/manager.ts`

#### Checklist
- [ ] Criar arquivo `manager.ts` na pasta `.storybook/`
- [ ] Importar `addons` de `@storybook/manager-api`
- [ ] Importar `create` de `@storybook/theming`
- [ ] Configurar tema EDUCACROSS:
  - [ ] Base: `'light'`
  - [ ] Brand title: `'EDUCACROSS Design System'`
  - [ ] Brand URL: URL oficial EDUCACROSS
  - [ ] Brand image: `'/branding/logo-educacross.svg'`
  - [ ] Color primary: `#5f4de5` (primary-600)
  - [ ] App background: `#f8f9fa` (neutral-50)
  - [ ] Font base: `"Montserrat", sans-serif`
  - [ ] Border radius: `6` (px)
- [ ] Configurar `addons.setConfig()`:
  - [ ] Aplicar tema customizado
  - [ ] Configurar sidebar (showRoots: true)
- [ ] Salvar e commitar arquivo

#### Validação
```bash
# Reiniciar Storybook
pkill -9 storybook
pnpm dev:storybook

# Abrir http://localhost:6006
# Verificar:
# ✓ Logo EDUCACROSS aparece no topo da sidebar
# ✓ Cor primary (#5f4de5) em links e seleções
# ✓ Montserrat aplicada em menus e textos
# ✓ Border radius 6px nos elementos
```

- [ ] Logo visível no header da sidebar
- [ ] Primary color aplicada em seleções
- [ ] Montserrat carregando corretamente
- [ ] Border radius 6px consistente
- [ ] Sem erros no console

**Comando de Teste**:
```bash
# Verificar se arquivo existe e sintaxe correta
cat domains/storybook/.storybook/manager.ts
node -c domains/storybook/.storybook/manager.ts
```

---

### 2. Manager Head Customization (1h)

**Arquivo**: `domains/storybook/.storybook/manager-head.html`

#### Checklist
- [ ] Criar arquivo `manager-head.html` na pasta `.storybook/`
- [ ] Adicionar favicon:
  - [ ] `<link rel="icon" type="image/svg+xml" href="/branding/logo-educacross.svg" />`
- [ ] Preload Montserrat:
  - [ ] Link preconnect para Google Fonts
  - [ ] Link href para Montserrat weights 300-700
- [ ] Adicionar CSS customizado:
  - [ ] Sidebar header com gradiente (opcional)
  - [ ] Logo sizing (max-height: 40px)
  - [ ] Font-family override para garantir Montserrat
- [ ] Salvar e commitar arquivo

#### Validação
```bash
# Abrir Storybook
pnpm dev:storybook

# Verificar:
# ✓ Favicon da aba do navegador é logo EDUCACROSS
# ✓ Montserrat carrega sem atraso
# ✓ Gradiente aplicado (se configurado)
```

- [ ] Favicon aparece na aba do navegador
- [ ] Montserrat preloaded (verificar Network tab)
- [ ] CSS custom aplicado (gradiente, sizing)
- [ ] Sem erros de CORS ou recursos não encontrados

**Comando de Teste**:
```bash
# Verificar se arquivo existe
ls -lh domains/storybook/.storybook/manager-head.html
```

---

### 3. Preview Configuration Update (2h)

**Arquivo**: `domains/storybook/.storybook/preview.ts`

#### Checklist
- [ ] Abrir arquivo `preview.ts` existente
- [ ] Verificar imports:
  - [ ] `@prototipo/tokens/dist/tokens.css` importado
  - [ ] Criar e importar `../src/styles/storybook-globals.css`
- [ ] Configurar `parameters.backgrounds`:
  - [ ] Default: `'educacross-light'`
  - [ ] Values: educacross-light, educacross-dark, white, primary
- [ ] Configurar `parameters.options.storySort`:
  - [ ] Order array com estrutura lógica:
    1. Introduction
    2. Design Tokens (Colors, Typography, Spacing, Shadows)
    3. Core Components (Button, Card, Badge, Alert, Avatar)
    4. Forms (Input, Select, Checkbox, Radio, Switch)
    5. Data Display (DataTable, Chip, Pagination, Breadcrumb)
    6. Navigation (Tabs, Sidebar, Dropdown)
    7. Dashboard (StatsCard, HealthIndicator, Leaderboard)
    8. Feedback (Modal, Alert)
    9. Layout
- [ ] Salvar e commitar arquivo

**Arquivo**: `domains/storybook/src/styles/storybook-globals.css` (NOVO)

#### Checklist
- [ ] Criar pasta `domains/storybook/src/styles/` se não existir
- [ ] Criar arquivo `storybook-globals.css`
- [ ] Adicionar estilos globais:
  - [ ] `body { font-family: 'Montserrat', sans-serif; }`
  - [ ] Font smoothing
  - [ ] Code/pre font (Fira Code ou monospace)
  - [ ] `.sb-show-main` background (neutral-50)
- [ ] Salvar e commitar arquivo

#### Validação
```bash
# Reiniciar Storybook
pkill -9 storybook
pnpm dev:storybook

# Verificar:
# ✓ Backgrounds EDUCACROSS disponíveis no toolbar
# ✓ Stories ordenadas corretamente (Introduction primeiro)
# ✓ Montserrat aplicada em conteúdo das stories
```

- [ ] Toolbar backgrounds mostra opções EDUCACROSS
- [ ] Ordem de stories lógica (Introduction no topo)
- [ ] Montserrat aplicada em story canvas
- [ ] Background padrão é educacross-light
- [ ] Sem erros no console

**Comando de Teste**:
```bash
# Verificar arquivos criados
ls -lh domains/storybook/.storybook/preview.ts
ls -lh domains/storybook/src/styles/storybook-globals.css
```

---

### 4. Introduction Page (2h)

**Arquivo**: `domains/storybook/src/stories/Introduction.mdx`

#### Checklist
- [ ] Criar pasta `domains/storybook/src/stories/` se não existir
- [ ] Criar arquivo `Introduction.mdx`
- [ ] Adicionar Meta:
  - [ ] `<Meta title="Introduction" />`
- [ ] Estrutura do conteúdo:
  - [ ] Header com logo EDUCACROSS (centralizado)
  - [ ] Título: "EDUCACROSS Design System"
  - [ ] Subtítulo: Descrição do projeto
  - [ ] Seção: Princípios de Design (Consistência, Acessibilidade, Performance)
  - [ ] Seção: Como Usar (instalação, import, tokens)
  - [ ] Seção: Status de Implementação (métricas)
  - [ ] Seção: Links Úteis (Figma, GitHub, docs)
  - [ ] Footer: Equipe e versão
- [ ] Aplicar inline styles:
  - [ ] Tipografia Montserrat
  - [ ] Cores do Design System (#1f2937, #6b7280, #5f4de5)
  - [ ] Spacing adequado
- [ ] Adicionar code blocks:
  - [ ] Exemplo de instalação (bash)
  - [ ] Exemplo de import (tsx)
  - [ ] Exemplo de tokens (css)
- [ ] Salvar e commitar arquivo

#### Validação
```bash
# Abrir Storybook
pnpm dev:storybook

# Navegar para "Introduction"
# Verificar:
# ✓ Logo EDUCACROSS renderiza
# ✓ Todas seções presentes e formatadas
# ✓ Code blocks com syntax highlight
# ✓ Links clicáveis e funcionais
```

- [ ] Story "Introduction" aparece no topo da sidebar
- [ ] Logo renderiza corretamente (não quebrado)
- [ ] Tipografia Montserrat aplicada
- [ ] Code blocks com syntax highlight
- [ ] Links abrem corretamente (GitHub, Figma)
- [ ] Layout responsivo (mobile/desktop)
- [ ] Sem erros MDX no console

**Comando de Teste**:
```bash
# Verificar arquivo criado
ls -lh domains/storybook/src/stories/Introduction.mdx
cat domains/storybook/src/stories/Introduction.mdx | grep "Meta title"
```

---

### 5. Favicon Creation (1h)

#### Opção A: Converter SVG para múltiplos formatos

**Checklist**:
- [ ] Abrir logo SVG em editor (Figma, Inkscape, etc.)
- [ ] Exportar como PNG 512x512px
- [ ] Converter PNG para ICO (32x32, 64x64) usando ferramenta online
- [ ] Salvar em `domains/storybook/public/branding/favicon.ico`
- [ ] Atualizar `manager-head.html` para usar `.ico`

#### Opção B: Usar SVG diretamente (recomendado)

**Checklist**:
- [ ] Copiar logo SVG como favicon:
  ```bash
  cp domains/storybook/public/branding/logo-educacross.svg \
     domains/storybook/public/branding/favicon.svg
  ```
- [ ] Verificar que `manager-head.html` usa `favicon.svg`
- [ ] Testar renderização em navegadores

#### Validação
```bash
# Reiniciar Storybook
pkill -9 storybook
pnpm dev:storybook

# Verificar:
# ✓ Aba do navegador mostra logo EDUCACROSS (não ícone Storybook padrão)
```

- [ ] Favicon visível na aba do Chrome
- [ ] Favicon visível na aba do Firefox
- [ ] Favicon visível na aba do Safari (se aplicável)
- [ ] Tamanho adequado (não pixelizado)
- [ ] Sem erro 404 no console (recurso não encontrado)

**Comando de Teste**:
```bash
# Verificar se favicon existe
ls -lh domains/storybook/public/branding/favicon.*
```

---

## 🧪 Validação Completa (End-to-End)

### Checklist Final

#### Visual
- [ ] Logo EDUCACROSS aparece no header da sidebar
- [ ] Título "EDUCACROSS Design System" no header
- [ ] Favicon customizado na aba do navegador
- [ ] Introduction page renderiza completamente
- [ ] Primary color (#5f4de5) em links e seleções
- [ ] Montserrat aplicada em toda interface
- [ ] Border radius 6px consistente
- [ ] Backgrounds EDUCACROSS no toolbar

#### Funcional
- [ ] Stories ordenadas logicamente (Introduction primeiro)
- [ ] Todas stories renderizam sem erros
- [ ] Navegação entre stories funciona
- [ ] Backgrounds switcher funciona
- [ ] Controls interativos funcionam
- [ ] Links externos abrem corretamente

#### Técnico
- [ ] `pnpm dev:storybook` inicia sem erros
- [ ] Console limpo (sem errors ou warnings)
- [ ] Build Storybook funciona:
  ```bash
  pnpm build:storybook
  ```
- [ ] Arquivos gerados em `storybook-static/`
- [ ] Preview da build funciona localmente

### Comandos de Validação

```bash
# 1. Verificar todos arquivos criados
ls -lh domains/storybook/.storybook/manager.ts
ls -lh domains/storybook/.storybook/manager-head.html
ls -lh domains/storybook/.storybook/preview.ts
ls -lh domains/storybook/src/styles/storybook-globals.css
ls -lh domains/storybook/src/stories/Introduction.mdx
ls -lh domains/storybook/public/branding/favicon.*

# 2. Limpar cache e rebuild
pkill -9 storybook
rm -rf domains/storybook/node_modules/.vite
pnpm install --filter storybook --force

# 3. Iniciar Storybook
pnpm dev:storybook

# 4. Abrir navegador
# http://localhost:6006

# 5. Build para produção
pnpm build:storybook

# 6. Verificar build gerado
ls -lh domains/storybook/storybook-static/
```

---

## 📸 Evidências para PR

### Screenshots Necessários

1. **Sidebar com Logo**
   - [ ] Capturar sidebar mostrando logo EDUCACROSS no header
   - [ ] Salvar como `docs/screenshots/storybook-sidebar-branded.png`

2. **Introduction Page**
   - [ ] Capturar página Introduction completa
   - [ ] Salvar como `docs/screenshots/storybook-introduction.png`

3. **Favicon na Aba**
   - [ ] Capturar aba do navegador com favicon customizado
   - [ ] Salvar como `docs/screenshots/storybook-favicon.png`

4. **Toolbar Backgrounds**
   - [ ] Capturar toolbar mostrando backgrounds EDUCACROSS
   - [ ] Salvar como `docs/screenshots/storybook-backgrounds.png`

5. **Story Order**
   - [ ] Capturar sidebar mostrando ordem correta (Introduction no topo)
   - [ ] Salvar como `docs/screenshots/storybook-story-order.png`

### Comandos para Screenshots

```bash
# Criar pasta de screenshots
mkdir -p docs/screenshots

# Usar Playwright para capturas automatizadas (opcional)
# Ou capturar manualmente via navegador
```

---

## 📝 Documentação a Atualizar

### Após Conclusão

- [ ] Atualizar `figma-vuexy-reference.md`:
  - [ ] Marcar "Storybook UI Customization" como ✅ Implementado
- [ ] Atualizar `SPRINT4_PLANNING.md`:
  - [ ] Marcar tarefa 7 como completa
  - [ ] Adicionar tempo real gasto
- [ ] Criar entry no CHANGELOG.md:
  ```markdown
  ## [Sprint 4] - 2025-12-XX
  
  ### Added
  - Storybook UI customization with EDUCACROSS branding
  - Custom theme with primary color #5f4de5
  - Logo and favicon integration
  - Introduction page with Design System overview
  - Custom backgrounds (educacross-light, educacross-dark)
  - Logical story ordering
  ```
- [ ] Commitar mudanças com mensagem descritiva:
  ```bash
  git add .
  git commit -m "feat(storybook): customize UI with EDUCACROSS branding
  
  - Add manager theme with logo and primary color #5f4de5
  - Configure custom favicon
  - Create Introduction.mdx welcome page
  - Update preview with EDUCACROSS backgrounds
  - Apply Montserrat typography throughout
  - Set logical story ordering
  
  Refs: SPRINT4_PLANNING.md, constitution.md v1.1.0"
  ```

---

## 🐛 Troubleshooting

### Problema: Logo não aparece

**Sintomas**: Sidebar não mostra logo ou mostra erro 404.

**Soluções**:
1. Verificar path correto: `/branding/logo-educacross.svg` (sem `public/`)
2. Confirmar arquivo existe: `ls domains/storybook/public/branding/logo-educacross.svg`
3. Reiniciar Storybook: `pkill -9 storybook && pnpm dev:storybook`
4. Limpar cache: `rm -rf node_modules/.vite`

---

### Problema: Montserrat não carrega

**Sintomas**: Fonte padrão (Arial/Helvetica) aparece ao invés de Montserrat.

**Soluções**:
1. Verificar `manager-head.html` tem link Google Fonts
2. Verificar `preview.ts` importa `storybook-globals.css`
3. Verificar `storybook-globals.css` define `font-family: 'Montserrat'`
4. Abrir DevTools → Network → Verificar se Montserrat foi baixada
5. Hard refresh: Ctrl+Shift+R (Windows) ou Cmd+Shift+R (Mac)

---

### Problema: Backgrounds não aparecem no toolbar

**Sintomas**: Toolbar não mostra opções de background customizadas.

**Soluções**:
1. Verificar `preview.ts` tem `parameters.backgrounds` configurado
2. Verificar sintaxe correta (default, values array)
3. Reiniciar Storybook
4. Verificar se há conflito com addons (desabilitar temporariamente)

---

### Problema: Introduction não aparece na sidebar

**Sintomas**: Story "Introduction" não está visível ou não é a primeira.

**Soluções**:
1. Verificar `Introduction.mdx` tem `<Meta title="Introduction" />`
2. Verificar `preview.ts` tem `storySort.order` com 'Introduction' primeiro
3. Limpar cache: `rm -rf node_modules/.vite`
4. Rebuild: `pnpm build:storybook`

---

### Problema: Build falha

**Sintomas**: `pnpm build:storybook` retorna erro.

**Soluções**:
1. Verificar sintaxe de todos arquivos `.ts` e `.mdx`
2. Executar: `node -c domains/storybook/.storybook/manager.ts`
3. Verificar imports estão corretos
4. Verificar não há paths absolutos incorretos
5. Executar: `pnpm lint` e corrigir warnings

---

## ✅ Critérios de Aceitação

Customização do Storybook é considerada **COMPLETA** quando:

1. ✅ Todos os 5 arquivos criados/editados (manager.ts, manager-head.html, preview.ts, storybook-globals.css, Introduction.mdx)
2. ✅ Logo EDUCACROSS visível no header da sidebar
3. ✅ Favicon customizado na aba do navegador
4. ✅ Introduction page renderiza completamente
5. ✅ Primary color (#5f4de5) aplicada em seleções
6. ✅ Montserrat aplicada em toda interface
7. ✅ Backgrounds EDUCACROSS disponíveis no toolbar
8. ✅ Stories ordenadas logicamente (Introduction primeiro)
9. ✅ Build Storybook (`pnpm build:storybook`) funciona
10. ✅ Console limpo (sem errors ou warnings)
11. ✅ 5 screenshots capturados para evidência
12. ✅ Documentação atualizada (figma-vuexy-reference.md, SPRINT4_PLANNING.md)
13. ✅ PR criado com evidências visuais e descrição completa

---

## 🔗 Referências

- **Sprint 4 Planning**: `.specify/memory/SPRINT4_PLANNING.md`
- **Figma Reference**: `.specify/memory/figma-vuexy-reference.md`
- **Constitution**: `.specify/memory/constitution.md` (v1.1.0)
- **Storybook Theming Docs**: https://storybook.js.org/docs/configure/theming
- **Storybook Manager API**: https://storybook.js.org/docs/configure/features-and-behavior

---

**Criado por**: Equipe EDUCACROSS  
**Data**: 29/11/2025  
**Versão**: 1.0.0
