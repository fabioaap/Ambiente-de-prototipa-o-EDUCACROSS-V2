# 🧪 Guia Rápido - QA Dashboard

**Para**: QA Testers, PMs, Stakeholders  
**Tempo estimado**: 30-60 minutos  
**Pré-requisito**: Acesso ao ambiente local

---

## 🎯 O Que Vamos Testar?

O **Dashboard** (também chamado de **Studio**) é a interface principal para:
- Criar páginas de prototipação
- Editar conteúdo visual com Puck
- Navegar entre páginas
- Gerenciar páginas (deletar, renomear)

---

## 📚 Documentos Disponíveis

Este guia é um **quick start**. Para detalhes completos, consulte:

1. **`qa-dashboard-testing.md`** → Cenários detalhados de teste
2. **`qa-dashboard-checklist.md`** → Checklist imprimível para execução
3. **`qa-user-flows.md`** → Fluxos de usuário com diagramas

---

## 🚀 Setup Rápido (5 minutos)

### 1. Clonar repositório
```bash
git clone https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2.git
cd Ambiente-de-prototipa-o-EDUCACROSS-V2
```

### 2. Instalar dependências
```bash
npm install -g pnpm@9.14.4
pnpm install
```

### 3. Buildar pacotes
```bash
pnpm build:tokens
pnpm build:design-system
```

### 4. Iniciar Studio
```bash
pnpm dev:studio
```

### 5. Abrir no navegador
```
http://localhost:3000/studio
```

✅ Se você ver a sidebar com páginas, está pronto!

---

## 🧪 Teste Rápido (15 minutos)

### Teste 1: Navegação Básica (2 min)
1. Abra http://localhost:3000/studio
2. Clique em diferentes páginas na sidebar
3. ✅ Verifica: Conteúdo muda sem reload

### Teste 2: Criar Página (3 min)
1. Digite nome no campo "Nova página": `teste-qa-1`
2. Pressione Enter
3. ✅ Verifica: Página criada e aparece na lista

### Teste 3: Editar Conteúdo (5 min)
1. Na página criada, clique "+ Add component"
2. Selecione "Text"
3. Edite propriedades (content, size, color)
4. Clique "Publish"
5. Recarregue página (F5)
6. ✅ Verifica: Mudanças persistidas

### Teste 4: Deletar Página (2 min)
1. Encontre página `teste-qa-1` na sidebar
2. Clique no ícone 🗑️
3. Confirme deleção
4. ✅ Verifica: Página removida da lista

### Teste 5: Teclado (3 min)
1. Pressione Tab várias vezes
2. ✅ Verifica: Foco visível em cada elemento
3. Navegue até uma página e pressione Enter
4. ✅ Verifica: Página abre

---

## 🐛 Como Reportar Bugs

### Formato Simples
```
Título: [BUG] Descrição curta
Severidade: Crítico/Alto/Médio/Baixo

Passos:
1. Fiz X
2. Fiz Y
3. Esperava Z, mas aconteceu W

Navegador: Chrome 120
Screenshot: [anexar se possível]
```

### Onde Reportar
- Criar issue no GitHub
- Ou notificar via Slack/Email o time

---

## ✅ Critérios de Sucesso

### Cenário Ideal (Tudo Funcionando)
- [x] Navegação fluida entre páginas
- [x] Criar página em < 30 segundos
- [x] Edição visual funciona
- [x] Mudanças são salvas
- [x] Deletar funciona com confirmação
- [x] Navegação por teclado OK
- [x] Sem erros no console

### Bloqueadores (Deve Reportar Imediatamente)
- [ ] Não consegue acessar `/studio`
- [ ] Páginas não aparecem na sidebar
- [ ] Criar página não funciona
- [ ] Mudanças não são salvas
- [ ] Erros críticos no console

---

## 📊 Após os Testes

### Preencha este resumo:
```
Data: ___/___/_____
Tester: _______________
Tempo total: ______ minutos

Testes executados: _____ / 5
Testes passados: _____ / 5
Bugs encontrados: _____
  - Críticos: _____
  - Altos: _____
  - Médios: _____
  - Baixos: _____

Recomendação:
☐ Aprovar para produção
☐ Aprovar com ressalvas
☐ Reprovar (bugs críticos)

Comentários:
_________________________________
_________________________________
```

---

## 🆘 Troubleshooting

### Problema: Porta 3000 ocupada
```bash
# Matar processo na porta 3000
kill -9 $(lsof -ti:3000)
# Ou usar porta alternativa
pnpm dev:studio -- -p 3001
```

### Problema: Build falha
```bash
# Limpar e reinstalar
pnpm clean
pnpm install
pnpm build
```

### Problema: Páginas não aparecem
```bash
# Verificar se arquivos existem
ls domains/studio/data/pages/
# Deve listar: home.json, backoffice/
```

---

## 📞 Contatos

**Dúvidas técnicas**: DevOps Team  
**Dúvidas de negócio**: PM Team  
**Reportar bugs**: GitHub Issues

---

## 📖 Próximos Passos

Depois de completar este guia rápido:
1. **Teste completo**: Use `qa-dashboard-checklist.md`
2. **Entenda fluxos**: Leia `qa-user-flows.md`
3. **Detalhes técnicos**: Consulte `qa-dashboard-testing.md`

---

**Boa sorte nos testes! 🎯**

Qualquer problema, documente e reporte. Seu feedback é valioso para melhorar o produto.
