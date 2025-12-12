import { useEffect, useRef, useState, type CSSProperties, type RefObject } from "react"
import useSectionScrollWatcher from "~/hooks/useSectionScrollWatcher";
import type { WatchSection } from "./transition/WatchSection";
import TitleContainer from "./title-text/TitleContainer";
import Title from "./title-text/Title";
import Subtitle from "./title-text/Subtitle";
import { Link, Element } from 'react-scroll';


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
    </section>

}