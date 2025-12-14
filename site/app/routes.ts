import { type RouteConfig, index, route } from "@react-router/dev/routes";
import CaseStudy from "./routes/CaseStudy";

export default [
    index("routes/Home.tsx"),
    route("/case/:caseId", "routes/CaseStudy.tsx")
] satisfies RouteConfig;
