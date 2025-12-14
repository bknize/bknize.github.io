import { observer } from "mobx-react-lite";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useRef } from "react";
import type { JSX } from "react/jsx-runtime";
import useParallax from "~/hooks/useParallax";
import type { copy } from "~/routes/homeCopy";
import { splatterBus2 } from "./transition/PaintSplatter";
import Arrow from "./Arrow";
import Summary from "./Summary";

type JobType = typeof copy.experience[0];
const offWhite = 'rgb(255, 251, 235)'

const WorkExperience = observer(({ job }: { job: JobType }) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref })
    const y = useParallax(scrollYProgress, 20)
    const { paint } = splatterBus2.section

    return <div className="relative">
        <h1 className={`font-heading-1 text-6xl text-neutral-900 uppercase my-4`}>{job.title}</h1>
        <motion.h2 ref={ref} className={`font-heading-1 text-3xl text-neutral-900 my-4 absolute -left-60 w-60 top-8 p-3`} 
          initial={{ visibility: "hidden", opacity: 0 }}
          animate={{ visibility: "visible", opacity: 1 }}
          style={{ y, backgroundColor: paint, transition: 'background-color 1s ease-in-out' }}>
            {job.year}
        </motion.h2>
        <p className='text-neutral-900 text-2xl'>{job.copy}</p>
        {job.projects.map((project, i) => (
            <Summary key={`${project.copy.substring(0, 5)}-${i}`} project={ project } />
        ))}
        <div>
            {job.tech.map((tag, i) => (
                <div key={`${tag}-${i}`} className="inline-block px-4 py-1 mr-2 text-amber-50 outline-2 outline-amber-50 font-heading-1 uppercase">{tag}</div>
                ))}
        </div>
    </div>
})

export default WorkExperience;

