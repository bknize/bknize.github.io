import { cn } from "../lib/utils.ts";

const gradientClass =
  "bg-[linear-gradient(90deg,transparent,var(--color-cmyk-cyan),var(--color-cmyk-magenta),var(--color-cmyk-yellow),transparent)]";

interface GradientLineProps {
  className?: string;
}

/** Thin horizontal CMYK fade line (transparent → cyan → magenta → yellow → transparent). */
export function GradientLine({ className }: GradientLineProps) {
  return (
    <div
      className={cn("h-px", gradientClass, className)}
      aria-hidden
    />
  );
}
