# Notas de Implementação - Jornada Revisão de Questões

## Data: 2025-11-20

### Decisões de Design

#### 1. Componente StatusBadge
**Decisão**: Criar um componente dedicado para status badges ao invés de reutilizar Button ou Text.

**Justificativa**:
- Semântica clara: badges têm propósito diferente de botões ou texto simples
- Reutilização: será usado em múltiplas jornadas (questões, usuários, conteúdo)
- Consistência visual: cores e estilos padronizados para cada status
- Acessibilidade: permite adicionar roles/aria apropriados no futuro

**Alternativas consideradas**:
- ❌ Usar Button com variant custom: confuso semanticamente
- ❌ Usar Text com classes CSS: menos reutilizável
- ✅ Componente dedicado: melhor solução

#### 2. Estrutura das Páginas
**Decisão**: Criar duas páginas separadas (lista e detalhe) ao invés de uma única página com modal.

**Justificativa**:
- Navegação mais clara e natural
- URL única para cada questão (favorita, compartilha)
- Melhor para histórico de navegação
- Mais simples de implementar inicialmente

**Alternativas consideradas**:
- ❌ Modal overlay: mais complexo, menos navegável
- ❌ Sidebar expand: limitado em espaço
- ✅ Páginas separadas: mais flexível e simples

#### 3. Ações de Revisão
**Decisão**: Incluir três ações principais: Aprovar, Rejeitar, Sugerir Edição.

**Justificativa**:
- Aprovar: questão está pronta para uso
- Rejeitar: questão tem problemas graves
- Sugerir Edição: questão é boa mas precisa ajustes menores

**Para versão futura (P1)**:
- Modal de confirmação antes de ações irreversíveis
- Campo de justificativa obrigatório para rejeição
- Histórico de revisões anteriores

#### 4. Filtros e Busca
**Decisão**: Não implementar na primeira versão (Sprint 1).

**Justificativa**:
- Foco em validar fluxo básico primeiro
- Componentes Input/Select já existem para implementação futura
- Priorizar feedback sobre estrutura antes de adicionar features

**Para versão futura (P1)**:
- Filtro por disciplina
- Filtro por nível de ensino
- Filtro por status
- Busca por texto livre
- Ordenação por data

### Componentes Utilizados

#### Existentes no DS
- ✅ Layout: container responsivo
- ✅ Text: títulos, parágrafos, metadados
- ✅ Card: agrupamento visual de conteúdo
- ✅ Button: ações primárias e secundárias

#### Novos Componentes Criados
- ✅ StatusBadge: indicador visual de status
  - 4 estados: pendente, aprovado, rejeitado, em-revisao
  - 3 tamanhos: sm, md, lg
  - Cores semânticas baseadas em tokens

#### Componentes Futuros (não nesta sprint)
- ⏳ Toolbar: barra de ações contextuais (P1)
- ⏳ ConfirmDialog: confirmação de ações críticas (P1)
- ⏳ TextArea: justificativa para rejeição (P1)
- ⏳ Pagination: navegar entre páginas de resultados (P2)

### Dados de Exemplo

Criamos 4 questões de exemplo cobrindo:
- Geografia (capital do Brasil)
- Matemática (equação simples)
- História (descobrimento do Brasil)
- Ciências (fotossíntese)

Status variados:
- 2 pendentes
- 1 em revisão
- 1 aprovada

Isso permite testar diferentes cenários visuais.

### Melhorias Futuras

#### Curto Prazo (P1)
1. **Filtros Funcionais**
   - Implementar com componentes Select e Input existentes
   - API de filtro no backend (quando disponível)

2. **Modal de Confirmação**
   - Criar componente ConfirmDialog reutilizável
   - Usar para aprovar/rejeitar questões

3. **Campo de Justificativa**
   - TextArea para feedback ao autor
   - Obrigatório ao rejeitar

4. **Indicadores Visuais**
   - Contador de questões pendentes
   - Métricas de tempo médio de revisão

#### Médio Prazo (P2)
1. **Histórico de Revisões**
   - Timeline de ações anteriores
   - Quem revisou e quando

2. **Preview de Questão**
   - Como aluno verá a questão
   - Teste de alternativas

3. **Atribuição de Revisores**
   - Distribuir questões automaticamente
   - Notificações de novas questões

4. **Comentários Inline**
   - Revisor pode comentar em partes específicas
   - Thread de discussão

### Feedback Esperado

Queremos validar com professores/revisores:
- [ ] O fluxo é intuitivo?
- [ ] As informações estão claras?
- [ ] Falta alguma informação crítica?
- [ ] As ações são suficientes?
- [ ] A navegação é fluida?

### Métricas de Sucesso

Indicadores que queremos acompanhar após implementação real:
- Tempo médio de revisão por questão
- Taxa de aprovação vs. rejeição
- Número de revisões por revisor/dia
- Qualidade das questões aprovadas (feedback dos alunos)
- Tempo de resposta ao autor (após revisão)

### Integração Futura

Quando houver backend real:
- `GET /api/questions?status=pending` - lista de questões
- `GET /api/questions/:id` - detalhe de questão
- `POST /api/questions/:id/approve` - aprovar questão
- `POST /api/questions/:id/reject` - rejeitar questão (com justificativa)
- `POST /api/questions/:id/suggest-edit` - sugerir edição (com comentários)

### Links Úteis

- Template de jornada: `domains/template-jornada.md`
- Componentes do DS: http://localhost:6006
- Studio local: http://localhost:3000/studio

---

**Próxima revisão**: Após feedback de usuários (professores/revisores)
