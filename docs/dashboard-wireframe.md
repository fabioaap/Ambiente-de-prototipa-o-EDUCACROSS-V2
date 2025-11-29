# Dashboard - Wireframe & Planejamento

**Issue**: H1 (parte de Epic H)  
**Status**: 🚧 EM PROGRESSO  
**Data**: 2025-11-20  
**Objetivo**: Planejar layout, dados e próximas etapas para Dashboard do projeto

---

## 🎯 Visão Geral

O Dashboard será a **porta de entrada** do ambiente de prototipação, mostrando:
- Lista de **páginas criadas** no Studio
- **Links diretos** para editar/visualizar cada página
- **Filtros** por domínio (BackOffice, FrontOffice, Game)
- **Métricas** de saúde do repositório
- **Link para Storybook** e documentação

---

## 📐 Wireframe

### Layout Principal

```
┌─────────────────────────────────────────────────────────────┐
│  EDUCACROSS - Ambiente de Prototipação                  [🔗] │  ← Header + link Storybook
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  🔍 Buscar página...     [Filtro: Todos ▼]  [Ordenar ▼]     │  ← Search + filters
│                                                               │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  BackOffice (2 páginas)                                       │  ← Seções por domínio
│  ┌──────────────────┐  ┌──────────────────┐                 │
│  │ 📄 Revisão de... │  │ 📄 Dashboard     │                 │
│  │ Questões         │  │ Admin            │                 │
│  │ ✏️ Editar  🔗 Ver│  │ ✏️ Editar  🔗 Ver│                 │
│  └──────────────────┘  └──────────────────┘                 │
│                                                               │
│  FrontOffice (1 página)                                       │
│  ┌──────────────────┐                                       │
│  │ 📄 Onboarding    │                                       │
│  │ Aluno            │                                       │
│  │ ✏️ Editar  🔗 Ver│                                       │
│  └──────────────────┘                                       │
│                                                               │
│  Game (0 páginas)                                             │
│  (Sem páginas ainda)                                         │
│                                                               │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  📊 MÉTRICAS DO REPOSITÓRIO                                  │  ← Footer com stats
│  • Total de Páginas: 3                                       │
│  • Domínios: 2 ativos, 1 vazio                               │
│  • Última atualização: há 2 minutos                          │
│  • Build Status: ✅ OK                                       │
│  • Storybook: ✅ Online                                      │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## 📊 Estrutura de Dados

### API Endpoint
```typescript
// GET /api/dashboard/pages
{
  "pages": [
    {
      "id": "revisao-questoes-lista",
      "slug": "revisao-questoes/lista",
      "name": "Revisão de Questões - Lista",
      "domain": "BackOffice",
      "status": "draft",           // ou "published"
      "editUrl": "/studio?page=revisao-questoes/lista",
      "viewUrl": "/viewer/revisao-questoes/lista",
      "createdAt": "2025-11-15T10:00:00Z",
      "updatedAt": "2025-11-20T17:00:00Z",
      "thumbnail": null,            // URL opcional
      "description": "Lista de questões pendentes de revisão"
    }
  ],
  "stats": {
    "totalPages": 3,
    "totalDomains": 2,
    "activeDomains": ["BackOffice", "FrontOffice"],
    "lastUpdated": "2025-11-20T18:00:00Z",
    "buildStatus": "success",     // success | building | failed
    "storybook": "online"         // online | building | offline
  },
  "domains": {
    "BackOffice": {
      "count": 2,
      "color": "#3b82f6"           // Para UI
    },
    "FrontOffice": {
      "count": 1,
      "color": "#10b981"
    },
    "Game": {
      "count": 0,
      "color": "#f59e0b"
    }
  }
}
```

### Modelo de Página
```typescript
interface DashboardPage {
  id: string;                    // Identificador único
  slug: string;                  // Slug da página (studio?page=)
  name: string;                  // Nome legível
  domain: "BackOffice" | "FrontOffice" | "Game";
  status: "draft" | "published";
  editUrl: string;               // Link para editor Studio
  viewUrl: string;               // Link para preview
  createdAt: Date;
  updatedAt: Date;
  thumbnail?: string;            // URL screenshot (futuro)
  description?: string;          // Descrição curta
}

interface DashboardStats {
  totalPages: number;
  totalDomains: number;
  activeDomains: string[];
  lastUpdated: Date;
  buildStatus: "success" | "building" | "failed";
  storybook: "online" | "building" | "offline";
}
```

---

## 🏗️ Arquitetura de Implementação

### Fase 1: H1 (Planejamento) ← AQUI
- ✅ Wireframe documentado
- ✅ Estrutura de dados definida
- ✅ Endpoints necessários listados
- ✅ Próximas fases planejadas

### Fase 2: H2 (Endpoint)
- [ ] Criar `GET /api/dashboard/pages`
- [ ] Ler páginas de `domains/studio/data/pages/`
- [ ] Gerar JSON com metadados
- [ ] Integrar stats do repositório

### Fase 3: H3 (UI)
- [ ] Component `Dashboard.tsx`
- [ ] Stories no Storybook
- [ ] Filtros por domínio
- [ ] Busca de páginas
- [ ] Cards com preview

### Fase 4: H4 (Métricas) - FUTURO
- [ ] Indicadores de saúde
- [ ] Status de build
- [ ] Links ativos

### Fase 5: H5 (Link/Badge) - JÁ FEITO
- ✅ Badge Storybook no README
- ✅ Link no CONTRIBUTING

---

## 🎨 Design Decisions

### Cores por Domínio
| Domínio | Cor | Hex |
|---------|-----|-----|
| BackOffice | Azul | #3b82f6 |
| FrontOffice | Verde | #10b981 |
| Game | Âmbar | #f59e0b |

### Ícones
- 📄 = Página
- ✏️ = Editar
- 🔗 = Abrir/Visualizar
- 🔍 = Buscar
- 📊 = Métricas

### Estados
- **Draft** = Página em edição
- **Published** = Página finalizada

---

## 📋 Tarefas para Próximas Issues

### H2 - Criar Endpoint ✅ IMPLEMENTADO
```bash
# Endpoints criados:
# GET /api/dashboard/summary - Resumo com KPIs e status
# GET /api/dashboard/health - Métricas detalhadas de saúde
# GET /api/dashboard/pages - Lista de páginas (já existente)
```

#### Novos Endpoints (Sprint 3 - Issue #84)

**GET /api/dashboard/summary**
```json
{
  "success": true,
  "data": {
    "status": "excellent",
    "kpis": [
      { "name": "Páginas Criadas", "value": 12, "unit": "pages", "trend": "up", "changePercent": 8.5 }
    ],
    "healthScore": 100,
    "lastUpdated": "2025-11-24T10:30:00Z"
  },
  "timestamp": "2025-11-24T10:30:00Z"
}
```

**GET /api/dashboard/health**
```json
{
  "success": true,
  "data": {
    "buildStatus": "success",
    "lintStatus": "success",
    "typeCheckStatus": "success",
    "dependenciesHealth": "healthy",
    "healthScore": 100,
    "healthStatus": "excellent",
    "lastChecked": "2025-11-24T10:30:00Z"
  },
  "timestamp": "2025-11-24T10:30:00Z"
}
```

### H3 - UI Dashboard
```bash
# Opção A: Página em domains/studio
# domains/studio/src/app/dashboard/page.tsx
# Rota: /dashboard

# Opção B: Story em Storybook
# domains/storybook/src/stories/Dashboard.stories.tsx
# Para prototipagem visual
```

### H4 - Indicadores
```bash
# Adicionar em H2 (endpoint):
# - Build status (executar script de build)
# - Storybook online check
# - Últimas mudanças
```

### H6 - Segurança
```bash
# Documentar:
# - Quem pode acessar Dashboard
# - Dados sensíveis a ocultar
# - Rate limiting (futuro)
```

---

## 🚀 Próximas Ações

### 1. Validação do Wireframe
- [ ] Revisar layout com equipe
- [ ] Ajustar se necessário

### 2. Implementação H2
- [ ] Criar endpoint `/api/dashboard/pages`
- [ ] Testar localmente

### 3. Implementação H3
- [ ] Criar componente Dashboard
- [ ] Consumir endpoint
- [ ] Implementar filtros

---

## 📝 Referências

### Arquivos Relacionados
- `domains/studio/src/app/api/pages/route.ts` - Lógica de carregar páginas
- `domains/INDEX.md` - Estrutura de domínios
- `domains/storybook/src/stories/` - Exemplos de componentes

### Documentação
- `CONTRIBUTING.md` - Padrões
- `docs/accessibility-audit.md` - Acessibilidade

---

## ✅ Checklist H1

- [x] Wireframe documentado
- [x] Estrutura de dados definida
- [x] Endpoints necessários listados
- [x] Modelo TypeScript criado
- [x] Fases de implementação planejadas
- [x] Próximas tarefas claras

**Status**: ✅ PRONTO PARA PRÓXIMAS FASES

---

**Próximo**: Fazer PR de H1 ou iniciar H2 (Endpoint API)

Estimativa H2: **2-3 horas**  
Estimativa H3: **3-4 horas**
