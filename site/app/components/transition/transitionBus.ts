import type { RefObject } from "react";
import useElementOnScreen from "~/hooks/useElementOnScreen";

class TransitionBus {
  onAnimate: Function | undefined;
  timer: NodeJS.Timeout | undefined;

  register(listener: Function) {
    this.onAnimate = listener;
  }
  animate({ isVisible, sprite }: { isVisible: boolean, sprite: string}) {
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      this.onAnimate?.({ isVisible, sprite })
    }, 250)
  }
}

const useTransitionBus = (options: IntersectionObserverInit): [RefObject<null | HTMLElement>, boolean] => {
  const [containerRef, isVisible] = useElementOnScreen(options)
    console.log(containerRef, isVisible)
  return [containerRef, isVisible]
}

const transitionBus = new TransitionBus()
export { transitionBus, useTransitionBus };