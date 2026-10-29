import { type ReactNode, useLayoutEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useIsFirstLoad } from "../lib/firstLoad.ts";

interface PageTransitionProps {
  children: ReactNode;
}

/**
 * C, M, Y, K plates sweep in on exit and out on enter, like print plates
 * passing. K is last in so it is the resting cover between pages, which keeps
 * the full-screen yellow to a trailing band.
 */
const PLATES = [
  "bg-cmyk-cyan",
  "bg-cmyk-magenta",
  "bg-cmyk-yellow",
  "bg-cmyk-key",
] as const;
const EASE = [0.76, 0, 0.24, 1] as const;
const STAGGER = 0.06;
const DURATION = 0.45;

/** Time from a new page mounting until the last plate has cleared the viewport. */
export const WIPE_DURATION = DURATION + (PLATES.length - 1) * STAGGER;

export function PageTransition({ children }: PageTransitionProps) {
  const reduceMotion = useReducedMotion();
  const isFirstLoad = useIsFirstLoad();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (reduceMotion) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={isFirstLoad ? "revealed" : "covered"}
      animate="revealed"
      exit="covering"
    >
      {children}

      <div
        className="pointer-events-none fixed inset-0 z-[100] overflow-hidden"
        aria-hidden
      >
        {PLATES.map((plate, i) => (
          <motion.div
            key={plate}
            className={`absolute inset-0 ${plate}`}
            variants={{
              covered: { x: "0%" },
              revealed: {
                x: "100%",
                transition: {
                  duration: DURATION,
                  ease: EASE,
                  // Top plate (K) leaves first so the colours peel away in order.
                  delay: (PLATES.length - 1 - i) * STAGGER,
                },
              },
              covering: {
                x: ["-100%", "0%"],
                transition: { duration: DURATION, ease: EASE, delay: i * STAGGER },
              },
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}
