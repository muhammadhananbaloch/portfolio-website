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
  const [tier, setTier] = useState(-1);
  const [packetsOn, setPacketsOn] = useState(false);

  useMotionValueEvent(progress, "change", (p) => {
    const nextTier = p < 0.08 ? 0 : p < 0.25 ? 1 : p < 0.38 ? 2 : p < 0.5 ? 3 : 4;
    setTier((prev) => (prev !== nextTier ? nextTier : prev));
    const nextPackets = p >= 0.55;
    setPacketsOn((prev) => (prev !== nextPackets ? nextPackets : prev));
  });

  const nameOpacity = useTransform(progress, [0.1, 0.18], [0, 1]);
  const nameY = useTransform(progress, [0.1, 0.18], [12, 0]);
  const roleOpacity = useTransform(progress, [0.15, 0.22], [0, 1]);

  const headlineOpacity = useTransform(progress, [0.28, 0.38, 0.65, 0.75], [0, 1, 1, 0]);
  const headlineY = useTransform(progress, [0.28, 0.38], [30, 0]);

  const statsOpacity = useTransform(progress, [0.7, 0.8], [0, 1]);
  const statsY = useTransform(progress, [0.7, 0.8], [20, 0]);

  const stat0 = useTransform(progress, [0.72, 0.78], [0, 1]);
  const stat1 = useTransform(progress, [0.75, 0.81], [0, 1]);
  const stat2 = useTransform(progress, [0.78, 0.84], [0, 1]);
  const statOpacities = [stat0, stat1, stat2];

  const ctaOpacity = useTransform(progress, [0.82, 0.9], [0, 1]);

  return (
    <div className="beat-genesis">
      <motion.div className="beat-genesis__id" style={{ opacity: nameOpacity, y: nameY }}>
        <span className="beat-genesis__name">Muhammad Hanan Baloch</span>
        <motion.span className="beat-genesis__role" style={{ opacity: roleOpacity }}>
          AI Engineer
        </motion.span>
      </motion.div>

      <motion.h1
        className="beat-genesis__headline"
        style={{ opacity: headlineOpacity, y: headlineY }}
      >
        I architect systems that think, route, and ship.
      </motion.h1>

      <div className="beat-genesis__graph-wrap">
        <SystemGraph visibleTier={tier} packetsActive={packetsOn} />
      </div>

      <motion.div
        className="beat-genesis__stats"
        style={{ opacity: statsOpacity, y: statsY }}
      >
        {STATS.map((s, i) => (
          <motion.div key={i} className="beat-genesis__stat" style={{ opacity: statOpacities[i] }}>
            <span className="beat-genesis__stat-n">{s.n}</span>
            <span className="beat-genesis__stat-l">{s.l}</span>
          </motion.div>
        ))}
      </motion.div>

      <motion.div className="beat-genesis__cta" style={{ opacity: ctaOpacity }}>
        <a
          href="https://drive.google.com/file/d/1FxqXKWAzpl2jAau1EkrCi8JpYJWmjcYz/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="beat-genesis__resume"
          id="resume-download-btn"
        >
          Resume ↗
        </a>
        <a href="#contact" className="beat-genesis__consult" id="consultation-btn">
          Book a call
        </a>
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
