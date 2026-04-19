import { useEffect, useState } from "react";

const LAUNCH_YEAR = 2026;
const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

const formatTime = (d: Date) =>
  d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });

const Masthead = () => {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);

  const vol = ROMAN[now.getFullYear() - LAUNCH_YEAR] ?? String(now.getFullYear() - LAUNCH_YEAR + 1);
  const issue = String(now.getMonth() + 1).padStart(2, "0");
  const monthYear = now.toLocaleString("en-US", { month: "short", year: "numeric" });
  const localTime = formatTime(now);

  return (
    <header className="masthead">
      <div className="masthead-top">
        <div>Vol. {vol} · <b>The Hanan Journal</b> · Issue {issue} · {monthYear}</div>
        <div className="pulse"><span className="pulse-dot"></span> Currently at JBS · open to interesting conversations</div>
        <div>Karachi · Remote · Your time <b>{localTime}</b></div>
      </div>
      <div className="masthead-main">
        <a href="#top" className="masthead-logo">
          <b>Muhammad Hanan Baloch</b>
          <span className="vol">· AI Engineer</span>
        </a>
        <nav className="masthead-nav">
          <a href="#work">Work</a>
          <a href="#now">Now</a>
          <a href="#stack">Stack</a>
          <a href="#experience">Experience</a>
          <a href="#contact" className="cta">Get in touch ↗</a>
        </nav>
      </div>
    </header>
  );
};

export default Masthead;
