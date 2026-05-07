"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "/about", label: "À propos" },
  { href: "/programs", label: "Formations" },
  { href: "/admissions", label: "Admissions" },
  { href: "/student", label: "Vie étudiante" },
  { href: "/events", label: "Actualités" },
  { href: "/library", label: "Bibliothèque" }
];

export default function Nav({
  onToggleMenu,
  menuOpen
}: {
  onToggleMenu: () => void;
  menuOpen: boolean;
}) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      id="nav"
      className={`${scrolled ? "scrolled" : ""} ${menuOpen ? "menu-open" : ""}`}
    >
      <Link className="nav-brand" href="/" aria-label="Accueil ÉSBA">
        <span className="nav-brand-seal" aria-hidden="true">ÉB</span>
        <span className="nav-brand-name">É.S.B.A.</span>
      </Link>

      <div className="nav-center">
        {navLinks.map((l) => (
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
        <Link className="nav-cta" href="/admissions">
          Candidature
        </Link>
        <button
          className={`hamburger ${menuOpen ? "is-open" : ""}`}
          id="hamburger"
          onClick={onToggleMenu}
          aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
}
