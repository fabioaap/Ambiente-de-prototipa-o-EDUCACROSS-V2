# Scripts de Automação

Este diretório contém scripts de automação para o projeto.

## Scripts Disponíveis

### `gen-journeys-index.js`

Gera automaticamente um índice de todas as jornadas organizadas por domínio.

**Uso:**
```bash
pnpm gen:journeys
```

**O que faz:**
- Varre `domains/*/journeys/*/README.md`
- Extrai títulos das jornadas
- Gera `domains/JOURNEYS.md` com:
  - Lista de domínios
  - Lista de jornadas por domínio
  - Links para documentação
  - Estatísticas

**Quando usar:**
- Após criar nova jornada
- Após renomear jornada
- Após atualizar título no README da jornada
- Pode ser executado em CI/CD para manter índice atualizado

**Saída:** `domains/JOURNEYS.md`

---

### `gh/` (GitHub Automation)

Scripts para automação de setup no GitHub.

Consulte: [`gh/README.md`](./gh/README.md)

---

## Contribuindo

Ao adicionar novos scripts:
1. Adicione comando em `package.json` se necessário
2. Documente neste README
3. Adicione comentários no código
4. Teste localmente antes de commitar
