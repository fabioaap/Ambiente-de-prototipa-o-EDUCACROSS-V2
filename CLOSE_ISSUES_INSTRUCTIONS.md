# 📝 Instruções para Fechar Issues Sprint 6

## ⚠️ Contexto
Todas as 5 issues do Sprint 6 (Painel Inicial) JÁ ESTÃO IMPLEMENTADAS.  
Veja análise completa em: [AUDIT_SPRINT6_FALSE_POSITIVES.md](AUDIT_SPRINT6_FALSE_POSITIVES.md)

---

## 🎯 Issues para Fechar

### Issue #129 - DataTable: Custom Cell Renderer
**URL:** `https://github.com/seu-org/seu-repo/issues/129`

**Comentário sugerido:**
```markdown
✅ **Esta funcionalidade já está implementada.**

### Evidências de Implementação

**Interface TypeScript:**
- Arquivo: `packages/design-system/src/components/DataTable/DataTable.tsx`
- Linha 49: `cellRenderer?: Record<string, CellRenderer>;`
- Linhas 173-177: Lógica de renderização prioriza `cellRenderer` → `column.render` → valor raw

**Story Demonstrando Uso:**
- Arquivo: `domains/storybook/src/stories/DataTable.stories.tsx`
- Story: `CellRendererExample` (linhas 153-198)
- Exemplo real: Renderiza Badge e Progress inline em células

**Como usar:**
```typescript
<DataTable
  data={data}
  columns={columns}
  cellRenderer={{
    status: (value) => <Badge variant="success">{value}</Badge>,
    progresso: (value) => <Progress value={value} height="12px" />
  }}
/>
```

**Relatório completo:** Ver `AUDIT_SPRINT6_FALSE_POSITIVES.md`

Fechando como `already-implemented`.
```

**Labels a adicionar:** `already-implemented`, `documentation-needed`  
**Ação:** Fechar issue

---

### Issue #132 - Progress: Custom Height
**URL:** `https://github.com/seu-org/seu-repo/issues/132`

**Comentário sugerido:**
```markdown
✅ **Esta funcionalidade já está implementada.**

### Evidências de Implementação

**Interface TypeScript:**
- Arquivo: `packages/design-system/src/components/Progress/Progress.tsx`
- Linha 23: `height?: string;`
- Linha 142: Aplicação condicional via `style={height ? { height } : undefined}`

**Uso validado:**
- Story: `DataTable.stories.tsx` linha 168 usa `height="12px"`
- Build: ✅ Passa sem erros TypeScript

**Como usar:**
```typescript
<Progress value={75} height="8px" />
<Progress value={50} height="20px" />
```

**Relatório completo:** Ver `AUDIT_SPRINT6_FALSE_POSITIVES.md`

Fechando como `already-implemented`.
```

**Labels a adicionar:** `already-implemented`, `documentation-needed`  
**Ação:** Fechar issue

---

### Issue #131 - Badge: Custom Color
**URL:** `https://github.com/seu-org/seu-repo/issues/131`

**Comentário sugerido:**
```markdown
✅ **Esta funcionalidade já está implementada.**

### Evidências de Implementação

**Interface TypeScript:**
- Arquivo: `packages/design-system/src/components/Badge/Badge.tsx`
- Linhas 14-15: `customColor?: string;` com documentação JSDoc
- Linha 38: Lógica aplica `filled` style com cor como background

**Documentação inline:**
> "Cor customizada (ex: '#28C76F', '#EA5455'). Sobrescreve variant."

**Como usar:**
```typescript
<Badge customColor="#28C76F">Ativo</Badge>
<Badge customColor="#EA5455">Erro</Badge>
```

**Comportamento:** Quando `customColor` é fornecida, usa estilo preenchido com a cor de fundo e texto branco.

**Relatório completo:** Ver `AUDIT_SPRINT6_FALSE_POSITIVES.md`

Fechando como `already-implemented`.
```

**Labels a adicionar:** `already-implemented`, `documentation-needed`  
**Ação:** Fechar issue

---

### Issue #130 - StatsCard: Custom Icon
**URL:** `https://github.com/seu-org/seu-repo/issues/130`

**Comentário sugerido:**
```markdown
✅ **Esta funcionalidade já está implementada.**

### Evidências de Implementação

**Interface TypeScript:**
- Arquivo: `packages/design-system/src/components/StatsCard/StatsCard.tsx`
- Linha 23: `icon?: React.ReactNode;`
- Tipo genérico aceita qualquer componente React

**Como usar:**
```typescript
import { TrendingUp } from 'lucide-react';

<StatsCard
  title="Total de Alunos"
  value="2.847"
  icon={<TrendingUp size={24} />}
/>
```

**Flexibilidade:** Aceita componentes de bibliotecas (Lucide, React Icons), SVG inline ou elementos JSX customizados.

**Relatório completo:** Ver `AUDIT_SPRINT6_FALSE_POSITIVES.md`

Fechando como `already-implemented`.
```

**Labels a adicionar:** `already-implemented`, `documentation-needed`  
**Ação:** Fechar issue

---

### Issue #128 - ActionButtons: Custom Icons
**URL:** `https://github.com/seu-org/seu-repo/issues/128`

**Comentário sugerido:**
```markdown
✅ **Esta funcionalidade já está implementada.**

### Evidências de Implementação

**Interface TypeScript:**
- Arquivo: `packages/design-system/src/components/ActionButtons/ActionButtons.tsx`
- Linha 15: `icons?: Partial<Record<'edit' | 'view' | 'delete', React.ReactNode>>;`
- Design pattern permite sobrescrever apenas ícones específicos

**Story Demonstrando Uso:**
- Arquivo: `domains/storybook/src/stories/ActionButtons.stories.tsx`
- Story: `CustomIcons` (linha 75)

**Como usar:**
```typescript
<ActionButtons
  onEdit={handleEdit}
  onView={handleView}
  onDelete={handleDelete}
  icons={{
    edit: <EditIcon />,
    view: <EyeIcon />,
    // 'delete' usa ícone padrão
  }}
/>
```

**Relatório completo:** Ver `AUDIT_SPRINT6_FALSE_POSITIVES.md`

Fechando como `already-implemented`.
```

**Labels a adicionar:** `already-implemented`, `documentation-needed`  
**Ação:** Fechar issue

---

## 🚀 Checklist de Execução

### Pré-requisitos
- [ ] Confirmar que você tem permissão para fechar issues no repositório
- [ ] Ler o relatório completo em `AUDIT_SPRINT6_FALSE_POSITIVES.md`

### Processo de Fechamento (para cada issue)
1. [ ] Acessar a URL da issue no GitHub
2. [ ] Copiar o comentário sugerido acima
3. [ ] Colar como novo comentário na issue
4. [ ] Adicionar labels: `already-implemented`, `documentation-needed`
5. [ ] Fechar a issue com botão "Close issue"
6. [ ] ✅ Marcar como concluída nesta lista

### Lista de Issues
- [ ] #129 - DataTable: Custom Cell Renderer
- [ ] #132 - Progress: Custom Height
- [ ] #131 - Badge: Custom Color
- [ ] #130 - StatsCard: Custom Icon
- [ ] #128 - ActionButtons: Custom Icons

---

## 📊 Métricas Esperadas

**Antes do fechamento:**
- Issues abertas Sprint 6: 5
- Backlog inflacionado: ~105 minutos de trabalho fantasma

**Depois do fechamento:**
- Issues abertas Sprint 6: 0
- Backlog real: Pronto para identificar gaps verdadeiros
- Documentação: Melhorada com exemplos de uso

---

## 🔄 Próximos Passos Recomendados

### Imediato
1. ✅ Fechar as 5 issues (use este guia)
2. 📚 Criar issue de melhoria de documentação:
   - Título: "Documentar props avançadas de componentes do Painel Inicial"
   - Descrição: Linkar para `AUDIT_SPRINT6_FALSE_POSITIVES.md` seção "Common Patterns"
   - Labels: `documentation`, `good-first-issue`

### Esta Semana
3. 📖 Adicionar seção "Common Patterns" no Storybook
4. 🔍 Auditar outras issues abertas para identificar mais falsos positivos
5. 📝 Criar template de issue com checklist de verificação pré-criação

### Próximo Sprint
6. 🤖 Automatizar geração de documentação de props via TypeDoc
7. 🗺️ Criar índice de casos de uso mapeando designs para componentes
8. ✅ Implementar processo de validação: "Procurei no código? Verifiquei stories?"

---

## 💡 Como Evitar Falsos Positivos no Futuro

### Template de Issue Sugerido
```markdown
## 🔍 Verificação Pré-Issue (marque todas)
- [ ] Procurei a prop na interface TypeScript do componente
- [ ] Verifiquei se há story demonstrando uso similar
- [ ] Tentei usar a prop e documentei o erro exato
- [ ] Confirmei que não é limitação de documentação

## 📋 Descrição
[Descreva o que você precisa fazer]

## 🚫 O que tentei
[Cole código que você tentou e não funcionou]
```typescript
// Código que não funcionou
```

## ⚠️ Erro recebido
```
[Cole a mensagem de erro TypeScript ou runtime]
```

## 🎯 Comportamento esperado
[Descreva o que deveria acontecer]
```

---

## 📚 Referências

- **Relatório completo:** [AUDIT_SPRINT6_FALSE_POSITIVES.md](AUDIT_SPRINT6_FALSE_POSITIVES.md)
- **Design System README:** [packages/design-system/README.md](packages/design-system/README.md)
- **Storybook local:** Execute `pnpm dev:storybook` e navegue até o componente

---

**Última atualização:** Janeiro 2025  
**Responsável pela auditoria:** DevOps Agent  
**Status:** ✅ Pronto para execução manual
