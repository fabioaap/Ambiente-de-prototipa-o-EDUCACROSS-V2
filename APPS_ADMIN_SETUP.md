# 🚀 Apps/Admin – Nova App Principal com Shadcn

**Data**: 2025-11-26  
**Status**: ✅ Criada e validada

---

## Visão Geral

`apps/admin/` é a **app principal** do projeto com **Shadcn UI** totalmente instalado. Ela atua como **dashboard central** com acesso a todas as seções do projeto.

---

## Estrutura

```
apps/admin/
├── src/
│   └── app/
│       ├── layout.tsx       ← Root layout
│       ├── page.tsx         ← Home page (dashboard principal)
│       └── globals.css      ← Tailwind + Shadcn styles
├── next.config.ts
├── tailwind.config.ts
├── postcss.config.cjs
├── tsconfig.json
├── package.json
└── eslint.config.mjs
```

---

## O Que Esta App Contém

### ✅ Shadcn UI Instalado
- Tailwind CSS 3.4
- Radix UI primitives
- CVA (Class Variance Authority)
- Lucide React icons

### ✅ Home Page
- Links para `domains/Home` (página inicial designers)
- Links para `domains/studio` (Puck editor)
- Links para `domains/storybook` (Experience Hub)
- Informações sobre a app

### ✅ Layout Base
- Metadata configurada
- Root layout com Tailwind globals

---

## Scripts

```bash
# Desenvolvimento
pnpm dev:admin              # Inicia em :3000

# Build
pnpm build:admin            # Build produção
pnpm build                  # Build completo (tokens → design-system → hub → studio → admin)

# Qualidade
pnpm lint                   # ESLint
pnpm -r type-check          # TypeScript
```

---

## Proxima Fase

### Conteúdo a Adicionar (do antigo `domains/studio/src/app/dashboard/`)

1. **Dashboard com Métricas** (`/dashboard`)
   - KPI Cards (páginas, domínios, stats)
   - Health Metrics (build, lint, type-check)
   - Quick Links

2. **Componentes Shadcn**
   - Card, Badge, Button
   - Input, Select, Table
   - Skeleton, Tabs, Accordion

3. **APIs** (manter de `domains/studio/src/app/api/`)
   - `/api/dashboard/summary`
   - `/api/health`
   - `/api/pages`

---

## URLs

- **Admin Home**: `http://localhost:3000` (quando `pnpm dev:admin`)
- **Link para Home**: `/domains/home` (servidor da `domains/Home`)
- **Link para Studio**: `/domains/studio` (servidor da `domains/studio`)
- **Link para Storybook**: `/domains/storybook` (servidor da `domains/storybook`)

---

## Validações

✅ Build passando  
✅ TypeScript sem erros  
✅ Eslint configurado  
✅ Tailwind configurado  
✅ Next.js 15 funcionando  

---

## Próximos Passos

1. Copiar conteúdo do dashboard antigo para `apps/admin/src/app/dashboard/`
2. Instalar Shadcn components conforme necessário
3. Testar links entre as apps
4. Validar integração com `pnpm dev:*` scripts

---

**Status**: ✅ Pronto para adicionar conteúdo  
**Confiança**: 100%
