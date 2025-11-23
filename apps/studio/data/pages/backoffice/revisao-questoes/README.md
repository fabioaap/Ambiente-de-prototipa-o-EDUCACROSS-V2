# Páginas da Jornada: Revisão de Questões

## Estrutura das Páginas

Este diretório contém as páginas JSON utilizadas pelo Studio (Puck editor) para a jornada de Revisão de Questões no BackOffice.

### Páginas Disponíveis

1. **lista.json** - Lista de questões pendentes
2. **detalhe.json** - Detalhe completo de uma questão
3. **edicao.json** - Formulário de edição de questão
4. **confirmacao.json** - Confirmação de publicação e feedback de sucesso

## Notas de Implementação

### confirmacao.json - Estados de Interface

⚠️ **Importante**: Esta página contém dois estados do fluxo de confirmação:

1. **Estado de Confirmação** (cards 1-4):
   - Card de título e mensagem de confirmação
   - Card com resumo da questão
   - Card com checklist de verificações
   - Card com botões de ação (Publicar, Voltar, Cancelar)

2. **Estado de Sucesso** (card 5):
   - Card com feedback de sucesso
   - Exibido APÓS o usuário clicar em "Publicar"

**Em prototipação estática**: Ambos os cards estão presentes no JSON para demonstração visual dos dois estados.

**Em produção**: Implementar renderização condicional:
```javascript
// Exemplo de implementação real
{showSuccess ? (
  <SuccessCard />
) : (
  <>
    <ConfirmationCard />
    <SummaryCard />
    <ChecklistCard />
    <ActionsCard />
  </>
)}
```

Usar state management (React useState, Zustand, etc.) para alternar entre os estados quando o usuário clicar em "Publicar".

## URLs das Páginas

- Lista: `http://localhost:3000/backoffice/revisao-questoes/lista`
- Detalhe: `http://localhost:3000/backoffice/revisao-questoes/detalhe`
- Edição: `http://localhost:3000/backoffice/revisao-questoes/edicao`
- Confirmação: `http://localhost:3000/backoffice/revisao-questoes/confirmacao`

## Formato

Todas as páginas seguem o formato Puck:
```json
{
  "content": [
    {
      "type": "ComponentName",
      "props": {
        "id": "unique-id",
        ...
      }
    }
  ],
  "root": {
    "props": {
      "title": "Page Title"
    }
  },
  "zones": {}
}
```

## Componentes Utilizados

- `Layout` - Container responsivo
- `Card` - Agrupamento de conteúdo
- `Text` - Títulos, parágrafos, labels
- `Button` - Ações e navegação

Para mais detalhes sobre os componentes, consulte:
- Design System: `packages/design-system/src/components/`
- Puck Config: `apps/studio/src/config/puck.config.tsx`
- Storybook: http://localhost:6006

---

**Mantido por**: Squad Prototipação EDUCACROSS  
**Última atualização**: 2025-11-23
