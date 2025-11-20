# 🚀 Próximos Passos - EDUCACROSS Prototipação

**Data**: 2025-11-20  
**Versão**: Sprint 2 em progresso (45% das 11 issues P1)

---

## ⚡ TL;DR - Ações Imediatas (Hoje)

### Passo 1: Commit das Mudanças Atuais (15 min)
```bash
# No diretório raiz
git add -A
git commit -m "Sprint 2 (45%): Play functions, acessibilidade, CONTRIBUTING, índice jornadas"
git push origin copilot/list-pending-issues
```

**O que será commitado:**
- ✅ Play functions em Input e Checkbox (D3)
- ✅ Audit de acessibilidade e CSS improvements (B4)
- ✅ CONTRIBUTING.md com guia completo (G6)
- ✅ Script de índice automático de jornadas (G4)
- ✅ Badges e links Storybook no README (H5)

### Passo 2: Fechar Issues P0 no GitHub (5 min)
Ir para https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/issues e fechar:
- **#1** - C1: Persistência em disco (PRONTO desde 2025-11-15)
- **#2** - B1: Componentes formulário (PRONTO desde 2025-11-15)
- **#3** - D1: Página de Tokens (PRONTO desde 2025-11-15)
- **#5** - F1: ESLint unificado (PRONTO desde 2025-11-19)

Comentário modelo:
> Implementado e testado. Build e lint passando. Verificado em pnpm dev:studio e pnpm dev:storybook.
> Referência: [commit hash da implementação]

### Passo 3: Escolher Próxima Sprint (30 min)
**Opção A (Recomendado)**: Continuar Sprint 2 com **C2 - Studio Sidebar**
- Impacto alto (UX)
- Tempo médio (3-4h)
- Desbloqueia C3, H2, H3

**Opção B**: Explorar **H - Dashboard** Planning
- Impacto visual
- Menos crítico mas importante
- Pode ser paralelo

**Opção C**: Ampliar **E - Jornadas** (E2/E3)
- Adicionar novos domínios
- Demonstra escalabilidade

---

## 📋 Guia Detalhe por Próxima Issue

### 🔴 **C2 - Studio: Lista de Páginas no Sidebar** (Próxima Prioridade)
**Estimativa**: 3-4 horas  
**Status**: Não iniciada  
**Critério de Aceitação**:
- [ ] Sidebar exibe lista dinâmica de páginas (carregadas de `apps/studio/data/pages/`)
- [ ] Ações: Criar página nova, renomear, deletar
- [ ] Navegação ao clicar em página abre na área de edição
- [ ] UI responsiva (mobile-friendly)
- [ ] Acessibilidade: navegação teclado funcional

**Arquivos a Tocar**:
```
apps/studio/src/components/
├── PagesList.tsx                    (EXISTENTE - melhorar)
├── PagesList.module.css             (EXISTENTE - estilos)
├── StudioLayout.tsx                 (EXISTENTE - refatorar)
└── StudioLayout.module.css          (EXISTENTE - novos estilos)

apps/studio/src/app/studio/
└── page.tsx                         (EXISTENTE - integrar sidebar)
```

**Como Começar**:
```bash
# 1. Criar feature branch
git checkout -b feature/c2-studio-sidebar

# 2. Abrir em dev
pnpm dev:studio
# Acessar: http://localhost:3000/studio

# 3. Estudar estrutura atual
cat apps/studio/data/pages/backoffice/revisao-questoes/lista.json

# 4. Implementar
# - Adicionar API call em PagesList.tsx para listar páginas
# - Adicionar handlers para criar/deletar
# - Melhorar layout do StudioLayout para acomodar sidebar

# 5. Testar
pnpm lint --fix
pnpm build:studio
```

**Referências**:
- `apps/studio/src/app/api/pages/README.md` - API endpoints
- `CONTRIBUTING.md` - Padrões de componentes React
- `docs/accessibility-audit.md` - Checklist acessibilidade

---

### 🔴 **D2 - Addon A11y e Validações Storybook** (Paralelo a C2)
**Estimativa**: 2-3 horas  
**Status**: Não iniciada  
**Críterio de Aceitação**:
- [ ] Addon A11y instalado e ativo no Storybook
- [ ] Todos os componentes exibem violations de acessibilidade quando existem
- [ ] Play functions testam acessibilidade básica (foco, contraste)

**Como Começar**:
```bash
git checkout -b feature/d2-addon-a11y

# 1. Instalar dependências
cd apps/storybook
pnpm add -D @storybook/addon-a11y

# 2. Configurar em .storybook/main.ts
# Adicionar: addons: [..., '@storybook/addon-a11y']

# 3. Testar
pnpm dev
# Verificar: Addon A11y aparece no painel inferior do Storybook
```

---

### 🟡 **H1 + H - Dashboard do Projeto** (Exploração)
**Estimativa**: 4-5 horas  
**Status**: Não iniciada  
**O que é**: Página listando todas as páginas prototipadas + links + métricas

**Próximos Passos**:
1. **H1 - Planejar wireframe**:
   - Criar sketch no Figma ou arquivo Markdown com layout
   - Definir seções: Header, busca, cards de páginas, métricas
   
2. **H2 - Endpoint de index**:
   - API `GET /api/dashboard/pages` retorna JSON com metadados
   
3. **H3 - UI do Dashboard**:
   - Component novo em Storybook ou página no Studio
   - Consome endpoint H2

**Como Começar**:
```bash
git checkout -b feature/h-dashboard-planning

# 1. Criar documento de wireframe
cat > docs/dashboard-wireframe.md << 'EOF'
# Dashboard - Wireframe

## Layout
[Descrever structure: header, search, grid de cards]

## Dados
[Listar informações por página]
EOF

# 2. Criar story placeholder
touch apps/storybook/src/stories/Dashboard.stories.tsx

# 3. Documentar em docs/tarefas-ativas.md
```

---

### 🟢 **E2 - Jornada FrontOffice: Onboarding Aluno**
**Estimativa**: 5-6 horas  
**Status**: Não iniciada  
**Padrão**: Repetir estrutura de E1 (BackOffice)

**Como Começar**:
```bash
git checkout -b feature/e2-onboarding-aluno

# 1. Criar estrutura de diretórios
mkdir -p domains/FrontOffice/journeys/onboarding-aluno
mkdir -p apps/studio/data/pages/frontoffice/onboarding-aluno

# 2. Copiar template
cp CONTRIBUTING.md domains/FrontOffice/journeys/onboarding-aluno/template.md

# 3. Criar README da jornada
cat > domains/FrontOffice/journeys/onboarding-aluno/README.md << 'EOF'
# Jornada: Onboarding do Aluno

## Objetivo
...

## Fluxo
...

## Páginas
- boas-vindas.json
- perfil-inicial.json
- tutorial.json
EOF

# 4. Gerar índice atualizado
pnpm gen:journeys

# 5. Criar páginas no Studio (3 JSON files)
touch apps/studio/data/pages/frontoffice/onboarding-aluno/{boas-vindas,perfil-inicial,tutorial}.json
```

---

## 📚 Como Usar os Documentos de Referência

### `docs/backlog.md`
**Use para**: Entender escopo completo e dependências de uma issue  
**Como**: Buscar por "Epic X" ou "Issue #N", ver prioridade e critério de aceitação

### `CONTRIBUTING.md`
**Use para**: Padrões de código, como criar componentes, estrutura de stories  
**Como**: Seguir templates para React components, TypeScript, Storybook stories

### `docs/accessibility-audit.md`
**Use para**: Checklist de acessibilidade ao criar/modificar componentes  
**Como**: Verificar que seu componente tem focus-visible, hit targets 44px+, roles ARIA

### `domains/INDEX.md`
**Use para**: Navegar jornadas e domínios rapidamente  
**Como**: Auto-gerado por `pnpm gen:journeys`, link rápido para jornadas

### `docs/sprint-1-completo.md` & `sprint-2-progresso.md`
**Use para**: Entender o que foi feito, por quê e como funciona  
**Como**: Referência de implementações similares já completas

---

## 🎯 Fluxo Padrão para Qualquer Nova Task

```
1️⃣ PLANEJAMENTO
├─ Ler issue no GitHub (critério de aceitação)
├─ Ler referência em docs/backlog.md
└─ Identificar dependências (bloqueadores)

2️⃣ SETUP
├─ Criar feature branch: git checkout -b feature/ID-nome-tarefa
├─ Atualizar docs/tarefas-ativas.md com seu nome/branch
└─ Comunicar ao time (se houver)

3️⃣ DESENVOLVIMENTO
├─ Abrir dev server: pnpm dev:studio ou pnpm dev:storybook
├─ Implementar funcionalidade
├─ Adicionar stories ou exemplos no Storybook (quando aplicável)
├─ Seguir padrões de CONTRIBUTING.md
└─ Testar acessibilidade (docs/accessibility-audit.md)

4️⃣ VALIDAÇÃO
├─ Rodar lint: pnpm lint --fix
├─ Rodar build: pnpm build (ou build:específico)
├─ Verificar no browser (http://localhost:3000 ou :6006)
└─ Tester com git diff (ver mudanças claras)

5️⃣ COMMIT & PUSH
├─ git add -A
├─ git commit -m "descritivo da mudança"
├─ git push origin feature/branch-name
└─ Criar PR no GitHub

6️⃣ FECHAMENTO
├─ Marcar issue como done
├─ Adicionar link da PR na issue
├─ Atualizar docs/tarefas-ativas.md
└─ Atualizar docs/backlog.md (se status mudou)
```

---

## 🔗 Links Rápidos

### Repositório GitHub
- [Issues Abertas](https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/issues)
- [Pull Requests](https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/pulls)
- [Projects v2](https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/projects)

### Dev Local
```bash
# Terminal 1 - Studio
pnpm dev:studio        # http://localhost:3000/studio

# Terminal 2 - Storybook
pnpm dev:storybook     # http://localhost:6006

# Terminal 3 - Testes
pnpm lint --watch      # (se disponível)
```

### Documentação Local
- `README.md` - Visão geral do projeto
- `CONTRIBUTING.md` - Guia de contribuição
- `docs/backlog.md` - Backlog completo
- `docs/tarefas-ativas.md` - Esta lista
- `domains/INDEX.md` - Índice de jornadas

---

## ❓ FAQ Rápido

**P: Por onde começar?**  
R: Siga os 3 passos em "TL;DR" acima. Depois escolha uma issue do grupo 🔴 (alta prioridade).

**P: Como soube se compilou certo?**  
R: Sem erros em `pnpm lint` e `pnpm build`. Dev servers rodam sem crashes.

**P: Posso trabalhar em paralelo?**  
R: Sim! C2 e D2 são independentes e podem ser paralelos. Coordene com o time.

**P: Preciso entender todo o código antes de começar?**  
R: Não. Use CONTRIBUTING.md como template. Cópie padrões existentes e adapte.

**P: Como faço para testar acessibilidade?**  
R: Abra DevTools > Axe DevTools (plugin Chrome/Firefox). Rodar audit automático.

**P: Meu build falhou, e agora?**  
R: Execute `pnpm lint --fix`, depois `pnpm build` novamente. Se persistir, abra issue.

**P: Quanto tempo leva cada task?**  
R: Estimativas em cada seção. Adicione 20% para testes e documentação.

**P: Posso deletar arquivos?**  
R: Não. Apenas adicione ou modifique. Se precisa deletar, discuta com PM.

---

## 📊 Métricas Atuais

```
Sprints Completos:  1 de 3 (Sprint 1 - P0)
Em Progresso:       1 de 3 (Sprint 2 - P1 = 45%)
Próximo:            Sprint 3 (P2 + exploração)

Arquivos Staging:   20 (prontos para commit)
Branches Ativas:    1 (copilot/list-pending-issues)
Build Status:       ✅ OK
Lint Status:        ✅ OK (2 warnings menores)
```

---

## 🎓 Aprendizado & Padrões

### Componentes React
Veja em `CONTRIBUTING.md` > "Criando Componentes" para:
- Estrutura de pastas
- TypeScript types
- CSS Modules
- Acessibilidade mínima

### Stories Storybook
Veja em `CONTRIBUTING.md` > "Criando Stories" para:
- Template básico
- Play functions
- Documentação (MDX)
- Acessibilidade testing

### Jornadas
Veja em `CONTRIBUTING.md` > "Criando uma Jornada" para:
- Estrutura de diretórios
- README template
- JSON pages
- Navegação

---

**Última atualização**: 2025-11-20 17:37 UTC  
**Próxima revisão**: Após Sprint 2 completar 70% (8/11 issues)  
**Contato**: Criar issue no GitHub ou enviar PR para discussão

🚀 **Vamos começar!**
