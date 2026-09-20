"use client";

import { createContext, useContext, useEffect, useState } from "react";

type ThemeContextValue = {
  isLight: boolean;
  toggle: () => void;
  ready: boolean;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}

function readIsLight() {
  const stored = window.localStorage.getItem("dipps-theme");
  if (stored === "dark") return false;
  if (stored === "light") return true;
  return !window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isLight, setIsLight] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const next = readIsLight();
    setIsLight(next);
    document.documentElement.dataset.theme = next ? "light" : "dark";
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    document.documentElement.dataset.theme = isLight ? "light" : "dark";
    window.localStorage.setItem("dipps-theme", isLight ? "light" : "dark");
  }, [isLight, ready]);

  const toggle = () => setIsLight((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ isLight, toggle, ready }}>
      {children}
    </ThemeContext.Provider>
  );
}
