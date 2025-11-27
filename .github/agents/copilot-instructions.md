# Ambiente-de-prototipa-o-EDUCACROSS-V2 Development Guidelines

Auto-generated from all feature plans. Last updated: 2025-11-25

## Active Technologies
- TypeScript 5.6 on Node.js 22.21.1 (pnpm workspace) + `@modelcontextprotocol/sdk` (TypeScript server utilities), `undici` (HTTP client), Figma REST API v1, `dotenv` for secrets, `zod` for validating tool IO payloads (001-figma-mcp-server)
- In-memory processing only; outputs written to repo files (`packages/tokens/src/tokens.json`, `domains/BackOffice/journeys/exibir-campo-uso/assets/*`) (001-figma-mcp-server)

- TypeScript 5.x + Next.js 15 (React 18) + Next.js App Router, SWR, Shadcn UI (scoped to Studio/Dashboard), `@prototipo/design-system`, `dashboardLogger` telemetry utilities (001-dashboard-hydration)

## Project Structure

```text
backend/
frontend/
tests/
```

## Commands

npm test; npm run lint

## Code Style

TypeScript 5.x + Next.js 15 (React 18): Follow standard conventions

## Recent Changes
- 001-figma-mcp-server: Added TypeScript 5.6 on Node.js 22.21.1 (pnpm workspace) + `@modelcontextprotocol/sdk` (TypeScript server utilities), `undici` (HTTP client), Figma REST API v1, `dotenv` for secrets, `zod` for validating tool IO payloads

- 001-dashboard-hydration: Added TypeScript 5.x + Next.js 15 (React 18) + Next.js App Router, SWR, Shadcn UI (scoped to Studio/Dashboard), `@prototipo/design-system`, `dashboardLogger` telemetry utilities

<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->
