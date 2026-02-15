import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const experiences = [
  {
    title: "AI Engineer",
    company: "JBS Americas and Europe",
    date: "Oct 2025 – Present",
    description:
      "Driving enterprise innovation by architecting autonomous AI systems that solve complex operational challenges. From intelligent voice agents to automated audit pipelines, I design and deploy scalable solutions that streamline workflows, enhance decision-making, and deliver measurable business value.",
    active: true,
  },
];

const Experience = () => {
  return (
    <section id="experience" className="py-24 px-6 bg-surface/30">
      <div className="max-w-4xl mx-auto space-y-12">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-3xl font-semibold text-foreground tracking-tight"
        >
          Experience
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
          className="relative border-l border-white/10 ml-3 space-y-12"
        >
          {experiences.map((exp) => (
            <motion.div key={exp.title} variants={fadeUp} className="relative pl-10 group">
              <div
                className={`absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full ring-4 ring-background transition-colors ${
                  exp.active ? "bg-foreground group-hover:bg-indigo-400" : "bg-muted-foreground/50 group-hover:bg-indigo-400"
                }`}
              />
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
                <h3 className="text-xl font-medium text-foreground">{exp.title}</h3>
                <span className="text-sm font-mono text-muted-foreground">{exp.date}</span>
              </div>
              <div className="text-lg text-foreground mb-2">{exp.company}</div>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">{exp.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;