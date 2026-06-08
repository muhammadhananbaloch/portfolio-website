import { motion, useTransform, MotionValue } from "framer-motion";
import ScrollBeat from "@/components/scroll/ScrollBeat";

const STATS = [
  { n: "7", l: "systems shipped" },
  { n: "300k+", l: "leads automated" },
  { n: "98%", l: "time reduction" },
];

const STATEMENT_LINES = [
  { words: ["I", "architect", "systems"], accent: false },
  { words: ["that", "think,", "route,"], accent: false },
  { words: ["and", "ship."], accent: true },
];

function lerp(p: number, a: number, b: number, oA: number, oB: number) {
  if (p <= a) return oA;
  if (p >= b) return oB;
  return oA + (oB - oA) * ((p - a) / (b - a));
}

const WordReveal = ({
  progress,
  word,
  startAt,
  isAccent,
}: {
  progress: MotionValue<number>;
  word: string;
  startAt: number;
  isAccent: boolean;
}) => {
  const end = startAt + 0.035;
  const opacity = useTransform(progress, (p) => lerp(p, startAt, end, 0, 1));
  const y = useTransform(progress, (p) => lerp(p, startAt, end, 20, 0));
  return (
    <motion.span
      className={`hero-beat__word${isAccent ? " hero-beat__word--accent" : ""}`}
      style={{ opacity, y, display: "inline-block" }}
    >
      {word}&nbsp;
    </motion.span>
  );
};

const BeatHeroInner = ({ progress }: { progress: MotionValue<number> }) => {
  const nameOpacity = useTransform(progress, (p) => lerp(p, 0.10, 0.17, 1, 0));
  const nameScale = useTransform(progress, (p) => lerp(p, 0.10, 0.17, 1, 0.95));
  const nameY = useTransform(progress, (p) => lerp(p, 0.10, 0.17, 0, -60));

  const scrollHintOpacity = useTransform(progress, (p) => lerp(p, 0, 0.03, 1, 0));

  const statementOpacity = useTransform(progress, (p) => lerp(p, 0.28, 0.34, 0, 1));

  const statsOpacity = useTransform(progress, (p) => lerp(p, 0.68, 0.76, 0, 1));
  const statsY = useTransform(progress, (p) => lerp(p, 0.68, 0.76, 30, 0));

  const ctaOpacity = useTransform(progress, (p) => lerp(p, 0.78, 0.86, 0, 1));
  const ctaY = useTransform(progress, (p) => lerp(p, 0.78, 0.86, 16, 0));

  let wordIndex = 0;
  const allWords = STATEMENT_LINES.flatMap((line) =>
    line.words.map((w) => ({
      word: w,
      accent: line.accent,
      globalIndex: wordIndex++,
    }))
  );

  return (
    <div className="hero-beat">
      <div className="hero-beat__light" />

      <motion.div
        className="hero-beat__name-block"
        style={{ opacity: nameOpacity, scale: nameScale, y: nameY }}
      >
        <h1 className="hero-beat__name">
          <span className="hero-beat__name-line">Muhammad</span>
          <span className="hero-beat__name-line">Hanan Baloch</span>
        </h1>
        <span className="hero-beat__role">AI Systems Engineer</span>
      </motion.div>

      <motion.div className="hero-beat__statement" style={{ opacity: statementOpacity }}>
        <p className="hero-beat__statement-text">
          {allWords.map((w) => (
            <WordReveal
              key={w.globalIndex}
              progress={progress}
              word={w.word}
              startAt={0.32 + w.globalIndex * 0.04}
              isAccent={w.accent}
            />
          ))}
        </p>
      </motion.div>

      <motion.div className="hero-beat__lower" style={{ opacity: statsOpacity, y: statsY }}>
        <div className="hero-beat__stats">
          {STATS.map((s, i) => (
            <div key={i} className="hero-beat__stat">
              <span className="hero-beat__stat-n">{s.n}</span>
              <span className="hero-beat__stat-l">{s.l}</span>
            </div>
          ))}
        </div>

        <motion.div className="hero-beat__cta" style={{ opacity: ctaOpacity, y: ctaY }}>
          <a
            href="https://drive.google.com/file/d/1FxqXKWAzpl2jAau1EkrCi8JpYJWmjcYz/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-beat__resume"
            id="resume-download-btn"
          >
            Resume
          </a>
          <a href="#contact" className="hero-beat__consult" id="consultation-btn">
            Book a call
          </a>
        </motion.div>
      </motion.div>

      <motion.div className="hero-beat__scroll-hint" style={{ opacity: scrollHintOpacity }}>
        <span className="hero-beat__scroll-line" />
      </motion.div>
    </div>
  );
};

const BeatHero = () => (
  <ScrollBeat scrollHeight={450} id="hero">
    {(progress) => <BeatHeroInner progress={progress} />}
  </ScrollBeat>
);

export default BeatHero;
