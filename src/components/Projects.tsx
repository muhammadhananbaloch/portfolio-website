import { ArrowUpRight, Brain, Scale, FileText, Building2 } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const projects = [
  {
    title: "NeuroScan AI",
    subtitle: "Medical AI",
    description: "A medical AI system for detecting brain tumors from MRI scans using deep learning.",
    tags: ["Python", "TensorFlow", "OpenCV"],
    icon: Brain,
    gradient: "from-indigo-900/20 to-neutral-900",
    iconColor: "text-indigo-500/30",
    hoverColor: "group-hover:text-indigo-300",
  },
  {
    title: "Legal RAG Chatbot",
    subtitle: "GenAI Solution",
    description: "A context-aware bot capable of querying and interpreting the Constitution of Pakistan.",
    tags: ["LangChain", "Gemini API", "RAG"],
    icon: Scale,
    gradient: "from-purple-900/20 to-neutral-900",
    iconColor: "text-purple-500/30",
    hoverColor: "group-hover:text-purple-300",
  },
  {
    title: "Smart Invoice Extractor",
    subtitle: "Automation",
    description: "An automated OCR pipeline utilizing Tesseract to digitize and parse financial documents.",
    tags: ["Python", "Tesseract", "FastAPI"],
    icon: FileText,
    gradient: "from-emerald-900/20 to-neutral-900",
    iconColor: "text-emerald-500/30",
    hoverColor: "group-hover:text-emerald-300",
  },
  {
    title: "Real Estate Automation",
    subtitle: "Full-Stack",
    description: "A full-stack platform with a Python backend and Dockerized deployment for managing property data.",
    tags: ["Python", "Docker", "PostgreSQL"],
    icon: Building2,
    gradient: "from-red-900/20 to-neutral-900",
    iconColor: "text-red-500/30",
    hoverColor: "group-hover:text-red-300",
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
            <p className="text-muted-foreground">Selected works blending AI with real-world automation.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {["All", "AI/ML", "Automation", "Full-Stack"].map((filter, i) => (
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
                {/* Abstract gradient background */}
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
                    <a href="#" className="p-2 rounded-full hover:bg-white/10 text-foreground">
                      <ArrowUpRight size={16} />
                    </a>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
                  <div className="flex gap-2 pt-2">
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
