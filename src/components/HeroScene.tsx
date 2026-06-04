import { useEffect, useRef } from "react";
import AgentGraph from "./AgentGraph";

const HeroScene = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const graphRef = useRef<HTMLDivElement>(null);

  // Scroll parallax: graph scales down and fades as user scrolls past hero
  useEffect(() => {
    const onScroll = () => {
      const h = sectionRef.current?.offsetHeight || window.innerHeight;
      const p = Math.min(1, Math.max(0, window.scrollY / h));
      if (graphRef.current) {
        graphRef.current.style.transform = `scale(${1 - p * 0.15})`;
        graphRef.current.style.opacity = `${1 - p * 0.7}`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="scene scene--hero" id="top" ref={sectionRef}>
      <div className="hero-graph" ref={graphRef}>
        <AgentGraph />
      </div>

      <div className="hero-identity">
        <div className="hero-kicker">
          <span>AI Engineer</span>
        </div>

        <h1 className="display">
          I architect autonomous
          <br />
          AI systems &amp;
          <br />
          agents that ship.
        </h1>

        <p className="lede">
          AI Engineer at <b>JBS Americas &amp; Europe</b>, building{" "}
          <b>RAG pipelines</b>, <b>voice agents</b>, and{" "}
          <b>agentic workflows</b> behind real production traffic, not demos.
        </p>
      </div>

      <div className="hero-ctas">
        <a className="btn primary" href="#work">
          See selected work
          <svg
            className="icn"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </a>
        <a
          className="btn"
          href="https://drive.google.com/file/d/1FxqXKWAzpl2jAau1EkrCi8JpYJWmjcYz/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          id="resume-download-btn"
        >
          <svg
            className="icn"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
          </svg>
          Résumé (PDF)
        </a>
        <a className="btn ghost" href="#contact">
          <svg
            className="icn"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <path d="M16 2v4M8 2v4M3 10h18" />
          </svg>
          Book 30-min
        </a>
      </div>

      <div className="hero-meta">
        <span>Karachi · Remote</span>
        <span>AI Engineer, JBS</span>
      </div>
    </section>
  );
};

export default HeroScene;
