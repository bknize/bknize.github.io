import ink from 'src/animation/ink.png';
import { copy } from "./homeCopy";
import Routes from "~/routes";
import Title from "~/components/title-text/Title";
import Subtitle from "~/components/title-text/Subtitle";
import Section from '~/components/section';
import { useRef, useState } from 'react';
import PaintSplatter from '~/components/transition/PaintSplatter';

const titleColor = 'rgb(255, 251, 235)'
const homePaint = '#7D0047'
const experiencePaint = '#32C0CC'
const qualificationPaint = '#FFDE00'
const footerPaint = '#F0094'

export default function Home() {
  const [paint, setPaint] = useState(homePaint);
  const titleSection = useRef<HTMLElement | null>(null);
  const experienceSection = useRef<HTMLElement | null>(null);
  const qualificationSection = useRef<HTMLElement | null>(null);
  const footerSection = useRef<HTMLElement | null>(null);

  return <>

    <Section sprite={ink} paint={homePaint} ref={titleSection}>
      <Title fill={ titleColor } className="h-40 w-auto my-2"/>

      <Subtitle fill={ titleColor } className="h-20 w-auto my-2" />
      <nav>
        <a href="/">Home</a>
        {/* <a href="/about">About</a> */}
        <a>Experience</a>
      </nav>
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
      <h2>Contact Me</h2>
      <button>linkedin</button>
      <button>email</button>
    </Section>
    <Section sprite={ink} ref={experienceSection} paint={experiencePaint}>
      <h2>Professional Experience</h2>
      {/* {copy.experience.map((job) => (<>
        <h1>{job.title}</h1>
        <h2>{job.year}</h2>
        <p>{job.copy}</p>
        {job.projects.map((project) => (<>
          <p>{project.copy}</p>
        </>))}
        <ul>
          {job.tech.map((tag) => (<li>{tag}</li>))}
        </ul>
      </>))} */}
    </Section>
    <Section sprite={ink} ref={qualificationSection} paint={qualificationPaint}>
      <h2>Qualifications</h2>

    </Section>
    <Section sprite={ink} ref={footerSection} paint={ footerPaint }>
      <h2>Qualifications</h2>

    </Section>
    <PaintSplatter watch={[{ ref: titleSection, sprite: ink, paint: homePaint }]} />
  </>;
}
