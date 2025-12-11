# Jornada: Exibir Campo USO (Rede) nas Listas de Questões

> 🎓 Melhoria na curadoria de conteúdo: exibição e filtro de campo USO (rede) para seleção segura de questões

## Overview

**Objetivo Primário**: Permitir que usuários de BackOffice identifiquem de qual rede é cada questão via campo USO nas listas, reduzindo risco de erros de seleção.

**Usuários Alvo**: Coordenadores, professores e curadores de BackOffice que gerenciam conteúdo

**Resultado Esperado**: Segurança aumentada na montagem de avaliações e trilhas educacionais, redução de 80-90% em erros de seleção de rede errada

**Contexto de Negócio**:
- Reduzir erros de seleção de questões de rede errada
- Aumentar confiança na montagem de provas
- Melhorar eficiência da curadoria com filtro visual
- Garantir questões sejam usadas no contexto correto

**Ativadores**:
- Usuário consultando questões aprovadas no banco
- Selecionando questões para provas (teste de avaliações)
- Criando desafios em Expedição de Leitura

## Journey Steps

### Etapa 1: Visualizar Questões com Badge USO
**Objetivo**: Mostrar de qual rede é cada questão em listas e tabulações

**Componentes**:
- Coluna "USO (Rede)" adicionada às tabelas
- Badge com nome da rede e cor diferenciada por rede
- Cores consistentes: Canoas (azul), Porto Alegre (vermelho), Gravataí (verde)
- Dados mock com ~50 questões distribuídas em 3 redes

**Success Criteria**:
- ✅ Coluna USO aparece em banco de questões
- ✅ Badge exibe nome da rede corretamente
- ✅ Cores são consistentes por rede
- ✅ Informação é visível sem necessidade de scroll horizontal

**User Story**:
```gherkin
Given um usuário acessa a lista de questões aprovadas
When visualiza a tabela
Then vê coluna adicional "USO (Rede)"
And cada questão mostra um badge com nome da rede (Canoas, Porto Alegre, Gravataí)
And badge tem cor diferenciada por rede
And pode identificar imediatamente a qual rede a questão pertence
```

### Etapa 2: Filtrar Questões por Rede
**Objetivo**: Permitir filtro rápido por rede/USO para foco em conteúdo específico

**Componentes**:
- Select/dropdown de filtro por rede
- Opção "Todas as Redes" para limpar filtro
- Filtro persiste enquanto navega
- Contador dinâmico de questões por rede

**Success Criteria**:
- ✅ Filtro por rede filtra dinamicamente a tabela
- ✅ Pode filtrar por cada rede individualmente
- ✅ Pode limpar filtro e ver todas questões
- ✅ Contador mostra "X questões de Canoas"

**User Story**:
```gherkin
Given um usuário está na lista de questões
When vê o filtro de rede
Then pode selecionar uma rede específica (Canoas, Porto Alegre, Gravataí)
And tabela filtra automaticamente
And vê apenas questões daquela rede
And contador atualiza (ex: "18 questões de Canoas")
And pode limpar o filtro e ver todas novamente
```

### Etapa 3: Acessar Detalhes Completos da Questão
**Objetivo**: Ver todos os detalhes da questão em modal antes de usá-la

**Componentes**:
- Botão "Ver Detalhes" em cada linha
- Modal com conteúdo completo
- Exibição de enunciado, alternativas, gabarito
- Informações: rede, disciplina, nível, autor, habilidades
- Botão "Usar esta Questão" ou "Voltar"

**Success Criteria**:
- ✅ Cada questão tem botão "Ver Detalhes"
- ✅ Modal exibe conteúdo completo
- ✅ Badge USO é visível no modal
- ✅ Pode fechar modal e voltar à lista

**User Story**:
```gherkin
Given um usuário encontrou uma questão potencial
When clica em "Ver Detalhes"
Then modal abre com conteúdo completo
And mostra enunciado, todas as alternativas
And mostra gabarito com explicação
And exibe badge da rede (USO)
And mostra metadados (disciplina, nível, autor, habilidades)
And pode usar a questão ou voltar à lista
```

### Etapa 4: Usar Questão no Contexto Apropriado
**Objetivo**: Integrar questão selecionada na prova/expedição com confirmação de rede

**Componentes**:
- Confirmação: "Você está adicionando questão da rede X"
- Opção de cancelar se estiver errado
- Questão adicionada com badge USO visível
- Histórico de questões adicionadas mostra redes

**Success Criteria**:
- ✅ Ao usar questão, sistema confirma rede
- ✅ Usuário pode cancelar se errado
- ✅ Questão é adicionada com badge USO visível
- ✅ Histórico mostra redes para auditoria

**User Story**:
```gherkin
Given o usuário selecionou "Usar esta Questão"
When está pronto para adicionar à prova
Then vê confirmação: "Adicionando questão de [Rede]"
And pode confirmar ou cancelar
And após confirmar, questão aparece com badge USO
And pode ver histórico de questões adicionadas
```

## Fluxo Detalhado

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

