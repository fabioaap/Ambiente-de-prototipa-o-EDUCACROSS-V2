# Backlog: Validação de Estrutura de Pastas

**Data**: 27 de novembro de 2025  
**Prioridade**: Média (pré-requisito para próximas jornadas)  
**Sprint**: Sprint 3 / Phase 3

---

## 📋 Tarefas

### Task 1: Auditoria de Conformidade de Jornadas

Validar que cada jornada em `domains/{dominio}/journeys/` atende o template:

- [ ] `domains/Game/journeys/game-hub/`
  - [ ] Verificar se README.md tem todas as seções (Objetivo, Contexto, Componentes, Status, Links)
  - [ ] Confirmar se `notas.md` tem anotações relevantes
  - [ ] Confirmar se `links.md` tem links para protótipos/páginas
  
- [ ] `domains/FrontOffice/journeys/onboarding/`
  - [ ] Mesmas verificações acima
  
- [ ] `domains/BackOffice/journeys/revisao-questoes/`
  - [ ] Mesmas verificações acima

### Task 2: Mapeamento de Jornadas Faltantes

Comparar com roadmap do projeto:

- [ ] Listar todas as jornadas planejadas no escopo
- [ ] Marcar quais já existem em `domains/`
- [ ] Identificar quais precisam ser criadas (pasta + documentação)
- [ ] Priorizar por impacto e dependências

### Task 3: Padronização de Template

- [ ] Revisar `domains/template-jornada.md` para melhorias
- [ ] Garantir que todos os READMEs seguem o template exatamente
- [ ] Adicionar seção de "Dependências" se necessário
- [ ] Adicionar seção de "Critérios de Aceitação" (para DEV)

### Task 4: Atualização de Índices

- [ ] Revisar `domains/README.md` – listar domínios e jornadas
- [ ] Revisar `domains/INDEX.md` – garantir que é índice navegável
- [ ] Sincronizar com `PROGRESS_DASHBOARD.md` e `SPRINT3_FINAL_STATUS.md`

---

## 🔍 Observações Iniciais

- **Estrutura atual**: 4 domínios (Home, Game, FrontOffice, BackOffice) com 3 jornadas ativas
- **Padrão**: Cada jornada tem `README.md`, `notas.md`, `links.md` (✅ Bom)
- **Variação**: Alguns READMEs têm estrutura ligeiramente diferente do template (formato, seções adicionais)
- **Documentação**: Parece haver bom preenchimento; validar profundidade

---

## 📌 Próximos Passos

1. Executar Task 1 primeiro (validação rápida)
2. Com base em gaps encontrados, definir Task 2 e 3
3. Task 4 é sincronização final

**Responsável sugerido**: Agente de Documentação ou DevOps (estrutura/índices)

---

## ✅ Checklist de Conclusão

- [ ] Todas as jornadas passam na auditoria de conformidade
- [ ] Não há jornadas faltantes críticas
- [ ] Índices estão atualizados e navegáveis
- [ ] Documentação está alinhada com roadmap
- [ ] Nenhuma pasta com nome "TODO" ou placeholder vazio

