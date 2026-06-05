import { motion } from "framer-motion";
import type { Project } from "./projectData";

interface ProjectRevealProps {
  project: Project;
  visible: boolean;
  onDemoClick: () => void;
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const stagger = (i: number) => ({
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: EASE, delay: i * 0.06 },
  },
  exit: {
    opacity: 0,
    y: -15,
    transition: { duration: 0.25, ease: [0.55, 0, 1, 0.45] },
  },
});

const ProjectReveal = ({ project, visible, onDemoClick }: ProjectRevealProps) => {
  if (!visible) return null;

  return (
    <motion.div
      className="pr"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.span className="pr__num" {...stagger(0)}>
        {project.num}
      </motion.span>

      <motion.h2 className="pr__title" {...stagger(1)}>
        {project.title}
        <span className="pr__subtitle">{project.subtitle}</span>
      </motion.h2>

      <motion.p className="pr__desc" {...stagger(2)}>
        {project.desc}
      </motion.p>

      <motion.div className="pr__stack" {...stagger(3)}>
        {project.stack.map((s) => (
          <span key={s} className="pr__pill">
            {s}
          </span>
        ))}
      </motion.div>

      <motion.div className="pr__metrics" {...stagger(4)}>
        {project.metrics.map((m, i) => (
          <div key={i} className="pr__metric">
            <span className="pr__metric-n">{m.n}</span>
            <span className="pr__metric-l">{m.l}</span>
          </div>
        ))}
      </motion.div>

      <motion.div className="pr__actions" {...stagger(5)}>
        {project.link ? (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="pr__demo-btn"
          >
            {project.linkLabel || "Live demo ↗"}
          </a>
        ) : (
          <button className="pr__demo-btn" onClick={onDemoClick}>
            {project.demoLabel} →
          </button>
        )}
        <span className="pr__tag">{project.tag}</span>
      </motion.div>
    </motion.div>
  );
};

export default ProjectReveal;
