#!/usr/bin/env node

/**
 * Script para extrair dados de um frame específico do Figma via MCP Server
 * Uso: node extract-figma-frame.mjs
 */

import { spawn } from 'child_process';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Configuração
const MCP_SERVER_PATH = resolve(__dirname, 'code-to-figma/figma-mcp-server/dist/index.js');
const FILE_ID = 'UstdVUNj2isUdfucUj5EAx';
const NODE_ID = '5636-456';

console.log('🚀 Iniciando cliente MCP...\n');

// Spawn MCP server
const mcpServer = spawn('node', [MCP_SERVER_PATH], {
    stdio: ['pipe', 'pipe', 'inherit'],
    env: { ...process.env },
});

let responseBuffer = '';
let requestId = 1;

mcpServer.stdout.on('data', (data) => {
    responseBuffer += data.toString();

    // Tentar parsear respostas JSON completas
    const lines = responseBuffer.split('\n');
    responseBuffer = lines.pop() || ''; // Guardar linha incompleta

    lines.forEach(line => {
        if (line.trim()) {
            try {
                const response = JSON.parse(line);
                console.log('📥 Resposta do servidor:\n', JSON.stringify(response, null, 2));

                // Se recebemos resposta do tools/list, chamar get_frame_snapshot
                if (response.id === 1 && response.result?.tools) {
                    console.log('\n✅ Ferramentas disponíveis:', response.result.tools.map(t => t.name).join(', '));
                    console.log('\n📸 Solicitando snapshot do frame...\n');
                    sendRequest({
                        jsonrpc: '2.0',
                        id: ++requestId,
                        method: 'tools/call',
                        params: {
                            name: 'get_frame_snapshot',
                            arguments: {
                                fileId: FILE_ID,
                                nodeId: NODE_ID,
                                format: 'png',
                                scale: 2
                            }
                        }
                    });
                }

                // Se recebemos snapshot, também pegar tokens
                if (response.id === 2 && response.result) {
                    console.log('\n🎨 Solicitando tokens de design...\n');
                    sendRequest({
                        jsonrpc: '2.0',
                        id: ++requestId,
                        method: 'tools/call',
                        params: {
                            name: 'get_design_tokens',
                            arguments: {
                                fileId: FILE_ID,
                                frameId: NODE_ID
                            }
                        }
                    });
                }

                // Se temos os tokens, encerrar
                if (response.id === 3 && response.result) {
                    console.log('\n✅ Processo concluído! Fechando conexão...\n');
                    setTimeout(() => {
                        mcpServer.kill();
                        process.exit(0);
                    }, 1000);
                }

            } catch (e) {
                // Linha não é JSON válido, ignorar
            }
        }
    });
});

mcpServer.on('error', (err) => {
    console.error('❌ Erro ao iniciar servidor MCP:', err.message);
    process.exit(1);
});

mcpServer.on('close', (code) => {
    console.log(`\n🔚 Servidor MCP encerrado com código ${code}`);
});

function sendRequest(request) {
    const message = JSON.stringify(request) + '\n';
    mcpServer.stdin.write(message);
}

// Iniciar enviando list tools
console.log('📋 Listando ferramentas disponíveis...\n');
sendRequest({
    jsonrpc: '2.0',
    id: requestId,
    method: 'tools/list',
    params: {}
});

// Timeout de segurança
setTimeout(() => {
    console.error('\n⏱️ Timeout: servidor não respondeu em 30 segundos');
    mcpServer.kill();
    process.exit(1);
}, 30000);
