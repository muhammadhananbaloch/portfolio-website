import { useState, useRef, lazy, Suspense, RefObject } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const AviationClaimsDemo = lazy(() => import("@/components/AviationClaimsDemo"));
const FreightVoiceDemo = lazy(() => import("@/components/FreightVoiceDemo"));
const MarketingOpsDemo = lazy(() => import("@/components/MarketingOpsDemo"));
const PropAutoCRMDemo = lazy(() => import("@/components/PropAutoCRMDemo"));
const LeadEnrichmentDemo = lazy(() => import("@/components/LeadEnrichmentDemo"));
const NeuroScanDemo = lazy(() => import("@/components/NeuroScanDemo"));

type Project = {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  desc: string;
  stack: string[];
  tag: string;
  internal: boolean;
  link?: string;
  linkLabel?: string;
  metrics: { n: string; l: string }[];
  demoLabel: string;
  demo: "aviation" | "freight" | "marketing" | "propauto" | "lead" | "neuroscan";
};

const projects: Project[] = [
  {
    id: "aviation-rag",
    num: "01",
    title: "Aviation Claims",
    subtitle: "Hybrid RAG",
    desc: "Hybrid RAG backend letting insurance adjusters query 10+ years of aviation claims in plain English: one LangGraph router, two paths (SQL + pgvector), grounded answers with a CSV export.",
    stack: ["LangGraph", "FastAPI", "pgvector", "GPT-5.4-mini", "SQLAlchemy", "AWS"],
    tag: "Agentic Workflows · Enterprise",
    internal: true,
    metrics: [
      { n: "10+", l: "yrs claims data" },
      { n: "14", l: "client aliases" },
      { n: "185K", l: "token budget guard" },
      { n: "2 paths", l: "SQL · semantic" },
    ],
    demoLabel: "Query Router Demo",
    demo: "aviation",
  },
  {
    id: "freight-voice",
    num: "02",
    title: "Freight",
    subtitle: "Voice Orchestration",
    desc: "Enterprise AI voice system qualifying a 300k+ logistics lead database: intent-based routing into Qualified / Retry / DQ / DNC with an auto-written executive narrative per call.",
    stack: ["Synthflow V2", "GoHighLevel", "GPT-4o", "GPT-4o-mini", "Webhooks"],
    tag: "Conversational AI · Logistics",
    internal: true,
    metrics: [
      { n: "300k+", l: "leads addressable" },
      { n: "4-branch", l: "intent router" },
      { n: "< 10 min", l: "speed to quote" },
      { n: "< 80 w", l: "exec narrative" },
    ],
    demoLabel: "Live Call Trace",
    demo: "freight",
  },
  {
    id: "marketing-ops",
    num: "03",
    title: "Marketing Ops",
    subtitle: "Document Factory",
    desc: "Autonomous Python backend that turns a master checklist into hundreds of client-specific SOPs on demand. One call spins up a Drive tree, scrapes refs, runs GPT-4 Turbo, writes .docx, and links back to the sheet.",
    stack: ["Python", "GPT-4 Turbo", "Playwright", "Google Drive API", "Google Sheets API", "python-docx"],
    tag: "Agentic Workflows · Operations",
    internal: true,
    metrics: [
      { n: "60h → 1–2h", l: "per client" },
      { n: "4-level", l: "Drive tree gen" },
      { n: "6-part", l: "SOP schema" },
      { n: "idempotent", l: "safe re-runs" },
    ],
    demoLabel: "Before / After",
    demo: "marketing",
  },
  {
    id: "propauto",
    num: "04",
    title: "PropAuto",
    subtitle: "CRM",
    desc: "Full-stack real-estate CRM. Scout distressed properties by geography, unlock owner contact on credits, and run two-way SMS campaigns with sticky attribution for inbound replies.",
    stack: ["React", "FastAPI", "PostgreSQL (JSONB)", "Twilio", "SQLAlchemy", "Docker"],
    tag: "Infrastructure · Enterprise",
    internal: true,
    metrics: [
      { n: "2-way", l: "SMS orchestration" },
      { n: "JSONB", l: "lead normalization" },
      { n: "signed", l: "Twilio webhooks" },
      { n: "sticky", l: "context attribution" },
    ],
    demoLabel: "SMS Flow",
    demo: "propauto",
  },
  {
    id: "lead-enrichment",
    num: "05",
    title: "Lead Enrichment",
    subtitle: "Outreach Engine",
    desc: "Fully hands-free outreach pipeline: scrapes live job postings, enriches decision-maker contacts via Clay, and fires AI-personalized cold emails. A smart polling gate blocks every send until enrichment is 100% complete.",
    stack: ["n8n", "GPT-4o", "Apify", "Clay", "Instantly.ai", "JavaScript"],
    tag: "Agentic Workflows · Growth",
    internal: true,
    metrics: [
      { n: "3–4h → ~10min", l: "per batch" },
      { n: "30–40", l: "leads per day" },
      { n: "0", l: "incomplete sends" },
      { n: "5-source", l: "enrichment waterfall" },
    ],
    demoLabel: "Pipeline Waterfall",
    demo: "lead",
  },
  {
    id: "neuroscan",
    num: "06",
    title: "NeuroScan",
    subtitle: "AI",
    desc: "Medical web app that triages brain-tumor MRI scans into four categories in real time on CPU-only cloud. No GPU required.",
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
    demoLabel: "Classification Live View",
    demo: "neuroscan",
  },
];

const filters = ["All", "AI/ML", "Agents", "Infrastructure"] as const;
type Filter = (typeof filters)[number];

const ease = [0.22, 1, 0.36, 1] as const;

const matchFilter = (p: Project, f: Filter) => {
  if (f === "All") return true;
  if (f === "AI/ML") return /Vision|Conversational|Healthcare/.test(p.tag);
  if (f === "Agents") return /Agentic|Conversational/.test(p.tag);
  if (f === "Infrastructure") return /Infrastructure|Enterprise/.test(p.tag);
  return true;
};

const ProjectCase = ({ project }: { project: Project }) => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref as RefObject<Element>, { amount: 0.15 });
  const demoVisible = useInView(ref as RefObject<Element>, { amount: 0.3 });

  const renderDemo = () => {
    switch (project.demo) {
      case "aviation":
        return (
          <Suspense fallback={null}>
            <AviationClaimsDemo isVisible={demoVisible} />
          </Suspense>
        );
      case "freight":
        return (
          <Suspense fallback={null}>
            <FreightVoiceDemo isVisible={demoVisible} />
          </Suspense>
        );
      case "marketing":
        return (
          <Suspense fallback={null}>
            <MarketingOpsDemo isVisible={demoVisible} />
          </Suspense>
        );
      case "propauto":
        return (
          <Suspense fallback={null}>
            <PropAutoCRMDemo isVisible={demoVisible} />
          </Suspense>
        );
      case "lead":
        return (
          <Suspense fallback={null}>
            <LeadEnrichmentDemo isVisible={demoVisible} />
          </Suspense>
        );
      case "neuroscan":
        return (
          <Suspense fallback={null}>
            <NeuroScanDemo isVisible={demoVisible} />
          </Suspense>
        );
      default:
        return null;
    }
  };

  return (
    <motion.article
      ref={ref}
      id={`project-${project.id}`}
      className="project-case"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.4, ease }}
    >
      <div className="project-case__body">
        <div className="project-case__meta">
          <span className="project-case__num">{project.num}</span>
          <div className="project-case__title-group">
            <h3 className="project-case__title">
              {project.title} <span className="project-case__subtitle">{project.subtitle}</span>
            </h3>
            <span className="project-case__tag">{project.tag}</span>
          </div>
          <p className="project-case__desc">{project.desc}</p>
          <div className="project-case__pills">
            {project.stack.map((t) => (
              <span key={t} className="project-case__pill">{t}</span>
            ))}
          </div>
          <div className="project-case__access">
            {project.internal ? (
              <span className="project-case__lock">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                Internal · client work
              </span>
            ) : (
              <a
                className="btn ghost"
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {project.linkLabel}
              </a>
            )}
          </div>
        </div>

        <div className="project-case__demo">
          <div className="project-case__demo-label">{project.demoLabel}</div>
          {renderDemo()}
        </div>
      </div>

      <div className="project-case__stats">
        {project.metrics.map((m, i) => (
          <div key={i} className="project-case__stat">
            <span className="project-case__stat-n">{m.n}</span>
            <span className="project-case__stat-l">{m.l}</span>
          </div>
        ))}
      </div>
    </motion.article>
  );
};

const ProjectsScene = () => {
  const [filter, setFilter] = useState<Filter>("All");
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef as RefObject<Element>, { once: true, amount: 0.3 });

  const filtered = projects.filter((p) => matchFilter(p, filter));

  return (
    <section className="scene scene--projects" id="work">
      <motion.div
        className="projects-header"
        ref={headerRef}
        initial={{ opacity: 0, y: 24 }}
        animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.35, ease }}
      >
        <div className="projects-header__top">
          <div className="projects-header__label">
            <span className="scene__number">02</span>
            <span className="scene__name">PROJECTS</span>
          </div>
          <div className="projects-header__filters">
            {filters.map((f) => (
              <button
                key={f}
                className={`projects-header__filter ${filter === f ? "active" : ""}`}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        <h2 className="projects-header__title">
          Things I've shipped<br />and kept running.
        </h2>
      </motion.div>

      <div className="projects-list">
        <AnimatePresence>
          {filtered.map((p) => (
            <ProjectCase key={p.id} project={p} />
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ProjectsScene;
