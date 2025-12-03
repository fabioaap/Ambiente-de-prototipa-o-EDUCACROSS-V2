# Sprint 2 – Dashboard de Status

**Atualizado em**: 2025-11-22  
**Timeline**: 2025-11-22 a 2025-12-06 (~14 dias)

---

## 📈 Resumo Executivo

| Métrica | Status | Detalhe |
|---------|--------|---------|
| **Setup** | ✅ Completo | Ambiente pronto, GitHub Actions configurado |
| **Issues P1** | 🔄 5 Prontas | G6, C2, G4, B4, D2 com specs definidas |
| **Documentação** | ✅ Completa | RUN_SPRINT2.md, sprint-2-execution-prompt.md, SPRINT2_QUICK_START.md |
| **Bloqueadores** | ✅ Zero | Nenhuma dependência externa |
| **Risco P0** | ✅ Baixo | P0 1-4 validados, CI/CD pronto |

---

## 🗓️ Timeline Visual

```
SEMANA 1 (22-28 Nov)                     SEMANA 2 (29 Dec-06)
|                                         |
Day 1-2   Day 3-4   Day 5-7              Day 8-9   Day 10-11  Day 12-14
|---------|---------|--------|----------|---------|---------|-----------|
 #10 G6   #9 G4     #6 C2    Buffer    #7 B4     #8 D2      Testing
CONTRIB  SCRIPT    SIDEBAR             A11y      ADDON      & QA
(1-2d)   (2-3d)    (3-4d)              (4-5d)    (2-3d)
```

**Legenda**:
- 🟢 Dia previsto
- 🟡 Buffer de ajuste
- 🔴 Bloqueador detectado

---

## 🎯 Issues em Execução

### 1️⃣ #10 (G6) – CONTRIBUTING.md
```
Status:     🟡 Pronto para iniciar
Estimativa: 1-2 dias
Prioridade: ⭐ COMECE AQUI
Bloqueador: Nenhum (independente)
Desbloqueador: Onboarding, clareza de processo

Artefatos:
  - CONTRIBUTING.md (root) [novo]
  - Link em README.md [update]
  - GitHub Actions ✅ pronto

Progresso:
  [ ] Arquivo criado
  [ ] Setup testado
  [ ] Link adicionado
  [ ] PR aberto
  [ ] Merged
```

**Próximo**: Abra RUN_SPRINT2.md → Seção "Issue #10 (G6)"

---

### 2️⃣ #6 (C2) – Studio Sidebar
```
Status:     🟡 Pronto para iniciar
Estimativa: 3-4 dias
Prioridade: ⭐⭐ HIGH (crítico)
Bloqueador: C1 ✅ (API existe)
Desbloqueador: Navegação Studio, E1 completo

Artefatos:
  - domains/studio/src/components/Sidebar.tsx [novo]
  - domains/studio/src/app/layout.tsx [edit]
  - domains/storybook/src/stories/Sidebar.stories.tsx [novo]
  - API: GET /api/pages ✅ pronto

Progresso:
  [ ] Componente criado
  [ ] Integrado em layout
  [ ] Story criado
  [ ] CRUD testado (criar, ler, deletar)
  [ ] PR aberto
  [ ] Merged
```

**Próximo**: Após #10, abra RUN_SPRINT2.md → Seção "Issue #6 (C2)"

---

### 3️⃣ #9 (G4) – Script Gerador de Índice
```
Status:     🟡 Pronto para iniciar
Estimativa: 2-3 dias
Prioridade: ⭐⭐ MEDIUM
Bloqueador: Nenhum (paralelo)
Desbloqueador: Governança de jornadas

Artefatos:
  - scripts/gen-journeys-index.js [novo]
  - package.json (script "gen:journeys") [edit]
  - domains/JOURNEYS.md [gerado]

Progresso:
  [ ] Script criado
  [ ] Função de varredura OK
  [ ] Markdown gerado corretamente
  [ ] Testado localmente
  [ ] PR aberto
  [ ] Merged
```

**Próximo**: Paralelo com #6, abra RUN_SPRINT2.md → Seção "Issue #9 (G4)"

---

### 4️⃣ #7 (B4) – Design System Acessibilidade
```
Status:     🟡 Pronto (após #6+#9)
Estimativa: 4-5 dias
Prioridade: ⭐⭐ MEDIUM (habilita #8)
Bloqueador: B1 ✅ (componentes existem)
Desbloqueador: D2 (Addon A11y), WCAG compliance

Artefatos:
  - Button.tsx [edit] - ARIA + foco
  - Input.tsx [edit] - label + aria-describedby
  - Select.tsx [edit] - navegação teclado
  - Checkbox.tsx [edit] - teclado OK
  - Radio.tsx [edit] - teclado OK
  - Accessibility.stories.tsx [novo] - checklist

Progresso:
  [ ] Button acessível
  [ ] Input acessível
  [ ] Select acessível
  [ ] Checkbox acessível
  [ ] Radio acessível
  [ ] Story criada
  [ ] Contraste validado
  [ ] PR aberto
  [ ] Merged
```

**Próximo**: Na semana 2, abra RUN_SPRINT2.md → Seção "Issue #7 (B4)"

---

### 5️⃣ #8 (D2) – Storybook Addon A11y
```
Status:     🟡 Pronto (após #7)
Estimativa: 2-3 dias
Prioridade: ⭐⭐ MEDIUM
Bloqueador: B4 ✅ (acessibilidade)
Desbloqueador: Validação automática, CI a11y

Artefatos:
  - domains/storybook/package.json [edit] - instalação
  - domains/storybook/.storybook/main.ts [edit] - addon config
  - README atualizado com docs de uso

Progresso:
  [ ] Addon instalado
  [ ] Configurado em main.ts
  [ ] Aparece em Storybook
  [ ] Audits automáticos executam
  [ ] Documentação escrita
  [ ] PR aberto
  [ ] Merged
```

**Próximo**: Final da semana 2, abra RUN_SPRINT2.md → Seção "Issue #8 (D2)"

---

## 🔗 Dependências Visuais

```
G6 (CONTRIBUTING)      G4 (SCRIPT)
 ↓                      ↓
 └─────────────────────┘
        ↓ (independente)
        
C2 (SIDEBAR) ← C1 ✅ (API)
 ↓ (habilita navegação)
 └─→ E1 (jornada) [próximo sprint]

B4 (A11Y DS) ← B1 ✅ (componentes)
 ↓ (obrigatório)
 └─→ D2 (ADDON A11Y)
      ↓ (valida)
      └─→ WCAG AA compliance

[CRÍTICO]: C2 é bloqueador para E1
[IMPORTANTE]: B4 + D2 completam acessibilidade
[BÔNUS]: G6 + G4 melhoram documentação + governança
```

---

## ✅ Critérios de Sucesso (Por Issue)

### #10 (G6)
- [ ] CONTRIBUTING.md existe em root
- [ ] Seções: Setup, Workflow, Convenções, Checklist
- [ ] Link em README.md apontando
- [ ] Nenhum erro de lint
- [ ] GitHub Actions ✅

### #6 (C2)
- [ ] Sidebar renderiza lista do `/api/pages`
- [ ] Clicar em página abre no editor
- [ ] Criar página nova funciona
- [ ] Deletar página funciona
- [ ] Story no Storybook
- [ ] Sem regressão P0
- [ ] GitHub Actions ✅

### #9 (G4)
- [ ] Script em `scripts/gen-journeys-index.js`
- [ ] `pnpm gen:journeys` executa
- [ ] `domains/JOURNEYS.md` gerado
- [ ] Índice é atualizado/versionado
- [ ] Sem erros
- [ ] GitHub Actions ✅

### #7 (B4)
- [ ] Button: foco visível, ARIA OK
- [ ] Input: label + aria-describedby
- [ ] Select/Checkbox/Radio: Tab funciona
- [ ] Todos: contraste ≥ 4.5:1
- [ ] Story a11y checklist
- [ ] Sem regressão P0
- [ ] GitHub Actions ✅

### #8 (D2)
- [ ] Addon @storybook/addon-a11y instalado
- [ ] Configurado em .storybook/main.ts
- [ ] Aparece em Storybook UI
- [ ] Audits rodam automaticamente
- [ ] Relatório acessível
- [ ] Documentação escrita
- [ ] GitHub Actions ✅

---

## 📊 Métricas de Sucesso (Sprint 2)

| Métrica | Meta | Atual | Status |
|---------|------|-------|--------|
| Issues P1 Completed | 5/5 | 0/5 | 🔄 Em progresso |
| Build Time | <180s | ~120s | ✅ OK |
| Lint Errors | 0 | 0 | ✅ OK |
| Type-check Errors | 0 | 0 | ✅ OK |
| P0 Regressions | 0 | 0 | ✅ OK |
| Code Coverage | N/A | N/A | ⏳ Próximo sprint |
| Accessibility Score | WCAG AA | Em progresso | 🔄 B4+D2 |

---

## 🚨 Riscos Identificados

| Risco | Prob. | Impacto | Mitigação |
|-------|-------|--------|-----------|
| Sidebar complexo com Puck | Baixa | Médio | Testar early, isolado |
| A11y é difícil implementar | Média | Alto | Usar checklist, ferramentas |
| Addon breaking changes | Baixa | Médio | Fixar versão package.json |
| Índice script fragil | Baixa | Baixo | Testes manuais, validar |
| Integração Layout C2 | Média | Médio | Prototipar early |

**Mitigação**: Todos os riscos têm plano de resposta em `docs/sprint-2-planning.md`

---

## 🎬 Workflow Padrão (Cada Issue)

```bash
# 1. Criar branch
git checkout main
git pull origin main
git checkout -b feature/{issue-code}-{description}
# Exemplo: feature/g6-contributing-guide

# 2. Desenvolvér (seguir seção específica em RUN_SPRINT2.md)
# Arquivos, testes, validação local

# 3. Validar
pnpm build    # sem erros
pnpm lint     # sem warnings críticos
pnpm -r type-check  # sem erros TS

# 4. Commit
git add <files>
git commit -m "feat|docs|ci: descrição (issue #XX)"

# 5. Push
git push -u origin feature/{...}

# 6. GitHub: Abrir PR
# Title: "Type: Descrição (issue #XX)"
# Body: "Closes #XX" + acceptance criteria

# 7. Aguardar
# GitHub Actions (sprint-2-validation.yml) roda automaticamente
# Esperado: ✅ setup, validations, report

# 8. Merge (após aprovação)
# GitHub: "Squash and merge"

# 9. Atualizar Kanban
gh project item-edit --id <ITEM_ID> --field-value "Done"
```

---

## 📞 Contatos e Escalação

- **Dúvidas código**: Abra issue em GitHub
- **Bloqueador crítico**: Mensagem no Slack/Teams
- **Feedback design**: Comentário em PR
- **Documentação**: Editar inline ou comentário

---

## 🔄 Próximas Ações

1. **Agora**: Abra `RUN_SPRINT2.md`
2. **Setup**: Siga os 3 passos de instalação
3. **Escolha**: Comece com #10 (G6)
4. **Progresso**: Atualize este arquivo com status real
5. **Feedback**: Registre impedimentos aqui para retrospectiva

---

## 📚 Documentação Relacionada

- **RUN_SPRINT2.md** ← Comece aqui! (você está em SPRINT2_STATUS.md)
- **SPRINT2_QUICK_START.md** (5 min setup)
- **docs/sprint-2-planning.md** (contexto completo)
- **docs/sprint-2-execution-prompt.md** (scripts detalhados)
- **docs/backlog.md** (roadmap geral)

---

## ✨ Lembre-se

- 🎯 Foco: Uma issue de cada vez
- 🧪 Teste: Local antes de PR
- 📝 Documente: Atualize stories/README
- 🔄 Revise: Passe por checklist antes de mergear
- 🚀 Valide: GitHub Actions é seu amigo

**Pronto? Vá para RUN_SPRINT2.md! 🚀**

---

*Gerado por: GitHub Copilot Agent*  
*Data: 2025-11-22*  
*Próxima atualização: 2025-11-29 (fim semana 1)*
