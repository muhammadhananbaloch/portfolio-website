import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";

type TerminalEntry = {
  command: string;
  result: string;
  href: string;
  external?: boolean;
};

const ENTRIES: TerminalEntry[] = [
  {
    command: "echo contact",
    result: "contact@muhammadhananbaloch.dev",
    href: "mailto:contact@muhammadhananbaloch.dev",
  },
  {
    command: "calendly --book 30min",
    result: "Schedule a call",
    href: "https://calendly.com/muhammaddhananbaloch/30min",
    external: true,
  },
  {
    command: "git remote -v",
    result: "github.com/muhammadhananbaloch",
    href: "https://github.com/muhammadhananbaloch",
    external: true,
  },
  {
    command: "open linkedin",
    result: "Muhammad Hanan Baloch",
    href: "https://www.linkedin.com/in/muhammadhananbaloch/",
    external: true,
  },
  {
    command: "open twitter",
    result: "@muhammadhhanann",
    href: "https://x.com/muhammadhanann",
    external: true,
  },
];

const CHAR_DELAY = 40;
const RESULT_PAUSE = 200;
const NEXT_CMD_PAUSE = 400;

const ContactScene = () => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const inView = useInView(terminalRef, { once: true, amount: 0.3 });

  const [typed, setTyped] = useState<string[]>([]);
  const [showResults, setShowResults] = useState<boolean[]>([]);
  const [currentEntry, setCurrentEntry] = useState(-1);
  const [currentChar, setCurrentChar] = useState(0);
  const [done, setDone] = useState(false);

  const startTyping = useCallback(() => {
    setTyped([]);
    setShowResults([]);
    setCurrentEntry(0);
    setCurrentChar(0);
    setDone(false);
  }, []);

  useEffect(() => {
    if (inView && currentEntry === -1) {
      startTyping();
    }
  }, [inView, currentEntry, startTyping]);

  useEffect(() => {
    if (currentEntry < 0 || currentEntry >= ENTRIES.length) return;

    const cmd = ENTRIES[currentEntry].command;

    if (currentChar <= cmd.length) {
      const timer = setTimeout(() => {
        setTyped((prev) => {
          const next = [...prev];
          next[currentEntry] = cmd.slice(0, currentChar);
          return next;
        });
        setCurrentChar((c) => c + 1);
      }, CHAR_DELAY);
      return () => clearTimeout(timer);
    }

    // Command fully typed, show result after pause
    const resultTimer = setTimeout(() => {
      setShowResults((prev) => {
        const next = [...prev];
        next[currentEntry] = true;
        return next;
      });

      // Move to next command after another pause
      const nextTimer = setTimeout(() => {
        if (currentEntry < ENTRIES.length - 1) {
          setCurrentEntry((e) => e + 1);
          setCurrentChar(0);
        } else {
          setDone(true);
        }
      }, NEXT_CMD_PAUSE);

      // Store for cleanup
      timerRef.current = nextTimer;
    }, RESULT_PAUSE);

    const timerRef = { current: 0 as unknown as ReturnType<typeof setTimeout> };
    return () => {
      clearTimeout(resultTimer);
      clearTimeout(timerRef.current);
    };
  }, [currentEntry, currentChar]);

  return (
    <section className="contact-scene" id="contact">
      <div className="contact-scene__inner">
        <div className="contact-scene__left">
          <h2 className="contact-scene__headline">
            Let's build something that ships.
            <span className="cta-cursor" />
          </h2>
          <p className="contact-scene__subtitle">
            Currently building at JBS. Always happy to trade notes on agents,
            RAG, and the unglamorous parts of shipping AI.
          </p>
        </div>

        <div className="contact-scene__right" ref={terminalRef}>
          <div className="contact-terminal">
            <div className="contact-terminal__bar">
              <div className="contact-terminal__dots">
                <span />
                <span />
                <span />
              </div>
              <span className="contact-terminal__title">
                hanan@portfolio ~ %
              </span>
            </div>
            <div className="contact-terminal__body">
              {ENTRIES.map((entry, i) => {
                const isTyping = i === currentEntry;
                const isTyped = i < currentEntry || (i === currentEntry && (typed[i]?.length ?? 0) > entry.command.length - 1);
                const hasResult = showResults[i];
                const visible = i <= currentEntry;

                if (!visible) return null;

                return (
                  <div key={i} className="contact-terminal__entry">
                    <div className="contact-terminal__prompt-line">
                      <span className="contact-terminal__prompt">$</span>
                      <span className="contact-terminal__cmd">
                        {typed[i] || ""}
                        {isTyping && !isTyped && (
                          <span className="contact-terminal__block-cursor" />
                        )}
                      </span>
                    </div>
                    {hasResult && (
                      <motion.div
                        className="contact-terminal__result"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.15 }}
                      >
                        <a
                          href={entry.href}
                          className="contact-terminal__link"
                          {...(entry.external
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {})}
                          {...(i === 1 ? { id: "consultation-btn" } : {})}
                        >
                          {entry.result}
                        </a>
                      </motion.div>
                    )}
                  </div>
                );
              })}
              {done && (
                <div className="contact-terminal__entry">
                  <div className="contact-terminal__prompt-line">
                    <span className="contact-terminal__prompt">$</span>
                    <span className="contact-terminal__block-cursor" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactScene;
