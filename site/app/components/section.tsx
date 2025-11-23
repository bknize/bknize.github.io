import { useEffect, useRef } from "react"
import ink from 'src/animation/ink.png';
import useElementOnScreen from "~/hooks/useElementOnScreen";
import { transitionBus } from "./transition/transitionBus";

export default function Section({ children }: any, sprite: any = ink) {
  const [containerRef, isVisible] = useElementOnScreen({
    root: null,
    rootMargin: '0px',
    threshold: 0.7,
  })

  useEffect(() => {
    transitionBus.animate({
      isVisible, sprite
    })
  }, [isVisible])
  
  return <section ref={containerRef}
    className="flex flex-col items-center justify-center">
      { isVisible ? 'yes' : 'no' }
    { children }
  </section>

}