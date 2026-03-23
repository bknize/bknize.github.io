export type Project = {
  id: number;
  slug: string;
  company: string;
  role: string;
  period: string;
  type: string;
  description: string;
  tags: string[];
  accent: string;
  index: string;
  challenge: string;
  approach: string;
  outcome: string;
  highlights: string[];
  /** Filename (without extension) of the markdown deep-dive in src/assets/ */
  markdownFile?: string;
};

export const projects: Project[] = [
  {
    id: 1,
    slug: "glassman-technology-group",
    company: "Glassman Technology Group",
    role: "Senior Design Engineer",
    period: "2024 – 2025",
    type: "Medtech",
    description:
      "Built a complex workflow for resolving errors in CMS-1500 forms from users or AI agents. Implemented a Tailwind design system across multiple apps and multiple tech stacks.",
    tags: ["React", "TypeScript", "Tailwind", "Figma", "HTMX", "Django"],
    accent: "#00AEEF",
    index: "01",
    challenge:
      "CMS-1500 medical claim forms are notoriously complex, with dozens of interdependent fields and strict validation rules. The existing error-resolution workflow was manual and error-prone, leading to costly claim rejections.",
    approach:
      "Designed a guided error-resolution interface that walks users and AI agents through each validation issue step-by-step. Built a shared Tailwind-based design system that unified the UI across React and Django/HTMX frontends, enabling consistent UX regardless of tech stack.",
    outcome:
      "Reduced claim rejection rates significantly and cut error-resolution time. The shared design system enabled faster feature delivery across both applications with a single source of truth for UI components.",
    highlights: [
      "Unified design system across React and HTMX/Django stacks",
      "AI-assisted error resolution workflow for CMS-1500 forms",
      "Cross-stack component library with Tailwind",
      "Collaborative design-to-dev pipeline with Figma",
    ],
    markdownFile: "cmsedit",
  },
  {
    id: 2,
    slug: "venminder-design-system",
    company: "Venminder",
    role: "Senior Frontend Engineer",
    period: "2021 – 2024",
    type: "Design System",
    description:
      "Architected and launched a bespoke component library for Venminder's UI framework in partnership with the design team. Led the Frontend Guild, responsible for UI quality across all product teams.",
    tags: ["TypeScript", "SASS", "Figma", "Storybook"],
    accent: "#EC008C",
    index: "02",
    challenge:
      "Venminder's fintech platform had accumulated years of inconsistent UI patterns across multiple product teams. Design-to-dev handoff was slow and error-prone, with no shared component vocabulary.",
    approach:
      "Partnered with the design team to audit existing patterns, establish a token system, and build a comprehensive component library from the ground up. Implemented Storybook as the single source of truth, with automated visual regression testing and accessibility audits baked into CI.",
    outcome:
      "Reduced design-to-dev handoff time and eliminated visual inconsistencies across the platform. The library became the foundation for all new feature development.",
    highlights: [
      "Bespoke component library with TypeScript and SASS",
      "Storybook-driven development with visual regression testing",
      "Design token system bridging Figma and code",
      "Led front-end quality initiatives across product teams",
    ],
    markdownFile: "vmlibrary",
  },
  {
    id: 3,
    slug: "venminder-state-management",
    company: "Venminder",
    role: "Senior Frontend Engineer",
    period: "2021 – 2024",
    type: "Fintech SAAS",
    description:
      "Engineered state management system for Venminder's Fintech SAAS.",
    tags: ["TypeScript", "Redux", "State Management"],
    accent: "#FFF200",
    index: "03",
    challenge:
      "The application's state layer had grown organically into a tangle of ad-hoc patterns: prop drilling, scattered local state, and inconsistent data fetching. This made features slow to build and bugs hard to trace.",
    approach:
      "Designed a normalized Redux architecture with clear domain boundaries, typed selectors, and middleware for side effects. Introduced patterns for optimistic updates and cache invalidation that the team could follow consistently.",
    outcome:
      "Stabilized the data layer and dramatically reduced state-related bugs. New features that previously took weeks could be built in days thanks to predictable data flow and reusable selector patterns.",
    highlights: [
      "Normalized Redux store architecture",
      "Typed selectors and middleware patterns",
      "Optimistic update and cache invalidation strategies",
      "Team-wide state management conventions",
    ],
    markdownFile: "questionnaires",
  },
  {
    id: 4,
    slug: "cse-software",
    company: "CSE Software",
    role: "Frontend Engineer",
    period: "2018 – 2021",
    type: "Industrial",
    description:
      "Built data-dense CRUD interfaces for industrial equipment management systems.",
    tags: ["Angular", "Vue", "TypeScript", "SASS"],
    accent: "#ffffff",
    index: "04",
    challenge:
      "Industrial equipment management requires displaying large volumes of hierarchical data (asset trees, maintenance schedules, sensor readings) in interfaces that field technicians can navigate efficiently on tablets and desktops.",
    approach:
      "Built performant data-grid components with virtual scrolling, inline editing, and real-time filtering. Worked across Angular and Vue codebases depending on the client, maintaining consistent UX patterns through a shared SASS design framework.",
    outcome:
      "Delivered multiple client projects on time with interfaces that handled thousands of records without lag. The shared design framework accelerated onboarding for new projects.",
    highlights: [
      "Virtualized data grids for large datasets",
      "Cross-framework development (Angular & Vue)",
      "Shared SASS design framework across projects",
      "Tablet-optimized interfaces for field use",
    ],
    markdownFile: "infinitetree",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
