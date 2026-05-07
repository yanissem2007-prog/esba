"use client";

import { useEffect, useState } from "react";
import Nav from "./Nav";
import MobileMenu from "./MobileMenu";
import Topbar from "./Topbar";
import Loader from "./Loader";

export default function Chrome() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Hamburger animation
  useEffect(() => {
    const ham = document.getElementById("hamburger");
    if (!ham) return;
    const spans = ham.querySelectorAll("span");
    if (menuOpen) {
      (spans[0] as HTMLElement).style.transform = "translateY(6.5px) rotate(45deg)";
      (spans[1] as HTMLElement).style.opacity = "0";
      (spans[2] as HTMLElement).style.transform = "translateY(-6.5px) rotate(-45deg)";
    } else {
      (spans[0] as HTMLElement).style.transform = "";
      (spans[1] as HTMLElement).style.opacity = "";
      (spans[2] as HTMLElement).style.transform = "";
    }
  }, [menuOpen]);

  // Scroll progress + back-to-top
  useEffect(() => {
    const onScroll = () => {
      const top = window.pageYOffset;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const bar = document.getElementById("progress-bar");
      if (bar) bar.style.width = (docH > 0 ? (top / docH) * 100 : 0) + "%";
      const btn = document.getElementById("back-top");
      if (btn) btn.classList.toggle("visible", top > 400);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <Loader />
      <div id="progress-bar"></div>
      <button
        id="back-top"
        aria-label="Haut de page"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        ↑
      </button>
      <Topbar />
      <Nav onToggleMenu={() => setMenuOpen((o) => !o)} />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
