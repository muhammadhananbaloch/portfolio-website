import { motion, useTransform, MotionValue } from "framer-motion";
import ScrollBeat from "@/components/scroll/ScrollBeat";

const LINES = [
  "Most agents fail not on the model.",
  "They fail on the handoffs.",
  "I spend 80% of my time on the glue.",
];

function lerp(p: number, a: number, b: number, oA: number, oB: number) {
  if (p <= a) return oA;
  if (p >= b) return oB;
  return oA + (oB - oA) * ((p - a) / (b - a));
}

const BeatManifestoInner = ({ progress }: { progress: MotionValue<number> }) => {
  const bgOpacity = useTransform(progress, (p) => lerp(p, 0, 0.15, 0, 1));

  const line1Opacity = useTransform(progress, (p) => lerp(p, 0.08, 0.2, 0, 1));
  const line1Y = useTransform(progress, (p) => lerp(p, 0.08, 0.2, 32, 0));

  const line2Opacity = useTransform(progress, (p) => lerp(p, 0.25, 0.38, 0, 1));
  const line2Y = useTransform(progress, (p) => lerp(p, 0.25, 0.38, 32, 0));

  const line3Opacity = useTransform(progress, (p) => lerp(p, 0.42, 0.55, 0, 1));
  const line3Y = useTransform(progress, (p) => lerp(p, 0.42, 0.55, 32, 0));

  const attribOpacity = useTransform(progress, (p) => lerp(p, 0.6, 0.7, 0, 1));

  const blockOpacity = useTransform(progress, (p) => lerp(p, 0.8, 0.95, 1, 0));

  const lineData = [
    { opacity: line1Opacity, y: line1Y },
    { opacity: line2Opacity, y: line2Y },
    { opacity: line3Opacity, y: line3Y },
  ];

  return (
    <div className="manifesto-beat">
      <motion.div
        className="manifesto-beat__bg"
        style={{
          opacity: bgOpacity,
          background: "linear-gradient(135deg, #b5430e 0%, #c4631a 40%, #a85a12 100%)",
        }}
      />

      <motion.div className="manifesto-beat__content" style={{ opacity: blockOpacity }}>
        <blockquote className="manifesto-beat__quote">
          {LINES.map((line, i) => (
            <motion.span
              key={i}
              className="manifesto-beat__line"
              style={{ opacity: lineData[i].opacity, y: lineData[i].y }}
            >
              {line}
            </motion.span>
          ))}
        </blockquote>
        <motion.div className="manifesto-beat__attrib" style={{ opacity: attribOpacity }}>
          Muhammad Hanan Baloch
        </motion.div>
      </motion.div>
    </div>
  );
};

const BeatManifesto = () => (
  <ScrollBeat scrollHeight={300}>
    {(progress) => <BeatManifestoInner progress={progress} />}
  </ScrollBeat>
);

export default BeatManifesto;
