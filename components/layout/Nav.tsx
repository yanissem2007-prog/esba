"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/about", label: "À propos" },
  { href: "/programs", label: "Formations" },
  { href: "/admissions", label: "Admissions" },
  { href: "/student", label: "Vie étudiante" },
  { href: "/events", label: "Actualités" },
  { href: "/library", label: "Bibliothèque" },
  { href: "/gallery", label: "Galerie" },
  { href: "/contact", label: "Contact" }
];

export default function Nav({ onToggleMenu }: { onToggleMenu: () => void }) {
  const pathname = usePathname();
  const [shadow, setShadow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShadow(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav id="nav" className={shadow ? "shadow" : ""}>
      <Link className="nav-brand" href="/">
        <div className="nav-brand-seal"><span>ÉB</span></div>
        <div className="nav-brand-text">
          <div className="nav-brand-name">É.S.B.A.</div>
          <div className="nav-brand-full">École Supérieure des Beaux-Arts · Alger</div>
        </div>
      </Link>
      <div className="nav-center">
        {links.map((l) => (
          <Link
            key={l.href}
            className={`nav-link ${pathname === l.href ? "active" : ""}`}
            href={l.href}
          >
            {l.label}
          </Link>
        ))}
      </div>
      <div className="nav-right">
        <button className="nav-search" aria-label="Rechercher">
          <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
        </button>
        <Link className="nav-cta btn btn-gold" href="/admissions">Candidater</Link>
        <button className="hamburger" id="hamburger" onClick={onToggleMenu} aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>
  );
}
