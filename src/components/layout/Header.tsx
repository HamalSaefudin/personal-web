"use client";

import { useTheme } from "@/hooks/useTheme";

const navItems = [
  { name: "Work", href: "#work" },
  { name: "Experience", href: "#experience" },
  { name: "Stack", href: "#stack" },
  { name: "Education", href: "#education" },
  { name: "Contact", href: "#contact" },
];

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <header className="top">
      <div className="wrap">
        <a className="mark" href="#top" aria-label="Hamal Saefudin, back to top">
          hamal<span>/</span>saefudin
        </a>

        <button
          className="theme"
          type="button"
          onClick={toggleTheme}
          aria-pressed={isDark}
          aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
        >
          {isDark ? "Light" : "Dark"}
        </button>

        <nav aria-label="Sections">
          <ul>
            {navItems.map((item) => (
              <li key={item.name}>
                <a href={item.href}>{item.name}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
