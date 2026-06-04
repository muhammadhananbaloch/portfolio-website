import { useEffect } from "react";
import Masthead from "@/components/Masthead";
import HeroScene from "@/components/HeroScene";
import ProjectsScene from "@/components/ProjectsScene";
import StackScene from "@/components/StackScene";
import QuoteScene from "@/components/QuoteScene";
import ContactScene from "@/components/ContactScene";
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

      <QuoteScene />

      <ContactScene />

      <footer className="scene__footer">
        <div>&copy; 2026 &middot; Muhammad Hanan Baloch &middot; All work original</div>
        <div>Set in Inter &middot; JetBrains Mono</div>
        <div>
          <a href="#top" style={{ textDecoration: "none", color: "inherit" }}>
            Back to top &uarr;
          </a>
        </div>
      </footer>
    </>
  );
};

export default Index;
