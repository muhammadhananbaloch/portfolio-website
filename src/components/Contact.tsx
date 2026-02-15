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
        <h2 className="text-3xl font-semibold text-foreground tracking-tight">Let's Build the Future of Intelligence</h2>
        <p className="text-muted-foreground text-lg leading-relaxed">
          I am always open to discussing autonomous agents, RAG architecture, or how AI can solve your most complex operational bottlenecks. Whether you're looking for a technical partner or just want to talk AI, let's connect.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
          <a
            href="mailto:contact@muhammadhananbaloch.dev"
            className="group flex items-center justify-center gap-3 px-8 py-4 bg-foreground text-background rounded-full font-medium hover:scale-105 transition-all shadow-lg"
          >
            <Mail size={18} />
            <span>Send an Email</span>
          </a>
          
          <a
            href="mailto:contact@muhammadhananbaloch.dev?subject=Consultation%20Request&body=Hi%20Hanan,%20I'd%20like%20to%20discuss%20a%20potential%20AI%20solution..."
            
            /* Added ID for Google Tag Manager tracking */
            id="consultation-btn"
            
            className="group flex items-center justify-center gap-3 px-8 py-4 border border-border rounded-full font-medium text-foreground hover:bg-white/5 transition-all"
          >
            <Calendar size={18} />
            <span>Schedule a Consultation</span>
          </a>
        </div>

        <div className="flex justify-center items-center gap-8 pt-12 opacity-60">
          {[
            { icon: Github, label: "GitHub", href: "https://github.com/muhammadhananbaloch" },
            { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/muhammadhananbaloch/" },
            { icon: Twitter, label: "Twitter", href: "https://x.com/muhammadhanann" },
          ].map(({ icon: Icon, label, href }) => (
            <a 
              key={label} 
              href={href} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-foreground hover:opacity-100 transition-all flex flex-col items-center gap-2 text-muted-foreground"
            >
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