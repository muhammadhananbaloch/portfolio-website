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

      <footer className="site-footer">
        <span>&copy; 2026 Muhammad Hanan Baloch</span>
        <nav className="site-footer__links">
          <a href="mailto:contact@muhammadhananbaloch.dev">Email</a>
          <span className="site-footer__sep">&middot;</span>
          <a href="https://github.com/muhammadhananbaloch" target="_blank" rel="noopener noreferrer">GitHub</a>
          <span className="site-footer__sep">&middot;</span>
          <a href="https://www.linkedin.com/in/muhammadhananbaloch/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <span className="site-footer__sep">&middot;</span>
          <a href="https://x.com/muhammadhanann" target="_blank" rel="noopener noreferrer">Twitter</a>
          <span className="site-footer__sep">&middot;</span>
          <a href="#top" className="site-footer__top">Back to top &uarr;</a>
        </nav>
      </footer>
    </>
  );
};

export default Index;
