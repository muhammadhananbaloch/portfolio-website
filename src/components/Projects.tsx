import { ArrowUpRight, Brain, Mic, Bot, Building2, Lock } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const projects = [
  {
    title: "NeuroScan AI",
    subtitle: "Computer Vision & Healthcare",
    description: "Deep learning diagnostic system capable of segmenting and detecting brain tumors from MRI scans. Features a high-performance backend built with FastAPI and PostgreSQL, fully containerized with Docker for seamless deployment.",
    tags: ["Pytorch", "FastAPI", "PostgreSQL", "Docker"],
    icon: Brain,
    gradient: "from-indigo-900/20 to-neutral-900",
    iconColor: "text-indigo-500/30",
    hoverColor: "group-hover:text-indigo-300",
    link: "https://brain-tumor-web-smiu.vercel.app/",
    isConfidential: false,
  },
  {
    title: "Freight Voice Agent",
    subtitle: "Conversational AI",
    description: "Autonomous voice agent engineered to pre-qualify logistics leads in real-time. Built using GHL automations and Synthflow to handle complex negotiation flows and instant CRM data synchronization.",
    tags: ["Synthflow", "GHL Automations", "Twilio"],
    icon: Mic,
    gradient: "from-purple-900/20 to-neutral-900",
    iconColor: "text-purple-500/30",
    hoverColor: "group-hover:text-purple-300",
    link: "#",
    isConfidential: true, 
  },
  {
    title: "Marketing Audit Agent",
    subtitle: "Data Orchestration",
    description: "Python-driven agentic system integrating Google Cloud APIs to automate asset audits. Autonomously parses and manipulates massive datasets in Google Sheets to generate comprehensive competitive strategy reports.",
    tags: ["Python", "GCP APIs", "Google Sheets", "LLMs"],
    icon: Bot,
    gradient: "from-emerald-900/20 to-neutral-900",
    iconColor: "text-emerald-500/30",
    hoverColor: "group-hover:text-emerald-300",
    link: "#",
    isConfidential: true, 
  },
  {
    title: "Real Estate Automation",
    subtitle: "Enterprise Platform",
    description: "Scalable property management ecosystem orchestrating thousands of listings. Built for internal client operations to sync data across platforms in real-time using a robust PostgreSQL and Docker infrastructure.",
    tags: ["Python", "PostgreSQL", "Docker", "Render"],
    icon: Building2,
    gradient: "from-red-900/20 to-neutral-900",
    iconColor: "text-red-500/30",
    hoverColor: "group-hover:text-red-300",
    link: "#",
    isConfidential: true,
  },
];

const Projects = () => {
  return (
    <section id="projects" className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto space-y-12">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight">Featured Projects</h2>
            <p className="text-muted-foreground">Selected works blending AI with real-world utility.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {["All", "AI/ML", "Agents", "Infrastructure"].map((filter, i) => (
              <button
                key={filter}
                className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                  i === 0 ? "bg-foreground text-background" : "border border-border hover:bg-white/5 text-muted-foreground"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {projects.map((project) => {
            const Icon = project.icon;
            return (
              <motion.article
                key={project.title}
                variants={fadeUp}
                className="group relative rounded-xl bg-surface border border-border overflow-hidden hover:border-neutral-600 transition-colors"
              >
                <div className="aspect-video bg-neutral-900 relative overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-tr ${project.gradient} group-hover:scale-105 transition-transform duration-500`} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Icon size={64} className={project.iconColor} />
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className={`text-lg font-semibold text-foreground mb-1 transition-colors ${project.hoverColor}`}>
                        {project.title}
                      </h3>
                      <p className="text-xs text-muted-foreground">{project.subtitle}</p>
                    </div>
                    
                    {project.isConfidential ? (
                      <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-white/5 border border-white/10" title="This project was built for a client and cannot be shared publicly.">
                        <Lock size={12} className="text-muted-foreground" />
                        <span className="text-[10px] font-medium text-muted-foreground">Internal</span>
                      </div>
                    ) : (
                      <a 
                        href={project.link} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full hover:bg-white/10 text-foreground transition-colors"
                        aria-label={`View ${project.title}`}
                      >
                        <ArrowUpRight size={16} />
                      </a>
                    )}
                  </div>
                  
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 text-[10px] uppercase tracking-wider rounded border border-white/10 text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;