# FrontOffice - Jornadas de Prototipação

[![Storybook](https://img.shields.io/badge/Storybook-Docs-FF4785?logo=storybook)](https://educacross-storybook.vercel.app)
[![Build Status](https://img.shields.io/badge/build-passing-success)](https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/actions)

Esta pasta contém todas as jornadas de prototipagem relacionadas ao **FrontOffice** (área do aluno/responsável) do sistema EDUCACROSS.

## Estrutura

Cada jornada deve ser organizada em sua própria pasta dentro de `journeys/`:

```
domains/FrontOffice/
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
# Jornada: Onboarding do Aluno

## Objetivo
Guiar novos alunos através do processo inicial de setup da conta.

## Contexto
Primeira experiência do aluno com a plataforma - crucial para retenção.

## Protótipos
- [Boas-vindas](http://localhost:3000/frontoffice/onboarding-welcome)
- [Perfil inicial](http://localhost:3000/frontoffice/onboarding-profile)
- [Tutorial](http://localhost:3000/frontoffice/onboarding-tutorial)

## Componentes
- `Card` (elevated) - Para cada etapa
- `Button` (primary) - Avançar
- `Text` - Instruções e títulos
- `Layout` - Container centrado

## Status
🚧 Em andamento
```

### 3. Documente decisões em notas.md

Use `notas.md` ou `decisions.md` para registrar:
- Por que escolhemos determinado fluxo
- Alternativas consideradas
- Feedback de usuários
- Melhorias futuras

### 4. Adicione diagramas e referências

- `diagramas/`: Fluxogramas (Mermaid, imagens, Figma exports)
- `referencias/`: Screenshots, links para docs, artigos

## Jornadas Existentes

### 🚀 Onboarding de Usuários
- **Status**: 🚧 Em andamento
- **Documentação**: [README](./journeys/onboarding/README.md)
- **Notas**: [Decisões de Design](./journeys/onboarding/notas.md)
- **Objetivo**: Guiar novos usuários pelos primeiros passos na plataforma
- **Componentes**: Layout, Button, Card, Text, Progress (novo), Stepper (novo)

---

**Nota**: Esta pasta contém apenas documentação. O código real está em `domains/studio` e `packages/*`.
