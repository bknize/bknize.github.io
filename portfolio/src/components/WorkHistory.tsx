import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router";
import { SectionHeader } from "./SectionHeader.tsx";
import { GradientLine } from "./GradientLine.tsx";
import { projects } from "../data/projects.ts";

export function WorkHistory() {
  return (
    <section
      id="work"
      className="relative bg-cmyk-key py-28 overflow-hidden"
    >
    <GradientLine className="absolute top-0 left-0 right-0" />

      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          sectionLabel="03 / EXPERIENCE"
          titleColorClass="text-cmyk-magenta"
          heading="Work"
          subheading="History"
          description="9+ years building products across industries — from design systems to high-traffic medtech SAAS."
        />

        {/* Projects list */}
        <div className="flex flex-col">
          {projects.map((project, i) => (
            <Link
              key={project.id}
              to={`/case-study/${project.slug}`}
              className={`group block py-8 px-4 no-underline border-b border-white/10 bg-transparent transition-colors duration-200 hover:bg-white/2 ${
                i === 0 ? "border-t border-white/10" : ""
              }`}
              style={{ "--accent": project.accent } as React.CSSProperties}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-start">
                {/* Index */}
                <div className="lg:col-span-1 hidden lg:block">
                  <span
                    className="font-mono text-xs opacity-60 pl-4"
                    style={{ color: project.accent }}
                  >
                    {project.index}
                  </span>
                </div>

                {/* Company + Role */}
                <div className="lg:col-span-3">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <div
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: project.accent }}
                    />
                    <span
                      className="text-[0.65rem] tracking-[0.15em] font-semibold"
                      style={{ color: project.accent }}
                    >
                      {project.type.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-white font-bold text-[1.05rem]">
                    {project.company}
                  </p>
                  <p className="text-gray-400 text-[0.8rem] mt-0.5">
                    {project.role}
                  </p>
                  <p className="text-gray-600 text-xs font-mono mt-1">
                    {project.period}
                  </p>
                </div>

                {/* Description */}
                <div className="lg:col-span-5">
                  <p className="text-gray-400 leading-relaxed text-[0.9rem]">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-white/5 text-gray-400 text-[0.7rem] font-mono px-2.5 py-1 border border-white/8"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="lg:col-span-3 flex lg:justify-end items-start pt-1">
                  <span className="flex items-center gap-2 border border-transparent px-4 py-2 text-[0.8rem] font-semibold tracking-widest text-[#555] transition-colors duration-200 group-hover:border-(--accent) group-hover:text-(--accent)">
                    CASE STUDY
                    <ArrowUpRight size={14} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <p className="text-gray-600 text-xs tracking-widest mt-8 text-right">
          — MORE WORK AVAILABLE ON REQUEST
        </p>
      </div>
    </section>
  );
}
