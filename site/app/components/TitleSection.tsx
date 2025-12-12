import { useEffect, useRef, useState, type CSSProperties, type RefObject } from "react"
import useSectionScrollWatcher from "~/hooks/useSectionScrollWatcher";
import type { WatchSection } from "./transition/WatchSection";
import TitleContainer from "./title-text/TitleContainer";
import Title from "./title-text/Title";
import Subtitle from "./title-text/Subtitle";

const titleColor = 'rgb(255, 251, 235)'
const titlePaint = 'rgb(68, 64, 60)'
const name = 'title'

export default function TitleSection({ sprite, paint }: Partial<WatchSection>) {
  const ref = useRef<HTMLDivElement | null>(null);
  let style: CSSProperties = {
    fill: titleColor
  }
  const heroActive = useSectionScrollWatcher({
    ...{ name, ref, sprite, paint } as WatchSection,
    margin: '-60% 0px 0px 0px' 
  });

  if (heroActive) {
    style = {
      fill: titleColor,
      stroke: 'transparent',
      strokeWidth: '1px',
    }
  } else {
    style = {
      fill: 'transparent',
      stroke: titleColor,
      strokeWidth: '1px',
    }
  }

  return <section ref={ref} className='relative'>
      <div className={ `title-container ${heroActive ? '__active' : '__inactive'}` }>
        <Title { ...style } className={ `title-text` }/>
        <Subtitle { ...style } className={ `subtitle-text` } />
      </div>
      <div className="m-12 flex flex-col max-w-160 justify-end">
          <div className="text-amber-50 text-sm font-body mb-3">
              I'm a designer & developer based in Peoria IL aka Whiskey Capital of the World 1837-1920.
              I thrive in the friction between form and function, and love expression in the medium of a hard solve.
          </div>
          <nav className="text-amber-50 font-heading-1 flex flex-col gap-2 uppercase">
            <a>About</a>
            <a>Work</a>
            <a>Qualifications</a>
            <a>Contact</a>
          </nav>
        </div>
    </section>

}