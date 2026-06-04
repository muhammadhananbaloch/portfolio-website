import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Message = {
  type: "outbound" | "inbound" | "system";
  text: string;
};

const messages: Message[] = [
  {
    type: "outbound",
    text: "Hi David, we noticed your property at 1847 Elm St may be entering pre-foreclosure. We help homeowners explore options before auction. Reply YES to learn more.",
  },
  {
    type: "inbound",
    text: "Yes interested",
  },
  {
    type: "system",
    text: "Reply attributed to Campaign #127 (Richmond batch, 342 sent)",
  },
  {
    type: "outbound",
    text: "Great! A specialist will reach out within 24 hours to discuss your options. You can also call us directly at (804) 555-0192.",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

const PropAutoCRMDemo = ({ isVisible }: { isVisible: boolean }) => {
  const [visibleMessages, setVisibleMessages] = useState(0);
  const [showAttribution, setShowAttribution] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimeouts = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  }, []);

  const play = useCallback(() => {
    clearTimeouts();
    setVisibleMessages(0);
    setShowAttribution(false);
    setIsPlaying(true);
    setHasPlayed(true);

    const schedule = (fn: () => void, ms: number) => {
      const id = setTimeout(fn, ms);
      timeoutsRef.current.push(id);
    };

    schedule(() => setVisibleMessages(1), 500);
    schedule(() => setVisibleMessages(2), 2200);
    schedule(() => setVisibleMessages(3), 3200);
    schedule(() => setShowAttribution(true), 3600);
    schedule(() => setVisibleMessages(4), 4800);
    schedule(() => setIsPlaying(false), 6000);
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
    <div className="demo-sms">
      <div className="demo-sms__phone">
        <div className="demo-sms__phone-top">
          <span className="demo-sms__phone-notch" />
        </div>
        <div className="demo-sms__phone-header">
          <span className="demo-sms__phone-contact">PropAuto CRM</span>
          <span className="demo-sms__phone-info">SMS Campaign</span>
        </div>
        <div className="demo-sms__phone-body">
          <AnimatePresence>
            {messages.slice(0, visibleMessages).map((msg, i) => (
              <motion.div
                key={i}
                className={`demo-sms__bubble demo-sms__bubble--${msg.type}`}
                initial={{ opacity: 0, y: 10, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.25, ease }}
              >
                {msg.type === "system" ? (
                  <span className="demo-sms__system-text">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    {msg.text}
                  </span>
                ) : (
                  msg.text
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          {isPlaying && visibleMessages < messages.length && (
            <div className="demo-sms__typing-row">
              <span className="demo-sms__typing-dot" />
              <span className="demo-sms__typing-dot" />
              <span className="demo-sms__typing-dot" />
            </div>
          )}
        </div>
        <div className="demo-sms__phone-bottom">
          <span className="demo-sms__phone-bar" />
        </div>
      </div>

      <AnimatePresence>
        {showAttribution && (
          <motion.div
            className="demo-sms__attribution"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease }}
          >
            <div className="demo-sms__attr-title">Sticky Attribution</div>
            <div className="demo-sms__attr-flow">
              <div className="demo-sms__attr-step">
                <span className="demo-sms__attr-label">Inbound</span>
                <span className="demo-sms__attr-value">(804) 555-8821</span>
              </div>
              <svg className="demo-sms__attr-arrow" width="20" height="12" viewBox="0 0 20 12" fill="none">
                <path d="M0 6h16M13 2l4 4-4 4" stroke="var(--accent)" strokeWidth="1.5" />
              </svg>
              <div className="demo-sms__attr-step">
                <span className="demo-sms__attr-label">Match</span>
                <span className="demo-sms__attr-value">3 campaigns found</span>
              </div>
              <svg className="demo-sms__attr-arrow" width="20" height="12" viewBox="0 0 20 12" fill="none">
                <path d="M0 6h16M13 2l4 4-4 4" stroke="var(--accent)" strokeWidth="1.5" />
              </svg>
              <div className="demo-sms__attr-step demo-sms__attr-step--result">
                <span className="demo-sms__attr-label">Attributed</span>
                <span className="demo-sms__attr-value">Campaign #127</span>
              </div>
            </div>
            <div className="demo-sms__attr-detail">
              Most recent active campaign for this number, verified via message history JSON mining
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {hasPlayed && !isPlaying && (
        <motion.button
          className="demo-sms__replay"
          onClick={play}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="1 4 1 10 7 10" />
            <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
          </svg>
          Replay
        </motion.button>
      )}
    </div>
  );
};

export default PropAutoCRMDemo;
