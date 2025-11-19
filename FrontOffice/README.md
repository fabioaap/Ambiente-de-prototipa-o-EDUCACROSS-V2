# FrontOffice

Este domínio contém jornadas de prototipação relacionadas ao FrontOffice do sistema EDUCACROSS (interface do aluno/responsável).

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
# Onboarding Aluno

## Objetivo
Guiar o aluno através dos primeiros passos na plataforma.

## Contexto
Novos alunos precisam entender como navegar...

## Links
- Studio: `/studio/frontoffice/onboarding-aluno`
- Componentes: WelcomeCard, TutorialStep, ProgressIndicator
```

## Jornadas atuais

(Adicionar links conforme novas jornadas forem criadas)
