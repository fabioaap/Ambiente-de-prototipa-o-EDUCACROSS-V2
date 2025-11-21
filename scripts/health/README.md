# Scripts de Verificação de Saúde

Scripts para verificar a saúde e métricas do repositório de prototipação.

## Scripts Disponíveis

### `check-health.sh`

Verifica a saúde geral do repositório, incluindo:
- Status de build (Studio e Storybook)
- Status de lint (warnings e errors)
- Tamanho do bundle do Storybook
- Dependências desatualizadas

**Uso**:
```bash
./scripts/health/check-health.sh
```

**Saída**:
```
🏥 Verificando saúde do repositório...

📦 Verificando builds...
✓ Builds encontrados

🔍 Executando lint...
⚠ Lint com 1 aviso(s)

📚 Verificando bundle do Storybook...
✓ Bundle: 7.4M

📦 Verificando dependências...
⚠ 1 dependência(s) desatualizada(s)

═══════════════════════════════════════
📊 RESUMO DE SAÚDE
═══════════════════════════════════════
Build:        success
Lint:         warning
Storybook:    built
Dependências: outdated
═══════════════════════════════════════

⚠️  Verificação de saúde com AVISOS
```

**Exit Codes**:
- `0` - OK ou avisos menores
- `1` - Falhas críticas (build ou lint errors)

## Integração com CI

Para usar no GitHub Actions:

```yaml
- name: Verificar Saúde
  run: ./scripts/health/check-health.sh
```

## Dependências

- `bash` 4.0+
- `pnpm`
- `jq` (para parsing de JSON - opcional)
- `du` (para calcular tamanho de diretórios)

## Dashboard Web

Para visualizar métricas em formato web, acesse:
- **Dashboard**: `http://localhost:3000/dashboard`
- **API Health**: `http://localhost:3000/api/dashboard/health`

## Métricas Coletadas

### Build Status
- Verifica existência de `apps/studio/.next`
- Verifica existência de `apps/storybook/storybook-static`
- Status: `success` | `failed`

### Lint Status
- Executa `pnpm lint`
- Conta warnings e errors
- Status: `success` | `warning` | `failed`

### Storybook Bundle
- Calcula tamanho de `apps/storybook/storybook-static`
- Reporta em formato legível (MB)
- Status: `built` | `not-built`

### Dependencies
- Executa `pnpm outdated --format json`
- Conta dependências desatualizadas
- Status: `updated` | `outdated`

## Notas

- Os scripts verificam o estado **local** do repositório
- Para métricas de CI real, integre com GitHub Actions API
- O script é não-destrutivo (não modifica arquivos)
- Pode ser executado a qualquer momento

## Troubleshooting

### Script não executa
```bash
chmod +x ./scripts/health/check-health.sh
```

### jq não encontrado
O script funciona sem `jq`, mas com funcionalidade reduzida.

Para instalar:
```bash
# Ubuntu/Debian
sudo apt-get install jq

# macOS
brew install jq
```

### Falso positivo em builds
Se você acabou de clonar o repositório:
```bash
pnpm build
```

## Referências

- [Dashboard Health Metrics](../../docs/dashboard-health-metrics.md)
- [Dashboard Wireframe](../../docs/dashboard-wireframe.md)
- [Backlog](../../docs/backlog.md)
