import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/Home.tsx"),
    route("/case/:slug", "routes/CaseStudy.tsx")
] satisfies RouteConfig;
