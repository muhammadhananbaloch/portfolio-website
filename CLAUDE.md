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

**Page composition** (`src/pages/Index.tsx`): Sections stacked vertically — Masthead, Hero, Stats, Work, StackExp, QuoteContact. Navigation uses smooth-scroll anchor links (`#work`, `#stack`, `#experience`, `#contact`).

**Styling**: Single editorial stylesheet at `src/styles/portfolio.css` — warm cream paper theme with Fraunces / Instrument Serif / JetBrains Mono / Inter. Scoped under a `.portfolio` class that `Index.tsx` and `NotFound.tsx` toggle on `<html>` and `<body>` on mount, so the stylesheet's `body.portfolio{…}` rules don't leak to other apps.

**Interactive moments**: animated SVG agent-graph in hero (`AgentGraph.tsx`), scroll-triggered count-up stats (`Stats.tsx`, IntersectionObserver + rAF), click-to-expand system diagrams on work rows (`Work.tsx`), filter buttons on work list.

**Fonts**: Loaded via Google Fonts `<link>` in `index.html` (preconnect + single stylesheet request). Do not re-import fonts in CSS.

**Analytics/GTM**: GTM ID `GTM-NFZ8ZXNL` is hardcoded in `index.html`. Two element IDs are used for GTM event tracking — preserve them: `id="resume-download-btn"` (Hero) and `id="consultation-btn"` (QuoteContact).

**Path alias**: `@` → `./src` (configured in both `vite.config.ts` and `tsconfig.app.json`).

**Deployment**: Multi-stage Dockerfile (Node 20-alpine builder → nginx:alpine). Custom `nginx.conf` handles SPA routing (`try_files $uri $uri/ /index.html`), gzip, and 1-year static asset caching.

## Design Direction (Revamp)

See PORTFOLIO_REVAMP_BRIEF.md for full design brief and section-by-section direction.

## Design Constraints

- No generic fade-in animations. Every animation must be purposeful and tied to meaning.
- No gradient backgrounds, no glassmorphism, no blur-heavy cards.
- No placeholder content. Every element uses real project data.
- No generic hover effects (scale 1.05 + box-shadow). Every hover must reveal information or show a state change.
- Animations must run at 60fps. Only animate transform and opacity.
- No neon glows, matrix rain, terminal green-on-black, or "hacker movie" clichés.
- No particle effects, floating geometric shapes, or decorative 3D.
- No transitions longer than 400ms unless scroll-driven.
- No scroll-hijacking. Scroll-triggered animations only.
- Framer Motion for all interactive animations. CSS transitions for simple hover states only.
- Mobile: all hover interactions must have tap-friendly alternatives.

## Design Tokens

### Colors
- Background: #0a0a0a (base), #111111 (surface), #1a1a1a (elevated)
- Text: #e5e5e5 (primary), #999999 (secondary), #666666 (muted)
- Accent: pick ONE bright color (electric blue, amber, or green) and use it consistently for interactive elements, active states, and emphasis. Do not mix multiple accent colors.
- Border: #222222 (subtle), #333333 (visible)

### Typography
- Headlines: Inter or Geist, 600-700 weight
- Body: Inter or Geist, 400 weight
- Technical labels, stats, code: JetBrains Mono, 400 weight
- No serif fonts anywhere. Kill Fraunces and Instrument Serif entirely.

### Spacing
- Base unit: 4px
- Section padding: 80px vertical (desktop), 48px (mobile)
- Component gaps: 16px, 24px, 32px, 48px — no arbitrary values

### Animation
- Duration: 200ms (hover), 300ms (reveal), 400ms max (section transitions)
- Easing: cubic-bezier(0.22, 1, 0.36, 1) for enters, cubic-bezier(0.55, 0, 1, 0.45) for exits
- Scroll reveals: triggered at 20% element visibility via IntersectionObserver
- Stats count-up: 800ms duration, easeOut

### Breakpoints
- Mobile: max-width 768px
- Tablet: max-width 1024px
- Desktop: min-width 1025px

## Quality Gate (run before shipping)

- Accent color is NOT indigo/violet
- Cards are justified by interaction, not used as default containers
- No decorative left/side accent stripes
- No standard emoji used as icons
- No decorative one-word serif/italic/color highlight
- Strong reference traits were preserved, not averaged into safe middle
- ALL CAPS text has letter-spacing
- Font choices are intentional and contextual
- Layout has visual tension — not perfectly symmetrical everything
- No generic patterns you can't justify
- Editorial test: if replacing the name with a coffee shop still works, the design is too generic — redo it
- Card test: if removing border + shadow + background + radius doesn't hurt interaction, it's not a card — remove it
- Identity test: if the first viewport could belong to any other developer, branding is too weak