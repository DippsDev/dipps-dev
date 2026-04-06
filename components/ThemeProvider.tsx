"use client";

import { useEffect } from "react";

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Theme management is now handled by individual components
  // This component can be used for other theme-related context if needed
  return <>{children}</>;
}