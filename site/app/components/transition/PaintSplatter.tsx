import { useCallback, useEffect, useRef, useState } from 'react';
import useAspectResize from '../../hooks/useAspectResize';
import './transition.css'
import type { WatchSection } from './WatchSection';
import { debounce } from '~/utils/debounce';

const usePaintState = (freshCoat: PaintUpdate) => {
  return useEffect(() => {
    SplatterBus.register(freshCoat)
  }, [])
}

type PaintUpdate = (section: WatchSection) => void

class PaintState {
  freshCoat: PaintUpdate | undefined;
  currentPaint: string = '';

  constructor() {

  }
  register(freshCoat: PaintUpdate) {
    this.freshCoat = debounce(freshCoat, 250);
  }
  sectionEnters(section: WatchSection) {
    console.log(section, 'enters')
    this.freshCoat?.(section)
  }
  sectionExits(section: WatchSection) {
    console.log(section, 'exits')
  }
}

export const SplatterBus = new PaintState()

export default function PaintSplatter() {
  const container = useRef(null);
  const [watch, setWatch] = useState<WatchSection | null>(null);
  const [isAnimating, setIsAnimating] = useState(false)
  console.log(watch?.paint)

  useAspectResize(container);

  /**
   * this callback is how we get state out of the event bus. we need to:
   * - debounce the freshCoat func
   * - when the debounce ends we take the most recent color and paint it beneath the animation
   * - add two more splatters
   * - select them randomly when you scroll or transition routes
   * - the bus only needs methods for non-section animating and the paint callback will do the rest
   */
  const paintCallback: PaintUpdate = useCallback((watch) => {
    // console.log('callback', watch, watch.paint)
    setWatch(watch)
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 1000)
  }, [])
  usePaintState(paintCallback)


  const isVisible = false;
  // const isAnimating = false;
  

    return <div className={`transition-container ${isVisible ? '__visible' : ''}`} style={{backgroundColor: watch?.paint}}>
            <div ref={container} style={{backgroundImage: `url("${watch?.sprite}")`}}
                className={`transition-layer ${isAnimating ? '__animate': '' }`}
                ></div>
        </div>
}