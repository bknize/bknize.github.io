import { useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { splatterBus } from "../utils/PaintSplatter";
import type { WatchSection } from "../utils/WatchSection";

/* stolen from motion/react */
type MarginValue = `${number}${"px" | "%"}`;
type MarginType = MarginValue | `${MarginValue} ${MarginValue}` | `${MarginValue} ${MarginValue} ${MarginValue}` | `${MarginValue} ${MarginValue} ${MarginValue} ${MarginValue}`;


const useSectionScrollWatcher = ({ margin = '-200px 0px -200px 0px', ...section }: WatchSection & { margin?: MarginType }) => {
    const isInView = useInView(section.ref, { margin });
    const wasInView = useRef(isInView); 
    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
            const currentValue = isInView;
            const previousValue = wasInView.current;

            if (currentValue && !previousValue) {
                splatterBus.setSection(section)
                setIsVisible(true)
            } else if (!currentValue && previousValue) {
                setIsVisible(false)
            }

            wasInView.current = currentValue
        }, [isInView])

    return isVisible
}

export default useSectionScrollWatcher;