import { useRef } from "react";
import { motion, useInView } from "motion/react";

const STAGGER_STEP = 0.045;
const INVIEW_MARGIN = "-80px" as const;
const TRANSITION = {
  duration: 0.4,
  ease: [0.25, 0.1, 0.25, 1] as const,
};

export type CmykColor = "C" | "M" | "Y" | "K";

/** Tailwind classes per CMYK channel. "K" is the neutral default. */
const CMYK_PILL_CLASSES: Record<CmykColor, string> = {
  C: "text-cmyk-cyan    bg-cmyk-cyan/8    border-cmyk-cyan/20",
  M: "text-cmyk-magenta bg-cmyk-magenta/8 border-cmyk-magenta/20",
  Y: "text-cmyk-yellow  bg-cmyk-yellow/8  border-cmyk-yellow/20",
  K: "text-gray-400     bg-white/6        border-white/10",
};

export type AnimatedTechPillListProps = {
  tags: readonly string[];
  /** CMYK accent color for the pills. Defaults to "K" (neutral). */
  cmyk?: CmykColor;
  /** When set, the component skips its internal scroll observer. */
  inView?: boolean;
  /** Stagger offset when multiple lists share one external observer. */
  staggerBaseIndex?: number;
  className?: string;
};

function PillsRow({
  tags,
  inView,
  cmyk = "K",
  staggerBaseIndex = 0,
  className = "",
  containerRef,
}: AnimatedTechPillListProps & {
  inView: boolean;
  containerRef?: React.RefObject<HTMLDivElement | null>;
}) {
  const pillClass = `text-[0.75rem] font-mono px-3 py-1 border ${CMYK_PILL_CLASSES[cmyk]}`;
  return (
    <div ref={containerRef} className={`flex flex-wrap gap-2 ${className}`}>
      {tags.map((tag, i) => (
        <motion.span
          key={`${tag}-${i}`}
          className={pillClass}
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={
            inView
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 0, y: 20, scale: 0.96 }
          }
          transition={{
            ...TRANSITION,
            delay: (staggerBaseIndex + i) * STAGGER_STEP,
          }}
        >
          {tag}
        </motion.span>
      ))}
    </div>
  );
}

/**
 * Tech tag pills with scroll-triggered staggered fade / scale / slide-in.
 * Pass `inView` externally to share one observer across multiple lists.
 */
export function AnimatedTechPillList({
  inView: controlledInView,
  ...rest
}: AnimatedTechPillListProps) {
  const ref = useRef<HTMLDivElement>(null);
  const observed = useInView(ref, { once: true, margin: INVIEW_MARGIN });

  if (controlledInView !== undefined) {
    return <PillsRow {...rest} inView={controlledInView} />;
  }

  return <PillsRow {...rest} inView={observed} containerRef={ref} />;
}
