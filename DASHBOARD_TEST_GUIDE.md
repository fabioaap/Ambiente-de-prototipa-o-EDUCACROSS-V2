# 🧪 Guia de Teste - Dashboard e Navegação

**Objetivo**: Validar todas as 4 etapas de implementação do dashboard

---

## 1️⃣ Setup Inicial

### Preparar terminais

Abra 4 terminais PowerShell e navegue para a raiz do projeto:

```powershell
cd "C:\Users\Educacross\Documents\Ambiente-de-prototipa-o-EDUCACROSS-V2"
```

---

## 2️⃣ Iniciar os Servidores

### Terminal 1: Admin App (com Dashboard)
```powershell
pnpm dev:admin
# Output esperado: "Local: http://localhost:3000"
```

### Terminal 2: Studio (Puck Editor)
```powershell
pnpm dev:studio
# Output esperado: "Local: http://localhost:3001"
```

### Terminal 3: Storybook (Experience Hub)
```powershell
pnpm dev:hub
# Output esperado: "Local: http://localhost:6006"
```

### Terminal 4: Home (Designers)
```powershell
pnpm dev:home
# Output esperado: "Local: http://localhost:5000" (ou outra porta)
```

---

## 3️⃣ Testes de Navegação

### Teste 1: Home Page da Admin
**URL**: `http://localhost:3000`

**Verificar**:
- ✅ Título "EDUCACROSS Admin"
- ✅ 4 cards visíveis: Dashboard (azul), Home, Studio, Storybook
- ✅ Card Dashboard é clicável → redireciona para `/dashboard`
- ✅ Outros cards apontam para `/domains/*`

### Teste 2: Dashboard Page
**URL**: `http://localhost:3000/dashboard`

**Verificar**:
- ✅ Título "Dashboard operacional"
- ✅ Subtítulo sobre monitoramento contínuo
- ✅ Badge "Atualizado [data/hora]"
- ✅ Botão "Atualizar dados"

**Seções do Dashboard**:

#### KPI Cards (4 cards)
- [ ] "Páginas mapeadas" → 24 páginas ↑ 12.5%
- [ ] "Score de saúde" → 87% ~ 0%
- [ ] "Domínios ativos" → 3 domínios ↑ 5%
- [ ] "Jornadas documentadas" → 18 jornadas ↓ 2.3%

#### Saúde do Ambiente
- [ ] Score geral: 87%
- [ ] Status: "good"
- [ ] Build: ✅ success (92%)
- [ ] Lint: ⚠️ warning (60%)
- [ ] Type-check: ✅ success (92%)
- [ ] Dependências: ✅ healthy (85%)

#### Distribuição por Domínio
- [ ] BackOffice: 8 páginas
- [ ] FrontOffice: 10 páginas
- [ ] Game: 6 páginas

#### Quick Links (4 cards)
- [ ] Storybook (com ícone 📚)
- [ ] Jornadas (com ícone 🧭)
- [ ] Documentação (com ícone 📄)
- [ ] Studio (com ícone ❓)

#### Páginas Recentes (Table)
- [ ] Barra de busca funciona
- [ ] Dropdown de filtro por domínio funciona
- [ ] Table com 3 linhas de dados (Dashboard, Home, Lobby)
- [ ] Colunas: Título, Slug, Domínio, Atualizado, Ações
- [ ] Botões "Visualizar" e "Editar" por linha

### Teste 3: Atualizar Dados
**Na página do dashboard**:

**Verificar**:
- [ ] Clicar em "Atualizar dados"
- [ ] Botão entra em loading (ícone gira)
- [ ] Dados são refrescados
- [ ] Timestamp é atualizado

### Teste 4: Busca e Filtro
**Na seção "Páginas recentes"**:

**Busca**:
- [ ] Digitar "Dashboard" na barra
- [ ] Table filtra apenas "Dashboard BackOffice"
- [ ] Digitar "home" 
- [ ] Table filtra apenas "Home FrontOffice"

**Filtro de domínio**:
- [ ] Selecionar "BackOffice"
- [ ] Table mostra apenas páginas do BackOffice
- [ ] Selecionar "Todos os domínios"
- [ ] Table volta a mostrar todas

---

## 4️⃣ Testes de API

### Teste 5: API Mock
**URL**: `http://localhost:3000/api/dashboard/summary`

**Em PowerShell**:
```powershell
Invoke-WebRequest -Uri "http://localhost:3000/api/dashboard/summary" -Method GET | ConvertTo-Json
```

**Verificar resposta**:
```json
{
  "success": true,
  "data": {
    "status": "good",
    "kpis": [...],
    "healthScore": 87,
    "domains": {
      "BackOffice": { "count": 8 },
      "FrontOffice": { "count": 10 },
      "Game": { "count": 6 }
    },
    "health": {...},
    "recentPages": [...],
    "navigationLinks": [...]
  },
  "timestamp": "2025-11-27T..."
}
```

---

## 5️⃣ Testes de Responsividade

### Desktop (1920x1080)
- [ ] Layout ajusta bem em 1920px
- [ ] Cards grid em 4 colunas
- [ ] Table com scroll horizontal

### Tablet (768px)
- [ ] KPI Cards em 2 colunas
- [ ] Health e Domain em stack
- [ ] Table reduz tamanho

### Mobile (375px)
- [ ] KPI Cards em 1 coluna
- [ ] Todos os cards stackeados
- [ ] Table com scroll horizontal
- [ ] Menu responsivo

---

## 6️⃣ Testes de Performance

### Load Time
```powershell
# Medir tempo de resposta
Measure-Command { Invoke-WebRequest -Uri "http://localhost:3000/dashboard" } | Select-Object TotalMilliseconds
```

**Esperado**: < 2000ms

### Tamanho de Bundle
```bash
# Verificar no output do build
pnpm build:admin 2>&1 | findstr "First Load JS"
```

**Esperado**: ~147 kB First Load JS

---

## 7️⃣ Testes de Acessibilidade

### Navegação por Teclado
- [ ] Tab percorre todos os elementos
- [ ] Enter ativa buttons e links
- [ ] Focus visível em todos os elementos
- [ ] Badges com aria-labels

### Contraste
- [ ] Texto no fundo tem contraste ≥ 4.5:1
- [ ] Ícones visíveis sem cor
- [ ] Status indicators descritivos (não apenas cores)

---

## 8️⃣ Testes de Componentes Shadcn

### Button
```tsx
// ✅ Variantes funcionam
<Button variant="default">Primary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
```

### Card
```tsx
// ✅ Estrutura completa
<Card>
  <CardHeader>
    <CardTitle>...</CardTitle>
    <CardDescription>...</CardDescription>
  </CardHeader>
  <CardContent>...</CardContent>
</Card>
```

### Input e Select
- [ ] Input recebe texto
- [ ] Select abre dropdown
- [ ] Valores são selecionáveis

### Progress
- [ ] Barra azul progride até 100%
- [ ] Responsiva

### Badge e Skeleton
- [ ] Badges aparecem com background
- [ ] Skeletons animam durante carregamento

---

## 9️⃣ Checklist Final

- [ ] Build completo passa sem erros
- [ ] Todos os 4 servidores rodando
- [ ] Dashboard carrega em < 2s
- [ ] Todos os componentes renderizam
- [ ] API retorna dados corretamente
- [ ] Navegação funciona entre páginas
- [ ] Busca e filtro funcionam
- [ ] Responsividade OK em mobile/tablet/desktop
- [ ] Contraste e acessibilidade OK
- [ ] Console sem erros JavaScript

---

## 🔍 Troubleshooting

### "Port 3000 already in use"
```powershell
# Encontrar processo usando porta 3000
netstat -ano | findstr :3000

# Matar processo (PID)
taskkill /PID <PID> /F
```

### "Module not found"
```powershell
# Reinstalar dependências
pnpm install --no-frozen-lockfile
```

### "Build fails with ESLint error"
```powershell
# ESLint warning é não-bloqueante, ignorar
# Se quiser corrigir:
pnpm lint --fix
```

### API retorna erro
```bash
# Verificar mock data em:
# apps/admin/src/app/api/dashboard/summary/route.ts

# Testar curl
curl http://localhost:3000/api/dashboard/summary
```

---

## 📊 Métricas Esperadas

| Métrica | Esperado | Status |
|---------|----------|--------|
| Build time | < 10s | ⏳ |
| First Load JS | ~147 kB | ⏳ |
| Lighthouse Score | > 80 | ⏳ |
| API response | < 500ms | ⏳ |
| TTI (Time to Interactive) | < 3s | ⏳ |

---

## 📝 Notas

- Todos os dados no dashboard são mock (arquivo `route.ts`)
- Links para `/domains/*` funcionam apenas com servers paralelos
- Componentes Shadcn são reutilizáveis em outras páginas
- TypeScript strict mode ativado para type-safety

---

## ✅ Próximos Passos Após Testes

1. Se tudo passar: Merge para `main`
2. Deploy em staging
3. Integrar com dados reais (BD)
4. Adicionar mais rotas de API
5. Setup de CI/CD

---

**Gerado**: 27 de novembro de 2025  
**Versão**: 1.0  
**Status**: 🟢 Pronto para teste
