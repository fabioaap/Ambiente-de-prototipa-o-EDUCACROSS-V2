# [Nome da Jornada]

> ✏️ **Instrução**: Copie este template para `domains/{domínio}/journeys/nome-da-jornada/README.md` e preencha todas as seções.

## 🎯 Objetivo

Descreva brevemente o objetivo desta jornada (1-2 frases). O que queremos validar ou construir?

**Exemplo**: _Validar o fluxo de revisão de questões por educadores, desde a listagem de pendências até a aprovação/rejeição de questões enviadas._

## 📋 Contexto de Negócio

- **Para quem?** (persona, papel)
- **Por que é importante?** (problema a resolver, valor gerado)
- **Quando será usado?** (frequência, momento no fluxo)

**Exemplo**:
- **Para quem?** Educadores responsáveis pela curadoria de conteúdo.
- **Por que?** Garantir qualidade das questões antes de publicação; reduzir retrabalho.
- **Quando?** Diariamente, ao revisar novas submissões.

## 🔗 Protótipos Relacionados

Liste os links para as páginas criadas no Studio (http://localhost:3000):

- [Página Inicial da Jornada](http://localhost:3000/path-da-pagina)
- [Página de Detalhe](http://localhost:3000/path-detalhe)
- [Página de Confirmação](http://localhost:3000/path-confirmacao)

## 🧩 Componentes Utilizados

Liste os componentes do Design System utilizados nesta jornada:

- `Button` - Para ações principais (aprovar, rejeitar)
- `Card` - Para organização de conteúdo (lista de questões)
- `Text` - Para tipografia (títulos, labels)
- `Layout` - Container responsivo

**Componentes novos necessários** (se aplicável):
- [ ] `StatusBadge` - Para exibir status das questões
- [ ] `ConfirmDialog` - Para confirmação de ações críticas

## 📊 Status

<!-- Escolha um: -->
- 📋 **Planejamento** - Jornada em fase de descoberta/especificação
- 🚧 **Em andamento** - Prototipagem ativa
- ✅ **Concluído** - Validado e pronto para próxima fase
- 🗄️ **Arquivado** - Não será continuado ou foi substituído

**Status atual**: 🚧 Em andamento

**Última atualização**: [Data]

## 💡 Decisões de Design

Documente as principais decisões e suas motivações:

### Decisão 1: [Título da decisão]
- **O que decidimos**: [Descrição da escolha feita]
- **Por que**: [Motivação, problema resolvido]
- **Alternativas consideradas**: [Outras opções avaliadas]
- **Trade-offs**: [Prós e contras]

**Exemplo**:
### Decisão 1: Uso de Cards para lista de questões
- **O que decidimos**: Exibir cada questão pendente como um Card com preview do enunciado, status e ações rápidas.
- **Por que**: Facilita scanning visual; permite ações inline sem navegação.
- **Alternativas consideradas**: Tabela tradicional (descartada por ser menos visual); lista simples (menos espaço para ações).
- **Trade-offs**: Cards ocupam mais espaço vertical, mas melhoram usabilidade.

## 📝 Notas Adicionais

_(Opcional: adicione observações, insights de testes, feedback de stakeholders)_

- Observação 1: [Descrição]
- Observação 2: [Descrição]

## 🔜 Próximos Passos

- [ ] Validar fluxo com stakeholders (PM, Design)
- [ ] Testes com usuários reais (educadores)
- [ ] Implementar componentes faltantes (`StatusBadge`, `ConfirmDialog`)
- [ ] Ajustar layout responsivo para mobile
- [ ] Documentar no Storybook os componentes novos
- [ ] Integrar com backend (quando disponível)

## 📎 Referências

_(Opcional: links para Figma, benchmarks, documentos de requisitos)_

- [Link para Figma](#)
- [Benchmark: Plataforma X](#)
- [Documento de Requisitos](#)

---

**Autores**: [Nome(s)]  
**Revisores**: [Nome(s)]  
**Data de criação**: [Data]
