# Notas - Jornada Exibir Campo USO

## 📝 Anotações de Desenvolvimento

### Context da Tarefa (#4800)
- **Demanda**: Usuários de BackOffice precisam ver de qual rede é cada questão
- **Problema atual**: Campo USO não é visível nas listas, causando confusão
- **Solução**: Exibir badge com rede + filtro + CTA para detalhes

### Observações do Figma
- **Arquivo**: Sz4z0rpDmocXZ8LylxEgqF
- **Node**: 8565:17355 (Frame: Exibir Campo USO)
- **Status MCP**: ✅ Tokens extraídos com sucesso
- **Cores extraídas**: Disponíveis em `packages/tokens/src/tokens.json`
- Redes identificadas: Canoas, Porto Alegre, Gravataí
- Tipografia: usar body-sm ou body-xs para badge

### Dados Simulados para Prototipagem
- **Não vamos usar API real** de questões
- Criar arquivo JSON mock: `domains/studio/data/backoffice/questoes-mock.json`
- Redes iniciais: Canoas (azul), Porto Alegre (vermelho), Gravataí (verde)
- ~50 questões total (15-20 por rede, mix de status: aprovada/em-revisao/rejeitada)
- Usar em Puck Studio e Storybook para demonstrar componentes

### Pontos Técnicos
1. **Campo `uso` na API**: Confirmar estrutura
   - Ex: `uso: "Canoas"` ou `usoId: "123", usoNome: "Canoas"`?
   - Avaliar normalizacao no backend

2. **Filtro por Rede**
   - Usar Select component do shadcn
   - Implementar context/state para filtros (considerar Zustand ou SWR)
   - Persistir filtro em URL (query param) ou localStorage

3. **Modal de Detalhes**
   - Verificar se existe componente pronto no Design System
   - Se não, criar wrapper customizado
   - Incluir: enunciado, alternativas, gabarito, metadados

4. **Badges de Rede**
   - Usar cores por rede (tokens do Figma)
   - Variantes: outline vs filled
   - Considerar reutilizar componente Badge existente

### Fluxo de Implementação (Sugerido)
1. Criar componentes base: USO Badge, Network Filter, Detail Modal
2. Adicionar stories no Storybook
3. Integrar em Banco de Questões (lista)
4. Integrar em Provas (lista de adicionar)
5. Integrar em Expedição de Leitura
6. Testes e validação

### Bloqueadores Atuais
- ✅ Tokens do Figma (cores, tipografia) - Extraídos via MCP
- ✅ Dados de questões - Serão mockados (não bloqueia mais)
- ✅ Página inicial criada e renderizando
- ⏳ Confirmação de estrutura de API para `uso` (para fase pós-prototipagem)

### Screenshots para Referência
- Imagem 1: Banco de Questões -> Aba Aprovadas (com anotações "filtro uso" e "add uso")
- Imagem 2: Provas -> Adicionar Questões (com anotações "filtro uso" e "add uso")
- Imagem 3: Expedição Leitura -> Desafios de Compreensão -> Criar Desafio (com anotações)

---

## 🔄 Variações & Edge Cases

### Campo USO Vazio
- [ ] O que fazer se questão não tem rede definida?
- [ ] Exibir badge "Sem rede" ou excluir da listagem?
- Recomendação: criar badge com status "Não definido" (cinza)

### Múltiplas Redes por Questão
- [ ] Questão pode ter múltiplas redes?
- Se sim, exibir múltiplos badges ou dropdown?
- Recomendação: confirmar com PO

### Performance
- [ ] Quantas questões por página? (100+, 500+?)
- [ ] Filtro deve ser debounced?
- [ ] Considerar virtualizacao se muitas linhas

---

## 💡 Sugestões Futuras
1. Busca combinada: filtro por rede + disciplina + nível
2. Ordenação customizavel (data, código, rede)
3. Bulk actions: selecionar múltiplas, aplicar ação em lote
4. Export de questões por rede
5. Dashboard: estatísticas de questões por rede

