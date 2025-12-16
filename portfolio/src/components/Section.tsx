import { useRef, type ReactNode } from "react";
import type { WatchSection } from "../utils/WatchSection";
import useSectionScrollWatcher from "../hooks/useSectionScrollWatcher";

export default function Section({
  ...props
}: {
  children: ReactNode;
  className?: string;
  title: string;
} & Partial<WatchSection>) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { children, className, ...watchProps } = props;

  // add ref from this section
  useSectionScrollWatcher({ ...watchProps, ref } as WatchSection);

  return (
    <section
      ref={ref}
      className={`
        relative ${className || ""}
      `}
    >
      {children}
    </section>
  );
}
