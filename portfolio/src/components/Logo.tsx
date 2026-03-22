import { cn } from "../lib/utils.ts";

interface LogoProps {
  name: string;
  tld: string;
  tldClassName?: string;
  className?: string;
}

export function Logo({ name, tld, className, tldClassName }: LogoProps) {
  return (
    <div className="flex items-center gap-1">
      <span
        className={cn(
          "bg-gradient-to-br from-cmyk-cyan via-cmyk-magenta to-cmyk-yellow bg-clip-text text-transparent font-bold",
          className
        )}
      >
        {name}
      </span>
      <span className={cn("text-gray-600", tldClassName)}>{tld}</span>
    </div>
  );
}
