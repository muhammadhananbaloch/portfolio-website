import { useEffect, useRef, useState } from "react";

const useCountUp = (target: number, trigger: boolean, duration = 1200) => {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let start: number | null = null;
    let raf = 0;
    const step = (t: number) => {
      if (start === null) start = t;
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(target * eased);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [trigger, target, duration]);
  return v;
};

const Stats = () => {
  const ref = useRef<HTMLElement | null>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setSeen(true)),
      { threshold: 0.4 },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  const projects = useCountUp(7, seen);
  const languages = useCountUp(4, seen);
  const years = useCountUp(2, seen);

  return (
    <section className="stats-band" ref={ref}>
      <div className="stats-inner">
        <div className="kicker">
          <span>— Field Report</span>
          <b>By the numbers</b>
        </div>
        <div className="stat">
          <div className="n">{Math.round(projects)}</div>
          <div className="l">projects shipped</div>
        </div>
        <div className="stat">
          <div className="n">
            {Math.round(languages)}
            <em>+</em>
          </div>
          <div className="l">languages &amp; frameworks</div>
        </div>
        <div className="stat">
          <div className="n">
            {Math.round(years)}
            <em> yrs</em>
          </div>
          <div className="l">building with AI</div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
