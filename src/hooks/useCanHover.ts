"use client";

import { useEffect, useState } from "react";

function getQuery() {
  return typeof window === "undefined" ? null : window.matchMedia("(hover: hover) and (pointer: fine)");
}

export function useCanHover() {
  const [canHover, setCanHover] = useState(() => getQuery()?.matches ?? false);

  useEffect(() => {
    const query = getQuery();
    if (!query) return;

    const handleChange = (e: MediaQueryListEvent) => setCanHover(e.matches);
    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  return canHover;
}
