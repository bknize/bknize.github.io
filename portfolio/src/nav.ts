/** Section element ids on the home page (used for in-page nav + deep links). */
export const HOME_SECTION = {
  hero: "hero",
  tech: "tech",
  work: "work",
  contact: "contact",
} as const;

export type HomeSectionId = (typeof HOME_SECTION)[keyof typeof HOME_SECTION];

export type HomeLocationState = {
  scrollTo?: HomeSectionId;
};

export const NAV_LINKS: { label: string; sectionId: HomeSectionId }[] = [
  { label: "About", sectionId: HOME_SECTION.hero },
  { label: "Tech", sectionId: HOME_SECTION.tech },
  { label: "Work", sectionId: HOME_SECTION.work },
  { label: "Contact", sectionId: HOME_SECTION.contact },
];
