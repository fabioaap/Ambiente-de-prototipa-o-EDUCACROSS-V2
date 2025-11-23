# Links - Jornada Onboarding

## 🔗 Páginas no Studio

### Fluxo Completo (6 páginas)
1. [Boas-vindas](http://localhost:3000/frontoffice/onboarding/welcome) - Introdução à plataforma
2. [Cadastro](http://localhost:3000/frontoffice/onboarding/cadastro) - Formulário de registro
3. [Confirmação](http://localhost:3000/frontoffice/onboarding/confirmacao) - Verificação de email
4. [Primeiro Login](http://localhost:3000/frontoffice/onboarding/primeiro-login) - Autenticação + Badge
5. [Preferências](http://localhost:3000/frontoffice/onboarding/preferencias) - Configurações personalizadas
6. [Conclusão](http://localhost:3000/frontoffice/onboarding/conclusao) - Finalização

## 📝 Arquivos JSON

### Localização no Repositório
- `apps/studio/data/pages/frontoffice/onboarding/welcome.json`
- `apps/studio/data/pages/frontoffice/onboarding/cadastro.json`
- `apps/studio/data/pages/frontoffice/onboarding/confirmacao.json`
- `apps/studio/data/pages/frontoffice/onboarding/primeiro-login.json`
- `apps/studio/data/pages/frontoffice/onboarding/preferencias.json`
- `apps/studio/data/pages/frontoffice/onboarding/conclusao.json`

## 🎨 Design System

### Componentes Utilizados
- [Button](http://localhost:6006/?path=/story/components-button--default) - Storybook
- [Text](http://localhost:6006/?path=/story/components-text--default) - Storybook
- [Card](http://localhost:6006/?path=/story/components-card--default) - Storybook
- [Layout](http://localhost:6006/?path=/story/components-layout--default) - Storybook

### Componentes Necessários (ainda não implementados)
- Input - Campo de texto com validações
- Radio - Opção única (tipo de usuário, tema)
- Checkbox - Seleção múltipla (notificações, interesses)
- Select - Lista suspensa (idioma)
- Progress - Barra de progresso visual
- Badge - Distintivo de gamificação

## 📚 Documentação

### Arquivos da Jornada
- [README.md](./README.md) - Documentação principal
- [notas.md](./notas.md) - Notas de implementação
- [links.md](./links.md) - Este arquivo

### Referências Externas
- [Puck Documentation](https://puckeditor.com/docs) - Editor visual
- [Next.js App Router](https://nextjs.org/docs/app) - Framework
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/) - Acessibilidade

## 🚀 Como Testar

### 1. Iniciar o Studio
```bash
cd /caminho/para/projeto
pnpm dev:studio
```
Acesse: http://localhost:3000

### 2. Navegar pelas Páginas
- Digite na barra de endereços: `/frontoffice/onboarding/{pagina}`
- Ou use a barra lateral (se implementada) para navegar

### 3. Editar no Puck
- Acesse: http://localhost:3000/studio
- Abra qualquer página da lista
- Edite componentes visualmente
- Salve as alterações

## 📊 Métricas de Sucesso (Futuro)

Quando o backend estiver disponível, rastrear:
- **Completion Rate**: % de usuários que completam todas as 6 etapas
- **Time to Complete**: Tempo médio para concluir o onboarding
- **Skip Rate**: % de usuários que pulam etapas
- **Drop-off Points**: Onde os usuários abandonam o fluxo
- **Conversion Rate**: % que se tornam usuários ativos após onboarding

---

**Criado em**: 2025-11-23  
**Autor**: Sprint 3 - Equipe EDUCACROSS
