# 🔧 Guia de Atualização do Token do Figma

## ❌ Problema Identificado

**Token atual está expirado:** `[TOKEN_REMOVIDO_POR_SEGURANÇA]`
- Teste retornou: 403 Forbidden
- Conta: fabio.alves@educacross.com.br

## ✅ Solução Passo a Passo

### 1️⃣ Gerar Novo Token

1. Acesse: https://www.figma.com/developers/api#access-tokens
2. Login com: **fabio.alves@educacross.com.br**
3. Clique em **"Generate new token"**
4. Nome sugerido: `EDUCACROSS-MCP-Server-2025`
5. Permissões necessárias:
   - ✅ File content (read)
   - ✅ File variables (read)
   - ✅ Dev resources (read)
6. Copie o token gerado (começa com `figd_`)

### 2️⃣ Atualizar Configurações (Execute após copiar o novo token)

#### A. Atualizar `.env.local` no MCP Server

```powershell
# Substitua YOUR_NEW_TOKEN_HERE pelo token copiado
cd C:\Users\Educacross\Documents\Ambiente-de-prototipa-o-EDUCACROSS-V2\code-to-figma\figma-mcp-server

# Backup do arquivo atual
Copy-Item .env.local .env.local.backup

# Atualizar o token (substitua YOUR_NEW_TOKEN_HERE)
$newToken = "YOUR_NEW_TOKEN_HERE"
$content = Get-Content .env.local -Raw
$content = $content -replace 'FIGMA_PERSONAL_TOKEN=.*', "FIGMA_PERSONAL_TOKEN=$newToken"
$content | Set-Content .env.local -NoNewline
```

#### B. Atualizar Variável de Ambiente do Sistema

```powershell
# Substitua YOUR_NEW_TOKEN_HERE pelo token copiado
$newToken = "YOUR_NEW_TOKEN_HERE"
[System.Environment]::SetEnvironmentVariable("FIGMA_PERSONAL_TOKEN", $newToken, "User")
[System.Environment]::SetEnvironmentVariable("FIGMA_ACCESS_TOKEN", $newToken, "User")

Write-Host "✅ Variáveis de ambiente atualizadas!" -ForegroundColor Green
Write-Host "⚠️  Você precisa REINICIAR o VS Code para as variáveis terem efeito" -ForegroundColor Yellow
```

#### C. Atualizar Configuração do MCP (se necessário)

O arquivo `.mcp/figma-server-config.json` referencia `env:FIGMA_ACCESS_TOKEN`, então vamos garantir que ambas as variáveis estejam definidas (passo B já fez isso).

### 3️⃣ Validar o Novo Token

```powershell
# Substitua YOUR_NEW_TOKEN_HERE pelo token copiado
$newToken = "YOUR_NEW_TOKEN_HERE"
$headers = @{ 'X-Figma-Token' = $newToken }

try {
    $response = Invoke-RestMethod -Uri 'https://api.figma.com/v1/me' -Headers $headers -Method Get
    Write-Host "✅ Token válido!" -ForegroundColor Green
    Write-Host "Email: $($response.email)" -ForegroundColor Cyan
    Write-Host "Nome: $($response.handle)" -ForegroundColor Cyan
} catch {
    Write-Host "❌ Token ainda inválido" -ForegroundColor Red
    Write-Host $_.Exception.Message
}
```

### 4️⃣ Adicionar Servidor MCP ao VS Code

O servidor Figma MCP não está registrado no `.vscode/mcp.json`. Vamos adicionar:

```powershell
# Este comando será executado automaticamente pelo script de atualização
# Ou você pode adicionar manualmente no arquivo .vscode/mcp.json
```

### 5️⃣ Reiniciar Serviços

```powershell
# 1. Parar servidor MCP se estiver rodando
pnpm mcp:figma:stop

# 2. Reiniciar VS Code (para carregar novas variáveis de ambiente)
# - Feche TODAS as janelas do VS Code
# - Abra novamente

# 3. Iniciar servidor MCP
cd C:\Users\Educacross\Documents\Ambiente-de-prototipa-o-EDUCACROSS-V2
pnpm mcp:figma:start
```

### 6️⃣ Testar Integração

```powershell
# Verificar se o servidor está rodando
pnpm mcp:figma:health

# Se retornar "MCP server offline", significa que precisa iniciar:
pnpm mcp:figma:start

# Testar com curl (em outro terminal)
curl http://localhost:3845/health
```

## 🔄 Problemas de Cache Identificados

### Cache Config (loadConfig)

O arquivo `src/config.ts` tem um cache:

```typescript
let cachedConfig: Config | null = null;

export function loadConfig(): Config {
  if (cachedConfig) {
    return cachedConfig; // ⚠️ Retorna cache sem revalidar
  }
  // ...
}
```

**Solução:** Reiniciar o processo do servidor MCP após atualizar `.env.local`

### Variáveis de Ambiente do PowerShell

Variáveis definidas no sistema não são carregadas automaticamente em sessões já abertas do PowerShell ou VS Code.

**Solução:** Reiniciar VS Code completamente após atualizar variáveis de ambiente.

## 📋 Checklist de Validação

- [ ] Novo token gerado no Figma
- [ ] `.env.local` atualizado
- [ ] Variáveis de ambiente do sistema atualizadas
- [ ] VS Code reiniciado
- [ ] Token validado com teste de API
- [ ] Servidor MCP iniciado (`pnpm mcp:figma:start`)
- [ ] Health check retorna sucesso
- [ ] Teste de ferramenta MCP funciona

## 🚨 Se Ainda Não Funcionar

1. **Verificar se o token tem permissões corretas:**
   - File content (read)
   - File variables (read)

2. **Verificar se a conta tem acesso ao arquivo:**
   - File ID: `5MQ9H24Zojzd8jcnHO61lK`
   - Abra no navegador: `https://www.figma.com/file/5MQ9H24Zojzd8jcnHO61lK/`

3. **Limpar todos os caches:**
   ```powershell
   # Parar servidor
   pnpm mcp:figma:stop
   
   # Limpar node_modules e reinstalar
   cd code-to-figma\figma-mcp-server
   Remove-Item node_modules -Recurse -Force
   pnpm install
   
   # Rebuild
   pnpm build
   
   # Reiniciar
   pnpm start
   ```

4. **Verificar logs do servidor:**
   ```powershell
   # Iniciar com logs detalhados
   $env:LOG_LEVEL = "debug"
   pnpm mcp:figma:start
   ```

## 📞 Suporte

Se o problema persistir após todos estes passos, verifique:
- Logs do servidor MCP (stderr output)
- Network tab no DevTools do VS Code
- Configuração de proxy/firewall corporativo
