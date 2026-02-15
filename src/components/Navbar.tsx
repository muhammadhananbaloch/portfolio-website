import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 glass-nav">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="text-foreground font-semibold tracking-tight text-lg flex items-center gap-3 group">
          
          {/* Added 'mt-[2px]' to push the dot down slightly for visual alignment */}
          <div className="relative flex h-3 w-3 items-center justify-center mt-[2px]">
             <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-20 group-hover:opacity-40 transition-opacity"></span>
             <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
          </div>

          <span>Muhammad Hanan Baloch</span>
        </a>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="px-4 py-2 bg-foreground text-background rounded-full hover:opacity-90 transition-opacity"
          >
            Contact Me
          </a>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="absolute top-16 left-0 w-full bg-surface border-b border-border p-6 flex flex-col gap-4 md:hidden">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-muted-foreground hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
          <a href="#contact" onClick={() => setOpen(false)} className="text-foreground font-semibold">
            Contact Me
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
