import { Link } from "react-router";
import type { copy } from "~/routes/homeCopy";


type ProjectType = {
    copy: string
};

const Summary = ({ project }: { project: ProjectType }) => {
    return <div>
        <p className='border-l-2 border-amber-50 pl-3 my-3'>{project.copy}</p>
        {/* <Link to={'/case/test'}>Case Study</Link> */}
    </div>
}

export default Summary