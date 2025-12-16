import { useRef } from "react";
import type { WatchSection } from "../utils/WatchSection";
import Title from "./title-text/Title";
import Subtitle from "./title-text/Subtitle";
import { observer } from "mobx-react-lite";
import useSectionScrollWatcher from "../hooks/useSectionScrollWatcher";
import { splatterState } from "../utils/splatterState";

const titleColor = "rgb(255, 251, 235)";

const TitleSection = observer(({ sprite, paint }: Partial<WatchSection>) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { name } = splatterState.section;

  useSectionScrollWatcher({
    ...({ name: "title", ref, sprite, paint } as WatchSection),
    margin: "-60% 0px 0px 0px",
  });

  const titlePage = name === "title" || name === "";

  return (
    <section
      ref={ref}
      className="
        relative
      "
    >
      <div
        className={`
          title-container
          ${titlePage ? "__active" : "__inactive"}
        `}
      >
        <Title
          fill={titlePage ? titleColor : "transparent"}
          stroke={titlePage ? "transparent" : titleColor}
          className={`
            title-text stroke-1
          `}
        />
        <Subtitle
          fill={titlePage ? titleColor : "transparent"}
          stroke={titlePage ? "transparent" : titleColor}
          className={`
            subtitle-text stroke-1
          `}
        />
      </div>
      <div
        className="
          flex flex-col
          max-w-160
          m-12
          justify-end
        "
      >
        <h3
          className="
            text-amber-50 font-heading-1
            uppercase
          "
        >
          A Portfolio Site
        </h3>
      </div>
    </section>
  );
});

export default TitleSection;
