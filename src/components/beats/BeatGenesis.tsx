import { useState } from "react";
import { motion, useTransform, useMotionValueEvent, MotionValue } from "framer-motion";
import ScrollBeat from "@/components/scroll/ScrollBeat";
import SystemGraph from "@/components/graph/SystemGraph";

const STATS = [
  { n: "7", l: "systems shipped" },
  { n: "300k+", l: "leads automated" },
  { n: "98%", l: "time reduction" },
];

const BeatGenesisInner = ({ progress }: { progress: MotionValue<number> }) => {
  const [tier, setTier] = useState(0);
  const [packetsOn, setPacketsOn] = useState(false);

  useMotionValueEvent(progress, "change", (p) => {
    const nextTier = p < 0.06 ? 0 : p < 0.18 ? 1 : p < 0.3 ? 2 : p < 0.42 ? 3 : 4;
    setTier((prev) => (prev !== nextTier ? nextTier : prev));
    const nextPackets = p >= 0.48;
    setPacketsOn((prev) => (prev !== nextPackets ? nextPackets : prev));
  });

  const graphScale = useTransform(progress, [0, 0.5, 0.85, 1], [1.0, 1.1, 1.1, 0.85]);
  const graphOpacity = useTransform(progress, [0, 0.08, 0.85, 1], [0.65, 0.8, 0.8, 0.35]);

  const scrollHintOpacity = useTransform(progress, [0, 0.04], [1, 0]);

  const nameOpacity = useTransform(progress, [0.0, 0.08], [0, 1]);
  const nameY = useTransform(progress, [0.0, 0.08], [20, 0]);

  const line1Opacity = useTransform(progress, [0.15, 0.25], [0, 1]);
  const line1X = useTransform(progress, [0.15, 0.25], [-80, 0]);
  const line2Opacity = useTransform(progress, [0.22, 0.32], [0, 1]);
  const line2X = useTransform(progress, [0.22, 0.32], [-80, 0]);
  const line3Opacity = useTransform(progress, [0.28, 0.38], [0, 1]);
  const line3X = useTransform(progress, [0.28, 0.38], [-80, 0]);

  const headlineY = useTransform(progress, [0.5, 0.62], [0, -60]);
  const headlineOpacity = useTransform(progress, [0.5, 0.62], [1, 0]);

  const statsOpacity = useTransform(progress, [0.62, 0.72], [0, 1]);
  const statsY = useTransform(progress, [0.62, 0.72], [40, 0]);

  const stat0 = useTransform(progress, [0.64, 0.7], [0, 1]);
  const stat1 = useTransform(progress, [0.68, 0.74], [0, 1]);
  const stat2 = useTransform(progress, [0.72, 0.78], [0, 1]);
  const statOpacities = [stat0, stat1, stat2];

  const ctaOpacity = useTransform(progress, [0.78, 0.86], [0, 1]);
  const ctaY = useTransform(progress, [0.78, 0.86], [20, 0]);

  return (
    <div className="beat-genesis">
      <motion.div
        className="beat-genesis__graph-field"
        style={{ scale: graphScale, opacity: graphOpacity }}
      >
        <SystemGraph visibleTier={tier} packetsActive={packetsOn} genesisNode={tier <= 1 ? "user" : undefined} />
      </motion.div>

      <div className="beat-genesis__ambient" />
      <div className="beat-genesis__grain" />

      <motion.div className="beat-genesis__id" style={{ opacity: nameOpacity, y: nameY }}>
        <span className="beat-genesis__name">Muhammad Hanan Baloch</span>
        <span className="beat-genesis__role">AI Engineer</span>
      </motion.div>

      <motion.div
        className="beat-genesis__headline-block"
        style={{ opacity: headlineOpacity, y: headlineY }}
      >
        <h1 className="beat-genesis__headline">
          <motion.span
            className="beat-genesis__line"
            style={{ opacity: line1Opacity, x: line1X }}
          >
            I architect systems
          </motion.span>
          <motion.span
            className="beat-genesis__line"
            style={{ opacity: line2Opacity, x: line2X }}
          >
            that think, route,
          </motion.span>
          <motion.span
            className="beat-genesis__line beat-genesis__line--accent"
            style={{ opacity: line3Opacity, x: line3X }}
          >
            and ship.
          </motion.span>
        </h1>
      </motion.div>

      <motion.div
        className="beat-genesis__lower"
        style={{ opacity: statsOpacity, y: statsY }}
      >
        <div className="beat-genesis__stats">
          {STATS.map((s, i) => (
            <motion.div key={i} className="beat-genesis__stat" style={{ opacity: statOpacities[i] }}>
              <span className="beat-genesis__stat-n">{s.n}</span>
              <span className="beat-genesis__stat-l">{s.l}</span>
            </motion.div>
          ))}
        </div>

        <motion.div className="beat-genesis__cta" style={{ opacity: ctaOpacity, y: ctaY }}>
          <a
            href="https://drive.google.com/file/d/1FxqXKWAzpl2jAau1EkrCi8JpYJWmjcYz/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="beat-genesis__resume"
            id="resume-download-btn"
          >
            Resume
          </a>
          <a href="#contact" className="beat-genesis__consult" id="consultation-btn">
            Book a call
          </a>
        </motion.div>
      </motion.div>

      <motion.div className="beat-genesis__scroll-hint" style={{ opacity: scrollHintOpacity }}>
        <span className="beat-genesis__scroll-line" />
      </motion.div>
    </div>
  );
};

const BeatGenesis = () => (
  <ScrollBeat scrollHeight={400} id="hero">
    {(progress) => <BeatGenesisInner progress={progress} />}
  </ScrollBeat>
);

export default BeatGenesis;
