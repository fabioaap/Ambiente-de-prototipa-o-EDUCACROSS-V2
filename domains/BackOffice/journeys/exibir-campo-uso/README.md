# Jornada: Exibir Campo USO (Rede) nas Listas de Questões

> 🎓 Jornada de melhoria na curadoria de conteúdo: exibição de campo USO (rede) e filtros para identificar e selecionar questões corretamente.

## 🎯 Objetivo

Garantir que usuários de BackOffice consigam identificar de qual rede é cada questão (via campo **USO**) nas listas de questões, permitindo filtro por rede e acesso rápido aos detalhes da questão antes de usá-la em provas e Expedições de Leitura. Isso reduz o risco de usar questão errada (de outra rede ou contexto) e aumenta a segurança na montagem de avaliações e trilhas educacionais.

## 📋 Contexto de Negócio

- **Para quem?** Usuários de BackOffice (coordenadores, professores, curadores)
- **Por que é importante?** 
  - Reduzir erros de seleção de questões de rede errada
  - Aumentar confiança na montagem de provas e Expedições de Leitura
  - Melhorar eficiência da curadoria com filtro visual
- **Quando será usado?** 
  - Diariamente, ao consultar questões aprovadas
  - Ao adicionar questões em provas (teste de avaliações)
  - Ao criar desafios em Expedição de Leitura

## 📊 Status

- 📋 **Planejamento** - Jornada em fase de descoberta/especificação
- ✅ **Integração MCP Figma** - Servidor MCP configurado para sincronizar design tokens automaticamente
- [ ] Prototipagem no Puck Studio
- [ ] Integração de componentes
- [ ] Testes de usabilidade
- [ ] Concluído

---

## 🔄 Sincronização Automática de Design Tokens (MCP Figma)

Este projeto usa um servidor **Model Context Protocol (MCP)** para sincronizar design tokens do Figma automaticamente.

### Como Atualizar Tokens do Figma

1. **Pré-requisitos**:
   - Configurar `.env.local` com `FIGMA_PERSONAL_TOKEN` e `FIGMA_FILE_ID`
   - Frame ID padrão: `8565:17355` (Jornada #4800)

2. **Sincronizar tokens**:
   ```bash
   # Via script direto
   pnpm --filter @educacross/figma-mcp-server exec tsx scripts/writeTokensFromMcp.ts
   
   # Ou via MCP tool (se usando VS Code/Claude)
   # No chat, solicite: "Atualize os design tokens do Figma"
   ```

3. **Pipeline automático**:
   - Tokens são extraídos de `Figma Frame 8565:17355`
   - Escritos em `packages/tokens/src/tokens.json`
   - Build automático: `pnpm build:tokens && pnpm build:design-system`
   - Log registrado em `docs/PROGRESS_DASHBOARD.md`

4. **Tokens disponíveis**:
   - **Cores**: `color.rede.<slug>`, `color.status.<state>`
   - **Tipografia**: `typography.<categoria>.<variante>`
   - **Espaçamento**: `spacing.<size>`

### Verificar Saúde do Servidor MCP

```bash
# Checar status
pnpm mcp:figma:health

# Verificar dashboard
# Acesse /api/health ou /api/dashboard/health
# Procure por: figmaMcpServer.status = "ok" | "degraded" | "offline"
```

Para mais detalhes, consulte:
- `specs/001-figma-mcp-server/quickstart.md`
- `docs/FIGMA_INTEGRATION_PLAN.md`

---

## 🔗 Referência da Tarefa

- **ID Bitrix**: #4800
- **Tipo**: Nova funcionalidade / Customização
- **Impacto**: Médio (há alternativa, mas causa transtorno)
- **Afetados**: Usuários de BackOffice

---

## 🚀 Fluxo da Jornada

### 1. Lista de Questões Aprovadas (Banco de Questões)
**URL esperada**: `/domains/backoffice/banco-questoes` (aba "Questões Aprovadas")

**Mudanças necessárias**:
- [ ] Adicionar coluna **USO (Rede)** na tabela de questões
  - Exibir badge com nome da rede (ex: "Canoas", "Porto Alegre")
  - Usar cor de badge diferenciada por rede (opcional: usar tokens de cores do Design System)
- [ ] Implementar **filtro por Rede**
  - Dropdown ou select com opções de redes disponíveis
  - Filtrar resultados dinamicamente
- [ ] Adicionar CTA **"Ver Detalhes"** em cada linha
  - Abre modal ou navega para tela de visualização completa da questão

### 2. Lista de Questões em Provas (Teste de Avaliações)
**URL esperada**: `/domains/backoffice/provas/adicionar-questoes`

**Mudanças necessárias**:
- [ ] Exibir badge **USO** na listagem de questões disponíveis
- [ ] Filtro por rede para facilitar seleção
- [ ] CTA **"Ver Detalhes"** em cada questão (modal com conteúdo completo)

### 3. Lista de Questões em Expedição de Leitura
**URL esperada**: `/domains/backoffice/expedicao-leitura/desafios-compreensao/criar/add-proposta`

**Mudanças necessárias**:
- [ ] Exibir badge **USO** nas questões disponíveis
- [ ] Filtro por rede
- [ ] CTA **"Ver Detalhes"** para inspeção antes de adicionar

---

## 🧪 Estratégia de Prototipagem (Dados Simulados)

> Para esta fase de prototipagem, **não usaremos API real de questões**. Todos os dados serão mockados.

### Dados Simulados

**Questões Mock**: Arquivo será criado em `domains/studio/data/pages/backoffice/questoes-mock.json`

Estrutura:
```json
{
  "questoes": [
    {
      "id": "13749",
      "codigo": "13749",
      "enunciado": "Qual é o resultado de 2 + 2?",
      "alternativas": ["3", "4", "5", "6"],
      "gabarito": "4",
      "disciplina": "Matemática",
      "topico": "1.17.4 Números Inteiros",
      "nivel": "Fácil",
      "autor": "GG",
      "criador": "FM",
      "revisor": "BC",
      "dataCriacao": "2025-11-20T10:30:00Z",
      "uso": "Canoas",
      "status": "aprovada",
      "habilidades": ["EF07MA01"]
    },
    // ... mais questões com diferentes valores de "uso"
  ],
  "redes": [
    { "id": "1", "nome": "Canoas", "cor": "#3B82F6", "sigla": "CNS" },
    { "id": "2", "nome": "Porto Alegre", "cor": "#EF4444", "sigla": "POA" },
    { "id": "3", "nome": "Gravataí", "cor": "#10B981", "sigla": "GRV" }
  ]
}
```

### Quantidade de Dados Mock

- **Questões por rede**: ~15-20 por rede (total ~50 questões)
- **Redes**: 3 redes inicialmente (Canoas, Porto Alegre, Gravataí)
- **Estados**: Mix de "aprovada", "em-revisao", "rejeitada"

### Local dos Mocks

- **Arquivo JSON**: `domains/studio/data/backoffice/questoes-mock.json`
- **Utilização no Studio**: Importar em componentes que precisam listar questões
- **Utilização em Storybook**: Usar para demonstrar componentes com dados variados

---

## 🧩 Componentes Utilizados

### Componentes Existentes do Design System

- **Badge** - Para exibir rede (USO) com cor diferenciada
- **Select / Dropdown** - Para filtro por rede
- **Button** - Para CTA "Ver Detalhes"
- **Table / Card** - Dependendo do layout da tela
- **Modal** - Para visualização de detalhes da questão (se aplicável)

### Novos Componentes Necessários

- [ ] **USO Badge Component** (ou reutilizar Badge com tokens)
  - Exibe nome da rede
  - Cor dinâmica baseada em tipo/rede
  - Variantes: "Canoas", "Porto Alegre", etc.

- [ ] **Network Filter Component** (Select especializado)
  - Dropdown com opções de redes
  - Suporta busca/filtro
  - Integra com context/state de filtros

- [ ] **Question Detail Modal** (ou drawer)
  - Visualiza conteúdo completo da questão
  - Enunciado, alternativas, gabarito
  - Metadados: autor, rede, disciplina, nível

---

## 📐 Data Model / Estrutura de Dados

> Para prototipagem, usaremos mocks. Após validação, essa interface será implementada no backend real.

```typescript
// Estrutura de uma Questão (para prototipagem com mocks)
interface Questao {
  id: string;              // ex: "13749"
  codigo: string;          // ex: "13749"
  enunciado: string;
  alternativas: string[];
  gabarito: string;
  disciplina: string;      // ex: "Matemática"
  topico: string;          // ex: "1.17.4 Números Inteiros"
  nivel: string;           // ex: "Fácil", "Médio", "Difícil"
  autor: string;           // ex: "GG"
  criador: string;         // ex: "FM"
  revisor: string;
  dataCriacao: string;     // ISO 8601
  
  // NOVO CAMPO (Protótipo)
  uso: string;             // rede/contexto: "Canoas", "Porto Alegre", "Gravataí"
  
  status: "aprovada" | "em-revisao" | "rejeitada";
  habilidades: string[];   // ex: ["EF07MA01", "EF07MA03"]
}

// Estrutura de Rede (para prototipagem)
interface Rede {
  id: string;
  nome: string;
  cor: string;             // hex color para badge
  sigla: string;           // "CNS" para Canoas, "POA" para Porto Alegre
}
```

---

## 🎨 Design Tokens Necessários

Aguardando importação do Figma. Será necessário:

- [ ] Cores de badges por rede
- [ ] Tipografia para labels (USO, Rede, Filtro)
- [ ] Espaçamento de componentes
- [ ] Tokens de sombra/elevação (para modal)

---

## 🔗 Protótipos Relacionados

> A serem preenchidos após criação no Puck Studio

- [ ] [Banco de Questões - Aba Aprovadas](http://localhost:3000/studio?page=backoffice/banco-questoes)
- [ ] [Provas - Adicionar Questões](http://localhost:3000/studio?page=backoffice/provas-adicionar)
- [ ] [Expedição Leitura - Desafios de Compreensão](http://localhost:3000/studio?page=backoffice/expedicao-leitura-desafios)
- [ ] [Modal - Detalhes da Questão](http://localhost:3000/studio?page=backoffice/questao-detalhes-modal)

---

## ✅ Critérios de Aceitação

### CA1: Exibição de Campo USO
- [ ] Coluna "USO (Rede)" aparece nas 3 telas listadas
- [ ] Valor exibido corresponde ao campo `uso` da questão
- [ ] Badge tem cor consistente com tipo de rede

### CA2: Filtro por Rede
- [ ] Filtro aparece acima/ao lado da tabela
- [ ] Filtro recarrega lista dinamicamente
- [ ] Pode-se limpar filtro e ver todas as questões novamente

### CA3: CTA "Ver Detalhes"
- [ ] Cada questão tem botão/link "Ver Detalhes"
- [ ] Clique abre modal ou navega para detalhe
- [ ] Modal mostra conteúdo completo (enunciado, alternativas, gabarito, etc)

### CA4: Responsividade
- [ ] Layout funciona em desktop (≥1024px)
- [ ] Tabela scrollável em mobile (≤768px)
- [ ] Modal adaptável para telas pequenas

---

## 📌 Dependências & Bloqueadores

- [ ] **Design Tokens do Figma** - Cores e tipografia de redes
- [ ] **Mapeamento de Redes** - Lista definitiva de redes/contextos
- [x] **Mocks de Dados** - Serão simulados para prototipagem (não depende de API real)
- ⏳ **API de Questões** - Integração futura (pós-prototipagem)

---

## 🔍 Validação & Testes

### Teste Manual
- [ ] Validar com 2-3 redes diferentes
- [ ] Testar filtro em cada uma das 3 telas
- [ ] Verificar que "Ver Detalhes" funciona sem erros

### Teste de Acessibilidade
- [ ] Badge tem bom contraste
- [ ] Modal é navegável por teclado
- [ ] Screen reader funciona no filtro

---

## 📝 Notas Adicionais

- Esta jornada é crítica para qualidade de conteúdo no BackOffice
- Impacto esperado: redução de 80-90% em erros de seleção de rede errada
- Próximas iterações poderiam incluir: busca por código, filtro avançado, bulk actions

---

## 🚀 Quick Start (para DEV)

```bash
# Desenvolver jornada no Studio
pnpm dev:studio

# Acessar Studio
http://localhost:3000/studio

# Acessar Storybook para componentes
pnpm dev:storybook
http://localhost:6006

# Teste local
pnpm --filter studio dev
# Abrir: http://localhost:3000/backoffice/banco-questoes (quando linkado)
```

---

## ✏️ Histórico de Atualizações

| Data | Autor | Mudança |
|------|-------|---------|
| 2025-11-27 | Copilot | Criação inicial - Jornada #4800 |

