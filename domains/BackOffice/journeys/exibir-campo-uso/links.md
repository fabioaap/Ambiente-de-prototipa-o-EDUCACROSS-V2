# Links - Jornada Exibir Campo USO

## 🔗 Referências de Tarefa

- **Bitrix Tarefa #4800**: (Adicionar link quando disponível)
- **GitHub Issue**: (Adicionar número quando criada)
- **PR Relacionada**: (Preenchimento posterior)

---

## 📊 Prototipagem & Design

### Studio (Puck Editor)
- [x] **Página Criada**: http://localhost:3000/backoffice/exibir-campo-uso
- [ ] Banco de Questões: http://localhost:3000/studio?page=backoffice/banco-questoes
- [ ] Provas - Adicionar: http://localhost:3000/studio?page=backoffice/provas-adicionar
- [ ] Expedição Leitura: http://localhost:3000/studio?page=backoffice/expedicao-leitura-desafios
- [ ] Modal Detalhes: http://localhost:3000/studio?page=backoffice/questao-detalhes-modal

### Figma
- **Arquivo Principal**: [EDUCACROSS - Campo USO](https://www.figma.com/file/Sz4z0rpDmocXZ8LylxEgqF)
- **Frame/Node ID**: `8565:17355` (Tela: Exibir Campo USO)
- **Design Tokens**: Extraídos via MCP Figma Server
- **Wireframe Banco Questões**: [Frame no Figma](https://www.figma.com/file/Sz4z0rpDmocXZ8LylxEgqF?node-id=8565-17355)
- **Component Library**: [Design System EDUCACROSS](https://www.figma.com/file/Sz4z0rpDmocXZ8LylxEgqF)

---

## 🧩 Componentes do Design System

### Já Existentes
- [Badge](http://localhost:6006/?path=/story/badge) - Para exibir rede
- [Button](http://localhost:6006/?path=/story/button) - Para CTA
- [Select](http://localhost:6006/?path=/story/select) - Para filtro por rede
- [Card](http://localhost:6006/?path=/story/card) - Para layout de questões
- [Table](http://localhost:6006/?path=/story/table) - Para listagem (se aplicável)

### A Criar
- [ ] USO Badge Component (story no Storybook)
- [ ] Network Filter Component
- [ ] Question Detail Modal

---

## 📚 Documentação Interna

- [Playbook do Copilot](../../.github/copilot-instructions.md) - Diretrizes gerais
- [Design System](../../../packages/design-system) - Componentes base
- [Tokens](../../../packages/tokens) - Cores, tipografia, espaçamento
- [Studio Puck Config](../../../domains/studio/src/config/puck.config.tsx) - Registro de componentes

---

## 🚀 Ambiente Local

### Dev Servers
```bash
# Studio (editor visual)
pnpm dev:studio
# http://localhost:3000

# Storybook (componentes)
pnpm dev:storybook
# http://localhost:6006
```

### Comandos Úteis
```bash
# Lint
pnpm lint

# Type check
pnpm -r type-check

# Build full
pnpm build

# Build design system
pnpm build:design-system

# Build tokens
pnpm build:tokens
```

---

## 📊 Estrutura de Dados & APIs

### Endpoint de Questões (esperado)
- `GET /api/questoes` - Listar questões
- `GET /api/questoes/{id}` - Detalhe de questão
- Query params: `?rede=Canoas&status=aprovada`

### Mocks de Dados
- Arquivo: `domains/studio/data/pages/backoffice/questoes-mock.json` (criar se não existir)
- Estrutura: Array com ~100 questões, variando redes

---

## 👥 Pessoas Envolvidas

- **Product Owner**: [Nome/Contato]
- **Designer**: [Nome/Contato]
- **Dev Responsável**: Copilot (Sprint 3)
- **Testes/QA**: [A definir]

---

## ✅ Checklist de Conclusão

- [ ] README.md documentada completamente
- [ ] Figma tokens importados
- [ ] Screenshots das telas anexadas
- [ ] Componentes criados no Storybook
- [ ] Páginas criadas no Studio
- [ ] Testes manuais realizados
- [ ] Validação de acessibilidade feita
- [ ] PR aberta para merge
- [ ] Documentação de Storybook publicada

---

## 📝 Data da Criação
27 de novembro de 2025

