import { Brain, Bot, Code2, Database, Cloud, BrainCircuit, Sparkles, LayoutTemplate, Container, Server, Globe, GitBranch, BarChart3, Table2, PieChart } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Skills = () => {
  return (
    <section id="skills" className="py-24 px-6 relative border-t border-white/5">
      <div className="max-w-6xl mx-auto space-y-12">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-2">
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight">Technical Arsenal</h2>
          <p className="text-muted-foreground">The tools I use to turn problems into products.</p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {/* AI & ML */}
          <motion.div variants={fadeUp} className="group p-8 rounded-2xl bg-surface/50 border border-border card-hover relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <BrainCircuit size={80} />
            </div>
            <div className="flex items-center gap-3 mb-6">
              <span className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <Brain size={20} />
              </span>
              <h3 className="text-xl font-medium text-foreground">AI &amp; ML</h3>
            </div>
            <ul className="space-y-3">
              {["Python, LangChain", "Gemini API, RAG Pipelines", "Deep Learning, Computer Vision"].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" /> {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Web & DevOps */}
          <motion.div variants={fadeUp} className="group p-8 rounded-2xl bg-surface/50 border border-border card-hover relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <Sparkles size={80} />
            </div>
            <div className="flex items-center gap-3 mb-6">
              <span className="p-2 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
                <Bot size={20} />
              </span>
              <h3 className="text-xl font-medium text-foreground">Web &amp; DevOps</h3>
            </div>
            <ul className="space-y-3">
              {["Streamlit, FastAPI", "Docker, Next.js", "React, TypeScript"].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500" /> {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Automation */}
          <motion.div variants={fadeUp} className="group p-8 rounded-2xl bg-surface/50 border border-border card-hover relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <LayoutTemplate size={80} />
            </div>
            <div className="flex items-center gap-3 mb-6">
              <span className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <Code2 size={20} />
              </span>
              <h3 className="text-xl font-medium text-foreground">Automation</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {["Invoice OCR", "Real Estate Automation", "PostgreSQL", "Tesseract", "Data Pipelines"].map((tag) => (
                <span key={tag} className="px-2 py-1 text-xs rounded bg-muted text-muted-foreground border border-border">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Data & Deployment (wide card) */}
          <motion.div variants={fadeUp} className="group p-8 rounded-2xl bg-surface/50 border border-border card-hover relative overflow-hidden lg:col-span-2 md:col-span-2">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-6">
                  <span className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <Database size={20} />
                  </span>
                  <h3 className="text-xl font-medium text-foreground">Data &amp; Databases</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  Handling complex data pipelines and storage solutions. From raw data processing with Pandas/NumPy to storing efficiently in PostgreSQL and MongoDB.
                </p>
                <div className="flex gap-2 text-muted-foreground">
                  <BarChart3 size={20} />
                  <Table2 size={20} />
                  <PieChart size={20} />
                </div>
              </div>
              <div className="flex-1 border-l border-white/5 pl-0 md:pl-8">
                <div className="flex items-center gap-3 mb-6">
                  <span className="p-2 rounded-lg bg-orange-500/10 text-orange-400 border border-orange-500/20">
                    <Cloud size={20} />
                  </span>
                  <h3 className="text-xl font-medium text-foreground">Deployment</h3>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2"><Container size={16} /> Docker</div>
                  <div className="flex items-center gap-2"><Server size={16} /> AWS</div>
                  <div className="flex items-center gap-2"><Globe size={16} /> Streamlit</div>
                  <div className="flex items-center gap-2"><GitBranch size={16} /> CI/CD</div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
