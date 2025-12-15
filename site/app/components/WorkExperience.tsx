import { observer } from "mobx-react-lite";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useRef } from "react";
import useParallax from "~/hooks/useParallax";
import type { copy } from "~/routes/homeCopy";
import { splatterBus2 } from "../utils/PaintSplatter";
import Arrow from "./Arrow";
import Summary from "./Summary";

type JobType = typeof copy.experience[0];

const WorkExperience = observer(({ job }: { job: JobType }) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref })
    const y = useParallax(scrollYProgress, 40)
    const { paint } = splatterBus2.section

    return <div className="relative pr-6">
        <motion.h2 ref={ref} className={`hidden sm:block font-heading-1 text-3xl text-neutral-900 my-4 absolute -left-60 w-60 top-8 p-3`} 
          initial={{ visibility: "hidden", opacity: 0 }}
          animate={{ visibility: "visible", opacity: 1 }}
          style={{ y, backgroundColor: paint, transition: 'background-color 1s ease-in-out' }}>
            {job.year}
        </motion.h2>
        <h1 className={`font-heading-1 text-2xl sm:text-3xl md:text-5xl text-neutral-900 uppercase my-4`}>{job.title}</h1>
        <h2 className="visible sm:hidden font-heading-1 text-lg sm:text-2xl text-neutral-900 mb-4">{job.year}</h2>
        <p className='text-neutral-900 text-md sm:text-lg md:text-2xl'>{job.copy}</p>
        {job.projects.map((project, i) => (
            <Summary key={`${project.id}`} project={ project } />
        ))}
    </div>
})

export default WorkExperience;

