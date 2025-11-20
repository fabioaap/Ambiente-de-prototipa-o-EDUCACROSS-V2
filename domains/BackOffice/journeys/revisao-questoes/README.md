# Jornada: Revisão de Questões

## Objetivo
Permitir que professores/revisores revisem questões submetidas antes de publicá-las, garantindo qualidade e adequação do conteúdo educacional.

## Contexto de Negócio
Professores e moderadores precisam validar questões criadas pela comunidade antes de disponibilizá-las para os alunos. Esta jornada facilita o processo de triagem, revisão e decisão sobre questões pendentes.

## Personas
- **Professor/Revisor**: Valida qualidade, adequação pedagógica e correção das questões
- **Moderador**: Supervisiona o processo e toma decisões finais em casos controversos

## Fluxo da Jornada

### 1. Lista de Questões Pendentes
- Visualizar todas as questões aguardando revisão
- Filtrar por disciplina, dificuldade, data de submissão
- Ver status de cada questão (pendente, em revisão, aprovada, rejeitada)
- Acessar detalhes de uma questão específica

### 2. Detalhe da Questão
- Ver conteúdo completo da questão
- Revisar alternativas e resposta correta
- Avaliar qualidade e adequação
- Aprovar ou rejeitar com justificativa
- Sugerir edições antes da aprovação

## Protótipos

### Páginas no Studio
- [Lista de Questões Pendentes](http://localhost:3000/studio/backoffice/questoes-pendentes)
- [Detalhe da Questão](http://localhost:3000/studio/backoffice/questao-detalhe)

### Arquivos de Dados
- `apps/studio/data/pages/backoffice-questoes-pendentes.json`
- `apps/studio/data/pages/backoffice-questao-detalhe.json`

## Componentes Utilizados

### Do Design System (@prototipo/design-system)
- ✅ `Layout` - Container responsivo principal
- ✅ `Text` - Tipografia consistente (títulos, parágrafos)
- ✅ `Card` - Exibir cada questão na lista
- ✅ `Button` - Ações (Aprovar, Rejeitar, Editar)
- ✅ `StatusBadge` - Indicador visual de status (novo componente criado para esta jornada)
- ⚠️ `Input` - Filtros e busca (futuro)
- ⚠️ `Select` - Filtros por categoria (futuro)

### Componentes Futuros (não nesta primeira versão)
- `Toolbar` - Barra de ações no topo
- `ConfirmDialog` - Confirmação antes de ações críticas
- `TextArea` - Justificativa para rejeição

## Critérios de Aceitação

### Lista de Questões Pendentes
- [x] Exibe lista de questões em cards
- [x] Cada card mostra: título, disciplina, status, data
- [x] Card é clicável e navega para detalhe
- [ ] Filtros funcionais (futuro)

### Detalhe da Questão
- [x] Exibe conteúdo completo da questão
- [x] Mostra todas as alternativas
- [x] Destaca resposta correta
- [x] Botões de ação (Aprovar/Rejeitar)
- [ ] Modal de confirmação (futuro)
- [ ] Campo de justificativa (futuro)

## Status
🚧 **Em Desenvolvimento** (Sprint 1 - 80% concluído)

### Concluído
- ✅ Estrutura de documentação criada
- ✅ StatusBadge component implementado
- ✅ Protótipos de páginas criados no Studio
- ✅ Componentes do DS mapeados

### Próximos Passos (P1)
- [ ] Adicionar filtros na lista de questões
- [ ] Implementar modal de confirmação
- [ ] Adicionar campo de justificativa
- [ ] Integrar com API real (quando disponível)
- [ ] Testes de usabilidade com professores

## Métricas de Sucesso
- Tempo médio de revisão por questão < 3 minutos
- Taxa de aprovação vs. rejeição balanceada
- Feedback positivo de revisores sobre usabilidade

## Referências
- Template de jornada: `domains/template-jornada.md`
- Documentação de componentes: [Storybook](http://localhost:6006)
- Figma: (link futuro quando disponível)

---

**Última atualização**: 2025-11-20  
**Responsável**: Equipe de Produto + Frontend
