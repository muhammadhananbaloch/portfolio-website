export type ProjectDemoType =
  | "aviation"
  | "freight"
  | "marketing"
  | "propauto"
  | "lead"
  | "neuroscan";

export interface Project {
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
  demo: ProjectDemoType;
}

export const projects: Project[] = [
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
    stack: [
      "Python",
      "GPT-4 Turbo",
      "Playwright",
      "Google Drive API",
      "Google Sheets API",
      "python-docx",
    ],
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
