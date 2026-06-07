import { useState, useCallback } from "react";
import { motion, AnimatePresence, useMotionValueEvent, MotionValue } from "framer-motion";
import ScrollBeat from "@/components/scroll/ScrollBeat";
import SystemGraph from "@/components/graph/SystemGraph";
import ProjectReveal from "@/components/projects/ProjectReveal";
import ProjectDemoOverlay from "@/components/projects/ProjectDemoOverlay";
import { projects } from "@/components/projects/projectData";
import { PROJECT_NODE_HIGHLIGHTS } from "@/components/graph/graphData";
import type { ProjectDemoType } from "@/components/projects/projectData";

const PROJECT_COUNT = projects.length;
const SUB_BEAT = 1 / PROJECT_COUNT;

const BeatProjectsInner = ({ progress }: { progress: MotionValue<number> }) => {
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

    if (subProgress < 0.08 || subProgress > 0.95) {
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
  const highlightedNodes = activeProject
    ? PROJECT_NODE_HIGHLIGHTS[activeProject.id] || []
    : [];

  return (
    <div className="beat-projects">
      <div className="beat-projects__graph-bg">
        <SystemGraph
          visibleTier={4}
          highlightedNodes={highlightedNodes}
          packetsActive={activeIndex >= 0}
        />
      </div>

      <div className="beat-projects__grain" />

      <AnimatePresence mode="wait">
        {activeProject && (
          <motion.div
            key={`wm-${activeProject.id}`}
            className="beat-projects__watermark"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {activeProject.num}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="beat-projects__content">
        <AnimatePresence mode="wait">
          {activeProject && (
            <ProjectReveal
              key={activeProject.id}
              project={activeProject}
              visible={true}
              index={activeIndex}
              onDemoClick={() => handleDemoClick(activeProject.demo)}
            />
          )}
        </AnimatePresence>
      </div>

      <ProjectDemoOverlay demo={openDemo} onClose={handleCloseDemo} />
    </div>
  );
};

const BeatProjects = () => (
  <ScrollBeat scrollHeight={1800} id="work">
    {(progress) => <BeatProjectsInner progress={progress} />}
  </ScrollBeat>
);

export default BeatProjects;
