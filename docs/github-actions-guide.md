# GitHub Actions Guide – Fase 2 Automation

## Overview

Automatizações implementadas em Fase 2:

| Workflow | Trigger | Função |
|----------|---------|--------|
| `auto-request-changes.yml` | Código com console.error | Request changes |
| `auto-assign-pr.yml` | PR aberta | Assign automático |
| `auto-close-stale.yml` | Schedule (weekly) | Fechar PRs inativas |
| `notify-team.yml` | PR opened/closed | Notificar team |

## Logs & Debugging

Ver logs de um workflow:
```bash
gh run list --workflow sprint-2-validation.yml --limit 5
gh run view <RUN_ID> --log
```

## Performance

Tempo esperado por job:
- Build: ~15-20s
- Lint: ~10s
- Type-check: ~20s
- Total: ~45-60s

---

**Referência**: PHASE2_PROMPT.md
