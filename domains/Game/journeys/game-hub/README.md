# Jornada: Game Hub

## 🎯 Objetivo

Hub central para acessar todos os jogos educacionais disponíveis na plataforma Educacross. Permite que estudantes vejam jogos disponíveis, acessem seus favoritos, vejam progresso e rankings, e descubram novos desafios educacionais.

## 📋 Contexto de Negócio

- **Para quem?** Estudantes (personas primárias) e educadores (monitoramento secundário)
- **Por que é importante?** 
  - Centralizar acesso aos jogos educacionais em um único ponto intuitivo
  - Aumentar engajamento através de visualização de progresso e rankings
  - Facilitar descoberta de novos jogos/desafios
  - Criar senso de comunidade através do leaderboard compartilhado
- **Quando será usado?** 
  - Diariamente, como ponto de entrada para experiências gamificadas
  - Durante sessões de estudo e prática de conteúdos
  - Para consultar evolução pessoal e comparar com outros estudantes

## 📊 Status

- [x] Planejamento
- [x] Componentes base (Progress #60, Leaderboard #61)
- [ ] Protótipo inicial no Studio
- [ ] Testes de usabilidade
- [ ] Concluído

**Status atual**: 🚧 Em andamento

**Última atualização**: 2025-11-24

## 🎮 Fluxo da Jornada

### 1. Entrada no Hub
- Usuário acessa `/game-hub` pela navegação principal
- Header exibe boas-vindas personalizadas e progresso geral

### 2. Visualização de Jogos Disponíveis
- Grid responsivo exibe cards de jogos (3-4 colunas em desktop, 1 em mobile)
- Cada card mostra:
  - Thumbnail/ícone do jogo
  - Nome do jogo
  - Descrição breve (1-2 linhas)
  - Badge de dificuldade (Fácil, Médio, Difícil)
  - Barra de progresso pessoal (% de conclusão)
  - Botão "Jogar" ou "Continuar"

### 3. Interação com Leaderboard
- Sidebar fixa (desktop) ou seção separada (mobile) mostra:
  - Top 5 jogadores globais
  - Posição do usuário atual (se aplicável)
  - Pontuação e badges dos líderes

### 4. Seleção de Jogo
- Usuário clica em um card de jogo
- Navegação para `/game/:slug` (página específica do jogo)
- Breadcrumb/botão "Voltar ao Hub" sempre visível

### 5. Acompanhamento de Progresso
- Header mantém indicador de progresso geral visível
- Sincronização ao completar desafios dentro dos jogos
- Atualização em tempo real (ou ao retornar ao hub)

## 🧩 Componentes Utilizados

### Do Design System (@prototipo/design-system)

- **Card** (variant: elevated) - Container dos game cards
  - Props: `variant="elevated"`, `className` customizada
  - Uso: Encapsular informações de cada jogo

- **Button** (primary, secondary) - Ações do usuário
  - Primary: "Jogar", "Continuar"
  - Secondary: "Ver Ranking", "Detalhes"

- **Text** (h1, h2, p, span) - Hierarquia de textos
  - h1: Título principal "Central de Jogos"
  - h2: Nomes dos jogos, seções
  - p: Descrições, informações secundárias
  - span: Labels, metadados

- **Badge** (success, warning, error) - Indicador de dificuldade
  - success: Dificuldade Fácil (verde)
  - warning: Dificuldade Média (amarelo)
  - error: Dificuldade Difícil (vermelho)

### Específicos do Domínio Game

- **Progress** (#60) - Barras de progresso
  - Progresso geral do usuário (header)
  - Progresso individual por jogo (nos cards)
  - Props: `value` (0-100), `label`, `variant`

- **Leaderboard** (#61) - Ranking de jogadores
  - Exibição de top 5 jogadores
  - Props: `players` (array), `currentUser`, `variant`
  - Localização: Sidebar (desktop) ou seção (mobile)

### Layout

- **Grid Responsivo de Game Cards**
  - Desktop: 3-4 colunas (depende da largura)
  - Tablet: 2 colunas
  - Mobile: 1 coluna (stack vertical)
  - Gap: Espaçamento consistente com design tokens

- **Sidebar com Leaderboard**
  - Desktop: Fixa à direita, 300-400px largura
  - Mobile: Seção separada abaixo do grid de jogos

- **Header com Progresso Global**
  - Barra de progresso geral persistente
  - Informações do usuário (nome, avatar, nível)

## 🔗 Links

### Protótipos
- [Studio - Game Hub](http://localhost:3000/game-hub) (protótipo)
- [Storybook - Componentes](http://localhost:6006)

### Design
- [Figma Design](https://figma.com/...) _(placeholder - aguardando link)_
- [Wireframes](https://miro.com/...) _(placeholder - aguardando link)_

### Issues e Código
- [Issue #58 - Game Hub Journey](https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/issues/58)
- [Issue #61 - Leaderboard Component](https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/issues/61)
- [Issue #60 - Progress Component](https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/issues/60)

### Jornadas Relacionadas
- [Jornadas BackOffice](../../BackOffice/README.md)
- [Jornadas FrontOffice](../../FrontOffice/README.md)
- [Domínio Game - Índice](../../README.md)

## 🛠️ Notas Técnicas

### Stack
- **Frontend**: Next.js 15 (App Router), React 18
- **Components**: Design System (@prototipo/design-system)
- **Styling**: CSS Modules + Design Tokens
- **State**: LocalStorage para MVP (mock data)

### Mock Data - Jogos Exemplo

Para prototipagem, usar 5-7 jogos mockados:

1. **Quiz Matemático**
   - Dificuldade: Média (warning)
   - Progresso: 65%
   - Descrição: "Resolva desafios de matemática e conquiste pontos"

2. **Aventura na Gramática**
   - Dificuldade: Fácil (success)
   - Progresso: 30%
   - Descrição: "Explore o mundo das palavras e melhore sua escrita"

3. **Enigmas da Ciência**
   - Dificuldade: Difícil (error)
   - Progresso: 10%
   - Descrição: "Desvende mistérios científicos e aprenda física e química"

4. **História Interativa**
   - Dificuldade: Média (warning)
   - Progresso: 80%
   - Descrição: "Viaje no tempo e reviva momentos históricos"

5. **Desafio de Lógica**
   - Dificuldade: Difícil (error)
   - Progresso: 0%
   - Descrição: "Exercite sua mente com quebra-cabeças complexos"

6. **Geografia Mundial**
   - Dificuldade: Fácil (success)
   - Progresso: 100%
   - Descrição: "Explore países, capitais e culturas do mundo"

7. **Programação Básica**
   - Dificuldade: Média (warning)
   - Progresso: 45%
   - Descrição: "Aprenda lógica de programação jogando"

### Integração com Componentes

#### Progress Component (#60)
```tsx
// Exemplo de uso no header (progresso geral)
<Progress 
  value={52} 
  label="Progresso Geral" 
  variant="default" 
/>

// Exemplo de uso em card de jogo
<Progress 
  value={65} 
  label="Quiz Matemático" 
  variant="compact" 
  showPercentage 
/>
```

#### Leaderboard Component (#61)
```tsx
// Exemplo de uso na sidebar
<Leaderboard 
  title="Top Jogadores"
  players={[
    { rank: 1, name: "Alice Silva", score: 9850, avatar: "AS" },
    { rank: 2, name: "Bruno Costa", score: 9200, avatar: "BC" },
    { rank: 3, name: "Carol Lima", score: 8750, avatar: "CL" },
    { rank: 4, name: "Daniel Souza", score: 8100, avatar: "DS" },
    { rank: 5, name: "Elena Santos", score: 7800, avatar: "ES" }
  ]}
  currentUser={{ rank: 12, name: "Você", score: 5200 }}
  variant="sidebar"
/>
```

### Responsividade

- **Desktop (≥1024px)**: Grid 3-4 colunas + Sidebar fixa
- **Tablet (768-1023px)**: Grid 2 colunas + Sidebar colapsável
- **Mobile (<768px)**: Grid 1 coluna + Leaderboard como seção separada

### Acessibilidade

- Todos os cards devem ser navegáveis por teclado (Tab)
- Botões com `aria-label` descritivos
- Contraste de cores seguindo WCAG AA
- Foco visível em todos os elementos interativos

## 💡 Decisões de Design

### Decisão 1: Grid de Cards vs. Lista Vertical

- **O que decidimos**: Usar grid responsivo de cards com thumbnails
- **Por que**: 
  - Maior apelo visual e engajamento
  - Melhor aproveitamento de espaço em telas largas
  - Thumbnails ajudam na identificação rápida dos jogos
  - Padrão amplamente reconhecido (Steam, Epic, consoles)
- **Alternativas consideradas**: 
  - Lista vertical simples (descartada por ser menos engaging)
  - Carrossel horizontal (descartada por esconder opções)
- **Trade-offs**: 
  - Pros: Visualmente atrativo, escaneia melhor, suporta mais informação por item
  - Contras: Ocupa mais espaço vertical, requer scroll em muitos jogos

### Decisão 2: Leaderboard Sempre Visível (Desktop)

- **O que decidimos**: Sidebar fixa no desktop, seção separada no mobile
- **Por que**: 
  - Motivação constante através de gamificação social
  - Não requer clique adicional para ver ranking
  - Cria senso de comunidade e competição saudável
- **Alternativas consideradas**: 
  - Modal/overlay acionado por botão (descartada por ser menos acessível)
  - Seção no final da página (descartada por perder visibilidade)
- **Trade-offs**: 
  - Pros: Sempre presente, motiva engajamento, fácil de consultar
  - Contras: Ocupa espaço lateral (mitigado em telas grandes)

### Decisão 3: Indicadores de Progresso Dual (Global + Individual)

- **O que decidimos**: Barra global no header + barras individuais por jogo
- **Por que**: 
  - Visão macro (quanto já avancei no geral) e micro (quanto falta em cada jogo)
  - Reforça gamificação e senso de progresso contínuo
  - Ajuda usuário a decidir qual jogo retomar
- **Alternativas consideradas**: 
  - Apenas percentual numérico (descartada por ser menos visual)
  - Apenas indicador global (descartada por perder granularidade)
- **Trade-offs**: 
  - Pros: Informação clara e visual, motivação duplicada
  - Contras: Requer sincronização de dados entre jogos

### Decisão 4: Badge Colorido para Dificuldade

- **O que decidimos**: Badge colorido (Fácil=verde, Médio=amarelo, Difícil=vermelho)
- **Por que**: 
  - Reconhecimento imediato e universal (cores semafóricas)
  - Acessível para maioria dos usuários (exceção: daltonismo total)
  - Ocupa pouco espaço, alto impacto visual
- **Alternativas consideradas**: 
  - Estrelas/níveis (descartada por ser menos clara)
  - Apenas texto (descartada por ser menos visual)
  - Ícones variados (descartada por inconsistência)
- **Trade-offs**: 
  - Pros: Rápido, universal, ocupa pouco espaço
  - Contras: Pode ser problemático para daltônicos (mitigar com ícones também)

### Decisão 5: Navegação Direta vs. Preview Modal

- **O que decidimos**: Clique no card navega diretamente para `/game/:slug`
- **Por que**: 
  - Menos fricção, fluxo mais rápido
  - Usuário já vê informações suficientes no card
  - Botão "Voltar ao Hub" permite retorno fácil
- **Alternativas consideradas**: 
  - Modal com mais detalhes antes de entrar (descartada por adicionar fricção)
  - Página intermediária de "Sobre o Jogo" (descartada para MVP)
- **Trade-offs**: 
  - Pros: Fluxo direto, menos cliques
  - Contras: Não há preview detalhado (pode ser adicionado no futuro)

## 📝 Notas Adicionais

### Feedback de Stakeholders

#### PM (2025-11-24)
- ✅ **Approved**: Grid layout com thumbnails e informações compactas
- ✅ **Approved**: Leaderboard sempre visível para motivação
- 🟡 **Pending**: Definir critérios exatos de ranking (score total, tempo, tentativas, mix?)
- 🟡 **Pending**: Validar se top 5 é suficiente ou expandir para top 10

#### Designer (2025-11-24)
- ✅ **Approved**: Uso consistente de componentes do Design System
- ✅ **Approved**: Responsividade mobile-first
- 🟡 **Pending**: Definir paleta de cores/ilustrações para cada categoria de jogo (matemática, linguagem, ciência, etc)
- 🟡 **Pending**: Criar thumbnails mockados para os 7 jogos

#### Dev Team (2025-11-24)
- ✅ **Approved**: Mock data local para MVP (LocalStorage)
- ✅ **Approved**: Reutilização de componentes #60 e #61
- 🟡 **Pending**: Definir estrutura de API REST para jogos reais (Sprint futura)
- 🟡 **Pending**: Estratégia de cache e sincronização de progresso

### Insights de Benchmarking

- **Steam Big Picture**: Grid de jogos com imagens grandes, muito eficaz
- **Duolingo**: Progresso visual claro, motivação por streaks e rankings
- **Kahoot**: Leaderboard sempre presente, gamificação social forte
- **Khan Academy**: Dashboard com progresso por tópico, badges de conquistas

## 🔜 Próximos Passos

### Curto Prazo (Sprint 3 - Atual)
- [x] Criar estrutura de documentação completa
- [ ] Prototipar no Puck Studio (página `/game-hub`)
- [ ] Validar layout responsivo em diferentes resoluções
- [ ] Testes de usabilidade com 3-5 usuários (estudantes)
- [ ] Ajustes baseados em feedback inicial

### Médio Prazo (Sprint 4)
- [ ] Implementar página real em Next.js (sair do Studio)
- [ ] Conectar com API REST de jogos (backend necessário)
- [ ] Adicionar filtros de busca (dificuldade, categoria, progresso)
- [ ] Implementar paginação/lazy loading para muitos jogos
- [ ] Adicionar animações de transição entre páginas

### Longo Prazo (Backlog)
- [ ] Sistema de badges e conquistas (achievements)
- [ ] Histórico de partidas e estatísticas detalhadas
- [ ] Desafios diários/semanais com recompensas
- [ ] Sistema de favoritos e jogos recomendados
- [ ] Integração social (compartilhar conquistas, desafiar amigos)
- [ ] Modo offline (PWA com Service Worker)

## 🧪 Testes e Validação

### Testes de Usabilidade Planejados

**Objetivo**: Validar se usuários conseguem navegar e entender o hub intuitivamente

**Cenários de Teste**:
1. Encontrar um jogo de dificuldade fácil e iniciá-lo
2. Verificar seu progresso geral
3. Identificar quem está em primeiro lugar no ranking
4. Retornar ao hub após entrar em um jogo

**Critérios de Sucesso**:
- 100% dos participantes conseguem completar cenários 1-3 sem ajuda
- Tempo médio para completar cenário 1: < 30 segundos
- NPS (Net Promoter Score) ≥ 8

### Métricas de Engajamento (Futuras)

- Taxa de clique em jogos (click-through rate)
- Tempo médio gasto no hub vs. dentro dos jogos
- Jogos mais acessados (top 3)
- Taxa de retorno ao hub (bounce back rate)
- Conversão de visualização → jogo iniciado

## 📎 Referências

### Design Patterns
- [Material Design - Cards](https://m3.material.io/components/cards)
- [Apple HIG - Collections](https://developer.apple.com/design/human-interface-guidelines/components/layout-and-organization/collections)

### Gamificação
- [Octalysis Framework](https://yukaichou.com/gamification-examples/octalysis-complete-gamification-framework/) - Framework de gamificação
- [The Gamification of Learning (Gartner)](https://www.gartner.com/en/education/insights/gamification)

### Acessibilidade
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM - Keyboard Accessibility](https://webaim.org/techniques/keyboard/)

---

**Autores**: Equipe EDUCACROSS  
**Revisores**: PM, Design, Dev Lead  
**Data de criação**: 2025-11-24  
**Última atualização**: 2025-11-24
