# UX Checklist - Sprint 6

## Design System Compliance
- [ ] Todos os componentes usam `@prototipo/design-system` (nenhum Tailwind puro fora de admin/dashboard)
- [ ] CSS Modules referencia tokens via CSS variables (`var(--color-primary)`, etc)
- [ ] Componentes novos (Progress, Leaderboard) têm stories no Storybook com exemplos reais
- [ ] Puck config (`puck.config.tsx`) registra componentes novos com props corretas

## Painel Inicial (Figma node-id=6480-4789)
- [ ] Layout pixel-fiel ao design (≤5% desvio visual)
- [ ] Responsivo: mobile (375px), tablet (768px), desktop (1440px)
- [ ] KPI cards exibem stats com ícones customizados
- [ ] DataTable com inline Progress + Badge funciona sem scroll horizontal
- [ ] Filtros (Select) estão acessíveis e funcionais
- [ ] ActionButtons com ícones customizados visíveis
- [ ] Sem console errors ao carregar página

## FrontOffice Onboarding (5 telas)
- [ ] Tela 1: Painel Inicial (conforme acima)
- [ ] Tela 2: Boas-vindas (introdução, botão next)
- [ ] Tela 3: Personagem (seletor avatar + confirmação)
- [ ] Tela 4: Primeira Missão (game tutorial, progresso)
- [ ] Tela 5: Parabéns (completion screen, botão voltar)
- [ ] Navegação entre telas funciona (next/prev)
- [ ] Leaderboard exibe top 10 com progress bar

## BackOffice Screens
- [ ] Login tela: form com email/senha, submit button
- [ ] Dashboard tela: KPIs, cards com estatísticas
- [ ] Perfil tela: edit form, salvar mudanças
- [ ] Todas com layout responsivo

## Acessibilidade (WCAG 2.1 AA)
- [ ] Foco keyboard visível em todos os botões/inputs
- [ ] ARIA labels em componentes interativos (buttons, links, form fields)
- [ ] Contraste de cores ≥4.5:1 (texto/background)
- [ ] Textos alt em imagens
- [ ] Ordem de tab lógica

## Interatividade
- [ ] Hover states nos botões
- [ ] Loading states em DataTable quando aplicável
- [ ] Empty states com mensagens amigáveis
- [ ] Mensagens de erro descritivas em formulários
- [ ] Confirmações ao deletar/submeter

## Responsive Design
- [ ] Mobile (375px): stack vertical, font sizes legíveis
- [ ] Tablet (768px): layout adaptado, grids 2-col
- [ ] Desktop (1440px): layout completo, grids 3+ col
- [ ] Sem scroll horizontal em nenhum tamanho

## Performance
- [ ] Page load ≤2s (medido em Lighthouse)
- [ ] Images otimizadas (webp, lazy-loaded)
- [ ] CSS/JS não bloqueia rendering (async/defer onde possível)

## Documentação
- [ ] README em cada journey (BackOffice, FrontOffice, Game Hub) com objetivo + telas
- [ ] Notas.md com insights técnicos e decisões
- [ ] Links.md com referências (Figma, specs, issues)
