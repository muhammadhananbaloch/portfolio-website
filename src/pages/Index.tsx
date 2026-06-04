import { useEffect } from "react";
import Masthead from "@/components/Masthead";
import HeroScene from "@/components/HeroScene";
import ProjectsScene from "@/components/ProjectsScene";
import StackScene from "@/components/StackScene";
import "@/styles/portfolio.css";

const Index = () => {
  useEffect(() => {
    document.documentElement.classList.add("portfolio");
    document.body.classList.add("portfolio");
    return () => {
      document.documentElement.classList.remove("portfolio");
      document.body.classList.remove("portfolio");
    };
  }, []);

  return (
    <>
      <Masthead />

      <HeroScene />

      <ProjectsScene />

      <StackScene />

      <section className="scene scene--quote">
        <div className="scene__label">
          <span className="scene__number">04</span>
          <span className="scene__name">QUOTE</span>
        </div>
        <div className="scene__placeholder">
          Scroll-pinned cinematic. ~200vh tall, sticky content center.
          Three lines revealed by scroll position.
        </div>
      </section>

      <section className="scene scene--contact" id="contact">
        <div className="scene__label">
          <span className="scene__number">05</span>
          <span className="scene__name">CONTACT</span>
        </div>
        <div className="scene__placeholder">
          Terminal-inspired interface. Headline + cursor left, command list right.
        </div>
      </section>

      <footer className="scene__footer">
        <div>© 2026 · Muhammad Hanan Baloch · All work original</div>
        <div>Set in Inter · JetBrains Mono</div>
        <div>
          <a href="#top" style={{ textDecoration: "none", color: "inherit" }}>
            Back to top ↑
          </a>
        </div>
      </footer>
    </>
  );
};

export default Index;
