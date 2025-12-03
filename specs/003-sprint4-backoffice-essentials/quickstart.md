# Quick Start: Sprint 4 Components

**Feature**: Sprint 4 - BackOffice Essentials & Storybook Branding  
**Date**: 2025-12-03  
**Audience**: Developers implementing or consuming Sprint 4 components

---

## Prerequisites

- **Node.js**: 22.21.1 (enforced by `.nvmrc`)
- **pnpm**: 9.14.4+
- **Git**: Latest stable
- **Editor**: VS Code recommended (with ESLint, Prettier extensions)

---

## Development Setup

### 1. Clone & Install

```bash
# Clone repository
git clone https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2.git
cd Ambiente-de-prototipa-o-EDUCACROSS-V2

# Checkout feature branch
git checkout feature/sprint4-backoffice-essentials

# Verify Node version
node --version  # Should output: v22.21.1

# Install dependencies (frozen lockfile)
pnpm install --frozen-lockfile
```

### 2. Build Order (Critical!)

Build MUST follow this order:

```bash
# Step 1: Build tokens (CSS variables)
pnpm build:tokens

# Step 2: Build design system (new components)
pnpm --filter @prototipo/design-system build

# Step 3: Build storybook (optional, for local preview)
pnpm build:storybook
```

**Why this order?**
- Design system depends on tokens CSS
- Storybook depends on built design system
- Out-of-order builds will fail with missing module errors

### 3. Run Development Servers

```bash
# Terminal 1: Storybook (component preview)
pnpm dev:storybook
# Opens: http://localhost:6006

# Terminal 2: Studio (if testing Puck integration)
pnpm dev:studio
# Opens: http://localhost:3000
```

---

## Component Usage Examples

### Alert

```tsx
import { Alert } from '@prototipo/design-system';

// Basic usage
<Alert 
  variant="success" 
  message="Operation completed successfully!" 
/>

// With close button
<Alert 
  variant="warning"
  title="Warning"
  message="Your session will expire in 5 minutes"
  closable
  onClose={() => console.log('Alert closed')}
/>

// With action button
<Alert
  variant="error"
  message="Failed to save changes"
  action={{
    label: "Retry",
    onClick: () => console.log('Retry clicked')
  }}
/>
```

### Badge

```tsx
import { Badge } from '@prototipo/design-system';

// Basic badge
<Badge variant="primary">New</Badge>

// With icon
<Badge variant="success" icon={<CheckIcon />}>
  Verified
</Badge>

// Outlined style
<Badge variant="error" style="outlined" radius="full">
  5
</Badge>

// Dot indicator
<Badge variant="success" dot />
```

### Chip

```tsx
import { Chip } from '@prototipo/design-system';

// Basic chip
<Chip label="JavaScript" />

// Deletable chip
<Chip 
  label="React" 
  deletable 
  onDelete={() => console.log('Chip deleted')} 
/>

// Clickable filter chip
<Chip
  label="In Progress"
  clickable
  selected={true}
  onClick={() => console.log('Filter toggled')}
/>

// With avatar
<Chip
  label="John Doe"
  avatar={<Avatar src="/avatar.jpg" size="xs" />}
  deletable
/>
```

### Avatar

```tsx
import { Avatar, AvatarGroup } from '@prototipo/design-system';

// Image avatar
<Avatar src="/user-photo.jpg" alt="John Doe" />

// Initials fallback
<Avatar initials="JD" color="primary" size="lg" />

// With status indicator
<Avatar 
  src="/user.jpg" 
  status="online" 
  size="md" 
/>

// With badge (notifications)
<Avatar src="/user.jpg" badge={3} />

// Avatar group
<AvatarGroup max={3} size="sm">
  <Avatar src="/user1.jpg" />
  <Avatar src="/user2.jpg" />
  <Avatar src="/user3.jpg" />
  <Avatar src="/user4.jpg" />
  <Avatar src="/user5.jpg" />
  {/* Shows 3 avatars + "+2" */}
</AvatarGroup>
```

### Stats Card

```tsx
import { StatsCard } from '@prototipo/design-system';
import { DollarIcon } from 'lucide-react';

// Simple stats card
<StatsCard
  title="Total Revenue"
  value="$24,500"
  trend={{ value: 12.5, direction: 'up' }}
  icon={<DollarIcon />}
  iconColor="success"
/>

// With subtitle
<StatsCard
  title="Active Users"
  value="1,234"
  subtitle="Last 30 days"
  trend={{ value: 8.3, direction: 'up', label: 'vs last month' }}
/>

// With chart (consumer provides)
<StatsCard
  title="Revenue"
  value="$24,500"
  trend={{ value: 12.5, direction: 'up' }}
>
  <YourChartComponent data={chartData} />
</StatsCard>

// Clickable card
<StatsCard
  title="View Details"
  value="$24,500"
  onClick={() => navigate('/details')}
/>
```

### Dropdown

```tsx
import { 
  Dropdown, 
  DropdownItem, 
  DropdownSeparator, 
  DropdownLabel 
} from '@prototipo/design-system';
import { Button } from '@prototipo/design-system';

// Basic dropdown
<Dropdown trigger={<Button>Actions</Button>}>
  <DropdownItem onSelect={() => console.log('Edit')}>
    Edit
  </DropdownItem>
  <DropdownItem onSelect={() => console.log('Duplicate')}>
    Duplicate
  </DropdownItem>
  <DropdownSeparator />
  <DropdownItem destructive onSelect={() => console.log('Delete')}>
    Delete
  </DropdownItem>
</Dropdown>

// With icons and shortcuts
<Dropdown trigger={<Button icon={<MoreIcon />} />}>
  <DropdownLabel>Actions</DropdownLabel>
  <DropdownItem icon={<EditIcon />} shortcut="⌘E">
    Edit
  </DropdownItem>
  <DropdownItem icon={<CopyIcon />} shortcut="⌘D">
    Duplicate
  </DropdownItem>
  <DropdownSeparator />
  <DropdownItem icon={<TrashIcon />} destructive shortcut="⌘⌫">
    Delete
  </DropdownItem>
</Dropdown>

// Controlled state
const [open, setOpen] = useState(false);

<Dropdown 
  trigger={<Button>Menu</Button>}
  open={open}
  onOpenChange={setOpen}
  placement="bottom-end"
>
  <DropdownItem onSelect={() => { setOpen(false); }}>
    Close Menu
  </DropdownItem>
</Dropdown>
```

---

## Storybook Customization

### Viewing Customizations

After running `pnpm dev:storybook`, you'll see:

- **Logo**: EDUCACROSS logo in sidebar header
- **Theme**: Purple primary color (#5f4de5)
- **Font**: Montserrat throughout
- **Favicon**: EDUCACROSS logo in browser tab
- **Introduction**: Custom welcome page at `/`
- **Story Order**: Logical hierarchy (Introduction → Tokens → Components)
- **Backgrounds**: Custom EDUCACROSS backgrounds in toolbar

### Testing Customizations Locally

```bash
# Build static Storybook
pnpm build:storybook

# Serve built Storybook
npx http-server domains/storybook/storybook-static -p 6007

# Open: http://localhost:6007
```

---

## Quality Checks

### Before Committing

```bash
# Run all quality checks
pnpm build           # Tokens + Design System + Storybook
pnpm lint            # ESLint + Prettier
pnpm -r type-check   # TypeScript strict mode

# Check console (no errors)
pnpm dev:storybook   # Visit http://localhost:6006, open DevTools
```

### Validation Checklist

- [ ] `pnpm build` completes without errors
- [ ] `pnpm lint` reports 0 warnings
- [ ] `pnpm -r type-check` passes (0 errors)
- [ ] Storybook loads at `http://localhost:6006`
- [ ] Console shows 0 errors (check DevTools)
- [ ] All stories render without warnings
- [ ] Components follow design system patterns:
  - [ ] `'use client'` directive present
  - [ ] `React.forwardRef` used (if DOM access needed)
  - [ ] Props documented with JSDoc
  - [ ] CSS Modules (not inline styles)
  - [ ] Tokens via CSS variables
  - [ ] Exported in `packages/design-system/src/index.ts`

---

## Troubleshooting

### Issue: "Module not found: @prototipo/tokens/dist/tokens.css"

**Cause**: Tokens not built  
**Fix**:
```bash
pnpm build:tokens
pnpm --filter @prototipo/design-system build
```

### Issue: "Cannot find module '@prototipo/design-system'"

**Cause**: Design system not built  
**Fix**:
```bash
pnpm --filter @prototipo/design-system build
```

### Issue: Storybook shows blank page

**Cause**: Build errors or missing stories  
**Fix**:
1. Check browser console for errors
2. Rebuild: `pnpm build:storybook`
3. Clear cache: `rm -rf domains/storybook/node_modules/.cache`

### Issue: CSS Modules not applying

**Cause**: tsup config issue or import order  
**Fix**:
1. Verify `tsup.config.ts` includes `injectStyle: true`
2. Check component imports CSS Module correctly:
   ```tsx
   import styles from './Component.module.css';
   ```
3. Rebuild design system

### Issue: Radix UI Dropdown not positioning correctly

**Cause**: Portal rendering or z-index conflict  
**Fix**:
1. Ensure `<DropdownMenu.Portal>` wraps content
2. Check z-index in CSS Module (should be > parent)
3. Verify `avoidCollisions={true}` prop

### Issue: Montserrat font not loading

**Cause**: Font files missing or incorrect path  
**Fix**:
1. Verify fonts exist: `ls domains/storybook/public/fonts/montserrat/`
2. Check `preview-fonts.css` paths match files
3. Ensure `preview.ts` imports `preview-fonts.css`

### Issue: Favicon not showing

**Cause**: Browser cache or incorrect path  
**Fix**:
1. Hard refresh: `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)
2. Check file exists: `ls domains/storybook/public/branding/favicon.svg`
3. Verify `manager-head.html` paths are correct

---

## Testing Components

### Manual Testing in Storybook

1. Navigate to component story
2. Use **Controls** panel to test props
3. Check **Accessibility** tab for WCAG issues
4. Test keyboard navigation (Tab, Enter, Escape, Arrows)
5. Verify focus rings visible
6. Test with screen reader (optional but recommended)

### Screenshot Validation (Fidelity Check)

```bash
# Capture Storybook screenshot
# (Manual: use browser DevTools screenshot tool)

# Compare with Figma reference
# Open: https://www.figma.com/design/UstdVUNj2isUdfucUj5EAx/vuexy-figma-dashboard-ui-kit-and-builder-v4
# Find component node-id from SPRINT4_PLANNING.md
# Visual comparison: colors, spacing, border radius, typography
```

---

## Dependencies

### Added in Sprint 4

```json
{
  "dependencies": {
    "@radix-ui/react-dropdown-menu": "2.1.16"
  }
}
```

### Peer Dependencies (Already in Project)

- `react@18.3.1`
- `react-dom@18.3.1`
- `@prototipo/tokens@workspace:*`

---

## Next Steps

After completing Sprint 4:

1. **Update Figma Reference**: Mark components as ✅ in `.specify/memory/figma-vuexy-reference.md`
2. **Document Fidelity Scores**: Record % fidelity for each component
3. **Create PR**: Include screenshots, build logs, fidelity comparison
4. **Run SpecKit**: Post `/spec` comment on PR
5. **Merge to main**: After CI passes + manual review

---

## Resources

- **Figma Vuexy**: [Design source](https://www.figma.com/design/UstdVUNj2isUdfucUj5EAx/vuexy-figma-dashboard-ui-kit-and-builder-v4?node-id=870-37366)
- **Radix UI Docs**: [Dropdown Menu](https://www.radix-ui.com/primitives/docs/components/dropdown-menu)
- **Constitution**: `.specify/memory/constitution.md` (v1.0.0)
- **Sprint 4 Planning**: `.specify/memory/SPRINT4_PLANNING.md`
- **Figma Validation**: `.specify/memory/figma-validation-checklist.md`

---

**Quick Start completed**: 2025-12-03  
**Status**: Developer setup guide ready ✅  
**Next phase**: Implementation (execute tasks from `tasks.md`)
