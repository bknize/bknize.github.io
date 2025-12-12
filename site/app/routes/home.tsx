import ink from 'src/animation/ink.png';
import portrait from 'src/img/pic.jpg';
import { copy } from "./homeCopy";
import Routes from "~/routes";
import Title from "~/components/title-text/Title";
import Subtitle from "~/components/title-text/Subtitle";
import { useRef, useState } from 'react';
import PaintSplatter from '~/components/transition/PaintSplatter';
import Section from '~/components/Section';
import TitleContainer from '~/components/title-text/TitleContainer';
import TitleSection from '~/components/TitleSection';
import Portrait from '~/components/Portrait';

const titlePaint = 'rgb(12, 10, 9)'
const aboutPaint = '#7D0047'
const experiencePaint = '#32C0CC'
const qualificationPaint = '#FFDE00'
const footerPaint = '#FF0094'

export default function Home() {
  return <>
    <TitleSection sprite={ink} paint={titlePaint} />
    <Section name="about" title="001 About" sprite={ink} paint={aboutPaint} className='flex flex-col sm:flex-row'>
      <div className='flex items-center'>
        <Portrait paint={aboutPaint} className='ml-10 w-60 h-auto outline-2 outline-offset-6 outline-amber-50' />
      </div>
      <div className='flex items-center p-6 font-body text-amber-50'>
        <div>
          <h2 className='text-8xl'>Hi</h2>
          <p>I'm a frontend developer with 9+ years in design, engineering, UI & UX.</p>

        </div>
      </div>
      
    </Section>
    <Section name="experience" title="002 Experience" sprite={ink} paint={experiencePaint}>
        <div className='col-span-2'>
          <h2>Qualifications</h2>
        </div>
        {copy.experience.map((job, i) => (<div key={`${job.year}-${i}`}>
          <div className=''>
            <h1>{job.title}</h1>
            <h2>{job.year}</h2>
          </div>
          <div className=''>
            <p>{job.copy}</p>
            {job.projects.map((project, i) => (<div key={`${project.copy.substring(0, 5)}-${i}`}>
              <p>{project.copy}</p>
            </div>))}
            <ul>
              {job.tech.map((tag, i) => (<li key={`${tag}-${i}`}>{tag}</li>))}
            </ul>
          </div>
        </div>))}

    </Section>
    <Section name="qualification" title="003 Qualification" sprite={ink} paint={qualificationPaint}>
      <div className='section-content--sidebar'>
        x
      </div>
      <div className='section-content--main'>
        <h2>Qualifications</h2>
      </div>
    </Section>
    <Section name="footer" title="004 Footer" sprite={ink} paint={ footerPaint }>
      <div className='section-content--sidebar'>
        x
      </div>
      <div className='section-content--main'>
       <h2>Footer</h2>
      </div>

    </Section>
    <PaintSplatter />
  </>;
}
