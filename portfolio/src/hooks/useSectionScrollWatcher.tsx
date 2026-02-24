import { useInView } from "motion/react";
import { useEffect, useRef } from "react";
import type { WatchSection } from "../utils/WatchSection";
import { splatterState } from "../utils/splatterState";

/* stolen from motion/react */
type MarginValue = `${number}${"px" | "%"}`;
type MarginType =
  | MarginValue
  | `${MarginValue} ${MarginValue}`
  | `${MarginValue} ${MarginValue} ${MarginValue}`
  | `${MarginValue} ${MarginValue} ${MarginValue} ${MarginValue}`;

const useSectionScrollWatcher = ({
  margin = "-200px 0px -200px 0px",
  ...section
}: WatchSection & { margin?: MarginType }) => {
  const isInView = useInView(section.ref, { margin });
  const wasInView = useRef(isInView);

  useEffect(() => {
    const currentValue = isInView;
    const previousValue = wasInView.current;

    if (currentValue && !previousValue) {
      splatterState.setSection(section);
    }

    wasInView.current = currentValue;
  }, [isInView, section]);
};

export default useSectionScrollWatcher;
