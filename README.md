Good catch. Accuracy matters, especially in technical documentation. A `t3.micro` instance is significantly better for burstable performance than the older `t2` generation.

Here is the **corrected** `README.md` with the updated specs. Copy and replace your entire file:

```markdown
# Muhammad Hanan Baloch | Personal Platform

![Status](https://img.shields.io/badge/Status-Production-success)
![Docker](https://img.shields.io/badge/Container-Dockerized-blue)
![AWS](https://img.shields.io/badge/Cloud-AWS%20EC2-orange)

> **Live Site:** [https://muhammadhananbaloch.dev](https://muhammadhananbaloch.dev)

A production-grade personal platform engineered to serve as a central hub for my work in **Agentic AI**, **RAG Pipelines**, and **Scalable Systems**. 

Unlike standard static sites, this project focuses on robust infrastructure, real-time analytics, and a frictionless user experience. It is designed to be a living "digital sandbox" for experimenting with new web technologies and autonomous agents.

---

## 🛠 Tech Stack

### **Frontend & UI**
* **Framework:** [React](https://react.dev/) + [Vite](https://vitejs.dev/) (TypeScript)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Animation:** [Framer Motion](https://www.framer.com/motion/) (Semantic animations)
* **Components:** [Shadcn UI](https://ui.shadcn.com/) + [Lucide React](https://lucide.dev/)

### **Infrastructure & DevOps**
* **Containerization:** Docker (Multi-stage builds)
* **Web Server:** Nginx (Alpine Linux based)
* **Hosting:** AWS EC2 (t3.micro / Linux/Unix)
* **CDN & Security:** Cloudflare (Edge caching, SSL, DDoS protection)

### **Intelligence & Analytics**
* **Tracking:** Google Analytics 4 (GA4) + Google Tag Manager (GTM)
* **Events:** Custom event triggers for "Consultation Clicks" and "Resume Downloads"
* **Integration:** Calendly (Direct booking API)

---

## ✨ Key Features

* **⚡ Zero-Friction Scheduling:** Integrated Calendly modal for direct consultation booking without leaving the page.
* **📊 Granular Analytics:** Tracks not just page views, but specific interactions (e.g., recruiter intent signals).
* **🎨 Minimalist "Dark Mode" Aesthetic:** Designed for readability and focus, reflecting a "Systems Engineering" vibe.
* **📱 Fully Responsive:** Mobile-first architecture with smooth, gesture-based navigation menus.
* **🔒 Enterprise-Grade Security:** A+ SSL rating via Cloudflare strict encryption.

---

## 🚀 Getting Started

### Prerequisites
* Node.js (v18+)
* Docker (Optional, for containerized testing)

### Local Development
1.  **Clone the repository**
    ```bash
    git clone [https://github.com/muhammadhananbaloch/portfolio.git](https://github.com/muhammadhananbaloch/portfolio.git)
    cd portfolio
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    ```

---

## 🐳 Docker Deployment

To simulate the production environment locally:

1.  **Build the image**
    ```bash
    docker build -t portfolio-app .
    ```

2.  **Run the container**
    ```bash
    docker run -p 8080:80 portfolio-app
    ```
    *Access at `http://localhost:8080`*

---

## 📂 Project Structure

```bash
src/
├── assets/          # Static assets (images, pdfs)
├── components/      # Reusable UI components (Hero, Navbar, Contact)
├── lib/             # Utility functions (Tailwind merge, clsx)
├── index.css        # Global styles & Tailwind directives
└── App.tsx          # Main application entry point
Dockerfile           # Multi-stage build configuration
nginx.conf           # Custom Nginx server configuration

```

---

## 📬 Contact

* **Website:** [muhammadhananbaloch.dev](https://www.google.com/url?sa=E&source=gmail&q=https://muhammadhananbaloch.dev)
* **LinkedIn:** [Muhammad Hanan Baloch](https://www.linkedin.com/in/muhammadhananbaloch/)
* **Email:** [contact@muhammadhananbaloch.dev](mailto:contact@muhammadhananbaloch.dev)

---

*© 2026 Muhammad Hanan Baloch. Licensed under MIT.*

```

```