import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NodeDef {
  id: string;
  label: string;
  cls: string;
  x: number;
  y: number;
  description: string;
  tier: number;
}

interface EdgeDef {
  from: string;
  to: string;
  tier: number;
}

const NODES: NodeDef[] = [
  {
    id: "user",
    label: "user · request",
    cls: "user",
    x: 66,
    y: 14,
    tier: 0,
    description:
      "Incoming queries via REST API or WebSocket. Rate-limited and authenticated before hitting the orchestrator.",
  },
  {
    id: "llm",
    label: "orchestrator · LLM",
    cls: "llm",
    x: 66,
    y: 30,
    tier: 1,
    description:
      "Routes each query to SQL or semantic search. A single LLM call classifies intent and extracts prefilters. The model never touches raw data.",
  },
  {
    id: "rag",
    label: "tool · rag_retriever",
    cls: "tool",
    x: 46,
    y: 50,
    tier: 2,
    description:
      "Hybrid search over pgvector — dense embeddings for semantics, sparse BM25 for keywords. Top-k results reranked before reaching the LLM.",
  },
  {
    id: "api",
    label: "tool · api_caller",
    cls: "tool",
    x: 86,
    y: 50,
    tier: 2,
    description:
      "Structured API calls with retries, circuit breaking, and response normalization. Each call sandboxed with timeout enforcement.",
  },
  {
    id: "mem",
    label: "pgvector · memory",
    cls: "memory",
    x: 66,
    y: 68,
    tier: 3,
    description:
      "pgvector-backed store for document embeddings, conversation history, and extracted entities. Serves both retriever and orchestrator.",
  },
  {
    id: "out",
    label: "response · streamed",
    cls: "out",
    x: 66,
    y: 85,
    tier: 4,
    description:
      "Token-by-token streamed response via SSE. Includes source citations and execution metadata for observability.",
  },
];

const EDGES: EdgeDef[] = [
  { from: "user", to: "llm", tier: 1 },
  { from: "llm", to: "rag", tier: 2 },
  { from: "llm", to: "api", tier: 2 },
  { from: "rag", to: "mem", tier: 3 },
  { from: "api", to: "mem", tier: 3 },
  { from: "mem", to: "out", tier: 4 },
];

const BY_ID = Object.fromEntries(
  NODES.map((n) => [n.id, n])
) as Record<string, NodeDef>;

const BOOT_STAGGER = 120;
const EDGE_DRAW_MS = 500;
const BOOT_TOTAL = 4 * BOOT_STAGGER + EDGE_DRAW_MS + 100;

const PACKET_PATHS = [
  ["user", "llm", "rag", "mem", "out"],
  ["user", "llm", "api", "mem", "out"],
];
const PACKET_CYCLE = 5500;
const PACKET_TRAVEL = 4000;

function cubicBez(
  t: number,
  p0: number,
  p1: number,
  p2: number,
  p3: number
): number {
  const u = 1 - t;
  return (
    u * u * u * p0 +
    3 * u * u * t * p1 +
    3 * u * t * t * p2 +
    t * t * t * p3
  );
}

function ctrlPts(a: NodeDef, b: NodeDef) {
  const my = (a.y + b.y) / 2;
  const dx = b.x - a.x;
  const cv = Math.abs(dx) * 0.3;
  return {
    c1x: a.x,
    c1y: my - (a.x > b.x ? cv : -cv) * 0.3,
    c2x: b.x,
    c2y: my,
  };
}

function edgePath(a: NodeDef, b: NodeDef): string {
  const { c1x, c1y, c2x, c2y } = ctrlPts(a, b);
  return `M ${a.x} ${a.y} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${b.x} ${b.y}`;
}

function posOnEdge(
  fromId: string,
  toId: string,
  t: number
): { x: number; y: number } {
  const a = BY_ID[fromId],
    b = BY_ID[toId];
  const { c1x, c1y, c2x, c2y } = ctrlPts(a, b);
  return {
    x: cubicBez(t, a.x, c1x, c2x, b.x),
    y: cubicBez(t, a.y, c1y, c2y, b.y),
  };
}

const EASE_ENTER: [number, number, number, number] = [0.22, 1, 0.36, 1];

const AgentGraph = () => {
  const [tier, setTier] = useState(-1);
  const [booted, setBooted] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  const nodeEls = useRef<Record<string, HTMLDivElement | null>>({});
  const packetEl = useRef<HTMLDivElement>(null);
  const rafId = useRef(0);
  const flashedInCycle = useRef(new Set<string>());

  // Boot sequence: reveal tiers sequentially
  useEffect(() => {
    const ids: ReturnType<typeof setTimeout>[] = [];
    for (let t = 0; t <= 4; t++) {
      ids.push(setTimeout(() => setTier(t), t * BOOT_STAGGER));
    }
    ids.push(setTimeout(() => setBooted(true), BOOT_TOTAL));
    return () => ids.forEach(clearTimeout);
  }, []);

  const flash = useCallback((id: string) => {
    const el = nodeEls.current[id];
    if (!el || el.classList.contains("hero-node--lit")) return;
    el.classList.add("hero-node--lit");
    setTimeout(() => el?.classList.remove("hero-node--lit"), 300);
  }, []);

  // Data packet animation
  useEffect(() => {
    if (!booted) return;
    let alive = true;
    const t0 = performance.now();

    const tick = (now: number) => {
      if (!alive) return;
      const total = now - t0;
      const cycle = Math.floor(total / PACKET_CYCLE);
      const elapsed = total - cycle * PACKET_CYCLE;
      const path = PACKET_PATHS[cycle % PACKET_PATHS.length];

      if (elapsed < PACKET_TRAVEL) {
        const segs = path.length - 1;
        const segDur = PACKET_TRAVEL / segs;
        const si = Math.min(Math.floor(elapsed / segDur), segs - 1);
        const t = (elapsed - si * segDur) / segDur;
        const pos = posOnEdge(path[si], path[si + 1], t);

        if (packetEl.current) {
          packetEl.current.style.left = `${pos.x}%`;
          packetEl.current.style.top = `${pos.y}%`;
          packetEl.current.style.opacity = "1";
        }

        if (si === 0 && t < 0.05 && !flashedInCycle.current.has(path[0])) {
          flash(path[0]);
          flashedInCycle.current.add(path[0]);
        }
        if (t > 0.88 && !flashedInCycle.current.has(path[si + 1])) {
          flash(path[si + 1]);
          flashedInCycle.current.add(path[si + 1]);
        }
      } else {
        if (packetEl.current) packetEl.current.style.opacity = "0";
        flashedInCycle.current.clear();
      }

      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);
    return () => {
      alive = false;
      cancelAnimationFrame(rafId.current);
    };
  }, [booted, flash]);

  // Close panel on outside click
  useEffect(() => {
    if (!selected) return;
    const handler = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (!t.closest(".hero-node") && !t.closest(".node-panel")) {
        setSelected(null);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [selected]);

  return (
    <>
      <svg
        className="hero-graph-svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {EDGES.map((e, i) => {
          const d = edgePath(BY_ID[e.from], BY_ID[e.to]);
          const drawn = tier >= e.tier;
          return (
            <g key={i}>
              <path
                d={d}
                className="hero-edge"
                pathLength={1}
                strokeDasharray={1}
                strokeDashoffset={drawn ? 0 : 1}
                style={{
                  transition: `stroke-dashoffset ${EDGE_DRAW_MS}ms cubic-bezier(0.22,1,0.36,1)`,
                }}
                vectorEffect="non-scaling-stroke"
              />
              {booted && (
                <path
                  d={d}
                  className="hero-edge-flow"
                  vectorEffect="non-scaling-stroke"
                  style={{ animationDelay: `${i * -0.5}s` }}
                />
              )}
            </g>
          );
        })}
      </svg>

      {NODES.map((n) => {
        const show = tier >= n.tier;
        const isSel = selected === n.id;
        const panelBelow = n.y < 60;
        const panelAlign =
          n.x > 70
            ? "node-panel--align-left"
            : n.x < 40
              ? "node-panel--align-right"
              : "";

        return (
          <motion.div
            key={n.id}
            ref={(el: HTMLDivElement | null) => {
              nodeEls.current[n.id] = el;
            }}
            className={`hero-node hero-node--${n.cls}${isSel ? " hero-node--selected" : ""}`}
            style={{ left: `${n.x}%`, top: `${n.y}%` }}
            initial={{ opacity: 0, scale: 0.7, x: "-50%", y: "-50%" }}
            animate={{
              opacity: show ? 1 : 0,
              scale: show ? 1 : 0.7,
              x: "-50%",
              y: "-50%",
            }}
            transition={{ duration: 0.35, ease: EASE_ENTER }}
            onClick={(e) => {
              e.stopPropagation();
              setSelected(isSel ? null : n.id);
            }}
          >
            <span className="hero-node__dot" />
            {n.label}

            <AnimatePresence>
              {isSel && (
                <motion.div
                  className={`node-panel ${panelBelow ? "node-panel--below" : "node-panel--above"} ${panelAlign}`}
                  initial={{
                    opacity: 0,
                    y: panelBelow ? -8 : 8,
                    scale: 0.96,
                  }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{
                    opacity: 0,
                    y: panelBelow ? -8 : 8,
                    scale: 0.96,
                  }}
                  transition={{ duration: 0.2, ease: EASE_ENTER }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="node-panel__label">{n.label}</div>
                  <p className="node-panel__desc">{n.description}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}

      <div ref={packetEl} className="hero-packet" />
    </>
  );
};

export default AgentGraph;
