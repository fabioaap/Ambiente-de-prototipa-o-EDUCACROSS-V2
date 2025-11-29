# 🚀 Quick Start - Dashboard & Apps

**Ambiente**: Local Development  
**Versão**: 1.0  
**Status**: ✅ Pronto para usar

---

## ⚡ TL;DR - Iniciar Tudo em 3 Passos

### Passo 1: Instalar (apenas primeira vez)
```bash
cd "C:\Users\Educacross\Documents\Ambiente-de-prototipa-o-EDUCACROSS-V2"
pnpm install --no-frozen-lockfile
```

### Passo 2: Build
```bash
pnpm build
```

### Passo 3: Rodar Servidores (abrir 4 terminais)

**Terminal 1 - Admin com Dashboard**
```bash
pnpm dev:admin
# → http://localhost:3000
```

**Terminal 2 - Studio (Puck Editor)**
```bash
pnpm dev:studio
# → http://localhost:3001
```

**Terminal 3 - Storybook (Experience Hub)**
```bash
pnpm dev:hub
# → http://localhost:6006
```

**Terminal 4 - Home (Designers)**
```bash
pnpm dev:home
# → http://localhost:5000 (ou outra)
```

---

## 🌐 URLs

| Serviço | URL | Porta | Função |
|---------|-----|-------|--------|
| 📊 Admin | http://localhost:3000 | 3000 | Dashboard principal |
| 📊 Dashboard | http://localhost:3000/dashboard | 3000 | Métricas e saúde |
| 🎨 Studio | http://localhost:3001 | 3001 | Editor Puck |
| 📚 Storybook | http://localhost:6006 | 6006 | Experience Hub |
| 🏠 Home | http://localhost:5000 | 5000 | Página inicial |
| 🔌 API Mock | http://localhost:3000/api/dashboard/summary | 3000 | Dados mock |

---

## 📊 O Que é o Dashboard?

**Localização**: `http://localhost:3000/dashboard`

**Componentes**:
- 4 KPI Cards (métricas com tendências)
- Health Metrics (Build, Lint, Type-check, Deps)
- Domain Distribution (BackOffice, FrontOffice, Game)
- Quick Links (Storybook, Journeys, Docs)
- Search & Filter de páginas
- Table com últimas alterações

**Dados**: Mock (arquivo: `domains/admin/src/app/api/dashboard/summary/route.ts`)

---

## 🛠️ Comandos Úteis

### Development
```bash
# Todos os servidores
pnpm dev:admin
pnpm dev:studio
pnpm dev:hub
pnpm dev:home

# Apenas um
pnpm --filter admin dev
pnpm --filter studio dev
```

### Build
```bash
# Build tudo
pnpm build

# Build apenas admin
pnpm build:admin

# Watch mode
pnpm build --filter admin --watch
```

### Qualidade
```bash
# Lint
pnpm lint

# Type-check
pnpm -r type-check

# Format
pnpm prettier --write .
```

---

## 📁 Estrutura

```
domains/admin/src/
├── app/
│   ├── dashboard/page.tsx     ← Dashboard (574 linhas)
│   ├── api/dashboard/summary/ ← API Mock
│   ├── layout.tsx
│   └── page.tsx               ← Home com links
├── components/ui/             ← Shadcn UI (8 componentes)
├── lib/
│   ├── types/dashboard.ts     ← TypeScript types
│   └── utils.ts
└── ...

domains/
├── Home/                       ← Página inicial designers
├── studio/                     ← Puck editor
├── storybook/                  ← Experience Hub
├── BackOffice/journeys/
├── FrontOffice/journeys/
└── Game/journeys/
```

---

## 🧪 Testar Dashboard

### 1. Acessar
```
http://localhost:3000/dashboard
```

### 2. Verificar
- ✅ 4 KPI cards carregam
- ✅ Health metrics mostram status
- ✅ Tabela de páginas
- ✅ Busca funciona
- ✅ Filtro por domínio funciona

### 3. Testar API
```bash
# PowerShell
Invoke-WebRequest -Uri "http://localhost:3000/api/dashboard/summary" | ConvertTo-Json
```

---

## 🐛 Troubleshooting

### Porta já em uso
```bash
# Windows - encontrar processo
netstat -ano | findstr :3000

# Matar processo (replace <PID>)
taskkill /PID <PID> /F
```

### Build falha
```bash
# Limpar cache
rm -r .next
rm -r node_modules
pnpm install --no-frozen-lockfile
pnpm build
```

### ESLint errors
```bash
# Fix automático
pnpm lint --fix
```

---

## 📊 Arquivos Importantes

### Dashboard
- `domains/admin/src/app/dashboard/page.tsx` - Componente principal (574 linhas)
- `domains/admin/src/lib/types/dashboard.ts` - Types TypeScript

### API Mock
- `domains/admin/src/app/api/dashboard/summary/route.ts` - Endpoint

### Components
- `domains/admin/src/components/ui/` - Shadcn UI components (8 arquivos)

### Docs
- `DASHBOARD_MIGRATION_COMPLETE.md` - Status técnico
- `DASHBOARD_TEST_GUIDE.md` - Guia de teste
- `DASHBOARD_DELIVERY_FINAL.md` - Resumo final

---

## 📈 Next Steps

1. **Validar no navegador** → Abrir `http://localhost:3000/dashboard`
2. **Testar navegação** → Clicar em links para outras apps
3. **Testar API** → Chamar `http://localhost:3000/api/dashboard/summary`
4. **Testar responsividade** → Abrir dev tools e redimensionar
5. **Code review** → Revisar PRs

---

## ✅ Checklist Rápido

- [ ] `pnpm install` rodou sem erros
- [ ] `pnpm build` passou
- [ ] `pnpm lint` passou
- [ ] `pnpm dev:admin` está rodando
- [ ] `http://localhost:3000` abre
- [ ] `http://localhost:3000/dashboard` carrega dados
- [ ] API `http://localhost:3000/api/dashboard/summary` responde

---

## 🎯 Que Esperar

✅ **Home Page** (`:3000`)
- 4 cards de navegação
- Link para Dashboard destacado

✅ **Dashboard** (`:3000/dashboard`)
- KPI cards com dados mock
- Health metrics
- Search & filter funcionando
- Table com páginas recentes

✅ **API** (`:3000/api/dashboard/summary`)
- Responde com JSON
- Mock data realista
- 300ms de delay (simula rede)

---

## 💡 Dicas

1. **Usar split view**: Abrir 2 browsers lado a lado
   - Esquerda: Dashboard
   - Direita: Terminal com logs

2. **DevTools aberto**: F12 para ver console
   - Verificar requests de rede
   - Debug de componentes

3. **Usar Postman**: Para testar API
   - GET `http://localhost:3000/api/dashboard/summary`

---

## 📞 Need Help?

**Documentação**:
- Técnica: `DASHBOARD_MIGRATION_COMPLETE.md`
- Testes: `DASHBOARD_TEST_GUIDE.md`
- Final: `DASHBOARD_DELIVERY_FINAL.md`

**Console**:
- Verificar erros em F12 → Console
- Ler logs do terminal

---

**Última atualização**: 27 de novembro de 2025  
**Status**: 🟢 Pronto para usar

**Bora testar! 🚀**
