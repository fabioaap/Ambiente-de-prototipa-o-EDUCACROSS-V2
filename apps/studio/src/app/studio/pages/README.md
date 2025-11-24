# Dashboard de Páginas do Studio

**Issue #54** - Dashboard UI (Sprint 3, Fase 3)

## 📋 Descrição

Interface React/Next.js que consome o endpoint GET `/api/pages` para exibir uma listagem visual de todas as páginas criadas no Puck Studio.

## 🎯 Funcionalidades

### Estados da Interface
- ✅ **Loading**: Indicador visual enquanto busca dados
- ✅ **Error**: Mensagem de erro com botão "Tentar Novamente"
- ✅ **Empty**: Estado vazio com CTA para criar primeira página
- ✅ **Success**: Grid responsivo com cards de páginas

### Informações Exibidas
Cada card de página mostra:
- **Título** da página
- **Slug** (URL formatado em monospace)
- **Domínio** extraído do slug (BackOffice, FrontOffice, Game Hub)
- **Data de criação** (formato: "23 de novembro de 2025")
- **Data de atualização** (formato: "23/11/2025 14:30")

### Ações Disponíveis
- **👁️ Visualizar**: Abre a página renderizada (rota `/{slug}`)
- **✏️ Editar**: Abre o editor Puck (rota `/studio?page={slug}`)
- **🗑️ Deletar**: Confirmação (MVP - apenas alerta, implementação futura)
- **+ Nova Página**: Botão global que redireciona para `/studio`

## 🚀 Como Acessar

### URL
```
http://localhost:3000/studio/pages
```

### Navegação
1. Abrir Studio: `http://localhost:3000/studio`
2. Clicar em "Ver Páginas" (se houver link) ou acessar diretamente a URL acima

## 🏗️ Arquitetura

### Estrutura de Arquivos
```
apps/studio/src/app/studio/pages/
├── page.tsx           # Componente React (client component)
└── page.module.css    # Estilos CSS Modules responsivos
```

### Dependências
- **API**: GET `/api/pages` (Issue #53 ✅)
- **Design System**: 
  - `Card` - Container dos itens
  - `Button` - Ações (Editar, Deletar, Nova Página)
  - `Text` - Tipografia
  - `Badge` - Indicador de domínio
- **Next.js**: Router para navegação

### Tipos TypeScript

```typescript
interface PageData {
  id: string;
  title: string;
  slug: string;
  createdAt: string;      // ISO8601
  updatedAt: string;      // ISO8601
  content: Record<string, unknown>;
}

interface ApiResponse {
  success: boolean;
  data: PageData[];
  error: string | null;
  total: number;
  timestamp: string;      // ISO8601
}
```

## 🎨 Design

### Layout
- **Grid Responsivo**: Auto-fill com minmax(340px, 1fr)
- **Mobile**: 1 coluna
- **Tablet**: 2 colunas
- **Desktop**: 3-4 colunas (dependendo da largura)

### Estados Visuais
- **Hover**: Card levanta levemente (translateY + shadow)
- **Focus**: Outline visível para acessibilidade (teclado)
- **Dark Mode**: Suporte via CSS media query

### Tokens CSS
Usa variáveis CSS do Design System:
- `--color-primary`
- `--color-neutral-{100,200,800}`
- `--color-error`

## 🧪 Testes

### Validação Manual
1. **Loading State**:
   ```bash
   # Abrir http://localhost:3000/studio/pages
   # Deve mostrar "Carregando páginas..." por ~1-2s
   ```

2. **Success State**:
   ```bash
   # Após loading, deve renderizar grid com páginas mock
   # Verificar: 5 páginas (BackOffice Dashboard, Users, FrontOffice Home, Games, Admin)
   ```

3. **Interações**:
   ```bash
   # Clicar "Editar" → redireciona para /studio?page={slug}
   # Clicar "Visualizar" → redireciona para /{slug}
   # Clicar "Deletar" → mostra confirmação
   # Clicar "Nova Página" → redireciona para /studio
   ```

4. **Responsividade**:
   ```bash
   # Testar em:
   # - Mobile (< 480px)
   # - Tablet (480-768px)
   # - Desktop (> 768px)
   ```

### Build & Lint
```bash
# Type-check
pnpm -r type-check

# Build
pnpm build

# Lint
pnpm lint
```

**Status**: ✅ Todos os checks passando

## 📊 Dados Mock

O endpoint `/api/pages` retorna 5 páginas de exemplo:

1. **BackOffice - Dashboard Administrativo** (`backoffice/dashboard`)
2. **BackOffice - Gestão de Usuários** (`backoffice/users`)
3. **FrontOffice - Home** (`frontoffice/home`)
4. **FrontOffice - Catálogo de Jogos** (`frontoffice/games`)
5. **Admin - Configurações** (`admin/settings`)

## 🔄 Próximos Passos (Futuros)

### Issue #55 - Health Metrics
- Adicionar indicadores de saúde das páginas
- Métricas de performance (tempo de load, erros)
- Status (publicado, rascunho, arquivado)

### Melhorias Futuras
- [ ] Implementar DELETE /api/pages/:slug (funcionalidade de deletar)
- [ ] Adicionar filtros por domínio
- [ ] Adicionar busca por título/slug
- [ ] Adicionar ordenação (data, título, domínio)
- [ ] Adicionar paginação (quando houver muitas páginas)
- [ ] Adicionar preview thumbnail (screenshot da página)
- [ ] Adicionar bulk actions (deletar múltiplas)

## 🐛 Troubleshooting

### Erro: "Failed to fetch pages"
**Causa**: Endpoint `/api/pages` não está respondendo
**Solução**:
1. Verificar se Studio está rodando: `pnpm dev:studio`
2. Testar endpoint diretamente: `curl http://localhost:3000/api/pages`
3. Verificar logs do console do Next.js

### Grid não é responsivo
**Causa**: CSS não foi carregado
**Solução**:
1. Verificar import de `page.module.css` no componente
2. Rebuildar: `pnpm build:studio`
3. Limpar cache do Next.js: `rm -rf apps/studio/.next`

### Botões não navegam
**Causa**: `useRouter` não inicializou
**Solução**:
1. Verificar que `'use client'` está no topo do arquivo
2. Verificar que componente está dentro de `<Suspense>` (se necessário)

## 📝 Checklist de Qualidade

### Funcional
- [x] Página acessível em `/studio/pages`
- [x] Loading state funcional
- [x] Error handling com retry
- [x] Renderiza lista de páginas
- [x] Exibe todas informações requeridas
- [x] Botões de ação funcionam
- [x] Responsivo (mobile, tablet, desktop)

### Técnico
- [x] TypeScript strict mode (sem erros)
- [x] ESLint passa sem erros
- [x] Build passa sem erros
- [x] Usa componentes do Design System
- [x] CSS Modules para estilos isolados
- [x] Client component com `'use client'`

### UX/Acessibilidade
- [x] Estados visuais claros (loading, error, empty, success)
- [x] Feedback de hover/focus
- [x] Mensagens de erro úteis
- [x] Navegação por teclado funcional
- [x] Suporte a dark mode (CSS media query)

## 📚 Referências

- **Issue #54**: Dashboard UI
- **Issue #53**: Dashboard API (dependência ✅)
- **Design System**: `/packages/design-system/`
- **Documentação Sprint 3**: `/SPRINT3_EXECUTION_DETAILED.md`

---

**Implementado em**: 2025-11-24  
**Sprint**: 3 (Fase 3/4)  
**Tempo Estimado**: 3h  
**Tempo Real**: ~2h
