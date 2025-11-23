# 🧪 GUIA DE TESTES - Issue C2

## Como Testar a Implementação

### Pré-requisitos

```bash
cd /home/runner/work/Ambiente-de-prototipa-o-EDUCACROSS-V2/Ambiente-de-prototipa-o-EDUCACROSS-V2
pnpm install
```

### 1. Build e Lint (Validação Básica)

```bash
# Build de todos os pacotes
pnpm build:tokens
pnpm build:design-system
pnpm build:studio

# Lint
pnpm --filter studio lint

# ✅ Espera-se: 0 erros, 0 warnings
```

### 2. Validar Estrutura de Arquivos

```bash
# Verificar que páginas existem
ls -la apps/studio/data/pages/

# ✅ Espera-se: home.json, teste.json

# Validar JSON
node << 'EOF'
const fs = require('fs');
const files = ['home.json', 'teste.json'];
files.forEach(f => {
  const path = `apps/studio/data/pages/${f}`;
  const data = JSON.parse(fs.readFileSync(path, 'utf-8'));
  console.log(`✅ ${f}: ${data.root.props.title}`);
});
EOF

# ✅ Espera-se:
# ✅ home.json: Página Inicial
# ✅ teste.json: Página de Teste
```

### 3. Testar Lógica de Rename

```bash
# Script de teste inline
node << 'EOF'
const fs = require('fs').promises;
const path = require('path');

async function test() {
  const dir = 'apps/studio/data/pages';
  const slug = 'test-' + Date.now();
  const data = { content: [], root: { props: { title: 'Test' }}, zones: {} };
  
  // Criar
  await fs.writeFile(`${dir}/${slug}.json`, JSON.stringify(data));
  console.log('✅ Criado:', slug);
  
  // Renomear
  await fs.rename(`${dir}/${slug}.json`, `${dir}/${slug}-renamed.json`);
  console.log('✅ Renomeado:', slug + '-renamed');
  
  // Limpar
  await fs.unlink(`${dir}/${slug}-renamed.json`);
  console.log('✅ Removido');
}

test().catch(console.error);
EOF
```

### 4. Testar API (Requer Server Rodando)

⚠️ **NOTA**: Devido ao conflito de rotas `/` vs `/[[...slug]]`, o dev server pode não iniciar.

**Workaround 1: Remover página raiz temporariamente**
```bash
mv apps/studio/src/app/page.tsx apps/studio/src/app/page.tsx.bak
pnpm dev:studio
# Testar e depois restaurar:
# mv apps/studio/src/app/page.tsx.bak apps/studio/src/app/page.tsx
```

**Workaround 2: Build de produção**
```bash
pnpm build:studio
cd apps/studio
pnpm start
```

**Uma vez que o server estiver rodando:**

```bash
# GET - Listar páginas
curl http://localhost:3000/api/pages | jq

# GET - Buscar página específica
curl http://localhost:3000/api/pages/home | jq

# POST - Criar nova página
curl -X POST http://localhost:3000/api/pages \
  -H "Content-Type: application/json" \
  -d '{"slug":"test-api","data":{"content":[],"root":{"props":{"title":"Test API"}},"zones":{}}}'

# POST - Renomear
curl -X POST http://localhost:3000/api/pages/rename \
  -H "Content-Type: application/json" \
  -d '{"oldSlug":"test-api","newSlug":"test-renamed"}'

# DELETE - Remover
curl -X DELETE http://localhost:3000/api/pages/test-renamed
```

### 5. Testar Interface (Manual)

**Com o servidor rodando**, abra no navegador:

1. **Landing Page**: http://localhost:3000
   - ✅ Deve mostrar "EDUCACROSS Studio"
   - ✅ Botão "Abrir Studio"

2. **Studio sem página**: http://localhost:3000/studio
   - ✅ Sidebar à esquerda
   - ✅ Lista mostra "home" e "teste"
   - ✅ "home" está destacada (ativa)
   - ✅ Input para criar nova página no topo
   - ✅ Editor Puck à direita

3. **Studio com página**: http://localhost:3000/studio?page=teste
   - ✅ URL atualiza
   - ✅ Editor carrega conteúdo da página teste
   - ✅ "teste" fica destacada no sidebar
   - ✅ Título mostra "Página de Teste"

4. **Criar nova página**:
   - ✅ Digite "minha-pagina" no input
   - ✅ Pressione Enter ou clique [+]
   - ✅ URL muda para /studio?page=minha-pagina
   - ✅ Editor mostra template inicial
   - ✅ Faça uma edição no Puck
   - ✅ Badge "Salvando..." aparece
   - ✅ Arquivo `data/pages/minha-pagina.json` é criado

5. **Renomear página**:
   - ✅ Clique no botão ✎ ao lado de "minha-pagina"
   - ✅ Input inline aparece
   - ✅ Digite "pagina-renomeada"
   - ✅ Pressione Enter ou clique ✓
   - ✅ Lista recarrega
   - ✅ URL atualiza se necessário
   - ✅ Arquivo é renomeado no filesystem

6. **Deletar página**:
   - ✅ Clique no botão ✕ ao lado de "pagina-renomeada"
   - ✅ Confirme no diálogo
   - ✅ Página é removida da lista
   - ✅ Arquivo é deletado

7. **Mobile responsivo** (< 640px):
   - ✅ Sidebar inicialmente oculta
   - ✅ Botão ☰ no topo
   - ✅ Clique no ☰ → sidebar aparece como overlay
   - ✅ Clique fora ou no ✕ → sidebar fecha

### 6. Verificar Acessibilidade

**Keyboard Navigation**:
- Tab → deve navegar pelos elementos
- Enter → deve ativar botões/links
- Escape → deve cancelar ações

**ARIA**:
```bash
# Verificar que elementos têm aria-labels
grep -r "aria-label" apps/studio/src/components/PagesList.tsx
```

**Contraste**:
- Textos devem ser legíveis
- Botões devem ter feedback visual no hover/focus

### 7. Checklist Final

```
Funcionalidade:
  ✅ Listar páginas funciona
  ✅ Criar página funciona
  ✅ Navegar entre páginas funciona
  ✅ Editar página funciona (auto-save)
  ✅ Renomear página funciona
  ✅ Deletar página funciona

Qualidade:
  ✅ Build sem erros
  ✅ Lint sem warnings
  ✅ TypeScript strict
  ✅ Nenhum console.error em uso normal

UX:
  ✅ Feedback visual em todas ações
  ✅ Confirmações em ações destrutivas
  ✅ Loading states
  ✅ Error handling
  ✅ Responsivo mobile

Acessibilidade:
  ✅ Keyboard navigation
  ✅ ARIA labels
  ✅ Contraste adequado
  ✅ Focus visible
```

## 📊 Resultados Esperados

**Tudo deve passar** sem erros. Se algo falhar:

1. Verificar se `pnpm install` foi executado
2. Verificar versão do Node (>= 20)
3. Verificar se arquivos foram commitados corretamente
4. Consultar documentação em `C2-README.md`

## 🐛 Troubleshooting

**Dev server não inicia:**
- Conflito de rotas pré-existente
- Use workarounds acima
- Não impede funcionalidade do sidebar

**API retorna 404:**
- Verificar que arquivos existem em `data/pages/`
- Verificar permissões de escrita

**Página não carrega:**
- Verificar JSON válido
- Verificar slug correto na URL
- Verificar console do browser

## ✅ Conclusão

Se todos os testes passarem, a implementação está **100% funcional** e pronta para uso!

Para dúvidas, consulte:
- `C2-README.md` - Documentação completa
- `/tmp/RESUMO-EXECUTIVO.md` - Overview
- `/tmp/VISUAL-MOCKUP.txt` - Interface
