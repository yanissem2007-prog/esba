"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Motion() {
  const pathname = usePathname();

  // Reveal on scroll
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.07 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [pathname]);

  // Curtain transition + custom cursor + magnetic + split + clip + lightbox
  useEffect(() => {
    const prefersReduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isCoarse = matchMedia("(hover: none), (pointer: coarse)").matches;

    // ---------- Curtain ----------
    let curtain = document.getElementById("curtain");
    if (!curtain) {
      curtain = document.createElement("div");
      curtain.id = "curtain";
      document.body.appendChild(curtain);
    }
    curtain.classList.remove("lift", "drop", "reset");
    requestAnimationFrame(() => curtain!.classList.add("lift"));

    // ---------- Custom cursor ----------
    let dot: HTMLElement | null = null;
    let ring: HTMLElement | null = null;
    let raf = 0;
    if (!isCoarse && !prefersReduced) {
      dot = document.getElementById("cursor-dot") as HTMLElement | null;
      ring = document.getElementById("cursor-ring") as HTMLElement | null;
      if (!dot) {
        dot = document.createElement("div");
        dot.id = "cursor-dot";
        document.body.appendChild(dot);
      }
      if (!ring) {
        ring = document.createElement("div");
        ring.id = "cursor-ring";
        document.body.appendChild(ring);
      }
      let mx = innerWidth / 2,
        my = innerHeight / 2,
        rx = mx,
        ry = my;
      const onMove = (e: MouseEvent) => {
        mx = e.clientX;
        my = e.clientY;
      };
      window.addEventListener("mousemove", onMove, { passive: true });
      const tick = () => {
        rx += (mx - rx) * 0.18;
        ry += (my - ry) * 0.18;
        if (dot)
          dot.style.transform = `translate3d(${mx}px,${my}px,0) translate(-50%,-50%)`;
        if (ring)
          ring.style.transform = `translate3d(${rx}px,${ry}px,0) translate(-50%,-50%)`;
        raf = requestAnimationFrame(tick);
      };
      tick();

      const hoverSel =
        "a, button, .work-item, .gal-item, .gallery-item, .prog-card, .prog-full-card, .ev-row, .ev-card, .lib-row, .lib-cat, .lib-res-item, .why-item, .st-card, .topbar-lang";
      const zoomSel = ".work-item, .gal-item, .gallery-item";
      const textSel = "input, textarea, select, [contenteditable=\"true\"]";
      const onOver = (e: MouseEvent) => {
        const t = e.target as HTMLElement;
        if (t.closest(zoomSel)) document.body.classList.add("cursor-zoom");
        else if (t.closest(textSel)) document.body.classList.add("cursor-text");
        else if (t.closest(hoverSel)) document.body.classList.add("cursor-hover");
      };
      const onOut = (e: MouseEvent) => {
        const t = e.target as HTMLElement;
        if (t.closest(zoomSel)) document.body.classList.remove("cursor-zoom");
        else if (t.closest(textSel)) document.body.classList.remove("cursor-text");
        else if (t.closest(hoverSel)) document.body.classList.remove("cursor-hover");
      };
      document.addEventListener("mouseover", onOver);
      document.addEventListener("mouseout", onOut);

      return () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseover", onOver);
        document.removeEventListener("mouseout", onOut);
      };
    }
  }, []);

  // Magnetic + split + clip-reveal + page-specific event filters — re-run on route change
  useEffect(() => {
    const prefersReduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isCoarse = matchMedia("(hover: none), (pointer: coarse)").matches;

    // Magnetic buttons disabled — institutional design favors calm interactions
    const cleanupMagnets: Array<() => void> = [];

    // ---------- Split text ----------
    const splitTitle = (el: HTMLElement) => {
      if (el.dataset.split) return;
      el.dataset.split = "1";
      const tmp = document.createElement("div");
      tmp.innerHTML = el.innerHTML;
      const walk = (node: Node) => {
        Array.from(node.childNodes).forEach((c) => {
          if (c.nodeType === 3) {
            const frag = document.createDocumentFragment();
            (c.nodeValue || "").split(/(\s+)/).forEach((part) => {
              if (!part.trim()) {
                frag.appendChild(document.createTextNode(part));
                return;
              }
              const span = document.createElement("span");
              span.className = "split-word";
              span.textContent = part;
              const wrap = document.createElement("span");
              wrap.className = "split-line";
              wrap.appendChild(span);
              frag.appendChild(wrap);
            });
            c.parentNode!.replaceChild(frag, c);
          } else if (c.nodeType === 1 && (c as HTMLElement).tagName !== "BR") {
            walk(c);
          }
        });
      };
      walk(tmp);
      el.innerHTML = tmp.innerHTML;
    };
    const titles = document.querySelectorAll<HTMLElement>(
      ".hero-title, .pg-hero-title"
    );
    titles.forEach(splitTitle);
    const splitTimer = setTimeout(() => {
      titles.forEach((t) => t.classList.add("split-ready"));
    }, 120);

    // ---------- Clip reveal on scroll ----------
    const clipTargets = document.querySelectorAll<HTMLElement>(
      ".pg-hero-img-wrap, .gal-item, .gallery-item, .ev-card-ph"
    );
    clipTargets.forEach((n) => {
      if (!n.dataset.clip) {
        n.dataset.clip = "1";
        n.classList.add("clip-reveal");
      }
    });
    const clipObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            clipObs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".clip-reveal").forEach((el) => clipObs.observe(el));

    // ---------- Marquee velocity ----------
    let lastY = scrollY,
      vel = 0;
    const ticker = document.querySelector<HTMLElement>(".ticker-inner");
    const onTickerScroll = () => {
      vel = Math.min(20, Math.abs(scrollY - lastY));
      lastY = scrollY;
      ticker?.style.setProperty("--ticker-dur", Math.max(8, 32 - vel * 1.4) + "s");
    };
    if (ticker && !prefersReduced) {
      window.addEventListener("scroll", onTickerScroll, { passive: true });
    }

    // ---------- Hero parallax ----------
    let pRaf = 0;
    const heroImg = document.querySelector<HTMLImageElement>("#hero .hero-visual img");
    if (heroImg && !prefersReduced) {
      let ty = 0,
        target = 0;
      const onP = () => (target = scrollY * 0.18);
      window.addEventListener("scroll", onP, { passive: true });
      const tick = () => {
        ty += (target - ty) * 0.1;
        heroImg.style.transform = `translate3d(0,${ty}px,0) scale(1.08)`;
        pRaf = requestAnimationFrame(tick);
      };
      tick();
    }

    // ---------- Event filter delegation ----------
    const filters = document.querySelectorAll<HTMLButtonElement>("[data-evfilter]");
    const onFilter = (e: Event) => {
      const btn = e.currentTarget as HTMLButtonElement;
      const cat = btn.dataset.evfilter || "";
      filters.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      document.querySelectorAll<HTMLElement>(".ev-card").forEach((c) => {
        c.style.display = !cat || c.dataset.cat === cat ? "" : "none";
      });
    };
    filters.forEach((b) => b.addEventListener("click", onFilter));

    const libCats = document.querySelectorAll<HTMLElement>("[data-libcat]");
    const onLib = (e: Event) => {
      libCats.forEach((c) => c.classList.remove("active"));
      (e.currentTarget as HTMLElement).classList.add("active");
    };
    libCats.forEach((c) => c.addEventListener("click", onLib));

    // ---------- Image fade-in ----------
    document.querySelectorAll<HTMLImageElement>("img").forEach((im) => {
      if (im.dataset.faded) return;
      im.dataset.faded = "1";
      im.style.opacity = "0";
      const show = () => (im.style.opacity = "1");
      if (im.complete) show();
      else {
        im.addEventListener("load", show);
        im.addEventListener("error", show);
      }
    });

    return () => {
      cleanupMagnets.forEach((c) => c());
      clearTimeout(splitTimer);
      clipObs.disconnect();
      if (ticker) window.removeEventListener("scroll", onTickerScroll);
      cancelAnimationFrame(pRaf);
      filters.forEach((b) => b.removeEventListener("click", onFilter));
      libCats.forEach((c) => c.removeEventListener("click", onLib));
    };
  }, [pathname]);

  return null;
}
