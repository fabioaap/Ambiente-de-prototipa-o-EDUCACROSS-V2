# Feature Specification: Dashboard Hydration Resilience

**Feature Branch**: `001-dashboard-hydration`  
**Created**: 2025-11-25  
**Status**: Draft  
**Input**: User description captured from console session documenting hydration warnings when running `pnpm --filter studio dev` and opening `http://localhost:3000/dashboard`.

## Clarifications

### Session 2025-11-25

- Q: What evidence is required to prove `/dashboard` stays aligned com a estética dos componentes Shadcn? → A: Realizar uma auditoria estática garantindo que `domains/studio/src/app/dashboard` importe apenas primitives aprovadas e anexar screenshots antes/depois mostrando o layout final com o visual Shadcn.

## User Scenarios & Testing *(mandatory)*

Each journey cites `domains/BackOffice/journeys/Dashboard`, Studio slug `dashboard`, and the `/dashboard` route inside `domains/studio/src/app/dashboard/page.tsx` plus `domains/studio/src/app/layout.tsx` where the `<html>` attributes currently diverge.

### User Story 1 - Dashboard loads without hydration mismatch (Priority: P1)

BackOffice gestores acessam `http://localhost:3000/dashboard` (Studio slug `dashboard`) e precisam ver KPIs sem o console do navegador disparar erros de hidratação quando extensões como “Fusion” injetam a classe `fusion-extension-loaded` no elemento `<html>`.

**Why this priority**: Esse é o fluxo diário descrito em `domains/BackOffice/journeys/Dashboard` e bloqueia QA, pois o React aborta hot reload e impede validação visual.

**Independent Test**: Abra o dashboard com e sem a extensão ativa, atualize a página 5x e verifique (via inspeção de console ou script automatizado) que não há logs `A tree hydrated...` relacionados ao layout.

**Acceptance Scenarios**:

1. **Given** o Studio rodando via `pnpm --filter studio dev`, **When** o usuário acessa `/dashboard` com extensões que acrescentam classes ou atributos no `<html>`, **Then** o DOM hidratado mantém os mesmos atributos (ou ignora com segurança os extras) e não há erros no console.
2. **Given** um ambiente limpo sem extensões, **When** o usuário faz refresh rápido (Ctrl+R) cinco vezes, **Then** nenhuma diferença de hidratação é logada e os widgets (KPIs, saúde, páginas recentes) continuam visíveis.

---

### User Story 2 - Observabilidade sinaliza divergências estruturais (Priority: P2)

QA e desenvolvedores precisam receber sinalização proativa quando qualquer hidratação incorreta reaparecer durante regressões de `domains/studio/src/app/layout.tsx` ou `/dashboard`, para que possam comparar snapshots `serverAttributes` vs `clientAttributes` sem depender do console local.

**Why this priority**: Mantém rastreabilidade com `docs/qa-dashboard-testing.md` e evita que erros silenciosos cheguem aos playbooks em `SPRINT3_HEALTH_INDICATORS_REPORT.md`.

**Independent Test**: Injetar propositalmente uma diferença (ex.: `data-test` diferente entre server/client) em ambiente de teste deve gerar um evento observável (log estruturado ou métrica) sem quebrar o usuário final.

**Acceptance Scenarios**:

1. **Given** o dashboard em modo dev, **When** ocorre qualquer `onRecoverableError` de hidratação nas rotas monitoradas, **Then** um log com ID correlacionado (mesmo formato do dashboard Logger) aparece e pode ser filtrado nos relatórios QA sem causar crash.
2. **Given** o cenário automatizado de validação citado em `SPRINT3_HEALTH_INDICATORS_REPORT`, **When** roda o fluxo “dashboard-hydration”, **Then** falha caso o console tenha mensagens de mismatch.

---

### User Story 3 - Documentação e QA cobrem extensões e redes lentas (Priority: P3)

O time de QA precisa de instruções claras em `docs/qa-dashboard-testing.md` e `domains/BackOffice/journeys/Dashboard/README.md` sobre como validar o dashboard quando o navegador possui extensões que injetam CSS/JS e quando a rede está lenta (caso descrito no log `Slow network is detected`).

**Why this priority**: Reduz incidentes “false positive” relatados por QA e garante que o índice de journeys menciona o comportamento resiliente.

**Independent Test**: Atualizar a documentação, rodar o checklist QA e confirmar que existe um passo específico para habilitar/desabilitar extensões, bem como verificar skeletons em redes lentas.

**Acceptance Scenarios**:

1. **Given** o checklist de QA atualizado, **When** um novo QA segue o guia passo a passo, **Then** consegue reproduzir (e confirmar ausência de) warnings de hidratação tanto com quanto sem extensões.
2. **Given** o dev server com `--turbo` e throttling “Slow 3G” configurado, **When** o dashboard é aberto, **Then** skeletons são exibidos, os dados chegam e nenhum log `A tree hydrated...` aparece.

---

### Edge Cases

- Extensões ou scripts corporativos que adicionam classes/atributos no `<html>` ou `<body>` antes da hidratação (ex.: `fusion-extension-loaded`); precisamos normalizar/filtrar antes de comparar server vs client.
- Sessões em rede lenta aceleradas por `chrome-extension://...` que atrasam o carregamento das fontes Roboto listadas no log; o fallback de fontes não pode gerar divergência de layout que quebre o React.
- APIs `/api/dashboard/summary` retornando dados diferentes entre o tempo de build e o primeiro fetch do cliente; o checksum de layout não deve depender de valores dinâmicos (datas/`Date.now()`), evitando novas divergências.
- Hot reload do Next que reaplica `layout.tsx` enquanto o usuário está em `/dashboard`: precisamos garantir `suppressHydrationWarning` ou equivalente apenas onde necessário para não esconder erros reais de componentes filhos.

## Requirements *(mandatory)*

Constitution alignment: alterações concentram-se em `domains/studio/src/app/layout.tsx`, `domains/studio/src/app/dashboard/page.tsx`, `docs/qa-dashboard-testing.md` e métricas `dashboardLogger`. Devem respeitar o Design System Shadcn (já permitido para Dashboard/Studio) e manter contratos tipados de `/api/dashboard/summary` apenas como consumidores (sem mudar payloads).

### Functional Requirements

- **FR-001**: O elemento `<html>` definido em `domains/studio/src/app/layout.tsx` deve produzir uma lista determinística de atributos (lang, data-theme, classes) independente do ambiente cliente, para evitar divergências com atributos injetados por extensões.
- **FR-002**: O layout deve normalizar classes externas — seja filtrando-as antes da renderização ou aplicando `suppressHydrationWarning` apenas no nível `<html>` — garantindo que componentes Shadcn (`Card`, `Badge`, `Progress`, `Button`) continuem obedecendo ao mesmo tree.
- **FR-003**: `/dashboard` deve registrar via `dashboardLogger` (ou telemetry equivalente) qualquer evento `onRecoverableError` de hidratação, incluindo `serverAttributes`, `clientAttributes` e `correlationId`, sem interromper o usuário final.
- **FR-004**: Deve existir um teste automatizado (end-to-end ou integração) que falha quando o console contém mensagens de hidratação durante o carregamento do slug `dashboard`.
- **FR-005**: A documentação em `docs/qa-dashboard-testing.md` e em `domains/BackOffice/journeys/Dashboard/README.md` deve incorporar passos para habilitar/desabilitar extensões, aplicar throttling de rede e capturar evidências visuais.
- **FR-006**: Estados de loading, erro e sucesso do dashboard precisam continuar usando apenas componentes de `@prototipo/design-system`/Shadcn aprovados; quaisquer novos wrappers devem ser registrados em `domains/studio/src/config/puck.config.tsx` se forem expostos ao Studio, e cada entrega deve comprovar isso com (a) auditoria estática de imports em `domains/studio/src/app/dashboard` e (b) screenshots antes/depois demonstrando o visual Shadcn.
- **FR-007**: O mecanismo de fetch (`useEffect` + fetch ou `useDashboardSummary`) deve apresentar fallback determinístico (ex.: placeholders de data) para evitar que timestamps `Date.now()` causem alterações na árvore server/client durante o primeiro render.

### Key Entities *(include if feature involves data)*

- **HydrationSnapshot**: objeto lógico que representa os atributos e metadados coletados no `onRecoverableError` (campos: `route`, `serverAttributes`, `clientAttributes`, `extensionFingerprint`, `timestamp`, `correlationId`). Ajuda a comparar divergências detectadas.
- **DashboardRenderCheck**: resultado do teste automatizado que registra `hasMismatch`, `warnings[]`, `screenshotPath`, `networkProfile` e `extensionProfile`, permitindo anexar aos relatórios QA.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 0 erros de hidratação no console em 95% das 50 execuções consecutivas do cenário automatizado “dashboard-hydration”, tanto com quanto sem a extensão que injeta `fusion-extension-loaded`.
- **SC-002**: Logs estruturados de hidratação (quando ocorrerem) devem conter `correlationId` e serem consumidos pelo pipeline QA em menos de 5 minutos após o evento, permitindo mitigação rápida.
- **SC-003**: Skeletons e cards do dashboard devem renderizar em menos de 400 ms sob rede “Slow 3G” sem induzir divergências visuais perceptíveis aos usuários (verificados por captura automática do pipeline QA).
- **SC-004**: Documentação atualizada reduz os falsos positivos de QA relacionados a hidratação para no máximo 1 item por sprint (baseline atual: relatos em cada rodada).
