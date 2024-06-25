import React, { useEffect } from 'react';
import Fade from 'react-reveal/Fade';
import { FaLinkedin, FaEnvelopeSquare, FaGithubSquare } from 'react-icons/fa'
import { timeline } from './Content'
import axios from 'axios';
import marked from 'marked'
import sanitizeHtml from 'sanitize-html';
import './fonts.css';
import { useState } from 'react';

function Link({ href, target = '_self', invert = false, children }) {
  const classes = 'bg-white text-blue-400 hover:bg-sky-300 hover:text-teal-600 px-1'
  const invertClasses = 'bg-blue-400 text-white hover:bg-sky-300 hover:text-teal-600 px-1'
  return (<a className={ (!invert) ? classes : invertClasses } href={ href } target={ target }>{ children }</a>)
}

function TimelineEntry({ entry }) {
  return (<Fade>
    <div className="col-span-4 sm:col-span-1 text-xl font-mono uppercase tracking-widest text-teal-700">
      { entry.date }
    </div>
    <div className="col-span-4 sm:col-span-3 md:col-span-5 sm:pl-8 tracking-wide">
      <h3 className="font-mono uppercase text-2xl text-blue-700">
        { entry.job }
      </h3>
      <h4 className="text-teal-600">@{ entry.company }</h4>
      <p className="leading-loose">{ entry.copy }</p>
      {
        entry.tags.map((tag) => {
          return <span key={tag} className="inline-block bg-teal-400 text-sm p-1 px-3 m-1 text-white">{ tag }</span>
        })
      }
    </div>
  </Fade>)
}



function App() {
  return (
    <div className="container mx-auto px-10 flex flex-col justify-center">
      <section className="flex-auto py-20 pl-6">
      
        <Fade><h1 className="text-6xl font-serif lowercase tracking-tight text-teal-700 italic">Ben Knize</h1></Fade>
        <Fade><h3 className="text-xl font-mono uppercase tracking-widest leading-10 text-teal-700">Developer/Designer</h3></Fade>
      </section>
      <section className="mt-12 p-8 text-gray-100 bg-gradient-to-r from-teal-400 to-blue-400 pb-20 grid grid-cols-4 md:grid-cols-6">
        <Fade>
          <div className="col-span-4 sm:col-span-1 pb-8">
            <img src={process.env.PUBLIC_URL + '/pic.jpg'} className="rounded-full" alt="Ben's handsome face." />
          </div>
          <div className="tracking-wide leading-loose text-white col-span-4 sm:col-span-3 md:col-span-5 sm:pl-8">
            <p className="mb-4"><span className="font-serif text-4xl italic">Hi, I’m Ben.</span></p>
            <p className="mb-4">I’m a developer, designer, and a compulsive maker of things. I like technical and experiential challenges, answering big questions, and navigating the space between art and code.</p>
            <p className="mb-4">I’ve worked in enterprise development, eLearning, brochure sites, multimedia installations, and more.</p>
            <p className="mb-4">In my free time, I write, sculpt, paint, collect, and cook. I love <Link href="https://music.apple.com/profile/bknize">music</Link>, taking board games seriously, and having another pint.</p>
            <p>You can contact me via <Link target="_blank" href="https://www.linkedin.com/in/benknize/">LinkedIn</Link> or <Link href="mailto:b.knize@gmail.com">email</Link>.</p>
          </div>
        </Fade>
      </section>
      <section className="p-8">
        <Fade>
          <h2 className="text-4xl text-teal-900 font-serif mt-8 italic">My blurb</h2>
          <p className="leading-loose mt-8">
            Front-end developer with 7+ years experience designing UI/UX and developing for enterprise web apps and eLearning. My background in traditional print and digital media authoring informs my experience in technical architecture, complex use cases, and modern software workflows.
          </p>
          <p className="leading-loose">
            My resume is available <Link target="_blank" invert={ true } href={'https://docs.google.com/document/d/1ts7t5eBBy1iG7k5rW2u3hiPqoOlkq9vTIDRG3YkkVyc/edit?usp=sharing'}>here</Link>.
          </p>
        </Fade>
      </section>
      <section className="p-8">
        <Fade><h2 className="text-4xl text-teal-900 font-serif mt-8 italic">What have I been up to?</h2></Fade>
        
        <div className="grid grid-cols-4 md:grid-cols-6 mt-8 gap-y-4">
        {
          timeline.map((entry, i) => {
            return <TimelineEntry key={ i } entry={ entry } />
          })
        }
        </div>
      </section>
      <Fade>
        <footer className="p-8 text-gray-400 text-4xl flex">
          <a href="https://www.linkedin.com/in/benknize/"><FaLinkedin /></a>
          <a href="mailto:b.knize@gmail.com"><FaEnvelopeSquare /></a>
          <a href="https://github.com/bknize"><FaGithubSquare /></a>
        </footer>
      </Fade>
    </div>
  );
}

export default App;
