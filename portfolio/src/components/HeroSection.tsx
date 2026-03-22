import { ArrowDown } from "lucide-react";
import { CmykRule } from "./CmykRule.tsx";

const stats = [
  { value: "9+", label: "Years Experience" },
  { value: "100+", label: "Features Shipped" },
  { value: "4", label: "Industries Served" },
];

export function HeroSection() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center bg-cmyk-key overflow-hidden"
    >
      {/* CMYK color block accents */}
      <div className="absolute top-0 right-0 w-[40%] h-full flex-col z-0 flex">
        <div className="flex-1 bg-cmyk-cyan opacity-12" />
        <div className="flex-1 bg-cmyk-magenta opacity-12" />
        <div className="flex-1 bg-cmyk-yellow opacity-8" />
      </div>

      {/* CMYK dots */}
      <div className="absolute top-[120px] right-[60px] z-1 flex gap-3">
        {[
          { color: "bg-cmyk-cyan", border: false },
          { color: "bg-cmyk-magenta", border: false },
          { color: "bg-cmyk-yellow", border: false },
          { color: "bg-cmyk-key", border: true },
        ].map((dot, i) => (
          <div
            key={i}
            className={`w-[18px] h-[18px] rounded-full ${dot.color} ${
              dot.border ? "border-2 border-gray-500" : ""
            }`}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-2 max-w-7xl mx-auto px-6 pt-32 pb-24">
        {/* Status badge */}
        <div className="flex items-center gap-2 mb-8">
          <div className="w-2 h-2 rounded-full bg-cmyk-cyan shadow-[0_0_8px_var(--color-cmyk-cyan)]" />
          <span className="text-cmyk-cyan text-xs tracking-[0.15em] font-medium">
            AVAILABLE FOR WORK
          </span>
        </div>

        {/* Heading */}
        <div className="mb-6">
          <p className="text-gray-500 text-base tracking-[0.2em] font-medium mb-2">
            FRONTEND ENGINEER
          </p>
          <h1
            className="text-white font-bold leading-[1.05] tracking-tight"
            style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
          >
            Ben
            <br />
            <span
              className="text-transparent"
              style={{ WebkitTextStroke: "2px #ffffff" }}
            >
              Knize
            </span>
          </h1>
        </div>

        <CmykRule className="w-[clamp(200px,30vw,400px)] mb-8" />

        <p className="text-[#aaa] max-w-[520px] leading-relaxed text-[1.05rem] mb-10">
          I craft high-performance, visually striking web experiences.
          Specializing in React, TypeScript, and design systems — turning
          complex problems into elegant interfaces.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4 mb-20">
          <button
            onClick={() => scrollToSection("work")}
            className="bg-cmyk-magenta text-white font-semibold text-[0.85rem] uppercase tracking-[0.1em] px-8 py-3.5 hover:opacity-90 transition-opacity cursor-pointer"
          >
            View My Work
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="bg-transparent text-white font-semibold text-[0.85rem] uppercase tracking-[0.1em] px-8 py-3.5 border-2 border-gray-700 hover:border-white transition-colors cursor-pointer"
          >
            Get In Touch
          </button>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap gap-12">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-white font-bold text-3xl tracking-tight leading-none">
                {stat.value}
              </p>
              <p className="text-gray-600 text-xs tracking-[0.1em] mt-1">
                {stat.label.toUpperCase()}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => scrollToSection("tech")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-600 z-2 flex flex-col items-center gap-2 hover:text-white transition-colors cursor-pointer"
      >
        <span className="text-[0.7rem] tracking-[0.15em]">SCROLL</span>
        <ArrowDown size={16} />
      </button>
    </section>
  );
}
