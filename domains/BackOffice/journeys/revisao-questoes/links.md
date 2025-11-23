# Links da Jornada: Revisão de Questões

## 🔗 Páginas no Studio

### Fluxo Completo de Revisão

1. **Lista de Questões Pendentes**
   - URL: http://localhost:3000/backoffice/revisao-questoes/lista
   - Descrição: Visualização de todas as questões aguardando revisão
   - Ações: Visualizar cards com preview, aprovar ou solicitar ajustes

2. **Detalhe da Questão**
   - URL: http://localhost:3000/backoffice/revisao-questoes/detalhe
   - Descrição: Visualização completa de uma questão específica
   - Ações: Ver enunciado, checklist de qualidade, e ações de aprovação

3. **Edição da Questão**
   - URL: http://localhost:3000/backoffice/revisao-questoes/edicao
   - Descrição: Formulário para editar enunciado, alternativas e feedback
   - Ações: Salvar alterações, cancelar, visualizar prévia

4. **Confirmação de Publicação**
   - URL: http://localhost:3000/backoffice/revisao-questoes/confirmacao
   - Descrição: Modal de confirmação antes da publicação
   - Ações: Confirmar publicação, voltar à edição, cancelar

## 🎨 Design & Prototipação

### Figma
- Link para Figma: _[A ser adicionado quando disponível]_
- Wireframes: _[A ser adicionado quando disponível]_

### Storybook
- Components Library: http://localhost:6006
- Componentes utilizados:
  - Button: http://localhost:6006/?path=/story/components-button--default
  - Card: http://localhost:6006/?path=/story/components-card--default
  - Text: http://localhost:6006/?path=/story/components-text--default
  - Badge: http://localhost:6006/?path=/story/components-badge--default
  - Layout: http://localhost:6006/?path=/story/components-layout--default

## 📋 Documentação

### Repositório
- README da jornada: [README.md](./README.md)
- Notas e feedback: [notas.md](./notas.md)
- Template base: [template-jornada.md](../../template-jornada.md)

### Issues Relacionadas
- Issue E1.1: Revisão de Questões (BackOffice)
- Issue #2: Design System base (Dependência)
- Issue #1: Studio setup (Dependência)

## 🚀 Como Executar

### Iniciar o Studio
```bash
cd /home/runner/work/Ambiente-de-prototipa-o-EDUCACROSS-V2/Ambiente-de-prototipa-o-EDUCACROSS-V2
pnpm dev:studio
```

### Iniciar o Storybook
```bash
cd /home/runner/work/Ambiente-de-prototipa-o-EDUCACROSS-V2/Ambiente-de-prototipa-o-EDUCACROSS-V2
pnpm dev:storybook
```

## 📸 Screenshots

_[Screenshots serão adicionados após validação visual do fluxo]_

### Lista de Questões
- Screenshot da tela de listagem com cards

### Detalhe da Questão
- Screenshot da visualização detalhada com checklist

### Edição
- Screenshot do formulário de edição

### Confirmação
- Screenshot do modal de confirmação e sucesso

## 🔄 Fluxo de Navegação

```
Lista → Detalhe → Edição → Confirmação → Sucesso
  ↓                ↓          ↓            ↓
[Cards]         [Review]   [Form]      [Modal]
  ↓                ↓          ↓            ↓
Aprovar/     Ver detalhes  Salvar    Publicar
Ajustes         completos  mudanças   questão
```

## 📝 Notas

- URLs são relativas ao ambiente local de desenvolvimento
- Em produção, substituir `localhost:3000` pelo domínio real
- Páginas JSON estão em `apps/studio/data/pages/backoffice/revisao-questoes/`
