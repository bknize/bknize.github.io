import { useInView } from "motion/react";
import { useEffect, useRef } from "react";
import { SplatterBus } from "~/components/transition/PaintSplatter";
import type { WatchSection } from "~/components/transition/WatchSection";

const useSectionScrollWatcher = ({ ...section }: WatchSection) => {
    const isInView = useInView(section.ref, { margin: '-200px 0px -200px 0px' });
    const wasInView = useRef(isInView);  

    return useEffect(() => {
            const currentValue = isInView;
            const previousValue = wasInView.current;

            if (currentValue && !previousValue) {
                SplatterBus.sectionEnters(section)
            } else if (!currentValue && previousValue) {
                SplatterBus.sectionExits(section)
            }

            wasInView.current = currentValue
        }, [isInView])
}

export default useSectionScrollWatcher;