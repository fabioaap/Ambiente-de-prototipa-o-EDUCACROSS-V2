# QA: Testar Fluxos do Dashboard com Usuários

**Data**: 2025-11-20  
**Status**: 📋 Documentação de Testes  
**Tipo**: Manual QA Testing Guide

---

## 📋 Visão Geral

Este documento fornece um guia completo para testar os fluxos do Dashboard (Studio) com usuários reais ou QA testers. O Dashboard é a interface principal para gerenciamento de páginas prototipadas no ambiente EDUCACROSS.

### Objetivo dos Testes
- Validar funcionalidade completa do Dashboard
- Identificar problemas de usabilidade
- Verificar acessibilidade
- Confirmar comportamento em diferentes dispositivos e navegadores
- Garantir experiência de usuário consistente

---

## 🎯 Escopo do Dashboard

### Componentes Testados
1. **Studio Application** (`/studio`)
   - Editor visual Puck
   - Sidebar de navegação
   - Lista de páginas
   - Ações CRUD (Create, Read, Update, Delete)

2. **Páginas Existentes**
   - Home
   - BackOffice > Revisão de Questões > Lista
   - BackOffice > Revisão de Questões > Detalhe

3. **API Endpoints**
   - GET `/api/pages` - Lista de páginas
   - GET `/api/pages/[slug]` - Detalhes de página específica
   - POST `/api/pages` - Criar nova página
   - DELETE `/api/pages` - Deletar página

---

## 👥 Perfis de Usuários

### Perfil 1: Designer/PM (Criador de Conteúdo)
- **Objetivo**: Criar e editar páginas visualmente
- **Familiaridade**: Básica com ferramentas de prototipação
- **Expectativas**: Interface intuitiva, drag-and-drop, preview imediato

### Perfil 2: Desenvolvedor Frontend
- **Objetivo**: Validar componentes e estrutura JSON
- **Familiaridade**: Alta com desenvolvimento web
- **Expectativas**: Código limpo, API consistente, debug fácil

### Perfil 3: QA Tester
- **Objetivo**: Validar funcionalidades e encontrar bugs
- **Familiaridade**: Média com aplicações web
- **Expectativas**: Comportamento previsível, mensagens de erro claras

---

## 🧪 Cenários de Teste

### Cenário 1: Primeiro Acesso ao Dashboard
**Persona**: Designer/PM  
**Pré-condições**: Usuário nunca acessou o sistema  
**URL**: `http://localhost:3000/studio`

#### Passos
1. Abrir navegador e acessar `/studio`
2. Observar tela inicial do Puck
3. Verificar se sidebar está visível
4. Verificar se lista de páginas está carregada
5. Verificar se há página padrão selecionada

#### Resultado Esperado
- ✅ Sidebar visível com lista de páginas
- ✅ Páginas existentes listadas (home, backoffice)
- ✅ Interface carregada sem erros
- ✅ Editor Puck funcional no centro
- ✅ Mensagens de boas-vindas claras

#### Critérios de Aceitação
- [ ] Tempo de carregamento < 3 segundos
- [ ] Sem erros no console do navegador
- [ ] Sidebar responsiva em desktop
- [ ] Todas as páginas listadas corretamente

---

### Cenário 2: Navegar Entre Páginas Existentes
**Persona**: Todos os perfis  
**Pré-condições**: Usuário está em `/studio`

#### Passos
1. Clicar em "Home" na sidebar
2. Observar conteúdo carregado no editor
3. Clicar em "BackOffice > Revisão de Questões > Lista"
4. Observar mudança de conteúdo
5. Clicar em "BackOffice > Revisão de Questões > Detalhe"
6. Retornar para Home

#### Resultado Esperado
- ✅ Navegação sem reload da página
- ✅ Conteúdo atualizado instantaneamente
- ✅ Página ativa destacada na sidebar
- ✅ URL query param `?page=` atualizado
- ✅ Editor mostra conteúdo correto

#### Critérios de Aceitação
- [ ] Transição suave entre páginas
- [ ] Highlight visual da página ativa
- [ ] Conteúdo JSON renderizado corretamente
- [ ] Nenhum flash de conteúdo não estilizado

---

### Cenário 3: Criar Nova Página
**Persona**: Designer/PM  
**Pré-condições**: Usuário está em `/studio`

#### Passos
1. Localizar campo "Nova página" na sidebar
2. Digitar nome da página: `teste-usuario-qa`
3. Pressionar Enter ou clicar no botão criar
4. Verificar se nova página aparece na lista
5. Verificar se nova página é aberta automaticamente
6. Editar conteúdo da nova página (adicionar Text component)
7. Salvar mudanças (Ctrl+S ou botão Publish)

#### Resultado Esperado
- ✅ Página criada com sucesso
- ✅ Nova página listada na sidebar
- ✅ Arquivo JSON criado em `data/pages/`
- ✅ Editor carregado com página vazia
- ✅ Conteúdo salvo persistido

#### Critérios de Aceitação
- [ ] Nome da página validado (slug válido)
- [ ] Feedback visual de sucesso
- [ ] Página imediatamente navegável
- [ ] Arquivo JSON bem formatado

#### Casos de Erro a Testar
- [ ] Nome vazio → mensagem de erro
- [ ] Nome duplicado → mensagem de erro
- [ ] Caracteres especiais → conversão para slug válido
- [ ] Nome muito longo → validação ou truncamento

---

### Cenário 4: Editar Página Existente
**Persona**: Designer/PM  
**Pré-condições**: Usuário está visualizando página "home"

#### Passos
1. Navegar para página "home"
2. Adicionar novo componente Text via Puck
3. Editar propriedades (conteúdo, tamanho, cor)
4. Adicionar componente Button
5. Reorganizar componentes via drag-and-drop
6. Clicar em "Publish" para salvar
7. Recarregar página (F5) e verificar persistência

#### Resultado Esperado
- ✅ Componentes adicionados visualmente
- ✅ Propriedades editáveis em tempo real
- ✅ Drag-and-drop funcional
- ✅ Mudanças persistidas após reload
- ✅ JSON atualizado no filesystem

#### Critérios de Aceitação
- [ ] Interface Puck responsiva
- [ ] Preview em tempo real
- [ ] Propriedades renderizadas corretamente
- [ ] Dados persistidos no JSON

---

### Cenário 5: Deletar Página
**Persona**: Designer/PM  
**Pré-condições**: Página de teste criada anteriormente

#### Passos
1. Localizar página `teste-usuario-qa` na sidebar
2. Clicar no ícone de delete (🗑️) ao lado da página
3. Confirmar ação na dialog de confirmação
4. Verificar se página sumiu da lista
5. Tentar navegar para `/studio?page=teste-usuario-qa`
6. Verificar mensagem de página não encontrada

#### Resultado Esperado
- ✅ Dialog de confirmação exibida
- ✅ Página removida da lista
- ✅ Arquivo JSON deletado
- ✅ Navegação para página deletada retorna erro apropriado
- ✅ Não há erros no console

#### Critérios de Aceitação
- [ ] Confirmação obrigatória antes de deletar
- [ ] Feedback visual de sucesso
- [ ] Página não mais acessível
- [ ] Cleanup completo (sem arquivos órfãos)

#### Casos de Erro a Testar
- [ ] Cancelar deleção → página mantida
- [ ] Deletar última página → comportamento definido
- [ ] Deletar página aberta → redirecionamento automático

---

### Cenário 6: Navegação por Teclado
**Persona**: QA Tester / Usuário com necessidades de acessibilidade  
**Pré-condições**: Usuário está em `/studio`

#### Passos
1. Usar Tab para navegar pelos elementos da sidebar
2. Verificar indicador de foco visível (focus-visible)
3. Pressionar Enter em uma página para navegar
4. Usar Tab para navegar até botão de criar página
5. Digitar nome e pressionar Enter
6. Usar Shift+Tab para voltar
7. Usar Escape para fechar modals/dialogs

#### Resultado Esperado
- ✅ Foco visível em todos elementos interativos
- ✅ Ordem lógica de tabulação
- ✅ Enter e Escape funcionam como esperado
- ✅ Atalhos de teclado documentados

#### Critérios de Aceitação
- [ ] Foco visível (outline ou border)
- [ ] Navegação lógica top-to-bottom
- [ ] Atalhos funcionam consistentemente
- [ ] Sem armadilhas de foco (focus traps)

---

### Cenário 7: Responsividade Mobile
**Persona**: Designer/PM usando tablet/celular  
**Pré-condições**: Dispositivo mobile ou DevTools mobile emulation

#### Passos
1. Abrir `/studio` em dispositivo mobile (< 768px)
2. Verificar se sidebar está colapsada por padrão
3. Clicar no ícone de menu (☰) para abrir sidebar
4. Navegar para uma página
5. Verificar se sidebar fecha automaticamente
6. Tentar editar página no Puck mobile
7. Testar gestos de swipe se disponíveis

#### Resultado Esperado
- ✅ Sidebar colapsável em mobile
- ✅ Toggle de menu funcional
- ✅ Conteúdo responsivo
- ✅ Editor Puck usável em telas pequenas
- ✅ Textos legíveis sem zoom

#### Critérios de Aceitação
- [ ] Breakpoint 768px funcionando
- [ ] Touch targets ≥ 44x44px
- [ ] Sem scroll horizontal não intencional
- [ ] Gestos touch funcionais

---

## 🧑‍🦽 Testes de Acessibilidade

### WCAG 2.1 Level AA Checklist

#### Perceptível
- [ ] **1.1.1** - Imagens têm texto alternativo
- [ ] **1.3.1** - Estrutura semântica (headings, landmarks)
- [ ] **1.4.3** - Contraste mínimo 4.5:1 para textos
- [ ] **1.4.11** - Contraste mínimo 3:1 para UI components

#### Operável
- [ ] **2.1.1** - Toda funcionalidade acessível via teclado
- [ ] **2.1.2** - Sem armadilhas de teclado
- [ ] **2.4.3** - Ordem de foco lógica
- [ ] **2.4.7** - Indicador de foco visível

#### Compreensível
- [ ] **3.1.1** - Idioma da página declarado (`lang="pt-BR"`)
- [ ] **3.2.1** - Foco não causa mudanças de contexto inesperadas
- [ ] **3.3.1** - Erros identificados claramente
- [ ] **3.3.2** - Labels ou instruções para inputs

#### Robusto
- [ ] **4.1.2** - ARIA roles, states e properties corretos
- [ ] **4.1.3** - Mensagens de status anunciadas

### Ferramentas Recomendadas
- **axe DevTools** (extensão Chrome/Firefox)
- **WAVE** (Web Accessibility Evaluation Tool)
- **Lighthouse** (auditoria integrada Chrome)
- **NVDA / JAWS** (leitores de tela)

---

## 🌐 Testes Cross-Browser

### Navegadores Suportados
| Navegador | Versão Mínima | Prioridade | Status |
|-----------|---------------|------------|--------|
| Chrome    | 120+          | Alta       | 🟢 Testar |
| Firefox   | 115+          | Alta       | 🟢 Testar |
| Safari    | 16+           | Média      | 🟡 Testar |
| Edge      | 120+          | Média      | 🟡 Testar |
| Mobile Safari | 16+       | Alta       | 🟢 Testar |
| Chrome Mobile | 120+      | Alta       | 🟢 Testar |

### Matriz de Testes
Para cada navegador, testar:
1. Carregamento inicial do Dashboard
2. Navegação entre páginas
3. Criação de nova página
4. Edição de conteúdo no Puck
5. Deleção de página
6. Responsividade

---

## 🐛 Relatório de Bugs

### Template de Bug Report
```markdown
## [BUG] Título Descritivo

**Severidade**: Crítico / Alto / Médio / Baixo
**Prioridade**: P0 / P1 / P2 / P3

### Ambiente
- **Navegador**: Chrome 120
- **OS**: Windows 11
- **Resolução**: 1920x1080
- **URL**: http://localhost:3000/studio

### Passos para Reproduzir
1. Passo 1
2. Passo 2
3. Passo 3

### Resultado Esperado
O que deveria acontecer

### Resultado Atual
O que está acontecendo

### Screenshots/Vídeos
[Anexar se disponível]

### Console Errors
```
[Colar erros do console]
```

### Informações Adicionais
Qualquer contexto relevante
```

---

## 📊 Métricas de Qualidade

### KPIs de Teste
- **Cobertura de Cenários**: 7/7 cenários testados
- **Taxa de Sucesso**: % de testes passando
- **Bugs Encontrados**: Quantidade por severidade
- **Tempo Médio de Teste**: Por cenário

### Critérios de Release
- [ ] 100% dos cenários críticos (1-4) passando
- [ ] 0 bugs de severidade crítica
- [ ] ≤ 2 bugs de severidade alta
- [ ] Acessibilidade WCAG 2.1 AA compliance
- [ ] Cross-browser testado em Chrome + Firefox + Safari

---

## 📝 Checklist Final de QA

### Antes de Iniciar Testes
- [ ] Ambiente local funcionando (`pnpm dev:studio`)
- [ ] Build sem erros (`pnpm build`)
- [ ] Lint passando (`pnpm lint`)
- [ ] Banco de dados/arquivos de teste preparados

### Durante os Testes
- [ ] Documentar cada bug encontrado
- [ ] Capturar screenshots/vídeos de problemas
- [ ] Testar casos de erro além do happy path
- [ ] Verificar console do navegador para erros

### Após os Testes
- [ ] Consolidar relatório de bugs
- [ ] Calcular métricas de qualidade
- [ ] Criar issues no GitHub para bugs confirmados
- [ ] Comunicar resultados ao time

---

## 🚀 Próximos Passos

### Recomendações
1. **Automação**: Considerar Playwright ou Cypress para testes E2E
2. **CI/CD**: Integrar testes no pipeline (GitHub Actions)
3. **Monitoramento**: Adicionar analytics para uso real
4. **Feedback**: Criar formulário para usuários reportarem bugs

### Melhorias Futuras
- [ ] Testes de performance (Lighthouse CI)
- [ ] Testes de segurança (OWASP)
- [ ] Testes de carga (stress testing)
- [ ] Visual regression testing (Chromatic)

---

## 📚 Recursos Adicionais

### Documentação Relacionada
- `docs/c2-implementation.md` - Implementação da Sidebar
- `docs/backlog.md` - Roadmap do projeto
- `docs/accessibility-audit.md` - Auditoria de acessibilidade
- `apps/studio/src/app/api/pages/README.md` - Documentação da API

### Links Úteis
- [Puck Documentation](https://puckeditor.com/docs)
- [Next.js Testing Guide](https://nextjs.org/docs/testing)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [MDN Web Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)

---

**Última Atualização**: 2025-11-20  
**Responsável**: QA Team  
**Status**: 📋 Pronto para Uso
