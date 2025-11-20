# Notas da Jornada – Revisão de Questões

## Feedback inicial (20/11/2025)
- PM solicitou destaque para tempo médio de revisão por questão → incluir métrica na próxima iteração do dashboard.
- Designers pediram componente de badge para status (pendente/aprovado/revisar) – requisito registrado no backlog (B4/B5).
- Revisores querem campo rápido para comentários pré-definidos ao solicitar ajustes.

## Ideias para experimentos
1. **Aprovação em lote**: permitir selecionar múltiplas questões e aprovar de uma vez.
2. **Filtro por matéria**: adicionar filtro simples antes da lista (Matemática, Português, Ciências).
3. **Histórico de ações**: mostrar timeline com quem aprovou/rejeitou.

## Bloqueios/Dependências
- Aguardando componente `StatusBadge` para comunicação visual do status.
- Necessário endpoint dedicado para persistir comentários e histórico (fora do escopo atual).

## Próximos passos anotados
- [ ] Validar com QA se os slugs `/backoffice/revisao-questoes/*` devem aparecer no menu do Studio.
- [ ] Definir esquema mínimo para armazenar comentários de revisão.
- [ ] Criar protótipo de modal de confirmação (usa `ConfirmDialog`).
