"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Lightbox() {
  const [src, setSrc] = useState<string | null>(null);
  const [alt, setAlt] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const t = (e.target as HTMLElement).closest(
        ".gallery-item, .work-item, .gal-item"
      );
      if (!t) return;
      const img = t.querySelector("img");
      if (!img) return;
      e.preventDefault();
      setSrc(img.src.replace(/w=\d+/, "w=1600"));
      setAlt(img.alt || "");
      document.body.style.overflow = "hidden";
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const close = () => {
    setSrc(null);
    document.body.style.overflow = "";
  };

  return (
    <div id="lightbox" className={src ? "open" : ""} onClick={close}>
      <button
        id="lightbox-close"
        onClick={(e) => {
          e.stopPropagation();
          close();
        }}
      >
        ✕
      </button>
      {src && <img id="lightbox-img" src={src} alt={alt} />}
    </div>
  );
}
