# Notas de Design e Decisões Técnicas - Game Hub

> 📝 Documento vivo para registrar decisões, aprendizados e insights durante o desenvolvimento da jornada Game Hub

---

## 🎯 Visão Geral

Este documento complementa o README.md com informações mais técnicas e decisões de design que surgiram durante o processo de prototipação. Serve como registro histórico e referência para futuras iterações.

---

## 🧠 Decisões de Arquitetura

### Estrutura de Componentes

#### Por que separar Progress, Leaderboard e Modal como componentes independentes?

**Contexto**: Inicialmente consideramos criar componentes específicos apenas para o Game Hub (ex: `GameCard`, `GameLeaderboard`).

**Decisão**: Criar componentes genéricos e reutilizáveis no Design System que podem ser usados em múltiplos contextos, não apenas em jogos.

**Razões**:
1. **Reusabilidade**: Progress pode ser usado em qualquer fluxo que necessite indicação de progresso (cursos, onboarding, uploads, etc)
2. **Consistência**: Mesma linguagem visual em toda plataforma
3. **Manutenibilidade**: Um único componente para manter e testar
4. **Flexibilidade**: Props genéricas permitem customização para casos específicos

**Trade-offs**:
- ✅ Maior reusabilidade e consistência
- ✅ Menos código duplicado
- ⚠️ Precisa considerar múltiplos use cases (mais complexo)
- ⚠️ Documentação e exemplos precisam cobrir diferentes contextos

---

### Estrutura de Dados: Mock vs Real

#### Como estruturar dados para facilitar transição de mock para real?

**Contexto**: Fase de prototipação usa dados estáticos, mas queremos facilitar implementação futura com backend.

**Decisão**: Usar TypeScript interfaces que mapeiam diretamente para estrutura esperada de API REST/GraphQL.

**Implementação**:
```typescript
// Mock local (prototipação)
const mockGames: Game[] = [...];

// Futuro: API real
const { data: games } = await fetch('/api/games').then(r => r.json());
// Mesma interface Game, mudando apenas a fonte dos dados
```

**Benefícios**:
1. Contratos de dados definidos desde o início
2. Frontend não precisa mudar ao integrar com backend
3. Facilita validação e type-checking
4. Documentação serve para frontend e backend

---

### Separação de Leaderboard Global vs Por Jogo

#### Dois componentes ou um componente com prop?

**Contexto**: Leaderboard pode ser global (todos os jogos) ou específico (um jogo).

**Decisão**: Um único componente `Leaderboard` com prop `scope: 'global' | 'game'` e `gameId?: string`.

**Razões**:
1. Estrutura visual é idêntica
2. Diferença está apenas nos dados exibidos
3. Menos componentes para manter
4. Reutilização de estilos e lógica

**Código**:
```typescript
// Global
<Leaderboard scope="global" entries={globalEntries} />

// Por jogo
<Leaderboard scope="game" gameId="quiz-matematica" entries={gameEntries} />
```

---

## 🎨 Decisões de UX/UI

### Top 3 com Medalhas no Leaderboard

#### Por que usar medalhas visuais (🥇🥈🥉) ao invés de apenas números?

**Contexto**: Leaderboards tradicionais apenas mostram números (1, 2, 3...).

**Decisão**: Top 3 recebe medalhas visuais especiais + destaque de cor.

**Razões**:
1. **Gamificação**: Medalhas têm apelo emocional maior que números
2. **Reconhecimento imediato**: Ícones são processados mais rápido que texto
3. **Motivação**: Incentiva usuários a alcançar top 3
4. **Padrão estabelecido**: Comum em apps gamificados (Duolingo, Strava, etc)

**Implementação**:
```typescript
const getMedalIcon = (rank: number): string | null => {
  if (rank === 1) return '🥇';
  if (rank === 2) return '🥈';
  if (rank === 3) return '🥉';
  return null;
};
```

---

### Modal vs Página para Resultados

#### Por que não escolher apenas um?

**Contexto**: Resultados podem ser mostrados imediatamente após jogo ou consultados depois.

**Decisão**: Modal para feedback imediato + página separada para histórico.

**Fluxos**:
1. **Imediato**: Usuário completa jogo → Modal aparece com resultados → usuário escolhe próxima ação
2. **Histórico**: Usuário navega para "Meus Resultados" → vê lista de todos os jogos → clica em um → página de detalhes

**Razões**:
- Modal mantém contexto (usuário ainda está "no jogo")
- Modal permite ação rápida (jogar novamente, ver ranking)
- Página permite análise profunda (estatísticas, gráficos, comparações)

---

### Barra de Progresso Animada

#### Por que animar o preenchimento da barra?

**Contexto**: Progresso pode ser mostrado estaticamente ou com animação.

**Decisão**: Animar preenchimento quando progresso muda.

**Razões**:
1. **Feedback visual**: Usuário vê que algo aconteceu
2. **Gratificação**: Animação reforça sensação de avanço
3. **Atenção**: Movimento atrai olhar para o progresso
4. **Polimento**: Detalhes assim elevam qualidade percebida

**Implementação sugerida**:
```css
.progress-fill {
  transition: width 0.5s ease-out;
}
```

**Cuidados**:
- Não animar em carregamento inicial (apenas em mudanças)
- Respeitar `prefers-reduced-motion` para acessibilidade
- Duração razoável (300-500ms, não muito lenta)

---

## 🔐 Considerações de Acessibilidade

### Navegação por Teclado no Leaderboard

**Requisito**: Usuários de teclado devem conseguir navegar pelo ranking.

**Implementação**:
- Cada entrada no ranking é focável (se tiver ação associada)
- Setas ↑↓ navegam entre entradas
- Tab pula para próximo elemento interativo
- Entrada do usuário atual sempre visível (scroll automático se necessário)

```typescript
// Pseudo-código
<ol role="list" aria-label="Ranking de jogadores">
  {entries.map(entry => (
    <li 
      key={entry.userId}
      tabIndex={entry.isCurrentUser ? 0 : -1}
      aria-current={entry.isCurrentUser ? 'true' : undefined}
    >
      {/* conteúdo */}
    </li>
  ))}
</ol>
```

---

### Anúncio de Resultados para Screen Readers

**Requisito**: Usuários de screen readers devem "ouvir" resultados.

**Implementação**:
- Modal de resultados tem `role="dialog"` e `aria-labelledby` apontando para título
- Pontuação principal tem `aria-live="polite"` para ser anunciada
- Badges desbloqueados anunciados como lista

```typescript
<div 
  role="dialog" 
  aria-labelledby="result-title"
  aria-describedby="result-score"
>
  <h2 id="result-title">Parabéns! Jogo Completo</h2>
  <div id="result-score" aria-live="polite">
    Você marcou {score} pontos
  </div>
  {/* ... */}
</div>
```

---

### Contraste em Badges e Progresso

**Requisito**: WCAG 2.1 AA - mínimo 4.5:1 para texto, 3:1 para componentes.

**Verificação**:
- Badges com backgrounds coloridos: texto sempre em branco ou preto com contraste adequado
- Barra de progresso: contraste entre barra preenchida e fundo
- Hover/focus states: manter contraste mesmo em estados interativos

**Ferramentas de teste**:
- Chrome DevTools > Lighthouse > Accessibility
- WebAIM Contrast Checker
- Storybook addon-a11y (após issue #8)

---

## 💡 Insights de UX

### Feedback Imediato é Crucial em Jogos

**Observação**: Em contextos gamificados, qualquer ação do usuário deve ter feedback instantâneo e visível.

**Aplicações no Game Hub**:
1. **Clicar em card de jogo**: Animação de "press" + transição suave para tela de seleção
2. **Responder questão**: Feedback imediato de certo/errado com cor e ícone
3. **Completar jogo**: Modal aparece imediatamente com animação de celebração
4. **Ganhar badge**: Animação de "pop" do badge sendo desbloqueado

**Referências**:
- [The Importance of Feedback in Games](https://www.gamedeveloper.com/design/the-importance-of-feedback-in-games)

---

### Progresso Visível Aumenta Engajamento

**Observação**: Usuários completam mais tarefas quando veem progresso claro.

**Aplicações**:
1. Barra de progresso em cada jogo (ex: "45% completo")
2. Indicador de questões (ex: "5 de 10")
3. Conquistas visuais (badges, medalhas)
4. Posição no ranking como meta ("Você está a 50 pontos do top 10!")

**Princípio psicológico**: Goal-gradient effect (pessoas aceleram conforme se aproximam da meta)

---

### Competição Social Motiva (Mas Precisa de Cuidado)

**Observação**: Leaderboards podem motivar ou desmotivar, dependendo do contexto.

**Estratégias no Game Hub**:
1. **Mostrar posição relativa**: "Você está no top 20%" vs "Você está em 342º"
2. **Destacar progresso pessoal**: "Melhor que sua última tentativa em 15%"
3. **Opção de competir ou não**: Permitir modo "solo" sem ranking
4. **Leaderboards contextualizados**: Por turma, por escola, não apenas global
5. **Celebrar todos os níveis**: Não apenas top 3, mas também "mais melhorado", "mais persistente", etc

**Referências**:
- [The Psychology of Leaderboards](https://www.nngroup.com/articles/leaderboards/)

---

## 🔄 Iterações Planejadas

### Versão 1.0 (MVP - Prototipação Atual)
- [x] Documentação completa da jornada
- [ ] Mocks de dados definidos
- [ ] Especificação de componentes novos (Progress, Leaderboard, Modal)
- [ ] Páginas estáticas no Studio

### Versão 1.1 (Componentes Implementados)
- [ ] Componente Progress funcional
- [ ] Componente Leaderboard funcional
- [ ] Componente Modal funcional
- [ ] Integração com Studio/Puck

### Versão 1.2 (Prototipação Interativa)
- [ ] Navegação funcional entre páginas
- [ ] Animações e transições
- [ ] LocalStorage para simular estado (progresso, pontuações)

### Versão 2.0 (Implementação Real com Backend)
- [ ] API de jogos (GET /api/games)
- [ ] API de leaderboard (GET /api/leaderboard)
- [ ] API de resultados (POST /api/games/:id/results)
- [ ] Autenticação de usuários
- [ ] Persistência real de dados

---

## 🐛 Problemas Conhecidos e Limitações

### Prototipação Estática

**Limitação**: Páginas no Studio são estáticas, não há lógica de jogo real.

**Impacto**: Não é possível testar gameplay interativo.

**Workaround**: Criar telas de jogo como "screenshots" de estados (início, meio, fim).

**Resolução futura**: Implementação real com código JavaScript/TypeScript.

---

### Mocks de Dados Não Sincronizados

**Limitação**: Cada página tem seus próprios mocks, não há estado compartilhado.

**Impacto**: Progresso mostrado na Home pode não corresponder ao mostrado em Detalhes.

**Workaround**: Documentar claramente dados mock e manter consistência manual.

**Resolução futura**: Context API ou Zustand para estado global no Studio (se aplicável).

---

### Performance com Muitas Entradas no Leaderboard

**Limitação**: Renderizar 100+ entradas pode causar lentidão.

**Impacto**: UX degradada em dispositivos mais lentos.

**Soluções consideradas**:
1. **Paginação**: Mostrar 20 entradas por vez + botão "Carregar mais"
2. **Virtualização**: Usar react-window ou react-virtualized
3. **Lazy loading**: Carregar apenas quando usuário scrollar

**Decisão para MVP**: Limitar a 50 entradas, implementar paginação em versão futura.

---

## 📊 Métricas de Sucesso (Futuro)

### KPIs para Avaliar Game Hub

Quando implementado, medir:

1. **Engajamento**:
   - Taxa de usuários que iniciam pelo menos um jogo
   - Média de jogos iniciados por usuário
   - Taxa de conclusão de jogos (iniciados vs completados)

2. **Retenção**:
   - Usuários que retornam ao Game Hub em 7 dias
   - Usuários que jogam pelo menos 1x por semana

3. **Competição**:
   - Porcentagem de usuários que visualizam leaderboard
   - Usuários que jogam novamente após ver ranking

4. **Progresso**:
   - Média de progresso em cada jogo
   - Taxa de conquista de badges

5. **UX**:
   - Tempo médio na tela de seleção de jogo
   - Taxa de cliques em "Jogar Novamente" vs "Voltar ao Hub"

**Ferramentas**: Google Analytics, Mixpanel, PostHog, ou similar.

---

## 🔗 Links Úteis e Referências Técnicas

### Design Patterns
- [Game UI Patterns](https://www.gameuidatabase.com/)
- [Mobile Game UX](https://medium.com/googleplaydev/mobile-game-ux-best-practices)

### Componentes Similares em Outras Libraries
- [Chakra UI - Progress](https://chakra-ui.com/docs/components/progress)
- [Material UI - Progress](https://mui.com/material-ui/react-progress/)
- [Ant Design - Progress](https://ant.design/components/progress)

### Acessibilidade
- [ARIA Authoring Practices - Dialog](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)
- [ARIA - Progressbar](https://www.w3.org/WAI/ARIA/apg/patterns/meter/)

### Gamificação
- [Octalysis Framework](https://yukaichou.com/gamification-examples/octalysis-complete-gamification-framework/)
- [Gamification Research](https://www.gamification-research.org/)

---

## 📝 Log de Mudanças

### 2025-11-23 - Criação Inicial
- ✅ Estrutura de diretórios criada
- ✅ README.md completo com fluxo, componentes, mocks
- ✅ notas.md iniciado com decisões técnicas

### [Data futura] - Especificação de Componentes
- [ ] Progress component especificado
- [ ] Leaderboard component especificado
- [ ] Modal component especificado

### [Data futura] - Prototipação no Studio
- [ ] Páginas criadas
- [ ] Navegação implementada
- [ ] Feedback visual aplicado

---

**Última atualização**: 2025-11-23  
**Responsável**: Equipe de Desenvolvimento  
**Status**: 🚧 Em construção
