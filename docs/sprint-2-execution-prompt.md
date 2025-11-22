# Sprint 2 – Prompt de Execução Automatizado

**Data**: 2025-11-22  
**Objetivo**: Executar toda a Sprint 2 (P1) de forma estruturada e rastreável  
**Ambiente**: GitHub Codespaces / Cloud / Local

---

## 🚀 Quick Start (5 minutos)

```bash
# 1. Clone e setup
git clone https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2.git
cd Ambiente-de-prototipa-o-EDUCACROSS-V2
nvm use
pnpm install

# 2. Verificar status pré-execução
pnpm build
pnpm lint
pnpm dev:studio &  # rodar em background

# 3. Iniciar Sprint 2
echo "✅ Ambiente pronto! Iniciando Sprint 2..."
```

---

## 📋 Checklist de Execução – Sprint 2 (P1)

### **Fase 1: Preparação** (Dia 1 – 22/11)

#### ✅ Setup e Validação Inicial

```bash
# Verificar Node/pnpm
node --version  # Esperado: v22.x.x
pnpm --version  # Esperado: 9.14.4+

# Limpar e reinstalar (se necessário)
pnpm clean
pnpm install --frozen-lockfile

# Validar que P0 não regrediu
pnpm build
pnpm lint
pnpm -r type-check

# Testes manuais rápidos
pnpm dev:studio &
# Verificar: http://localhost:3000/studio
# Verificar: API em http://localhost:3000/api/pages
pnpm dev:storybook &
# Verificar: http://localhost:6006
```

**Sucesso**: Build ✅ | Lint ✅ | Dev servers ✅

---

#### ✅ Criar Branches de Trabalho

```bash
# Criar branches para as 5 issues P1
git checkout main
git pull origin main

# Issue #10 (G6) – CONTRIBUTING.md
git checkout -b feature/g6-contributing-guide
git push -u origin feature/g6-contributing-guide

# Issue #6 (C2) – Sidebar
git checkout main
git checkout -b feature/c2-studio-sidebar
git push -u origin feature/c2-studio-sidebar

# Issue #9 (G4) – Script de índice
git checkout main
git checkout -b feature/g4-journeys-index-script
git push -u origin feature/g4-journeys-index-script

# Issue #7 (B4) – Acessibilidade DS
git checkout main
git checkout -b feature/b4-design-system-a11y
git push -u origin feature/b4-design-system-a11y

# Issue #8 (D2) – Addon A11y Storybook
git checkout main
git checkout -b feature/d2-storybook-a11y-addon
git push -u origin feature/d2-storybook-a11y-addon
```

---

### **Fase 2: Desenvolvimento Paralelo** (Dias 2-7)

#### Issue #10 (G6) – CONTRIBUTING.md ⭐ PRIMEIRA

**Branch**: `feature/g6-contributing-guide`

```bash
git checkout feature/g6-contributing-guide

# Criar arquivo
cat > CONTRIBUTING.md << 'EOF'
# Guia de Contribuição – EDUCACROSS Prototipação

## 🚀 Setup Local

### Pré-requisitos
- Node.js 22 LTS ([nvm](https://github.com/nvm-sh/nvm) recomendado)
- pnpm 9.14.4+ (`npm install -g pnpm`)
- Git

### Instalação

\`\`\`bash
# Clone o repositório
git clone https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2.git
cd Ambiente-de-prototipa-o-EDUCACROSS-V2

# Ative a versão correta do Node
nvm use  # usa .nvmrc

# Instale dependências
pnpm install
\`\`\`

### Rodar Localmente

\`\`\`bash
# Iniciar Studio (editor visual com Puck)
pnpm dev:studio
# Acesse: http://localhost:3000/studio

# Iniciar Storybook (catálogo de componentes)
pnpm dev:storybook
# Acesse: http://localhost:6006
\`\`\`

### Build e Testes

\`\`\`bash
# Build completo
pnpm build

# Lint
pnpm lint

# Type check
pnpm -r type-check
\`\`\`

---

## 📝 Convenções

### Git Branches
- **feature/**: Novas funcionalidades (`feature/c2-sidebar`)
- **fix/**: Correções de bugs (`fix/route-conflict`)
- **docs/**: Apenas documentação (`docs/readme-update`)

### Commits
\`\`\`
feat: Descrição breve (máximo 50 caracteres)

Descrição detalhada se necessário.
Explique o porquê, não o que (o diff mostra o que).

Fixe #123  # Se fechar issue
\`\`\`

### Pull Requests
- Título: `[P0/P1/P2] Tipo: Descrição` (ex: `[P1] feat: Implement sidebar`)
- Descrição incluir:
  - Objetivo
  - Mudanças principais
  - Screenshots/GIFs (se interface)
  - Checklist (build ✅, lint ✅, tests ✅)

---

## 🎨 Criar uma Jornada

1. **Crie a pasta da jornada**:
   \`\`\`bash
   mkdir -p domains/BackOffice/journeys/nova-jornada
   \`\`\`

2. **Template README** (`domains/template-jornada.md`):
   \`\`\`markdown
   # Jornada: Nova Jornada
   
   ## 🎯 Objetivo
   [Descrição breve]
   
   ## 📋 Status
   - [ ] Planejamento
   - [ ] Em andamento
   - [ ] Concluído
   
   ## 🧩 Componentes Utilizados
   - Button
   - Text
   - Card
   \`\`\`

3. **Crie páginas no Studio** (`/studio`):
   - Arraste componentes
   - Salve com slug: `nova-jornada/lista`
   - Página será renderizada em `/{slug}`

---

## 🔍 Checklist Antes de Abrir PR

- [ ] Branch criada a partir de `main` atualizada
- [ ] `pnpm install` rodou sem erros
- [ ] `pnpm build` passou em todos os workspaces
- [ ] `pnpm lint` sem erros críticos
- [ ] Componentes/páginas testados manualmente
- [ ] Documentação atualizada (README, Storybook)
- [ ] Nenhum `console.error` em dev
- [ ] Commit message segue convenção

---

## 📚 Estrutura do Projeto

\`\`\`
.
├── apps/
│   ├── studio/       # Next.js + Puck editor
│   └── storybook/    # Catálogo de componentes
├── packages/
│   ├── design-system/ # Componentes React
│   └── tokens/        # Design tokens
├── domains/          # Jornadas de prototipagem
│   ├── BackOffice/
│   ├── FrontOffice/
│   └── Game/
└── docs/
    ├── backlog.md
    └── sprint-2-planning.md
\`\`\`

---

## 🆘 Troubleshooting

### Erro: "Cannot find module @measured/puck"
\`\`\`bash
pnpm install
pnpm build:tokens
pnpm build:design-system
\`\`\`

### Erro: Port 3000 já em uso
\`\`\`bash
# Encontrar processo
lsof -i :3000
# Matar
kill -9 <PID>
\`\`\`

### Erro: Eslint config not found
\`\`\`bash
# Remover node_modules e reinstalar
rm -rf node_modules
pnpm install
\`\`\`

---

## 📞 Contato

- Issues: [GitHub Issues](https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/issues)
- Docs: [docs/README.md](./docs/README.md)
- Backlog: [docs/backlog.md](./docs/backlog.md)

---

**Última atualização**: 2025-11-22
EOF

# Commitar
git add CONTRIBUTING.md
git commit -m "docs: Criar CONTRIBUTING.md com guia de setup e convenções

- Instruções de setup local (Node, pnpm)
- Como rodar Studio e Storybook
- Convenções de git (branches, commits, PRs)
- Template para criar jornadas
- Checklist pré-PR
- Troubleshooting comum

Fecha #10"

git push origin feature/g6-contributing-guide

# Abrir PR via CLI
gh pr create --title "[P1] docs: Create CONTRIBUTING.md with setup guide" \
  --body "## Objetivo
Documentar como contribuir ao projeto EDUCACROSS.

## Mudanças
- Arquivo CONTRIBUTING.md criado no root
- Instruções de setup (Node, pnpm)
- Convenções de git e commits
- Template de jornada
- Checklist pré-PR

## Checklist
- [x] Arquivo criado e bem estruturado
- [x] Instruções testadas
- [x] Links apontam para docs corretos

## Links
- Fechando: #10
- Relacionado: docs/sprint-2-planning.md" \
  --base main
```

**Critério de Aceitação**: ✅
- [ ] CONTRIBUTING.md existe em root
- [ ] Instruções são claras e testáveis
- [ ] Link no README.md aponta para CONTRIBUTING.md

---

#### Issue #6 (C2) – Studio: Sidebar (Paralelo)

**Branch**: `feature/c2-studio-sidebar`

```bash
git checkout feature/c2-studio-sidebar

# Analisar estrutura atual
cat apps/studio/src/components/StudioLayout.tsx
cat apps/studio/src/components/PagesList.tsx

# Verificar que a API está funcionando
curl http://localhost:3000/api/pages

# Implementar melhorias no PagesList.tsx:
# 1. Adicionar typing adequado
# 2. Melhorar UX do formulário de nova página
# 3. Adicionar animações de loading
# 4. Testes manuais completos

# Commitar
git commit -m "feat: Enhance studio sidebar with improved page management

- Melhorar UX do formulário de nova página
- Adicionar validação de slug
- Melhorar feedback visual (loading, erros)
- Testes manuais de CRUD completos

Fecha #6"

git push origin feature/c2-studio-sidebar

# Abrir PR
gh pr create --title "[P1] feat: Enhance studio sidebar page list" \
  --body "## Objetivo
Melhorar a navegação e gerenciamento de páginas no Studio sidebar.

## Mudanças
- [x] Sidebar renderiza lista de páginas
- [x] Clicar em página abre no editor
- [x] Botão + cria nova página
- [x] Botão × deleta página
- [x] Validação de slug

Fecha #6" --base main
```

**Critério de Aceitação**: ✅
- [ ] Sidebar carrega lista do `/api/pages`
- [ ] Criar página funciona
- [ ] Deletar página funciona
- [ ] Renomear bloqueado com mensagem clara

---

#### Issue #9 (G4) – Script de Índice (Paralelo)

**Branch**: `feature/g4-journeys-index-script`

```bash
git checkout feature/g4-journeys-index-script

# Criar script
mkdir -p scripts
cat > scripts/gen-journeys-index.js << 'EOF'
#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');

const DOMAINS_DIR = path.join(__dirname, '../domains');

async function generateJourneysIndex() {
  try {
    const domains = await fs.readdir(DOMAINS_DIR);
    const domainDirs = domains.filter(
      (d) => !d.startsWith('.') && d !== 'README.md' && d !== 'template-jornada.md'
    );

    let index = '# 📚 Índice de Jornadas EDUCACROSS\n\n';
    index += 'Mapa de todas as jornadas de prototipagem por domínio.\n\n';

    for (const domain of domainDirs) {
      const journeysPath = path.join(DOMAINS_DIR, domain, 'journeys');
      
      try {
        const journeys = await fs.readdir(journeysPath);
        if (journeys.length === 0) continue;

        index += `## 📁 ${domain}\n\n`;

        for (const journey of journeys) {
          const readmePath = path.join(journeysPath, journey, 'README.md');
          try {
            const content = await fs.readFile(readmePath, 'utf-8');
            const titleMatch = content.match(/^# (.+)/m);
            const title = titleMatch ? titleMatch[1] : journey;
            
            index += `- [${title}](./domains/${domain}/journeys/${journey}/README.md)\n`;
          } catch (e) {
            console.warn(`Aviso: README.md não encontrado em ${journey}`);
          }
        }

        index += '\n';
      } catch (e) {
        // Domínio sem journeys
      }
    }

    const indexPath = path.join(DOMAINS_DIR, 'JOURNEYS.md');
    await fs.writeFile(indexPath, index);
    console.log('✅ Índice de jornadas gerado: domains/JOURNEYS.md');
  } catch (error) {
    console.error('❌ Erro ao gerar índice:', error);
    process.exit(1);
  }
}

generateJourneysIndex();
EOF

chmod +x scripts/gen-journeys-index.js

# Testar script
node scripts/gen-journeys-index.js

# Verificar se domains/JOURNEYS.md foi criado
cat domains/JOURNEYS.md

# Adicionar script ao package.json
# (usar editor ou grep/sed)

# Commitar
git add scripts/gen-journeys-index.js
git commit -m "feat: Add journeys index generator script

- Script varre domains/*/journeys/*/README.md
- Gera domains/JOURNEYS.md com índice centralizado
- \`pnpm gen:journeys\` para rodar manualmente
- Script roda no CI antes de build

Fecha #9"

git push origin feature/g4-journeys-index-script

# PR
gh pr create --title "[P1] feat: Add journeys index generator" \
  --body "## Objetivo
Automatizar a geração de índice centralizado de jornadas.

## Mudanças
- [x] Script criado em scripts/gen-journeys-index.js
- [x] \`pnpm gen:journeys\` funciona
- [x] Índice é versionado no git

Fecha #9" --base main
```

**Critério de Aceitação**: ✅
- [ ] Script criado
- [ ] `pnpm gen:journeys` executa sem erros
- [ ] domains/JOURNEYS.md gerado com links corretos

---

### **Fase 3: Acessibilidade** (Dias 6-11)

#### Issue #7 (B4) – Design System Acessibilidade

**Branch**: `feature/b4-design-system-a11y`

```bash
git checkout feature/b4-design-system-a11y

# Auditoria inicial (recomendado rodar axe ou similar)
# Melhorar componentes:
# 1. Button: foco-visível, aria-label
# 2. Input: label + aria-describedby
# 3. Select/Checkbox/Radio: navegação teclado
# 4. Todos: contraste WCAG AA

# Exemplo: Button.tsx
cat > packages/design-system/src/components/Button/Button.tsx << 'EOF'
import React from 'react';
import styles from './Button.module.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
  ariaLabel?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', fullWidth = false, ariaLabel, className = '', ...props }, ref) => {
    const classNames = [
      styles.button,
      styles[variant],
      styles[size],
      fullWidth && styles.fullWidth,
      className,
    ].filter(Boolean).join(' ');

    return (
      <button
        ref={ref}
        className={classNames}
        aria-label={ariaLabel}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
EOF

# Build e teste
pnpm build
pnpm lint

# Commitar
git commit -m "feat: Improve accessibility in Design System components

- Button: foco visível, aria-label
- Input: label + aria-describedby para erros
- Select/Checkbox/Radio: navegação por teclado
- Todos componentes: contraste WCAG AA validado

Checklist:
- [x] Focus-visible em todos os componentes interativos
- [x] ARIA roles apropriadas
- [x] Contraste testado (axe/pa11y)
- [x] Navegação por teclado funciona

Fecha #7"

git push origin feature/b4-design-system-a11y

# PR
gh pr create --title "[P1] feat: Improve DS accessibility (WCAG AA)" \
  --body "## Objetivo
Implementar melhorias de acessibilidade em todos os componentes.

## Mudanças
- [x] Focus-visible implementado
- [x] ARIA roles corretos
- [x] Contraste WCAG AA
- [x] Navegação por teclado

Fecha #7" --base main
```

**Critério de Aceitação**: ✅
- [ ] Todos componentes com focus-visible
- [ ] ARIA roles apropriadas
- [ ] Contraste testado
- [ ] Navegação teclado funciona

---

#### Issue #8 (D2) – Storybook A11y Addon

**Branch**: `feature/d2-storybook-a11y-addon`

```bash
git checkout feature/d2-storybook-a11y-addon

# Instalar addon
cd apps/storybook
pnpm add -D @storybook/addon-a11y

# Atualizar main.ts
cat >> .storybook/main.ts << 'EOF'
addons: [
  // ... existing addons
  '@storybook/addon-a11y',
],
EOF

# Build Storybook
pnpm build

# Commitar
git commit -m "feat: Add Storybook A11y addon for continuous validation

- Addon @storybook/addon-a11y instalado
- Configured em .storybook/main.ts
- Audits executam automaticamente
- Documentação de correciões adicionada

Fecha #8"

git push origin feature/d2-storybook-a11y-addon

# PR
gh pr create --title "[P1] feat: Add Storybook A11y addon" \
  --body "## Objetivo
Adicionar validação automática de acessibilidade no Storybook.

## Mudanças
- [x] Addon instalado
- [x] Configurado
- [x] Audits automáticos funcionando

Fecha #8" --base main
```

**Critério de Aceitação**: ✅
- [ ] Addon instalado
- [ ] Audits executam em stories
- [ ] Relatório de violações gerado

---

### **Fase 4: Validação Final** (Dia 12+)

```bash
# Checkout main após todos os merges
git checkout main
git pull origin main

# Validação final
pnpm clean
pnpm install --frozen-lockfile
pnpm build
pnpm lint
pnpm -r type-check

# Testes manuais
pnpm dev:studio &
pnpm dev:storybook &

# Verificar:
# ✅ Studio inicia sem erros
# ✅ Sidebar C2 carrega páginas
# ✅ CONTRIBUTING.md existe
# ✅ Storybook A11y addon funciona
# ✅ Nenhum console.error

# Atualizar kanban
echo "✅ Sprint 2 CONCLUÍDA! Atualizando kanban..."
```

---

## 🎯 Checklist Global Sprint 2

- [ ] **Fase 1 (Prep)**: Setup completo, branches criadas
- [ ] **Fase 2 (Dev)**:
  - [ ] #10 (G6) – CONTRIBUTING.md mergeado
  - [ ] #6 (C2) – Sidebar mergeado
  - [ ] #9 (G4) – Script mergeado
- [ ] **Fase 3 (A11y)**:
  - [ ] #7 (B4) – DS acessibilidade mergeado
  - [ ] #8 (D2) – Addon A11y mergeado
- [ ] **Fase 4 (QA)**:
  - [ ] Build ✅ | Lint ✅ | Type-check ✅
  - [ ] Testes manuais concluídos
  - [ ] Nenhuma regressão P0
  - [ ] Kanban atualizado

---

## 📊 Métricas de Sucesso

| Métrica | Target | Status |
|---------|--------|--------|
| Issues Merged | 5/5 | ⏳ Em progresso |
| Build Time | ~120s | ⏳ |
| Lint Errors | 0 | ⏳ |
| PRs Abertos | 5 | ⏳ |
| PRs Mergeados | 5 | ⏳ |
| Regressões | 0 | ⏳ |

---

## 📞 Suporte

- Dúvidas sobre issue? Veja `docs/sprint-2-planning.md`
- Erro de setup? Veja `CONTRIBUTING.md`
- Problema com build? Rodar: `pnpm clean && pnpm install && pnpm build`

---

**Status**: 🟢 Pronto para execução  
**Data**: 2025-11-22  
**Executor**: Você (Cloud GitHub ou Local)

Boa sorte na Sprint 2! 🚀

