"use client";

import { useEffect } from "react";

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const updateTheme = (e: MediaQueryListEvent | MediaQueryList) => {
      const isDark = e.matches;
      document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
    };

    // Set initial theme
    updateTheme(mediaQuery);

    // Listen for changes
    mediaQuery.addEventListener("change", updateTheme);

    return () => {
      mediaQuery.removeEventListener("change", updateTheme);
    };
  }, []);

  return <>{children}</>;
}