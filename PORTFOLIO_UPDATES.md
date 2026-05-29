# Portfolio Update Guide — muhammadhananbaloch.dev

Complete list of changes to implement, organized by section.

---

## 1. Hero / Header Area

### 1.1 — Stats Bar ("By the numbers")

**Current:**
- 7 Projects Shipped
- 4+ Languages & Frameworks
- 2 yrs Building with AI

**Problem:** "4+ Languages & Frameworks" is underwhelming. Every junior dev knows 4+ languages. It adds no signal.

**Fix:** Replace "4+ Languages & Frameworks" with a business-impact stat. Options:
- "X clients served" (if disclosable)
- "X hours of manual work automated" (sum across projects — e.g. the SOP generator alone is 62+ hours)
- "X+ enterprise systems deployed"

Keep "7 Projects Shipped" and "2 yrs Building with AI" as-is.

### 1.2 — Remote Availability Signal

**Current:** "KARACHI · REMOTE" in the header + "OPEN TO INTERESTING CONVERSATIONS" in the top bar.

**Assessment:** This is the right approach. It signals availability without announcing job-seeking to a current employer. Hiring managers know how to read between those lines. The "Book 30-min" CTA and "Get in Touch" button handle the rest. No changes needed here.

---

## 2. "This Month" / Now Section

**Current:** "A living page: what I'm building, learning, and reading right now. Updated whenever something meaningful changes."

**Problem:** If this isn't updated regularly, it signals abandonment. A stale "now" section is worse than no "now" section. A recruiter visiting and seeing outdated content assumes you're inactive.

**Fix:** Two options:
- **Option A (recommended):** Commit to updating it at least monthly. Add a visible "Last updated: [date]" so visitors can see it's current.
- **Option B:** Remove the section entirely. Redirect that screen real estate to something that doesn't require maintenance (e.g., expand the project section, add testimonials, add a "How I work" section).

If keeping it, make sure the content is current as of the date someone visits.

---

## 3. Experience Section

**Current:** Single entry — "AI Engineer, JBS Americas & Europe, Oct 2025 – Present" with a vague description:

> "Driving enterprise innovation by architecting autonomous AI systems that solve complex operational challenges, from intelligent voice agents to automated audit pipelines that deliver measurable business value."

**Problem:** This is the same corporate fluff we cut from the LinkedIn profile. Generic, no specifics, no outcomes.

**Fix:** Replace the description with concrete, outcome-driven text. Use the same content as the updated LinkedIn experience section:

> Building production AI systems for enterprise clients, replacing manual workflows with automated, API-driven solutions using Python, LLMs, and cloud infrastructure.

Then list key highlights (brief, not full bullets — this is a portfolio, not a resume):
- Multi-tenant AI claims chatbot (LangGraph, pgvector, PostgreSQL) — 14 client aliases, dual SQL/semantic query paths
- AI voice agent — 300k+ logistics prospects, intent-based routing, fail-safe extraction
- Marketing audit agent — 4 hours to under 5 minutes
- SOP generator — 62+ hours of manual work eliminated
- GoHighLevel to n8n migration — $3,000–$6,000 saved

---

## 4. Project Cards — Add Business Outcomes

This is the highest-impact change. Every project's stats panel currently mixes technical specs and business outcomes inconsistently. Each project needs at least one clear "so what" business outcome stat.

### 4.1 — Aviation Claims Hybrid RAG (Project 001)

**Current stats:**
- 8 Interrelated Tables
- 1536-d pgvector Embeddings
- 185K Token Budget Guard
- 2 paths SQL · Semantic

**Problem:** All technical specs, zero business outcomes. "8 interrelated tables" means nothing to a hiring manager.

**Fix:** Keep 2 of the technical stats (e.g., "2 paths — SQL · Semantic" and "185K Token Budget Guard") and replace the other 2 with business impact:
- How much manual adjuster time was replaced?
- How many years of claims data is now queryable?
- What was the previous process? (e.g., "Manual lookup across X systems" → "Single natural language query")

Example replacement stats:
- "10+ yrs — Claims Data Queryable" (already in the description, promote to a stat)
- "Seconds — Query Response" or similar
- Keep "2 paths — SQL · Semantic"
- Keep "185K — Token Budget Guard"

### 4.2 — NeuroScan AI (Project 002)

**Current stats:**
- ~5.3M Model Params
- ~20MB Docker Image
- 4-class Tumor Triage
- CPU Cloud Inference

**Assessment:** These are actually decent for this project since it's a technical/academic project where the engineering constraints ARE the story (CPU-only, tiny model, small Docker image). The stats tell a story of efficiency. This one is fine as-is.

**Other issue:** NeuroScan is a final-year university project sitting alongside enterprise client work. It dilutes the "I build production systems for real businesses" narrative.

**Fix:** Move NeuroScan to the bottom of the project list (position 006 instead of 002). Lead with client/enterprise work, end with academic work. The ordering should prioritize projects that demonstrate production, client-facing impact.

Suggested order:
1. Aviation Claims Hybrid RAG (most technically impressive)
2. Freight Voice Orchestration (biggest scale — 300k leads)
3. Marketing Ops Document Factory (clearest business outcome — 60h to 1-2h)
4. PropAuto CRM (full-stack, shows breadth)
5. Lead Enrichment Outreach Engine (automation/growth)
6. NeuroScan AI (academic, but shows ML/CV depth)

### 4.3 — Freight Voice Orchestration (Project 003)

**Current stats:**
- 300k+ Leads Addressable
- 4-branch Intent Router
- < 10 min Speed to Quote
- < 80 w Exec Narrative

**Assessment:** Good mix. "300k+ Leads Addressable" and "< 10 min Speed to Quote" are strong business metrics. "4-branch Intent Router" and "< 80 w Exec Narrative" are technical but meaningful.

**Fix:** This one is mostly fine. Consider replacing "< 80 w Exec Narrative" with something more outcome-oriented if you have the data — e.g., "X% qualification rate" or "Replaced X SDRs" or "X calls/day automated." If you don't have that data, keep as-is.

### 4.4 — Marketing Ops Document Factory (Project 004)

**Current stats:**
- 60h → 1–2h Per Client
- 4-level Drive Tree Gen
- 6-part SOP Schema
- Idempotent Safe Re-runs

**Assessment:** "60h → 1–2h Per Client" is the best business outcome stat on the entire site. Lead with it.

**Fix:** Consider replacing "Idempotent Safe Re-runs" with a scale stat if available — e.g., "X clients processed" or "X SOPs generated." "Idempotent" is an engineering detail that hiring managers won't understand or care about. "4-level Drive Tree Gen" and "6-part SOP Schema" are borderline but acceptable since they describe the system's capability.

### 4.5 — Lead Enrichment Outreach Engine (Project 005)

**Current stats:**
- 0 Sends on Incomplete Data
- hours Manual Work Per Batch
- AI-written Copy Per Lead
- waterfall Multi-Source Enrichment

**Problem:** These are the weakest stats on the site. "0 Sends on Incomplete Data" is a feature description, not an outcome. "hours Manual Work Per Batch" doesn't have an actual number. "AI-written Copy Per Lead" is just a description. "waterfall Multi-Source Enrichment" is a technical pattern name.

**Fix:** Replace all four with real metrics:
- How many leads were processed total?
- What was the enrichment completion rate?
- How much time was saved per batch (with actual numbers)?
- What was the email open/reply rate if available?

Example replacements:
- "X leads — Enriched & Sent" (total throughput)
- "Xh → Xmin — Per Batch" (time savings, same format as Marketing Ops)
- "0 — Sends on Incomplete Data" (keep this one but format it as a number)
- "X sources — Enrichment Waterfall" (put a number to it)

### 4.6 — PropAuto CRM (Project 006)

**Current stats:**
- 2-way SMS Orchestration
- JSONB Lead Normalization
- signed Twilio Webhooks
- sticky Context Attribution

**Problem:** All four stats are implementation details. Zero business outcomes. A hiring manager reads "JSONB Lead Normalization" and learns nothing about what this system accomplished.

**Fix:** Replace at least 2 with business outcomes:
- How many properties were scouted?
- How many SMS campaigns were run?
- What was the response rate?
- How many leads were generated?

Example replacements:
- "X properties — Scouted" or "X leads — Generated"
- "2-way — SMS Campaigns" (keep, it's understandable)
- "X% — Reply Attribution" or similar outcome
- "sticky — Context Attribution" (keep if no better data, it's at least interesting)

---

## 5. Project Card Descriptions (Expanded View)

The expanded descriptions are technically strong but written for engineers, not hiring managers. For the remote job goal, consider adding a single opening sentence to each that frames the business problem before diving into the technical solution.

**Example for Aviation Claims:**

Current: "A LangGraph state machine routes each query to either a validated SQL path..."

Better: "Insurance adjusters were manually searching across 10+ years of claims data in multiple systems. Built a hybrid RAG backend that lets them query everything in plain English." Then continue with the technical details.

This doesn't require rewriting everything — just prepend a 1-sentence business context to each expanded description.

---

---

## Priority Order for Implementation

1. **Project stats panels** (Section 4) — highest impact, fixes the weakest part of the site
2. **Experience section text** (Section 3) — replace corporate fluff with concrete outcomes
3. **Project ordering** (Section 4.2) — move NeuroScan to last position
4. **Hero stats bar** (Section 1.1) — swap "4+ Languages" for something meaningful
5. **"This Month" section** (Section 2) — either update or remove
6. **Business context sentences** (Section 5) — prepend to expanded descriptions