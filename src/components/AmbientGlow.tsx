import { useEffect, useRef, useCallback } from "react";

const LERP_FACTOR = 0.04;

const AmbientGlow = () => {
  const mouseRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0.5, y: 0.3 });
  const target = useRef({ x: 0.5, y: 0.3 });
  const raf = useRef(0);
  const active = useRef(false);

  const tick = useCallback(() => {
    pos.current.x += (target.current.x - pos.current.x) * LERP_FACTOR;
    pos.current.y += (target.current.y - pos.current.y) * LERP_FACTOR;

    if (mouseRef.current) {
      mouseRef.current.style.transform =
        `translate(${pos.current.x * 100}%, ${pos.current.y * 100}%)`;
    }

    raf.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX / window.innerWidth;
      target.current.y = e.clientY / window.innerHeight;
      if (!active.current) {
        active.current = true;
        raf.current = requestAnimationFrame(tick);
      }
    };

    active.current = true;
    raf.current = requestAnimationFrame(tick);
    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, [tick]);

  return (
    <div className="ambient-glow" aria-hidden>
      <div className="ambient-glow__drift ambient-glow__drift--1" />
      <div className="ambient-glow__drift ambient-glow__drift--2" />
      <div className="ambient-glow__drift ambient-glow__drift--3" />
      <div className="ambient-glow__mouse" ref={mouseRef} />
    </div>
  );
};

export default AmbientGlow;
