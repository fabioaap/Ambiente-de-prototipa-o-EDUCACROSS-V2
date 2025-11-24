# Jornada: Revisão de Questões

## 🎯 Objetivo
Validar o fluxo para que curadores pedagógicos revisem questões enviadas pelos educadores, garantindo qualidade antes da publicação. Esta jornada permite que coordenadores e professores revisem, aprovem ou solicitem ajustes nas questões de forma eficiente e organizada.

## 📋 Contexto de Negócio
- **Para quem?** Coordenadores e professores responsáveis pelo BackOffice de conteúdo.
- **Por que é importante?** Reduz retrabalho, melhora a qualidade dos itens e libera rapidamente questões aprovadas. Garante consistência pedagógica e alinhamento com os objetivos de aprendizagem.
- **Quando será usado?** Diariamente, como checklist de revisão antes da disponibilização de novas atividades. Processo contínuo durante períodos de produção de conteúdo.

## 🚀 Fluxo da Jornada

### 1. Lista de Questões Pendentes
Visualização em cards de todas as questões aguardando revisão, com:
- Status visual (pendente, em revisão, aprovado)
- Metadados importantes (disciplina, autor, data de envio)
- Ações rápidas (visualizar detalhes, aprovar)
- Filtros por status, disciplina e autor

### 2. Detalhe da Questão
Tela de análise profunda da questão, incluindo:
- Enunciado completo
- Alternativas de resposta
- Gabarito e explicação
- Metadados pedagógicos (nível, competências)
- Histórico de revisões
- Ações: Aprovar, Solicitar Ajustes, Rejeitar

### 3. Confirmação de Ações (Em desenvolvimento)
Modal ou tela de confirmação para ações críticas:
- Aprovar questão para publicação
- Solicitar ajustes com comentários
- Rejeitar questão com justificativa

## 🔗 Protótipos Relacionados

### Páginas no Studio
- [Lista de questões pendentes](http://localhost:3000/backoffice/revisao-questoes/lista) - Visão geral com filtros
- [Detalhe da questão](http://localhost:3000/backoffice/revisao-questoes/detalhe) - Análise detalhada

### Acesso ao Studio (Editor)
Para editar as páginas no Puck:
- [Editar Lista](http://localhost:3000/studio?slug=backoffice/revisao-questoes/lista)
- [Editar Detalhe](http://localhost:3000/studio?slug=backoffice/revisao-questoes/detalhe)

## 🧩 Componentes Utilizados

### Componentes Implementados
- ✅ `Layout` – Estrutura responsiva do conteúdo principal
- ✅ `Text` – Títulos, descrições e metadados (h1, h2, body)
- ✅ `Card` – Agrupamento de cada questão e checklists
- ✅ `Button` – Ações principais (aprovar, solicitar ajustes, rejeitar)
- ✅ `Badge` – Indicadores de status e categorias
- ✅ `Input` – Campos de busca e filtros
- ✅ `Select` – Dropdowns para filtros (disciplina, status)

### Componentes Disponíveis para Uso Futuro
- ✅ `Progress` – Pode ser usado para mostrar progresso de revisão (ex: "15 de 30 questões revisadas")
- ✅ `Leaderboard` – Útil para gamificação (ranking de revisores mais ativos)

### Componentes Futuros Necessários
- [ ] `StatusBadge` – Versão especializada do Badge para estados de workflow
- [ ] `ConfirmDialog` – Modal de confirmação para ações críticas
- [ ] `CommentThread` – Para discussões sobre ajustes solicitados
- [ ] `Timeline` – Histórico de revisões e alterações

## 📊 Status
- **Status atual**: ✅ **Concluído** (Sprint 3)
- **Última atualização**: 2025-11-24
- **Páginas criadas**: 2/3 (Lista e Detalhe implementadas)
- **Componentes disponíveis**: 100% dos componentes base necessários

## 💡 Decisões de Design

### Decisão 1: Cards como unidade de revisão
- **O que decidimos**: Cada questão pendente fica em um Card com preview, metadados e ações inline.
- **Por que**: Facilita o scan visual e permite aprovar vários itens sem navegar entre telas. Aumenta a eficiência do revisor ao mostrar informações-chave de forma compacta.
- **Alternativas**: Tabela/grid (menos rica visualmente, dificulta quick actions); lista simples (muito linear, sem destaque visual).
- **Trade-offs**: Cards ocupam mais espaço vertical, mas trazem clareza e usabilidade superiores para PMs/designers/revisores.

### Decisão 2: Badge para Status Visual
- **O que decidimos**: Usar o componente Badge do Design System para indicar status (Pendente, Em Revisão, Aprovado, Ajustes Solicitados).
- **Por que**: Proporciona feedback visual imediato sobre o estado de cada questão, facilitando a triagem.
- **Alternativas**: Texto simples com cores (menos consistente); ícones apenas (menos explícito).
- **Trade-offs**: Badges ocupam espaço, mas o ganho em clareza visual compensa.

### Decisão 3: Ações Inline vs Modal de Confirmação
- **O que decidimos**: Ações principais (Aprovar, Solicitar Ajustes) ficam inline no card, mas ações críticas/irreversíveis devem abrir modal de confirmação.
- **Por que**: Reduz cliques para ações frequentes (aprovar questão OK), mas protege contra erros em ações destrutivas (rejeitar).
- **Alternativas**: Todas as ações com confirmação (muito lento); todas inline sem confirmação (arriscado).
- **Trade-offs**: Requer implementação de ConfirmDialog, mas equilibra velocidade e segurança.

### Decisão 4: Filtros e Busca no Topo
- **O que decidimos**: Posicionar barra de busca e filtros (disciplina, status, autor) no topo da lista, sempre visíveis.
- **Por que**: Revisores precisam frequentemente filtrar por disciplina ou autor específico. Ter acesso imediato aos filtros economiza tempo.
- **Alternativas**: Filtros em sidebar (ocupa espaço); filtros colapsados (adiciona clique extra).
- **Trade-offs**: Reduz espaço vertical para a lista, mas aumenta produtividade significativamente.

## 📝 Notas Adicionais

### Feedback de Revisores
- Consulte `notas.md` para feedback detalhado de revisores e próximos experimentos.
- Revisores solicitaram visão de progresso diário (quantas questões revisadas vs. pendentes) - pode usar componente `Progress`.

### Oportunidades de Gamificação
- Com o componente `Leaderboard` agora disponível, podemos considerar ranking de revisores mais ativos/rápidos.
- Isso pode incentivar engajamento e criar senso de comunidade entre curadores.

### Integração Futura
- Conexão com API real para persistir status de revisão.
- Notificações push para autores quando houver feedback.
- Histórico de revisões para auditoria.

## 🔜 Próximos Passos

### Curto Prazo (Sprint Atual)
- [x] ~~Criar tela de lista de questões~~
- [x] ~~Criar tela de detalhe da questão~~
- [x] ~~Documentar jornada com README completo~~
- [x] ~~Identificar componentes necessários~~

### Médio Prazo (Próximas 2-3 Sprints)
- [ ] Implementar tela de confirmação/ação final (aprovar em lote, devolver com comentários)
- [ ] Adicionar `ConfirmDialog` ao Design System
- [ ] Implementar `CommentThread` para discussões
- [ ] Adicionar filtros avançados (data de envio, nível de dificuldade)
- [ ] Implementar indicador de progresso de revisão usando `Progress`

### Longo Prazo (Backlog)
- [ ] Conectar com API de páginas para persistir status real
- [ ] Implementar notificações em tempo real
- [ ] Adicionar histórico de revisões usando `Timeline`
- [ ] Validar fluxo com um grupo piloto de coordenadores
- [ ] Implementar sistema de gamificação com `Leaderboard`
- [ ] Criar dashboard de métricas (tempo médio de revisão, taxa de aprovação, etc.)

## 📊 Métricas de Sucesso

### KPIs Primários
- **Tempo médio de revisão por questão**: Meta < 5 minutos
- **Taxa de aprovação na primeira revisão**: Meta > 70%
- **Questões revisadas por dia por revisor**: Meta > 20

### KPIs Secundários
- **Satisfação do revisor**: Pesquisa trimestral, meta > 4/5
- **Redução de retrabalho**: Meta 30% menos questões retornando para ajuste
- **Tempo até publicação**: Meta < 48h da submissão até aprovação final

## 📎 Referências

### Documentação Interna
- [Template de jornada](../../template-jornada.md)
- [Backlog E1](../../../docs/backlog.md)
- [Design System - Card](http://localhost:6006/?path=/docs/components-card--docs)
- [Design System - Button](http://localhost:6006/?path=/docs/components-button--docs)
- [Design System - Badge](http://localhost:6006/?path=/docs/components-badge--docs)

### Benchmarks e Inspiração
- Google Classroom - Workflow de revisão de trabalhos
- Kahoot Creator - Processo de curadoria de questões
- Quizlet - Sistema de aprovação de flashcards

---

**Autores**: Squad Prototipação EDUCACROSS  
**Revisores**: Product Owner, UX Designer  
**Data de criação**: 2025-11-20  
**Última revisão**: 2025-11-24
