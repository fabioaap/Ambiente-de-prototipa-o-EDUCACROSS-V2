# Data Model – Figma MCP Token Server

## Entities

### 1. FigmaFrame
- **Description**: Snapshot of a specific frame/node pulled from the Figma REST API for Jornada #4800.
- **Fields**:
  - `fileId` (string, required) – Figma file key; validated against `.env` value.
  - `frameId` (string, required) – Node/selection identifier (e.g., `8565:17355`).
  - `name` (string, required) – Frame name for display in journey docs.
  - `type` (`FRAME` | `COMPONENT` | `COMPONENT_SET`, required) – Raw node type returned by Figma.
  - `dimensions` (object) – `{ width: number, height: number }` in px; must be ≥ 1.
  - `layers` (array<FigmaLayer>) – Flattened children extracted via figma-sync-engine.
  - `lastModified` (ISO datetime) – Provided by Figma API, used for cache invalidation.
- **Relationships**: One `FigmaFrame` feeds exactly one `TokenSet` and one `SnapshotArtifact` per export run.
- **Validation rules**: Reject frames missing `fills` or `style` data; enforce max layer depth to avoid runaway payloads.

### 2. FigmaLayer
- **Description**: Normalized child nodes used to derive badges, typography, and spacing tokens.
- **Fields**:
  - `nodeId` (string, required)
  - `name` (string, required)
  - `type` (`FRAME` | `TEXT` | `RECTANGLE` | etc.)
  - `fills` (array<SolidFill> | empty) – Colors converted to RGBA hex.
  - `font` (optional) – `{ family: string, size: number, weight: number, lineHeight: number | null }` for text nodes.
  - `spacing` (optional) – Derived vertical/horizontal spacing from absolute bounding boxes.
- **Relationships**: Belongs to one `FigmaFrame`; multiple layers can generate entries in `TokenSet.colors` or `TokenSet.typography`.

### 3. TokenSet
- **Description**: The JSON structure persisted to `packages/tokens/src/tokens.json` after MCP export.
- **Fields**:
  - `metadata` – `{ sourceFrameId, sourceFileId, exportedAt, version }`.
  - `colors` – Map<string, HexColor>; keys follow `color.rede.<slug>` / `color.status.<state>`.
  - `typography` – Map<string, TypographyToken>; `fontFamily`, `fontSize`, `fontWeight`, `lineHeight`.
  - `spacing` – Map<string, string> expressed in `px`.
  - `shadows` – Map<string, string>; optional but kept for parity with spec.
- **Validation rules**: Keys must already exist or follow agreed naming; duplicates trigger diff-friendly merge to avoid churn.
- **State transitions**: `draft` (fresh export) → `validated` (passes schema + vitest) → `published` (after `pnpm build:tokens`).

### 4. SnapshotArtifact
- **Description**: Pair of JSON metadata + base64 preview stored under `domains/BackOffice/journeys/exibir-campo-uso/assets/` for documentation.
- **Fields**:
  - `documentName`, `frameName`, `exportedAt`, `author`.
  - `dimensions` – same shape as `FigmaFrame`.
  - `layers` – limited subset (name + type) for quick context.
  - `previewBase64` – PNG thumbnail trimmed to ≤ 2 MB.
  - `notesPath` – relative path to README/notas for cross-linking.
- **Validation rules**: Preview required for acceptance scenario #2; reject payloads exceeding 2 MB.

### 5. HealthStatus
- **Description**: Typed contract appended to `/api/health`/`/api/dashboard/health` reporting MCP sync state.
- **Fields**:
  - `service` (literal `figmaMcpServer`).
  - `status` (`ok` | `degraded` | `offline`).
  - `lastSync` (ISO datetime | null).
  - `lastPayloadVersion` (string | null) – mirrors `TokenSet.metadata.version`.
  - `details` – optional string for surfaced errors (e.g., rate limit).
- **Relationships**: Consumed by dashboard `HealthSection` SWR hook; also logged to `PROGRESS_DASHBOARD.md` entries.
- **State transitions**: `offline` (no process) → `degraded` (process running but last sync failed) → `ok` (latest sync succeeded).

## Derived Data & Relationships
- `TokenSet` generation depends on `FigmaFrame.layers`; mismatched color names throw validation errors before writing to disk.
- `SnapshotArtifact.previewBase64` is derived using Figma image export API (`/images/{file_key}`) and matched to `frameId`.
- Health metrics read from the MCP CLI’s persisted run cache (e.g., `.code-to-figma/.cache/mcp-sync.json`) updated after every successful tool invocation.
