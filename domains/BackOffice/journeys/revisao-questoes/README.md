# Jornada: Revisão de Questões

## 🎯 Objetivo
Validar o fluxo para que curadores pedagógicos revisem questões enviadas pelos educadores, garantindo qualidade antes da publicação.

## 📋 Contexto de Negócio
- **Para quem?** Coordenadores e professores responsáveis pelo BackOffice de conteúdo.
- **Por que é importante?** Reduz retrabalho, melhora a qualidade dos itens e libera rapidamente questões aprovadas.
- **Quando será usado?** Diariamente, como checklist de revisão antes da disponibilização de novas atividades.

## 🔗 Protótipos Relacionados
- [Lista de questões pendentes](http://localhost:3000/backoffice/revisao-questoes/lista)
- [Detalhe da questão](http://localhost:3000/backoffice/revisao-questoes/detalhe)

_(Próxima etapa: tela de ações/ confirmação final)_

## 🧩 Componentes Utilizados
- `Layout` – estrutura responsiva do conteúdo
- `Text` – títulos, descrições e metadados
- `Card` – agrupamento de cada questão e checklists
- `Button` – ações Aprovar / Solicitar ajustes

**Componentes futuros necessários**
- [ ] `StatusBadge` – indicar status atual (pendente, aprovado, revisando)
- [ ] `ConfirmDialog` – confirmar ações críticas (publicar, descartar)

## 📊 Status
- **Status atual**: 🚧 Em andamento
- **Última atualização**: 2025-11-20

## 💡 Decisões de Design
### Decisão 1: Cards como unidade de revisão
- **O que decidimos**: Cada questão pendente fica em um Card com preview, metadados e ações.
- **Por que**: Facilita o scan e permite aprovar vários itens sem navegar entre telas.
- **Alternativas**: Tabela/tab bar (menos rica visualmente).
- **Trade-offs**: Cards ocupam mais vertical, mas trazem clareza para PMs/design.

### Decisão 2: Checklist textual no detalhe
- **O que decidimos**: Checklist simples usando `Text` com símbolos (✔/⚠) até termos `StatusBadge`.
- **Por que**: Mantém visibilidade de qualidade enquanto badges não existem.
- **Trade-offs**: Menos visual do que um componente dedicado, mas evita bloquear a sprint.

## 📝 Notas Adicionais
Consulte `notas.md` para feedback de revisores e próximos experimentos.

## 🔜 Próximos Passos
- [ ] Criar tela de confirmação/ação final (aprovar em lote, devolver com comentários)
- [ ] Adicionar `StatusBadge` e `ConfirmDialog` ao design system
- [ ] Conectar com API de páginas para persistir status real
- [ ] Validar fluxo com um grupo piloto de coordenadores

## 📎 Referências
- [Template de jornada](../../template-jornada.md)
- [Backlog E1](../../../docs/backlog.md)

---
**Autores**: Squad Prototipação EDUCACROSS
**Revisores**: TBD
**Data de criação**: 2025-11-20
