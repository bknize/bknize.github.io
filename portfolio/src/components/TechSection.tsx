import { useRef } from "react";
import { useInView } from "motion/react";
import { cn } from "../lib/utils.ts";
import { AnimatedTechPillList, type CmykColor } from "./AnimatedTechPillList.tsx";
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
  { name: "Lit", category: "lang" },
  { name: "Ionic", category: "lang" },

  { name: "AI-Assisted Engineering", category: "arch" },
  { name: "Spec-Driven Development", category: "arch" },
  { name: "MCP Integrations", category: "arch" },
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
  { name: "Claude Code", category: "lib" },
  { name: "Codex", category: "lib" },
  { name: "Cucumber", category: "lib" },
  { name: "DuckDB-WASM", category: "lib" },
  { name: "GitHub Actions", category: "lib" },

  { name: "Agile", category: "method" },
  { name: "UI/UX Design", category: "method" },
  { name: "CI/CD", category: "method" },
  { name: "Jira", category: "method" },
  { name: "GitHub", category: "method" },
  { name: "GitLab", category: "method" },
  { name: "Azure DevOps", category: "method" },
];

const categoryConfig: Record<Category, { label: string; colorClass: string; dotClass: string; barColor: string; cmyk: CmykColor }> = {
  lang:   { label: "Languages & Frameworks",       colorClass: "text-cmyk-cyan",    dotClass: "bg-cmyk-cyan",    barColor: "#00AEEF", cmyk: "C" },
  arch:   { label: "Architecture & Infrastructure", colorClass: "text-cmyk-magenta", dotClass: "bg-cmyk-magenta", barColor: "#EC008C", cmyk: "M" },
  lib:    { label: "Libraries & Tools",             colorClass: "text-cmyk-yellow",  dotClass: "bg-cmyk-yellow",  barColor: "#FFF200", cmyk: "Y" },
  method: { label: "Versioning & Methodologies",    colorClass: "text-white",        dotClass: "bg-white",        barColor: "#ffffff", cmyk: "K" },
};

const categories: Category[] = ["lang", "arch", "lib", "method"];

/** Stagger index for pills within the tech grid (left-to-right, top-to-bottom categories). */
function pillStaggerIndex(cat: Category): number {
  const i = categories.indexOf(cat);
  return categories.slice(0, i).reduce(
    (sum, c) => sum + techs.filter((t) => t.category === c).length,
    0
  );
}

export function TechSection() {
  const pillsGridRef = useRef<HTMLDivElement>(null);
  const pillsInView = useInView(pillsGridRef, { once: true, margin: "-80px" });

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
          description="Everything I've shipped with, from Aurelia to Lit. The case studies below are what I actually did with it."
        />

        {/* Tech grid */}
        <div
          ref={pillsGridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {categories.map((cat) => {
            const config = categoryConfig[cat];
            const items = techs.filter((t) => t.category === cat);
            const baseIndex = pillStaggerIndex(cat);
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
                <AnimatedTechPillList
                  tags={items.map((t) => t.name)}
                  cmyk={config.cmyk}
                  inView={pillsInView}
                  staggerBaseIndex={baseIndex}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
