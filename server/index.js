import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, UNSAFE_withComponentProps, Outlet, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse, Meta, Links, ScrollRestoration, Scripts, Link } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import { makeAutoObservable } from "mobx";
import { index } from "@react-router/dev/routes";
import { useInView, useTransform, useScroll, motion } from "motion/react";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  if (request.method.toUpperCase() === "HEAD") {
    return new Response(null, {
      status: responseStatusCode,
      headers: responseHeaders
    });
  }
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    let timeoutId = setTimeout(
      () => abort(),
      streamTimeout + 1e3
    );
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough({
            final(callback) {
              clearTimeout(timeoutId);
              timeoutId = void 0;
              callback();
            }
          });
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          pipe(body);
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
const frameProportion = 1.78;
const frames = 25;
function useAspectResize(ref) {
  useEffect(() => {
    const resize = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      let width, height;
      if (windowWidth / windowHeight > frameProportion) {
        width = windowWidth;
        height = width / frameProportion;
      } else {
        height = windowHeight;
        width = height * frameProportion;
      }
      window.requestAnimationFrame((time) => {
        if (!!ref) {
          const current = ref.current;
          current.style.width = width * frames + "px";
          current.style.height = height + "px";
        }
      });
    };
    window.addEventListener("resize", resize);
    resize();
    return () => window.removeEventListener("resize", resize);
  }, []);
}
class SplatterBus2 {
  currentSection = {
    name: "",
    sprite: "",
    paint: ""
  };
  constructor() {
    makeAutoObservable(this);
  }
  setSection(section) {
    this.currentSection = { ...section };
  }
  get section() {
    return this.currentSection;
  }
}
const splatterBus2 = new SplatterBus2();
const PaintSplatter = observer(() => {
  const container = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const firstSplatter = useRef(true);
  const { sprite, paint, name } = splatterBus2.section;
  useAspectResize(container);
  useEffect(() => {
    if (!!name && !!paint) {
      if (firstSplatter.current && name === "title") {
        firstSplatter.current = false;
      } else {
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 1e3);
      }
    }
  }, [name]);
  return /* @__PURE__ */ jsx("div", { className: `transition-container`, style: {
    backgroundColor: paint
  }, children: /* @__PURE__ */ jsx(
    "div",
    {
      ref: container,
      style: { backgroundImage: `url("${sprite}")` },
      className: `transition-layer ${isAnimating ? "__animate" : ""}`
    }
  ) });
});
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Fjalla+One&family=Libre+Baskerville:ital,wght@0,400..700;1,400..700&display=swap"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(PaintSplatter, {}), /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = UNSAFE_withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
const ink = "/bknize.github.io/assets/ink_3-C6DBppdB.png";
const portrait = "/bknize.github.io/assets/pic-CLAtSfhn.jpg";
const copy = {
  body: [
    `I'm a frontend engineer based in Peoria IL aka Whiskey Capital of the World circa 1837 to 1920.
    `,
    `I have 9+ years in design, development, UI & UX. I've worked in behemoth enterprise teams and lean SAAS startups. I like happy users and maintainable code.
    `
  ],
  experience: [
    {
      id: "softwaredesignengineer",
      "title": "Software Design Engineer",
      "year": "2024 - 2025",
      "copy": "Responsible for unified and frictionless User Experience across multiple apps and multiple tech stacks. Codified user flows, enforced standards, implemented design systems prototyped in Figma.",
      projects: [
        {
          id: "uioverhaul",
          "title": "UI Overhaul",
          // "slug": "cmsedit",
          "copy": "Built a React MUI integration for json-schema-form library, adding advanced UI features such as loading animations, error handling, theming, and Redux state tooling to existing user input components, while scoping the changes to feature flags.",
          "tech": ["React", "TypeScript", "MUI", "Tailwind", "Redux", "Gitlab", "Bootstrap"]
        },
        {
          id: "cmsedit",
          "title": "CMS Edit",
          // "slug": "cmsedit",
          "copy": "Data-dense workflow for resolving errors in cms-1500 forms from users or AI Agents. Inputs validated by locale. CRUD-able tabular data, with navigable PDF viewer.",
          "tech": ["React", "TypeScript", "MUI", "Tailwind", "Redux", "HTMX", "Django", "AI", "Figma", "Agile", "Gitlab", "Bootstrap", "SCSS"]
        }
      ]
    },
    {
      id: "seniorfrontendengineer",
      "title": "Senior Frontend Engineer",
      "year": "2021 - 2024",
      "copy": "Developed and maintained a bespoke UI component library in partnership with the UX team. Co-lead a front-end team responsible for UI quality control by organizing initiatives and reviewing pull requests in Azure Devops.",
      "projects": [
        {
          id: "questionnaire",
          "title": "Questionnaire",
          // "slug": "questionnaires",
          "copy": "Architected and implemented new features for flagship Questionnaires product: user concurrency, query building for batch operations, custom redux tooling.",
          "tech": ["Aurelia", "TypeScript", "Redux", "SASS", "Jira", "Devops", "Agile"]
        },
        {
          id: "vmlibrary",
          "title": "vm-library",
          // "slug": "vmlibrary",
          "copy": "Served as frontend team liaison to Product team, and co-lead initiatives to transform custom component designs into reusable Aurelia library. Achieved over 80% adoption rate over legacy components.",
          "tech": ["Aurelia", "TypeScript", "SASS", "Figma", "Storybook"]
        }
      ]
    },
    {
      id: "frontenddeveloper",
      "title": "Frontend Developer",
      "year": "2018 - 2021",
      "copy": "Balanced multiple concurrent clients. Mentored juniors, wrote code quality and design standards. Lead a front-end team, and performed SME duties in quoting and sales meetings.",
      "projects": [
        {
          id: "machineservice",
          "title": "Machine Service CRUD",
          // "slug": "servicecrud",
          "copy": "Optimized UI for viewing and editing heavy machine service costs by implementing concurrency limits, list virtualization, async loading states, and centralized state management, allowing users to navigate an arbitrary amount of indeterminately-deeply nested records, and have their edits bubble up the hierarchy.",
          "tech": ["Angular", "Material", "TypeScript", "SASS", "OData", "Devops", "Jira", "Agile"]
        },
        {
          id: "vuemicroui",
          "title": "Vue Micro-UI",
          "copy": "Updated legacy MVC apps with advanced forms via Vue.js, allowing the team to make surgical UX improvements to critical features without necessitating a rebuild of the base app.",
          "tech": ["Vue", "MVC", "Material", "Bootstrap", "TypeScript", "SASS"]
        }
      ]
    },
    {
      id: "multimediadeveloper",
      "title": "Multimedia Developer",
      "year": "2016 - 2018",
      "copy": "Authored and deployed industrial and medical eLearning web content and maintained Wordpress marketing sites for Fortune 500 clients, operating within corporate brand guides.",
      "projects": [
        {
          id: "microlms",
          "title": "Micro LMS",
          "copy": "Created a micro-LMS platform to render XML, image, video, and interactive eLearning content responsively, with integrated LMS reporting via SCORM.",
          "tech": ["Vue", "JavaScript", "CSS"]
        }
      ]
    }
  ],
  "qualifications": [
    {
      "opener": "Decision maker able to balance multiple business and technical requirements.",
      "copy": "Ensured health insurance claim workflows were seamless, consistent, and functional across all screen sizes, very low-power or old devices, and across both insurance provider users and end-user clients. Negotiated MVP acceptance criteria with technical SMEs and stakeholders."
    },
    {
      "opener": "Agent of systems for consistent, accessible UX.",
      "copy": "Proposed and implemented Material for desktop and mobile devices for insurance claim submission and progress-tracking app. Consulted on and implemented a bespoke in-house design system in close relationship to Product and Design teams."
    },
    {
      "opener": "Experience developing, implementing, and maintaining modular UI component libraries.",
      "copy": "Designed and built high-level components to streamline repeated user workflow patterns across a variety of frontend technologies including React, MUI, Django, Tailwind, and HTMX. Proposed and implemented a refactor of in-house component system towards smaller, declarative, and granular components to increase adoption rate among full-stack teams by focusing on developer experience."
    },
    {
      "opener": "Passionate about resolving technical debt.",
      "copy": "Groomed and authored technical and design debt backlog and advocated for debt stories in sprint planning. Planned, prioritized, and refactored UI via effective use of software design patterns, advanced state management tooling and architecture, and relying on critical thinking to prevent bugs and debt before they happen."
    },
    {
      "opener": "Experience writing, implementing, and enforcing UI code standards at all layers of the SDLC.",
      "copy": "Authored documentation, IDE and linting configs, massaged CI/CD build server tools to ensure consistent and clean Typescript, SASS style and best practices."
    },
    {
      "opener": "Avid writer of documentation.",
      "copy": "Earned reputation for prolific and thorough documentation of components, utilities, and tooling. Opinionated about Git commit style and branch strategy."
    },
    {
      "opener": "Valuable ambassador to Product and Design teams.",
      "copy": "Background in Graphic Design provided first-hand knowledge of design fundamentals and priorities, creating shared context in communicating with Product and Design teams. Routinely invited to whiteboard with designers in Figma."
    },
    {
      "opener": "Influential participant in elevating the team.",
      "copy": "Advocate for improving Agile processes and enthusiastic mentor to junior engineers."
    }
  ]
};
[
  index("routes/Home.tsx")
  // route("/case/:slug", "routes/CaseStudy.tsx")
];
const Title = ({ ...props }) => {
  const { className, ...style } = props;
  return /* @__PURE__ */ jsxs("svg", { "aria-label": "Ben Knize", ...className && { className }, viewBox: "0 0 856 194", version: "1.1", xmlns: "http://www.w3.org/2000/svg", style: { fillRule: "evenodd", clipRule: "evenodd", strokeLinejoin: "round", strokeMiterlimit: 2, ...style }, children: [
    /* @__PURE__ */ jsx("path", { vectorEffect: "non-scaling-stroke", d: "M0,0L29.682,0C36.253,0 43.05,0.415 50.074,1.246C57.098,2.077 63.631,3.908 69.673,6.741C75.715,9.573 80.606,13.935 84.344,19.826C88.083,25.717 89.952,33.723 89.952,43.843L89.952,53.246C89.952,63.518 87.516,71.882 82.645,78.34C77.773,84.797 72.354,89.121 66.388,91.312L66.388,92.218C75.149,95.692 81.795,100.677 86.327,107.172C90.858,113.667 93.124,122.655 93.124,134.135L93.124,143.991C93.124,154.489 91.444,163.005 88.083,169.538C84.722,176.071 80.134,181.075 74.318,184.549C68.503,188.023 61.856,190.383 54.379,191.63C46.902,192.876 39.047,193.499 30.815,193.499L0,193.499L0,0ZM34.44,82.815C42.295,82.815 48.564,80.87 53.246,76.98C57.929,73.091 60.27,66.614 60.27,57.551L60.27,49.621C60.27,40.633 58.382,33.685 54.606,28.776C50.829,23.866 44.107,21.412 34.44,21.412L29.342,21.412L29.342,82.815L34.44,82.815ZM37.159,172.087C45.014,172.087 51.264,170.142 55.908,166.253C60.553,162.363 62.876,155.887 62.876,146.823L62.876,131.756C62.876,122.693 61.007,115.725 57.268,110.854C53.529,105.983 46.826,103.547 37.159,103.547L29.342,103.547L29.342,172.087L37.159,172.087Z", style: { fillRule: "nonzero" } }),
    /* @__PURE__ */ jsx("path", { vectorEffect: "non-scaling-stroke", d: "M117.708,0L191.686,0L191.686,23.111L147.05,23.111L147.05,81.002L182.057,81.002L182.057,104.113L147.05,104.113L147.05,170.388L191.686,170.388L191.686,193.499L117.708,193.499L117.708,0Z", style: { fillRule: "nonzero" } }),
    /* @__PURE__ */ jsx("path", { vectorEffect: "non-scaling-stroke", d: "M209.246,0L232.47,0L279.712,127.224L280.392,127.224C280.09,123.221 279.693,118.746 279.202,113.8C278.712,108.853 278.277,102.905 277.9,95.956C277.522,89.008 277.333,80.549 277.333,70.579L277.333,0L303.39,0L303.39,193.499L279.939,193.499L232.924,69.673L232.017,69.673C232.395,74.205 232.81,79.152 233.263,84.514C233.717,89.876 234.132,96.636 234.51,104.793C234.887,112.95 235.076,123.561 235.076,136.627L235.076,193.499L209.246,193.499L209.246,0Z", style: { fillRule: "nonzero" } }),
    /* @__PURE__ */ jsx("path", { vectorEffect: "non-scaling-stroke", d: "M385.412,0L414.754,0L414.754,84.514L415.66,84.514L449.194,0L478.422,0L441.15,90.745L482.614,193.499L451.233,193.499L415.66,101.394L414.754,101.394L414.754,193.499L385.412,193.499L385.412,0Z", style: { fillRule: "nonzero" } }),
    /* @__PURE__ */ jsx("path", { vectorEffect: "non-scaling-stroke", d: "M498.815,0L522.039,0L569.281,127.224L569.96,127.224C569.658,123.221 569.262,118.746 568.771,113.8C568.28,108.853 567.846,102.905 567.468,95.956C567.09,89.008 566.902,80.549 566.902,70.579L566.902,0L592.958,0L592.958,193.499L569.507,193.499L522.492,69.673L521.586,69.673C521.963,74.205 522.379,79.152 522.832,84.514C523.285,89.876 523.701,96.636 524.078,104.793C524.456,112.95 524.645,123.561 524.645,136.627L524.645,193.499L498.815,193.499L498.815,0Z", style: { fillRule: "nonzero" } }),
    /* @__PURE__ */ jsx("rect", { vectorEffect: "non-scaling-stroke", x: "624.906", y: "0", width: "29.342", height: "193.499", style: { fillRule: "nonzero" } }),
    /* @__PURE__ */ jsx("path", { vectorEffect: "non-scaling-stroke", d: "M671.015,177.978L729.586,23.111L680.758,23.111L680.758,0L762.44,0L762.44,15.521L703.756,170.388L762.44,170.388L762.44,193.499L671.015,193.499L671.015,177.978Z", style: { fillRule: "nonzero" } }),
    /* @__PURE__ */ jsx("path", { vectorEffect: "non-scaling-stroke", d: "M781.133,0L855.111,0L855.111,23.111L810.475,23.111L810.475,81.002L845.481,81.002L845.481,104.113L810.475,104.113L810.475,170.388L855.111,170.388L855.111,193.499L781.133,193.499L781.133,0Z", style: { fillRule: "nonzero" } })
  ] });
};
const Subtitle = ({ ...props }) => {
  const { className, ...style } = props;
  return /* @__PURE__ */ jsx("svg", { "aria-label": "Frontend Developer", ...className && { className }, viewBox: "0 0 411 44", version: "1.1", xmlns: "http://www.w3.org/2000/svg", style: { fillRule: "evenodd", clipRule: "evenodd", strokeLinejoin: "round", strokeMiterlimit: "2", ...style }, children: /* @__PURE__ */ jsxs("g", { transform: "matrix(1,0,0,1,-780.318471,-426.673614)", children: [
    /* @__PURE__ */ jsx("g", { transform: "matrix(2.138872,0,0,2.138872,281.280191,-87.68675)", children: /* @__PURE__ */ jsx("path", { vectorEffect: "non-scaling-stroke", d: "M233.318,240.658L240.971,240.658L240.971,243.142L236.354,243.142L236.354,249.037L239.975,249.037L239.975,251.427L236.354,251.427L236.354,260.674L233.318,260.674L233.318,240.658Z", style: { fillRule: "nonzero" } }) }),
    /* @__PURE__ */ jsx("g", { transform: "matrix(2.138872,0,0,2.138872,281.280191,-87.68675)", children: /* @__PURE__ */ jsx("path", { vectorEffect: "non-scaling-stroke", d: "M242.611,240.658L245.904,240.658C246.365,240.658 246.873,240.685 247.428,240.74C247.983,240.795 248.533,240.918 249.08,241.109C249.627,241.3 250.127,241.601 250.58,242.011C251.033,242.422 251.399,242.98 251.676,243.687C251.953,244.394 252.092,245.291 252.092,246.377L252.092,246.881C252.092,249.881 251.19,251.81 249.385,252.67L252.678,260.674L249.443,260.674L246.69,253.185L245.647,253.185L245.647,260.674L242.611,260.674L242.611,240.658ZM246.045,250.994C247.154,250.994 247.918,250.736 248.336,250.22C248.754,249.705 248.963,248.775 248.963,247.431L248.963,245.849C248.963,244.818 248.766,244.06 248.371,243.576C247.977,243.091 247.201,242.849 246.045,242.849L245.647,242.849L245.647,250.994L246.045,250.994Z", style: { fillRule: "nonzero" } }) }),
    /* @__PURE__ */ jsx("g", { transform: "matrix(2.138872,0,0,2.138872,281.280191,-87.68675)", children: /* @__PURE__ */ jsx("path", { vectorEffect: "non-scaling-stroke", d: "M259.592,260.849C259.108,260.849 258.578,260.779 258.004,260.638C257.43,260.498 256.885,260.205 256.369,259.759C255.854,259.314 255.432,258.644 255.104,257.75C254.776,256.855 254.611,255.658 254.611,254.158L254.611,247.068C254.611,245.865 254.723,244.863 254.945,244.062C255.168,243.261 255.461,242.621 255.824,242.14C256.188,241.66 256.59,241.3 257.031,241.062C257.473,240.824 257.916,240.668 258.361,240.593C258.807,240.519 259.217,240.482 259.592,240.482C259.951,240.482 260.352,240.517 260.793,240.588C261.234,240.658 261.674,240.808 262.111,241.039C262.549,241.269 262.949,241.623 263.313,242.099C263.676,242.576 263.969,243.216 264.192,244.021C264.414,244.826 264.526,245.841 264.526,247.068L264.526,254.158C264.526,255.642 264.354,256.83 264.01,257.72C263.666,258.611 263.233,259.281 262.709,259.73C262.186,260.179 261.645,260.478 261.086,260.627C260.527,260.775 260.029,260.849 259.592,260.849ZM259.592,258.47C260.193,258.47 260.639,258.244 260.928,257.791C261.217,257.338 261.361,256.49 261.361,255.248L261.361,246.224C261.361,244.943 261.217,244.062 260.928,243.582C260.639,243.101 260.193,242.861 259.592,242.861C258.975,242.861 258.52,243.101 258.227,243.582C257.934,244.062 257.787,244.943 257.787,246.224L257.787,255.248C257.787,256.49 257.934,257.338 258.227,257.791C258.52,258.244 258.975,258.47 259.592,258.47Z", style: { fillRule: "nonzero" } }) }),
    /* @__PURE__ */ jsx("g", { transform: "matrix(2.138872,0,0,2.138872,281.280191,-87.68675)", children: /* @__PURE__ */ jsx("path", { vectorEffect: "non-scaling-stroke", d: "M267.514,240.658L269.916,240.658L274.803,253.818L274.873,253.818C274.842,253.404 274.801,252.941 274.75,252.429C274.699,251.918 274.654,251.302 274.615,250.584C274.576,249.865 274.557,248.99 274.557,247.959L274.557,240.658L277.252,240.658L277.252,260.674L274.826,260.674L269.963,247.865L269.869,247.865C269.908,248.334 269.951,248.845 269.998,249.4C270.045,249.955 270.088,250.654 270.127,251.498C270.166,252.341 270.186,253.439 270.186,254.791L270.186,260.674L267.514,260.674L267.514,240.658Z", style: { fillRule: "nonzero" } }) }),
    /* @__PURE__ */ jsx("g", { transform: "matrix(2.138872,0,0,2.138872,281.280191,-87.68675)", children: /* @__PURE__ */ jsx("path", { vectorEffect: "non-scaling-stroke", d: "M282.115,243.049L278.893,243.049L278.893,240.658L288.361,240.658L288.361,243.049L285.151,243.049L285.151,260.674L282.115,260.674L282.115,243.049Z", style: { fillRule: "nonzero" } }) }),
    /* @__PURE__ */ jsx("g", { transform: "matrix(2.138872,0,0,2.138872,281.280191,-87.68675)", children: /* @__PURE__ */ jsx("path", { vectorEffect: "non-scaling-stroke", d: "M290.002,240.658L297.654,240.658L297.654,243.049L293.037,243.049L293.037,249.037L296.658,249.037L296.658,251.427L293.037,251.427L293.037,258.283L297.654,258.283L297.654,260.674L290.002,260.674L290.002,240.658Z", style: { fillRule: "nonzero" } }) }),
    /* @__PURE__ */ jsx("g", { transform: "matrix(2.138872,0,0,2.138872,281.280191,-87.68675)", children: /* @__PURE__ */ jsx("path", { vectorEffect: "non-scaling-stroke", d: "M299.471,240.658L301.873,240.658L306.76,253.818L306.83,253.818C306.799,253.404 306.758,252.941 306.707,252.429C306.656,251.918 306.611,251.302 306.572,250.584C306.533,249.865 306.514,248.99 306.514,247.959L306.514,240.658L309.209,240.658L309.209,260.674L306.783,260.674L301.92,247.865L301.826,247.865C301.865,248.334 301.908,248.845 301.955,249.4C302.002,249.955 302.045,250.654 302.084,251.498C302.123,252.341 302.143,253.439 302.143,254.791L302.143,260.674L299.471,260.674L299.471,240.658Z", style: { fillRule: "nonzero" } }) }),
    /* @__PURE__ */ jsx("g", { transform: "matrix(2.138872,0,0,2.138872,281.280191,-87.68675)", children: /* @__PURE__ */ jsx("path", { vectorEffect: "non-scaling-stroke", d: "M315.666,260.674L312.514,260.674L312.514,240.658L315.666,240.658C316.236,240.658 316.822,240.685 317.424,240.74C318.026,240.795 318.606,240.935 319.164,241.162C319.723,241.388 320.225,241.754 320.67,242.257C321.115,242.761 321.469,243.457 321.731,244.343C321.992,245.23 322.123,246.369 322.123,247.759L322.123,253.572C322.123,254.963 321.992,256.103 321.731,256.994C321.469,257.884 321.115,258.582 320.67,259.086C320.225,259.59 319.723,259.953 319.164,260.175C318.606,260.398 318.026,260.537 317.424,260.591C316.822,260.646 316.236,260.674 315.666,260.674ZM315.549,242.966L315.549,258.365L316.205,258.365C316.94,258.365 317.504,258.232 317.899,257.966C318.293,257.701 318.567,257.224 318.719,256.537C318.871,255.849 318.947,254.881 318.947,253.631L318.947,247.701C318.947,246.443 318.871,245.472 318.719,244.789C318.567,244.105 318.293,243.631 317.899,243.365C317.504,243.099 316.94,242.966 316.205,242.966L315.549,242.966Z", style: { fillRule: "nonzero" } }) }),
    /* @__PURE__ */ jsx("g", { transform: "matrix(2.138872,0,0,2.138872,281.280191,-87.68675)", children: /* @__PURE__ */ jsx("path", { vectorEffect: "non-scaling-stroke", d: "M333.162,260.674L330.01,260.674L330.01,240.658L333.162,240.658C333.733,240.658 334.318,240.685 334.92,240.74C335.522,240.795 336.102,240.935 336.66,241.162C337.219,241.388 337.721,241.754 338.166,242.257C338.611,242.761 338.965,243.457 339.227,244.343C339.488,245.23 339.619,246.369 339.619,247.759L339.619,253.572C339.619,254.963 339.488,256.103 339.227,256.994C338.965,257.884 338.611,258.582 338.166,259.086C337.721,259.59 337.219,259.953 336.66,260.175C336.102,260.398 335.522,260.537 334.92,260.591C334.318,260.646 333.733,260.674 333.162,260.674ZM333.045,242.966L333.045,258.365L333.701,258.365C334.436,258.365 335,258.232 335.395,257.966C335.789,257.701 336.063,257.224 336.215,256.537C336.367,255.849 336.443,254.881 336.443,253.631L336.443,247.701C336.443,246.443 336.367,245.472 336.215,244.789C336.063,244.105 335.789,243.631 335.395,243.365C335,243.099 334.436,242.966 333.701,242.966L333.045,242.966Z", style: { fillRule: "nonzero" } }) }),
    /* @__PURE__ */ jsx("g", { transform: "matrix(2.138872,0,0,2.138872,281.280191,-87.68675)", children: /* @__PURE__ */ jsx("path", { vectorEffect: "non-scaling-stroke", d: "M342.397,240.658L350.049,240.658L350.049,243.049L345.432,243.049L345.432,249.037L349.053,249.037L349.053,251.427L345.432,251.427L345.432,258.283L350.049,258.283L350.049,260.674L342.397,260.674L342.397,240.658Z", style: { fillRule: "nonzero" } }) }),
    /* @__PURE__ */ jsx("g", { transform: "matrix(2.138872,0,0,2.138872,281.280191,-87.68675)", children: /* @__PURE__ */ jsx("path", { vectorEffect: "non-scaling-stroke", d: "M354.561,260.674L350.928,240.658L354.033,240.658L356.236,256.56L356.365,256.56L358.58,240.658L361.674,240.658L358.029,260.674L354.561,260.674Z", style: { fillRule: "nonzero" } }) }),
    /* @__PURE__ */ jsx("g", { transform: "matrix(2.138872,0,0,2.138872,281.280191,-87.68675)", children: /* @__PURE__ */ jsx("path", { vectorEffect: "non-scaling-stroke", d: "M363.572,240.658L371.225,240.658L371.225,243.049L366.608,243.049L366.608,249.037L370.229,249.037L370.229,251.427L366.608,251.427L366.608,258.283L371.225,258.283L371.225,260.674L363.572,260.674L363.572,240.658Z", style: { fillRule: "nonzero" } }) }),
    /* @__PURE__ */ jsx("g", { transform: "matrix(2.138872,0,0,2.138872,281.280191,-87.68675)", children: /* @__PURE__ */ jsx("path", { vectorEffect: "non-scaling-stroke", d: "M373.041,240.658L376.076,240.658L376.076,258.283L380.213,258.283L380.213,260.674L373.041,260.674L373.041,240.658Z", style: { fillRule: "nonzero" } }) }),
    /* @__PURE__ */ jsx("g", { transform: "matrix(2.138872,0,0,2.138872,281.280191,-87.68675)", children: /* @__PURE__ */ jsx("path", { vectorEffect: "non-scaling-stroke", d: "M386.178,260.849C385.693,260.849 385.164,260.779 384.59,260.638C384.016,260.498 383.471,260.205 382.955,259.759C382.44,259.314 382.018,258.644 381.69,257.75C381.361,256.855 381.197,255.658 381.197,254.158L381.197,247.068C381.197,245.865 381.309,244.863 381.531,244.062C381.754,243.261 382.047,242.621 382.41,242.14C382.774,241.66 383.176,241.3 383.617,241.062C384.059,240.824 384.502,240.668 384.947,240.593C385.393,240.519 385.803,240.482 386.178,240.482C386.537,240.482 386.938,240.517 387.379,240.588C387.82,240.658 388.26,240.808 388.697,241.039C389.135,241.269 389.535,241.623 389.899,242.099C390.262,242.576 390.555,243.216 390.777,244.021C391,244.826 391.111,245.841 391.111,247.068L391.111,254.158C391.111,255.642 390.94,256.83 390.596,257.72C390.252,258.611 389.818,259.281 389.295,259.73C388.772,260.179 388.231,260.478 387.672,260.627C387.113,260.775 386.615,260.849 386.178,260.849ZM386.178,258.47C386.779,258.47 387.225,258.244 387.514,257.791C387.803,257.338 387.947,256.49 387.947,255.248L387.947,246.224C387.947,244.943 387.803,244.062 387.514,243.582C387.225,243.101 386.779,242.861 386.178,242.861C385.561,242.861 385.106,243.101 384.813,243.582C384.52,244.062 384.373,244.943 384.373,246.224L384.373,255.248C384.373,256.49 384.52,257.338 384.813,257.791C385.106,258.244 385.561,258.47 386.178,258.47Z", style: { fillRule: "nonzero" } }) }),
    /* @__PURE__ */ jsx("g", { transform: "matrix(2.138872,0,0,2.138872,281.280191,-87.68675)", children: /* @__PURE__ */ jsx("path", { vectorEffect: "non-scaling-stroke", d: "M394.1,240.658L397.135,240.658C397.596,240.658 398.102,240.687 398.652,240.746C399.203,240.804 399.752,240.937 400.299,241.144C400.846,241.351 401.348,241.677 401.805,242.123C402.262,242.568 402.627,243.174 402.901,243.939C403.174,244.705 403.311,245.677 403.311,246.857L403.311,247.56C403.311,248.841 403.184,249.908 402.93,250.759C402.676,251.611 402.338,252.293 401.916,252.804C401.494,253.316 401.024,253.699 400.504,253.953C399.984,254.207 399.459,254.375 398.928,254.457C398.397,254.539 397.897,254.58 397.428,254.58L397.135,254.58L397.135,260.674L394.1,260.674L394.1,240.658ZM397.287,252.353C398.389,252.353 399.149,252.025 399.567,251.369C399.984,250.713 400.193,249.631 400.193,248.123L400.193,246.318C400.193,245.131 399.996,244.256 399.602,243.693C399.207,243.131 398.436,242.849 397.287,242.849L397.135,242.849L397.135,252.353L397.287,252.353Z", style: { fillRule: "nonzero" } }) }),
    /* @__PURE__ */ jsx("g", { transform: "matrix(2.138872,0,0,2.138872,281.280191,-87.68675)", children: /* @__PURE__ */ jsx("path", { vectorEffect: "non-scaling-stroke", d: "M405.502,240.658L413.154,240.658L413.154,243.049L408.537,243.049L408.537,249.037L412.158,249.037L412.158,251.427L408.537,251.427L408.537,258.283L413.154,258.283L413.154,260.674L405.502,260.674L405.502,240.658Z", style: { fillRule: "nonzero" } }) }),
    /* @__PURE__ */ jsx("g", { transform: "matrix(2.138872,0,0,2.138872,281.280191,-87.68675)", children: /* @__PURE__ */ jsx("path", { vectorEffect: "non-scaling-stroke", d: "M414.971,240.658L418.264,240.658C418.725,240.658 419.233,240.685 419.787,240.74C420.342,240.795 420.893,240.918 421.44,241.109C421.986,241.3 422.486,241.601 422.94,242.011C423.393,242.422 423.758,242.98 424.035,243.687C424.313,244.394 424.451,245.291 424.451,246.377L424.451,246.881C424.451,249.881 423.549,251.81 421.744,252.67L425.037,260.674L421.803,260.674L419.049,253.185L418.006,253.185L418.006,260.674L414.971,260.674L414.971,240.658ZM418.404,250.994C419.514,250.994 420.277,250.736 420.695,250.22C421.113,249.705 421.322,248.775 421.322,247.431L421.322,245.849C421.322,244.818 421.125,244.06 420.731,243.576C420.336,243.091 419.561,242.849 418.404,242.849L418.006,242.849L418.006,250.994L418.404,250.994Z", style: { fillRule: "nonzero" } }) })
  ] }) });
};
const useSectionScrollWatcher = ({ margin = "-200px 0px -200px 0px", ...section }) => {
  const isInView = useInView(section.ref, { margin });
  const wasInView = useRef(isInView);
  const [isVisible, setIsVisible] = useState(true);
  useEffect(() => {
    const currentValue = isInView;
    const previousValue = wasInView.current;
    if (currentValue && !previousValue) {
      splatterBus2.setSection(section);
      setIsVisible(true);
    } else if (!currentValue && previousValue) {
      setIsVisible(false);
    }
    wasInView.current = currentValue;
  }, [isInView]);
  return isVisible;
};
const titleColor = "rgb(255, 251, 235)";
const TitleSection = observer(({ sprite, paint }) => {
  const ref = useRef(null);
  const { name } = splatterBus2.section;
  let style = {
    fill: titleColor
  };
  const isOnScreen = useSectionScrollWatcher({
    ...{ name: "title", ref, sprite, paint },
    margin: "-60% 0px 0px 0px"
  });
  const titlePage = isOnScreen && (name === "title" || name === "");
  if (titlePage) {
    style = {
      fill: titleColor,
      stroke: "transparent",
      strokeWidth: "1px"
    };
  } else {
    style = {
      fill: "transparent",
      stroke: titleColor,
      strokeWidth: "1px"
    };
  }
  return /* @__PURE__ */ jsxs("section", { ref, className: "relative", children: [
    /* @__PURE__ */ jsxs("div", { className: `title-container ${titlePage ? "__active" : "__inactive"}`, children: [
      /* @__PURE__ */ jsx(Title, { ...style, className: `title-text` }),
      /* @__PURE__ */ jsx(Subtitle, { ...style, className: `subtitle-text` })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "m-12 flex flex-col max-w-160 justify-end", children: /* @__PURE__ */ jsx("h3", { className: "text-amber-50 font-heading-1 uppercase", children: "A Portfolio Site" }) })
  ] });
});
function useParallax(value, distance) {
  return useTransform(value, [0, 1], [-distance, distance]);
}
const Portrait = ({ className = "", ...props }) => {
  const { paint } = props;
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useParallax(scrollYProgress, 200);
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      ref,
      className: `relative ${className}`,
      initial: { visibility: "hidden", opacity: 0 },
      animate: { visibility: "visible", opacity: 1 },
      style: { y },
      children: [
        /* @__PURE__ */ jsx("img", { className: `w-full h-full contrast-200 grayscale-100 hue-rotate-0 invert-0 opacity-100 saturate-100 sepia-0`, src: portrait }),
        /* @__PURE__ */ jsx("div", { className: "w-full h-full absolute top-0 left-0 mix-blend-lighten", style: { background: "#FF0094" } })
      ]
    }
  );
};
const Arrow = ({ ...props }) => {
  const { className, ...style } = props;
  return /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", ...className && { className }, viewBox: "0 0 24 24", style: { fill: "none", strokeWidth: 1.5, stroke: "currentColor", ...style }, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" }) });
};
const offWhite = "rgb(255, 251, 235)";
const Summary = ({ project }) => {
  const id = project?.slug ? project.slug : project.title.replace(" ", "_");
  return /* @__PURE__ */ jsxs("div", { id, className: "border-l-3 border-amber-50 p-6 mt-3 mb-6", children: [
    /* @__PURE__ */ jsx("h3", { className: "text-neutral-900 text-xl font-heading-1 uppercase", children: project.title }),
    /* @__PURE__ */ jsx("p", { className: "mb-3", children: project.copy }),
    /* @__PURE__ */ jsx("div", { children: project.tech.map((tag, i) => /* @__PURE__ */ jsx("div", { className: "inline-block px-4 py-1 my-1 mr-2 text-amber-50 outline-2 outline-amber-50 font-heading-1 uppercase", children: tag }, `${tag}-${project.id}-${i}`)) }),
    project.slug && /* @__PURE__ */ jsxs(Link, { to: `case/${project.slug}`, className: "mt-3 inline-flex! gap-4 items-center", children: [
      "Case Study ",
      /* @__PURE__ */ jsx(Arrow, { color: offWhite, className: "w-8" })
    ] })
  ] });
};
const WorkExperience = observer(({ job }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useParallax(scrollYProgress, 40);
  const { paint } = splatterBus2.section;
  return /* @__PURE__ */ jsxs("div", { className: "relative pr-6", children: [
    /* @__PURE__ */ jsx(
      motion.h2,
      {
        ref,
        className: `hidden sm:block font-heading-1 text-3xl text-neutral-900 my-4 absolute -left-60 w-60 top-8 p-3`,
        initial: { visibility: "hidden", opacity: 0 },
        animate: { visibility: "visible", opacity: 1 },
        style: { y, backgroundColor: paint, transition: "background-color 1s ease-in-out" },
        children: job.year
      }
    ),
    /* @__PURE__ */ jsx("h1", { className: `font-heading-1 text-2xl sm:text-3xl md:text-5xl text-neutral-900 uppercase my-4`, children: job.title }),
    /* @__PURE__ */ jsx("h2", { className: "visible sm:hidden font-heading-1 text-lg sm:text-2xl text-neutral-900 mb-4", children: job.year }),
    /* @__PURE__ */ jsx("p", { className: "text-neutral-900 text-md sm:text-lg md:text-2xl", children: job.copy }),
    job.projects.map((project, i) => /* @__PURE__ */ jsx(Summary, { project }, `${project.id}`))
  ] });
});
const Qualification = observer(({ qualification }) => {
  return /* @__PURE__ */ jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsx("h3", { className: `font-heading-1 text-lg sm:text-2xl text-neutral-800 uppercase my-2`, children: qualification.opener }),
    /* @__PURE__ */ jsx("p", { className: "text-neutral-800 textmd sm:text-lg my-2", children: qualification.copy })
  ] });
});
function Section({ ...props }) {
  const ref = useRef(null);
  const { children, className, title, ...watchProps } = props;
  useSectionScrollWatcher({ ...watchProps, ref });
  return /* @__PURE__ */ jsx(
    "section",
    {
      ref,
      className: `relative ${className || ""}`,
      children
    }
  );
}
const titlePaint = "rgb(12, 10, 9)";
const aboutPaint = "#7D0047";
const experiencePaint = "#32C0CC";
const qualificationPaint = "#FF0094";
const footerPaint = "#FFDE00";
const Home = UNSAFE_withComponentProps(function Home2() {
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx(TitleSection, {
      sprite: ink,
      paint: titlePaint
    }), /* @__PURE__ */ jsx(Section, {
      name: "about",
      title: "001 About",
      sprite: ink,
      paint: aboutPaint,
      className: "flex",
      children: /* @__PURE__ */ jsxs("div", {
        className: "flex flex-col items-center justify-center gap-6",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "flex flex-row gap-4 items-center",
          children: [/* @__PURE__ */ jsx("div", {
            className: "relative -left-6",
            children: /* @__PURE__ */ jsx(Portrait, {
              paint: aboutPaint,
              className: "sm:ml-4 md:ml-10 w-24 sm:w-60 h-auto outline-2 outline-offset-6 outline-amber-50"
            })
          }), /* @__PURE__ */ jsxs("div", {
            className: "pl-6 pr-9",
            children: [/* @__PURE__ */ jsx("h2", {
              className: "text-6xl font-body text-amber-50",
              children: "Hi ~"
            }), /* @__PURE__ */ jsxs("div", {
              className: "flex-col gap-4 hidden sm:flex text-amber-50 text-lg",
              children: [/* @__PURE__ */ jsx("p", {
                children: copy.body[0]
              }), /* @__PURE__ */ jsx("p", {
                children: copy.body[1]
              })]
            })]
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "visible sm:hidden text-amber-50 pl-18 pr-9",
          children: [/* @__PURE__ */ jsx("p", {
            children: copy.body[0]
          }), /* @__PURE__ */ jsx("p", {
            children: copy.body[1]
          })]
        })]
      })
    }), /* @__PURE__ */ jsx(Section, {
      name: "experience",
      title: "002 Experience",
      sprite: ink,
      paint: experiencePaint,
      children: /* @__PURE__ */ jsx("div", {
        className: "p-6 pl-20 sm:pl-70 flex flex-col w-full",
        children: /* @__PURE__ */ jsx("div", {
          className: "py-16 flex flex-col gap-12 max-w-140",
          children: copy.experience.map((job, i) => /* @__PURE__ */ jsx(WorkExperience, {
            job
          }, `${job.id}`))
        })
      })
    }), /* @__PURE__ */ jsx(Section, {
      name: "qualification",
      title: "003 Qualification",
      sprite: ink,
      paint: qualificationPaint,
      children: /* @__PURE__ */ jsx("div", {
        className: "p-6 pl-20 sm:pl-70 flex flex-col w-full",
        children: /* @__PURE__ */ jsx("div", {
          className: "py-16 flex flex-col gap-10 max-w-140 pr-6",
          children: copy.qualifications.map((qualification, i) => /* @__PURE__ */ jsx(Qualification, {
            qualification
          }, `${qualification.opener.substring(0, 30)}`))
        })
      })
    }), /* @__PURE__ */ jsx(Section, {
      name: "footer",
      title: "004 Footer",
      sprite: ink,
      paint: footerPaint,
      children: /* @__PURE__ */ jsx("div", {
        className: "p-6 flex w-full flex-col items-center justify-center gap-12",
        children: [{
          text: "in/benknize",
          href: "http://linkedin.com/in/benknize/"
        }, {
          text: "bknize@gmail",
          href: "mailto:bknize@gmail.com"
        }].map(({
          text,
          href
        }) => /* @__PURE__ */ jsx("a", {
          className: "text-3xl",
          href,
          children: text
        }, href))
      })
    })]
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Home
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/bknize.github.ioassets/entry.client-PH__9wcI.js", "imports": ["/bknize.github.ioassets/index-YmBlCsyK.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/bknize.github.ioassets/root-ChTan0rQ.js", "imports": ["/bknize.github.ioassets/index-YmBlCsyK.js", "/bknize.github.ioassets/PaintSplatter-D78xlGQ2.js"], "css": ["/bknize.github.ioassets/root-BKeL2AAJ.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/Home": { "id": "routes/Home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/bknize.github.ioassets/Home-DXVvZrvg.js", "imports": ["/bknize.github.ioassets/index-YmBlCsyK.js", "/bknize.github.ioassets/PaintSplatter-D78xlGQ2.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/bknize.github.ioassets/manifest-4d188ba5.js", "version": "4d188ba5", "sri": void 0 };
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "v8_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_subResourceIntegrity": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/bknize.github.io";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/Home": {
    id: "routes/Home",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
