# 📋 Plano de Integração: Code to Figma + EDUCACROSS

**Data**: 24 de Novembro de 2025  
**Status**: 🟡 Branch de testes criada (feature/code-to-figma-integration)  
**Estimativa**: 3-4 horas para setup completo  

---

## 🎯 Objetivo da Integração

Sincronizar os 13 componentes do Design System EDUCACROSS com Figma, criando:
- ✅ Source of truth único (Storybook)
- ✅ Sincronização automática Dev → Figma
- ✅ Componentes em Figma com variantes e auto-layout
- ✅ Documentação automática no Figma

---

## 📦 Componentes a Sincronizar

```
packages/design-system/src/components/
├─ Button (5+ stories)          ✅ Pronto
├─ Card (3+ stories)             ✅ Pronto
├─ Layout (múltiplas variantes)   ✅ Pronto
├─ Text (tipografia completa)     ✅ Pronto
├─ Input (estados)                ✅ Pronto
├─ Select (dropdown)              ✅ Pronto
├─ Checkbox (checked/unchecked)   ✅ Pronto
├─ Radio (variantes)              ✅ Pronto
├─ Switch (on/off)                ✅ Pronto
├─ Badge (4 variantes)            ✅ Pronto
├─ Progress (múltiplos valores)   ✅ Pronto
├─ Leaderboard (tabela)           ✅ Pronto
└─ HealthIndicator (4 status)     ✅ Pronto
```

Total: **13 componentes** com **31+ stories** = Pronto para exportação

---

## 🏗️ Arquitetura da Integração

```
┌─────────────────────────────────────────────────────────────────┐
│                     EDUCACROSS Project                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  apps/storybook/                                               │
│  ├─ Button.stories.tsx (5 variantes)                           │
│  ├─ Card.stories.tsx (3 variantes)                             │
│  └─ ... (31+ total)                                            │
│                                                                 │
│         ↓ (pnpm dev:storybook @ localhost:6006)               │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                     code-to-figma Plugin                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  packages/storybook-addon-export/                              │
│  ├─ Addon panel em Storybook                                   │
│  ├─ Botão "Export to Figma"                                    │
│  └─ Captura HTML + renderização                               │
│                                                                 │
│  packages/html-to-figma-core/                                  │
│  ├─ Converte HTML → Figma JSON                                 │
│  ├─ Interpreta CSS (colors, typography, layout)               │
│  └─ Cria componentes com variantes                            │
│                                                                 │
│  packages/figma-plugin-lite/                                   │
│  ├─ Plugin Figma de recebimento                                │
│  └─ Cria/atualiza components no Figma                          │
│                                                                 │
│         ↓ (via Figma API)                                      │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│               Figma Design System (Destino)                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Team File "EDUCACROSS Design System"                          │
│  ├─ Componentes sincronizados (13)                             │
│  ├─ Variantes automáticas                                      │
│  └─ Auto-layout ativado                                        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔧 Etapas de Integração

### **Etapa 1: Setup em Branch de Testes (30 min)**

#### 1.1 Verificar Ambiente ✅
```bash
node --version      # Esperado: v22.x ✅
pnpm --version      # Esperado: 9.14.4+ ✅
git --version       # Esperado: 2.52.0+ ✅
```

#### 1.2 Repositório já clonado ✅
```
code-to-figma/
└─ figma-sync-engine/
   ├─ packages/storybook-addon-export/ ← Addon para Storybook
   ├─ packages/html-to-figma-core/     ← Conversor HTML → JSON
   └─ packages/figma-plugin-lite/      ← Plugin Figma
```

#### 1.3 Dependências já instaladas ✅
```bash
cd code-to-figma/figma-sync-engine
pnpm install        # ✅ Feito (583 packages)
pnpm build          # ✅ Feito (5 packages built)
```

#### 1.4 Branch de Testes Criada ✅
```bash
git checkout -b feature/code-to-figma-integration
# Todos os testes e configurações aqui antes de mergear
```

---

### **Etapa 2: Configuração Figma (45 min)**

#### 2.1 Gerar Token de Autenticação
1. Ir em https://www.figma.com/settings/personal_tokens
2. Criar novo token: "EDUCACROSS Sync"
3. Copiar token (formato: `figd_...`)

#### 2.2 Obter IDs do Projeto
1. Criar/abrir projeto no Figma
2. URL: `https://www.figma.com/files/recent?team_id=...`
3. Extrair: `team_id` e `file_id`

#### 2.3 Configurar .env
```bash
cd code-to-figma/figma-sync-engine

cat > .env.local << EOF
FIGMA_AUTH_TOKEN=figd_seu-token-aqui
FIGMA_TEAM_ID=seu-team-id
FIGMA_FILE_ID=seu-file-id
STORYBOOK_URL=http://localhost:6006
ENVIRONMENT=development
EOF

# Não commitar .env.local (adicionar ao .gitignore se necessário)
```

---

### **Etapa 3: Integrar Addon com Storybook EDUCACROSS (1h)**

#### 3.1 Instalar Addon no Storybook
```bash
cd apps/storybook

# Instalar dependência do addon
pnpm add -D @figma-sync-engine/storybook-addon-export
```

#### 3.2 Atualizar .storybook/main.ts
```typescript
const config: StorybookConfig = {
  stories: ['../src/stories/**/*.stories.ts?(x)'],
  addons: [
    '@storybook/addon-essentials',
    '@figma-sync-engine/storybook-addon-export', // ← Adicionar
  ],
  framework: '@storybook/react-webpack5',
  // ... resto da config
};

export default config;
```

#### 3.3 Validar Instalação
```bash
cd apps/storybook
pnpm dev:storybook

# Verificar:
# - Painel "Figma Export" aparece na sidebar
# - Botão "Export to Figma" está visível
# - Sem erros de console
```

---

### **Etapa 4: Testar com 1 Componente (30 min)**

#### 4.1 Iniciar Storybook
```bash
cd apps/storybook
pnpm dev:storybook
# Acessa: http://localhost:6006
```

#### 4.2 Ir para Button Story
1. Abrir Storybook em http://localhost:6006
2. Navegar para: Stories → Button → Primary
3. Clicar painel "Figma Export" na sidebar

#### 4.3 Exportar para Figma
1. Clique "Export to Figma"
2. Selecionar page de destino no Figma
3. Aguardar sincronização (~30 segundos)

#### 4.4 Verificar em Figma
- [ ] Component "Button" criado em Figma
- [ ] Variante "Primary" presente
- [ ] Props corretos (text, onClick, disabled)
- [ ] Estilos aplicados (cor, typography, padding)
- [ ] Auto-layout funcionando

---

### **Etapa 5: Sincronizar Todos os Componentes (5 min)**

#### 5.1 Script de Sincronização Completa
```bash
cd code-to-figma/figma-sync-engine

# Sincronizar todos os 13 componentes
pnpm sync --all

# Ou manual: exportar cada story do Storybook EDUCACROSS
```

#### 5.2 Validação em Figma
- [ ] 13 componentes criados
- [ ] 31+ variantes distribuídas
- [ ] Auto-layout funcionando
- [ ] Colors & typography corretos
- [ ] Sem erros de sincronização

---

### **Etapa 6: Configurar CI/CD (1-2h - FUTURA)**

#### 6.1 GitHub Actions Workflow
```yaml
# .github/workflows/sync-figma.yml
name: Sync to Figma

on:
  push:
    branches: [main]
    paths:
      - 'apps/storybook/**'
      - 'packages/design-system/**'

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: 'pnpm'
      
      - run: pnpm install --frozen-lockfile
      - run: pnpm build
      
      - name: Sync Storybook → Figma
        env:
          FIGMA_AUTH_TOKEN: ${{ secrets.FIGMA_AUTH_TOKEN }}
          FIGMA_TEAM_ID: ${{ secrets.FIGMA_TEAM_ID }}
          FIGMA_FILE_ID: ${{ secrets.FIGMA_FILE_ID }}
        run: |
          cd code-to-figma/figma-sync-engine
          pnpm sync --all
```

#### 6.2 Adicionar Secrets ao GitHub
1. Ir em: Repo Settings → Secrets and variables → Actions
2. Adicionar:
   - `FIGMA_AUTH_TOKEN`
   - `FIGMA_TEAM_ID`
   - `FIGMA_FILE_ID`

---

### **Etapa 7: Documentação & Fluxo de Trabalho (1h - FUTURA)**

#### 7.1 Guia para Desenvolvedores
```markdown
# Workflow: Criar Componente + Exportar para Figma

1. Implementar componente em `packages/design-system/`
2. Criar stories em `apps/storybook/src/stories/`
3. Rodar: `pnpm dev:storybook`
4. Testar visualmente no Storybook
5. Clicar "Export to Figma" no painel
6. Validar em Figma
7. Fazer commit + push (CI/CD sincroniza automaticamente)
```

#### 7.2 SLAs de Sincronização
- Manual: ~5 minutos
- Automática (CI/CD): ~10 minutos após push

#### 7.3 Resolução de Conflitos
- Se componente mudou no Figma: Sincronizar de novo (sobrescreve)
- Se mudou no código: Push → CI/CD sincroniza
- Source of truth: **Sempre o código** (Storybook)

---

## 📊 Estimativa de Tempo

| Etapa | Tempo | Status |
|-------|-------|--------|
| 1. Setup em branch | 30 min | ✅ Pronto |
| 2. Figma Config | 45 min | ⏳ Pendente |
| 3. Addon Integration | 1h | ⏳ Pendente |
| 4. Teste (1 comp) | 30 min | ⏳ Pendente |
| 5. Sync All | 5 min | ⏳ Pendente |
| 6. CI/CD | 1-2h | ⏳ Futuro |
| 7. Documentação | 1h | ⏳ Futuro |
| **TOTAL** | **~4-5h** | **Iniciado** |

---

## ✅ Checklist de Implementação

### ✅ Preparação
- [x] Clonar repositório code-to-figma
- [x] Instalar dependências
- [x] Fazer build da ferramenta
- [x] Criar branch feature/code-to-figma-integration
- [ ] Gerar token Figma

### ⏳ Integração (Próximo)
- [ ] Configurar .env (Figma credentials)
- [ ] Instalar addon no Storybook EDUCACROSS
- [ ] Atualizar .storybook/main.ts
- [ ] Validar painel "Figma Export" no Storybook

### ⏳ Testes (Próximo)
- [ ] Exportar Button story para Figma
- [ ] Validar componente em Figma
- [ ] Exportar todos os 13 componentes
- [ ] Validar variantes e auto-layout

### ⏳ Automação (Futuro)
- [ ] Criar GitHub Actions workflow
- [ ] Adicionar secrets ao GitHub
- [ ] Testar sincronização automática
- [ ] Validar em Figma após push

### ⏳ Documentação (Futuro)
- [ ] Documentar fluxo de trabalho
- [ ] Criar guia para designers
- [ ] Documentar SLAs
- [ ] Treinar time

---

## 🚀 Próximos Passos Imediatos (Esta Branch)

1. **Gerar credenciais Figma** (15 min)
   - Token + IDs do projeto

2. **Configurar .env** (5 min)
   - Arquivo de ambiente na branch

3. **Instalar addon** (15 min)
   - Atualizar Storybook

4. **Testar exportação** (30 min)
   - Button → Figma

5. **Criar Pull Request** (5 min)
   - Para review antes de mergear para main

Depois desses 5 passos, a integração estará **funcional** em teste e pronta para mergear após aprovação.

---

**Status Atual**: 🟡 Branch de testes criada (feature/code-to-figma-integration)  
**Próximo Commit**: Configuração Figma + Addon Integration  
**Mergear para Main**: Após validação completa em testes
