# Security Checklist - Sprint 6

## OWASP Top 10 Compliance
- [ ] A01 Injection: inputs sanitizados, SQL n/a (mock data), validação de schema no import
- [ ] A02 Broken Auth: not applicable (prototype, no real auth)
- [ ] A03 Broken Access Control: not applicable (prototype)
- [ ] A04 Insecure Design: API validações explícitas, erros não revelam internals
- [ ] A05 Security Misconfiguration: CORS restritivo, headers corretos (CSP, X-Frame-Options)
- [ ] A06 Vulnerable Components: `pnpm audit --prod` sem vulnerabilidades altas
- [ ] A07 Auth Failure: not applicable
- [ ] A08 Data Integrity: CSV/JSON/XML parsing valida schema antes de aceitar
- [ ] A09 Logging Failures: Sentry não loga PII, logs sanitizados
- [ ] A10 SSRF: not applicable (prototype backend-less)

## Dependency Scanning
- [ ] `pnpm audit --prod` passa com 0 vulnerabilidades altas
- [ ] Audit moderadas/baixas documentadas em backlog (aceitas conscientemente)
- [ ] `pnpm-lock.yaml` froze e commited (sem alterações durante build)
- [ ] Dependências de dev não incluídas em bundle produção

## API Security
- [ ] Route handlers validam input (type-check antes de processar)
- [ ] Responses não expõem detalhes internos (generic error messages)
- [ ] Error handling em todos endpoints: 400, 404, 500 com mensagens genéricas
- [ ] Rate limiting considerado (documentado se não implementado)

## Data & Privacy
- [ ] Sentry configurado com `sendDefaultPii: false`
- [ ] Logs não contêm tokens, emails, IPs de usuários (sanitizados)
- [ ] CSV/JSON/XML exports não incluem dados sensíveis fora de escopo
- [ ] Local storage usado apenas para Puck pages (dados não sensíveis)

## HTTP Headers
- [ ] Content-Security-Policy: restritivo (script-src self, style-src self)
- [ ] X-Content-Type-Options: nosniff
- [ ] X-Frame-Options: DENY (ou SAMEORIGIN se iframes necessários)
- [ ] X-XSS-Protection: 1; mode=block
- [ ] Referrer-Policy: strict-origin-when-cross-origin

## Authentication & Authorization
- [ ] Demo prototypes sem autenticação; PMs/designers acessam livremente
- [ ] Componentes sensíveis documentam escopo (e.g., "apenas para BackOffice")
- [ ] Não há secrets em código ou comentários (env vars apenas)

## Environment Variables
- [ ] Secrets (DSNs, tokens) em .env.local, não em repo
- [ ] .env.example documentado com placeholders
- [ ] CI usa secrets via GitHub Secrets ou similar
- [ ] Nenhum secret printado em logs ou console

## Code Review
- [ ] Código novo analisado por peer antes de merge
- [ ] `/spec` passa SpecKit validation
- [ ] Nenhum `@ts-ignore` ou `any` intencionais
- [ ] Comentários explicam por que, não o quê

## Build & Distribution
- [ ] Build artifacts (.next, dist/) incluem source maps
- [ ] Source maps uploados para Sentry (não servidos ao cliente)
- [ ] Bundle analysis: nenhum pacote suspeito, tamanhos esperados
- [ ] Versão de dependências locked em pnpm-lock.yaml

## Test Coverage for Security
- [ ] Unit tests: validação de input (edge cases, boundary values)
- [ ] E2E tests: scenarios adversários (empty input, injection attempts)
- [ ] Error handling: respostas genéricas sem stack traces ao usuário

## Documentation
- [ ] Security policy ou security.md documentado
- [ ] Procedures para reportar vulnerabilidades
- [ ] Compliance checklist assinado antes de release
