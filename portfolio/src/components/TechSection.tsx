import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { cn } from "../lib/utils.ts";
import { SectionHeader } from "./SectionHeader.tsx";

type Category = "lang" | "arch" | "lib" | "method";

type Tech = {
  name: string;
  category: Category;
};

const techs: Tech[] = [
  { name: "React", category: "lang" },
  { name: "CSS3", category: "lang" },
  { name: "HTML5", category: "lang" },
  { name: "JavaScript", category: "lang" },
  { name: "TypeScript", category: "lang" },
  { name: "Angular", category: "lang" },
  { name: "Vue", category: "lang" },
  { name: "Aurelia", category: "lang" },
  { name: "Tailwind", category: "lang" },
  { name: "SASS", category: "lang" },
  { name: "Bootstrap", category: "lang" },

  { name: "AI Integration", category: "arch" },
  { name: "Design Systems", category: "arch" },
  { name: "Component-based Architecture", category: "arch" },
  { name: "Atomic Design", category: "arch" },
  { name: "State Management", category: "arch" },
  { name: "Performance Optimization", category: "arch" },
  { name: "Responsive Design", category: "arch" },
  { name: "REST APIs", category: "arch" },
  { name: "Accessibility", category: "arch" },

  { name: "MUI", category: "lib" },
  { name: "Redux", category: "lib" },
  { name: "MobX", category: "lib" },
  { name: "NgRx", category: "lib" },
  { name: "rxjs", category: "lib" },
  { name: "Playwright", category: "lib" },
  { name: "Selenium", category: "lib" },
  { name: "Swagger", category: "lib" },
  { name: "Postman", category: "lib" },
  { name: "Figma", category: "lib" },
  { name: "Storybook", category: "lib" },
  { name: "D3", category: "lib" },
  { name: "React Motion", category: "lib" },
  { name: "Chart.js", category: "lib" },
  { name: "npm", category: "lib" },
  { name: "Vite", category: "lib" },

  { name: "Agile", category: "method" },
  { name: "UI/UX Design", category: "method" },
  { name: "CI/CD", category: "method" },
  { name: "Jira", category: "method" },
  { name: "GitHub", category: "method" },
  { name: "GitLab", category: "method" },
  { name: "Azure DevOps", category: "method" },
];

const categoryConfig: Record<Category, { label: string; colorClass: string; dotClass: string; bgStyle: string; borderStyle: string; barColor: string }> = {
  lang:   { label: "Languages & Frameworks",      colorClass: "text-cmyk-cyan",    dotClass: "bg-cmyk-cyan",    bgStyle: "rgba(0,174,239,0.08)",   borderStyle: "#00AEEF25", barColor: "#00AEEF" },
  arch:   { label: "Architecture & Infrastructure", colorClass: "text-cmyk-magenta", dotClass: "bg-cmyk-magenta", bgStyle: "rgba(236,0,140,0.08)",   borderStyle: "#EC008C25", barColor: "#EC008C" },
  lib:    { label: "Libraries & Tools",            colorClass: "text-cmyk-yellow",  dotClass: "bg-cmyk-yellow",  bgStyle: "rgba(255,242,0,0.08)",   borderStyle: "#FFF20025", barColor: "#FFF200" },
  method: { label: "Versioning & Methodologies",   colorClass: "text-white",        dotClass: "bg-white",        bgStyle: "rgba(255,255,255,0.06)", borderStyle: "#ffffff25", barColor: "#ffffff" },
};

const categories: Category[] = ["lang", "arch", "lib", "method"];

const proficiencies = [
  { skill: "React / TypeScript", pct: 96, color: "#EC008C" },
  { skill: "UI Design / Figma", pct: 85, color: "#00AEEF" },
  { skill: "UI Architecture", pct: 92, color: "#FFF200" },
  { skill: "Performance Optimization", pct: 87, color: "#ffffff" },
];

function ProgressBar({ pct, color }: { pct: number; color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="h-1 bg-white/8 relative">
      <motion.div
        className="absolute left-0 top-0 h-full"
        style={{ backgroundColor: color }}
        initial={{ width: "0%" }}
        animate={{ width: inView ? `${pct}%` : "0%" }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
      />
    </div>
  );
}

export function TechSection() {
  return (
    <section
      id="tech"
      className="relative bg-cmyk-dark py-28 overflow-hidden"
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 80% 20%, rgba(0,174,239,0.05) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(236,0,140,0.05) 0%, transparent 50%)",
        }}
      />

      <div className="relative z-1 max-w-7xl mx-auto px-6">
        <SectionHeader
          sectionLabel="02 / SKILLS"
          titleColorClass="text-cmyk-cyan"
          heading="Tech"
          subheading="Stack"
          description="A collection of languages, frameworks, and tools I work with every day to build great products."
        />

        {/* Tech grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((cat) => {
            const config = categoryConfig[cat];
            const items = techs.filter((t) => t.category === cat);
            return (
              <div key={cat} className="border border-white/8 p-7">
                <div className="flex items-center gap-3 mb-6">
                  <div className={cn("w-2.5 h-2.5 rounded-full", config.dotClass)} />
                  <span
                    className={cn(
                      "text-[0.7rem] tracking-[0.2em] font-semibold",
                      config.colorClass
                    )}
                  >
                    {config.label.toUpperCase()}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {items.map((tech) => (
                    <div
                      key={tech.name}
                      className="flex items-center gap-2 px-3.5 py-1.5"
                      style={{
                        backgroundColor: config.bgStyle,
                        border: `1px solid ${config.borderStyle}`,
                      }}
                    >
                      <span className="text-white text-[0.85rem] font-medium">
                        {tech.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Proficiency bars */}
        <div className="border border-white/8 mt-8 p-7">
          <p className="text-gray-600 text-xs tracking-[0.2em] mb-6">
            CORE PROFICIENCIES
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {proficiencies.map((item) => (
              <div key={item.skill}>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-300 text-[0.85rem] font-medium">
                    {item.skill}
                  </span>
                  <span
                    className="text-[0.8rem] font-mono"
                    style={{ color: item.color }}
                  >
                    {item.pct}%
                  </span>
                </div>
                <ProgressBar pct={item.pct} color={item.color} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
