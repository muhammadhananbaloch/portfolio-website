import { useEffect, useState } from "react";

const formatTime = (d: Date) =>
  d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });

const Masthead = () => {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);

  const localTime = formatTime(now);

  return (
    <header className="masthead">
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
          <a href="#work">Work</a>
          <a href="#stack">Stack</a>
          <a href="#experience">Experience</a>
          <a href="#contact" className="cta">Get in touch ↗</a>
        </nav>
      </div>
    </header>
  );
};

export default Masthead;
