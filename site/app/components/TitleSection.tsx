import { useEffect, useRef, useState, type CSSProperties, type RefObject } from "react"
import useSectionScrollWatcher from "~/hooks/useSectionScrollWatcher";
import type { WatchSection } from "./transition/WatchSection";
import TitleContainer from "./title-text/TitleContainer";
import Title from "./title-text/Title";
import Subtitle from "./title-text/Subtitle";
import { splatterBus2 } from "./transition/PaintSplatter";
import { observer } from "mobx-react-lite";

const titleColor = 'rgb(255, 251, 235)'
// const titlePaint = 'rgb(68, 64, 60)'
// const name = 'title'

const TitleSection = observer(({ sprite, paint }: Partial<WatchSection>) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { name } = splatterBus2.section;

  let style: CSSProperties = {
    fill: titleColor
  }
  const isOnScreen = useSectionScrollWatcher({
    ...{ name: 'title', ref, sprite, paint } as WatchSection,
    margin: '-60% 0px 0px 0px' 
  });

  console.log(isOnScreen, name )
  const titlePage = isOnScreen && (name === 'title' || name === '')

  if (titlePage) {
    style = {
      fill: titleColor,
      stroke: 'transparent',
      strokeWidth: '1px'
    }
  } else {
    style = {
      fill: 'transparent',
      stroke: titleColor,
      strokeWidth: '1px',
      opacity: !!name ? 1 : 0,
    }
  }

  return <section ref={ref} className='relative'>
      <div className={ `title-container ${titlePage ? '__active' : '__inactive'}` }>
        <Title { ...style } className={ `title-text` }/>
        <Subtitle { ...style } className={ `subtitle-text` } />
      </div>
      <div className="m-12 flex flex-col max-w-160 justify-end">
          <div className="text-amber-50 text-sm font-body mb-3">
              I'm a designer & developer based in Peoria IL aka Whiskey Capital of the World circa 1837 to 1920.
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

})

export default TitleSection