# Jornada: Banco de Questões

## 📋 Objetivo

Página de referência que demonstra o uso completo da suite BackOffice do Design System EDUCACROSS para gestão de banco de questões educacionais.

## 🎯 Status

✅ **Implementada** - Sprint 3 Fase 4

## 🧩 Componentes Utilizados

### Navegação e Estrutura
- **Sidebar**: Menu lateral com links para BackOffice, Usuários e Relatórios
- **Breadcrumb**: Navegação hierárquica (Home > BackOffice > Banco de Questões)
- **PageHeader**: Cabeçalho com título, contador (181 questões) e subtítulo

### Filtros e Controles
- **Tabs**: 3 abas (Aprovadas: 150, Em revisão: 23, Em correção: 8)
- **FilterGroup**: 8 filtros em layout grid:
  - Área, Ano Escolar, Tipo, Nível (select)
  - Habilidade, Tópico (input)
  - Autoria, USO (select)
- **ToolbarButtons**: Botões de Importar e Exportar

### Visualização de Dados
- **DataTable**: Tabela com 10 colunas:
  - Código, Habilidades, Tópico, Tipo
  - Classificação (badges), Autoria, Criador, Revisor, Data
  - Ações (ActionButtons)
- **Badge**: Classificação visual (efobmaos, d6, d7, etc.)
- **ActionButtons**: Visualizar, Editar e Excluir
- **Pagination**: 19 páginas de navegação

## 📂 Arquivos

- **Página**: `domains/studio/src/app/backoffice/banco-questoes/page.tsx`
- **Documentação**: `domains/BackOffice/journeys/banco-questoes/README.md` (este arquivo)

## 💾 Dados Mock

A página inclui 5 questões de exemplo:
- MAT-6-001: Números e Operações (Prof. Ana Silva)
- MAT-6-002: Geometria (Prof. Maria Costa)
- MAT-7-001: Álgebra (Prof. Pedro Lima)
- MAT-8-001: Estatística (Prof. João Santos)
- MAT-9-001: Funções (Prof. Ana Silva)

Cada questão possui:
- Código, Habilidades BNCC, Tópico, Tipo
- Autoria, Criador, Revisor, Data
- Badges de classificação

## 🚀 Como Usar

### Acessar a Página

```bash
# Iniciar servidor de desenvolvimento
cd domains/studio
pnpm dev

# Acessar no navegador
http://localhost:3000/backoffice/banco-questoes
```

### Usar como Template

1. **Copiar estrutura**:
```typescript
import {
  Sidebar,
  Breadcrumb,
  PageHeader,
  Tabs,
  FilterGroup,
  DataTable,
  Pagination,
  ToolbarButtons,
  ActionButtons,
  Badge,
} from '@prototipo/design-system';
```

2. **Adaptar dados**:
   - Substituir `mockQuestions` pelos seus dados
   - Ajustar `columns` conforme necessário
   - Configurar `filterConfig` para seus filtros
   - Personalizar `tabs` e `sidebarItems`

3. **Integrar API**:
```typescript
// Substituir mock por fetch real
const [questions, setQuestions] = useState([]);

useEffect(() => {
  fetch('/api/questions')
    .then(res => res.json())
    .then(setQuestions);
}, []);
```

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
