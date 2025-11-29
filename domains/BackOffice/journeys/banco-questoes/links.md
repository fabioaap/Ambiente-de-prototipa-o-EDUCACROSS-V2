# Links Úteis - Banco de Questões

## 🏠 Projeto

### Repositório
- **GitHub**: https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2
- **Branch**: copilot/consolidate-agent-design-system
- **PR**: (será criado após merge)

### Documentação Principal
- **README Principal**: `/README.md`
- **Sprint 3 Index**: `/SPRINT3_DOCUMENTATION_INDEX.md`
- **Sprint 3 Execution**: `/SPRINT3_EXECUTION_DETAILED.md`
- **Design System Consolidation**: `/AGENT_DESIGN_SYSTEM_CONSOLIDATION.md`

## 📦 Design System

### Código Fonte
- **Componentes BackOffice**: `/packages/design-system/src/components/`
  - Sidebar: `./Sidebar/Sidebar.tsx`
  - Breadcrumb: `./Breadcrumb/Breadcrumb.tsx`
  - PageHeader: `./PageHeader/PageHeader.tsx`
  - Tabs: `./Tabs/Tabs.tsx`
  - FilterGroup: `./FilterGroup/FilterGroup.tsx`
  - DataTable: `./DataTable/DataTable.tsx`
  - Pagination: `./Pagination/Pagination.tsx`
  - ToolbarButtons: `./ToolbarButtons/ToolbarButtons.tsx`
  - ActionButtons: `./ActionButtons/ActionButtons.tsx`
  - Badge: `./Badge/Badge.tsx`

- **Index**: `/packages/design-system/src/index.ts`
- **Package**: `/packages/design-system/package.json`

### Storybook
- **Local**: http://localhost:6006
- **Stories BackOffice**: `/domains/storybook/src/stories/BackOffice/`
  - Sidebar.stories.tsx
  - Breadcrumb.stories.tsx
  - PageHeader.stories.tsx
  - Tabs.stories.tsx
  - FilterGroup.stories.tsx
  - DataTable.stories.tsx
  - Pagination.stories.tsx
  - ToolbarButtons.stories.tsx
  - ActionButtons.stories.tsx
  - Modal.stories.tsx

## 🎨 Design Tokens

### Figma
- **Vuexy Theme**: https://figma.com/file/vuexy-admin-template
- **Colors Purple**: #7367f0 (primary-500)
- **Tokens JSON**: `/packages/tokens/src/tokens.json`
- **Tokens CSS**: `/packages/tokens/tokens.css`

### Style Guide
- **Typography**: Inter font family
- **Spacing**: 4px base unit (var(--spacing-1) = 4px)
- **Border Radius**: 4px (sm), 6px (md), 8px (lg)
- **Shadows**: Subtle elevations (sm, md, lg)

## 🏗️ Arquitetura

### Estrutura do Projeto
```
/domains
  /studio                     # Next.js 15 App
    /src
      /app
        /backoffice
          /banco-questoes    # 🎯 Esta página
            page.tsx
  /BackOffice               # Domínio BackOffice
    /journeys
      /banco-questoes      # 🎯 Documentação
        README.md
        notas.md
        links.md          # 🎯 Este arquivo
  /storybook               # Catálogo de componentes
    /src/stories

/packages
  /design-system           # Biblioteca de componentes
  /tokens                  # Design tokens
```

### Padrões
- **Atomic Design**: Atoms → Molecules → Organisms
- **Component-driven**: Storybook como fonte de verdade
- **Token-based**: Todos os valores vêm de tokens
- **Type-safe**: TypeScript strict mode

## 📚 Referências Técnicas

### Next.js
- **Docs**: https://nextjs.org/docs
- **App Router**: https://nextjs.org/docs/app
- **Server Components**: https://nextjs.org/docs/app/building-your-application/rendering/server-components

### React
- **Docs**: https://react.dev
- **Hooks**: https://react.dev/reference/react
- **TypeScript**: https://react.dev/learn/typescript

### TypeScript
- **Handbook**: https://www.typescriptlang.org/docs/handbook/intro.html
- **React + TS**: https://react-typescript-cheatsheet.netlify.app

### Storybook
- **Docs**: https://storybook.js.org/docs
- **React**: https://storybook.js.org/docs/react/get-started/introduction
- **Addon Docs**: https://storybook.js.org/docs/react/writing-docs/introduction

### CSS Modules
- **Next.js CSS**: https://nextjs.org/docs/app/building-your-application/styling/css-modules
- **Naming**: https://github.com/css-modules/css-modules

## 🎓 Padrões de BackOffice

### Inspirações
- **AdminLTE**: https://adminlte.io
- **Material Dashboard**: https://www.creative-tim.com/product/material-dashboard
- **Ant Design Pro**: https://pro.ant.design
- **CoreUI**: https://coreui.io

### DataTables
- **DataTables.net**: https://datatables.net
- **AG Grid**: https://www.ag-grid.com
- **React Table**: https://tanstack.com/table/latest

### Filtros
- **Amazon Filters**: https://www.amazon.com (product search)
- **Algolia**: https://www.algolia.com/doc/guides/building-search-ui/
- **Faceted Search**: https://en.wikipedia.org/wiki/Faceted_search

## 🔧 Ferramentas

### Desenvolvimento
- **Node.js**: https://nodejs.org (v20.19.5)
- **pnpm**: https://pnpm.io (v9.14.4)
- **Turbo**: https://turbo.build
- **ESLint**: https://eslint.org
- **Prettier**: https://prettier.io

### Testing
- **Jest**: https://jestjs.io
- **React Testing Library**: https://testing-library.com/react
- **Playwright**: https://playwright.dev

### Build
- **Vite**: https://vitejs.dev
- **tsup**: https://tsup.egoist.dev
- **Next.js Build**: https://nextjs.org/docs/app/building-your-application/deploying

## 📖 BNCC

### Base Nacional Comum Curricular
- **Portal**: http://basenacionalcomum.mec.gov.br
- **Matemática**: http://basenacionalcomum.mec.gov.br/images/BNCC_EI_EF_110518_versaofinal_site.pdf
- **Códigos**: EF06MA01, EF06MA02, etc.

### Habilidades
- **EF06MA01**: Sistema de numeração decimal
- **EF06MA02**: Operações básicas
- **EF06MA03**: Geometria plana
- **EF07MA01**: Números racionais
- **EF08MA02**: Estatística descritiva
- **EF09MA01**: Funções

## 🚀 Deploy

### Vercel
- **Docs**: https://vercel.com/docs
- **Next.js**: https://vercel.com/docs/frameworks/nextjs

### Ambiente
- **Development**: http://localhost:3000
- **Storybook**: http://localhost:6006
- **Production**: (a definir)

## 🤝 Comunidade

### GitHub
- **Issues**: https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/issues
- **Discussions**: https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/discussions
- **Pull Requests**: https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/pulls

### Copilot
- **Instructions**: `/.github/copilot-instructions.md`
- **Agents**: `/.github/agents/`
- **Playbook**: Repository custom instructions

## 📊 Métricas

### Bundle Size
- **Analyzer**: `pnpm build:analyze`
- **Report**: `/domains/studio/.next/analyze/`

### Performance
- **Lighthouse**: Chrome DevTools
- **Web Vitals**: https://web.dev/vitals/

### Code Quality
- **SonarQube**: (a configurar)
- **CodeClimate**: (a configurar)

## 🔐 Segurança

### Best Practices
- **OWASP**: https://owasp.org/www-project-top-ten/
- **Next.js Security**: https://nextjs.org/docs/app/building-your-application/configuring/security-headers

### Autenticação
- **NextAuth.js**: https://next-auth.js.org
- **Clerk**: https://clerk.com
- **Auth0**: https://auth0.com

## 📝 Changelog

### Versões
- **v0.1.0**: Initial release
- **v0.2.0**: Design System consolidation
- **v0.2.1**: BackOffice suite
- **v0.2.2**: Banco de questões reference page

### Migration Guide
- **Shadcn → DS**: `/docs/migration-guide.md` (a criar)
- **Breaking Changes**: `/CHANGELOG.md`

---

**Mantido por**: Design System Team  
**Última atualização**: 2025-11-29  
**Contribua**: Envie PRs ou abra issues!
