"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/providers/ThemeProvider";

export function Footer() {
  const { resolvedTheme } = useTheme();
  const reducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isDark = resolvedTheme === "dark";

  return (
    <footer id="contact" className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reducedMotion ? 0.1 : 0.5 }}
          className="rounded-3xl p-8"
          style={{
            background: isDark 
              ? "linear-gradient(135deg, #000000 0%, #0C0C0C 50%, #1A1A2E 100%)"
              : "linear-gradient(135deg, var(--accent) 0%, #1E293B 100%)",
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className={isDark ? "text-gray-100" : "text-white"}>
              <h2 className="text-3xl font-bold mb-4">Let&apos;s work together</h2>
              <p className={isDark ? "text-gray-300 mb-6 max-w-md" : "text-gray-300 mb-6 max-w-md"}>
                Feel free to reach out for collaborations or just to say hello. I&apos;m always open to discussing new projects and opportunities.
              </p>

              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <a 
                  href="mailto:hamalsaefudin48@gmail.com"
                  className={isDark ? "text-gray-100 hover:text-primary transition-colors cursor-pointer" : "text-white hover:text-primary transition-colors cursor-pointer"}
                >
                  hamalsaefudin48@gmail.com
                </a>
              </div>

              <div className="flex gap-3">
                <a
                  href="https://linkedin.com/in/hamal-saefudin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-[#0077B5] flex items-center justify-center hover:bg-[#006097] transition-colors cursor-pointer"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="h-5 w-5 text-white" />
                </a>
                <a
                  href="https://github.com/HamalSaefudin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer"
                  aria-label="GitHub Profile"
                >
                  <Github className="h-5 w-5 text-white" />
                </a>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: reducedMotion ? 0 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: reducedMotion ? 0.1 : 0.5, delay: reducedMotion ? 0 : 0.1 }}
              className="bg-white rounded-2xl p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
              <div className="grid grid-cols-2 gap-4">
                <a
                  href="#overview"
                  className="flex items-center gap-2 p-3 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer text-gray-600 hover:text-gray-900"
                >
                  <ExternalLink className="h-4 w-4" />
                  Overview
                </a>
                <a
                  href="#experience"
                  className="flex items-center gap-2 p-3 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer text-gray-600 hover:text-gray-900"
                >
                  <ExternalLink className="h-4 w-4" />
                  Experience
                </a>
                <a
                  href="#skills"
                  className="flex items-center gap-2 p-3 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer text-gray-600 hover:text-gray-900"
                >
                  <ExternalLink className="h-4 w-4" />
                  Skills
                </a>
                <a
                  href="#projects"
                  className="flex items-center gap-2 p-3 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer text-gray-600 hover:text-gray-900"
                >
                  <ExternalLink className="h-4 w-4" />
                  Projects
                </a>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <a
                  href="mailto:hamalsaefudin48@gmail.com?subject=Hiring Inquiry"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium cursor-pointer hover:bg-primary-hover transition-colors"
                >
                  Hire Me
                </a>
              </div>
            </motion.div>
          </div>

          <div className="border-t border-white/10 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className={isDark ? "text-gray-400 text-sm" : "text-gray-400 text-sm"}>© {new Date().getFullYear()} Hamal Saefudin</span>
            <div className="flex gap-6">
              {["About", "Skills", "Projects", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={isDark ? "text-gray-400 hover:text-gray-200 text-sm transition-colors cursor-pointer" : "text-gray-400 hover:text-white text-sm transition-colors cursor-pointer"}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
