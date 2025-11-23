# Jornada: Game Hub

> 🎮 Espaço central para prototipagem de componentes e fluxos lúdicos/educacionais da plataforma EDUCACROSS

## 🎯 Objetivo

Criar um hub de jogos que sirva como ponto de entrada para experiências gamificadas, permitindo que usuários naveguem entre jogos disponíveis, visualizem seu progresso, acompanhem rankings e vejam resultados de forma envolvente e motivadora.

## 📋 Contexto de Negócio

- **Para quem?** Estudantes e educadores que desejam engajamento através de gamificação
- **Por que é importante?** Aumentar motivação, engajamento e retenção através de experiências lúdicas; facilitar aprendizado através de jogos educacionais
- **Quando será usado?** Diariamente, como parte da rotina de estudos; após completar lições; em momentos de desafios e competições

## 🔗 Protótipos Relacionados

**Nota**: Os protótipos serão criados no Studio após a estruturação inicial.

Fluxo planejado:
- [Home do Game Hub](http://localhost:3000/game/hub) - Menu de jogos disponíveis
- [Seleção de Jogo](http://localhost:3000/game/hub/select) - Card de jogo com descrição e progresso
- [Tela de Jogo](http://localhost:3000/game/hub/play) - Interface durante o jogo (mock estático)
- [Resultados](http://localhost:3000/game/hub/results) - Modal/página com pontuação
- [Leaderboard](http://localhost:3000/game/hub/leaderboard) - Ranking global

## 🧩 Componentes Utilizados

### Componentes Existentes do Design System

- **`Layout`** - Container principal responsivo para todas as telas
- **`Card`** - Cards de jogos, cards de informação, containers de conteúdo
  - Variant: `elevated` para destacar jogos disponíveis
  - Variant: `bordered` para informações secundárias
- **`Button`** - Ações principais em todo o fluxo
  - Variant: `primary` para "Jogar Agora", "Continuar"
  - Variant: `secondary` para "Ver Ranking", "Voltar"
  - Variant: `outline` para ações secundárias
- **`Text`** - Tipografia em todos os contextos
  - Títulos de jogos (h1, h2)
  - Descrições e instruções (body)
  - Labels e metadata (small)
- **`Badge`** - Indicadores de status, conquistas e categorias
  - Variant: `success` para jogos completados
  - Variant: `info` para jogos em progresso
  - Variant: `warning` para desafios

### Componentes Novos Necessários

- [ ] **`Progress`** - Barra de progresso para acompanhar:
  - Progresso individual em cada jogo (0-100%)
  - Progresso durante gameplay (ex: nível 3 de 10)
  - Progresso de conquistas e objetivos
  - **Especificação técnica**:
    - Props: `value` (0-100), `max`, `label`, `showPercentage`, `variant` (default, success, warning)
    - Acessibilidade: `role="progressbar"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, `aria-label`
    - Visual: Barra horizontal com animação suave, cores do design system

- [ ] **`Leaderboard`** - Componente de ranking/tabela de classificação
  - **Especificação técnica**:
    - Props: `entries` (array de { rank, name, score, avatar?, isCurrentUser? }), `maxEntries`, `highlightCurrent`, `showMedals` (top 3)
    - Estrutura: Lista ordenada com posição, avatar/ícone, nome, pontuação
    - Acessibilidade: `role="list"`, `aria-label="Ranking dos jogadores"`, destaque visual para usuário atual
    - Visual: Top 3 com badges especiais (🥇🥈🥉), linha destacada para usuário atual, alternância de cores para legibilidade

- [ ] **`Modal`** - Modal reutilizável para resultados e diálogos
  - Props: `isOpen`, `onClose`, `title`, `children`, `size` (sm, md, lg)
  - Acessibilidade: `role="dialog"`, `aria-modal="true"`, trap de foco, fechamento com ESC
  - Visual: Overlay escurecido, animação de entrada/saída, botão de fechar acessível

## 📊 Status

**Status atual**: 🚧 Em andamento

**Última atualização**: 2025-11-23

## 💡 Decisões de Design

### Decisão 1: Hub Central vs Navegação Direta

- **O que decidimos**: Criar um Hub central (menu) ao invés de navegação direta para jogos individuais
- **Por que**: Oferece contexto, aumenta descoberta de jogos, permite visualização de progresso geral
- **Alternativas consideradas**: 
  - Navegação direta (mais rápido, mas menos contexto)
  - Integração inline com outras áreas (mais complexo, menos foco)
- **Trade-offs**: Um clique extra para acessar jogos, mas melhor UX e engajamento

### Decisão 2: Leaderboard Global vs Por Jogo

- **O que decidimos**: Implementar leaderboard tanto global quanto por jogo individual
- **Por que**: Permite competição geral e específica; atende diferentes motivações
- **Alternativas consideradas**: 
  - Apenas global (perde granularidade)
  - Apenas por jogo (perde visão macro)
- **Trade-offs**: Mais dados para gerenciar, mas melhor experiência competitiva

### Decisão 3: Modal vs Página para Resultados

- **O que decidimos**: Usar Modal para resultados imediatos, página separada para histórico detalhado
- **Por que**: Modal mantém contexto e fluxo; página permite análise profunda posterior
- **Alternativas consideradas**: 
  - Apenas modal (limitado para dados complexos)
  - Apenas página (quebra fluxo imediato)
- **Trade-offs**: Implementação de ambos, mas atende melhor diferentes necessidades

### Decisão 4: Progresso Visual com Barra vs Percentual Textual

- **O que decidimos**: Barra de progresso visual com percentual opcional
- **Por que**: Mais intuitivo e acessível; melhor compreensão visual rápida
- **Alternativas consideradas**: 
  - Apenas texto/número (menos visual)
  - Gráficos complexos (overkill para prototipação)
- **Trade-offs**: Requer novo componente, mas melhora significativamente UX

## 📝 Fluxo Esperado

```
[1] Home do Game Hub
    - Grid de cards com jogos disponíveis
    - Cada card mostra:
      * Título e ícone do jogo
      * Descrição breve
      * Badge de categoria (Quiz, Puzzle, Aventura, etc)
      * Barra de progresso (se já jogou)
      * Badge de status (Novo, Em Progresso, Completo)
      * Botão "Jogar" ou "Continuar"
    - Seção de destaque: "Jogo da Semana" ou "Desafio Especial"
    - Link para Leaderboard global
    - Filtros opcionais: Por categoria, Por status
    ↓
    
[2] Seleção de Jogo
    - Card expandido/página de detalhes do jogo selecionado
    - Informações completas:
      * Descrição detalhada
      * Objetivos e regras
      * Estimativa de tempo
      * Dificuldade
      * Recompensas (pontos, badges)
    - Estatísticas pessoais:
      * Melhor pontuação
      * Tentativas
      * Média de acertos
    - Preview de leaderboard (top 5)
    - Botões: "Jogar Agora" (primary), "Ver Ranking Completo" (secondary)
    ↓
    
[3] Tela de Jogo (Durante Gameplay)
    - Interface do jogo específico
    - Header fixo com:
      * Título do jogo
      * Pontuação atual
      * Timer (se aplicável)
      * Progresso (ex: pergunta 5 de 10)
      * Botão "Sair" (com confirmação)
    - Área principal: conteúdo do jogo (mock estático para prototipação)
    - Footer: Instruções contextuais
    ↓
    
[4] Modal de Resultados
    - Exibido automaticamente ao completar jogo
    - Conteúdo:
      * Animação de celebração (confete, estrelas)
      * Pontuação final (destaque visual)
      * Comparação com melhor pontuação pessoal
      * Badges/conquistas desbloqueadas (se houver)
      * Estatísticas da sessão (tempo, acertos, streak)
      * Preview de posição no ranking (ex: "Você ficou em 15º lugar!")
    - Ações:
      * "Jogar Novamente" (primary)
      * "Ver Ranking" (secondary)
      * "Voltar ao Hub" (ghost)
    ↓
    
[5] Leaderboard (Ranking Global ou Por Jogo)
    - Tabela/lista de classificação
    - Informações exibidas:
      * Posição (rank)
      * Avatar/ícone do jogador
      * Nome do jogador
      * Pontuação
      * Destaque especial para top 3 (medalhas: 🥇🥈🥉)
      * Linha destacada para usuário atual
    - Filtros:
      * Global vs Por jogo específico
      * Período: Hoje, Esta semana, Este mês, Histórico
    - Botões:
      * "Jogar Novamente" (primary)
      * "Voltar ao Hub" (secondary)
```

## 🗂️ Estrutura de Dados Mock

### Jogos Disponíveis

```typescript
interface Game {
  id: string;
  title: string;
  description: string;
  icon: string; // emoji ou caminho para ícone
  category: 'quiz' | 'puzzle' | 'adventure' | 'memory' | 'strategy';
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: number; // em minutos
  rewardPoints: number;
  status: 'new' | 'in_progress' | 'completed';
  userProgress?: number; // 0-100
  userBestScore?: number;
  userAttempts?: number;
}

// Exemplo de mock
const mockGames: Game[] = [
  {
    id: 'quiz-matematica-basica',
    title: 'Quiz de Matemática Básica',
    description: 'Teste seus conhecimentos em operações matemáticas fundamentais',
    icon: '🧮',
    category: 'quiz',
    difficulty: 'easy',
    estimatedTime: 10,
    rewardPoints: 100,
    status: 'in_progress',
    userProgress: 45,
    userBestScore: 850,
    userAttempts: 3,
  },
  {
    id: 'puzzle-palavras-cruzadas',
    title: 'Palavras Cruzadas Educativas',
    description: 'Complete as palavras cruzadas com termos educacionais',
    icon: '📝',
    category: 'puzzle',
    difficulty: 'medium',
    estimatedTime: 15,
    rewardPoints: 150,
    status: 'new',
  },
  {
    id: 'aventura-historia-brasil',
    title: 'Aventura pela História do Brasil',
    description: 'Viaje pelo tempo e aprenda sobre momentos históricos',
    icon: '🗺️',
    category: 'adventure',
    difficulty: 'medium',
    estimatedTime: 20,
    rewardPoints: 200,
    status: 'completed',
    userProgress: 100,
    userBestScore: 1500,
    userAttempts: 1,
  },
  {
    id: 'memoria-capitais',
    title: 'Jogo da Memória - Capitais',
    description: 'Encontre os pares de países e suas capitais',
    icon: '🌍',
    category: 'memory',
    difficulty: 'easy',
    estimatedTime: 5,
    rewardPoints: 80,
    status: 'new',
  },
];
```

### Leaderboard

```typescript
interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  avatar?: string; // emoji ou caminho
  score: number;
  isCurrentUser: boolean;
}

// Exemplo de mock - Global
const mockGlobalLeaderboard: LeaderboardEntry[] = [
  { rank: 1, userId: 'user-1', username: 'Ana Silva', avatar: '👩', score: 5420, isCurrentUser: false },
  { rank: 2, userId: 'user-2', username: 'Pedro Santos', avatar: '👨', score: 5180, isCurrentUser: false },
  { rank: 3, userId: 'user-3', username: 'Maria Oliveira', avatar: '👩', score: 4950, isCurrentUser: false },
  { rank: 4, userId: 'user-4', username: 'João Costa', avatar: '👨', score: 4720, isCurrentUser: false },
  { rank: 5, userId: 'user-5', username: 'Carla Souza', avatar: '👩', score: 4500, isCurrentUser: false },
  // ...
  { rank: 15, userId: 'current', username: 'Você', avatar: '😊', score: 3200, isCurrentUser: true },
];

// Exemplo de mock - Por jogo específico
const mockGameLeaderboard: LeaderboardEntry[] = [
  { rank: 1, userId: 'user-10', username: 'Carlos Pereira', avatar: '👨', score: 1500, isCurrentUser: false },
  { rank: 2, userId: 'current', username: 'Você', avatar: '😊', score: 1450, isCurrentUser: true },
  { rank: 3, userId: 'user-11', username: 'Julia Alves', avatar: '👩', score: 1380, isCurrentUser: false },
];
```

### Resultado de Jogo

```typescript
interface GameResult {
  gameId: string;
  score: number;
  previousBestScore?: number;
  timeSpent: number; // em segundos
  correctAnswers: number;
  totalQuestions: number;
  accuracy: number; // percentual
  newBadges?: string[]; // IDs de badges desbloqueados
  rankPosition?: number; // posição no leaderboard após este jogo
}

// Exemplo de mock
const mockResult: GameResult = {
  gameId: 'quiz-matematica-basica',
  score: 920,
  previousBestScore: 850,
  timeSpent: 480, // 8 minutos
  correctAnswers: 9,
  totalQuestions: 10,
  accuracy: 90,
  newBadges: ['badge-first-90-percent'],
  rankPosition: 12,
};
```

## 🎨 Guia de Estilos Visual

### Paleta de Cores (baseada em tokens do Design System)

- **Primary**: Azul vibrante (#3B82F6) - Ações principais, destaque
- **Secondary**: Roxo (#8B5CF6) - Elementos secundários, badges
- **Success**: Verde (#10B981) - Conquistas, progresso completo, medalhas
- **Warning**: Amarelo/Laranja (#F59E0B) - Desafios, atenção
- **Error**: Vermelho (#EF4444) - Erros, falhas
- **Neutral**: Escala de cinzas - Backgrounds, textos, bordas

### Tipografia

- **Headlines (H1/H2)**: Bold, tamanho grande (2xl, 3xl)
- **Body text**: Regular, tamanho médio (base, lg)
- **Labels e metadata**: Small, semibold quando necessário
- **Pontuações e números grandes**: Bold, tamanho extra large (4xl, 5xl)

### Espaçamento

- **Entre seções principais**: 2rem (32px)
- **Entre cards**: 1.5rem (24px)
- **Padding de cards**: 1.5rem (24px) para md, 1rem (16px) para sm
- **Entre elementos inline**: 0.5rem (8px) a 1rem (16px)

### Ícones e Emojis

Para prototipação rápida, usar emojis grandes:
- Jogos: 🎮 🧩 📚 🧮 🌍 🎯 🏆
- Status: ⭐ ✅ 🔄 🆕 🔥
- Conquistas: 🏅 🥇 🥈 🥉 🎖️ 👑
- Ações: ▶️ 🔁 🏠 📊

### Animações

- **Transições suaves**: 200-300ms para hover, focus
- **Animações de feedback**: Confete, estrelas ao completar jogo
- **Barras de progresso**: Animação de preenchimento gradual
- **Modal**: Fade in/out + scale suave

## 🔜 Próximos Passos

### Fase 1: Documentação e Planejamento (Atual)
- [x] Criar estrutura de diretórios
- [x] Documentar README com fluxo completo
- [ ] Criar notas.md com decisões técnicas
- [ ] Definir mocks de dados

### Fase 2: Componentes Faltantes
- [ ] Especificar componente `Progress` detalhadamente
- [ ] Especificar componente `Leaderboard` detalhadamente
- [ ] Especificar componente `Modal` detalhadamente
- [ ] Criar issues/tarefas para implementação dos componentes

### Fase 3: Prototipação no Studio
- [ ] Criar página "Home do Game Hub"
- [ ] Criar página "Seleção de Jogo"
- [ ] Criar página "Tela de Jogo" (mock estático)
- [ ] Implementar Modal de Resultados (após componente estar pronto)
- [ ] Criar página "Leaderboard"

### Fase 4: Validação e Iteração
- [ ] Testar fluxo completo no Studio
- [ ] Validar com PM/Design
- [ ] Coletar feedback de usuários/stakeholders
- [ ] Iterar baseado em feedback
- [ ] Documentar aprendizados e decisões finais

### Fase 5: Preparação para Implementação Real
- [ ] Documentar requisitos de backend (API de jogos, rankings, pontuações)
- [ ] Definir estrutura de dados final (além dos mocks)
- [ ] Planejar integração com sistema de autenticação
- [ ] Definir estratégia de cache e performance

## 📎 Referências

### Internas
- [Design System - Componentes Existentes](../../../../packages/design-system/README.md)
- [Storybook - Catálogo Visual](../../../../apps/storybook)
- [Studio - Editor de Protótipos](../../../../apps/studio)
- [Template de Jornada](../../../template-jornada.md)

### Inspirações e Benchmarks
- Duolingo: Gamificação educacional, sistema de pontos e rankings
- Kahoot: Quiz interativo, leaderboard em tempo real
- Khan Academy: Progresso visual, badges de conquistas
- Classcraft: Aventura educacional, sistema de XP e níveis

### Conceitos e Padrões
- [Gamification in Education](https://www.gamification.wiki/education)
- [Designing Leaderboards](https://www.nngroup.com/articles/leaderboards/)
- [Progress Indicators UX](https://www.nngroup.com/articles/progress-indicators/)

---

**Autores**: Equipe de Desenvolvimento - Sprint 3  
**Revisores**: PM, UX/Design  
**Data de criação**: 2025-11-23  
**Versão**: 1.0
