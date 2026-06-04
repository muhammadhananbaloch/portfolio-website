import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Stage = {
  id: string;
  label: string;
  icon: "scrape" | "compress" | "enrich" | "gate" | "send";
};

const stages: Stage[] = [
  { id: "scrape", label: "Indeed scrape", icon: "scrape" },
  { id: "compress", label: "GPT-4o compress", icon: "compress" },
  { id: "enrich", label: "Clay enrich", icon: "enrich" },
  { id: "gate", label: "Polling gate", icon: "gate" },
  { id: "send", label: "Instantly.ai", icon: "send" },
];

const contactFields = [
  { label: "Name", value: "Sarah Mitchell" },
  { label: "Email", value: "s.mitchell@acme.io" },
  { label: "Phone", value: "(512) 555-0147" },
];

const ease = [0.22, 1, 0.36, 1] as const;

const StageIcon = ({ type, active }: { type: string; active: boolean }) => {
  const color = active ? "var(--accent)" : "var(--ink-3)";
  switch (type) {
    case "scrape":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18M9 21V9" />
        </svg>
      );
    case "compress":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
          <path d="M4 14l8-8 8 8" />
          <path d="M4 20l8-8 8 8" />
        </svg>
      );
    case "enrich":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      );
    case "gate":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      );
    case "send":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
          <path d="M4 4l16 8-16 8 4-8z" />
        </svg>
      );
    default:
      return null;
  }
};

const LeadEnrichmentDemo = ({ isVisible }: { isVisible: boolean }) => {
  const [activeStage, setActiveStage] = useState(-1);
  const [visibleContacts, setVisibleContacts] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimeouts = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  }, []);

  const play = useCallback(() => {
    clearTimeouts();
    setActiveStage(-1);
    setVisibleContacts(0);
    setIsPlaying(true);
    setHasPlayed(true);

    const schedule = (fn: () => void, ms: number) => {
      const id = setTimeout(fn, ms);
      timeoutsRef.current.push(id);
    };

    schedule(() => setActiveStage(0), 400);
    schedule(() => setActiveStage(1), 1600);
    schedule(() => setActiveStage(2), 2800);
    schedule(() => setVisibleContacts(1), 3200);
    schedule(() => setVisibleContacts(2), 3600);
    schedule(() => setVisibleContacts(3), 4000);
    schedule(() => setActiveStage(3), 4400);
    schedule(() => setActiveStage(4), 5400);
    schedule(() => setIsPlaying(false), 6200);
  }, [clearTimeouts]);

  useEffect(() => {
    if (isVisible && !hasPlayed) {
      const id = setTimeout(play, 600);
      return () => clearTimeout(id);
    }
  }, [isVisible, hasPlayed, play]);

  useEffect(() => {
    return () => clearTimeouts();
  }, [clearTimeouts]);

  return (
    <div className="demo-pipeline">
      <div className="demo-pipeline__track">
        {stages.map((stage, i) => {
          const isActive = i <= activeStage;
          const isCurrent = i === activeStage;
          return (
            <div key={stage.id} className="demo-pipeline__stage-wrapper">
              {i > 0 && (
                <div className={`demo-pipeline__connector ${i <= activeStage ? "lit" : ""}`}>
                  <motion.div
                    className="demo-pipeline__connector-fill"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: i <= activeStage ? 1 : 0 }}
                    transition={{ duration: 0.4, ease }}
                  />
                </div>
              )}
              <motion.div
                className={`demo-pipeline__stage ${isActive ? "active" : ""} ${isCurrent && isPlaying ? "current" : ""}`}
                initial={{ opacity: 0.4 }}
                animate={{ opacity: isActive ? 1 : 0.4 }}
                transition={{ duration: 0.3, ease }}
              >
                <div className="demo-pipeline__stage-icon">
                  <StageIcon type={stage.icon} active={isActive} />
                </div>
                <span className="demo-pipeline__stage-label">{stage.label}</span>
              </motion.div>
            </div>
          );
        })}
      </div>

      <div className="demo-pipeline__detail">
        <AnimatePresence mode="wait">
          {activeStage === 0 && (
            <motion.div
              key="scrape"
              className="demo-pipeline__card"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 12 }}
              transition={{ duration: 0.25, ease }}
            >
              <div className="demo-pipeline__card-header">Raw Job Posting</div>
              <div className="demo-pipeline__card-body">
                <div className="demo-pipeline__job-title">Sr. Data Engineer</div>
                <div className="demo-pipeline__job-company">Acme Corp — Austin, TX</div>
                <div className="demo-pipeline__job-snippet">
                  We are looking for a senior data engineer to build and maintain our data
                  infrastructure. Experience with Snowflake, dbt, and Airflow required.
                  Must have 5+ years experience with Python...
                </div>
                <span className="demo-pipeline__job-size">8.2 KB</span>
              </div>
            </motion.div>
          )}

          {activeStage === 1 && (
            <motion.div
              key="compress"
              className="demo-pipeline__card demo-pipeline__card--compact"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, x: 12 }}
              transition={{ duration: 0.25, ease }}
            >
              <div className="demo-pipeline__card-header">Compressed Summary</div>
              <div className="demo-pipeline__card-body">
                <div className="demo-pipeline__job-title">Sr. Data Engineer — Acme Corp</div>
                <ul className="demo-pipeline__summary-list">
                  <li>Snowflake + dbt + Airflow stack</li>
                  <li>5+ yrs Python, cloud infra</li>
                  <li>Austin, TX — hybrid</li>
                </ul>
                <span className="demo-pipeline__job-size">1.4 KB</span>
              </div>
            </motion.div>
          )}

          {activeStage === 2 && (
            <motion.div
              key="enrich"
              className="demo-pipeline__card"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 12 }}
              transition={{ duration: 0.25, ease }}
            >
              <div className="demo-pipeline__card-header">Enriched Contact</div>
              <div className="demo-pipeline__card-body">
                {contactFields.slice(0, visibleContacts).map((f, i) => (
                  <motion.div
                    key={f.label}
                    className="demo-pipeline__contact-field"
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, ease }}
                  >
                    <span className="demo-pipeline__contact-label">{f.label}</span>
                    <span className="demo-pipeline__contact-value">{f.value}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeStage === 3 && (
            <motion.div
              key="gate"
              className="demo-pipeline__card demo-pipeline__card--gate"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, x: 12 }}
              transition={{ duration: 0.25, ease }}
            >
              <div className="demo-pipeline__gate-check">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <div className="demo-pipeline__gate-text">Enrichment 100% complete</div>
              <div className="demo-pipeline__gate-sub">Target: 1 row — Enriched: 1 row</div>
            </motion.div>
          )}

          {activeStage === 4 && (
            <motion.div
              key="send"
              className="demo-pipeline__card demo-pipeline__card--email"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease }}
            >
              <div className="demo-pipeline__card-header">Personalized Email</div>
              <div className="demo-pipeline__email-to">
                To: s.mitchell@acme.io
              </div>
              <div className="demo-pipeline__email-subj">
                Re: Sr. Data Engineer role — Acme Corp
              </div>
              <div className="demo-pipeline__email-body">
                Hi Sarah, I noticed Acme Corp is building out a Snowflake + dbt
                stack. We specialize in helping teams like yours ship data
                pipelines faster...
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {hasPlayed && !isPlaying && (
        <motion.button
          className="demo-pipeline__replay"
          onClick={play}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <svg className="replay-icn" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="1 4 1 10 7 10" />
            <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
          </svg>
          Replay
        </motion.button>
      )}
    </div>
  );
};

export default LeadEnrichmentDemo;
