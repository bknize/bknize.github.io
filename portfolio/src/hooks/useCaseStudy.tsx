import { copy } from "../routes/homeCopy";
import { useEffect, useState } from "react";

type CopyObject = typeof copy;

type ExperienceObject = {
  id: string;
  title: string;
  year: string;
  copy: CopyObject;
  projects: ProjectObject;
};

type ProjectObject = {
  title: string;
  copy: string;
  slug?: string;
};

type CaseStudy = {
  experience: ExperienceObject | null;
  project: ProjectObject | null;
  markdown: string | null;
  error: unknown | null;
};

const loadMarkdown = async (filename: string) => {
  try {
    // The import path must be static enough for the bundler to analyze
    // the directory structure, e.g., `./content/${filename}.md`
    const module = await import(`../assets/${filename}.md`);

    // The default export will contain the raw markdown content as a string
    const markdownText: string = module.default;

    return markdownText;
  } catch (error) {
    console.error("Failed to load markdown file:", error);
    return null;
  }
};

const getProjectBySlug = (copy: CopyObject, slug: string) => {
  let out = {};
  (copy as CopyObject).experience.forEach((experience) => {
    experience.projects.forEach((project) => {
      if (project.slug === slug) {
        out = { experience, project };
      }
    });
  });
  return out;
};

const useCaseStudy = (slug: string) => {
  const [data, setData] = useState<CaseStudy>({
    experience: null,
    project: null,
    markdown: null,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    const fetchMarkdown = async () => {
      try {
        const markdown = await loadMarkdown(slug);

        if (!cancelled) {
          setData((prev) => ({
            ...prev,
            ...getProjectBySlug(copy, slug),
            markdown,
          }));
        }
      } catch (error) {
        if (!cancelled) {
          setData((prev) => ({ ...prev, error }));
        }
      }
    };

    fetchMarkdown();

    return () => {
      cancelled = true;
    };
  }, [slug]);

  return { ...data };
};

export default useCaseStudy;
