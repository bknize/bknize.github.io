import type { RefObject } from "react";

const transitionHelper = ({ ref }: { ref: RefObject<HTMLDivElement | null>}) => (<div ref={ref} className="transition-helper"></div>)

export default transitionHelper;