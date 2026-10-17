export type ProjectKind = "site" | "tool";
export type WorkFilter = "all" | ProjectKind;

export type Project = {
  name: string;
  href?: string;
  kind: ProjectKind;
  index: string;
  duration?: string;
  year?: string;
};

export const projects: Project[] = [
  {
    name: "Skyf",
    href: "https://skyf.online/",
    kind: "site",
    index: "01",
  },
  {
    name: "La Vida Loca",
    href: "https://la-vida-loca.vercel.app/",
    kind: "site",
    index: "02",
  },
  {
    name: "MBO Nights",
    href: "https://mbo-nights.vercel.app/",
    kind: "site",
    index: "03",
  },
  {
    name: "Monkify AI Humanizer",
    href: "https://monkify-ai-humanizer.vercel.app/",
    kind: "tool",
    index: "04",
  },
  {
    name: "Label Maker Pro",
    href: "https://shipping-label-maker-ecru.vercel.app/",
    kind: "tool",
    index: "05",
  },
  {
    name: "Menno's Koffiebar",
    href: "https://specialty-koffie-catering.vercel.app/",
    kind: "site",
    index: "06",
  },
];

export const projectFilters: { id: WorkFilter; label: string }[] = [
  { id: "all", label: "All projects" },
  { id: "site", label: "Sites" },
  { id: "tool", label: "Tools" },
];

export function filterProjects(filter: WorkFilter) {
  if (filter === "all") return projects;
  return projects.filter((project) => project.kind === filter);
}

export function padCount(n: number) {
  return String(n).padStart(2, "0");
}
