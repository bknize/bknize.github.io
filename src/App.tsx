import React from 'react';
import Fade from 'react-reveal/Fade';
import './fonts.css';
import './style.css';
import content from './content.json';


// <img src={process.env.PUBLIC_URL + '/pic.jpg'} className="rounded-full" alt="Ben's handsome face." />

const Contact = ({ children }) => (
  <div className='text-mono text-sm'>
    {children}
  </div>
)

const Qualification = ({ opener, copy }) => (
  <div>
    <span className='font-black mr-0.5'>{ opener }</span>{ copy }
  </div>
)

const Profession = ({ title, year, copy, projects, tech }) => (
  <div>
    { copy }
    { tech.map((t) => <Tech key={t} />) }
  </div>
)

const Tech = ({ key }) => (<div>{ key }</div>)

function App() {
  return (
    <div className='border-1 border-white max-w-3xl mx-auto'>
      <h1 className='font-serif lowercase text-5xl font-bold text-neutral-100'>ben knize</h1>
      <Contact>
        benknize.com
      </Contact>
      <Contact>
        in/benknize
      </Contact>
      <Contact>
         bknize@gmail
      </Contact>
      <img src={process.env.PUBLIC_URL + '/pic.jpg'} className="rounded-full" alt="Ben's handsome face." />
      <p>Front-end engineer with 9+ years designing and developing UI/UX in enterprise web apps, dedicated to solving complex problems, focusing on maintainable and scalable code, prioritizing clean and enjoyable User Experience.</p>
      <h2 className='font-serif lowercase text-3xl font-bold'>qualifications</h2>
      {
        content.qualifications.map((q) => <Qualification {...q} />)
      }
      <h2 className='font-serif lowercase text-3xl font-bold'>professional experience</h2>
      {
        content.experience.map((e) => <Profession {...e} />)
      }
      <h2 className='font-serif lowercase text-3xl font-bold'>education</h2>
      <p>Graphic Design & Interactive Media at Bradley University, 2015</p>
    </div>
  )
}

export default App;
