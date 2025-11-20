# 🚀 Deployment Guide - v0.2-beta to Staging

**Version:** 0.2.0-beta  
**Target Environment:** Staging  
**Date:** 2025-11-20

---

## 📋 Overview

This guide documents the deployment process for EDUCACROSS v0.2-beta to the staging environment. This is a **prototype environment** focused on validation and user testing, not production-grade infrastructure.

### What's in v0.2-beta

- ✅ Sprint 1 (P0): All 5 issues completed
  - C1: API de persistência (CRUD de páginas JSON)
  - B1: Form components (Input, Select, Checkbox, Radio, Switch)
  - D1: Página de Tokens no Storybook
  - E1: Jornada BackOffice - Revisão de Questões
  - F1: ESLint unificado para monorepo

- ✅ Sprint 2 (P1): All 11 issues completed
  - C2: Studio Sidebar com lista de páginas
  - D2: Addon A11y integrado ao Storybook
  - H1: Dashboard planning e wireframe
  - H2: Dashboard endpoint (/api/dashboard/pages)
  - E2: FrontOffice - Jornada de Onboarding
  - E3: Game - Missões da Ilha 1
  - B4: Acessibilidade audit (WCAG 2.1)
  - D3: Play functions para interações
  - H5: Badges e links para Storybook
  - G4: Script de índice automático de jornadas
  - G6: CONTRIBUTING.md

---

## 🎯 Deployment Objectives

### Primary Goals
1. **Validate Infrastructure**: Ensure CI/CD pipeline works correctly
2. **Enable QA Testing**: Make Dashboard flows accessible to testers
3. **Gather User Feedback**: Allow stakeholders to test prototypes
4. **Prepare for v1.0**: Identify blockers and issues before production

### Success Criteria
- [ ] All builds pass successfully (tokens, design-system, studio, storybook)
- [ ] Studio accessible with all saved pages rendering correctly
- [ ] Storybook accessible with all components documented
- [ ] Dashboard API responding correctly
- [ ] No critical accessibility issues in WCAG audit
- [ ] Performance acceptable (< 3s load time)

---

## 🏗️ Architecture

### Components to Deploy

```
EDUCACROSS v0.2-beta
├── Studio (Next.js App)
│   ├── Port: 3000
│   ├── Routes: /, /studio, /[[...slug]], /api/*
│   └── Data: apps/studio/data/pages/*.json
├── Storybook (Static Site)
│   ├── Port: 6006 (dev) / static export
│   └── Components: Design System catalog
└── API
    ├── /api/pages (CRUD páginas)
    └── /api/dashboard/pages (index)
```

### Dependencies
- Node.js 22 LTS
- pnpm 9.14.4+
- Build artifacts: `.next/`, `storybook-static/`

---

## 📦 Pre-Deployment Checklist

### Version Control
- [x] Version bumped to 0.2.0-beta in all package.json
- [x] Git tag `v0.2-beta` exists
- [x] All changes committed and pushed
- [ ] Branch merged to main (if applicable)

### Build Verification
```bash
# Run locally before deployment
pnpm install
pnpm lint
pnpm build

# Verify outputs
ls -la apps/studio/.next
ls -la apps/storybook/storybook-static
```

### Environment Configuration
- [ ] Staging environment variables configured
- [ ] Node version set to 22.x
- [ ] pnpm version set to 9.14.4
- [ ] Build cache configured (optional but recommended)

---

## 🚀 Deployment Methods

### Method 1: Automated (GitHub Actions)

**Trigger:** Push tag or manual workflow dispatch

```bash
# Option A: Push beta tag (auto-triggers deployment)
git tag v0.2.0-beta
git push origin v0.2.0-beta

# Option B: Manual dispatch from GitHub UI
# Go to: Actions → Deploy to Staging → Run workflow
```

**Workflow:** `.github/workflows/deploy-staging.yml`
- Runs on tag push (v*-beta, v*-alpha)
- Builds all packages in production mode
- Uploads build artifacts
- Creates deployment summary

### Method 2: Vercel (Recommended for Prototyping)

**Studio Deployment:**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy Studio to staging
cd apps/studio
vercel --prod --name educacross-studio-staging

# Set environment variables
vercel env add NEXT_PUBLIC_ENV staging
```

**Storybook Deployment:**
```bash
# Deploy Storybook static site
cd apps/storybook
pnpm build
vercel --prod --name educacross-storybook-staging storybook-static/
```

### Method 3: Manual Server Deployment

**Requirements:**
- Ubuntu 20.04+ or similar
- Node.js 22.x installed
- pnpm 9.14.4+ installed
- Nginx or similar reverse proxy

**Steps:**
```bash
# 1. Clone and checkout
git clone https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2.git
cd Ambiente-de-prototipa-o-EDUCACROSS-V2
git checkout v0.2.0-beta

# 2. Install and build
pnpm install --frozen-lockfile
pnpm build

# 3. Start Studio (production)
cd apps/studio
pnpm start
# Runs on http://localhost:3000

# 4. Serve Storybook (static)
cd apps/storybook
npx serve -s storybook-static -p 6006
# Runs on http://localhost:6006
```

**Nginx Configuration:**
```nginx
# /etc/nginx/sites-available/educacross-staging
server {
    listen 80;
    server_name studio-staging.educacross.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

server {
    listen 80;
    server_name storybook-staging.educacross.com;

    location / {
        proxy_pass http://localhost:6006;
    }
}
```

---

## 🧪 Post-Deployment Verification

### Health Checks

**Studio:**
```bash
# Check homepage
curl -I https://studio-staging.educacross.com/

# Check API endpoint
curl https://studio-staging.educacross.com/api/pages

# Check Dashboard API
curl https://studio-staging.educacross.com/api/dashboard/pages
```

**Storybook:**
```bash
# Check catalog
curl -I https://storybook-staging.educacross.com/

# Verify components load
curl https://storybook-staging.educacross.com/iframe.html?id=button--primary
```

### Manual Testing Checklist

#### Studio
- [ ] Homepage loads without errors
- [ ] `/studio` editor loads with Puck interface
- [ ] Sidebar shows list of saved pages
- [ ] Can navigate to existing pages (BackOffice, FrontOffice, Game)
- [ ] Can create new page
- [ ] Can save page changes
- [ ] Can delete page
- [ ] API endpoints respond correctly

#### Storybook
- [ ] Homepage/catalog loads
- [ ] All component stories render
- [ ] Accessibility addon tab visible
- [ ] Play functions execute correctly
- [ ] Tokens page displays all tokens
- [ ] Interactions work (button clicks, form inputs)

#### Dashboard
- [ ] GET /api/dashboard/pages returns JSON
- [ ] Page count correct
- [ ] Domain distribution accurate
- [ ] No missing pages

### Performance Metrics

Target metrics for staging:
- **First Contentful Paint:** < 1.5s
- **Largest Contentful Paint:** < 2.5s
- **Time to Interactive:** < 3.5s
- **Total Blocking Time:** < 200ms
- **Cumulative Layout Shift:** < 0.1

Tools to measure:
- Lighthouse CI
- WebPageTest
- Chrome DevTools

---

## 🔧 Troubleshooting

### Build Failures

**Error: "Cannot find module '@prototipo/tokens'"**
```bash
# Solution: Build dependencies first
pnpm build:tokens
pnpm build:design-system
pnpm build:studio
```

**Error: "ENOENT: no such file or directory, open 'data/pages'"**
```bash
# Solution: Create data directory
mkdir -p apps/studio/data/pages
```

### Runtime Issues

**Error: "Module not found" in browser**
- Check that all builds completed successfully
- Verify environment variables are set
- Clear build cache: `rm -rf .next` and rebuild

**API returning 404**
- Verify API routes exist in `apps/studio/src/app/api/`
- Check Next.js route configuration
- Review server logs for errors

### Performance Issues

**Slow page load**
- Enable build cache in CI/CD
- Optimize images and assets
- Consider lazy loading components
- Review bundle size with `next build` analysis

---

## 📊 Monitoring and Logging

### Key Metrics to Track

1. **Build Time:** Track duration of each build step
2. **Deployment Duration:** Total time from trigger to live
3. **Error Rate:** API errors, page load failures
4. **Page Load Time:** Average load time for Studio and Storybook
5. **User Engagement:** Pages created, components used

### Logging Setup (Optional)

**Application Logs:**
```javascript
// apps/studio/src/app/layout.tsx
if (process.env.NEXT_PUBLIC_ENV === 'staging') {
  console.log('[STAGING] Application started:', new Date().toISOString());
}
```

**API Request Logging:**
```javascript
// apps/studio/src/middleware.ts
export function middleware(request: NextRequest) {
  if (process.env.NEXT_PUBLIC_ENV === 'staging') {
    console.log(`[API] ${request.method} ${request.url}`);
  }
}
```

---

## 👥 QA Testing Guide

### Test Scenarios

See separate document: `docs/qa-testing-guide.md`

### User Testing Sessions

**Schedule:** TBD after deployment
**Participants:** PMs, Designers, Developers
**Duration:** 30-60 min per session
**Focus Areas:**
- Dashboard navigation flows
- BackOffice: Revisão de Questões
- FrontOffice: Onboarding do Aluno
- Game: Missões da Ilha 1

---

## 🔄 Rollback Procedure

If critical issues are found:

```bash
# Option 1: Revert to previous tag
git checkout v0.1.0
vercel --prod

# Option 2: Redeploy previous version
vercel rollback educacross-studio-staging

# Option 3: Take staging offline temporarily
vercel rm educacross-studio-staging
```

---

## 📈 Next Steps After Staging

1. **Collect Feedback:** Gather input from QA and users
2. **Fix Critical Bugs:** Address P0 issues found in testing
3. **Sprint 3 Planning:** Define Sprint 3 tasks (H3, H4, H5, B6)
4. **Performance Optimization:** Based on metrics
5. **v1.0 Preparation:** Define production readiness criteria

---

## 📞 Support and Contact

**Deployment Issues:** Create GitHub issue with label `deployment`
**QA Questions:** See `docs/qa-testing-guide.md`
**Technical Questions:** Check `CONTRIBUTING.md`

---

## 🔖 Version History

- **v0.2.0-beta (2025-11-20):** Initial staging deployment
  - Sprint 1 + Sprint 2 complete (16/20 issues)
  - Dashboard planning complete
  - 3 complete journeys (BackOffice, FrontOffice, Game)

---

**Document Status:** ✅ Ready for deployment  
**Last Updated:** 2025-11-20  
**Next Review:** After v0.2-beta deployment feedback
