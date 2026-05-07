import type { Metadata } from "next";
import "./globals.css";
import Chrome from "@/components/layout/Chrome";
import Footer from "@/components/layout/Footer";
import Motion from "@/components/motion/Motion";
import Lightbox from "@/components/motion/Lightbox";
import SmoothScroll from "@/components/motion/SmoothScroll";
import Grain from "@/components/motion/Grain";

export const metadata: Metadata = {
  title: "ÉSBA — École Supérieure des Beaux-Arts d'Alger",
  description:
    "Institution nationale d'enseignement supérieur artistique. Arts plastiques, design, photographie et arts numériques depuis 1962."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <SmoothScroll />
        <Grain />
        <Chrome />
        <main className="page active">{children}</main>
        <Footer />
        <Motion />
        <Lightbox />
      </body>
    </html>
  );
}
