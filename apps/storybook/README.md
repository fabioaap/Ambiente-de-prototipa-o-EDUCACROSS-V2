# Storybook - EDUCACROSS

Catálogo de componentes do Design System.

## Funcionalidades

- **Documentação Interativa**: Explore todos os componentes do `@prototipo/design-system`
- **Playground**: Teste variações de propriedades em tempo real
- **Design Tokens**: Visualize cores, tipografia e espaçamentos
- **Testes de Acessibilidade**: Validação automática de conformidade WCAG com addon a11y

## Componentes Documentados

- **Button**: Botões com múltiplas variantes e tamanhos
- **Text**: Tipografia com controle de estilo
- **Card**: Containers com diferentes estilos
- **Layout**: Sistema de layout responsivo

## Acessibilidade

Este Storybook inclui o **addon a11y** para validação automática de acessibilidade. Todas as stories são verificadas automaticamente contra as diretrizes WCAG 2.0 AA e 2.1 AA.

### Como usar:

1. Inicie o Storybook com `pnpm dev`
2. Navegue até qualquer story
3. Abra a aba **Accessibility** no painel inferior
4. Visualize violações, avisos e validações que passaram

📖 **[Leia a documentação completa de acessibilidade](./ACESSIBILIDADE.md)** para saber mais sobre:
- Como interpretar os resultados
- Configuração de regras
- Boas práticas de acessibilidade
- Exemplos de correções

## Scripts

- `pnpm dev` - Inicia Storybook na porta 6006
- `pnpm build` - Cria build estático do Storybook
- `pnpm lint` - Executa o linter
