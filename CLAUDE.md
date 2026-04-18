# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start Vite dev server on port 4231
npm run build      # Production build (outputs to /dist)
npm run build:dev  # Development-mode build
npm run lint       # ESLint validation
npm run preview    # Preview production build locally
```

Docker (production):
```bash
docker build -t portfolio-app .
docker run -p 8080:80 portfolio-app
```

Docker (dev, with hot-reload on port 4231):
```bash
docker compose -f docker-compose.dev.yml up --build
```

## Architecture

**Stack**: React 18 + Vite + TypeScript + plain CSS. No UI framework, no Tailwind, no CSS-in-JS.

Single-page app with client-side routing (React Router v6). Two routes: `/` (Index) and `*` (NotFound). No backend — fully static, deployed on AWS EC2 behind Cloudflare CDN via Nginx.

**Page composition** (`src/pages/Index.tsx`): Sections stacked vertically — Masthead, Hero, Stats, Now, Work, StackExp, QuoteContact. Navigation uses smooth-scroll anchor links (`#work`, `#now`, `#stack`, `#experience`, `#contact`).

**Styling**: Single editorial stylesheet at `src/styles/portfolio.css` — warm cream paper theme with Fraunces / Instrument Serif / JetBrains Mono / Inter. Scoped under a `.portfolio` class that `Index.tsx` and `NotFound.tsx` toggle on `<html>` and `<body>` on mount, so the stylesheet's `body.portfolio{…}` rules don't leak to other apps.

**Interactive moments**: animated SVG agent-graph in hero (`AgentGraph.tsx`), scroll-triggered count-up stats (`Stats.tsx`, IntersectionObserver + rAF), click-to-expand system diagrams on work rows (`Work.tsx`), filter buttons on work list.

**Fonts**: Loaded via Google Fonts `<link>` in `index.html` (preconnect + single stylesheet request). Do not re-import fonts in CSS.

**Analytics/GTM**: GTM ID `GTM-NFZ8ZXNL` is hardcoded in `index.html`. Two element IDs are used for GTM event tracking — preserve them: `id="resume-download-btn"` (Hero) and `id="consultation-btn"` (QuoteContact).

**Path alias**: `@` → `./src` (configured in both `vite.config.ts` and `tsconfig.app.json`).

**Deployment**: Multi-stage Dockerfile (Node 20-alpine builder → nginx:alpine). Custom `nginx.conf` handles SPA routing (`try_files $uri $uri/ /index.html`), gzip, and 1-year static asset caching.
