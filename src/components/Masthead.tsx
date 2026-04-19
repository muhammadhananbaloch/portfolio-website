const Masthead = () => {
  return (
    <header className="masthead">
      <div className="masthead-top">
        <div>Vol. I · <b>The Hanan Journal</b> · Issue 04 · Apr 2026</div>
        <div className="pulse"><span className="pulse-dot"></span> Currently at JBS · open to interesting conversations</div>
        <div>UTC+5 · Karachi / Remote</div>
      </div>
      <div className="masthead-main">
        <a href="#top" className="masthead-logo">
          <b>Muhammad Hanan Baloch</b>
          <span className="vol">· AI Engineer</span>
        </a>
        <nav className="masthead-nav">
          <a href="#work">Work</a>
          <a href="#now">Now</a>
          <a href="#stack">Stack</a>
          <a href="#experience">Experience</a>
          <a href="#contact" className="cta">Get in touch ↗</a>
        </nav>
      </div>
    </header>
  );
};

export default Masthead;
