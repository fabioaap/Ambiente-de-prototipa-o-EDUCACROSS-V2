# BackOffice Admin Workflow

## Objetivo
Fornecer interface administrativa completa para gestão do sistema EDUCACROSS, incluindo autenticação, dashboard de métricas e gerenciamento de perfil de administradores.

## Status
- **Fase:** Sprint 6 - Phase 14 (US3.4)
- **Prioridade:** P2 (Alta)
- **Estado:** ✅ Completo
- **Data Criação:** 2025-01-09
- **Última Atualização:** 2025-01-09

## Descrição
Jornada administrativa composta por 3 telas principais que cobrem o fluxo completo de uso do backoffice, desde login até gerenciamento de perfil. Utiliza componentes do Design System para garantir consistência visual e acessibilidade.

## Telas da Jornada

### 1. Tela de Login (`tela-1-login.tsx`)
**Objetivo:** Autenticação segura de administradores no sistema

**Componentes Utilizados:**
- `Input` (email e password)
- `Button` (submit)
- `ErrorBanner` (feedback de erros)
- `Text` (títulos e labels)
- `Card` (container do formulário)

**Funcionalidades:**
- Validação de email
- Campo de senha com toggle de visibilidade
- Mensagens de erro contextual
- Feedback visual de loading durante autenticação
- Design responsivo para mobile/tablet/desktop

**Casos de Uso:**
- Login com credenciais válidas
- Tratamento de credenciais inválidas
- Recuperação de senha (link)
- Primeiro acesso

### 2. Dashboard Administrativo (`tela-2-dashboard.tsx`)
**Objetivo:** Visão geral de métricas e indicadores do sistema

**Componentes Utilizados:**
- `Navigation` (menu lateral/top)
- `KPIGrid` (grid de indicadores)
- `StatsCard` (cards de estatísticas)
- `Progress` (barras de progresso)
- `Badge` (status e categorias)

**Funcionalidades:**
- KPIs principais (usuários ativos, sessões, performance)
- Gráficos de tendência
- Navegação entre seções administrativas
- Atualização em tempo real de métricas
- Filtros por período

**Casos de Uso:**
- Monitoramento diário de métricas
- Identificação de anomalias
- Exportação de relatórios
- Navegação para seções específicas

### 3. Gerenciamento de Perfil (`tela-3-perfil.tsx`)
**Objetivo:** Permitir que administradores gerenciem suas informações pessoais

**Componentes Utilizados:**
- `Avatar` (foto de perfil)
- `Input` (nome, email, bio)
- `Button` (salvar, cancelar)
- `Toast` (confirmação de salvamento)
- `Form` (container de formulário)

**Funcionalidades:**
- Edição de nome, email e biografia
- Upload de foto de perfil
- Validação de campos
- Salvamento com feedback visual
- Cancelamento de alterações

**Casos de Uso:**
- Atualização de informações pessoais
- Troca de foto de perfil
- Alteração de email
- Verificação de identidade

## Fluxo de Navegação

```
[Login] → [Dashboard] → [Perfil]
   ↓           ↓            ↓
 Auth      Métricas    Configurações
   ↓           ↓            ↓
Success → Navegação → Salvamento
```

## Design Responsivo

### Mobile (< 640px)
- Layout em coluna única (stacked)
- Menu navigation colapsado (hamburguer)
- KPIs em grid 1 coluna
- Formulários com largura 100%

### Tablet (640px - 1024px)
- Layout em 2 colunas
- Navigation sidebar compacta
- KPIs em grid 2 colunas
- Formulários com largura otimizada

### Desktop (> 1024px)
- Layout em 3 colunas (onde aplicável)
- Navigation sidebar expandida
- KPIs em grid 3-4 colunas
- Formulários com largura máxima definida

## Tecnologias

### Frontend
- **React 18** com TypeScript
- **Next.js 15** (App Router)
- **Design System EDUCACROSS** (componentes reutilizáveis)
- **CSS Modules** (estilos isolados)
- **CSS Grid** (layouts responsivos)

### Tokens de Design
- Spacing: `--spacing-*` (xs, sm, md, lg, xl)
- Colors: `--color-*` (primary, secondary, error, success)
- Typography: `--font-size-*`, `--font-weight-*`
- Radius: `--radius-*` (sm, md, lg)
- Shadows: `--shadow-*` (sm, md, lg)

## Validação e Testes

### Critérios de Aceitação
- ✅ 3 telas implementadas com componentes DS
- ✅ Navegação funcional entre telas
- ✅ Formulários com validação
- ✅ Responsividade mobile/tablet/desktop
- ✅ Feedback visual (loading, errors, success)
- ✅ Acessibilidade (ARIA, keyboard navigation)

### Testes Manuais
1. **Login:** Testar credenciais válidas/inválidas
2. **Dashboard:** Verificar renderização de KPIs e navegação
3. **Perfil:** Testar salvamento e validação de campos
4. **Responsividade:** Testar em 3 breakpoints
5. **Acessibilidade:** Navegação por teclado e screen reader

### Testes Automatizados
- Unit tests para componentes individuais
- Integration tests para fluxo de login
- E2E tests para jornada completa

## Screenshots

### Desktop
![Tela de Login](./screenshots/login-desktop.png)
![Dashboard](./screenshots/dashboard-desktop.png)
![Perfil](./screenshots/perfil-desktop.png)

### Mobile
![Login Mobile](./screenshots/login-mobile.png)
![Dashboard Mobile](./screenshots/dashboard-mobile.png)
![Perfil Mobile](./screenshots/perfil-mobile.png)

## Links Relacionados

### Documentação
- [Design System](../../../../packages/design-system/README.md)
- [Tokens](../../../../packages/tokens/README.md)
- [Sprint 6 Tasks](../../../../specs/005-sprint6-execution/tasks.md)

### Storybook Stories
- [Input Component](http://localhost:6006/?path=/story/components-input--default)
- [Button Component](http://localhost:6006/?path=/story/components-button--default)
- [Navigation Component](http://localhost:6006/?path=/story/components-navigation--default)

### Figma
- [BackOffice Designs](https://figma.com/educacross-backoffice) (placeholder)
- [Admin Workflow](https://figma.com/educacross-admin-flow) (placeholder)

## Notas de Implementação

### Autenticação
- Atualmente usa mock de autenticação
- Produção deve integrar com backend de auth (JWT, OAuth, etc.)
- Implementar refresh token e session management

### Segurança
- Validar inputs no frontend E backend
- Sanitizar dados antes de exibição
- Implementar rate limiting para login
- Usar HTTPS em produção

### Performance
- Lazy loading de componentes pesados
- Memoização de KPIs que não mudam frequentemente
- Debounce em campos de busca/filtro
- Otimização de imagens (avatar)

### Acessibilidade
- ARIA labels em todos os componentes interativos
- Navegação por teclado funcional
- Contraste de cores WCAG 2.1 AA
- Screen reader friendly

## Roadmap Futuro

### Melhorias Planejadas (Sprint 7+)
- [ ] Adicionar tela de gerenciamento de usuários
- [ ] Implementar sistema de permissões (roles)
- [ ] Adicionar logs de auditoria
- [ ] Criar dashboard com gráficos interativos
- [ ] Implementar notificações em tempo real
- [ ] Adicionar suporte a temas (dark mode)

### Integrações
- [ ] Backend API para autenticação real
- [ ] Integração com serviço de email
- [ ] Integração com analytics
- [ ] Integração com sistema de notificações

## Contribuindo

Para adicionar novas telas ou modificar existentes:

1. Criar novo arquivo `tela-N-nome.tsx` no diretório
2. Seguir padrões de nomenclatura e estrutura
3. Utilizar componentes do Design System
4. Adicionar testes unitários
5. Atualizar este README
6. Capturar screenshots
7. Atualizar PROGRESS_DASHBOARD.md

## Contato

- **Squad:** EDUCACROSS Platform Team
- **Product Owner:** [Nome]
- **Tech Lead:** [Nome]
- **Sprint:** Sprint 6 - Phase 14

---

**Última revisão:** 2025-01-09  
**Próxima revisão:** Sprint 7 Planning
