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
- [ ] Prototipagem no Puck Studio
- [ ] Integração de componentes
- [ ] Testes de usabilidade
- [ ] Concluído

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

```typescript
// Estrutura esperada de uma Questão com USO
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
  
  // NOVO CAMPO
  uso: string;             // rede/contexto: "Canoas", "Porto Alegre", etc
  usoId?: string;          // ID da rede (para normalizacao)
  
  status: "aprovada" | "em-revisao" | "rejeitada";
  habilidades: string[];   // ex: ["EF07MA01", "EF07MA03"]
}

// Estrutura de Rede (Uso)
interface Rede {
  id: string;
  nome: string;
  cor?: string;            // hex color para badge
  sigla?: string;          // "CNS" para Canoas, "POA" para Porto Alegre
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
- [ ] **API de Questões** - Confirmação que campo `uso` está disponível
- [ ] **Mocks de Dados** - Para testes com diferentes redes

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

