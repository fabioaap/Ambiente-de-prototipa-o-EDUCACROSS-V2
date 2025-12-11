# Painel Inicial - Front Office

## 📋 Objetivo

Criar o painel inicial do Front Office com visão geral das atividades do aluno, incluindo:
- Status de progresso
- Próximas atividades
- Notificações
- Estatísticas rápidas

## 🎨 Design Figma

**Link**: https://www.figma.com/design/5MQ9H24Zojzd8jcnHO61lK/-Front-Office--Pain%C3%A9is-Iniciais?node-id=6482-6149&m=dev

**Frame ID**: 6482-6149  
**File ID**: 5MQ9H24Zojzd8jcnHO61lK

## 🚧 Status

- [x] Planejamento
- [x] Análise do design
- [ ] Implementação de componentes
- [ ] Testes
- [ ] Concluído

## 🧩 Componentes Utilizados

### Do Design System (`@prototipo/design-system`)
- **Layout** - Container responsivo principal
- **Card** - Cards para seções (Progress, Atividades, Notificações)
- **StatsCard** - Cards de estatísticas rápidas
- **Progress** - Barra de progresso do aluno
- **Badge** - Status de atividades
- **Button** - Ações principais
- **Text** - Tipografia consistente
- **Avatar** - Foto do perfil do aluno

## 📐 Estrutura da Página

```
┌─────────────────────────────────────────────────┐
│ [Header com saudação e avatar]                  │
├─────────────────────────────────────────────────┤
│ [Stats Cards - 4 métricas]                      │
│ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐               │
│ │ 📊  │ │ ✅  │ │ 🎯  │ │ ⭐  │               │
│ └─────┘ └─────┘ └─────┘ └─────┘               │
├─────────────────────────────────────────────────┤
│ [Progresso Geral]                               │
│ ████████░░ 80%                                  │
├─────────────────────────────────────────────────┤
│ [Próximas Atividades]                           │
│ • Atividade 1 [Badge: Pendente]                │
│ • Atividade 2 [Badge: Em Andamento]            │
│ • Atividade 3 [Badge: Pendente]                │
├─────────────────────────────────────────────────┤
│ [Notificações Recentes]                         │
│ 🔔 Nova atividade disponível                    │
│ 🔔 Prazo se aproximando                         │
└─────────────────────────────────────────────────┘
```

## 🔗 Links

- [Figma Design](https://www.figma.com/design/5MQ9H24Zojzd8jcnHO61lK/-Front-Office--Pain%C3%A9is-Iniciais?node-id=6482-6149&m=dev)
- [Design System](../../packages/design-system/)
- [Storybook](http://localhost:6006)

## 📝 Notas de Implementação

- Usar apenas componentes do `@prototipo/design-system`
- Não utilizar Shadcn UI (regra de arquitetura)
- Responsivo: mobile-first
- Acessibilidade: ARIA labels em todos os elementos interativos
- Performance: Lazy loading de imagens/avatares

## 🎯 Métricas de Sucesso

- [ ] Página carrega em < 2s
- [ ] 100% responsiva (mobile, tablet, desktop)
- [ ] Score de acessibilidade > 90
- [ ] 0 erros no console
- [ ] Todos componentes têm stories no Storybook
