# Jornada: Missões - Ilha 1 (Game)

## 🎯 Objetivo
Criar uma experiência gamificada onde alunos completam missões temáticas em ambientes exploráveis, aumentando engajamento através de mecânicas de jogo (pontos, desbloqueadores, ranking).

## 📋 Contexto de Negócio
- **Para quem?** Alunos do Ensino Fundamental que preferem aprender através de mecânicas de jogo.
- **Por que é importante?** Aumenta retenção, engajamento e torna o aprendizado mais divertido e motivador.
- **Quando será usado?** Como alternativa ao fluxo tradicional de atividades, especialmente para disciplinas com conteúdo procedural.

## 🔗 Protótipos Relacionados
- [Mapa da Ilha 1](http://localhost:3000/game/missoes-ilha-1/mapa)
- [Missão 1: O Tesouro dos Números](http://localhost:3000/game/missoes-ilha-1/missao-1)
- [Resultado da Missão](http://localhost:3000/game/missoes-ilha-1/resultado)

## 🧩 Componentes Utilizados
- `Layout` – estrutura responsiva com foco em visuals
- `Text` – narrativa, instruções, feedback
- `Card` – cards de missão com status
- `Button` – ações (Explorar, Participar, Continuar)

**Componentes futuros**
- [ ] `Map` – mapa interativo da ilha
- [ ] `Achievement` – badges e desbloqueadores
- [ ] `Leaderboard` – ranking de jogadores

## 📊 Status
- **Status atual**: 🚧 Em andamento (Prototipagem)
- **Última atualização**: 2025-11-20

## 💡 Decisões de Design

### Decisão 1: Ambiente exploratório (não linear)
- **O que decidimos**: Alunos podem escolher ordem de missões, explorar livremente.
- **Por que**: Aumenta autonomia e reengajamento (vs. fluxo linear).
- **Trade-offs**: Mais complexo de implementar, mas maior satisfação do usuário.

### Decisão 2: Narrativa temática por ilha
- **O que decidimos**: Cada "ilha" é um tema diferente (Matemática, História, etc).
- **Por que**: Cria coesão visual e narrativa, facilita localização mental.
- **Trade-offs**: Requer criação de mais conteúdo visual.

## 🔜 Próximos Passos
- [ ] Validar mecânicas de jogo com grupo piloto
- [ ] Criar mais ilhas (2, 3, 4...)
- [ ] Integrar com sistema de pontos real
- [ ] Implementar leaderboard social

---

**Autores**: Squad Prototipação EDUCACROSS  
**Data de criação**: 2025-11-20
