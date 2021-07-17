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
    <div className="col-span-1 text-xl font-mono uppercase tracking-widest text-teal-700">
      { entry.date }
    </div>
    <div className="col-span-3 md:col-span-5 pl-8 tracking-wide">
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
  const [readMe, setReadMe] = useState('<span class="text-xl font-mono uppercase tracking-widest">Loading...</span>')

  useEffect(() => {
    axios
      .get('https://api.github.com/repos/bknize/bknize.github.io/readme')
      .then((response: any) => {
        const renderer = new marked.Renderer()
        renderer.heading = (text, level) => `<h${level} class="text-xl font-mono uppercase tracking-widest leading-10 my-4">${text}</h${level}>`
        renderer.paragraph = (text) => `<p class="leading-loose mt-2">${text}</p>`
        renderer.blockquote = (text) => `<blockquote class="border-l-2 ml-2 my-2 pl-4 p-2 pt-0 border-teal-700 text-blue-400">${text}</blockquote>`

        let decoded = atob(response.data.content)
        let parsed = marked(decoded, { renderer: renderer })
        let sanitized = sanitizeHtml(parsed, {
          allowedClasses: {
            'h1': [ 'text-xl', 'font-mono', 'uppercase', 'tracking-widest', 'leading-10', 'my-4' ],
            'p': [ 'leading-loose', 'mt-2' ],
            'blockquote': [ 'border-l-2', 'p-2', 'pl-4', 'ml-2', 'my-2', 'pt-0', 'border-teal-700', 'text-blue-400' ]
          }
        })
        setReadMe(sanitized)
      })
      .catch(function (error) {
        if (error.response) {
          if (error.response.status === 403) {
            setReadMe(`<p class="leading-loose">Oops! We exceeded GitHub's rate limit. Check back in like an hour or so.</p>`)
          } else {
            setReadMe(`<p class="leading-loose">Oops! We got an error.`)
          }
        }
      })
  })
  return (
    <div className="container mx-auto px-10 flex flex-col justify-center">
      <section className="flex-auto py-20 pl-6">
      
        <Fade><h1 className="text-6xl font-serif lowercase tracking-tight text-teal-700 italic">Ben Knize</h1></Fade>
        <Fade><h3 className="text-xl font-mono uppercase tracking-widest leading-10 text-teal-700">Designer/Developer</h3></Fade>
      </section>
      <section className="flex-auto flex mt-12 p-8 text-gray-100 bg-gradient-to-r from-teal-400 to-blue-400 pb-20">
        <Fade>
          <div className="mt-20 w-24 flex-shrink-0 sm:hidden md:block">
            <img src={process.env.PUBLIC_URL + '/pic.jpg'} className="rounded-full" alt="Ben's handsome face." />
          </div>
          <div className="pl-8 tracking-wide leading-loose text-white">
            <p><span className="font-serif text-4xl">Hi, I’m Ben.</span></p>
            <p>I’m a developer, designer, and a compulsive maker of things. I like technical and experiential challenges, answering big questions, and navigating the space between art and code.</p>
            <p>I’ve worked in enterprise development, eLearning, brochure sites, multimedia installations, and more.</p>
            <p>In my free time, I write, sculpt, paint, collect, and cook. I love <Link href="https://music.apple.com/profile/bknize">music</Link>, taking board games seriously, and having another pint.</p>
            <p>You can contact me via <Link target="_blank" href="https://www.linkedin.com/in/benknize/">LinkedIn</Link> or <Link href="mailto:b.knize@gmail.com">email</Link>.</p>
          </div>
        </Fade>
      </section>
      <section className="p-8">
        <Fade>
          <h2 className="text-4xl text-teal-900 font-serif mt-8 italic">My blurb</h2>
          <p className="leading-loose mt-8">
            Front-end developer with 5+ years experience designing and developing UI/UX for enterprise web apps and eLearning. My background in traditional print and digital media authoring informs my experience in technical architecture, complex use cases, and modern software workflows.
          </p>
          <p className="leading-loose">
            My resume is available <Link target="_blank" invert={ false } href={process.env.PUBLIC_URL + '/resume.pdf'}>here</Link>.
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
      <section className="mt-12 p-8 text-gray-100 bg-gradient-to-r from-teal-400 to-blue-400 pb-20">
        <Fade><h2 className="text-4xl text-white font-serif mt-8 mb-2 italic leading-10">Dev blog, sort of</h2></Fade>
        <Fade>
            <p>This page's <Link href="https://github.com/bknize/bknize.github.io">source code</Link> is public. The README is below, courtesy of <Link href="https://docs.github.com/en/rest">GitHub's API</Link></p>
        </Fade>
      <div className="mt-8 p-4 text-teal-900 bg-gray-50" dangerouslySetInnerHTML={{__html: readMe}} />
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
