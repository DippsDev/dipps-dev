"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useWork } from "./WorkProvider";

const MINORS = 8;
const fade = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] as const },
};

type Tick =
  | { kind: "num"; projectIndex: number }
  | { kind: "minor" };

export default function WorkTimeline() {
  const pathname = usePathname();
  const { visible, featured, goTo } = useWork();
  const current = visible[featured] ?? visible[0];

  const ticks = useMemo(() => {
    const next: Tick[] = [];
    visible.forEach((_, index) => {
      next.push({ kind: "num", projectIndex: index });
      if (index < visible.length - 1) {
        for (let i = 0; i < MINORS; i += 1) next.push({ kind: "minor" });
      }
    });
    return next;
  }, [visible]);

  const activeTick = ticks.findIndex(
    (tick) => tick.kind === "num" && tick.projectIndex === featured,
  );

  if (pathname !== "/" || !current) return null;

  return (
    <div className="timeline chrome pointer-events-none">
      <div className="timeline__meta">
        <div className="timeline__title">
          <AnimatePresence mode="wait">
            <motion.p key={current.index} {...fade}>
              {current.name}
            </motion.p>
          </AnimatePresence>
        </div>
        <div className="timeline__year">
          <AnimatePresence mode="wait">
            <motion.p key={`${current.index}-${current.year ?? ""}`} {...fade}>
              {current.year ?? ""}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
      <div className="timeline__ruler" role="list" aria-label="Project timeline">
        {ticks.map((tick, index) => {
          const distance = activeTick < 0 ? 99 : Math.abs(index - activeTick);
          const heat = distance === 0 ? "is-current" : distance <= 1 ? "is-hot" : distance <= 3 ? "is-near" : "";
          if (tick.kind === "num") {
            const project = visible[tick.projectIndex];
            const on = tick.projectIndex === featured;
            const label = parseInt(project.index, 10);
            return (
              <button
                key={`n-${project.index}`}
                type="button"
                role="listitem"
                className="timeline__cell pointer-events-auto"
                onClick={() => goTo(tick.projectIndex)}
                aria-current={on ? "true" : undefined}
                aria-label={`Go to ${project.name} ${project.index}`}
              >
                <span className={`timeline__mark ${heat}`} />
                {Math.abs(tick.projectIndex - featured) <= 1 ? (
                  <span className={`timeline__num${on ? " is-on" : ""}`}>
                    {on ? `[${label}]` : label}
                  </span>
                ) : null}
              </button>
            );
          }
          return (
            <span key={`m-${index}`} role="presentation" className="timeline__cell">
              <span className={`timeline__mark ${heat}`} />
            </span>
          );
        })}
      </div>
    </div>
  );
}
