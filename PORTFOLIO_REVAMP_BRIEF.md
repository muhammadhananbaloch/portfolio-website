# Portfolio Revamp — Design Brief

## The Problem

The current portfolio looks like a literary magazine. It's well-crafted, but the aesthetic (serif editorial typography, "Vol. I · The Hanan Journal," "Essay #1," "Field Notes") belongs to a writer or editorial designer, not an AI engineer who builds autonomous systems. The medium contradicts the message.

More importantly, the site is entirely passive. Once you see the pattern (card → expand → static diagram → stats), there's no surprise, no discovery, no reason to keep scrolling. Every section behaves identically. There are no interactive elements anywhere.

## The New Philosophy

**The site itself should feel like interacting with a system you built, not reading a magazine about systems you built.**

Think: engineered, alive, responsive to input. The visitor should feel like they're inside one of your architectures — data flowing, nodes activating, systems responding to their actions. The portfolio is your seventh shipped project, and it should feel like it.

## Design Principles

1. **Interaction over decoration.** Every section should have at least one element that responds to the visitor — hover, click, scroll, or input. Static is the enemy. If something looks like it could be interactive, it should be.

2. **Earned discovery.** Reward curiosity. Small details that only reveal themselves on hover, click, or scroll. Not gimmicky easter eggs — meaningful ones that show depth (e.g., hovering a system diagram node shows the actual tech decision behind it, clicking a stats number reveals the before/after story).

3. **Personality through engineering, not typography.** The current site gets personality from fonts and editorial framing. The new site should get personality from how things move, respond, and connect. The voice can still be confident and direct — just expressed through behavior, not visual styling.

4. **Progressive disclosure.** Don't dump everything on screen. Let sections build, reveal, and layer as the visitor scrolls or interacts. Each scroll position should feel like a new state in a state machine.

5. **Dark, technical, alive.** Think terminal greens, subtle glows, dark backgrounds, monospace where it reinforces the "engineered" feeling. Not hacker-movie aesthetic — refined and clean, but clearly built by someone who works in code. The system diagrams (currently the strongest element) should set the visual tone for the entire site.

## Reference Sites — What to Borrow

**From nvg8.io:**
- Scroll-driven reveals where content animates in as you reach it — not generic fade-ins, but purposeful transitions that feel like data loading
- Sections that feel like distinct "screens" or states rather than one continuous page
- Dark palette with accent colors that feel intentional

**From oryzo.ai:**
- Interactive micro-moments everywhere (the hover hand, the flip encryption, the chat interface) — each section has its own unique interaction, not a repeated pattern
- Humor and personality embedded in the details, not just the copy
- Sections that surprise you with a completely different interaction model than the previous one
- The way technical specs are presented playfully (temperature slider, friction coefficient, circularity metric) — your project stats could work like this

**From palette.supply:**
- Smooth, intentional transitions between sections
- Loading sequences that build anticipation
- Clean grid structure underneath the creative elements — the underlying information architecture is solid even when the presentation is playful

## Section-by-Section Direction

### Hero

**Kill:** "Vol. I · The Hanan Journal · Issue 05 · May 2026," "Essay #1 · On the Cover," "EST. 2023" — all editorial framing. Remove entirely.

**Keep:** The agent graph diagram on the right — this is the single best element on the current site.

**Transform:** Make the agent graph animated and interactive. Nodes should pulse or glow subtly. Data should visibly flow through the edges (animated dashed lines or particle trails). Hovering a node could show a tooltip with what that component does. This sets the tone immediately: "this person builds systems, and you're looking at one right now."

**Headline:** Keep "I architect autonomous AI systems & agents that ship" or similar — the copy is strong. Just strip the editorial framing around it.

**Subtext:** Keep "AI Engineer at JBS Americas & Europe, building RAG pipelines, voice agents, and agentic workflows behind real production traffic, not demos." This is good.

**CTAs:** Keep "See selected work," "Résumé (PDF)," "Book 30-min." Add subtle hover states that feel mechanical/engineered (e.g., a slight slide or terminal-cursor blink).

**Stats bar ("By the numbers"):** Keep "7 Projects Shipped" and "2 yrs Building with AI." Consider making these count up on scroll-into-view (a small animation that makes the numbers feel alive).

### Projects Section

**Kill:** The identical expand/collapse pattern for every card. Each project expanding the same way creates monotony.

**Transform:** Each project card should feel like its own mini-experience. Not necessarily different layouts, but different interactive elements within a consistent structure.

**System diagrams:** These are the crown jewel. Make them interactive:
- Nodes should have hover states showing what each component does
- Animated data flow along the edges (e.g., a request visibly traveling from "user · request" through "orchestrator · LLM" to "response · streamed")
- Optional: a "trace" button that plays through an actual request path with annotations

**Stats panels:** Instead of static numbers, consider:
- Numbers that count up when they scroll into view
- Hover on a stat reveals a one-line "before vs. after" context (e.g., hovering "3-4h → ~10min" shows "Manual: research each lead, copy-paste to spreadsheet, verify email, send individually")
- A subtle pulse or glow on the most impressive stat in each panel

**Project descriptions:** Keep the technical depth. Consider a "terminal-style" reveal where the description types out or builds progressively, reinforcing the engineering personality.

**Filter tabs (ALL / AI/ML / AGENTS / INFRASTRUCTURE):** Keep these. Add a smooth transition when switching categories — cards should animate in/out, not just appear/disappear.

### Stack Section ("What I reach for, and why")

**Keep:** The three categories (Agents, RAG & data, Delivery) with their descriptions and pill tags. This structure is good.

**Transform:** The pill tags could be interactive — hovering a tag like "LangGraph" could show a one-liner about how you've used it in production (e.g., "State machine routing for the aviation claims chatbot"). This turns a passive skill list into evidence of real usage.

**Consider:** A connection visualization — when you hover a tech in the Stack section, related projects in the Projects section subtly highlight or glow. This shows the visitor how your skills connect to real shipped work, not just a list of things you've touched.

### Experience Section

**Keep:** The concrete bullets with bold project names. The content is now strong.

**Transform:** Consider a minimal timeline visualization on the left edge — a vertical line with a dot at "Oct 2025" and an open dot at "Present" with a subtle pulse (indicating "still active"). This replaces the current single-dot timeline marker and adds visual interest without taking up space.

### Quote Section

**Keep:** "Most agents fail not on the model. They fail on the handoffs. I spend 80% of my time on the glue." This is strong and differentiating.

**Transform:** Consider making this scroll-triggered — the quote builds word by word or line by line as you scroll through it, with "model," "handoffs," and "glue" emphasized with a different color or glow. This creates a moment of pause and impact.

### Footer / Contact

**Keep:** "Let's build something that ships." — strong CTA copy. Keep all contact links.

**Transform:** Add a subtle interactive element — maybe a terminal-style input that says "What are you building?" with a blinking cursor, which links to the contact email or Calendly when clicked. Small personality touch.

## Technical Considerations

### Animation Library
Use Framer Motion (works natively with React). It handles scroll-triggered animations, layout animations, and gesture interactions. Install: `npm install framer-motion`.

### Scroll Interactions
Use `framer-motion`'s `useScroll` and `useTransform` hooks for scroll-driven animations. Avoid heavy scroll-hijacking — the page should still scroll naturally, with animations triggered by scroll position, not scroll-jacking the viewport.

### Performance
- Animations should be GPU-accelerated (transform, opacity only — avoid animating layout properties)
- Lazy-load project detail content below the fold
- Keep the initial bundle small — code-split project detail views
- Test on mobile — disable or simplify animations on smaller screens / lower-powered devices
- Target 60fps on all animations

### Color Direction
- Dark base (not pure black — something like #0a0a0a or #111)
- Accent: a single bright color for interactive elements and emphasis — consider an electric blue, green, or amber that pops against dark backgrounds
- Monospace font for technical labels, stats, and code-adjacent elements
- Clean sans-serif for body text and headlines (Inter, Geist, or similar)
- Avoid gradients and glows that feel "gaming" — keep it refined

### Mobile
- All hover interactions need touch-friendly alternatives (tap to reveal, long-press, or always-visible on mobile)
- System diagram animations should simplify on mobile (static with tap-to-highlight instead of hover)
- The page should feel great to scroll through on a phone even without the desktop interaction layer

## What NOT To Do

- Don't add a loading screen or preloader. The current site loads fast. Keep it fast. Loading animations are borrowed time that only work if the payoff is extraordinary.
- Don't add background music or sound effects.
- Don't use 3D (Three.js / WebGL) unless it's for a specific, meaningful element (e.g., a 3D agent graph). Generic 3D decorations add load time and no value.
- Don't make the site feel like a game or a toy. It should feel engineered and precise, not playful. The personality comes from craft and attention to detail, not humor (unlike oryzo.ai, which is a satire piece — your portfolio is a professional tool).
- Don't sacrifice information density for animation. Every animated element should enhance understanding, not replace content.
- Don't use scroll-hijacking that takes control away from the visitor. Scroll-triggered animations are good. Scroll-jacking (where your scroll input is remapped to a custom animation timeline) is annoying.

## Priority Order

1. Hero section — animated agent graph, strip editorial framing
2. Project cards — interactive system diagrams with data flow animation
3. Scroll-triggered reveals throughout (stats counting up, quote building)
4. Dark theme + new typography
5. Hover micro-interactions on pills, stats, CTAs
6. Stack-to-project connection highlights
7. Mobile optimization of all interactions