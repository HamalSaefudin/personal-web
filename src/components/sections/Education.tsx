"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SectionEyebrow } from "@/components/SectionEyebrow";

export function Education() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="education" className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <SectionEyebrow number="03">Education</SectionEyebrow>

        <motion.div
          className="border-y border-ink py-8"
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.35, delay: 0.06 }}
        >
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1">
            <h3 className="text-lg font-medium text-ink">Binus University</h3>
            <span className="text-sm tabular-nums text-foreground-secondary">Jun 2020 - Jul 2024</span>
          </div>
          <p className="mt-3 text-base leading-7 text-foreground-secondary">Bachelor of Computer Science</p>
        </motion.div>
      </div>
    </section>
  );
}
