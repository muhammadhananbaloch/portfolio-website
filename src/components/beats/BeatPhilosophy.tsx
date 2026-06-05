import { motion, useTransform, MotionValue } from "framer-motion";
import ScrollBeat from "@/components/scroll/ScrollBeat";

const LINES = [
  { before: "Most agents fail not on the ", keyword: "model", after: "." },
  { before: "They fail on the ", keyword: "handoffs", after: "." },
  { before: "I spend 80% of my time on the ", keyword: "glue", after: "." },
];

const BeatPhilosophyInner = ({ progress }: { progress: MotionValue<number> }) => {
  const line1Opacity = useTransform(progress, [0.05, 0.18], [0, 1]);
  const line1Y = useTransform(progress, [0.05, 0.18], [24, 0]);
  const kw1Color = useTransform(progress, [0.12, 0.22], ["#666666", "#ffffff"]);

  const line2Opacity = useTransform(progress, [0.22, 0.35], [0, 1]);
  const line2Y = useTransform(progress, [0.22, 0.35], [24, 0]);
  const kw2Color = useTransform(progress, [0.29, 0.39], ["#666666", "#ffffff"]);

  const line3Opacity = useTransform(progress, [0.39, 0.52], [0, 1]);
  const line3Y = useTransform(progress, [0.39, 0.52], [24, 0]);
  const kw3Color = useTransform(progress, [0.46, 0.56], ["#666666", "#ffffff"]);

  const attribOpacity = useTransform(progress, [0.56, 0.65], [0, 1]);
  const blockOpacity = useTransform(progress, [0.75, 0.92], [1, 0]);
  const blockScale = useTransform(progress, [0.75, 0.92], [1, 0.97]);
  const bgColor = useTransform(progress, [0.0, 0.5, 1.0], [
    "rgb(17, 17, 17)",
    "rgb(19, 19, 19)",
    "rgb(17, 17, 17)",
  ]);

  const lineData = [
    { opacity: line1Opacity, y: line1Y, kwColor: kw1Color },
    { opacity: line2Opacity, y: line2Y, kwColor: kw2Color },
    { opacity: line3Opacity, y: line3Y, kwColor: kw3Color },
  ];

  return (
    <motion.div className="beat-philosophy" style={{ backgroundColor: bgColor }}>
      <motion.div
        className="beat-philosophy__content"
        style={{ opacity: blockOpacity, scale: blockScale }}
      >
        <blockquote className="beat-philosophy__quote">
          {LINES.map((line, i) => (
            <motion.span
              key={i}
              className="beat-philosophy__line"
              style={{ opacity: lineData[i].opacity, y: lineData[i].y }}
            >
              {line.before}
              <motion.em style={{ color: lineData[i].kwColor }}>
                {line.keyword}
              </motion.em>
              {line.after}
            </motion.span>
          ))}
        </blockquote>
        <motion.div className="beat-philosophy__attrib" style={{ opacity: attribOpacity }}>
          — Muhammad Hanan Baloch
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const BeatPhilosophy = () => (
  <ScrollBeat scrollHeight={300}>
    {(progress) => <BeatPhilosophyInner progress={progress} />}
  </ScrollBeat>
);

export default BeatPhilosophy;
