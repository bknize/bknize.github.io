import { observer } from "mobx-react-lite";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useRef } from "react";
import type { JSX } from "react/jsx-runtime";
import useParallax from "~/hooks/useParallax";
import type { copy } from "~/routes/homeCopy";
import { splatterBus2 } from "../utils/PaintSplatter";

type QualificationType = typeof copy.qualifications[0];

const Qualification = observer(({ qualification }: { qualification: QualificationType }) => {


    return <div className="relative">
        <h3 className={`font-heading-1 text-lg sm:text-2xl text-neutral-800 uppercase my-2`}>{qualification.opener}</h3>
        <p className="text-neutral-800 textmd sm:text-lg my-2">{qualification.copy}</p>
    </div>
})

export default Qualification;

