# GitHub Actions Guide – Fase 2 Automation

## Overview

Automatizações implementadas em Fase 2:

| Workflow | Trigger | Função |
|----------|---------|--------|
| uto-request-changes.yml | Código com console.error | Request changes |
| uto-assign-pr.yml | PR aberta | Assign automático |
| uto-close-stale.yml | Schedule (weekly) | Fechar PRs inativas |
| 
otify-team.yml | PR opened/closed | Notificar team |

## Logs & Debugging

Ver logs de um workflow:
`ash
gh run list --workflow sprint-2-validation.yml --limit 5
gh run view <RUN_ID> --log
`

## Performance

Tempo esperado por job:
- Build: ~15-20s
- Lint: ~10s
- Type-check: ~20s
- Total: ~45-60s

---

**Referência**: PHASE2_PROMPT.md
