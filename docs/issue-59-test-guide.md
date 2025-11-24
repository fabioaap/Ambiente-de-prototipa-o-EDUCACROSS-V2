# Issue #59: Puck DropZone Refactor - Guia de Teste

## 🎯 O Que Foi Implementado

Habilitação do **DropZone** nos componentes **Card** e **Layout** do Puck, permitindo que aceitem componentes filhos no editor visual.

## 🏗️ Arquitetura da Solução

```
apps/studio/src/config/
├── puck.types.ts              # Tipos compartilhados (novo)
├── puck.config.tsx            # Config client-side com DropZone (modificado)
└── puck.config.server.tsx     # Config RSC para render (novo)
```

### Por Que Dois Arquivos?

**Problema**: Puck v0.16.2 tem dois bundles:
- `@measured/puck` (cliente) → tem `DropZone`
- `@measured/puck/rsc` (servidor) → não tem `DropZone`

**Solução**: 
- Editor (`/studio`) usa config cliente com `DropZone` direto
- Render (`[[...slug]]`) usa config servidor com `puck.renderDropZone`

## 🧪 Como Testar

### 1. Build e Lint (Validação Técnica)

```bash
# Build completo
pnpm build:studio

# Lint
pnpm --filter studio lint

# Type-check (implícito no build)
# Já validado ✅
```

### 2. Testar no Editor Visual (Funcional)

```bash
# Iniciar dev server
pnpm dev:studio
```

**Passos de Teste:**

1. Abra http://localhost:3000/studio
2. Na barra lateral, arraste um componente **Layout**
3. **NOVO**: Arraste um componente **Text** ou **Button** **DENTRO** do Layout
4. Você verá a DropZone destacada quando passar o mouse
5. Solte o componente - ele será adicionado como filho

6. Repita com **Card**:
   - Arraste um Card para a página
   - Arraste componentes **DENTRO** do Card
   - Teste múltiplos níveis de aninhamento

### 3. Testar Renderização (Páginas Salvas)

1. No Studio, crie uma página com:
   ```
   Layout
     ├─ Text (h1): "Título Principal"
     └─ Card
         ├─ Text (p): "Descrição"
         └─ Button: "Ação"
   ```

2. Clique em "Publish"

3. Acesse http://localhost:3000/home (ou slug da página)

4. Verifique se a estrutura aninhada está renderizada corretamente

### 4. Testar Validação de Build

```bash
# Garantir que Next.js detecta corretamente os bundles
pnpm build:studio

# Verificar output - deve mostrar:
# ✓ Compiled successfully
# ○ /[[...slug]] (SSG)
# ○ /studio (Static)
```

## 📝 Mudanças de Código

### Antes (Placeholder)

```tsx
render: ({ variant, padding }) => {
  return (
    <Card variant={variant} padding={padding}>
      <div style={{ padding: '8px', border: '1px dashed #ccc' }}>
        Card Content (DropZone disabled)
      </div>
    </Card>
  );
}
```

### Depois (Funcional)

**Client (puck.config.tsx)**:
```tsx
'use client';
import { DropZone } from '@measured/puck';

render: ({ variant, padding }: CardProps) => {
  return (
    <Card variant={variant} padding={padding}>
      <DropZone zone="card-content" />
    </Card>
  );
}
```

**Server (puck.config.server.tsx)**:
```tsx
render: ({ variant, padding, puck }: CardProps & { puck: PuckContext }) => {
  return (
    <Card variant={variant} padding={padding}>
      {puck.renderDropZone({ zone: 'card-content' })}
    </Card>
  );
}
```

## ✅ Checklist de Validação

- [x] Build passa sem erros
- [x] Lint passa sem warnings
- [x] Type-check passa (via build)
- [x] Arquivos novos criados:
  - [x] `puck.types.ts`
  - [x] `puck.config.server.tsx`
- [x] Arquivos modificados:
  - [x] `puck.config.tsx` (+ 'use client', + DropZone)
  - [x] `[[...slug]]/page.tsx` (import config server)
- [ ] **Teste manual**: Arrastar componentes dentro de Card/Layout no editor
- [ ] **Teste manual**: Renderização de páginas com componentes aninhados

## 🚨 Troubleshooting

### Erro: "DropZone is not defined"

**Causa**: Arquivo sem `'use client'` ou importando bundle errado

**Solução**: Garantir que `puck.config.tsx` tem `'use client'` no topo

### Erro: Build falha com "Module not found: @measured/puck/rsc"

**Causa**: Versão do Puck diferente ou instalação incompleta

**Solução**:
```bash
pnpm install --frozen-lockfile
```

### DropZone não aparece no editor

**Causa**: Studio não está usando config cliente

**Solução**: Verificar que `studio/page.tsx` importa de `puck.config` (não `.server`)

## 📚 Documentação Adicional

- [Documentação completa da solução](./issue-59-dropzone-refactor.md)
- [Puck Docs - DropZone](https://puckeditor.com/docs/api-reference/components/drop-zone)
- [Next.js - Client Components](https://nextjs.org/docs/app/building-your-application/rendering/client-components)

## 🎉 Resultado Esperado

Após implementação bem-sucedida:

- ✅ Componentes Card e Layout aceitam filhos
- ✅ Editor mostra DropZones visuais ao arrastar
- ✅ Páginas renderizam estrutura aninhada corretamente
- ✅ Build Next.js funciona sem erros
- ✅ Type-safety mantido em toda aplicação
