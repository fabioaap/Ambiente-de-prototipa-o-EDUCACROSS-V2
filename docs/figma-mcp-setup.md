# Figma MCP Setup - Sincronização de Tokens

## Visão Geral

Este documento descreve o processo de sincronização de tokens de design do Figma para o sistema de tokens do EDUCACROSS V2. A sincronização é realizada através de um script automatizado que garante que os tokens são importados programaticamente (não via copy-paste manual), conforme exigido pela especificação de consolidação do Design System.

## Arquitetura

### Componentes

1. **`.mcp/figma-server-config.json`** - Arquivo de configuração contendo:
   - `figmaToken`: Referência ao token de acesso do Figma (via variável de ambiente)
   - `fileId`: ID do arquivo Figma (Sz4z0rpDmocXZ8LylxEgqF)
   - `nodeId`: ID do frame de referência (8565:17355 - Vuexy BackOffice Theme)
   - `syncTarget`: Caminho do arquivo de tokens de destino

2. **`scripts/sync-figma-tokens.mjs`** - Script Node.js que:
   - Lê a configuração do MCP
   - Importa tokens do Figma Frame 8565:17355 (Vuexy theme)
   - Mescla com tokens existentes preservando estrutura
   - Define metadata `importedViaMCP: true` para validação CI
   - Gera arquivo `packages/tokens/src/tokens.json` atualizado

3. **`pnpm sync:figma`** - Comando npm para executar a sincronização

## Setup Inicial

### 1. Obter Token de Acesso do Figma

1. Acesse https://www.figma.com/settings/personal_tokens
2. Clique em "Create new token"
3. Dê um nome descritivo (ex: "EDUCACROSS V2 Token Sync")
4. Copie o token gerado (você não poderá vê-lo novamente!)

### 2. Configurar Variável de Ambiente

Crie um arquivo `.env.local` na raiz do projeto (este arquivo é ignorado pelo git):

```bash
FIGMA_ACCESS_TOKEN=seu_token_aqui
```

**IMPORTANTE**: Nunca commite o token diretamente no código ou em arquivos versionados.

### 3. Executar Sincronização

```bash
pnpm sync:figma
```

Saída esperada:
```
🎨 Syncing Figma tokens...

📋 Config loaded from .mcp/figma-server-config.json
   File ID: Sz4z0rpDmocXZ8LylxEgqF
   Node ID: 8565:17355

📦 Existing tokens loaded

✅ Tokens synced successfully!
   Output: packages/tokens/src/tokens.json
   Primary color: #7367f0 (Vuexy purple)
   BackOffice badges: 5 defined
   Metadata: importedViaMCP = true

🔧 Next steps:
   1. Run: pnpm build:tokens
   2. Verify CSS variables in packages/tokens/dist/tokens.css
   3. Update components to use new Vuexy colors
```

### 4. Construir Tokens

Após a sincronização, execute:

```bash
pnpm build:tokens
```

Isso gera o arquivo `packages/tokens/dist/tokens.css` com as CSS variables.

## Tokens Importados

### Vuexy Theme (Frame 8565:17355)

#### Cores Primárias
- **Primary (Roxo Vuexy)**: `#7367f0` (substituiu o azul Tailwind `#3b82f6`)
- **Secondary**: `#8a7daa`
- **Success**: `#22c55e`
- **Warning**: `#f59e0b`
- **Error**: `#ef4444`
- **Info**: `#3b82f6`
- **Neutral**: Escala de cinzas de 50 a 900

#### BackOffice Colors

**Redes Educacionais**:
- `canoas`: `#FF6B6B`
- `portoAlegre`: `#4ECDC4`
- `gravatai`: `#FFE66D`

**Badges de Componentes Curriculares**:
- `efobmaos`: `#7367F0` (Educação Física e Obras de Mãos)
- `d6`: `#FF9F43` (Disciplina 6)
- `avaliacao`: `#28C76F`
- `quiz`: `#EA5455`
- `expedicao`: `#00CFE8`

#### Outras Propriedades
- **Spacing**: Escala 8-point grid (0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24)
- **Typography**: Font families, sizes, weights, line heights
- **Border Radius**: none, sm, base, md, lg, xl, 2xl, full
- **Shadows**: sm, base, md, lg, xl, 2xl

## Uso nos Componentes

### CSS Modules

Os componentes do design system devem referenciar as CSS variables:

```css
/* Button.module.css */
.button {
  background-color: var(--colors-primary-500); /* Vuexy purple */
  color: white;
  padding: var(--spacing-2) var(--spacing-4);
  border-radius: var(--borderRadius-md);
}

.button:hover {
  background-color: var(--colors-primary-600);
}
```

### Badges

```css
/* Badge.module.css */
.badge-efobmaos {
  background-color: var(--backoffice-colors-badges-efobmaos);
}

.badge-d6 {
  background-color: var(--backoffice-colors-badges-d6);
}
```

## Validação CI

O workflow `.github/workflows/mcp-token-validation.yml` valida que:

1. O arquivo `packages/tokens/src/tokens.json` existe
2. A propriedade `metadata.importedViaMCP` é `true`
3. A cor primária é `#7367f0` (Vuexy purple, não Tailwind blue)

Se a validação falhar, o build do CI é bloqueado.

## Re-sync de Tokens

### Quando Re-sincronizar?

Execute `pnpm sync:figma` quando:
- Designers atualizarem o Frame 8565:17355 no Figma
- Novas cores forem adicionadas ao theme Vuexy
- Tokens de BackOffice precisarem ser expandidos

### Processo de Re-sync

1. Designers notificam mudanças no Frame 8565:17355
2. Execute `pnpm sync:figma`
3. Execute `pnpm build:tokens`
4. Verifique diff em `packages/tokens/src/tokens.json`
5. Execute `pnpm build` para validar impacto nos componentes
6. Commit e abra PR com título: "feat(tokens): sync Figma tokens from frame 8565:17355"

## Troubleshooting

### Erro: "FIGMA_ACCESS_TOKEN not found"

**Solução**: Configure a variável de ambiente conforme seção "Setup Inicial".

### Erro: "Figma API returned 404"

**Solução**: Verifique se o `fileId` e `nodeId` em `.mcp/figma-server-config.json` estão corretos.

### Tokens não mudaram após sync

**Solução**: 
1. Verifique se `pnpm build:tokens` foi executado após o sync
2. Force rebuild: `rm -rf packages/tokens/dist && pnpm build:tokens`

### Primary color ainda é azul (#3b82f6)

**Solução**:
1. Verifique `packages/tokens/src/tokens.json` - deve ter `"500": "#7367f0"` em `colors.primary`
2. Execute `pnpm build:tokens`
3. Verifique `packages/tokens/dist/tokens.css` - deve ter `--colors-primary-500: #7367f0`
4. Certifique-se de que componentes importam `@prototipo/tokens/dist/tokens.css`

## Referências

- **Figma Frame**: https://www.figma.com/file/Sz4z0rpDmocXZ8LylxEgqF?node-id=8565-17355
- **Spec de Consolidação**: `specs/002-design-system-consolidation/spec.md`
- **Constitution**: `.specify/memory/constitution.md` (v1.1.0)
- **Amendment Shadcn**: `specs/amendments/CONST-2025-11-28-001-shadcn-scope.md`

## Histórico de Versões

- **v0.2.0** (2025-11-29): Setup inicial do MCP com tokens Vuexy
  - Primary color migrado de #3b82f6 (Tailwind blue) para #7367f0 (Vuexy purple)
  - Adicionadas cores BackOffice (redes + badges)
  - Metadata `importedViaMCP: true` configurada
