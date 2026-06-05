import { useState, useEffect, useRef, useCallback } from "react";

const TYPED_TEXT =
  "I build AI systems that replace manual workflows with automated, production-grade solutions.";
const CHAR_MS = 30;

const PROOFS = [
  "7 systems shipped",
  "300k+ leads automated",
  "98% time reduction",
];

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function phase(p: number, start: number, end: number) {
  if (p < start) return 0;
  if (p > end) return 1;
  return (p - start) / (end - start);
}

const HeroScene = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const rafScroll = useRef(0);
  const [progress, setProgress] = useState(0);
  const [typedLen, setTypedLen] = useState(0);
  const [typingTriggered, setTypingTriggered] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      cancelAnimationFrame(rafScroll.current);
      rafScroll.current = requestAnimationFrame(() => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const total = containerRef.current.offsetHeight - window.innerHeight;
        const p = Math.max(0, Math.min(1, -rect.top / total));
        setProgress(p);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafScroll.current);
    };
  }, []);

  useEffect(() => {
    if (progress >= 0.18 && !typingTriggered) setTypingTriggered(true);
  }, [progress, typingTriggered]);

  useEffect(() => {
    if (!typingTriggered) return;
    if (typedLen >= TYPED_TEXT.length) return;
    const id = setTimeout(
      () => setTypedLen((l) => Math.min(l + 1, TYPED_TEXT.length)),
      CHAR_MS,
    );
    return () => clearTimeout(id);
  }, [typingTriggered, typedLen]);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!glowRef.current || !stickyRef.current) return;
    const rect = stickyRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    glowRef.current.style.setProperty("--gx", `${x}px`);
    glowRef.current.style.setProperty("--gy", `${y}px`);
  }, []);

  const p = progress;

  // Phase 1: Name visible → fades out completely before typed text appears
  const nameOpacity = p < 0.16 ? 1 : 1 - phase(p, 0.16, 0.22);
  const nameScale = lerp(1, 1.08, phase(p, 0.16, 0.24));

  // Phase 2: Typed text fades in after name is gone, fades out before proofs
  const typeOpacity =
    p < 0.24 ? 0
    : p < 0.30 ? phase(p, 0.24, 0.30)
    : p < 0.40 ? 1
    : 1 - phase(p, 0.40, 0.46);

  // Phase 3: Proof points appear after typed text gone
  const proofOpacity =
    p < 0.48 ? 0
    : p < 0.54 ? phase(p, 0.48, 0.54)
    : p < 0.60 ? 1
    : 1 - phase(p, 0.60, 0.66);

  // Phase 4: CTAs appear after proof points gone
  const ctaOpacity =
    p < 0.68 ? 0
    : p < 0.74 ? phase(p, 0.68, 0.74)
    : p < 0.82 ? 1
    : 1 - phase(p, 0.82, 0.92);

  const globalFade = p > 0.88 ? 1 - phase(p, 0.88, 1) : 1;

  const proofStagger = (i: number) => {
    const delay = i * 0.025;
    const t = phase(p, 0.48 + delay, 0.54 + delay);
    return {
      opacity: proofOpacity > 0 ? Math.min(t, proofOpacity) : 0,
      transform: `translateY(${lerp(16, 0, t)}px)`,
    };
  };

  return (
    <div className="hero-scroll" id="top" ref={containerRef}>
      <div
        className="hero-sticky"
        ref={stickyRef}
        onMouseMove={onMouseMove}
      >
        <div ref={glowRef} className="hero-glow" />

        <div className="hero-center" style={{ opacity: globalFade }}>
          <div
            className="hero-name"
            style={{
              opacity: nameOpacity,
              transform: `scale(${nameScale})`,
            }}
          >
            <h1>Muhammad Hanan Baloch</h1>
            <span className="hero-role">AI Engineer</span>
          </div>

          <p className="hero-typed" style={{ opacity: typeOpacity }}>
            <span>{TYPED_TEXT.slice(0, typedLen)}</span>
            {typingTriggered && (
              <span
                className={`hero-cursor${typedLen >= TYPED_TEXT.length ? " hero-cursor--blink" : ""}`}
              />
            )}
          </p>

          <div className="hero-proofs" style={{ opacity: proofOpacity > 0 ? 1 : 0 }}>
            {PROOFS.map((txt, i) => (
              <span key={i}>
                {i > 0 && <span className="hero-proofs__dot">·</span>}
                <span style={proofStagger(i)}>{txt}</span>
              </span>
            ))}
          </div>

          <div className="hero-actions" style={{ opacity: ctaOpacity }}>
            <a className="btn primary" href="#work">
              See the work ↓
            </a>
            <a
              className="btn"
              href="https://drive.google.com/file/d/1FxqXKWAzpl2jAau1EkrCi8JpYJWmjcYz/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              id="resume-download-btn"
            >
              Résumé (PDF)
            </a>
            <a className="btn ghost" href="#contact">
              Book 30-min
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroScene;
