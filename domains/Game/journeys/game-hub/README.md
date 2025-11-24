# Jornada: Game Hub

## Objetivo

Criar um hub centralizado para acesso a todos os jogos educacionais disponíveis na plataforma EDUCACROSS, oferecendo uma experiência visual atraente e navegação intuitiva. O Game Hub serve como ponto de entrada para os jogadores explorarem, selecionarem e acessarem diferentes jogos, além de visualizarem seu progresso e rankings.

## Status

- [x] Planejamento
- [x] Estrutura de documentação
- [ ] Prototipagem no Puck Studio
- [ ] Integração de componentes
- [ ] Testes de usabilidade
- [ ] Concluído

## Fluxo da Jornada

### 1. Entrada no Game Hub
```
Usuário → Acessa /game-hub
         ↓
    Visualiza lista de jogos disponíveis
         ↓
    Vê cards com thumbnails, títulos e descrições
```

### 2. Seleção de Jogo
```
Usuário → Clica em um card de jogo
         ↓
    Navega para /game/:slug
         ↓
    Página do jogo é carregada
```

### 3. Durante o Jogo
```
Usuário → Joga e interage
         ↓
    Progress é atualizado em tempo real
         ↓
    Pode pausar/sair a qualquer momento
```

### 4. Pós-Jogo
```
Usuário → Completa o jogo
         ↓
    Visualiza tela de resultados
         ↓
    Vê sua pontuação no Leaderboard
         ↓
    Opções: Jogar novamente | Voltar ao Hub
```

### 5. Visualização de Rankings
```
Usuário → Acessa Leaderboard
         ↓
    Vê ranking global de todos os jogadores
         ↓
    Pode filtrar por jogo específico
         ↓
    Vê sua posição destacada
```

## Componentes Utilizados

### Do Design System (@prototipo/design-system)

1. **Card** 
   - Variante: `elevated`
   - Uso: Cards de jogos com thumbnail e informações
   - Props: `variant="elevated"`, `padding="md"`, `clickable={true}`

2. **Button**
   - Variantes: `primary`, `secondary`, `outline`
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
- [Studio - Editor](http://localhost:3000/studio?slug=game-hub)
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

1. **Implementação no Puck Studio**
   - [ ] Criar página `/game-hub` com cards mockados
   - [ ] Configurar componentes no `puck.config.tsx`
   - [ ] Testar responsividade

2. **Integração de Componentes**
   - [ ] Integrar Progress component (#60)
   - [ ] Integrar Leaderboard component (#61)
   - [ ] Criar game card personalizado se necessário

3. **Dados Mockados**
   - [ ] Criar arquivo JSON com jogos exemplo
   - [ ] Implementar lógica de filtros
   - [ ] Simular progresso do jogador

4. **Testes**
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
