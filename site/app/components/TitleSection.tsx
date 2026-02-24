import { useEffect, useRef, useState, type CSSProperties, type RefObject } from "react"
import useSectionScrollWatcher from "~/hooks/useSectionScrollWatcher";
import type { WatchSection } from "../utils/WatchSection";
import TitleContainer from "./title-text/TitleContainer";
import Title from "./title-text/Title";
import Subtitle from "./title-text/Subtitle";
import { splatterBus2 } from "../utils/PaintSplatter";
import { observer } from "mobx-react-lite";

const titleColor = 'rgb(255, 251, 235)'

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
    }
  }

  return <section ref={ref} className='relative'>
      <div className={ `title-container ${titlePage ? '__active' : '__inactive'}` }>
        <Title { ...style } className={ `title-text` }/>
        <Subtitle { ...style } className={ `subtitle-text` } />
      </div>
      <div className="m-12 flex flex-col max-w-160 justify-end">
          <h3 className="text-amber-50 font-heading-1 uppercase">A Portfolio Site</h3>

        </div>
    </section>

})

export default TitleSection
