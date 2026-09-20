export type ProjectKind = "site" | "tool";
export type WorkFilter = "all" | ProjectKind;

export type Project = {
  name: string;
  href?: string;
  image?: string;
  kind: ProjectKind;
  index: string;
  duration?: string;
  year?: string;
};

export const projects: Project[] = [
  { name: "Project title", kind: "site", index: "01", duration: "00:01:24", year: "2024" },
  { name: "Project title", kind: "site", index: "02", duration: "00:00:48", year: "2024" },
  { name: "Project title", kind: "tool", index: "03", duration: "00:02:36", year: "2025" },
  { name: "Project title", kind: "site", index: "04", duration: "00:01:12", year: "2025" },
  { name: "Project title", kind: "site", index: "05", duration: "00:03:05", year: "2025" },
  { name: "Project title", kind: "tool", index: "06", duration: "00:00:54", year: "2026" },
  { name: "Project title", kind: "site", index: "07", duration: "00:02:18", year: "2026" },
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
