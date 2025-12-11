# 🔄 Sistema Contínuo de Evolução do Design System

## 📌 O Problema Que Você Identificou

> "Vamos ter muitos componentes não mapeados conforme criamos as telas. Como alimentamos o DS continuamente?"

**Resposta:** Você precisa de um **pipeline incremental** onde cada tela que você cria alimenta o DS.

---

## 🏗️ ARQUITETURA DO PIPELINE

```
┌─────────────────────────────────────────────────────────────┐
│                    VOCÊ CRIA UMA TELA                       │
│              (domains/admin/..../page.tsx)                   │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│         PASSO 1: ANALISAR COMPONENTES USADOS                │
│  ✅ Quais componentes já existem no DS?                     │
│  ❌ Quais faltam props?                                      │
│  🆕 Quais são completamente novos?                          │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│    PASSO 2: CRIAR ISSUE PARA CADA GAP NO DS                │
│  Issue Type: "DS Enhancement"                              │
│  Escopo: Estender Card com width, height, bgColor          │
│  Prioridade: Based on número de telas que precisam         │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│   PASSO 3: IMPLEMENTAR A EXTENSÃO DO COMPONENTE            │
│  Branch: feature/ds-{component}-{prop}                      │
│  Adicionar props, story, teste                              │
│  Merge para main                                            │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│     PASSO 4: USAR O COMPONENTE MELHORADO NA TELA           │
│  Agora usa o DS completo, não Tailwind puro                │
│  Reutilizável em outras telas                              │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│        PASSO 5: DOCUMENTAR NO STORYBOOK                     │
│  Story mostrando novo uso com novas props                   │
│  Exemplo de caso real da tela                              │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ▼
        ✅ DS CRESCE NATURALMENTE
```

---

## 🛠️ PROCESSO DETALHADO (Passo a Passo)

### **PASSO 1: Criar Checklist ao Iniciar Tela**

Quando você vai criar uma tela nova, primeiro responde:

```markdown
## Tela: [Nome da Tela]
Data Início: [Data]
Figma Link: [Link]

### Componentes Identificados no Figma

#### ✅ Componentes que JÁ EXISTEM no DS
- [ ] DataTable
- [ ] Badge
- [ ] Progress
- [ ] Card
- [ ] Button

#### ❌ Componentes que PRECISAM DE EXTENSÃO
- [ ] DataTable: Precisa inline Progress + Badge
  - Issues a criar: #XXX
  - Status: [ ] Not started [ ] In Progress [ ] Done
  
- [ ] Badge: Precisa cores customizáveis
  - Issues a criar: #XXX
  - Status: [ ] Not started [ ] In Progress [ ] Done

#### 🆕 Componentes COMPLETAMENTE NOVOS
- [ ] Tooltip (não existe)
  - Issues a criar: #XXX
  - Status: [ ] Not started [ ] In Progress [ ] Done

### Timeline

| Fase | Data | Status |
|------|------|--------|
| Análise de componentes | [Data] | ✅ |
| Criar issues no DS | [Data] | ⏳ |
| Estender componentes | [Data] | ⏳ |
| Implementar tela | [Data] | ⏳ |
| Documentar no SB | [Data] | ⏳ |
```

---

### **PASSO 2: Criar Issues de DS Enhancement**

Quando identificar gaps, cria issues assim:

```markdown
# Título: DS Enhancement: DataTable com inline Progress

## Descrição
Tela "Painel Inicial" precisa renderizar Progress bars inline nas células da tabela.

Exemplo:
- Coluna "Alunos Cadastrados": 648 de 3.000 [████░░░░░░] 21%

## Requisitos
- [ ] Adicionar prop `cellRenderer` ao DataTable
- [ ] cellRenderer aceita function: (value, column, row) => React.ReactNode
- [ ] Suporta renderizar Progress inline
- [ ] Suporta renderizar Badge inline
- [ ] Suporta renderizar ActionButtons inline

## Exemplo de Uso
\`\`\`tsx
<DataTable
  columns={[...]}
  data={[...]}
  cellRenderer={{
    'ALUNOS CADASTRADOS': (value, column, row) => (
      <div style={{ display: 'flex', gap: '8px' }}>
        <div>{value.count} de {value.total}</div>
        <Progress value={value.percentage} height="6px" />
      </div>
    )
  }}
/>
\`\`\`

## Telas que Dependem Disso
- Painel Inicial (Front Office)
- [Futuramente: Outra tela]

## Impacto
- 1 tela esperando
- Componente afetado: DataTable
- Prioridade: 🔴 Alta (bloqueia tela)

## Acceptance Criteria
- [ ] Prop `cellRenderer` implementada
- [ ] Story criada em Storybook
- [ ] Exemplo funciona com Progress + Badge inline
- [ ] TypeScript tipos corretos
- [ ] Build passa: pnpm build
- [ ] Tests passam: pnpm test
- [ ] Documentado em README do componente

## Links
- [Figma Painel Inicial](link)
- [PR com tela](PR_link)
- [Implementação](branch_link)
```

---

### **PASSO 3: Branching Strategy**

```bash
# Sempre que criar issue de DS, use pattern:
git checkout -b feature/ds-{componente}-{prop}

# Exemplos:
git checkout -b feature/ds-datatable-cellrenderer
git checkout -b feature/ds-badge-customcolor
git checkout -b feature/ds-progress-customheight
git checkout -b feature/ds-statcard-customicon

# Commit messages:
git commit -m "feat(ds): add cellRenderer to DataTable for inline content"
git commit -m "feat(ds): add customColor prop to Badge component"
git commit -m "feat(ds): add height prop to Progress component"
```

---

### **PASSO 4: Template para Estender Componente**

Use este template quando for estender um componente:

```typescript
// Antes: component.tsx
export interface OldProps {
  title: string;
  value: number;
}

export const Component = React.forwardRef<HTMLDivElement, OldProps>(
  ({ title, value }, ref) => {
    return <div>{title}: {value}</div>;
  }
);

// ─────────────────────────────────────────────────────────

// Depois: component.tsx (ESTENDIDO)
export interface NewProps extends OldProps {
  // ✨ NOVAS PROPS
  width?: string;                           // 👈 ADICIONADA
  customColor?: string;                     // 👈 ADICIONADA
  cellRenderer?: (value: any) => React.ReactNode; // 👈 ADICIONADA
}

export const Component = React.forwardRef<HTMLDivElement, NewProps>(
  (
    {
      title,
      value,
      
      // ✨ NOVAS PROPS COM DEFAULTS
      width = 'auto',
      customColor = undefined,
      cellRenderer = undefined,
      
      ...rest
    },
    ref
  ) => {
    // ✨ IMPLEMENTAÇÃO USANDO NOVAS PROPS
    const style = {
      width,
      color: customColor,
      ...rest.style
    };

    const content = cellRenderer ? cellRenderer(value) : value;

    return <div style={style}>{title}: {content}</div>;
  }
);
```

---

## 📊 WORKFLOW RECOMENDADO (Dia a Dia)

### **Segunda: Você começa tela "Engajamento"**

```
1. Abre Figma → Painel Inicial
2. Analisa componentes
3. Cria documento: TELA_ENGAJAMENTO_DS_ANALYSIS.md
4. Identifica 4 gaps:
   - DataTable: inline Progress + Badge
   - Progress: custom height
   - Badge: custom color
   - StatsCard: custom icon
5. Cria 4 issues no GitHub (com labels "ds-enhancement")
6. Prioriza: Alta (bloqueia tela) e Média (nice-to-have)
```

### **Terça-Quarta: Estender componentes**

```
1. Pega issue #1: "DS: DataTable cellRenderer"
2. Branch: feature/ds-datatable-cellrenderer
3. Estende DataTable.tsx:
   - Adiciona type CellRenderer
   - Implementa cellRenderer prop
   - Atualiza CSS se necessário
4. Cria story em Storybook
5. Testa: pnpm build && pnpm test
6. PR + merge
7. Repete para issues #2, #3, #4
```

### **Quinta: Usar componentes estendidos**

```
1. Agora os componentes estão prontos
2. Implementa tela usando DS melhorado
3. Tela fica reutilizável
4. Documenta padrão em DESIGN_PATTERNS.md
```

### **Sexta: Review & Documentação**

```
1. Revisa tudo que foi criado
2. Atualiza README do DS
3. Cria resumo: "X componentes estendidos, Y telas usando DS"
4. Documenta padrões descobertos
```

---

## 📈 MÉTRICAS PARA ACOMPANHAR

Crie um arquivo `DS_GROWTH_METRICS.md` para rastrear:

```markdown
# Design System Growth Metrics

## Semana de 9-13 de Dezembro

### Componentes Estendidos
- ✅ DataTable (adicionado cellRenderer)
- ✅ Progress (adicionado height customizável)
- ✅ Badge (adicionado customColor)
- ⏳ StatsCard (adicionado customIcon)

### Telas que Usam DS
- Painel Inicial ✅

### Telas que Precisam DS
- Engajamento (bloqueada por DS: 2 componentes)
- Desempenho (bloqueada por DS: 1 componente)
- Relatórios (OK, usa componentes já estendidos)

### Padrões Descobertos
1. DataTable sempre precisa de cellRenderer
2. Badge precisa de cores customizáveis
3. Progress precisa de altura customizável

### Próximos Passos
1. Estender Select com multi-select
2. Criar Tooltip (novo componente)
3. Criar DatePicker (novo componente)
```

---

## 🎯 TEMPLATE: Issue para Estender DS

Salve este template e use sempre:

```markdown
---
name: "DS Enhancement"
about: "Estender componente existente com novas props"
title: "DS Enhancement: [Componente] + [Props]"
labels: ["ds-enhancement", "design-system"]
---

## 📋 Tela que Precisa
- **Link Figma:** [paste URL]
- **Node ID:** [paste ID]
- **Componente Afetado:** [ex: DataTable]

## 📝 O que Falta
- [ ] Prop: `cellRenderer` (type)
- [ ] Prop: `customColor` (type)

## 💡 Exemplo de Uso
\`\`\`tsx
// Seu código esperado aqui
\`\`\`

## ✅ Checklist
- [ ] Props adicionadas ao interface
- [ ] Implementação feita
- [ ] Story criada
- [ ] CSS/module atualizado
- [ ] Tests passam
- [ ] Build passa
- [ ] Documentação atualizada

## 🔗 Links
- Design: [figma link]
- Tela: [branch/PR]
```

---

## 📋 CHECKLIST: Novo Design System Workflow

### Quando Começar Tela:
- [ ] Criar análise de componentes (doc)
- [ ] Identificar gaps
- [ ] Criar issues de DS

### Quando Estender Componente:
- [ ] Branch correto: `feature/ds-*`
- [ ] Interface TypeScript atualizada
- [ ] Implementação feita
- [ ] Story adicionada
- [ ] CSS atualizado
- [ ] Testes passam
- [ ] Build passa
- [ ] PR criada
- [ ] Documentação atualizada

### Quando Usar Componente Estendido:
- [ ] Importa do DS, não cria custom
- [ ] Usa novas props
- [ ] Exemplo funciona
- [ ] Documentado em README da tela

---

## 🚀 INICIAR AGORA

### Passo 1: Criar template de análise
```bash
cat > docs/TELA_ANALYSIS_TEMPLATE.md << 'EOF'
# Análise de Componentes: [Tela]

## Figma Link
[link]

## ✅ Componentes Existentes (prontos)

## ❌ Componentes a Estender (bloqueadores)

## 🆕 Componentes Novos (future)

## Issues Criadas
- #XXX
- #XXX

## Timeline
EOF
```

### Passo 2: Criar labels no GitHub
```bash
gh label create "ds-enhancement" \
  --description "Estender componente existente" \
  --color "7367f0"

gh label create "ds-new-component" \
  --description "Novo componente para Design System" \
  --color "28c76f"
```

### Passo 3: Começar com Painel Inicial
```bash
# Cria análise
cp docs/TELA_ANALYSIS_TEMPLATE.md docs/PAINEL_INICIAL_ANALYSIS.md

# Preenche com gaps
# Cria 4 issues
# Estende 4 componentes
# Implementa tela
# Documenta
```

---

## ✨ BENEFÍCIOS

```
✅ DS cresce naturalmente com as telas
✅ Sem retrabalho (cada prop é feita 1x)
✅ Rastreabilidade (issue por cada change)
✅ Reutilização garantida (próximas telas já herdam)
✅ Documentação automática (stories no Storybook)
✅ Escalável (funciona para 10 telas, 100 telas, etc)
✅ Time fica sincronizado (issues visíveis para todos)
```

---

## 🎯 Conclusão

Você não precisa esperar ter TUDO no DS antes de criar telas. Você **cria telas E alimenta DS ao mesmo tempo**:

```
Semana 1: Tela A + Estender 3 componentes
Semana 2: Tela B + Estender 2 componentes + 1 novo
Semana 3: Tela C + Estender 1 componente + 2 novos
Semana 4: Tela D + Tudo já existe, só usa!

Resultado: DS completo, 4 telas reutilizáveis, time produtivo
```

