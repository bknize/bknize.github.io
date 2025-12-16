import { observer } from "mobx-react-lite";
import type { copy } from "../routes/homeCopy";

type QualificationType = (typeof copy.qualifications)[0];

const Qualification = observer(
  ({ qualification }: { qualification: QualificationType }) => {
    return (
      <div
        className="
          relative
        "
      >
        <h3
          className={`
            my-2
            font-heading-1 text-lg text-neutral-800
            uppercase
            sm:text-2xl
          `}
        >
          {qualification.opener}
        </h3>
        <p
          className="
            my-2
            text-neutral-800
            textmd
            sm:text-lg
          "
        >
          {qualification.copy}
        </p>
      </div>
    );
  },
);

export default Qualification;
