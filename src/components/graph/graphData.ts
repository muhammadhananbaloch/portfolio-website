export interface NodeDef {
  id: string;
  label: string;
  x: number;
  y: number;
  tier: number;
}

export interface EdgeDef {
  from: string;
  to: string;
  tier: number;
}

export const NODES: NodeDef[] = [
  { id: "user", label: "user · request", x: 50, y: 20, tier: 0 },
  { id: "llm", label: "orchestrator · LLM", x: 50, y: 36, tier: 1 },
  { id: "rag", label: "tool · rag_retriever", x: 24, y: 54, tier: 2 },
  { id: "api", label: "tool · api_caller", x: 76, y: 54, tier: 2 },
  { id: "mem", label: "pgvector · memory", x: 50, y: 70, tier: 3 },
  { id: "out", label: "response · streamed", x: 50, y: 84, tier: 4 },
];

export const EDGES: EdgeDef[] = [
  { from: "user", to: "llm", tier: 1 },
  { from: "llm", to: "rag", tier: 2 },
  { from: "llm", to: "api", tier: 2 },
  { from: "rag", to: "mem", tier: 3 },
  { from: "api", to: "mem", tier: 3 },
  { from: "mem", to: "out", tier: 4 },
];

export const BY_ID = Object.fromEntries(
  NODES.map((n) => [n.id, n])
) as Record<string, NodeDef>;

export const PACKET_PATHS = [
  ["user", "llm", "rag", "mem", "out"],
  ["user", "llm", "api", "mem", "out"],
];

export const PACKET_CYCLE = 5500;
export const PACKET_TRAVEL = 4000;

export const PROJECT_NODE_HIGHLIGHTS: Record<string, string[]> = {
  "aviation-rag": ["rag", "llm", "mem"],
  "freight-voice": ["llm", "api"],
  "marketing-ops": ["llm"],
  "propauto": ["mem", "out"],
  "lead-enrichment": ["user", "llm", "api", "mem", "out"],
  "neuroscan": [],
};

export function cubicBez(
  t: number,
  p0: number,
  p1: number,
  p2: number,
  p3: number
): number {
  const u = 1 - t;
  return u * u * u * p0 + 3 * u * u * t * p1 + 3 * u * t * t * p2 + t * t * t * p3;
}

export function ctrlPts(a: NodeDef, b: NodeDef) {
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

export function edgePath(a: NodeDef, b: NodeDef): string {
  const { c1x, c1y, c2x, c2y } = ctrlPts(a, b);
  return `M ${a.x} ${a.y} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${b.x} ${b.y}`;
}

export function posOnEdge(
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
