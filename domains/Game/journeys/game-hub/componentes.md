# Componentes Necessários - Game Hub

> 🧩 Documentação técnica dos componentes que precisam ser criados ou já existem para a jornada Game Hub

---

## 📊 Visão Geral

### Componentes Existentes (Design System)
✅ Já disponíveis e prontos para uso

### Componentes Novos (A implementar)
⚠️ Precisam ser criados no Design System

---

## ✅ Componentes Existentes

### 1. Layout
**Localização**: `packages/design-system/src/components/Layout/`

**Uso no Game Hub**:
- Container principal de todas as páginas
- Responsivo e centralizado

**Exemplo**:
```tsx
<Layout maxWidth="xl" centered>
  {/* Conteúdo do Game Hub */}
</Layout>
```

---

### 2. Card
**Localização**: `packages/design-system/src/components/Card/`

**Uso no Game Hub**:
- Cards de jogos disponíveis
- Cards de informações
- Containers de conteúdo

**Variantes usadas**:
- `elevated` - Para jogos em destaque
- `bordered` - Para informações secundárias
- `default` - Para uso geral

**Exemplo**:
```tsx
<Card variant="elevated" padding="md" clickable onClick={handleGameClick}>
  <Text as="h3" size="xl" weight="bold">{game.title}</Text>
  <Text size="sm" color="neutral">{game.description}</Text>
  <Badge variant="info">{game.category}</Badge>
  {/* Progress component aqui (quando criado) */}
  <Button variant="primary">Jogar Agora</Button>
</Card>
```

---

### 3. Button
**Localização**: `packages/design-system/src/components/Button/`

**Uso no Game Hub**:
- Ações principais (Jogar, Continuar, Voltar)
- Navegação entre telas
- Submissão de ações

**Variantes usadas**:
- `primary` - "Jogar Agora", "Continuar", "Salvar"
- `secondary` - "Ver Ranking", "Detalhes"
- `outline` - Ações terciárias
- `ghost` - "Voltar", "Fechar"

**Exemplo**:
```tsx
<Button variant="primary" size="lg" fullWidth>
  Jogar Agora
</Button>
<Button variant="secondary" size="md">
  Ver Ranking
</Button>
<Button variant="ghost" size="sm">
  Voltar ao Hub
</Button>
```

---

### 4. Text
**Localização**: `packages/design-system/src/components/Text/`

**Uso no Game Hub**:
- Títulos de páginas e seções
- Descrições de jogos
- Labels e metadata
- Pontuações e números

**Exemplos**:
```tsx
{/* Título da página */}
<Text as="h1" size="3xl" weight="bold">Game Hub</Text>

{/* Título de jogo */}
<Text as="h2" size="2xl" weight="bold">{game.title}</Text>

{/* Descrição */}
<Text as="p" size="base">{game.description}</Text>

{/* Metadata */}
<Text as="span" size="sm" color="neutral">
  ⏱️ {game.estimatedTime} min
</Text>

{/* Pontuação grande */}
<Text as="div" size="5xl" weight="bold" color="primary">
  {score}
</Text>
```

---

### 5. Badge
**Localização**: `packages/design-system/src/components/Badge/`

**Uso no Game Hub**:
- Status de jogos (Novo, Em Progresso, Completo)
- Categorias (Quiz, Puzzle, Aventura)
- Conquistas e badges desbloqueados
- Dificuldade

**Variantes usadas**:
- `success` - Jogo completo, conquista desbloqueada
- `info` - Em progresso, categoria
- `warning` - Novo, destaque
- `error` - Bloqueado, não disponível
- `default` - Uso geral

**Exemplo**:
```tsx
{/* Status */}
<Badge variant="success">Completo</Badge>
<Badge variant="info">Em Progresso</Badge>
<Badge variant="warning">Novo</Badge>

{/* Categoria */}
<Badge variant="info">{game.category}</Badge>

{/* Dificuldade */}
<Badge variant={
  difficulty === 'easy' ? 'success' :
  difficulty === 'medium' ? 'warning' :
  'error'
}>
  {difficulty}
</Badge>
```

---

## ⚠️ Componentes Novos (A Implementar)

### 1. Progress (Barra de Progresso)

**Prioridade**: Alta  
**Complexidade**: Baixa  
**Dependências**: Nenhuma

#### Especificação Técnica

**Props**:
```typescript
interface ProgressProps {
  /** Valor atual do progresso (0-100) */
  value: number;
  
  /** Valor máximo (default: 100) */
  max?: number;
  
  /** Label acessível para descrever o progresso */
  label: string;
  
  /** Se verdadeiro, mostra percentual ao lado da barra */
  showPercentage?: boolean;
  
  /** Se verdadeiro, mostra label visual acima da barra */
  showLabel?: boolean;
  
  /** Variante visual */
  variant?: 'default' | 'success' | 'warning' | 'error';
  
  /** Tamanho da barra */
  size?: 'sm' | 'md' | 'lg';
  
  /** Se verdadeiro, anima mudanças de valor */
  animated?: boolean;
  
  /** Classes CSS adicionais */
  className?: string;
}
```

**Exemplo de Uso**:
```tsx
{/* Progresso de jogo */}
<Progress 
  value={45} 
  label="Progresso no Quiz de Matemática"
  showPercentage
  showLabel
  variant="info"
  size="md"
  animated
/>

{/* Durante gameplay */}
<Progress 
  value={(currentQuestion / totalQuestions) * 100}
  label={`Questão ${currentQuestion} de ${totalQuestions}`}
  showLabel
  variant="default"
  size="sm"
/>
```

**Estrutura HTML**:
```tsx
<div className="progress-container" role="group">
  {showLabel && (
    <Text size="sm" weight="medium" className="progress-label">
      {label}
    </Text>
  )}
  <div className="progress-wrapper">
    <div 
      className="progress-bar"
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={label}
    >
      <div 
        className="progress-fill"
        style={{ width: `${(value / max) * 100}%` }}
      />
    </div>
    {showPercentage && (
      <Text size="sm" className="progress-percentage">
        {Math.round((value / max) * 100)}%
      </Text>
    )}
  </div>
</div>
```

**Estilos CSS (conceitual)**:
```css
.progress-bar {
  background: var(--color-neutral-200);
  border-radius: var(--radius-full);
  overflow: hidden;
  height: var(--progress-height);
}

.progress-fill {
  background: var(--progress-color);
  height: 100%;
  transition: width 0.5s ease-out;
  border-radius: inherit;
}

/* Respeitar preferências de movimento */
@media (prefers-reduced-motion: reduce) {
  .progress-fill {
    transition: none;
  }
}

/* Variantes */
.progress-fill[data-variant="success"] {
  background: var(--color-success);
}

.progress-fill[data-variant="warning"] {
  background: var(--color-warning);
}

.progress-fill[data-variant="error"] {
  background: var(--color-error);
}

/* Tamanhos */
.progress-bar[data-size="sm"] { --progress-height: 4px; }
.progress-bar[data-size="md"] { --progress-height: 8px; }
.progress-bar[data-size="lg"] { --progress-height: 12px; }
```

**Acessibilidade**:
- ✅ `role="progressbar"` para identificação correta
- ✅ `aria-valuenow`, `aria-valuemin`, `aria-valuemax` para valores
- ✅ `aria-label` para descrição acessível
- ✅ Respeita `prefers-reduced-motion`
- ✅ Contraste adequado (WCAG AA)

**Testes Necessários**:
- [ ] Renderiza corretamente com value 0, 50, 100
- [ ] Respeita max quando fornecido
- [ ] Mostra/oculta percentual conforme prop
- [ ] Mostra/oculta label conforme prop
- [ ] Aplica variantes corretamente
- [ ] Anima quando animated=true
- [ ] Não anima quando prefers-reduced-motion

**Referências**:
- [ARIA: progressbar role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/progressbar_role)
- [Chakra UI Progress](https://chakra-ui.com/docs/components/progress)
- [Material UI Progress](https://mui.com/material-ui/react-progress/)

---

### 2. Leaderboard (Ranking/Tabela de Classificação)

**Prioridade**: Alta  
**Complexidade**: Média  
**Dependências**: Badge (existente), Text (existente)

#### Especificação Técnica

**Props**:
```typescript
interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  avatar?: string; // emoji ou URL de imagem
  score: number;
  isCurrentUser: boolean;
}

interface LeaderboardProps {
  /** Entradas do leaderboard */
  entries: LeaderboardEntry[];
  
  /** Número máximo de entradas a exibir (default: 10) */
  maxEntries?: number;
  
  /** Se verdadeiro, destaca entrada do usuário atual */
  highlightCurrent?: boolean;
  
  /** Se verdadeiro, mostra medalhas para top 3 */
  showMedals?: boolean;
  
  /** Escopo do leaderboard */
  scope?: 'global' | 'game';
  
  /** ID do jogo (quando scope='game') */
  gameId?: string;
  
  /** Título do leaderboard */
  title?: string;
  
  /** Se verdadeiro, mostra avatars */
  showAvatars?: boolean;
  
  /** Classes CSS adicionais */
  className?: string;
}
```

**Exemplo de Uso**:
```tsx
{/* Leaderboard global */}
<Leaderboard 
  entries={globalLeaderboard}
  scope="global"
  title="Ranking Global"
  maxEntries={20}
  highlightCurrent
  showMedals
  showAvatars
/>

{/* Leaderboard de jogo específico (top 5 preview) */}
<Leaderboard 
  entries={gameLeaderboard}
  scope="game"
  gameId="quiz-matematica-basica"
  title="Top 5 - Quiz de Matemática"
  maxEntries={5}
  showMedals
  showAvatars
/>
```

**Estrutura HTML**:
```tsx
<div className="leaderboard" role="region" aria-label={title || "Ranking de jogadores"}>
  {title && (
    <Text as="h2" size="2xl" weight="bold" className="leaderboard-title">
      {title}
    </Text>
  )}
  
  <ol className="leaderboard-list" role="list">
    {entries.slice(0, maxEntries).map((entry) => {
      const medal = showMedals && getMedal(entry.rank);
      
      return (
        <li 
          key={entry.userId}
          className={`leaderboard-entry ${entry.isCurrentUser ? 'current-user' : ''}`}
          aria-current={entry.isCurrentUser ? 'true' : undefined}
        >
          <div className="entry-rank">
            {medal ? (
              <span className="medal" aria-label={`Posição ${entry.rank}`}>
                {medal}
              </span>
            ) : (
              <Text weight="bold" size="lg">#{entry.rank}</Text>
            )}
          </div>
          
          {showAvatars && entry.avatar && (
            <div className="entry-avatar" aria-hidden="true">
              {entry.avatar}
            </div>
          )}
          
          <div className="entry-info">
            <Text weight="medium" size="base">
              {entry.username}
              {entry.isCurrentUser && (
                <Badge variant="info" size="sm">Você</Badge>
              )}
            </Text>
          </div>
          
          <div className="entry-score">
            <Text weight="bold" size="lg" color="primary">
              {entry.score.toLocaleString()}
            </Text>
            <Text size="xs" color="neutral">pontos</Text>
          </div>
        </li>
      );
    })}
  </ol>
  
  {entries.length > maxEntries && (
    <Text size="sm" color="neutral" className="leaderboard-footer">
      +{entries.length - maxEntries} jogadores
    </Text>
  )}
</div>
```

**Funções Auxiliares**:
```typescript
const getMedal = (rank: number): string | null => {
  if (rank === 1) return '🥇';
  if (rank === 2) return '🥈';
  if (rank === 3) return '🥉';
  return null;
};
```

**Estilos CSS (conceitual)**:
```css
.leaderboard-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.leaderboard-entry {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  padding: var(--space-md);
  border-radius: var(--radius-md);
  transition: background 0.2s;
}

.leaderboard-entry:nth-child(odd) {
  background: var(--color-neutral-50);
}

.leaderboard-entry:hover {
  background: var(--color-neutral-100);
}

.leaderboard-entry.current-user {
  background: var(--color-primary-50);
  border: 2px solid var(--color-primary);
  font-weight: 600;
}

.entry-rank {
  min-width: 60px;
  text-align: center;
}

.medal {
  font-size: 2rem;
}

.entry-avatar {
  font-size: 2rem;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.entry-info {
  flex: 1;
}

.entry-score {
  text-align: right;
}
```

**Acessibilidade**:
- ✅ `<ol>` para lista ordenada semanticamente
- ✅ `role="list"` e `role="region"` para estrutura clara
- ✅ `aria-label` para título acessível
- ✅ `aria-current="true"` para destacar usuário atual
- ✅ Badge "Você" para reforçar identificação
- ✅ Medalhas têm `aria-label` descritivo
- ✅ Navegação por teclado (Tab, setas se houver ações)

**Testes Necessários**:
- [ ] Renderiza lista vazia corretamente
- [ ] Renderiza com 1, 3, 10, 20+ entradas
- [ ] Top 3 recebe medalhas quando showMedals=true
- [ ] Usuário atual é destacado quando highlightCurrent=true
- [ ] Respeita maxEntries
- [ ] Mostra/oculta avatars conforme prop
- [ ] Formatação de números (ex: 1000 → 1.000)

**Referências**:
- [Leaderboard Design Best Practices](https://www.nngroup.com/articles/leaderboards/)
- [ARIA: list role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/list_role)

---

### 3. Modal (Dialog Reutilizável)

**Prioridade**: Média  
**Complexidade**: Média-Alta  
**Dependências**: Button (existente), Text (existente)

#### Especificação Técnica

**Props**:
```typescript
interface ModalProps {
  /** Se verdadeiro, modal está aberto */
  isOpen: boolean;
  
  /** Callback ao fechar modal */
  onClose: () => void;
  
  /** Título do modal */
  title: string;
  
  /** Conteúdo do modal */
  children: React.ReactNode;
  
  /** Tamanho do modal */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  
  /** Se verdadeiro, mostra botão X de fechar */
  showCloseButton?: boolean;
  
  /** Se verdadeiro, fecha ao clicar no overlay */
  closeOnOverlayClick?: boolean;
  
  /** Se verdadeiro, fecha ao pressionar ESC */
  closeOnEsc?: boolean;
  
  /** Footer customizado (ações, botões) */
  footer?: React.ReactNode;
  
  /** Classes CSS adicionais */
  className?: string;
}
```

**Exemplo de Uso**:
```tsx
{/* Modal de resultados */}
<Modal
  isOpen={showResults}
  onClose={handleCloseResults}
  title="Parabéns! Jogo Completo"
  size="md"
  showCloseButton
  closeOnOverlayClick={false} // Não fechar acidentalmente
  footer={
    <>
      <Button variant="primary" onClick={handlePlayAgain}>
        Jogar Novamente
      </Button>
      <Button variant="secondary" onClick={handleViewLeaderboard}>
        Ver Ranking
      </Button>
      <Button variant="ghost" onClick={handleCloseResults}>
        Voltar ao Hub
      </Button>
    </>
  }
>
  {/* Conteúdo: pontuação, badges, etc */}
  <div className="results-content">
    <Text size="5xl" weight="bold" color="primary">
      {result.score}
    </Text>
    <Text size="lg">pontos</Text>
    
    {result.isNewPersonalBest && (
      <Badge variant="success" size="lg">
        🎉 Novo Recorde Pessoal!
      </Badge>
    )}
    
    {/* Mais conteúdo... */}
  </div>
</Modal>
```

**Estrutura HTML**:
```tsx
{isOpen && (
  <div className="modal-overlay" onClick={handleOverlayClick}>
    <div 
      className="modal-container"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="modal-header">
        <Text 
          as="h2" 
          id="modal-title" 
          size="2xl" 
          weight="bold"
        >
          {title}
        </Text>
        
        {showCloseButton && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            aria-label="Fechar modal"
          >
            ✕
          </Button>
        )}
      </div>
      
      <div className="modal-body">
        {children}
      </div>
      
      {footer && (
        <div className="modal-footer">
          {footer}
        </div>
      )}
    </div>
  </div>
)}
```

**Lógica de Focus Trap**:
```typescript
useEffect(() => {
  if (!isOpen) return;
  
  // Salvar elemento com foco antes de abrir modal
  const previousFocus = document.activeElement as HTMLElement;
  
  // Focar primeiro elemento focável dentro do modal
  const modal = modalRef.current;
  const focusableElements = modal?.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  
  if (focusableElements && focusableElements.length > 0) {
    (focusableElements[0] as HTMLElement).focus();
  }
  
  // Restaurar foco ao fechar
  return () => {
    previousFocus?.focus();
  };
}, [isOpen]);

// Listener para ESC
useEffect(() => {
  if (!isOpen || !closeOnEsc) return;
  
  const handleEsc = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };
  
  document.addEventListener('keydown', handleEsc);
  return () => document.removeEventListener('keydown', handleEsc);
}, [isOpen, closeOnEsc, onClose]);
```

**Estilos CSS (conceitual)**:
```css
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.2s ease-out;
}

.modal-container {
  background: white;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-2xl);
  max-height: 90vh;
  overflow: auto;
  animation: slideUp 0.3s ease-out;
}

/* Tamanhos */
.modal-container[data-size="sm"] { max-width: 400px; }
.modal-container[data-size="md"] { max-width: 600px; }
.modal-container[data-size="lg"] { max-width: 800px; }
.modal-container[data-size="xl"] { max-width: 1200px; }
.modal-container[data-size="full"] { max-width: calc(100vw - 32px); }

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-lg);
  border-bottom: 1px solid var(--color-neutral-200);
}

.modal-body {
  padding: var(--space-lg);
}

.modal-footer {
  display: flex;
  gap: var(--space-md);
  justify-content: flex-end;
  padding: var(--space-lg);
  border-top: 1px solid var(--color-neutral-200);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { 
    opacity: 0;
    transform: translateY(20px);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .modal-overlay,
  .modal-container {
    animation: none;
  }
}
```

**Acessibilidade**:
- ✅ `role="dialog"` e `aria-modal="true"`
- ✅ `aria-labelledby` aponta para título
- ✅ Focus trap (foco permanece no modal)
- ✅ Restaura foco ao fechar
- ✅ Suporte a ESC para fechar
- ✅ Botão fechar com `aria-label`
- ✅ Overlay visível (contraste adequado)

**Testes Necessários**:
- [ ] Abre e fecha corretamente
- [ ] Focus trap funciona (Tab não escapa do modal)
- [ ] ESC fecha quando closeOnEsc=true
- [ ] Overlay fecha quando closeOnOverlayClick=true
- [ ] Foco retorna ao elemento anterior ao fechar
- [ ] Diferentes tamanhos renderizam corretamente
- [ ] Footer customizado é renderizado

**Referências**:
- [ARIA: dialog role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/dialog_role)
- [ARIA Authoring Practices - Modal Dialog](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)
- [Chakra UI Modal](https://chakra-ui.com/docs/components/modal)

---

## 📋 Checklist de Implementação

### Progress Component
- [ ] Criar arquivos base (Progress.tsx, Progress.module.css)
- [ ] Implementar interface e props
- [ ] Implementar lógica de renderização
- [ ] Adicionar estilos e variantes
- [ ] Implementar acessibilidade (ARIA)
- [ ] Adicionar testes unitários
- [ ] Criar story no Storybook
- [ ] Documentar no README do Design System
- [ ] Exportar no index.ts
- [ ] Validar com addon-a11y

### Leaderboard Component
- [ ] Criar arquivos base (Leaderboard.tsx, Leaderboard.module.css)
- [ ] Implementar interface e props
- [ ] Implementar lógica de renderização
- [ ] Adicionar estilos e variantes
- [ ] Implementar highlight de usuário atual
- [ ] Adicionar sistema de medalhas
- [ ] Implementar acessibilidade (ARIA)
- [ ] Adicionar testes unitários
- [ ] Criar story no Storybook
- [ ] Documentar no README do Design System
- [ ] Exportar no index.ts
- [ ] Validar com addon-a11y

### Modal Component
- [ ] Criar arquivos base (Modal.tsx, Modal.module.css)
- [ ] Implementar interface e props
- [ ] Implementar lógica de renderização
- [ ] Implementar focus trap
- [ ] Implementar listeners (ESC, overlay click)
- [ ] Adicionar estilos e animações
- [ ] Implementar diferentes tamanhos
- [ ] Implementar acessibilidade (ARIA)
- [ ] Adicionar testes unitários
- [ ] Criar story no Storybook
- [ ] Documentar no README do Design System
- [ ] Exportar no index.ts
- [ ] Validar com addon-a11y

---

## 🔜 Próximos Passos

1. **Priorizar Progress**: É o mais simples e já desbloqueia cards de jogos
2. **Depois Leaderboard**: Central para gamificação
3. **Por último Modal**: Mais complexo, pode usar workaround com página separada no interim

---

**Última atualização**: 2025-11-23  
**Responsável**: Equipe de Frontend  
**Status**: Especificação completa, aguardando implementação
