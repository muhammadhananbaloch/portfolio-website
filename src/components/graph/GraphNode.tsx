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
  genesis?: boolean;
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
  genesis = false,
  nodeRef,
}: GraphNodeProps) => {
  const cls = [
    "sg-node",
    highlighted && "sg-node--highlighted",
    dimmed && "sg-node--dimmed",
    genesis && "sg-node--genesis",
  ].filter(Boolean).join(" ");

  return (
    <motion.div
      ref={nodeRef}
      className={cls}
      data-node={id}
      style={{ left: `${x}%`, top: `${y}%` }}
      initial={{ opacity: 0, scale: 0.3, x: "-50%", y: "-50%" }}
      animate={{
        opacity: visible ? (dimmed ? 0.3 : 1) : 0,
        scale: visible ? (highlighted ? 1.2 : 1) : 0.3,
        x: "-50%",
        y: "-50%",
      }}
      transition={{ duration: 0.5, ease: EASE_ENTER }}
    >
      <span className="sg-node__glow" />
      <span className="sg-node__ring sg-node__ring--outer" />
      <span className="sg-node__ring sg-node__ring--inner" />
      <span className="sg-node__core" />
      <span className="sg-node__label">{label}</span>
    </motion.div>
  );
};

export default GraphNode;
