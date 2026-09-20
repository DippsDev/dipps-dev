"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useTheme } from "./ThemeProvider";

const GradientWaves = dynamic(() => import("./GradientWaves"), { ssr: false });

export default function WaveField() {
  const { isLight } = useTheme();
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  if (reduceMotion) return null;

  const colors = isLight
    ? {
        horizonColor: "#e6e6e2",
        waveColor: "#6e6e68",
        crestColor: "#ffffff",
      }
    : {
        horizonColor: "#161614",
        waveColor: "#4a4a46",
        crestColor: "#f2f2ee",
      };

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
      <GradientWaves
        {...colors}
        speed={isLight ? 0.38 : 0.4}
        amplitude={isLight ? 3.1 : 2.5}
        waveScale={isLight ? 0.72 : 0.6}
        waveRatio={0.9}
        swell={isLight ? 42 : 35}
        turbulence={isLight ? 24 : 20}
        tilt={1.11}
        zoom={isLight ? 0.92 : 1}
        height={5.5}
        fogDepth={isLight ? 36 : 26}
        detail="medium"
        brightness={isLight ? 0.88 : 1}
        opacity={1}
        mouseInteraction
        parallaxStrength={0.5}
        grain
        grainIntensity={0.05}
      />
    </div>
  );
}
