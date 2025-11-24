# Issue #59 - Puck DropZone Refactor

## Problema Identificado

Os componentes **Card** e **Layout** no `puck.config.tsx` tinham texto de placeholder "DropZone disabled" em vez de implementação funcional do DropZone, impedindo que aceitassem componentes filhos no editor visual do Puck.

O problema raiz era a incompatibilidade entre:
- **Bundle RSC** do Puck (`@measured/puck/rsc`) - não exporta `DropZone`
- **Bundle Cliente** do Puck (`@measured/puck`) - exporta `DropZone`
- **Next.js App Router** - importa automaticamente bundle RSC para Server Components

## Solução Implementada

### Arquitetura da Solução

Separamos a configuração do Puck em dois arquivos:

1. **`puck.config.tsx`** (Client-side) - Para o editor visual
   - Marcado com `'use client'`
   - Importa `DropZone` do bundle padrão
   - Usado em `/studio` (editor interativo)

2. **`puck.config.server.tsx`** (Server-side) - Para renderização estática
   - Usa `puck.renderDropZone` (API RSC)
   - Importa `Render` de `@measured/puck/rsc`
   - Usado em `[[...slug]]` (páginas renderizadas)

3. **`puck.types.ts`** - Tipos compartilhados
   - Single source of truth para interfaces
   - Evita duplicação de código

### Arquivos Modificados

#### Criados:
- `apps/studio/src/config/puck.types.ts` - Tipos compartilhados
- `apps/studio/src/config/puck.config.server.tsx` - Config RSC

#### Modificados:
- `apps/studio/src/config/puck.config.tsx` - Adicionado `'use client'` e `DropZone`
- `apps/studio/src/app/[[...slug]]/page.tsx` - Import do config server

### Implementação do DropZone

#### Client-side (Editor)

```tsx
// puck.config.tsx
'use client';
import { DropZone } from '@measured/puck';

Card: {
  render: ({ variant, padding }: CardProps) => {
    return (
      <Card variant={variant} padding={padding}>
        <DropZone zone="card-content" />
      </Card>
    );
  },
}
```

#### Server-side (Render)

```tsx
// puck.config.server.tsx
Card: {
  render: ({ variant, padding, puck }: CardProps & { puck: PuckContext }) => {
    return (
      <Card variant={variant} padding={padding}>
        {puck.renderDropZone({ zone: 'card-content' })}
      </Card>
    );
  },
}
```

## Validação

✅ **Build**: `pnpm build:studio` - Sucesso  
✅ **Lint**: `pnpm --filter studio lint` - Sem erros  
✅ **Type-check**: Implícito no build Next.js - Passou  

## Benefícios

1. **Arquitetura limpa** - Separação clara entre client/server
2. **Type-safe** - Tipos compartilhados mantêm consistência
3. **Zero conflitos** - Bundles corretos para cada contexto
4. **DX melhorado** - Clara separação de responsabilidades
5. **Performance** - Bundles otimizados por contexto

## Como Usar

### No Editor (Studio)

1. Acesse `/studio`
2. Arraste componentes Card ou Layout da barra lateral
3. Arraste outros componentes **dentro** do Card/Layout
4. Os componentes filhos serão renderizados na DropZone

### Na Renderização (Páginas)

1. Páginas salvas são renderizadas em `[[...slug]]`
2. O bundle RSC renderiza estaticamente
3. Componentes aninhados aparecem automaticamente

## Notas Técnicas

- **Puck v0.16.2** tem dois bundles diferentes (padrão e RSC)
- **Next.js App Router** precisa de marcação explícita `'use client'` para componentes interativos
- **DropZone** só funciona no bundle cliente
- **puck.renderDropZone** é a API RSC-safe para renderização estática

## Próximos Passos (Opcional)

- [ ] Adicionar testes E2E para arrastar componentes no editor
- [ ] Documentar no Storybook os componentes container (Card/Layout)
- [ ] Adicionar validação de `allow`/`disallow` nas DropZones
- [ ] Explorar nested DropZones mais complexas
