const e=`# The problem

We started where most teams start: Figma MCP, agents mapping designs to our existing component library. It looked like it worked. It didn't.


The agents had design intent but no implementation truth. They introduced drift between what was designed and what shipped, created redundant components that already existed under a different name, and skipped design tokens for hard-coded values. Every PR needed a human to un-teach the agent what the design file had taught it.

# The decision

Move the source of truth. The component library, not the design file, is the contract an agent builds against.


We manually migrated the library to Storybook and gave every component an agent contract. Contracts enforce complexity layering by atomic level, React best practices, state management rules, and testing and typing standards. An atom's contract is narrow. An organism's contract says what it may compose and what it may not reinvent.


Then we flipped the workflow for designers: prototype code-first, not Figma-to-code.

# The workflow

Every feature starts as a spec, and the spec starts as an interrogation. A human and Claude work through the requirements until the ambiguity is gone. The output is a phased implementation plan.


An orchestrator runs the plan. Claude writes narrow instructions; Codex executes them. Codex is faster and cheaper but prone to hallucination, so it never gets an open-ended prompt. It gets a to-do list. Multi-model review runs the same way: Claude first, Codex second, with Claude scoping what Codex is allowed to judge.


Automated e2e closes the loop. Playwright, Storybook interaction tests, and Cucumber scenarios gate the merge.


One phase of the plan per loop. The orchestrator hands Codex a scoped step, review and e2e run on the result, and a human approves the merge before the next phase starts.

# One feature, end to end

Business users needed to create, manage, and assign business groups that feed batch operations elsewhere in the app. A small CRUD workflow, the kind that usually waits in a backlog behind bigger work. Forever.


A designer took it. I provided the bootstrap app, the MCP tooling, and the starter AGENTS files. He prompted Claude with his own Figma files and got a working prototype that implemented our design system with minimal errors. He used that prototype, not a mockup, to walk stakeholders through the feature.


Then we fixed the component errors it did have and added guardrails to Storybook for each one. The tooling got better because the prototype found its gaps.


Then we ran the migration skill. It runs best-practices agents, runs the tests, scaffolds deployment configs, and strips the leftover agent commentary out of code comments. The prototype came out the other side as a beta app under engineering ownership.

# Designers in the codebase

We built an agent-first application bootstrap so designers can prototype directly in production code. A designer opens the bootstrap, works with the agent against the Storybook contracts, and has a running prototype without waiting on an engineer.


Prototypes and PoCs that earn it get elevated to beta apps through a migration skill, and come under engineering ownership. The hand-off is a migration, not a rewrite.

# The skills

Three custom Claude skills carry the practice:

* **UI migration** — elevates a prototype to a beta app: best-practices agents, test run, deployment scaffolding, and a sweep that removes agent commentary from code comments.
* **Code review** — applies the contracts and standards to a PR before a human sees it. It catches over-render risks and race conditions most often; in React the two are usually the same bug.
* **Designer contribution** — guides designers contributing to the design system toward atomic principles and component health, including treating behaviors as components. Filtering is as modular as appearance.

# What didn't work

We run Lit web components alongside React. React 19 treats web components as first-class, so we expected the agents to consume them cleanly. They didn't.


Agents kept bootstrapping web components inside \`useEffect\` with \`document.getElement\` selectors instead of rendering them declaratively. And React's SyntheticEvent system silently drops web-component events when the name doesn't match its camelCasing. No error, no event. Just a button that does nothing and a designer asking why.


The fix was unglamorous: scripts that publish prop and event types for every Lit component so React consumers, human or agent, get a typed surface instead of a guess.

# Outcomes

Designers spend more time in the design and prototyping phase than they did before. That's the cost. The return is that the feedback cycle between design and engineering dropped dramatically, because stakeholders react to running code instead of a mockup and engineers receive a prototype instead of a handoff. Net, the feature ships sooner.

# What I'd tell the next team

UI engineers should own the tooling designers use to vibe code. Design-to-code as written isn't producing healthy code yet, so skip the design part: help your designers function as junior developers instead.
`;export{e as default};
