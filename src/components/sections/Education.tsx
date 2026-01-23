"use client";

import { motion } from "framer-motion";
import { Building2 } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";

export function Education() {
  const { resolvedTheme } = useTheme();
  const reducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isDark = resolvedTheme === "dark";

  return (
    <section id="education" className="py-12 px-4 sm:px-6 lg:px-8" aria-labelledby="education-heading">
      <h2 id="education-heading" className="sr-only">Education</h2>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reducedMotion ? 0.1 : 0.5 }}
          className="rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          style={{
            background: isDark
              ? "linear-gradient(135deg, #1E293B 0%, #0F172A 100%)"
              : "linear-gradient(135deg, #F1F5F9 0%, #F8FAFC 60%, #CBD5E1 100%)",
          }}
        >
          <div className="flex items-start gap-4">
            <div className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center flex-shrink-0 ${isDark ? "border-slate-700 bg-slate-800" : "border-gray-200 bg-white"}`}>
              <Building2 data-testid="building-icon" className={`h-6 w-6 ${isDark ? "text-blue-400" : "text-blue-600"}`} />
            </div>
            <div className="flex-1">
              <h3 className={`text-xl font-semibold mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>Binus University</h3>
              <p className={`mb-2 ${isDark ? "text-gray-300" : "text-gray-600"}`}>Bachelor of Computer Science</p>
              <div className="flex items-center gap-2">
                <span className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>Jun 2020 - Jul 2024</span>
                <span className="text-primary text-sm font-medium">• Completed</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
