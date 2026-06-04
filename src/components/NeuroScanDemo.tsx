import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

type TumorClass = {
  id: string;
  label: string;
  color: string;
  bgColor: string;
  confidence: number;
  result: string;
};

const tumorClasses: TumorClass[] = [
  {
    id: "meningioma",
    label: "MNG",
    color: "#3b82f6",
    bgColor: "rgba(59, 130, 246, 0.15)",
    confidence: 94.2,
    result: "Meningioma",
  },
  {
    id: "glioma",
    label: "GLM",
    color: "#f59e0b",
    bgColor: "rgba(245, 158, 11, 0.15)",
    confidence: 87.6,
    result: "Glioma",
  },
  {
    id: "pituitary",
    label: "PIT",
    color: "#22c55e",
    bgColor: "rgba(34, 197, 94, 0.15)",
    confidence: 91.1,
    result: "Pituitary",
  },
  {
    id: "no-tumor",
    label: "NRM",
    color: "#38bdf8",
    bgColor: "rgba(56, 189, 248, 0.15)",
    confidence: 96.8,
    result: "No Tumor",
  },
];

const allConfidences: Record<string, number[]> = {
  meningioma: [94.2, 3.1, 1.8, 0.9],
  glioma: [4.2, 87.6, 5.8, 2.4],
  pituitary: [2.1, 4.3, 91.1, 2.5],
  "no-tumor": [0.8, 1.2, 1.2, 96.8],
};

const ease = [0.22, 1, 0.36, 1] as const;

const NeuroScanDemo = ({ isVisible }: { isVisible: boolean }) => {
  const [selected, setSelected] = useState(0);
  const [scanning, setScanning] = useState(false);
  const [showResult, setShowResult] = useState(true);
  const [hasInitialized, setHasInitialized] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scanTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const runScan = useCallback(
    (idx: number) => {
      if (scanning) return;
      setSelected(idx);
      setShowResult(false);
      setScanning(true);

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (scanTimeoutRef.current) clearTimeout(scanTimeoutRef.current);

      scanTimeoutRef.current = setTimeout(() => {
        setScanning(false);
        setShowResult(true);
      }, 1200);
    },
    [scanning]
  );

  useEffect(() => {
    if (isVisible && !hasInitialized) {
      setHasInitialized(true);
      timeoutRef.current = setTimeout(() => runScan(0), 800);
    }
  }, [isVisible, hasInitialized, runScan]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (scanTimeoutRef.current) clearTimeout(scanTimeoutRef.current);
    };
  }, []);

  const current = tumorClasses[selected];
  const confidences = allConfidences[current.id];

  return (
    <div className="demo-neuro">
      <div className="demo-neuro__grid">
        {tumorClasses.map((tc, i) => (
          <button
            key={tc.id}
            className={`demo-neuro__thumb ${selected === i ? "selected" : ""}`}
            onClick={() => runScan(i)}
            disabled={scanning}
            style={{
              "--thumb-color": tc.color,
              "--thumb-bg": tc.bgColor,
            } as React.CSSProperties}
          >
            <div className="demo-neuro__thumb-img">
              <div className="demo-neuro__thumb-pattern" style={{ background: tc.bgColor }}>
                <svg width="100%" height="100%" viewBox="0 0 60 60" opacity="0.6">
                  <circle cx="30" cy="30" r="18" fill="none" stroke={tc.color} strokeWidth="1" opacity="0.4" />
                  <circle cx="30" cy="30" r="10" fill="none" stroke={tc.color} strokeWidth="0.8" opacity="0.3" />
                  <circle cx="30" cy="25" r="6" fill={tc.color} opacity="0.2" />
                  <line x1="12" y1="30" x2="48" y2="30" stroke={tc.color} strokeWidth="0.5" opacity="0.2" />
                  <line x1="30" y1="12" x2="30" y2="48" stroke={tc.color} strokeWidth="0.5" opacity="0.2" />
                </svg>
              </div>
              {selected === i && scanning && (
                <motion.div
                  className="demo-neuro__scan-line"
                  style={{ background: tc.color }}
                  initial={{ top: "0%" }}
                  animate={{ top: "100%" }}
                  transition={{ duration: 1, ease: "linear", repeat: 0 }}
                />
              )}
            </div>
            <span className="demo-neuro__thumb-label">{tc.label}</span>
          </button>
        ))}
      </div>

      <div className="demo-neuro__result-area">
        <AnimatePresence mode="wait">
          {scanning && (
            <motion.div
              key="scanning"
              className="demo-neuro__scanning"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <span className="demo-neuro__scanning-dot" />
              Analyzing scan...
            </motion.div>
          )}

          {showResult && !scanning && (
            <motion.div
              key={`result-${selected}`}
              className="demo-neuro__result"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease }}
            >
              <div className="demo-neuro__result-header">
                <span
                  className="demo-neuro__result-class"
                  style={{ color: current.color }}
                >
                  {current.result}
                </span>
                <span className="demo-neuro__result-conf">
                  {current.confidence}%
                </span>
              </div>

              <div className="demo-neuro__bars">
                {tumorClasses.map((tc, i) => (
                  <div key={tc.id} className="demo-neuro__bar-row">
                    <span className="demo-neuro__bar-label">{tc.label}</span>
                    <div className="demo-neuro__bar-track">
                      <motion.div
                        className="demo-neuro__bar-fill"
                        style={{ background: tc.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${confidences[i]}%` }}
                        transition={{ duration: 0.5, delay: i * 0.08, ease }}
                      />
                    </div>
                    <span className="demo-neuro__bar-value">
                      {confidences[i].toFixed(1)}%
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default NeuroScanDemo;
