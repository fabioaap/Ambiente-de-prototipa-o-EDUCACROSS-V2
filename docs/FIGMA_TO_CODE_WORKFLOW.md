# Figma → Storybook → Code Workflow

**Version:** 1.0  
**Last Updated:** 2025-12-09  
**Maintainer:** EDUCACROSS Sprint 6 Team  
**Status:** ✅ Stable (Tested & Validated)

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Step-by-Step Workflow](#step-by-step-workflow)
4. [Acceptance Criteria](#acceptance-criteria)
5. [Examples](#examples)
6. [Troubleshooting](#troubleshooting)

---

## Overview

This workflow describes how to convert a Figma design into a fully functional React component using the EDUCACROSS Design System, following the **Hybrid Approach (Option D)**.

### Design Classification

Before starting, classify your design:

| Type | Destination | When |
|------|------------|------|
| **Generic Component** | `packages/design-system/src/components/` | Reusable across multiple pages (Button, Card, Modal, etc.) |
| **Specific Screen** | `domains/{domain}/journeys/{journey}/` | Unique to one journey (Login page, Dashboard, Profile) |
| **Mixed** | Both (component + page using it) | Complex page with new generic components |

### Technology Stack

- **Source:** Figma (with FIGMA_ACCESS_TOKEN)
- **Extraction:** REST API (`curl` + Node.js)
- **Design System:** `@prototipo/design-system` (82+ components)
- **Design Tokens:** `@prototipo/tokens` (CSS variables)
- **Stories:** Storybook 8.6.14 (http://localhost:6006/)
- **Framework:** React 18 + TypeScript 5 (strict mode)
- **Styling:** CSS Modules (`.module.css`)

---

## Prerequisites

### Required

- ✅ Node 22.20.0+
- ✅ pnpm 9.14.4+
- ✅ Figma file access (or node-id from shared file)
- ✅ FIGMA_ACCESS_TOKEN in `.env.local`
- ✅ Storybook running: `pnpm dev:hub`

### Optional

- 📌 MCP Server for token extraction (`pnpm mcp:figma:start`)
- 📌 Figma Sync Engine for advanced exports

### Verify Setup

```bash
# Check Node/pnpm
node --version    # v22.20.0+
pnpm --version    # 9.14.4+

# Check Figma token
cat .env.local | grep FIGMA_ACCESS_TOKEN

# Check Design System
ls packages/design-system/dist/  # Should have index.js, index.mjs, index.css

# Check Storybook
curl http://localhost:6006/  # Should return HTML
```

---

## Step-by-Step Workflow

### Phase 1: Analyze Figma Design (10-15 min)

#### 1.1 Open Figma and Identify Components

```
Goal: Map Figma components to Design System components
```

**Actions:**
1. Open Figma file (or ask for share link)
2. Navigate to your screen/frame
3. Copy node-id from URL: `https://figma.com/design/FILE_KEY/...?node-id=123:456`
4. Document each element:

| Figma Element | DS Component | Status | Notes |
|---------------|--------------|--------|-------|
| Button (primary) | `Button` | ✅ Available | Use variant="primary" |
| Input field | `Input` | ✅ Available | Add validation |
| Label | `Text` | ✅ Available | size="sm", weight="medium" |
| Card wrapper | `Card` | ✅ Available | Use CardContent |
| Custom icon | ❌ Not in DS | Create new? | Consider adding to DS |

#### 1.2 Identify Design System Gaps

Ask yourself:

- ❓ Is this element in `@prototipo/design-system`?
- ❓ Does it match an existing component's props?
- ❓ Does it need a new prop/variant?
- ❓ Can I achieve it with CSS Modules?

**Example Decision Tree:**

```
"Login Form with custom header"
├─ Generic header with logo? → Check if reusable
│  └─ YES → Create `PageHeader` component in DS
│  └─ NO → Create in journey page directly
├─ Form inputs? → `Input` component exists ✅
├─ Submit button? → `Button` component exists ✅
└─ Error messages? → `Alert` component exists ✅
```

#### 1.3 Extract Figma Data

**Option A: REST API (Recommended)**

```bash
# 1. Get file/frame details
curl -H "X-FIGMA-TOKEN: $FIGMA_ACCESS_TOKEN" \
  "https://api.figma.com/v1/files/FILE_KEY/nodes?ids=NODE_ID" \
  | jq . > frame.json

# 2. Review structure
cat frame.json | jq '.nodes[0].document' | head -50

# 3. Save for reference
mv frame.json docs/FIGMA_EXPORT_$(date +%s).json
```

**Option B: MCP Server (Alternative)**

```bash
pnpm mcp:figma:start
# Then use provided tools to extract
```

---

### Phase 2: Create Component or Page (30-60 min)

#### 2.1 For Generic Components (add to Design System)

**Location:** `packages/design-system/src/components/{ComponentName}/`

**File Structure:**
```
packages/design-system/src/components/MyComponent/
├── MyComponent.tsx              # Main component
├── MyComponent.module.css        # Styles (CSS Modules)
├── MyComponent.stories.tsx       # Storybook story (in domains/storybook/)
└── index.ts                      # Export (optional)
```

**Example: New `Badge` Component**

```typescript
// packages/design-system/src/components/Badge/Badge.tsx
'use client';

import React from 'react';
import styles from './Badge.module.css';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ children, variant = 'primary', size = 'md', className = '' }, ref) => {
    return (
      <span
        ref={ref}
        className={`${styles.badge} ${styles[variant]} ${styles[size]} ${className}`}
        role="status"
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
```

```css
/* packages/design-system/src/components/Badge/Badge.module.css */
.badge {
  display: inline-block;
  border-radius: var(--radius-md);
  font-weight: 600;
  white-space: nowrap;
}

.primary {
  background-color: var(--color-primary);
  color: var(--color-on-primary);
}

.success {
  background-color: var(--color-success);
  color: var(--color-on-success);
}

.sm {
  padding: var(--space-xs) var(--space-sm);
  font-size: var(--font-size-xs);
}

.md {
  padding: var(--space-sm) var(--space-md);
  font-size: var(--font-size-sm);
}

.lg {
  padding: var(--space-md) var(--space-lg);
  font-size: var(--font-size-base);
}
```

**Then Export:**

```typescript
// packages/design-system/src/index.ts
export { Badge, type BadgeProps } from './components/Badge/Badge';
```

**Build & Test:**

```bash
pnpm build:design-system
pnpm --filter @prototipo/design-system lint
pnpm --filter @prototipo/design-system type-check
```

#### 2.2 For Specific Screens (create journey page)

**Location:** `domains/{domain}/journeys/{journey}/`

**File Structure:**
```
domains/BackOffice/journeys/admin-workflow/
├── README.md                     # Journey documentation
├── notas.md                      # Dev notes
├── links.md                      # References
├── tela-1-login.tsx              # Page component
├── tela-2-dashboard.tsx
└── ...
```

**Example: Login Page**

```typescript
// domains/BackOffice/journeys/admin-workflow/tela-1-login.tsx
'use client';

import React, { useState } from 'react';
import {
  Button,
  Input,
  Text,
  Card,
  Alert,
} from '@prototipo/design-system';
import styles from './login.module.css';

export interface LoginPageProps {
  onLoginSuccess?: () => void;
}

export default function LoginPage({ onLoginSuccess }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // TODO: Implement actual login API call
      // const response = await fetch('/api/login', { ... });
      
      // Mock success
      setTimeout(() => {
        onLoginSuccess?.();
        setLoading(false);
      }, 1000);
    } catch (err) {
      setError('Login failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <div className={styles.header}>
          <Text as="h1" size="lg" weight="bold">
            Admin Login
          </Text>
        </div>

        {error && <Alert variant="danger">{error}</Alert>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <Text as="label" htmlFor="email" size="sm" weight="medium">
              Email
            </Text>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-required
            />
          </div>

          <div className={styles.field}>
            <Text as="label" htmlFor="password" size="sm" weight="medium">
              Password
            </Text>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-required
            />
          </div>

          <Button
            type="submit"
            disabled={loading || !email || !password}
            className={styles.submitBtn}
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
      </Card>
    </div>
  );
}
```

```css
/* domains/BackOffice/journeys/admin-workflow/login.module.css */
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
  padding: var(--space-md);
}

.card {
  width: 100%;
  max-width: 400px;
  padding: var(--space-lg);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
}

.header {
  margin-bottom: var(--space-lg);
  text-align: center;
}

.form {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.field {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.submitBtn {
  margin-top: var(--space-md);
}

/* Responsive */
@media (max-width: 640px) {
  .card {
    max-width: 100%;
    padding: var(--space-md);
  }
}
```

**Create Documentation:**

```markdown
# Admin Login Journey

**Status:** ✅ Complete  
**Screens:** 3 (login, dashboard, profile)  
**Components Used:** Button, Input, Text, Card, Alert  
**Last Updated:** 2025-12-09

## Screens

### 1. Login (tela-1-login.tsx)
- Form validation
- Error handling
- Loading state

### 2. Dashboard (tela-2-dashboard.tsx)
- KPI grid
- Health metrics

### 3. Profile (tela-3-profile.tsx)
- User info edit
- Settings

## Links
- [Figma Design](https://figma.com/...)
- [Related Issues](https://github.com/...)
```

---

### Phase 3: Create Storybook Story (15-20 min)

#### 3.1 Story File

```typescript
// domains/storybook/src/stories/LoginPage.stories.tsx
import type { StoryObj } from '@storybook/react';
import LoginPage from '../../../domains/BackOffice/journeys/admin-workflow/tela-1-login';

const meta = {
  title: 'Journeys/BackOffice/Login',
  component: LoginPage,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof LoginPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
};

export const Tablet: Story = {
  parameters: {
    viewport: { defaultViewport: 'tablet' },
  },
};

export const WithError: Story = {
  args: {
    // Mock error state
  },
};

export const Authenticated: Story = {
  play: async ({ canvasElement }) => {
    // Simulate successful login
    const canvas = within(canvasElement);
    const emailInput = canvas.getByLabelText('Email');
    const passwordInput = canvas.getByLabelText('Password');
    const submitBtn = canvas.getByRole('button', { name: /login/i });

    await userEvent.type(emailInput, 'admin@example.com');
    await userEvent.type(passwordInput, 'password123');
    await userEvent.click(submitBtn);
  },
};
```

#### 3.2 Verify in Storybook

```bash
# Make sure Storybook is running
pnpm dev:hub

# Navigate to http://localhost:6006/
# Find your story: Journeys > BackOffice > Login
```

---

### Phase 4: Validate & Test (10-15 min)

#### 4.1 Quality Checks

```bash
# TypeScript strict mode
pnpm type-check

# ESLint
pnpm lint

# Build entire project
pnpm build

# Check Design System usage
pnpm check:shadcn  # Ensure no forbidden imports
```

#### 4.2 Browser Testing

```bash
# Start dev server
pnpm dev:admin

# Navigate to page and test:
# ✅ Form inputs work
# ✅ Responsive (mobile/tablet/desktop)
# ✅ Accessibility (Tab navigation, labels)
# ✅ No console errors
```

#### 4.3 Accessibility Validation

```bash
# Run axe accessibility test
# (Optional: npx @axe-core/cli http://localhost:3000/your-page)

# Manual checks:
# ✅ Color contrast (WCAG AA 4.5:1)
# ✅ Keyboard navigation (Tab, Arrow, Enter)
# ✅ Screen reader labels (aria-label, htmlFor)
# ✅ Focus visible (outline)
```

---

## Acceptance Criteria

Your implementation is **COMPLETE** when:

### Tier B (CRITICAL + HIGH)

- ✅ **Uses only `@prototipo/design-system`** (no shadcn, no external UI)
- ✅ **CSS Modules for styling** (`.module.css` files)
- ✅ **Story in Storybook** (visible at http://localhost:6006/)
- ✅ **Responsive layout** (mobile 320px, tablet 768px, desktop 1024px+)
- ✅ **WCAG 2.1 AA accessibility** (contrast, labels, keyboard nav)
- ✅ **TypeScript strict mode** (zero warnings via `pnpm type-check`)
- ✅ **No ESLint errors** (warnings acceptable if documented)

### Optional Enhancements

- 📌 Unit test (Vitest) for component logic
- 📌 Story with `play()` function for interaction tests
- 📌 Full E2E test (Playwright)
- 📌 Performance metrics (<2s load time)

---

## Examples

### Example 1: Simple Button Component

**File:** `packages/design-system/src/components/Button/Button.tsx`

```typescript
'use client';

import React from 'react';
import styles from './Button.module.css';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={`${styles.btn} ${styles[variant]} ${styles[size]}`}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? '...' : children}
      </button>
    );
  }
);

Button.displayName = 'Button';
```

### Example 2: Dashboard Page Using Components

**File:** `domains/BackOffice/journeys/admin-workflow/tela-2-dashboard.tsx`

```typescript
'use client';

import React from 'react';
import {
  Card,
  Text,
  Progress,
  HealthIndicator,
  DataTable,
} from '@prototipo/design-system';
import styles from './dashboard.module.css';

export default function DashboardPage() {
  const kpis = [
    { label: 'Active Users', value: '1,234', trend: '+12%' },
    { label: 'Revenue', value: '$45,600', trend: '+8%' },
  ];

  return (
    <div className={styles.container}>
      <Text as="h1">Dashboard</Text>

      <div className={styles.kpiGrid}>
        {kpis.map((kpi) => (
          <Card key={kpi.label}>
            <Text weight="medium">{kpi.label}</Text>
            <Text as="div" size="lg" weight="bold">
              {kpi.value}
            </Text>
            <Text size="sm" className={styles.trend}>
              {kpi.trend}
            </Text>
          </Card>
        ))}
      </div>

      <Card>
        <Text as="h2" size="md" weight="bold">
          System Health
        </Text>
        <HealthIndicator status="healthy" />
      </Card>
    </div>
  );
}
```

---

## Troubleshooting

### Issue: Component not found in Design System

**Error:** `Cannot find module '@prototipo/design-system/Button'`

**Solution:**
1. Check component is exported in `packages/design-system/src/index.ts`
2. Rebuild Design System: `pnpm build:design-system`
3. Clear cache: `rm -rf packages/design-system/dist`

### Issue: TypeScript errors with Design System imports

**Error:** `Type '...' is not assignable to type '...'`

**Solution:**
1. Ensure TypeScript strict mode: `tsconfig.json` has `"strict": true`
2. Check component props match interface
3. Run `pnpm type-check` to see all errors

### Issue: Storybook not showing your story

**Error:** Story doesn't appear in Storybook sidebar

**Solution:**
1. Verify story file is in `domains/storybook/src/stories/`
2. File name ends with `.stories.tsx`
3. Restart Storybook: `pnpm dev:hub`
4. Check browser console for errors

### Issue: CSS not applying (tokens not loading)

**Error:** CSS variables like `var(--color-primary)` are undefined

**Solution:**
1. Ensure tokens are built: `pnpm build:tokens`
2. Check `domains/storybook/.storybook/preview.ts` imports tokens
3. Verify CSS file is `.module.css`

---

## Command Reference

```bash
# Build
pnpm build:tokens              # Build design tokens
pnpm build:design-system       # Build components
pnpm build                      # Build everything

# Development
pnpm dev:hub                    # Start Storybook (http://localhost:6006/)
pnpm dev:admin                  # Start Next.js admin (http://localhost:3000/)

# Quality
pnpm lint                       # ESLint all packages
pnpm type-check                 # TypeScript strict check
pnpm check:shadcn               # Check no forbidden imports

# Testing
pnpm test                       # Run unit tests (Vitest)
pnpm test:watch                 # Watch mode

# Git
git checkout -b feature/ds-{component-name}  # Create feature branch
git add .
git commit -m "feat(ds): Add {Component} (#XX)"
git push origin feature/ds-{component-name}
```

---

## FAQ

**Q: Can I use Tailwind CSS instead of CSS Modules?**  
A: No. Design System components must use CSS Modules + tokens for consistency. Tailwind allowed only in admin/dashboard app.

**Q: How do I add a new prop to existing component?**  
A: 1. Update interface, 2. Update implementation, 3. Add story variant, 4. Rebuild, 5. Test.

**Q: What if Figma design doesn't match Design System?**  
A: Evaluate: (a) Extend component with new variant/prop, (b) Create new generic component, (c) Handle in journey CSS.

**Q: How often should I rebuild Design System?**  
A: After any code changes: `pnpm build:design-system`. Storybook dev mode watches automatically.

---

## Related Documentation

- [Design System Architecture](../design-system.md)
- [Design Tokens Reference](../tokens.md)
- [Storybook Setup](../storybook-setup.md)
- [Accessibility Guidelines](../accessibility.md)

---

**Last Reviewed:** 2025-12-09  
**Next Review:** 2025-12-23
