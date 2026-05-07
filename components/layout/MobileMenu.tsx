"use client";

import Link from "next/link";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/about", label: "À propos" },
  { href: "/programs", label: "Formations" },
  { href: "/admissions", label: "Admissions" },
  { href: "/student", label: "Vie étudiante" },
  { href: "/events", label: "Actualités" },
  { href: "/library", label: "Bibliothèque" },
  { href: "/gallery", label: "Galerie" },
  { href: "/contact", label: "Contact" }
];

export default function MobileMenu({
  open,
  onClose
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <div id="mobile-menu" className={open ? "open" : ""}>
      {links.map((l) => (
        <Link key={l.href} className="mobile-link" href={l.href} onClick={onClose}>
          {l.label}
        </Link>
      ))}
      <Link className="mobile-menu-cta" href="/admissions" onClick={onClose}>
        Candidater →
      </Link>
      <div className="mobile-social">
        <a href="#">Instagram</a>
        <a href="#">Facebook</a>
        <a href="#">YouTube</a>
      </div>
    </div>
  );
}
