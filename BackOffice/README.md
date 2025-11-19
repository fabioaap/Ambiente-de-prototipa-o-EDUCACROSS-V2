# BackOffice

Este domínio contém jornadas de prototipação relacionadas ao BackOffice do sistema EDUCACROSS.

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
# Revisão de Questões

## Objetivo
Permitir que professores revisem e aprovem questões criadas para avaliações.

## Contexto
Professores precisam de uma interface intuitiva para...

## Links
- Studio: `/studio/backoffice/revisao-questoes`
- Componentes: QuestionCard, ApprovalButton, CommentBox
```

## Jornadas atuais

(Adicionar links conforme novas jornadas forem criadas)
