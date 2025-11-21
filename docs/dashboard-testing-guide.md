# Dashboard - Guia de Teste Rápido

## Pré-requisitos

- Node.js 20+
- pnpm 9.14.4+
- Repositório clonado e dependências instaladas

## Iniciar o Servidor

```bash
# Na raiz do projeto
pnpm dev:studio
```

Aguarde a mensagem:
```
✓ Starting...
✓ Ready in Xms
```

## Acessar o Dashboard

Abra no navegador: http://localhost:3000/dashboard

## Checklist de Testes

### ✅ Teste 1: Página Carrega
- [ ] Dashboard abre sem erros
- [ ] Título "Dashboard" aparece
- [ ] Subtítulo "Visão geral..." aparece

### ✅ Teste 2: Indicadores de Saúde
- [ ] Card "Total de Páginas" mostra número (3)
- [ ] Card "Domínios Ativos" mostra número (2)
- [ ] Card "Status do Build" mostra "✓ Sucesso" (verde)
- [ ] Card "Storybook" mostra "✓ Online" (verde)

### ✅ Teste 3: Resumo por Domínio
- [ ] Card "BackOffice" aparece com barra azul
- [ ] Mostra "2" páginas
- [ ] Card "FrontOffice" aparece com barra verde
- [ ] Mostra "0" páginas
- [ ] Card "Game" aparece com barra laranja
- [ ] Mostra "0" páginas

### ✅ Teste 4: Lista de Páginas
- [ ] Título "Páginas (3)" aparece
- [ ] Dropdown de filtro aparece à direita
- [ ] 3 cards de páginas são exibidos:
  - [ ] BackOffice | Revisão de Questões · Lista
  - [ ] BackOffice | Revisão de Questões · Detalhe
  - [ ] Página Inicial
- [ ] Cada card tem:
  - [ ] Nome da página
  - [ ] Slug (caminho)
  - [ ] Badge colorida com domínio
  - [ ] 2 botões de ação
  - [ ] Data de atualização

### ✅ Teste 5: Filtro por Domínio
1. Clique no dropdown "Todos os domínios"
2. Selecione "BackOffice"
   - [ ] Título muda para "Páginas (2)"
   - [ ] Apenas 2 cards são exibidos
   - [ ] Ambos têm badge "BackOffice"
3. Selecione "FrontOffice"
   - [ ] Título muda para "Páginas (0)"
   - [ ] Mensagem "Nenhuma página encontrada no domínio FrontOffice" aparece
4. Selecione "Todos os domínios"
   - [ ] Volta a mostrar 3 páginas

### ✅ Teste 6: Navegação - Editar
1. Clique em "Editar no Studio" de qualquer card
2. Deve redirecionar para `/studio?page=[slug]`
3. [ ] Editor Puck abre
4. [ ] Página correta é carregada

### ✅ Teste 7: Navegação - Visualizar
1. Clique em "Visualizar" de qualquer card
2. Deve redirecionar para `/pages/[slug]`
3. [ ] Página renderizada aparece
4. [ ] Conteúdo está correto

### ✅ Teste 8: Responsividade
1. Redimensione a janela do navegador
2. Desktop (>768px):
   - [ ] Cards em grade de múltiplas colunas
3. Mobile (<768px):
   - [ ] Cards empilhados em coluna única
   - [ ] Filtro ocupa largura total

### ✅ Teste 9: Interações Visuais
1. Passe o mouse sobre um card de página
   - [ ] Card eleva levemente
   - [ ] Sombra aumenta
   - [ ] Transição suave

### ✅ Teste 10: Home → Dashboard
1. Acesse http://localhost:3000
2. [ ] Card "Dashboard" aparece na home
3. Clique em "Ver Dashboard"
4. [ ] Redireciona para `/dashboard`

## Teste da API

```bash
# Retorna dados do dashboard
curl http://localhost:3000/api/dashboard/pages | jq '.'
```

Resposta esperada:
- `pages`: Array com 3 objetos
- `stats.totalPages`: 3
- `stats.totalDomains`: 2
- `stats.buildStatus`: "success"
- `stats.storybook`: "online"
- `domains.BackOffice.count`: 2

## Problemas Comuns

### Dashboard não carrega
- Verificar se servidor está rodando
- Verificar console do navegador para erros
- Verificar /tmp/studio-dev.log se rodando em background

### API retorna páginas vazias
- Verificar se arquivos existem em `apps/studio/data/pages/`
- Verificar permissões de leitura dos arquivos

### Erro 404 ao acessar dashboard
- Verificar se build foi executado: `pnpm build:studio`
- Verificar estrutura de rotas em `src/app/`

### Conflito de rotas
- Erro: "You cannot define a route with the same specificity..."
- Solução: Estrutura de rotas já foi corrigida nesta implementação

## Limpeza

```bash
# Parar servidor
pkill -f "next dev"

# Limpar builds (opcional)
pnpm clean
```

## Suporte

Para reportar problemas ou sugerir melhorias:
1. Abrir issue no repositório
2. Incluir prints de tela
3. Descrever passos para reproduzir
4. Incluir logs relevantes
