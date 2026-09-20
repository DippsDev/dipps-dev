import type { Metadata } from "next";
import AboutPage from "@/components/AboutPage";

export const metadata: Metadata = {
  title: "About — dipps.dev",
  description: "Dipako Thupayatlase — full-stack software engineer.",
};

export default function About() {
  return <AboutPage />;
}
