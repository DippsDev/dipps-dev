"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import {
  filterProjects,
  projectFilters,
  type Project,
  type WorkFilter,
} from "@/lib/projects";

const easeOut = (t: number) => 1 - (1 - t) ** 3;

type WorkContextValue = {
  filter: WorkFilter;
  setFilter: (filter: WorkFilter) => void;
  filters: { id: WorkFilter; label: string; count: number }[];
  visible: Project[];
  featured: number;
  setFeatured: (index: number) => void;
  goTo: (index: number) => void;
  registerSection: (el: HTMLElement | null) => void;
};

const WorkContext = createContext<WorkContextValue | null>(null);

export function useWork() {
  const ctx = useContext(WorkContext);
  if (!ctx) {
    throw new Error("useWork must be used within WorkProvider");
  }
  return ctx;
}

export default function WorkProvider({ children }: { children: React.ReactNode }) {
  const [filter, setFilterState] = useState<WorkFilter>("all");
  const [featured, setFeatured] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const lenis = useLenis();

  const visible = useMemo(() => filterProjects(filter), [filter]);
  const lastIndex = Math.max(visible.length - 1, 0);

  const filters = useMemo(
    () =>
      projectFilters.map((item) => ({
        ...item,
        count: filterProjects(item.id).length,
      })),
    [],
  );

  const registerSection = useCallback((el: HTMLElement | null) => {
    sectionRef.current = el;
  }, []);

  const goTo = useCallback(
    (index: number) => {
      const section = sectionRef.current;
      if (!section || lastIndex === 0) {
        setFeatured(index);
        return;
      }
      const top =
        section.offsetTop + (index / lastIndex) * (section.offsetHeight - window.innerHeight);
      if (lenis) {
        lenis.scrollTo(top, { duration: 1.15, easing: easeOut });
      } else {
        window.scrollTo({ top, behavior: "smooth" });
      }
    },
    [lastIndex, lenis],
  );

  const setFilter = useCallback(
    (next: WorkFilter) => {
      setFilterState(next);
      setFeatured(0);
      const section = sectionRef.current;
      if (section) {
        if (lenis) {
          lenis.scrollTo(section.offsetTop, { duration: 0.9, easing: easeOut });
        } else {
          window.scrollTo({ top: section.offsetTop, behavior: "smooth" });
        }
      }
    },
    [lenis],
  );

  return (
    <WorkContext.Provider
      value={{
        filter,
        setFilter,
        filters,
        visible,
        featured,
        setFeatured,
        goTo,
        registerSection,
      }}
    >
      {children}
    </WorkContext.Provider>
  );
}
