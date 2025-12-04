# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.1] - 2025-12-03 — Sprint 4 (DS + Storybook)

### Added
- Design System: validação de Alert, Badge, Chip, Avatar/Group, StatsCard, Dropdown (Radix UI).
- Storybook: Branding EDUCACROSS — tema (manager), assets head (favicons/fonts), ordenação pt-BR (preview).
- Documentação: `validation.md` e `validation-report.md` em `specs/003-sprint4-backoffice-essentials/checklists/`.
- NFRs & Rollback: metas formais e plano de mitigação em `SPRINT3_FINAL_STATUS.md`.

### Changed
- CSS: ordem de `@import` ajustada em Studio/Storybook para remover warnings de PostCSS/Next.

### Build & Quality
- Tokens, Design System, Storybook, Studio, Admin: builds PASS.
- Lint e Type-check: PASS.
- Observações: warnings não bloqueantes — chunks grandes em Storybook (rollup), `eval` em core (upstream).

## [0.3.0] - 2025-11-29

### Added - Design System Consolidation Sprint

#### 🎨 Design Tokens
- Imported Vuexy tokens from Figma via MCP (#7367f0 purple theme)
- Complete token system: colors, spacing, typography, borderRadius, shadows
- MCP validation workflow for token integrity
- Token validation CI/CD pipeline

#### ✨ BackOffice Component Suite (12 new components)
- **Skeleton**: Loading placeholders with variants (text, circle, rectangle, card)
- **Table**: Advanced table component with sorting, pagination, and custom renderers
- **Sidebar**: Collapsible navigation sidebar for BackOffice layouts
- **Breadcrumb**: Hierarchical navigation breadcrumbs
- **Tabs**: Tab navigation with badge support
- **PageHeader**: Page headers with title, count, and subtitle
- **ToolbarButtons**: Import/Export action buttons
- **ActionButtons**: View/Edit/Delete inline actions
- **Pagination**: Page navigation with customizable range
- **DataTable**: Full-featured data table with striped rows and hover states
- **FilterGroup**: Filter controls with horizontal, vertical, and grid layouts
- **Modal**: Modal dialog with small, medium, and large sizes

#### 📚 Storybook Stories
- 12 new story files with 53+ component variants
- Complete BackOffice suite documentation
- Interactive examples for all components
- Props tables and usage guidelines

#### 🏗️ Reference Implementation
- **Banco de Questões**: Complete BackOffice reference page
  - Integrates 10 BackOffice components
  - 5 mock questions with full data structure
  - Filtering, pagination, and CRUD actions
  - Production-ready template for real implementations

#### 🔧 Puck Integration
- Registered 10 BackOffice components in Puck Studio editor
- Full configurability in visual editor
- Props mapping for all component variants

#### 🎨 Card Component Enhancement
- Added CardHeader, CardTitle, CardDescription, CardContent, CardFooter sub-components
- Maintains API compatibility with existing implementations
- CSS Modules styling with design tokens

#### 📖 Documentation
- Complete journey documentation for Banco de Questões
- README with component usage guide
- notas.md with development notes and future improvements
- links.md with comprehensive resource links
- Migration guide references

### Changed

#### 🔄 Component Architecture
- Card component now uses React.forwardRef for better ref handling
- Enhanced Card with sub-component pattern (Header, Title, Description, Content, Footer)
- All BackOffice components follow strict TypeScript typing

#### 📦 Package Exports
- Updated design-system index.ts with all new exports
- Added CardHeader, CardTitle, CardDescription, CardContent, CardFooter exports
- Type exports for all new components

### CI/CD

#### ⚙️ GitHub Actions
- New workflow: `mcp-token-validation.yml`
  - Validates MCP import flag
  - Checks Vuexy purple color (#7367f0)
  - Validates JSON structure
  - Verifies token categories
  - Counts token sufficiency

### Metrics

#### 📊 Component Count
- **Before**: 13 components
- **After**: 25 components
- **Growth**: +92% (12 new components)

#### 📚 Story Count
- **New stories**: 12 story files
- **Total variants**: 53+ documented variants

#### 🎯 Coverage
- **BackOffice suite**: 100% component coverage
- **Storybook docs**: Complete API documentation
- **Type safety**: Strict TypeScript with 0 errors

### Technical Details

#### Component List (25 total)
1. Button
2. Text
3. Card (+ 5 sub-components)
4. Layout
5. Input
6. Select
7. Checkbox
8. Radio
9. Switch
10. Badge
11. Progress
12. Leaderboard
13. HealthIndicator
14. Skeleton ✨ NEW
15. Table ✨ NEW
16. Sidebar ✨ NEW
17. Breadcrumb ✨ NEW
18. Tabs ✨ NEW
19. PageHeader ✨ NEW
20. ToolbarButtons ✨ NEW
21. ActionButtons ✨ NEW
22. Pagination ✨ NEW
23. DataTable ✨ NEW
24. FilterGroup ✨ NEW
25. Modal ✨ NEW

#### Files Created
- `domains/studio/src/app/backoffice/banco-questoes/page.tsx`
- `domains/BackOffice/journeys/banco-questoes/README.md`
- `domains/BackOffice/journeys/banco-questoes/notas.md`
- `domains/BackOffice/journeys/banco-questoes/links.md`
- `.github/workflows/mcp-token-validation.yml`
- 12 Storybook story files in `domains/storybook/src/stories/BackOffice/`

#### Files Modified
- `packages/design-system/src/components/Card/Card.tsx` (added sub-components)
- `packages/design-system/src/components/Card/Card.module.css` (added sub-component styles)
- `packages/design-system/src/index.ts` (added exports)
- `domains/studio/src/config/puck.config.tsx` (registered BackOffice components)

### Reference Page

**Banco de Questões** (`/backoffice/banco-questoes`)
- Full-featured question bank management interface
- Demonstrates all BackOffice components in production context
- Ready-to-use template for similar implementations
- Complete with mock data and interactive examples

### Breaking Changes

None. All changes are additive and backward compatible.

### Migration Guide

No migration required. New components can be imported alongside existing ones:

```typescript
import {
  // Existing
  Button, Card, Badge,
  // New BackOffice Suite
  Sidebar, DataTable, Pagination, FilterGroup
} from '@prototipo/design-system';
```

### Next Steps

- [ ] Complete Shadcn UI removal (Phase 5-6)
- [ ] Bundle size optimization
- [ ] Integration testing
- [ ] Performance benchmarks
- [ ] Dark mode support for BackOffice components

---

## [0.2.0-beta] - 2025-11-20

### Added

#### 🚀 Deployment & CI/CD
- Complete staging deployment infrastructure with Vercel integration
- GitHub Actions workflow for automated CI/CD (`staging-deploy.yml`)
- Vercel configuration files for both Studio and Storybook apps
- Comprehensive deployment documentation (`DEPLOYMENT.md`)
- Environment management for staging and production

#### 📦 Project Structure
- `.vercelignore` for optimized deployments
- Separate `vercel.json` configurations for each app
- Automated build validation in CI pipeline
- Deployment summary reports in GitHub Actions

#### 📚 Documentation
- Complete deployment guide with step-by-step instructions
- Staging environment URLs in README
- Troubleshooting section for common deployment issues
- Rollback procedures for emergency situations
- Version badges in README

### Changed

#### 🔄 Version Management
- Updated all `package.json` files from `0.1.0` to `0.2.0-beta`
  - Root package
  - Studio app
  - Storybook app  
  - Design System package
  - Tokens package

#### 📖 README Updates
- Added staging environment URLs section
- Included quick start guide for staging deployments
- Updated version badge to 0.2.0-beta
- Added link to DEPLOYMENT.md
- Updated footer with current version

### Technical Details

#### Infrastructure
- **Platform:** Vercel (Git Integration)
- **CI/CD:** GitHub Actions
- **Node Version:** 22.x LTS
- **pnpm Version:** 9.14.4
- **Build Order:** tokens → design-system → apps

#### Environments
- **Staging Studio:** https://educacross-studio-staging.vercel.app
- **Staging Storybook:** https://educacross-storybook-staging.vercel.app
- **Production Studio:** https://educacross-studio.vercel.app
- **Production Storybook:** https://educacross-storybook.vercel.app

#### Deployment Triggers
**Staging:**
- Branch: `copilot/deploy-v02-beta-to-staging-again`, `staging`, `release/**`
- Tags: `v*-beta`, `v*-alpha`

**Production:**
- Branch: `main`
- Tags: `v*` (stable releases)

### Build Validation
- ✅ Full monorepo build successful
- ✅ All packages compile without errors
- ✅ Lint passes (1 non-critical warning)
- ✅ Type checking passes
- ✅ Studio builds (Next.js)
- ✅ Storybook builds (static site)

### Files Changed
- `.github/workflows/staging-deploy.yml` (new)
- `.vercelignore` (new)
- `DEPLOYMENT.md` (new)
- `CHANGELOG.md` (new)
- `domains/studio/vercel.json` (new)
- `domains/storybook/vercel.json` (new)
- `package.json` (version)
- `domains/studio/package.json` (version)
- `domains/storybook/package.json` (version)
- `packages/design-system/package.json` (version)
- `packages/tokens/package.json` (version)
- `README.md` (staging URLs, version, deploy guide)

## [0.1.0] - 2024-11-XX

### Initial Release
- Basic monorepo structure with pnpm workspaces
- Studio app with Puck integration
- Storybook app for component documentation
- Design System package with React components
- Tokens package with design tokens
- Documentation structure
- Domain-based journey organization
