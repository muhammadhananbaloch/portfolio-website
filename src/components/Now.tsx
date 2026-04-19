const items = [
  {
    tag: "shipping",
    title: "Hybrid RAG for aviation claims",
    body: "Production LangGraph backend: SQL + pgvector paths behind one natural-language interface. Routing, token-budget guardrails, streaming CSV exports to S3.",
  },
  {
    tag: "building",
    title: "Agent observability layer",
    body: "Wiring trace-level evals with LangSmith so we can tell regressions apart from bad inputs across every LLM call.",
  },
  {
    tag: "learning",
    title: "Deterministic state machines over ad-hoc chains",
    body: "Leaning harder on LangGraph: formal routes, fewer surprises in prod. Fallback paths when token budgets blow past context limits.",
  },
  {
    tag: "reading",
    title: '"Patterns for Agent Design"',
    body: "Anthropic's latest writing on reliable tool-use. Already borrowed the retry-with-reflection loop for SQL validation.",
  },
];

const Now = () => {
  return (
    <section className="now-sec" id="now">
      <div className="sec-head">
        <span className="num">№ 02</span>
        Now
        <b>This month</b>
      </div>
      <div className="now-content">
        <p className="now-lead">
          A <em>living</em> page: what I'm building, learning, and reading <em>right now</em>.
          Updated whenever something meaningful changes.
        </p>
        {items.map((it, i) => (
          <div className="now-item" key={i}>
            <h4>
              <span className="tag">{it.tag}</span>
              {it.title}
            </h4>
            <p>{it.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Now;
