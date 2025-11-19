# Game - Jornadas de Prototipação

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

_(Esta seção será atualizada conforme jornadas forem criadas)_

---

**Nota**: Esta pasta contém apenas documentação. O código real está em `apps/studio` e `packages/*`.
