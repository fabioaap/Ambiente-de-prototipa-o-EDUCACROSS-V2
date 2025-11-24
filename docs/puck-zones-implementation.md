# Puck DropZone Implementation Guide

**Issue**: #59 - Puck Refactor (DropZone support)  
**Puck Version**: 0.16.2  
**Status**: ✅ Resolved

## Problem Statement

When implementing nested content zones in Puck v0.16.x, importing `DropZone` directly from `@measured/puck` fails during Next.js build because:

1. `DropZone` is not available in the RSC (React Server Component) bundle
2. The puck config is used by both client-side editor and server-side renderer
3. Build error: `Module not found: Can't resolve '@measured/puck' (DropZone export)`

## Solution

In Puck v0.16.x, **DropZone is NOT imported**. Instead, it's accessed via the `puck` context object that's automatically injected into all component render functions.

### Key Pattern

```typescript
render: ({ variant, padding, puck, id }) => {
  return (
    <Card variant={variant} padding={padding}>
      {puck.renderDropZone({ zone: `${id}:content` })}
    </Card>
  );
}
```

### Critical Points

1. **Access via `puck.renderDropZone`**: This is a function provided by Puck context
2. **Zone naming**: Use `${id}:zoneName` format (e.g., `card-dash-1:content`)
3. **No import needed**: DropZone is injected, not imported
4. **Type safety**: `puck` and `id` are automatically typed via `WithPuckProps<Props>` and `WithId<Props>`

## Implementation

### Before (❌ Broken)

```typescript
import { DropZone } from '@measured/puck'; // ❌ Not available in RSC bundle

export type CardProps = {
  variant: 'default' | 'bordered' | 'elevated';
  children: ReactNode[]; // ❌ Manual children management
};

render: ({ variant, children }) => (
  <Card variant={variant}>
    <DropZone zone="content" /> {/* ❌ Cannot import */}
  </Card>
);
```

### After (✅ Working)

```typescript
// No DropZone import needed

export type CardProps = {
  variant: 'default' | 'bordered' | 'elevated';
  // No children prop needed - handled by zones
};

render: ({ variant, puck, id }) => (
  <Card variant={variant}>
    {puck.renderDropZone({ zone: `${id}:content` })}
  </Card>
);
```

## Type Signature

From `@measured/puck` v0.16.2 types:

```typescript
type PuckContext = {
  renderDropZone: (props: DropZoneProps) => JSX.Element;
  isEditing: boolean;
};

type DropZoneProps = {
  zone: string;
  allow?: string[];      // Restrict which components can be dropped
  disallow?: string[];   // Exclude specific components
  style?: CSSProperties;
};

type WithPuckProps<Props> = Props & {
  puck: PuckContext;
  editMode?: boolean;
};

type WithId<Props> = Props & {
  id: string;
};

type PuckComponent<Props> = (
  props: WithId<WithPuckProps<Props>>
) => JSX.Element;
```

## Zone Naming Convention

The zone name follows this pattern: `{componentId}:{zoneName}`

Example from `dashboard.json`:
```json
{
  "content": [
    {
      "type": "Card",
      "props": { "id": "card-dash-1", "variant": "elevated" }
    }
  ],
  "zones": {
    "card-dash-1:content": [
      {
        "type": "Text",
        "props": { "id": "text-card-1", "content": "..." }
      }
    ]
  }
}
```

## Advanced Usage

### Restricting Component Types

```typescript
render: ({ puck, id }) => (
  <Card>
    {puck.renderDropZone({ 
      zone: `${id}:content`,
      allow: ['Text', 'Button'], // Only Text and Button allowed
    })}
  </Card>
);
```

### Multiple Zones

```typescript
render: ({ puck, id }) => (
  <Layout>
    {puck.renderDropZone({ zone: `${id}:header` })}
    {puck.renderDropZone({ zone: `${id}:body` })}
    {puck.renderDropZone({ zone: `${id}:footer` })}
  </Layout>
);
```

## Client vs Server Rendering

The `puck.renderDropZone` pattern works in both contexts:

- **Client-side (Puck editor)**: Renders interactive drop zones for editing
- **Server-side (Next.js Render)**: Renders the zone content from data.zones

This is why you should NOT import DropZone directly - it only exists client-side.

## Validation

Build succeeds with proper zones implementation:

```bash
cd apps/studio
pnpm build
# ✓ Compiled successfully
# ✓ Type checking passed
# ✓ No warnings
```

## References

- Puck Config: `apps/studio/src/config/puck.config.tsx`
- Example Data: `apps/studio/data/pages/dashboard.json`
- Render Component: `apps/studio/src/app/[[...slug]]/page.tsx`
- Puck Docs: https://puckeditor.com/docs/api-reference/configuration/component-config

## Troubleshooting

**Q: Why can't I import DropZone?**  
A: DropZone is only available in the client bundle. Use `puck.renderDropZone` instead.

**Q: How do I access the zone name?**  
A: Use the `id` prop:
```typescript
puck.renderDropZone({ zone: `${id}:content` })
```

**Q: Can I have multiple zones per component?**  
A: Yes! Just use different zone names:
```typescript
puck.renderDropZone({ zone: `${id}:header` })
puck.renderDropZone({ zone: `${id}:body` })
```

**Q: How do I type-check the render function?**  
A: TypeScript automatically infers `puck` and `id` from the component signature. No manual typing needed.
