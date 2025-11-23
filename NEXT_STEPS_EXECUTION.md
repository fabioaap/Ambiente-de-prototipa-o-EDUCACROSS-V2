# 🚀 EXECUÇÃO: Finalização Sprint 2 + Início Sprint 3

**Objetivo**: Zerar pendências da Sprint 2 (P1), estabelecer automação (Fase 2) e iniciar Dashboard (P2).
**Data**: 2025-11-23
**Status**: Pronto para execução

---

## 📋 CHECKLIST DE EXECUÇÃO

### 1️⃣ Finalizar #9 (G4 - Index Script) ⏳
**Meta**: Completar Sprint 2 P1 (100%)
- [ ] Verificar/Recuperar PR #38 (WIP)
- [ ] Implementar script `scripts/generate-domains-index.mjs`
- [ ] O script deve:
    - Varrer `domains/{Dominio}/journeys/{Jornada}`
    - Ler metadados (título, status) dos READMEs
    - Gerar tabela índice em `domains/README.md`
- [ ] Testar execução local
- [ ] Commit, Push e Merge (fechando issue #9)

### 2️⃣ Executar Fase 2 (Automação) 🤖
**Meta**: Estabelecer rotina de CI/CD e Workflow
- [ ] Executar script de setup automático:
  ```powershell
  .\scripts\execute-phase2.ps1 -Mode auto
  ```
- [ ] Verificar criação de:
  - `WORKFLOW.md`
  - `.github/workflows/*`
  - `scripts/auto-merge-prs.ps1`

### 3️⃣ Iniciar Dashboard H Epic (Sprint 3) 📊
**Meta**: Iniciar desenvolvimento da P2
- [ ] **H1 (#12) - Planejamento & Estrutura**:
  - Criar branch `feature/h1-dashboard-planning`
  - Criar estrutura de rotas: `apps/studio/src/app/dashboard/`
  - Definir Layout base (`layout.tsx`)
  - Documentar arquitetura em `domains/BackOffice/journeys/Dashboard/README.md`
- [ ] **H2 (#13) - UI Base**:
  - Implementar componentes visuais (Cards, Grids) usando Design System
  - Conectar com `puck.config.tsx` se necessário

### 4️⃣ Validar Automações ✅
**Meta**: Garantir que Fase 2 funcionou
- [ ] Criar PR de teste `chore/test-automation`
- [ ] Verificar se:
  - Bot assinou PR (auto-assign)
  - Checks rodaram (build/lint)
  - Auto-merge funciona (se label `ready-to-merge` for aplicado)

---

## 🤖 INSTRUÇÕES TÉCNICAS PARA O AGENTE

### Passo 1: Resolver #9 (Script de Índice)

O script deve ser Node.js puro ou TSX. Sugestão `scripts/generate-domains-index.mjs`:

```javascript
import fs from 'fs';
import path from 'path';

const DOMAINS_DIR = 'domains';
const OUTPUT_FILE = path.join(DOMAINS_DIR, 'README.md');

// Lógica para varrer diretórios, ler READMEs de jornadas e montar tabela Markdown
// Colunas: Dominio | Jornada | Status | Links
```

### Passo 2: Executar Fase 2

Apenas rode o comando. Se houver erro, corrija o script `execute-phase2.ps1` e tente novamente.

### Passo 3: Dashboard

Foco em **H1 (#12)** primeiro. Não tente fazer UI complexa agora. Apenas a estrutura de rotas e o layout shell.

---

## 🔗 REFERÊNCIAS

- `ISSUES_BACKLOG_STATUS.md` (Status atual)
- `PHASE2_PROMPT.md` (Detalhes da Fase 2)
- `domains/template-jornada.md` (Padrão para documentação)

---

**Próximo Passo**: Comece pelo Passo 1 (Finalizar #9).
