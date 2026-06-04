import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const LINES = [
  { before: "Most agents fail not on the ", keyword: "model", after: "." },
  { before: "They fail on the ", keyword: "handoffs", after: "." },
  { before: "I spend 80% of my time on the ", keyword: "glue", after: "." },
];

const QuoteScene = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Scroll budget: 0–0.6 for line reveals, 0.6–0.75 for hold, 0.75–1.0 for fade out
  const line1Opacity = useTransform(scrollYProgress, [0.05, 0.18], [0, 1]);
  const line1Y = useTransform(scrollYProgress, [0.05, 0.18], [24, 0]);
  const kw1Color = useTransform(scrollYProgress, [0.12, 0.22], ["#666666", "#ffffff"]);

  const line2Opacity = useTransform(scrollYProgress, [0.22, 0.35], [0, 1]);
  const line2Y = useTransform(scrollYProgress, [0.22, 0.35], [24, 0]);
  const kw2Color = useTransform(scrollYProgress, [0.29, 0.39], ["#666666", "#ffffff"]);

  const line3Opacity = useTransform(scrollYProgress, [0.39, 0.52], [0, 1]);
  const line3Y = useTransform(scrollYProgress, [0.39, 0.52], [24, 0]);
  const kw3Color = useTransform(scrollYProgress, [0.46, 0.56], ["#666666", "#ffffff"]);

  const attribOpacity = useTransform(scrollYProgress, [0.56, 0.65], [0, 1]);

  // Fade out entire quote block
  const blockOpacity = useTransform(scrollYProgress, [0.75, 0.92], [1, 0]);
  const blockScale = useTransform(scrollYProgress, [0.75, 0.92], [1, 0.97]);

  // Subtle background shift
  const bgLightness = useTransform(scrollYProgress, [0.0, 0.5, 1.0], [
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
    <div className="quote-scroll-container" ref={containerRef}>
      <motion.div className="quote-sticky" style={{ backgroundColor: bgLightness }}>
        <motion.div
          className="quote-content"
          style={{ opacity: blockOpacity, scale: blockScale }}
        >
          <blockquote className="quote-blockquote">
            <span className="quote-mark">"</span>
            {LINES.map((line, i) => (
              <motion.span
                key={i}
                className="quote-scroll-line"
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
          <motion.div className="quote-attrib" style={{ opacity: attribOpacity }}>
            — Muhammad Hanan Baloch
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default QuoteScene;
