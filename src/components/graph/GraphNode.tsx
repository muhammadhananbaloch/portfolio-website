import { motion } from "framer-motion";

interface GraphNodeProps {
  id: string;
  label: string;
  x: number;
  y: number;
  visible: boolean;
  highlighted?: boolean;
  dimmed?: boolean;
  pulsing?: boolean;
  nodeRef?: (el: HTMLDivElement | null) => void;
}

const EASE_ENTER: [number, number, number, number] = [0.22, 1, 0.36, 1];

const GraphNode = ({
  id,
  label,
  x,
  y,
  visible,
  highlighted = false,
  dimmed = false,
  pulsing = false,
  nodeRef,
}: GraphNodeProps) => {
  return (
    <motion.div
      ref={nodeRef}
      className={`sg-node${highlighted ? " sg-node--highlighted" : ""}${dimmed ? " sg-node--dimmed" : ""}${pulsing ? " sg-node--pulsing" : ""}`}
      data-node={id}
      style={{ left: `${x}%`, top: `${y}%` }}
      initial={{ opacity: 0, scale: 0.7, x: "-50%", y: "-50%" }}
      animate={{
        opacity: visible ? (dimmed ? 0.4 : 1) : 0,
        scale: visible ? (highlighted ? 1.15 : 1) : 0.7,
        x: "-50%",
        y: "-50%",
      }}
      transition={{ duration: 0.35, ease: EASE_ENTER }}
    >
      <span className="sg-node__dot" />
      <span className="sg-node__label">{label}</span>
    </motion.div>
  );
};

export default GraphNode;
