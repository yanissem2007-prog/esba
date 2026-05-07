"use client";

import Link from "next/link";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

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

const socials = [
  {
    name: "Instagram",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
        <path
          fill="currentColor"
          d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
        />
      </svg>
    )
  },
  {
    name: "Facebook",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
        <path
          fill="currentColor"
          d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
        />
      </svg>
    )
  },
  {
    name: "YouTube",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
        <path
          fill="currentColor"
          d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"
        />
      </svg>
    )
  }
];

const overlay: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3, ease: [0.25, 1, 0.5, 1] }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.25, ease: [0.25, 1, 0.5, 1], delay: 0.05 }
  }
};

const inner: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.05 }
  },
  exit: {
    opacity: 0,
    y: 8,
    transition: { duration: 0.25, ease: [0.25, 1, 0.5, 1] }
  }
};

export default function MobileMenu({
  open,
  onClose
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

  useEffect(() => {
    if (open) {
      const sw = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      if (sw > 0) document.body.style.paddingRight = `${sw}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          variants={overlay}
          initial="hidden"
          animate="visible"
          exit="exit"
          aria-modal="true"
          role="dialog"
        >
          <motion.div
            className="mm-scroll"
            variants={inner}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="mm-inner">
              <div className="mm-eyebrow">
                <span>Navigation</span>
                <span aria-hidden="true">/</span>
                <span>ÉSBA · Alger</span>
              </div>

              <Link className="mm-cta" href="/admissions" onClick={onClose}>
                <span className="mm-cta-label">
                  <span className="mm-cta-eyebrow">Admissions 2025–2026</span>
                  <span className="mm-cta-title">Déposer une candidature</span>
                </span>
                <span className="mm-cta-arrow" aria-hidden="true">→</span>
              </Link>

              <nav className="mm-nav" aria-label="Navigation principale">
                <ul className="mm-list">
                  {links.map((l) => {
                    const active = pathname === l.href;
                    return (
                      <li key={l.href} className={`mm-line ${active ? "active" : ""}`}>
                        <Link className="mm-link" href={l.href} onClick={onClose}>
                          <span className="mm-link-label">{l.label}</span>
                          <span className="mm-link-arrow" aria-hidden="true">↗</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <div className="mm-foot">
                <div className="mm-foot-block">
                  <div className="mm-foot-lbl">Contact</div>
                  <a href="mailto:contact@esba-alger.dz">contact@esba-alger.dz</a>
                  <a href="tel:+213023470327">023 47 03 27</a>
                  <span>Parc Ziryab, Alger centre</span>
                </div>

                <div className="mm-foot-block">
                  <div className="mm-foot-lbl">Suivre</div>
                  <ul className="mm-social">
                    {socials.map((s) => (
                      <li key={s.name}>
                        <a href={s.href} aria-label={s.name}>
                          <span className="mm-social-icon">{s.icon}</span>
                          <span className="mm-social-label">{s.name}</span>
                        </a>
                      </li>
                    ))}
                  </ul>

                  <div className="mm-langs" role="group" aria-label="Langue">
                    <button className="active">FR</button>
                    <button>AR</button>
                    <button>EN</button>
                  </div>
                </div>
              </div>

              <div className="mm-meta">
                © 2025 École Supérieure des Beaux-Arts d&apos;Alger
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
