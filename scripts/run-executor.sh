#!/bin/bash
# Sprint 3 Auto Executor - Convenience CLI wrapper
# Usage: ./scripts/run-executor.sh [--dry-run] [--help]

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
EXECUTOR="$SCRIPT_DIR/sprint3_auto_executor.py"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

show_help() {
    cat << EOF
Sprint 3 Auto Executor - Wrapper Script

Usage:
  ./scripts/run-executor.sh [OPTIONS]

Options:
  --dry-run       Executar em modo simulação (recomendado)
  --real          Executar em modo real (cuidado!)
  --test          Executar testes unitários
  --help          Mostrar esta ajuda

Environment Variables:
  GITHUB_TOKEN    GitHub Personal Access Token (obrigatório)

Examples:
  # Executar testes
  ./scripts/run-executor.sh --test

  # Modo dry-run (simulação)
  export GITHUB_TOKEN="ghp_..."
  ./scripts/run-executor.sh --dry-run

  # Modo real (após validar dry-run)
  ./scripts/run-executor.sh --real

Documentation:
  docs/sprint3-auto-executor.md
  scripts/README.md

EOF
}

# Check if Python is available
if ! command -v python3 &> /dev/null; then
    echo -e "${RED}❌ Python 3 não encontrado. Instale Python 3.12+${NC}"
    exit 1
fi

# Parse arguments
MODE=""
while [[ $# -gt 0 ]]; do
    case $1 in
        --dry-run)
            MODE="dry-run"
            shift
            ;;
        --real)
            MODE="real"
            shift
            ;;
        --test)
            MODE="test"
            shift
            ;;
        --help|-h)
            show_help
            exit 0
            ;;
        *)
            echo -e "${RED}❌ Argumento desconhecido: $1${NC}"
            echo "Use --help para ver opções disponíveis"
            exit 1
            ;;
    esac
done

# Default to dry-run if no mode specified
if [ -z "$MODE" ]; then
    echo -e "${YELLOW}⚠️  Modo não especificado, usando --dry-run por segurança${NC}"
    MODE="dry-run"
fi

echo "================================================================================"
echo "Sprint 3 Auto Executor"
echo "================================================================================"
echo ""

# Run tests
if [ "$MODE" = "test" ]; then
    echo -e "${GREEN}🧪 Executando testes unitários...${NC}"
    echo ""
    python3 "$SCRIPT_DIR/test_sprint3_executor.py"
    exit $?
fi

# Check for GitHub token
if [ -z "$GITHUB_TOKEN" ]; then
    echo -e "${RED}❌ GITHUB_TOKEN não definido!${NC}"
    echo ""
    echo "Configure o token:"
    echo "  export GITHUB_TOKEN=\"ghp_seu_token\""
    echo ""
    echo "Ou use GitHub CLI:"
    echo "  export GITHUB_TOKEN=\$(gh auth token)"
    echo ""
    exit 1
fi

# Check dependencies
echo "📦 Verificando dependências Python..."
if ! python3 -c "import requests" 2>/dev/null; then
    echo -e "${YELLOW}⚠️  requests não encontrado.${NC}"
    read -p "Instalar dependências automaticamente? (s/N): " install_deps
    if [ "$install_deps" = "s" ] || [ "$install_deps" = "S" ]; then
        pip install --user -r "$SCRIPT_DIR/requirements.txt"
    else
        echo -e "${RED}❌ Dependências não instaladas. Instale manualmente:${NC}"
        echo "  pip install -r $SCRIPT_DIR/requirements.txt"
        exit 1
    fi
fi
echo -e "${GREEN}✓ Dependências OK${NC}"
echo ""

# Run executor
if [ "$MODE" = "dry-run" ]; then
    echo -e "${GREEN}🔍 Executando em modo DRY RUN (simulação)${NC}"
    echo "Nenhuma alteração real será feita no repositório"
    echo ""
    python3 "$EXECUTOR" --dry-run
elif [ "$MODE" = "real" ]; then
    echo -e "${RED}⚡ ATENÇÃO: Executando em modo REAL${NC}"
    echo -e "${RED}Alterações serão feitas no repositório!${NC}"
    echo ""
    read -p "Tem certeza? (digite 'sim' para confirmar): " confirm
    if [ "$confirm" != "sim" ]; then
        echo "Cancelado."
        exit 0
    fi
    echo ""
    python3 "$EXECUTOR"
fi

exit_code=$?

echo ""
echo "================================================================================"
if [ $exit_code -eq 0 ]; then
    echo -e "${GREEN}✅ Execução concluída com sucesso!${NC}"
else
    echo -e "${RED}❌ Execução falhou com código $exit_code${NC}"
fi
echo "================================================================================"

# Show generated files
if ls report-*.md 1> /dev/null 2>&1; then
    echo ""
    echo "📄 Relatórios gerados:"
    ls -lh report-*.md | tail -3
fi

if ls sprint3-autoexecutor-*.log 1> /dev/null 2>&1; then
    echo ""
    echo "📋 Logs disponíveis:"
    ls -lh sprint3-autoexecutor-*.log | tail -3
fi

exit $exit_code
