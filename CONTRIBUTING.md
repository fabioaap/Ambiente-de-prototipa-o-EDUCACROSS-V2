# Contribuindo para EDUCACROSS Prototipação

Obrigado por seu interesse em contribuir! Este guia ajudará você a entender como trabalhar neste projeto.

## 📖 Índice

- [Estrutura do Projeto](#estrutura-do-projeto)
- [Configuração Local](#configuração-local)
- [Workflow de Desenvolvimento](#workflow-de-desenvolvimento)
- [Criando uma Jornada](#criando-uma-jornada)
- [Criando um Componente](#criando-um-componente)
- [Padrões de Código](#padrões-de-código)
- [Testando Mudanças](#testando-mudanças)
- [Abrindo Pull Requests](#abrindo-pull-requests)

---

## Estrutura do Projeto

```
.
├── domains/                   # Aplicações e Jornadas
│   ├── studio/               # Editor visual (Puck + Next.js)
│   ├── storybook/            # Documentação de componentes
│   ├── admin/                # App administrativo
│   ├── BackOffice/           # Jornadas administrativas
│   ├── FrontOffice/          # Jornadas de usuário
│   └── Game/                 # Jornadas gamificadas
├── scripts/                   # Scripts de automação
├── docs/                      # Documentação do projeto
└── eslint.config.mjs         # Configuração de linting
```

---

## Configuração Local

### Pré-requisitos

- Node.js >= 20.0.0
- pnpm >= 8.0.0 (gerenciador de pacotes)
- Git

### Instalação

```bash
# 1. Clonar o repositório
git clone https://github.com/seu-org/educacross-prototipacao.git
cd educacross-prototipacao

# 2. Instalar dependências
pnpm install

# 3. Verificar configuração
pnpm lint
pnpm build
```

---

## Workflow de Desenvolvimento

### 1. Criar Branch

```bash
# Padrão: feature/{tipo}/{descrição}
git checkout -b feature/design-system/novo-componente
git checkout -b fix/studio/corrigir-persistencia
git checkout -b docs/adicionar-guia
```

### 2. Fazer Alterações

Trabalhe normalmente com seus arquivos. O ESLint está configurado para rodar automaticamente.

### 3. Testar Localmente

```bash
# Rodar Storybook (design system)
pnpm dev:storybook
# → http://localhost:6006

# Rodar Studio (editor visual)
pnpm dev:studio
# → http://localhost:3000

# Rodar linter
pnpm lint

# Rodar build completo
pnpm build
```

### 4. Commit

```bash
# Commits devem seguir o padrão Conventional Commits
git commit -m "feat(design-system): adicionar componente Modal"
git commit -m "fix(studio): corrigir salvar página em disco"
git commit -m "docs(contributing): atualizar guia"
git commit -m "refactor(tokens): reorganizar cores"
```

### 5. Push & Pull Request

```bash
git push origin feature/design-system/novo-componente
# Abrir PR no GitHub
```

---

## Criando uma Jornada

Uma jornada é um fluxo de negócio composto de páginas no Studio e documentação.

### Template de Jornada

Referência: `domains/template-jornada.md`

### Passo a Passo

#### 1. Criar Estrutura

```bash
mkdir -p domains/{Dominio}/journeys/{nome-jornada}
cd domains/{Dominio}/journeys/{nome-jornada}
touch README.md notas.md
```

#### 2. Documentar README

Use o template:

```markdown
# Jornada: [Nome da Jornada]

## 🎯 Objetivo
[Descrição clara do objetivo]

## 📋 Contexto de Negócio
- **Para quem?** [Persona]
- **Por que é importante?** [Valor]
- **Quando será usado?** [Frequência]

## 🔗 Protótipos Relacionados
- [Página 1](http://localhost:3000/dominio/jornada/pagina1)
- [Página 2](http://localhost:3000/dominio/jornada/pagina2)

## 🧩 Componentes Utilizados
- `ComponenteX` – Descrição
- `ComponenteY` – Descrição

## 📊 Status
- **Status atual**: 🚧 Em andamento
- **Última atualização**: YYYY-MM-DD

## 💡 Decisões de Design
### Decisão 1: [Nome]
- **O que decidimos**: ...
- **Por que**: ...
- **Trade-offs**: ...

## 🔜 Próximos Passos
- [ ] Tarefa 1
- [ ] Tarefa 2

## 📎 Referências
- [Template de jornada](../../template-jornada.md)
- [Backlog](../../../docs/backlog.md)

---
**Autores**: [Nome]
**Revisores**: [Nome]
```

#### 3. Criar Páginas no Studio

```bash
# 1. Acessar http://localhost:3000/studio
# 2. Criar nova página com slug: {dominio}/{jornada}/{pagina}
# 3. Usar componentes do Design System
# 4. Salvar - arquivo criado em domains/studio/data/pages/
```

#### 4. Adicionar ao Índice

Documentar link no README do domínio:

```markdown
### Jornada: Nome da Jornada
- [📖 Documentação](./journeys/nome-jornada/README.md)
- [🎨 Studio](http://localhost:3000/dominio/jornada/lista)
```

#### 5. Atualizar Índice Automático (Opcional)

```bash
# Gera/atualiza o arquivo domains/INDEX.md com todas as jornadas
pnpm gen:journeys
```

### Exemplo Completo

Para criar uma jornada "Cadastro de Aluno" no domínio FrontOffice:

```bash
# 1. Criar estrutura
mkdir -p domains/FrontOffice/journeys/cadastro-aluno
cd domains/FrontOffice/journeys/cadastro-aluno

# 2. Copiar template
cp ../../../template-jornada.md README.md

# 3. Criar arquivo de notas
touch notas.md

# 4. Editar README.md com os dados da jornada
# (usar editor de preferência)

# 5. Criar páginas no Studio
# Acessar http://localhost:3000/studio
# Criar página com slug: frontoffice/cadastro-aluno/formulario

# 6. Atualizar índice
cd ../../../
pnpm gen:journeys

# 7. Commit
git add domains/FrontOffice/journeys/cadastro-aluno
git commit -m "feat(frontoffice): adicionar jornada cadastro-aluno"
```

---

## Criando um Componente

### ⚠️ IMPORTANTE: Verificação Pré-Issue

**ANTES** de criar uma issue para adicionar uma funcionalidade (prop) a um componente, verifique se ela já existe:

```bash
# Verificar se uma prop existe em um componente
pnpm verify-prop <ComponentName> <propName>

# Exemplos:
pnpm verify-prop DataTable cellRenderer
pnpm verify-prop Badge icon
pnpm verify-prop StatsCard trend
```

**O que este comando faz:**
- ✅ Procura a prop nas interfaces TypeScript do componente
- ✅ Mostra a linha exata onde está implementada
- ✅ Indica se a prop JÁ EXISTE ou se é uma nova funcionalidade
- ✅ Evita criação de issues duplicadas (falsos positivos)

**Quando usar:**
- Antes de criar issue solicitando nova prop
- Ao revisar backlog de componentes
- Para confirmar implementação de funcionalidade
- Durante code review de PRs

### Checklist para Criar Issue de Componente

Antes de criar uma issue solicitando nova funcionalidade:

- [ ] Executei `pnpm verify-prop <Component> <prop>` e confirmei que NÃO existe
- [ ] Verifiquei manualmente o arquivo do componente
- [ ] Consultei a documentação no Storybook
- [ ] Descrição clara do comportamento esperado
- [ ] Exemplos de uso da prop proposta

### Passo a Passo

#### 1. Criar Estrutura do Componente

```bash
# Exemplo: Criando componente Badge
cd packages/design-system/src/components
mkdir Badge
cd Badge
touch Badge.tsx Badge.module.css
```

#### 2. Implementar o Componente

Ver seção [Componentes React](#componentes-react) abaixo para template e padrões.

#### 3. Exportar o Componente

Adicionar ao arquivo `packages/design-system/src/index.ts`:

```typescript
export { Badge } from './components/Badge/Badge';
export type { BadgeProps } from './components/Badge/Badge';
```

#### 4. Criar Story no Storybook

```bash
# Criar story
touch domains/storybook/src/stories/Badge.stories.tsx
```

Ver seção [Stories no Storybook](#stories-no-storybook) abaixo para template.

#### 5. Adicionar ao Puck (Opcional)

Se o componente será usado no Studio, adicionar em `domains/studio/src/config/puck.config.tsx`:

```tsx
export const puckConfig: Config = {
  components: {
    // ... componentes existentes
    Badge: {
      fields: {
        text: { type: 'text' },
        variant: {
          type: 'select',
          options: [
            { label: 'Success', value: 'success' },
            { label: 'Warning', value: 'warning' },
            { label: 'Error', value: 'error' },
          ],
        },
      },
      render: ({ text, variant }) => (
        <Badge variant={variant}>{text}</Badge>
      ),
    },
  },
};
```

#### 6. Testar e Validar

```bash
# Build do design system
pnpm build:design-system

# Testar no Storybook
pnpm dev:storybook

# Validar no Studio (se adicionou ao Puck)
pnpm dev:studio

# Lint
pnpm lint
```

#### 7. Commit

```bash
git add packages/design-system/src/components/Badge
git add packages/design-system/src/index.ts
git add domains/storybook/src/stories/Badge.stories.tsx
git add domains/studio/src/config/puck.config.tsx  # se aplicável
git commit -m "feat(design-system): adicionar componente Badge"
```

---

## Padrões de Código

### Componentes React

```tsx
import React from 'react';
import styles from './Button.module.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Variante visual do botão */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  /** Tamanho do botão */
  size?: 'sm' | 'md' | 'lg';
  /** Se deve ocupar largura completa */
  fullWidth?: boolean;
}

/**
 * Componente Button - Botão interativo do design system
 * 
 * @example
 * <Button variant="primary" size="md">
 *   Clique aqui
 * </Button>
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', fullWidth = false, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`${styles.button} ${styles[variant]} ${styles[size]} ${fullWidth ? styles.fullWidth : ''}`}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
```

**Checklist:**
- ✅ TypeScript com tipos completos
- ✅ Props interface documentada
- ✅ forwardRef para ref forwarding
- ✅ JSDoc comments
- ✅ CSS Modules para estilos
- ✅ Acessibilidade (ARIA, teclado, foco)

### Stories no Storybook

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@prototipo/design-system';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost'],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};
```

### Tokens

Adicione tokens em `packages/tokens/src/tokens.json`:

```json
{
  "colors": {
    "brand": {
      "primary": "#3b82f6",
      "secondary": "#8b5cf6"
    }
  }
}
```

---

## Testando Mudanças

### Lint

```bash
pnpm lint
# Ou específico por workspace:
pnpm --filter design-system lint
pnpm --filter storybook lint
```

### Build

```bash
# Build tudo
pnpm build

# Build específico
pnpm build:design-system
pnpm build:storybook
pnpm build:studio
```

### Storybook Local

```bash
pnpm dev:storybook
# Acesse http://localhost:6006
```

### Studio Local

```bash
pnpm dev:studio
# Acesse http://localhost:3000
# Editor em http://localhost:3000/studio
```

---

## Abrindo Pull Requests

### Checklist Antes de Submeter

- [ ] Branch criada com nome descritivo
- [ ] Código testado localmente (`pnpm lint && pnpm build`)
- [ ] Commits seguem Conventional Commits
- [ ] README ou documentação atualizada (se necessário)
- [ ] Nenhuma quebra de funcionalidades existentes

### Convenções de Labels

O projeto usa as seguintes labels para organizar issues e PRs:

**Prioridades:**
- `priority:P0` - Crítico, bloqueante
- `priority:P1` - Alta prioridade
- `priority:P2` - Prioridade normal

**Tipos:**
- `epic` - Epic (agrupa múltiplas issues)
- `type:task` - Tarefa técnica
- `documentation` - Documentação

**Domínios:**
- `domain:BackOffice` - Jornadas administrativas
- `domain:FrontOffice` - Jornadas de usuário/aluno
- `domain:Game` - Jornadas gamificadas

**Status:**
- `status:backlog` - No backlog, não iniciado
- `status:in-progress` - Em desenvolvimento
- `status:done` - Concluído

**Outros:**
- `tooling` - Ferramentas, scripts, automação

### Template de PR

```markdown
## 📝 Descrição

Breve descrição das mudanças.

## 🎯 Motivação

Por que essas mudanças são necessárias?

## 📋 Checklist

- [ ] Testes locais passaram
- [ ] Lint/build sem erros
- [ ] Documentação atualizada
- [ ] Screenshots/videos (se UI)

## 🔗 Issues Relacionadas

Closes #123
```

---

## 🆘 Precisa de Ajuda?

- 📖 Consulte o [Backlog](docs/backlog.md)
- 🎨 Veja exemplos em [stories](domains/storybook/src/stories)
- 📁 Explore [jornadas existentes](domains/)
- 💬 Abra uma issue com perguntas

---

## 📜 Licença

Este projeto é sob licença [MIT](LICENSE).

---

**Obrigado por contribuir!** 🙏
