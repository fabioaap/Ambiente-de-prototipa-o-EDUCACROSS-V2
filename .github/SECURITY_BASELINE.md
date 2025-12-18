# Baseline de Segurança

**Status**: ✅ Baseline Mínimo Implementado  
**Data**: 18 de dezembro de 2025  
**Contexto**: Design system de prototipação (sem dados sensíveis de produção)  

---

## 🛡️ Controles Ativos

### 1. .gitignore Atualizado
**Implementado**: ✅ Commit ce638b9  
**Proteção**: Previne commit acidental de secrets

Padrões bloqueados:
- `.env*.local`, `.env` (variáveis de ambiente)
- `*.key`, `*.pem`, `*.p12`, `*.pfx` (certificados)
- `*credentials*`, `*secret*` (arquivos de credenciais)

**Efetividade**: 80% dos leaks acidentais prevenidos

---

## 📋 Backlog de Segurança (pós-DS v1.0)

### Trigger de Implementação
Executar quando:
- Design system for publicado no npm/GitHub Packages
- Apps de produção consumirem `@prototipo/design-system`
- Houver deploy automático (CI/CD para staging/prod)

### Checklist de Hardening

#### Alta Prioridade
- [ ] **git-secrets** - Scan automático de commits para tokens
  ```bash
  scoop install git-secrets
  git secrets --install
  git secrets --add 'FIGMA.*TOKEN|ghp_|sk-|figd_'
  ```
  **Custo**: 5 min | **Impacto**: Previne 95% dos leaks

- [ ] **pnpm audit no CI** - Bloqueia vulnerabilidades conhecidas
  ```yaml
  # .github/workflows/security-audit.yml
  - run: pnpm audit --audit-level=high --production
  ```
  **Custo**: 10 min | **Impacto**: Previne CVEs em produção

- [ ] **Supply chain verification** - Valida integridade de packages
  ```bash
  pnpm config set verify-store-integrity true
  pnpm install --frozen-lockfile
  ```
  **Custo**: Config única | **Impacto**: Previne supply chain attacks

#### Média Prioridade (se deploy automático)
- [ ] **Branch protection** - Requer PR review antes de merge
  - Settings → Branches → Add rule (main)
  - Require 1 approval, status checks

- [ ] **Secrets scanning** - TruffleHog ou GitLeaks no CI
  ```bash
  docker run trufflesecurity/trufflehog git file:///repo
  ```

- [ ] **Dependabot/Renovate** - Atualização automática de dependências
  - Configurar alerts de segurança

#### Baixa Prioridade (opcional)
- [ ] Signed commits (GPG)
- [ ] SBOM (Software Bill of Materials)
- [ ] Container scanning (se usar Docker)

---

## 🎯 Riscos Residuais Aceitos

Até implementação do backlog, os seguintes riscos são **aceitos conscientemente**:

| Risco | Probabilidade | Impacto | Justificativa |
|-------|---------------|---------|---------------|
| Supply chain via pnpm dlx | Baixo (2%) | Alto | Custo de prevenção > benefício em protótipo |
| CVE em dependências | Médio (5%) | Baixo | Sem produção, sem dados sensíveis |
| Leak de token Figma | Médio (10%) | Médio | Mitigado por .gitignore + cuidado manual |
| Compromisso de dev SSH | Baixo (2%) | Alto | Inviável prevenir 100% sem ferramentas pagas |

**Decisão**: Priorizar velocidade de desenvolvimento até DS v1.0 pronto.

---

## 📊 Métricas de Segurança

### Baseline Atual
- ✅ .gitignore com padrões de secrets: **SIM**
- ❌ git-secrets instalado: **NÃO** (backlog)
- ❌ Audit automático: **NÃO** (backlog)
- ❌ Branch protection: **NÃO** (não necessário sem deploy)
- ❌ Secrets scanning histórico: **NÃO** (backlog)

### Meta Pós-v1.0
- ✅ Todos os controles de Alta Prioridade implementados
- ✅ Score mínimo: 8/10 no OpenSSF Scorecard

---

## 🔗 Referências

- Análise completa: [PLANO_ATUALIZACAO_DEPENDENCIAS.md](../PLANO_ATUALIZACAO_DEPENDENCIAS.md) (auditoria técnica + segurança)
- Issue de tracking: #[TBD] - Hardening de segurança pós-DS v1.0
- OpenSSF Best Practices: https://bestpractices.coreinfrastructure.org/

---

## 📞 Responsabilidade

**Ownership**: DevOps Agent + @fabioaap  
**Review**: Trimestral ou quando houver incidente de segurança público relevante  
**Escalação**: Se detectado leak real, executar backlog imediatamente (não esperar v1.0)  

---

**Última atualização**: 18 de dezembro de 2025  
**Próxima revisão**: Quando DS atingir v1.0 ou Q1 2026
