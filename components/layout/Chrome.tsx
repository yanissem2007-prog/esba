"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Topbar from "./Topbar";
import Nav from "./Nav";
import MobileMenu from "./MobileMenu";
import Loader from "./Loader";

export default function Chrome() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

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
      <div className={`chrome-stack ${menuOpen ? "menu-open" : ""}`}>
        <Topbar />
        <Nav onToggleMenu={() => setMenuOpen((o) => !o)} menuOpen={menuOpen} />
      </div>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
