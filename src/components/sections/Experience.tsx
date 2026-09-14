"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Minus, Plus } from "lucide-react";

const experiences = [
  {
    role: "Mobile Application Developer",
    company: "PT. Tiga Daya Digital Indonesia (Triputra Group)",
    period: "Sep 2023 - Present",
  },
  {
    role: "Frontend Developer",
    company: "Danamas",
    period: "Jul 2023 - Sep 2023",
  },
  {
    role: "Mobile Application Developer",
    company: "Mandala Multifinance",
    period: "Mar 2022 - Jul 2023",
  },
  {
    role: "Freelance Mobile Application Developer",
    company: "KODEGIRI",
    period: "Feb 2022 - Okt 2022",
  },
  {
    role: "Frontend Developer",
    company: "Quadrant Synergy International",
    period: "Aug 2019 - Mar 2022",
  },
];

export function Experience() {
  const [showAll, setShowAll] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const visible = showAll ? experiences : experiences.slice(0, 3);

  return (
    <section id="experience" className="border-b border-border">
      <div className="mx-auto max-w-[958px] px-6 py-16 lg:px-[54px] lg:py-[76px]">
        <div className="flex flex-col gap-[54px] lg:flex-row">
          <div className="flex-1">
            <p className="font-mono text-[11px] tracking-[1px] text-accent-ink">
              02 — EXPERIENCE &amp; EDUCATION
            </p>
            <h2 className="mt-[22px] text-[32px] font-semibold leading-[1.02] tracking-[-0.02em] text-foreground sm:text-[43px] sm:leading-[43px]">
              Shipping code.
              <br />
              Solving problems.
            </h2>
            <p className="mt-[22px] max-w-[420px] text-[16px] leading-6 text-foreground-secondary">
              Currently building and maintaining mobile experiences with React Native. Computer
              Science graduate from Binus University (2020—2024).
            </p>
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              className="mt-8 flex items-center gap-[10px] border border-border px-4 py-3 font-mono text-[11px] font-semibold tracking-[0.6px] text-foreground transition-colors hover:border-foreground-secondary"
            >
              {showAll ? "SHOW LESS" : "VIEW ALL 5 POSITIONS"}
              {showAll ? (
                <Minus aria-hidden="true" className="size-[15px] text-accent" />
              ) : (
                <Plus aria-hidden="true" className="size-[15px] text-accent" />
              )}
            </button>
          </div>

          <div className="flex-1 border border-border">
            <AnimatePresence initial={false}>
              {visible.map((exp, i) => (
                <motion.div
                  key={`${exp.role}-${exp.company}`}
                  className="flex items-center gap-[16px] border-b border-border px-[18px] py-[22px] last:border-b-0"
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
                  transition={{ duration: 0.2, delay: i * 0.05, ease: [0.23, 1, 0.32, 1] }}
                >
                  <span className="font-mono text-[11px] text-accent-ink">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex flex-col gap-[5px]">
                    <p className="font-mono text-[11px] tracking-[0.8px] text-foreground">
                      {exp.company.toUpperCase()}
                    </p>
                    <p className="text-[13px] text-foreground-secondary">
                      {exp.role} · {exp.period}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}