import { Link } from "react-router";
import type { copy } from "~/routes/homeCopy";
import Arrow from "./Arrow";


type ProjectType = {
    copy: string,
    slug?: string,
    title: string,
    tech: string[]
};

const offWhite = 'rgb(255, 251, 235)'


const Summary = ({ project }: { project: ProjectType }) => {
    const id = project?.slug ? project.slug : project.title.replace(' ', '_')

    return <div id={id} className="border-l-3 border-amber-50 p-6 mt-3 mb-6">
        <h3 className="text-neutral-900 text-xl font-heading-1 uppercase">{ project.title }</h3>
        <p className='mb-3'>{project.copy}</p>
        <div>
            {project.tech.map((tag, i) => (
                <div key={`${tag}-${i}`} className="inline-block px-4 py-1 my-1 mr-2 text-amber-50 outline-2 outline-amber-50 font-heading-1 uppercase">{tag}</div>
            ))}
        </div>
        { project.slug && <Link to={`case/${project.slug}`} className="mt-3 inline-flex! gap-4 items-center">Case Study: <Arrow color={ offWhite } className="w-8"/></Link> }
    </div>
}

export default Summary