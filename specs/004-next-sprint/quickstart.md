# Quickstart — Next Sprint

## Verify environment
```bash
node --version
pnpm --version
pnpm install --frozen-lockfile
```

## Build order
```bash
pnpm build:tokens
pnpm build:design-system
pnpm -r build
```

## Dev servers
```bash
pnpm dev:studio
pnpm dev:storybook
```

## Test dashboard APIs
- Hit `/api/dashboard/summary`, `/api/dashboard/health`, `/api/dashboard/pages?page=1&pageSize=10`
