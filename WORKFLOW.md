# WORKFLOW.md – Processo de Merge & Rotina

## 1. Classificação de PRs (Labels)

| Label | Descrição | Ação |
|-------|-----------|------|
| sprint2-p1 | Critical features | Merge ASAP |
| sprint2-p2 | Dashboard | Merge após P1 |
| documentation | Documentação | Pode mergear independente |
| utomation | Scripts/CI-CD | Merge se validado |
| eady-to-merge | Pronto para auto-merge | Trigger automático |

## 2. Checklist Pré-Merge

- [ ] **Build**: pnpm build (0 erros)
- [ ] **Lint**: pnpm lint (0 critical warnings)
- [ ] **Type-check**: pnpm -r type-check (0 errors)
- [ ] **Testes**: Passando (se houver)
- [ ] **Documentação**: Atualizada (README, ADR, etc)
- [ ] **Changelog**: Preenchido

## 3. Auto-Merge Triggers

Auto-merge será **acionado automaticamente** quando TODAS as condições forem atendidas:

✅ Todos os checks passarem (build + lint + type-check)  
✅ PR aprovada por pelo menos 1 reviewer  
✅ Label "ready-to-merge" adicionado  
✅ Nenhum conflito com main  
✅ Sem 'console.error' ou TODO críticos no código  

## 4. Processo de Merge (Passo a Passo)

`
1. Developer cria PR (feature branch)
   ↓
2. GitHub Actions (sprint-2-validation.yml)
   • Compila código
   • Roda lint
   • Roda type-check
   • Reporta resultados
   ↓
3. PR reviewer aprova
   ↓
4. Developer adiciona label "ready-to-merge"
   ↓
5. GitHub Actions (auto-merge trigger)
   • Verifica se tudo OK
   • Se SIM → Squash merge automático
   • Se NÃO → Aguarda correção
   ↓
6. Notification ao team (PR merged!)
`

## 5. Script Úteis

| Script | Função |
|--------|--------|
| .\scripts/auto-merge-prs.ps1 | Auto-merge PRs com "ready-to-merge" |
| .\scripts/validate-pr-before-merge.ps1 | Validar PR antes de mergear |
| .\scripts/manage-github-labels.ps1 | Criar/gerenciar labels |

## 6. Exemplos de Uso

### Exemplo 1: Mergear PR crítica
`powershell
# 1. PR criada e passa em todos os checks
# 2. Reviewer aprova
# 3. Adicionar label:
gh pr edit <PR_NUMBER> --add-label "ready-to-merge"

# 4. Auto-merge acontece automaticamente!
`

### Exemplo 2: Mergear múltiplas PRs
`powershell
# Script faz tudo:
.\scripts/auto-merge-prs.ps1 -Label sprint2-p1
`

## 7. Regras Importantes

⚠️ **NÃO mergear** se:
- Build falhar
- Lint tiver warnings críticos
- Type-check tiver erros
- PR não tiver descrição clara
- Conflito com main

✅ **SEMPRE mergear** se:
- Todos os checks OK
- PR aprovada
- Label "ready-to-merge" adicionado
- Sem bloqueadores técnicos

## 8. Dashboard de PRs

Ver status de todas as PRs:
`ash
gh pr list --state open --limit 100
`

Ver apenas PRs prontas para merge:
`ash
gh pr list --label "ready-to-merge" --state open
`

## 9. Troubleshooting

### Problema: "Auto-merge failed"
- [ ] Verificar conflitos com main: git merge main
- [ ] Revalidar: pnpm build && pnpm lint && pnpm -r type-check
- [ ] Adicionar label novamente

### Problema: "Build failing"
- [ ] Rodar localmente: pnpm build
- [ ] Verificar logs no GitHub Actions
- [ ] Fix + commit + push (auto-revalidará)

---

**Última Atualização**: 2025-11-22  
**Próxima Review**: Após conclusão de Fase 2
