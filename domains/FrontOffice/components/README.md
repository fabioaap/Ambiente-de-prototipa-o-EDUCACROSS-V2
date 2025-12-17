# Front Office - Sidebar e Layout

## ✅ Implementação Completa

A sidebar do Front Office foi implementada exatamente conforme o design do Figma (node-id: 6482-6149).

## 📁 Arquitetura

```
domains/FrontOffice/components/
├── FrontOfficeSidebar/          # Componente da sidebar reutilizável
│   ├── FrontOfficeSidebar.tsx
│   ├── FrontOfficeSidebar.module.css
│   └── index.ts
└── FrontOfficeLayout/            # Layout wrapper com sidebar
    ├── FrontOfficeLayout.tsx
    ├── FrontOfficeLayout.module.css
    └── index.ts
```

## 🎨 Componentes

### FrontOfficeSidebar

Sidebar de navegação com:
- **Header roxo** com ícone de grade + "Painel Inicial"
- **7 itens de menu:**
  1. 📊 Relatórios Gerais (com seta →)
  2. 🚩 Missões da Escola (com seta →)
  3. 📚 Sistema de Ensino
  4. 📅 Eventos
  5. 📖 Expedição Leitura
  6. 👥 Cadastros (com seta →)
  7. ⬇️ Ajudas e Materiais

**Props:**
- `activeRoute?: string` - Rota ativa para highlight
- `className?: string` - Classes CSS customizadas

### FrontOfficeLayout

Layout wrapper que inclui a sidebar + área de conteúdo.

**Props:**
- `children: React.ReactNode` - Conteúdo da página
- `activeRoute?: string` - Rota ativa para highlight
- `className?: string` - Classes CSS customizadas

## 📖 Como Usar

### Opção 1: Usar o Layout Completo (Recomendado)

```tsx
'use client';

import { FrontOfficeLayout } from '../../../../FrontOffice/components/FrontOfficeLayout';

export default function MinhaPage() {
  return (
    <FrontOfficeLayout activeRoute="/frontoffice/minha-rota">
      <h1>Minha Página</h1>
      <p>Conteúdo aqui...</p>
    </FrontOfficeLayout>
  );
}
```

### Opção 2: Usar Sidebar Standalone

```tsx
'use client';

import { FrontOfficeSidebar } from '../../../../FrontOffice/components/FrontOfficeSidebar';
import styles from './page.module.css';

export default function MinhaPage() {
  return (
    <div className={styles.container}>
      <FrontOfficeSidebar activeRoute="/frontoffice/minha-rota" />
      <main className={styles.content}>
        <h1>Minha Página</h1>
      </main>
    </div>
  );
}
```

## 🎯 Padrões de Design

### Cores
- **Header:** Gradiente roxo (`#7C3AED` → `#6366F1`)
- **Background:** Branco (`#ffffff`)
- **Texto:** Cinza escuro (`#4B5563`)
- **Hover:** Cinza claro (`#F3F4F6`)
- **Ativo:** Azul claro (`#EEF2FF`) com barra roxa

### Tipografia
- **Header:** 18px, peso 600
- **Menu items:** 15px, peso 500

### Espaçamento
- **Padding sidebar:** 24px 16px
- **Gap entre items:** 4px
- **Padding items:** 16px 20px

### Responsividade
- **Desktop:** Sidebar 260px de largura
- **Tablet (≤768px):** Sidebar full width, layout vertical
- **Mobile (≤480px):** Espaçamentos reduzidos

## 🔗 Navegação

A sidebar redireciona para as seguintes rotas:

| Item | Rota | Status |
|------|------|--------|
| Painel Inicial | `/frontoffice/painel-inicial` | ✅ Implementado |
| Relatórios Gerais | `/frontoffice/relatorios` | ⏳ Pendente |
| Missões da Escola | `/frontoffice/missoes` | ⏳ Pendente |
| Sistema de Ensino | `/frontoffice/sistema-ensino` | ⏳ Pendente |
| Eventos | `/frontoffice/eventos` | ⏳ Pendente |
| Expedição Leitura | `/frontoffice/expedicao-leitura` | ⏳ Pendente |
| Cadastros | `/frontoffice/cadastros` | ⏳ Pendente |
| Ajudas e Materiais | `/frontoffice/ajudas` | ⏳ Pendente |

## 📝 Notas de Implementação

1. **Design Fiel:** Implementação pixel-perfect do Figma
2. **Acessibilidade:** Botões semânticos, navegação por teclado
3. **Performance:** CSS Modules para estilos isolados
4. **Manutenibilidade:** Componentes reutilizáveis e bem documentados
5. **Responsividade:** Adaptável para desktop, tablet e mobile

## 🚀 Próximos Passos

Para adicionar uma nova página do Front Office:

1. Criar rota em `domains/studio/src/app/frontoffice/{rota}/page.tsx`
2. Importar `FrontOfficeLayout`
3. Passar `activeRoute` correspondente
4. Adicionar conteúdo dentro do layout

**Exemplo:**

```tsx
'use client';

import { FrontOfficeLayout } from '../../../../../FrontOffice/components/FrontOfficeLayout';

export default function RelatóriosPage() {
  return (
    <FrontOfficeLayout activeRoute="/frontoffice/relatorios">
      <h1>Relatórios Gerais</h1>
      {/* Seu conteúdo aqui */}
    </FrontOfficeLayout>
  );
}
```

## ✅ Checklist de Qualidade

- [x] Design matching Figma (node 6482-6149)
- [x] Componentes reutilizáveis
- [x] CSS Modules para isolamento
- [x] TypeScript strict mode
- [x] Props tipadas com interfaces
- [x] React.forwardRef para refs
- [x] Responsividade completa
- [x] Navegação funcional
- [x] Documentação completa
- [x] Exemplos de uso

## 🔗 Links Relacionados

- **Design Figma:** https://www.figma.com/design/5MQ9H24Zojzd8jcnHO61lK/-Front-Office--Pain%C3%A9is-Iniciais?node-id=6482-6149
- **Página de Exemplo:** [domains/studio/src/app/frontoffice/painel-inicial/page.tsx](../../../studio/src/app/frontoffice/painel-inicial/page.tsx)
