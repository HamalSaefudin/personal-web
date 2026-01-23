"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronDown, Menu, X, Sun, Moon } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useTheme } from "@/components/providers/ThemeProvider";

const navItems = [
  { name: "Overview", href: "#overview" },
  { name: "Experience", href: "#experience" },
  { name: "Education", href: "#education" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export function Header() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-surface/80 backdrop-blur-md border-b border-border shadow-sm" 
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src="/newavatar.png"
                alt="Hamal Saefudin - Profile Photo"
                width={40}
                height={40}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <a href="#" className="text-lg font-bold text-foreground" aria-label="Hamal Saefudin - Home">
              Hamal.dev
            </a>
          </div>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setActiveTab(item.name)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                  activeTab === item.name
                    ? "bg-surface text-foreground shadow-sm"
                    : "text-foreground-muted hover:text-foreground hover:bg-surface/50"
                }`}
                aria-current={activeTab === item.name ? "page" : undefined}
              >
                {item.name}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className="p-2.5 text-foreground-muted hover:text-foreground transition-colors cursor-pointer rounded-full hover:bg-surface/50"
              aria-label={resolvedTheme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              style={{ minWidth: 44, minHeight: 44 }}
            >
              {resolvedTheme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>

            {/* Mobile Menu using Sheet */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <button
                    className="p-2.5 text-foreground-muted hover:text-foreground transition-colors cursor-pointer rounded-full hover:bg-surface/50"
                    aria-label="Open menu"
                    style={{ minWidth: 44, minHeight: 44 }}
                  >
                    <Menu className="h-5 w-5" />
                  </button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[280px] sm:w-[320px]">
                  <div className="flex flex-col gap-4 mt-8">
                    <div className="flex items-center gap-3 pb-4 border-b border-border">
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <Image
                          src="/newavatar.png"
                          alt="Hamal Saefudin"
                          width={40}
                          height={40}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Hamal</p>
                        <p className="text-sm text-foreground-muted">Mobile Developer</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      {navItems.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          onClick={() => setActiveTab(item.name)}
                          className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                            activeTab === item.name
                              ? "bg-primary text-primary-foreground"
                              : "text-foreground-muted hover:text-foreground hover:bg-surface"
                          }`}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                    <div className="pt-4 mt-auto">
                      <a
                        href="mailto:hamalsaefudin48@gmail.com?subject=Hiring Inquiry"
                        className="flex items-center justify-center gap-2 w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium cursor-pointer hover:bg-primary-hover transition-colors"
                      >
                        Hire Me
                      </a>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>
    </motion.header>
  );
}
