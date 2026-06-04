import { useEffect, useState, useCallback } from "react";

const formatTime = (d: Date) =>
  d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });

const NAV_LINKS = [
  { id: "work", href: "#work", label: "Work" },
  { id: "stack", href: "#stack", label: "Stack" },
  { id: "experience", href: "#experience", label: "Experience" },
];

const Masthead = () => {
  const [now, setNow] = useState(() => new Date());
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    setScrollProgress(docHeight > 0 ? scrollTop / docHeight : 0);

    const threshold = window.innerHeight * 0.35;
    let current: string | null = null;

    for (const id of ["work", "stack", "contact"]) {
      const el = document.getElementById(id);
      if (!el) continue;
      if (el.getBoundingClientRect().top <= threshold) current = id;
    }

    // Experience is inside the Stack scene; only highlight it
    // when the timeline is scrolled well past the top (stacked layout)
    const expEl = document.getElementById("experience");
    if (expEl) {
      const expTop = expEl.getBoundingClientRect().top;
      const stackEl = document.getElementById("stack");
      const stackTop = stackEl ? stackEl.getBoundingClientRect().top : 0;
      // Only switch to Experience when the experience div is significantly
      // below the stack start AND has scrolled past threshold
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

  const localTime = formatTime(now);

  return (
    <header className="masthead">
      <div
        className="masthead-progress"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />
      <div className="masthead-top">
        <div className="pulse"><span className="pulse-dot"></span> Currently at JBS</div>
        <div>Karachi · Remote · Your time <b>{localTime}</b></div>
      </div>
      <div className="masthead-main">
        <a href="#top" className="masthead-logo">
          <b>Muhammad Hanan Baloch</b>
          <span className="vol">AI Engineer</span>
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
            Get in touch ↗
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Masthead;
