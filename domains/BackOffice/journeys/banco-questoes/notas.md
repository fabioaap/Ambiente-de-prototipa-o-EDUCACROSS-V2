# Notas de Desenvolvimento - Banco de Questões

## Decisões de Design

### Layout
- **Sidebar fixa**: Escolhida para facilitar navegação entre seções do BackOffice
- **Grid 8 filtros**: Layout responsivo que se adapta a diferentes tamanhos de tela
- **Tabs no topo**: Padrão visual para separação clara entre estados das questões

### Componentes
- **DataTable striped + hoverable**: Melhora legibilidade em tabelas extensas
- **Badges inline**: Classificações visualmente destacadas sem poluir interface
- **ActionButtons**: Ações contextuais sempre visíveis na última coluna

### Estado
```typescript
const [currentPage, setCurrentPage] = useState(1);
const [activeTab, setActiveTab] = useState('aprovadas');
const [filters, setFilters] = useState({});
```

Estado simples e direto, pronto para evolução com:
- Persistência em localStorage
- Sincronização com URL params
- Integração com state management global (Zustand, Redux)

## Dados Mock

### Estrutura
Cada questão possui 9 campos principais + badges:
- **id**: Identificador único (Q001, Q002...)
- **codigo**: Código da questão (MAT-6-001)
- **habilidades**: Array de códigos BNCC
- **topico**: Categoria temática
- **tipo**: Tipo de questão
- **autoria**: Origem da questão
- **criador**: Professor autor
- **revisor**: Professor revisor
- **data**: Data de criação
- **badges**: Tags de classificação

### Expansão
Para adicionar mais dados:
```typescript
const mockQuestions = [
  ...mockQuestions,
  {
    id: 'Q006',
    codigo: 'PORT-6-001',
    habilidades: ['EF06LP01'],
    topico: 'Leitura',
    tipo: 'Interpretação',
    autoria: 'Rede Canoas',
    criador: 'Prof. Carlos Lima',
    revisor: 'Prof. Ana Silva',
    data: '2025-11-01',
    badges: ['leitura', 'd6'],
  },
];
```

## Integração com API

### Endpoint Esperado
```typescript
// GET /api/questions?page=1&tab=aprovadas&filters={...}
interface APIResponse {
  data: Question[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
  };
  tabs: {
    aprovadas: number;
    revisao: number;
    correcao: number;
  };
}
```

### Implementação
```typescript
const fetchQuestions = async () => {
  const params = new URLSearchParams({
    page: currentPage.toString(),
    tab: activeTab,
    filters: JSON.stringify(filters),
  });
  
  const res = await fetch(`/api/questions?${params}`);
  const data = await res.json();
  
  setQuestions(data.data);
  setTotalPages(data.pagination.totalPages);
};

useEffect(() => {
  fetchQuestions();
}, [currentPage, activeTab, filters]);
```

## Performance

### Otimizações Implementadas
1. **useState simples**: Evita re-renders desnecessários
2. **Callbacks inline**: Console.log para debug, fácil substituir por ações reais
3. **Layout inline CSS**: Evita carregamento de CSS externo

### Melhorias Futuras
1. **React Query**: Cache automático de requisições
2. **Virtual Scrolling**: Para grandes volumes de dados (react-window)
3. **Debounce filtros**: Evitar requisições excessivas
4. **Lazy loading**: Carregar dados sob demanda

## Acessibilidade

### Implementado
- ✅ Labels semânticos em todos os componentes
- ✅ Estrutura HTML semântica (div para layout, não para tudo)
- ✅ Cores com contraste adequado (tokens do DS)

### Próximos Passos
- ⏳ ARIA labels para ações
- ⏳ Keyboard navigation completa
- ⏳ Screen reader testing
- ⏳ Focus management

## Testes

### Cenários de Teste
1. **Filtros**: Aplicar cada filtro individualmente e combinado
2. **Tabs**: Alternar entre abas e verificar contador
3. **Paginação**: Navegar entre páginas
4. **Ações**: Clicar em View, Edit, Delete
5. **Sidebar**: Navegar entre seções
6. **Responsivo**: Testar em mobile, tablet, desktop

### Testes Automatizados
```typescript
describe('BancoQuestoesPage', () => {
  it('renders all 5 questions', () => {
    render(<BancoQuestoesPage />);
    expect(screen.getAllByRole('row')).toHaveLength(6); // 5 + header
  });
  
  it('filters questions by tab', () => {
    render(<BancoQuestoesPage />);
    fireEvent.click(screen.getByText('Em revisão'));
    // Verificar que apenas questões em revisão são exibidas
  });
  
  it('paginates correctly', () => {
    render(<BancoQuestoesPage />);
    fireEvent.click(screen.getByLabelText('Próxima página'));
    expect(screen.getByText('Página 2 de 19')).toBeInTheDocument();
  });
});
```

## Problemas Conhecidos

### Limitações Atuais
1. **Dados mock**: Apenas 5 questões, paginação simulada
2. **Filtros não funcionais**: OnChange apenas atualiza estado, não filtra
3. **Ações placeholder**: Console.log em vez de ações reais
4. **Sem persistência**: Estado perdido ao recarregar página

### Soluções Planejadas
1. Integrar com API real
2. Implementar lógica de filtros
3. Adicionar modals para View/Edit/Delete
4. Persistir estado em localStorage ou URL

## Melhorias Futuras

### Funcionalidades
- [ ] Busca full-text
- [ ] Ordenação por coluna
- [ ] Seleção múltipla com ações em lote
- [ ] Exportação CSV/PDF
- [ ] Preview de questão em modal
- [ ] Edição inline de campos
- [ ] Histórico de alterações
- [ ] Comentários e anotações

### UX
- [ ] Skeleton loading states
- [ ] Toast notifications
- [ ] Drag and drop para reordenação
- [ ] Atalhos de teclado
- [ ] Dark mode
- [ ] Temas customizáveis

### Performance
- [ ] Server-side rendering
- [ ] Infinite scroll option
- [ ] Column virtualization
- [ ] Image lazy loading
- [ ] Code splitting

## Referências

- **Padrão BackOffice**: Baseado em AdminLTE, Material Dashboard
- **UX de tabelas**: DataTables.net, AG Grid
- **Filtros**: Inspired by Amazon product filters
- **BNCC**: Habilidades seguem códigos oficiais BNCC

---

**Última atualização**: 2025-11-29  
**Revisado por**: Design System Team
