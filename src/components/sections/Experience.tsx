"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionEyebrow } from "@/components/SectionEyebrow";

const experiences = [
  {
    role: "Mobile Application Developer",
    company: "PT. Tiga Daya Digital Indonesia (Triputra Group)",
    period: "Sep 2023 - Present",
    type: "Full-time",
    description: "Update react native & expo SDK version for current HRIS application",
  },
  {
    role: "Frontend Developer",
    company: "Danamas",
    period: "Jul 2023 - Sep 2023",
    type: "Contract",
    description: "Develop and maintain Danamas borrower mobile apps using React Native and TypeScript",
  },
  {
    role: "Mobile Application Developer",
    company: "Mandala Multifinance",
    period: "Mar 2022 - Jul 2023",
    type: "Full-time",
    description: "Develop interactive mobile apps for our collector",
  },
  {
    role: "Freelance Mobile Application Developer",
    company: "KODEGIRI",
    period: "Feb 2022 - Okt 2022",
    type: "Freelance",
    description: "Develop Android & iOS mobile application for booking hotel using React Native & TypeScript",
  },
  {
    role: "Frontend Developer",
    company: "Quadrant Synergy International",
    period: "Aug 2019 - Mar 2022",
    type: "Full-time",
    description: "Developing a website for a real estate purchasing company using React.js, Redux, and Redux Saga",
  },
];

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.25, ease: [0.23, 1, 0.32, 1] as const },
  }),
  exit: { opacity: 0, y: 8, transition: { duration: 0.18 } },
};

export function Experience() {
  const [showAll, setShowAll] = useState(false);
  const visibleExperiences = showAll ? experiences : experiences.slice(0, 3);

  return (
    <section id="experience" className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <SectionEyebrow number="02">Experience</SectionEyebrow>

        <div className="divide-y divide-ink border-y border-ink">
          <AnimatePresence mode="popLayout">
            {visibleExperiences.map((exp, i) => (
              <motion.div
                key={`${exp.role}-${exp.company}`}
                className="py-8"
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                exit="exit"
                viewport={{ once: true, margin: "-40px" }}
                custom={i}
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1">
                  <h3 className="text-lg font-medium text-ink">{exp.role}</h3>
                  <span className="text-sm tabular-nums text-foreground-secondary">{exp.period}</span>
                </div>
                <p className="text-sm text-foreground-secondary">{exp.company}</p>
                <p className="mt-3 max-w-2xl text-base leading-7 text-foreground-secondary">{exp.description}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {experiences.length > 3 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="mt-6 inline-flex min-h-10 items-center rounded-full border border-ink px-4 text-sm font-medium text-ink transition-[transform,background-color,color] duration-[160ms] ease-out hover:bg-ink hover:text-background active:scale-[0.97]"
          >
            {showAll ? "Show less" : `Show all ${experiences.length} positions`}
          </button>
        )}
      </div>
    </section>
  );
}
