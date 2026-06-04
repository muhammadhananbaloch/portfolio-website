import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

type QueryResult = {
  path: "sql" | "semantic";
  label: string;
  content: string[][];
  textAnswer?: string;
};

const queries: { text: string; result: QueryResult }[] = [
  {
    text: "What's the total payout for hurricane claims in 2019?",
    result: {
      path: "sql",
      label: "SQL path",
      content: [
        ["Year", "Peril", "Total Payout"],
        ["2019", "Hurricane", "$14.2M"],
        ["2019", "Hurricane (Cat 5)", "$8.7M"],
        ["2019", "Hurricane (Cat 3)", "$5.5M"],
      ],
    },
  },
  {
    text: "Show me all open claims for client Meridian",
    result: {
      path: "sql",
      label: "SQL path",
      content: [
        ["Claim ID", "Status", "Filed", "Amount"],
        ["MRD-4821", "Open", "2024-01-15", "$340K"],
        ["MRD-4903", "Open", "2024-02-08", "$128K"],
        ["MRD-5011", "Open", "2024-03-22", "$89K"],
      ],
    },
  },
  {
    text: "Which adjuster handled the most claims last quarter?",
    result: {
      path: "semantic",
      label: "Semantic path",
      textAnswer:
        "Sarah Chen handled 47 claims in Q4 2024, the highest volume across all adjusters. Her portfolio was concentrated in Gulf Coast wind/hail events (32 of 47), with an average resolution time of 18 days.",
    },
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

const AviationClaimsDemo = ({ isVisible }: { isVisible: boolean }) => {
  const [activeQuery, setActiveQuery] = useState<number | null>(null);
  const [phase, setPhase] = useState<"idle" | "typing" | "routing" | "result">("idle");

  const runQuery = useCallback(
    (idx: number) => {
      if (phase !== "idle" && phase !== "result") return;

      setActiveQuery(idx);
      setPhase("typing");

      setTimeout(() => setPhase("routing"), 500);
      setTimeout(() => setPhase("result"), 1600);
    },
    [phase]
  );

  const reset = useCallback(() => {
    setPhase("idle");
    setActiveQuery(null);
  }, []);

  const q = activeQuery !== null ? queries[activeQuery] : null;

  return (
    <div className="demo-aviation">
      <div className="demo-aviation__input-wrap">
        <div className="demo-aviation__input">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <AnimatePresence mode="wait">
            {phase === "idle" || !q ? (
              <motion.span
                key="placeholder"
                className="demo-aviation__placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
              >
                Ask a claims question...
              </motion.span>
            ) : (
              <motion.span
                key={`query-${activeQuery}`}
                className="demo-aviation__typed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {q.text}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="demo-aviation__queries">
        {queries.map((query, i) => (
          <button
            key={i}
            className={`demo-aviation__query ${activeQuery === i ? "active" : ""}`}
            onClick={() => runQuery(i)}
            disabled={phase === "typing" || phase === "routing"}
          >
            {query.text}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {phase === "routing" && q && (
          <motion.div
            key="router"
            className="demo-aviation__router"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease }}
          >
            <div className="demo-aviation__router-label">
              <span className="demo-aviation__router-dot" />
              Router classifying...
            </div>
            <div className="demo-aviation__paths">
              <div className={`demo-aviation__path ${q.result.path === "sql" ? "lit" : ""}`}>
                <span className="demo-aviation__path-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <ellipse cx="12" cy="5" rx="9" ry="3" />
                    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                  </svg>
                </span>
                SQL path
              </div>
              <div className={`demo-aviation__path ${q.result.path === "semantic" ? "lit" : ""}`}>
                <span className="demo-aviation__path-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4M12 8h.01" />
                  </svg>
                </span>
                Semantic path
              </div>
            </div>
          </motion.div>
        )}

        {phase === "result" && q && (
          <motion.div
            key="result"
            className="demo-aviation__result"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease }}
          >
            <div className="demo-aviation__result-header">
              <span className={`demo-aviation__result-badge ${q.result.path}`}>
                {q.result.label}
              </span>
              <button className="demo-aviation__reset" onClick={reset}>
                Clear
              </button>
            </div>
            {q.result.path === "sql" ? (
              <div className="demo-aviation__table-wrap">
                <table className="demo-aviation__table">
                  <thead>
                    <tr>
                      {q.result.content[0].map((h, i) => (
                        <th key={i}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {q.result.content.slice(1).map((row, ri) => (
                      <motion.tr
                        key={ri}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: ri * 0.1, duration: 0.2, ease }}
                      >
                        {row.map((cell, ci) => (
                          <td key={ci}>{cell}</td>
                        ))}
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <motion.p
                className="demo-aviation__answer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.3 }}
              >
                {q.result.textAnswer}
              </motion.p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {!isVisible && phase !== "idle" && null}
    </div>
  );
};

export default AviationClaimsDemo;
