# Muhammad Hanan Baloch | Personal Platform

![Status](https://img.shields.io/badge/Status-Production-success)
![Docker](https://img.shields.io/badge/Container-Dockerized-blue)
![AWS](https://img.shields.io/badge/Cloud-AWS%20EC2-orange)

> **Live Site:** [https://muhammadhananbaloch.dev](https://muhammadhananbaloch.dev)

A production-grade personal platform serving as the front door to my work in **Agentic AI**, **RAG Pipelines**, and **Scalable Systems**.

The site is built as an *editorial journal* rather than a conventional dev portfolio — warm cream paper, Fraunces serif, a live agent-graph on the cover, and click-to-expand system diagrams for every project. The emphasis is on reading experience and honest signal: every number, credential, and case-file reflects real shipped work.

---

## 🛠 Tech Stack

### **Frontend**
* **Framework:** [React 18](https://react.dev/) + [Vite](https://vitejs.dev/) (TypeScript, SWC)
* **Routing:** [React Router v6](https://reactrouter.com/) (SPA, two routes)
* **Styling:** A single hand-written stylesheet (`src/styles/portfolio.css`), scoped under a `.portfolio` body class. No CSS framework, no utility classes, no CSS-in-JS.
* **Typography:** [Fraunces](https://fonts.google.com/specimen/Fraunces) (display), [Instrument Serif](https://fonts.google.com/specimen/Instrument+Serif) (italics), [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) (captions), [Inter](https://fonts.google.com/specimen/Inter) (buttons) — loaded via a single preconnected Google Fonts request
* **Animations:** Pure CSS (keyframes, transitions) + SVG motion. Scroll-triggered count-ups via `IntersectionObserver` + `requestAnimationFrame`.

### **Infrastructure & DevOps**
* **Containerization:** Docker multi-stage build (`node:20-alpine` builder → `nginx:alpine` runtime)
* **Web Server:** Nginx with SPA fallback (`try_files $uri $uri/ /index.html`), gzip, 1-year static-asset caching
* **Hosting:** AWS EC2 (t3.micro, Amazon Linux)
* **CDN & Security:** Cloudflare (edge caching, SSL, DDoS protection)
* **Dev container:** `docker-compose.dev.yml` runs Vite with hot-reload on port `4231`

### **Intelligence & Analytics**
* **Tracking:** Google Analytics 4 (GA4) via Google Tag Manager (GTM ID `GTM-NFZ8ZXNL`)
* **Event triggers:** `resume-download-btn` (Hero) and `consultation-btn` (Contact) — preserved for recruiter-intent tracking
* **Integration:** Calendly (30-min consultation booking, direct link)

---

## ✨ Design Highlights

* **🖋 Editorial typography** — Fraunces + Instrument Serif pairing, italic display type, a colophon in the footer, numbered sections (№ 01, № 02…)
* **🕸 Live agent graph** — animated SVG on the cover (user → LLM → tools → memory → streamed response) with pulsing dashed edges and a paper-grain background
* **📂 Case-file work rows** — each project expands inline to reveal a hand-laid system diagram, a four-metric summary pair, and a short technical write-up
* **📈 Honest count-up stats** — intersection-observed counters for projects shipped, frameworks, and years building with AI. No fabricated metrics.
* **🗞 "Now" section** — a living page reflecting what I'm currently shipping, building, learning, and reading
* **⚡ Zero-friction scheduling** — direct Calendly link for a 30-min call
* **🔖 Custom 404** — themed NotFound page with the same editorial language
* **📱 Fully responsive** — two breakpoints (1080px, 720px) with careful reflow of the hero graph, stats band, and case-file rows

---

## 🚀 Getting Started

### Prerequisites
* Node.js (v20+)
* Docker (optional, for containerized dev or production testing)

### Local Development
1. **Clone the repository**
   ```bash
   git clone https://github.com/muhammadhananbaloch/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the dev server**
   ```bash
   npm run dev
   ```
   *Access at `http://localhost:4231`*

### Docker Development (hot-reload)
```bash
docker compose -f docker-compose.dev.yml up --build
```

---

## 🐳 Production Deployment

Simulate the production environment locally:

1. **Build the image**
   ```bash
   docker build -t portfolio-app .
   ```

2. **Run the container**
   ```bash
   docker run -p 8080:80 portfolio-app
   ```
   *Access at `http://localhost:8080`*

---

## 📂 Project Structure

```bash
src/
├── components/         # Editorial page sections
│   ├── Masthead.tsx       # Sticky journal header with live-availability pulse
│   ├── Hero.tsx           # Cover display type + CTAs
│   ├── AgentGraph.tsx     # Animated SVG agent architecture diagram
│   ├── Stats.tsx          # Scroll-triggered count-up band
│   ├── Now.tsx            # "This month" living section
│   ├── Work.tsx           # Case-file rows with click-to-expand diagrams
│   ├── StackExp.tsx       # Stack groups + experience timeline
│   └── QuoteContact.tsx   # Pull-quote band + contact finale
├── pages/
│   ├── Index.tsx          # Main composition
│   └── NotFound.tsx       # Themed 404
├── styles/
│   └── portfolio.css      # Single editorial stylesheet (scoped)
├── index.css              # Minimal global reset
├── App.tsx                # Router
└── main.tsx               # Entry point
public/
└── favicon.svg         # Editorial favicon (rust italic "H" on cream)
Dockerfile              # Multi-stage production build
docker-compose.dev.yml  # Vite dev container on port 4231
nginx.conf              # SPA fallback + gzip + cache headers
index.html              # GTM + font preconnects + app mount
```

---

## 📬 Contact

* **Website:** [muhammadhananbaloch.dev](https://muhammadhananbaloch.dev)
* **LinkedIn:** [Muhammad Hanan Baloch](https://www.linkedin.com/in/muhammadhananbaloch/)
* **Email:** [contact@muhammadhananbaloch.dev](mailto:contact@muhammadhananbaloch.dev)
* **Book a call:** [calendly.com/muhammaddhananbaloch/30min](https://calendly.com/muhammaddhananbaloch/30min)

---

*© 2026 Muhammad Hanan Baloch. Licensed under MIT.*
