# Game Hub - Notas de UX/Design e Decisões Técnicas

## 📅 Histórico de Decisões

### 2025-11-24 - Estrutura Inicial

#### Decisão: Layout em Grid vs. Lista
**Escolha**: Grid responsivo com cards
**Razão**: 
- Maior impacto visual
- Melhor aproveitamento de espaço
- Facilita identificação rápida por ícones/cores
- Padrão comum em plataformas de jogos (Steam, Epic Games, etc.)

**Alternativas Consideradas**:
- Lista vertical: Rejeitada por ser menos visual
- Carrossel: Rejeitada por esconder jogos disponíveis

#### Decisão: Categorização por Domínio Educacional
**Escolha**: Math, Language, Science, Logic
**Razão**:
- Alinhamento com currículo escolar brasileiro
- Facilita busca para professores
- Permite filtros diretos

**Feedback do PM**: Considerar adicionar "Multidisciplinar" no futuro

### 2025-11-24 - Sistema de Progresso

#### Decisão: Indicador Visual de Progresso nos Cards
**Escolha**: Progress bar na parte inferior de cada card
**Razão**:
- Feedback visual imediato
- Motiva conclusão (efeito "progress bar completion")
- Não polui visualmente o card

**UX Pattern**: Similar ao Duolingo e Khan Academy

#### Decisão: Persistência de Progresso
**Escolha**: localStorage para MVP
**Razão**:
- Simplicidade de implementação
- Sem necessidade de autenticação inicial
- Permite testes rápidos

**Plano Futuro**: 
- Fase 2: API com autenticação
- Fase 3: Sincronização cross-device

## 🎨 Decisões de Design Visual

### Paleta de Cores por Categoria

**Implementação**:
```css
Math: --color-primary (Azul)
Language: --color-success (Verde)
Science: --color-warning (Laranja)
Logic: --color-secondary (Roxo)
```

**Razão**: 
- Diferenciação visual rápida
- Acessibilidade (não depende só de cor, tem ícone também)
- Consistência com design system

### Iconografia

**Decisão**: Usar emojis para MVP
**Razão**:
- Rápido para prototipar
- Universalmente reconhecíveis
- Sem dependência de biblioteca de ícones

**Plano Futuro**: Substituir por SVG custom icons

### Tipografia e Hierarquia

**H1 (Título Principal)**: 
- Font-size: `--font-size-4xl`
- Font-weight: `--font-weight-bold`
- Uso: "Game Hub", "Meus Jogos"

**H2 (Card Titles)**:
- Font-size: `--font-size-xl`
- Font-weight: `--font-weight-semibold`
- Uso: Títulos de jogos

**Body (Descrições)**:
- Font-size: `--font-size-base`
- Font-weight: `--font-weight-normal`
- Color: `--color-neutral-600` (muted)

## 🔍 Decisões de UX/Interação

### Feedback Tátil (Hover/Focus)

**Implementação**:
- Cards: `transform: translateY(-4px)` + `box-shadow` no hover
- Buttons: `transform: scale(1.05)` no hover
- Focus: `outline: 2px solid --color-primary`

**Razão**:
- Affordance clara de clicabilidade
- Feedback visual imediato
- Acessibilidade para navegação por teclado

### Navegação entre Páginas

**Decisão**: Botão "Voltar ao Hub" sempre visível
**Razão**:
- Evita usuário ficar "preso" no jogo
- Padrão de navegação claro
- Reduz frustração

**Posicionamento**: Top-left corner (convenção web)

### Estados de Loading

**Decisão**: Skeleton cards durante carregamento
**Razão**:
- Melhor UX do que spinner genérico
- Indica estrutura do conteúdo
- Reduz perceived loading time

**Implementação**: Cards com gradiente animado

## 🏆 Sistema de Gamificação

### Leaderboard Design

**Decisão**: Top 100 + destaque para usuário atual
**Razão**:
- Balanceia competitividade com inclusão
- Sempre mostra posição do usuário (mesmo fora do top)
- Incentiva melhoria sem desmotivar

**Feedback de Usabilidade**: Testar com professores e alunos

### Badges e Conquistas (Futuro)

**Proposta**: Implementar sistema de badges
**Exemplos**:
- "Primeira Vitória"
- "Mestre da Matemática" (completar todos jogos de Math)
- "Velocista" (completar em metade do tempo esperado)

**Status**: Planejado para Fase 2

### Sistema de Pontuação

**Fórmula Atual**:
```
score = correct_answers × (max_time - time_taken) × difficulty_multiplier

Onde:
- correct_answers: número de respostas corretas
- max_time: tempo máximo esperado (segundos)
- time_taken: tempo que o jogador levou
- difficulty_multiplier: 1.0 (easy), 1.5 (medium), 2.0 (hard)
```

**Razão**:
- Incentiva velocidade E precisão
- Dificuldade maior = mais pontos
- Desencoraja "chute aleatório"

**Ajustes Futuros**: Considerar penalidade por erros

## 📱 Responsividade e Mobile-First

### Breakpoints

**Decisão**: CSS Grid com auto-fit
```css
grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
```

**Comportamento**:
- Mobile (<768px): 1 coluna
- Tablet (768-1024px): 2 colunas
- Desktop (>1024px): 3 colunas

**Razão**: Adaptação automática, sem media queries complexos

### Touch Targets

**Decisão**: Mínimo 44×44px para todos botões/cards
**Razão**: 
- WCAG AAA guideline
- Facilita interação em mobile
- Reduz erros de toque

### Orientação de Dispositivo

**Recomendação**: Landscape para jogos, Portrait para hub
**Implementação**: Mensagem sugerindo rotação quando apropriado

## ♿ Acessibilidade

### Navegação por Teclado

**Implementação**:
- Tab order lógico (esquerda → direita, cima → baixo)
- Focus visible em todos elementos interativos
- Enter/Space para ativar botões
- Escape para fechar modais

**Teste**: Usar apenas teclado para completar uma jornada

### Screen Readers

**ARIA Labels Implementados**:
```html
<div role="region" aria-label="Lista de jogos disponíveis">
<button aria-label="Jogar Desafio Matemático">
<div aria-live="polite" aria-atomic="true"> <!-- Para updates de pontuação -->
```

**Razão**: Garantir experiência equivalente para usuários com deficiência visual

### Contraste de Cores

**Padrão**: WCAG AA mínimo (4.5:1 para texto normal)
**Ferramenta**: Chrome DevTools Contrast Checker

**Validação**: Todos componentes passam no teste

## 🧪 Testes e Validação

### Testes de Usabilidade Planejados

1. **Teste com Professores** (semana 1)
   - Objetivo: Validar categorização e relevância educacional
   - Método: Entrevistas 1-on-1 + observação

2. **Teste com Alunos** (semana 2)
   - Objetivo: Validar engajamento e clareza
   - Método: Observação + questionário pós-teste
   - Métricas: Tempo para encontrar jogo, taxa de conclusão

3. **Teste A/B** (futuro)
   - Variante A: Grid 3 colunas
   - Variante B: Grid 4 colunas
   - Métrica: Taxa de clique

### Métricas de Sucesso

**Quantitativas**:
- Taxa de engajamento: >70%
- Tempo médio de sessão: 15-20 min
- Taxa de conclusão de jogos: >60%

**Qualitativas**:
- Satisfação (NPS): >8/10
- Facilidade de navegação: >4/5
- Retenção semanal: >50%

## 🚧 Limitações Conhecidas

### MVP (Atual)

1. **Sem Autenticação**: Progresso não persiste entre dispositivos
2. **Sem Multiplayer**: Jogos são single-player apenas
3. **Dados Mockados**: Leaderboard usa dados sintéticos
4. **Sem Analytics**: Não rastreamos métricas de uso ainda

### Roadmap para Resolver

**Fase 2 (Q1 2026)**:
- Implementar autenticação (OAuth)
- Backend para persistência
- Analytics básico (eventos de jogo iniciado/concluído)

**Fase 3 (Q2 2026)**:
- Modo multiplayer para jogos selecionados
- Recomendações personalizadas (ML)
- Dashboard para professores

## 💡 Ideias para Explorar

### Features Futuros

1. **Modo Offline**: Service worker para jogar sem internet
2. **Compartilhamento Social**: "Compartilhe sua pontuação!"
3. **Desafios Semanais**: Jogos temáticos toda semana
4. **Customização de Avatar**: Personalização do perfil
5. **Modo Cooperativo**: Jogos em equipe para sala de aula

### Melhorias de UX

1. **Animações de Transição**: Page transitions mais suaves
2. **Sound Effects**: Feedback sonoro (opcional, acessível)
3. **Haptic Feedback**: Vibração em mobile (iOS/Android)
4. **Dark Mode**: Tema escuro para reduzir cansaço visual

## 📚 Referências e Inspiração

### Plataformas Analisadas

1. **Duolingo**
   - Aprendizado: Sistema de streaks (dias consecutivos)
   - Adaptação: Progress bar visível, badges motivacionais

2. **Khan Academy**
   - Aprendizado: Categorização clara por matéria
   - Adaptação: Indicadores de dificuldade, tempo estimado

3. **Kahoot!**
   - Aprendizado: Competitividade saudável, leaderboard em tempo real
   - Adaptação: Cores vibrantes, feedback imediato

### Artigos e Estudos

- "Gamification in Education: A Systematic Review" (2018)
- "UX Patterns for Educational Games" - Nielsen Norman Group
- "The Psychology of Progress Bars" - UX Collective

---

## 🔄 Próximas Iterações

### Sprint Atual (Novembro 2025)
- [x] Documentação completa
- [ ] Prototipagem no Puck
- [ ] Teste interno de navegação

### Próximo Sprint (Dezembro 2025)
- [ ] Testes de usabilidade com 5 professores
- [ ] Testes de usabilidade com 10 alunos
- [ ] Ajustes baseados em feedback
- [ ] Preparação para deploy de teste

---

**Responsável por UX**: [Nome do Designer]  
**Responsável Técnico**: [Nome do Dev Lead]  
**Última Revisão**: 2025-11-24  
**Próxima Revisão**: 2025-12-01
