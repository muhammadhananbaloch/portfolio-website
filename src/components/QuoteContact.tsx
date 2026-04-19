const QuoteContact = () => {
  return (
    <>
      <section className="quote-band">
        <blockquote>
          <span className="qmark">"</span>
          Most agents fail not on the <em>model</em>. They fail<br />
          on the <em>handoffs</em>. I spend 80% of my time<br />
          on the <em>glue</em>.
        </blockquote>
        <div className="attrib">
          · From Field Notes № 3 <em>· "The boring half of building with LLMs"</em>
        </div>
      </section>

      <section className="contact-sec" id="contact">
        <div className="contact-inner">
          <div>
            <h2>
              Let's build<br />
              something<br />
              that <em>ships.</em>
            </h2>
            <p className="lede" style={{ color: "#c7bfb0" }}>
              Currently building at JBS. Always happy to trade notes on agents,
              RAG, and the unglamorous parts of shipping AI. Reach out any time.
            </p>
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

        <div className="contact-foot">
          <div>© 2026 · Muhammad Hanan Baloch · All work original</div>
          <div>Set in Fraunces · Instrument Serif · JetBrains Mono</div>
          <div>
            <a href="#top" style={{ textDecoration: "none", color: "inherit" }}>
              Back to top ↑
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default QuoteContact;
