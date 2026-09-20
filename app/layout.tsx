import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import WaveField from "../components/WaveField";
import ThemeProvider from "../components/ThemeProvider";
import SoundProvider from "../components/SoundProvider";
import SmoothScroll from "../components/SmoothScroll";
import WorkProvider from "../components/WorkProvider";
import SiteChrome from "../components/SiteChrome";
import WorkTimeline from "../components/WorkTimeline";
import PageTransition from "../components/PageTransition";

const archivo = localFont({
  src: "../public/fonts/Archivo/Archivo-VariableFont_wdth,wght.ttf",
  variable: "--font-archivo",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "dipps.dev",
  description: "Dipako Thupayatlase — full-stack software engineer.",
  icons: {
    icon: "/favicon.png",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover" as const,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${archivo.className} ${archivo.variable} relative antialiased`}>
        <ThemeProvider>
          <SoundProvider>
            <SmoothScroll>
              <WorkProvider>
                <PageTransition>
                  <WaveField />
                  <SiteChrome />
                  <WorkTimeline />
                  <div className="relative z-10">{children}</div>
                </PageTransition>
              </WorkProvider>
            </SmoothScroll>
          </SoundProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
