# Notas - Game Hub Journey

## 💡 Decisões de UX/Design

### 1. Layout Principal: Grid de Cards vs. Lista Vertical

**Decisão**: Usar grid responsivo de cards com thumbnails e informações compactas

**Razão**: 
- **Apelo visual**: Cards com thumbnails são muito mais atraentes visualmente que listas textuais
- **Espaço otimizado**: Grid aproveita melhor o espaço horizontal em telas grandes
- **Identificação rápida**: Imagens/ícones ajudam usuários a reconhecer jogos instantaneamente
- **Padrão do mercado**: Steam, Epic Games, consoles modernos usam esse formato com sucesso
- **Mais informação por item**: Cards comportam progresso, dificuldade, descrição sem poluir

**Alternativas consideradas**:
- **Lista vertical simples**: Descartada por ser menos engaging e desperdiçar espaço lateral
- **Carrossel horizontal**: Descartada porque esconde jogos e dificulta comparação
- **Tabela tradicional**: Descartada por ser muito corporativa, pouco lúdica

**Trade-offs**:
- ✅ **Pros**: 
  - Visualmente atrativo
  - Escaneamento mais eficiente (eye tracking)
  - Suporta mais informação visual (thumbnails, badges, progresso)
  - Responsivo (colapsa para 1 coluna em mobile)
- ❌ **Contras**: 
  - Ocupa mais espaço vertical (requer scroll para muitos jogos)
  - Pode ser mais lento em conexões lentas (imagens)
  - Acessibilidade requer atenção (navegação por teclado)

**Status**: ✅ Aprovado por PM e Design em 2025-11-24

---

### 2. Leaderboard: Sempre Visível vs. Modal/Aba

**Decisão**: Sidebar fixa no desktop (300-400px), seção separada no mobile

**Razão**:
- **Motivação constante**: Ver ranking o tempo todo cria senso de competição saudável
- **Gamificação social**: Elemento crítico para engajamento (baseado em Duolingo, Kahoot)
- **Zero fricção**: Não requer clique adicional, sempre presente
- **Senso de comunidade**: Usuário vê que não está sozinho, vê progresso de outros

**Alternativas consideradas**:
- **Modal/overlay acionado por botão**: Descartada - adiciona fricção, esconde informação
- **Aba separada**: Descartada - usuário pode esquecer de checar
- **Seção no rodapé**: Descartada - perde visibilidade, precisa scroll

**Trade-offs**:
- ✅ **Pros**: 
  - Sempre visível (sem cliques)
  - Motivação contínua
  - Criação de senso de comunidade
  - Fácil de atualizar em tempo real
- ❌ **Contras**: 
  - Ocupa espaço lateral (~25% da largura)
  - Em mobile precisa ser colapsado/movido
  - Pode ser distração para alguns usuários

**Mitigações**:
- Ocupação de espaço: Aceitável em telas ≥1024px (desktop/tablet landscape)
- Mobile: Seção separada abaixo do grid (não fixa)
- Distração: Posição lateral direita (menos interferência com foco principal)

**Status**: ✅ Aprovado por PM e UX em 2025-11-24

---

### 3. Indicador de Progresso: Dual (Global + Individual)

**Decisão**: Barra global no header + barras individuais em cada card de jogo

**Razão**:
- **Visão macro e micro**: Usuário vê progresso geral E específico de cada jogo
- **Motivação duplicada**: Duas fontes de feedback positivo
- **Ajuda na decisão**: "Este jogo está 80% concluído, vou finalizar" vs. "Este está 10%, deixo pra depois"
- **Gamificação clara**: Progresso visual é mais motivador que apenas números

**Alternativas consideradas**:
- **Apenas percentual numérico**: Descartada - menos visual, menos impactante
- **Apenas indicador global**: Descartada - perde granularidade, não ajuda a escolher qual jogo jogar
- **Apenas indicadores individuais**: Descartada - perde visão geral de avanço na plataforma

**Trade-offs**:
- ✅ **Pros**: 
  - Informação rica (geral + específica)
  - Motivação em dois níveis
  - Ajuda tomada de decisão
  - Reforço de gamificação
- ❌ **Contras**: 
  - Requer sincronização de dados entre jogos
  - Aumenta complexidade de implementação
  - Pode poluir interface se mal executado

**Mitigações**:
- Sincronização: LocalStorage para MVP, API centralizada no futuro
- Complexidade: Componente Progress (#60) já implementado e reutilizável
- Poluição: Design limpo com barras finas, cores sutis

**Status**: ✅ Aprovado por PM e Dev Team em 2025-11-24

---

### 4. Dificuldade dos Jogos: Badge Colorido

**Decisão**: Badge colorido usando sistema semafórico (Fácil=verde, Médio=amarelo, Difícil=vermelho)

**Razão**:
- **Reconhecimento imediato**: Cores semafóricas são universais
- **Alto contraste**: Verde/amarelo/vermelho distinguíveis para maioria dos usuários
- **Compacto**: Badge ocupa pouco espaço, alto impacto
- **Padrão do DS**: Componente Badge já existe com variants success/warning/error

**Alternativas consideradas**:
- **Estrelas/níveis (★★★☆☆)**: Descartada - menos clara a distinção entre níveis
- **Apenas texto ("Fácil", "Médio", "Difícil")**: Descartada - menos visual
- **Ícones variados**: Descartada - inconsistente, requer aprendizado

**Trade-offs**:
- ✅ **Pros**: 
  - Reconhecimento universal
  - Rápido de escanear
  - Ocupa pouco espaço
  - Componente já existe (Badge)
- ❌ **Contras**: 
  - Daltonismo total (vermelho-verde) pode ser problema
  - Pode ter conotação negativa (vermelho = erro)

**Mitigações**:
- Daltonismo: Adicionar ícone junto com cor (🟢 Fácil, 🟡 Médio, 🔴 Difícil) ou texto sempre visível
- Conotação: Em contexto de jogos, vermelho = desafio, não erro (positivo)

**Status**: ✅ Aprovado por Design e Accessibility Lead em 2025-11-24

---

### 5. Navegação: Direta vs. Preview Modal

**Decisão**: Clique no card navega diretamente para `/game/:slug`, sem modal intermediário

**Razão**:
- **Menos fricção**: Um clique para entrar no jogo (vs. dois cliques com modal)
- **Informação suficiente**: Card já mostra nome, descrição, dificuldade, progresso
- **Fluxo mais rápido**: Usuário quer jogar, não ler mais detalhes
- **Retorno fácil**: Botão "Voltar ao Hub" sempre visível

**Alternativas consideradas**:
- **Modal com mais detalhes**: Descartada - adiciona fricção desnecessária para MVP
- **Página intermediária "Sobre o Jogo"**: Descartada - pode ser adicionada no futuro, mas não para MVP
- **Hover tooltip com detalhes**: Considerada para desktop (não substitui clique direto)

**Trade-offs**:
- ✅ **Pros**: 
  - Fluxo direto, menos cliques
  - Mais rápido para usuário engajado
  - Simples de implementar
- ❌ **Contras**: 
  - Não há preview detalhado antes de entrar
  - Usuário pode se arrepender após entrar

**Mitigações**:
- Preview: Adicionar hover tooltip com info extra (desktop)
- Arrependimento: Botão "Voltar" sempre visível, histórico de navegação preservado

**Status**: ✅ Aprovado por UX e Dev em 2025-11-24

---

## 🗣️ Feedback de Stakeholders

### Product Manager (2025-11-24)

**Aprovado**:
- ✅ Grid layout com thumbnails e informações compactas
- ✅ Leaderboard sempre visível (sidebar desktop)
- ✅ Dual progress indicators (global + por jogo)
- ✅ Navegação direta (sem modal intermediário)

**Pendente**:
- 🟡 **Definir critérios de ranking**: Score total? Tempo? Tentativas? Mix ponderado?
  - **Nota**: Definir com Analytics e Game Designer na Sprint 4
- 🟡 **Top 5 ou Top 10?**: Validar se 5 jogadores são suficientes ou expandir
  - **Nota**: Testar com usuários, avaliar engajamento

**Sugestões futuras**:
- Filtros de busca (por categoria, dificuldade, progresso)
- Sistema de favoritos (marcar jogos preferidos)
- Recomendações personalizadas (baseado em histórico)

---

### Designer / UX Lead (2025-11-24)

**Aprovado**:
- ✅ Uso consistente de componentes do Design System
- ✅ Responsividade mobile-first (grid colapsável)
- ✅ Hierarquia visual clara (título → cards → leaderboard)
- ✅ Badges coloridos para dificuldade (com mitigação para daltonismo)

**Pendente**:
- 🟡 **Paleta de cores por categoria de jogo**: 
  - Matemática: Azul
  - Linguagem: Roxo
  - Ciência: Verde
  - História: Laranja
  - Lógica: Cinza
  - **Nota**: Aplicar em borda/background do card ou thumbnail
- 🟡 **Thumbnails mockados**: Criar 7 imagens placeholder (256x256px) para os jogos
  - Usar Figma ou ferramenta de ícones (ex: Heroicons, Lucide)

**Sugestões futuras**:
- Animações de transição entre páginas (Framer Motion)
- Microinterações nos cards (hover, focus)
- Skeleton loading para carregamento inicial

---

### Dev Team / Tech Lead (2025-11-24)

**Aprovado**:
- ✅ Mock data local para MVP (LocalStorage ou JSON estático)
- ✅ Reutilização de componentes #60 (Progress) e #61 (Leaderboard)
- ✅ Estrutura de rotas Next.js (`/game-hub`, `/game/:slug`)
- ✅ Arquitetura limpa e testável

**Pendente**:
- 🟡 **API REST para jogos reais**: 
  - Endpoints: `GET /api/games`, `GET /api/games/:slug`, `GET /api/leaderboard`
  - Autenticação: JWT ou session-based
  - **Nota**: Issue separada para Sprint 4/5
- 🟡 **Estratégia de cache**: 
  - Cache local (React Query / SWR)
  - Invalidação ao completar desafios
  - Sincronização offline/online

**Preocupações técnicas**:
- ⚠️ **Performance com muitos jogos**: 
  - Implementar virtualização (react-window) se >50 jogos
  - Lazy loading de imagens (next/image)
- ⚠️ **Sincronização de progresso**: 
  - Garantir que progresso em `/game/:slug` reflita imediatamente no hub
  - Considerar WebSockets ou polling para leaderboard em tempo real

---

### Accessibility / QA Lead (2025-11-24)

**Aprovado**:
- ✅ Navegação por teclado (Tab, Enter)
- ✅ ARIA labels descritivos (`aria-label="Jogar Quiz Matemático"`)
- ✅ Contraste WCAG AA (cores testadas)

**Pendente**:
- 🟡 **Testes com leitores de tela**: 
  - NVDA (Windows), JAWS (Windows), VoiceOver (macOS/iOS)
  - Validar ordem de leitura, contexto dos cards
- 🟡 **Testes de teclado**: 
  - Tab navigation, Enter/Space para ativar
  - Foco visível em todos os elementos interativos

**Recomendações**:
- Adicionar `skip to main content` link
- Focus trap no leaderboard sidebar (se for modal em mobile)
- Reduzir movimento para usuários com `prefers-reduced-motion`

---

## 📊 Insights de Testes / Observações

### Benchmarking (2025-11-20 a 2025-11-22)

**Steam Big Picture Mode**:
- ✅ Grid de jogos com imagens grandes é extremamente eficaz
- ✅ Hover revela informações adicionais sem modal
- ⚠️ Muita informação pode sobrecarregar (manter simples no MVP)

**Duolingo**:
- ✅ Progresso visual claro (barras + percentuais) motiva usuários
- ✅ Leaderboard sempre visível cria competição saudável
- ✅ Streaks e badges aumentam engajamento

**Kahoot!**:
- ✅ Leaderboard em tempo real é extremamente engajante
- ✅ Cores vibrantes e animações aumentam diversão
- ⚠️ Não exagerar em animações (pode ser distração)

**Khan Academy**:
- ✅ Dashboard de progresso por tópico/matéria é intuitivo
- ✅ Badges de conquistas são motivadores
- ⚠️ Muitos números/estatísticas podem ser overwhelming

---

## 🔄 Decisões Revertidas / Mudanças de Rota

### Mudança 1: Modal de Preview (Descartado)

**Decisão inicial**: Ao clicar em card, abrir modal com detalhes do jogo antes de navegar

**Por que mudamos**:
- Feedback de PM: "Modal adiciona fricção desnecessária"
- Benchmark: Steam, Epic Games navegam diretamente
- Teste de papel: Usuários preferiram fluxo direto

**Nova decisão**: Navegação direta para `/game/:slug`

**Data**: 2025-11-22

---

### Mudança 2: Filtros na Versão MVP (Adiado)

**Decisão inicial**: Incluir filtros de busca (dificuldade, categoria) no MVP

**Por que mudamos**:
- Scope creep: MVP já tem muitas features
- Priorização: Leaderboard e progresso são mais críticos para engajamento
- Data: 7 jogos mockados não justificam filtros complexos

**Nova decisão**: Filtros para Sprint 4 (quando houver >20 jogos)

**Data**: 2025-11-23

---

## 💬 Citações de Usuários / Feedback Qualitativo

_(Placeholder - será preenchido após testes de usabilidade)_

**Esperado**:
- "Gostei de ver meu progresso logo de cara, me motivou a continuar"
- "O leaderboard me fez querer jogar mais para subir no ranking"
- "Os cards são bonitos, dá vontade de clicar"

---

## 📝 To-Do / Action Items

### Curto Prazo (Sprint 3)
- [ ] **Designer**: Criar thumbnails mockados (256x256px) para os 7 jogos
- [ ] **Designer**: Definir paleta de cores por categoria de jogo
- [ ] **Dev**: Implementar página no Studio (Puck) com mock data
- [ ] **PM**: Recrutar 3-5 usuários para testes de usabilidade
- [ ] **QA**: Preparar roteiro de testes (cenários, tarefas, métricas)

### Médio Prazo (Sprint 4)
- [ ] **Backend**: Criar API REST (`GET /api/games`, `GET /api/leaderboard`)
- [ ] **Dev**: Migrar de mock data para API real
- [ ] **Dev**: Implementar filtros de busca
- [ ] **QA**: Testes de acessibilidade com leitores de tela

### Longo Prazo (Backlog)
- [ ] Sistema de badges e conquistas
- [ ] Histórico de partidas e estatísticas
- [ ] Desafios diários/semanais
- [ ] Recomendações personalizadas

---

## 📚 Referências Adicionais

### Artigos / Papers
- [The Gamification of Learning and Instruction](https://www.amazon.com/Gamification-Learning-Instruction-Game-based-Methods/dp/1118096347) - Karl Kapp
- [Designing for Motivation](https://www.nngroup.com/articles/designing-for-motivation/) - Nielsen Norman Group

### Vídeos / Talks
- [Gamification at Work](https://www.youtube.com/watch?v=Bj7fMCVCLXU) - Yu-kai Chou
- [How Games Make Kids Smarter](https://www.ted.com/talks/gabe_zichermann_how_games_make_kids_smarter) - Gabe Zichermann

---

**Última atualização**: 2025-11-24  
**Responsável**: Equipe EDUCACROSS (PM, Design, Dev, QA)
