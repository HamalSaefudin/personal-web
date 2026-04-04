"use client";

import { useState, useEffect } from "react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { Sun, Moon } from "lucide-react";

const navItems = [
  { name: "Overview", href: "#overview" },
  { name: "Experience", href: "#experience" },
  { name: "Education", href: "#education" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export function Header() {
  const { setTheme, resolvedTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("Overview");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.href.slice(1)));
      const scrollPos = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPos) {
          setActiveTab(navItems[i].name);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <nav className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="flex h-12 items-center justify-between">
          <a href="#overview" className="text-sm font-semibold tracking-tight">
            Hamal
          </a>

          <div className="hidden sm:flex items-center gap-5">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`text-xs font-medium transition-colors ${
                  activeTab === item.name
                    ? "text-foreground"
                    : "text-foreground-secondary hover:text-foreground"
                }`}
              >
                {item.name}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className="p-1.5 text-foreground-secondary hover:text-foreground transition-colors"
              aria-label={resolvedTheme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {resolvedTheme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="sm:hidden p-1.5 text-foreground-secondary hover:text-foreground transition-colors"
              aria-label="Toggle menu"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                {menuOpen ? (
                  <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                ) : (
                  <>
                    <path d="M2 5H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M2 11H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="sm:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-3">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`text-sm font-medium ${
                    activeTab === item.name
                      ? "text-foreground"
                      : "text-foreground-secondary hover:text-foreground"
                  }`}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
