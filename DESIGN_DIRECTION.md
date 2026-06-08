# Portfolio Design Direction: Color Journey with Architectural Type

## Core Philosophy
The site has no single theme. It MOVES. Dark sections have cinematic warmth and real light sources. Bold color sections explode in between as transitions and statement moments. Typography is the visual composition at every beat. Text assembles as you scroll. The experience is one continuous transformation.

## User Preferences (from discussion)
- **Inspiration moments selected:** nvg8 color explosions, nvg8 text assembly, oryzo cinematic lighting, nvg8 manifesto typography — ALL FOUR
- **First impression goal:** Bold and confident
- **Rejected:** dark-only theme (feels AI slop), cream/off-white theme (also AI slop / Claude artifact default), editorial layouts, the agent graph as centerpiece
- **Domain:** AI Systems Engineer — not a designer, not a content creator. The site should feel engineered and intentional, not editorial or lifestyle.

## Scroll Beats (section-by-section)

### Beat 0: Landing (0vh)
- Deep, rich background with warmth and depth (not flat #0a0a0a)
- Dramatic warm light source from one edge (amber radial gradient, oryzo spotlight energy)
- "MUHAMMAD HANAN BALOCH" fills the viewport width in heavy, bold type — the name IS the composition
- "AI Systems Engineer" in JetBrains Mono below
- First impression: this person owns this space

### Beat 1: Statement Assembly (scroll begins, ~100-300vh)
- Name recedes and fades
- On atmospherically-lit dark background, words build at massive scale on scroll:
  - "I architect systems"
  - "that think, route,"
  - "and ship."
- Each word lands as a scroll event (nvg8 text assembly mechanic)
- Full sentence fills viewport when complete
- Key stats (real numbers) appear beneath

### Beat 2: Color Explosion / Transition (~300-400vh)
- Bold geometric shapes sweep the viewport — thick diagonal bands or expanding color fields
- Saturated burnt orange / deep amber / bold warm tone
- Entire viewport transforms (nvg8 chevron energy)
- NOT content — a pure MOMENT of visual boldness
- Transitions into first project's color environment

### Beats 3-8: Project Chapters (~200-250vh each)
- Each project gets its OWN color world (background IS the project):
  - Aviation Claims: deep navy + warm amber accents
  - FreightVoice: dark bronze / warm charcoal
  - SMS Automation: dark teal or forest green
  - (other projects get their own distinct environments)
- Transition between projects = full background color shift
- Each project has UNIQUE layout and visual gesture (NOT repeated template):
  - Aviation Claims: two diverging paths as bold thick curves
  - FreightVoice: waveform visualization
  - Each one is different
- Within each: extreme-scale watermark number, large title, highlighted key metric
- Demo buttons preserved (open existing demo overlays)

### Beat 9: Manifesto (~200vh)
- Full-viewport bold color — burnt orange or deep amber fills entire screen
- White type at manifesto scale assembles word by word:
  - "Most agents fail not on the model."
  - "They fail on the handoffs."
- This is the emotional peak — color makes it land completely differently than text on dark

### Beat 10: Stack + Experience
- Transitions back to dark with cinematic lighting
- Clean, typographic, confident
- No icon grids, no card lists
- Technologies as confident text
- Experience as tight timeline

### Beat 11: Contact
- Minimal. Bold. Done.

## Color Palette
- NOT uniform #0a0a0a throughout
- NOT cream/off-white
- Dark sections: warm dark with depth (#111111 range, slight warm tint)
- Cinematic lighting: amber/warm radial gradients as directional spotlights
- Bold color moments: burnt orange, deep amber, saturated warm tones
- Per-project environments: deep navy, dark bronze, warm charcoal, dark teal/forest green
- Text: white, warm off-white for body, accent color TBD (warm, not blue)

## Typography
- Headlines: heavy weight, viewport-scale (clamp-based, fills width)
- Name on landing: architectural scale — the text IS the visual
- Body: clean sans-serif
- Technical/stats: JetBrains Mono
- No serif fonts

## What Gets Removed from Current Build
- Entire graph system: SystemGraph, GraphNode, GraphEdge, DataPacket, graphData — ALL GONE
- Uniform #0a0a0a background
- Repeated project layout with identical watermark numbers
- Blue accent color
- BeatGenesis (graph-centric hero) — replaced with name + statement assembly
- BeatProjects (graph-highlight per project) — replaced with color-chapter projects

## What We Keep
- `ScrollBeat.tsx` and `useScrollProgress.ts` — mechanical scroll infrastructure
- Project demo overlay components (AviationClaimsDemo, FreightVoiceDemo, etc.)
- `ProjectDemoOverlay.tsx` — fullscreen modal system
- Framer Motion as animation engine
- Single-page scroll architecture
- Masthead / navigation
- Project data (titles, descriptions, stats, demo types)

## What's New to Build
- Scroll-driven word-by-word text assembly component
- Full-viewport color transitions between sections (scroll-driven background interpolation)
- Cinematic lighting system (CSS radial gradients, warm directional spotlights)
- Bold geometric transition shapes (SVG or CSS clip-path, animated on scroll)
- Per-project unique visual gestures (individual components per project)
- Viewport-scale responsive typography (clamp-based)
- Color environment system (background color interpolation tied to scroll progress)

## Technical Approach
- React 18 + Vite + TypeScript + plain CSS (no new libraries)
- Framer Motion for all scroll-driven animations
- CSS radial-gradient / conic-gradient for lighting effects
- CSS clip-path or SVG for geometric transition shapes
- clamp() for responsive viewport-scale typography
- Existing ScrollBeat/useScrollProgress infrastructure for scroll mechanics

## Design Constraints (carried forward)
- No generic fade-in animations
- No gradient backgrounds used as decoration (gradients OK as LIGHTING)
- No glassmorphism, no blur-heavy cards
- Animations at 60fps (transform and opacity only)
- No neon glows, matrix rain, terminal cliché
- No particle effects or decorative 3D
- Mobile: all interactions must have tap-friendly alternatives
- Every stat must be real — never fabricate metrics
