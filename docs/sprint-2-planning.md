# Sprint 2 – Planejamento e Roadmap

**Data**: 2025-11-22  
**Duração**: ~2 semanas (2025-11-22 a 2025-12-06)  
**Objetivo**: Navegação, acessibilidade e governança documentada

---

## 📊 Resumo Executivo

Após a conclusão da Sprint 1 (P0) com sucesso, a Sprint 2 (P1) foca em **melhorar a experiência do usuário** no Studio e **documentar como contribuir** ao projeto.

| Métrica | Sprint 1 | Sprint 2 |
|---------|---------|---------|
| Issues P0 | 5 | — |
| Issues P1 | — | 5 |
| Bloqueadores | 0 | 0 |
| Build Time | ~120s | ~120s (esperado) |
| Code Coverage | N/A | N/A |

---

## 🎯 Issues Prioritárias

### 1. **#6 (C2) – Studio: Lista de páginas no sidebar** ⭐ HIGH
**Prioridade**: Alta  
**Estimativa**: Medium (3-4 dias)  
**Bloqueador para**: Navegação no Studio, E1 completo

**Escopo**:
- Carregar lista de páginas salvas do `/api/pages`
- Exibir no sidebar com ações CRUD (criar, deletar, renomear)
- Integrar com route dinâmica `[...slug]`
- Story no Storybook

**Aceitação**:
- [ ] Sidebar renderiza lista de páginas
- [ ] Clicar em página abre no editor
- [ ] Botão "+" cria nova página
- [ ] Botão "×" deleta página
- [ ] Renomear página funciona ou é bloqueado com msg clara
- [ ] Testes manuais: criar → editar → deletar página

**Dependências**: C1 ✅ (API pronta)

---

### 2. **#10 (G6) – CONTRIBUTING.md** ⭐ HIGH
**Prioridade**: Alta  
**Estimativa**: Small (1-2 dias)  
**Bloqueador para**: Onboarding de novos contribuidores

**Escopo**:
- Guia de setup local (Node, pnpm, git)
- Como rodar dev servers (`pnpm dev:studio`, `pnpm dev:storybook`)
- Como criar uma jornada (template referenciado)
- Convenções: commits, labels, branches
- Checklist antes de abrir PR

**Aceitação**:
- [ ] CONTRIBUTING.md criado em root
- [ ] Instruções testadas (alguém novo consegue setup)
- [ ] Exemplos de PR title/message
- [ ] Link no README.md apontando para CONTRIBUTING.md

**Dependências**: Nenhuma (pode ser paralelo)

---

### 3. **#9 (G4) – Script gerador de índice de jornadas** ⭐ MEDIUM
**Prioridade**: Média  
**Estimativa**: Medium (2-3 dias)  
**Bloqueador para**: Governança de jornadas

**Escopo**:
- Script `pnpm gen:journeys` que varre `domains/*/journeys/*/README.md`
- Gera `domains/JOURNEYS.md` ou `domains/INDEX.md` com índice centralizado
- Cada jornada lista objetivo, links para Studio, componentes usados

**Aceitação**:
- [ ] Script criado em `scripts/gen-journeys-index.js`
- [ ] `pnpm gen:journeys` executa sem erros
- [ ] Índice atualiza automaticamente
- [ ] Índice é versionado no git (comittado)

**Dependências**: Nenhuma

---

### 4. **#7 (B4) – Design System: Acessibilidade** MEDIUM
**Prioridade**: Média  
**Estimativa**: Large (4-5 dias)  
**Bloqueador para**: Publicação, acessibilidade de produção

**Escopo**:
- Melhorar todos os componentes do DS com:
  - ARIA roles apropriadas (`role="button"`, `aria-label`, etc.)
  - Foco visível (`:focus-visible` em botões, inputs, links)
  - Contraste mínimo WCAG AA (4.5:1 textos, 3:1 gráficos)
  - Navegação por teclado (Tab, Enter, Escape)
- Adicionar checklist de a11y no Storybook
- Documentar em README do DS

**Aceitação**:
- [ ] Button: foco visível, aria-label em ícones
- [ ] Input: label + aria-describedby para erros
- [ ] Select/Checkbox/Radio: navegação por teclado funciona
- [ ] Todos os componentes passam em contraste (ferramenta axe/pa11y)
- [ ] Story de a11y checklist no Storybook

**Dependências**: B1 ✅ (componentes existem)

---

### 5. **#8 (D2) – Storybook: Addon A11y** MEDIUM
**Prioridade**: Média  
**Estimativa**: Medium (2-3 dias)  
**Bloqueador para**: Validação contínua de a11y

**Escopo**:
- Instalar e configurar `@storybook/addon-a11y`
- Adicionar em `apps/storybook/.storybook/main.ts`
- Verificar se componentes do DS passam em checks automáticos
- Documentar como rodar audits no Storybook

**Aceitação**:
- [ ] Addon instalado e aparece em Storybook
- [ ] Audits executam automaticamente nas stories
- [ ] Relatório mostra violações (se houver)
- [ ] Documentação de como corrigir violações

**Dependências**: B4 (melhorias de a11y)

---

## 📈 Dependências Entre Issues

```
G6 (CONTRIBUTING.md)  [Independente]
    └─ usado por: novos contribuidores
    
G4 (Índice jornadas) [Independente]
    └─ usado por: governança

C2 (Sidebar)  ← C1 ✅
    └─ habilita: navegação no Studio
    └─ necessário para: E1 completo

B4 (Acessibilidade DS) [Paralelo com C2]
    └─ necessário para: D2

D2 (Addon A11y) ← B4
    └─ valida: acessibilidade
```

**Caminho Crítico**: C2 (navbar) → E1 (jornada BackOffice completa)

---

## 🗓️ Timeline Sugerida

### Semana 1 (2025-11-22 a 2025-11-28)
- **#10 (G6)** – CONTRIBUTING.md (dias 1-2) ✓ Pronto rápido
- **#6 (C2)** – Sidebar (dias 2-5) ✓ Paralelo com próximo
- **#9 (G4)** – Script índice (dias 3-4) ✓ Paralelo

### Semana 2 (2025-11-29 a 2025-12-06)
- **#7 (B4)** – Acessibilidade DS (dias 6-9) ✓ Maioria do esforço
- **#8 (D2)** – Addon A11y (dias 9-11) ✓ Após B4

**Margem**: ~1 dia para testes e ajustes finais

---

## ✅ Critérios de Aceitação Globais (Sprint 2)

- [ ] Nenhuma issue P0 regressão (C1, B1, D1, F1 continuam funcionando)
- [ ] Build + Lint passam em todos os workspaces
- [ ] Storybook carrega e mostra stories de todos os componentes
- [ ] Studio inicia sem erros (porta 3000)
- [ ] Sidebar C2 funciona (pode listar e criar páginas)
- [ ] CONTRIBUTING.md existe e é claro
- [ ] Addon A11y instalado e funcionando
- [ ] Nenhum `console.error` em dev

---

## 🚨 Riscos e Mitigações

| Risco | Probabilidade | Impacto | Mitigação |
|-------|--------------|--------|-----------|
| Acessibilidade complexa de implementar | Média | Alto | Quebrar B4 em sub-tarefas, usar checklist |
| Sidebar conflita com Puck | Baixa | Médio | Testar integração cedo com Puck |
| Script gen-journeys fragil | Baixa | Baixo | Usar `fs.promises`, testes manuais |
| A11y Addon breaking changes | Baixa | Médio | Fixar versão no package.json |

---

## 📞 Comunicação

- **Daily standup**: Breve sincronização de bloqueadores
- **Mid-sprint check**: Dia 5 (quinta-feira)
- **Demo**: Sexta-feira (2025-11-29 ou 2025-12-06)
- **Retro**: Próxima segunda (2025-12-08) – 10 min, foco em velocity

---

## 🔄 Próximas Ações

1. **Imediato**: Colocar as 5 issues em "In Progress" no kanban
2. **Dev**: Começar por #10 (G6) e #6 (C2) em paralelo
3. **QA**: Testes de regressão em C1 (API ainda funciona)
4. **PM**: Validar escopo com time, confirmar estimativas

---

**Planejado por**: GitHub Copilot Agent  
**Data**: 2025-11-22  
**Status**: 🟢 Pronto para execução

