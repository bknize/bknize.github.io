import { motion, useScroll } from "motion/react";
import { useRef } from "react";
import portrait from "../assets/img/pic.jpg";
import useParallax from "../hooks/useParallax";

const Portrait = ({
  className = "",
}: {
  className?: string;
  paint: string;
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useParallax(scrollYProgress, 200);

  return (
    <motion.div
      ref={ref}
      initial={{ visibility: "hidden", opacity: 0 }}
      animate={{ visibility: "visible", opacity: 1 }}
      style={{ y }}
      className={`
        relative ${className}
      `}
    >
      <img
        src={portrait}
        className={`
          w-full h-full
          opacity-100
          contrast-200 grayscale-100 hue-rotate-0 invert-0 saturate-100 sepia-0
        `}
      />
      <div
        style={{ background: "#FF0094" }}
        className="
          w-full h-full
          absolute top-0 left-0 mix-blend-lighten
        "
      />
    </motion.div>
  );
};

export default Portrait;
