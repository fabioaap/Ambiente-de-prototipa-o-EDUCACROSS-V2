# Jornada: Game Hub

> 🎮 Hub centralizado para acesso a todos os jogos educacionais da plataforma EDUCACROSS

## Overview

**Objetivo Primário**: Criar um hub centralizado para acesso a todos os jogos educacionais disponíveis, oferecendo uma experiência visual atraente e navegação intuitiva.

**Usuários Alvo**: Todos os jogadores na plataforma que buscam descobrir novos jogos, acompanhar progresso e competir no ranking

**Resultado Esperado**: Aumentar engajamento com jogos, facilitar descoberta de novo conteúdo, criar competição saudável via rankings

**Contexto de Negócio**:
- Centralizar acesso a todos os jogos em um único lugar
- Aumentar taxa de descoberta de novos jogos
- Motivar competição através de rankings
- Melhorar retenção de usuários via gamificação
- Servir como landing page para game experience

**Ativadores**:
- Acesso direto ao `/game-hub`
- Link na navegação principal
- Recomendações de jogos personalizadas

## Journey Steps

### Etapa 1: Descoberta de Jogos
**Objetivo**: Permitir que usuários encontrem jogos de interesse rapidamente

**Componentes**:
- Grid responsivo de cards de jogos (3 colunas desktop, 1 mobile)
- Filtros por categoria (Math, Language, Science, Logic)
- Filtros por dificuldade (Easy, Medium, Hard)
- Barra de busca por título
- Tags de status (Novo, Popular, Concluído)

**Success Criteria**:
- ✅ Usuário encontra jogo desejado em < 30 segundos
- ✅ Filtros funcionam corretamente
- ✅ Cards exibem informações essenciais (título, categoria, dificuldade, thumbnail)

**User Story**:
```gherkin
Given um usuário acessa o Game Hub
When vê a grid de jogos disponíveis
Then pode filtrar por categoria ou dificuldade
And pode buscar por título
And vê informações sobre cada jogo (thumbnail, descrição, dificuldade)
And pode identificar jogos que já começou
```

### Etapa 2: Seleção e Inicio do Jogo
**Objetivo**: Iniciar jogo com um clique e acesso claro a instruções

**Componentes**:
- Card de jogo com CTA primária "Jogar"
- Modal/página com instruções do jogo
- Visualização de record pessoal anterior
- Botão "Começar Jogo"

**Success Criteria**:
- ✅ Usuário inicia jogo com 1-2 cliques
- ✅ Entende regras antes de começar
- ✅ Vê seu melhor resultado anterior

**User Story**:
```gherkin
Given um usuário clicou em um card de jogo
When chega à página do jogo
Then vê instruções claras
And vê seu melhor resultado anterior (se houver)
And pode começar a jogar
And pode pausar/sair a qualquer momento
```

### Etapa 3: Durante o Jogo
**Objetivo**: Acompanhamento de progresso em tempo real durante gameplay

**Componentes**:
- Cronômetro de tempo decorrido
- Barra de progresso (questões respondidas)
- Placar ou contador de pontos
- Botão "Pausar" e "Sair"
- Feedback visual de acertos/erros

**Success Criteria**:
- ✅ Usuário vê tempo passando em tempo real
- ✅ Progresso é visível (ex: 5/10 questões)
- ✅ Pode pausar e retomar
- ✅ Pode sair sem perder dados

**User Story**:
```gherkin
Given o usuário iniciou um jogo
When está jogando
Then vê o tempo decorrido
And vê seu progresso (questões respondidas)
And pode pausar e retomar a qualquer momento
And pode ver sua pontuação acumulada
And recebe feedback visual para acertos/erros
```

### Etapa 4: Resultados e Comparação
**Objetivo**: Visualizar resultados finais e comparar com outros jogadores

**Componentes**:
- Tela de resultados com pontuação final
- Tempo total do jogo
- Comparação com média de todos os jogadores
- Comparação com melhor resultado pessoal
- Botões: "Ver Leaderboard", "Jogar Novamente", "Voltar ao Hub"

**Success Criteria**:
- ✅ Usuário vê sua pontuação final
- ✅ Entende como se saiu comparado com média
- ✅ Vê seu melhor resultado
- ✅ Sabe que foi registrado no leaderboard

**User Story**:
```gherkin
Given o usuário completou um jogo
When chega à tela de resultados
Then vê sua pontuação final
And vê o tempo total gasto
And vê como se saiu comparado com a média
And vê se foi melhor ou pior que seu record pessoal
And pode ver o leaderboard
And pode jogar novamente ou voltar ao hub
```

### Etapa 5: Visualização de Rankings
**Objetivo**: Criar competição saudável e motivar melhoria

**Componentes**:
- Tabela com top 100 jogadores
- Sua posição destacada
- Filtros por período (Dia, Semana, Mês, Geral)
- Filtros por jogo específico
- Avatar/nome dos players

**Success Criteria**:
- ✅ Usuário vê ranking geral
- ✅ Pode filtrar por período
- ✅ Pode filtrar por jogo específico
- ✅ Sua posição é destacada

**User Story**:
```gherkin
Given um usuário acessa o Leaderboard
When vê o ranking de jogadores
Then vê top 100 jogadores globais
And sua posição é destacada
And pode filtrar por período (dia, semana, mês, geral)
And pode filtrar por jogo específico
And pode voltar ao hub para jogar mais
```

## Fluxo Detalhado
   - Uso: Ações (Jogar, Voltar, Ver Ranking)
   - Props: `variant="primary"`, `size="md"`, `fullWidth`

3. **Text**
   - Uso: Títulos, descrições, labels
   - Props: `as="h1|h2|p"`, `size="xl|lg|base"`, `weight="bold|semibold"`

4. **Badge**
   - Variantes: `success`, `warning`, `info`
   - Uso: Status do jogo (Novo, Popular, Concluído)
   - Props: `variant="success"`, `size="sm"`

5. **Progress**
   - Uso: Indicador de progresso do jogador
   - Props: `value={75}`, `max={100}`, `size="md"`
   - Exibe porcentagem de conclusão

6. **Leaderboard** (#61)
   - Uso: Ranking de pontuações
   - Props: `entries={[...]}`, `highlightPosition={5}`
   - Mostra top jogadores e posição do usuário

7. **Layout**
   - Uso: Container responsivo
   - Props: `maxWidth="xl"`, `paddingY="lg"`, `centered`

## Estrutura de Dados

### Game Card Object
```typescript
interface GameCard {
  id: string;
  slug: string;
  title: string;
  description: string;
  thumbnail: string; // URL ou base64
  category: 'math' | 'language' | 'science' | 'logic';
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: string; // "10-15 min"
  playerProgress?: number; // 0-100
  status?: 'new' | 'popular' | 'completed';
}
```

### Leaderboard Entry
```typescript
interface LeaderboardEntry {
  rank: number;
  playerName: string;
  score: number;
  completionTime?: string;
  isCurrentUser?: boolean;
}
```

## Mockups de Dados

```json
{
  "games": [
    {
      "id": "game-1",
      "slug": "math-challenge",
      "title": "Desafio Matemático",
      "description": "Resolva problemas matemáticos e desafie seus amigos!",
      "thumbnail": "🧮",
      "category": "math",
      "difficulty": "medium",
      "estimatedTime": "10-15 min",
      "playerProgress": 75,
      "status": "popular"
    },
    {
      "id": "game-2",
      "slug": "word-master",
      "title": "Mestre das Palavras",
      "description": "Expanda seu vocabulário neste jogo de palavras",
      "thumbnail": "📚",
      "category": "language",
      "difficulty": "easy",
      "estimatedTime": "5-10 min",
      "playerProgress": 100,
      "status": "completed"
    },
    {
      "id": "game-3",
      "slug": "science-quiz",
      "title": "Quiz de Ciências",
      "description": "Teste seus conhecimentos científicos",
      "thumbnail": "🔬",
      "category": "science",
      "difficulty": "hard",
      "estimatedTime": "15-20 min",
      "playerProgress": 0,
      "status": "new"
    }
  ]
}
```

## Páginas no Studio

### 1. `/game-hub` - Página Principal
- Grid responsivo de cards de jogos (3 colunas em desktop, 1 em mobile)
- Filtros por categoria e dificuldade
- Barra de busca por título
- Seção de "Meus Jogos" (jogos em progresso)
- Seção de "Jogos Populares"

### 2. `/game/:slug` - Página Individual do Jogo
- Header com título e descrição
- Área de jogo (pode ser iframe ou componente React)
- Painel lateral com:
  - Progress do jogador
  - Tempo decorrido
  - Melhor pontuação
  - Botão "Pausar/Sair"

### 3. `/game/:slug/results` - Resultados
- Pontuação final
- Tempo total
- Comparação com média
- Botão "Ver Leaderboard"
- Botão "Jogar Novamente"

### 4. `/game/:slug/leaderboard` - Ranking
- Tabela com top 100 jogadores
- Destaque para posição do usuário atual
- Filtros por período (dia, semana, mês, geral)

## Links

- [Studio - Game Hub](http://localhost:3000/game-hub)
- [Studio - Editor](http://localhost:3000/studio?page=game-hub)
- [Storybook - GameCard Component](http://localhost:6006/?path=/story/game-hub-gamecard--default)
- [Storybook - Progress Component](http://localhost:6006/?path=/story/components-progress--default)
- [Storybook - Leaderboard Component](http://localhost:6006/?path=/story/components-leaderboard--default)
- [Design System](../../packages/design-system/)
- [Figma Design](https://figma.com/educacross-game-hub) _(placeholder)_

## Decisões Técnicas

### 1. Armazenamento de Progresso
- **Decisão**: Usar localStorage para MVP de prototipagem
- **Razão**: Simplicidade e rapidez, sem necessidade de backend
- **Futuro**: Migrar para API com persistência em banco de dados

### 2. Sistema de Pontuação
- **Decisão**: Pontuação baseada em (acertos × velocidade × dificuldade)
- **Razão**: Incentiva precisão e agilidade
- **Fórmula**: `score = correct_answers * (max_time - time_taken) * difficulty_multiplier`

### 3. Categorização de Jogos
- **Decisão**: 4 categorias principais (Math, Language, Science, Logic)
- **Razão**: Alinhamento com currículo escolar
- **Extensibilidade**: Fácil adicionar novas categorias

### 4. Layout Responsivo
- **Decisão**: Grid com auto-fit e minmax
- **Razão**: Adaptação automática sem media queries complexos
- **Breakpoints**: 
  - Mobile: 1 coluna
  - Tablet: 2 colunas
  - Desktop: 3 colunas

## Próximos Passos

1. **Implementação no Puck Studio** ✅
   - [x] Criar página `/game-hub` com cards mockados
   - [x] Configurar componentes no `puck.config.tsx`
   - [x] Testar responsividade

2. **Integração de Componentes** ✅
   - [x] Integrar Progress component (#60)
   - [x] Integrar Leaderboard component (#61)
   - [x] Criar game card personalizado se necessário

3. **Dados Mockados** ✅
   - [x] Criar arquivo JSON com jogos exemplo
   - [x] Implementar lógica de filtros
   - [x] Simular progresso do jogador

4. **Testes**
   - [x] Story no Storybook para GameCard
   - [ ] Testar navegação entre páginas
   - [ ] Validar acessibilidade
   - [ ] Testar em dispositivos móveis

## Referências

- [Documentação Puck](https://puckeditor.com/docs)
- [Design System Guidelines](../../packages/design-system/README.md)
- [Documentação Game Domain](../README.md)
- [Template de Jornada](../../template-jornada.md)

---

**Última atualização**: 2025-11-24  
**Responsáveis**: Equipe Frontend + UX/Design  
**Status**: Em desenvolvimento
