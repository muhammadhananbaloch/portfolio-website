import AgentGraph from "./AgentGraph";

const Hero = () => {
  return (
    <section className="hero" id="top">
      <div className="hero-left">
        <div>
          <div className="hero-kicker">
            <span>AI Engineer</span>
          </div>

          <h1 className="display">
            I architect autonomous<br />
            AI systems &amp;<br />
            agents that ship.
          </h1>

          <p className="lede">
            AI Engineer at <b>JBS Americas &amp; Europe</b>, building <b>RAG pipelines</b>,
            <b> voice agents</b>, and <b>agentic workflows</b> behind real production traffic, not demos.
          </p>

          <div className="cta-row">
            <a className="btn primary" href="#work">
              See selected work
              <svg className="icn" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
            </a>
            <a
              className="btn"
              href="https://drive.google.com/file/d/1FxqXKWAzpl2jAau1EkrCi8JpYJWmjcYz/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              id="resume-download-btn"
            >
              <svg className="icn" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" /></svg>
              Résumé (PDF)
            </a>
            <a className="btn ghost" href="#contact">
              <svg className="icn" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
              Book 30-min
            </a>
          </div>
        </div>

        <div className="hero-foot">
          <div className="chips">
            <span>Based<b>Karachi · Remote</b></span>
            <span>Role<b>AI Engineer, JBS</b></span>
          </div>
          <div>Scroll ↓</div>
        </div>
      </div>

      <div className="hero-right">
        <div className="graph-meta">
          <span className="live">● live · agent graph</span>
        </div>
        <div className="graph-stage">
          <AgentGraph />
        </div>
        <div className="graph-caption">
          <p>What I build, in one picture: a model, tools, memory, and the glue that holds them together under load.</p>
          <div className="graph-tokens">
            <span>p50 240ms</span>
            <span>99.4% up</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
