import { useNavigate, useParams } from "react-router";
import ink from "../assets/img/ink.png";
import { useEffect, useRef } from "react";
import { titlePaint, offWhite } from "../utils/colors";
import useCaseStudy from "../hooks/useCaseStudy";
import Arrow from "../components/Arrow";
import { splatterState } from "../utils/splatterState";
import Markdown from "marked-react";

const CaseStudy = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  const params = useParams();
  const navigate = useNavigate();
  const { project, markdown } = useCaseStudy(params.id!);

  useEffect(() => {
    splatterState.setSection({
      name: `case-study-${params.slug}`,
      paint: titlePaint,
      sprite: ink,
      ref,
    });
  }, [params.slug]);

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <div
      ref={ref}
      className="
        px-6
      "
    >
      <a
        onClick={handleClick}
        className="
          inline-flex!
          mb-6
          gap-4 items-center
        "
      >
        <Arrow
          color={offWhite}
          className="
            w-8
            -scale-x-100
          "
        />
        Back
      </a>
      <h3
        className="
          font-heading-1 text-amber-50 text-2xl
          uppercase
        "
      >
        Case Study:
      </h3>
      <h1
        className="
          font-heading-1 text-amber-50 text-4xl
          uppercase
        "
      >
        {project?.title}
      </h1>
      {!!markdown && <Markdown>{markdown}</Markdown>}
    </div>
  );
};

export default CaseStudy;
