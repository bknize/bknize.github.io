import * as Separator from "@radix-ui/react-separator";
import { Logo } from "./Logo.tsx";

export function FooterSection() {
  return (
    <>
      <Separator.Root className="bg-white/[0.06] h-px max-w-7xl mx-auto mt-20" />
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Logo name="BENKNIZE" tld=".com" className="text-base" tldClassName="text-xs" />
        <p className="text-gray-700 text-xs tracking-[0.1em] text-center">
          © 2026 BEN - POWERED BY GITHUB PAGES & UN-STATIC
        </p>
        <div className="flex gap-2">
          {["bg-cmyk-cyan", "bg-cmyk-magenta", "bg-cmyk-yellow", "bg-white"].map(
            (c, i) => (
              <div key={i} className={`w-2 h-2 rounded-full ${c} opacity-60`} />
            )
          )}
        </div>
      </div>
    </>
  );
}
