# ✅ Checklist de Testes - Dashboard

**Data do Teste**: ___/___/_____  
**Tester**: _____________________________  
**Ambiente**: ☐ Local ☐ Dev ☐ Staging  
**Navegador**: ☐ Chrome ☐ Firefox ☐ Safari ☐ Edge  
**Dispositivo**: ☐ Desktop ☐ Tablet ☐ Mobile

---

## 🚀 Pré-requisitos

- [ ] Aplicação rodando: `pnpm dev:studio`
- [ ] URL acessível: http://localhost:3000/studio
- [ ] Console do navegador aberto (F12)
- [ ] DevTools pronto para inspecionar elementos

---

## 1️⃣ Teste de Carga Inicial

### Passos
1. [ ] Abrir navegador
2. [ ] Acessar `/studio`
3. [ ] Aguardar carregamento completo

### Validações
- [ ] Sidebar visível à esquerda
- [ ] Lista de páginas carregada
- [ ] Editor Puck visível no centro
- [ ] Sem erros no console
- [ ] Tempo de carregamento < 3s

**Observações**: ___________________________________________

---

## 2️⃣ Teste de Navegação Entre Páginas

### Passos
1. [ ] Clicar em "Home" na sidebar
2. [ ] Verificar conteúdo carregado
3. [ ] Clicar em "BackOffice > Revisão de Questões > Lista"
4. [ ] Verificar conteúdo mudou
5. [ ] Voltar para Home

### Validações
- [ ] Navegação sem reload
- [ ] Página ativa destacada visualmente
- [ ] URL atualizada (?page=...)
- [ ] Conteúdo renderizado corretamente
- [ ] Transição suave

**Bugs Encontrados**: ______________________________________

---

## 3️⃣ Teste de Criação de Página

### Passos
1. [ ] Localizar campo "Nova página"
2. [ ] Digitar: `teste-qa-{data}`
3. [ ] Pressionar Enter
4. [ ] Verificar página criada na lista
5. [ ] Verificar página aberta automaticamente

### Validações
- [ ] Página aparece na sidebar
- [ ] Editor carregado (página vazia)
- [ ] Arquivo JSON criado
- [ ] Feedback visual de sucesso

### Testes de Erro
- [ ] Tentar criar página com nome vazio → erro exibido
- [ ] Tentar criar página duplicada → erro exibido
- [ ] Caracteres especiais convertidos corretamente

**Observações**: ___________________________________________

---

## 4️⃣ Teste de Edição de Conteúdo

### Passos
1. [ ] Abrir página "teste-qa-{data}"
2. [ ] Clicar em "+ Add component"
3. [ ] Adicionar componente Text
4. [ ] Editar propriedades (content, size, color)
5. [ ] Adicionar componente Button
6. [ ] Clicar em "Publish"
7. [ ] Recarregar página (F5)

### Validações
- [ ] Componentes adicionados visualmente
- [ ] Propriedades editáveis
- [ ] Preview em tempo real
- [ ] Mudanças persistidas após reload
- [ ] JSON atualizado

**Bugs Encontrados**: ______________________________________

---

## 5️⃣ Teste de Deleção de Página

### Passos
1. [ ] Localizar página `teste-qa-{data}`
2. [ ] Clicar no ícone delete (🗑️)
3. [ ] Confirmar deleção
4. [ ] Verificar página sumiu da lista
5. [ ] Tentar acessar URL da página deletada

### Validações
- [ ] Dialog de confirmação exibida
- [ ] Opção de cancelar funcionando
- [ ] Página removida da lista
- [ ] Arquivo JSON deletado
- [ ] Mensagem de erro ao acessar URL

**Observações**: ___________________________________________

---

## 6️⃣ Teste de Navegação por Teclado

### Passos
1. [ ] Pressionar Tab repetidamente
2. [ ] Verificar foco visível em cada elemento
3. [ ] Navegar até uma página
4. [ ] Pressionar Enter para abrir
5. [ ] Usar Shift+Tab para voltar
6. [ ] Usar Escape para fechar modals

### Validações
- [ ] Foco visível (outline/border)
- [ ] Ordem de tabulação lógica
- [ ] Enter funciona para ações
- [ ] Escape fecha dialogs
- [ ] Sem armadilhas de foco

**Problemas de Acessibilidade**: _________________________

---

## 7️⃣ Teste de Responsividade Mobile

### Passos
1. [ ] Abrir DevTools (F12)
2. [ ] Ativar modo responsivo (Ctrl+Shift+M)
3. [ ] Selecionar iPhone/Pixel (< 768px)
4. [ ] Verificar sidebar colapsada
5. [ ] Clicar no menu toggle
6. [ ] Navegar para uma página
7. [ ] Verificar editor responsivo

### Validações
- [ ] Sidebar colapsável funcionando
- [ ] Menu toggle visível
- [ ] Conteúdo adaptado
- [ ] Textos legíveis
- [ ] Touch targets ≥ 44px

**Resolução Testada**: _____________________________________

---

## 🧑‍🦽 Testes de Acessibilidade

### Checklist Rápido
- [ ] Todas imagens têm alt text
- [ ] Contraste adequado (textos)
- [ ] Headings em ordem lógica (h1, h2, h3)
- [ ] Inputs têm labels associados
- [ ] Botões têm aria-label quando necessário
- [ ] Navegação por teclado completa
- [ ] Foco visível em todos elementos
- [ ] Screen reader testado (NVDA/JAWS)

### Ferramenta Utilizada
- [ ] axe DevTools
- [ ] Lighthouse
- [ ] WAVE
- [ ] Leitor de tela: _______________________

**Problemas Encontrados**: _________________________________

---

## 🌐 Teste Cross-Browser

### Navegadores Testados
| Navegador | Versão | Status | Observações |
|-----------|--------|--------|-------------|
| Chrome    | ___    | ☐ ✅ ☐ ❌ |  |
| Firefox   | ___    | ☐ ✅ ☐ ❌ |  |
| Safari    | ___    | ☐ ✅ ☐ ❌ |  |
| Edge      | ___    | ☐ ✅ ☐ ❌ |  |

---

## 🐛 Bugs Encontrados

### Bug #1
**Severidade**: ☐ Crítico ☐ Alto ☐ Médio ☐ Baixo  
**Descrição**: ________________________________________________  
**Steps to Reproduce**:  
1. _________________________________________________________  
2. _________________________________________________________  

### Bug #2
**Severidade**: ☐ Crítico ☐ Alto ☐ Médio ☐ Baixo  
**Descrição**: ________________________________________________  
**Steps to Reproduce**:  
1. _________________________________________________________  
2. _________________________________________________________  

### Bug #3
**Severidade**: ☐ Crítico ☐ Alto ☐ Médio ☐ Baixo  
**Descrição**: ________________________________________________  
**Steps to Reproduce**:  
1. _________________________________________________________  
2. _________________________________________________________  

---

## 📊 Resumo da Sessão

### Estatísticas
- **Total de Testes**: 7 cenários
- **Testes Passados**: _____ / 7
- **Bugs Encontrados**: _____
  - Críticos: _____
  - Altos: _____
  - Médios: _____
  - Baixos: _____

### Recomendação Final
☐ **Aprovar para produção** - Todos testes passaram  
☐ **Aprovar com ressalvas** - Bugs menores encontrados  
☐ **Reprovar** - Bugs críticos/altos bloqueiam release

### Comentários Finais
________________________________________________________________
________________________________________________________________
________________________________________________________________
________________________________________________________________

---

**Assinatura do Tester**: ____________________  
**Data de Conclusão**: ___/___/_____  
**Tempo Total de Teste**: _____ horas
