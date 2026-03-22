import { cn } from "../lib/utils.ts";

interface CmykRuleProps {
  className?: string;
}

export function CmykRule({ className }: CmykRuleProps) {
  return (
    <div className={cn("flex h-[3px] w-[200px]", className)}>
      <div className="flex-1 bg-cmyk-cyan" />
      <div className="flex-1 bg-cmyk-magenta" />
      <div className="flex-1 bg-cmyk-yellow" />
      <div className="flex-1 bg-white" />
    </div>
  );
}
