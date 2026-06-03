import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const revealEase = [0.22, 1, 0.36, 1] as const;

const quoteLines = [
  { text: "Most agents fail not on the ", keyword: "model", after: "." },
  { text: "They fail on the ", keyword: "handoffs", after: "." },
  { text: "I spend 80% of my time on the ", keyword: "glue", after: "." },
];

const LINE_STAGGER = 0.12;
const KEYWORD_DELAY = 0.2;

const QuoteContact = () => {
  const quoteRef = useRef<HTMLElement>(null);
  const quoteInView = useInView(quoteRef, { once: true, amount: 0.3 });

  const contactRef = useRef<HTMLElement>(null);
  const contactInView = useInView(contactRef, { once: true, amount: 0.2 });

  const footRef = useRef<HTMLDivElement>(null);
  const footInView = useInView(footRef, { once: true, amount: 0.5 });

  return (
    <>
      <section className="quote-band" ref={quoteRef}>
        <blockquote>
          <span className="qmark">"</span>
          {quoteLines.map((line, i) => {
            const lineDelay = i * LINE_STAGGER;
            return (
              <motion.span
                key={i}
                className="quote-line"
                initial={{ opacity: 0, y: 12 }}
                animate={quoteInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                transition={{ duration: 0.3, ease: revealEase, delay: lineDelay }}
              >
                {line.text}
                <motion.em
                  initial={{ color: "#666666" }}
                  animate={quoteInView ? { color: "#ffffff" } : { color: "#666666" }}
                  transition={{ duration: 0.3, ease: "easeOut", delay: lineDelay + KEYWORD_DELAY }}
                >
                  {line.keyword}
                </motion.em>
                {line.after}
              </motion.span>
            );
          })}
        </blockquote>
        <motion.div
          className="attrib"
          initial={{ opacity: 0 }}
          animate={quoteInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3, delay: quoteLines.length * LINE_STAGGER + 0.15 }}
        >
          — Muhammad Hanan Baloch
        </motion.div>
      </section>

      <motion.section
        className="contact-sec"
        id="contact"
        ref={contactRef}
        initial={{ opacity: 0, y: 20 }}
        animate={contactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.3, ease: revealEase }}
      >
        <div className="contact-inner">
          <div>
            <h2>
              Let's build<br />
              something<br />
              that ships.<span className="cta-cursor" />
            </h2>
            <p className="lede">
              Currently building at JBS. Always happy to trade notes on agents,
              RAG, and the unglamorous parts of shipping AI. Reach out any time.
            </p>
            <a href="mailto:contact@muhammadhananbaloch.dev" className="terminal-prompt">
              <span className="terminal-chr">~</span>
              <span>What are you building?</span>
              <span className="cta-cursor" />
            </a>
          </div>
          <div className="contact-links">
            <a href="mailto:contact@muhammadhananbaloch.dev">
              <span>
                Write to me <em>· contact@muhammadhananbaloch.dev</em>
              </span>
              <span className="arrow">→</span>
            </a>
            <a
              href="https://calendly.com/muhammaddhananbaloch/30min"
              target="_blank"
              rel="noopener noreferrer"
              id="consultation-btn"
            >
              <span>
                Book a 30-min call <em>· Calendly</em>
              </span>
              <span className="arrow">→</span>
            </a>
            <a href="https://github.com/muhammadhananbaloch" target="_blank" rel="noopener noreferrer">
              <span>
                GitHub <em>· @muhammadhananbaloch</em>
              </span>
              <span className="arrow">↗</span>
            </a>
            <a href="https://www.linkedin.com/in/muhammadhananbaloch/" target="_blank" rel="noopener noreferrer">
              <span>
                LinkedIn <em>· Muhammad Hanan Baloch</em>
              </span>
              <span className="arrow">↗</span>
            </a>
            <a href="https://x.com/muhammadhanann" target="_blank" rel="noopener noreferrer">
              <span>
                Twitter / X <em>· @muhammadhanann</em>
              </span>
              <span className="arrow">↗</span>
            </a>
          </div>
        </div>

        <motion.div
          className="contact-foot"
          ref={footRef}
          initial={{ opacity: 0 }}
          animate={footInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3, ease: revealEase }}
        >
          <div>© 2026 · Muhammad Hanan Baloch · All work original</div>
          <div>Set in Inter · JetBrains Mono</div>
          <div>
            <a href="#top" style={{ textDecoration: "none", color: "inherit" }}>
              Back to top ↑
            </a>
          </div>
        </motion.div>
      </motion.section>
    </>
  );
};

export default QuoteContact;
