# 🚀 GitHub SpecKit OFICIAL — Guia Prático para EDUCACROSS

**Data**: 24 de novembro de 2025  
**SpecKit Version**: v1.0 (GitHub Official — Setembro 2025)  
**Status**: Pronto para implementação

---

## 📰 O que é GitHub SpecKit?

GitHub lançou em **setembro de 2025** o **SpecKit**, uma ferramenta oficial integrada ao GitHub que permite:

- Definir especificações estruturadas em PRs e Issues
- Usar sintaxe simples `/spec` para criar requisitos
- Integração automática com GitHub Copilot
- Geração automática de relatórios de conformidade
- Rastreamento de status em tempo real

**Link oficial**: https://pt.dataconomy.com/2025/09/08/o-github-libera-speckit-para-codificacao-assistida-por-ai/

---

## 🎯 Como Usar SpecKit no EDUCACROSS

### Sintaxe Básica

```
/spec <nome-da-spec> 
  <descrição da especificação>
  
  Critérios:
  - [ ] Critério 1
  - [ ] Critério 2
  - [ ] Critério 3
```

### Exemplo 1: Spec para Issue #53 (Dashboard API)

**Local**: Criar comentário em uma PR ou Issue

```
/spec Dashboard API - GET /api/pages

Implementar endpoint REST que retorna lista de páginas criadas no Puck Studio.

Critérios de Aceitação:
- [ ] Endpoint responde em GET http://localhost:3000/api/pages
- [ ] Response inclui: success, data, error, total, timestamp
- [ ] Suporta query params: ?limit=10&offset=0
- [ ] Error handling com try-catch
- [ ] CORS permitido para localhost:3000
- [ ] Build passes: pnpm build && pnpm lint && pnpm -r type-check
- [ ] Testado com curl ou Postman

Acceptance Tests:
- [ ] curl http://localhost:3000/api/pages retorna 200
- [ ] Response JSON é válido
- [ ] Paginação funciona corretamente
```

### Exemplo 2: Spec para Issue #54 (Dashboard UI)

```
/spec Dashboard UI - Pages List Component

Criar interface visual que lista páginas criadas no Studio.

Critérios de Aceitação:
- [ ] Página funciona em http://localhost:3000/studio/pages
- [ ] Exibe tabela/grid com: thumbnail, título, slug, data, ações
- [ ] Consome endpoint #53 (GET /api/pages)
- [ ] Mostra loading state enquanto carrega
- [ ] Trata erros se API falhar
- [ ] Responsivo (mobile, tablet, desktop)
- [ ] Build passes

Componentes do Design System:
- [ ] Card para cards de página
- [ ] Button para ações (editar, deletar)
- [ ] Text para conteúdo
- [ ] Badge para status

Teste Manual:
- [ ] Página carrega dados do endpoint
- [ ] Botões navegam corretamente
- [ ] Layout é responsivo
```

### Exemplo 3: Spec para Issue #58 (Game Hub)

```
/spec Game Hub Journey Documentation

Documentar a jornada Game Hub com estrutura de pasta e conteúdo.

Critérios de Aceitação:
- [ ] Pasta criada: domains/Game/journeys/game-hub/
- [ ] README.md: objetivo, fluxo, componentes, links
- [ ] links.md: referências para Studio, Figma, etc
- [ ] notas.md: decisões UX/design
- [ ] Página de exemplo no Studio: /game-hub
- [ ] Progress (#60) renderiza corretamente
- [ ] Leaderboard (#61) renderiza corretamente

Conteúdo do README:
- [ ] Título: "Jornada: Game Hub"
- [ ] Objetivo: Descrição clara do resultado
- [ ] Fluxo: Diagrama ASCII ou passos
- [ ] Componentes utilizados: Lista com links
- [ ] Status: Checklist de progresso

Estrutura de Pasta:
- [ ] domains/Game/journeys/game-hub/README.md
- [ ] domains/Game/journeys/game-hub/links.md
- [ ] domains/Game/journeys/game-hub/notas.md
- [ ] Referência em domains/Game/README.md
```

### Exemplo 4: Spec para Issue #55 (Health Metrics)

```
/spec Health Metrics - Dashboard Indicators

Adicionar indicadores de saúde ao Dashboard.

Critérios de Aceitação:
- [ ] Seção "Health Metrics" adicionada ao Dashboard
- [ ] Exibe 4+ métricas: build, commits, issues, PRs, cobertura
- [ ] Usa componentes DS: Card, Progress, Badge
- [ ] Dados mockados para prototipagem
- [ ] Stories criadas no Storybook
- [ ] Build passes

Métricas a Mostrar:
- [ ] Build Status (verde/vermelho com ícone)
- [ ] Commits Last 24h (número + descrição)
- [ ] Open Issues (contador + link)
- [ ] Open PRs (contador + link)
- [ ] Test Coverage (Progress bar 0-100%)

Design:
- [ ] Grid responsivo (2-3 colunas)
- [ ] Cores via tokens
- [ ] Iconografia consistente
- [ ] Acessibilidade (ARIA labels)
```

---

## 🔄 Fluxo de Trabalho com SpecKit

### Passo 1: Agente Cria Issue/PR

```bash
# Criar PR para #53
gh pr create --title "feat: Dashboard API endpoint (fix #53)" \
  --body "Implementação do endpoint GET /api/pages"
```

### Passo 2: Postar Spec no Comentário da PR

Ir em **Issues → PR #XYZ → Comentários** e postar:

```
/spec Dashboard API - GET /api/pages

[conteúdo da spec — veja exemplos acima]
```

### Passo 3: GitHub + Copilot Validam Automaticamente

- ✅ GitHub processa `/spec` e cria checklist
- ✅ Copilot lê spec e faz sugestões
- ✅ Relatório gerado automaticamente
- ✅ Status atualizado em tempo real

### Passo 4: Agente Implementa Conforme Spec

```bash
# Implementar conforme os critérios listados
# ...código...

# Fazer commit
git commit -m "feat(api): GET /api/pages endpoint (fix #53)"
git push
```

### Passo 5: GitHub Valida Automaticamente

- ✅ Checklist da spec é verificado
- ✅ Relatório de conformidade é gerado
- ✅ Comentário automático em verde: "✅ Spec completa"

---

## 💡 Vantagens de Usar SpecKit Official

| Vantagem | Descrição |
|----------|-----------|
| **Nativo do GitHub** | Não precisa de ferramentas externas |
| **Sintaxe simples** | `/spec` é intuitivo e fácil |
| **Integração Copilot** | IA lê specs e ajuda a implementar |
| **Relatórios automáticos** | Status em tempo real |
| **Rastreabilidade** | Histórico completo de specs |
| **Sem setup complexo** | Funciona direto em PRs e Issues |

---

## 🚀 Como Implementar no EDUCACROSS

### Opção A: Mínimo (Recomendado para começar)

1. **Agente cria PR para issue**
2. **Posta `/spec` no comentário da PR**
3. **Implementa conforme spec**
4. **GitHub valida automaticamente**

```bash
# Exemplo prático:
# 1. Cria PR
gh pr create --title "feat: Dashboard API (fix #53)"

# 2. Posta spec (em comentário na web)
/spec Dashboard API - GET /api/pages
Critérios:
- [ ] Endpoint responde em GET /api/pages
- [ ] Response: {success, data, error, total, timestamp}
- [ ] Query params: limit, offset
- [ ] Build passes

# 3. Implementa
# ... código ...

# 4. GitHub valida
# ✅ Spec encontrada e validada
```

### Opção B: Completo (Com documentação estruturada)

1. **Criar arquivo `.github/specs/sprint3.md`** com todas as 4 specs
2. **Referenciar em cada PR**: `/spec @.github/specs/sprint3.md#spec-53`
3. **GitHub processa automaticamente**

```markdown
# .github/specs/sprint3.md

## spec-53: Dashboard API
...

## spec-54: Dashboard UI
...

## spec-55: Health Metrics
...

## spec-58: Game Hub
...
```

---

## 📋 Checklist: Usar SpecKit no EDUCACROSS

### Fase 1: Setup (Imediato)
- [ ] Familiarizar com sintaxe `/spec`
- [ ] Entender exemplos acima
- [ ] Preparar specs para as 4 issues de Fase 3

### Fase 2: Implementação (Durante Fase 3)
- [ ] Cada agente posta `/spec` em sua PR
- [ ] Implementa conforme critérios
- [ ] GitHub valida automaticamente
- [ ] Merge quando spec está 100% completa

### Fase 3: Expansão (Pós Fase 3)
- [ ] Expandir specs para Fase 4
- [ ] Adicionar specs para Sprint 4
- [ ] Documentar lições aprendidas

---

## 🎯 Exemplo Completo: Issue #53 na Prática

### 1. Agente Cria PR

```bash
git checkout -b feature/c53-dashboard-api
# ... implementa código ...
git push -u origin feature/c53-dashboard-api
gh pr create --title "feat: Dashboard API endpoint (fix #53)"
```

### 2. Posta Spec em Comentário

Na PR criada, clicar em "Comentar" e postar:

```
/spec Dashboard API - GET /api/pages Endpoint

Implementar endpoint REST que retorna lista de páginas criadas no Puck Studio.

Descrição:
O endpoint deve retornar um array de páginas com informações sobre cada uma 
(id, title, slug, createdAt, updatedAt, content).

Critérios de Aceitação:
- [ ] Arquivo: apps/studio/src/app/api/pages/route.ts
- [ ] Método: GET /api/pages
- [ ] Response inclui: success, data, error, total, timestamp
- [ ] Query params opcionais: limit=10, offset=0
- [ ] Status 200 em sucesso, 500 em erro
- [ ] CORS permitido para localhost:3000
- [ ] Error handling com try-catch
- [ ] Tipos TypeScript corretos

Testes Manuais:
- [ ] curl http://localhost:3000/api/pages retorna 200
- [ ] Response JSON é válido (jq)
- [ ] Paginação funciona: ?limit=5&offset=0
- [ ] Erro é capturado corretamente

Build:
- [ ] pnpm build passa
- [ ] pnpm lint passa
- [ ] pnpm -r type-check passa
```

### 3. GitHub Processa

Automaticamente:
- ✅ Cria checklist interativo
- ✅ Copilot lê e faz sugestões
- ✅ Relatório de status gerado

### 4. Agente Implementa

```typescript
// apps/studio/src/app/api/pages/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '0', 10);
    const offset = parseInt(searchParams.get('offset') || '0', 10);
    
    // Implementação...
    
    return NextResponse.json({
      success: true,
      data: pages,
      error: null,
      total: pages.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      data: [],
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}
```

### 5. Commit e Validação

```bash
git add .
git commit -m "feat(api): GET /api/pages endpoint (fix #53)"
git push

# GitHub Action: Valida spec automaticamente
# ✅ Todos os critérios foram implementados
# ✅ Build passou
# ✅ Pronto para merge
```

---

## 📞 Referências

- **Artigo Original**: https://pt.dataconomy.com/2025/09/08/o-github-libera-speckit-para-codificacao-assistida-por-ai/
- **GitHub Docs**: https://docs.github.com/en/copilot/using-github-copilot/using-copilot-in-github-actions
- **Copilot + SpecKit**: Integração automática, sem configuração extra

---

## ✅ Status: Pronto para Usar

**Você pode começar AGORA a usar SpecKit**:

1. Criar PR para #53
2. Postar `/spec` em comentário
3. Implementar conforme critérios
4. GitHub valida automaticamente

**Não precisa instalar nada.**  
**Funciona direto no GitHub.**  
**Integrado com Copilot.**

---

**Criado**: 2025-11-24  
**Status**: ✅ Pronto para implementação em Fase 3
