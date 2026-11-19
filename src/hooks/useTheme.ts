"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type Theme = "dark" | "light";

const SWITCH_CLASS_MS = 260;
let switchTimer: ReturnType<typeof setTimeout> | undefined;

function motionAllowed() {
  return (
    typeof window === "undefined" ||
    !window.matchMedia ||
    window.matchMedia("(prefers-reduced-motion: no-preference)").matches
  );
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("dark");
  const themeRef = useRef<Theme>("dark");

  useEffect(() => {
    const current = document.documentElement.dataset.theme;
    if (current === "light" || current === "dark") {
      themeRef.current = current;
      setTheme(current);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    const next: Theme = themeRef.current === "dark" ? "light" : "dark";
    themeRef.current = next;

    const root = document.documentElement;

    // Colour changes only crossfade when the user has not asked for less motion.
    if (motionAllowed()) {
      root.classList.add("theme-switching");
      clearTimeout(switchTimer);
      switchTimer = setTimeout(() => root.classList.remove("theme-switching"), SWITCH_CLASS_MS);
    }

    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // storage unavailable; theme still applies for this session
    }
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", next === "dark" ? "#12110e" : "#f2efe8");
    setTheme(next);
  }, []);

  return { theme, toggleTheme };
}
