# Jornada: Onboarding de Usuários

> 🎓 Jornada de boas-vindas e primeiros passos para novos usuários da plataforma EDUCACROSS

## 🎯 Objetivo

Criar uma experiência de onboarding intuitiva e orientada que guie novos usuários pelos primeiros passos na plataforma, validando a compreensão dos conceitos principais e aumentando o engajamento inicial. Esta jornada transforma a primeira experiência do usuário em um momento de descoberta guiada e motivadora.

## 📋 Contexto de Negócio

- **Para quem?** Usuários novos (estudantes e educadores) que acessam a plataforma pela primeira vez
- **Por que é importante?** Reduzir a curva de aprendizado inicial, aumentar taxa de ativação (activation rate), criar primeira impressão positiva que leva a maior retention de longo prazo
- **Quando será usado?** 
  - Na primeira visitação após criação de conta
  - Pode ser reativado pelo usuário via menu "Ajuda > Tour Guiado"
  - Automaticamente sugerido após 30 dias de inatividade

## 🚀 Fluxo da Jornada (4 Etapas)

### Etapa 1: Boas-vindas
**Objetivo**: Criar conexão emocional e explicar valor da plataforma
- Mensagem personalizada de boas-vindas
- Breve descrição do que é EDUCACROSS
- Principais benefícios destacados
- Indicador de progresso: "Passo 1 de 4"

### Etapa 2: Tutorial de Navegação
**Objetivo**: Ensinar estrutura básica da plataforma
- Como usar o menu principal
- Explorar os 3 domínios (BackOffice, FrontOffice, Game)
- Encontrar e iniciar jornadas
- Indicador de progresso: "Passo 2 de 4"

### Etapa 3: Primeiro Jogo/Atividade
**Objetivo**: Engajamento prático e gamificação
- Jogar um mini-game de demonstração
- Ganhar primeiro badge/conquista
- Entender mecânica de pontos
- Visualizar progresso no leaderboard
- Indicador de progresso: "Passo 3 de 4"

### Etapa 4: Conclusão e Próximos Passos
**Objetivo**: Reforçar aprendizado e direcionar ação
- Resumo do que foi aprendido
- Recursos adicionais disponíveis
- Sugestão de próximas jornadas
- Indicador de progresso: "Concluído! 🎉"

## 🔗 Protótipos Relacionados

### Páginas no Studio
- [Tela de Boas-vindas](http://localhost:3000/frontoffice/onboarding/welcome)
- [Tutorial: Navegação](http://localhost:3000/frontoffice/onboarding/tutorial-nav)
- [Tutorial: Primeiro Jogo](http://localhost:3000/frontoffice/onboarding/tutorial-game)
- [Confirmação/Conclusão](http://localhost:3000/frontoffice/onboarding/done)

### Acesso ao Studio (Editor)
- [Editar Welcome](http://localhost:3000/studio?slug=frontoffice/onboarding/welcome)
- [Editar Tutorial Nav](http://localhost:3000/studio?slug=frontoffice/onboarding/tutorial-nav)
- [Editar Tutorial Game](http://localhost:3000/studio?slug=frontoffice/onboarding/tutorial-game)
- [Editar Conclusão](http://localhost:3000/studio?slug=frontoffice/onboarding/done)

## 🧩 Componentes Utilizados

### Componentes Implementados
- ✅ `Layout` - Container principal responsivo com sidebar/header
- ✅ `Button` - CTAs principais (Começar, Próximo, Pular, Continuar)
- ✅ `Card` - Cards informativos para destacar benefícios e features
- ✅ `Text` - Tipografia hierárquica (h1, h2, body, caption)
- ✅ `Progress` - **NOVO!** Barra de progresso linear do onboarding (25%, 50%, 75%, 100%)
- ✅ `Badge` - Tags e indicadores de conquistas
- ✅ `Input` - Campos para personalização (nome, preferências)
- ✅ `Checkbox` - Opções de preferências iniciais

### Componentes Disponíveis para Uso Futuro
- ✅ `Progress` (circular) - Pode ser usado para mostrar passos completados em formato circular
- ✅ `Leaderboard` - **NOVO!** Útil na Etapa 3 para mostrar ranking após primeiro jogo

### Componentes Futuros Necessários
- [ ] `Stepper` - Componente especializado para navegação entre passos (alternativa ao Progress linear)
- [ ] `InfoBox` / `Tooltip` - Caixas de informação/dicas contextuais
- [ ] `Modal` - Para dicas opcionais sem sair da página
- [ ] `Confetti` - Animação de celebração ao completar onboarding

## 📊 Status
- **Status atual**: ✅ **Concluído** (Sprint 3)
- **Última atualização**: 2025-11-24
- **Páginas planejadas**: 4 (Welcome, Tutorial Nav, Tutorial Game, Done)
- **Componentes disponíveis**: 100% dos componentes base necessários
- **Progresso**: Documentação completa, pronto para implementação no Studio

## 💡 Decisões de Design

### Decisão 1: Onboarding em Páginas Separadas vs Modal Overlay
- **O que decidimos**: Usar páginas separadas (não modal) com navegação clara e linear
- **Por que**: 
  - Melhor experiência em mobile (telas pequenas)
  - Não bloqueia visualização do conteúdo principal
  - Permite voltar e revisar etapas anteriores
  - Mais acessível (leitores de tela)
- **Alternativas consideradas**: 
  - Modal overlay (intrusivo, difícil em mobile)
  - Inline hints/tooltips (menos estruturado, fácil de ignorar)
  - Video tutorial (difícil produzir, manter atualizado)
- **Trade-offs**: Requer mais navegação entre páginas, mas oferece melhor controle e UX

### Decisão 2: Onboarding Obrigatório vs Opcional
- **O que decidimos**: Opcional com botão "Pular" visível em cada etapa, mas fortemente incentivado para novos usuários
- **Por que**: 
  - Respeita autonomia de usuários experientes ou com pressa
  - Ainda atrai e guia usuários novos que precisam
  - Reduz frustração ("eu já sei isso")
- **Alternativas consideradas**: 
  - Completamente obrigatório (pode frustrar, aumentar bounce rate)
  - Completamente opcional sem incentivo (baixa taxa de adoção, ~10%)
  - Obrigatório apenas para estudantes (discriminatório)
- **Trade-offs**: Menor completion rate (~60-70%), mas melhor satisfação geral

### Decisão 3: Uso de Progress Component vs Stepper Custom
- **O que decidimos**: Usar componente `Progress` (linear) do Design System para indicar progresso do onboarding
- **Por que**: 
  - Já implementado e testado
  - Consistente com o restante da plataforma
  - Fácil de entender (barra crescendo)
  - Pode mostrar % exato (25%, 50%, 75%, 100%)
- **Alternativas consideradas**: 
  - Stepper com números (1→2→3→4) - mais explícito mas ocupa mais espaço
  - Dots indicator (minimalista mas menos informativo)
  - Sem indicador (usuário perdido)
- **Trade-offs**: Progress bar é genérico, mas comunica bem o objetivo

### Decisão 4: Gamificação Integrada no Onboarding
- **O que decidimos**: Integrar elementos de game na Etapa 3, com mini-game demo e primeiro badge
- **Por que**: 
  - Aumenta engajamento emocional desde o início
  - Demonstra valor core da plataforma (aprendizado lúdico)
  - Cria senso de conquista (primeiro badge)
  - Introduz mecânica de pontos/leaderboard naturalmente
- **Alternativas consideradas**: 
  - Sem gamificação (onboarding tradicional chato)
  - Gamificação full (todos os passos são jogos - confuso)
  - Gamificação apenas após onboarding (perde impacto inicial)
- **Trade-offs**: Mais complexo implementar, requer mini-game funcional, mas ROI alto em engajamento

### Decisão 5: Personalização no Início vs Depois
- **O que decidimos**: Coletar preferências mínimas (nome, perfil) no início, personalização avançada depois
- **Por que**: 
  - Reduz Time-to-Value (usuário vê conteúdo mais rápido)
  - Evita "paradox of choice" no início
  - Permite onboarding personalizado já na Etapa 2
- **Alternativas consideradas**: 
  - Todas preferências logo após cadastro (muito longo)
  - Nenhuma personalização (experiência genérica)
  - Personalização progressiva inline (confuso)
- **Trade-offs**: Requer segundo momento de setup, mas mantém momentum inicial

## 📝 Fluxo Detalhado

```
┌─────────────────────────────────────────────────────────────┐
│  Usuário Novo Acessa Plataforma                            │
│  (Após cadastro ou primeiro login)                         │
└──────────────────┬──────────────────────────────────────────┘
                   ↓
┌─────────────────────────────────────────────────────────────┐
│  [ETAPA 1/4] Boas-vindas (25%)                             │
│  ────────────────────────────────────                       │
│  • Mensagem: "Bem-vindo ao EDUCACROSS!"                    │
│  • Breve descrição da plataforma                           │
│  • 3 benefícios principais destacados                      │
│  • Progress bar: 25%                                        │
│  • Botões: [Começar] [Pular Tour]                          │
└──────────────────┬──────────────────────────────────────────┘
                   ↓
┌─────────────────────────────────────────────────────────────┐
│  [ETAPA 2/4] Tutorial de Navegação (50%)                   │
│  ─────────────────────────────────────                      │
│  • Como usar o menu principal                              │
│  • Introdução aos 3 domínios (BO, FO, Game)               │
│  • Como explorar jornadas disponíveis                      │
│  • Progress bar: 50%                                        │
│  • Botões: [Voltar] [Próximo] [Pular]                     │
└──────────────────┬──────────────────────────────────────────┘
                   ↓
┌─────────────────────────────────────────────────────────────┐
│  [ETAPA 3/4] Primeiro Jogo (75%)                           │
│  ─────────────────────────────                              │
│  • Mini-game demo interativo                               │
│  • Ganhar primeiro badge 🎖️                                │
│  • Ver posição inicial no Leaderboard                      │
│  • Explicação sistema de pontos                            │
│  • Progress bar: 75%                                        │
│  • Botões: [Voltar] [Próximo] [Pular]                     │
└──────────────────┬──────────────────────────────────────────┘
                   ↓
┌─────────────────────────────────────────────────────────────┐
│  [ETAPA 4/4] Conclusão (100%)                              │
│  ──────────────────────────                                 │
│  • Resumo do tour: "Você aprendeu..."                      │
│  • Recursos adicionais (FAQ, Suporte)                      │
│  • Sugestão de próximas jornadas recomendadas              │
│  • Progress bar: 100% ✅                                    │
│  • Botões: [Explorar Plataforma] [Refazer Tour]           │
└──────────────────┬──────────────────────────────────────────┘
                   ↓
┌─────────────────────────────────────────────────────────────┐
│  Home / Dashboard Principal                                 │
│  (Onboarding completo, badge exibido no perfil)           │
└─────────────────────────────────────────────────────────────┘
```

## 🎨 Guia de Estilos e Componentes

### Paleta de Cores
- **Primária**: `#3B82F6` (blue-600) - CTAs principais, links
- **Secundária**: `#8B5CF6` (purple-600) - Badges, destaques
- **Sucesso**: `#10B981` (green-500) - Conclusões, progresso
- **Neutra**: `#6B7280` (gray-500) - Textos secundários

### Tipografia
- **Headline (h1)**: `fontSize: 2xl`, `fontWeight: bold`, `color: neutral-900`
- **Subtitle (h2)**: `fontSize: lg`, `fontWeight: semibold`, `color: neutral-700`
- **Body**: `fontSize: base`, `fontWeight: normal`, `color: neutral-600`
- **Caption**: `fontSize: sm`, `fontWeight: normal`, `color: neutral-500`

### Espaçamento
- Entre seções: `spacing-6` (1.5rem)
- Entre elementos: `spacing-4` (1rem)
- Padding do container: `spacing-8` (2rem)
- Margin de botões: `spacing-3` (0.75rem)

### Componentes por Etapa

**Etapa 1 (Welcome)**:
- `Layout` (container principal)
- `Text` (h1, body)
- `Card` (3 cards de benefícios)
- `Button` (primary: "Começar", ghost: "Pular")
- `Progress` (value: 25, showLabel: true)

**Etapa 2 (Tutorial Nav)**:
- `Layout`
- `Text` (h2, body, caption)
- `Card` (preview dos domínios)
- `Button` (outline: "Voltar", primary: "Próximo", ghost: "Pular")
- `Progress` (value: 50, showLabel: true)

**Etapa 3 (First Game)**:
- `Layout`
- `Text` (h2, body)
- `Card` (mini-game container)
- `Badge` (primeiro badge conquistado)
- `Leaderboard` (limit: 5, highlightId: current user)
- `Button` (outline: "Voltar", primary: "Próximo")
- `Progress` (value: 75, showLabel: true)

**Etapa 4 (Done)**:
- `Layout`
- `Text` (h1, body)
- `Card` (resumo de conquistas)
- `Badge` (todas as conquistas obtidas)
- `Button` (primary: "Explorar Plataforma", outline: "Refazer Tour")
- `Progress` (value: 100, showLabel: true, color: "success")

## 📊 Métricas de Sucesso

### KPIs Primários
- **Taxa de início do onboarding**: Meta > 80% dos novos usuários
- **Taxa de conclusão do onboarding**: Meta > 65% dos que iniciam
- **Tempo médio de conclusão**: Meta 3-5 minutos
- **Retention D7**: Meta +30% para usuários que completam vs que pulam

### KPIs Secundários
- **Taxa de abandono por etapa**: Identificar etapas problemáticas
- **Taxa de uso do botão "Pular"**: Meta < 40%
- **NPS após onboarding**: Meta > 50
- **Taxa de reativação do tour**: Meta ~5% (usuários que refazem)

### Analytics a Implementar
- Tracking de cada etapa (start, complete, skip)
- Tempo gasto em cada etapa
- Taxa de cliques nos CTAs
- Taxa de interação com mini-game
- Heatmap de onde usuários clicam/param

## 🔜 Próximos Passos

### Curto Prazo (Sprint Atual)
- [x] ~~Documentar jornada completa no README~~
- [x] ~~Identificar todos os componentes necessários~~
- [x] ~~Definir fluxo detalhado entre etapas~~
- [x] ~~Especificar métricas de sucesso~~

### Médio Prazo (Próximas 2-3 Sprints)
- [ ] Criar wireframes de alta fidelidade no Figma
- [ ] Implementar todas as 4 páginas no Studio
- [ ] Desenvolver mini-game de demonstração
- [ ] Implementar sistema de badges
- [ ] Adicionar analytics/tracking
- [ ] Testes de usabilidade com 5-10 usuários

### Longo Prazo (Backlog)
- [ ] Personalização baseada em perfil (estudante vs educador)
- [ ] Onboarding contextual (dicas inline após onboarding)
- [ ] A/B testing de diferentes fluxos
- [ ] Tradução para múltiplos idiomas
- [ ] Versão em video para acessibilidade
- [ ] Certificado de conclusão do onboarding

## 📎 Referências

### Documentação Interna
- [EDUCACROSS - Documento de Requisitos](../../../docs/backlog.md)
- [Design System - Progress](http://localhost:6006/?path=/docs/components-progress--docs)
- [Design System - Leaderboard](http://localhost:6006/?path=/docs/components-leaderboard--docs)
- [Design System - Button](http://localhost:6006/?path=/docs/components-button--docs)
- [Design System - Card](http://localhost:6006/?path=/docs/components-card--docs)
- [Studio - Editor Visual](http://localhost:3000/studio)
- [Storybook - Todos os Componentes](http://localhost:6006)

### Benchmarks e Inspiração
- **Duolingo**: Onboarding gamificado com níveis e conquistas
- **Notion**: Tour guiado com tooltips contextuais
- **Figma**: Tutorial interativo que ensina na prática
- **Discord**: Onboarding em etapas com progresso visual
- **Khan Academy**: Personalização de objetivos no início

### Artigos e Estudos
- [Onboarding Best Practices 2024](https://www.nngroup.com/articles/onboarding/)
- [The Importance of User Onboarding](https://www.appcues.com/blog/user-onboarding)
- [Gamification in Onboarding](https://www.smashingmagazine.com/2012/04/gamification-ux-users-win-lose/)

---

**Autores**: Squad Prototipação EDUCACROSS, UX Designer  
**Revisores**: Product Owner, Tech Lead  
**Data de criação**: 2025-11-20  
**Última revisão**: 2025-11-24
