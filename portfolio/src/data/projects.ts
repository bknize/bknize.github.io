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
    id: 5,
    slug: "atpco-agentic-ui",
    company: "ATPCO",
    role: "Sr. UX Engineer",
    period: "2025 – Present",
    type: "Travel Data SaaS",
    description:
      "Moved a UX team's AI agents off Figma and onto Storybook, with per-component contracts and a bootstrap that lets designers prototype in production code. Built 1.4M-record filtering and graphing UI streamed with DuckDB-WASM.",
    tags: ["React", "Angular", "Lit", "Storybook MCP", "Claude Code", "DuckDB-WASM", "Playwright"],
    accent: "#00AEEF",
    index: "01",
    challenge:
      "Agents mapping Figma designs to the component library through Figma MCP produced drift, duplicated components, and hard-coded values where design tokens should have been. Every PR needed a human to un-teach the agent what the design file had taught it.",
    approach:
      "Moved the source of truth from Figma to Storybook. Migrated the component library with per-component agent contracts that enforce atomic layering, React best practices, state management rules, and typing and testing standards. Flipped designers to code-first prototyping through an agent-first bootstrap, and built a migration skill that elevates their prototypes to beta apps under engineering ownership. Claude scopes every instruction Codex executes, in both the orchestrator and multi-model review.",
    outcome:
      "Designers spend more time in the prototyping phase and far less in the feedback loop with engineering: stakeholders react to running code, and engineers receive a prototype instead of a handoff. Net, features ship sooner.",
    highlights: [
      "Storybook MCP with per-component agent contracts",
      "Spec-driven delivery: interrogation → phased plan → orchestrator",
      "Agent-first bootstrap for designer prototyping",
      "Migration skill from prototype to beta app",
      "Typed Lit → React bridge for web-component events",
    ],
    markdownFile: "agentic",
  },
  {
    id: 1,
    slug: "glassman-technology-group",
    company: "Glassman Technology Group",
    role: "Software Design Engineer",
    period: "2024 – 2025",
    type: "Medtech",
    description:
      "Built a complex workflow for resolving errors in CMS-1500 forms from users or AI agents. Implemented a Tailwind design system across multiple apps and multiple tech stacks.",
    tags: ["React", "TypeScript", "Tailwind", "Figma", "HTMX", "Django"],
    accent: "#EC008C",
    index: "02",
    challenge:
      "About a million CMS-1500 forms a year go through AI transcription. Even at an optimistic 99%, that's thousands of bad reads, on top of whatever the humans got wrong first. Someone has to fix them, and the fixing UI didn't exist yet.",
    approach:
      "Three columns: the claim list, the transcribed data, and the original PDF, with every field linked to a hotspot on the form so focusing one zooms the other. Claim data renders the same way everywhere it appears, so users always know where to look. Every edit validates against the same backend logic the pipeline uses. Tailwind glued the React app to the older Django views so nobody could tell where one ended.",
    outcome:
      "Rejection rates went down, resolution time went down, and both apps now draw from one design system, so a feature built for one ships in the other without a redesign.",
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
    role: "Senior Software Engineer",
    period: "2021 – 2024",
    type: "Design System",
    description:
      "Architected and launched a bespoke component library for Venminder's UI framework in partnership with the design team. Led the Frontend Guild, responsible for UI quality across all product teams.",
    tags: ["Aurelia", "TypeScript", "SASS", "Figma", "Storybook"],
    accent: "#FFF200",
    index: "03",
    challenge:
      "Twelve-ish Aurelia components, undocumented, untyped, and a select with thirty bindable properties. Nobody wanted to use them, so every team rebuilt its own. Aurelia also doesn't scope CSS, so styles leaked everywhere.",
    approach:
      "Co-led the Frontend Guild and sat in on the UX team's weekly to build vm-library: a toolbox of small atomic pieces instead of one plug-and-play library. Buttons became CSS-only. The select got a sledgehammer. The grid became one component per table tag, with the config living in the markup. We demoed and tested everything in a homebrewed UI app while reviving the abandoned Aurelia Storybook fork.",
    outcome:
      "80% of legacy grids replaced within a year, every one that could fit in a sprint. Figma parity hovered around 70%, which was honest for the tools we had. The library became the base for all new UI work.",
    highlights: [
      "Bespoke component library with TypeScript and SASS",
      "Homebrewed demo app for component review while reviving the Aurelia Storybook fork",
      "Design token system bridging Figma and code",
      "Led frontend quality initiatives across product teams",
    ],
    markdownFile: "vmlibrary",
  },
  {
    id: 3,
    slug: "venminder-state-management",
    company: "Venminder",
    role: "Senior Software Engineer",
    period: "2021 – 2024",
    type: "Fintech SAAS",
    description:
      "Built the state layer, side-effects library, and 400k-record filtering for Venminder's questionnaire CMS, on Aurelia, with polling instead of sockets.",
    tags: ["Aurelia", "TypeScript", "Redux", "RxJS", "Chart.js", "State Management"],
    accent: "#ffffff",
    index: "04",
    challenge:
      "Aurelia's store is Redux-flavored but bare: no slices, no effects, plenty of prop drilling and ad-hoc patterns. Then product asked for Google-Docs-style concurrent editing and bulk operations on up to 400,000 records, for clients whose IT departments block web sockets.",
    approach:
      "Wrote an NgRx-style side-effects layer and an RTK-style factory so every async slice came with loading, loaded, and error for free. Locking went per-question instead of per-questionnaire, driven by an RxJS stream of focus, tab, and save events throttled to one heartbeat every two minutes. For the 400k records we built a virtual-scroll proof of concept, hammered the scroll wheel, and threw it out. Filtering plus pagination with two pages preloaded got people to their row faster.",
    outcome:
      "Concurrent editors see each other's locks without blowing the request budget, and a client with 400k records gets the same experience as one with 300. State is observable, so charts update from the same filtered stream as the grid, and Redux devtools work.",
    highlights: [
      "RTK-style async slice factory on aurelia-store",
      "NgRx-style side-effects middleware",
      "Per-question edit locks on a two-minute polling budget",
      "400k-record filtering and pagination with preloaded pages",
    ],
    markdownFile: "questionnaires",
  },
  {
    id: 4,
    slug: "cse-software",
    company: "CSE Software",
    role: "Frontend Engineer",
    period: "2016 – 2021",
    type: "Industrial",
    description:
      "Built hybrid mobile and tablet apps for Caterpillar — an Ionic launcher for machine simulation programs and a PWA for assessing remote job sites — alongside data-dense Angular interfaces for industrial equipment management.",
    tags: ["Angular", "Ionic", "PWA", "Vue", "TypeScript", "NgRx"],
    accent: "#ffffff",
    index: "05",
    challenge:
      "A service-cost tool for Caterpillar machinery: a tree of parts, labor, and sub-parts with no known depth and no known size, used by the same people for eight hours a day. The jQuery version loaded everything at once and worked in the sense that it didn't immediately crash.",
    approach:
      "Stopped treating it as a tree. Every record went into NgRx as a flat row with a parent ID and a depth, so the list could virtual-scroll and expand nodes in place. Fetches queued through RxJS with a concurrency cap, skeleton rows held the spot while children loaded, and drag-and-drop stayed within siblings because cross-branch moves weren't worth the bookkeeping.",
    outcome:
      "Arbitrarily large, arbitrarily deep, still responsive, with inline CRUD that survives a row scrolling out of view. The CAT field apps ran on the same discipline: Ionic for the simulator launcher, a PWA for remote job sites.",
    highlights: [
      "Ionic + PWA field apps for Caterpillar",
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
