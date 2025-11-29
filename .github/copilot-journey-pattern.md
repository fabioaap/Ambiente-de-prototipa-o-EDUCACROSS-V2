# Padrão de Criação de Jornadas - EDUCACROSS

> 🎯 Guia oficial para criação de novas jornadas no projeto EDUCACROSS

## 📂 Estrutura de Diretórios

Todas as jornadas devem seguir este padrão:

```
domains/{Dominio}/journeys/{nome-da-jornada}/
├── README.md              # Documentação completa da jornada
├── links.md              # Referências externas (Figma, APIs, etc)
├── notas.md              # Anotações técnicas de desenvolvimento
├── page.tsx              # Código React da página (Next.js App Router)
└── [outros arquivos]     # Mocks, assets, etc necessários
```

## 🔗 Link Simbólico para Next.js

Para que o Next.js reconheça a página, crie um link simbólico:

```bash
# Padrão de comando
mkdir -p domains/studio/src/app/{dominio}/{nome-da-jornada}
ln -sf /workspaces/Ambiente-de-prototipa-o-EDUCACROSS-V2/domains/{Dominio}/journeys/{nome-da-jornada}/page.tsx \
       domains/studio/src/app/{dominio}/{nome-da-jornada}/page.tsx
```

### Exemplo Real (Jornada Exibir Campo USO):

```bash
mkdir -p domains/studio/src/app/backoffice/exibir-campo-uso
ln -sf /workspaces/Ambiente-de-prototipa-o-EDUCACROSS-V2/domains/BackOffice/journeys/exibir-campo-uso/page.tsx \
       domains/studio/src/app/backoffice/exibir-campo-uso/page.tsx
```

## 📝 Estrutura do README.md

Cada jornada deve incluir:

1. **Objetivo**: Propósito claro da jornada
2. **Contexto de Negócio**: Para quem? Por quê? Quando?
3. **Status**: Checklist de progresso
4. **Estrutura da Jornada**: Seção explicando os arquivos
5. **Fluxo da Jornada**: Etapas e mudanças necessárias
6. **Estratégia de Prototipagem**: Dados simulados, mocks
7. **Componentes Utilizados**: Do Design System
8. **Data Model**: Estrutura de dados TypeScript
9. **Design Tokens**: Referências do Figma
10. **Protótipos Relacionados**: Links para páginas
11. **Critérios de Aceitação**: Checklist de validação
12. **Dependências & Bloqueadores**: O que está bloqueando
13. **Validação & Testes**: Como testar
14. **Quick Start**: Comandos para desenvolver

## 🎨 Integração com Figma

Quando houver design no Figma:

1. **Configurar MCP Figma** (se ainda não configurado)
2. **Extrair tokens** do frame específico
3. **Documentar** no `links.md`:
   ```markdown
   ### Figma
   - **Arquivo Principal**: [Nome](https://www.figma.com/file/{fileId})
   - **Frame/Node ID**: `{nodeId}`
   - **Design Tokens**: Extraídos via MCP Figma Server
   ```

## 💾 Dados Mock

Para prototipagem, inclua dados inline no `page.tsx` ou em arquivo separado na mesma pasta:

```typescript
// Inline (recomendado para evitar problemas de path)
const mockData = {
  items: [...],
  metadata: {...}
};

// Ou arquivo separado (se necessário)
import mockData from './data-mock.json';
```

## 🔧 Template de page.tsx

```typescript
'use client';

import React, { useState } from 'react';
import { Card, Badge, Button, Text } from '@prototipo/design-system';

// Mock data inline
const mockData = {
  // ... seus dados aqui
};

export default function NomeDaJornadaPage() {
  const [state, setState] = useState(/* ... */);
  
  return (
    <div className="p-8 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col gap-2">
        <Text as="h1" size="3xl" weight="bold">
          Título da Página
        </Text>
        <Text className="text-gray-500">
          Descrição breve
        </Text>
      </div>

      {/* Seu conteúdo aqui */}
    </div>
  );
}
```

## ✅ Checklist de Criação

Ao criar uma nova jornada, assegure:

- [ ] Pasta criada em `domains/{Dominio}/journeys/{nome-da-jornada}/`
- [ ] README.md completo com todas as seções
- [ ] links.md com referências do Figma e APIs
- [ ] notas.md com observações técnicas
- [ ] page.tsx com código React funcional
- [ ] Mock data inline ou em arquivo local
- [ ] Link simbólico criado em `domains/studio/src/app/`
- [ ] Build testado: `pnpm --filter studio build`
- [ ] Página acessível: `http://localhost:3000/{dominio}/{jornada}`
- [ ] Componentes do Design System utilizados
- [ ] Tokens do Figma extraídos (se aplicável)

## 🚀 Comandos Úteis

```bash
# Criar estrutura de jornada
mkdir -p domains/{Dominio}/journeys/{nome-da-jornada}
cd domains/{Dominio}/journeys/{nome-da-jornada}
touch README.md links.md notas.md page.tsx

# Criar link simbólico
mkdir -p domains/studio/src/app/{dominio}/{nome-da-jornada}
ln -sf $(pwd)/page.tsx domains/studio/src/app/{dominio}/{nome-da-jornada}/page.tsx

# Testar build
pnpm --filter studio build

# Dev server
pnpm dev:studio
```

## 📚 Referências

- [Copilot Instructions](./.github/copilot-instructions.md)
- [Design System](../packages/design-system)
- [Puck Config](../domains/studio/src/config/puck.config.tsx)
- [Jornada Exemplo: Exibir Campo USO](../domains/BackOffice/journeys/exibir-campo-uso)

---

**Última atualização**: 28 de novembro de 2025  
**Versão**: 1.0  
**Autor**: GitHub Copilot + Fabio
