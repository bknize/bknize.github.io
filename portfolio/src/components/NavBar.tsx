import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useScroll } from "../hooks/useScroll.ts";
import { Logo } from "./Logo.tsx";

const links = ["About", "Tech", "Work", "Contact"];

function scrollTo(id: string) {
  document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
}

export function NavBar() {
  const scrolled = useScroll();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-cmyk-key" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => scrollTo("hero")}
          className="flex items-center gap-1 cursor-pointer"
        >
          <Logo name="BENKNIZE" tld=".com" className="text-xl tracking-tight" tldClassName="text-white font-semibold text-xl" />
        </button>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              className="text-white font-medium text-sm uppercase tracking-[0.08em] hover:opacity-70 transition-opacity cursor-pointer"
            >
              {link}
            </button>
          ))}
          <button
            onClick={() => scrollTo("contact")}
            className="bg-cmyk-magenta text-white font-semibold text-xs uppercase tracking-[0.1em] px-5 py-2 hover:opacity-90 transition-opacity cursor-pointer"
          >
            Hire Me
          </button>
        </div>

        <button
          className="md:hidden text-white cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-cmyk-key border-t border-white/10 px-6 py-4 flex flex-col gap-4">
          {links.map((link) => (
            <button
              key={link}
              onClick={() => {
                scrollTo(link);
                setMenuOpen(false);
              }}
              className="text-white font-medium text-sm uppercase tracking-[0.08em] text-left hover:opacity-70 transition-opacity cursor-pointer"
            >
              {link}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
