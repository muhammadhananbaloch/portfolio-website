import { useEffect, useRef, useCallback } from "react";

const LERP = 0.035;

const AmbientGlow = () => {
  const ref = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0.5, y: 0.3 });
  const target = useRef({ x: 0.5, y: 0.3 });
  const raf = useRef(0);

  const tick = useCallback(() => {
    pos.current.x += (target.current.x - pos.current.x) * LERP;
    pos.current.y += (target.current.y - pos.current.y) * LERP;

    if (ref.current) {
      ref.current.style.transform =
        `translate(${pos.current.x * 100}%, ${pos.current.y * 100}%)`;
    }

    raf.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX / window.innerWidth;
      target.current.y = e.clientY / window.innerHeight;
    };

    raf.current = requestAnimationFrame(tick);
    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, [tick]);

  return (
    <div className="ambient-glow" aria-hidden>
      <div className="ambient-glow__mouse" ref={ref} />
    </div>
  );
};

export default AmbientGlow;
