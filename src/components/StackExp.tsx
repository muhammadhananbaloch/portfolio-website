const stackGroups = [
  {
    title: "Agents",
    italic: "orchestration, tool-use",
    body: "Building graphs where a model knows when to call what, and knows how to recover when a tool lies.",
    chips: ["LangChain", "LangGraph", "n8n", "Synthflow", "function-calling", "tool-use", "reflection loops"],
  },
  {
    title: "RAG & data",
    italic: "retrieval you can trust",
    body: "Chunking strategies, embedding choice, hybrid search, and the boring evals that tell you when retrieval breaks.",
    chips: ["pgvector", "PostgreSQL", "embeddings", "hybrid search", "re-ranking", "evals"],
  },
  {
    title: "Delivery",
    italic: "shipping, not just prototyping",
    body: "The unglamorous half: FastAPI behind nginx, containers on Render, and traces you can actually debug.",
    chips: ["FastAPI", "Python", "Docker", "nginx", "AWS EC2", "Render", "CI/CD"],
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

const StackExp = () => {
  return (
    <section className="stack-exp" id="stack">
      <div className="sec-head">
        Stack
      </div>
      <div className="se-body">
        <div>
          <h3 className="se-heading">What I reach for, and why.</h3>
          {stackGroups.map((g) => (
            <div className="stack-group" key={g.title}>
              <h4>
                {g.title}
                <em>· {g.italic}</em>
              </h4>
              <p>{g.body}</p>
              <div className="stack-chips">
                {g.chips.map((c) => (
                  <span className="chip" key={c}>{c}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="exp-col" id="experience">
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
        </div>
      </div>
    </section>
  );
};

export default StackExp;
