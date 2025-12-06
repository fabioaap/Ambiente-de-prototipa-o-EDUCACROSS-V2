# 🎨 Guia para Product Managers e Designers

**Para**: PMs, Designers, Stakeholders não-técnicos  
**Tempo de leitura**: 10 minutos  
**Objetivo**: Entender e utilizar o ambiente de prototipação EDUCACROSS

---

## 🎯 Visão Geral

Este é um **ambiente de prototipação high-fidelity**, não um sistema de produção. Aqui você pode:

- ✅ Validar ideias de produto rapidamente
- ✅ Criar protótipos funcionais e interativos
- ✅ Testar fluxos de usuário antes do desenvolvimento
- ✅ Comunicar requisitos visualmente para desenvolvedores

**O que NÃO é:**
- ❌ Sistema de produção com dados reais
- ❌ Ambiente para usuários finais
- ❌ Código final que irá para produção

**Nível de Fidelidade**: High-Fidelity (componentes reais, interações funcionais, design system consistente)

---

## 🚀 Acesso Rápido aos Ambientes

### 🌐 Produção (Versão Estável)

| Ambiente | URL | Descrição |
|----------|-----|-----------|
| **🎨 Studio** | [educacross-studio.vercel.app](https://educacross-studio.vercel.app) | Editor visual de páginas (Puck) |
| **📚 Storybook** | [educacross-storybook.vercel.app](https://educacross-storybook.vercel.app) | Catálogo de componentes |

### 🧪 Staging (Versão de Testes - v0.2-beta)

| Ambiente | URL | Descrição |
|----------|-----|-----------|
| **🎨 Studio Staging** | [educacross-studio-staging.vercel.app](https://educacross-studio-staging.vercel.app) | Testes de novas funcionalidades |
| **📚 Storybook Staging** | [educacross-storybook-staging.vercel.app](https://educacross-storybook-staging.vercel.app) | Preview de novos componentes |

💡 **Dica**: Use Produção para protótipos finais e Staging para experimentação.

---

## 🔄 Fluxo de Trabalho Recomendado

### 1️⃣ Verificar Componentes no Storybook

**Acesse:** [Storybook →](https://educacross-storybook.vercel.app)

O Storybook é seu catálogo de componentes. Aqui você pode:
- Ver todos os componentes disponíveis
- Testar diferentes variantes e estados
- Entender as propriedades configuráveis

**Componentes Disponíveis:**
- **Button** - Botões com variantes (primary, secondary, outline, ghost)
- **Text** - Tipografia (headings, body, labels)
- **Card** - Containers para conteúdo
- **Input, Select, Checkbox, Radio, Switch** - Formulários
- **Layout** - Sistema de grid responsivo
- **Badge, Progress** - Indicadores visuais
- **Leaderboard, HealthIndicator** - Componentes específicos do domínio

💡 **Exemplo de Uso:**
1. Abra o Storybook
2. Navegue até "Button" na sidebar
3. Clique nas diferentes variantes (Primary, Secondary, etc.)
4. Veja os controles disponíveis (size, variant, disabled, etc.)
5. Anote as configurações que você quer usar

### 2️⃣ Montar Páginas no Studio

**Acesse:** [Studio →](https://educacross-studio.vercel.app/studio)

O Studio usa o editor **Puck** para criar páginas visualmente.

**Como usar:**

1. **Criar uma nova página:**
   - Digite o nome no campo "Nova página"
   - Pressione Enter
   - A página é criada e aberta automaticamente

2. **Adicionar componentes:**
   - Clique em "+ Add component"
   - Escolha um componente da lista
   - Configure as propriedades no painel lateral

3. **Editar propriedades:**
   - Clique no componente na canvas
   - Use o painel lateral para ajustar:
     - Texto/Conteúdo
     - Cores
     - Tamanhos
     - Variantes
     - Estados (disabled, loading, etc.)

4. **Salvar mudanças:**
   - Clique em "Publish"
   - As mudanças são salvas automaticamente

5. **Navegar entre páginas:**
   - Use a sidebar esquerda
   - Clique em qualquer página para abri-la

💡 **Dica**: Crie páginas com nomes descritivos como `onboarding-step-1` ou `dashboard-home`.

### 3️⃣ Documentar a Jornada

**Local:** `domains/{domínio}/journeys/`

Toda jornada de prototipação deve ser documentada para:
- Comunicar o contexto e objetivos
- Facilitar handoff para desenvolvedores
- Manter histórico de decisões

**Estrutura de uma Jornada:**

```
domains/
  └── BackOffice/           # ou FrontOffice, Game
      └── journeys/
          └── nome-da-jornada/
              ├── README.md      # Visão geral e links
              ├── notas.md       # Decisões de design
              ├── diagramas/     # Fluxos e wireframes
              └── referencias/   # Screenshots e materiais
```

**O que incluir no README.md:**
- 🎯 **Objetivo**: Qual problema esta jornada resolve?
- 👤 **Personas**: Quem são os usuários?
- 🔗 **Links**: URLs das páginas no Studio
- 🧩 **Componentes**: Quais componentes do Storybook foram usados?
- 📊 **Status**: Em andamento, concluído, pausado
- 📝 **Próximos Passos**: O que ainda precisa ser feito?

💡 **Exemplo Prático:**
```markdown
# Jornada: Onboarding de Usuários

## Objetivo
Criar fluxo de cadastro em 3 etapas para novos professores.

## Páginas
- [Etapa 1: Dados Pessoais](https://educacross-studio.vercel.app/onboarding-step-1)
- [Etapa 2: Escola](https://educacross-studio.vercel.app/onboarding-step-2)
- [Etapa 3: Confirmação](https://educacross-studio.vercel.app/onboarding-step-3)

## Componentes Utilizados
- Input (email, password, text)
- Button (primary para "Próximo")
- Card (container das etapas)
- Text (headers e labels)

## Status
✅ Etapa 1 completa  
🚧 Etapas 2 e 3 em andamento
```

---

## 🛠️ Ferramentas Detalhadas

### 📚 Storybook - Catálogo de Componentes

**O que é**: Documentação interativa de todos os componentes do Design System.

**Como usar para validar componentes:**

1. **Explorar variantes:**
   - Cada componente tem múltiplas variantes (ex: Button tem primary, secondary, outline)
   - Use os controles para testar diferentes configurações

2. **Verificar acessibilidade:**
   - Muitos componentes mostram estados de foco para teclado
   - Teste navegação por Tab

3. **Ver código:**
   - Clique na aba "Docs" para ver exemplos de código
   - Útil para comunicar com desenvolvedores

4. **Testar responsividade:**
   - Use as opções de viewport no topo (Mobile, Tablet, Desktop)

**Casos de Uso:**
- ✅ "Preciso de um botão secundário pequeno" → Abra Button, selecione `variant: secondary, size: small`
- ✅ "Qual a cor do texto de sucesso?" → Abra Text, procure `color: success`
- ✅ "Como fica um Card com sombra?" → Abra Card, teste `variant: elevated`

### 🎨 Studio - Editor Visual (Puck)

**O que é**: Editor drag-and-drop para criar páginas de prototipação.

**Funcionalidades Principais:**

1. **Arrastar Componentes:**
   - Arraste da lista de componentes para a canvas
   - Solte onde quiser posicionar

2. **Editar Propriedades:**
   - Clique em qualquer componente
   - Painel lateral mostra todas as propriedades editáveis
   - Mudanças são visíveis em tempo real

3. **Gerenciar Páginas:**
   - Criar: Campo "Nova página" no topo
   - Deletar: Ícone 🗑️ ao lado de cada página
   - Navegar: Click na sidebar

4. **Salvar e Publicar:**
   - Botão "Publish" salva as mudanças
   - Recarregue a página para confirmar persistência

**Atalhos de Teclado:**
- `Tab` - Navegar entre elementos
- `Enter` - Abrir página selecionada
- `Esc` - Fechar painéis

**Dicas de Produtividade:**
- 💡 Duplique páginas similares para economizar tempo (em breve)
- 💡 Use nomes consistentes: `domínio-fluxo-etapa` (ex: `backoffice-review-step-1`)
- 💡 Teste em diferentes tamanhos de tela redimensionando o navegador

---

## 🔗 Integração com Figma

**Status Atual**: Em desenvolvimento

**Como Funciona:**

1. **Code → Figma**: Componentes do Storybook são sincronizados para o Figma
2. **Design Tokens**: Cores, tipografia e espaçamentos são compartilhados
3. **Sincronização Automática**: CI/CD mantém Figma atualizado (em breve)

**Benefícios:**
- ✅ Design e código sempre alinhados
- ✅ Designers podem criar mockups com componentes reais
- ✅ Reduz inconsistências visuais

**Ferramentas:**
- `code-to-figma/figma-sync-engine/` - Motor de sincronização
- Documentação completa: [CODE_TO_FIGMA_INTEGRATION.md](../CODE_TO_FIGMA_INTEGRATION.md)

💡 **Para Designers:** Em breve você poderá usar os componentes do Figma sabendo que estão 100% sincronizados com o código.

---

## 🐛 Como Solicitar Ajustes

### Novo Componente

**Quando usar**: Preciso de um componente que não existe no Storybook.

**Como solicitar:**

1. Abra uma [nova issue no GitHub](https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/issues/new)
2. Use o template:

```markdown
**Título**: Novo Componente: [Nome do Componente]

**Descrição**:
Preciso de um componente para [descrever objetivo].

**Casos de Uso**:
- Onde será usado (ex: dashboard, onboarding)
- Quantas vezes aparece (ex: 5 telas diferentes)

**Referências**:
- Screenshots de inspiração
- Link para componentes similares
- Mockups ou wireframes

**Propriedades Desejadas**:
- [ ] Variante 1 (ex: size: small, medium, large)
- [ ] Estado loading
- [ ] Estado disabled
- [ ] Responsivo

**Prioridade**: Alta / Média / Baixa
```

### Ajuste em Componente Existente

**Quando usar**: Um componente existe mas precisa de ajustes.

**Como solicitar:**

1. Abra uma [nova issue no GitHub](https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/issues/new)
2. Use o template:

```markdown
**Título**: Ajuste: [Componente] - [O que precisa mudar]

**Componente**: Button (por exemplo)

**Problema Atual**:
[Descrever o que não está funcionando ou está faltando]

**Comportamento Esperado**:
[Como deveria funcionar]

**Passos para Reproduzir**:
1. Abra Storybook → Button
2. Selecione variant: secondary
3. Note que [problema]

**Screenshots**:
[Anexar imagens do problema]

**Prioridade**: Alta / Média / Baixa
```

### Bug ou Erro

**Quando usar**: Algo não está funcionando como deveria.

**Como reportar:**

1. Abra uma [nova issue no GitHub](https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/issues/new)
2. Use o template:

```markdown
**Título**: Bug: [Descrição breve]

**Ambiente**:
- [ ] Studio (Production)
- [ ] Studio (Staging)
- [ ] Storybook (Production)
- [ ] Storybook (Staging)

**Descrição**:
[O que aconteceu]

**Passos para Reproduzir**:
1. Vá para [URL]
2. Clique em [elemento]
3. Observe [problema]

**Comportamento Esperado**:
[O que deveria acontecer]

**Screenshots/Vídeo**:
[Evidências do problema]

**Navegador**: Chrome / Firefox / Safari / Edge
**Sistema Operacional**: Windows / Mac / Linux
**Impacto**: Bloqueia trabalho / Inconveniente / Menor

**Prioridade**: Crítica / Alta / Média / Baixa
```

### Labels Úteis

Ao criar issues, use estas labels:

- `enhancement` - Nova funcionalidade ou melhoria
- `bug` - Algo não funciona
- `design` - Relacionado a design/UX
- `documentation` - Falta documentação
- `question` - Dúvida ou clarificação
- `priority:high` - Urgente
- `priority:medium` - Importante mas não urgente
- `priority:low` - Pode esperar

---

## 📚 Recursos Adicionais

### Documentação Técnica (para aprofundamento)

- [README Principal](../README.md) - Visão geral do projeto
- [Design System](../packages/design-system/README.md) - Detalhes dos componentes
- [Domains & Journeys](../domains/README.md) - Convenções de documentação
- [Backlog](./backlog.md) - Roadmap e próximas features

### Guias de Qualidade

- [QA Quick Start](./qa-quick-start.md) - Como testar protótipos
- [Accessibility Audit](./accessibility-audit.md) - Diretrizes WCAG 2.1

### Comunidade

- **Issues do GitHub**: Para solicitar funcionalidades ou reportar bugs
- **Pull Requests**: Para ver o que está sendo desenvolvido
- **Milestones**: Para acompanhar progresso dos Sprints

---

## ❓ FAQ - Perguntas Frequentes

### Posso usar o Studio sem conhecimento técnico?

✅ **Sim!** O Studio foi criado para ser usado por PMs e Designers sem conhecimento de código. Tudo é visual e intuitivo.

### As páginas que crio ficam salvas permanentemente?

⚠️ **Parcialmente.** Atualmente as páginas são salvas no `localStorage` do navegador. Se limpar cache ou trocar de navegador, perderá as páginas. Para protótipos importantes, documente com screenshots na jornada.

### Posso compartilhar protótipos com stakeholders?

✅ **Sim!** Basta copiar a URL da página e compartilhar. Exemplo: `https://educacross-studio.vercel.app/onboarding-step-1`

### Quanto tempo leva para criar um protótipo?

⏱️ Depende da complexidade:
- Página simples (1-3 componentes): **5-10 minutos**
- Fluxo completo (3-5 páginas): **30-60 minutos**
- Jornada documentada: **1-2 horas** (incluindo docs)

### Posso editar o código dos componentes?

❌ **Não diretamente.** Como PM/Designer, você configura propriedades. Para mudanças no código do componente, abra uma issue solicitando.

### Como sei quais componentes usar?

💡 **Regra geral:**
1. Sempre comece pelo Storybook para ver o que existe
2. Reutilize componentes existentes sempre que possível
3. Se não existir, solicite via issue
4. Evite "inventar" componentes - mantenha consistência

### O que fazer se encontrar um bug?

1. Anote o comportamento esperado vs atual
2. Tire screenshot ou grave vídeo
3. Abra issue seguindo o template de Bug
4. Continue trabalhando em outras partes enquanto aguarda correção

### Preciso instalar algo no meu computador?

❌ **Não!** Use os ambientes online (Production ou Staging). Instalação local é só para desenvolvedores.

### Posso criar componentes personalizados?

⚠️ **Não diretamente.** O sistema oferece componentes pré-definidos. Se precisar de algo específico:
1. Tente combinar componentes existentes
2. Se não for possível, abra issue solicitando novo componente
3. Equipe de dev avaliará e priorizará

---

## 🎓 Tutorial Passo a Passo: Sua Primeira Jornada

### Cenário: Criar um fluxo de login

**Tempo estimado**: 30 minutos

#### Passo 1: Explorar Componentes (5 min)

1. Abra [Storybook](https://educacross-storybook.vercel.app)
2. Navegue até:
   - **Input** - Veja variantes email e password
   - **Button** - Veja variant primary
   - **Text** - Veja como criar títulos
   - **Card** - Veja como criar containers

#### Passo 2: Criar Página de Login (10 min)

1. Abra [Studio](https://educacross-studio.vercel.app/studio)
2. Crie nova página: `login`
3. Adicione componentes:
   - **Card** - Container principal
   - **Text** (dentro do Card) - Título "Entrar"
   - **Input** - Email
   - **Input** - Password
   - **Button** - "Entrar"
4. Configure propriedades:
   - Text: `content: "Entrar", variant: "h2"`
   - Input (email): `type: "email", placeholder: "seu@email.com"`
   - Input (password): `type: "password", placeholder: "Senha"`
   - Button: `variant: "primary", label: "Entrar"`
5. Clique "Publish"

#### Passo 3: Documentar (10 min)

1. Crie pasta: `domains/FrontOffice/journeys/login/`
2. Crie `README.md`:

```markdown
# Jornada: Login de Usuários

## Objetivo
Permitir que professores e alunos façam login no sistema.

## Páginas
- [Login](https://educacross-studio.vercel.app/login)

## Componentes Utilizados
- Card (container)
- Text (título)
- Input (email e password)
- Button (submit)

## Fluxo
1. Usuário acessa página de login
2. Insere email e senha
3. Clica em "Entrar"
4. Sistema valida e redireciona para dashboard

## Status
✅ Protótipo criado  
⏳ Aguardando validação com usuários

## Próximos Passos
- [ ] Adicionar link "Esqueci minha senha"
- [ ] Adicionar validação de campos
- [ ] Criar fluxo de recuperação de senha
```

3. Crie `notas.md`:

```markdown
# Notas de Design - Login

## Decisões
- Usamos Card para dar destaque ao formulário
- Input de password tem ícone de "mostrar/ocultar" (nativo do navegador)
- Botão primário para ação principal

## Alternativas Consideradas
- Login social (Google, Microsoft) - decidimos adiar para v2
- Biometria - não é prioridade inicial

## Feedback Recebido
- Usuários pedem "Lembrar-me" checkbox - backlog
```

#### Passo 4: Validar (5 min)

1. Abra a URL da página e compartilhe com equipe
2. Peça feedback
3. Itere conforme necessário

🎉 **Parabéns!** Você criou e documentou sua primeira jornada.

---

## 📞 Contato e Suporte

**Tem dúvidas?**

1. Consulte este guia primeiro
2. Busque na [documentação técnica](../README.md)
3. Abra uma [issue com label `question`](https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/issues/new)

**Encontrou erro neste guia?**

Abra uma issue com label `documentation` ou sugira melhorias.

---

**Última atualização**: Dezembro 2025  
**Versão**: 1.0  
**Mantenedor**: Equipe EDUCACROSS
