import Transition from "~/components/transition/transition";
import type { Route } from "./+types/home";
import Container from "~/components/container";
import Section from "~/components/section";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <>
    <Container>
        <Section>
          <h1 className="__display">Ben Knize</h1>
          <h3 className="__display">Frontend Developer</h3>
        </Section>
        <Section>
          <h1 className="__display">Ben Knize</h1>
          <h3 className="__display">Frontend Developer</h3>
        </Section>
        <Section>
          <h1 className="__display">Ben Knize</h1>
          <h3 className="__display">Frontend Developer</h3>
        </Section>
    </Container>
    <Transition/>
  </>;
}
