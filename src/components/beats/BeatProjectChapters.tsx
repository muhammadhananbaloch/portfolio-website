import { useState, useCallback } from "react";
import { motion, AnimatePresence, useMotionValueEvent, MotionValue } from "framer-motion";
import ScrollBeat from "@/components/scroll/ScrollBeat";
import ProjectDemoOverlay from "@/components/projects/ProjectDemoOverlay";
import { projects } from "@/components/projects/projectData";
import type { ProjectDemoType } from "@/components/projects/projectData";

const PROJECT_ENVS: Record<string, { bg: string; light: string; lightPos: string }> = {
  "aviation-rag": {
    bg: "#0a1628",
    light: "rgba(212, 147, 42, .10)",
    lightPos: "75% 65%",
  },
  "freight-voice": {
    bg: "#1a1510",
    light: "rgba(196, 140, 60, .10)",
    lightPos: "25% 70%",
  },
  "marketing-ops": {
    bg: "#141820",
    light: "rgba(140, 160, 212, .08)",
    lightPos: "80% 40%",
  },
  "propauto": {
    bg: "#0a1a1a",
    light: "rgba(60, 180, 160, .08)",
    lightPos: "30% 75%",
  },
  "lead-enrichment": {
    bg: "#1a0f14",
    light: "rgba(200, 120, 140, .08)",
    lightPos: "70% 50%",
  },
  "neuroscan": {
    bg: "#0f1a0f",
    light: "rgba(80, 180, 80, .08)",
    lightPos: "50% 60%",
  },
};

const PROJECT_COUNT = projects.length;
const SUB_BEAT = 1 / PROJECT_COUNT;

const BeatProjectChaptersInner = ({ progress }: { progress: MotionValue<number> }) => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [openDemo, setOpenDemo] = useState<ProjectDemoType | null>(null);

  useMotionValueEvent(progress, "change", (p) => {
    if (p <= 0.01) {
      setActiveIndex(-1);
      return;
    }
    const raw = Math.floor(p / SUB_BEAT);
    const idx = Math.min(raw, PROJECT_COUNT - 1);
    const subProgress = (p - idx * SUB_BEAT) / SUB_BEAT;

    if (subProgress < 0.06 || subProgress > 0.96) {
      setActiveIndex(-1);
    } else {
      setActiveIndex(idx);
    }
  });

  const handleDemoClick = useCallback((demo: ProjectDemoType) => {
    setOpenDemo(demo);
  }, []);

  const handleCloseDemo = useCallback(() => {
    setOpenDemo(null);
  }, []);

  const activeProject = activeIndex >= 0 ? projects[activeIndex] : null;
  const env = activeProject
    ? PROJECT_ENVS[activeProject.id] || PROJECT_ENVS["aviation-rag"]
    : null;

  return (
    <div
      className="project-chapters"
      style={{ backgroundColor: env?.bg || "#0c0c0c" }}
    >
      {env && (
        <div
          className="project-chapters__env"
          style={{
            background: `radial-gradient(ellipse 80% 60% at ${env.lightPos}, ${env.light} 0%, transparent 60%)`,
          }}
        />
      )}

      <AnimatePresence mode="wait">
        {activeProject && (
          <motion.div
            key={`wm-${activeProject.id}`}
            className="project-chapters__watermark"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            {activeProject.num}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="project-chapters__content">
        <AnimatePresence mode="wait">
          {activeProject && (
            <motion.div
              key={activeProject.id}
              className="pc-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="pc-card__num">{activeProject.num}</span>
              <h2 className="pc-card__title">{activeProject.title}</h2>
              <span className="pc-card__subtitle">{activeProject.subtitle}</span>
              <p className="pc-card__desc">{activeProject.desc}</p>

              <div className="pc-card__metrics">
                {activeProject.metrics.map((m, i) => (
                  <div key={i} className="pc-card__metric">
                    <span className="pc-card__metric-n">{m.n}</span>
                    <span className="pc-card__metric-l">{m.l}</span>
                  </div>
                ))}
              </div>

              <div className="pc-card__actions">
                <button
                  className="pc-card__demo-btn"
                  onClick={() => handleDemoClick(activeProject.demo)}
                >
                  {activeProject.demoLabel}
                </button>
                {activeProject.link && (
                  <a
                    href={activeProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pc-card__link"
                  >
                    {activeProject.linkLabel}
                  </a>
                )}
              </div>

              <span className="pc-card__tag">{activeProject.tag}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <ProjectDemoOverlay demo={openDemo} onClose={handleCloseDemo} />
    </div>
  );
};

const BeatProjectChapters = () => (
  <ScrollBeat scrollHeight={1600} id="work">
    {(progress) => <BeatProjectChaptersInner progress={progress} />}
  </ScrollBeat>
);

export default BeatProjectChapters;
