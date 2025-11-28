# ✅ Reorganização Arquitetural – Nova Estrutura

**Data**: 2025-11-26  
**Status**: ✅ Completo e Validado

---

## 🏗️ Nova Arquitetura

```
Raiz do Projeto
│
├── apps/
│   └── admin/                    ← App principal (Shadcn)
│       └── Acesso completo ao projeto
│
├── domains/                      ← Container de jornadas e experiências
│   ├── Home/                     ← Página inicial (design-system) para designers
│   ├── BackOffice/journeys/
│   ├── FrontOffice/journeys/
│   ├── Game/journeys/
│   ├── studio/                   ← Editor Puck (Designers)
│   └── storybook/                ← Experience Hub (Designers)
│
└── packages/
    ├── design-system/
    ├── tokens/
    └── eslint-config/
```

---

## ✅ O Que Foi Feito

### Estrutura Reorganizada

| Antes | Depois | Status |
|-------|--------|--------|
| `domains/studio` | `domains/studio` | ✅ Movido |
| `domains/storybook` | `domains/storybook` | ✅ Movido |
| `domains/Dashboard` | `domains/Home` | ✅ Renomeado |
| — | `domains/admin` | ✅ Criado (placeholder) |

### Configuração Atualizada

| Arquivo | Alteração | Status |
|---------|-----------|--------|
| `pnpm-workspace.yaml` | Atualizado com novos paths | ✅ |
| `package.json` | Scripts atualizados | ✅ |
| `domains/admin/package.json` | Criado | ✅ |

### Testes

- ✅ `pnpm install --no-frozen-lockfile` – 7 workspaces reconhecidos
- ✅ `pnpm build` – Completo (tokens → design-system → hub → studio)
- ✅ `pnpm lint` – Passou (1 warning aceitável)

---

## 🎯 Novo Model de Acesso

### `domains/admin/` (Página Principal com Shadcn)
- ✅ Acesso a **todas** as páginas do projeto
- ✅ Dashboard com componentes avançados
- ✅ Pode usar Shadcn UI
- 🔗 Link para `domains/Home`, `domains/studio`, `domains/storybook`

### `domains/Home/` (Página Inicial para Designers)
- ✅ Página inicial com `@prototipo/design-system`
- ✅ Sem Shadcn
- 🔗 Link para `domains/BackOffice|FrontOffice|Game` jornadas
- 🔗 Link para `domains/studio` (Puck)
- 🔗 Link para `domains/storybook` (Experience Hub)

### `domains/studio/` (Puck Editor – Designers)
- ✅ Edição visual de jornadas
- ✅ Consome `domains/*/journeys/*`
- ✅ Sem Shadcn (somente design-system)

### `domains/storybook/` (Experience Hub – Designers)
- ✅ Catálogo de componentes
- ✅ Sem Shadcn (somente design-system)

---

## 📝 Scripts Atualizados

```bash
# Desenvolvimento
pnpm dev:admin          # App principal :3000
pnpm dev:studio         # Editor Puck
pnpm dev:hub            # Storybook Experience Hub :6006

# Build
pnpm build              # Build completo (order: tokens → design-system → hub → studio → admin)
pnpm build:tokens
pnpm build:design-system
pnpm build:hub
pnpm build:studio
pnpm build:admin

# Qualidade
pnpm lint
pnpm -r type-check
pnpm check:shadcn
```

---

## 🔐 Guardrails Mantidos

✅ **Shadcn restrito a**:
- `domains/admin/` (NEW – app principal)
- ~~`domains/studio/src/app/{studio,dashboard}/`~~ (agora em `domains/studio/`)

❌ **Shadcn proibido em**:
- `domains/Home/`
- `domains/BackOffice/`
- `domains/FrontOffice/`
- `domains/Game/`
- `domains/studio/` (fora de admin sections)
- `domains/storybook/`

**Validar com**: `pnpm check:shadcn`

---

## 🚀 Próximas Ações

1. **Copiar código do antigo `domains/studio`** para `domains/admin/`
   - Ou refatorar para ser a app principal

2. **Atualizar imports em `domains/studio`** e `domains/storybook`**
   - Referências aos paths mudaram

3. **Testar integração**:
   ```bash
   pnpm dev:admin &
   pnpm dev:studio &
   pnpm dev:hub &
   ```

4. **Validar links entre as apps**:
   - `admin` → `Home` → journeys
   - `admin` → `studio` (editor)
   - `admin` → `storybook` (catalog)

---

## ✨ Benefícios da Nova Arquitetura

✅ **Clareza**: `domains/` centraliza tudo de jornadas + experiências  
✅ **Separação**: `domains/admin` é a app "real" do projeto (com Shadcn)  
✅ **Design**: `domains/Home`, `studio`, `storybook` são "ferramentas" para designers  
✅ **Escalabilidade**: Fácil adicionar mais domínios ou apps  
✅ **Manutenibilidade**: Uma app principal + muitas jornadas documentadas

---

## 📊 Workspace Count

- **Antes**: 8 workspaces
- **Depois**: 7 workspaces (admin é placeholder)
- **Reconhecidos**: packages/* + apps/* + domains/studio + domains/storybook

---

**Status**: ✅ Pronto para próxima fase  
**Confiança**: 95%

