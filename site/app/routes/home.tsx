import Transition from "~/transition";
import type { Route } from "./+types/home";
import Container from "~/container";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <>
    <Container>
      <div style={{height: '5000px'}} className="z-10">
        this el is 5000px tall
      </div>
    </Container>
    <Transition/>
  </>;
}
