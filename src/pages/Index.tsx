import { useEffect } from "react";
import Masthead from "@/components/Masthead";
import BeatHero from "@/components/beats/BeatHero";
import BeatColorTransition from "@/components/beats/BeatColorTransition";
import BeatProjectChapters from "@/components/beats/BeatProjectChapters";
import BeatManifesto from "@/components/beats/BeatManifesto";
import StackScene from "@/components/StackScene";
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
      <BeatHero />
      <BeatColorTransition />
      <BeatProjectChapters />
      <BeatManifesto />
      <StackScene />
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
          <a href="#hero" className="site-footer__top">Back to top ↑</a>
        </nav>
      </footer>
    </>
  );
};

export default Index;
