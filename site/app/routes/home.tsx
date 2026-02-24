import ink from 'src/animation/ink_3.png';
import portrait from 'src/img/pic.jpg';
import { copy } from "./homeCopy";
import Routes from "~/routes";
import Title from "~/components/title-text/Title";
import Subtitle from "~/components/title-text/Subtitle";
import { useRef, useState } from 'react';
import PaintSplatter from '~/utils/PaintSplatter';
import TitleContainer from '~/components/title-text/TitleContainer';
import TitleSection from '~/components/TitleSection';
import Portrait from '~/components/Portrait';
import WorkExperience from '~/components/WorkExperience';
import Qualification from '~/components/Qualifications';
import Section from '~/components/Section';

const titlePaint = 'rgb(12, 10, 9)'
const aboutPaint = '#7D0047'
const experiencePaint = '#32C0CC'
const qualificationPaint = '#FF0094'
const footerPaint = '#FFDE00'

export default function Home() {
  return <>
    <TitleSection sprite={ink} paint={titlePaint} />
    <Section name="about" title="001 About" sprite={ink} paint={aboutPaint}
      className='flex'>
        <div className='flex flex-col items-center justify-center gap-6'>
          <div className='flex flex-row gap-4 items-center'>
            <div className='relative -left-6'>
              <Portrait paint={aboutPaint} className='sm:ml-4 md:ml-10 w-24 sm:w-60 h-auto outline-2 outline-offset-6 outline-amber-50' />
            </div>
            <div className='pl-6 pr-9'>
              <h2 className='text-6xl font-body text-amber-50'>Hi&nbsp;~</h2>
              <div className='flex-col gap-4 hidden sm:flex text-amber-50 text-lg'>
                <p>{ copy.body[0] }</p>
                <p>{ copy.body[1] }</p>
              </div>
            </div>
          </div>
          <div className='visible sm:hidden text-amber-50 pl-18 pr-9'>
              <p>{ copy.body[0] }</p>
              <p>{ copy.body[1] }</p>
          </div>
        </div>
      
    </Section>
    <Section name="experience" title="002 Experience" sprite={ink} paint={experiencePaint}>
      <div className='p-6 pl-20 sm:pl-70 flex flex-col w-full'>
        <div className='py-16 flex flex-col gap-12 max-w-140'>
          {copy.experience.map((job, i) => (
            <WorkExperience key={`${job.id}`} job={ job } />
          ))}
        </div>
      </div>
    </Section>
    <Section name="qualification" title="003 Qualification" sprite={ink} paint={qualificationPaint}>
      <div className='p-6 pl-20 sm:pl-70 flex flex-col w-full'>
        <div className='py-16 flex flex-col gap-10 max-w-140 pr-6'>
          {copy.qualifications.map((qualification, i) => (
            <Qualification key={`${qualification.opener.substring(0, 30)}`} qualification={qualification} />
          ))}
        </div>
      </div>
    </Section>
    <Section name="footer" title="004 Footer" sprite={ink} paint={ footerPaint }>
      <div className='p-6 flex w-full flex-col items-center justify-center gap-12'>

      {
        [
          {
            text: 'in/benknize',
            href: 'http://linkedin.com/in/benknize/'
          },
          {
            text: 'bknize@gmail',
            href: 'mailto:bknize@gmail.com'
          },
        ].map(({ text, href }) =>
            <a className='text-3xl'
              key={ href }
              href={ href }>
              { text }
            </a>
        )
      }
      </div>
    </Section>
  </>;
}
