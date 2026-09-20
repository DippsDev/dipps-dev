"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useLenis } from "lenis/react";

const ease = [0.76, 0, 0.24, 1] as const;
const fadeEase = [0.23, 1, 0.32, 1] as const;

const titles: Record<string, string> = {
  "/": "Work",
  "/about": "About",
};

type Phase = "idle" | "cover" | "reveal";

const NavContext = createContext<(href: string) => void>(() => {});

export function usePageNav() {
  return useContext(NavContext);
}

function reducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const lenis = useLenis();
  const [phase, setPhase] = useState<Phase>("idle");
  const [title, setTitle] = useState(titles["/"] ?? "Work");
  const [dir, setDir] = useState(1);
  const phaseRef = useRef<Phase>("idle");
  const busy = useRef(false);
  const pending = useRef<string | null>(null);
  phaseRef.current = phase;

  const go = useCallback(
    (href: string) => {
      if (href === pathname || busy.current) return;
      if (reducedMotion()) {
        router.push(href);
        return;
      }
      busy.current = true;
      pending.current = href;
      setTitle(titles[href] ?? "Work");
      setDir(href === "/about" || pathname === "/" ? 1 : -1);
      setPhase("cover");
    },
    [pathname, router],
  );

  useEffect(() => {
    router.prefetch("/about");
    router.prefetch("/");
  }, [router]);

  useEffect(() => {
    if (!pending.current || pathname !== pending.current) return;
    lenis?.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
    setPhase("reveal");
  }, [pathname, lenis]);

  useEffect(() => {
    document.documentElement.classList.toggle("is-paging", phase !== "idle");
    if (phase !== "idle") lenis?.stop();
    else lenis?.start();
    return () => document.documentElement.classList.remove("is-paging");
  }, [phase, lenis]);

  const onVeilDone = () => {
    if (phaseRef.current === "cover") {
      const href = pending.current;
      if (href) router.push(href);
      return;
    }
    if (phaseRef.current === "reveal") {
      busy.current = false;
      pending.current = null;
      setPhase("idle");
    }
  };

  return (
    <NavContext.Provider value={go}>
      {children}
      {phase !== "idle" ? (
        <motion.div
          className="page-veil"
          initial={{ y: `${dir * 100}%` }}
          animate={{ y: phase === "reveal" ? `${dir * -100}%` : "0%" }}
          transition={{ duration: phase === "cover" ? 0.74 : 0.86, ease }}
          onAnimationComplete={onVeilDone}
        >
          <motion.div
            className="page-veil__copy"
            initial={{ opacity: 0, y: 16 * dir }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18, ease: fadeEase }}
          >
            <p className="chrome page-veil__kicker">[{title}]</p>
            <p className="page-veil__title">{title}</p>
          </motion.div>
        </motion.div>
      ) : null}
    </NavContext.Provider>
  );
}
