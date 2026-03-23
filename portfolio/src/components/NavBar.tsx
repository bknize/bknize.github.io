import { useState } from "react";
import { Link, useLocation } from "react-router";
import { Menu, X } from "lucide-react";
import { useScroll } from "../hooks/useScroll.ts";
import { Logo } from "./Logo.tsx";
import { HOME_SECTION, NAV_LINKS, type HomeLocationState } from "../nav.ts";

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function NavBar() {
  const scrolled = useScroll();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-cmyk-key" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {isHome ? (
          <button
            type="button"
            onClick={() => scrollToSection(HOME_SECTION.hero)}
            className="flex items-center gap-1 cursor-pointer"
          >
            <Logo name="BENKNIZE" tld=".com" className="text-xl tracking-tight" tldClassName="text-white font-semibold text-xl" />
          </button>
        ) : (
          <Link
            to="/"
            state={{ scrollTo: HOME_SECTION.hero } satisfies HomeLocationState}
            className="flex items-center gap-1 no-underline"
          >
            <Logo name="BENKNIZE" tld=".com" className="text-xl tracking-tight" tldClassName="text-white font-semibold text-xl" />
          </Link>
        )}

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ label, sectionId }) =>
            isHome ? (
              <button
                key={label}
                type="button"
                onClick={() => scrollToSection(sectionId)}
                className="text-white font-medium text-sm uppercase tracking-[0.08em] hover:opacity-70 transition-opacity cursor-pointer"
              >
                {label}
              </button>
            ) : (
              <Link
                key={label}
                to="/"
                state={{ scrollTo: sectionId } satisfies HomeLocationState}
                className="text-white font-medium text-sm uppercase tracking-[0.08em] hover:opacity-70 transition-opacity no-underline"
              >
                {label}
              </Link>
            )
          )}
          {isHome ? (
            <button
              type="button"
              onClick={() => scrollToSection(HOME_SECTION.contact)}
              className="bg-cmyk-magenta text-white font-semibold text-xs uppercase tracking-widest px-5 py-2 hover:opacity-90 transition-opacity cursor-pointer"
            >
              Hire Me
            </button>
          ) : (
            <Link
              to="/"
              state={{ scrollTo: HOME_SECTION.contact } satisfies HomeLocationState}
              className="bg-cmyk-magenta text-white font-semibold text-xs uppercase tracking-widest px-5 py-2 hover:opacity-90 transition-opacity no-underline"
            >
              Hire Me
            </Link>
          )}
        </div>

        <button
          type="button"
          className="md:hidden text-white cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-cmyk-key border-t border-white/10 px-6 py-4 flex flex-col gap-4">
          {NAV_LINKS.map(({ label, sectionId }) =>
            isHome ? (
              <button
                key={label}
                type="button"
                onClick={() => {
                  scrollToSection(sectionId);
                  setMenuOpen(false);
                }}
                className="text-white font-medium text-sm uppercase tracking-[0.08em] text-left hover:opacity-70 transition-opacity cursor-pointer"
              >
                {label}
              </button>
            ) : (
              <Link
                key={label}
                to="/"
                state={{ scrollTo: sectionId } satisfies HomeLocationState}
                onClick={() => setMenuOpen(false)}
                className="text-white font-medium text-sm uppercase tracking-[0.08em] text-left hover:opacity-70 transition-opacity no-underline"
              >
                {label}
              </Link>
            )
          )}
          {isHome ? (
            <button
              type="button"
              onClick={() => {
                scrollToSection(HOME_SECTION.contact);
                setMenuOpen(false);
              }}
              className="text-left bg-cmyk-magenta text-white font-semibold text-xs uppercase tracking-widest px-4 py-2 hover:opacity-90 transition-opacity cursor-pointer"
            >
              Hire Me
            </button>
          ) : (
            <Link
              to="/"
              state={{ scrollTo: HOME_SECTION.contact } satisfies HomeLocationState}
              onClick={() => setMenuOpen(false)}
              className="text-left bg-cmyk-magenta text-white font-semibold text-xs uppercase tracking-widest px-4 py-2 hover:opacity-90 transition-opacity no-underline"
            >
              Hire Me
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
