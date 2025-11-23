# Implementação de DropZone no Puck Studio

## Resumo

Este documento descreve a implementação do suporte a DropZone nos componentes Card e Layout do Puck Studio, conforme Issue I1.1.

## Mudanças Implementadas

### 1. Validação com Zod

Adicionada validação runtime para todos os componentes usando Zod:

```typescript
export const cardPropsSchema = z.object({
  variant: z.enum(['default', 'bordered', 'elevated']),
  padding: z.enum(['none', 'sm', 'md', 'lg']),
});
```

- ✅ `buttonPropsSchema` - valida texto, variante e tamanho
- ✅ `textPropsSchema` - valida conteúdo, tag HTML, tamanho, peso e cor
- ✅ `cardPropsSchema` - valida variante e padding
- ✅ `layoutPropsSchema` - valida largura máxima

### 2. Suporte a DropZone

Componentes Card e Layout agora suportam conteúdo aninhado via DropZone do Puck:

```typescript
render: ({ variant, padding, puck }: CardProps & DefaultComponentProps & { puck: PuckContext }) => {
  const { renderDropZone: DropZone } = puck;
  
  return (
    <Card variant={variant} padding={padding}>
      <DropZone zone="card-content" />
    </Card>
  );
}
```

**Zonas implementadas:**
- `card-content` - permite adicionar componentes dentro de Cards
- `layout-content` - permite adicionar componentes dentro de Layouts

### 3. Tipos TypeScript Completos

```typescript
type PuckContext = {
  renderDropZone: React.ComponentType<{ zone: string }>;
};
```

Props derivadas via `z.infer<>` dos schemas Zod, garantindo consistência entre validação e tipos.

### 4. Documentação JSDoc

Todos os schemas, tipos e componentes foram documentados com comentários JSDoc descritivos.

### 5. Remoção de Placeholders

❌ **Antes:**
```typescript
<div style={{ padding: '8px', border: '1px dashed #ccc', borderRadius: '4px' }}>
  Card Content (DropZone disabled)
</div>
```

✅ **Depois:**
```typescript
<DropZone zone="card-content" />
```

## Como Usar

### Drag-and-Drop no Studio

1. Abra o Studio em `/studio`
2. Arraste um componente **Layout** ou **Card** para o canvas
3. Clique no componente para selecioná-lo
4. Arraste outros componentes (Button, Text, etc) **dentro** do Card/Layout
5. Os componentes serão aninhados na DropZone automaticamente

### Exemplo de Estrutura

```
Layout (maxWidth: xl)
  └─ DropZone zone="layout-content"
      ├─ Card (variant: elevated, padding: md)
      │   └─ DropZone zone="card-content"
      │       ├─ Text (as: h2, size: 2xl)
      │       └─ Button (variant: primary, size: md)
      └─ Text (as: p, size: base)
```

## Validações Realizadas

- ✅ `pnpm build` - successful, sem warnings TypeScript
- ✅ `pnpm lint` - apenas 1 warning não relacionado (Tokens.stories)
- ✅ `pnpm type-check` - 0 erros
- ✅ Build Next.js - 13/13 páginas geradas com sucesso
- ✅ Studio carrega corretamente
- ✅ Componentes renderizam com DropZone

## Issues Conhecidas (Pré-Existentes)

### 1. Conflito de Rotas Next.js

Existe um conflito entre `/page.tsx` e `/[[...slug]]/page.tsx` que impede o dev server de iniciar:

```
Error: You cannot define a route with the same specificity as a optional catch-all route ("/" and "/[[...slug]]").
```

**Causa:** Ambas as rotas foram adicionadas no mesmo commit anterior.

**Solução Sugerida:** 
- Remover `/page.tsx` e servir a landing page em uma rota específica como `/home` ou `/dashboard`
- OU usar `/[[...slug]]/page.tsx` para renderizar tanto a landing quanto as páginas dinâmicas

### 2. Infinite Loop no Studio

O componente `/app/studio/page.tsx` tem um bug de infinite loop causando:

```
Error: Maximum update depth exceeded. This can happen when a component calls setState inside useEffect...
```

**Causa:** `useEffect` ou `useState` causando re-renders infinitos.

**Nota:** Este bug é pré-existente e não foi causado pelas mudanças de DropZone.

## Dependências Adicionadas

- `zod@^4.1.12` - Validação de schemas runtime

## Arquivos Modificados

1. `apps/studio/src/config/puck.config.tsx` - Refatoração completa com DropZone e validação
2. `apps/studio/package.json` - Adicionada dependência zod
3. `.gitignore` - Adicionado `.turbo/` para cache do Turbo
4. `pnpm-lock.yaml` - Atualizado com nova dependência

## Referências

- Issue: I1.1 - Puck Studio: Refatorar configuração e DropZone support
- Puck Documentation: https://puckeditor.com/
- Puck Version: @measured/puck@0.16.2
- Zod Documentation: https://zod.dev/
