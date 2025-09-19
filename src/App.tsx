import React from 'react';
import Fade from 'react-reveal/Fade';
import './fonts.css';
import './style.css';
import content from './content.json';
import { FaChevronRight } from "react-icons/fa";

const Contact = ({ href, children }) => (
  <Skew size={2}
    className={`${defaultSkewColor} hover:bg-neutral-900 w-48 flex`}
    innerClassName={`${defaultSkewColor} hover:bg-neutral-900`}>
    <a className='font-mono text-lg inline-block w-full hover:text-neutral-200' href={href}>
      { children }
    </a>
  </Skew>
)

const Qualification = ({ opener, copy }) => (
  <Fade>
    <div>
      <h3 className='font-mono font-extrabold text-lg'>
          { opener }
      </h3>
    <p>{ copy }</p></div>
  </Fade>
)

const Profession = ({ title, year, copy, projects, tech }) => (
  <Fade>
    <div className='my-4'>
      <h3 className='font-mono font-extrabold text-2xl text-accent-300 my-2'>
          { title }
      </h3>
      <h4 className='font-mono text-lg my-2'>
          { year }
      </h4>
      <p className='text-lg'>{ copy }</p>
      <div className='flex flex-col my-4 gap-4'>
        { projects.map(({ copy }) => <Project>{ copy }</Project>) }
      </div>
      <div className='flex my-4'>{ tech.map((t) => <Tech>{ t }</Tech>) }</div>
    </div>
  </Fade>
)

const Project = ({ children }) => (
  <div className='flex'>
    <div><FaChevronRight className='text-cool-500 m-1 ' /></div>
    <div>{ children }</div>
  </div>
)

const Tech = ({ children }) => (
  <Skew size={2} className='text-neutral-800 font-bold text-sm'>
    <span>{ children }</span>
  </Skew>
  )

const Portrait = () => (<img
  src={process.env.PUBLIC_URL + '/pic.jpg'}
  className="max-w-none absolute -left-8 -top-12"
  alt="Ben's handsome face."
  />)

/* need this to make sure tailwind compiles the style */
const defaultSkewColor = 'bg-accent-300';
const Skew = ({ className = defaultSkewColor, size=7, innerClassName = defaultSkewColor, children }) => {
  const clipPath = `polygon(${size}% 0, 100% 0%, ${100-size}% 100%, 0% 100%)`

  return (<div className={`${className}`}
      style={{ clipPath, padding: '5px' }}>
        <div className={`w-full h-full relative ${innerClassName}`}
          style={{
            clipPath,
            paddingLeft: Math.floor(size*3.5) + 'px',
            paddingRight: Math.floor(size*3.5) + 'px' }}>
          { children }
        </div>
    </div>)
}

function App() {
  return <>
    <div className='max-w-3xl mx-auto p-4'>
      <h1 className='font-serif lowercase text-8xl mt-24 font-bold text-accent-300'>ben knize</h1>
      <section className='flex my-4 gap-4'>
        <div className='flex items-center'>
          <p className='text-xl text-neutral-200'>Front-end engineer with 9+ years designing and developing UI/UX in enterprise web apps, dedicated to solving complex problems, focusing on maintainable and scalable code, prioritizing clean and enjoyable User Experience.</p>
        </div>
        <div>
          <Skew className={`w-48 h-48 flex ${defaultSkewColor}`}>
            <Portrait />
          </Skew>
        </div>
      </section>

      <div className='flex my-4 gap-2'>
        <Contact href='http://linkedin.com/in/benknize/'>
          in/benknize
        </Contact>
        <Contact href='mailto:bknize@gmail.com'>
          bknize@gmail
        </Contact>
      </div>
    </div>
    <div className='w-full bg-cool-400'> 
      <div className='max-w-3xl mx-auto p-4 pb-24'>
      <h2 className='font-serif lowercase text-6xl my-12 font-bold text-accent-300'>qualifications</h2>
      <section className='flex flex-col gap-4'>
        {
          content.qualifications.map((q) => <Qualification {...q} />)
        }
      </section>
      </div>
    </div>
    <div className='max-w-3xl mx-auto p-4 pb-24'>
      <h2 className='font-serif lowercase text-6xl my-12 font-bold text-accent-300'>professional experience</h2>
      <section className='my-4 flex flex-col gap-4 text-neutral-200'>
      {
        content.experience.map((e) => <Profession {...e} />)
      }
      </section>
      <h2 className='font-serif lowercase text-6xl my-12 font-bold text-accent-300'>education</h2>
      <Fade>
        <div className='my-4'>
          <h3 className='font-mono font-extrabold text-2xl text-accent-300 my-2'>
              Graphic Design & Multimedia
          </h3>
          <h4 className='font-mono text-lg my-2 text-neutral-200'>
              Bradley University, 2015
          </h4>
        </div>
      </Fade>
    </div>
  </>
}

export default App;
