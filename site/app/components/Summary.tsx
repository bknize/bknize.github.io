import { Link } from "react-router";
import type { copy } from "~/routes/homeCopy";


type ProjectType = {
    copy: string,
    slug: string,
    title: string,
};

const Summary = ({ project }: { project: ProjectType }) => {
    return <div>
        <p className='border-l-2 border-amber-50 pl-3 my-3'>{project.copy}</p>
        <Link to={`case/${project.slug}`} className="my-4">Case Study: { project.title }</Link>
    </div>
}

export default Summary