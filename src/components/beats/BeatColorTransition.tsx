import { motion, useTransform, MotionValue } from "framer-motion";
import ScrollBeat from "@/components/scroll/ScrollBeat";

function lerp(p: number, a: number, b: number, oA: number, oB: number) {
  if (p <= a) return oA;
  if (p >= b) return oB;
  return oA + (oB - oA) * ((p - a) / (b - a));
}

const BeatColorTransitionInner = ({ progress }: { progress: MotionValue<number> }) => {
  const band1X = useTransform(progress, (p) => lerp(p, 0, 0.5, -120, 10));
  const band1Opacity = useTransform(progress, (p) => {
    if (p <= 0) return 0;
    if (p <= 0.12) return lerp(p, 0, 0.12, 0, 0.9);
    if (p <= 0.55) return 0.9;
    if (p <= 0.8) return lerp(p, 0.55, 0.8, 0.9, 0);
    return 0;
  });

  const band2X = useTransform(progress, (p) => lerp(p, 0.08, 0.6, -120, 10));
  const band2Opacity = useTransform(progress, (p) => {
    if (p <= 0.08) return 0;
    if (p <= 0.22) return lerp(p, 0.08, 0.22, 0, 0.85);
    if (p <= 0.6) return 0.85;
    if (p <= 0.85) return lerp(p, 0.6, 0.85, 0.85, 0);
    return 0;
  });

  const band3X = useTransform(progress, (p) => lerp(p, 0.18, 0.7, -120, 10));
  const band3Opacity = useTransform(progress, (p) => {
    if (p <= 0.18) return 0;
    if (p <= 0.32) return lerp(p, 0.18, 0.32, 0, 0.8);
    if (p <= 0.65) return 0.8;
    if (p <= 0.9) return lerp(p, 0.65, 0.9, 0.8, 0);
    return 0;
  });

  const bgColor = useTransform(
    progress,
    [0, 0.3, 0.7, 1],
    ["#0c0c0c", "#1a0f08", "#0f1018", "#0c0c0c"]
  );

  return (
    <motion.div className="color-transition" style={{ backgroundColor: bgColor }}>
      <motion.div
        style={{
          position: "absolute",
          top: "-20%",
          height: "140%",
          width: "120%",
          background: "#c44a1a",
          opacity: band1Opacity,
          x: band1X,
          skewX: -8,
          transformOrigin: "center center",
        }}
      />
      <motion.div
        style={{
          position: "absolute",
          top: "-20%",
          height: "140%",
          width: "110%",
          background: "#d4750c",
          opacity: band2Opacity,
          x: band2X,
          skewX: -12,
          transformOrigin: "center center",
        }}
      />
      <motion.div
        style={{
          position: "absolute",
          top: "-20%",
          height: "140%",
          width: "100%",
          background: "#2a1f10",
          opacity: band3Opacity,
          x: band3X,
          skewX: -16,
          transformOrigin: "center center",
        }}
      />
    </motion.div>
  );
};

const BeatColorTransition = () => (
  <ScrollBeat scrollHeight={150}>
    {(progress) => <BeatColorTransitionInner progress={progress} />}
  </ScrollBeat>
);

export default BeatColorTransition;
