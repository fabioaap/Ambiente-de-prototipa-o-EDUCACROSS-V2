# Data Model: Sprint 4 Components

**Feature**: Sprint 4 - BackOffice Essentials & Storybook Branding  
**Date**: 2025-12-03  
**Status**: Complete ✅

---

## Overview

This document defines TypeScript interfaces, enums, and state transitions for the 6 new Design System components:

1. Alert
2. Badge (expanded from existing)
3. Chip
4. Avatar
5. Stats Card
6. Dropdown (Menu + Item)

All components follow Design System patterns:
- `'use client'` directive
- `React.forwardRef` for DOM access (where applicable)
- CSS Modules for styling
- Tokens via CSS variables
- JSDoc prop documentation

---

## 1. Alert Component

### Interface

```typescript
export interface AlertProps {
  /**
   * Visual variant determining color scheme
   * @default 'info'
   */
  variant?: 'success' | 'warning' | 'error' | 'info';
  
  /**
   * Alert message content
   */
  message: string | React.ReactNode;
  
  /**
   * Optional title/heading
   */
  title?: string;
  
  /**
   * Optional icon to display
   * If true, default variant icon shown; if ReactNode, custom icon used
   */
  icon?: boolean | React.ReactNode;
  
  /**
   * Show close button
   * @default false
   */
  closable?: boolean;
  
  /**
   * Callback when close button clicked
   */
  onClose?: () => void;
  
  /**
   * Optional action button
   */
  action?: {
    label: string;
    onClick: () => void;
  };
  
  /**
   * Style variant: filled or outlined
   * @default 'filled'
   */
  style?: 'filled' | 'outlined';
  
  /**
   * Additional CSS class
   */
  className?: string;
  
  /**
   * Test ID for automation
   */
  'data-testid'?: string;
}
```

### States

| State | Description | UI Impact |
|-------|-------------|-----------|
| **Default** | Alert visible with message | Full opacity, border, icon |
| **Hover** (if closable) | Mouse over close button | Close button opacity 1.0 |
| **Closing** | Close animation in progress | Opacity fade 0.3s, height collapse |
| **Closed** | Alert hidden | `display: none` |

### Validation Rules

- `variant`: Must be one of 4 allowed values
- `message`: Required, non-empty
- `closable`: If true, `onClose` should be provided (warning if missing)
- `action`: If provided, must have both `label` and `onClick`

### Default Icons

```typescript
const DEFAULT_ICONS = {
  success: <CheckCircleIcon />,  // ✓
  warning: <AlertTriangleIcon />, // ⚠
  error: <XCircleIcon />,         // ✕
  info: <InfoIcon />,             // ℹ
};
```

---

## 2. Badge Component (Expanded)

### Interface

```typescript
export interface BadgeProps {
  /**
   * Badge variant determining color scheme
   * @default 'neutral'
   */
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'neutral';
  
  /**
   * Badge content (text or number)
   */
  children: React.ReactNode;
  
  /**
   * Size variant
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
  
  /**
   * Style variant
   * @default 'filled'
   */
  style?: 'filled' | 'outlined' | 'soft';
  
  /**
   * Border radius style
   * @default 'sm'
   */
  radius?: 'sm' | 'md' | 'full';
  
  /**
   * Optional icon before text
   */
  icon?: React.ReactNode;
  
  /**
   * Show only dot (no text)
   * Overrides children
   */
  dot?: boolean;
  
  /**
   * Additional CSS class
   */
  className?: string;
  
  /**
   * Test ID for automation
   */
  'data-testid'?: string;
}
```

### Enums

```typescript
export type BadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'neutral';
export type BadgeSize = 'sm' | 'md' | 'lg';
export type BadgeStyle = 'filled' | 'outlined' | 'soft';
export type BadgeRadius = 'sm' | 'md' | 'full';
```

### Size Specifications

| Size | Padding | Font Size | Icon Size | Dot Size |
|------|---------|-----------|-----------|----------|
| `sm` | 2px 6px | 10px | 12px | 6px |
| `md` | 4px 8px | 12px | 14px | 8px |
| `lg` | 6px 12px | 14px | 16px | 10px |

### Color Tokens

| Variant | Filled BG | Filled Text | Outlined Border | Outlined Text | Soft BG | Soft Text |
|---------|-----------|-------------|-----------------|---------------|---------|-----------|
| `primary` | `--colors-primary-600` | white | `--colors-primary-600` | `--colors-primary-600` | `--colors-primary-50` | `--colors-primary-700` |
| `success` | `--colors-success-500` | white | `--colors-success-500` | `--colors-success-600` | `--colors-success-50` | `--colors-success-700` |
| `warning` | `--colors-warning-500` | `--colors-neutral-900` | `--colors-warning-500` | `--colors-warning-600` | `--colors-warning-50` | `--colors-warning-700` |
| `error` | `--colors-error-500` | white | `--colors-error-500` | `--colors-error-600` | `--colors-error-50` | `--colors-error-700` |
| `neutral` | `--colors-neutral-200` | `--colors-neutral-800` | `--colors-neutral-300` | `--colors-neutral-700` | `--colors-neutral-100` | `--colors-neutral-800` |

---

## 3. Chip Component

### Interface

```typescript
export interface ChipProps {
  /**
   * Chip label
   */
  label: string;
  
  /**
   * Visual variant
   * @default 'default'
   */
  variant?: 'default' | 'outlined' | 'primary' | 'success' | 'warning' | 'error';
  
  /**
   * Size variant
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
  
  /**
   * Optional icon before label
   */
  icon?: React.ReactNode;
  
  /**
   * Optional avatar before label
   */
  avatar?: React.ReactNode;
  
  /**
   * Show delete/close button
   * @default false
   */
  deletable?: boolean;
  
  /**
   * Callback when delete button clicked
   */
  onDelete?: () => void;
  
  /**
   * Clickable chip
   * @default false
   */
  clickable?: boolean;
  
  /**
   * Callback when chip clicked (if clickable)
   */
  onClick?: () => void;
  
  /**
   * Selected state (for filter chips)
   * @default false
   */
  selected?: boolean;
  
  /**
   * Disabled state
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Border radius style
   * @default 'full'
   */
  radius?: 'md' | 'full';
  
  /**
   * Additional CSS class
   */
  className?: string;
  
  /**
   * Test ID for automation
   */
  'data-testid'?: string;
}
```

### States

| State | Description | UI Impact |
|-------|-------------|-----------|
| **Default** | Resting state | Standard colors, no interaction |
| **Hover** (if clickable/deletable) | Mouse over chip/delete button | Background darken 5%, cursor pointer |
| **Active/Selected** (if selected=true) | Filter chip selected | Primary background, white text |
| **Focus** (keyboard nav) | Tab focus on chip | Focus ring visible |
| **Disabled** | Chip inactive | Opacity 0.5, cursor not-allowed |

### Validation Rules

- `deletable`: If true, `onDelete` should be provided
- `clickable`: If true, `onClick` should be provided
- `selected`: Only valid if `clickable=true` (filter chip pattern)
- `avatar` and `icon`: Cannot both be provided (warning)

---

## 4. Avatar Component

### Interface

```typescript
export interface AvatarProps {
  /**
   * Image source URL
   */
  src?: string;
  
  /**
   * Alt text for image
   * @default 'Avatar'
   */
  alt?: string;
  
  /**
   * User initials (shown if no image or image fails to load)
   */
  initials?: string;
  
  /**
   * Icon to show (if no image/initials)
   */
  icon?: React.ReactNode;
  
  /**
   * Size variant
   * @default 'md'
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  
  /**
   * Background color (used for initials/icon fallback)
   * @default 'primary'
   */
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'neutral';
  
  /**
   * Status indicator
   */
  status?: 'online' | 'offline' | 'away' | 'busy';
  
  /**
   * Badge (for notification count)
   */
  badge?: number | string;
  
  /**
   * Border style
   * @default 'none'
   */
  border?: 'none' | 'light' | 'bold';
  
  /**
   * Shape
   * @default 'circle'
   */
  shape?: 'circle' | 'square';
  
  /**
   * Additional CSS class
   */
  className?: string;
  
  /**
   * Test ID for automation
   */
  'data-testid'?: string;
}
```

### Size Specifications

| Size | Diameter | Initials Font | Icon Size | Status Indicator | Badge Size |
|------|----------|---------------|-----------|------------------|------------|
| `xs` | 24px | 10px | 12px | 6px | 12px |
| `sm` | 32px | 12px | 16px | 8px | 14px |
| `md` | 40px | 14px | 20px | 10px | 16px |
| `lg` | 64px | 20px | 32px | 14px | 20px |
| `xl` | 96px | 28px | 48px | 18px | 24px |

### Status Colors

| Status | Color Token | Position |
|--------|-------------|----------|
| `online` | `--colors-success-500` | Bottom-right, 15% overlap |
| `offline` | `--colors-neutral-400` | Bottom-right, 15% overlap |
| `away` | `--colors-warning-500` | Bottom-right, 15% overlap |
| `busy` | `--colors-error-500` | Bottom-right, 15% overlap |

### Fallback Logic

```typescript
// Priority order for avatar content:
1. src (image) - if provided and loads successfully
2. initials - if no image or image fails to load
3. icon - if no initials
4. default user icon - if nothing provided
```

### AvatarGroup Component

```typescript
export interface AvatarGroupProps {
  /**
   * Array of avatar elements
   */
  children: React.ReactNode;
  
  /**
   * Maximum avatars to show
   * Remaining shown as "+N"
   * @default 5
   */
  max?: number;
  
  /**
   * Size of avatars in group
   * @default 'md'
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  
  /**
   * Overlap amount (negative margin)
   * @default '-8px'
   */
  spacing?: string;
  
  /**
   * Additional CSS class
   */
  className?: string;
}
```

---

## 5. Stats Card Component

### Interface

```typescript
export interface StatsCardProps {
  /**
   * Card title/label
   */
  title: string;
  
  /**
   * Main value (number or formatted string)
   */
  value: string | number;
  
  /**
   * Optional trend indicator
   */
  trend?: {
    /**
     * Percentage change
     */
    value: number;
    
    /**
     * Direction of trend
     */
    direction: 'up' | 'down';
    
    /**
     * Optional label (e.g., "vs last month")
     */
    label?: string;
  };
  
  /**
   * Optional icon
   */
  icon?: React.ReactNode;
  
  /**
   * Icon background color
   * @default 'primary'
   */
  iconColor?: 'primary' | 'success' | 'warning' | 'error' | 'info' | 'neutral';
  
  /**
   * Optional subtitle/description
   */
  subtitle?: string;
  
  /**
   * Optional chart/visualization
   * Consumer provides chart library component
   */
  children?: React.ReactNode;
  
  /**
   * Card style variant
   * @default 'bordered'
   */
  variant?: 'bordered' | 'filled' | 'shadow';
  
  /**
   * Loading state
   * @default false
   */
  loading?: boolean;
  
  /**
   * Click handler (makes card interactive)
   */
  onClick?: () => void;
  
  /**
   * Additional CSS class
   */
  className?: string;
  
  /**
   * Test ID for automation
   */
  'data-testid'?: string;
}
```

### States

| State | Description | UI Impact |
|-------|-------------|-----------|
| **Default** | Static card display | Standard padding, borders |
| **Loading** | Data fetching | Skeleton placeholders for title/value/trend |
| **Hover** (if onClick) | Mouse over card | Subtle background change, cursor pointer, slight elevation |
| **Focus** (if onClick) | Keyboard focus | Focus ring visible |

### Trend Calculation

```typescript
export interface TrendData {
  value: number;      // Percentage change (e.g., 12.5 for +12.5%)
  direction: 'up' | 'down';
  label?: string;
}

// Trend badge color mapping:
const getTrendVariant = (direction: 'up' | 'down', metric: 'positive' | 'negative') => {
  if (metric === 'positive') {
    return direction === 'up' ? 'success' : 'error';
  } else {
    return direction === 'down' ? 'success' : 'error';
  }
};

// Usage: Revenue trend (positive metric)
<Badge variant={getTrendVariant('up', 'positive')}>↑ 12.5%</Badge>

// Usage: Bounce rate trend (negative metric)
<Badge variant={getTrendVariant('down', 'negative')}>↓ 3.2%</Badge>
```

### Layout Structure

```
┌──────────────────────────────────┐
│ [Icon] Title                     │
│                                  │
│ Value        [Trend Badge]       │
│ Subtitle                         │
│                                  │
│ [Chart/Visualization - children] │
└──────────────────────────────────┘
```

---

## 6. Dropdown Component

### Main Component Interface

```typescript
export interface DropdownProps {
  /**
   * Trigger button/element
   */
  trigger: React.ReactNode;
  
  /**
   * Menu items (DropdownItem components)
   */
  children: React.ReactNode;
  
  /**
   * Controlled open state
   */
  open?: boolean;
  
  /**
   * Default open state (uncontrolled)
   * @default false
   */
  defaultOpen?: boolean;
  
  /**
   * Callback when open state changes
   */
  onOpenChange?: (open: boolean) => void;
  
  /**
   * Menu placement
   * @default 'bottom-start'
   */
  placement?: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end';
  
  /**
   * Offset from trigger (px)
   * @default 5
   */
  offset?: number;
  
  /**
   * Enable collision detection
   * @default true
   */
  avoidCollisions?: boolean;
  
  /**
   * Minimum width (matches trigger width if 'trigger')
   * @default 'trigger'
   */
  minWidth?: number | 'trigger';
  
  /**
   * Additional CSS class for menu
   */
  className?: string;
  
  /**
   * Test ID for automation
   */
  'data-testid'?: string;
}
```

### Menu Item Interface

```typescript
export interface DropdownItemProps {
  /**
   * Item label
   */
  children: React.ReactNode;
  
  /**
   * Click handler
   */
  onSelect?: (event: Event) => void;
  
  /**
   * Optional icon before label
   */
  icon?: React.ReactNode;
  
  /**
   * Optional keyboard shortcut display
   */
  shortcut?: string;
  
  /**
   * Disabled state
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Destructive action styling (e.g., Delete)
   * @default false
   */
  destructive?: boolean;
  
  /**
   * Additional CSS class
   */
  className?: string;
  
  /**
   * Test ID for automation
   */
  'data-testid'?: string;
}
```

### Separator Interface

```typescript
export interface DropdownSeparatorProps {
  /**
   * Additional CSS class
   */
  className?: string;
}
```

### Label Interface

```typescript
export interface DropdownLabelProps {
  /**
   * Label text
   */
  children: React.ReactNode;
  
  /**
   * Additional CSS class
   */
  className?: string;
}
```

### State Transitions

```
┌────────┐   click trigger   ┌─────────┐
│ Closed │ ───────────────> │ Opening │
└────────┘                   └─────────┘
    ↑                             │
    │                             ↓
    │                        ┌──────┐
    │   outside click/Esc    │ Open │
    └───────────────────────│      │
                             └──────┘
                                  │
                                  ↓
                             ┌─────────┐
                             │ Closing │
                             └─────────┘
                                  │
                                  ↓
                             [Closed]
```

### Keyboard Navigation

| Key | Action |
|-----|--------|
| `Space` / `Enter` | Open dropdown (on trigger) |
| `ArrowDown` | Focus next item (wrap to first) |
| `ArrowUp` | Focus previous item (wrap to last) |
| `Home` | Focus first item |
| `End` | Focus last item |
| `Enter` | Select focused item |
| `Escape` | Close dropdown |
| `Tab` | Close dropdown, move focus to next element |

### Accessibility (ARIA)

```typescript
// Trigger
<button
  aria-haspopup="menu"
  aria-expanded={open}
  aria-controls="dropdown-menu-id"
>
  {trigger}
</button>

// Menu
<div
  role="menu"
  id="dropdown-menu-id"
  aria-orientation="vertical"
>
  {/* items */}
</div>

// Item
<div
  role="menuitem"
  tabIndex={disabled ? -1 : 0}
  aria-disabled={disabled}
>
  {children}
</div>

// Separator
<div role="separator" />

// Label
<div role="presentation">
  {children}
</div>
```

---

## Shared Types

### Common Props

```typescript
export interface CommonComponentProps {
  /**
   * Additional CSS class
   */
  className?: string;
  
  /**
   * Test ID for automation
   */
  'data-testid'?: string;
}
```

### Color Variants

```typescript
export type ColorVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'neutral';
```

### Size Variants

```typescript
export type SizeVariant = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
```

---

## Validation Rules Summary

### Alert
- ✅ `variant` must be valid enum
- ✅ `message` required and non-empty
- ⚠️ `closable` without `onClose` → console warning

### Badge
- ✅ `variant`, `size`, `style`, `radius` must be valid enums
- ✅ `dot` overrides `children` (expected behavior)

### Chip
- ✅ `variant`, `size`, `radius` must be valid enums
- ⚠️ `deletable` without `onDelete` → console warning
- ⚠️ `clickable` without `onClick` → console warning
- ⚠️ Both `avatar` and `icon` provided → console warning (use avatar)

### Avatar
- ✅ `size`, `color`, `status`, `border`, `shape` must be valid enums
- ✅ `src` image load failure → fallback to `initials` → `icon` → default icon
- ✅ `initials` truncated to 2 characters max

### Stats Card
- ✅ `title` and `value` required
- ✅ `trend.value` should be positive number (sign determined by `direction`)
- ⚠️ `onClick` without keyboard handler → console warning (a11y)

### Dropdown
- ✅ `placement` must be valid enum
- ✅ Radix UI handles focus management and keyboard nav automatically
- ✅ `onSelect` in DropdownItem closes menu by default (unless `event.preventDefault()`)

---

## Token Mapping

All components reference tokens from `@prototipo/tokens`:

| Token Category | Usage |
|---------------|--------|
| `--colors-*` | All color variants (primary, success, error, etc) |
| `--spacing-*` | Padding, margins, gaps |
| `--borderRadius-*` | Corner rounding (sm, md, full) |
| `--typography-*` | Font families, sizes, weights |
| `--shadows-*` | Elevations (md, lg) |

---

**Data model completed**: 2025-12-03  
**Status**: All 6 component interfaces defined ✅  
**Next step**: Generate JSON schemas in `/contracts/`
