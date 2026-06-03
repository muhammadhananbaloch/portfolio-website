import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Node = {
  id: string;
  label: string;
  cls: string;
  x: number;
  y: number;
  tooltip: string;
};

type Edge = { from: string; to: string };

const nodes: Node[] = [
  { id: "user", label: "user · request", cls: "user", x: 50, y: 12, tooltip: "Incoming natural-language query from the end user" },
  { id: "llm", label: "orchestrator · LLM", cls: "llm", x: 50, y: 30, tooltip: "Routes queries to SQL or semantic search based on intent classification" },
  { id: "rag", label: "tool · rag_retriever", cls: "tool", x: 22, y: 50, tooltip: "Retrieves relevant context from vector store using semantic similarity" },
  { id: "api", label: "tool · api_caller", cls: "tool", x: 78, y: 50, tooltip: "Executes structured API calls for real-time data lookups" },
  { id: "mem", label: "pgvector · memory", cls: "memory", x: 50, y: 70, tooltip: "Stores and retrieves conversation history and document embeddings" },
  { id: "out", label: "response · streamed", cls: "out", x: 50, y: 88, tooltip: "Token-by-token streamed response back to the client" },
];

const edges: Edge[] = [
  { from: "user", to: "llm" },
  { from: "llm", to: "rag" },
  { from: "llm", to: "api" },
  { from: "rag", to: "mem" },
  { from: "api", to: "mem" },
  { from: "mem", to: "out" },
];

const byId: Record<string, Node> = Object.fromEntries(nodes.map((n) => [n.id, n]));

const CYCLE = 4000;
const FLASH = 300;

const cascade = [
  { ids: ["user"], at: 0 },
  { ids: ["llm"], at: 600 },
  { ids: ["rag", "api"], at: 1200 },
  { ids: ["mem"], at: 1800 },
  { ids: ["out"], at: 2400 },
];

const restBorder: Record<string, string> = {
  user: "#666666", llm: "#666666", rag: "#666666",
  api: "#666666", mem: "#666666", out: "#3b82f6",
};

const litBorder: Record<string, string> = {
  user: "#3b82f6", llm: "#3b82f6", rag: "#3b82f6",
  api: "#3b82f6", mem: "#3b82f6", out: "#60a5fa",
};

const AgentGraph = () => {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [lit, setLit] = useState<Set<string>>(new Set());

  useEffect(() => {
    let alive = true;

    const tick = () => {
      if (!alive) return;
      for (const { ids, at } of cascade) {
        setTimeout(() => {
          if (!alive) return;
          setLit((prev) => {
            const s = new Set(prev);
            ids.forEach((id) => s.add(id));
            return s;
          });
        }, at);
        setTimeout(() => {
          if (!alive) return;
          setLit((prev) => {
            const s = new Set(prev);
            ids.forEach((id) => s.delete(id));
            return s;
          });
        }, at + FLASH);
      }
    };

    tick();
    const iv = setInterval(tick, CYCLE);
    return () => { alive = false; clearInterval(iv); };
  }, []);

  return (
    <>
      <svg className="graph-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <marker id="arr2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill="#666666" />
          </marker>
        </defs>
        {edges.map((e, i) => {
          const a = byId[e.from];
          const b = byId[e.to];
          const my = (a.y + b.y) / 2;
          const dx = b.x - a.x;
          const curve = Math.abs(dx) * 0.3;
          const c1x = a.x;
          const c1y = my - (a.x > b.x ? curve : -curve) * 0.3;
          const c2x = b.x;
          const c2y = my;
          const d = `M ${a.x} ${a.y} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${b.x} ${b.y}`;
          return (
            <g key={i}>
              <path d={d} className="edge" markerEnd="url(#arr2)" vectorEffect="non-scaling-stroke" />
              <path
                d={d}
                className="edge-flow"
                vectorEffect="non-scaling-stroke"
                style={{ animationDelay: `${i * -0.4}s` }}
              />
            </g>
          );
        })}
      </svg>
      {nodes.map((n) => {
        const isAbove = n.y > 60;
        const align = n.x < 35 ? "align-left" : n.x > 65 ? "align-right" : "";
        const flashing = lit.has(n.id);

        return (
          <motion.div
            key={n.id}
            className={`graph-node ${n.cls}`}
            style={{ left: `${n.x}%`, top: `${n.y}%` }}
            animate={{
              borderColor: flashing ? litBorder[n.id] : restBorder[n.id],
            }}
            transition={{
              borderColor: {
                duration: flashing ? 0.08 : 0.25,
                ease: "easeOut",
              },
            }}
            onMouseEnter={() => setActiveNode(n.id)}
            onMouseLeave={() => setActiveNode(null)}
            onClick={() => setActiveNode(activeNode === n.id ? null : n.id)}
          >
            <span className="gl" />
            {n.label}
            <AnimatePresence>
              {activeNode === n.id && (
                <motion.div
                  className={`graph-tooltip ${isAbove ? "above" : "below"} ${align}`}
                  initial={{ opacity: 0, y: isAbove ? 4 : -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: isAbove ? 4 : -4 }}
                  transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
                >
                  {n.tooltip}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </>
  );
};

export default AgentGraph;
