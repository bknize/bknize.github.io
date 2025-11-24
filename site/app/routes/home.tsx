import type { Route } from "./+types/home";
import Section from "~/components/section";
import ink from 'src/animation/ink.png';
import { copy } from "./homeCopy";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <>
    <Section className="outline-4 -outline-offset-24 outline-cyan-800">
      <h1 className="__display">Ben Knize</h1>
      <h3 className="__display">Frontend Developer</h3>

    </Section>
    <Section sprite={ink}>
      <h2 className="__display">Hello</h2>
      <p className="mt-12">
        {copy.body[0]}
      </p>
      <button>Professional Experience</button>
      <p>
        {copy.body[1]}
      </p>
      <button>Case Studies</button>
      <p>
        {copy.body[2]}
      </p>
      <button>Contact Me</button>
    </Section>
    <Section sprite={ink}>
      <h2 className="__display">Professional Experience</h2>
      {copy.experience.map((job) => (<>
        <h1>{job.title}</h1>
        <h2>{job.year}</h2>
        <p>{job.copy}</p>
        {job.projects.map((project) => (<>
          <p>{project.copy}</p>
        </>))}
        <ul>
          {job.tech.map((tag) => (<li>{tag}</li>))}
        </ul>
      </>))}
    </Section>
    <Section sprite={ink}>
      <h1 className="__display">Ben Knize</h1>
      <h3 className="__display">Frontend Developer</h3>
    </Section>
  </>;
}
