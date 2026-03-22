import { cn } from "../lib/utils.ts";
import { CmykRule } from "./CmykRule.tsx";

export interface SectionHeaderProps {
  /** Eyebrow label, e.g. `04 / CONTACT` */
  sectionLabel: string;
  /** Tailwind color class for the eyebrow, e.g. `text-cmyk-yellow` */
  titleColorClass: string;
  /** First line of the main heading */
  heading: string;
  /** Second line (outlined stroke style) */
  subheading: string;
  /** Optional right column blurb (Skills / Experience sections) */
  description?: string;
  className?: string;
}

export function SectionHeader({
  sectionLabel,
  titleColorClass,
  heading,
  subheading,
  description,
  className,
}: SectionHeaderProps) {
  const headingBlock = (
    <h2 className="text-white font-bold tracking-tight leading-[1.1] text-[clamp(2rem,5vw,4rem)]">
      {heading}
      <br />
      <span className="text-transparent [-webkit-text-stroke:1px_#ffffff]">
        {subheading}
      </span>
    </h2>
  );

  return (
    <div className={cn("mb-16", className)}>
      <p
        className={cn(
          "text-xs tracking-[0.25em] font-semibold mb-3",
          titleColorClass
        )}
      >
        {sectionLabel}
      </p>
      {description ? (
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          {headingBlock}
          <p className="text-gray-600 max-w-[340px] leading-relaxed text-[0.9rem]">
            {description}
          </p>
        </div>
      ) : (
        headingBlock
      )}
      <CmykRule className="mt-6" />
    </div>
  );
}
