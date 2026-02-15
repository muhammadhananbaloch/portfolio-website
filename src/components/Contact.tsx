import { Mail, Calendar, Github, Linkedin, Twitter } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Contact = () => {
  return (
    <section id="contact" className="py-24 px-6 border-t border-white/5 bg-gradient-to-b from-background to-surface/20">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-3xl mx-auto text-center space-y-8"
      >
        <h2 className="text-3xl font-semibold text-foreground tracking-tight">Ready to build something intelligent?</h2>
        <p className="text-muted-foreground text-lg leading-relaxed">
          I'm currently looking for new opportunities to apply my skills in Python Automation and AI Engineering. Whether you have a question or just want to say hi, I'll try my best to get back to you!
        </p>

        <div className="flex justify-center gap-6 pt-6">
          <a
            href="mailto:muhammadhananbaloch@outlook.com"
            className="group flex items-center gap-3 px-6 py-3 bg-foreground text-background rounded-lg font-medium hover:scale-105 transition-transform"
          >
            <Mail size={18} />
            <span>Send Email</span>
          </a>
          <a
            href="#"
            className="group flex items-center gap-3 px-6 py-3 border border-border rounded-lg font-medium text-foreground hover:bg-white/5 transition-colors"
          >
            <Calendar size={18} />
            <span>Book a Call</span>
          </a>
        </div>

        <div className="flex justify-center items-center gap-8 pt-12 opacity-60">
          {[
            { icon: Github, label: "GitHub" },
            { icon: Linkedin, label: "LinkedIn" },
            { icon: Twitter, label: "Twitter" },
          ].map(({ icon: Icon, label }) => (
            <a key={label} href="#" className="hover:text-foreground hover:opacity-100 transition-all flex flex-col items-center gap-2 text-muted-foreground">
              <Icon size={24} />
              <span className="text-xs">{label}</span>
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
