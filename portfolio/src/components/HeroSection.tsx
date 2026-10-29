import { useEffect, useRef } from "react";
import { ArrowDown } from "lucide-react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { CmykRule } from "./CmykRule.tsx";
import { WIPE_DURATION } from "./PageTransition.tsx";
import { useIsFirstLoad } from "../lib/firstLoad.ts";

const stats = [
  { value: "10", label: "Years Experience" },
  { value: "100+", label: "Features Shipped" },
  { value: "5", label: "Industries Served" },
];

const NAME_SIZE = "clamp(3rem, 8vw, 7rem)";
const NAME_CLASS = "font-bold leading-[1.05] tracking-tight";

/** Starting offsets for the C, M, Y plates that snap into register on load. */
const PLATES = [
  { color: "var(--color-cmyk-cyan)", x: -18, y: -8 },
  { color: "var(--color-cmyk-magenta)", x: 14, y: 6 },
  { color: "var(--color-cmyk-yellow)", x: -6, y: 14 },
];

function NameText({ stroke }: { stroke: string }) {
  return (
    <>
      Ben
      <br />
      <span
        className="text-transparent"
        style={{ WebkitTextStroke: `2px ${stroke}` }}
      >
        Knize
      </span>
    </>
  );
}

/** The name, with three misregistered colour plates that converge then fade. */
function HeroName() {
  const reduceMotion = useReducedMotion();
  const isFirstLoad = useIsFirstLoad();
  const delay = isFirstLoad ? 0.2 : WIPE_DURATION;

  return (
    <div className="relative">
      {!reduceMotion &&
        PLATES.map((plate) => (
          <motion.div
            key={plate.color}
            aria-hidden
            className={`absolute inset-0 pointer-events-none mix-blend-screen ${NAME_CLASS}`}
            style={{ fontSize: NAME_SIZE, color: plate.color }}
            initial={{ x: plate.x, y: plate.y, opacity: 0.9 }}
            animate={{ x: 0, y: 0, opacity: 0 }}
            transition={{
              duration: 1.1,
              ease: [0.22, 1, 0.36, 1],
              delay,
              opacity: { duration: 0.5, delay: delay + 0.8 },
            }}
          >
            <NameText stroke={plate.color} />
          </motion.div>
        ))}
      <h1
        className={`relative text-white ${NAME_CLASS}`}
        style={{ fontSize: NAME_SIZE }}
      >
        <NameText stroke="#ffffff" />
      </h1>
    </div>
  );
}

/** Counts up from 0 when scrolled into view; keeps any suffix like "+". */
function StatValue({ value }: { value: string }) {
  const match = /^(\d+)(.*)$/.exec(value);
  const target = match ? Number(match[1]) : 0;
  const suffix = match ? match[2] : "";
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v).toString());

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, target, { duration: 1.2, ease: "easeOut" });
    return () => controls.stop();
  }, [inView, count, target]);

  if (!match) return <span>{value}</span>;

  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

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
        {/* Heading */}
        <div className="mb-6">
          <p className="text-gray-500 text-base tracking-[0.2em] font-medium mb-2">
            FRONTEND ENGINEER
          </p>
          <HeroName />
        </div>

        <CmykRule className="w-[clamp(200px,30vw,400px)] mb-8" />

        <p className="text-[#aaa] max-w-[520px] leading-relaxed text-[1.05rem] mb-10">
          I craft high-performance, visually striking web experiences.
          Proficient in modern frontend technologies and design systems — turning
          complex problems into elegant interfaces.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4 mb-20">
          <button
            onClick={() => scrollToSection("work")}
            className="bg-cmyk-magenta text-white font-semibold text-[0.85rem] uppercase tracking-[0.1em] px-8 py-3.5 hover:opacity-90 transition-opacity cursor-pointer"
          >
            My Work
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
                <StatValue value={stat.value} />
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
