import { useNavigate, useParams } from "react-router";
import ink from '../assets/img/ink.png';
import { useRef } from "react";
import useCaseStudy from "../hooks/useCaseStudy";
import { splatterBus } from "../utils/PaintSplatter";
import Arrow from "../components/Arrow";
import { titlePaint, offWhite } from "../utils/colors";

const CaseStudy = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  
  let params = useParams();
  const navigate = useNavigate()
  const caseStudy = useCaseStudy(params.slug!)
  

  splatterBus.setSection({
    name: `case-study-${params.slug}`,
    paint: titlePaint,
    sprite: ink,
    ref
  })

  const handleClick = () => {
    navigate(-1); 
  }

    return <div ref={ref} className="px-6">
      <a onClick={handleClick} className="inline-flex! gap-4 items-center mb-6">
        <Arrow color={ offWhite } className="-scale-x-100 w-8"/>
         Back
      </a>
      <h3 className="uppercase font-heading-1 text-amber-50 text-2xl">Case Study:</h3>
      <h1 className="uppercase font-heading-1 text-amber-50 text-4xl">{ caseStudy?.title }</h1>
      </div>
}

export default CaseStudy