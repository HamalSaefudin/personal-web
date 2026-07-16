"use client";

import { useEffect, useRef } from "react";

export function GridBackground() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMove = (e: MouseEvent) => {
      el.style.setProperty("--mx", `${(e.clientX / window.innerWidth) * 100}%`);
      el.style.setProperty("--my", `${(e.clientY / window.innerHeight) * 100}%`);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="bg-grid pointer-events-none fixed inset-0 z-0"
      style={{
        maskImage:
          "radial-gradient(circle 640px at var(--mx, 50%) var(--my, 40%), black, transparent 75%)",
        WebkitMaskImage:
          "radial-gradient(circle 640px at var(--mx, 50%) var(--my, 40%), black, transparent 75%)",
      }}
    />
  );
}
