import type { Metadata } from "next";
import "./globals.css";
import Chrome from "@/components/layout/Chrome";
import Motion from "@/components/motion/Motion";
import Lightbox from "@/components/motion/Lightbox";

export const metadata: Metadata = {
  title: "ÉSBA — École Supérieure des Beaux-Arts d'Alger",
  description:
    "Institution nationale d'enseignement supérieur artistique. Arts plastiques, design, photographie et arts numériques depuis 1962."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400;1,500&family=Jost:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Chrome />
        <main className="page active">{children}</main>
        <Motion />
        <Lightbox />
      </body>
    </html>
  );
}
