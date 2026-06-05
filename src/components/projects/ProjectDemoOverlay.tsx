import { lazy, Suspense, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ProjectDemoType } from "./projectData";

const AviationClaimsDemo = lazy(() => import("@/components/AviationClaimsDemo"));
const FreightVoiceDemo = lazy(() => import("@/components/FreightVoiceDemo"));
const MarketingOpsDemo = lazy(() => import("@/components/MarketingOpsDemo"));
const PropAutoCRMDemo = lazy(() => import("@/components/PropAutoCRMDemo"));
const LeadEnrichmentDemo = lazy(() => import("@/components/LeadEnrichmentDemo"));
const NeuroScanDemo = lazy(() => import("@/components/NeuroScanDemo"));

interface ProjectDemoOverlayProps {
  demo: ProjectDemoType | null;
  onClose: () => void;
}

const DEMOS: Record<ProjectDemoType, React.LazyExoticComponent<any>> = {
  aviation: AviationClaimsDemo,
  freight: FreightVoiceDemo,
  marketing: MarketingOpsDemo,
  propauto: PropAutoCRMDemo,
  lead: LeadEnrichmentDemo,
  neuroscan: NeuroScanDemo,
};

const ProjectDemoOverlay = ({ demo, onClose }: ProjectDemoOverlayProps) => {
  useEffect(() => {
    if (!demo) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [demo, onClose]);

  const DemoComponent = demo ? DEMOS[demo] : null;

  return (
    <AnimatePresence>
      {demo && DemoComponent && (
        <motion.div
          className="demo-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          <motion.div
            className="demo-overlay__content"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="demo-overlay__close" onClick={onClose} aria-label="Close demo">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
            <Suspense
              fallback={
                <div className="demo-overlay__loading">Loading demo...</div>
              }
            >
              <DemoComponent isVisible={true} />
            </Suspense>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectDemoOverlay;
