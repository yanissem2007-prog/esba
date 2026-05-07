"use client";

import { useEffect, useState } from "react";

export default function Loader() {
  const [hide, setHide] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHide(true), 2400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!hide) return;
    const t = setTimeout(() => setGone(true), 700);
    return () => clearTimeout(t);
  }, [hide]);

  if (gone) return null;

  return (
    <div id="loader" className={hide ? "hide" : ""}>
      <div className="loader-emblem">
        <div className="loader-word">ÉSBA</div>
        <div className="loader-rule"></div>
        <div className="loader-sub">École Supérieure des Beaux-Arts d&apos;Alger</div>
      </div>
      <button className="loader-skip" onClick={() => setHide(true)}>
        Passer ↓
      </button>
    </div>
  );
}
