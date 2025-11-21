# BackOffice - Jornadas de Prototipação

Esta pasta contém todas as jornadas de prototipagem relacionadas ao **BackOffice** (área administrativa) do sistema EDUCACROSS.

## Estrutura

Cada jornada deve ser organizada em sua própria pasta dentro de `journeys/`:

```
domains/BackOffice/
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
# Jornada: Revisão de Questões

## Objetivo
Permitir que professores revisem questões submetidas antes de publicá-las.

## Contexto
Professores precisam validar qualidade e adequação antes de disponibilizar.

## Protótipos
- [Lista de questões pendentes](http://localhost:3000/backoffice/questoes-pendentes)
- [Detalhe da questão](http://localhost:3000/backoffice/questao-detalhe)

## Componentes
- `Card` (elevated) - Para exibir cada questão
- `Button` (primary, outline) - Aprovar/Rejeitar
- `Text` - Tipografia consistente
- `Layout` - Container responsivo

## Status
✅ Concluído
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

### [Revisão de Questões](./journeys/revisao-questoes/)
**Status**: 🚧 Em andamento  
**Objetivo**: Validar o fluxo para que curadores pedagógicos revisem questões enviadas pelos educadores, garantindo qualidade antes da publicação.

**Páginas no Studio**:
- [Lista de questões pendentes](http://localhost:3000/backoffice/revisao-questoes/lista)
- [Detalhe da questão](http://localhost:3000/backoffice/revisao-questoes/detalhe)

**Componentes utilizados**: Layout, Text, Card, Button

**Próximos passos**: Tela de confirmação/ação final, componentes StatusBadge e ConfirmDialog

---

**Nota**: Esta pasta contém apenas documentação. O código real está em `apps/studio` e `packages/*`.
