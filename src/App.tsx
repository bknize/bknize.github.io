import React from 'react';
import Fade from 'react-reveal/Fade';
import { FaLinkedin, FaEnvelopeSquare, FaGithubSquare } from 'react-icons/fa'
import { timeline } from './Content'
import './fonts.css';

function App() {
  return (
    <div className="container mx-auto px-10 flex flex-col justify-center">
      <section className="flex-auto py-20 pl-6">
        <Fade><h1 className="text-6xl font-serif lowercase tracking-tight text-teal-900">Ben Knize</h1></Fade>
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
            <p>I’ve worked in enterprise development, eLearning, brochure sites, museum installations, and more.</p>
            <p>In my free time, I write, sculpt, paint, collect, and cook. I love <a className="bg-white text-blue-900 hover:bg-blue-700 hover:text-teal-100 px-2" href="https://music.apple.com/profile/bknize">music</a>, taking board games seriously, and having another pint.</p>
            <p>You can contact me via <a className="bg-white text-blue-900 hover:bg-blue-700 hover:text-teal-100 px-2" href="https://www.linkedin.com/in/benknize/">LinkedIn</a> or <a className="bg-white text-blue-900 hover:bg-blue-700 hover:text-teal-100 px-2" href="mailto:b.knize@gmail.com">email</a>.</p>
            <p>Check out the source code <a className="bg-white text-blue-900 hover:bg-blue-700 hover:text-teal-100 px-2" href="https://github.com/bknize">here</a>.</p>
          </div>
        </Fade>
      </section>
      <section className="p-8">
        <Fade><h2 className="text-4xl text-teal-900 font-serif mt-8">What have I been up to?</h2></Fade>
        
        <div className="grid grid-cols-4 md:grid-cols-6 mt-8 gap-y-4">
        {
          timeline.map((el, index) => {
            return <Fade>
                <div className="col-span-1 leading-loose font-mono uppercase text-2xl text-blue-700">
                  { el.date }
                </div>
                <div className="col-span-3 md:col-span-5 pl-8 tracking-wide leading-loose">
                  <h3 className="font-mono uppercase text-2xl text-blue-700">
                    { el.job }
                  </h3>
                  <h4 className="text-teal-600">@{ el.company }</h4>
                  <p>{ el.copy }</p>
                  {
                    el.tags.map((tag) => {
                      return <span key={tag} className="inline-block rounded-full bg-teal-400 text-sm p-1 px-3 m-1 text-white">{ tag }</span>
                    })
                  }
                </div>
              </Fade>
          })
        }
        </div>
      </section>
      <Fade>
        <footer className="p-8 text-teal-700 text-4xl flex">
          <a href="https://www.linkedin.com/in/benknize/"><FaLinkedin /></a>
          <a href="mailto:b.knize@gmail.com"><FaEnvelopeSquare /></a>
          <a href="https://github.com/bknize"><FaGithubSquare /></a> <span className="font-serif lowercase text-xl ml-2">copyright 2021</span>
        </footer>
      </Fade>
    </div>
  );
}

export default App;
