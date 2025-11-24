# Game - Jornadas de Prototipação

[![Storybook](https://img.shields.io/badge/Storybook-Docs-FF4785?logo=storybook)](https://educacross-storybook.vercel.app)
[![Build Status](https://img.shields.io/badge/build-passing-success)](https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/actions)

Esta pasta contém todas as jornadas de prototipagem relacionadas ao **Game** (área de jogos e missões) do sistema EDUCACROSS.

## Estrutura

Cada jornada deve ser organizada em sua própria pasta dentro de `journeys/`:

```
domains/Game/
	journeys/
		nome-da-jornada/
			README.md           # Descrição da jornada
			notas.md            # Decisões de design e anotações
			diagramas/          # Fluxos, wireframes, etc
			referencias/        # Links, imagens de referência
```

## Como documentar uma jornada

### 1. Crie uma pasta para a jornada

```bash
mkdir -p journeys/nome-da-jornada
```

### 2. Crie o README.md da jornada

O README deve incluir:

- **Objetivo**: O que essa jornada busca resolver
- **Contexto de negócio**: Para quem é, por que é importante
- **Protótipos relacionados**: Links para páginas no Studio
- **Componentes utilizados**: Quais componentes do Storybook são usados
- **Status**: Em andamento, concluído, pausado, etc

Exemplo:

```markdown
# Jornada: Missões da Ilha 1

## Objetivo
Apresentar as primeiras missões gamificadas para engajar o aluno.

## Contexto
Primeira experiência gamificada - deve ser divertida e educativa.

## Protótipos
- [Mapa da ilha](http://localhost:3000/game/ilha-1-mapa)
- [Missão ativa](http://localhost:3000/game/ilha-1-missao)
- [Conquistas](http://localhost:3000/game/ilha-1-conquistas)

## Componentes
- `Card` (elevated) - Para cada missão
- `Button` (primary, secondary) - Ações das missões
- `Text` - Narrativa e instruções
- `Layout` - Container do jogo

## Status
💡 Planejamento
```

### 3. Documente decisões em notas.md

Use `notas.md` ou `decisions.md` para registrar:
- Por que escolhemos determinado fluxo
- Alternativas consideradas
- Feedback de usuários/playtesters
- Melhorias futuras

### 4. Adicione diagramas e referências

- `diagramas/`: Fluxogramas (Mermaid, imagens, Figma exports)
- `referencias/`: Screenshots, concept art, links para docs

## Jornadas Existentes

### 1. [Game Hub](./journeys/game-hub/)
**Status**: 🚧 Em andamento  
**Objetivo**: Hub central para acessar todos os jogos educacionais disponíveis na plataforma  
**Componentes principais**: 
- Card, Button, Text, Badge (Design System)
- Progress (#60), Leaderboard (#61) (Domínio Game)

**Links rápidos**:
- [README completo](./journeys/game-hub/README.md)
- [Links e referências](./journeys/game-hub/links.md)
- [Notas e decisões](./journeys/game-hub/notas.md)
- [Issue #58](https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/issues/58)

---

**Nota**: Esta pasta contém apenas documentação. O código real está em `apps/studio` e `packages/*`.
