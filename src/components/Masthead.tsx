import { useEffect, useState, useCallback, useRef } from "react";

const SECTIONS = [
  { id: "work", label: "Work" },
  { id: "stack", label: "Stack" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

const Masthead = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const lastScrollY = useRef(0);
  const pastHero = useRef(false);
  const hovering = useRef(false);

  const handleScroll = useCallback(() => {
    const y = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    setScrollProgress(docHeight > 0 ? y / docHeight : 0);

    const heroEl = document.getElementById("hero");
    const heroBottom = heroEl
      ? heroEl.offsetTop + heroEl.offsetHeight * 0.3
      : window.innerHeight;
    pastHero.current = y > heroBottom;

    const delta = y - lastScrollY.current;
    const scrollingDown = delta > 5;
    const scrollingUp = delta < -5;

    if (!pastHero.current) {
      setVisible(false);
    } else if (scrollingUp) {
      setVisible(true);
    } else if (scrollingDown && !hovering.current) {
      setVisible(false);
    }

    lastScrollY.current = y;

    const threshold = window.innerHeight * 0.35;
    let current: string | null = null;

    for (const s of SECTIONS) {
      const el = document.getElementById(s.id);
      if (!el) continue;
      const t = s.id === "experience" ? window.innerHeight * 0.15 : threshold;
      if (el.getBoundingClientRect().top <= t) current = s.id;
    }

    setActiveSection(current);
  }, []);

  const handleMouseEnter = useCallback(() => {
    hovering.current = true;
  }, []);

  const handleMouseLeave = useCallback(() => {
    hovering.current = false;
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <header
      className={`masthead${visible ? " masthead--visible" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="masthead-progress"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />
      <nav className="masthead-nav">
        {SECTIONS.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className={activeSection === s.id ? "active" : undefined}
          >
            {s.label}
          </a>
        ))}
      </nav>
    </header>
  );
};

export default Masthead;
