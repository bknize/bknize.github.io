import { copy } from "../routes/homeCopy";

type CopyObject = typeof copy;
type ProjectObject = {
    title: string,
    copy: string,
    slug?: string
}

const useCaseStudy = (slug: string) => {
    return (copy as CopyObject).experience.find((experience) => {
        return experience.projects.find((project: ProjectObject) => {
            return project.slug === slug;
        })
    })
}

export default useCaseStudy