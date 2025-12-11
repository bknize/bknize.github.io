import type { RefObject } from "react";

const Helper = ({ ref, className }: { ref: RefObject<HTMLDivElement | null>, className: string }) => 
    (<div ref={ref} className={`transition-helper ${className}`}></div>)


const TransitionUpper = ({ ref }: { ref: RefObject<HTMLDivElement | null>}) => <Helper ref={ref} className="__upper" />
const TransitionLower = ({ ref }: { ref: RefObject<HTMLDivElement | null>}) => <Helper ref={ref} className="__lower" />

export { TransitionUpper, TransitionLower };