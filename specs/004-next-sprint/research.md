# Research — Next Sprint

## Decisions
- Keep Vite builder; add manualChunks for DS and Radix.
- Store high-contrast toggle in localStorage and apply CSS variables from tokens.
- Use SWR with `errorRetryInterval` and `shouldRetryOnError` tuned for dashboard.

## Risks
- Chunking may affect story HMR; validate.
- High-contrast tokens require careful CSS variable mapping.
