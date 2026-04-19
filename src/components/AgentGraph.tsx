type Node = { id: string; label: string; cls: string; x: number; y: number };
type Edge = { from: string; to: string; dashed?: boolean; pulse?: boolean };

const nodes: Node[] = [
  { id: "user", label: "user · request", cls: "user", x: 50, y: 12 },
  { id: "llm", label: "orchestrator · LLM", cls: "llm", x: 50, y: 30 },
  { id: "rag", label: "tool · rag_retriever", cls: "tool", x: 22, y: 50 },
  { id: "api", label: "tool · api_caller", cls: "tool", x: 78, y: 50 },
  { id: "mem", label: "pgvector · memory", cls: "memory", x: 50, y: 70 },
  { id: "out", label: "response · streamed", cls: "out", x: 50, y: 88 },
];

const edges: Edge[] = [
  { from: "user", to: "llm", dashed: true, pulse: true },
  { from: "llm", to: "rag" },
  { from: "llm", to: "api" },
  { from: "rag", to: "mem" },
  { from: "api", to: "mem" },
  { from: "mem", to: "out", dashed: true, pulse: true },
];

const byId: Record<string, Node> = Object.fromEntries(nodes.map((n) => [n.id, n]));

const AgentGraph = () => {
  return (
    <>
      <svg className="graph-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <marker id="arr2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill="#181716" />
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
              <path d={d} className={`edge ${e.dashed ? "dashed" : ""}`} markerEnd="url(#arr2)" vectorEffect="non-scaling-stroke" />
              {e.pulse && <path d={d} className="edge-pulse" vectorEffect="non-scaling-stroke" />}
            </g>
          );
        })}
      </svg>
      {nodes.map((n) => (
        <div key={n.id} className={`graph-node ${n.cls}`} style={{ left: `${n.x}%`, top: `${n.y}%` }}>
          <span className="gl"></span>
          {n.label}
        </div>
      ))}
    </>
  );
};

export default AgentGraph;
