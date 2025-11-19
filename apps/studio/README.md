# Studio - EDUCACROSS

Aplicação Next.js com Puck integrado para prototipação visual.

## Funcionalidades

- **Editor Visual**: Rota `/studio` com Puck para criar páginas visualmente
- **Renderização Dinâmica**: Todas as outras rotas renderizam páginas salvas em JSON
- **Componentes do Design System**: Integração completa com `@prototipo/design-system`

## Como usar

1. Acesse `/studio` para abrir o editor visual
2. Arraste componentes da barra lateral para construir sua página
3. As páginas são salvas automaticamente no `localStorage`
4. Para salvar permanentemente, implemente integração com backend

## Scripts

- `pnpm dev` - Inicia o servidor de desenvolvimento na porta 3000
- `pnpm build` - Cria build de produção
- `pnpm start` - Inicia o servidor de produção
- `pnpm lint` - Executa o linter
