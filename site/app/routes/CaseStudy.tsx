import { useParams } from "react-router";
import ink from 'src/animation/ink_3.png';
import { useRef } from "react";
import Arrow from "~/components/Arrow";
import type { copy } from "./homeCopy";
import useCaseStudy from "~/hooks/useCaseStudy";
import { splatterBus2 } from "~/utils/PaintSplatter";

const offWhite = 'rgb(255, 251, 235)'
const titlePaint = 'rgb(12, 10, 9)'

const CaseStudy = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  
  let params = useParams();
  const caseStudy = useCaseStudy(params.slug!)
  

  splatterBus2.setSection({
    name: `case-study-${params.slug}`,
    paint: titlePaint,
    sprite: ink,
    ref
  })

    return <div ref={ref} className="px-6">
      <a href={`/#${params.slug}`} className="inline-flex! gap-4 items-center mb-6">
        <Arrow color={ offWhite } className="-scale-x-100 w-8"/>
         Back
      </a>
      <h3 className="uppercase font-heading-1 text-amber-50 text-2xl">Case Study:</h3>
      <h1 className="uppercase font-heading-1 text-amber-50 text-4xl">{ caseStudy?.title }</h1>
      </div>
}

export default CaseStudy