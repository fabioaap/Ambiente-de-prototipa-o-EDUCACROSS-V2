# 📘 Guia Completo: Criar Jornadas com VSCode & Cursor + Assistentes de IA

**Versão**: 1.0  
**Última atualização**: Dezembro 2025  
**Público-alvo**: Product Managers, Designers, e não-desenvolvedores

---

## 🎯 Introdução

### Objetivo deste Guia

Este guia ensina **Product Managers e Designers** a criar e validar novas jornadas de prototipagem no repositório EDUCACROSS usando **VSCode** ou **Cursor**, com o apoio de assistentes de IA como **GitHub Copilot**, **ChatGPT**, ou **Cursor AI**.

Você não precisa ser desenvolvedor! Este guia é passo-a-passo e inclui comandos e prompts prontos para copiar e colar.

### Para Quem é Este Guia?

- ✅ **Product Managers** que querem prototipar fluxos e validar requisitos
- ✅ **Designers** que querem criar e testar jornadas de usuário
- ✅ **Stakeholders técnicos** que querem contribuir com documentação
- ✅ Qualquer pessoa que quer aprender a usar IA para acelerar prototipagem

### O Que Você Vai Aprender?

1. Como criar jornadas no repositório (estrutura de pastas e arquivos)
2. Como usar o Studio (editor visual Puck) e o Storybook (catálogo de componentes)
3. Como usar assistentes de IA (Copilot, ChatGPT, Cursor) para gerar código e documentação
4. Templates prontos para copiar e colar (README, notas, PRs)
5. Como validar e pedir ajustes aos desenvolvedores

---

## 🗺️ Visão Geral da Estrutura de Jornadas

### Onde Criar Jornadas?

No repositório EDUCACROSS, todas as jornadas ficam organizadas dentro de **domínios**:

\`\`\`
domains/
├── BackOffice/       # Jornadas administrativas (gestão, curadoria)
│   └── journeys/
│       └── nome-da-jornada/
├── FrontOffice/      # Jornadas de usuários finais (alunos, professores)
│   └── journeys/
│       └── nome-da-jornada/
└── Game/             # Jornadas de gamificação (desafios, conquistas)
    └── journeys/
        └── nome-da-jornada/
\`\`\`

### Estrutura de Uma Jornada

Cada jornada deve conter:

\`\`\`
domains/{dominio}/journeys/nome-da-jornada/
├── README.md           # Documento principal (obrigatório)
├── notas.md            # Decisões de UX e alternativas (obrigatório)
├── diagramas/          # Fluxos, wireframes (opcional)
└── referencias/        # Screenshots, links, imagens (opcional)
\`\`\`

### Descrição dos Arquivos

| Arquivo | Descrição |
|---------|-----------|
| **README.md** | Objetivo da jornada, contexto de negócio, protótipos, componentes usados, status |
| **notas.md** | Decisões de design, alternativas consideradas, trade-offs |
| **diagramas/** | Fluxogramas, wireframes, user flows (PNG, SVG, Mermaid) |
| **referencias/** | Screenshots, links externos, materiais de apoio |

---

## 🔧 Pré-requisitos

### Ferramentas Necessárias

Antes de começar, você precisa ter instalado:

#### 1. Node.js 22 LTS
\`\`\`bash
# Instalar nvm (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Instalar Node 22 LTS
nvm install 22.21.1
nvm use 22.21.1

# Verificar versão
node --version  # Deve mostrar v22.21.1
\`\`\`

#### 2. pnpm (gerenciador de pacotes)
\`\`\`bash
# Instalar pnpm globalmente
npm install -g pnpm

# Verificar versão
pnpm --version  # Deve mostrar 9.14.4 ou superior
\`\`\`

#### 3. VSCode ou Cursor

- **VSCode**: [Download aqui](https://code.visualstudio.com/)
- **Cursor**: [Download aqui](https://cursor.sh/)

#### 4. Acesso ao Repositório

- Permissão de leitura/escrita no repositório GitHub
- Git instalado e configurado
- Autenticação GitHub (SSH ou HTTPS)

\`\`\`bash
# Verificar Git
git --version

# Clonar o repositório
git clone https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2.git
cd Ambiente-de-prototipa-o-EDUCACROSS-V2
\`\`\`

### Ambientes Disponíveis

Você vai usar estas ferramentas online durante o processo:

- **🎨 Studio (Editor Visual)**: [educacross-studio.vercel.app](https://educacross-studio.vercel.app)
- **📚 Storybook (Catálogo de Componentes)**: [educacross-storybook.vercel.app](https://educacross-storybook.vercel.app)

Ou localmente:
- **Studio Local**: http://localhost:3000
- **Storybook Local**: http://localhost:6006

---

## 🚀 Configuração do Ambiente Local

### Passo 1: Instalar Dependências

\`\`\`bash
# Na raiz do repositório
cd Ambiente-de-prototipa-o-EDUCACROSS-V2

# Usar a versão correta do Node
nvm use

# Instalar todas as dependências
pnpm install --frozen-lockfile
\`\`\`

**Tempo esperado**: 2-5 minutos

### Passo 2: Rodar o Studio (Editor Visual)

\`\`\`bash
# Iniciar o Studio
pnpm dev:studio

# Aguardar mensagem:
# ✓ Ready on http://localhost:3000
\`\`\`

Abra seu navegador em: **http://localhost:3000**

### Passo 3: Rodar o Storybook (Catálogo de Componentes)

Em **outro terminal**:

\`\`\`bash
# Iniciar o Storybook
pnpm dev:storybook

# Aguardar mensagem:
# ✓ Storybook ready on http://localhost:6006
\`\`\`

Abra seu navegador em: **http://localhost:6006**

### Passo 4: Validar Instalação

\`\`\`bash
# Executar build completo (deve passar sem erros)
pnpm build

# Executar lint (verificação de código)
pnpm lint

# Executar type-check
pnpm -r type-check
\`\`\`

Se todos os comandos passarem ✅, você está pronto!

---

## 📝 Guia Passo-a-Passo: Criar Jornada Manualmente (Sem IA)

### Cenário Exemplo

Vamos criar uma jornada chamada **"Revisão de Questões"** no domínio **BackOffice**.

### Passo 1: Criar Estrutura de Pastas

\`\`\`bash
# Navegar até o domínio
cd domains/BackOffice/journeys

# Criar pasta da jornada
mkdir revisao-questoes
cd revisao-questoes

# Criar arquivos obrigatórios
touch README.md
touch notas.md

# Criar pastas opcionais
mkdir diagramas
mkdir referencias
\`\`\`

### Passo 2: Preencher README.md

Copie e cole este template no arquivo `README.md`:

```markdown
# [Nome da Jornada]

## 🎯 Objetivo

Descreva brevemente o objetivo desta jornada (1-2 frases). O que queremos validar ou construir?

**Exemplo**: _Validar o fluxo de revisão de questões por educadores, desde a listagem de pendências até a aprovação/rejeição de questões enviadas._

## 📋 Contexto de Negócio

- **Para quem?** (persona, papel)
- **Por que é importante?** (problema a resolver, valor gerado)
- **Quando será usado?** (frequência, momento no fluxo)

**Exemplo**:
- **Para quem?** Educadores responsáveis pela curadoria de conteúdo.
- **Por que?** Garantir qualidade das questões antes de publicação; reduzir retrabalho.
- **Quando?** Diariamente, ao revisar novas submissões.

## 🔗 Protótipos Relacionados

Liste os links para as páginas criadas no Studio:

- [Página Inicial da Jornada](http://localhost:3000/path-da-pagina)
- [Página de Detalhe](http://localhost:3000/path-detalhe)
- [Página de Confirmação](http://localhost:3000/path-confirmacao)

## 🧩 Componentes Utilizados

Liste os componentes do Design System utilizados nesta jornada:

- `Button` - Para ações principais (aprovar, rejeitar)
- `Card` - Para organização de conteúdo (lista de questões)
- `Text` - Para tipografia (títulos, labels)
- `Layout` - Container responsivo

**Componentes novos necessários** (se aplicável):
- [ ] `StatusBadge` - Para exibir status das questões
- [ ] `ConfirmDialog` - Para confirmação de ações críticas

## 📊 Status

<!-- Escolha um: -->
- 📋 **Planejamento** - Jornada em fase de descoberta/especificação
- 🚧 **Em andamento** - Prototipagem ativa
- ✅ **Concluído** - Validado e pronto para próxima fase
- 🗄️ **Arquivado** - Não será continuado ou foi substituído

**Status atual**: 🚧 Em andamento

**Última atualização**: [Data]

## 💡 Decisões de Design

Documente as principais decisões e suas motivações:

### Decisão 1: [Título da decisão]
- **O que decidimos**: [Descrição da escolha feita]
- **Por que**: [Motivação, problema resolvido]
- **Alternativas consideradas**: [Outras opções avaliadas]
- **Trade-offs**: [Prós e contras]

**Exemplo**:
### Decisão 1: Uso de Cards para lista de questões
- **O que decidimos**: Exibir cada questão pendente como um Card com preview do enunciado, status e ações rápidas.
- **Por que**: Facilita scanning visual; permite ações inline sem navegação.
- **Alternativas consideradas**: Tabela tradicional (descartada por ser menos visual); lista simples (menos espaço para ações).
- **Trade-offs**: Cards ocupam mais espaço vertical, mas melhoram usabilidade.

## 📝 Notas Adicionais

_(Opcional: adicione observações, insights de testes, feedback de stakeholders)_

- Observação 1: [Descrição]
- Observação 2: [Descrição]

## 🔜 Próximos Passos

- [ ] Validar fluxo com stakeholders (PM, Design)
- [ ] Testes com usuários reais
- [ ] Implementar componentes faltantes
- [ ] Ajustar layout responsivo para mobile
- [ ] Documentar no Storybook os componentes novos
- [ ] Integrar com backend (quando disponível)

## 📎 Referências

_(Opcional: links para Figma, benchmarks, documentos de requisitos)_

- [Link para Figma](#)
- [Benchmark: Plataforma X](#)
- [Documento de Requisitos](#)

---

**Autores**: [Nome(s)]  
**Revisores**: [Nome(s)]  
**Data de criação**: [Data]
```

### Passo 3: Preencher notas.md

Copie e cole este template no arquivo `notas.md`:

```markdown
# Notas de Design/UX — [Nome da Jornada]

**Data de criação**: [Data]  
**Autor(es)**: [Nome(s)]

---

## 🎨 Decisões de Interface

### Decisão 1: [Título breve]

**Data**: [DD/MM/YYYY]

**Contexto**: Descreva o problema ou necessidade que motivou a decisão.

**Alternativas avaliadas**:
1. **Opção A**: [Descrição]
   - ✅ Prós: [...]
   - ❌ Contras: [...]
2. **Opção B**: [Descrição]
   - ✅ Prós: [...]
   - ❌ Contras: [...]

**Decisão tomada**: [Opção escolhida]

**Justificativa**: Explique por que essa opção foi escolhida.

**Impacto**: O que muda no fluxo/interface?

---

### Decisão 2: [Título breve]

_(Repita o formato acima para cada decisão importante)_

---

## 🧩 Componentes Customizados

Liste aqui componentes que **não existem** no Design System mas foram necessários para esta jornada:

### Componente: [NomeDoComponente]

**Por que foi necessário?**: [Justificativa]

**Comportamento esperado**: [Descrição de interações]

**Estados**: [Loading, Error, Success, Empty, etc.]

**Props principais**:
- `propName` (tipo): Descrição
- `propName2` (tipo): Descrição

**Exemplo de uso**:
```jsx
<NomeDoComponente
  propName="valor"
  propName2={true}
/>
```

---

## 🔄 Feedback e Iterações

### Iteração 1 — [DD/MM/YYYY]

**Feedback recebido**: [De quem? PM, Designer, Usuário?]

**Mudanças implementadas**:
- Mudança 1: [Descrição]
- Mudança 2: [Descrição]

**Resultado**: [Melhorou? O que ainda precisa ajustar?]

---

### Iteração 2 — [DD/MM/YYYY]

_(Repita para cada rodada de feedback)_

---

## ❓ Dúvidas e Questões Abertas

- [ ] **Questão 1**: [Descrição da dúvida] — Responsável: [Nome]
- [ ] **Questão 2**: [Descrição da dúvida] — Responsável: [Nome]

---

## 📌 Referências

- [Link para documento de requisitos](#)
- [Link para benchmark/inspiração](#)
- [Link para discussão no Slack/Teams](#)

---

**Última atualização**: [Data]
```

---

## Passo 4: Prototipar no Studio (Editor Visual Puck)

Agora que a estrutura de documentação está criada, vamos construir as telas da jornada no **Studio**.

### 4.1. Acessar o Studio

```bash
# Certifique-se de que o Studio está rodando
pnpm dev:studio

# Abra no navegador
# http://localhost:3000
```

### 4.2. Criar uma Nova Página

1. No Studio, clique em **"+ Nova Página"** ou acesse diretamente:
   ```
   http://localhost:3000/studio/edit
   ```

2. Arraste componentes da paleta lateral para a área de edição:
   - `Layout` (container principal)
   - `Text` (títulos, parágrafos)
   - `Button` (ações)
   - `Card` (organização de conteúdo)

3. Configure as propriedades de cada componente no painel direito

4. **Salve a página** com um nome descritivo, exemplo:
   ```
   /revisao-questoes/listagem
   ```

### 4.3. Criar Fluxo Completo

Repita o processo para criar todas as telas da jornada:

```
/revisao-questoes/listagem       → Tela inicial com lista de questões
/revisao-questoes/detalhe        → Detalhe de uma questão específica
/revisao-questoes/confirmacao    → Confirmação de ação (aprovar/rejeitar)
```

### 4.4. Testar Navegação

Adicione `Button` com propriedade `href` para criar links entre páginas:

```jsx
<Button href="/revisao-questoes/detalhe">
  Ver Detalhes
</Button>
```

### 4.5. Atualizar README.md

Depois de criar as páginas, atualize a seção **"🔗 Protótipos Relacionados"** do README.md com os links corretos:

```markdown
## 🔗 Protótipos Relacionados

- [Listagem de Questões](http://localhost:3000/revisao-questoes/listagem)
- [Detalhe da Questão](http://localhost:3000/revisao-questoes/detalhe)
- [Confirmação](http://localhost:3000/revisao-questoes/confirmacao)
```

---

## Passo 5: Consultar o Storybook (Catálogo de Componentes)

Antes de prototipar, sempre consulte o **Storybook** para ver quais componentes estão disponíveis e como usá-los.

### 5.1. Acessar o Storybook

```bash
# Certifique-se de que o Storybook está rodando
pnpm dev:storybook

# Abra no navegador
# http://localhost:6006
```

Ou acesse a versão online: **[educacross-storybook.vercel.app](https://educacross-storybook.vercel.app)**

### 5.2. Explorar Componentes

No Storybook, você encontrará:

#### Componentes Base
- **Button** — Todos os estilos (primary, secondary, outline, ghost)
- **Text** — Tipografia (headings, body, labels)
- **Card** — Containers com variantes (default, outlined, elevated)
- **Layout** — Sistema de grid responsivo

#### Componentes de Formulário
- **Input** — Text, email, password, number
- **Select** — Dropdown com opções
- **Checkbox** — Caixas de seleção
- **Radio** — Radio buttons
- **Switch** — Toggle switch

#### Componentes de Dados
- **Badge** — Tags e status
- **Progress** — Barras de progresso
- **Leaderboard** — Tabelas de classificação
- **HealthIndicator** — Indicadores de saúde

### 5.3. Copiar Exemplos

Cada componente no Storybook tem:
- **Código de exemplo** (clique em "Show code")
- **Props disponíveis** (aba "Controls")
- **Documentação** (aba "Docs")

**Exemplo**: Para usar um Button, copie o código da story:

```jsx
<Button variant="primary" size="md">
  Clique Aqui
</Button>
```

E adapte no Studio conforme necessário.

### 5.4. Verificar Tokens de Design

Na seção **"Design System/Tokens"** do Storybook, você encontra:
- **Cores** (primary, secondary, neutral, success, warning, error)
- **Tipografia** (tamanhos, pesos, famílias)
- **Espaçamentos** (spacing scale)
- **Raios de borda** (border radius)
- **Sombras** (box-shadow)

Use esses tokens ao customizar componentes ou criar novos estilos.

---

## Passo 6: Validar a Jornada

### 6.1. Checklist de Validação

Antes de abrir uma PR, valide:

- [ ] **Estrutura de pastas criada** (README.md, notas.md, diagramas/, referencias/)
- [ ] **README.md preenchido** com contexto, objetivos, links, componentes, status
- [ ] **notas.md preenchido** com decisões de design e alternativas
- [ ] **Páginas criadas no Studio** e navegação funcionando
- [ ] **Componentes do Storybook referenciados** corretamente
- [ ] **Screenshots capturados** (opcional, mas recomendado)
- [ ] **Links testados** (todos os links internos e externos funcionam)

### 6.2. Testar Localmente

```bash
# Rodar o Studio e navegar pelas páginas criadas
pnpm dev:studio

# Abrir no navegador e testar:
# - Navegação entre páginas
# - Responsividade (mobile, tablet, desktop)
# - Interações (cliques, formulários)
```

### 6.3. Solicitar Feedback

Compartilhe os links das páginas com:
- **Product Manager** (validação de requisitos)
- **Designer** (validação de UX/UI)
- **Stakeholders** (validação de valor)

**Exemplo de mensagem**:

> Olá! Criei o protótipo da jornada **"Revisão de Questões"**. Podem validar?
>
> 🔗 **Links**:
> - Listagem: http://localhost:3000/revisao-questoes/listagem
> - Detalhe: http://localhost:3000/revisao-questoes/detalhe
> - Confirmação: http://localhost:3000/revisao-questoes/confirmacao
>
> 📄 **Documentação**: `domains/BackOffice/journeys/revisao-questoes/README.md`

---

## Passo 7: Abrir Pull Request

Depois de validar, é hora de abrir uma **Pull Request (PR)** no GitHub.

### 7.1. Criar Branch

```bash
# Criar branch com nome descritivo
git checkout -b feature/journey-revisao-questoes

# Adicionar arquivos
git add domains/BackOffice/journeys/revisao-questoes/

# Commit
git commit -m "feat(journey): adicionar jornada Revisão de Questões no BackOffice"
```

### 7.2. Push para GitHub

```bash
git push origin feature/journey-revisao-questoes
```

### 7.3. Abrir PR no GitHub

1. Acesse o repositório no GitHub
2. Clique em **"Compare & pull request"**
3. Preencha o template de PR (veja seção **Templates Prontos** abaixo)
4. Adicione reviewers (PM, Designer, Dev Lead)
5. Clique em **"Create pull request"**

### 7.4. Acompanhar CI/CD

O GitHub Actions vai rodar automaticamente:
- ✅ Build (`pnpm build`)
- ✅ Lint (`pnpm lint`)
- ✅ Type-check (`pnpm -r type-check`)

Se tudo passar ✅, a PR está pronta para review!

---

## 🤖 Guia: Usar VSCode + Assistente de IA

Agora vamos acelerar o processo usando **assistentes de IA** para gerar código e documentação automaticamente!

### Assistentes Disponíveis

- **GitHub Copilot** (integrado ao VSCode)
- **ChatGPT** (via navegador ou plugin VSCode)
- **Cursor AI** (editor com IA nativa)

### Pré-requisitos

1. **VSCode instalado**
2. **Extensões instaladas**:
   - GitHub Copilot
   - GitHub Copilot Chat
   - (Opcional) ChatGPT extension

```bash
# Instalar extensões via CLI
code --install-extension GitHub.copilot
code --install-extension GitHub.copilot-chat
```

---

## 🎯 Prompts Práticos: 6 Exemplos Prontos para Copiar

### Prompt 1: Criar Estrutura de Jornada

**Português**:
```
Crie a estrutura de pastas e arquivos para uma nova jornada chamada "Revisão de Questões" no domínio BackOffice do repositório EDUCACROSS.

A estrutura deve incluir:
- README.md (com template completo baseado em domains/template-jornada.md)
- notas.md (com seções para decisões de design)
- diagramas/ (pasta vazia)
- referencias/ (pasta vazia)

Use a estrutura padrão: domains/BackOffice/journeys/revisao-questoes/
```

**English**:
```
Create the folder structure and files for a new journey called "Question Review" in the BackOffice domain of the EDUCACROSS repository.

The structure should include:
- README.md (with complete template based on domains/template-jornada.md)
- notas.md (with sections for design decisions)
- diagramas/ (empty folder)
- referencias/ (empty folder)

Use standard structure: domains/BackOffice/journeys/revisao-questoes/
```

---

### Prompt 2: Gerar README.md Completo

**Português**:
```
Gere um arquivo README.md completo para a jornada "Revisão de Questões" com as seguintes informações:

**Objetivo**: Permitir que educadores revisem questões pendentes e aprovem/rejeitem antes da publicação.

**Contexto**:
- Para: Educadores curadores
- Por que: Garantir qualidade das questões
- Quando: Diariamente, ao revisar novas submissões

**Páginas**:
- /revisao-questoes/listagem
- /revisao-questoes/detalhe
- /revisao-questoes/confirmacao

**Componentes usados**: Button, Card, Text, Layout

Siga o template padrão do repositório (domains/template-jornada.md).
```

**English**:
```
Generate a complete README.md file for the "Question Review" journey with the following information:

**Objective**: Allow educators to review pending questions and approve/reject before publication.

**Context**:
- For: Curator educators
- Why: Ensure question quality
- When: Daily, when reviewing new submissions

**Pages**:
- /revisao-questoes/listagem
- /revisao-questoes/detalhe
- /revisao-questoes/confirmacao

**Components used**: Button, Card, Text, Layout

Follow the repository standard template (domains/template-jornada.md).
```

---

### Prompt 3: Gerar notas.md com Decisões de Design

**Português**:
```
Gere um arquivo notas.md para a jornada "Revisão de Questões" documentando as seguintes decisões de design:

**Decisão 1**: Uso de Cards para exibir questões
- Alternativas: Tabela, lista simples
- Escolha: Cards (melhor scanning visual)
- Trade-offs: Mais espaço vertical, mas melhor usabilidade

**Decisão 2**: Ações inline vs. modal de confirmação
- Alternativas: Modal, página dedicada, ações inline
- Escolha: Modal (evita navegação desnecessária, mais feedback visual)
- Trade-offs: Mais cliques, mas reduz erros

Inclua seções para feedback, iterações, e questões abertas.
```

**English**:
```
Generate a notas.md file for the "Question Review" journey documenting the following design decisions:

**Decision 1**: Use of Cards to display questions
- Alternatives: Table, simple list
- Choice: Cards (better visual scanning)
- Trade-offs: More vertical space, but better usability

**Decision 2**: Inline actions vs. confirmation modal
- Alternatives: Modal, dedicated page, inline actions
- Choice: Modal (avoids unnecessary navigation, more visual feedback)
- Trade-offs: More clicks, but reduces errors

Include sections for feedback, iterations, and open questions.
```

---

### Prompt 4: Criar Componente Customizado (Badge de Status)

**Português**:
```
Crie um componente React chamado StatusBadge para o Design System EDUCACROSS.

**Requisitos**:
- Exibir status com cor e ícone
- Variantes: "pending" (amarelo), "approved" (verde), "rejected" (vermelho)
- Props: variant, size (sm, md, lg)
- TypeScript com tipos exportados
- CSS Modules para estilos
- Acessibilidade (ARIA labels)

Siga o padrão dos componentes existentes em packages/design-system/src/components/.

Gere também uma story para Storybook em apps/storybook/src/stories/.
```

**English**:
```
Create a React component called StatusBadge for the EDUCACROSS Design System.

**Requirements**:
- Display status with color and icon
- Variants: "pending" (yellow), "approved" (green), "rejected" (red)
- Props: variant, size (sm, md, lg)
- TypeScript with exported types
- CSS Modules for styles
- Accessibility (ARIA labels)

Follow the pattern of existing components in packages/design-system/src/components/.

Also generate a story for Storybook in apps/storybook/src/stories/.
```

---

### Prompt 5: Gerar Mock de Dados para API

**Português**:
```
Crie um arquivo JSON com mock de dados para a jornada "Revisão de Questões".

**Estrutura**:
- Array de 10 questões
- Cada questão deve ter: id, enunciado, alternativas (4 opções), gabarito, status (pending/approved/rejected), autor, data de submissão

Salve em: domains/BackOffice/journeys/revisao-questoes/referencias/mock-questoes.json
```

**English**:
```
Create a JSON file with mock data for the "Question Review" journey.

**Structure**:
- Array of 10 questions
- Each question should have: id, statement, alternatives (4 options), answer key, status (pending/approved/rejected), author, submission date

Save in: domains/BackOffice/journeys/revisao-questoes/referencias/mock-questoes.json
```

---

### Prompt 6: Gerar Diagrama de Fluxo (Mermaid)

**Português**:
```
Crie um diagrama de fluxo em formato Mermaid para a jornada "Revisão de Questões".

**Fluxo**:
1. Educador acessa listagem de questões pendentes
2. Seleciona uma questão
3. Visualiza detalhe completo (enunciado, alternativas, gabarito)
4. Decide: Aprovar ou Rejeitar
5. Se rejeitar, deve adicionar motivo
6. Confirmação é exibida
7. Questão é atualizada e removida da listagem

Salve em: domains/BackOffice/journeys/revisao-questoes/diagramas/fluxo.md
```

**English**:
```
Create a flow diagram in Mermaid format for the "Question Review" journey.

**Flow**:
1. Educator accesses list of pending questions
2. Selects a question
3. Views complete detail (statement, alternatives, answer key)
4. Decides: Approve or Reject
5. If reject, must add reason
6. Confirmation is displayed
7. Question is updated and removed from listing

Save in: domains/BackOffice/journeys/revisao-questoes/diagramas/fluxo.md
```

---

## 🎨 Guia: Usar Cursor AI

**Cursor** é um editor de código com IA nativa, baseado no VSCode, mas com recursos mais avançados de geração de código.

### Instalação

1. Baixe em: [cursor.sh](https://cursor.sh/)
2. Instale e abra o repositório EDUCACROSS

### Recursos Principais

#### 1. **Cmd+K / Ctrl+K** — Gerar código inline

Selecione código e pressione `Cmd+K` (Mac) ou `Ctrl+K` (Windows/Linux).

**Exemplo**:
```
Instrução: Adicionar validação de email neste formulário
```

O Cursor vai gerar o código e sugerir uma modificação.

#### 2. **Cmd+L / Ctrl+L** — Chat lateral

Abra o chat lateral e converse com a IA sobre o código.

**Exemplo de conversa**:
```
Você: Como criar um componente Button com variantes no Design System EDUCACROSS?

Cursor: Vou criar um componente Button seguindo o padrão do repositório...
```

#### 3. **Cmd+I / Ctrl+I** — Composer (modo de edição em múltiplos arquivos)

O **Composer** permite editar múltiplos arquivos ao mesmo tempo com instruções em linguagem natural.

**Exemplo**:
```
Crie uma jornada completa "Revisão de Questões" com:
1. Estrutura de pastas em domains/BackOffice/journeys/revisao-questoes/
2. README.md completo
3. notas.md com decisões de design
4. Mock de dados em JSON

Siga os templates do repositório.
```

O Cursor vai gerar todos os arquivos e mostrar um diff para você aprovar.

### Exemplos Práticos no Cursor

#### Exemplo 1: Criar Jornada Completa

1. Abra o Composer (`Cmd+I` / `Ctrl+I`)
2. Digite:
   ```
   Crie a jornada "Gestão de Conquistas" no domínio Game com:
   - Estrutura de pastas
   - README.md completo
   - notas.md com decisões
   - Mock de 5 conquistas em JSON
   ```
3. Revise o diff e aceite

#### Exemplo 2: Gerar Componente + Story

1. Abra o Composer
2. Digite:
   ```
   Crie um componente AchievementCard no Design System com:
   - Props: title, description, icon, progress, unlocked
   - TypeScript
   - CSS Modules
   - Story para Storybook

   Siga o padrão de packages/design-system/src/components/Card.tsx
   ```
3. Revise e aceite

#### Exemplo 3: Refatorar Código Existente

1. Abra um arquivo (ex: `Button.tsx`)
2. Pressione `Cmd+K` / `Ctrl+K`
3. Digite:
   ```
   Adicionar suporte a ícones no Button (leftIcon e rightIcon props)
   ```
4. O Cursor vai gerar a modificação

---

## 📋 Templates Prontos para Copiar

### Template: Branch Naming

```bash
# Para novas features/jornadas
feature/journey-[nome-da-jornada]

# Exemplos
feature/journey-revisao-questoes
feature/journey-gestao-conquistas
feature/journey-dashboard-aluno
```

### Template: Commit Messages

```bash
# Formato padrão
<tipo>(<escopo>): <mensagem curta>

# Tipos
feat     # Nova feature/jornada
fix      # Correção de bug
docs     # Apenas documentação
refactor # Refatoração (sem mudança de funcionalidade)
test     # Adicionar/corrigir testes
chore    # Manutenção (build, dependências)

# Exemplos
feat(journey): adicionar jornada Revisão de Questões no BackOffice
docs(journey): atualizar README da jornada Gestão de Conquistas
fix(component): corrigir responsividade do Card
```

### Template: Pull Request

```markdown
# [JOURNEY] Nome da Jornada

## 📋 Resumo

Breve descrição da jornada criada (1-2 parágrafos).

## 🎯 Objetivo

O que esta jornada valida ou constrói?

## 🗂️ Arquivos Criados

- [ ] `domains/{dominio}/journeys/{nome}/README.md`
- [ ] `domains/{dominio}/journeys/{nome}/notas.md`
- [ ] `domains/{dominio}/journeys/{nome}/diagramas/` (se aplicável)
- [ ] `domains/{dominio}/journeys/{nome}/referencias/` (se aplicável)

## 🔗 Links para Protótipos

- [Página 1](http://localhost:3000/...)
- [Página 2](http://localhost:3000/...)

## 🧩 Componentes Utilizados

Lista os componentes do Design System usados:
- [ ] Button
- [ ] Card
- [ ] Text
- [ ] Layout
- [ ] Outros: _____

## 📸 Screenshots

_(Opcional: adicionar capturas de tela das páginas criadas)_

## ✅ Checklist de Qualidade

- [ ] README.md preenchido completamente
- [ ] notas.md documentando decisões de design
- [ ] Links testados e funcionando
- [ ] Build passa sem erros (`pnpm build`)
- [ ] Lint passa sem warnings (`pnpm lint`)
- [ ] Type-check passa (`pnpm -r type-check`)
- [ ] Páginas no Studio renderizando corretamente
- [ ] Feedback de PM/Designer coletado

## 👥 Reviewers

- [ ] @product-manager
- [ ] @designer
- [ ] @dev-lead

## 📝 Observações

_(Adicione aqui qualquer contexto adicional, dúvidas ou próximos passos)_
```

### Template: Issue para Dev (Solicitar Ajustes)

```markdown
# 🛠️ [DEV] Ajustes na Jornada [Nome da Jornada]

## 📋 Contexto

Jornada: **[Nome da Jornada]**  
Domínio: **[BackOffice/FrontOffice/Game]**  
PR relacionada: #[número]

## 🐛 Problema / Necessidade

Descreva o que precisa ser ajustado ou implementado (use linguagem clara, sem jargões técnicos).

**Exemplo**:
> Na página de listagem de questões, o botão "Aprovar" está visualmente correto, mas ao clicar nada acontece. Preciso que, ao clicar, uma modal de confirmação apareça.

## 🎯 Resultado Esperado

Descreva o comportamento esperado após o ajuste.

**Exemplo**:
> Ao clicar em "Aprovar", uma modal deve aparecer com:
> - Título: "Confirmar aprovação"
> - Mensagem: "Tem certeza que deseja aprovar esta questão?"
> - Botões: "Cancelar" (fecha modal) e "Confirmar" (aprova e fecha modal)

## 📸 Evidências

_(Opcional: adicionar screenshots, GIFs ou vídeos mostrando o problema)_

## 🔗 Referências

- Link para a página: http://localhost:3000/...
- Link para o protótipo no Figma: [URL]
- Link para discussão: [Slack/Teams]

## ⚙️ Detalhes Técnicos (se souber)

_(Opcional: se você tem conhecimento técnico, pode adicionar detalhes como componentes envolvidos, props, etc.)_

- Componente: `Button`
- Props: `variant="primary"`, `onClick={...}`
- Comportamento esperado: Abrir `<ConfirmDialog>` ao clicar

## ✅ Checklist

- [ ] Problema descrito claramente
- [ ] Resultado esperado documentado
- [ ] Screenshots/evidências anexadas (se aplicável)
- [ ] Link para protótipo/página incluído

## 🏷️ Labels

- `type: dev-request`
- `priority: [low/medium/high]`
- `domain: [BackOffice/FrontOffice/Game]`
```

---

## ✅ Checklist de Qualidade Final

Antes de considerar a jornada completa, valide todos os itens:

### Documentação
- [ ] README.md criado e preenchido completamente
- [ ] notas.md criado com decisões de design documentadas
- [ ] Links para protótipos atualizados e funcionando
- [ ] Screenshots capturados (opcional, mas recomendado)
- [ ] Diagramas criados (se aplicável)
- [ ] Referências organizadas (Figma, benchmarks, documentos)

### Código e Build
- [ ] Build passa sem erros (`pnpm build`)
- [ ] Lint passa sem warnings (`pnpm lint`)
- [ ] Type-check passa (`pnpm -r type-check`)
- [ ] Componentes do Storybook usados corretamente
- [ ] Não há imports de `@/components/ui` fora de `/studio` e `/dashboard`

### Prototipagem
- [ ] Páginas criadas no Studio
- [ ] Navegação entre páginas funciona
- [ ] Componentes configurados corretamente
- [ ] Layout responsivo testado (mobile, tablet, desktop)
- [ ] Estados de interface considerados (loading, error, empty, success)

### Validação
- [ ] Feedback de Product Manager coletado
- [ ] Feedback de Designer coletado
- [ ] Fluxo testado por pelo menos 2 pessoas
- [ ] Questões abertas documentadas em notas.md

### Git e PR
- [ ] Branch criada com nome padronizado (`feature/journey-[nome]`)
- [ ] Commits seguem convenção (`feat(journey): descrição`)
- [ ] PR aberta com template preenchido
- [ ] Reviewers adicionados
- [ ] CI/CD passou sem erros

---

## 🆘 Como Solicitar Ajustes aos Desenvolvedores

Quando você precisar de ajustes técnicos que estão além da prototipagem (ex: integração com backend, animações complexas, lógica de negócio), siga este processo:

### Passo 1: Abrir Issue no GitHub

Use o **Template de Issue para Dev** (veja seção **Templates Prontos** acima).

### Passo 2: Ser Claro e Específico

❌ **Evite**:
> "O botão não funciona, conserta aí."

✅ **Prefira**:
> "Na página `/revisao-questoes/listagem`, ao clicar no botão 'Aprovar', nada acontece. Esperado: abrir modal de confirmação com título 'Confirmar aprovação' e botões 'Cancelar' e 'Confirmar'."

### Passo 3: Fornecer Contexto Visual

Sempre que possível, inclua:
- **Screenshots** (antes/depois)
- **GIFs** (gravação de tela mostrando o problema)
- **Links** (para protótipo no Studio, Figma, ou página de referência)

**Ferramentas recomendadas para gravação**:
- **Loom** (grátis, fácil de usar)
- **Snagit** (screenshots + anotações)
- **Gifox** (GIFs rápidos no Mac)

### Passo 4: Priorizar

Use labels para indicar prioridade:
- `priority: high` — Bloqueante, impede validação
- `priority: medium` — Importante, mas tem workaround
- `priority: low` — Nice-to-have, pode esperar

### Passo 5: Acompanhar

- Monitore a issue no GitHub
- Responda a perguntas dos desenvolvedores rapidamente
- Teste a solução assim que o PR for mergeado
- Feche a issue se resolvida, ou reabra com feedback

### Exemplos de Issues Bem Escritas

#### Exemplo 1: Bug Visual

```markdown
# 🐛 [BUG] Botão "Aprovar" não centralizado no Card

## Contexto
Jornada: Revisão de Questões
Página: /revisao-questoes/listagem

## Problema
O botão "Aprovar" está alinhado à esquerda, mas deveria estar centralizado dentro do Card.

## Screenshot
[Anexar imagem mostrando o problema]

## Resultado Esperado
Botão centralizado horizontalmente dentro do Card.

## Prioridade
Média (não impede o uso, mas prejudica a estética)
```

#### Exemplo 2: Funcionalidade Faltante

```markdown
# ✨ [FEATURE] Adicionar modal de confirmação ao aprovar questão

## Contexto
Jornada: Revisão de Questões
Página: /revisao-questoes/listagem

## Necessidade
Atualmente, ao clicar em "Aprovar", a questão é aprovada imediatamente. Precisamos de uma confirmação antes.

## Comportamento Esperado
1. Usuário clica em "Aprovar"
2. Modal aparece com:
   - Título: "Confirmar aprovação"
   - Mensagem: "Tem certeza que deseja aprovar esta questão?"
   - Botões: "Cancelar" (fecha modal) e "Confirmar" (aprova)
3. Se "Confirmar", questão é aprovada e removida da lista
4. Se "Cancelar", modal fecha e nada acontece

## Referência
Ver comportamento similar em: [Link para benchmark]

## Prioridade
Alta (bloqueia validação com stakeholders)
```

---

## 💡 Boas Práticas ao Usar IA

### ✅ Faça

1. **Seja específico nos prompts**
   - ❌ "Cria um componente"
   - ✅ "Crie um componente Button com variantes primary, secondary e outline, usando TypeScript e CSS Modules"

2. **Forneça contexto do repositório**
   - Mencione a estrutura: "No repositório EDUCACROSS, dentro de packages/design-system..."
   - Referencie arquivos existentes: "Siga o padrão de Card.tsx"

3. **Valide o código gerado**
   - Sempre revise o código antes de aceitar
   - Teste localmente (`pnpm build`, `pnpm lint`)
   - Verifique se segue os padrões do repositório

4. **Itere em pequenos passos**
   - Não tente gerar tudo de uma vez
   - Comece com a estrutura, depois adicione funcionalidades
   - Valide cada passo antes de seguir

5. **Use o Storybook como referência**
   - Sempre mencione: "Consulte os componentes em apps/storybook para exemplos"
   - Peça para a IA gerar stories junto com componentes

### ❌ Evite

1. **Não confie cegamente**
   - IA pode gerar código desatualizado ou com bugs
   - Sempre teste localmente

2. **Não peça para gerar tudo de uma vez**
   - "Crie uma aplicação completa com backend e frontend"
   - Melhor: divida em tarefas menores

3. **Não ignore erros de build/lint**
   - Se o código gerado não compila, peça para a IA corrigir
   - Não commite código com erros

4. **Não misture estilos**
   - Mantenha consistência com o padrão do repositório
   - Se usa CSS Modules, não misture com styled-components

5. **Não pule a documentação**
   - Sempre gere stories para Storybook
   - Sempre documente decisões em notas.md

---

## 🚀 Prompts Avançados para Casos Específicos

### Prompt: Migrar Componente de Figma para Código

**Português**:
```
Tenho um componente no Figma que preciso implementar no Design System EDUCACROSS.

**Especificações do Figma**:
- Nome: AchievementBadge
- Variantes: bronze, silver, gold, platinum
- Tamanhos: sm (32px), md (48px), lg (64px)
- Inclui ícone + texto

Crie o componente em TypeScript com:
- React.forwardRef
- CSS Modules
- Props: variant, size, icon, label
- Acessibilidade (ARIA)
- Story para Storybook

Siga o padrão de packages/design-system/src/components/Badge.tsx
```

**English**:
```
I have a component in Figma that I need to implement in the EDUCACROSS Design System.

**Figma Specifications**:
- Name: AchievementBadge
- Variants: bronze, silver, gold, platinum
- Sizes: sm (32px), md (48px), lg (64px)
- Includes icon + text

Create the component in TypeScript with:
- React.forwardRef
- CSS Modules
- Props: variant, size, icon, label
- Accessibility (ARIA)
- Story for Storybook

Follow the pattern of packages/design-system/src/components/Badge.tsx
```

---

### Prompt: Criar API Mock para Prototipagem

**Português**:
```
Crie uma API mock para a jornada "Gestão de Conquistas" usando Next.js API Routes.

**Endpoints necessários**:
- GET /api/achievements — Listar conquistas do usuário
- POST /api/achievements/:id/unlock — Desbloquear conquista
- GET /api/leaderboard — Ranking de usuários

**Dados mock**:
- 10 conquistas (5 desbloqueadas, 5 bloqueadas)
- Cada conquista: id, title, description, icon, points, unlocked, unlockedAt
- Leaderboard com 20 usuários

Salve em: apps/studio/src/app/api/achievements/
```

**English**:
```
Create a mock API for the "Achievements Management" journey using Next.js API Routes.

**Required endpoints**:
- GET /api/achievements — List user achievements
- POST /api/achievements/:id/unlock — Unlock achievement
- GET /api/leaderboard — User ranking

**Mock data**:
- 10 achievements (5 unlocked, 5 locked)
- Each achievement: id, title, description, icon, points, unlocked, unlockedAt
- Leaderboard with 20 users

Save in: apps/studio/src/app/api/achievements/
```

---

### Prompt: Adicionar Animações com Framer Motion

**Português**:
```
Adicione animações ao componente Card usando Framer Motion.

**Animações necessárias**:
- Hover: lift (elevação com shadow)
- Entrada: fade in + slide up (200ms)
- Saída: fade out (100ms)
- Clique: scale (feedback visual)

Mantenha compatibilidade com o código existente em packages/design-system/src/components/Card.tsx

Adicione prop opcional: animated (boolean, default true)
```

**English**:
```
Add animations to the Card component using Framer Motion.

**Required animations**:
- Hover: lift (elevation with shadow)
- Entry: fade in + slide up (200ms)
- Exit: fade out (100ms)
- Click: scale (visual feedback)

Maintain compatibility with existing code in packages/design-system/src/components/Card.tsx

Add optional prop: animated (boolean, default true)
```

---

## 📚 Recursos Úteis

### Documentação Interna

- **[README.md](../README.md)** — Visão geral do repositório
- **[domains/README.md](../domains/README.md)** — Guia de domínios e jornadas
- **[domains/template-jornada.md](../domains/template-jornada.md)** — Template de jornada
- **[CODE_TO_FIGMA_INTEGRATION.md](../CODE_TO_FIGMA_INTEGRATION.md)** — Integração Design↔Dev
- **[DEPLOYMENT.md](../DEPLOYMENT.md)** — Guia de deploy
- **[docs/eslint.md](../docs/eslint.md)** — Configuração de lint

### Ambientes Online

- **🎨 Studio**: [educacross-studio.vercel.app](https://educacross-studio.vercel.app)
- **📚 Storybook**: [educacross-storybook.vercel.app](https://educacross-storybook.vercel.app)

### Ferramentas de IA

- **GitHub Copilot**: [Assinar](https://github.com/features/copilot)
- **Cursor AI**: [Baixar](https://cursor.sh/)
- **ChatGPT**: [Usar online](https://chat.openai.com/)

### Tutoriais Externos

- **Puck Documentation**: [puckeditor.com/docs](https://puckeditor.com/docs)
- **Storybook Guides**: [storybook.js.org/tutorials](https://storybook.js.org/tutorials)
- **Next.js App Router**: [nextjs.org/docs/app](https://nextjs.org/docs/app)
- **TypeScript Handbook**: [typescriptlang.org/docs](https://www.typescriptlang.org/docs/)

### Comunidade

- **Discord EDUCACROSS**: [Link interno]
- **Slack #prototipagem**: [Link interno]
- **GitHub Discussions**: [Repositório](https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/discussions)

---

## 🎓 Próximos Passos e Aprendizado

### Para Iniciantes

Se você é novo em desenvolvimento ou em usar IA para prototipar, recomendamos:

1. **Semana 1: Familiarização**
   - Explore o Storybook (todos os componentes)
   - Crie uma jornada simples manualmente (sem IA)
   - Leia toda a documentação do repositório

2. **Semana 2: Prototipagem Assistida**
   - Use os prompts prontos para criar jornadas
   - Experimente com VSCode + Copilot
   - Valide com PM/Designer

3. **Semana 3: Customização**
   - Crie componentes customizados (com ajuda de IA)
   - Adicione animações e interações
   - Contribua com melhorias no Design System

4. **Semana 4+: Autonomia**
   - Crie jornadas complexas com múltiplas páginas
   - Integre com APIs mock
   - Mentore outros PMs/Designers

### Recursos de Aprendizado Recomendados

#### Para Product Managers
- **Curso**: "Product Management Fundamentals" (Coursera)
- **Livro**: "Inspired" — Marty Cagan
- **Ferramenta**: Loom (para comunicação assíncrona)

#### Para Designers
- **Curso**: "Design Systems with React" (Frontend Masters)
- **Livro**: "Atomic Design" — Brad Frost
- **Ferramenta**: Figma + Code to Figma Sync

#### Para Ambos
- **Curso**: "Introduction to Git and GitHub" (GitHub Learning Lab)
- **Livro**: "Don't Make Me Think" — Steve Krug
- **Ferramenta**: GitHub Copilot (essencial!)

---

## 🆘 Precisa de Ajuda?

### Canais de Suporte

1. **Issues no GitHub**
   - Para bugs e solicitações de features
   - Use labels apropriadas (`type: question`, `type: bug`, etc.)

2. **Slack #prototipagem**
   - Para dúvidas rápidas e discussões
   - Horário de resposta: 9h-18h (dias úteis)

3. **Office Hours**
   - Toda terça e quinta, 14h-15h
   - Sessões de pair prototyping com desenvolvedores

4. **Documentação**
   - Sempre consulte a [documentação central](../docs/README.md) primeiro
   - Use a busca do GitHub (`/` + texto)

### Perguntas Frequentes (FAQ)

#### P: Preciso saber programar para usar este guia?
**R**: Não! Este guia é feito para não-desenvolvedores. Use os prompts prontos e assistentes de IA.

#### P: Quanto tempo leva para criar uma jornada?
**R**: Com os templates e IA, você pode criar uma jornada completa em 2-4 horas (incluindo validação).

#### P: Posso criar componentes novos ou só usar os existentes?
**R**: Você pode criar componentes novos! Use os prompts de "Criar Componente Customizado" e peça ajuda aos devs se necessário.

#### P: Como sei se minha jornada está pronta?
**R**: Use o **Checklist de Qualidade Final** (veja seção acima). Se todos os itens estiverem ✅, está pronto!

#### P: E se eu errar ou quebrar algo?
**R**: Sem problemas! Use Git para reverter (`git checkout <arquivo>`). E sempre peça ajuda no Slack.

#### P: Posso usar outros assistentes de IA além dos mencionados?
**R**: Sim! Claude, Gemini, ou qualquer outro. Os prompts são agnósticos de ferramenta.

---

## 🎉 Conclusão

Parabéns por chegar até aqui! Agora você tem tudo que precisa para:

✅ Criar jornadas de prototipagem de forma autônoma  
✅ Usar assistentes de IA para acelerar o trabalho  
✅ Colaborar com desenvolvedores de forma eficiente  
✅ Validar ideias rapidamente com protótipos funcionais  

### Checklist Final: Você Está Pronto?

- [ ] Li o guia completo
- [ ] Instalei Node.js, pnpm, e VSCode/Cursor
- [ ] Clonei o repositório EDUCACROSS
- [ ] Rodei o Studio e Storybook localmente
- [ ] Explorei o Storybook (todos os componentes)
- [ ] Criei minha primeira jornada (mesmo que simples)
- [ ] Testei pelo menos 1 prompt de IA
- [ ] Abri minha primeira PR
- [ ] Participei de um Office Hour (opcional)

### Próximos Marcos

- **1 Semana**: 3 jornadas criadas
- **1 Mês**: 10 jornadas criadas, 2 componentes customizados
- **3 Meses**: Mentor de outros PMs/Designers, contribuidor ativo

---

## 📝 Feedback e Melhorias

Este guia é um documento vivo! Ajude-nos a melhorá-lo:

- **Issues**: Reporte erros ou sugestões em [GitHub Issues](https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/issues)
- **PRs**: Contribua com melhorias diretas (typos, exemplos, seções novas)
- **Slack**: Compartilhe suas experiências no canal #prototipagem

**Última atualização**: Dezembro 2025  
**Versão**: 1.0  
**Mantenedores**: Time de Produto e Engenharia EDUCACROSS

---

**🚀 Boa prototipagem!**