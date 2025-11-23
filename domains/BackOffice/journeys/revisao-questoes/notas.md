# Notas da Jornada – Revisão de Questões

## 📅 Histórico de Feedback

### Feedback inicial (2025-11-20)
- PM solicitou destaque para tempo médio de revisão por questão → incluir métrica na próxima iteração do dashboard.
- Designers pediram componente de badge para status (pendente/aprovado/revisar) – requisito registrado no backlog (B4/B5).
- Revisores querem campo rápido para comentários pré-definidos ao solicitar ajustes.

### Atualização de implementação (2025-11-23)
- ✅ Criadas 4 páginas completas no Studio: lista, detalhe, edição e confirmação
- ✅ Documentação expandida no README seguindo template oficial
- ✅ Arquivo links.md criado com todas as URLs e referências
- ✅ Mapeamento completo de componentes do DS utilizados
- ✅ Identificação de componentes faltantes para backlog (StatusBadge, ConfirmDialog)

## 💡 Ideias para Experimentos

### 1. Aprovação em lote (Alta prioridade)
**Descrição**: Permitir selecionar múltiplas questões e aprovar de uma vez.
**Hipótese**: Reduzirá tempo médio de revisão em ~40% para revisores que processam lotes grandes.
**Métrica de sucesso**: Tempo médio por questão cai de 3min para <2min.
**Complexidade**: Média
**Status**: Backlog

### 2. Filtro por matéria/série (Alta prioridade)
**Descrição**: Adicionar filtros dropdown antes da lista (Matemática, Português, Ciências, 6º ano, 7º ano, etc.).
**Hipótese**: Revisores especializados trabalharão mais rápido ao focar em sua área.
**Métrica de sucesso**: 80%+ dos revisores usam filtros em primeira sessão.
**Complexidade**: Baixa
**Status**: Backlog

### 3. Histórico de ações (Média prioridade)
**Descrição**: Mostrar timeline com quem aprovou/rejeitou e quando.
**Hipótese**: Aumentará accountability e permitirá auditoria de qualidade.
**Métrica de sucesso**: 0 disputas sobre quem aprovou questões problemáticas.
**Complexidade**: Média (requer backend)
**Status**: Backlog - depende de API

### 4. Comentários estruturados (Média prioridade)
**Descrição**: Templates de feedback (ex: "Enunciado confuso", "Nível inadequado", "BNCC não alinhada").
**Hipótese**: Reduzirá tempo de escrita de feedback e padronizará comunicação.
**Métrica de sucesso**: 70%+ das rejeições usam templates.
**Complexidade**: Baixa
**Status**: Backlog

### 5. Preview interativo (Baixa prioridade)
**Descrição**: Visualizar questão como o aluno verá (com timer, pontos, animações).
**Hipótese**: Melhorará qualidade da aprovação ao simular experiência real.
**Métrica de sucesso**: 20% menos questões rejeitadas pós-publicação.
**Complexidade**: Alta
**Status**: Icebox

## 🚧 Bloqueios e Dependências

### Componentes
- ⏳ **StatusBadge** - Componente visual para status (pendente, aprovado, rejeitado)
  - **Bloqueio**: Melhora significativa de UX está pendente
  - **Workaround atual**: Usando Text com símbolos unicode (✔/⚠)
  - **Ação**: Criar issue no backlog do DS (prioridade B4/B5)

- ⏳ **ConfirmDialog** - Modal reutilizável para confirmações
  - **Bloqueio**: Atualmente implementado como página inteira, não como modal
  - **Workaround atual**: Página de confirmação dedicada funciona mas não é reutilizável
  - **Ação**: Criar componente genérico para uso em todo o BackOffice

- ⏳ **Input/Textarea no Puck** - Campos de formulário no editor visual
  - **Bloqueio**: Componentes existem no DS mas não estão registrados no Puck Config
  - **Workaround atual**: Usando Text para simular campos
  - **Ação**: Adicionar ao puckConfig (tarefa rápida, 1h)

### Backend
- ⚠️ **API de Questões** - Endpoints para persistência
  - **Bloqueio**: Páginas usam localStorage, dados não persistem entre sessões
  - **Workaround atual**: JSON mockado no Studio
  - **Ação**: Definir schema e criar endpoints REST (Sprint futura)

- ⚠️ **Sistema de comentários** - Armazenar feedback de revisão
  - **Bloqueio**: Sem backend, comentários não são salvos
  - **Workaround atual**: Não implementado
  - **Ação**: Definir schema para comments + histórico (Sprint futura)

## 📊 Métricas e Observações

### Métricas desejadas (quando implementar backend)
1. **Tempo médio de revisão** por questão
2. **Taxa de aprovação** (aprovadas / total revisadas)
3. **Tempo médio por etapa** (lista → detalhe → edição → confirmação)
4. **Questões rejeitadas** com motivos estruturados
5. **Volume de revisões** por revisor/dia

### Observações de Usabilidade
- Fluxo completo tem 4 telas: razoável para ação crítica (publicação)
- Cards na listagem facilitam scan visual (feedback positivo esperado)
- Confirmação com resumo reduz ansiedade do revisor
- Falta feedback de loading/progresso durante ações

## 🎯 Próximos Passos Anotados

### Imediato (esta sprint)
- [ ] Validar com QA se slugs `/backoffice/revisao-questoes/*` devem aparecer no menu do Studio
- [ ] Capturar screenshots de todas as páginas para documentação
- [ ] Validar fluxo com PM e Design Lead

### Curto prazo (próxima sprint)
- [ ] Adicionar Badge ao puckConfig para uso nas páginas
- [ ] Integrar Input/Select no Puck para formulários reais
- [ ] Criar protótipo de modal de confirmação usando ConfirmDialog (quando existir)
- [ ] Implementar filtros básicos (disciplina, status)

### Médio prazo (2-3 sprints)
- [ ] Definir schema de dados para questões e comentários
- [ ] Criar endpoints de API para CRUD de questões
- [ ] Conectar páginas com API real (substituir localStorage)
- [ ] Adicionar autenticação e autorização de revisores

### Longo prazo (backlog)
- [ ] Aprovação em lote
- [ ] Histórico completo de ações
- [ ] Preview interativo da questão
- [ ] Analytics de revisão (dashboard de métricas)

## 🔬 Experimentos Conduzidos

### Experimento 1: Cards vs Tabela para Listagem
**Data**: 2025-11-20  
**Hipótese**: Cards são mais eficientes que tabelas para scan visual de questões.  
**Método**: Análise de benchmarks (Google Classroom, Khan Academy) + decisão de design.  
**Resultado**: Cards escolhidos. Trade-off: ocupam mais espaço vertical, mas oferecem melhor contexto.  
**Aprendizado**: Para revisão de conteúdo educacional, contexto visual > densidade de informação.

### Experimento 2: Edição Inline vs Página Dedicada
**Data**: 2025-11-23  
**Hipótese**: Página dedicada oferece melhor UX para formulários complexos.  
**Método**: Análise de complexidade do formulário (enunciado + 4 alternativas + feedback + metadados).  
**Resultado**: Página dedicada escolhida. Modal seria muito limitado, inline muito complexo.  
**Aprendizado**: Para formulários com 5+ campos, páginas dedicadas são preferíveis a modais.

## 📚 Referências de Benchmarking

### Google Classroom - Revisão de Atividades
- ✅ Interface limpa com cards
- ✅ Preview inline de conteúdo
- ❌ Falta checklist de qualidade
- ❌ Não tem aprovação em lote

### Khan Academy - Curadoria de Exercícios
- ✅ Checklist de qualidade estruturado
- ✅ Histórico de revisões visível
- ❌ Interface muito técnica para educadores
- ✅ Comentários estruturados com templates

### Quizizz - Criação/Revisão de Quizzes
- ✅ Preview interativo excelente
- ✅ Edição inline fluida
- ❌ Pouco controle de qualidade/revisão
- ✅ Feedback visual de status claro

## 💬 Citações de Usuários (Simuladas - Validar em testes)

> "Preciso conseguir revisar 20 questões em 1 hora. Cards me ajudam a ver rápido o que é cada questão."  
> — Coordenadora Pedagógica (persona)

> "Quando rejeito uma questão, quero escrever rápido o motivo. Templates de comentários economizariam tempo."  
> — Professora Revisora (persona)

> "Tenho medo de aprovar por engano. Confirmação com resumo me dá segurança."  
> — Revisor Junior (persona)

---

**Mantido por**: Squad Prototipação EDUCACROSS  
**Última atualização**: 2025-11-23

