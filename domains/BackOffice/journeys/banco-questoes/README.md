# Banco de Questões

**Title:** Gerenciar Banco de Questões  
**Status:** Complete  
**Last Updated:** 2025-12-09  
**Owner:** BackOffice Team

## Overview

**Objective:**  
Gerenciar, filtrar, revisar e exportar banco de questões educacionais com suporte completo a BNCC (Base Nacional Comum Curricular). Página de referência que demonstra o uso completo da suite BackOffice do Design System EDUCACROSS.

**Target Users:**  
- Coordenadores Pedagógicos
- Revisores de Questões
- Administradores do Sistema

**Expected Outcome:**  
Usuários conseguem filtrar questões por múltiplos critérios, revisar status, visualizar metadados, e exportar dados para análise.

---

## Journey Steps

### Step 1: Acessar Banco de Questões
**Description:** Usuário acessa a página do banco de questões via navegação lateral ou URL direta  
**Duration:** <1 segundo  
**Components Used:** Sidebar, Breadcrumb, PageHeader  
**Data Required:** Contagem total de questões (181)

**Success Criteria:**
- [ ] Página carrega com sidebar visível
- [ ] Breadcrumb mostra navegação hierárquica
- [ ] PageHeader exibe título e contador

### Step 2: Aplicar Filtros
**Description:** Usuário filtra questões por até 8 critérios diferentes (Área, Ano, Tipo, etc)  
**Duration:** 5-30 segundos  
**Components Used:** FilterGroup, Tabs  
**Data Required:** Opções de filtros disponíveis

**Success Criteria:**
- [ ] Todos os 8 filtros funcionam
- [ ] Abas por status (Aprovadas/Em revisão/Em correção) atualizam
- [ ] Resultados refletem filtros aplicados

### Step 3: Visualizar Resultados
**Description:** Questões filtradas aparecem em tabela com 10 colunas de dados  
**Duration:** Instantâneo  
**Components Used:** DataTable, Badge, ActionButtons, Pagination  
**Data Required:** Lista de questões com metadados

**Success Criteria:**
- [ ] Tabela exibe todas as colunas corretamente
- [ ] Badges de classificação aparecem com cores
- [ ] Paginação funciona (19 páginas)

### Step 4: Executar Ações
**Description:** Usuário visualiza, edita ou exclui questões específicas  
**Duration:** 30-60 segundos  
**Components Used:** ActionButtons, Modal (implícito)  
**Data Required:** ID e dados da questão

**Success Criteria:**
- [ ] Botão "Visualizar" abre detalhes
- [ ] Botão "Editar" abre editor
- [ ] Botão "Excluir" pede confirmação

---

## User Stories

```gherkin
Feature: Gerenciar Banco de Questões

  Scenario: Visualizar todas as questões
    Given Usuário acessa /backoffice/banco-questoes
    When Página carrega
    Then 150 questões aprovadas aparecem na tabela
    And Contagem total mostra 181

  Scenario: Filtrar por múltiplos critérios
    Given Usuário está na página do banco
    When Aplica filtro "Área: Matemática" e "Ano: 6º"
    Then Tabela mostra apenas questões de Matemática 6º ano
    And Resultados atualizam em tempo real

  Scenario: Navegar por abas de status
    Given Usuário está na página do banco
    When Clica na aba "Em revisão"
    Then Tabela mostra 23 questões em revisão
    And Badge mostra status correto

  Scenario: Exportar questões filtradas
    Given Usuário filtrou questões
    When Clica em "Exportar"
    Then Arquivo CSV é baixado com dados filtrados

  Scenario: Editar questão
    Given Usuário vê questão na tabela
    When Clica em "Editar"
    Then Editor de questão abre
    And Dados da questão são carregados
```

---

## Component Architecture

**Layout Principal:**
- Sidebar (navegação lateral)
- Breadcrumb (navegação hierárquica)
- PageHeader (título + contador)
- Abas (status das questões)
- FilterGroup (8 filtros em grid)
- ToolbarButtons (Importar/Exportar)
- DataTable (10 colunas)
- Pagination (19 páginas)

**Data Model:**
```typescript
interface Questão {
  codigo: string;
  habilidades: string[];
  topico: string;
  tipo: 'múltipla' | 'discursiva' | 'verdadeiro-falso';
  classificacao: string[];
  autoria: string;
  criador: string;
  revisor: string;
  data: string;
  status: 'aprovada' | 'em_revisao' | 'em_correcao';
}
```

---

## Dados de Exemplo

A página inclui 5 questões de exemplo:
- **MAT-6-001**: Números e Operações (Prof. Ana Silva) - Aprovada
- **MAT-6-002**: Geometria (Prof. Maria Costa) - Aprovada
- **MAT-7-001**: Álgebra (Prof. Pedro Lima) - Em revisão
- **MAT-8-001**: Estatística (Prof. João Santos) - Em revisão
- **MAT-9-001**: Funções (Prof. Ana Silva) - Em correção

---

## Implementação

**Localização da Página:** `domains/studio/src/app/backoffice/banco-questoes/page.tsx`

**Como Usar como Template:**

1. Copiar estrutura de componentes
2. Substituir `mockQuestions` pelos dados reais
3. Integrar com `/api/questions` endpoint
4. Ajustar filtros conforme necessário

```typescript
// Padrão para integração de API
const [questions, setQuestions] = useState([]);
const [filters, setFilters] = useState({});

useEffect(() => {
  fetch('/api/questions', { body: filters })
    .then(res => res.json())
    .then(setQuestions);
}, [filters]);
```

---

## Related Documentation

- **Feature Spec:** [Feature spec document link]
- **API Documentation:** `/api/questions`
- **Design:** [Figma BackOffice Kit]
- **Related Journeys:**
  - Revisão de Questões
  - Banco de Respostas

---

## Progress Status

**Phase 1 (Research):** ✅ Complete  
**Phase 2 (Design):** ✅ Complete  
**Phase 3 (Development):** ✅ Complete  
**Phase 4 (Testing):** ✅ Complete  
**Phase 5 (Migration to New Template):** ✅ Complete  

---

## Analytics Events

**Events Tracked:**
- `journey_start` - Usuário abre banco de questões
- `filter_applied` - Usuário aplica filtro
- `question_viewed` - Usuário visualiza questão
- `question_edited` - Usuário edita questão
- `data_exported` - Usuário exporta dados

**Expected Metrics:**
- Conversion Rate: 85% (usuários que aplicam filtro)
- Average Time: 3-5 minutos por sessão
- Export Rate: 40% de usuários exportam

---

## Notas e Melhorias Futuras

- Implementar busca em tempo real
- Adicionar filtros salvos/favoritos
- Integrar com sistema de revisão automática
- Adicionar relatórios de qualidade das questões
- Suporte para importação em lote via Excel

---

**Perguntas?** Veja [quickstart.md](../../specs/005-sprint6-execution/quickstart.md) ou contate o BackOffice Team.

## 🎨 Customização

### Layout
```typescript
// Alterar layout dos filtros
<FilterGroup layout="horizontal" />  // ou "vertical", "grid"

// Ajustar largura da sidebar
<Sidebar items={items} collapsed={false} />
```

### Colunas da Tabela
```typescript
const columns = [
  { key: 'id', label: 'ID', sortable: true },
  { 
    key: 'status', 
    label: 'Status',
    render: (status) => <Badge variant={status}>{status}</Badge>
  },
  // ... mais colunas
];
```

### Ações Personalizadas
```typescript
<ActionButtons
  onView={(row) => router.push(`/questions/${row.id}`)}
  onEdit={(row) => setEditModal(row)}
  onDelete={(row) => confirmDelete(row.id)}
/>
```

## 📊 Componentes por Função

| Função | Componente | Props Principais |
|--------|-----------|------------------|
| Navegação | Sidebar | items, collapsed |
| Navegação | Breadcrumb | items |
| Cabeçalho | PageHeader | title, count, subtitle |
| Filtragem | Tabs | tabs, value, onChange |
| Filtragem | FilterGroup | filters, values, onChange, layout |
| Ações | ToolbarButtons | onImport, onExport |
| Visualização | DataTable | columns, data, striped, hoverable |
| Visualização | Badge | variant, size |
| Ações | ActionButtons | onView, onEdit, onDelete |
| Navegação | Pagination | currentPage, totalPages, onChange |

## 🔗 Links Relacionados

- **Design System**: `packages/design-system/src/components/`
- **Storybook**: `http://localhost:6006` (BackOffice stories)
- **Documentação Sprint 3**: `SPRINT3_EXECUTION_DETAILED.md`

## ✅ Checklist de Implementação

- [x] Sidebar com menu BackOffice
- [x] Breadcrumb navegacional
- [x] PageHeader com contador
- [x] Tabs para status de questões
- [x] FilterGroup com 8 filtros
- [x] ToolbarButtons (Import/Export)
- [x] DataTable com 10 colunas
- [x] Badges de classificação
- [x] ActionButtons em cada linha
- [x] Pagination funcional
- [x] 5 questões mock
- [x] Layout responsivo
- [x] Documentação completa

## 📝 Notas

- Esta página é uma **referência completa** do uso da suite BackOffice
- Todos os componentes seguem o padrão do Design System
- Layout é baseado em padrões de BackOffice reais
- Pronta para integração com APIs reais
- Segue best practices de acessibilidade e responsividade

## 🎓 Aprendizados

1. **Composição**: Como combinar múltiplos componentes BackOffice
2. **Estado**: Gerenciamento de filtros, paginação e tabs
3. **Dados**: Estruturação de colunas e rendering customizado
4. **Layout**: Organização sidebar + conteúdo principal
5. **Interação**: Callbacks para ações do usuário

---

**Criado em**: 2025-11-29  
**Autor**: Design System Consolidation Agent  
**Sprint**: 3 - Fase 4
