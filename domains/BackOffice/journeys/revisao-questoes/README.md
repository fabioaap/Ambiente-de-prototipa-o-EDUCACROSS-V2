# Jornada: Revisão de Questões

> 📌 **Issue**: E1.1 - BackOffice Jornada: Revisão de Questões (Prototipação)

## 🎯 Objetivo

Validar o fluxo completo para que curadores pedagógicos revisem questões enviadas pelos educadores, desde a listagem de pendências até a aprovação e publicação, garantindo qualidade antes de disponibilizar o conteúdo na plataforma.

## 📋 Contexto de Negócio

- **Para quem?** Coordenadores pedagógicos e professores revisores responsáveis pela curadoria de conteúdo no BackOffice.
- **Por que é importante?** Garante a qualidade das questões antes da publicação, reduz retrabalho, evita erros de conteúdo e melhora a experiência dos educadores que aplicarão as atividades.
- **Quando será usado?** Diariamente, como parte do workflow de curadoria de conteúdo. Revisores acessam o sistema para verificar e aprovar questões pendentes antes da disponibilização para uso em sala de aula.

## 🔗 Protótipos Relacionados

### Páginas Criadas no Studio

1. **[Lista de Questões Pendentes](http://localhost:3000/backoffice/revisao-questoes/lista)**
   - Visualização de todas as questões aguardando revisão
   - Cards com preview, metadados e ações rápidas

2. **[Detalhe da Questão](http://localhost:3000/backoffice/revisao-questoes/detalhe)**
   - Visualização completa de uma questão específica
   - Enunciado, checklist de qualidade e critérios de revisão

3. **[Edição da Questão](http://localhost:3000/backoffice/revisao-questoes/edicao)**
   - Formulário para editar enunciado, alternativas e feedback pedagógico
   - Metadados e classificação da questão

4. **[Confirmação de Publicação](http://localhost:3000/backoffice/revisao-questoes/confirmacao)**
   - Modal de confirmação antes da publicação
   - Resumo da questão e checklist de verificações
   - Feedback de sucesso após publicação

Para mais detalhes sobre links e navegação, consulte [links.md](./links.md).

## 🧩 Componentes Utilizados

### Componentes do Design System
- `Layout` – Estrutura responsiva e container do conteúdo (maxWidth: xl, md)
- `Text` – Títulos, descrições, labels e metadados (h1-h6, tamanhos variados)
- `Card` – Agrupamento visual de questões, checklists e seções (variants: bordered, elevated)
- `Button` – Ações principais e secundárias (variants: primary, secondary, outline, ghost)
- `Badge` – Disponível no DS para indicação de status (a ser integrado)

### Componentes Futuros Necessários
- [ ] `StatusBadge` – Componente dedicado para indicar status visual (pendente, aprovado, revisando, rejeitado)
- [ ] `ConfirmDialog` – Modal reutilizável para confirmar ações críticas (publicar, descartar, deletar)
- [ ] `Input`/`Textarea` – Campos de formulário para edição de texto (já existem, mas precisam ser integrados no Puck)
- [ ] `Select`/`Dropdown` – Para filtros de disciplina e status (já existe, integração pendente)

## 📊 Status

**Status atual**: ✅ Concluído - Prototipação finalizada

**Última atualização**: 2025-11-23

### Checklist de Completude
- [x] README completo seguindo template
- [x] Todas as páginas criadas (lista, detalhe, edição, confirmação)
- [x] Links documentados em links.md
- [x] Componentes identificados e mapeados
- [x] Fluxo completo prototipado
- [x] Decisões de design documentadas
- [x] Componentes faltantes identificados para backlog
- [ ] Screenshots/GIFs capturados (pendente execução visual)
- [ ] Validação com stakeholders (PM, Design)

## 💡 Decisões de Design

### Decisão 1: Cards como unidade de revisão na listagem
- **O que decidimos**: Cada questão pendente é exibida em um Card com preview do enunciado, metadados (autor, tempo) e botões de ação inline.
- **Por que**: Facilita o scanning visual e permite aprovar múltiplos itens sem necessidade de navegação profunda. Reduz cliques e melhora a eficiência do revisor.
- **Alternativas consideradas**: 
  - Tabela tradicional: Descartada por ser menos visual e dificultar a leitura de enunciados
  - Lista simples: Descartada por não oferecer espaço suficiente para ações e contexto
- **Trade-offs**: Cards ocupam mais espaço vertical, exigindo scroll, mas melhoram significativamente a usabilidade e clareza visual.

### Decisão 2: Checklist textual no detalhe (temporário)
- **O que decidimos**: Usar checklist simples baseado em componente `Text` com símbolos unicode (✔/⚠) até termos o componente `StatusBadge` disponível.
- **Por que**: Mantém a visibilidade dos critérios de qualidade sem bloquear a sprint. Permite validar o fluxo e o conteúdo enquanto componentes visuais são desenvolvidos.
- **Alternativas consideradas**: 
  - Aguardar StatusBadge: Bloquearia a sprint e atrasaria validação do fluxo
  - Usar apenas texto simples: Menos visual e não transmite status rapidamente
- **Trade-offs**: Solução menos visual e polida, mas permite progresso rápido. Badge será integrado em sprint futura.

### Decisão 3: Página de edição separada (não inline)
- **O que decidimos**: Criar uma página dedicada para edição de questões ao invés de edição inline nos cards.
- **Por que**: 
  - Separação clara entre visualização e edição
  - Evita acidentes (editar sem querer)
  - Oferece mais espaço para campos complexos (enunciado, alternativas, feedback)
- **Alternativas consideradas**: 
  - Edição inline: Complexa demais para formulários extensos
  - Modal de edição: Limitaria espaço e não seria responsivo em mobile
- **Trade-offs**: Requer um clique adicional para entrar no modo de edição, mas oferece melhor UX para formulários complexos.

### Decisão 4: Modal de confirmação para ações críticas
- **O que decidimos**: Implementar página de confirmação completa com resumo da questão, checklist de verificações e feedback de sucesso.
- **Por que**: 
  - Previne publicações acidentais
  - Oferece última chance de revisar dados críticos
  - Melhora confiança do usuário no sistema
  - Feedback claro de sucesso reduz ansiedade
- **Alternativas consideradas**: 
  - Confirmação simples (apenas sim/não): Menos informação para decisão final
  - Sem confirmação: Muito arriscado para ação irreversível
- **Trade-offs**: Adiciona um passo extra no fluxo, mas essencial para ações que impactam educadores e alunos.

## 📝 Notas Adicionais

### Feedback e Observações
- PM solicitou métrica de tempo médio de revisão por questão → incluir no dashboard (sprint futura)
- Designers enfatizaram necessidade de componente Badge para status → priorizado no backlog (B4/B5)
- Revisores querem campo rápido para comentários pré-definidos ao solicitar ajustes → feature request criada

### Ideias para Experimentos Futuros
1. **Aprovação em lote**: Permitir selecionar múltiplas questões e aprovar de uma vez (aumentaria eficiência em ~40%)
2. **Filtro por matéria/série**: Adicionar filtros antes da lista (Matemática, Português, Ciências, etc.)
3. **Histórico de ações**: Mostrar timeline com quem aprovou/rejeitou e quando
4. **Comentários estruturados**: Template de feedback para acelerar solicitações de ajuste
5. **Preview interativo**: Visualizar questão como o aluno verá (com timer, contador de pontos, etc.)

### Observações Técnicas
- Todas as páginas utilizam apenas componentes disponíveis no Design System
- JSON estruturado permite fácil integração com API futura
- Slugs seguem padrão `/backoffice/revisao-questoes/{acao}`
- Dados mockados representam casos reais de uso

Consulte [notas.md](./notas.md) para detalhes adicionais de feedback de revisores.

## 🔜 Próximos Passos

### Validação e Refinamento
- [ ] Capturar screenshots/GIFs de todas as 4 páginas do fluxo
- [ ] Validar fluxo com stakeholders (PM, Design, Coordenação Pedagógica)
- [ ] Conduzir testes de usabilidade com 2-3 revisores reais
- [ ] Coletar feedback sobre tempo de conclusão do fluxo completo

### Componentes e Integração
- [ ] Criar issues no backlog para componentes faltantes:
  - `StatusBadge` para indicação visual de status (Issue a criar)
  - `ConfirmDialog` como modal reutilizável (Issue a criar)
  - Integrar `Input` e `Select` no Puck Config para formulários
- [ ] Adicionar Badge ao Puck Config (componente já existe no DS)
- [ ] Documentar novos componentes no Storybook quando criados

### Backend e Persistência
- [ ] Definir esquema de dados para questões (DB schema)
- [ ] Criar endpoints REST/GraphQL para:
  - GET /api/questoes/pendentes (listagem)
  - GET /api/questoes/:id (detalhe)
  - PUT /api/questoes/:id (edição)
  - POST /api/questoes/:id/aprovar (aprovação)
  - POST /api/questoes/:id/rejeitar (rejeição com comentários)
- [ ] Implementar persistência de comentários e histórico de revisão
- [ ] Conectar páginas do Studio com API real (substituir localStorage)

### Experiência e Otimizações
- [ ] Implementar filtros (status, disciplina, autor, data)
- [ ] Adicionar paginação ou scroll infinito na lista
- [ ] Layout responsivo para tablet e mobile
- [ ] Adicionar feedback loading durante ações
- [ ] Implementar atalhos de teclado para revisores power users

## 📎 Referências

### Documentação do Projeto
- [Template de jornada](../../template-jornada.md) - Template base para documentação de jornadas
- [Links e URLs](./links.md) - Links completos para páginas do Studio e Storybook
- [Notas e feedback](./notas.md) - Observações detalhadas e ideias de experimentos

### Design System
- [Componentes no Storybook](http://localhost:6006) - Catálogo visual dos componentes
- [Button](http://localhost:6006/?path=/story/components-button--default)
- [Card](http://localhost:6006/?path=/story/components-card--default)
- [Text](http://localhost:6006/?path=/story/components-text--default)
- [Badge](http://localhost:6006/?path=/story/components-badge--default)
- [Layout](http://localhost:6006/?path=/story/components-layout--default)

### Issues e Backlog
- Issue E1.1: Revisão de Questões (BackOffice) - **Esta issue**
- Issue #2: Design System base - Dependência cumprida ✅
- Issue #1: Studio setup - Dependência cumprida ✅
- [Backlog geral](../../../../ISSUES_BACKLOG_STATUS.md) - Status de todas as issues do projeto

### Protótipos e Design
- Figma: _[Link a ser adicionado quando wireframes estiverem disponíveis]_
- Benchmarks:
  - Google Classroom - Sistema de revisão de atividades
  - Khan Academy - Curadoria de questões educacionais
  - Quizizz - Fluxo de criação/revisão de quizzes

### Arquitetura
- [Puck Configuration](../../../../apps/studio/src/config/puck.config.tsx) - Configuração de componentes no editor
- [Studio Pages](../../../../apps/studio/data/pages/backoffice/revisao-questoes/) - Arquivos JSON das páginas

---

**Autores**: Squad Prototipação EDUCACROSS  
**Revisores**: A definir (PM, Design Lead, Tech Lead)  
**Data de criação**: 2025-11-20  
**Última atualização**: 2025-11-23

