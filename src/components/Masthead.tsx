import { useEffect, useState, useCallback } from "react";

const NAV_LINKS = [
  { id: "work", href: "#work", label: "Work" },
  { id: "stack", href: "#stack", label: "Stack" },
  { id: "experience", href: "#experience", label: "Experience" },
];

const Masthead = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    setScrollProgress(docHeight > 0 ? scrollTop / docHeight : 0);
    setScrolled(scrollTop > 100);

    const threshold = window.innerHeight * 0.35;
    let current: string | null = null;

    for (const id of ["work", "stack", "contact"]) {
      const el = document.getElementById(id);
      if (!el) continue;
      if (el.getBoundingClientRect().top <= threshold) current = id;
    }

    const expEl = document.getElementById("experience");
    if (expEl) {
      const expTop = expEl.getBoundingClientRect().top;
      const stackEl = document.getElementById("stack");
      const stackTop = stackEl ? stackEl.getBoundingClientRect().top : 0;
      if (expTop - stackTop > 200 && expTop <= threshold) {
        current = "experience";
      }
    }

    setActiveSection(current);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <header className={`masthead${scrolled ? " masthead--scrolled" : ""}`}>
      <div
        className="masthead-progress"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />
      <div className="masthead-inner">
        <a href="#top" className="masthead-logo">
          Muhammad Hanan Baloch
        </a>
        <nav className="masthead-nav">
          {NAV_LINKS.map((s) => (
            <a
              key={s.id}
              href={s.href}
              className={activeSection === s.id ? "active" : undefined}
            >
              {s.label}
            </a>
          ))}
          <a
            href="#contact"
            className={`cta${activeSection === "contact" ? " active" : ""}`}
          >
            Get in touch
            <svg
              className="icn"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 17L17 7M7 7h10v10" />
            </svg>
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Masthead;
