import { useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { SplatterBus } from "~/components/transition/PaintSplatter";
import type { WatchSection } from "~/components/transition/WatchSection";

/* stolen from motion/react */
type MarginValue = `${number}${"px" | "%"}`;
type MarginType = MarginValue | `${MarginValue} ${MarginValue}` | `${MarginValue} ${MarginValue} ${MarginValue}` | `${MarginValue} ${MarginValue} ${MarginValue} ${MarginValue}`;


const useSectionScrollWatcher = ({ margin = '-200px 0px -200px 0px', ...section }: WatchSection & { margin?: MarginType }) => {
    const isInView = useInView(section.ref, { margin });
    const wasInView = useRef(isInView);  
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
            const currentValue = isInView;
            const previousValue = wasInView.current;

            if (currentValue && !previousValue) {
                SplatterBus.sectionEnters(section)
                setIsVisible(true)
            } else if (!currentValue && previousValue) {
                SplatterBus.sectionExits(section)
                setIsVisible(false)
            }

            wasInView.current = currentValue
        }, [isInView])

    return isVisible
}

export default useSectionScrollWatcher;