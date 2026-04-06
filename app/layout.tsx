import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Particles from "../components/Particles";
import ThemeProvider from "../components/ThemeProvider";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const greatVibes = localFont({
  src: "../public/fonts/Great_Vibes/GreatVibes-Regular.ttf",
  variable: "--font-great-vibes",
});

const roboto = localFont({
  src: "../public/fonts/Roboto/Roboto-VariableFont_wdth,wght.ttf",
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "dipps.dev",
  description: "Personal website",
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.className} ${greatVibes.variable} ${roboto.variable} antialiased relative`}>
        <div className="fixed inset-0 z-0">
          <Particles
            particleColors={["#ffffff"]}
            particleCount={120}
            particleSpread={10}
            speed={0.1}
            particleBaseSize={200}
            moveParticlesOnHover
            alphaParticles={false}
            disableRotation={false}
            pixelRatio={1}
            className="fixed inset-0 z-0"
          />
        </div>
        <div className="relative z-10">
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
