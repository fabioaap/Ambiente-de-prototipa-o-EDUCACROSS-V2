# 🎯 Jornada #4800: Exibir Campo USO - Resumo de Criação

**Data**: 27 de novembro de 2025  
**Status**: ✅ Estrutura Criada & Documentada  
**Branch**: `Jornada-teste-Backoffice` (sincronizada com `001-experience-hub-consolidation`)

---

## 📋 O Que Foi Feito

### ✅ Estrutura de Jornada Criada

```
domains/BackOffice/journeys/exibir-campo-uso/
├── README.md          (documentação completa com specs)
├── notas.md           (anotações técnicas e edge cases)
└── links.md           (referências e links úteis)
```

### 📄 Documentação Completa

#### `README.md` Inclui:
- 🎯 **Objetivo**: Exibir campo USO (rede) nas listas de questões com filtro
- 📋 **Contexto de Negócio**: Usuários BackOffice, reduzir erros de seleção
- 🚀 **Fluxo Detalhado** para 3 telas:
  - Banco de Questões (aba Aprovadas)
  - Provas (adicionar questões)
  - Expedição de Leitura (desafios de compreensão)
- 🧩 **Componentes Necessários**:
  - Badge USO (rede)
  - Filtro por Rede (Select)
  - CTA "Ver Detalhes" (Modal)
- 📐 **Data Model** com estrutura TypeScript
- 🎨 **Design Tokens** (aguardando Figma)
- ✅ **Critérios de Aceitação** (CA1-CA4)
- 📌 **Dependências & Bloqueadores**

#### `notas.md` Inclui:
- 📝 Anotações técnicas de implementação
- 🔄 Variações e edge cases (campo vazio, múltiplas redes, performance)
- 💡 Sugestões futuras
- ⏳ Bloqueadores atuais (tokens Figma, mapeamento de redes, API)

#### `links.md` Inclui:
- 🔗 Links para Figma (tokens, wireframes)
- 🧩 Links para componentes do Storybook
- 📚 Documentação interna (Playbook, Design System)
- 🚀 Comandos de desenvolvimento
- 👥 Pessoas envolvidas
- ✅ Checklist de conclusão

### 🗂️ Índices Atualizados

- ✅ `domains/README.md` - Nova jornada no BackOffice (+1 total: 4 jornadas)
- ✅ `domains/INDEX.md` - Referência adicionada, estatísticas atualizadas

---

## 🔄 Próximas Etapas (Backlog)

### Fase 2: Tokens & Design
- [ ] Importar tokens de cores do Figma (para badges de redes)
- [ ] Atualizar `links.md` com links definitivos do Figma
- [ ] Revisar wireframes e validar com PO

### Fase 3: Screenshots & Referência
- [ ] Coletar 3 prints das telas (anexar ao README ou pasta `/screenshots`)
- [ ] Adicionar anotações visuais (marca "filtro uso", "add uso", etc)

### Fase 4: Componentes & Storybook
- [ ] Criar componentes no Design System:
  - `USO Badge` (usa Badge base com variantes por rede)
  - `Network Filter` (Select especializado)
  - `Question Detail Modal` (ou drawer)
- [ ] Adicionar stories no Storybook (`domains/storybook/src/stories/`)
- [ ] Registrar componentes em `puck.config.tsx` (se aplicável)

### Fase 5: Implementação no Studio
- [ ] Criar páginas no Puck Studio:
  - `/backoffice/banco-questoes` (com nova coluna USO + filtro)
  - `/backoffice/provas/adicionar-questoes` (com badge + filtro + modal)
  - `/backoffice/expedicao-leitura/desafios` (com badge + filtro + modal)
- [ ] Integrar mocks de dados com campo `uso`

### Fase 6: Testes & Validação
- [ ] Testes manuais nas 3 telas
- [ ] Validação de acessibilidade (contraste, keyboard nav, screen reader)
- [ ] Responsividade (desktop, tablet, mobile)
- [ ] PR para merge em `001-experience-hub-consolidation`

---

## 📊 Estrutura de Dados (Esperada)

```typescript
interface Questao {
  // Campos existentes
  id: string;
  codigo: string;
  enunciado: string;
  alternativas: string[];
  gabarito: string;
  disciplina: string;
  topico: string;
  nivel: string;
  autor: string;
  status: "aprovada" | "em-revisao" | "rejeitada";
  
  // NOVO CAMPO
  uso: string;  // ex: "Canoas", "Porto Alegre"
}

interface Rede {
  id: string;
  nome: string;
  cor?: string;  // hex color para badge
}
```

---

## 🎯 Critérios de Aceitação (Resumo)

### CA1: Exibição de Campo USO
- [ ] Coluna "USO (Rede)" aparece nas 3 telas
- [ ] Valor exibe badge com nome da rede
- [ ] Cores consistentes por rede

### CA2: Filtro por Rede
- [ ] Filtro acima/ao lado da tabela
- [ ] Recarrega lista dinamicamente
- [ ] Pode limpar filtro

### CA3: CTA "Ver Detalhes"
- [ ] Cada questão tem botão
- [ ] Abre modal com conteúdo completo

### CA4: Responsividade
- [ ] Desktop (≥1024px) ✓
- [ ] Tabela scrollável mobile (≤768px)
- [ ] Modal adaptável

---

## 🔗 Arquivos Criados

| Arquivo | Status | Link |
|---------|--------|------|
| `domains/BackOffice/journeys/exibir-campo-uso/README.md` | ✅ Criado | [Ver](../BackOffice/journeys/exibir-campo-uso/README.md) |
| `domains/BackOffice/journeys/exibir-campo-uso/notas.md` | ✅ Criado | [Ver](../BackOffice/journeys/exibir-campo-uso/notas.md) |
| `domains/BackOffice/journeys/exibir-campo-uso/links.md` | ✅ Criado | [Ver](../BackOffice/journeys/exibir-campo-uso/links.md) |
| `domains/README.md` | ✅ Atualizado | - |
| `domains/INDEX.md` | ✅ Atualizado | - |

---

## 🚀 Como Continuar

### Para trabalhar na jornada:

```bash
# 1. Navegar até a pasta da jornada
cd domains/BackOffice/journeys/exibir-campo-uso

# 2. Revisar documentação
cat README.md
cat notas.md
cat links.md

# 3. Abrir Studio para criar páginas
cd domains/studio
pnpm dev:studio
# http://localhost:3000/studio

# 4. Abrir Storybook para componentes
cd domains/storybook
pnpm dev:storybook
# http://localhost:6006
```

### Para atualizar a jornada:

- Edite `README.md` para mudanças no escopo/specs
- Edite `notas.md` para insights técnicos
- Edite `links.md` para referências/URLs

---

## ⚠️ Bloqueadores Atuais

1. **Tokens do Figma** - Cores por rede (Canoas, Porto Alegre, etc)
2. **Confirmação de API** - Estrutura do campo `uso` no backend
3. **Mapeamento de Redes** - Lista definitiva de redes/contextos

---

## 📝 Notas Adicionais

- Branch `Jornada-teste-Backoffice` agora está sincronizada com `001-experience-hub-consolidation` (fast-forward merge)
- Estrutura segue o template padrão: README + notas + links
- Documentação é auto-contida; próximas fases adicionarão componentes & screenshots
- Esta é a **primeira jornada criada com specs completas** para BackOffice

---

**Próxima ação**: Fornecer tokens do Figma para iniciar Fase 2. 🎨

