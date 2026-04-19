import { useState, MouseEvent } from "react";

type DiagramNode = { x: number; y: number; label: string; cls: string };
type Project = {
  id: string;
  title: string;
  italic: string;
  desc: string;
  stack: string[];
  tag: string;
  internal: boolean;
  link?: string;
  linkLabel?: string;
  metrics: { n: string; l: string }[];
  summary: string;
  diagram: DiagramNode[];
  edges: [number, number][];
};

const projects: Project[] = [
  {
    id: "aviation-rag",
    title: "Aviation Claims",
    italic: "Hybrid RAG",
    desc: "Hybrid RAG backend letting insurance adjusters query 10+ years of aviation claims in plain English — one LangGraph router, two paths (SQL + pgvector), grounded answers with a CSV export.",
    stack: ["LangGraph", "FastAPI", "pgvector", "GPT-5.4-mini", "SQLAlchemy", "AWS"],
    tag: "Agentic Workflows · Enterprise",
    internal: true,
    metrics: [
      { n: "8", l: "interrelated tables" },
      { n: "1536-d", l: "pgvector embeddings" },
      { n: "185K", l: "token budget guard" },
      { n: "2 paths", l: "SQL · semantic" },
    ],
    summary:
      "A LangGraph state machine routes each query to either a validated SQL path (sqlglot AST + schema-aware column validator + retry) or a semantic path (cosine search across three vector-indexed tables). A single router call classifies intent AND extracts prefilters. The LLM never touches the returned data — only the 2–4 sentence insight on top of it.",
    diagram: [
      { x: 20, y: 18, label: "adjuster · NL query", cls: "" },
      { x: 50, y: 18, label: "router · classify + filter", cls: "hi" },
      { x: 20, y: 50, label: "SQL node · validate", cls: "bl" },
      { x: 80, y: 50, label: "vector node · pgvector", cls: "bl" },
      { x: 50, y: 70, label: "insight + CSV", cls: "cr" },
      { x: 50, y: 86, label: "answer · S3 download", cls: "dk" },
    ],
    edges: [[0, 1], [1, 2], [1, 3], [2, 4], [3, 4], [4, 5]],
  },
  {
    id: "neuroscan",
    title: "NeuroScan",
    italic: "AI",
    desc: "Medical web app that triages brain-tumor MRI scans into four categories in real time on CPU-only cloud — no GPU required.",
    stack: ["PyTorch", "EfficientNet-B0", "FastAPI", "PostgreSQL", "Cloudinary", "Docker"],
    tag: "Computer Vision · Healthcare",
    link: "https://brain-tumor-web-smiu.vercel.app/",
    linkLabel: "Live demo ↗",
    internal: false,
    metrics: [
      { n: "~5.3M", l: "model params" },
      { n: "~20MB", l: "Docker image" },
      { n: "4-class", l: "tumor triage" },
      { n: "CPU", l: "cloud inference" },
    ],
    summary:
      "Final-year project. I led the AI pipeline, backend, and DevOps; my partner built the Next.js PWA. Chose EfficientNet-B0 over heavier nets (VGG16) so the full container runs on cheap CPU-only Render instances. Decoupled image storage via Cloudinary, async FastAPI + SQLModel for concurrency, JWT + Argon2 for the auth flow.",
    diagram: [
      { x: 20, y: 18, label: "MRI upload · PWA", cls: "" },
      { x: 50, y: 18, label: "FastAPI · async", cls: "bl" },
      { x: 80, y: 18, label: "JWT + Argon2", cls: "" },
      { x: 80, y: 50, label: "Cloudinary · blobs", cls: "cr" },
      { x: 50, y: 50, label: "EfficientNet-B0", cls: "hi" },
      { x: 20, y: 50, label: "Postgres · SQLModel", cls: "" },
      { x: 50, y: 82, label: "4-class · Docker / Render", cls: "dk" },
    ],
    edges: [[0, 1], [1, 2], [1, 3], [1, 4], [4, 5], [4, 6]],
  },
  {
    id: "freight-voice",
    title: "Freight",
    italic: "Voice Orchestration",
    desc: "Enterprise AI voice system qualifying a 300k+ logistics lead database — intent-based routing into Qualified / Retry / DQ / DNC with an auto-written executive narrative per call.",
    stack: ["Synthflow V2", "GoHighLevel", "GPT-4o", "GPT-4o-mini", "Webhooks"],
    tag: "Conversational AI · Logistics",
    internal: true,
    metrics: [
      { n: "300k+", l: "leads addressable" },
      { n: "4-branch", l: "intent router" },
      { n: "< 10 min", l: "speed to quote" },
      { n: "< 80 w", l: "exec narrative" },
    ],
    summary:
      "Lead architect. Built a custom Decision Node that categorizes on intent and professional cooperation, not call duration. A GPT-4o-mini fail-safe reconstructs shipment data (origin, destination, weight, date) from transcripts when the primary API loses fields. A Max-2-calls + 30-min retry state machine protects brand reputation; the inbound path keeps conversation context 24/7 for callbacks.",
    diagram: [
      { x: 20, y: 18, label: "300k lead DB", cls: "cr" },
      { x: 50, y: 18, label: "Synthflow · outbound", cls: "bl" },
      { x: 80, y: 18, label: "GPT-4o · intent", cls: "hi" },
      { x: 80, y: 50, label: "Decision Node", cls: "" },
      { x: 50, y: 70, label: "Qualified / Retry / DQ / DNC", cls: "" },
      { x: 20, y: 50, label: "fail-safe · 4o-mini", cls: "" },
      { x: 50, y: 86, label: "GHL · audit + narrative", cls: "dk" },
    ],
    edges: [[0, 1], [1, 2], [2, 3], [3, 4], [2, 5], [5, 4], [4, 6]],
  },
  {
    id: "marketing-ops",
    title: "Marketing Ops",
    italic: "Document Factory",
    desc: "Autonomous Python backend that turns a master checklist into hundreds of client-specific SOPs on demand — one call spins up a Drive tree, scrapes refs, runs GPT-4 Turbo, writes .docx, and links back to the sheet.",
    stack: ["Python", "GPT-4 Turbo", "Playwright", "Google Drive API", "Google Sheets API", "python-docx"],
    tag: "Agentic Workflows · Operations",
    internal: true,
    metrics: [
      { n: "60h → 1–2h", l: "per client" },
      { n: "4-level", l: "Drive tree gen" },
      { n: "6-part", l: "SOP schema" },
      { n: "idempotent", l: "safe re-runs" },
    ],
    summary:
      "Lead Python developer. OAuth 2.0 → clone master sheet → Playwright-powered headless scraper (waits on DOM signals like `data-block-id` for Notion-style JS frames) → GPT-4 Turbo generation forced into a 6-part schema (Overview, Steps, Roles, Tools, QA, Use Case) → python-docx → Drive upload with folder-tree reconciliation → URL written back into the exact sheet cell. Idempotent by design — safe to pause, restart, or re-run.",
    diagram: [
      { x: 20, y: 18, label: "REST trigger · biz profile", cls: "" },
      { x: 50, y: 18, label: "OAuth · clone sheet", cls: "bl" },
      { x: 80, y: 18, label: "Playwright · scrape refs", cls: "hi" },
      { x: 80, y: 50, label: "GPT-4 Turbo · 6-part SOP", cls: "" },
      { x: 50, y: 50, label: "python-docx", cls: "cr" },
      { x: 20, y: 50, label: "Drive tree · upload", cls: "" },
      { x: 50, y: 82, label: "write link → source cell", cls: "dk" },
    ],
    edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6]],
  },
  {
    id: "propauto",
    title: "PropAuto",
    italic: "CRM",
    desc: "Full-stack real-estate CRM — scout distressed properties by geography, unlock owner contact on credits, and run two-way SMS campaigns with sticky attribution for inbound replies.",
    stack: ["React", "FastAPI", "PostgreSQL (JSONB)", "Twilio", "SQLAlchemy", "Docker"],
    tag: "Infrastructure · Enterprise",
    internal: true,
    metrics: [
      { n: "2-way", l: "SMS orchestration" },
      { n: "JSONB", l: "lead normalization" },
      { n: "signed", l: "Twilio webhooks" },
      { n: "sticky", l: "context attribution" },
    ],
    summary:
      "Built end-to-end. Credit-based unlock UX for lead enrichment, JSONB-backed normalization pipeline, batch SMS outbound engine, and a passive webhook receiver that cryptographically verifies `X-Twilio-Signature` before touching state. The clever bit: sticky context — when a phone number exists in multiple historic campaigns, SQLAlchemy queries cast JSON and mine message history to attribute the reply to the most recent active campaign.",
    diagram: [
      { x: 20, y: 18, label: "React · scout UI", cls: "" },
      { x: 50, y: 18, label: "FastAPI · enrich", cls: "bl" },
      { x: 80, y: 18, label: "Postgres · JSONB", cls: "cr" },
      { x: 80, y: 50, label: "Twilio · outbound", cls: "hi" },
      { x: 50, y: 50, label: "signed webhook in", cls: "" },
      { x: 20, y: 50, label: "sticky attribution", cls: "" },
      { x: 50, y: 82, label: "stateful inbox · poll", cls: "dk" },
    ],
    edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6]],
  },
];

const Diagram = ({ nodes, edges }: { nodes: DiagramNode[]; edges: [number, number][] }) => {
  return (
    <div className="reveal-diagram">
      <span className="dg-label">system diagram</span>
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <defs>
          <marker id="arr-r" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill="#181716" />
          </marker>
        </defs>
        {edges.map((e, i) => {
          const a = nodes[e[0]];
          const b = nodes[e[1]];
          if (!a || !b) return null;
          const mx = (a.x + b.x) / 2;
          const my = (a.y + b.y) / 2 - 6;
          const d = `M ${a.x} ${a.y} Q ${mx} ${my}, ${b.x} ${b.y}`;
          return (
            <path
              key={i}
              d={d}
              stroke="#181716"
              strokeWidth="0.4"
              fill="none"
              markerEnd="url(#arr-r)"
              vectorEffect="non-scaling-stroke"
              strokeDasharray="1.2 0.9"
              opacity=".5"
            />
          );
        })}
      </svg>
      {nodes.map((n, i) => (
        <div key={i} className={`dg-box ${n.cls}`} style={{ left: `${n.x}%`, top: `${n.y}%` }}>
          {n.label}
        </div>
      ))}
    </div>
  );
};

const filters = ["All", "AI/ML", "Agents", "Infrastructure"] as const;
type Filter = (typeof filters)[number];

const Work = () => {
  const [open, setOpen] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>("All");

  const match = (p: Project) => {
    if (filter === "All") return true;
    if (filter === "AI/ML") return /Vision|Conversational|Healthcare/.test(p.tag);
    if (filter === "Agents") return /Agentic|Conversational/.test(p.tag);
    if (filter === "Infrastructure") return /Infrastructure|Enterprise/.test(p.tag);
    return true;
  };

  return (
    <section className="work-sec" id="work">
      <div className="work-head">
        <div className="sec-head" style={{ position: "static" }}>
          <span className="num">№ 03</span>
          Selected Work
          <b>Case files</b>
        </div>
        <h2>
          Things I've <em>shipped</em>
          <br />
          and kept running.
        </h2>
        <div className="work-filters">
          {filters.map((f) => (
            <button key={f} className={filter === f ? "active" : ""} onClick={() => setFilter(f)}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="work-list">
        {projects.filter(match).map((p, i) => (
          <article
            key={p.id}
            className={`work-row ${open === p.id ? "open" : ""}`}
            onClick={() => setOpen(open === p.id ? null : p.id)}
          >
            <span className="idx">№ 00{i + 1}</span>
            <div className="title">
              {p.title} <em>{p.italic}</em>
            </div>
            <div className="desc">{p.desc}</div>
            <div className="stack">
              {p.stack.slice(0, 4).map((t) => (
                <span key={t} className="chip">{t}</span>
              ))}
            </div>
            <div className="go" aria-label="Expand">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7M7 7h10v10" />
              </svg>
            </div>

            <div className="work-reveal">
              <div className="reveal-inner">
                <Diagram nodes={p.diagram} edges={p.edges} />
                <div className="reveal-meta">
                  <h5>— {p.tag}</h5>
                  <p>{p.summary}</p>
                  <div className="pair">
                    {p.metrics.map((m, j) => (
                      <div key={j}>
                        <b>{m.n}</b>
                        <span>{m.l}</span>
                      </div>
                    ))}
                  </div>
                  <div className="reveal-links">
                    {p.internal ? (
                      <span className="lock">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                          <rect x="3" y="11" width="18" height="11" rx="2" />
                          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                        Internal · client work
                      </span>
                    ) : (
                      <a
                        className="btn"
                        href={p.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e: MouseEvent) => e.stopPropagation()}
                      >
                        {p.linkLabel}
                      </a>
                    )}
                    <button
                      type="button"
                      className="btn ghost"
                      onClick={(e: MouseEvent) => {
                        e.stopPropagation();
                        setOpen(null);
                      }}
                    >
                      Collapse
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Work;
