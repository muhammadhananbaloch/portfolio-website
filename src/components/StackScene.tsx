import { useRef, useState, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

type TechNode = {
  id: string;
  label: string;
  tooltip: string;
  cluster: "agents" | "rag" | "delivery";
  x: number;
  y: number;
};

type Edge = {
  from: string;
  to: string;
  projects: string[];
};

const nodes: TechNode[] = [
  // Agents cluster (top-left)
  { id: "langchain", label: "LangChain", tooltip: "Expression language for chaining retrieval, prompts, and output parsers", cluster: "agents", x: 10, y: 10 },
  { id: "langgraph", label: "LangGraph", tooltip: "State machine routing for the aviation claims chatbot", cluster: "agents", x: 32, y: 6 },
  { id: "n8n", label: "n8n", tooltip: "Orchestrates the lead enrichment pipeline end-to-end", cluster: "agents", x: 52, y: 14 },
  { id: "synthflow", label: "Synthflow", tooltip: "Voice agent platform behind the freight qualification system", cluster: "agents", x: 6, y: 28 },
  { id: "function-calling", label: "function-calling", tooltip: "Structured tool invocation for SQL generation and API dispatch", cluster: "agents", x: 30, y: 26 },
  { id: "tool-use", label: "tool-use", tooltip: "Router decides which tool to call based on intent classification", cluster: "agents", x: 50, y: 32 },
  { id: "reflection-loops", label: "reflection loops", tooltip: "Agent retries with schema feedback when SQL validation fails", cluster: "agents", x: 22, y: 42 },

  // RAG & data cluster (bottom-left)
  { id: "pgvector", label: "pgvector", tooltip: "Vector similarity search across three claims tables with cosine distance", cluster: "rag", x: 8, y: 58 },
  { id: "postgresql", label: "PostgreSQL", tooltip: "Primary store for every project, JSONB for flexible lead schemas", cluster: "rag", x: 32, y: 54 },
  { id: "embeddings", label: "embeddings", tooltip: "OpenAI ada-002 for document chunks, cached to avoid re-embedding", cluster: "rag", x: 54, y: 58 },
  { id: "hybrid-search", label: "hybrid search", tooltip: "Combines SQL exactness with semantic recall in the aviation RAG", cluster: "rag", x: 14, y: 74 },
  { id: "re-ranking", label: "re-ranking", tooltip: "Second-pass scoring to push high-relevance chunks above the noise", cluster: "rag", x: 38, y: 74 },
  { id: "evals", label: "evals", tooltip: "Automated retrieval accuracy checks that catch regressions before deploy", cluster: "rag", x: 56, y: 76 },

  // Delivery cluster (right side)
  { id: "fastapi", label: "FastAPI", tooltip: "Async API layer for four production backends including the claims chatbot", cluster: "delivery", x: 76, y: 14 },
  { id: "python", label: "Python", tooltip: "Primary language for every AI and backend system I've shipped", cluster: "delivery", x: 92, y: 8 },
  { id: "docker", label: "Docker", tooltip: "Multi-stage builds for all deployments, dev and prod", cluster: "delivery", x: 78, y: 34 },
  { id: "nginx", label: "nginx", tooltip: "Reverse proxy with gzip and SPA routing for this portfolio", cluster: "delivery", x: 94, y: 30 },
  { id: "aws-ec2", label: "AWS EC2", tooltip: "Hosts the claims chatbot behind Cloudflare CDN", cluster: "delivery", x: 76, y: 52 },
  { id: "render", label: "Render", tooltip: "CPU-only deployment target for the NeuroScan inference container", cluster: "delivery", x: 94, y: 50 },
  { id: "cicd", label: "CI/CD", tooltip: "GitHub Actions pipelines for lint, test, build, and deploy", cluster: "delivery", x: 84, y: 66 },
];

const edges: Edge[] = [
  // Within Agents
  { from: "langchain", to: "langgraph", projects: ["Aviation Claims"] },
  { from: "langgraph", to: "function-calling", projects: ["Aviation Claims"] },
  { from: "function-calling", to: "tool-use", projects: ["Aviation Claims"] },
  { from: "tool-use", to: "reflection-loops", projects: ["Aviation Claims"] },
  { from: "synthflow", to: "function-calling", projects: ["Freight Voice"] },

  // Within RAG
  { from: "pgvector", to: "postgresql", projects: ["Aviation Claims"] },
  { from: "pgvector", to: "embeddings", projects: ["Aviation Claims"] },
  { from: "hybrid-search", to: "re-ranking", projects: ["Aviation Claims"] },
  { from: "postgresql", to: "hybrid-search", projects: ["Aviation Claims"] },

  // Within Delivery
  { from: "fastapi", to: "python", projects: ["Aviation Claims", "Marketing Ops", "PropAuto"] },
  { from: "fastapi", to: "docker", projects: ["PropAuto", "NeuroScan"] },
  { from: "docker", to: "nginx", projects: ["Portfolio"] },
  { from: "aws-ec2", to: "render", projects: ["Aviation Claims", "NeuroScan"] },

  // Cross-cluster
  { from: "langgraph", to: "pgvector", projects: ["Aviation Claims"] },
  { from: "langgraph", to: "fastapi", projects: ["Aviation Claims"] },
  { from: "postgresql", to: "fastapi", projects: ["PropAuto", "NeuroScan", "Aviation Claims"] },
  { from: "postgresql", to: "docker", projects: ["PropAuto", "NeuroScan"] },
  { from: "pgvector", to: "aws-ec2", projects: ["Aviation Claims"] },
];

const clusterLabels: Record<string, { label: string; x: number; y: number }> = {
  agents: { label: "AGENTS", x: 28, y: 0 },
  rag: { label: "RAG & DATA", x: 28, y: 50 },
  delivery: { label: "DELIVERY", x: 84, y: 0 },
};

const experience = [
  {
    active: true,
    date: "Oct 2025 – Present",
    role: "AI Engineer",
    co: "JBS Americas & Europe",
    body: "Building production AI systems for enterprise clients, replacing manual workflows with automated, API-driven solutions using Python, LLMs, and cloud infrastructure.",
    highlights: [
      { label: "Multi-tenant AI claims chatbot", detail: "(LangGraph, pgvector, PostgreSQL). 14 client aliases, dual SQL/semantic query paths", projectId: "aviation-rag" },
      { label: "AI voice agent", detail: "300k+ logistics prospects, intent-based routing, fail-safe extraction", projectId: "freight-voice" },
      { label: "Marketing audit agent", detail: "4 hours to under 5 minutes", projectId: "marketing-ops" },
      { label: "SOP generator", detail: "62+ hours of manual work eliminated", projectId: "marketing-ops" },
      { label: "GoHighLevel to n8n migration", detail: "$3,000–$6,000 saved", projectId: "lead-enrichment" },
    ],
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

const nodeById = Object.fromEntries(nodes.map((n) => [n.id, n]));

function getConnected(nodeId: string): { nodes: Set<string>; edges: Set<number>; projects: string[] } {
  const connectedNodes = new Set<string>();
  const connectedEdges = new Set<number>();
  const projectSet = new Set<string>();

  edges.forEach((e, i) => {
    if (e.from === nodeId || e.to === nodeId) {
      connectedEdges.add(i);
      connectedNodes.add(e.from === nodeId ? e.to : e.from);
      e.projects.forEach((p) => projectSet.add(p));
    }
  });

  return { nodes: connectedNodes, edges: connectedEdges, projects: Array.from(projectSet) };
}

const StackScene = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.12 });
  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);

  const hoveredData = hovered ? getConnected(hovered) : null;
  const activeNode = selected || hovered;
  const activeData = activeNode ? getConnected(activeNode) : null;

  const handleNodeEnter = useCallback((id: string) => setHovered(id), []);
  const handleNodeLeave = useCallback(() => setHovered(null), []);
  const handleNodeClick = useCallback((id: string) => {
    setSelected((prev) => (prev === id ? null : id));
  }, []);

  const handleConstellationClick = useCallback((e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest(".const-node")) return;
    setSelected(null);
  }, []);

  const scrollToProject = useCallback((projectId: string) => {
    const projectIds = [
      "aviation-rag", "freight-voice", "marketing-ops",
      "propauto", "lead-enrichment", "neuroscan",
    ];
    const idx = projectIds.indexOf(projectId);
    if (idx === -1) return;

    const beat = document.getElementById("work");
    if (!beat) return;

    const beatTop = beat.offsetTop;
    const beatHeight = beat.offsetHeight;
    const projectCount = projectIds.length;
    const targetProgress = (idx + 0.5) / projectCount;

    window.scrollTo({
      top: beatTop + beatHeight * targetProgress,
      behavior: "smooth",
    });
  }, []);

  return (
    <motion.section
      className="scene scene--stack"
      id="stack"
      ref={sectionRef}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.4, ease }}
    >
      <div className="stack-scene" onClick={handleConstellationClick}>
        {/* Left: Tech Constellation */}
        <div className="stack-constellation">
          <svg className="const-svg" viewBox="0 0 100 84" preserveAspectRatio="none">
            {edges.map((e, i) => {
              const from = nodeById[e.from];
              const to = nodeById[e.to];
              if (!from || !to) return null;
              const isHighlighted = activeData?.edges.has(i);
              return (
                <line
                  key={i}
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  className={`const-edge ${isHighlighted ? "const-edge--lit" : ""}`}
                />
              );
            })}
          </svg>

          {/* Cluster labels */}
          {Object.entries(clusterLabels).map(([key, cl]) => (
            <motion.span
              key={key}
              className="const-cluster-label"
              style={{ left: `${cl.x}%`, top: `${cl.y}%` }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.3, ease, delay: 0.2 }}
            >
              {cl.label}
            </motion.span>
          ))}

          {/* Nodes */}
          {nodes.map((node, i) => {
            const isActive = activeNode === node.id;
            const isConnected = activeData?.nodes.has(node.id);
            const isDimmed = activeNode && !isActive && !isConnected;

            return (
              <motion.button
                key={node.id}
                className={`const-node const-node--${node.cluster} ${isActive ? "const-node--active" : ""} ${isConnected ? "const-node--connected" : ""} ${isDimmed ? "const-node--dimmed" : ""}`}
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
                onMouseEnter={() => handleNodeEnter(node.id)}
                onMouseLeave={handleNodeLeave}
                onClick={(e) => { e.stopPropagation(); handleNodeClick(node.id); }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, ease, delay: 0.1 + i * 0.03 }}
              >
                {node.label}
              </motion.button>
            );
          })}

          {/* Hover label showing connecting projects */}
          <AnimatePresence>
            {hovered && hoveredData && hoveredData.projects.length > 0 && !selected && (
              <motion.div
                className="const-hover-label"
                style={{
                  left: `${nodeById[hovered].x}%`,
                  top: `${nodeById[hovered].y}%`,
                }}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.15, ease }}
              >
                {hoveredData.projects.join(" · ")}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Click panel */}
          <AnimatePresence>
            {selected && nodeById[selected] && (
              <motion.div
                className="const-panel"
                style={{
                  left: `${Math.min(nodeById[selected].x, 70)}%`,
                  top: `${nodeById[selected].y}%`,
                }}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.2, ease }}
              >
                <span className="const-panel__label">{nodeById[selected].label}</span>
                <p className="const-panel__desc">{nodeById[selected].tooltip}</p>
                {activeData && activeData.projects.length > 0 && (
                  <span className="const-panel__projects">
                    {activeData.projects.join(" · ")}
                  </span>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right: Experience Timeline */}
        <div className="stack-timeline" id="experience">
          <motion.h3
            className="stack-timeline__heading"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.3, ease, delay: 0.15 }}
          >
            Experience.
          </motion.h3>

          <div className="stack-timeline__track">
            <div className="stack-timeline__line">
              <span className="stack-timeline__dot" />
            </div>

            {experience.map((e, i) => (
              <motion.div
                key={i}
                className={`stack-timeline__entry ${e.active ? "stack-timeline__entry--active" : ""}`}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{ duration: 0.3, ease, delay: 0.2 + i * 0.08 }}
              >
                <div className="stack-timeline__date">{e.date}</div>
                <h3 className="stack-timeline__role">{e.role}</h3>
                <div className="stack-timeline__co">{e.co}</div>
                <p className="stack-timeline__body">{e.body}</p>
                {e.highlights && (
                  <ul className="stack-timeline__highlights">
                    {e.highlights.map((h, j) => (
                      <li key={j}>
                        <button
                          className="stack-timeline__project-link"
                          onClick={() => scrollToProject(h.projectId)}
                          type="button"
                        >
                          {h.label}
                        </button>
                        {" "}{h.detail}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default StackScene;
