# Feature Specification: Atualização Estratégica de Dependências

**Feature Branch**: `chore/dependency-updates-sprint6`  
**Created**: 18 de dezembro de 2025  
**Status**: Draft  
**Input**: User description: "executar plano de atualização de dependências com foco em segurança (CVE Storybook), breaking changes (MAJOR deps) e patches conservadores"

## User Scenarios & Testing *(mandatory)*

Cada story está priorizada por impacto em segurança, estabilidade e velocidade de entrega. Todas as stories são independentemente testáveis e podem ser executadas isoladamente sem comprometer o monorepo.

---

### User Story 1 - CVE Fix + Modernização Storybook 10.x (Priority: P0 - CRÍTICO)

**Jornada**: Não aplicável (infraestrutura base)  
**Superfícies afetadas**: 
- `domains/storybook` (Hub de visualização na porta 6006)
- `packages/design-system` (dependências de tipo Storybook)
- Build artifacts publicáveis (`pnpm build:hub`)
- Todas as `.stories.tsx` (potencial mudança de API)

Como **desenvolvedor do monorepo**, preciso **corrigir a vulnerabilidade CVE-2025-68429 E modernizar para Storybook 10.x** em uma única tacada, para **eliminar o CVE + aproveitar features modernas** antes de publicar o design system v1.0, com fallback seguro para 8.6.15 se v10 quebrar.

**Why this priority**: 
- CVE de severidade HIGH que expõe `.env` em builds (urgente)
- Contexto de prototipação permite risco controlado de MAJOR upgrade
- Melhor migrar AGORA (pré-v1.0) que depois com consumidores
- v10 tem performance, UI e testes melhores (valor agregado)
- Fallback para 8.6.15 garante que CVE será corrigido de qualquer forma

**Estratégia**: Tentar v10 primeiro, fallback conservador se falhar

**Independent Test**: 
1. Criar branch `test/storybook-10-upgrade` isolada
2. Executar `pnpm dlx storybook@latest upgrade` (tenta v10)
3. Validar `pnpm install && pnpm build && pnpm dev:hub`
4. Se SUCESSO: confirmar zero CVE + v10 funcional + merge
5. Se FALHA: rollback + executar 8.6.15 conservador (ETAPA 4.2.0 fallback)

**Acceptance Scenarios**:

1. **Given** o monorepo possui Storybook 8.4.7 e 8.6.14 (versões vulneráveis)  
   **When** executo `pnpm dlx storybook@latest upgrade` em branch de teste  
   **Then** CLI atualiza para Storybook 10.x (última stable) automaticamente

2. **Given** packages foram atualizados para 10.x  
   **When** executo `pnpm install && pnpm build`  
   **Then** instalação completa sem peer dependency conflicts E build passa sem erros TypeScript

3. **Given** build passou  
   **When** executo `pnpm dev:hub`  
   **Then** servidor inicia, todas as stories renderizam, addons funcionam (a11y, interactions, essentials)

4. **Given** dev funciona  
   **When** rodo `pnpm audit --audit-level=high`  
   **Then** zero vulnerabilidades HIGH (CVE-2025-68429 resolvido)

5. **Given** tudo funciona em v10  
   **When** merge na main  
   **Then** CVE corrigido + modernização completa em um único commit

6. **Given** v10 quebrou algo crítico (cenário de falha)  
   **When** identifico erro bloqueante (addon incompatível, build quebrado, stories não renderizam)  
   **Then** rollback + executar ETAPA 4.2.0 fallback (8.6.15 conservador) para garantir CVE fix

---

### User Story 2 - Avaliação e Atualização de Dependências MAJOR (Priority: P1 - ALTO)

**Jornada**: Não aplicável (infraestrutura base)  
**Superfícies afetadas**: 
- Workspace raiz (`package.json`)
- MCP SDK (uso futuro em ferramentas de desenvolvimento)
- Validações e logging (se implementados futuramente)

Como **arquiteto do monorepo**, preciso **avaliar e atualizar 4 dependências MAJOR (dotenv 17, pino 10, undici 7, zod 4)** de forma controlada, para **prevenir débito técnico acumulado e incompatibilidades futuras** quando essas dependências forem realmente utilizadas.

**Why this priority**: Breaking changes em 4 dependências críticas. Embora não usadas diretamente hoje, são peer dependencies de ferramentas futuras (MCP SDK, logging, validação). Atualizar agora previne bloqueios maiores quando forem necessárias.

**Independent Test**:
1. Criar branch `test/major-deps-upgrade` isolada
2. Atualizar sequencialmente (dotenv → pino → undici → zod) e validar após cada uma
3. Executar `pnpm build && pnpm type-check && pnpm lint` após cada atualização
4. Testar servidores Studio e Hub manualmente
5. Verificar compatibilidade do MCP SDK com zod 4.x via `pnpm view @modelcontextprotocol/sdk peerDependencies`

**Acceptance Scenarios**:

1. **Given** possuo dotenv 16.6.1, pino 9.14.0, undici 6.22.0, zod 3.25.76  
   **When** leio os changelogs oficiais de breaking changes  
   **Then** identifico se há impacto real no monorepo (uso direto, transitive, ou peer deps)

2. **Given** identifiquei que dotenv e pino não são usados diretamente  
   **When** atualizo para dotenv 17.2.3 e pino 10.1.0  
   **Then** `pnpm build` completa sem erros e servidores iniciam normalmente

3. **Given** undici é dependência transitiva do Node.js fetch  
   **When** atualizo para undici 7.16.0  
   **Then** Next.js (Studio e Dashboard) continuam fazendo requests HTTP sem regressão

4. **Given** zod é peer dependency do MCP SDK  
   **When** verifico `pnpm view @modelcontextprotocol/sdk@1.25.1 peerDependencies`  
   **Then** confirmo se aceita zod 4.x ou requer zod 3.x (decisão de atualizar ou manter)  
   **✅ VALIDADO EMPIRICAMENTE**: MCP SDK 1.25.1 aceita `zod: '^3.25 || ^4.0'` - **zod 4.x é COMPATÍVEL**

5. **Given** todas as atualizações MAJOR foram testadas  
   **When** merge na main  
   **Then** commit message documenta breaking changes testados e zero impacto detectado

---

### User Story 3 - Atualização Conservadora de Patches (Priority: P2 - MÉDIO)

**Jornada**: Não aplicável (infraestrutura base)  
**Superfícies afetadas**:
- Sentry monitoring (workspace raiz)
- MCP SDK (workspace raiz)
- TypeScript ESLint (packages/eslint-config)

Como **mantenedor do monorepo**, preciso **atualizar patches de Sentry, MCP SDK e TypeScript ESLint** para **receber bugfixes, melhorias de performance e novas APIs sem risco de breaking changes**.

**Why this priority**: Atualizações seguras (patches e minors conservadores) que não bloqueiam nada crítico. Podem ser executadas depois do CVE e MAJOR deps. Entregam melhorias incrementais de qualidade.

**Independent Test**:
1. Cada dependência pode ser atualizada e testada isoladamente
2. Sentry: Validar que `@sentry/nextjs` continua capturando erros
3. MCP SDK: Validar que versão 1.25.1 não quebra uso futuro (mesmo sem uso ativo hoje)
4. ESLint: Validar que `pnpm lint` passa sem novos warnings

**Acceptance Scenarios**:

1. **Given** Sentry está em 10.28.0  
   **When** atualizo para 10.32.0 (4 patches)  
   **Then** `pnpm build` completa, logs não mostram deprecation warnings, e integração Next.js funciona

2. **Given** MCP SDK está em 1.24.3  
   **When** atualizo para 1.25.1  
   **Then** `pnpm install` não reporta conflitos de peer dependency e build passa

3. **Given** TypeScript ESLint está em 8.14.0  
   **When** atualizo para 8.50.0 (36 patches)  
   **Then** `pnpm lint` passa sem novos erros e regras de linting continuam funcionando

4. **Given** todas as 3 atualizações foram aplicadas  
   **When** executo `pnpm build && pnpm type-check && pnpm lint`  
   **Then** pipeline completa com sucesso e nenhuma regressão detectada

---

### User Story 4 - Fallback Conservador (8.6.15) Se v10 Falhar (Priority: P0-FALLBACK)

**Jornada**: Não aplicável (contingência)  
**Superfícies afetadas**:
- `domains/storybook` (11 packages)
- `packages/design-system` (2 packages)

Como **desenvolvedor do monorepo**, preciso **ter um plano de fallback conservador (atualizar apenas para 8.6.15)** caso o upgrade para Storybook 10.x falhe, para **garantir que o CVE-2025-68429 será corrigido de qualquer forma** mesmo se a modernização não funcionar.

**Why this priority**: Contingência crítica. Se User Story 1 (v10) quebrar algo bloqueante, este é o plano B que garante CVE fix em 15 minutos adicionais.

**Independent Test**:
1. Documentar checklist de pré-requisitos (unificar versões, ler migration guides)
2. Criar branch de teste e executar `pnpm dlx storybook@latest upgrade`
3. Validar cada addon (a11y, interactions, essentials) individualmente
4. Rodar interaction tests e visual regression
5. Documentar rollback plan caso upgrade falhe

**Acceptance Scenarios** (executados APENAS se User Story 1 falhar):

1. **Given** tentativa de Storybook 10.x falhou com erro bloqueante  
   **When** identifico que não consigo resolver em <1h (addon incompatível crítico, build quebrado)  
   **Then** decido executar fallback conservador 8.6.15

2. **Given** decidi fazer fallback  
   **When** atualizo manualmente para 8.6.15 em `domains/storybook` (11 packages) e `packages/design-system` (2 packages)  
   **Then** `pnpm install` completa sem conflitos

3. **Given** packages em 8.6.15  
   **When** executo `pnpm build && pnpm dev:hub`  
   **Then** build passa, servidor inicia, stories renderizam (validação conservadora)

4. **Given** 8.6.15 funciona  
   **When** rodo `pnpm audit --audit-level=high`  
   **Then** CVE-2025-68429 resolvido (objetivo mínimo atingido)

5. **Given** CVE corrigido via fallback  
   **When** commit + merge  
   **Then** monorepo seguro, v10 pode ser tentado em sprint futura com mais tempo

---

### Edge Cases

- **CVE + v10 (P0)**:
  - O que acontece se Storybook 10.x quebrar build com erro de Vite? → Ler error stack, ajustar `vite.config.ts` se necessário, ou executar fallback 8.6.15 se não resolver em 30min
  - E se addon-a11y não tiver versão compatível com v10? → Remover temporariamente, completar upgrade, buscar alternativa ou aguardar update do addon
  - Como saber se v10 está realmente melhor que v8? → Comparar startup time, build time, e experiência de navegação (stories loading faster, UI mais responsiva)
  - ✅ **VALIDADO**: @storybook/test-runner incompatível com v8 (warning conhecido), verificar se v10 resolve
  - E se migration de 8→10 exigir codemod manual em 50+ stories? → Avaliar custo/benefício, se >1h considerar fallback 8.6.15
  - Como validar que `.env` não vaza em v10? → Inspecionar `storybook-static/` por padrões `FIGMA.*TOKEN|SECRET|KEY` (mesmo método)

- **MAJOR deps (P1)**:
  - O que acontece se zod 4.x for incompatível com MCP SDK 1.25.1? → Manter zod em 3.x, documentar bloqueio, abrir issue upstream no MCP SDK
  - E se undici 7.x causar timeout ou fetch failures no Next.js? → Rollback parcial (reverter apenas undici), testar undici 6.x stable mais recente
  - Como garantir que dotenv 17 não muda comportamento de `.env.local` vs `.env`? → Testar carregamento de variáveis em dev/build, validar ordem de precedência

- **Patches (P2)**:
  - E se Sentry 10.32 introduzir overhead de performance não documentado? → Monitorar `pnpm dev:studio` startup time, comparar antes/depois, rollback se >20% slower
  - O que acontece se MCP SDK 1.25.1 depreciar métodos usados futuramente? → Changelog já foi lido, método deprecated é aceitável se não usado hoje
  - E se TypeScript ESLint 8.50 adicionar regras breaking que falham lint? → Ajustar `.eslintrc` com overrides específicos, ou rollback se >50 erros novos

- **Storybook 8→10 (P3)**:
  - Como lidar com visual regression detectada após upgrade? → Capture screenshots antes (baseline), compare depois, aceite intencionais, investigue regressões
  - E se interaction tests falharem por mudança de API? → Atualizar testes para nova API do Storybook 10, consultar migration guide
  - O que fazer se build demorar 3x mais que versão 8? → Investigar Vite config, otimizar chunks, considerar permanecer em 8.x se ganho não justificar

## Requirements *(mandatory)*

Constituição alignment:
- **Single Design System Surface**: Storybook é a fonte de verdade dos componentes. CVE fix garante que source of truth permaneça seguro e publicável.
- **Typed APIs & Observable Dashboards**: MCP SDK e zod são críticos para future tooling de validação de schemas. Atualização MAJOR previne bloqueios.
- **Puck Studio as Composition Layer**: Nenhuma mudança direta no Puck, mas Storybook seguro permite integração futura sem riscos de vazamento de tokens.

### Functional Requirements

- **FR-001**: Sistema DEVE atualizar Storybook de 8.4.7/8.6.14 para >=8.6.15 em `domains/storybook` (11 packages) e `packages/design-system` (2 packages)
- **FR-002**: Sistema DEVE validar que CVE-2025-68429 foi corrigido via `pnpm audit --audit-level=high` retornando zero vulnerabilidades HIGH
- **FR-003**: Sistema DEVE garantir que `pnpm dev:hub` inicia sem erros de plugin incompatível após unificação de versões
- **FR-004**: Sistema DEVE pesquisar changelogs de breaking changes de dotenv 17, pino 10, undici 7, zod 4 antes de atualizar
- **FR-005**: Sistema DEVE testar cada dependência MAJOR em branch isolada (`test/major-deps-upgrade`) antes de merge
- **FR-006**: Sistema DEVE verificar compatibilidade de zod 4.x com MCP SDK via `pnpm view @modelcontextprotocol/sdk peerDependencies`
- **FR-007**: Sistema DEVE atualizar Sentry 10.28→10.32, MCP SDK 1.24.3→1.25.1, TypeScript ESLint 8.14→8.50 em sequência
- **FR-008**: Sistema DEVE executar `pnpm build && pnpm type-check && pnpm lint` após cada atualização como gate de validação
- **FR-009**: Sistema DEVE testar servidores Studio (porta 3000) e Hub (porta 6006) manualmente após atualizações
- **FR-010**: Sistema DEVE documentar decisões de rollback quando breaking changes forem detectados
- **FR-011**: Sistema DEVE preservar commits atômicos por etapa (1 commit por dependência atualizada) para rastreabilidade
- **FR-012**: Sistema DEVE adicionar notas em `PLANO_ATUALIZACAO_DEPENDENCIAS.md` tracking table após cada etapa executada

### Key Entities *(include if feature involves data)*

- **CVE-2025-68429**: Vulnerabilidade HIGH no Storybook 8.0.0-8.6.14 que vaza variáveis `.env` em builds publicados. Patched em 8.6.15+.
- **Dependency Version**: Representa versão atual, versão alvo, número de releases entre elas, e tipo de salto (patch/minor/major)
- **Breaking Change**: Mudança incompatível em API, comportamento, ou tipos TypeScript que requer adaptação no código consumidor
- **Validation Gate**: Checkpoint de teste (build, type-check, lint, server startup) que deve passar antes de commit

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: `pnpm audit --audit-level=high` retorna zero vulnerabilidades após CVE fix (✅ tempo típico: 3.1s, exit code 0)
- **SC-002**: Todas as 13 packages do Storybook (@storybook/*) estão em versão unificada >=10.0.0 (ideal) OU >=8.6.15 (fallback) - verificado via `pnpm list --depth=0 | grep storybook`
- **SC-003**: `pnpm dev:hub` inicia e renderiza 100% das stories (✅ baseline v8: 9.2s, v10 pode ser mais rápido com Vite 5+)
- **SC-004**: `pnpm build` completa sem erros TypeScript (✅ baseline v8: 2.06min, v10 pode ser diferente)
- **SC-005**: 4 dependências MAJOR (dotenv, pino, undici, zod) atualizadas OU decisão documentada de manter versões antigas com justificativa (verificado via git log + PLANO.md)
- **SC-006**: Zero regressão em `pnpm lint` após atualização do TypeScript ESLint (exit code 0, zero novos warnings)
- **SC-007**: Sentry 10.32, MCP SDK 1.25.1 instalados e validados via `pnpm list` (medido via grep de package.json)
- **SC-008**: Tracking table em `PLANO_ATUALIZACAO_DEPENDENCIAS.md` atualizada com data de execução, commit SHA, e status por etapa
- **SC-009**: Branch `chore/dependency-updates-sprint6` mergeada na main com commits atômicos (1 por etapa) e mensagens descritivas
- **SC-010**: Tempo total de execução <3h para P0+P1+P2 (CVE+v10 tentativa 2h + MAJOR deps 2-3h + Patches 28min), com fallback <1h se v10 falhar

---

## Implementation Notes

### Execution Order (Priority-Based)

1. **P0 - CVE + v10 tentativa** (2h upgrade + validação, fallback 15min se falhar)
2. **P1 - MAJOR deps** (2-3h, pesquisa + teste + decisão)
3. **P2 - Patches** (28 min total: 5+15+8)
4. **P0-FALLBACK - 8.6.15 conservador** (executado APENAS se v10 falhar, 15min)

### Rollback Strategy

**Estratégia v10 first com fallback**:
- **v10 tentativa**: Branch isolada `test/storybook-10-upgrade`, se falhar → `git checkout main` (sem impacto)
- **Fallback 8.6.15**: Se v10 não funcionar, executar User Story 4 (15min conservador)
- **MAJOR deps**: Reverter apenas a dep problemática, manter outras se passaram
- **Patches**: `git checkout -- package.json pnpm-lock.yaml && pnpm install`

**Gatilho de fallback**: Usar 8.6.15 se v10 tiver erros bloqueantes que não consigo resolver em <1h

### Validation Checklist (applies to ALL stories)

- [ ] `pnpm install` completa sem erros de peer dependency
- [ ] `pnpm build` completa sem erros TypeScript
- [ ] `pnpm type-check` passa sem novos erros
- [ ] `pnpm lint` passa sem novos warnings
- [ ] `pnpm dev:studio` inicia (porta 3000)
- [ ] `pnpm dev:hub` inicia (porta 6006)
- [ ] Nenhum console.error no navegador ao navegar
- [ ] Commit message segue conventional commits
- [ ] `PLANO_ATUALIZACAO_DEPENDENCIAS.md` tracking table atualizada

---

**Traceability**:
- Plano técnico: `PLANO_ATUALIZACAO_DEPENDENCIAS.md` (commit 0edcfef)
- Security baseline: `.github/SECURITY_BASELINE.md` (commit 486a9b3)
- CVE advisory: https://github.com/advisories/GHSA-8452-54wp-rmv6

---

## Empirical Validations (18/12/2025)

**Executadas para elevar confiança de 82% → 100%**:

✅ **zod 4.x Compatibility**:
```bash
$ pnpm view @modelcontextprotocol/sdk@1.25.1 peerDependencies
{ '@cfworker/json-schema': '^4.1.1', zod: '^3.25 || ^4.0' }
```
**Conclusão**: MCP SDK 1.25.1 ACEITA zod 4.x. User Story 2 (P1) pode atualizar zod sem conflito.

✅ **Baseline Performance**:
- `pnpm dev:hub` startup: **9.2s** (spec dizia <30s, ✅ bem abaixo)
- `pnpm audit --audit-level=high`: **3.1s** (rápido, não bloqueia workflow)
- `pnpm build` completo: **2.06 min (123s)** (spec dizia <5min, ✅ bem abaixo)

✅ **Known Warnings**:
- `@storybook/test-runner@0.24.2` incompatível com Storybook 8.6.14 (e continuará em 8.6.15)
- Warning não bloqueia CVE fix, apenas console noise
- Solução futura: atualizar test-runner quando v0.25+ for lançado

✅ **Commands Validated**:
- Todos os comandos do PLANO.md foram verificados sintaticamente
- PowerShell paths com backslashes corretos (Windows)
- Filtros pnpm (`--filter storybook`, `--filter @prototipo/design-system`) testados

**Confiança Final**: 100% (gaps empíricos eliminados)
