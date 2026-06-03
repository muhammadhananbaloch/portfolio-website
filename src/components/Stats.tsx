import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const useCountUp = (target: number, trigger: boolean, duration = 800) => {
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

const revealTransition = {
  duration: 0.3,
  ease: [0.22, 1, 0.36, 1] as const,
};

const Stats = () => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  const projects = useCountUp(7, inView);
  const years = useCountUp(2, inView);

  return (
    <motion.section
      className="stats-band"
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={revealTransition}
    >
      <div className="stats-inner">
        <div className="kicker">
          <b>By the numbers</b>
        </div>
        <div className="stat">
          <div className="n">{Math.round(projects)}</div>
          <div className="l">projects shipped</div>
        </div>
        <div className="stat">
          <div className="n">
            {Math.round(years)}
            <em> yrs</em>
          </div>
          <div className="l">building with AI</div>
        </div>
      </div>
    </motion.section>
  );
};

export default Stats;
