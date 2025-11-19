# Game

Este domínio contém jornadas de prototipação relacionadas à experiência gamificada do sistema EDUCACROSS.

## Como organizar jornadas

Cada jornada deve ser criada dentro de `journeys/` com a seguinte estrutura:

```
journeys/
  nome-da-jornada/
    README.md           # Objetivo e contexto de negócio
    notas.md            # Decisões de design/UX
    diagramas/          # Fluxos (Mermaid, imagens)
    referencias/        # Links, prints, etc
```

### O que deve conter o README.md de cada jornada:

- **Objetivo**: O que esta jornada pretende resolver?
- **Contexto de negócio**: Público-alvo, problemas, necessidades
- **Links relevantes**:
  - Páginas do Studio (Puck) relacionadas
  - Componentes do Storybook usados
  - Issues/PRs relacionadas

### Exemplo

```markdown
# Missões Ilha 1

## Objetivo
Criar experiência de missões gamificadas para engajamento do aluno.

## Contexto
Alunos completam missões para avançar...

## Links
- Studio: `/studio/game/missoes-ilha-1`
- Componentes: MissionCard, RewardBadge, ProgressBar
```

## Jornadas atuais

(Adicionar links conforme novas jornadas forem criadas)
