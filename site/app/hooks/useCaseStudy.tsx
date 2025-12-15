import { copy } from "~/routes/homeCopy"

type CopyObject = typeof copy;

const useCaseStudy = (slug: string) => {
    return (copy as CopyObject).experience.find((experience) => {
        return experience.projects.find((project) => {
            return project.slug === slug;
        })
    })
}

export default useCaseStudy