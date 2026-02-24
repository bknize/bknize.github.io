import type { CSSProperties } from "react";

const Arrow = ({ ...props }: CSSProperties & { className?: string }) => {
  const { className, ...style } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      {...(className && { className })}
      viewBox="0 0 24 24"
      style={{
        fill: "none",
        strokeWidth: 1.5,
        stroke: "currentColor",
        ...style,
      }}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
      />
    </svg>
  );
};

export default Arrow;
