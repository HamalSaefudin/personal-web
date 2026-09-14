"use client";

import { useState } from "react";
import { Moon, Sun } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { useTheme } from "@/hooks/useTheme";

const navItems = [
  { name: "Overview", href: "#overview" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
];

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const isDark = theme === "dark";

  return (
    <header className="relative z-10 border-b border-border">
      <div className="mx-auto flex min-h-[81px] max-w-[958px] items-center justify-between px-6 lg:px-[54px]">
        <a href="#overview" className="flex items-center gap-[10px]">
          <span aria-hidden="true" className="block h-[14px] w-[14px] -rotate-45 bg-accent" />
          <span className="font-mono text-[15px] font-semibold tracking-[1px] text-foreground">
            HAMAL // DEV
          </span>
        </a>

        <nav className="hidden items-center gap-[26px] sm:flex">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="font-mono text-[11px] uppercase tracking-[1px] text-foreground-secondary transition-colors hover:text-foreground"
            >
              {item.name}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="flex items-center gap-2 border border-border px-[9px] py-[7px] text-foreground transition-colors hover:border-foreground-secondary"
          >
            {isDark ? (
              <Moon className="size-[13px] text-accent" aria-hidden="true" />
            ) : (
              <Sun className="size-[13px] text-accent" aria-hidden="true" />
            )}
            <span className="font-mono text-[10px] font-semibold tracking-[1px]">
              {isDark ? "DARK" : "LIGHT"}
            </span>
          </button>

          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <button
                className="p-1.5 text-foreground-secondary transition-colors hover:text-foreground sm:hidden"
                aria-label="Toggle menu"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 5H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M2 11H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-3/4 sm:max-w-sm">
              <SheetTitle className="sr-only">Navigation menu</SheetTitle>
              <SheetDescription className="sr-only">
                Navigate to sections of the portfolio.
              </SheetDescription>
              <div className="flex flex-col gap-4 p-6 pt-14">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="py-2 font-mono text-[11px] uppercase tracking-[1px] text-foreground-secondary transition-colors hover:text-foreground"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
