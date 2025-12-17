# Jornada: Revisão de Questões

> 📋 Fluxo de validação e qualidade para questões enviadas antes da publicação

## Overview

**Objetivo Primário**: Validar questões enviadas pelos educadores, garantindo qualidade e consistência pedagógica antes da publicação na plataforma.

**Usuários Alvo**: Coordenadores pedagógicos e professores responsáveis pelo BackOffice de conteúdo

**Resultado Esperado**: Questões aprovadas com qualidade garantida, redução de retrabalho, aceleração de publicação

**Contexto de Negócio**:
- Reduzir retrabalho no ciclo de edição
- Melhorar qualidade dos itens publicados
- Garantir consistência pedagógica e alinhamento com objetivos
- Liberar rapidamente questões aprovadas para uso em atividades
- Criar feedback claro para autores quando ajustes são solicitados

**Ativadores**:
- Novas questões enviadas por educadores
- Diariamente como checklist de revisão
- Contínuo durante períodos de produção de conteúdo

## Journey Steps

### Etapa 1: Visualizar Lista de Pendências
**Objetivo**: Permitir revisores ver todas as questões aguardando revisão de forma organizada

**Componentes**:
- Grid/lista de cards com questões pendentes
- Status visual (Pendente, Em Revisão, Aprovado)
- Metadados importantes (disciplina, autor, data de envio)
- Filtros por status, disciplina e autor
- Barra de busca por título/conteúdo

**Success Criteria**:
- ✅ Revisor vê todas questões pendentes
- ✅ Pode filtrar por disciplina e status
- ✅ Pode buscar questão específica
- ✅ Metadados essenciais visíveis (autor, disciplina, data)

**User Story**:
```gherkin
Given um revisor acessa a jornada de revisão de questões
When vê a lista de questões pendentes
Then visualiza cards/linhas com questões aguardando revisão
And cada questão mostra: título, autor, disciplina, data de envio
And pode filtrar por status (pendente, em revisão, aprovado)
And pode filtrar por disciplina
And pode buscar questão por título
```

### Etapa 2: Analisar Questão em Detalhe
**Objetivo**: Revisor examina todos os aspectos da questão para tomar decisão fundamentada

**Componentes**:
- Enunciado completo da questão
- Todas as alternativas de resposta
- Gabarito e explicação pedagógica
- Metadados pedagógicos (nível, competências, objetivos)
- Histórico de revisões anteriores
- Seção de comentários/discussões

**Success Criteria**:
- ✅ Revisor vê enunciado completo e legível
- ✅ Visualiza todas as alternativas
- ✅ Vê gabarito com explicação
- ✅ Entende contexto pedagógico (nível, competências)
- ✅ Vê histórico de mudanças anteriores

**User Story**:
```gherkin
Given o revisor clicou em uma questão para analisar
When chega à tela de detalhe
Then vê o enunciado completo
And visualiza todas as alternativas com indicação da correta
And vê a explicação pedagógica
And pode ver metadados (nível, competências, objetivos)
And pode ver histórico de revisões anteriores
And vê comentários anteriores (se houver)
```

### Etapa 3: Tomar Decisão (Aprovar/Solicitar Ajustes/Rejeitar)
**Objetivo**: Registrar decisão da revisão e comunicar resultado ao autor

**Componentes**:
- Botões de ação: Aprovar, Solicitar Ajustes, Rejeitar
- Modal de confirmação para ações críticas
- Campo de comentários/justificativa (para ajustes/rejeição)
- Opção de adicionar tags ou categorias
- Indicador de progresso (quantas questões revisadas)

**Success Criteria**:
- ✅ Revisor clica em "Aprovar", "Solicitar Ajustes" ou "Rejeitar"
- ✅ Ação requer confirmação para evitar erros
- ✅ Comentário opcional para contextualizar decisão
- ✅ Decisão é registrada com timestamp

**User Story**:
```gherkin
Given o revisor analisou a questão
When está pronto para tomar uma decisão
Then vê 3 botões: "Aprovar", "Solicitar Ajustes", "Rejeitar"
And pode clicar em "Solicitar Ajustes" e adicionar comentário
And vê modal de confirmação antes de confirmar ação
And depois de confirmar, vê mensagem de sucesso
And progresso de revisão é atualizado (ex: "15 de 30 questões revisadas")
And pode voltar à lista de questões
```

### Etapa 4: Feedback para Autor
**Objetivo**: Comunicar decisão da revisão para o educador que enviou a questão

**Componentes**:
- Email automático com resultado (aprovado/ajustes/rejeitado)
- Portal/notificação in-app com comentários do revisor
- Link direto para questão no portal do autor
- Opção de reagir/responder comentários

**Success Criteria**:
- ✅ Autor recebe notificação de decisão
- ✅ Vê comentários e sugestões do revisor
- ✅ Sabe exatamente qual questão foi revisada
- ✅ Pode resubmeter se solicitado ajustes

**User Story**:
```gherkin
Given uma questão foi revisada (aprovada/ajustes/rejeitada)
When o sistema processa a decisão
Then o autor recebe notificação in-app
And recebe email com resultado
And vê comentários e sugestões do revisor
And se "Solicitar Ajustes", pode editar e resubmeter
And se "Aprovado", questão entra em publicação
And se "Rejeitado", questão fica no arquivo
```

## Fluxo Detalhado

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
