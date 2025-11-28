# Baseline /dashboard Console Trace – 2025-11-25

_Source_: User reproduction while running `pnpm --filter studio dev` on Windows 11 with Chrome 130 (extension "Fusion" enabled). Unable to reproduce locally without GUI, so the exact console output provided by QA is archived here for before/after comparison.

```
Warning: A tree hydrated but some attributes of the server rendered HTML didn't match the client properties.
  at html
  at ...
  at DashboardPage (http://localhost:3000/_next/static/chunks/app_dashboard_page.js:122:7)

serverAttributes: <html class="bg-neutral-950 text-neutral-50" lang="pt-BR" data-theme="dark">
clientAttributes: <html class="fusion-extension-loaded" lang="pt-BR" data-theme="dark">
```

Additional DevTools output captured during the same session:

```
Download the React DevTools for a better development experience: https://reactjs.org/link/react-devtools
    at DashboardPage (<anonymous>:91:10)
api/dashboard/summary:1 
Slow network is detected. Fallback font will be used while loading: https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;...
```

This log represents the "before" state referenced in T003.
