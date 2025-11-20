#!/bin/bash

# Script para gerar índice automático de jornadas por domínio
# Uso: pnpm gen:jornadas

set -e

DOMAINS_DIR="$(pwd)/domains"
OUTPUT_FILE="$DOMAINS_DIR/INDEX.md"

echo "🔄 Gerando índice de jornadas..."

# Criar cabeçalho do arquivo
cat > "$OUTPUT_FILE" << 'EOF'
# Índice de Jornadas - EDUCACROSS Prototipação

**Última atualização**: $(date -u +'%Y-%m-%d %H:%M:%S') UTC

> Este arquivo é gerado automaticamente. Para regenerar, execute: `pnpm gen:jornadas`

---

EOF

# Iterar por cada domínio
for domain_dir in "$DOMAINS_DIR"/*/; do
  if [ -d "$domain_dir" ]; then
    domain_name=$(basename "$domain_dir")
    
    # Pular o template-jornada.md se existir
    if [ "$domain_name" = "template-jornada.md" ]; then
      continue
    fi
    
    # Adicionar seção do domínio
    echo "## $domain_name" >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"
    
    # Verificar se há README do domínio
    if [ -f "$domain_dir/README.md" ]; then
      echo "**[📖 Documentação do Domínio](./$domain_name/README.md)**" >> "$OUTPUT_FILE"
      echo "" >> "$OUTPUT_FILE"
    fi
    
    # Listar jornadas
    if [ -d "$domain_dir/journeys" ]; then
      echo "### Jornadas" >> "$OUTPUT_FILE"
      echo "" >> "$OUTPUT_FILE"
      
      journey_count=0
      for journey_dir in "$domain_dir/journeys"/*/; do
        if [ -d "$journey_dir" ]; then
          journey_name=$(basename "$journey_dir")
          journey_count=$((journey_count + 1))
          
          # Ler informações do README da jornada
          if [ -f "$journey_dir/README.md" ]; then
            # Extrair título e descrição
            objective=$(grep -m 1 "^## 🎯" "$journey_dir/README.md" || echo "")
            
            if [ -z "$objective" ]; then
              objective=$(grep -m 1 "^## Objetivo" "$journey_dir/README.md" || echo "")
            fi
            
            # Criar link para a jornada
            echo "- **[$journey_name](./$domain_name/journeys/$journey_name/README.md)** - Jornada prototipada" >> "$OUTPUT_FILE"
          else
            echo "- **$journey_name** - Sem documentação" >> "$OUTPUT_FILE"
          fi
        fi
      done
      
      if [ $journey_count -eq 0 ]; then
        echo "*(nenhuma jornada ainda)*" >> "$OUTPUT_FILE"
      fi
      
      echo "" >> "$OUTPUT_FILE"
    else
      echo "*(sem jornadas)*" >> "$OUTPUT_FILE"
      echo "" >> "$OUTPUT_FILE"
    fi
  fi
done

# Adicionar estatísticas
echo "---" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"
echo "## 📊 Estatísticas" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

# Contar domínios
domain_count=$(find "$DOMAINS_DIR" -mindepth 1 -maxdepth 1 -type d ! -name ".git" ! -name "node_modules" 2>/dev/null | wc -l)

# Contar jornadas
journey_count=$(find "$DOMAINS_DIR" -name "journeys" -type d -exec find {} -mindepth 1 -maxdepth 1 -type d \; 2>/dev/null | wc -l)

echo "- **Domínios**: $domain_count" >> "$OUTPUT_FILE"
echo "- **Jornadas**: $journey_count" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

# Adicionar instruções
echo "## 🚀 Próximos Passos" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"
echo "1. **Criar nova jornada**: Veja [CONTRIBUTING.md](../CONTRIBUTING.md#criando-uma-jornada)" >> "$OUTPUT_FILE"
echo "2. **Editar no Studio**: Acesse http://localhost:3000/studio" >> "$OUTPUT_FILE"
echo "3. **Ver no Storybook**: Acesse http://localhost:6006" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

echo "✅ Índice gerado com sucesso em: $OUTPUT_FILE"
echo "📊 Total: $domain_count domínios, $journey_count jornadas"
