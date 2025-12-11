import { useCallback, useEffect, useRef } from 'react';
import useAspectResize from '../../hooks/useAspectResize';
import './transition.css'
import type { WatchSection } from './WatchSection';

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
    this.freshCoat = freshCoat;
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

export default function PaintSplatter({ watch }: { watch: WatchSection[] }) {
  const container = useRef(null);
  useAspectResize(container);

  const testCallback: PaintUpdate = useCallback((watch) => console.log('callback', watch, watch.paint), [])
  usePaintState(testCallback)


  const isVisible = false;
  const isAnimating = false;
  

    return <div className={`transition-container ${isVisible ? '__visible' : ''}`}>
            <div ref={container} style={{backgroundImage: `url("${watch[0].sprite}")`}}
                className={`transition-layer ${isAnimating ? '__animate': '' }`}
                ></div>
        </div>
}