import { ArrowRight, Download, Github, Linkedin, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section id="about" className="relative min-h-screen flex flex-col justify-center items-center text-center pt-20 px-6 bg-grid">
      {/* Spotlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] glow-bg opacity-60 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="space-y-8 max-w-4xl relative z-10"
      >
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-foreground backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
          Available for new opportunities
        </div>

        <h1 className="text-5xl md:text-7xl font-semibold tracking-tighter text-foreground leading-[1.1]">
          Architecting Scalable{" "}
          <br className="hidden md:block" />
          <span className="text-muted-foreground">AI & Autonomous Systems.</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Specializing in Deep Learning, RAG Pipelines, and Agentic Workflows. I engineer robust Python solutions that bridge complex data science with real-world utility.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          <a
            href="#projects"
            className="px-8 py-3 bg-foreground text-background font-medium rounded-full hover:opacity-90 transition-all flex items-center gap-2"
          >
            View Projects
            <ArrowRight size={18} />
          </a>
          <a
            href="https://drive.google.com/file/d/1FxqXKWAzpl2jAau1EkrCi8JpYJWmjcYz/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            id="resume-download-btn"
            className="px-8 py-3 border border-border text-foreground font-medium rounded-full hover:bg-white/5 transition-all flex items-center gap-2"
          >
            <Download size={18} />
            Download CV
          </a>
          <div className="flex gap-4 sm:ml-4">
            <a href="https://github.com/muhammadhananbaloch" target="_blank" rel="noopener noreferrer" className="p-3 text-muted-foreground hover:text-foreground transition-colors" aria-label="GitHub">
              <Github size={22} />
            </a>
            <a href="https://www.linkedin.com/in/muhammadhananbaloch/" target="_blank" rel="noopener noreferrer" className="p-3 text-muted-foreground hover:text-foreground transition-colors" aria-label="LinkedIn">
              <Linkedin size={22} />
            </a>
          </div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1, duration: 1 }}
        className="mt-12 animate-bounce"
      >
        <ChevronDown size={24} className="text-foreground" />
      </motion.div>
    </section>
  );
};

export default Hero;