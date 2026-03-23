import { useParams, Link } from "react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { NavBar } from "../components/NavBar.tsx";
import { FooterSection } from "../components/FooterSection.tsx";
import { CmykRule } from "../components/CmykRule.tsx";
import { GradientLine } from "../components/GradientLine.tsx";
import { AnimatedTechPillList } from "../components/AnimatedTechPillList.tsx";
import { MarkdownBody } from "../components/MarkdownBody.tsx";
import { PageTransition } from "../components/PageTransition.tsx";
import { getProjectBySlug, projects } from "../data/projects.ts";
import { HOME_SECTION, type HomeLocationState } from "../nav.ts";

export default function CaseStudy() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;

  if (!project) {
    return (
      <PageTransition>
        <NavBar />
        <section className="min-h-screen bg-cmyk-key flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-white text-4xl font-bold mb-4">
              Project Not Found
            </h1>
            <Link
              to="/"
              state={{ scrollTo: HOME_SECTION.work } satisfies HomeLocationState}
              className="text-cmyk-cyan text-sm tracking-widest uppercase hover:opacity-70 transition-opacity"
            >
              ← Back to work
            </Link>
          </div>
        </section>
      </PageTransition>
    );
  }

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const prev = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const next =
    currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <PageTransition>
      <NavBar />

      {/* Hero */}
      <section className="relative bg-cmyk-key pt-32 pb-20 overflow-hidden">
        <div
          className="absolute -bottom-10 -right-5 text-[25vw] font-bold text-transparent leading-none select-none z-0 hidden md:block [-webkit-text-stroke:1px_rgba(255,255,255,0.04)] [letter-spacing:-0.05em]"
        >
          {project.index}
        </div>

        <div className="relative z-1 max-w-5xl mx-auto px-6">
          <Link
            to="/"
            state={{ scrollTo: HOME_SECTION.work } satisfies HomeLocationState}
            className="inline-flex items-center gap-2 text-gray-500 text-sm tracking-widest uppercase mb-12 hover:text-white transition-colors no-underline"
          >
            <ArrowLeft size={14} />
            Back to work
          </Link>

          <div className="flex items-center gap-2 mb-6">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: project.accent }}
            />
            <span
              className="text-xs tracking-[0.2em] font-semibold"
              style={{ color: project.accent }}
            >
              {project.type.toUpperCase()}
            </span>
          </div>

          <h1
            className="text-white font-bold tracking-tight leading-[1.05] mb-4"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            {project.company}
          </h1>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-8">
            <span className="text-gray-400 text-[0.9rem]">{project.role}</span>
            <span className="text-gray-600 text-xs font-mono">
              {project.period}
            </span>
          </div>

          <CmykRule className="w-[clamp(200px,30vw,400px)] mb-10" />

          <p className="text-[#aaa] max-w-[640px] leading-relaxed text-lg">
            {project.description}
          </p>

          <AnimatedTechPillList tags={project.tags} className="mt-8" />
        </div>
      </section>

      {/* Content */}
      <section className="relative bg-cmyk-dark py-24 overflow-hidden">
        <GradientLine className="absolute top-0 left-0 right-0" />

        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-16">
              <ContentBlock
                number="01"
                label="THE CHALLENGE"
                accent={project.accent}
                text={project.challenge}
              />
              <ContentBlock
                number="02"
                label="THE APPROACH"
                accent={project.accent}
                text={project.approach}
              />
              <ContentBlock
                number="03"
                label="THE OUTCOME"
                accent={project.accent}
                text={project.outcome}
              />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 border border-white/8 p-7">
                <p className="text-gray-500 text-[0.7rem] tracking-[0.2em] font-semibold mb-6">
                  KEY HIGHLIGHTS
                </p>
                <ul className="space-y-4">
                  {project.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div
                        className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                        style={{ backgroundColor: project.accent }}
                      />
                      <span className="text-gray-300 text-[0.85rem] leading-relaxed">
                        {h}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-6 border-t border-white/8">
                  <p className="text-gray-500 text-[0.7rem] tracking-[0.2em] font-semibold mb-4">
                    TECH STACK
                  </p>
                  <AnimatedTechPillList tags={project.tags} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deep Dive — lazy-loaded markdown body */}
      {project.markdownFile && (
        <section className="bg-cmyk-key py-24 border-t border-white/5">
          <div className="max-w-5xl mx-auto px-6">
            <div className="flex items-center gap-3 mb-12">
              <span
                className="font-mono text-xs opacity-60"
                style={{ color: project.accent }}
              >
                04
              </span>
              <span
                className="text-[0.7rem] tracking-[0.2em] font-semibold"
                style={{ color: project.accent }}
              >
                DEEP DIVE
              </span>
            </div>
            <MarkdownBody filename={project.markdownFile} />
          </div>
        </section>
      )}

      {/* Navigation */}
      <section className="bg-cmyk-key py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex justify-between items-center border-t border-white/10 pt-8">
            {prev ? (
              <Link
                to={`/case-study/${prev.slug}`}
                className="group flex items-center gap-3 no-underline"
              >
                <ArrowLeft
                  size={16}
                  className="text-gray-600 group-hover:text-white transition-colors"
                />
                <div>
                  <p className="text-gray-600 text-[0.65rem] tracking-[0.15em] font-semibold">
                    PREVIOUS
                  </p>
                  <p className="text-gray-400 text-sm group-hover:text-white transition-colors">
                    {prev.company}
                  </p>
                </div>
              </Link>
            ) : (
              <div />
            )}
            {next ? (
              <Link
                to={`/case-study/${next.slug}`}
                className="group flex items-center gap-3 text-right no-underline"
              >
                <div>
                  <p className="text-gray-600 text-[0.65rem] tracking-[0.15em] font-semibold">
                    NEXT
                  </p>
                  <p className="text-gray-400 text-sm group-hover:text-white transition-colors">
                    {next.company}
                  </p>
                </div>
                <ArrowRight
                  size={16}
                  className="text-gray-600 group-hover:text-white transition-colors"
                />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </section>

      <FooterSection />
    </PageTransition>
  );
}

function ContentBlock({
  number,
  label,
  accent,
  text,
}: {
  number: string;
  label: string;
  accent: string;
  text: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <span
          className="font-mono text-xs opacity-60"
          style={{ color: accent }}
        >
          {number}
        </span>
        <span
          className="text-[0.7rem] tracking-[0.2em] font-semibold"
          style={{ color: accent }}
        >
          {label}
        </span>
      </div>
      <p className="text-gray-300 leading-relaxed text-base">{text}</p>
    </div>
  );
}
