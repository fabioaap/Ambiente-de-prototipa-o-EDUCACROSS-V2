# Contribuindo para EDUCACROSS Prototipação

Obrigado por seu interesse em contribuir! Este guia ajudará você a entender como trabalhar neste projeto.

## 📖 Índice

- [Estrutura do Projeto](#estrutura-do-projeto)
- [Configuração Local](#configuração-local)
- [Workflow de Desenvolvimento](#workflow-de-desenvolvimento)
- [Criando uma Jornada](#criando-uma-jornada)
- [Padrões de Código](#padrões-de-código)
- [Testando Mudanças](#testando-mudanças)
- [Abrindo Pull Requests](#abrindo-pull-requests)

---

## Estrutura do Projeto

```
.
├── apps/                      # Aplicações (Next.js, Storybook)
│   ├── studio/               # Editor visual (Puck + Next.js)
│   ├── storybook/            # Documentação de componentes
│   └── data/pages/           # Páginas persistidas do Studio
├── packages/                  # Pacotes compartilhados
│   ├── tokens/               # Design tokens (cores, tipografia, etc.)
│   └── design-system/        # Componentes React
├── domains/                   # Jornadas de negócio
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

- Node.js 22 LTS ([nvm](https://github.com/nvm-sh/nvm) recomendado)
- pnpm 9.14.4+ (`npm install -g pnpm`)
- Git

### Instalação

```bash
# 1. Clonar o repositório
git clone https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2.git
cd Ambiente-de-prototipa-o-EDUCACROSS-V2

# 2. Ativar versão correta do Node (se usando nvm)
nvm use  # usa .nvmrc

# 3. Instalar dependências
pnpm install

# 4. Verificar configuração
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
# 4. Salvar - arquivo criado em apps/studio/data/pages/
```

#### 4. Adicionar ao Índice

Documentar link no README do domínio:

```markdown
### Jornada: Nome da Jornada
- [📖 Documentação](./journeys/nome-jornada/README.md)
- [🎨 Studio](http://localhost:3000/dominio/jornada/lista)
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
- 🎨 Veja exemplos em [stories](apps/storybook/src/stories)
- 📁 Explore [jornadas existentes](domains/)
- 💬 Abra uma issue com perguntas

### Troubleshooting Comum

#### Erro: "Cannot find module @measured/puck"
```bash
pnpm install
pnpm build:tokens
pnpm build:design-system
```

#### Erro: Port 3000 já em uso
```bash
# Encontrar processo
lsof -i :3000
# Ou no Windows:
# netstat -ano | findstr :3000

# Matar processo (Unix/Mac)
kill -9 <PID>
# Ou no Windows:
# taskkill /PID <PID> /F

# Alternativa: usar npx kill-port
npx kill-port 3000
```

#### Erro: Port 6006 já em uso (Storybook)
```bash
npx kill-port 6006
```

#### Erro: Eslint config not found
```bash
# Remover node_modules e reinstalar
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

#### Erro: Build falha em design-system
```bash
# Rebuildar tokens primeiro
pnpm build:tokens
# Depois design-system
pnpm build:design-system
```

#### Erro: Type errors em TypeScript
```bash
# Verificar tipos específicos
pnpm -r type-check

# Limpar cache TypeScript
rm -rf packages/*/tsconfig.tsbuildinfo
pnpm build
```

---

## 📜 Licença

Este projeto é sob licença [MIT](LICENSE).

---

**Obrigado por contribuir!** 🙏
