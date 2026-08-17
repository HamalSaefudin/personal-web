"use client";

import { motion, useReducedMotion } from "framer-motion";

export function SectionEyebrow({
  number,
  children,
}: {
  number: string;
  children: React.ReactNode;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.h2
      className="mb-8 inline-flex items-center overflow-hidden rounded-full border border-ink text-xs font-medium uppercase tracking-[0.286em]"
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
    >
      <span
        aria-hidden="true"
        className="grid size-6 place-items-center bg-sunshine-highlight tracking-normal"
      >
        {number}
      </span>
      <span className="px-3 py-1.5">{children}</span>
    </motion.h2>
  );
}
