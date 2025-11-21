#!/bin/bash

# Script para verificar saúde do repositório
# Uso: ./scripts/health/check-health.sh

set -e

echo "🏥 Verificando saúde do repositório..."
echo ""

# Cores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# 1. Verificar build
echo "📦 Verificando builds..."
if [ -d "apps/studio/.next" ] && [ -d "apps/storybook/storybook-static" ]; then
    echo -e "${GREEN}✓${NC} Builds encontrados"
    BUILD_STATUS="success"
else
    echo -e "${RED}✗${NC} Builds não encontrados. Execute: pnpm build"
    BUILD_STATUS="failed"
fi
echo ""

# 2. Executar lint
echo "🔍 Executando lint..."
LINT_OUTPUT=$(mktemp)
if pnpm lint > "$LINT_OUTPUT" 2>&1; then
    WARNINGS=$(grep -E "warning" "$LINT_OUTPUT" | wc -l || echo 0)
    ERRORS=$(grep -E "([0-9]+) error" "$LINT_OUTPUT" | grep -oE "([0-9]+) error" | grep -oE "[0-9]+" | head -1 || echo 0)
    
    if [ "$ERRORS" -gt 0 ]; then
        echo -e "${RED}✗${NC} Lint com $ERRORS erro(s)"
        LINT_STATUS="failed"
    elif [ "$WARNINGS" -gt 0 ]; then
        echo -e "${YELLOW}⚠${NC} Lint com $WARNINGS aviso(s)"
        LINT_STATUS="warning"
    else
        echo -e "${GREEN}✓${NC} Lint OK"
        LINT_STATUS="success"
    fi
else
    echo -e "${RED}✗${NC} Lint falhou"
    LINT_STATUS="failed"
fi
rm -f "$LINT_OUTPUT"
echo ""

# 3. Verificar tamanho do bundle Storybook
echo "📚 Verificando bundle do Storybook..."
if [ -d "apps/storybook/storybook-static" ]; then
    BUNDLE_SIZE=$(du -sh apps/storybook/storybook-static | cut -f1)
    echo -e "${GREEN}✓${NC} Bundle: $BUNDLE_SIZE"
    STORYBOOK_STATUS="built"
else
    echo -e "${YELLOW}○${NC} Bundle não encontrado"
    STORYBOOK_STATUS="not-built"
fi
echo ""

# 4. Verificar dependências desatualizadas
echo "📦 Verificando dependências..."
OUTDATED_COUNT=$(pnpm outdated --format json 2>/dev/null | jq 'length' 2>/dev/null || echo 0)
if [ "$OUTDATED_COUNT" -eq 0 ]; then
    echo -e "${GREEN}✓${NC} Todas as dependências atualizadas"
    DEPS_STATUS="updated"
else
    echo -e "${YELLOW}⚠${NC} $OUTDATED_COUNT dependência(s) desatualizada(s)"
    DEPS_STATUS="outdated"
fi
echo ""

# Resumo
echo "═══════════════════════════════════════"
echo "📊 RESUMO DE SAÚDE"
echo "═══════════════════════════════════════"
echo "Build:        $BUILD_STATUS"
echo "Lint:         $LINT_STATUS"
echo "Storybook:    $STORYBOOK_STATUS"
echo "Dependências: $DEPS_STATUS"
echo "═══════════════════════════════════════"
echo ""

# Exit code baseado no pior status
if [ "$BUILD_STATUS" = "failed" ] || [ "$LINT_STATUS" = "failed" ]; then
    echo -e "${RED}❌ Verificação de saúde FALHOU${NC}"
    exit 1
elif [ "$LINT_STATUS" = "warning" ] || [ "$DEPS_STATUS" = "outdated" ]; then
    echo -e "${YELLOW}⚠️  Verificação de saúde com AVISOS${NC}"
    exit 0
else
    echo -e "${GREEN}✅ Verificação de saúde OK${NC}"
    exit 0
fi
