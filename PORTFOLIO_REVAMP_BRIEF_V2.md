# Portfolio Revamp Brief v2 — Experience-First Rebuild

**This replaces PORTFOLIO_REVAMP_BRIEF.md entirely.**

This is not a reskin. This is a structural rebuild. Every section on this site needs its own interaction model, its own reason for someone to stop scrolling and engage. The site should feel like navigating a system, not reading a document.

## Content Preservation — Non-Negotiable

All existing content is final and must be preserved exactly. This includes:
- Project names, descriptions, tech pills, and stats (all 6 projects)
- Experience section text (AI Engineer, JBS, all bullets)
- Stack section categories, descriptions, and tech lists
- Quote text ("Most agents fail not on the model...")
- Contact links and copy
- Hero headline, subtitle, and CTAs
- "Karachi · Remote", "AI Engineer, JBS" metadata

The UI/UX is being rebuilt. The content is not. If a section is restructured, the same information must appear in the new layout. Interactive demos ADD to the content — they don't replace the descriptions, stats, or technical details.

---

## Reference Sites — Study These Before Building

Fetch and study these three sites before writing any code. They define the experience bar:

1. **https://nvg8.io/** — Study how each section feels like a distinct screen/state. Scroll-driven reveals aren't just fade-ins — content transforms as you scroll. Sections have depth and layering. The dark palette with accent colors feels intentional, not decorative.

2. **https://oryzo.ai/** — This is the most important reference. Study how EVERY section has a completely different interaction model. One section has a hover demo. Another has a flip encryption widget. Another has a temperature slider. Another has a simulated chat. Features aren't described — they're demonstrated. Each section surprises you with something new. The personality is in the interaction, not the typography.

3. **https://palette.supply/** — Study the loading sequence, the smooth section transitions, and how creative presentation sits on top of a solid grid structure. The hover states on product cards feel tactile and purposeful.

**What to extract from these references:**
- Each section = a different interaction model (from oryzo.ai)
- Scroll should feel like moving between distinct environments (from nvg8.io)
- Transitions between sections should feel smooth and intentional (from palette.supply)
- Interactive elements invite exploration — you click things because you're curious, not because you're told to (from all three)
- Small details reward attention — easter eggs, unexpected hover states, hidden depth (from oryzo.ai)

**What NOT to extract:**
- Don't copy any specific visual style, layout, or component
- Don't add 3D/WebGL — these sites use it but this portfolio doesn't need it
- Don't add loading screens or preloaders
- Don't add sound or video

---

## Global Rules

### Page Flow
The page is a series of **full-viewport (or near-full-viewport) scenes**, not a continuous scroll of stacked sections with padding. Each scene occupies most or all of the viewport height. Scrolling moves you from one scene to the next. Scenes transition with purpose — not just "next section appears."

### Scroll Behavior
- No scroll-hijacking (scroll input is never remapped)
- Scroll-triggered animations are fine
- Sticky/pinned sections are fine (section stays fixed while scroll progresses, then releases)
- Each scene should have enough scroll distance that it doesn't flash by — let things breathe

### Animation Budget
- Every animation must have a purpose: reveal information, show a system in action, guide attention, or respond to interaction
- No animation exists just to "feel alive" — if you can't explain what it communicates, remove it
- Performance: transform + opacity only, 60fps, pause when off-screen

### Personality
- The site's personality comes from WHAT IT DOES, not how it looks
- No decorative elements that don't serve the content
- Confidence expressed through precision and interactivity, not through bold typography or clever copy

---

## Scene 1: Hero — The System

**What it is now:** 50/50 split — headline text left, small graph in a box right. A reading experience.

**What it becomes:** The agent graph IS the hero. It dominates the viewport. Your identity is woven into it, not competing beside it.

### Layout
- The agent graph fills roughly 60-70% of the viewport, positioned center-right
- It's not in a box — it bleeds into the background, nodes floating in the dark space
- Your name, title, and one-line description are positioned top-left, overlaying the scene — not in a separate column
- CTAs (See work, Résumé, Book call) sit bottom-left, small and confident — they're secondary to the graph
- "Karachi · Remote" and "AI Engineer, JBS" are subtle metadata at the very bottom edge

### The Graph Experience
- The graph is 2-3x larger than current — nodes are spaced out, edges are long, there's room to breathe
- On page load: nodes fade in sequentially (top to bottom, 100ms stagger) as if the system is booting up. Edges draw themselves after their connected nodes appear. A data packet starts flowing once all nodes are live.
- Data packet: a small accent-colored dot that continuously travels the full request path. When it reaches a node, that node's border briefly flashes accent. This runs on an infinite loop with a 5-6 second cycle.
- **Click a node** (not just hover): a panel slides in from the right edge (or expands from the node) showing 2-3 lines about what that component does in a real system. Example: clicking "orchestrator · LLM" shows "Routes each query to SQL or semantic search. A single LLM call classifies intent AND extracts prefilters. The model never touches raw data — only the 2-4 sentence insight on top." This panel has a close button or closes when you click elsewhere.
- The graph should feel like a live monitoring dashboard for an AI system. Someone should look at it and understand: this person builds systems with moving parts.

### Scroll Transition
- As the user scrolls down, the graph subtly scales down and fades (parallax), while the next scene scrolls up over it. The hero doesn't just end — it recedes.

---

## Scene 2: Projects — Case Files

**What it is now:** A vertical list of 6 identical expandable rows. Every project looks and works the same way.

**What it becomes:** A sequence of project case studies, each with its own unique interactive element. This is the core of the portfolio and should take up the most scroll distance.

### Section Header
- "Things I've shipped and kept running." — keep this line, it's strong
- Filter tabs (ALL / AI/ML / AGENTS / INFRASTRUCTURE) — keep these, they work
- The header pins at the top as you scroll through projects

### Project Layout (applies to all)
Each project is a full-width section (not a card, not a row) with generous vertical space. Layout per project:
- Left side: project name, one-line description, tech pills
- Right side: the unique interactive element for that project
- Below: stats bar for that project (the 4-number grid from the current expanded view)
- Between projects: a clear visual separator (line, spacing, or subtle background shift)

### Per-Project Interactive Elements

**This is the critical part. Each project has a DIFFERENT interactive element on the right side. Not the same diagram repeated.**

#### 01 — Aviation Claims Hybrid RAG: "Query Router Demo"
Build a mini interactive demo:
- A text input styled like a search bar: "Ask a claims question..."
- Pre-loaded example queries below it (clickable): "What's the total payout for hurricane claims in 2019?", "Show me all open claims for client Meridian", "Which adjuster handled the most claims last quarter?"
- When the user clicks a query (or types one), an animated flow appears:
  1. The query appears in the input
  2. A small router visualization shows the LLM classifying it → "SQL path" or "Semantic path" (the path lights up)
  3. A result preview appears below: either a table snippet (for SQL) or a text answer with cited sources (for semantic)
  4. Total animation time: ~2 seconds
- This is NOT a real API call — it's a scripted animation with pre-built responses for 3-4 example queries. But it FEELS like a live system.

#### 02 — Freight Voice Orchestration: "Live Call Trace"
Build a simulated call processing visualization:
- A "call transcript" that auto-scrolls on the left — showing a simulated conversation between the AI voice agent and a prospect (3-4 exchanges, realistic logistics language)
- As each exchange appears, the right side shows the system processing in real-time:
  - "Intent detected: QUALIFIED" or "Intent detected: NOT INTERESTED" (flashes in)
  - Extracted data fields filling in one by one: Origin: Richmond, VA → Destination: Dallas, TX → Weight: 12,000 lbs → Date: Next Tuesday
  - Final routing decision: "→ QUALIFIED" with the exec narrative generating
- The whole sequence plays automatically when the section scrolls into view. ~8-10 seconds total. Optional: a "Replay" button to run it again.

#### 03 — Marketing Ops Document Factory: "Before / After"
Build a comparison slider:
- Left side (drag to reveal): a messy screenshot/mockup of a spreadsheet with manual SOP data — chaotic, ugly, real-looking
- Right side: a clean generated SOP document preview — structured, formatted, professional
- A draggable divider in the middle that the user can slide left/right
- Above the slider: "60 hours → 1-2 hours per client" with the time animating/counting
- The visual contrast should be dramatic — chaos vs. order
- For the mockups: build them as styled HTML (a fake spreadsheet layout on the left, a fake document layout on the right), not images. This keeps them crisp and avoids needing external assets.

#### 04 — PropAuto CRM: "SMS Flow"
Build a simulated phone conversation:
- A phone-shaped frame (just a rounded rectangle with appropriate aspect ratio)
- Inside: a real-looking SMS thread between the system and a property owner
  - Outbound: "Hi [Name], we noticed your property at [Address] may be entering pre-foreclosure. We help homeowners explore options. Reply YES to learn more."
  - Inbound: "Yes interested"
  - System label appears: "→ Reply attributed to Campaign #127 (Richmond batch)"
  - Outbound: "Great! A specialist will reach out within 24 hours. You can also call us at..."
- Messages appear one at a time with realistic typing delays (1-2 seconds between messages)
- Below the phone: the attribution visualization — showing how the system matched this reply to the correct campaign using message history
- Auto-plays on scroll-into-view. ~6 seconds total.

#### 05 — Lead Enrichment Outreach Engine: "Pipeline Waterfall"
Build an animated pipeline visualization:
- A horizontal flow (left to right) showing data moving through stages:
  1. "Indeed scrape" → raw job posting card appears
  2. "GPT-4o compress" → the card shrinks/transforms into a compact summary
  3. "Clay enrich" → contact details animate in (name, email, phone appearing one by one)
  4. "Polling gate" → a checkmark appears: "Enrichment 100% complete"
  5. "Instantly.ai" → a preview of the personalized cold email slides in
- Each stage triggers when the previous one completes. Total: ~6 seconds.
- The stages are connected by animated lines/arrows showing data flow direction
- Stats ("3-4h → ~10min", "30-40 leads/day") appear below the pipeline once the animation completes

#### 06 — NeuroScan AI: "Classification Live View"
Build a simulated MRI classification:
- Show 4 sample MRI thumbnail images (use simple placeholder squares with labels, or abstract representations — we're NOT using real medical images)
- One image is "selected" and animates into a processing state:
  - A brief "scanning" animation (a line sweeping across the image)
  - The classification result appears: "Meningioma — 94.2% confidence"
  - A small bar chart shows the confidence across all 4 classes
- User can click different thumbnails to see different classification results
- Stats ("~5.3M params", "CPU inference", "~20MB Docker") appear below

### Scroll Behavior for Projects
- Each project occupies significant vertical space (at least 80vh)
- Projects reveal as you scroll — not all visible at once
- The interactive element for each project triggers when that project scrolls into the center of the viewport
- Scroll between projects should feel like moving between distinct exhibits in a gallery, not scrolling a list

---

## Scene 3: Stack — The Toolbox

**What it is now:** Three text blocks with pill tags and a parallel experience section.

**What it becomes:** An interactive node constellation on the left, with the experience timeline on the right.

### Left Side: Tech Constellation
- Technologies are nodes in a force-directed or manually positioned graph
- Nodes are grouped by cluster (Agents, RAG & data, Delivery) with subtle spatial separation
- Each node is a circle or rounded pill with the tech name
- **Connections between nodes represent projects** — if LangGraph and pgvector were both used in Aviation Claims, there's an edge between them
- Hovering a node:
  - That node brightens
  - All connected edges highlight
  - Connected nodes brighten
  - A small label appears showing which projects connect them
- Clicking a node shows a mini-panel: the one-line production usage description (same content as current tooltips, but better presented)
- The constellation should feel like a living map of your technical world

### Right Side: Experience Timeline
- Keep the current content (AI Engineer, JBS, Oct 2025 – Present, bullet list)
- Add a vertical timeline line on the left edge with a pulsing dot at "Present"
- The bold project names in each bullet should be interactive — clicking one scrolls you back up to that project's section in the case files

### Layout
- Two-column: constellation left (~55%), timeline right (~45%)
- The constellation is vertically centered in its column
- Full-viewport height or close to it

---

## Scene 4: Quote — The Moment

**What it is now:** Big centered text that fades in.

**What it becomes:** A full-viewport scroll-pinned moment.

### Behavior
- The section is ~200vh tall but the content is sticky-positioned at center
- As the user scrolls through the 200vh:
  - Line 1 appears: "Most agents fail not on the model."
  - Scroll more → Line 2: "They fail on the handoffs."
  - Scroll more → Line 3: "I spend 80% of my time on the glue."
  - Each line fades/slides in sequentially, controlled by scroll position (not time)
  - The keywords "model", "handoffs", "glue" start muted and brighten to white as their line fully enters
  - After all three lines are visible, continued scrolling fades the entire quote and releases the sticky positioning
- The background during this section shifts very subtly — maybe 2-3% lighter or a barely perceptible gradient change — to make it feel like a different space from the sections above and below
- This should feel like a pause, a breath, a cinematic interlude between the dense project section and the contact section

---

## Scene 5: Contact — The Invitation

**What it is now:** Headline + list of links.

**What it becomes:** A terminal-inspired contact interface.

### Layout
- Full-viewport height, split roughly 50/50
- Left side: "Let's build something that ships." headline with a blinking cursor. Below it, a small paragraph: "Currently building at JBS. Always happy to trade notes on agents, RAG, and the unglamorous parts of shipping AI."
- Right side: a terminal-style block (monospace, subtle border, dark surface background) with interactive "commands":

```
$ echo contact
  → contact@muhammadhananbaloch.dev     [click to copy / open mail]

$ calendly --book 30min
  → Schedule a call                      [click to open calendly]

$ git remote -v
  → github.com/muhammadhananbaloch       [click to open github]

$ open linkedin
  → Muhammad Hanan Baloch                 [click to open linkedin]

$ open twitter
  → @muhammadhhanann                      [click to open twitter]
```

- These commands type themselves out on page load/scroll-into-view, one after another, with realistic terminal typing speed (~40ms per character)
- Each command result is a clickable link
- Hovering a result row highlights it with a subtle accent background
- The terminal block has a fake title bar: "hanan@portfolio ~ %"

### Footer
- Minimal: © 2026 · SET IN INTER · JETBRAINS MONO · BACK TO TOP
- This stays the same, it's fine

---

## Navigation

### Top Nav
- Keep: WORK, STACK, EXPERIENCE, GET IN TOUCH
- Add: a subtle progress indicator — a thin accent-colored line at the very top of the viewport that fills left-to-right based on scroll position. This tells the visitor how far through the experience they are.
- The nav should blur/darken its background when scrolling over light content (if any) — use backdrop-filter

### Scroll Progress
- The progress bar at the top doubles as a section indicator — it fills in segments, with each segment corresponding to a scene. Small dots or ticks on the line mark section boundaries.

---

## Technical Requirements

### New Dependencies
- `framer-motion` (already installed) — for all animations, scroll-driven pinning, layout transitions
- No other new dependencies unless absolutely necessary for a specific interaction

### Component Architecture
- Each project is its OWN component (AviationClaimsDemo.tsx, FreightVoiceDemo.tsx, etc.) — not a shared template with different data
- Each demo component is self-contained: its own animation logic, its own state, its own scripted content
- The tech constellation is its own component (TechConstellation.tsx) with its own force/position logic
- The terminal contact is its own component (TerminalContact.tsx)

### Performance
- All demo animations pause when scrolled out of view (IntersectionObserver)
- SVG-based visualizations preferred over DOM-heavy layouts
- Lazy-load project demo components below the fold
- Code-split each demo component — they're heavy and only one is visible at a time
- Target: Lighthouse performance score ≥ 90

### Content
- All demo content (example queries, transcript lines, SMS messages, pipeline stages) must be realistic and specific to the actual project. No lorem ipsum, no generic placeholders.
- The scripted interactions should feel like abbreviated versions of what the real system does — someone who then reads the project description should think "oh, the demo showed me exactly this."

---

## What NOT To Do

- Don't add a loading screen. The site loads fast. Keep it fast.
- Don't add background music, sound effects, or video.
- Don't use Three.js / WebGL. Everything is achievable with SVG + Framer Motion + CSS.
- Don't add particle effects, floating shapes, or decorative background animations.
- Don't make all projects use the same demo component with different props. Each project demo is unique.
- Don't scroll-hijack. Sticky pinning is fine. Remapping scroll input is not.
- Don't sacrifice load time for animation complexity. If a demo component is too heavy, simplify it.
- Don't add tooltips as the primary interaction. Tooltips are supplementary. The primary interaction for each section should be something you can SEE without hovering.
- Don't make the site feel like a game. It should feel like a sophisticated engineering portfolio, not a toy. The interactivity serves comprehension and engagement, not entertainment.

---

## Implementation Order

1. **Page structure** — Tear out the current section layout. Build the full-viewport scene structure with proper scroll behavior and section transitions. No content yet — just the skeleton with placeholder blocks for each scene.

2. **Hero** — Rebuild the agent graph as a full-viewport centerpiece with boot-up sequence, data packet flow, and click-to-expand node panels.

3. **Project demos** — Build each project's unique interactive element. Start with Aviation Claims (query router) and Freight Voice (call trace) — they're the most impressive. Then Marketing Ops (before/after), PropAuto (SMS flow), Lead Enrichment (pipeline waterfall), and NeuroScan (classification).

4. **Stack constellation** — Build the interactive tech node graph with project connections.

5. **Quote** — Implement the scroll-pinned cinematic quote section.

6. **Terminal contact** — Build the terminal-inspired contact interface.

7. **Navigation** — Add scroll progress indicator and section-aware nav highlighting.

8. **Polish** — Responsive fluid design, performance optimization, quality gate from CLAUDE.md.

Each step should be a SEPARATE prompt. Review in browser before moving to the next.