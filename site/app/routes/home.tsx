import ink from 'src/animation/ink_3.png';
import portrait from 'src/img/pic.jpg';
import { copy } from "./homeCopy";
import Routes from "~/routes";
import Title from "~/components/title-text/Title";
import Subtitle from "~/components/title-text/Subtitle";
import { useRef, useState } from 'react';
import PaintSplatter from '~/components/transition/PaintSplatter';
import TitleContainer from '~/components/title-text/TitleContainer';
import TitleSection from '~/components/TitleSection';
import Portrait from '~/components/Portrait';
import WorkExperience from '~/components/WorkExperience';
import Qualification from '~/components/Qualifications';
import Section from '~/components/section';
import Nav from '~/components/Nav';

const titlePaint = 'rgb(12, 10, 9)'
const aboutPaint = '#7D0047'
const experiencePaint = '#32C0CC'
const qualificationPaint = '#FFDE00'
const footerPaint = '#FF0094'

export default function Home() {
  return <>
    <Nav />
    <TitleSection sprite={ink} paint={titlePaint} />
    <Section name="about" title="001 About" sprite={ink} paint={aboutPaint} className='flex flex-col sm:flex-row'>
      <div className='flex items-center'>
        <Portrait paint={aboutPaint} className='ml-10 w-60 h-auto outline-2 outline-offset-6 outline-amber-50' />
      </div>
      <div className='flex items-center p-6 font-body text-amber-50'>
        <div className='max-w-120'>
          <h2 className='text-8xl'>Hi ~</h2>
          <p>I'm a frontend engineer based in Peoria IL aka Whiskey Capital of the World circa 1837 to 1920.</p>
          <p>I have 9+ years in in design, development, UI & UX. I've worked in behemoth enterprise teams and lean SAAS startups. I like happy users and maintainable code.</p>
        </div>
      </div>
      
    </Section>
    <Section name="experience" title="002 Experience" sprite={ink} paint={experiencePaint}>
      <div className='p-6 pl-70 flex flex-col w-full'>
        <div className='py-16 flex flex-col gap-12 w-120'>
          {copy.experience.map((job, i) => (
            <WorkExperience key={`${job.year.replace(' ', '_')}`} job={ job } />
          ))}
        </div>
      </div>
    </Section>
    <Section name="qualification" title="003 Qualification" sprite={ink} paint={qualificationPaint}>
      <div className='p-6 pl-70 flex flex-col w-full'>
        <div className='py-16 flex flex-col gap-10 max-w-120'>
          {copy.qualifications.map((qualification, i) => (
            <Qualification key={`${qualification.opener.substring(0, 10)}`} qualification={qualification} />
          ))}
        </div>
      </div>
    </Section>
    <Section name="footer" title="004 Footer" sprite={ink} paint={ footerPaint }>
      <div className='p-6 flex w-full flex-col items-center justify-center gap-12'>
        <a className='outline-2 outline-amber-50 px-3 py-1.5 font-heading-1 text-6xl uppercase bg-transparent hover:bg-neutral-400 transition duration-300 ease-in-out'>
          LinkedIn
        </a>
        <a className='outline-2 outline-amber-50 px-3 py-1.5 font-heading-1 text-6xl uppercase bg-transparent hover:bg-neutral-400 transition duration-300 ease-in-out'>
          Email
        </a>
      </div>
    </Section>
  </>;
}
