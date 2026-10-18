"use client";

import { createContext, useContext, useEffect, useState } from "react";

type ThemeContextValue = {
  isLight: boolean;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isLight, setIsLight] = useState(true);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const updateTheme = () => {
      const nextIsLight = !media.matches;
      setIsLight(nextIsLight);
      document.documentElement.dataset.theme = nextIsLight ? "light" : "dark";
    };

    updateTheme();
    media.addEventListener("change", updateTheme);
    return () => media.removeEventListener("change", updateTheme);
  }, []);

  return (
    <ThemeContext.Provider value={{ isLight }}>
      {children}
    </ThemeContext.Provider>
  );
}
