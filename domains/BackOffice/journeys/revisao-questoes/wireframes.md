# Wireframes e Fluxo - Revisão de Questões

## 🔄 Fluxo Completo da Jornada

```
┌─────────────────────────────────────────────────────────────────┐
│                    JORNADA: REVISÃO DE QUESTÕES                 │
└─────────────────────────────────────────────────────────────────┘

    [INÍCIO]
       │
       ▼
┌──────────────────┐
│  1. LISTAGEM     │ ◄─────────────┐
│  /lista          │                │
└──────────────────┘                │
   │         │                       │
   │ Ver     │ Aprovar              │
   │ Detalhe │ Rápido               │
   ▼         │                       │
┌──────────────────┐                │
│  2. DETALHE      │                │
│  /detalhe        │                │
└──────────────────┘                │
   │         │                       │
   │ Editar  │ Aprovar              │
   │         │ com Review           │
   ▼         │                       │
┌──────────────────┐                │
│  3. EDIÇÃO       │                │
│  /edicao         │                │
└──────────────────┘                │
   │         │                       │
   │ Salvar  │ Cancelar ────────────┤
   │         │                       │
   ▼         ▼                       │
┌──────────────────┐                │
│  4. CONFIRMAÇÃO  │                │
│  /confirmacao    │                │
└──────────────────┘                │
   │         │                       │
   │ Publicar│ Voltar ──────────────┤
   │         │                       │
   ▼         │                       │
┌──────────────────┐                │
│  SUCESSO         │                │
│  (feedback)      │                │
└──────────────────┘                │
   │                                 │
   │ Próxima questão ────────────────┘
   ▼
  [FIM]
```

## 📱 Wireframes Descritivos

### Página 1: Lista de Questões Pendentes
**URL**: `/backoffice/revisao-questoes/lista`

```
┌─────────────────────────────────────────────────────────────┐
│  EDUCACROSS BackOffice                          [Perfil ▼]  │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  BackOffice · Revisão de Questões                           │
│  ═══════════════════════════════════                        │
│                                                               │
│  Visualize e aprove rapidamente as questões pendentes       │
│  enviadas pelos educadores.                                  │
│                                                               │
│  📊 Pendentes hoje: 3 questões aguardando revisão           │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ ✏️ Questão 1345 · Frações equivalentes              │   │
│  │                                                       │   │
│  │ 👤 Enviada por Prof.ª Ana Souza · 12 min atrás      │   │
│  │                                                       │   │
│  │ Os alunos devem identificar quais frações           │   │
│  │ representam a mesma parte do todo em uma pizza...   │   │
│  │                                                       │   │
│  │  [Aprovar ✓]   [Solicitar ajustes ⚠]               │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ ✏️ Questão 1288 · Interpretação de gráficos          │   │
│  │                                                       │   │
│  │ 👤 Enviada por Prof. Carlos Mendes · 35 min atrás   │   │
│  │                                                       │   │
│  │ A turma deverá analisar um gráfico de barras com... │   │
│  │                                                       │   │
│  │  [Aprovar ✓]   [Solicitar ajustes ⚠]               │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ ✏️ Questão 1279 · Probabilidade básica               │   │
│  │                                                       │   │
│  │ 👤 Enviada por Prof.ª Luiza Prado · 1h atrás        │   │
│  │                                                       │   │
│  │ Questão pede para calcular a probabilidade de...     │   │
│  │                                                       │   │
│  │  [Aprovar ✓]   [Solicitar ajustes ⚠]               │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

**Elementos principais**:
- Header com título e descrição
- Contador de pendências
- Cards de questões (3 visíveis)
- Cada card: título, autor, preview, 2 botões de ação

**Interações**:
- Click no card → navega para Detalhe
- Click em "Aprovar" → aprovação rápida sem detalhes
- Click em "Solicitar ajustes" → modal ou página de feedback

---

### Página 2: Detalhe da Questão
**URL**: `/backoffice/revisao-questoes/detalhe`

```
┌─────────────────────────────────────────────────────────────┐
│  ← Voltar à lista                               [Perfil ▼]  │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  Revisão · Questão 1345                                     │
│  ═════════════════════════                                  │
│                                                               │
│  Frações equivalentes · Ensino Fundamental · 6º ano         │
│                                                               │
│  👤 Enviada por Prof.ª Ana Souza · Pendente há 12 minutos   │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 📝 Enunciado proposto                                │   │
│  │                                                       │   │
│  │ Considerando a pizza abaixo dividida em 8 fatias,   │   │
│  │ quais frações representam a mesma quantidade de      │   │
│  │ pizza que 3/8? Justifique sua resposta.              │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ ✅ Checklist de revisão                              │   │
│  │                                                       │   │
│  │ ✔ Clareza do enunciado: OK                           │   │
│  │ ⚠ Nível de dificuldade: ajustar exemplos para       │   │
│  │   alunos com defasagem                               │   │
│  │ ✔ Alinhamento com BNCC: OK                           │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 🎯 Próximas ações                                    │   │
│  │                                                       │   │
│  │ Revise o nível de dificuldade e adicione um         │   │
│  │ exemplo guiado antes da pergunta final.              │   │
│  │                                                       │   │
│  │  [Aprovar e publicar ✓]   [Solicitar ajustes ⚠]    │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

**Elementos principais**:
- Breadcrumb/botão voltar
- Título e metadados completos
- Card de enunciado
- Card de checklist com status visual (✔/⚠)
- Card de ações com recomendações
- Botões de aprovação e solicitação de ajustes

**Interações**:
- Click em "Aprovar" → navega para Confirmação
- Click em "Solicitar ajustes" → navega para Edição
- Click em "Voltar" → retorna para Lista

---

### Página 3: Edição da Questão
**URL**: `/backoffice/revisao-questoes/edicao`

```
┌─────────────────────────────────────────────────────────────┐
│  ← Cancelar edição                              [Perfil ▼]  │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  Editar Questão · #1345                                     │
│  ═══════════════════════                                    │
│                                                               │
│  Ajuste o enunciado, respostas e feedback pedagógico       │
│  antes de publicar.                                          │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 📝 Enunciado da Questão                              │   │
│  │                                                       │   │
│  │ Descreva a pergunta de forma clara e objetiva.      │   │
│  │                                                       │   │
│  │ Exemplo atual:                                        │   │
│  │ Considerando a pizza abaixo dividida em 8 fatias... │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ ✅ Alternativas de Resposta                          │   │
│  │                                                       │   │
│  │ A) 6/16 (Correta)                                    │   │
│  │ B) 9/24 (Correta)                                    │   │
│  │ C) 3/4 (Incorreta)                                   │   │
│  │ D) 1/2 (Incorreta)                                   │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 💬 Feedback Pedagógico                               │   │
│  │                                                       │   │
│  │ Adicione orientações para o educador aplicar esta   │   │
│  │ questão.                                              │   │
│  │                                                       │   │
│  │ Sugestão: Usar material concreto (pizzas de papel)  │   │
│  │ para alunos com dificuldade em frações...            │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 📊 Metadados e Classificação                         │   │
│  │                                                       │   │
│  │ Disciplina: Matemática                               │   │
│  │ Série: 6º ano · Ensino Fundamental                   │   │
│  │ Nível de dificuldade: Médio                          │   │
│  │ Tempo estimado: 15 minutos                           │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 🎯 Ações                                              │   │
│  │                                                       │   │
│  │  [Salvar alterações]  [Cancelar]  [Visualizar prévia]│   │
│  └─────────────────────────────────────────────────────┘   │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

**Elementos principais**:
- Formulário completo com múltiplas seções
- Cards para enunciado, alternativas, feedback e metadados
- Botões de ação: Salvar, Cancelar, Preview
- Campos mostrados como texto (simulação - componentes Input pendentes)

**Interações**:
- Click em "Salvar" → navega para Confirmação
- Click em "Cancelar" → volta para Detalhe
- Click em "Visualizar prévia" → modal ou nova página com preview

---

### Página 4: Confirmação de Publicação
**URL**: `/backoffice/revisao-questoes/confirmacao`

```
┌─────────────────────────────────────────────────────────────┐
│                                                 [Perfil ▼]  │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│         ┌─────────────────────────────────────┐             │
│         │                                      │             │
│         │  Confirmar Publicação                │             │
│         │  ═══════════════════════              │             │
│         │                                      │             │
│         │  Você está prestes a publicar a      │             │
│         │  questão #1345 para uso pelos        │             │
│         │  educadores.                         │             │
│         │                                      │             │
│         │  ⚠️ Esta ação tornará a questão      │             │
│         │  disponível imediatamente para       │             │
│         │  todos os educadores da plataforma.  │             │
│         │                                      │             │
│         └─────────────────────────────────────┘             │
│                                                               │
│         ┌─────────────────────────────────────┐             │
│         │ 📋 Resumo da Questão                 │             │
│         │                                      │             │
│         │ ID: #1345                            │             │
│         │ Tema: Frações equivalentes           │             │
│         │ Disciplina: Matemática · 6º ano      │             │
│         │ Autor: Prof.ª Ana Souza              │             │
│         │ Revisor: Coordenação Pedagógica      │             │
│         └─────────────────────────────────────┘             │
│                                                               │
│         ┌─────────────────────────────────────┐             │
│         │ ✅ Verificações de Qualidade         │             │
│         │                                      │             │
│         │ ✔ Enunciado claro e objetivo         │             │
│         │ ✔ Alternativas corretas validadas    │             │
│         │ ✔ Alinhamento com BNCC verificado    │             │
│         │ ✔ Nível de dificuldade adequado      │             │
│         │ ✔ Feedback pedagógico incluído       │             │
│         └─────────────────────────────────────┘             │
│                                                               │
│         ┌─────────────────────────────────────┐             │
│         │ Deseja continuar com a publicação?   │             │
│         │                                      │             │
│         │  [Sim, publicar agora]               │             │
│         │  [Não, voltar à edição]              │             │
│         │  [Cancelar]                          │             │
│         └─────────────────────────────────────┘             │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

**Elementos principais**:
- Modal/página centrada com card de confirmação
- Resumo da questão com dados principais
- Checklist de verificações de qualidade
- 3 opções de ação (Publicar, Voltar, Cancelar)

**Interações**:
- Click em "Publicar" → exibe feedback de sucesso
- Click em "Voltar à edição" → retorna para página de Edição
- Click em "Cancelar" → retorna para Lista

---

### Estado de Sucesso (dentro da mesma página)

```
┌─────────────────────────────────────────────────────────────┐
│                                                 [Perfil ▼]  │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│         ┌─────────────────────────────────────┐             │
│         │                                      │             │
│         │              ✅                       │             │
│         │                                      │             │
│         │  Questão Publicada com Sucesso!      │             │
│         │  ═══════════════════════════════      │             │
│         │                                      │             │
│         │  A questão #1345 está agora          │             │
│         │  disponível para uso pelos           │             │
│         │  educadores da plataforma            │             │
│         │  EDUCACROSS.                         │             │
│         │                                      │             │
│         │  Próximas ações: Você pode revisar   │             │
│         │  mais questões pendentes ou voltar   │             │
│         │  ao dashboard.                       │             │
│         │                                      │             │
│         │  [Revisar próxima questão]           │             │
│         │  [Voltar ao Dashboard]               │             │
│         │                                      │             │
│         └─────────────────────────────────────┘             │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎨 Elementos de Design

### Cores e Status
- ✅ Verde (#22C55E) - Sucesso, aprovado, OK
- ⚠️ Amarelo (#EAB308) - Atenção, ajustes necessários
- 🔴 Vermelho (#EF4444) - Erro, rejeitado (não usado ainda)
- 🔵 Azul (#3B82F6) - Primário, ações principais
- ⚫ Cinza (#6B7280) - Texto secundário, muted

### Ícones e Símbolos
- ✏️ Edição, questão
- 👤 Usuário, autor
- 📊 Métricas, estatísticas
- 📝 Enunciado, texto
- ✅ Checklist, verificações
- 🎯 Ações, próximos passos
- 💬 Feedback, comentários
- ← Voltar, navegação

### Tipografia
- **H1 (4xl)**: Títulos principais de página
- **H2 (3xl)**: Títulos de modais/cards importantes
- **H3 (xl-2xl)**: Títulos de seções dentro de cards
- **Body (base)**: Texto padrão de conteúdo
- **Small (sm)**: Metadados, labels, helper text

---

## 📊 Dados Mockados

### Questão de Exemplo (ID: 1345)
```json
{
  "id": 1345,
  "titulo": "Frações equivalentes",
  "disciplina": "Matemática",
  "serie": "6º ano",
  "nivel": "Ensino Fundamental",
  "dificuldade": "Médio",
  "tempoEstimado": "15 minutos",
  "autor": {
    "nome": "Prof.ª Ana Souza",
    "id": 242
  },
  "enunciado": "Considerando a pizza abaixo dividida em 8 fatias, quais frações representam a mesma quantidade de pizza que 3/8? Justifique sua resposta.",
  "alternativas": [
    { "letra": "A", "texto": "6/16", "correta": true },
    { "letra": "B", "texto": "9/24", "correta": true },
    { "letra": "C", "texto": "3/4", "correta": false },
    { "letra": "D", "texto": "1/2", "correta": false }
  ],
  "feedback": "Sugestão: Usar material concreto (pizzas de papel) para alunos com dificuldade em frações equivalentes. Reforçar o conceito de que frações equivalentes representam a mesma quantidade.",
  "status": "pendente",
  "criadoEm": "2025-11-23T06:00:00Z",
  "checklist": {
    "clareza": "ok",
    "nivelDificuldade": "ajustar",
    "alinhamentoBNCC": "ok"
  }
}
```

---

## 🔍 Casos de Uso Detalhados

### Caso 1: Aprovação Rápida
**Persona**: Revisor experiente com pouco tempo
**Fluxo**: Lista → Aprovar direto no card → Confirmação → Sucesso
**Tempo estimado**: <30 segundos
**Passos**: 3 cliques (card, aprovar, confirmar)

### Caso 2: Revisão Completa
**Persona**: Coordenador pedagógico detalhista
**Fluxo**: Lista → Detalhe → Review checklist → Aprovar → Confirmação → Sucesso
**Tempo estimado**: 2-3 minutos
**Passos**: 4 cliques + leitura

### Caso 3: Solicitação de Ajustes
**Persona**: Revisor que identificou problema
**Fluxo**: Lista → Detalhe → Edição → Ajustar campos → Salvar → Confirmação → Sucesso
**Tempo estimado**: 5-7 minutos
**Passos**: 5+ cliques + edição de texto

### Caso 4: Cancelamento de Ação
**Persona**: Revisor que mudou de ideia
**Fluxo**: Lista → Detalhe → Edição → Cancelar → Volta para Detalhe
**Tempo estimado**: <1 minuto
**Passos**: Navegação reversa permitida em todos os pontos

---

## 🧪 Cenários de Teste

### Teste 1: Fluxo Completo Happy Path
1. Abrir /lista
2. Visualizar 3 questões pendentes
3. Clicar na primeira questão
4. Revisar checklist no /detalhe
5. Clicar "Aprovar e publicar"
6. Confirmar na página /confirmacao
7. Ver feedback de sucesso
8. Clicar "Revisar próxima questão"
9. Retornar para /lista

**Resultado esperado**: Fluxo sem erros, feedback claro em cada etapa

### Teste 2: Edição com Salvamento
1. Abrir /lista
2. Clicar em questão
3. No /detalhe, clicar "Solicitar ajustes"
4. Simular edição de texto na página /edicao
5. Clicar "Salvar alterações"
6. Ir para /confirmacao
7. Confirmar publicação
8. Ver sucesso

**Resultado esperado**: Dados editados são "persistidos" (localStorage)

### Teste 3: Cancelamento em Múltiplos Pontos
1. Iniciar edição
2. Clicar "Cancelar" → Retorna para /detalhe
3. Na confirmação, clicar "Voltar à edição" → Retorna para /edicao
4. Na confirmação, clicar "Cancelar" → Retorna para /lista

**Resultado esperado**: Navegação reversa funciona, dados não são perdidos

---

## 📸 Captura de Screenshots Pendente

Para completar esta documentação, capturar:
1. Screenshot da página /lista (visão completa com 3 cards)
2. Screenshot da página /detalhe (com checklist visível)
3. Screenshot da página /edicao (formulário completo)
4. Screenshot da página /confirmacao (modal de confirmação)
5. Screenshot do estado de sucesso
6. GIF animado do fluxo completo (15-20 segundos)

**Ferramentas sugeridas**:
- Screenshots: Print nativo do navegador
- GIFs: LICEcap, ScreenToGif, ou comando `recordmydesktop`
- Armazenamento: Adicionar em `/domains/BackOffice/journeys/revisao-questoes/screenshots/`

---

**Mantido por**: Squad Prototipação EDUCACROSS  
**Última atualização**: 2025-11-23
