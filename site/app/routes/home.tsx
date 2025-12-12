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

const titlePaint = 'rgb(12, 10, 9)'
const aboutPaint = '#7D0047'
const experiencePaint = '#32C0CC'
const qualificationPaint = '#FFDE00'
const footerPaint = '#FF0094'

export default function Home() {
  return <>
    <TitleSection sprite={ink} paint={titlePaint} />
    <Section name="about" title="001 About" sprite={ink} paint={aboutPaint}>
      <div className='section-content--sidebar'>
        <img src={ portrait } />
      </div>
      <div className='section-content--main'>
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
      </div>
      
    </Section>
    <Section name="experience" title="002 Experience" sprite={ink} paint={experiencePaint}>
        <div className='col-span-2'>
          <h2>Qualifications</h2>
        </div>
        {copy.experience.map((job) => (<>
          <div className=''>
            <h1>{job.title}</h1>
            <h2>{job.year}</h2>
          </div>
          <div className=''>
            <p>{job.copy}</p>
            {job.projects.map((project) => (<>
              <p>{project.copy}</p>
            </>))}
            <ul>
              {job.tech.map((tag) => (<li>{tag}</li>))}
            </ul>
          </div>
        </>))}

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
