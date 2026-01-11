"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, Github, Linkedin, Mail } from "lucide-react";

const navItems = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

const socialLinks = [
  { name: "GitHub", href: "https://github.com/HamalSaefudin", icon: Github },
  { name: "LinkedIn", href: "https://linkedin.com/in/hamal-saefudin", icon: Linkedin },
  { name: "Email", href: "mailto:hamalsaefudin48@gmail.com", icon: Mail },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#E5E7EB]"
      >
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <a href="#" className="text-xl font-bold text-[#1F2937]">
              Hamal<span className="text-[#22C55E]">.</span>
            </a>

            <div className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-[#6B7280] hover:text-[#22C55E] transition-colors"
                >
                  {item.name}
                </a>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#6B7280] hover:text-[#22C55E] transition-colors"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>

            <div className="relative md:hidden" ref={menuRef}>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-[#6B7280] hover:text-[#22C55E] transition-colors"
              >
                <Menu className="h-5 w-5" />
              </button>

              {isOpen && (
                <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-lg border border-[#E5E7EB] py-2 min-w-32">
                  {navItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-2 text-sm text-[#1F2937] hover:text-[#22C55E] hover:bg-[#DCFCE7] transition-colors"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </nav>
      </motion.header>
  );
}
