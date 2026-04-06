import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.className} ${greatVibes.variable} ${roboto.variable} antialiased bg-[#f5f5f3]`}>
        {children}
      </body>
    </html>
  );
}
