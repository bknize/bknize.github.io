import { useEffect, useRef, useState, type RefObject } from "react"
import useSectionScrollWatcher from "~/hooks/useSectionScrollWatcher";


export default function Section({ children, className = '', sprite = '', paint = ''}: { children: any; className?: string; sprite?: string, paint?: string, ref: RefObject<HTMLElement | null> }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useSectionScrollWatcher({ ref, sprite, paint })

  return <section ref={ref}
    className={`relative border-2 ${className}`}>
    { children }
  </section>

}