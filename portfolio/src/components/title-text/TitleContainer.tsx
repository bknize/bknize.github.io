import type { ReactNode } from "react";

const TitleContainer = ({ children }: { children: ReactNode }) => (
  <div
    className="
      fixed
    "
  >
    {children}
  </div>
);

export default TitleContainer;
