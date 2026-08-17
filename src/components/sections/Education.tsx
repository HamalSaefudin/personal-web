"use client";

import { motion } from "framer-motion";
import { SectionEyebrow } from "@/components/SectionEyebrow";

export function Education() {
  return (
    <section id="education" className="py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <SectionEyebrow number="03">Education</SectionEyebrow>

        <motion.div
          className="py-5 border-t border-border"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.35, delay: 0.06 }}
        >
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1">
            <h3 className="font-semibold">Binus University</h3>
            <span className="text-sm text-foreground-secondary tabular-nums">Jun 2020 - Jul 2024</span>
          </div>
          <p className="text-sm text-foreground-secondary">Bachelor of Computer Science</p>
        </motion.div>
      </div>
    </section>
  );
}
