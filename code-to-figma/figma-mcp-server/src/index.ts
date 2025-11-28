#!/usr/bin/env node

/**
 * Figma MCP Server - Entry Point
 * 
 * Model Context Protocol server that exposes Figma design tokens
 * and selection snapshots through standardized MCP tools.
 * 
 * Tools provided:
 * - get_design_tokens: Extract design tokens from Figma frames
 * - get_selection_snapshot: Capture selection metadata and previews
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import pino from 'pino';
import { loadConfig } from './config.js';
import { invokeGetDesignTokens } from './tools/getDesignTokens.js';

// Configure structured logging to stderr (stdout is reserved for MCP protocol)
const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: {
    target: 'pino/file',
    options: { destination: 2 }, // stderr
  },
});

async function main() {
  try {
    // Load and validate configuration
    const config = loadConfig();
    logger.info({ port: config.MCP_SERVER_PORT }, 'Configuration loaded');

    // Create MCP server instance
    const server = new Server(
      {
        name: 'figma-mcp-server',
        version: '0.1.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    // Register tool list handler
    server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: 'get_design_tokens',
            description: 'Extract design tokens (colors, typography, spacing) from a Figma frame',
            inputSchema: {
              type: 'object',
              properties: {
                fileId: {
                  type: 'string',
                  description: 'Figma file ID',
                },
                frameId: {
                  type: 'string',
                  description: 'Frame node ID to extract tokens from',
                },
              },
              required: ['fileId', 'frameId'],
            },
          },
          {
            name: 'get_selection_snapshot',
            description: 'Capture metadata and preview of a Figma selection',
            inputSchema: {
              type: 'object',
              properties: {
                fileId: {
                  type: 'string',
                  description: 'Figma file ID',
                },
                nodeId: {
                  type: 'string',
                  description: 'Node ID to snapshot',
                },
                includePreview: {
                  type: 'boolean',
                  description: 'Include base64 preview image',
                  default: true,
                },
              },
              required: ['fileId', 'nodeId'],
            },
          },
        ],
      };
    });

    // Register tool execution handler
    server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      logger.info({ tool: name, args }, 'Tool called');

      try {
        // T014: get_design_tokens tool implementation
        if (name === 'get_design_tokens') {
          const result = await invokeGetDesignTokens(args);
          
          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify(result, null, 2),
              },
            ],
          };
        }

        // get_selection_snapshot - Phase 4 implementation pending
        if (name === 'get_selection_snapshot') {
          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify({
                  message: 'get_selection_snapshot - Implementation pending (Phase 4)',
                  fileId: args?.fileId,
                  nodeId: args?.nodeId,
                }, null, 2),
              },
            ],
          };
        }

        throw new Error(`Unknown tool: ${name}`);
      } catch (error: any) {
        logger.error({ error: error.message, tool: name }, 'Tool execution failed');
        
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                error: error.name || 'Error',
                message: error.message,
                tool: name,
              }, null, 2),
            },
          ],
          isError: true,
        };
      }
    });

    // Setup STDIO transport
    const transport = new StdioServerTransport();
    await server.connect(transport);

    logger.info('Figma MCP Server running on STDIO');
    logger.info('Press Ctrl+C to stop');

  } catch (error) {
    logger.error({ error }, 'Failed to start server');
    process.exit(1);
  }
}

main();
