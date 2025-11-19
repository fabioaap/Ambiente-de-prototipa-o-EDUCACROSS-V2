# Domains (BackOffice, FrontOffice, Game)

Este diretório centraliza as pastas de domínio (BackOffice, FrontOffice, Game) com suas jornadas de prototipagem.

Cada domínio contém uma pasta `journeys/` com as jornadas organizadas e documentadas (README, notas, diagramas).

## 📁 Estrutura

```
domains/
  README.md                 # Este arquivo (documentação geral)
  template-jornada.md       # Template reutilizável para documentar jornadas
  BackOffice/
    README.md               # Visão geral do domínio BackOffice
    journeys/               # Jornadas de prototipagem BackOffice
  FrontOffice/
    README.md               # Visão geral do domínio FrontOffice
    journeys/               # Jornadas de prototipagem FrontOffice
  Game/
    README.md               # Visão geral do domínio Game
    journeys/               # Jornadas de prototipagem Game
```

## 🎯 O que é uma Jornada?

Uma **jornada** é um conjunto coeso de protótipos (páginas, fluxos) que implementa um objetivo de negócio ou experiência do usuário. Cada jornada deve:

- Ter um **objetivo claro** e mensurável
- Documentar **decisões de design/UX**
- Listar **componentes do Design System** utilizados
- Linkar **páginas do Studio** relacionadas
- Incluir **status** (planejamento, em andamento, concluído, arquivado)

## 📝 Convenções de Nomenclatura

### Pastas de Jornada

Use kebab-case com prefixo descritivo:

- ✅ `revisao-questoes`
- ✅ `onboarding-aluno`
- ✅ `missoes-ilha-1`
- ❌ `RevisaoQuestoes`
- ❌ `revisao_questoes`
- ❌ `jornada1`

### Arquivos Principais

Cada jornada deve conter no mínimo:

```
journeys/nome-da-jornada/
  README.md           # OBRIGATÓRIO: objetivo, contexto, links
  notas.md            # RECOMENDADO: decisões, alternativas, histórico
  diagramas/          # OPCIONAL: fluxos, wireframes, mapas
  referencias/        # OPCIONAL: screenshots, benchmarks, inspirações
```

## ✅ Checklist Mínima de Documentação

Ao criar uma nova jornada, o README.md deve incluir:

- [ ] **Título** da jornada
- [ ] **Objetivo** (1-2 frases)
- [ ] **Contexto de Negócio** (para quem? por que?)
- [ ] **Protótipos Relacionados** (links para páginas do Studio)
- [ ] **Componentes Utilizados** (lista de componentes do Design System)
- [ ] **Status** (🚧 Em andamento, ✅ Concluído, 📋 Planejamento, 🗄️ Arquivado)
- [ ] **Decisões de Design** (principais escolhas e motivações)
- [ ] **Próximos Passos** (lista de tarefas pendentes)

**Dica**: Use o arquivo `template-jornada.md` como ponto de partida.

## 🔄 Workflow Recomendado

1. **Planejar**: Crie a pasta da jornada e README inicial com objetivo e contexto
2. **Prototipar**: Construa páginas no Studio usando componentes do Design System
3. **Documentar**: Adicione links, componentes utilizados, decisões de design
4. **Revisar**: Valide com stakeholders e atualize status/próximos passos
5. **Finalizar**: Marque como concluído ou arquivado quando apropriado

## 📚 Templates e Recursos

- [template-jornada.md](./template-jornada.md) - Template reutilizável
- [README raiz](../README.md) - Visão geral do repositório
- [Backlog](../docs/backlog.md) - Tarefas priorizadas por Epic

## 🤝 Contribuindo

Para adicionar uma nova jornada:

1. Crie a pasta em `domains/{domínio}/journeys/nome-da-jornada/`
2. Copie `template-jornada.md` → `README.md`
3. Preencha todas as seções obrigatórias
4. Construa os protótipos no Studio
5. Atualize o README do domínio listando a nova jornada

---

**Observações**:
- As pastas de domínio são apenas documentação; o código real reside em `apps/*` e `packages/*`.
- Mantenha os READMEs de jornada atualizados conforme o trabalho evolui.
- Jornadas arquivadas devem ser movidas para `journeys/archived/` (opcional).

