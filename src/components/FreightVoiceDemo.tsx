import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Exchange = {
  speaker: "agent" | "prospect";
  text: string;
};

type ExtractedField = { label: string; value: string };

const transcript: Exchange[] = [
  {
    speaker: "agent",
    text: "Hi, this is Alex from National Freight Solutions. I'm reaching out because we specialize in full-truckload shipping for mid-size manufacturers. Do you currently have any freight needs?",
  },
  {
    speaker: "prospect",
    text: "Yeah actually, we've got a shipment of industrial valves we need moved from our Richmond facility. Around 12,000 pounds, needs to get to Dallas by next Tuesday.",
  },
  {
    speaker: "agent",
    text: "12,000 pounds, Richmond to Dallas, by next Tuesday. That's well within our FTL capacity. Is this a one-time shipment or would this be a recurring lane for you?",
  },
  {
    speaker: "prospect",
    text: "Could be recurring if the rate is competitive. We ship that lane about twice a month right now.",
  },
];

const extractedFields: ExtractedField[] = [
  { label: "Origin", value: "Richmond, VA" },
  { label: "Destination", value: "Dallas, TX" },
  { label: "Weight", value: "12,000 lbs" },
  { label: "Date", value: "Next Tuesday" },
];

const ease = [0.22, 1, 0.36, 1] as const;

const FreightVoiceDemo = ({ isVisible }: { isVisible: boolean }) => {
  const [visibleExchanges, setVisibleExchanges] = useState(0);
  const [intent, setIntent] = useState<string | null>(null);
  const [visibleFields, setVisibleFields] = useState(0);
  const [routing, setRouting] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const transcriptRef = useRef<HTMLDivElement>(null);

  const clearTimeouts = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  }, []);

  const play = useCallback(() => {
    clearTimeouts();
    setVisibleExchanges(0);
    setIntent(null);
    setVisibleFields(0);
    setRouting(false);
    setIsPlaying(true);
    setHasPlayed(true);

    const schedule = (fn: () => void, ms: number) => {
      const id = setTimeout(fn, ms);
      timeoutsRef.current.push(id);
    };

    schedule(() => setVisibleExchanges(1), 400);
    schedule(() => setVisibleExchanges(2), 2400);
    schedule(() => {
      setIntent("QUALIFIED");
      setVisibleFields(1);
    }, 3200);
    schedule(() => setVisibleFields(2), 3800);
    schedule(() => setVisibleFields(3), 4400);
    schedule(() => setVisibleFields(4), 5000);
    schedule(() => setVisibleExchanges(3), 5400);
    schedule(() => setVisibleExchanges(4), 7400);
    schedule(() => setRouting(true), 8400);
    schedule(() => setIsPlaying(false), 9200);
  }, [clearTimeouts]);

  useEffect(() => {
    if (isVisible && !hasPlayed) {
      const id = setTimeout(play, 600);
      return () => clearTimeout(id);
    }
  }, [isVisible, hasPlayed, play]);

  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [visibleExchanges]);

  useEffect(() => {
    return () => clearTimeouts();
  }, [clearTimeouts]);

  return (
    <div className="demo-freight">
      <div className="demo-freight__columns">
        <div className="demo-freight__transcript" ref={transcriptRef}>
          <div className="demo-freight__transcript-header">
            <span className="demo-freight__live-dot" />
            Call Transcript
          </div>
          <div className="demo-freight__messages">
            <AnimatePresence>
              {transcript.slice(0, visibleExchanges).map((ex, i) => (
                <motion.div
                  key={i}
                  className={`demo-freight__msg demo-freight__msg--${ex.speaker}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease }}
                >
                  <span className="demo-freight__msg-role">
                    {ex.speaker === "agent" ? "AI Agent" : "Prospect"}
                  </span>
                  {ex.text}
                </motion.div>
              ))}
            </AnimatePresence>
            {isPlaying && visibleExchanges < transcript.length && (
              <div className="demo-freight__typing">
                <span /><span /><span />
              </div>
            )}
          </div>
        </div>

        <div className="demo-freight__processing">
          <div className="demo-freight__processing-header">System Processing</div>

          <AnimatePresence>
            {intent && (
              <motion.div
                key="intent"
                className="demo-freight__intent"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25, ease }}
              >
                <span className="demo-freight__intent-label">Intent</span>
                <span className="demo-freight__intent-value">{intent}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="demo-freight__fields">
            <AnimatePresence>
              {extractedFields.slice(0, visibleFields).map((f, i) => (
                <motion.div
                  key={f.label}
                  className="demo-freight__field"
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, ease }}
                >
                  <span className="demo-freight__field-label">{f.label}</span>
                  <span className="demo-freight__field-value">{f.value}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <AnimatePresence>
            {routing && (
              <motion.div
                key="routing"
                className="demo-freight__routing"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease }}
              >
                <span className="demo-freight__routing-arrow">&#8594;</span>
                <span className="demo-freight__routing-label">QUALIFIED</span>
                <span className="demo-freight__routing-sub">Exec narrative generating...</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {hasPlayed && !isPlaying && (
        <motion.button
          className="demo-freight__replay"
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

export default FreightVoiceDemo;
