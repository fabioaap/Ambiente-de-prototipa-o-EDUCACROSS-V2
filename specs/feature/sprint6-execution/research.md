# Research (Phase 0)

## Clarifications & Decisions

### Escopo da feature / fonte da spec
- **Decisão:** Usar `specs/feature/sprint6-execution/spec.md` como fonte única: P1 (CI/CD, TS warnings 0, 76/76 testes), P2 (Playwright E2E ≥80%, Sentry, GA/Mixpanel, templates de documentação, CSV/JSON/XML), P3 (Progress, Leaderboard, DropZone opcional, journeys BackOffice/FrontOffice/Game Hub, índice de jornadas).
- **Racional:** Spec presente e priorizada por fase/nível; Constituição exige rastreabilidade e alinhamento a spec.
- **Alternativas consideradas:** Manter foco em Gestor de Redes; rejeitado por não estar na spec e reduzir cobertura Sprint 6.

### Cobertura de testes e ferramentas
- **Decisão:** Vitest (unit) com cobertura ≥95% e sem testes pulados; Playwright 3 browsers com cobertura E2E ≥80% e artefatos (screenshot/vídeo) em falha; Storybook play para componentes novos (Progress, Leaderboard).
- **Racional:** Alinha a NFR-Q1/Q2 e ACs de US2.1; CI já usa Vitest e Playwright é requerido (multi-browser).
- **Alternativas consideradas:** Limitar a Chromium; rejeitado, AC exige 3 browsers.

### Performance e SLAs
- **Decisão:** Adotar NFRs da spec: Page load ≤2s; API GET <200ms / POST <500ms; Storybook build <90s; interação Studio <100ms; bundle main <500KB gz e peso total <2MB.
- **Racional:** NFR-P1–P5 explícitos; orientam otimizações de build, chunking e perf de páginas/journeys.
- **Alternativas consideradas:** Marcas qualitativas sem números; rejeitado, spec define metas mensuráveis.

### Observabilidade e segurança
- **Decisão:** Integrar Sentry com filtros de PII, source maps e alertas >10/h; GA4 ou Mixpanel para page views + eventos chave (dashboard load, criar/editar/publish página, export CSV/JSON/XML); garantir OWASP Top 10 e npm audit sem vulnerabilidades altas; logs sem tokens/PII.
- **Racional:** Atende US2.2/US2.3 e NFR-S1–S4; Constituição requer telemetria tipada e dashboards observáveis.
- **Alternativas consideradas:** Apenas GA sem Sentry; rejeitado, US2.2 é obrigatório.

### UI / Design System
- **Decisão:** Criar Progress e Leaderboard em `packages/design-system` com CSS Modules + tokens; exportar em `src/index.ts`; stories em `domains/storybook`; usar Progress dentro de Leaderboard; registrar no Puck se aplicável.
- **Racional:** US3.1/US3.2 exigem novos componentes e integração com tokens/Storybook.
- **Alternativas consideradas:** Implementar só nas journeys; rejeitado, violaria “Single Design System Surface”.

### Journeys e documentação
- **Decisão:** Implementar BackOffice (login, dashboard, perfil), FrontOffice onboarding (5 telas com Leaderboard), Game Hub (catálogo, detalhe, leaderboard global) usando somente design-system; atualizar README/notas/links e gerar `domains/INDEX.md` via `pnpm gen:journeys` + tagging Sprint 6.
- **Racional:** US3.4–US3.7 pedem jornadas completas e índice; Constituição exige rastreabilidade.
- **Alternativas consideradas:** Documentar parcialmente; rejeitado, ACs requerem README e diagramas.

### CSV/JSON/XML export/import
- **Decisão:** Disponibilizar seleção de formato (CSV/JSON/XML) com validação de schema; JSON conforme OpenAPI; XML validado por XSD quando aplicável; erros detalham formato/linha/campo; testes por formato.
- **Racional:** US2.5 AC1–AC6; alinhado a Typed APIs principle.
- **Alternativas consideradas:** CSV-only ou JSON-only; rejeitado por AC.

### Puck DropZone
- **Decisão:** Integrar `@measured/puck/DropZone` como melhoria opcional; habilitar placeholders visuais e schema de zonas; sem console errors; docs com exemplo.
- **Racional:** US3.3 é opcional (P2) mas listado; mantém paridade Studio.
- **Alternativas consideradas:** Adiar; pode ser postergado se tempo estourar, mas manter pronto no plano.

### Templates de documentação
- **Decisão:** Criar templates de jornada, feature spec e API doc; migrar ≥3 journeys para o novo template; opcional script gerador.
- **Racional:** US2.4 AC1–AC5; reforça Automation-First Quality Gates.
- **Alternativas consideradas:** Só atualizar journeys tocadas; rejeitado, AC exige migração de 3+.
