# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

#### 🏠 Experience Hub Consolidation
- Created `apps/experience-hub/` directory for centralized Storybook and utilities
- Migrated Storybook from `apps/storybook` to `apps/experience-hub/storybook`
- New scripts: `pnpm dev:hub`, `pnpm build:hub`
- Backwards-compatible aliases: `pnpm dev:storybook`, `pnpm build:storybook`
- Experience Hub README with complete documentation

#### 📚 Documentation Updates
- Updated `domains/README.md` with Experience Hub links
- Updated `domains/INDEX.md` with all current journeys (4 total)
- Updated `SPRINT3_FINAL_STATUS.md` with Experience Hub progress

### Changed

#### 🔄 Project Structure
- Storybook now lives under `apps/experience-hub/storybook`
- Package name changed from `storybook` to `experience-hub`
- Updated `pnpm-workspace.yaml` to include `apps/experience-hub/*`
- Updated root `package.json` scripts to reference `experience-hub`

### Removed
- Removed legacy `apps/storybook` directory (migrated to experience-hub)

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
- `apps/studio/vercel.json` (new)
- `apps/storybook/vercel.json` (new)
- `package.json` (version)
- `apps/studio/package.json` (version)
- `apps/storybook/package.json` (version)
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
