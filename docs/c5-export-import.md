# C5 – Studio: Export/Import de Páginas

**Status**: ✅ Implementado  
**Branch**: `feature/c5-export-import`  
**Data**: 2025-11-20

## Descrição

Implementação de funcionalidade de export/import de páginas no Studio, permitindo backup, compartilhamento e migração de páginas entre projetos.

## O que foi implementado

### 1. API Endpoints

#### GET `/api/pages/export`
- Exporta todas as páginas como JSON
- Metadados: timestamp, versão, total de páginas
- Suporta parâmetro `format=json` (futura suporte a ZIP)

**Resposta**:
```json
{
  "exportedAt": "2025-11-20T19:30:00Z",
  "version": "1.0.0",
  "totalPages": 5,
  "pages": {
    "página-1": { ... },
    "página-2": { ... }
  }
}
```

#### POST `/api/pages/import`
- Importa páginas de arquivo JSON
- Dois modos:
  - `merge` (padrão): Adiciona páginas, preserva existentes
  - `replace`: Deleta todas as páginas antes de importar
- Sanitização de slugs automática
- Relatório detalhado de importação

**Request**:
```json
{
  "mode": "merge",
  "pages": { ... }
}
```

**Resposta**:
```json
{
  "success": true,
  "message": "Import completed: 3 imported, 0 skipped, 0 errors",
  "results": {
    "imported": 3,
    "skipped": 0,
    "errors": 0,
    "details": [ ... ]
  }
}
```

### 2. UI Component: `ExportImport.tsx`

React component com:
- Botão de export (download JSON)
- Upload de arquivo para import
- Seletor de modo (merge/replace)
- Mensagens de feedback (sucesso/erro)
- Acessibilidade: roles ARIA, labels
- Responsivo (mobile-friendly)
- Estados de loading

**Uso**:
```tsx
import { ExportImport } from '@/components/ExportImport';

export default function StudioPage() {
  return (
    <ExportImport 
      onImportComplete={() => {
        // Atualizar lista de páginas
        refetchPages();
      }}
    />
  );
}
```

### 3. Estilos: `ExportImport.module.css`

- Design consistente com DS (tokens CSS)
- Animações suaves (slideIn para mensagens)
- Estados visuais (disabled, hover)
- Paleta de cores: primária, sucesso, erro
- Responsivo (breakpoint 640px)

## Critério de Aceitação

- [x] API export endpoint implementado
- [x] API import endpoint implementado
- [x] UI component com export/import
- [x] Modo merge vs replace funcionando
- [x] Sanitização de slugs
- [x] Relatório detalhado de importação
- [x] Acessibilidade (ARIA labels, roles)
- [x] Mensagens de feedback (sucesso/erro)
- [x] Responsive design
- [x] Lint e build passando

## Como Usar

### Exportar páginas

```bash
curl http://localhost:3000/api/pages/export?format=json > backup.json
```

Ou usar a UI do Studio para download.

### Importar páginas

```bash
curl -X POST http://localhost:3000/api/pages/import \
  -H "Content-Type: application/json" \
  -d @backup.json
```

Ou usar a UI do Studio para fazer upload.

### Integrar na página do Studio

1. Abrir `domains/studio/src/app/studio/page.tsx`
2. Importar component:

```tsx
import { ExportImport } from '@/components/ExportImport';
```

3. Adicionar na página:

```tsx
<ExportImport onImportComplete={refetchPages} />
```

## Próximos Passos (Sprint 3+)

- [ ] **C5b**: Suporte a ZIP export (usar `archiver` ou `jszip`)
- [ ] **C5c**: Validação de schema na importação
- [ ] **C5d**: Backup automático periódico
- [ ] **C5e**: Histórico de versões/snapshots
- [ ] **H4**: Dashboard mostrando tamanho de backups

## Dependências

- **C1**: ✅ API de persistência (já existe)
- **C2**: ✅ Sidebar com lista de páginas (já existe)
- Nenhuma dependência adicional necessária para funcionalidade básica

## Arquivos Criados/Modificados

```
domains/studio/src/app/api/pages/
├── export/
│   └── route.ts (novo - 43 linhas)
└── import/
    └── route.ts (novo - 108 linhas)

domains/studio/src/components/
├── ExportImport.tsx (novo - 147 linhas)
└── ExportImport.module.css (novo - 130 linhas)

docs/
└── c5-export-import.md (novo - esta documentação)
```

## Validações Realizadas

- Lint: ✅ ESLint passed
- Build: ✅ Studio build passed
- Tipos: ✅ TypeScript strict mode
- Acessibilidade: ✅ ARIA labels, keyboard nav

## Referências

- **Backlog**: `docs/backlog.md` (Epic C – Studio)
- **API Pattern**: `domains/studio/src/app/api/pages/route.ts`
- **TypeScript**: Strict mode, no implicit any

---

**Status**: ✅ PRONTO PARA MERGE  
**Revisor**: Aguardando PR review  
**Merge para**: `main`

**Última atualização**: 2025-11-20  
**Próxima tarefa**: G5 (Link Validation) em paralelo
