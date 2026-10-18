"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.12,
        wheelMultiplier: 0.85,
        smoothWheel: true,
        autoRaf: true,
        syncTouch: false,
        gestureOrientation: "vertical",
        touchMultiplier: 1,
      }}
    >
      {children}
    </ReactLenis>
  );
}
