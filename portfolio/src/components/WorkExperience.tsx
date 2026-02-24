import { observer } from "mobx-react-lite";
import { useRef } from "react";

import Summary from "./Summary";
import type { copy } from "../routes/homeCopy";
import { experiencePaint } from "../utils/colors";
import { splatterState } from "../utils/splatterState";

type JobType = (typeof copy.experience)[0];

const WorkExperience = observer(({ job }: { job: JobType }) => {
  const ref = useRef(null);
  const { paint } = splatterState.section;

  const backgroundColor =
    experiencePaint === paint ? experiencePaint : "transparent";

  return (
    <div
      className="
        pr-6
        relative
      "
    >
      <h2
        ref={ref}
        style={{
          backgroundColor,
          transition: "background-color 1s ease-in-out",
        }}
        className={`
          hidden
          w-60
          my-4 p-3
          font-heading-1 text-3xl text-neutral-900
          absolute -left-60 top-8
          sm:block
        `}
      >
        {job.year}
      </h2>
      <h1
        className={`
          my-4
          font-heading-1 text-2xl text-neutral-900
          uppercase
          sm:text-3xl
          md:text-5xl
        `}
      >
        {job.title}
      </h1>
      <h2
        className="
          visible
          mb-4
          font-heading-1 text-lg text-neutral-900
          sm:hidden sm:text-2xl
        "
      >
        {job.year}
      </h2>
      <p
        className="
          text-neutral-900 text-md
          sm:text-lg
          md:text-2xl
        "
      >
        {job.copy}
      </p>
      {job.projects.map((project) => (
        <Summary key={`${project.id}`} project={project} />
      ))}
    </div>
  );
});

export default WorkExperience;
