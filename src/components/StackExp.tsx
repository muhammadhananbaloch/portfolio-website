import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

type Chip = { label: string; tooltip: string };

const stackGroups: { title: string; italic: string; body: string; chips: Chip[] }[] = [
  {
    title: "Agents",
    italic: "orchestration, tool-use",
    body: "Building graphs where a model knows when to call what, and knows how to recover when a tool lies.",
    chips: [
      { label: "LangChain", tooltip: "Expression language for chaining retrieval, prompts, and output parsers" },
      { label: "LangGraph", tooltip: "State machine routing for the aviation claims chatbot" },
      { label: "n8n", tooltip: "Orchestrates the lead enrichment pipeline end-to-end" },
      { label: "Synthflow", tooltip: "Voice agent platform behind the freight qualification system" },
      { label: "function-calling", tooltip: "Structured tool invocation for SQL generation and API dispatch" },
      { label: "tool-use", tooltip: "Router decides which tool to call based on intent classification" },
      { label: "reflection loops", tooltip: "Agent retries with schema feedback when SQL validation fails" },
    ],
  },
  {
    title: "RAG & data",
    italic: "retrieval you can trust",
    body: "Chunking strategies, embedding choice, hybrid search, and the boring evals that tell you when retrieval breaks.",
    chips: [
      { label: "pgvector", tooltip: "Vector similarity search across three claims tables with cosine distance" },
      { label: "PostgreSQL", tooltip: "Primary store for every project, JSONB for flexible lead schemas" },
      { label: "embeddings", tooltip: "OpenAI ada-002 for document chunks, cached to avoid re-embedding" },
      { label: "hybrid search", tooltip: "Combines SQL exactness with semantic recall in the aviation RAG" },
      { label: "re-ranking", tooltip: "Second-pass scoring to push high-relevance chunks above the noise" },
      { label: "evals", tooltip: "Automated retrieval accuracy checks that catch regressions before deploy" },
    ],
  },
  {
    title: "Delivery",
    italic: "shipping, not just prototyping",
    body: "The unglamorous half: FastAPI behind nginx, containers on Render, and traces you can actually debug.",
    chips: [
      { label: "FastAPI", tooltip: "Async API layer for four production backends including the claims chatbot" },
      { label: "Python", tooltip: "Primary language for every AI and backend system I've shipped" },
      { label: "Docker", tooltip: "Multi-stage builds for all deployments, dev and prod" },
      { label: "nginx", tooltip: "Reverse proxy with gzip and SPA routing for this portfolio" },
      { label: "AWS EC2", tooltip: "Hosts the claims chatbot behind Cloudflare CDN" },
      { label: "Render", tooltip: "CPU-only deployment target for the NeuroScan inference container" },
      { label: "CI/CD", tooltip: "GitHub Actions pipelines for lint, test, build, and deploy" },
    ],
  },
];

const experience = [
  {
    active: true,
    date: "Oct 2025 – Present",
    role: "AI Engineer",
    co: "JBS Americas & Europe",
    body: "Building production AI systems for enterprise clients, replacing manual workflows with automated, API-driven solutions using Python, LLMs, and cloud infrastructure.",
    highlights: [
      { label: "Multi-tenant AI claims chatbot", detail: "(LangGraph, pgvector, PostgreSQL). 14 client aliases, dual SQL/semantic query paths" },
      { label: "AI voice agent", detail: "300k+ logistics prospects, intent-based routing, fail-safe extraction" },
      { label: "Marketing audit agent", detail: "4 hours to under 5 minutes" },
      { label: "SOP generator", detail: "62+ hours of manual work eliminated" },
      { label: "GoHighLevel to n8n migration", detail: "$3,000–$6,000 saved" },
    ],
  },
];

const revealEase = [0.22, 1, 0.36, 1] as const;

const StackChip = ({ chip }: { chip: Chip }) => {
  const [show, setShow] = useState(false);

  return (
    <span
      className="chip"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onClick={() => setShow(!show)}
    >
      {chip.label}
      <AnimatePresence>
        {show && (
          <motion.span
            className="chip-tooltip"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            {chip.tooltip}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
};

const StackExp = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const sectionInView = useInView(sectionRef, { once: true, amount: 0.15 });

  const expRef = useRef<HTMLDivElement>(null);
  const expInView = useInView(expRef, { once: true, amount: 0.2 });

  return (
    <motion.section
      className="stack-exp"
      id="stack"
      ref={sectionRef}
      initial={{ opacity: 0, y: 20 }}
      animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.3, ease: revealEase }}
    >
      <div className="sec-head">
        Stack
      </div>
      <div className="se-body">
        <div>
          <h3 className="se-heading">What I reach for, and why.</h3>
          {stackGroups.map((g, i) => (
            <motion.div
              className="stack-group"
              key={g.title}
              initial={{ opacity: 0, y: 20 }}
              animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: revealEase, delay: 0.1 + i * 0.08 }}
            >
              <h4>
                {g.title}
                <em>· {g.italic}</em>
              </h4>
              <p>{g.body}</p>
              <div className="stack-chips">
                {g.chips.map((c) => (
                  <StackChip key={c.label} chip={c} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="exp-col"
          id="experience"
          ref={expRef}
          initial={{ opacity: 0, y: 20 }}
          animate={expInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: revealEase }}
        >
          <h3 className="se-heading">Experience.</h3>
          {experience.map((e, i) => (
            <div key={i} className={`exp-entry ${e.active ? "active" : ""}`}>
              <div className="date">{e.date}</div>
              <h3>{e.role}</h3>
              <div className="co">{e.co}</div>
              <p>{e.body}</p>
              {e.highlights && (
                <ul className="exp-highlights">
                  {e.highlights.map((h, j) => (
                    <li key={j}><b>{h.label}</b> {h.detail}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default StackExp;
