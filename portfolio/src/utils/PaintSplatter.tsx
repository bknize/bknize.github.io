import { useEffect, useRef, useState } from "react";
import useAspectResize from "../hooks/useAspectResize";
import { observer } from "mobx-react-lite";
import { splatterState } from "./splatterState";

const PaintSplatter = observer(() => {
  const container = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const firstSplatter = useRef(true);

  const { sprite, paint, name } = splatterState.section;

  useAspectResize(container);

  useEffect(() => {
    if (!!name && !!paint) {
      if (firstSplatter.current && name === "title") {
        firstSplatter.current = false;
      } else {
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 1000);
      }
    }
  }, [name, paint]);

  return (
    <div
      style={{
        backgroundColor: paint,
      }}
      className={`
        transition-container
      `}
    >
      <div
        ref={container}
        style={{ backgroundImage: `url("${sprite}")` }}
        className={`
          transition-layer
          ${isAnimating ? "__animate" : ""}
        `}
      ></div>
    </div>
  );
});

export default PaintSplatter;
