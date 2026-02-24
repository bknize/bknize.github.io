import { useNavigate, useParams } from "react-router";
import ink from "../assets/img/ink.png";
import { useEffect, useRef } from "react";
import { offWhite, caseStudyPaint } from "../utils/colors";
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
      paint: caseStudyPaint,
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
        pt-2
        text-neutral-900
        page
      "
    >
      <a
        onClick={handleClick}
        className="
          inline-flex!
          m-2
          link gap-4 items-center left-0
          lg:fixed
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
      <div
        className="
          flex flex-col
          w-full max-w-180
          mx-auto mt-0 px-2 pb-40
        "
      >
        <h3
          className="
            font-heading-1 text-4xl text-neutral-900
            uppercase
          "
        >
          Case Study:
        </h3>
        <h3
          className="
            mb-12
            font-heading-1 text-6xl text-neutral-900
            uppercase
          "
        >
          {project?.title}
        </h3>
        {!!markdown && (
          <Markdown openLinksInNewTab={false}>{markdown}</Markdown>
        )}
      </div>
    </div>
  );
};

export default CaseStudy;
