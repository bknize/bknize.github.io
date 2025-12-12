import { useEffect, useRef, useState, type RefObject } from "react"
import useSectionScrollWatcher from "~/hooks/useSectionScrollWatcher";
import type { WatchSection } from "./transition/WatchSection";
import { Link, Element } from 'react-scroll';
import { motion, MotionValue, useScroll } from "motion/react";
import useParallax from "~/hooks/useParallax";


export default function Section({ ...props }: { children: any; className?: string; title: string } & Partial<WatchSection> ) {
  const ref = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const { children, className, title, ...watchProps } = props;

  // add ref from this section
  useSectionScrollWatcher({ ...watchProps, ref } as WatchSection);

  return <section ref={ref}
    className={`relative ${className || ''}`}>
      <div ref={contentRef} className="section-content">
      { children }
      </div>
  </section>

}
