import { useEffect, useRef, useState } from "react"
import useElementOnScreen from "~/hooks/useElementOnScreen";
import Transition from "./transition/transition";
import TransitionHelper from "./transition/transitionHelper";

export default function Section({ children, className = '', sprite = '' }: { children: any; className?: string; sprite?: string }) {
  const [containerRef, isVisible] = useElementOnScreen({
    root: null,
    rootMargin: '0px',
    threshold: 1,
  })
  const [animation, setAnimation] = useState({ isAnimating: false, sprite: '' })

  useEffect(() => {
    if (isVisible && !!sprite) {
      setAnimation({
          isAnimating: true,
          sprite
      })
    }
  }, [isVisible])
  
  return <section
    className={`relative border ${className}`}>
      <TransitionHelper ref={containerRef} />
      { children }
    <Transition { ...{ ...animation, isVisible }} />
  </section>

}