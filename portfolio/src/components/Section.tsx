import { useRef } from "react"
import type { WatchSection } from "../utils/WatchSection";
import useSectionScrollWatcher from "../hooks/useSectionScrollWatcher";


export default function Section({ ...props }: { children: any; className?: string; title: string } & Partial<WatchSection> ) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { children, className, title, ...watchProps } = props;

  // add ref from this section
  useSectionScrollWatcher({ ...watchProps, ref } as WatchSection);

  return <section ref={ref}
    className={`relative ${className || ''}`}>
      { children }
  </section>

}
