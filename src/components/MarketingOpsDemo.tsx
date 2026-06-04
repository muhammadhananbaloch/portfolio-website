import { useState, useRef, useCallback, useEffect } from "react";
import { motion } from "framer-motion";

const spreadsheetRows = [
  { task: "Social Media SOP", ref: "https://notion.so/smpl/...", status: "PENDING", notes: "check competitor X" },
  { task: "Email Drip Setup", ref: "bit.ly/drip-ref-2", status: "DRAFT", notes: "merge w/ onboarding" },
  { task: "CRM Data Entry", ref: "(see Slack #ops)", status: "", notes: "ask Maria" },
  { task: "Content Calendar", ref: "docs.google.com/d/1x...", status: "PENDING", notes: "2024 Q3 only?" },
  { task: "Lead Scoring Model", ref: "airtable.com/shr...", status: "DRAFT", notes: "needs review" },
  { task: "Reporting Dashboard", ref: "???", status: "", notes: "John had a template" },
  { task: "Client Onboarding", ref: "notion.so/onboard", status: "PENDING", notes: "missing steps 4-7" },
];

const sopSections = [
  { heading: "1. Overview", text: "This SOP defines the standardized process for managing social media accounts across all client brands, including content scheduling, approval workflows, and performance reporting." },
  { heading: "2. Key Steps", text: "1) Audit existing accounts  2) Define posting cadence  3) Create content templates  4) Set up approval chain  5) Schedule 2-week content batch  6) Review analytics weekly" },
  { heading: "3. Roles", text: "Content Manager: owns scheduling and publishing. Account Lead: approves all client-facing posts. Analytics: weekly performance summary." },
  { heading: "4. Tools", text: "Hootsuite (scheduling), Canva (design), Google Analytics (tracking), Slack #content-review (approvals)" },
  { heading: "5. QA Checklist", text: "Brand voice consistency, link validation, image alt-text, hashtag strategy, compliance review" },
];

const MarketingOpsDemo = ({ isVisible }: { isVisible: boolean }) => {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(8, Math.min(92, (x / rect.width) * 100));
    setSliderPos(pct);
  }, []);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      isDragging.current = true;
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      updatePosition(e.clientX);
    },
    [updatePosition]
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current) return;
      updatePosition(e.clientX);
    },
    [updatePosition]
  );

  const onPointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  useEffect(() => {
    if (!isVisible) return;
  }, [isVisible]);

  return (
    <div className="demo-mktops">
      <div className="demo-mktops__header">
        <motion.span
          className="demo-mktops__time"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <span className="demo-mktops__time-old">60h</span>
          <span className="demo-mktops__time-arrow">&#8594;</span>
          <span className="demo-mktops__time-new">1-2h</span>
          <span className="demo-mktops__time-label">per client</span>
        </motion.span>
      </div>

      <div
        className="demo-mktops__slider"
        ref={containerRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        style={{ touchAction: "none" }}
      >
        <div className="demo-mktops__before" style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}>
          <div className="demo-mktops__spreadsheet">
            <div className="demo-mktops__sheet-header">
              <span className="demo-mktops__sheet-tab active">Client SOPs</span>
              <span className="demo-mktops__sheet-tab">Sheet2</span>
              <span className="demo-mktops__sheet-tab">Raw Data</span>
            </div>
            <table className="demo-mktops__sheet-table">
              <thead>
                <tr>
                  <th></th>
                  <th>A: Task</th>
                  <th>B: Reference</th>
                  <th>C: Status</th>
                  <th>D: Notes</th>
                </tr>
              </thead>
              <tbody>
                {spreadsheetRows.map((row, i) => (
                  <tr key={i} className={row.status === "" ? "missing" : ""}>
                    <td className="row-num">{i + 1}</td>
                    <td>{row.task}</td>
                    <td className="ref-cell">{row.ref}</td>
                    <td className={`status-cell ${row.status.toLowerCase()}`}>
                      {row.status || <span className="empty-cell" />}
                    </td>
                    <td className="notes-cell">{row.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="demo-mktops__sheet-label">BEFORE</div>
          </div>
        </div>

        <div className="demo-mktops__after" style={{ clipPath: `inset(0 0 0 ${sliderPos}%)` }}>
          <div className="demo-mktops__document">
            <div className="demo-mktops__doc-header">
              <span className="demo-mktops__doc-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
              </span>
              Social_Media_SOP_v1.docx
            </div>
            <div className="demo-mktops__doc-body">
              {sopSections.map((s, i) => (
                <div key={i} className="demo-mktops__doc-section">
                  <h4>{s.heading}</h4>
                  <p>{s.text}</p>
                </div>
              ))}
            </div>
            <div className="demo-mktops__doc-label">AFTER</div>
          </div>
        </div>

        <div className="demo-mktops__divider" style={{ left: `${sliderPos}%` }}>
          <div className="demo-mktops__handle">
            <svg width="12" height="24" viewBox="0 0 12 24" fill="none">
              <path d="M4 7L1 12L4 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M8 7L11 12L8 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketingOpsDemo;
