"use client";

import { motion } from "framer-motion";

export function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <motion.h2
      className="flex items-center gap-2 text-sm font-medium text-foreground-secondary uppercase tracking-wider mb-6"
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35 }}
    >
      <span className="h-px w-6 bg-gradient-to-r from-primary to-primary/0" aria-hidden="true" />
      {children}
    </motion.h2>
  );
}
