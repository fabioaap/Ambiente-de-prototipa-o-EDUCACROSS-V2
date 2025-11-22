# 🚀 Sprint 2 – Guia Completo para Execução Cloud

**Data**: 2025-11-22  
**Status**: ✅ Pronto para Execução  
**Ambiente**: GitHub Codespaces / Cloud / Local

---

## 📍 Você Está Aqui

Bem-vindo! Este arquivo é o **índice central** de toda a documentação da Sprint 2.

**Se você é novo neste repositório, comece por AQUI 👇**

---

## 🎯 Escolha Seu Ponto de Entrada

### 1️⃣ "Quero começar AGORA em 5 minutos"
→ Abra: **`SPRINT2_QUICK_START.md`**
- Setup automático
- Comandos prontos
- Perfeito para Codespaces

### 2️⃣ "Quero entender TODO o workflow"
→ Abra: **`RUN_SPRINT2.md`**
- Explicação completa
- 5 issues detalhadas
- Workflow padrão
- **Este é o arquivo PRINCIPAL**

### 3️⃣ "Quero ver timeline, riscos e dependências"
→ Abra: **`SPRINT2_STATUS.md`**
- Dashboard visual
- Cronograma
- Métricas de sucesso
- Riscos identificados

### 4️⃣ "Quero entender GitHub Actions & CI/CD"
→ Abra: **`SPRINT2_GITHUB_ACTIONS.md`**
- Como o workflow automático funciona
- Monitoramento de status
- Troubleshooting de erros
- Integração local

### 5️⃣ "Quero contexto completo do projeto"
→ Abra: **`docs/sprint-2-planning.md`**
- Planejamento técnico detalhado
- Decisões arquiteturais
- Análise de riscos profunda
- Comunicação do time

### 6️⃣ "Quero scripts copy-paste prontos"
→ Abra: **`docs/sprint-2-execution-prompt.md`**
- 722 linhas de scripts
- Fase-a-fase
- Bash commands prontos
- Troubleshooting específico

---

## 🗺️ Mapa de Documentação

```
├─ 🚀 SPRINT2_QUICK_START.md
│  └─ "5 minutos: do zero ao dev"
│     • Setup no Codespaces
│     • Primeiros comandos
│     • Próximos passos
│
├─ 🚀 RUN_SPRINT2.md ⭐ COMECE AQUI
│  └─ "Guia completo de execução"
│     • Setup em 3 passos
│     • 5 issues detalhas (G6, C2, G4, B4, D2)
│     • Workflow padrão
│     • Checklist de aceitação
│
├─ 📊 SPRINT2_STATUS.md
│  └─ "Dashboard & timeline"
│     • Visual timeline
│     • Dependências entre issues
│     • Critérios de sucesso
│     • Riscos e mitigação
│
├─ 🤖 SPRINT2_GITHUB_ACTIONS.md
│  └─ "CI/CD automation guide"
│     • Como monitorar workflow
│     • Troubleshooting de erros
│     • Performance expectations
│     • Reprocessamento de jobs
│
├─ docs/sprint-2-planning.md
│  └─ "Planejamento técnico"
│     • Contexto das 5 issues
│     • Estimativas
│     • Dependências
│     • Riscos detalhados
│
└─ docs/sprint-2-execution-prompt.md
   └─ "Scripts prontos para copy-paste"
      • 722 linhas
      • 4 fases estruturadas
      • Bash code
      • Troubleshooting específico
```

---

## ⚡ Atalhos Rápidos

### Setup (Copie & Cole)

```bash
# Codespaces (GitHub)
# 1. Vá para: https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2
# 2. Clique Code (verde) → Codespaces → Create

# Depois, no terminal do Codespaces:
nvm use
pnpm install --frozen-lockfile
pnpm build && pnpm lint && pnpm -r type-check
echo "✅ Pronto! Vá para RUN_SPRINT2.md"
```

### Iniciar Primeira Issue (#10 – G6)

```bash
git checkout main && git pull
git checkout -b feature/g6-contributing-guide

# Depois siga instruções em RUN_SPRINT2.md → Issue #10
```

---

## 📋 5 Issues de Sprint 2

| # | Código | Título | Dias | Status | Docs |
|---|--------|--------|------|--------|------|
| #10 | G6 | CONTRIBUTING.md | 1-2 | 🟡 Pronto | [RUN_SPRINT2.md](./RUN_SPRINT2.md#-issue-10-g6--contributingmd) |
| #6 | C2 | Studio Sidebar | 3-4 | 🟡 Pronto | [RUN_SPRINT2.md](./RUN_SPRINT2.md#-issue-6-c2--studio-sidebar) |
| #9 | G4 | Script Índice | 2-3 | 🟡 Pronto | [RUN_SPRINT2.md](./RUN_SPRINT2.md#-issue-9-g4--script) |
| #7 | B4 | Acessibilidade DS | 4-5 | 🟡 Pronto | [RUN_SPRINT2.md](./RUN_SPRINT2.md#-issue-7-b4--design-system) |
| #8 | D2 | Addon A11y | 2-3 | 🟡 Pronto | [RUN_SPRINT2.md](./RUN_SPRINT2.md#-issue-8-d2--storybook) |

---

## 🔗 Links Importantes

### Repositório
- **GitHub**: https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2
- **Kanban**: https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/projects/3
- **Issues**: https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/issues
- **Workflow Status**: https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/actions

### Arquivos Principais
- **RUN_SPRINT2.md** – Guia de execução (COMECE AQUI)
- **SPRINT2_QUICK_START.md** – Setup rápido
- **SPRINT2_STATUS.md** – Dashboard & timeline
- **SPRINT2_GITHUB_ACTIONS.md** – CI/CD guide
- **docs/sprint-2-planning.md** – Planejamento técnico
- **docs/sprint-2-execution-prompt.md** – Scripts detalhados

---

## ✅ Validação de Setup

Para verificar que tudo está instalado corretamente:

```bash
# 1. Verificar Node
node --version
# Esperado: v22.x.x

# 2. Verificar pnpm
pnpm --version
# Esperado: 9.14.4 ou superior

# 3. Instalar dependências
pnpm install --frozen-lockfile

# 4. Build (deve ser rápido)
pnpm build
# Esperado: 4 workspaces compilados em ~120s

# 5. Lint
pnpm lint
# Esperado: 0 errors

# 6. Type-check
pnpm -r type-check
# Esperado: 0 errors

# 7. Sucesso!
echo "✅ Setup válido! Pronto para Sprint 2"
```

---

## 🎬 Workflow Padrão (Cada Issue)

```bash
# 1. Atualizar main
git checkout main && git pull

# 2. Criar branch feature
git checkout -b feature/seu-nome

# 3. Fazer alterações (veja RUN_SPRINT2.md para cada issue)

# 4. Validar localmente
pnpm build && pnpm lint && pnpm -r type-check

# 5. Commit
git add . && git commit -m "type: descrição (issue #XX)"

# 6. Push
git push -u origin feature/seu-nome

# 7. GitHub Actions roda automaticamente (3 min)

# 8. Abrir PR no GitHub (após push)

# 9. Aguardar Actions passar ✅

# 10. Merge
# GitHub: Clique "Squash and merge"
```

---

## 📞 Suporte & Troubleshooting

### Problema: "Não consegui fazer setup"
→ Vá para `SPRINT2_QUICK_START.md` → Seção "Troubleshooting"

### Problema: "Meu PR falhou em GitHub Actions"
→ Vá para `SPRINT2_GITHUB_ACTIONS.md` → Seção "Troubleshooting Workflow"

### Problema: "Não entendi a issue #X"
→ Vá para `RUN_SPRINT2.md` → Seção "Issue #X"

### Problema: "Workflow está demorando muito"
→ Vá para `SPRINT2_GITHUB_ACTIONS.md` → Seção "Performance"

### Problema: "Preciso entender arquitetura"
→ Vá para `docs/sprint-2-planning.md` → Seção "Dependências"

---

## 📚 Stack & Versões

- **Node.js**: 22 LTS
- **pnpm**: 9.14.4+
- **TypeScript**: 5
- **React**: 18
- **Next.js**: 15 (App Router)
- **Storybook**: 8 (ESM-only)

---

## 🚀 Próximas Ações

### Imediatamente
1. ✅ Leia este arquivo (você está aqui)
2. → Escolha seu ponto de entrada acima
3. → Siga as instruções do arquivo escolhido

### Nos Próximos 5 Minutos
```bash
# Faça o setup
nvm use
pnpm install --frozen-lockfile
pnpm build && pnpm lint
```

### Próximas 2 Horas
- Abra a primeira issue (#10 – G6)
- Siga workflow em `RUN_SPRINT2.md`
- Commit + push
- Observe GitHub Actions rodar

### Próximos 2 Dias
- Complete issue #10 (merge)
- Comece issue #6 + #9 em paralelo
- Acompanhe no kanban

### Próximas 2 Semanas
- Complete todas as 5 issues
- Valide P0 (sem regressões)
- Demo de Sprint 2

---

## ✨ Lembre-se

- 🎯 **Foco**: Uma issue por vez
- 🧪 **Teste**: Local antes de push
- ✅ **Valide**: Passe no checklist
- 📝 **Documente**: Atualize stories
- 🤖 **Confie**: GitHub Actions é seu amigo
- 📞 **Pergunte**: Se ficar preso, leia troubleshooting

---

## 📊 Status Geral

| Aspecto | Status | Detalhe |
|---------|--------|---------|
| **Setup** | ✅ Completo | Ambiente pronto, scripts disponíveis |
| **Issues P1** | 🟡 Definidas | 5 issues com specs, estimativas, aceitação |
| **Documentação** | ✅ Completa | 5 guias + 1 workflow + status |
| **CI/CD** | ✅ Automático | GitHub Actions configurado |
| **Bloqueadores** | ✅ Zero | Nada bloqueia execução |
| **Risco** | ✅ Baixo | Mitigation plans documentados |

---

## 🎓 Aprendizados ao Final de Sprint 2

Ao completar as 5 issues, você terá:

- ✅ Experiência em monorepo pnpm
- ✅ Workflow com GitHub Actions
- ✅ Design System com acessibilidade (WCAG AA)
- ✅ Integração Puck + sidebar no Studio
- ✅ Documentação clara para novos devs
- ✅ Governance de jornadas automatizada

---

## 🏁 Próximo Passo

**👉 Abra agora: `RUN_SPRINT2.md`**

É o guia completo de execução. Contém:
- Setup em 3 passos
- 5 issues detalhas
- Workflow padrão
- Checklists
- Todos os comandos prontos

---

*Gerado por: GitHub Copilot Agent*  
*Data: 2025-11-22*  
*Versão: v1.0 (Pronto para Execução)*  
*Última atualização: 2025-11-22*
