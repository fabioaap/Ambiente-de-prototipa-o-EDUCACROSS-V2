# 🗺️ Mapa Visual: DS Evolution Pipeline

## 🎯 Fluxo Completo em 1 Página

```
┌────────────────────────────────────────────────────────────────────┐
│                  VOCÊ COMEÇA UMA TELA NOVA                         │
│         (ex: Painel Inicial, Engajamento, Relatórios)              │
└─────────────────────────┬────────────────────────────────────────┘
                          │
                          ▼
         ┌────────────────────────────────────┐
         │    PASSO 1: ANALISAR COMPONENTES   │
         │                                    │
         │  Figma Design → Screenshot         │
         │  Identificar cada elemento:        │
         │  - ✅ Card (existe)                │
         │  - ✅ Button (existe)              │
         │  - ❌ DataTable (precisa + prop)   │
         │  - ❌ Progress (precisa + prop)    │
         │  - 🆕 Tooltip (novo)               │
         │                                    │
         │  Saída: docs/TELA_ANALYSIS.md      │
         └────────────────┬────────────────────┘
                          │
                          ▼
         ┌────────────────────────────────────┐
         │    PASSO 2: CRIAR ISSUES (GitHub)  │
         │                                    │
         │  Para cada gap:                    │
         │  Title: "DS Enhancement: X + Y"    │
         │  Label: "ds-enhancement"           │
         │  Priority: Alta/Média              │
         │  Body: Figma link + exemplo        │
         │                                    │
         │  Resultado: 5 issues abertos       │
         └────────────────┬────────────────────┘
                          │
            ┌─────────────┴─────────────┬──────────────────┐
            │                           │                  │
            ▼                           ▼                  ▼
    ┌────────────────┐       ┌────────────────┐  ┌────────────────┐
    │ Issue #1:      │       │ Issue #2:      │  │ Issue #3:      │
    │ DataTable +    │       │ Badge +        │  │ Progress +     │
    │ cellRenderer   │       │ customColor    │  │ customHeight   │
    │ (CRÍTICO)      │       │ (IMPORTANTE)   │  │ (CRÍTICO)      │
    └────────┬───────┘       └────────┬───────┘  └────────┬───────┘
             │                        │                   │
             ▼                        ▼                   ▼
    ┌────────────────┐       ┌────────────────┐  ┌────────────────┐
    │ PASSO 3:       │       │ PASSO 3:       │  │ PASSO 3:       │
    │ Branch novo    │       │ Branch novo    │  │ Branch novo    │
    │                │       │                │  │                │
    │ git checkout   │       │ git checkout   │  │ git checkout   │
    │ -b feature/    │       │ -b feature/    │  │ -b feature/    │
    │ ds-datatable-  │       │ ds-badge-      │  │ ds-progress-   │
    │ cellrenderer   │       │ customcolor    │  │ customheight   │
    └────────┬───────┘       └────────┬───────┘  └────────┬───────┘
             │                        │                   │
             ▼                        ▼                   ▼
    ┌────────────────────────────────────────────────────────────┐
    │          PASSO 4: IMPLEMENTAR (em paralelo)                │
    │                                                            │
    │  Para cada branch:                                        │
    │  1. Editar interface TypeScript                           │
    │     interface DataTableProps {                            │
    │       cellRenderer?: { [col]: (v) => ReactNode }          │
    │     }                                                      │
    │                                                            │
    │  2. Implementar lógica no componente                       │
    │     if (cellRenderer) {                                   │
    │       content = cellRenderer[column](value)               │
    │     }                                                      │
    │                                                            │
    │  3. Atualizar CSS se necessário                           │
    │                                                            │
    │  4. Criar/atualizar story no Storybook                    │
    │     export const WithCustomCells: Story = { ... }         │
    │                                                            │
    │  5. Testar localmente                                     │
    │     pnpm build                                            │
    │     pnpm test                                             │
    │     pnpm dev:hub  (ver story)                             │
    │                                                            │
    │  6. Commit & Push                                         │
    │     git commit -m "feat(ds): add cellRenderer to DataTable"
    │     git push -u origin feature/ds-datatable-cellrenderer  │
    │                                                            │
    │  7. Abrir PR + Merge                                      │
    │     gh pr create --title "..."                            │
    │     (approve, merge)                                      │
    └────────┬──────────────────────────────────────────────────┘
             │
             │ (Todos terminados?)
             │
             ▼
    ┌────────────────────────────────────────────────────────────┐
    │           PASSO 5: USAR NA TELA (Painel Inicial)           │
    │                                                            │
    │  Agora os componentes estão ESTENDIDOS!                   │
    │                                                            │
    │  // domains/admin/src/app/painel-inicial/page.tsx         │
    │  <DataTable                                               │
    │    columns={[...]}                                        │
    │    data={[...]}                                           │
    │    cellRenderer={{                                        │
    │      'ALUNOS_CADASTRADOS': (value) => (                   │
    │        <div>                                              │
    │          {value.count} de {value.total}                   │
    │          <Progress                                        │
    │            value={value.percentage}                       │
    │            height="12px"       {/* ← nova prop! */}       │
    │            customColor="#28C76F" {/* ← nova prop! */}     │
    │          />                                               │
    │          <Badge                                           │
    │            customColor="#28C76F" {/* ← nova prop! */}     │
    │          >                                                │
    │            {value.percentage}%                            │
    │          </Badge>                                         │
    │        </div>                                             │
    │      )                                                    │
    │    }}                                                     │
    │  />                                                       │
    │                                                            │
    │  ✅ PRONTO! Tela usa DS + componentes estendidos           │
    │  ✅ Reutilizável por próximas telas                       │
    │  ✅ Documentado no Storybook                              │
    │  ✅ Sem Tailwind puro, sem código duplicado               │
    └────────────────────────────────────────────────────────────┘
```

---

## 📊 Tempo Estimado por Tarefa

```
TAREFA                          | TEMPO  | OBSERVAÇÕES
────────────────────────────────┼────────┼──────────────────────
Analisar tela (Passo 1)        | 30 min | Screenshot + análise
Criar issues (Passo 2)         | 30 min | 5 issues rápidas
Estender 1 componente (P3-4)   | 30 min | Interface + impl + story
Estender 5 componentes (P3-4)  | 2-3h   | Paralelo ou sequencial
Implementar tela (Passo 5)     | 1-2h   | Usar componentes novos
─────────────────────────────────────────────────────────────
TOTAL PARA 1 TELA              | 4-5h   | De zero a completo!
```

---

## 🎯 Casos de Uso (Matriz de Decisão)

```
CENÁRIO                                    │ AÇÃO
───────────────────────────────────────────┼──────────────────────────
"Minha tela usa só componentes prontos"    │ ✅ Use DS direto
                                            │    (0 issues)
───────────────────────────────────────────┼──────────────────────────
"Preciso estender 1-2 componentes"         │ ✅ Siga o pipeline
                                            │    (1-2 issues)
                                            │    Tempo: 1-2h
───────────────────────────────────────────┼──────────────────────────
"Preciso estender 5+ componentes"          │ ✅ Siga o pipeline
                                            │    (5+ issues)
                                            │    Paralelo = 3h
                                            │    Sequencial = 5h
───────────────────────────────────────────┼──────────────────────────
"Preciso componente novo 100%"             │ ✅ Crie novo componente
                                            │    (1 issue + src + story)
                                            │    Tempo: 2-3h
───────────────────────────────────────────┼──────────────────────────
"Tela muito diferente do DS"               │ ⚠️ Tailwind puro OK
                                            │    (documente POR QUE)
                                            │    Tempo: 2-4h
───────────────────────────────────────────┼──────────────────────────
"Não sei se preciso estender ou criar"     │ 📖 Consulte docs:
                                            │    1. PAINEL_INICIAL_ANALYSIS.md
                                            │    2. DESIGN_SYSTEM_REAL_GAP_ANALYSIS.md
                                            │    3. STORYBOOK_INVENTORY_AND_GAPS.md
```

---

## 📈 Evolução do DS ao Longo das Sprints

```
SEMANA 1:
  Tela A → Estender 3 componentes → DS cresce
  [Button] [Card] [Text] + [DataTable✅] [Badge✅] [Progress✅]

SEMANA 2:
  Tela B → Estender 2 componentes + criar 1 novo → DS cresce mais
  Estender: [Modal✅] [Tabs✅]
  Criar: [Tooltip🆕]
  DS agora tem: 35+ componentes

SEMANA 3:
  Tela C → Apenas usar (tudo já existe) → DS estabiliza
  Usar: [Button] [Card] [DataTable] [Badge] [Progress] [Modal] [Tabs] [Tooltip]
  DS pronto para 100% das telas!

SEMANA 4:
  Tela D, E, F → Rápido (2-3h cada)
  Tudo que precisa já existe no DS

RESULTADO FINAL:
  ✅ DS completo e robusto
  ✅ 5+ telas reutilizando
  ✅ Zero duplicação de código
  ✅ Storybook documentando tudo
```

---

## 🔄 Loop de Feedback Contínuo

```
1. Designer vê Storybook
   ↓
2. Vê que componente não tem prop que precisa
   ↓
3. Abre issue "DS Enhancement"
   ↓
4. Dev estende componente em 30 min
   ↓
5. Story atualizada no Storybook
   ↓
6. Designer vê nova versão
   ↓
7. Usa na próxima tela
   ↓
8. Volta ao passo 1 (para nova tela / novo gap)

✅ Pipeline contínuo = DS sempre atualizado
```

---

## 🚀 Quick Start (Copy & Paste)

### 1️⃣ Analisar
```bash
cat > docs/PAINEL_INICIAL_ANALYSIS.md << 'EOF'
# Análise: Painel Inicial

## ✅ Prontos (usar direto)
- Card
- Button
- Text
- Select

## ❌ Estender (criar issues)
1. DataTable: precisa cellRenderer
2. Badge: precisa customColor
3. Progress: precisa height em px
4. StatsCard: precisa icon
5. ActionButtons: precisa icons

## Issues
- [ ] #XXX DataTable + cellRenderer
- [ ] #XXX Badge + customColor
- [ ] #XXX Progress + height
- [ ] #XXX StatsCard + icon
- [ ] #XXX ActionButtons + icons
EOF
```

### 2️⃣ Estender (exemplo)
```bash
git checkout -b feature/ds-badge-customcolor
# Editar packages/design-system/src/components/Badge/Badge.tsx
# Adicionar: customColor?: string
# Testar: pnpm build && pnpm dev:hub
# Commit, push, PR, merge
```

### 3️⃣ Usar
```tsx
<Badge customColor="#28C76F">Cadastrados</Badge>
```

---

**Total: 4-5 horas de início ao fim!** ⚡

