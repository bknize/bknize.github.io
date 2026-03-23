import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function loadMarkdown(filename: string) {
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